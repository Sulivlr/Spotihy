import {Artist} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {createArtist, fetchArtists} from './artistsThunks';

export interface ArtistsState {
  artists: Artist[];
  artistsFetching: boolean;
  isCreating: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  artistsFetching: false,
  isCreating: false,
};

export const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state) => {
      state.artistsFetching = true;
    }).addCase(fetchArtists.fulfilled, (state, {payload: artists}) => {
      state.artistsFetching = false;
      state.artists = artists;
    }).addCase(fetchArtists.rejected, (state) => {
      state.artistsFetching = false;
    }).addCase(createArtist.pending, (state) => {
      state.isCreating = true;
    }).addCase(createArtist.fulfilled, (state) => {
      state.isCreating = false;
    }).addCase(createArtist.rejected, (state) => {
      state.isCreating = false;
    });
  },
  selectors: {
    selectArtists: (state) => state.artists,
    selectArtistsFetching: (state) => state.artistsFetching,
    selectArtistIsCreating: (state) => state.isCreating,
  }
});

export const artistsReducer = artistsSlice.reducer;

export const  {
  selectArtists,
  selectArtistsFetching,
  selectArtistIsCreating,
} = artistsSlice.selectors;