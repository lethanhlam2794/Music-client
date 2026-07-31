import React from "react";

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
  emptyMessage = "Không có bài hát nào.",
  isEmpty = false,
  fallback,
  children,
}: MusicListStateProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (isEmpty) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return <>{children}</>;
}
