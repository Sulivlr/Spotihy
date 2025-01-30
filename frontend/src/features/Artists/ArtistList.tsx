import {Card, CardContent, CardMedia, CircularProgress, Grid, IconButton, Typography} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {selectArtistIsRemoving, selectArtists, selectArtistsFetching} from './artistsSlice';
import { useEffect } from 'react';
import {deleteArtist, fetchArtists} from './artistsThunks';
import { Artist } from '../../types';
import { API_URL } from '../../config';
import notFoundImage from '../../assets/images/imgNotFound.jpg';
import {useNavigate} from 'react-router-dom';
import {selectUser} from '../users/usersSlice';
import {Delete} from '@mui/icons-material';


const ArtistList = () => {
  const artists = useAppSelector(selectArtists);
  const artistsFetching = useAppSelector(selectArtistsFetching);
  const isRemoving = useAppSelector(selectArtistIsRemoving);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const navigateToAlbum = (id: string) => {
    navigate(`/albums/${id}`);
  };

  const handleDeleteArtist = async (artistId: string) => {
    if (user) {
      await dispatch(deleteArtist(artistId));
      await dispatch(fetchArtists());
      navigate('/');
    }
  };

  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {artistsFetching && (
        <CircularProgress />
      )}
      {artists.map((artist: Artist) => {
        let image = notFoundImage;
        if (artist.image) {
          image = API_URL + '/' + artist.image;
        }

        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={artist._id} onClick={() => navigateToAlbum(artist._id)}>
            <Card
              sx={{
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.03)' },
              }}
            >
              <CardMedia
                component="img"
                alt={artist.name}
                height="400"
                image={image}
                sx={{ borderRadius: '4px 4px 0 0' }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: 'center',
                    fontWeight: 500,
                    color: '#333',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {artist.name}
                </Typography>
              </CardContent>
              {user && (
                <IconButton
                  onClick={() => handleDeleteArtist(artist._id)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    background: 'rgba(255, 255, 255, 0.8)',
                  }}
                  disabled={isRemoving}
                >
                  {isRemoving ? <CircularProgress size={24} /> : <Delete />}
                </IconButton>
              )}
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ArtistList;
