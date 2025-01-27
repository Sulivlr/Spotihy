import TrackHistory from "../models/TrackHistory";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import express from "express";
import Track from "../models/Track";
import Album from "../models/Album";
import Artist from "../models/Artist";

const trackHistoriesRouter = express.Router();

trackHistoriesRouter.post('/', auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;
    const track = await Track.findById(req.body.track).populate('album');
    if (!track) {
        res.status(404).send({error: 'No such track found'});
        return;
    }
    const album = await Album.findById(track.album._id).populate('artist');
    const artist = await Artist.findById(album?.artist._id);

    const newTrackHistory = {
        user,
        artist,
        track: expressReq.body.track,
    }
    try {
        const trackHistory = new TrackHistory(newTrackHistory);
        await trackHistory.save();
        res.send(trackHistory);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send({error: error.message});
        }
        next(error);
    }
});

trackHistoriesRouter.get('/', auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;
    try {

        const trackHistories = await TrackHistory.find({user: user._id})
            .populate('track').populate('artist').sort({datetime: -1});

        res.send(trackHistories);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send({error: error.message});
        }
        next(error);
    }
});

export default trackHistoriesRouter;