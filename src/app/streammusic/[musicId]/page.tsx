// // src/app/streammusic/[musicId]/page.tsx
// 'use client';
// import React, { useEffect, useState } from 'react';
// import MusicPlayer from '@/components/music/musicStream';
// import { getRecentMusic } from '@/api/music/music.api';

// interface StreamMusicPageProps {
//   params: {
//     musicId: string;
//   };
// }
// interface Music {
//   id: string;
//   title: string;
//   artist: string;
//   filename: string;
//   originalname: string;
//   storageName: string;
//   status: string;
//   lyrics: string;
// }

// const StreamMusicPage: React.FC<StreamMusicPageProps> = ({ params }) => {
//   const [songTitle, setSongTitle] = useState('');
//   const [artist, setArtist] = useState('');
//   const [lyrics, setLyrics] = useState(''); // Thêm state lyrics

//   useEffect(() => {
//     const fetchMusicDetails = async () => {
//       try {
//         const recentMusic: Music[] = await getRecentMusic(); // Khai báo kiểu dữ liệu rõ ràng
//         const music = recentMusic.find((music: Music) => music.id.toString() === params.musicId);
//         if (music) {
//           setSongTitle(music.title);
//           setArtist(music.artist);
//           setLyrics(music.lyrics);
//         } else {
//           console.error('Không tìm thấy bài hát');
//           // Xử lý lỗi khi không tìm thấy bài hát, ví dụ: redirect về trang chủ
//         }
//       } catch (error) {
//         console.error('Error fetching music details:', error);
//       }
//     };

//     fetchMusicDetails();
//   }, [params.musicId]);


//   return (
//     <MusicPlayer
//       musicId={params.musicId}
//       songTitle={songTitle}
//       artist={artist}
//       lyrics={lyrics} // Truyền lyrics vào component
//     />
//   );
// };
// export default StreamMusicPage;
