// src/app/tag/[genre]/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getMusicByGenre, toggleLike } from "@/api/music/music.api";
import MusicPlayer from "@/components/music/musicStream";
import { ThemeAndGenre } from "@/components/ThemeAndGenre/TAG";

const API_BASE_URL = "http://localhost:3002";

type Song = {
  id: string;
  title: string;
  artist: string;
  lyrics: string;
  likes: number;
  likedByUser?: boolean;
  avatarMusic: string;
};

export default function GenrePage({ params }: { params: { genre: string } }) {
  const { genre } = params;
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMusic, setSelectedMusic] = useState<Song | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchMusicByGenre = async () => {
      try {
        const token = localStorage.getItem("token");
        setUserLoggedIn(!!token);

        setLoading(true);
        const musicData = await getMusicByGenre(genre);
        if (musicData && Array.isArray(musicData)) {
          setSongs(musicData);
        } else {
          console.error("Invalid music data:", musicData);
          setSongs([]);
        }
      } catch (error) {
        console.error("Error fetching music by genre:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMusicByGenre();
  }, [genre]);

  const handleLikeToggle = async (musicId: string) => {
    if (!userLoggedIn) {
      const shouldRedirect = window.confirm(
        "Vui lòng đăng nhập để thích bài hát này. Bạn có muốn đăng nhập không?"
      );
      if (shouldRedirect) {
        router.push("/login");
      }
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const updatedLikes = await toggleLike(musicId, token!);
      setSongs((prevSongs) =>
        prevSongs.map((song) =>
          song.id === musicId
            ? { ...song, likedByUser: !song.likedByUser, likes: updatedLikes }
            : song
        )
      );
    } catch (error) {
      console.error("Lỗi khi thích bài hát:", error);
      alert("Không thể cập nhật trạng thái thích.");
    }
  };



  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-blue-500 py-20">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Thể loại: {genre}</h1>
          <p className="text-lg">Khám phá các bài hát hay nhất trong thể loại {genre}.</p>
        </div>
      </section>

      {/* Loading/Empty State */}
      {loading ? (
        <p className="text-blue-600 text-center">Đang tải bài hát thuộc thể loại {genre}...</p>
      ) : songs.length === 0 ? (
        <div>
          <p className="text-red-600 text-center my-[5%] ">Không có bài hát nào thuộc thể loại {genre}.</p>
          <ThemeAndGenre/>
        </div>

      ) : (
        // Song List
        <section className="container mx-auto py-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Danh sách bài hát</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {songs.map((song) => (
              <div
                key={song.id}
                className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
              >
                <Image
                  src={`${API_BASE_URL}/music/avatar/${song.id}`}
                  alt={song.title}
                  width={400}
                  height={400}
                  className="w-full"
                  onClick={() => setSelectedMusic(song)}
                />
                <div className="p-4">
                  <h3
                    className="font-bold text-gray-800 mb-2"
                    onClick={() => setSelectedMusic(song)}
                  >
                    {song.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{song.id}. {song.artist}</p>

                  <div className="flex items-center mt-2">
                    <span
                      className="text-2xl cursor-pointer"
                      onClick={() => handleLikeToggle(song.id)}
                    >
                      {song.likedByUser ? "❤️" : "🖤"}
                    </span>
                    <span className="ml-2 text-gray-600">{song.likes || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Âm Nhạc. All rights reserved.</p>
        </div>
      </footer>

      {/* Music Player */}
      {selectedMusic && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4">
          <MusicPlayer
            initialPlaylist={[
              {
                id: selectedMusic.id,
                title: selectedMusic.title,
                artist: selectedMusic.artist,
                lyrics: selectedMusic.lyrics,
              },
            ]}
            suggestedSongs={[]}
            initialMusicIndex={0}
          />
        </div>
      )}
    </div>
  );
}