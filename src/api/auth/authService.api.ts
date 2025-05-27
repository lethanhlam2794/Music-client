// // src/services/authService.api.ts
// import axios from 'axios';

// interface LoginData {
//     email: string;
//     password: string;
//   }
  
//   interface RegisterData {
//     fullName: string;
//     email: string;
//     password: string;
//   }
  
//   export async function loginService(data: LoginData) {
//     const response = await axios.post('http://localhost:3002/auth/login', data);
//     return response.data;
//   }
  
//   export async function registerService(data: RegisterData) {
//     console.log('Data being sent:', data); // In ra dữ liệu trước khi gửi
//   const response = await axios.post('http://localhost:3002/auth/register', data);
//   return response.data;
//   }