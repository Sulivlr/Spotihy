import { Grid, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTracks, selectTracksFetching } from './tracksSlice';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTracks } from './tracksThunks';

const TrackList = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const tracksFetching = useAppSelector(selectTracksFetching);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchTracks(id));
    }
  }, [dispatch, id]);

  const navigateToTrack = (trackId: string) => {
    navigate(`/tracks/${trackId}`);
  };

  if (tracksFetching) {
    return (
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (!tracks) {
    return (
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Typography variant="h6">No tracks available</Typography>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {tracks.map((track) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={track._id}>
          <Card sx={{ cursor: 'pointer' }} onClick={() => navigateToTrack(track._id)}>
            <CardContent>
              <Typography variant="h6">{track.title}</Typography>
              <Typography variant="body2">Track Number: {track.track_number}</Typography>
              <Typography variant="body2">Duration: {track.duration}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TrackList;
