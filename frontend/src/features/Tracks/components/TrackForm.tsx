import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { TrackMutation } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import { selectAlbums, selectAlbumsFetching } from "../../Albums/albumsSlice";
import { selectTrackIsCreating } from "../tracksSlice";
import {
    Button,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import { createTrack } from "../tracksThunks";
import { selectArtists, selectArtistsFetching } from "../../Artists/artistsSlice";
import { fetchArtists } from "../../Artists/artistsThunks";
import { fetchAlbums } from "../../Albums/albumsThunks";

const initialState: TrackMutation = {
    album: '',
    title: '',
    duration: '',
};

const TrackForm = () => {
    const [artist, setArtist] = useState<string>('');
    const [trackMutation, setTrackMutation] = useState<TrackMutation>(initialState);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const artists = useAppSelector(selectArtists);
    const artistFetching = useAppSelector(selectArtistsFetching);
    const albums = useAppSelector(selectAlbums);
    const albumFetching = useAppSelector(selectAlbumsFetching);
    const trackIsCreating = useAppSelector(selectTrackIsCreating);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    useEffect(() => {
        if (artist) {
            dispatch(fetchAlbums(artist));
        }
    }, [dispatch, artist]);

    const onFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = event.target;
        setTrackMutation((prevState) => ({ ...prevState, [name]: value }));
    };

    const onArtistChange = (event: SelectChangeEvent<string>) => {
        const { value } = event.target;
        setArtist(value);
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        dispatch(createTrack(trackMutation)).unwrap();
        navigate(`/tracks/${trackMutation.album}`);
    };

    return (
        <Grid container justifyContent="center" style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <Grid item xs={12}>
                <h2>Add New Track</h2>
                <form onSubmit={onSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <TextField
                            label="Track Title"
                            name="title"
                            value={trackMutation.title}
                            onChange={onFieldChange}
                            fullWidth
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <TextField
                            label="Duration (mm:ss)"
                            name="duration"
                            value={trackMutation.duration}
                            onChange={onFieldChange}
                            fullWidth
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <FormControl fullWidth required>
                            <InputLabel>Artist</InputLabel>
                            <Select
                                name="artist"
                                value={artist}
                                onChange={onArtistChange}
                                disabled={artistFetching}
                            >
                                {artistFetching ? (
                                    <MenuItem disabled>
                                        <CircularProgress size={24} />
                                    </MenuItem>
                                ) : (
                                    artists.map((artistItem) => (
                                        <MenuItem key={artistItem._id} value={artistItem._id}>
                                            {artistItem.name}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <FormControl fullWidth required>
                            <InputLabel>Album</InputLabel>
                            <Select
                                name="album"
                                value={trackMutation.album}
                                onChange={onFieldChange}
                                disabled={albumFetching || !artist}
                            >
                                {albumFetching ? (
                                    <MenuItem disabled>
                                        <CircularProgress size={24} />
                                    </MenuItem>
                                ) : (
                                    albums.map((album) => (
                                        <MenuItem key={album._id} value={album._id}>
                                            {album.title}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>
                    </div>

                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        fullWidth
                        disabled={trackIsCreating || albumFetching}
                    >
                        {trackIsCreating ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                </form>
            </Grid>
        </Grid>
    );
};

export default TrackForm;
