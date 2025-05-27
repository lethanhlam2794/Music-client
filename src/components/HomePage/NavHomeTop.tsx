// src/components/HomePage/NavHomeTop.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';  // Import chuẩn

export function NavHomeTop() {
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
    <nav className="fixed top-0 left-0 w-full bg-gray-800 p-4 flex justify-between items-center">
      {/* Thay đổi màu nền, padding, v.v. theo ý muốn */}
      <div>
        {/* Logo hoặc tên trang web */}
        <Link href="/" className="text-white text-2xl font-bold">
          Logo
        </Link>
      </div>
      <div className="flex space-x-4">
        {/* Điều chỉnh khoảng cách giữa các mục */}
        <Link href="#bxh" className="text-white hover:text-gray-300">
          BXH Nhạc Mới
        </Link>
        <Link href="#topics" className="text-white hover:text-gray-300">
          Chủ Đề & Thể Loại
        </Link>
        <Link href="#top100" className="text-white hover:text-gray-300">
          Top 100
        </Link>
      </div>
      <div>
      {isLoggedIn ? (
          <div className="flex items-center my-3">
            <span className="text-white font-bold">{userEmail}</span>
            <Button variant="outline-light" className="ml-2 bg-gray-700 border-none font-bold text-sm" onClick={handleLogout}>
              Đăng Xuất
            </Button>
          </div>
        ) : (
          <Button variant="outline-light" className="my-3 w-full bg-[#a742f5] border-none font-bold text-sm">
            Đăng Nhập
          </Button>
        )}
      </div>
    </nav>
  );
}