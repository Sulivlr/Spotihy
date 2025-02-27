import mongoose, { Types } from 'mongoose';
import Album from './Album';
import User from './User';

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const album = await Album.findById(value);
        return Boolean(album);
      },
      message: 'Album does not exist!!!',
    },
  },
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    default: '3:16',
  },
  track_number: {
    type: Number,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;
