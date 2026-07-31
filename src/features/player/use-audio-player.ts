"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { streamMusic } from "@/features/music/music-api";
import type { PlayerTrack, PlayerState, UseAudioPlayerReturn } from "./player-types";

interface UseAudioPlayerProps {
  initialPlaylist: PlayerTrack[];
  initialIndex?: number;
}

export function useAudioPlayer({
  initialPlaylist,
  initialIndex = 0,
}: UseAudioPlayerProps): UseAudioPlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playlist, setPlaylist] = useState<PlayerTrack[]>(initialPlaylist);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [state, setState] = useState<PlayerState>({
    isPlaying: false,
    isLoading: true,
    volume: 1,
    currentTime: 0,
    duration: 0,
    isRepeat: false,
    isShuffle: false,
    showLyrics: false,
  });

  const currentTrack = playlist[currentIndex] || null;

  // Update playlist and index when props change
  useEffect(() => {
    setPlaylist(initialPlaylist);
    setCurrentIndex(initialIndex);
  }, [initialPlaylist, initialIndex]);

  // Fetch audio stream when track changes
  useEffect(() => {
    let objectUrl: string | null = null;
    const controller = new AbortController();

    const fetchAudioStream = async () => {
      if (!currentTrack) return;

      setState((prev) => ({ ...prev, isLoading: true }));
      try {
        const audioBlob = await streamMusic(currentTrack.id, controller.signal);
        objectUrl = URL.createObjectURL(audioBlob);
        setAudioSrc(objectUrl);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Error fetching audio stream:", error);
      } finally {
        if (!controller.signal.aborted) {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      }
    };

    fetchAudioStream();

    // Cleanup: abort in-flight request and revoke object URL when track changes or unmount
    return () => {
      controller.abort();
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [currentTrack?.id]);

  // Auto-play when audio source is ready
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && audioSrc && !state.isPlaying) {
      const playAudio = async () => {
        try {
          await audio.play();
          setState((prev) => ({ ...prev, isPlaying: true }));
        } catch (error) {
          console.error("Error playing audio:", error);
          // Browser may block autoplay
        }
      };
      playAudio();
    }
  }, [audioSrc]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioMetadata = () => {
      setState((prev) => ({ ...prev, duration: audio.duration }));
    };

    const updateTime = () => {
      setState((prev) => ({ ...prev, currentTime: audio.currentTime }));
    };

    const handleEnded = () => {
      setState((prev) => ({ ...prev, isPlaying: false, currentTime: 0 }));
      if (state.isRepeat) {
        audio.play();
      } else {
        actionsRef.current.next();
      }
    };

    audio.addEventListener("loadedmetadata", setAudioMetadata);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", setAudioMetadata);
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioSrc, state.isRepeat]);

  // Actions
  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setState((prev) => ({ ...prev, isPlaying: true }));
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setState((prev) => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const next = useCallback(() => {
    if (playlist.length === 0) return;

    if (state.isShuffle) {
      const nextIndex = Math.floor(Math.random() * playlist.length);
      setCurrentIndex(nextIndex);
    } else {
      setCurrentIndex((prev) => (prev + 1) % playlist.length);
    }
  }, [playlist.length, state.isShuffle]);

  const previous = useCallback(() => {
    if (playlist.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  }, [playlist.length]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setState((prev) => ({ ...prev, currentTime: time }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    setState((prev) => ({ ...prev, volume }));
  }, []);

  const toggleRepeat = useCallback(() => {
    setState((prev) => ({ ...prev, isRepeat: !prev.isRepeat }));
  }, []);

  const toggleShuffle = useCallback(() => {
    setState((prev) => ({ ...prev, isShuffle: !prev.isShuffle }));
  }, []);

  const toggleLyrics = useCallback(() => {
    setState((prev) => ({ ...prev, showLyrics: !prev.showLyrics }));
  }, []);

  const setTrack = useCallback((index: number) => {
    if (index >= 0 && index < playlist.length) {
      setCurrentIndex(index);
    }
  }, [playlist.length]);

  const addToPlaylist = useCallback((track: PlayerTrack) => {
    setPlaylist((prev) => [...prev, track]);
  }, []);

  const actions = {
    play,
    pause,
    togglePlayPause,
    next,
    previous,
    seek,
    setVolume,
    toggleRepeat,
    toggleShuffle,
    toggleLyrics,
    setTrack,
    addToPlaylist,
  };

  // Keep a ref to the latest actions so the audio "ended" listener always
  // calls the current next/previous logic (avoids stale playlist/isShuffle).
  const actionsRef = useRef(actions);
  actionsRef.current = actions;

  return {
    audioRef,
    state,
    currentTrack,
    playlist,
    currentIndex,
    actions,
  };
}