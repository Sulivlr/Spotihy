import express from 'express';
import Album from "../models/Album";
import {AlbumMutation} from "../types";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
    try {
        const albums = await Album.find().populate('artist', 'name');
        res.send(albums)
    } catch (error) {
        next(error);
    }
});

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const albumData: AlbumMutation = {
            artist: req.body.artist,
            title: req.body.title,
            image: req.file ? req.file.filename : null,
            created_at: new Date().toISOString()
        }
        const album = new Album(albumData);
        await album.save();
        res.send(album)
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
        }
        next(error);
    }
});

albumsRouter.get('/:id', async (req, res, next) => {
    try {
        const album = await Album.findById(req.params.id);
        if (album === null) {{
            res.status(404).send({error: 'Album not found'});
        }}

        res.send(album);
    } catch (error) {
        next(error);
    }
});

export default albumsRouter;