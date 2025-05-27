// src/redux/RegisterSlice.ts
'use client'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  fullName: string;
  email: string;
  password: string;
}

interface ErrorResponse {
  message: string;
  code?: string;
}

interface RegisterState {
  user: User | null;
  isLoading: boolean;
  error: ErrorResponse | string | null;
}

// Async thunk để gọi API đăng ký
export const registerUser = createAsyncThunk<User, User, { rejectValue: ErrorResponse }>(
  'auth/registerUser',
  async (userData: User, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3002/auth/register', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error: any) {
      const errorResponse = error.response.data as ErrorResponse;
      return rejectWithValue(errorResponse);
    }
  }
);

const initialState: RegisterState = {
  user: null,
  isLoading: false,
  error: null,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload !== undefined ? action.payload : 'Registration failed.';
      });
  },
});

export default registerSlice.reducer;
