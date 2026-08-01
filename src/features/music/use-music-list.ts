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

const DEMO_FALLBACK_TRACKS: MusicTrack[] = [
  {
    id: "demo-1",
    title: "Lạc Trôi",
    artist: "Sơn Tùng M-TP",
    genre: "Pop",
    likes: 1250,
    likedByUser: false,
    lyrics: "Người theo hương hoa mây ngàn bay...\nLạc trôi giữa đời nhẹ nhàng trôi qua...",
  },
  {
    id: "demo-2",
    title: "Nơi Này Có Anh",
    artist: "Sơn Tùng M-TP",
    genre: "Ballad",
    likes: 980,
    likedByUser: true,
    lyrics: "Em là ai từ đâu bước đến nơi đây dịu dàng như suối mát...",
  },
  {
    id: "demo-3",
    title: "Chờ Ngày Mưa Rơi",
    artist: "Vũ & Chillies",
    genre: "Lofi",
    likes: 640,
    likedByUser: false,
    lyrics: "Ngày mưa rơi anh nhớ em trong lòng...",
  },
  {
    id: "demo-4",
    title: "Sài Gòn Đau Lòng Quá",
    artist: "Hứa Kim Tuyền ft. Hoàng Duyên",
    genre: "Ballad",
    likes: 830,
    likedByUser: false,
    lyrics: "Sài gòn đau lòng quá khi ai đó bước đi không lời giã từ...",
  },
  {
    id: "demo-5",
    title: "Nấc Thang Lên Thiên Đường",
    artist: "Chillies",
    genre: "Rock",
    likes: 450,
    likedByUser: false,
    lyrics: "Cùng bước tiếp chặng đường dài mưa gió...",
  },
  {
    id: "demo-6",
    title: "Cyberpunk Pulse",
    artist: "Synthetix",
    genre: "EDM",
    likes: 1120,
    likedByUser: true,
    lyrics: "Neon lights flashing in the night...\nDigital heartbeat taking flight...",
  },
];

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
      if (Array.isArray(data) && data.length > 0) {
        setTracks(normalizeTracks(data as RawMusicResponse[]));
      } else {
        setTracks(DEMO_FALLBACK_TRACKS);
      }
    } catch {
      // Offline fallback: Use demo tracks when backend server is not running
      setTracks(DEMO_FALLBACK_TRACKS);
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

