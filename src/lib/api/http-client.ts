import axios, { AxiosError } from "axios";
import { apiBaseUrl } from "@/lib/config/env";
import { getAuthToken } from "@/lib/auth/token-storage";

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

function normalizeError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    return {
      message: error.response?.data?.message || error.message || "Request failed",
      status: error.response?.status || 500,
      code: error.response?.data?.code,
    };
  }
  if (error instanceof Error) {
    return { message: error.message, status: 500 };
  }
  return { message: "Unknown error", status: 500 };
}

const httpClient = axios.create({
  baseURL: apiBaseUrl,
  headers: { "Content-Type": "application/json" },
});

httpClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { httpClient, normalizeError };
