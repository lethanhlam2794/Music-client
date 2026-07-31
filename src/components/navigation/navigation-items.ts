import { Home, Music, Tag, Upload, ListMusic } from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  requiresAuth?: boolean;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: "Trang chủ",
    href: "/",
    icon: Home,
  },
  {
    label: "BXH Nhạc Mới",
    href: "/#bxh",
    icon: Music,
  },
  {
    label: "Chủ Đề & Thể Loại",
    href: "/tag",
    icon: Tag,
  },
  {
    label: "Top 100",
    href: "/#top100",
    icon: ListMusic,
  },
  {
    label: "Tải lên",
    href: "/music",
    icon: Upload,
    requiresAuth: true,
  },
];