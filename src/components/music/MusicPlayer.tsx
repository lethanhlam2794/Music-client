"use client";

import { useState } from "react";
import { useAudioPlayer, formatTime } from "@/features/player";
import type { PlayerTrack } from "@/features/player";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  VolumeX,
  FileText,
  ListMusic,
  Disc,
  Sparkles,
  X,
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

  const [showQueue, setShowQueue] = useState(false);
  const { isPlaying, isLoading, volume, currentTime, duration, isRepeat, isShuffle, showLyrics } = state;

  if (!currentTrack) return null;

  return (
    <div className="relative w-full text-foreground">
      <audio ref={audioRef} src="" preload="auto" />

      {/* Main 3-Column Player Layout */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-2 py-1">
        {/* Left Column: Track Info */}
        <div className="flex items-center gap-3 w-full md:w-1/4 min-w-0">
          <div className="relative size-11 md:size-12 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-md shadow-violet-500/20 overflow-hidden group">
            <Disc className={cn("h-6 w-6 text-white", isPlaying && "animate-spin-slow")} />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                <div className="flex items-end gap-0.5 h-4">
                  <span className="w-0.5 bg-violet-300 rounded-full animate-bar-1" />
                  <span className="w-0.5 bg-indigo-300 rounded-full animate-bar-2" />
                  <span className="w-0.5 bg-emerald-300 rounded-full animate-bar-3" />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <h4 className="text-xs md:text-sm font-bold text-white truncate hover:underline cursor-pointer">
              {currentTrack.title}
            </h4>
            <p className="text-[11px] text-muted-foreground truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Middle Column: Playback Controls & Progress Slider */}
        <div className="flex flex-col items-center justify-center w-full md:w-2/4 gap-1.5">
          {/* Controls */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-7 w-7 rounded-full text-muted-foreground hover:text-white transition-colors",
                isShuffle && "text-violet-400 bg-violet-500/10"
              )}
              onClick={actions.toggleShuffle}
              aria-label="Ngẫu nhiên"
            >
              <Shuffle className="h-3.5 w-3.5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:text-white hover:bg-white/10"
              onClick={actions.previous}
              aria-label="Bài trước"
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              variant="default"
              size="icon"
              className="h-10 w-10 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30 hover:scale-105 transition-transform"
              onClick={actions.togglePlayPause}
              aria-label={isPlaying ? "Tạm dừng" : "Phát"}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-current" />
              ) : (
                <Play className="h-4 w-4 fill-current ml-0.5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:text-white hover:bg-white/10"
              onClick={actions.next}
              aria-label="Bài tiếp"
            >
              <SkipForward className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-7 w-7 rounded-full text-muted-foreground hover:text-white transition-colors",
                isRepeat && "text-violet-400 bg-violet-500/10"
              )}
              onClick={actions.toggleRepeat}
              aria-label="Lặp lại"
            >
              <Repeat className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Custom Seekbar Slider */}
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-[10px] font-mono text-muted-foreground w-8 text-right">
              {formatTime(currentTime)}
            </span>
            <div className="relative flex-1 flex items-center group">
              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={currentTime}
                onChange={(e) => actions.seek(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 hover:bg-white/20 rounded-full appearance-none cursor-pointer accent-violet-500 transition-all"
                aria-label="Tiến trình phát"
              />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground w-8">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right Column: Volume & Toggles */}
        <div className="hidden md:flex items-center justify-end gap-3 w-1/4">
          {/* Volume Control */}
          <div className="flex items-center gap-2 group">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full text-muted-foreground hover:text-white"
              onClick={() => actions.setVolume(volume === 0 ? 0.8 : 0)}
            >
              {volume === 0 ? (
                <VolumeX className="h-4 w-4 text-rose-400" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => actions.setVolume(Number(e.target.value))}
              className="w-16 h-1 bg-white/10 hover:bg-white/20 rounded-full appearance-none cursor-pointer accent-violet-500"
              aria-label="Âm lượng"
            />
          </div>

          {/* Lyrics Toggle Button */}
          {currentTrack.lyrics && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full transition-colors",
                showLyrics ? "bg-violet-600 text-white" : "text-muted-foreground hover:text-white"
              )}
              onClick={actions.toggleLyrics}
              title="Lời bài hát"
            >
              <FileText className="h-4 w-4" />
            </Button>
          )}

          {/* Queue Toggle Button */}
          {playlist.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full transition-colors",
                showQueue ? "bg-violet-600 text-white" : "text-muted-foreground hover:text-white"
              )}
              onClick={() => setShowQueue(!showQueue)}
              title="Danh sách phát"
            >
              <ListMusic className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Lyrics Popup View */}
      {showLyrics && currentTrack.lyrics && (
        <div className="absolute bottom-20 right-0 left-0 md:left-auto md:w-96 glass-panel rounded-3xl p-5 border border-white/15 shadow-2xl animate-in fade-in slide-in-from-bottom-3 max-h-72 overflow-y-auto">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-violet-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Lời Bài Hát</h4>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={actions.toggleLyrics}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap font-sans">
            {currentTrack.lyrics}
          </p>
        </div>
      )}

      {/* Queue Drawer Popup */}
      {showQueue && playlist.length > 1 && (
        <div className="absolute bottom-20 right-0 left-0 md:left-auto md:w-80 glass-panel rounded-3xl p-4 border border-white/15 shadow-2xl animate-in fade-in slide-in-from-bottom-3 max-h-72 overflow-y-auto">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <ListMusic className="h-4 w-4 text-violet-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Hàng Chờ Phát</h4>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={() => setShowQueue(false)}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
          <ul className="space-y-1.5">
            {playlist.map((track, idx) => (
              <li
                key={`${track.id}-${idx}`}
                onClick={() => actions.setTrack(idx)}
                className={cn(
                  "flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-colors",
                  idx === currentIndex
                    ? "bg-violet-600/30 text-white font-bold border border-violet-500/30"
                    : "hover:bg-white/5 text-muted-foreground hover:text-white"
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[10px] w-4 text-muted-foreground font-mono">{idx + 1}</span>
                  <span className="truncate">{track.title}</span>
                </div>
                <span className="text-[10px] opacity-70 truncate max-w-[80px]">{track.artist}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MusicPlayer;