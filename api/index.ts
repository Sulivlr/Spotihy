import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import artistsRouter from "./routers/artists";
import albumsRouter from "./routers/albums";
import tracksRouter from "./routers/tracks";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);

const run = async () => {
    await mongoose.connect('mongodb://localhost/Spotihy');
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
    process.on('exit', () => {
        mongoose.disconnect();
    });
};

void run();