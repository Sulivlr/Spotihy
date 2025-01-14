import {Album} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchAlbums} from './albumsThunks';

export interface AlbumsState {
  items: Album[];
  itemsFetching: boolean;
}

const initialState: AlbumsState = {
  items: [],
  itemsFetching: false,
};

export const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      state.itemsFetching = true;
    }).addCase(fetchAlbums.fulfilled, (state, {payload: album}) => {
      state.items = album;
      state.itemsFetching = false;
    }).addCase(fetchAlbums.rejected, (state)=> {
      state.itemsFetching = false;
    });
  },
  selectors: {
    selectAlbums: (state) => state.items,
    selectAlbumsFetching: (state) => state.itemsFetching,
  },
});

export const albumsReducer = albumsSlice.reducer;

export const {
  selectAlbums,
  selectAlbumsFetching,
} = albumsSlice.selectors;

