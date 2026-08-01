import React from "react";
import { MusicGrid } from "./MusicGrid";
import { Music, AlertCircle } from "lucide-react";

interface MusicListStateProps {
  loading: boolean;
  error: string | null;
  emptyMessage?: string;
  isEmpty?: boolean;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function MusicListState({
  loading,
  error,
  emptyMessage = "Không tìm thấy bài hát nào.",
  isEmpty = false,
  fallback,
  children,
}: MusicListStateProps) {
  if (loading) {
    return (
      <MusicGrid>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 rounded-2xl glass-panel p-3 animate-pulse"
          >
            <div className="aspect-square w-full rounded-xl bg-white/10" />
            <div className="h-4 w-3/4 rounded bg-white/10" />
            <div className="h-3 w-1/2 rounded bg-white/5" />
          </div>
        ))}
      </MusicGrid>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center glass-panel rounded-3xl p-8 border border-destructive/20 max-w-md mx-auto my-8">
        <AlertCircle className="h-10 w-10 text-destructive mb-3" />
        <h3 className="text-lg font-bold text-foreground mb-1">Đã có lỗi xảy ra</h3>
        <p className="text-xs text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (isEmpty) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center glass-panel rounded-3xl p-8 max-w-md mx-auto my-8">
        <div className="size-16 rounded-full bg-violet-500/10 flex items-center justify-center mb-4 border border-violet-500/20">
          <Music className="h-8 w-8 text-violet-400 opacity-80" />
        </div>
        <h3 className="text-base font-bold text-foreground mb-1">Danh sách trống</h3>
        <p className="text-xs text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return <>{children}</>;
}

