import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';
import {TrackHistory} from '../../types';

export const fetchTrackHistory = createAsyncThunk<TrackHistory[], void, {state: RootState}>(
  'trackHistory',
  async (_arg, {getState}) => {
    const token = getState().users.user?.token
    const {data: TrackHistory} = await axiosApi.get<TrackHistory[]>('track_history',
      {headers: {Authorization: token}},
      )
    return TrackHistory;
  }
);
