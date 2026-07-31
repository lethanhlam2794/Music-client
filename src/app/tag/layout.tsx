import { GocChuaLanh } from "@/page/constants";

export default function ThemeAndGenreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg mt-16">
      <GocChuaLanh />
      {children}
    </div>
  );
}
