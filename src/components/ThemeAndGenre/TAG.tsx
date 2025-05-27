// src/components/ThemeAndGenre/TAG.tsx
"use client";
import { GocChuaLanh } from "@/page/constants";
import Link from "next/link";

const genres = [
  "Buồn",
  "Vui",
  "Rap",
  "Rock",
  "Pop",
  "Jazz",
  "Blues",
  "Country",
  "Hip-Hop",
  "Electronic",
];

export function ThemeAndGenre() {
  return (

<div>
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6 uppercase">
        Chủ đề và thể loại
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-content-center items-center">
        {genres.map((genre) => (
          <Link
            key={genre}
            href={`/tag/${genre}`}
            className=" cursor-pointer p-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-md transition-transform transform hover:scale-105 text-center text-xl font-bold uppercase tracking-wide"
          >
            {genre}
          </Link>
        ))}
      </div>
   </div>
  );
}
