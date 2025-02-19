import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import artistsRouter from './routers/artists';
import albumsRouter from './routers/albums';
import tracksRouter from './routers/tracks';
import trackHistoriesRouter from './routers/trackHistories';
import usersRouter from './routers/users';
import config from './config';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/track_history', trackHistoriesRouter);
app.use('/users', usersRouter);

const run = async () => {
  await mongoose.connect(config.database);
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();
