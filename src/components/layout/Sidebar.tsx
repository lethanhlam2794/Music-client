import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
  logo?: React.ReactNode;
  children?: React.ReactNode;
}

export function Sidebar({ className, logo, children }: SidebarProps) {
  return (
    <aside
      className={cn(
        "hidden border-r bg-background md:flex md:w-64 md:flex-col md:fixed md:inset-y-0",
        className
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        {logo || (
          <span className="text-lg font-semibold text-foreground">Nhạc của Lâm</span>
        )}
      </div>
      <nav className="flex-1 overflow-auto p-4">{children}</nav>
    </aside>
  );
}
