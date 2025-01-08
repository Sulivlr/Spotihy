import express from 'express';
import TrackHistory from "../models/TrackHistory";
import mongoose from "mongoose";
import User from "../models/User";

const trackHistoriesRouter = express.Router();

trackHistoriesRouter.post('/', async (req, res, next) => {
    try {
        const token = req.get('Authorization');

        if (!token) {
             res.status(401).send({ error: 'No Token present' });
        }

        const user = await User.findOne({ token });

        if (!user) {
             res.status(401).send({ error: 'Unauthorized' });
             return;
        }

        const trackHistoryData = {
            user: user._id,
            track: req.body.track,
            datetime: new Date().toISOString(),
        };

        const trackHistory = new TrackHistory(trackHistoryData);
        await trackHistory.save();

        const populatedTrackHistory = await TrackHistory.find(trackHistory._id).populate('user');

        res.status(200).send(populatedTrackHistory);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
             res.status(400).send(error);
        }
        next(error);
    }
});

export default trackHistoriesRouter;