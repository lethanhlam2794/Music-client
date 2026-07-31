import { GenreDetailPageClient } from "@/features/genres/GenreDetailPageClient";

interface GenrePageProps {
  params: { genre: string };
}

export default function GenrePage({ params }: GenrePageProps) {
  return <GenreDetailPageClient genre={params.genre} />;
}