// src/components/login/LoginForm.tsx
"use client";

import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser } from '@/redux/LoginSlice';
import { useRouter } from 'next/navigation';

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error } = useAppSelector((state) => state.login);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginSuccess = await dispatch(loginUser(formData));
    if (loginSuccess) {
      router.push('/'); // Chuyển hướng đến trang chủ nếu đăng nhập thành công
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
        </div>

        {error && <p className="text-red-500 text-center"> {typeof error === 'string' ? error : error.message} </p>}
        <button type="submit" className="w-full bg-blue-500 text-blue py-2 rounded hover:bg-blue-600" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
