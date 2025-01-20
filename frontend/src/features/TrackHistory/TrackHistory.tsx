import React, { useCallback, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTrackHistory, selectTrackHistoryFetching } from './trackHistorySlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTrackHistory } from './trackHistoryThunk';
import { selectUser } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const TrackHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const trackHistory = useSelector(selectTrackHistory);
  const isFetching = useSelector(selectTrackHistoryFetching);

  const fetchTracksHistory = useCallback(async () => {
    try {
      await dispatch(fetchTrackHistory());
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      void fetchTracksHistory();
    } else {
      navigate('/');
    }
  }, [fetchTracksHistory, user, navigate]);

  if (isFetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (trackHistory?.length === 0) {
    return (
      <Box sx={{ padding: 2, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Track History
        </Typography>
        <Typography variant="body1" color="textSecondary">
          No track history available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Track History
      </Typography>

      <List>
        {trackHistory?.map((history) => (
          <div key={history._id}>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingY: 1,
                borderRadius: 2,
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}
            >
              <ListItemText
                primary={`User: ${history.user}`}
                secondary={`Track: ${history.track.title} | Track Number: ${history.track.track_number} | Album: ${history.track.album}`}
                sx={{ maxWidth: '70%' }}
              />
              <Typography variant="body2" color="textSecondary">
                {dayjs(history.datetime).format('YYYY-MM-DD HH:mm:ss')}
              </Typography>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Box>
  );
};

export default TrackHistory;
