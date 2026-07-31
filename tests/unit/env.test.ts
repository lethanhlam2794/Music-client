import { describe, it, expect, vi } from "vitest";

describe("apiBaseUrl", () => {
  it("uses provided env value when set", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://api.example.com");
    vi.resetModules();
    const { apiBaseUrl } = await import("@/lib/config/env");
    expect(apiBaseUrl).toBe("https://api.example.com");
    vi.unstubAllEnvs();
  });

  it("falls back to local URL when env not set", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "");
    vi.resetModules();
    const { apiBaseUrl } = await import("@/lib/config/env");
    expect(apiBaseUrl).toContain("localhost:3002");
    vi.unstubAllEnvs();
  });
});
