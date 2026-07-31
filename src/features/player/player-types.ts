/**
 * Player track type - subset of MusicTrack for player use
 */
export interface PlayerTrack {
  id: string;
  title: string;
  artist: string;
  lyrics: string;
}

/**
 * Player state
 */
export interface PlayerState {
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isRepeat: boolean;
  isShuffle: boolean;
  showLyrics: boolean;
}

/**
 * Audio player hook return type
 */
export interface UseAudioPlayerReturn {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  state: PlayerState;
  currentTrack: PlayerTrack | null;
  playlist: PlayerTrack[];
  currentIndex: number;
  actions: {
    play: () => void;
    pause: () => void;
    togglePlayPause: () => void;
    next: () => void;
    previous: () => void;
    seek: (time: number) => void;
    setVolume: (volume: number) => void;
    toggleRepeat: () => void;
    toggleShuffle: () => void;
    toggleLyrics: () => void;
    setTrack: (index: number) => void;
    addToPlaylist: (track: PlayerTrack) => void;
  };
}