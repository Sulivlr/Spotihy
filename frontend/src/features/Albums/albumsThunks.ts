import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Album} from '../../types';

export const fetchAlbums = createAsyncThunk<Album[], string>(
  'albums/fetchAlbums',
  async (id: string) => {
    const {data: album} = await axiosApi.get<Album[]>(`/albums?artist=${id}`);
    return album;
  });