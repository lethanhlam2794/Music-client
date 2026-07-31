import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MusicCard } from "@/components/music/MusicCard";
import type { MusicTrack } from "@/features/music/music-types";

const track: MusicTrack = {
  id: "1",
  title: "Song",
  artist: "Artist",
  likes: 3,
  likedByUser: false,
};

describe("MusicCard", () => {
  it("renders title and artist", () => {
    render(
      <MusicCard track={track} avatarUrl="" onSelect={() => {}} onToggleLike={() => {}} />
    );
    expect(screen.getByText("Song")).toBeInTheDocument();
    expect(screen.getByText("Artist")).toBeInTheDocument();
  });

  it("calls onToggleLike with the track id", () => {
    const onToggleLike = vi.fn();
    render(
      <MusicCard
        track={track}
        avatarUrl=""
        onSelect={() => {}}
        onToggleLike={onToggleLike}
      />
    );
    screen.getByRole("button", { name: /Thích "Song"/ }).click();
    expect(onToggleLike).toHaveBeenCalledWith("1");
  });

  it("calls onSelect with the track when title clicked", () => {
    const onSelect = vi.fn();
    render(
      <MusicCard track={track} avatarUrl="" onSelect={onSelect} onToggleLike={() => {}} />
    );
    screen.getByText("Song").click();
    expect(onSelect).toHaveBeenCalledWith(track);
  });
});
