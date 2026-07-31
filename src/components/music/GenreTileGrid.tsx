import Link from "next/link";
import { cn } from "@/lib/utils";
import { GENRES } from "@/features/genres/genres";

export { GENRES };

interface GenreTileGridProps {
  className?: string;
}

export function GenreTileGrid({ className }: GenreTileGridProps) {
  return (
    <div>
      <h2 className="text-3xl font-extrabold text-foreground text-center mb-6 uppercase">
        Chủ đề và thể loại
      </h2>
      <div
        className={cn(
          "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5",
          className
        )}
      >
        {GENRES.map((genre) => (
          <Link
            key={genre.name}
            href={`/tag/${encodeURIComponent(genre.name)}`}
            className={cn(
              "flex items-center justify-center rounded-xl p-8 text-center text-xl font-bold uppercase tracking-wide text-white shadow-md transition-transform hover:scale-105",
              genre.color
            )}
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
