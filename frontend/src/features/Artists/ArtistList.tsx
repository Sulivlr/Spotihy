import { Card, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectArtists, selectArtistsFetching } from './artistsSlice';
import { useEffect } from 'react';
import { fetchArtists } from './artistsThunks';
import { Artist } from '../../types';
import { API_URL } from '../../config';
import notFoundImage from '../../assets/images/imgNotFound.jpg';
import {useNavigate} from 'react-router-dom';


const ArtistList = () => {
  const artists = useAppSelector(selectArtists);
  const artistsFetching = useAppSelector(selectArtistsFetching);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const navigateToAlbum = (id: string) => {
    navigate(`/albums/${id}`);
  }

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
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ArtistList;
