import React, { FormEvent, useEffect, useState } from 'react';
import { AlbumMutation } from '../../../types';
import {
  Button,
  Grid,
  SelectChangeEvent,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import FileInput from '../../../UI/FileInput/FileInput';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createAlbum } from '../albumsThunks';
import { useNavigate } from 'react-router-dom';
import { selectArtists } from '../../Artists/artistsSlice';
import { fetchArtists } from '../../Artists/artistsThunks';

const initialState: AlbumMutation = {
  artist: '',
  title: '',
  created_at: '',
  image: null,
};

const AlbumForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const [albumMutation, setAlbumMutation] = useState(initialState);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const onFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = event.target;
    setAlbumMutation((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleArtistChange = (event: SelectChangeEvent<string>) => {
    setAlbumMutation((prevState) => ({ ...prevState, artist: event.target.value }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;
    setAlbumMutation((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(createAlbum(albumMutation)).unwrap();
    navigate(`/`);
  };

  return (
    <Box component="form" onSubmit={submitFormHandler} autoComplete="off">
      <Grid container spacing={3} sx={{ mx: 'auto', width: '60%', mt: 5, mb: 5 }}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{
              fontSize: '32px',
              color: 'rgba(41, 43, 42, 0.82)',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            Add Album
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="artist-select-label">Artist</InputLabel>
            <Select
              required
              labelId="artist-select-label"
              id="artist"
              value={albumMutation.artist}
              onChange={handleArtistChange}
              name="artist"
              label="Artist"
              sx={{ textAlign: 'left' }}
            >
              <MenuItem value="">Select Artist</MenuItem>
              {artists.length === 0 ? (
                <MenuItem disabled>No artists available</MenuItem>
              ) : (
                artists.map((artist) => (
                  <MenuItem key={artist._id} value={artist._id}>
                    {artist.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            value={albumMutation.title}
            onChange={onFieldChange}
            variant="outlined"
            label="Title"
            id="title"
            name="title"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            value={albumMutation.created_at}
            onChange={onFieldChange}
            variant="outlined"
            type="number"
            label="Year of the release"
            id="created_at"
            name="created_at"
            inputProps={{ min: 1900, max: new Date().getFullYear(), step: 1 }}
          />
        </Grid>

        <Grid item xs={12}>
          <FileInput label="Billboard" name="image" onChange={fileInputChangeHandler} />
        </Grid>

        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ padding: '10px 30px', fontWeight: 'bold', textTransform: 'none' }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AlbumForm;
