import { Artist } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { createArtist, deleteArtist, fetchArtists } from "./artistsThunks";

export interface ArtistsState {
  artists: Artist[];
  artistsFetching: boolean;
  isCreating: boolean;
  isRemoving: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  artistsFetching: false,
  isCreating: false,
  isRemoving: false,
};

export const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.artistsFetching = true;
      })
      .addCase(fetchArtists.fulfilled, (state, { payload: artists }) => {
        state.artistsFetching = false;
        state.artists = artists;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.artistsFetching = false;
      })
      .addCase(createArtist.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createArtist.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createArtist.rejected, (state) => {
        state.isCreating = false;
      })
      .addCase(deleteArtist.pending, (state) => {
        state.isRemoving = true;
      })
      .addCase(deleteArtist.fulfilled, (state) => {
        state.isRemoving = false;
      })
      .addCase(deleteArtist.rejected, (state) => {
        state.isRemoving = false;
      });
  },
  selectors: {
    selectArtists: (state) => state.artists,
    selectArtistsFetching: (state) => state.artistsFetching,
    selectArtistIsCreating: (state) => state.isCreating,
    selectArtistIsRemoving: (state) => state.isRemoving,
  },
});

export const artistsReducer = artistsSlice.reducer;

export const {
  selectArtists,
  selectArtistsFetching,
  selectArtistIsCreating,
  selectArtistIsRemoving,
} = artistsSlice.selectors;
