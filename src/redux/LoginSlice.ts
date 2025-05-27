// src/redux/LoginSlice.ts
'use client'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  email: string;
  password: string;
}

interface ErrorResponse {
  message: string;
  code?: string;
}

interface LoginState {
  user: User | null;
  isLoading: boolean;
  error: ErrorResponse | string | null;
}

// Async thunk để gọi API đăng nhập
export const loginUser = createAsyncThunk<User, User, { rejectValue: ErrorResponse }>(
  'auth/loginUser',
  async (userData: User, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3002/auth/login', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Lưu token vào localStorage
      localStorage.setItem('token', response.data.data.accessToken); // Sửa dòng này
      return response.data;
    } catch (error: any) {
      const errorResponse = error.response.data as ErrorResponse;
      return rejectWithValue(errorResponse);
    }
  }
);
const initialState: LoginState = {
  user: null,
  isLoading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload !== undefined ? action.payload : 'Login failed.';
      });
  },
});

export default loginSlice.reducer;
