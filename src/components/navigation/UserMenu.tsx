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
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{user.email}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          Đăng xuất
        </Button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
    >
      <LogIn className="h-4 w-4" />
      Đăng nhập
    </Link>
  );
}