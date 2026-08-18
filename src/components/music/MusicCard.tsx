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
        "group relative flex flex-col overflow-hidden rounded-2xl glass-panel glass-panel-hover p-3 transition-all duration-400 hover:-translate-y-2",
        isPlaying && "border-violet-500/50 glow-violet bg-violet-950/30",
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
            "object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75",
            isPlaying && "scale-105 brightness-90"
          )}
          unoptimized
          onError={() => setImgError(true)}
        />

        {/* Hover Overlay with Play Button */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center">
          <div className="size-14 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-xl glow-violet scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out">
            <Play className="h-6 w-6 fill-current ml-0.5" />
          </div>
        </div>

        {/* Active Track Equalizer Badge */}
        {isPlaying && (
          <div className="absolute bottom-2.5 right-2.5 glass-panel px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg bg-violet-950/80 border-violet-500/40">
            <div className="flex items-end gap-[2px] h-4">
              <span className="w-[3px] bg-violet-400 rounded-full animate-bar-1" />
              <span className="w-[3px] bg-indigo-400 rounded-full animate-bar-2" />
              <span className="w-[3px] bg-emerald-400 rounded-full animate-bar-3" />
              <span className="w-[3px] bg-fuchsia-400 rounded-full animate-bar-4" />
            </div>
            <span className="text-[10px] font-bold text-violet-300 uppercase tracking-wider">Đang phát</span>
          </div>
        )}

        {/* Genre Pill */}
        {track.genre && (
          <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-xl px-2.5 py-1 rounded-lg text-[10px] font-semibold text-white/90 border border-white/10">
            {track.genre}
          </div>
        )}
      </div>

      {/* Track Details */}
      <div className="mt-3 flex flex-col flex-1 justify-between gap-1">
        <div>
          <h3
            className={cn(
              "truncate font-semibold text-sm cursor-pointer transition-colors duration-300",
              isPlaying ? "text-violet-400" : "text-foreground group-hover:text-violet-400"
            )}
            onClick={() => onSelect(track)}
            title={track.title}
          >
            {track.title}
          </h3>
          <p
            className="truncate text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            onClick={() => onSelect(track)}
            title={track.artist}
          >
            {track.artist}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-7 px-2.5 gap-1.5 rounded-full text-xs hover:bg-white/10 transition-all active:scale-90",
              track.likedByUser ? "text-rose-500 font-semibold" : "text-muted-foreground"
            )}
            aria-label={track.likedByUser ? `Bỏ thích "${track.title}"` : `Thích "${track.title}"`}
            onClick={() => onToggleLike(track.id)}
            disabled={isLikePending}
          >
            <HeartIcon
              className={cn(
                "size-3.5 transition-all duration-300",
                track.likedByUser && "fill-rose-500 text-rose-500 scale-110"
              )}
            />
            <span>{track.likes}</span>
          </Button>

          <div className="text-[10px] text-muted-foreground/50 flex items-center gap-1 font-mono">
            <Music2 className="size-3" />
            <span>MP3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
