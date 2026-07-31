"use client";

import { useAppSelector } from "@/store/hooks";
import { getAuthToken, clearAuthToken } from "@/lib/auth/token-storage";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  email?: string;
}

function decodeEmailFromToken(token: string | null): string | undefined {
  if (!token) return undefined;
  try {
    return jwtDecode<DecodedToken>(token).email;
  } catch {
    return undefined;
  }
}

// Single source of truth for the session is the auth token stored in
// localStorage. Redux `state.login` only carries transient login status
// (isLoading/error); the user identity is derived from the token so it
// survives reloads and stays consistent after logout.
export function useAuthSession() {
  const { isLoading, error } = useAppSelector((state) => state.login);

  const token = getAuthToken();
  const isLoggedIn = !!token;
  const email = decodeEmailFromToken(token);

  const logout = () => {
    clearAuthToken();
  };

  return {
    user: email ? { email } : null,
    isLoggedIn,
    isLoading,
    error,
    logout,
  };
}
