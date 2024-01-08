import type { Metadata } from 'next'
import { Event } from '../../../interfaces/event';
import { formatDate } from '../../../helpers';
import parse from 'html-react-parser';
import RegistrationForm from '../../../components/registration-form';

// export async function generateStaticParams({ params }: { params: { slug: string } }) {
//     const events = await fetch(`${process.env.BASE_API_URL}api/events`).then((res) => res.json())
//     return events.map((event: { url: any }) => ({
//         slug: event.url,
//     }))
// }

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const event: Event= await getData(params.slug)
    return {
        title: event.title,
        description: event.short_description,
        openGraph: {
          title: event.title,
          description: event.short_description,
          locale: 'id_ID',
          type: 'website',
        //   images: [
        //     {
        //       url: '/assets/img/facebook-meta-remix-next-step.png',
        //     },
        //   ],
          // image: '/assets/img/logo-asinkron-favicon.png',
        }
    }
}

async function getData(slug: string) {
  const res = await fetch(`https://web-tools.asinkron.com/api/events/${slug}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function EventDetail({ params }: { params: { slug: string } }) {
    const event: Event= await getData(params.slug)
    // console.log(event)
    // return <div>My Post: {params.slug}</div>
    return (
        <div>
            <div className={`grid grid-cols-12 gap-x-2 md:gap-x-[30px]`}>
                <div className={`col-start-1 col-end-3 pt-1 text-center md:pt-0 lg:col-end-2`}>
                    <time className={`flex flex-col items-center text-2xs font-bold uppercase sm:text-xs md:text-base`} dateTime={formatDate(event.startTime, 'full')}>
                    <span className={`text-accent`}>{formatDate(event.startTime, 'month')}</span>
                    <span className={`text-xl tracking-tighter text-primary dark:text-white sm:text-2xl md:text-[34px] md:leading-none`}>{formatDate(event.startTime, 'day')}</span>
                    </time>
                </div>
                <div className={`col-start-3 col-end-13 lg:col-start-2 lg:col-end-12`}>
                    <h1 className={`mb-4 text-xl font-bold tracking-tight text-primary dark:text-white md:mb-5 md:text-2xl lg:mb-8 lg:text-4xl xl:mb-14 xl:text-5xl`}>{event.title}</h1>
                    <div className={`lg:text-lg lg:leading-8 lg:tracking-tight`}>
                        <p>
                            {event.short_description}
                        </p>
                    </div>
                    <ul className={`flex flex-wrap gap-y-5 pt-9 lg:pt-14 xl:gap-x-24`}>
                    <li className={`flex basis-full gap-x-4 leading-tight sm:basis-1/2 xl:basis-auto`}>
                        <div className={`lg:pt-1`}>
                        <svg role="img" className={`h-6 w-6 fill-primary dark:fill-white`}>
                            <use xlinkHref={`/assets/img/icons.svg#pin`}></use>
                        </svg>
                        </div>
                        <div>
                        <h5 className={`font-bold tracking-tight text-primary dark:text-white md:text-lg md:leading-tight lg:pb-[2px]`}>
                            {event.place}
                        </h5>
                        <span className={`text-xs lg:text-sm`}>Where</span>
                        </div>
                    </li>
                    <li className={`flex basis-full gap-x-4 leading-tight sm:basis-1/2 xl:basis-auto`}>
                        <div className={`lg:pt-1`}>
                        <svg role="img" className={`h-6 w-6 fill-primary dark:fill-white`}>
                            <use xlinkHref={`/assets/img/icons.svg#clock`}></use>
                        </svg>
                        </div>
                        <div>
                        <h5 className={`font-bold tracking-tight text-primary dark:text-white md:text-lg md:leading-tight lg:pb-[2px]`}>{formatDate(event.startTime, 'hour')}</h5>
                        <span className={`text-xs lg:text-sm`}>Starts</span>
                        </div>
                    </li>
                    {
                        event.endTime ? (
                        <li className={`flex basis-full gap-x-4 leading-tight sm:basis-1/2 xl:basis-auto`}>
                            <div className={`lg:pt-1`}>
                                <svg role="img" className={`h-6 w-6 fill-primary dark:fill-white`}>
                                    <use xlinkHref={`/assets/img/icons.svg#clock`}></use>
                                </svg>
                            </div>
                            <div>
                                <h5 className={`font-bold tracking-tight text-primary dark:text-white md:text-lg md:leading-tight lg:pb-[2px]`}>{formatDate(event.endTime, 'hour')}</h5>
                                <span className={`text-xs lg:text-sm`}>Ends</span>
                            </div>
                        </li>
                        ) : ''
                    }
                    <li className={`flex basis-full gap-x-4 leading-tight sm:basis-1/2 xl:basis-auto`}>
                        <div className={`lg:pt-1`}>
                        <svg role="img" className={`h-6 w-6 fill-primary dark:fill-white`}>
                            <use xlinkHref={`/assets/img/icons.svg#ticket`}></use>
                        </svg>
                        </div>
                        <div>
                        <h5 className={`font-bold tracking-tight text-primary dark:text-white md:text-lg md:leading-tight lg:pb-[2px]`}>{event.price ? event.price : 'Free'}</h5>
                        <span className={`text-xs lg:text-sm`}>Price</span>
                        </div>
                    </li>
                    </ul>
                </div>
            </div>
            
            <div className={`grid grid-cols-12 gap-y-14 gap-x-2 md:gap-x-[30px] mt-20`}>
                <div className={`col-span-full md:col-start-2 md:col-end-12`}>
                    <h3 className={`mb-4 text-xl font-bold tracking-tight text-primary dark:text-white md:text-2xl lg:text-3xl mb-5 xl:text-3.5xl xl:tracking-tighter`}>Description</h3>
                    <div className={`prose max-w-none prose-p:text-gray-500 prose-p:tracking-tighter prose-p:lg:mb-8 prose-p:lg:text-lg prose-p:lg:leading-8`}>
                        {parse(event.description)}
                    </div>
                </div>
            </div>
            
            <div className={`grid grid-cols-12 gap-y-14 gap-x-2 md:gap-x-[30px] mt-5 mb-10`}>
                { !event.status || new Date(event.startTime) < new Date() ? (
                            ''
                ) : (
                <div className={`col-span-full md:col-start-2 md:col-end-12`}>
                    <h3 className={`mb-4 text-xl font-bold tracking-tight text-primary dark:text-white md:text-2xl lg:text-3xl mb-5 xl:text-3.5xl xl:tracking-tighter`}>Registration</h3>
                    <div className={`w-full`}>
                        <RegistrationForm eventDetail={event} submitUrl={`${process.env.BASE_API_URL}api/events/registration/form`}/>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}