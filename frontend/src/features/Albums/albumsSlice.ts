import {Album} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {createAlbum, deleteAlbum, fetchAlbums} from './albumsThunks';

export interface AlbumsState {
  items: Album[];
  itemsFetching: boolean;
  isCreating: boolean;
  isRemoving: boolean;
}

const initialState: AlbumsState = {
  items: [],
  itemsFetching: false,
  isCreating: false,
  isRemoving: false,
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
    }).addCase(createAlbum.pending, (state) => {
      state.isCreating = true;
    }).addCase(createAlbum.fulfilled, (state) => {
      state.isCreating = false;
    }).addCase(createAlbum.rejected, (state) => {
      state.isCreating = false;
    }).addCase(deleteAlbum.pending, (state) => {
      state.isRemoving = true;
    }).addCase(deleteAlbum.fulfilled, (state) => {
      state.isRemoving = false;
    }).addCase(deleteAlbum.rejected, (state) => {
      state.isRemoving = false;
    });
  },
  selectors: {
    selectAlbums: (state) => state.items,
    selectAlbumsFetching: (state) => state.itemsFetching,
    selectAlbumIsCreating: (state) => state.isCreating,
    selectAlbumIsRemoving: (state) => state.isRemoving,
  },
});

export const albumsReducer = albumsSlice.reducer;

export const {
  selectAlbums,
  selectAlbumsFetching,
  selectAlbumIsCreating,
  selectAlbumIsRemoving,
} = albumsSlice.selectors;

