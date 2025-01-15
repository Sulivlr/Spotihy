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

    const [BEAST, BTS ] = await Artist.create(
        {
            name: 'BEAST',
            image: 'fixtures/BEAST.jpg',
        },
        {
            name: 'BTS',
            image: 'fixtures/BTS.JPG'
        },
    );

    const [WINGS, Youth, TIME, FictionAndFact, ] = await Album.create(
        {
            title: 'WINGS',
            artist: BTS,
            created_at: 2016,
            image: 'fixtures/WINGS.jpg',
        },
        {
            title: 'Youth',
            artist: BTS,
            created_at: 2015,
            image: 'fixtures/Youth.jpg',
        },
        {
            title: 'TIME',
            artist: BEAST,
            created_at: 2014,
            image: 'fixtures/TIME.jpg',
        },
        {
            title: 'Fiction And Fact',
            artist: BEAST,
            created_at: 2011,
            image: 'fixtures/FictionAndFact.jpg',
        },
    );
    await Track.create(
        {
            title: 'Fiction',
            track_number: 1,
            album: FictionAndFact,
            duration: '3:54'
        },
        {
            title: 'On Rainy Days',
            track_number: 2,
            album: FictionAndFact,
            duration: '3:46'
        },
        {
            title: 'Lightless',
            track_number: 3,
            album: FictionAndFact,
            duration: '3:27'
        },
        {
            title: 'The fact',
            track_number: 4,
            album: FictionAndFact,
            duration: '2:20',
        },
        {
            title: 'Back To You',
            track_number: 5,
            album: FictionAndFact,
            duration: '3:07'
        },
        {
            title: '12:30',
            track_number: 1,
            album: TIME,
            duration: '3:53'
        },
        {
            title: 'Drive',
            track_number: 2,
            album: TIME,
            duration: '3:12'
        },
        {
            title: 'Close My Eyes',
            track_number: 3,
            album: TIME,
            duration: '3:27'
        },
        {
            title: 'So hot',
            track_number: 4,
            album: TIME,
            duration: '3:09'
        },
        {
            title: 'It\'s All Good ',
            track_number: 5,
            album: TIME,
            duration: '3:39'
        },
        {
            title: 'RUN',
            track_number: 1,
            album: Youth,
            duration: '3:58'
        },
        {
            title: 'FIRE',
            track_number: 2,
            album: Youth,
            duration: '3:26'
        },
        {
            title: 'DOPE',
            track_number: 3,
            album: Youth,
            duration: '4:02'
        },
        {
            title: 'Save Me',
            track_number: 4,
            album: Youth,
            duration: '3:20'
        },
        {
            title: 'Butterfly',
            track_number: 5,
            album: Youth,
            duration: '4:01'
        },
        {
            title: 'Blood Sweat & Tears',
            track_number: 1,
            album: WINGS,
            duration: '3:38'
        },
        {
            title: 'BTS Cypher 4',
            track_number: 2,
            album: WINGS,
            duration: '4:55'
        },
        {
            title: 'Boy Meets Evil',
            track_number: 3,
            album: WINGS,
            duration: '2:02'
        },
        {
            title: '21st Century Girl',
            track_number: 4,
            album: WINGS,
            duration: '3:13'
        },
        {
            title: 'WINGS',
            track_number: 5,
            album: WINGS,
            duration: '2:24'
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
