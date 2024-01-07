import Link from 'next/link'
import Image from 'next/image'
// import { Roboto } from 'next/font/google'
import './globals.css'

// const roboto = Roboto({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`antialiased tracking-tight font-base text-gray-500 text-base bg-gray-lighter overflow-x-hidden`}>
        <div className={`space-section m-auto px-4 pt-16 pb-36`}>
          <a href="http://asinkron.com/">
            <Image
              width={200}
              height={56}
              alt={`Workshop Asinkron Indonesia`}
              src="/assets/img/logo-asinkron.png"
              className={`logo-space-img m-auto`}
            />
          </a>
          <nav className={`main-nav`}>
            <ol className={` text-center pt-6 text-white font-black	relative flex flex-wrap justify-center divide-x-2 divide-white text-md uppercase leading-none`}>
              <li className={`px-[10px]`}>
                <a href="http://asinkron.com/">Home</a>
              </li>
              <li className={`px-[10px]`}>
                <Link href="/">Events</Link>
              </li>
            </ol>
          </nav>
        </div>
        <main id='main-content' className={`grow lg:pt-0`}>
          <div className={`pt-14 pb-5 lg:pt-40`}>
            <div className={`container`}>
              <div className={`relative -mt-20 mb-14 bg-white dark:bg-gray-800 shadow-3xl lg:-mt-[200px] rounded-lg p-4`}>
                {children}
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
