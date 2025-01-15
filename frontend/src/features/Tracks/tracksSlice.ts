import {Track} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchTracks} from './tracksThunks';

export interface TracksState {
  items: Track[];
  itemsFetching: boolean;
}

const initialState: TracksState = {
  items: [],
  itemsFetching: false,
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
    });
  },
  selectors: {
    selectTracks: (state) => state.items,
    selectTracksFetching: (state) => state.itemsFetching,
  },
});

export const tracksReducer = tracksSlice.reducer;

export const {
  selectTracks,
  selectTracksFetching,
} = tracksSlice.selectors;

