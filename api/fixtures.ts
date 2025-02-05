import config from './config';
import mongoose from 'mongoose';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import User from './models/User';
import {randomUUID} from 'crypto';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('albums');
    await db.dropCollection('artists');
    await db.dropCollection('tracks');
    await db.dropCollection('users');
    await db.dropCollection('trackhistories');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const [BEAST, BTS, Jungkook] = await Artist.create(
    {
      name: 'BEAST',
      image: 'fixtures/BEAST.jpg',
      isPublished: true,
    },
    {
      name: 'BTS',
      image: 'fixtures/BTS.JPG',
      isPublished: true,
    },
    {
      name: 'Jungkook',
      image: 'fixtures/Jungkook.jpg',
      isPublished: false,
    },
  );

  const [WINGS, Youth, TIME, FictionAndFact, Golden] = await Album.create(
    {
      title: 'WINGS',
      artist: BTS,
      created_at: 2016,
      image: 'fixtures/WINGS.jpg',
      isPublished: true,
    },
    {
      title: 'Youth',
      artist: BTS,
      created_at: 2015,
      image: 'fixtures/Youth.jpg',
      isPublished: true,
    },
    {
      title: 'TIME',
      artist: BEAST,
      created_at: 2014,
      image: 'fixtures/TIME.jpg',
      isPublished: true,
    },
    {
      title: 'Fiction And Fact',
      artist: BEAST,
      created_at: 2011,
      image: 'fixtures/FictionAndFact.jpg',
      isPublished: true,
    },
    {
      title: 'Golden',
      artist: Jungkook,
      created_at: 2023,
      image: 'fixtures/Golden.jpeg',
    },
  );
  await Track.create(
    {
      title: 'Fiction',
      track_number: 1,
      album: FictionAndFact,
      duration: '3:54',
      isPublished: true,
    },
    {
      title: 'On Rainy Days',
      track_number: 2,
      album: FictionAndFact,
      duration: '3:46',
      isPublished: true,
    },
    {
      title: 'Lightless',
      track_number: 3,
      album: FictionAndFact,
      duration: '3:27',
      isPublished: true,
    },
    {
      title: 'The fact',
      track_number: 4,
      album: FictionAndFact,
      duration: '2:20',
      isPublished: true,
    },
    {
      title: 'Back To You',
      track_number: 5,
      album: FictionAndFact,
      duration: '3:07',
      isPublished: true,
    },
    {
      title: '12:30',
      track_number: 1,
      album: TIME,
      duration: '3:53',
      isPublished: true,
    },
    {
      title: 'Drive',
      track_number: 2,
      album: TIME,
      duration: '3:12',
      isPublished: true,
    },
    {
      title: 'Close My Eyes',
      track_number: 3,
      album: TIME,
      duration: '3:27',
      isPublished: true,
    },
    {
      title: 'So hot',
      track_number: 4,
      album: TIME,
      duration: '3:09',
      isPublished: true,
    },
    {
      title: 'It\'s All Good ',
      track_number: 5,
      album: TIME,
      duration: '3:39',
      isPublished: true,
    },
    {
      title: 'RUN',
      track_number: 1,
      album: Youth,
      duration: '3:58',
      isPublished: true,
    },
    {
      title: 'FIRE',
      track_number: 2,
      album: Youth,
      duration: '3:26',
      isPublished: true,
    },
    {
      title: 'DOPE',
      track_number: 3,
      album: Youth,
      duration: '4:02',
      isPublished: true,
    },
    {
      title: 'Save Me',
      track_number: 4,
      album: Youth,
      duration: '3:20',
      isPublished: true,
    },
    {
      title: 'Butterfly',
      track_number: 5,
      album: Youth,
      duration: '4:01',
      isPublished: true,
    },
    {
      title: 'Blood Sweat & Tears',
      track_number: 1,
      album: WINGS,
      duration: '3:38',
      isPublished: true,
    },
    {
      title: 'BTS Cypher 4',
      track_number: 2,
      album: WINGS,
      duration: '4:55',
      isPublished: true,
    },
    {
      title: 'Boy Meets Evil',
      track_number: 3,
      album: WINGS,
      duration: '2:02',
      isPublished: true,
    },
    {
      title: '21st Century Girl',
      track_number: 4,
      album: WINGS,
      duration: '3:13',
      isPublished: true,
    },
    {
      title: 'WINGS',
      track_number: 5,
      album: WINGS,
      duration: '2:24',
      isPublished: true,
    },
    {
      title: '3D',
      track_number: 1,
      album: Golden,
      duration: '3:22',
      isPublished: false,
    },
    {
      title: 'SEVEN',
      track_number: 2,
      album: Golden,
      duration: '3:05',
      isPublished: false,
    },
    {
      title: 'Standing Next To You',
      track_number: 3,
      album: Golden,
      duration: '3:27',
      isPublished: false,
    }
  );

  await User.create(
    {
      username: 'Suli',
      password: '13',
      token: randomUUID(),
      role: 'admin',
      avatar: 'fixtures/yoseob.jpg',
      displayName: 'Suli'
    },
    {
      username: 'Sultan',
      password: '123',
      token: randomUUID(),
      role: 'user',
      avatar: 'fixtures/yoseob2.jpeg',
      displayName: 'Sultan Mukhtarov'
    },
  );

  await db.close();
};

void run();
