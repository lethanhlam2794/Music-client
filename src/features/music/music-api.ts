import { httpClient } from "@/lib/api/http-client";
import { apiBaseUrl } from "@/lib/config/env";

export function getAvatarUrl(musicId: string): string {
  return `${apiBaseUrl}/music/avatar/${musicId}`;
}

export async function getRecentMusic() {
  const response = await httpClient.get("/music/recent");
  return response.data;
}

export async function getMusicByGenre(genre: string) {
  const response = await httpClient.get(`/music/genre/${genre}`);
  return response.data;
}

export async function toggleLike(musicId: string) {
  const response = await httpClient.post(`/music/toggleLike/${musicId}`);
  return response.data.likes;
}

export async function getLikes(musicId: string) {
  const response = await httpClient.get(`/music/likes/${musicId}`);
  return response.data.likes;
}

export async function streamMusic(musicId: string, signal?: AbortSignal) {
  const response = await httpClient.get(`/music/stream/${musicId}`, {
    responseType: "blob",
    signal,
  });
  return response.data;
}

export async function uploadMusic(formData: FormData) {
  const response = await httpClient.post("/music/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}
