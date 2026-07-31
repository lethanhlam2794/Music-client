import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLikeToggle } from "@/features/music/use-like-toggle";

vi.mock("@/features/music/music-api", () => ({
  toggleLike: vi.fn(),
}));
vi.mock("@/lib/auth/token-storage", () => ({
  getAuthToken: vi.fn(),
  setAuthToken: vi.fn(),
  clearAuthToken: vi.fn(),
}));

import { toggleLike } from "@/features/music/music-api";
import { getAuthToken } from "@/lib/auth/token-storage";

describe("useLikeToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (getAuthToken as unknown as ReturnType<typeof vi.fn>).mockReturnValue(null);
  });

  it("prompts login and does not call API when unauthenticated", async () => {
    const { result } = renderHook(() => useLikeToggle());
    let returned = -1;
    await act(async () => {
      returned = await result.current.toggle("123");
    });
    expect(returned).toBeNull();
    expect(result.current.requiresLogin).toBe(true);
    expect(toggleLike).not.toHaveBeenCalled();
  });

  it("calls toggleLike and returns the new count when authenticated", async () => {
    (getAuthToken as unknown as ReturnType<typeof vi.fn>).mockReturnValue("token");
    (toggleLike as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(42);
    const { result } = renderHook(() => useLikeToggle());
    let returned = -1;
    await act(async () => {
      returned = await result.current.toggle("123");
    });
    expect(toggleLike).toHaveBeenCalledWith("123");
    expect(returned).toBe(42);
  });

  it("returns null on API error", async () => {
    (getAuthToken as unknown as ReturnType<typeof vi.fn>).mockReturnValue("token");
    (toggleLike as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("fail")
    );
    const { result } = renderHook(() => useLikeToggle());
    let returned = -1;
    await act(async () => {
      returned = await result.current.toggle("123");
    });
    expect(returned).toBeNull();
  });
});
