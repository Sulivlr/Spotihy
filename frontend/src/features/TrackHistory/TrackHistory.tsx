import React, { useCallback, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTrackHistory, selectTrackHistoryFetching } from './trackHistorySlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTrackHistory } from './trackHistoryThunk';
import { selectUser } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';

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
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (trackHistory.length === 0) {
    return (
      <Box sx={{ padding: 2 }}>
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
        {trackHistory.map((history) => (
          <ListItem
            key={history._id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px solid #ccc',
              paddingY: 1,
            }}
          >
            <ListItemText
              primary={`User: ${history.user}`}
              secondary={`Track: ${history.track.title} | Track Number: ${history.track.track_number} | Album: ${history.track.album}`}
            />
            <Typography variant="body2" color="textSecondary">
              {new Date(history.datetime).toLocaleString()} // потом dayjsсделаю
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TrackHistory;
