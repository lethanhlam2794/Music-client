// src/app/api/auth/login/login.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await axios.post('http://localhost:3002/auth/login', body);
    console.log('Calling API:', response);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json({ message: 'Login failed' }, { status: 500 });
  }
}
