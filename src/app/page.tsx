// import Image from 'next/image'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Event } from '../interfaces/event';
import { formatDate } from '../helpers';

export const metadata: Metadata = {
  title: 'Event Asinkron Indonesia',
  description: 'Kumpulan workshop bahasa indonesia react.js, next.js dan remix run',
  openGraph: {
    title: 'Event Asinkron Indonesia',
    description: 'Kumpulan workshop bahasa indonesia react.js, next.js dan remix run',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/assets/img/facebook-meta-remix-next-step.png',
      },
    ],
    // image: '/assets/img/logo-asinkron-favicon.png',
  }
}

async function getData() {
  const res = await fetch('https://web-tools.asinkron.com/api/events')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}


export default async function Home() {
  const events: Array<Event> = await getData()
  // const events: Array<any> = [{
  //   status: true,
  //   place: 'Zoom',
  //   url: '/details/remix-next-step',
  //   startTime: '2024-01-13 09:30:00',
  //   title: 'Remix, Next Step: Membuat Notes App',
  //   description: 'Disini kita akan membahasa cara kerja remix, lalu belajar membuat notes app dengan database JSON.'
  // }, {
  //   status: true,
  //   place: 'Zoom',
  //   url: '/details/remix-next-step',
  //   startTime: '2024-01-01 09:30:00',
  //   title: 'Remix, Next Step: Membuat Notes App',
  //   description: 'Disini kita akan membahasa cara kerja remix, lalu belajar membuat notes app dengan database JSON.'
  // }];

  return (
    <div>
      <div className={`flex flex-col gap-y-[30px]`}>
      {events.map(event => (
          <div key={event.id} className={`flex flex-wrap bg-white dark:bg-gray-800 py-7 pr-7 relative`}>
            { !event.status || new Date(event.startTime) < new Date() ? (
              <div className={`disable-event absolute top-0	left-0 w-full h-full`}/>
            ) : (
              ''
            )}
            <div className={`w-20 text-center md:w-24 lg:w-[140px]`}>
              <time className={`flex flex-col items-center text-xs font-bold uppercase md:text-base`} dateTime={event.startTime}>
                <span className={`text-accent`}>
                  {formatDate(event.startTime, 'month')}
                </span>
                <span className={`text-2xl tracking-tighter md:text-[34px] md:leading-none text-primary dark:text-white`}>
                  {formatDate(event.startTime, 'day')}
                </span>
              </time>
            </div>
            <div className={`flex flex-1 flex-wrap items-center`}>
            <div className={`basis-full lg:basis-7/12 lg:pr-8`}>
              <h4 className={`mb-3 text-lg font-bold leading-tight tracking-tight md:mb-1 md:text-1.5xl md:leading-tight lg:leading-none`}>
                <Link className={`text-primary dark:text-white transition-colors hover:text-accent dark:hover:text-accent`} href={`/details/${event.url}`}>
                  {event.title}
                </Link>
              </h4>
              <div className={`text-sm md:text-base lg:tracking-tight xl:text-lg xl:leading-8`}>
                <p className={`leading-tight`}>
                  {event.short_description}
                </p>
              </div>
            </div>
            <div className={`basis-full lg:basis-5/12`}>
              <ul className={`flex flex-wrap gap-y-5 pt-7 lg:pt-0`}>
                <li className={`flex basis-full gap-x-4 leading-tight sm:basis-1/2 md:basis-1/3 lg:basis-7/12 xl:basis-2/3`}>
                  <div className={`lg:pt-1`}>
                    <svg role="img" className={`h-6 w-6 fill-primary dark:fill-white`}>
                      <use xlinkHref="/assets/img/icons.svg#pin"></use>
                    </svg>
                  </div>
                  <div>
                    <h5 className={`font-bold tracking-tight text-primary dark:text-white md:text-lg md:leading-tight lg:pb-[2px]`}>
                      {event.place}
                    </h5>
                    <span className={`text-xs lg:text-sm`}>Where</span>
                  </div>
                </li>
                <li className={`flex basis-full gap-x-4 leading-tight sm:basis-1/2 md:basis-1/3 lg:basis-5/12 xl:basis-1/3`}>
                  <div className={`lg:pt-1`}>
                    <svg role="img" className={`h-6 w-6 fill-primary dark:fill-white`}>
                      <use xlinkHref="/assets/img/icons.svg#clock"></use>
                    </svg>
                  </div>
                  <div>
                    <h5 className={`font-bold tracking-tight text-primary dark:text-white md:text-lg md:leading-tight lg:pb-[2px]`}>
                      {formatDate(event.startTime, 'hour')}
                    </h5>
                    <span className={`text-xs lg:text-sm`}>Time</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          </div>
      ))}
      </div>
    </div>
  )
}
