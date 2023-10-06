import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'zachil\'s blog',
  description: 'blog built for next level entertainment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const header = (
    <header>
      <div>
        <Link href="/">
          <h1>Zachil's Blog</h1> 
        </Link>
        <p>Welcome to my nerd blog</p>
        <br />
      </div>
    </header>
  );

  const footer = (
    <footer>
      <div>
        <br />
        <h3>Developed in collaboration with the United States Airforce 😎</h3>
      </div>
    </footer>
  )
  return (
    <html lang="en">
      <body className={inter.className}>
        {header}
        {children}
        {footer}
      </body>
    </html>
  )
}
