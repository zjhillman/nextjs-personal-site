import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

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
  const header = (
    <header>
      <div className="bg-red-700 p-2 text-center ">
        <Link href="/">
          <h1 className="text-xl font-bold hover:underline">Zach's Blog</h1> 
        </Link>
        <p className="text-sm">🔥Welcome to my nerd blog 💻</p>
      </div>
    </header>
  );

  const footer = (
    <footer>
      <div className="bg-slate-800 p-2 text-center">
        <h3 className="text-sm text-slate-200">Developed in collaboration with the United States Airforce ✈️</h3>
        <p className="text-xs text-slate-400">(jk government)</p>
      </div>
    </footer>
  )
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          {header}
          {children}
          {footer}
        </div>
      </body>
    </html>
  )
}
