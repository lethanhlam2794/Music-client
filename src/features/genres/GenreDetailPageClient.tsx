"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getMusicByGenre, getAvatarUrl } from "@/features/music/music-api";
import { useMusicList } from "@/features/music/use-music-list";
import { useLikeToggle } from "@/features/music/use-like-toggle";
import type { MusicTrack } from "@/features/music/music-types";
import { decodeGenreParam } from "./genres";
import { MusicHero } from "@/components/music/MusicHero";
import { MusicGrid } from "@/components/music/MusicGrid";
import { MusicCard } from "@/components/music/MusicCard";
import { MusicListState } from "@/components/music/MusicListState";
import { NowPlayingBar } from "@/components/music/NowPlayingBar";
import MusicPlayer from "@/components/music/MusicPlayer";
import { GenreTileGrid } from "@/components/music/GenreTileGrid";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface GenreDetailPageClientProps {
  genre: string;
}

export function GenreDetailPageClient({ genre }: GenreDetailPageClientProps) {
  const router = useRouter();
  const [selectedMusic, setSelectedMusic] = useState<MusicTrack | null>(null);
  const decodedGenre = decodeGenreParam(genre);

  const { tracks, loading, error, updateTrack } = useMusicList(
    () => getMusicByGenre(genre),
    [genre]
  );
  const { toggle, isPending, requiresLogin, dismissLoginPrompt } = useLikeToggle();

  const handleSelect = (track: MusicTrack) => {
    setSelectedMusic(track);
  };

  const handleLikeToggle = async (musicId: string) => {
    const result = await toggle(musicId);
    if (result !== null) {
      updateTrack(musicId, {
        likes: result,
        likedByUser: !tracks.find((t) => t.id === musicId)?.likedByUser,
      });
    }
  };

  return (
    <div className="bg-background">
      <MusicHero
        title={`Thể loại: ${decodedGenre}`}
        description={`Khám phá các bài hát hay nhất trong thể loại ${decodedGenre}.`}
      />

      <section className="container mx-auto py-12">
        <MusicListState
          loading={loading}
          error={error}
          isEmpty={!loading && tracks.length === 0}
          emptyMessage={`Không có bài hát nào thuộc thể loại ${decodedGenre}.`}
          fallback={
            <div>
              <p className="text-center text-muted-foreground my-8">
                Không có bài hát nào thuộc thể loại {decodedGenre}.
              </p>
              <GenreTileGrid />
            </div>
          }
        >
          <>
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Danh sách bài hát
            </h2>
            <MusicGrid>
              {tracks.map((track) => (
                <MusicCard
                  key={track.id}
                  track={track}
                  avatarUrl={getAvatarUrl(track.id)}
                  onSelect={handleSelect}
                  onToggleLike={handleLikeToggle}
                  isLikePending={isPending}
                />
              ))}
            </MusicGrid>
          </>
        </MusicListState>
      </section>

      {selectedMusic && (
        <NowPlayingBar>
          <MusicPlayer
            initialPlaylist={[
              {
                id: selectedMusic.id,
                title: selectedMusic.title,
                artist: selectedMusic.artist,
                lyrics: selectedMusic.lyrics || "",
              },
            ]}
            suggestedSongs={[]}
            initialMusicIndex={0}
          />
        </NowPlayingBar>
      )}

      <Dialog open={requiresLogin} onOpenChange={(open) => { if (!open) dismissLoginPrompt(); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vui lòng đăng nhập</DialogTitle>
            <DialogDescription>
              Bạn cần đăng nhập để thích bài hát này.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={dismissLoginPrompt}>
              Để sau
            </Button>
            <Button onClick={() => { dismissLoginPrompt(); router.push("/login"); }}>
              Đăng nhập
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}