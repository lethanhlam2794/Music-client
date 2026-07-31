import { cn } from "@/lib/utils";

interface MusicGridProps {
  className?: string;
  children: React.ReactNode;
}

export function MusicGrid({ className, children }: MusicGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
        className
      )}
    >
      {children}
    </div>
  );
}
