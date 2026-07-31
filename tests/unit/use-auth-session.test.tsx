import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useAuthSession } from "@/features/auth/use-auth-session";

const mockUserRef: { current: { email: string; password: string } | null } = {
  current: null,
};

vi.mock("@/store/hooks", () => ({
  useAppSelector: () => ({
    user: mockUserRef.current,
    isLoading: false,
    error: null,
  }),
}));

vi.mock("@/lib/auth/token-storage", () => ({
  getAuthToken: vi.fn(),
  setAuthToken: vi.fn(),
  clearAuthToken: vi.fn(),
}));

import { getAuthToken } from "@/lib/auth/token-storage";

function makeJwt(email: string): string {
  const payload = Buffer.from(JSON.stringify({ email }))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return `header.${payload}.signature`;
}

describe("useAuthSession", () => {
  beforeEach(() => {
    mockUserRef.current = null;
    (getAuthToken as unknown as ReturnType<typeof vi.fn>).mockReturnValue(null);
  });

  it("derives email from token when Redux user is null (reload case)", () => {
    (getAuthToken as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      makeJwt("user@example.com")
    );
    const { result } = renderHook(() => useAuthSession());
    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.user?.email).toBe("user@example.com");
  });

  it("uses token-derived email even when Redux user differs (single source of truth)", () => {
    mockUserRef.current = { email: "redux@example.com", password: "x" };
    (getAuthToken as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      makeJwt("token@example.com")
    );
    const { result } = renderHook(() => useAuthSession());
    expect(result.current.user?.email).toBe("token@example.com");
  });

  it("returns logged-out state when no token", () => {
    const { result } = renderHook(() => useAuthSession());
    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it("treats an un-decodable token as logged out (no email)", () => {
    (getAuthToken as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      "not-a-jwt"
    );
    const { result } = renderHook(() => useAuthSession());
    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.user).toBeNull();
  });
});
