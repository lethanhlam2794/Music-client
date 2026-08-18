"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION_ITEMS } from "./navigation-items";
import { UserMenu } from "./UserMenu";
import { MobileNav } from "./MobileNav";
import { useAuthSession } from "@/features/auth/use-auth-session";
import { cn } from "@/lib/utils";
import { Search, Disc3 } from "lucide-react";

export function AppNavigation() {
  const pathname = usePathname();
  const { isLoggedIn } = useAuthSession();

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/8 backdrop-blur-2xl">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
          {/* Brand Logo */}
          <Link href="/" className="mr-8 flex items-center gap-2.5 group">
            <div className="size-9 rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:scale-110 group-hover:glow-violet transition-all duration-300">
              <Disc3 className="h-5 w-5 text-white animate-spin-slow" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-gradient">
                Music Lâm
              </span>
              <span className="text-[10px] text-muted-foreground -mt-1 font-medium">
                Premium Audio
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {NAVIGATION_ITEMS.map((item) => {
              if (item.requiresAuth && !isLoggedIn) return null;

              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 relative",
                    isActive
                      ? "bg-violet-500/15 text-white shadow-sm border border-violet-500/25 glow-violet"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/8"
                  )}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center mx-6 flex-1 max-w-sm">
            <div className="relative w-full group/search">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within/search:text-violet-400 transition-colors" />
              <input
                type="text"
                placeholder="Tìm kiếm bài hát, nghệ sĩ..."
                className="w-full h-9 pl-10 pr-14 rounded-full bg-white/5 border border-white/10 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/25 focus:bg-white/8 transition-all duration-300"
                readOnly
              />
              <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-muted-foreground font-mono border border-white/10">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* User Menu */}
          <div className="ml-auto">
            <UserMenu />
          </div>
        </div>
      </header>

      <MobileNav />
    </>
  );
}