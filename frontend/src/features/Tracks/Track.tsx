import {Button, Card, CardContent, CircularProgress, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectTracks, selectTracksFetching} from './tracksSlice';
import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {fetchTracks, playTrack} from './tracksThunks';
import {Track} from '../../types';

interface Props {
  track: Track;
}

const TrackList: React.FC<Props> = ({track}) => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const tracksFetching = useAppSelector(selectTracksFetching);
  const {id} = useParams();
  const navigate = useNavigate();

  const addPlayTrack = () => {
    dispatch(playTrack(track))
  }

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
      <Grid item xs={12} sx={{textAlign: 'center'}}>
        <CircularProgress/>
      </Grid>
    );
  }

  if (!tracks) {
    return (
      <Grid item xs={12} sx={{textAlign: 'center'}}>
        <Typography variant="h6">No tracks available</Typography>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3} sx={{padding: 2}}>
      {tracks.map((track) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={track._id}>
          <Card sx={{cursor: 'pointer'}} onClick={() => navigateToTrack(track._id)}>
            <CardContent>
              <Typography variant="h6">{track.title}</Typography>
              <Typography variant="body2">Track Number: {track.track_number}</Typography>
              <Typography variant="body2">Duration: {track.duration}</Typography>
              <Grid container justifyContent="center" sx={{marginTop: 2}}>
                <Card sx={{
                  paddingLeft: 0.4,
                  width: 40,
                  height: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '50%'
                }}>
                  <Button onClick={addPlayTrack} sx={{fontWeight: 'bold'}}>▶</Button>
                </Card>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

  );
};

export default TrackList;
