// src/app/tag/genres/layout.tsx
"use client"; // Đánh dấu layout.tsx là Client Component

import { PropsWithChildren, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '@/store';
import { NavHomeTop } from '@/components/HomePage/NavHomeTop';
import { GocChuaLanh } from '@/page/constants';

export default function ThemeAndGenreLayout({ children }: PropsWithChildren) {



  return (
    <html>
      <head />
      <body>
      <div className="p-6 bg-gray-50 rounded-lg shadow-lg mt-16">
      <GocChuaLanh/>
        {/* <NavHomeTop/> */}
        <Provider store={store}>
          {children}
        </Provider>
        </div>
      </body>
    </html>
  );
}