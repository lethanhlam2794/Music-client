"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION_ITEMS } from "./navigation-items";
import { useAuthSession } from "@/features/auth/use-auth-session";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const { isLoggedIn } = useAuthSession();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/10 px-4 py-2 flex items-center justify-around">
      {NAVIGATION_ITEMS.map((item) => {
        if (item.requiresAuth && !isLoggedIn) return null;

        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href));

        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200",
              isActive
                ? "text-primary bg-primary/10 font-semibold scale-105"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {Icon && <Icon className="h-5 w-5" />}
            <span className="text-[10px]">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
