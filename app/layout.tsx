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
  const header = (
    <header className="bg-red-700 rounded-b w-screen p-2 text-center">
      <div className="flex font-extrabold">
        <div className="my-auto mx-0">
          <HamburgerButton />
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
          {header}
          {tickerFeed}
          {children}
          {footer}
        </div>
      </body>
    </html>
  )
}
