"use client"; // Đánh dấu layout.tsx là Client Component

import { PropsWithChildren, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '@/store';

export default function RegisterLayout({ children }: PropsWithChildren) {
  useEffect(() => {
    const data = { example: 'data' };
    localStorage.setItem('myData', JSON.stringify(data));
  }, []);

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