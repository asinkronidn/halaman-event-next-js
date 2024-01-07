import type { Metadata } from 'next'
import { Event } from '../../../interfaces/event';
import { formatDate } from '../../../helpers';
import parse from 'html-react-parser';


export async function generateStaticParams({ params }: { params: { slug: string } }) {
    const events = await fetch('https://web-tools.asinkron.com/api/events').then((res) => res.json())
    return events.map((event: { url: any }) => ({
        slug: event.url,
    }))
}

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
                <div className={`col-span-full md:col-start-2 md:col-end-12`}>
                    <h3 className={`mb-4 text-xl font-bold tracking-tight text-primary dark:text-white md:text-2xl lg:text-3xl mb-5 xl:text-3.5xl xl:tracking-tighter`}>Registration</h3>
                    {/* <div className={`bg-white border-t-4 border-purple rounded-b px-4 py-3 shadow-md`} role="alert">
                        <div>
                            <p className={`font-bold`}>Selamat pendaftaran anda berhasil</p>
                            <p className={`text-sm`}>Jika anda sebelumnya belum menjadi member asinkron.com. Silahkan cek undangan Discord di inbox/spam anda.</p>
                        </div>
                    </div> */}

                    <div className={`w-full`}>
                        <form>
                            <div className={`mb-4`}>
                                <label className={`block text-gray-700 text-sm font-bold mb-2`} htmlFor={`email`}>
                                    Email*
                                </label>
                                <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="email" type="email" placeholder="Email"/>
                            </div>
                            <div className={`mb-4`}>
                                <label className={`block text-gray-700 text-sm font-bold mb-2`} htmlFor={`nama`}>
                                    Nama*
                                </label>
                                <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="nama" type="text" placeholder="Nama"/>
                            </div>
                            <div className={`mb-4`}>
                                <label className={`block text-gray-700 text-sm font-bold mb-2`} htmlFor={`kota`}>
                                    Kota Domisili*
                                </label>
                                <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="kota" type="text" placeholder="Kota"/>
                            </div>
                            <div className={`mb-4`}>
                                <label className={`block text-gray-700 text-sm font-bold mb-2`} htmlFor={`phone`}>
                                    No Wa Aktif
                                </label>
                                <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="phone" type="tel" placeholder="No. WA"/>
                                <small>Isi agar tidak ketinggalan info terbaru soal artikel dan workshop melalui notifikasi Whatsapp.</small>
                            </div>
                            <div className={`mb-6`}>
                                <label className={`block text-gray-700 text-sm font-bold mb-2`} htmlFor={`phone`}>
                                    Dari mana Mendapat Info Workshop Ini?*
                                </label>
                                {['facebook', 'discord', 'email', 'whatsapp', 'instagram', 'twitter', 'website'].map((channel, index) => (
                                    <div className={`flex items-center mb-4`}>
                                        <input id={`country-option-${index}`} type="radio" name="dari_mana_mendapat_info_workshop" value={channel} className={`h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300`} aria-labelledby={`country-option-${index}`} aria-describedby="{`country-option-${index}`}"/>
                                        <label htmlFor={`country-option-${index}`} className={`text-sm font-medium text-gray-900 ml-2 block capitalize`}>
                                            {channel}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {/* <div className={`mb-6`}>
                            <label className={`block text-gray-700 text-sm font-bold mb-2`} for="password">
                                Password
                            </label>
                            <input className={`shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} id="password" type="password" placeholder="******************"/>
                            <p className={`text-red-500 text-xs italic`}>Please choose a password.</p>
                            </div> */}
                            <div className={`inline-flex items-center mb-2`}>
                                <label className={`relative flex items-center rounded-full cursor-pointer`} htmlFor="checkbox-member">
                                    <input type="checkbox"
                                    className={`before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10`}
                                    id="checkbox-member" />
                                    <span
                                    className={`absolute text-dark transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                        stroke="currentColor" stroke-width="1">
                                        <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"></path>
                                    </svg>
                                    </span>
                                </label>
                                <label className={`pl-2`} htmlFor="checkbox-member">Setuju untuk didaftarkan sebagai member asinkron.com secara gratis.</label>
                            </div>
                            <div className={`inline-flex items-center mb-5`}>
                                <label className={`relative flex items-center rounded-full cursor-pointer`} htmlFor="checkbox-discord">
                                    <input type="checkbox"
                                    className={`before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10`}
                                    id="checkbox-discord" />
                                    <span
                                    className={`absolute text-dark transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                        stroke="currentColor" stroke-width="1">
                                        <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"></path>
                                    </svg>
                                    </span>
                                </label>
                                <label className={`pl-2`} htmlFor="checkbox-discord">Anda wajib memiliki akun discord, karena diskusi akan dilaksanakan di discord.</label>
                            </div>

                            <div className={`flex items-center justify-between`}>
                                <button className={`bg-purple w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`} type="button">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}