import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import { Providers } from "./providers";
import { AppNavigation } from "@/components/navigation";
import { DragonCursor } from "@/components/effects/DragonCursor";
import { NCSBackground } from "@/components/effects/NCSBackground";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nhạc của Lâm - Âm Nhạc Trực Tuyến Đỉnh Cao",
  description: "Khám phá thế giới âm nhạc với hàng triệu bài hát, album và nghệ sĩ yêu thích.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body
        className={`${outfit.variable} ${inter.variable} font-sans antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground`}
      >
        <Providers>
          <NCSBackground />
          <DragonCursor />
          <AppNavigation />
          <main className="min-h-screen pb-24 relative z-10">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

