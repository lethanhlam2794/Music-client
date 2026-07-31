import { httpClient } from "@/lib/api/http-client";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

export async function login(payload: LoginPayload) {
  const response = await httpClient.post("/auth/login", payload);
  return response.data;
}

export async function register(payload: RegisterPayload) {
  const response = await httpClient.post("/auth/register", payload);
  return response.data;
}
