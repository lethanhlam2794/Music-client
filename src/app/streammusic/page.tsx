// // src/app/streammusic/page.tsx
// "use client";

// import { useRouter } from 'next/navigation';
// import MusicPlayer from '@/components/music/musicStream';

// export default function StreamMusicPage({ params }: { params: { id: string } }) {
//   const router = useRouter();
//   const musicId = params.id;

//   if (!musicId) {
//     router.push('/');
//     return null;
//   }

//   return <MusicPlayer musicId={musicId} />;
// }
export default function StreamMusicPage(){
    return (
        <div>hello word</div>
    )
}