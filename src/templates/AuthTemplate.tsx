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
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[450px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 size-[300px] bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className={cn("relative z-10 w-full max-w-md glass-panel rounded-3xl p-8 border border-white/15 shadow-2xl shadow-violet-950/40 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-500", className)}>
        {/* Brand Logo Header */}
        <div className="flex flex-col items-center justify-center mb-6 text-center">
          <Link href="/" className="size-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/30 mb-3 hover:scale-105 transition-transform">
            <Disc3 className="h-6 w-6 text-white animate-spin-slow" />
          </Link>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">{subtitle}</p>
          )}
        </div>

        {/* Form Body */}
        <div className="space-y-4">{children}</div>

        {/* Footer Link */}
        {footer && (
          <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

