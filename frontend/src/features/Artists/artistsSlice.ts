import {Artist} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchArtists} from './artistsThunks';

export interface ArtistsState {
  artists: Artist[];
  artistsFetching: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  artistsFetching: false,
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
    });
  },
  selectors: {
    selectArtists: (state) => state.artists,
    selectArtistsFetching: (state) => state.artistsFetching,
  }
});

export const artistsReducer = artistsSlice.reducer;

export const  {
  selectArtists,
  selectArtistsFetching,
} = artistsSlice.selectors;