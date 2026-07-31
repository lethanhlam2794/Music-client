"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION_ITEMS } from "./navigation-items";
import { UserMenu } from "./UserMenu";
import { useAuthSession } from "@/features/auth/use-auth-session";
import { cn } from "@/lib/utils";
import { Music } from "lucide-react";

export function AppNavigation() {
  const pathname = usePathname();
  const { isLoggedIn } = useAuthSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Music className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Music App</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 text-sm">
          {NAVIGATION_ITEMS.map((item) => {
            // Skip auth-required items if not logged in
            if (item.requiresAuth && !isLoggedIn) {
              return null;
            }

            const isActive = pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 transition-colors hover:text-foreground",
                  isActive
                    ? "text-foreground font-medium"
                    : "text-foreground/60"
                )}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Menu - Right aligned */}
        <div className="ml-auto">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}