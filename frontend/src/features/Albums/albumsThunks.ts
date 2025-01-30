import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Album, AlbumMutation} from '../../types';

export const fetchAlbums = createAsyncThunk<Album[], string>(
  'albums/fetchAlbums',
  async (id: string) => {
    const {data: album} = await axiosApi.get<Album[]>(`/albums?artist=${id}`);
    return album;
  });

export const createAlbum = createAsyncThunk(
  'albums/createAlbum',
  async (albumMutation: AlbumMutation) => {
    const formData = new FormData();
    const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];
    keys.forEach((key) => {
      const value = albumMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });
    await axiosApi.post('/albums', formData);
  }
);

export const deleteAlbum = createAsyncThunk<void, string>(
  'albums/deleteAlbum',
  async (id) => {
    await axiosApi.delete(`/albums/${id}`);
  }
)