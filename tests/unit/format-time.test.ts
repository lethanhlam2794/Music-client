import { describe, it, expect } from "vitest";
import { formatTime, formatTimeLong } from "@/features/player/format-time";

describe("formatTime", () => {
  it("returns 0:00 for invalid/negative/zero input", () => {
    expect(formatTime(NaN)).toBe("0:00");
    expect(formatTime(-5)).toBe("0:00");
    expect(formatTime(0)).toBe("0:00");
  });

  it("formats minutes:seconds with padded seconds", () => {
    expect(formatTime(3)).toBe("0:03");
    expect(formatTime(65)).toBe("1:05");
    expect(formatTime(225)).toBe("3:45");
  });
});

describe("formatTimeLong", () => {
  it("returns 0:00:00 for invalid input", () => {
    expect(formatTimeLong(NaN)).toBe("0:00:00");
  });

  it("formats hours for long durations", () => {
    expect(formatTimeLong(3725)).toBe("1:02:05");
  });

  it("falls back to MM:SS under one hour", () => {
    expect(formatTimeLong(225)).toBe("3:45");
  });
});
