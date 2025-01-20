import TrackHistory from "../models/TrackHistory";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import express from "express";

const trackHistoriesRouter = express.Router();

trackHistoriesRouter.post('/', auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;
    try {
        const trackHistoryData = {
            user: user._id,
            track: req.body.track,
            datetime: new Date(),
        };

        const trackHistory = new TrackHistory(trackHistoryData);
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
    try {
        const expressReq = req as RequestWithUser;
        const user = expressReq.user;

        const trackHistories = await TrackHistory.find({user: user._id})
            .populate({
                path: 'track',
                populate: {
                    path: 'album',
                    model: 'Album',
                    populate: {
                        path: 'artist',
                        model: 'Artist',
                    },
                },
            })
            .sort({datetime: -1});

        res.send(trackHistories);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send({error: error.message});
        }
        next(error);
    }
});

export default trackHistoriesRouter;