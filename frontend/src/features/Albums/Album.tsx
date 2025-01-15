import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectAlbums, selectAlbumsFetching } from './albumsSlice';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAlbums } from './albumsThunks';
import notFoundImage from '../../assets/images/imgNotFound.jpg';
import { API_URL } from '../../config';
import { Album } from '../../types';

const AlbumList = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const albumsFetching = useAppSelector(selectAlbumsFetching);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbums(id));
    }
  }, [dispatch, id]);

  const navigateToAlbum = (trackId: string) => {
    navigate(`/tracks/${trackId}`);
  };

  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {albumsFetching && (
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </Grid>
      )}
      {albums.map((album: Album) => {
        let image = notFoundImage;
        if (album.image) {
          image = `${API_URL}/${album.image}`;
        }

        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={album._id} onClick={() => navigateToAlbum(album._id)}>
            <Card
              sx={{
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.03)' },
              }}
            >
              <CardMedia
                component="img"
                alt={album.title}
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
                  {album.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ textAlign: 'center' }}
                >
                  Created at: {album.created_at}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AlbumList;
