import Link from "next/link";
import { cn } from "@/lib/utils";
import { GENRES } from "@/features/genres/genres";
import { Radio, Disc, Sparkles } from "lucide-react";

export { GENRES };

interface GenreTileGridProps {
  className?: string;
}

const GENRE_GRADIENTS: Record<string, string> = {
  "Buồn": "from-sky-600 to-indigo-900",
  "Vui": "from-amber-500 to-orange-600",
  "Rap": "from-orange-600 to-rose-700",
  "Rock": "from-rose-600 to-red-900",
  "Pop": "from-pink-500 to-purple-700",
  "Jazz": "from-purple-600 to-indigo-900",
  "Blues": "from-blue-600 to-slate-900",
  "Country": "from-emerald-500 to-teal-800",
  "Hip-Hop": "from-yellow-500 to-amber-700",
  "Electronic": "from-cyan-500 to-blue-700",
};

export function GenreTileGrid({ className }: GenreTileGridProps) {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-violet-400" />
            Khám Phá Theo Thể Loại
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Lựa chọn phong cách âm nhạc phù hợp với tâm trạng của bạn
          </p>
        </div>
      </div>

      <div
        className={cn(
          "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
          className
        )}
      >
        {GENRES.map((genre) => {
          const gradientClass = GENRE_GRADIENTS[genre.name] || "from-violet-600 to-indigo-800";

          return (
            <Link
              key={genre.name}
              href={`/tag/${encodeURIComponent(genre.name)}`}
              className={cn(
                "group relative overflow-hidden rounded-2xl p-6 h-36 flex flex-col justify-between shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/10 bg-gradient-to-br",
                gradientClass
              )}
            >
              <span className="text-xl font-black text-white tracking-wider uppercase drop-shadow-md group-hover:translate-x-1 transition-transform">
                {genre.name}
              </span>

              {/* Decorative Rotated Vinyl Disc Artwork */}
              <div className="absolute -bottom-4 -right-4 size-20 rounded-full bg-black/40 border-2 border-white/20 flex items-center justify-center transform rotate-12 group-hover:rotate-45 group-hover:scale-110 transition-all duration-500 shadow-inner">
                <Disc className="h-10 w-10 text-white/70" />
              </div>

              <div className="text-[10px] font-bold text-white/80 uppercase tracking-widest bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full w-max border border-white/10">
                Khám phá →
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

