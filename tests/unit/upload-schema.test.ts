import { describe, it, expect } from "vitest";
import { uploadSchema } from "@/features/music/upload/upload-schema";

function makeFile(type: string, size = 100, name = "x") {
  return new File([new ArrayBuffer(size)], name, { type });
}

describe("uploadSchema", () => {
  const base = {
    title: "Song",
    artist: "A",
    genre: "Pop",
    lyrics: "",
    file: makeFile("audio/mpeg"),
    avatar: makeFile("image/png"),
  };

  it("accepts a valid payload", () => {
    const result = uploadSchema.safeParse(base);
    expect(result.success).toBe(true);
  });

  it("rejects missing required text fields", () => {
    const result = uploadSchema.safeParse({
      ...base,
      title: "",
      artist: "",
      genre: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects unsupported audio type", () => {
    const result = uploadSchema.safeParse({
      ...base,
      file: makeFile("audio/xyz"),
    });
    expect(result.success).toBe(false);
  });

  it("rejects oversized audio", () => {
    const result = uploadSchema.safeParse({
      ...base,
      file: makeFile("audio/mpeg", 60 * 1024 * 1024),
    });
    expect(result.success).toBe(false);
  });

  it("rejects unsupported image type", () => {
    const result = uploadSchema.safeParse({
      ...base,
      avatar: makeFile("image/bmp"),
    });
    expect(result.success).toBe(false);
  });
});
