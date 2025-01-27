import express from 'express';
import Track from "../models/Track";
import {TrackMutation} from "../types";
import mongoose from "mongoose";
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


tracksRouter.post('/', async (req, res, next) => {
    try {
        const trackData: TrackMutation = {
            album: req.body.album,
            title: req.body.title,
            duration: req.body.duration,
        }
        const track = new Track(trackData);
        await track.save();
        res.send(track);

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
        }
        next(error);
    }
});

export default tracksRouter;