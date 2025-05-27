// src/app/api/auth/registerApi.ts
import { NextResponse } from 'next/server'
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("Request body:", body); // Log request body

    // Chuyển tiếp yêu cầu đến backend NestJS
    const response = await axios.post('http://localhost:3002/auth/register', body); 

    // Trả về kết quả từ backend cho client
    return NextResponse.json(response.data, { status: response.status }); 
  } catch (error: any) {
    console.error("Error:", error); // Log lỗi nếu có
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}