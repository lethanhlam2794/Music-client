// src/redux/MusicSlice.ts
"use client"; // Thêm dòng này để biến thành Client Component

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadMusic } from '../api/music/music.api';

interface MusicState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: MusicState = {
  loading: false,
  success: false,
  error: null,
};

export const uploadMusicThunk = createAsyncThunk(
  'music/upload',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await uploadMusic(formData);
      return response;
    } catch (error) {
      return rejectWithValue('Upload failed');
    }
  }
);

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadMusicThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(uploadMusicThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(uploadMusicThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export default musicSlice.reducer;
