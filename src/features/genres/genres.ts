export interface Genre {
  name: string;
  color: string;
}

export const GENRES: Genre[] = [
  { name: "Buồn", color: "bg-sky-500" },
  { name: "Vui", color: "bg-amber-500" },
  { name: "Rap", color: "bg-orange-500" },
  { name: "Rock", color: "bg-red-500" },
  { name: "Pop", color: "bg-pink-500" },
  { name: "Jazz", color: "bg-purple-500" },
  { name: "Blues", color: "bg-blue-700" },
  { name: "Country", color: "bg-emerald-500" },
  { name: "Hip-Hop", color: "bg-yellow-600" },
  { name: "Electronic", color: "bg-cyan-500" },
];

export function decodeGenreParam(encoded: string): string {
  try {
    return decodeURIComponent(encoded);
  } catch {
    return encoded;
  }
}

export function encodeGenreParam(name: string): string {
  return encodeURIComponent(name);
}