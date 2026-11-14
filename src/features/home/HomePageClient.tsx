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
import { Flame, Compass, Sparkles, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const GENRE_TAGS = ["Tất cả", "Pop", "Ballad", "Rock", "Lofi", "EDM", "HipHop"];

export function HomePageClient() {
  const router = useRouter();
  const [selectedMusic, setSelectedMusic] = useState<MusicTrack | null>(null);
  const [activeTag, setActiveTag] = useState<string>("Tất cả");
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

  const filteredTracks = activeTag === "Tất cả"
    ? tracks
    : tracks.filter((t) => t.genre?.toLowerCase() === activeTag.toLowerCase());

  return (
    <div className="min-h-screen bg-transparent pb-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Hero Section Banner */}
        <MusicHero
          title="Chào mừng đến với thế giới âm nhạc"
          description="Khám phá hàng triệu bài hát, album và nghệ sĩ yêu thích với chất lượng âm thanh cao cấp đỉnh cao."
        >
          <Button
            size="lg"
            className="rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 px-8 font-bold text-white shadow-lg shadow-violet-600/40 hover:shadow-violet-600/60 hover:scale-105 transition-all duration-300 gap-2 btn-shimmer glow-violet"
            onClick={() => router.push("/tag")}
          >
            <Compass className="h-4 w-4" />
            Khám phá thể loại
          </Button>
        </MusicHero>

        {/* Music Section */}
        <section className="py-10 animate-fade-in-up animate-delay-200">
          {/* Section Title & Tag Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-2xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 glow-violet-pulse">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  <span className="text-gradient">Phát Hành Mới</span>
                </h2>
                <p className="text-xs text-muted-foreground">
                  Những bản nhạc hot nhất vừa được tải lên
                </p>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {GENRE_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 border",
                    activeTag === tag
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-violet-500/50 shadow-lg shadow-violet-500/30 glow-violet"
                      : "bg-white/5 text-muted-foreground border-white/10 hover:text-white hover:bg-white/10 hover:border-white/20"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Tracks Grid */}
          <MusicListState loading={loading} error={error} isEmpty={!loading && filteredTracks.length === 0}>
            <MusicGrid>
              {filteredTracks.map((track) => (
                <MusicCard
                  key={track.id}
                  track={track}
                  avatarUrl={getAvatarUrl(track.id)}
                  onSelect={handleSelect}
                  onToggleLike={handleLikeToggle}
                  isLikePending={isPending}
                  isPlaying={selectedMusic?.id === track.id}
                />
              ))}
            </MusicGrid>
          </MusicListState>
        </section>
      </div>

      {/* Fixed Now Playing Bar */}
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

      {/* Login Prompt Dialog */}
      <Dialog open={requiresLogin} onOpenChange={(open) => { if (!open) dismissLoginPrompt(); }}>
        <DialogContent className="glass-panel border-white/10 text-foreground">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gradient">Vui lòng đăng nhập</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Bạn cần đăng nhập tài khoản để có thể thả tim và lưu bài hát yêu thích.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" className="rounded-full text-xs" onClick={dismissLoginPrompt}>
              Để sau
            </Button>
            <Button
              className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-semibold text-white shadow-lg"
              onClick={() => { dismissLoginPrompt(); router.push("/login"); }}
            >
              Đăng nhập ngay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}