import Footer from './components/footer'
import Header from './components/header'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Carmix - Experience Automotive Excellence',
  description: 'Discover the finest selection of luxury, performance, and eco-friendly vehicles at Carmix.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

