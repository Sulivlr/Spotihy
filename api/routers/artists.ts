import express from 'express';
import Artist from '../models/Artist';
import {imagesUpload} from "../multer";
import mongoose from 'mongoose';
import {ArtistMutation} from "../types";
import auth from "../middleware/auth";
import permit from "../middleware/permit";


const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
    try {
        const artists = await Artist.find();
        res.send(artists);
    } catch (error) {
        next(error);
    }
});

artistsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const artistData: ArtistMutation = {
            name: req.body.name,
            description: req.body.description,
            image: req.file ? req.file.filename : null,
        };

        const artist = new Artist(artistData);
        await artist.save();
        res.send(artist);
    } catch (error) {

        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error)
        }
        next(error);
    }
});

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const artist = await Artist.findOne({_id: req.params.id});

        if (!artist) {
            res.status(404).send({error: 'Artist not found'});
            return;
        }
        await Artist.deleteOne({_id: req.params.id});
        res.send({message: `Artist ${artist.name} is deleted`});
    } catch (error) {
        next(error);
    }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const artist = await Artist.findById(req.params.id);

        if (!artist) {
            res.status(404).send({error: 'Artist not found'});
            return;
        }
        await Artist.updateOne({_id: req.params.id}, {$set: {isPublished: !artist.isPublished}});
        res.send({message: `Artist ${artist.name} is updated`});
    } catch (error) {
        next(error);
    }
});



export default artistsRouter;