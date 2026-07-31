import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";

interface ListPageTemplateProps {
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  children: React.ReactNode;
}

export function ListPageTemplate({
  title,
  description,
  primaryAction,
  className,
  children,
}: ListPageTemplateProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {primaryAction && (
          <Button onClick={primaryAction.onClick}>
            <PlusIcon className="mr-2 size-4" />
            {primaryAction.label}
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}
