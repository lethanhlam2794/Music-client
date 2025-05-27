// src/app/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { getRecentMusic, toggleLike } from '../api/music/music.api';  // Đã khai báo toggleLike
import Image from 'next/image';
import MusicPlayer from '@/components/music/musicStream';
import { useRouter } from 'next/navigation'; // Import useRouter
import { NavHomePage } from '@/components/HomePage/NavHome';


const API_BASE_URL = 'http://localhost:3002';

interface Music {
  id: string;
  title: string;
  artist: string;
  filename: string;
  originalname: string;
  storageName: string;
  status: string;
  lyrics: string;
  likes?: number;
  likedByUser?: boolean;  // Thêm trạng thái đã thích
}

export default function Home() {
  const [recentMusics, setRecentMusics] = useState<Music[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMusic, setSelectedMusic] = useState<Music | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const router = useRouter();


  useEffect(() => {
    const fetchRecentMusics = async () => {
      try {
        const token = localStorage.getItem('token');
        setUserLoggedIn(!!token);

        const musicData = await getRecentMusic();
        setRecentMusics(musicData);
        setLoading(false);
      } catch (err) {
        setError('Lỗi khi tải danh sách bài hát.');
        setLoading(false);
      }
    };

    fetchRecentMusics();
  }, []);

  const handleLikeToggle = async (musicId: string) => {
    if (!userLoggedIn) {

      const shouldRedirect = window.confirm('Vui lòng đăng nhập để thích bài hát này. Bạn có muốn đăng nhập không?');
      if (shouldRedirect) {
        router.push('/login');
      }
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const updatedLikes = await toggleLike(musicId, token!);
      setRecentMusics((prevMusics) =>
        prevMusics.map((music) =>
          music.id === musicId
            ? { ...music, likedByUser: !music.likedByUser, likes: updatedLikes }
            : music
        )
      );
    } catch (error) {
      console.error('Lỗi khi thích bài hát:', error);
      alert('Không thể cập nhật trạng thái thích.');
    }
  };

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 to-pink-500 py-20">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Chào mừng đến với thế giới âm nhạc</h1>
          <p className="text-lg mb-8">Khám phá hàng triệu bài hát, album và nghệ sĩ yêu thích của bạn.</p>
          <button className="bg-white hover:bg-gray-100 text-purple-500 font-bold py-3 px-6 rounded">
            Khám phá ngay
          </button>
        </div>
      </section>

      <NavHomePage/>

      Phát hành mới
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Phát hành mới</h2>
        {loading ? (
          <p className="text-blue-600">Đang tải...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {recentMusics.map((music) => (
    <div
      key={music.id}
      className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
      style={{ width: '350px', height: '400px' }}
    >
      <div style={{ width: '350px', height: '250px' }}> {/* Container cho ảnh */}
        <Image
          src={`${API_BASE_URL}/music/avatar/${music.id}`}
          alt={music.title}
          width={350}
          height={250}
          className="w-full h-full  object-contain"
          onClick={() => setSelectedMusic(music)}
          onError={(e) => (e.currentTarget.src = '/images/artist-placeholder.jpg')}
        />
      </div>
      <div className="p-4" style={{ height: '150px' }}> {/* Container cho thông tin */}
        <h3 className="font-bold text-gray-800 mb-2" onClick={() => setSelectedMusic(music)}>
          {music.title}
        </h3>
        <p className="text-gray-600 text-sm" onClick={() => setSelectedMusic(music)}>
          {music.artist}
        </p>
        <div className="flex items-center mt-2">
          <span className="text-2xl cursor-pointer" onClick={() => handleLikeToggle(music.id)}>
            {music.likedByUser ? '❤️' : '🖤'}
          </span>
          <span className="ml-2 text-gray-600">{music.likes || 0}</span>
        </div>
      </div>
    </div>
  ))}
</div>
        )}
      </section>

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
            initialPlaylist={[{
              id: selectedMusic.id,
              title: selectedMusic.title,
              artist: selectedMusic.artist,
              lyrics: selectedMusic.lyrics
            }]}
            suggestedSongs={[]}
            initialMusicIndex={0}
          />
        </div>
      )}
    </div>
  );
}
