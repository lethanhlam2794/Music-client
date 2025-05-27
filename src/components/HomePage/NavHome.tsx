import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';  // Import chuẩn

export function NavHomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const decodedToken: any = jwtDecode(token);
      setUserEmail(decodedToken.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-[5%] bg-red-500 p-10 text-black hover:w-[20%] transition-all duration-300 ease-in-out group">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl group-hover:hidden">
        &gt;&gt;
      </div>

      <nav className="flex flex-col h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">

        <hr className="border-t border-white opacity-20 my-3" />
        <Link href="#bxh" className="text-white my-3">
          BXH Nhạc Mới
        </Link>
        <Link href="tag" className="text-white my-3">
          Chủ Đề & Thể Loại
        </Link>
        <Link href="#top100" className="text-white my-3">
          Top 100
        </Link>
        {isLoggedIn ? (
          <div className="flex items-center my-3">
            <span className="text-white font-bold">{userEmail}</span>
            <Button variant="outline-light" className="ml-2 bg-gray-700 border-none font-bold text-sm" onClick={handleLogout}>
              Đăng Xuất
            </Button>
          </div>
        ) : (
          <Button href="login" variant="outline-light" className="my-3 w-full bg-[#a742f5] border-none font-bold text-sm">
            Đăng Nhập
          </Button>
        )}
        <Button variant="outline-light" className="my-3 w-full border border-[#a742f5] text-[#a742f5] bg-transparent font-bold text-sm">
          Tạo Playlist Mới
        </Button>
      </nav>
    </div>
  );
}
