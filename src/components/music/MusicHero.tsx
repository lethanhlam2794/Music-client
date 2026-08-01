import { cn } from "@/lib/utils";
import { Play, Sparkles, Radio, Headphones, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MusicHeroProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function MusicHero({
  title,
  description,
  className,
  children,
}: MusicHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden py-12 md:py-20 my-4 rounded-3xl glass-panel border border-white/10 shadow-2xl shadow-violet-950/40",
        className
      )}
    >
      {/* Background Glow effects */}
      <div className="absolute -top-24 -left-24 size-96 bg-violet-600/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 size-96 bg-indigo-600/25 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Content Column */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-violet-400 animate-pulse" />
            <span className="text-xs font-semibold text-violet-300">
              Trải Nghiệm Âm Nhạc Trực Tuyến Đỉnh Cao
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {title.includes("Chào mừng") ? (
              <>
                Chào mừng tới thế giới <br />
                <span className="text-gradient">Âm Nhạc Đỉnh Cao</span>
              </>
            ) : (
              title
            )}
          </h1>

          {description && (
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {description}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            {children ? (
              children
            ) : (
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-7 font-bold text-white shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-105 transition-all duration-300 gap-2"
              >
                <Play className="h-4 w-4 fill-current" />
                Khám Phá Ngay
              </Button>
            )}
          </div>

          {/* Feature Highlights */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-muted-foreground font-medium">
            <div className="flex items-center gap-2">
              <Headphones className="h-4 w-4 text-violet-400" />
              <span>Âm thanh Hi-Fi Lossless</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-400" />
              <span>Phát trực tuyến mượt mượt</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-indigo-400" />
              <span>Không quảng cáo</span>
            </div>
          </div>
        </div>

        {/* Right Artwork Graphic Column */}
        <div className="relative flex items-center justify-center">
          <div className="relative size-64 md:size-80 rounded-full bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-800 p-2 shadow-2xl shadow-violet-600/30 group">
            {/* Spinning Vinyl Texture Effect */}
            <div className="size-full rounded-full bg-slate-950 border-4 border-white/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)]" />
              <div className="size-24 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center shadow-lg border-2 border-white/20">
                <Radio className="h-10 w-10 text-white animate-pulse" />
              </div>
            </div>

            {/* Glowing Equalizer Mini Badge */}
            <div className="absolute -bottom-3 -left-3 glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-xl">
              <div className="flex items-end gap-1 h-5">
                <span className="w-1 bg-violet-400 rounded-full animate-bar-1" />
                <span className="w-1 bg-indigo-400 rounded-full animate-bar-2" />
                <span className="w-1 bg-emerald-400 rounded-full animate-bar-3" />
                <span className="w-1 bg-pink-400 rounded-full animate-bar-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Đang phát hot</p>
                <p className="text-xs font-bold text-white">Top 50 Nhạc Việt 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

