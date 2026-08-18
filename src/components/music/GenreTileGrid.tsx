import Link from "next/link";
import { cn } from "@/lib/utils";
import { GENRES } from "@/features/genres/genres";
import {
  Sparkles,
  CloudRain,
  Sun,
  Mic2,
  Flame,
  HeartHandshake,
  Music,
  Radio,
  Compass,
  Headphones,
  Zap,
  Disc,
} from "lucide-react";

export { GENRES };

interface GenreTileGridProps {
  className?: string;
}

const GENRE_DETAILS: Record<
  string,
  {
    gradient: string;
    icon: React.ElementType;
    desc: string;
  }
> = {
  Buồn: {
    gradient: "from-sky-600 via-indigo-700 to-slate-900",
    icon: CloudRain,
    desc: "Giai điệu xoa dịu tâm hồn",
  },
  Vui: {
    gradient: "from-amber-500 via-orange-500 to-rose-600",
    icon: Sun,
    desc: "Năng lượng tích cực mỗi ngày",
  },
  Rap: {
    gradient: "from-orange-600 via-rose-600 to-purple-900",
    icon: Mic2,
    desc: "Nhịp đập đường phố cực cháy",
  },
  Rock: {
    gradient: "from-rose-600 via-red-700 to-zinc-950",
    icon: Flame,
    desc: "Bùng nổ đam mê & khát khao",
  },
  Pop: {
    gradient: "from-pink-500 via-purple-600 to-indigo-800",
    icon: HeartHandshake,
    desc: "Giai điệu thịnh hành bắt tai",
  },
  Jazz: {
    gradient: "from-purple-600 via-indigo-800 to-slate-950",
    icon: Music,
    desc: "Sâu lắng & đầy nghệ thuật",
  },
  Blues: {
    gradient: "from-blue-600 via-indigo-900 to-slate-950",
    icon: Radio,
    desc: "Cảm xúc chân thật da diết",
  },
  Country: {
    gradient: "from-emerald-500 via-teal-700 to-slate-900",
    icon: Compass,
    desc: "Mộc mạc & đậm chất quê hương",
  },
  "Hip-Hop": {
    gradient: "from-yellow-500 via-amber-600 to-rose-900",
    icon: Headphones,
    desc: "Phong cách chất & cá tính",
  },
  Electronic: {
    gradient: "from-cyan-500 via-blue-600 to-violet-900",
    icon: Zap,
    desc: "Không gian điện tử mê hoặc",
  },
};

export function GenreTileGrid({ className }: GenreTileGridProps) {
  return (
    <div className={cn("container mx-auto px-4 md:px-6 pt-6 pb-16 space-y-12", className)}>
      {/* Page Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-8 rounded-3xl glass-panel border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 size-64 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/25 text-xs font-semibold text-violet-300">
            <Sparkles className="h-3.5 w-3.5 text-violet-400 animate-pulse" />
            <span>Thế Giới Âm Nhạc Đa Sắc Màu</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            <span className="text-gradient">Khám Phá Theo Thể Loại</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Lựa chọn phong cách âm nhạc phù hợp với cảm xúc của bạn. Hàng ngàn bài hát đang chờ bạn khám phá.
          </p>
        </div>

        {/* Stats Pill */}
        <div className="relative z-10 flex items-center gap-4 bg-white/5 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
          <div className="size-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400">
            <Disc className="h-5 w-5 animate-spin-slow" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Tổng số thể loại</p>
            <p className="text-lg font-bold text-white">10+ Thể loại nhạc</p>
          </div>
        </div>
      </div>

      {/* Main Genre Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="size-2 rounded-full bg-violet-500 inline-block animate-pulse" />
            Tất cả thể loại
          </h2>
          <span className="text-xs text-muted-foreground">Bấm vào thể loại để nghe nhạc</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {GENRES.map((genre, index) => {
            const detail = GENRE_DETAILS[genre.name] || {
              gradient: "from-violet-600 to-indigo-900",
              icon: Music,
              desc: "Âm nhạc tuyệt vời",
            };
            const IconComp = detail.icon;

            return (
              <Link
                key={genre.name}
                href={`/tag/${encodeURIComponent(genre.name)}`}
                className={cn(
                  "group relative overflow-hidden rounded-3xl p-6 h-44 flex flex-col justify-between shadow-xl transition-all duration-400 hover:scale-[1.05] hover:shadow-2xl hover:shadow-violet-500/20 border border-white/15 bg-gradient-to-br shimmer-overlay",
                  detail.gradient
                )}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/* Header info */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white tracking-wide uppercase drop-shadow-md group-hover:translate-x-1 transition-transform duration-300">
                      {genre.name}
                    </h3>
                    <p className="text-[11px] text-white/80 font-medium mt-1 line-clamp-1">
                      {detail.desc}
                    </p>
                  </div>

                  <div className="size-10 rounded-2xl bg-black/30 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                    <IconComp className="h-5 w-5" />
                  </div>
                </div>

                {/* Footer action */}
                <div className="flex items-center justify-between pt-2 border-t border-white/15">
                  <span className="text-[11px] font-bold text-white/90 uppercase tracking-wider bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 group-hover:bg-white/20 transition-all">
                    Khám phá →
                  </span>

                  {/* Rotating Disc graphic */}
                  <div className="size-8 rounded-full bg-black/40 border border-white/20 flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
                    <Disc className="h-4 w-4 text-white/70" />
                  </div>
                </div>

                {/* Hover ambient highlight */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 pointer-events-none rounded-3xl" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mood Recommendation Banner Section (Fills bottom space elegantly) */}
      <div className="rounded-3xl glass-panel border border-white/10 p-8 flex flex-col md:flex-row items-center justify-between gap-6 glow-violet">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-bold text-white">Bạn đang tìm cảm xúc âm nhạc gì hôm nay?</h3>
          <p className="text-xs text-muted-foreground max-w-lg">
            Hệ thống tự động đề xuất những bài hát theo từng tâm trạng giúp bạn có trải nghiệm nghe nhạc thư thái nhất.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/tag/Bu%E1%BB%93n"
            className="px-4 py-2 rounded-full bg-sky-500/15 border border-sky-500/30 text-xs font-semibold text-sky-300 hover:bg-sky-500/25 transition-all flex items-center gap-2"
          >
            <CloudRain className="h-3.5 w-3.5" />
            Tâm trạng buồn
          </Link>
          <Link
            href="/tag/Vui"
            className="px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-semibold text-amber-300 hover:bg-amber-500/25 transition-all flex items-center gap-2"
          >
            <Sun className="h-3.5 w-3.5" />
            Yêu đời sôi động
          </Link>
          <Link
            href="/tag/Rock"
            className="px-4 py-2 rounded-full bg-rose-500/15 border border-rose-500/30 text-xs font-semibold text-rose-300 hover:bg-rose-500/25 transition-all flex items-center gap-2"
          >
            <Flame className="h-3.5 w-3.5" />
            Cháy hết mình
          </Link>
        </div>
      </div>
    </div>
  );
}
