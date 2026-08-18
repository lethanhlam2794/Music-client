import { cn } from "@/lib/utils";
import { Disc3 } from "lucide-react";
import Link from "next/link";

interface AuthTemplateProps {
  title: string;
  subtitle?: string;
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function AuthTemplate({
  title,
  subtitle,
  footer,
  className,
  children,
}: AuthTemplateProps) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-violet-600/25 rounded-full blur-[120px] pointer-events-none animate-orb" />
      <div className="absolute bottom-10 right-10 size-[350px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none animate-orb-reverse" />
      <div className="absolute top-10 left-10 size-[200px] bg-fuchsia-600/15 rounded-full blur-[80px] pointer-events-none animate-float-slow" />

      <div className={cn(
        "relative z-10 w-full max-w-md glass-panel rounded-3xl p-8 border border-white/15 shadow-2xl shadow-violet-950/50 backdrop-blur-2xl animate-fade-in-up",
        className
      )}>
        {/* Brand Logo */}
        <div className="flex flex-col items-center justify-center mb-6 text-center">
          <Link href="/" className="size-14 rounded-2xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/40 mb-4 hover:scale-110 transition-all duration-300 glow-violet-pulse">
            <Disc3 className="h-7 w-7 text-white animate-spin-slow" />
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight">
            <span className="text-gradient">{title}</span>
          </h1>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1.5 max-w-xs">{subtitle}</p>
          )}
        </div>

        {/* Form Body */}
        <div className="space-y-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
