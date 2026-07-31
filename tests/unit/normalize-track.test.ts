import { describe, it, expect } from "vitest";
import { normalizeTrack, normalizeTracks } from "@/features/music/music-types";

describe("normalizeTrack", () => {
  it("fills defaults for missing optional fields", () => {
    const track = normalizeTrack({ id: "1", title: "T", artist: "A" });
    expect(track.likes).toBe(0);
    expect(track.likedByUser).toBe(false);
    expect(track.lyrics).toBeUndefined();
  });

  it("preserves provided values", () => {
    const track = normalizeTrack({
      id: "1",
      title: "T",
      artist: "A",
      likes: 5,
      likedByUser: true,
      lyrics: "x",
      genre: "Pop",
    });
    expect(track.likes).toBe(5);
    expect(track.likedByUser).toBe(true);
    expect(track.lyrics).toBe("x");
    expect(track.genre).toBe("Pop");
  });

  it("normalizes a list", () => {
    const list = normalizeTracks([{ id: "1", title: "T", artist: "A" }]);
    expect(list).toHaveLength(1);
    expect(list[0].likes).toBe(0);
  });
});
