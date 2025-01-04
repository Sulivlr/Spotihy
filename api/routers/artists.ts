import express from 'express';
import Artist from '../models/Artist';
import {imagesUpload} from "../multer";
import mongoose from 'mongoose';
import {ArtistMutation} from "../types";


const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
    try {
        const artists = await Artist.find();
        res.send(artists);
    } catch (error) {
        next(error);
    }
});

artistsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
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



export default artistsRouter;