import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Track} from '../../types';

export const fetchTracks = createAsyncThunk<Track[], string>(
  'tracks/fetchTracks',
  async (id: string) => {
    const {data: tracks} = await axiosApi.get(`tracks?album=${id}`);
    return tracks;
  });
