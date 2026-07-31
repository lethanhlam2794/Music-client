"use client";

import { useAudioPlayer, formatTime } from "@/features/player";
import type { PlayerTrack } from "@/features/player";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  ChevronDown,
  ChevronUp,
  Plus,
  Music,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MusicPlayerProps {
  initialPlaylist: PlayerTrack[];
  suggestedSongs: PlayerTrack[];
  initialMusicIndex: number;
}

export function MusicPlayer({
  initialPlaylist,
  suggestedSongs,
  initialMusicIndex,
}: MusicPlayerProps) {
  const {
    audioRef,
    state,
    currentTrack,
    playlist,
    currentIndex,
    actions,
  } = useAudioPlayer({
    initialPlaylist,
    initialIndex: initialMusicIndex,
  });

  const { isPlaying, isLoading, volume, currentTime, duration, isRepeat, isShuffle, showLyrics } = state;

  if (!currentTrack) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Music className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Danh sách phát trống.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-center">
          {currentTrack.title}
        </CardTitle>
        <p className="text-sm text-center text-muted-foreground">
          by {currentTrack.artist}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="text-center py-4">
            <p className="text-muted-foreground">Đang tải nhạc...</p>
          </div>
        ) : (
          <>
            <audio ref={audioRef} src="" preload="auto" />

            {/* Playback controls */}
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={actions.previous}
                aria-label="Bài trước"
              >
                <SkipBack className="h-5 w-5" />
              </Button>

              <Button
                variant="default"
                size="icon"
                className="h-12 w-12"
                onClick={actions.togglePlayPause}
                aria-label={isPlaying ? "Tạm dừng" : "Phát"}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={actions.next}
                aria-label="Bài tiếp"
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>

            {/* Progress bar */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-10 text-right">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  step="0.1"
                  value={currentTime}
                  onChange={(e) => actions.seek(Number(e.target.value))}
                  className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  aria-label="Tiến trình phát"
                />
                <span className="text-xs text-muted-foreground w-10">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Volume and options */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => actions.setVolume(Number(e.target.value))}
                  className="w-20 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  aria-label="Âm lượng"
                />
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant={isRepeat ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={actions.toggleRepeat}
                  aria-label="Lặp lại"
                  aria-pressed={isRepeat}
                >
                  <Repeat className="h-4 w-4" />
                </Button>

                <Button
                  variant={isShuffle ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={actions.toggleShuffle}
                  aria-label="Ngẫu nhiên"
                  aria-pressed={isShuffle}
                >
                  <Shuffle className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Lyrics section */}
            {currentTrack.lyrics && (
              <div className="border-t pt-3">
                <button
                  className="flex items-center justify-between w-full text-sm font-medium"
                  onClick={actions.toggleLyrics}
                  aria-expanded={showLyrics}
                >
                  <span>Lời bài hát</span>
                  {showLyrics ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {showLyrics && (
                  <pre className="mt-2 text-sm whitespace-pre-wrap text-muted-foreground max-h-40 overflow-y-auto">
                    {currentTrack.lyrics}
                  </pre>
                )}
              </div>
            )}
          </>
        )}

        {/* Playlist */}
        {playlist.length > 1 && (
          <div className="border-t pt-3">
            <h3 className="text-sm font-semibold mb-2">Danh sách phát</h3>
            <ul className="space-y-1 max-h-32 overflow-y-auto">
              {playlist.map((track, index) => (
                <li
                  key={`${track.id}-${index}`}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1 rounded cursor-pointer text-sm",
                    index === currentIndex
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-muted"
                  )}
                  onClick={() => actions.setTrack(index)}
                >
                  <Music className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">
                    {track.title} - {track.artist}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Suggested songs */}
        {suggestedSongs.length > 0 && (
          <div className="border-t pt-3">
            <h3 className="text-sm font-semibold mb-2">Gợi ý nhạc</h3>
            <ul className="space-y-1 max-h-32 overflow-y-auto">
              {suggestedSongs.map((track) => (
                <li
                  key={track.id}
                  className="flex items-center justify-between gap-2 px-2 py-1 rounded hover:bg-muted text-sm"
                >
                  <span className="truncate">
                    {track.title} - {track.artist}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 flex-shrink-0"
                    onClick={() => actions.addToPlaylist(track)}
                    aria-label={`Thêm ${track.title} vào danh sách`}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default MusicPlayer;