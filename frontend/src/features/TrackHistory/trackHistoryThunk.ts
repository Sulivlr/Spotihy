import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {TrackHistory} from '../../types';

export const fetchTrackHistory = createAsyncThunk<TrackHistory[], string>(
  'trackHistory/get',
  async (token) => {
    const {data: TrackHistory} = await axiosApi.get('/track_history', {headers: {'Authorization': token}});
    return TrackHistory;
  }
);
