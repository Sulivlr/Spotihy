import { Track } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import {
  createTrack,
  deleteTrack,
  fetchTracks,
  playTrack,
} from "./tracksThunks";

export interface TracksState {
  items: Track[];
  itemsFetching: boolean;
  addTrackPlay: boolean;
  isCreating: boolean;
  isRemoving: boolean;
}

const initialState: TracksState = {
  items: [],
  itemsFetching: false,
  addTrackPlay: false,
  isCreating: false,
  isRemoving: false,
};

export const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchTracks.fulfilled, (state, { payload: Track }) => {
        state.items = Track;
        state.itemsFetching = false;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.itemsFetching = false;
      })
      .addCase(playTrack.pending, (state) => {
        state.addTrackPlay = true;
      })
      .addCase(playTrack.fulfilled, (state) => {
        state.addTrackPlay = false;
      })
      .addCase(playTrack.rejected, (state) => {
        state.addTrackPlay = false;
      })
      .addCase(createTrack.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createTrack.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createTrack.rejected, (state) => {
        state.isCreating = false;
      })
      .addCase(deleteTrack.pending, (state) => {
        state.isRemoving = true;
      })
      .addCase(deleteTrack.fulfilled, (state) => {
        state.isRemoving = false;
      })
      .addCase(deleteTrack.rejected, (state) => {
        state.isRemoving = false;
      });
  },
  selectors: {
    selectTracks: (state) => state.items,
    selectTracksFetching: (state) => state.itemsFetching,
    selectAddPlayHistory: (state) => state.addTrackPlay,
    selectTrackIsCreating: (state) => state.isCreating,
    selectTrackIsRemoving: (state) => state.isRemoving,
  },
});

export const tracksReducer = tracksSlice.reducer;

export const {
  selectTracks,
  selectTracksFetching,
  selectAddPlayHistory,
  selectTrackIsCreating,
  selectTrackIsRemoving,
} = tracksSlice.selectors;
