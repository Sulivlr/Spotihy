import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: String,
    description: String,
    isPublished: {
        type: Boolean,
        default: false,
    },
});

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;