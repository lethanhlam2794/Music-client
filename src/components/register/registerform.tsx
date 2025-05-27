"use client";  // Đảm bảo đây là dòng đầu tiên

import { registerUser } from '@/redux/RegisterSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation'; // Đổi sang 'next/navigation' thay vì 'next/router'
import { useState } from 'react';

export default function Register() {
  const dispatch = useAppDispatch();
  const { isLoading, error, user } = useAppSelector((state) => state.register);

  const router = useRouter(); // Sử dụng router để điều hướng
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [passwordError, setPasswordError] = useState('');

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Validate password length when input changes
    if (e.target.name === 'password') {
      if (e.target.value.length < 8) {
        setPasswordError('Password must be at least 8 characters long');
      } else {
        setPasswordError('');   

      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    // Check password length before submitting
    if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return; 
    }
    dispatch(registerUser(formData));
  };

  const handleRetry = () => {
    // Khi nhấn nút "Thử lại", không làm gì, giữ nguyên form
  };

  const handleNavigateToLogin = () => {
    router.push('/login'); // Điều hướng sang trang đăng nhập
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        
        {/* Nếu đăng ký thành công */}
        {user && (
          <div className="mb-6">
            <p className="text-green-500 text-center">Đăng ký thành công!</p>
            <button
              type="button"
              onClick={handleNavigateToLogin}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Chuyển sang đăng nhập
            </button>
          </div>
        )}

        {/* Nếu có lỗi khi đăng ký */}
        {!user && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}   

            className="w-full px-3 py-2 border rounded"
            required
          />
          {/* Display password error message */}
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>} 
        </div>

            {error && (
              <div className="mb-4">
                <p className="text-red-500 text-center">
                  {typeof error === 'string' ? error : error.message}
                </p>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                  Thử lại
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </>
        )}
      </form>
    </div>
  );
}
