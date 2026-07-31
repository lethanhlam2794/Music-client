import { describe, it, expect, beforeEach } from "vitest";
import {
  getAuthToken,
  setAuthToken,
  clearAuthToken,
} from "@/lib/auth/token-storage";

describe("token-storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("stores and retrieves a token", () => {
    setAuthToken("abc.token");
    expect(getAuthToken()).toBe("abc.token");
  });

  it("clears a token", () => {
    setAuthToken("abc.token");
    clearAuthToken();
    expect(getAuthToken()).toBeNull();
  });

  it("returns null after clearing when never set", () => {
    expect(getAuthToken()).toBeNull();
  });
});
