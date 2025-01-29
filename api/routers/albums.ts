import express from 'express';
import Album from "../models/Album";
import {AlbumMutation} from "../types";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import permit from "../middleware/permit";
import auth from "../middleware/auth";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
    const artist = req.query.artist;
    try {
        let albums;
        if (artist) {
            albums = await Album.find({artist}).populate('artist', 'name').sort({created_at: -1});
        } else {
            albums = await Album.find().populate('artist', 'name');
        }
        res.send(albums);
    } catch (error) {
        next(error);
    }
});


albumsRouter.post('/', auth,  imagesUpload.single('image'), async (req, res, next) => {
    try {
        const albumData: AlbumMutation = {
            artist: req.body.artist,
            title: req.body.title,
            image: req.file ? req.file.filename : null,
            created_at: req.body.created_at,
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
        if (album === null) {
            {
                res.status(404).send({error: 'Album not found'});
            }
        }
        res.send(album);
    } catch (error) {
        next(error);
    }
});

albumsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
   try {
       const album = await Album.findById(req.params.id);

       if (album === null) {
           res.status(404).send({error: 'Album not found'});
           return;
       }

       await Album.deleteOne({_id: req.params.id});
       res.send({message: `Album ${album.title} is deleted`});
   } catch (error) {
       next(error);
   }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const album = await Album.findOne({_id: req.params.id});
        if (!album) {
            res.status(404).send({error: 'Album not found'});
            return;
        }
        await Album.updateOne({_id: req.params.id}, {$set: {isPublished : !album.isPublished}});
        res.send({message: `Album ${album.title} is updated`});
    } catch (error) {
        next(error);
    }
})

export default albumsRouter;