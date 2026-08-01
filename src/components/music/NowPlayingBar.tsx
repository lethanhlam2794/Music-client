import { cn } from "@/lib/utils";

interface NowPlayingBarProps {
  className?: string;
  children: React.ReactNode;
}

export function NowPlayingBar({ className, children }: NowPlayingBarProps) {
  return (
    <div
      className={cn(
        "fixed bottom-16 md:bottom-5 left-3 right-3 md:left-1/2 md:-translate-x-1/2 md:max-w-4xl z-50 glass-panel rounded-2xl md:rounded-3xl border border-white/15 shadow-2xl shadow-black/80 backdrop-blur-2xl p-2 md:p-3 transition-all duration-300 animate-in slide-in-from-bottom-5",
        className
      )}
    >
      {children}
    </div>
  );
}

