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
        "relative overflow-hidden py-14 md:py-24 my-4 rounded-3xl glass-panel border border-white/10 shadow-2xl shadow-violet-950/50",
        className
      )}
    >
      {/* Animated Ambient Orbs */}
      <div className="absolute -top-20 -left-20 size-[500px] bg-violet-600/25 rounded-full blur-[100px] pointer-events-none animate-orb" />
      <div className="absolute -bottom-32 -right-20 size-[400px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none animate-orb-reverse" />
      <div className="absolute top-1/2 left-1/3 size-[300px] bg-fuchsia-600/10 rounded-full blur-[80px] pointer-events-none animate-float-slow" />

      {/* Shimmer sweep overlay */}
      <div className="absolute inset-0 shimmer-overlay rounded-3xl" />

      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content Column */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/15 border border-violet-500/25 backdrop-blur-md animate-fade-in-up">
            <Sparkles className="h-3.5 w-3.5 text-violet-400 animate-pulse" />
            <span className="text-xs font-semibold text-violet-300 tracking-wide">
              Trải Nghiệm Âm Nhạc Trực Tuyến Đỉnh Cao
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight animate-fade-in-up animate-delay-100">
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
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up animate-delay-200">
              {description}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 animate-fade-in-up animate-delay-300">
            {children ? (
              children
            ) : (
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-8 font-bold text-white shadow-lg shadow-violet-600/40 hover:shadow-violet-600/60 hover:scale-105 transition-all duration-300 gap-2 btn-shimmer glow-violet"
              >
                <Play className="h-4 w-4 fill-current" />
                Khám Phá Ngay
              </Button>
            )}
          </div>

          {/* Feature Highlights */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-muted-foreground font-medium animate-fade-in-up animate-delay-500">
            <div className="flex items-center gap-2 group/feat">
              <div className="size-8 rounded-xl bg-violet-500/15 flex items-center justify-center group-hover/feat:bg-violet-500/25 group-hover/feat:glow-violet transition-all duration-300">
                <Headphones className="h-4 w-4 text-violet-400" />
              </div>
              <span className="group-hover/feat:text-violet-300 transition-colors">Âm thanh Hi-Fi Lossless</span>
            </div>
            <div className="flex items-center gap-2 group/feat">
              <div className="size-8 rounded-xl bg-emerald-500/15 flex items-center justify-center group-hover/feat:bg-emerald-500/25 transition-all duration-300">
                <Zap className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="group-hover/feat:text-emerald-300 transition-colors">Phát trực tuyến mượt mượt</span>
            </div>
            <div className="flex items-center gap-2 group/feat">
              <div className="size-8 rounded-xl bg-indigo-500/15 flex items-center justify-center group-hover/feat:bg-indigo-500/25 transition-all duration-300">
                <ShieldCheck className="h-4 w-4 text-indigo-400" />
              </div>
              <span className="group-hover/feat:text-indigo-300 transition-colors">Không quảng cáo</span>
            </div>
          </div>
        </div>

        {/* Right Vinyl Artwork Column */}
        <div className="relative flex items-center justify-center animate-scale-in animate-delay-300">
          {/* Outer glow ring */}
          <div className="absolute inset-0 size-72 md:size-[22rem] rounded-full bg-gradient-to-tr from-violet-600/20 via-transparent to-indigo-600/20 blur-xl animate-spin-slow-reverse pointer-events-none" />

          <div className="relative size-64 md:size-80 rounded-full bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-indigo-600 p-1 shadow-2xl glow-violet-pulse group">
            {/* Spinning Vinyl */}
            <div className="size-full rounded-full bg-[#0a0d1a] border-2 border-white/10 flex items-center justify-center relative overflow-hidden animate-spin-slow">
              {/* Vinyl grooves */}
              <div className="absolute inset-4 rounded-full border border-white/5" />
              <div className="absolute inset-8 rounded-full border border-white/5" />
              <div className="absolute inset-12 rounded-full border border-white/5" />
              <div className="absolute inset-16 rounded-full border border-white/5" />
              <div className="absolute inset-20 rounded-full border border-white/5" />
              {/* Radial sheen */}
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,rgba(255,255,255,0.04)_10%,transparent_20%,transparent_50%,rgba(255,255,255,0.03)_60%,transparent_70%)]" />
              {/* Center label */}
              <div className="relative size-24 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-500 flex items-center justify-center shadow-lg border-2 border-white/20 z-10">
                <Radio className="h-10 w-10 text-white drop-shadow-lg" />
              </div>
            </div>

            {/* Glowing Equalizer Badge */}
            <div className="absolute -bottom-4 -left-4 glass-panel px-4 py-3 rounded-2xl flex items-center gap-3 shadow-xl glow-violet border-violet-500/20 animate-float">
              <div className="flex items-end gap-[3px] h-6">
                <span className="w-1 bg-violet-400 rounded-full animate-bar-1" />
                <span className="w-1 bg-fuchsia-400 rounded-full animate-bar-2" />
                <span className="w-1 bg-indigo-400 rounded-full animate-bar-3" />
                <span className="w-1 bg-emerald-400 rounded-full animate-bar-4" />
                <span className="w-1 bg-pink-400 rounded-full animate-bar-5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-violet-300 uppercase font-bold tracking-wider">Đang phát hot</p>
                <p className="text-xs font-bold text-white">Top 50 Nhạc Việt 2026</p>
              </div>
            </div>

            {/* Floating music note badge */}
            <div className="absolute -top-2 -right-2 size-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg animate-float-slow text-white text-lg">
              ♪
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
