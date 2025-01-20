import express from 'express';
import User from "../models/User";
import mongoose from "mongoose";

const usersRouter = express.Router();

usersRouter.post('/register', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });
        user.generateToken();
        await user.save();
        res.send(user);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error)
        }
        next(error);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            res.status(400).send({error: 'Username is wrong'});
            return;
        }
        const isMatch = await user.checkPassword(req.body.password);
        if (!isMatch) {
            res.status(400).send({error: 'Password is wrong'});
            return;
        }
        user.generateToken();
        await user.save();
        res.send({message: 'Username and password is correct!', user})
        return;
    } catch (error) {
        next(error);
    }
});

usersRouter.delete('/sessions', async (req, res, next) => {
    try {
        const headerValue = req.get('Authorization');

        if (!headerValue) {
            res.status(204).send();
            return;
        }

        const [token] = headerValue.split(' ');

        if (!token) {
            res.status(204).send();
            return;
        }

        const user = await User.findOne({token});

        if (!user) {
            res.status(204).send();
            return;
        }

        user.generateToken()
        await user.save()

    } catch (error) {
        next(error);
    }

});

export default usersRouter;