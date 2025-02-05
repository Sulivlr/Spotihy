import express from 'express';
import User from "../models/User";
import mongoose from "mongoose";
import {OAuth2Client} from 'google-auth-library';
import config from '../config';
import {imagesUpload} from '../multer';

const usersRouter = express.Router();
const googleClient = new OAuth2Client(config.google.clientId);

usersRouter.post('/register', imagesUpload.single('avatar'), async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            displayName: req.body.displayName,
            avatar: req.file ? req.file.filename : null,
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
        res.send({message: 'Username and password is correct!', user});
        return;
    } catch (error) {
        next(error);
    }
});

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      res.status(400).send({error: 'Invalid credential'});
      return;
    }

    const email = payload.email;
    const id = payload.sub;
    const displayName = payload.name;
    const avatar = payload.picture;

    if (!email) {
      res.status(400).send({error: 'Not enough user data to continue'});
    }
    let user  = await User.findOne({googleID: id});
    if (!user) {
      user = new User({
        username: email,
        password: crypto.randomUUID(),
        googleId: id,
        avatar: avatar ? avatar : null,
        displayName,
      });
    }
    user.generateToken();
    await user.save();
    res.send({message: 'Successfully logged in', user});
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