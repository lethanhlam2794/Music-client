// src/app/tag/[genre]/layout.tsx

"use client"; // Đánh dấu layout.tsx là Client Component

import { PropsWithChildren, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '@/store';

export default function GenreLayout({ children }: { children: React.ReactNode }) {



  return (
    <html>
      <head />
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}