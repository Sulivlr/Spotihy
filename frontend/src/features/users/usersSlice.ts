import {User} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {register} from './usersThunks';

export interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: boolean;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = false;
    }).addCase(register.fulfilled, (state, {payload: user}) => {
      state.registerLoading = false;
      state.user = user;
    }).addCase(register.rejected, (state) => {
      state.registerLoading = false;
      state.registerError = true;
    });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectRegisterLoading: (state) => state.registerLoading,
    selectRegisterError: (state) => state.registerError,
  },
});

export const usersReducer = usersSlice.reducer;
export const {
  selectUser,
  selectRegisterLoading,
  selectRegisterError,
} = usersSlice.selectors;