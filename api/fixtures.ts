import config from "./config";
import mongoose from "mongoose";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";
import {randomUUID} from "crypto";

const run = async () => {
    await mongoose.connect(config.database);
    const db = mongoose.connection;

    try {
        await db.dropCollection("albums");
        await db.dropCollection("artists");
        await db.dropCollection("tracks");
        await db.dropCollection("users");
        await db.dropCollection("trackhistories");
    } catch (error) {
        console.log("Skipping drop...");
    }

    const [Jungkook, Jimin, Rose, BrunoMars ] = await Artist.create(
        {
            name: 'Jungkook',
            image: 'fixtures/Jungkook.jpg'
        },
        {
            name: 'Jimin',
            image: 'fixtures/Jimin.jpg',
        },
        {
            name: 'Rose',
            image: 'fixtures/Rose.jpg',
        },
        {
            name: 'BrunoMars',
            image: 'fixtures/Bruno.jpg',
        }
    );

    const [Jungkook_Golden, Jimin_Face, Rose_Rosie, DieWithASmile] = await Album.create(
        {
            title: 'Standing Next To You',
            artist: Jungkook,
            created_at: 2023,
            image: 'fixtures/Jungkook.jpg',
        },
        {
            title: 'Face',
            artist: Jimin,
            created_at: 2023,
            image: 'fixtures/Jimin.jpg',
        },
        {
            title: 'The Wind Of Spring',
            artist: Rose,
            created_at: 2024,
            image: 'fixtures/Rose.jpg',
        },
        {
            title: 'Die With A Smile',
            artist: BrunoMars,
            created_at: 2024,
            image: 'fixtures/Bruno.jpg',
        },
        {
            title: 'Apt',
            artist: Rose, BrunoMars,
            created_at: 2024,
            image: 'fixtures/Rose.jpg',
        }
    );
    await Track.create(
        {
            title: 'Standing Next To You',
            track_number: 1,
            album: Jungkook_Golden,
            duration: '3:27'
        },
        {
            title: '3D',
            track_number: 2,
            album: Jungkook_Golden,
            duration: '3:22'
        },
        {
            title: 'Seven',
            track_number: 3,
            album: Jungkook_Golden,
            duration: '3:14'
        },
        {
            title: 'Like Crazy',
            track_number: 1,
            album: Jimin_Face,
            duration: '3:32',
        },
        {
            title: 'Who',
            track_number: 2,
            album: Jimin_Face,
            duration: '3:00'
        },
        {
            title: 'Filer',
            track_number: 3,
            album: Jimin_Face,
            duration: '3:02'
        },
        {
            title: 'Apt',
            track_number: 1,
            album: Rose_Rosie,
            duration: '2:49'
        },
        {
            title: 'Die With A Smile',
            track_number: 2,
            album: DieWithASmile,
            duration: '4:13'
        },
    );

    await User.create({
        username: 'Sultashka',
        password: 'qwerty123',
        token: randomUUID(),
    });

    await db.close();
};

void run();
