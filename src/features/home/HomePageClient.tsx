"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAvatarUrl } from "@/features/music/music-api";
import { useMusicList } from "@/features/music/use-music-list";
import { useLikeToggle } from "@/features/music/use-like-toggle";
import { getRecentMusic } from "@/features/music/music-api";
import type { MusicTrack } from "@/features/music/music-types";
import { MusicHero } from "@/components/music/MusicHero";
import { MusicGrid } from "@/components/music/MusicGrid";
import { MusicCard } from "@/components/music/MusicCard";
import { MusicListState } from "@/components/music/MusicListState";
import { NowPlayingBar } from "@/components/music/NowPlayingBar";
import MusicPlayer from "@/components/music/MusicPlayer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export function HomePageClient() {
  const router = useRouter();
  const [selectedMusic, setSelectedMusic] = useState<MusicTrack | null>(null);
  const { tracks, loading, error, updateTrack } = useMusicList(getRecentMusic, []);
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
        title="Chào mừng đến với thế giới âm nhạc"
        description="Khám phá hàng triệu bài hát, album và nghệ sĩ yêu thích của bạn."
      >
        <Button className="mt-4" variant="secondary" onClick={() => router.push("/tag")}>
          Khám phá ngay
        </Button>
      </MusicHero>

      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-foreground mb-8">Phát hành mới</h2>
        <MusicListState loading={loading} error={error} isEmpty={!loading && tracks.length === 0}>
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