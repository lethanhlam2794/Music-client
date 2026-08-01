"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthSession } from "@/features/auth/use-auth-session";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User } from "lucide-react";

export function UserMenu() {
  const { user, isLoggedIn, logout } = useAuthSession();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (isLoggedIn && user) {
    const userInitials = user.email ? user.email.slice(0, 2).toUpperCase() : "U";

    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="size-7 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
            {userInitials}
          </div>
          <span className="text-xs font-medium text-foreground max-w-[120px] truncate hidden sm:inline-block">
            {user.email}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="gap-2 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Đăng xuất</span>
        </Button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300"
    >
      <LogIn className="h-3.5 w-3.5" />
      Đăng nhập
    </Link>
  );
}