import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, type LoginPayload } from "@/features/auth/auth-api";
import { setAuthToken } from "@/lib/auth/token-storage";

interface User {
  email: string;
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

export const loginUser = createAsyncThunk<
  User,
  LoginPayload,
  { rejectValue: ErrorResponse }
>("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await login(userData);
    const token: string | undefined =
      response.data?.accessToken || response.accessToken;
    if (token) {
      setAuthToken(token);
    }
    return { email: (response as { email?: string }).email ?? "" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue({ message: error.message });
    }
    return rejectWithValue({ message: "Login failed" });
  }
});

const initialState: LoginState = {
  user: null,
  isLoading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
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
        state.error = action.payload?.message ?? "Login failed.";
      });
  },
});

export default loginSlice.reducer;
