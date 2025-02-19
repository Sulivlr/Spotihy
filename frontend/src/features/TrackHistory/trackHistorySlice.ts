import { createSlice } from "@reduxjs/toolkit";
import { fetchTrackHistory } from "./trackHistoryThunk";
import { TrackHistory } from "../../types";

export interface TrackHistoryState {
  items: TrackHistory[];
  trackHistoryFetching: boolean;
}

const initialState: TrackHistoryState = {
  items: [],
  trackHistoryFetching: false,
};

const trackHistorySlice = createSlice({
  name: "trackHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrackHistory.pending, (state) => {
        state.trackHistoryFetching = true;
      })
      .addCase(
        fetchTrackHistory.fulfilled,
        (state, { payload: trackHistory }) => {
          state.trackHistoryFetching = false;
          state.items = trackHistory;
        },
      )
      .addCase(fetchTrackHistory.rejected, (state) => {
        state.trackHistoryFetching = false;
      });
  },
  selectors: {
    selectTrackHistory: (state) => state.items,
    selectTrackHistoryFetching: (state) => state.trackHistoryFetching,
  },
});

export const trackHistoryReducer = trackHistorySlice.reducer;

export const { selectTrackHistory, selectTrackHistoryFetching } =
  trackHistorySlice.selectors;
