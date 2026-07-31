"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MusicTrack } from "@/features/music/music-types";

interface MusicCardProps {
  track: MusicTrack;
  avatarUrl: string;
  onSelect: (track: MusicTrack) => void;
  onToggleLike: (musicId: string) => void;
  isLikePending?: boolean;
  className?: string;
}

const FALLBACK_AVATAR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlNWU3ZWIiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNTAiIHI9IjYwIiBmaWxsPSIjOWNhM2FmIi8+PHBhdGggZD0iTTEwMCAzMzBhNjAgNjAgMCAwIDEgNjAtNjBoODBhNjAgNjAgMCAwIDEgNjAgNjB2MjBIMTAwdi0yMHoiIGZpbGw9IiM5Y2EzYWYiLz48L3N2Zz4=";

export function MusicCard({
  track,
  avatarUrl,
  onSelect,
  onToggleLike,
  isLikePending = false,
  className,
}: MusicCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Card
      className={cn(
        "group/card cursor-pointer overflow-hidden transition-shadow hover:shadow-md",
        className
      )}
    >
      <div onClick={() => onSelect(track)}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={imgError ? FALLBACK_AVATAR : avatarUrl}
            alt={track.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover transition-transform group-hover/card:scale-105"
            unoptimized
            onError={() => setImgError(true)}
          />
        </div>
      </div>
      <CardContent className="p-3">
        <h3
          className="truncate font-medium text-foreground cursor-pointer"
          onClick={() => onSelect(track)}
        >
          {track.title}
        </h3>
        <p
          className="truncate text-sm text-muted-foreground cursor-pointer"
          onClick={() => onSelect(track)}
        >
          {track.artist}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            aria-label={track.likedByUser ? `Bỏ thích "${track.title}"` : `Thích "${track.title}"`}
            onClick={() => onToggleLike(track.id)}
            disabled={isLikePending}
          >
            <HeartIcon
              className={cn(
                "size-4",
                track.likedByUser && "fill-destructive text-destructive"
              )}
            />
            <span className="text-sm">{track.likes}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
