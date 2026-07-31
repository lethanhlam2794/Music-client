import { cn } from "@/lib/utils";

interface NowPlayingBarProps {
  className?: string;
  children: React.ReactNode;
}

export function NowPlayingBar({ className, children }: NowPlayingBarProps) {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t bg-background shadow-lg",
        className
      )}
    >
      <div className="mx-auto max-w-screen-xl px-4 py-3">{children}</div>
    </div>
  );
}
