import express from 'express';
import Track from "../models/Track";
import {TrackMutation} from "../types";
import mongoose from "mongoose";
import permit from "../middleware/permit";
import auth from "../middleware/auth";


const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
    const album = req.query.album;
    try {
        let tracks;
        if (album) {
            tracks = await Track.find({album}).populate('album', 'title').sort('track_number');
        } else {
            tracks = await Track.find().populate('album', 'title');
        }
        res.send(tracks);
    } catch (error) {
        next(error);
    }
});

tracksRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        res.status(404).send({error: 'id not found'});
    }
    try {
        let tracks = await Track.find().populate('album');
        res.status(200).send(tracks);
    } catch (error) {
        next(error);
    }
});


tracksRouter.post('/', auth, async (req, res, next) => {
    try {
        const trackData: TrackMutation = {
            album: req.body.album,
            title: req.body.title,
            duration: req.body.duration,
        }

        const trackNumber = await Track.find({album: req.body.album});

        const track = new Track({
            ...trackData,
            track_number: trackNumber.length,
        });
        await track.save();
        res.send(track);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
        }
        next(error);
    }
});

tracksRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const track = await Track.findById({_id: req.params.id});

        if (track === null) {
            res.status(404).send({error: 'Track not found'});
            return;
        }
        await Track.deleteOne({_id: req.params.id});

        res.send({message: `Track ${track.title} is deleted`});
    } catch (error) {
        next(error);
    }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const track = await Track.findOne({_id: req.params.id});

        if (!track) {
            res.status(404).send({error: 'Track not found'});
            return;
        }
        await Track.updateOne({_id: req.params.id}, {$set: {isPublished: !track.isPublished}});
        res.send({message: `Track ${track.title} is updated`});
    } catch (error) {
        next(error);
    }
});


export default tracksRouter;