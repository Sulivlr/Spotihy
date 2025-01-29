import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Track, TrackMutation} from '../../types';

export const fetchTracks = createAsyncThunk<Track[], string>(
  'tracks/fetchTracks',
  async (id: string) => {
    const {data: tracks} = await axiosApi.get(`tracks?album=${id}`);
    return tracks;
  });

export const playTrack = createAsyncThunk<void, {track: string, token: string}>(
  'tracks/playTrack',
  async ({track, token}) => {
    const {data: trackHistory} = await axiosApi.post('/track_history', {track}, {headers: {'Authorization': token}});
    return trackHistory;
  });

export const createTrack = createAsyncThunk(
  'tracks/createTrack',
  async (trackMutation: TrackMutation) => {
    await axiosApi.post('/tracks', trackMutation);
  }
)