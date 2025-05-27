// src/components/music/musicStream.tsx
'use client';
import React, { useEffect, useState, useRef } from 'react';
import { streamMusic } from '../../api/music/music.api';

interface Music {
  id: string;
  title: string;
  artist: string;
  lyrics: string;
}

interface MusicPlayerProps {
  initialPlaylist: Music[];
  suggestedSongs: Music[]; // Danh sách gợi ý nhạc
  initialMusicIndex: number;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ initialPlaylist, suggestedSongs, initialMusicIndex }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playlist, setPlaylist] = useState<Music[]>(initialPlaylist);
  const [currentIndex, setCurrentIndex] = useState(initialMusicIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showLyrics, setShowLyrics] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const currentSong = playlist[currentIndex];

  useEffect(() => {
    setPlaylist(initialPlaylist);
    setCurrentIndex(initialMusicIndex);
  }, [initialPlaylist, initialMusicIndex]);

  useEffect(() => {
    const fetchAudioStream = async () => {
      setIsLoading(true);
      try {
        const audioBlob = await streamMusic(currentSong.id);
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioSrc(audioUrl);
      } catch (error) {
        console.error('Error fetching audio stream:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentSong) {
      fetchAudioStream();
    }
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && !isPlaying) { // Kiểm tra isPlaying để tránh phát lại khi đã đang phát
      const playAudio = async () => {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Error playing audio:', error);
          // Xử lý lỗi nếu trình duyệt chặn autoplay
        }
      };
      playAudio();
    }
  }, [audioSrc]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (isShuffle) {
      const nextIndex = Math.floor(Math.random() * playlist.length);
      setCurrentIndex(nextIndex);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
  };

  const handleRepeatToggle = () => {
    setIsRepeat(!isRepeat);
  };

  const handleShuffleToggle = () => {
    setIsShuffle(!isShuffle);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const addToPlaylist = (song: Music) => {
    setPlaylist((prevPlaylist) => [...prevPlaylist, song]);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const setAudioMetadata = () => setDuration(audio.duration);
      const updateTime = () => setCurrentTime(audio.currentTime);
      const resetPlayer = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        if (isRepeat) {
          audio.play();
        } else {
          handleNext();
        }
      };

      audio.addEventListener('loadedmetadata', setAudioMetadata);
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('ended', resetPlayer);

      return () => {
        audio.removeEventListener('loadedmetadata', setAudioMetadata);
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('ended', resetPlayer);
      };
    }
  }, [audioSrc, isRepeat]);

  return (
    <div className="flex flex-col items-center p-4 bg-gray-800 text-white rounded-md shadow-md">
      {currentSong ? (
        <>
          <h2 className="text-xl font-bold mb-2">{currentSong.title}</h2>
          <p className="text-md mb-2">by {currentSong.artist}</p>
          {isLoading ? (
            <p>Đang tải nhạc...</p>
          ) : (
            <div className="w-full">
              <audio ref={audioRef} src={audioSrc} preload="auto" />
              <div className="flex items-center justify-center mb-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md" onClick={handlePrevious}>
                  Trước
                </button>
                <button className="px-3 py-1 mx-2 bg-blue-500 text-white rounded-md" onClick={handlePlayPause}>
                  {isPlaying ? 'Tạm dừng' : 'Phát nhạc'}
                </button>
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md" onClick={handleNext}>
                  Kế tiếp
                </button>
              </div>

              <div className="flex items-center justify-center mb-2">
                <label className="mr-1">Âm lượng:</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20"
                />
              </div>

              <div className="flex items-center justify-center mt-2">
                <span className="mr-1 text-sm">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  step="0.1"
                  value={currentTime}
                  onChange={handleTimeChange}
                  className="w-full"
                />
                <span className="ml-1 text-sm">{formatTime(duration)}</span>
              </div>

              <div className="flex items-center justify-center mt-2">
                <button className={`px-3 py-1 mx-2 rounded-md ${isRepeat ? 'bg-green-500' : 'bg-gray-500'}`} onClick={handleRepeatToggle}>
                  Lặp lại
                </button>
                <button className={`px-3 py-1 mx-2 rounded-md ${isShuffle ? 'bg-green-500' : 'bg-gray-500'}`} onClick={handleShuffleToggle}>
                  Ngẫu nhiên
                </button>
              </div>
            </div>
          )}

          <div className="w-full mt-4 p-2 bg-gray-900 rounded-md">
            <h3 className="text-md font-semibold mb-1 cursor-pointer" onClick={() => setShowLyrics(!showLyrics)}>
              Lời bài hát {showLyrics ? '▲' : '▼'}
            </h3>
            {showLyrics && <pre className="whitespace-pre-wrap text-sm">{currentSong.lyrics}</pre>}
          </div>
        </>
      ) : (
        <p>Danh sách phát trống.</p>
      )}

      <div className="w-full mt-4">
        <h3 className="text-lg font-bold">Danh sách phát</h3>
        <ul className="list-disc pl-6 mt-2">
          {playlist.map((song, index) => (
            <li
              key={song.id}
              className={`cursor-pointer ${index === currentIndex ? 'font-semibold' : ''}`}
              onClick={() => setCurrentIndex(index)}
            >
              {song.title} - {song.artist}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full mt-4">
        <h3 className="text-lg font-bold">Gợi ý nhạc</h3>
        <ul className="list-disc pl-6 mt-2">
          {suggestedSongs.map((song) => (
            <li key={song.id} className="cursor-pointer flex items-center justify-between">
              <span>{song.title} - {song.artist}</span>
              <button
                className="ml-4 px-2 py-1 bg-green-500 text-white rounded-md"
                onClick={() => addToPlaylist(song)}
              >
                Thêm vào danh sách
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MusicPlayer;
