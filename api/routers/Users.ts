import express from 'express';
import User from "../models/User";
import mongoose from "mongoose";

const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
           username: req.body.username,
           password: req.body.password,
        });

        await user.save();
        res.send(user);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error)
        }
        next(error);
    }
});

export default userRouter;