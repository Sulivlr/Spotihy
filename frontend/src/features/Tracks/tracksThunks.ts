import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Track} from '../../types';
import {RootState} from '../../app/store';

export const fetchTracks = createAsyncThunk<Track[], string>(
  'tracks/fetchTracks',
  async (id: string) => {
    const {data: tracks} = await axiosApi.get(`tracks?album=${id}`);
    return tracks;
  });

export const playTrack = createAsyncThunk<void, Track, { state: RootState }>(
  'tracks/play',
  async (track, {getState}) => {
    const token = getState().users.user?.token;
    const data = {track}
    await axiosApi.post('track_history', data, {headers: {Authorization: token}});
  });