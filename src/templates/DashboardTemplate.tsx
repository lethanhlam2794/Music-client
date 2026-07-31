import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";

interface SidebarItem {
  label: string;
  href: string;
  active?: boolean;
}

interface DashboardTemplateProps {
  logo?: React.ReactNode;
  sidebarItems?: SidebarItem[];
  headerChildren?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function DashboardTemplate({
  logo,
  sidebarItems = [],
  headerChildren,
  className,
  children,
}: DashboardTemplateProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar logo={logo}>
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm transition-colors",
                  item.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </Sidebar>
      <div className="md:pl-64">
        <Header>{headerChildren}</Header>
        <main className={cn("p-4 md:p-6", className)}>{children}</main>
      </div>
    </div>
  );
}
