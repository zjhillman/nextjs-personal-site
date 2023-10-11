import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Navbar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zachil\'s Blog',
  description: 'Blog built for next level entertainment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const neoHeader = (
    <header className="bg-red-700 rounded-b mx-auto p-2 text-center">
      <div className="flex font-extrabold">
        <div className="my-auto mx-0">
          <Navbar />
        </div>
        <div className="m-auto">
          <Link href="/">
            <h1 className="hover:underline text-xl">Home</h1> 
          </Link>
          <p className="text-sm">🔥Welcome to my blog 💻</p>
        </div>
        <div className="place-content-end mx-0 my-auto text-lg">
          <p>More</p>
        </div>
      </div>
    </header>
  )

  const header = (
    <header>
      <div className="bg-red-700 rounded max-w-3xl mx-auto p-2 text-center ">
        <Link href="/">
          <h1 className="text-xl font-bold hover:underline">Zach's Blog</h1> 
        </Link>
        <p className="text-sm">🔥Welcome to my blog 💻</p>
      </div>
    </header>
  );

  const footer = (
    <footer>
      <div className="bg-slate-800 mt-4 p-2 text-center rounded-t mx-auto">
        <h3 className="text-sm text-slate-200">Developed in collaboration with the United States Airforce ✈️</h3>
        <p className="text-xs text-slate-400">(jk government)</p>
      </div>
    </footer>
  )
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          {neoHeader}
          {children}
          {footer}
        </div>
      </body>
    </html>
  )
}
