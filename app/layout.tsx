import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import HamburgerButton from '@/components/HamburgerButton'
import TickerFeed from '@/components/TickerFeed'

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
  const navMenu = (
    <nav className="bg-red-500 flex flex-wrap items-center justify-between relative md:static p-2 md:p-4">
      <div className="block md:mr-2 md:hidden">
        <HamburgerButton height="32" width="32"/>
      </div>
      <div className="flex items-center mr-auto absolute left-2/4 -translate-x-2/4 md:static md:left-0 md:-translate-x-0 md:mr-6">
        <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
        <span className="font-semibold text-xl tracking-tight">Zach's Blog</span>
      </div>
      <div className="hidden flex-grow md:w-auto md:flex md:items-center mr-2">
        <Link href="/" className="hover:underline mr-6">Home</Link>
        <Link href="/" className="hover:underline mr-6">Posts</Link>
        <Link href="/" className="hover:underline mr-6">Lyrics</Link>
        <Link href="/about" className="hover:underline mr-6">About</Link>
      </div>
    </nav>
  );

  const header = (
    <header className="bg-red-700 rounded-b w-screen p-2 text-center">
      <div className="flex font-extrabold">
        <div className="my-auto mx-0">
          <HamburgerButton height="32" width="32" />
        </div>
        <div className="my-auto w-screen flex text-xl justify-around p-2">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/" className="hover:underline">Posts</Link>
          <Link href="/" className="hover:underline">Lyrics</Link>
          <Link href="/about" className="hover:underline">About</Link>
        </div>
        <div className="place-content-end mx-0 my-auto">
          <HamburgerButton />
        </div>
      </div>
    </header>
  );

  const tickerFeed = (
    <div className=" text-gray-200 w-screen">
      <TickerFeed>
        🔥 Welcome to my blog 🔥 
        I write articles about technology and gaming 💻, two of my favorite passions. 
        I put this website together myself using NextJS.
        If you have any feedback please submit at the bottom of the page.
      </TickerFeed>
    </div>
  );

  const footer = (
    <footer>
      <div className="bg-slate-800 p-2 text-center rounded-t w-screen mt-auto">
        <h3 className="text-sm text-slate-200">Developed by Zachary Hillman.</h3>
        <p className="text-xs text-slate-400">Since {new Date("2023-10-04").toDateString()}</p>
        <Link href="https://github.com/zjhillman/nextjs-blog-site">
          <p className="text-xs text-slate-600">https://github.com/zjhillman/nextjs-blog-site</p>
        </Link>
      </div>
    </footer>
  );

  return (
    <html lang="en">
      <body className={inter.className + " h-full w-full"}>
        <div className="">
          {navMenu}
          {tickerFeed}
          {children}
          {footer}
        </div>
      </body>
    </html>
  )
}
