import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "border-t bg-background py-6 text-center text-sm text-muted-foreground",
        className
      )}
    >
      <div className="container mx-auto">
        <p>&copy; 2023 Âm Nhạc. All rights reserved.</p>
      </div>
    </footer>
  );
}
