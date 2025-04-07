'use client'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import  store  from '@/redux/store'
import Navbar from '@/component/Navbar';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
        <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  )
}
