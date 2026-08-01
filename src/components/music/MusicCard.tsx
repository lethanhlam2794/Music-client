"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeartIcon, Play, Music2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MusicTrack } from "@/features/music/music-types";

interface MusicCardProps {
  track: MusicTrack;
  avatarUrl: string;
  onSelect: (track: MusicTrack) => void;
  onToggleLike: (musicId: string) => void;
  isLikePending?: boolean;
  isPlaying?: boolean;
  className?: string;
}

const FALLBACK_AVATAR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiMxZTI5M2IiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNTAiIHI9IjYwIiBmaWxsPSIjNDc1NTY5Ii8+PHBhdGggZD0iTTEwMCAzMzBhNjAgNjAgMCAwIDEgNjAtNjBoODBhNjAgNjAgMCAwIDEgNjAgNjB2MjBIMTAwdi0yMHoiIGZpbGw9IiM0NzU1NjkiLz48L3N2Zz4=";

export function MusicCard({
  track,
  avatarUrl,
  onSelect,
  onToggleLike,
  isLikePending = false,
  isPlaying = false,
  className,
}: MusicCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl glass-panel glass-panel-hover p-3 transition-all duration-300 hover:-translate-y-1.5",
        isPlaying && "border-violet-500/60 shadow-lg shadow-violet-500/20 bg-violet-950/20",
        className
      )}
    >
      {/* Album Artwork Wrapper */}
      <div
        className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-900 cursor-pointer shadow-md"
        onClick={() => onSelect(track)}
      >
        <Image
          src={imgError ? FALLBACK_AVATAR : avatarUrl}
          alt={track.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          className={cn(
            "object-cover transition-transform duration-500 group-hover:scale-110",
            isPlaying && "scale-105"
          )}
          unoptimized
          onError={() => setImgError(true)}
        />

        {/* Dark Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="size-12 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-violet-600/40 scale-75 group-hover:scale-105 transition-transform duration-300">
            <Play className="h-5 w-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Active Track Playing Equalizer Badge */}
        {isPlaying && (
          <div className="absolute bottom-2.5 right-2.5 glass-panel px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg bg-violet-950/80 border-violet-500/40">
            <div className="flex items-end gap-0.5 h-3.5">
              <span className="w-0.5 bg-violet-400 rounded-full animate-bar-1" />
              <span className="w-0.5 bg-indigo-400 rounded-full animate-bar-2" />
              <span className="w-0.5 bg-emerald-400 rounded-full animate-bar-3" />
            </div>
            <span className="text-[10px] font-bold text-violet-300 uppercase tracking-wider">Đang phát</span>
          </div>
        )}

        {/* Genre Pill Tag if available */}
        {track.tag && (
          <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-medium text-white/90 border border-white/10">
            {track.tag}
          </div>
        )}
      </div>

      {/* Track Details Content */}
      <div className="mt-3 flex flex-col flex-1 justify-between gap-1">
        <div>
          <h3
            className="truncate font-semibold text-sm text-foreground cursor-pointer group-hover:text-violet-400 transition-colors"
            onClick={() => onSelect(track)}
            title={track.title}
          >
            {track.title}
          </h3>
          <p
            className="truncate text-xs text-muted-foreground cursor-pointer hover:underline"
            onClick={() => onSelect(track)}
            title={track.artist}
          >
            {track.artist}
          </p>
        </div>

        {/* Footer Actions (Like button & count) */}
        <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-7 px-2.5 gap-1.5 rounded-full text-xs hover:bg-white/10 transition-transform active:scale-90",
              track.likedByUser ? "text-rose-500 font-semibold" : "text-muted-foreground"
            )}
            aria-label={track.likedByUser ? `Bỏ thích "${track.title}"` : `Thích "${track.title}"`}
            onClick={() => onToggleLike(track.id)}
            disabled={isLikePending}
          >
            <HeartIcon
              className={cn(
                "size-3.5 transition-colors",
                track.likedByUser && "fill-rose-500 text-rose-500"
              )}
            />
            <span>{track.likes}</span>
          </Button>

          <div className="text-[10px] text-muted-foreground/60 flex items-center gap-1 font-mono">
            <Music2 className="size-3" />
            <span>MP3</span>
          </div>
        </div>
      </div>
    </div>
  );
}

