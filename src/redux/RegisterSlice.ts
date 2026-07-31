import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { register, type RegisterPayload } from "@/features/auth/auth-api";

interface User {
  fullName: string;
  email: string;
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

export const registerUser = createAsyncThunk<
  User,
  RegisterPayload,
  { rejectValue: ErrorResponse }
>("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await register(userData);
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message });
    }
    return rejectWithValue({ message: "Registration failed" });
  }
});

const initialState: RegisterState = {
  user: null,
  isLoading: false,
  error: null,
};

const registerSlice = createSlice({
  name: "register",
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
        state.user = {
          fullName: (action.payload as { fullName?: string }).fullName ?? "",
          email: (action.payload as { email?: string }).email ?? "",
        };
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message ?? "Registration failed.";
      });
  },
});

export default registerSlice.reducer;
