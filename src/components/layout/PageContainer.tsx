import { cn } from "@/lib/utils";

interface PageContainerProps {
  className?: string;
  children: React.ReactNode;
}

export function PageContainer({ className, children }: PageContainerProps) {
  return (
    <main className={cn("container mx-auto px-4 py-6 md:px-6 md:py-8", className)}>
      {children}
    </main>
  );
}
