import {Track} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchTracks, playTrack} from './tracksThunks';

export interface TracksState {
  items: Track[];
  itemsFetching: boolean;
  addTrackPlay: boolean;

}

const initialState: TracksState = {
  items: [],
  itemsFetching: false,
  addTrackPlay: false,
};

export const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.pending, (state) => {
      state.itemsFetching = true;
    }).addCase(fetchTracks.fulfilled, (state, {payload: Track}) => {
      state.items = Track;
      state.itemsFetching = false;
    }).addCase(fetchTracks.rejected, (state) => {
      state.itemsFetching = false;
    }).addCase(playTrack.pending, (state) => {
      state.addTrackPlay = true;
    }).addCase(playTrack.fulfilled, (state) => {
      state.addTrackPlay = false;
    }).addCase(playTrack.rejected, (state) => {
      state.addTrackPlay = false;
    });
  },
  selectors: {
    selectTracks: (state) => state.items,
    selectTracksFetching: (state) => state.itemsFetching,
    selectAddPlayHistory: (state) => state.addTrackPlay,
  },
});

export const tracksReducer = tracksSlice.reducer;

export const {
  selectTracks,
  selectTracksFetching,
  selectAddPlayHistory,
} = tracksSlice.selectors;

