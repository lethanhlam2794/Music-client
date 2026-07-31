"use client";

import { useState, useEffect, useCallback } from "react";
import { type MusicTrack, normalizeTracks, type RawMusicResponse } from "./music-types";

interface UseMusicListReturn {
  tracks: MusicTrack[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  updateTrack: (id: string, update: Partial<MusicTrack>) => void;
}

export function useMusicList(
  fetcher: () => Promise<unknown[]>,
  deps: unknown[] = []
): UseMusicListReturn {
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
        const data = await fetcher();
        if (Array.isArray(data)) {
          setTracks(normalizeTracks(data as RawMusicResponse[]));
      } else {
        setTracks([]);
      }
    } catch {
      setError("Lỗi khi tải danh sách bài hát.");
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const updateTrack = useCallback(
    (id: string, update: Partial<MusicTrack>) => {
      setTracks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...update } : t))
      );
    },
    []
  );

  return { tracks, loading, error, refetch: fetch, updateTrack };
}
