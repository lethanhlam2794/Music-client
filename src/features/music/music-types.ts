export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  lyrics?: string;
  genre?: string;
  likes: number;
  likedByUser: boolean;
  filename?: string;
  originalname?: string;
  storageName?: string;
  status?: string;
  avatarMusic?: string;
}

export interface RawMusicResponse {
  id: string;
  title: string;
  artist: string;
  lyrics?: string;
  genre?: string;
  likes?: number;
  likedByUser?: boolean;
  filename?: string;
  originalname?: string;
  storageName?: string;
  status?: string;
  avatarMusic?: string;
}

export interface MusicUploadPayload {
  title: string;
  artist: string;
  genre?: string;
  file: File;
  avatar?: File;
}

export function normalizeTrack(raw: RawMusicResponse): MusicTrack {
  return {
    id: raw.id,
    title: raw.title,
    artist: raw.artist,
    lyrics: raw.lyrics,
    genre: raw.genre,
    likes: raw.likes ?? 0,
    likedByUser: raw.likedByUser ?? false,
    filename: raw.filename,
    originalname: raw.originalname,
    storageName: raw.storageName,
    status: raw.status,
    avatarMusic: raw.avatarMusic,
  };
}

export function normalizeTracks(rawList: RawMusicResponse[]): MusicTrack[] {
  return rawList.map(normalizeTrack);
}
