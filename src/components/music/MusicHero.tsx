import { cn } from "@/lib/utils";

interface MusicHeroProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function MusicHero({
  title,
  description,
  className,
  children,
}: MusicHeroProps) {
  return (
    <section
      className={cn(
        "bg-gradient-to-r from-primary to-primary/60 py-16",
        className
      )}
    >
      <div className="container mx-auto text-center text-primary-foreground">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        {description && <p className="text-lg">{description}</p>}
        {children}
      </div>
    </section>
  );
}
