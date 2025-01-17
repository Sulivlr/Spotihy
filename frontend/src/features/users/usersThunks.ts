import {createAsyncThunk} from '@reduxjs/toolkit';
import {RegisterMutation, User} from '../../types';
import axiosApi from '../../axiosApi';

export const register = createAsyncThunk<User, RegisterMutation>(
  'users/register',
  async (registerMutation: RegisterMutation) => {
    const {data: user} = await axiosApi.post<User>('/users', registerMutation);
    return user;
  });