"use client"; // This is a client component 👈🏽
// import { EventRegistration } from '../interfaces/eventRegistration';
import { Event } from '../interfaces/event';
import { serializeErrorMessage } from '../helpers';
// import { EventRegistration } from '../interfaces/eventRegistration';
import React, { useState, FormEvent } from 'react';
import parse from 'html-react-parser';

type Props = {
    eventDetail: Event;
};
  
export default function RegistrationForm({eventDetail}: Props) {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null | undefined>(null);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsLoading(true)
        setError(null) // Clear previous errors when a new request starts
     
        try {
            const formData = new FormData(event.currentTarget);
            let jsonData = Object.fromEntries(formData);
            Object.assign(jsonData, {event_id: eventDetail.id});

            // if (jsonData.event_id)

            const response = await fetch(`${process.env.BASE_API_URL}api/events/registration/form`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },          
              body: JSON.stringify(jsonData),
            })

            if (!response.ok) {
                if (response.status === 422) {
                    const responseText = await response.text();
                    setError(serializeErrorMessage(responseText));
                    // const responseText = response.text().then(text => {
                    //     setError(serializeErrorMessage(text));
                    // });
                } else {
                    setError(serializeErrorMessage('Failed to submit the data. Please try again.'));
                }
                return setTimeout(() => {
                    const errorElement = document.querySelector('#errorMessage');
                    if (errorElement) {
                        errorElement.scrollIntoView();
                    }
                }, 500)
            }
       
            // Handle response if necessary
            // const data = await response.json()
            setIsSuccess(true)
            // ...
          } finally {
            setIsLoading(false)
        }      
    }
    return (
        <div>
        {
            isSuccess ? (
            <div className={`bg-white border-t-4 border-purple rounded-b px-4 py-3 shadow-md`} role="alert">
                <div>
                    <p className={`font-bold`}>Selamat pendaftaran anda berhasil</p>
                    <p className={`text-sm`}>Jika anda sebelumnya belum menjadi member asinkron.com. Silahkan cek undangan Discord di inbox/spam anda.</p>
                </div>
            </div>
            ) : (
            <form onSubmit={onSubmit}>
            {error && <div style={{ color: 'red' }} id={`errorMessage`}>
                { parse(error) }
            </div>}
                <div className={`mb-4`}>
                    <label className={`block text-gray-700 text-sm font-bold mb-2`} htmlFor={`email`}>
                        Email*
                    </label>
                    <input required={true} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="email" name="email" type="email" placeholder="Email"/>
                    <small>Silahkan isi dengan alamat email aktif.</small>
                </div>
                <div className={`mb-4`}>
                    <label className={`block text-gray-700 text-sm font-bold mb-2`} htmlFor={`nama`}>
                        Nama*
                    </label>
                    <input required={true} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="nama" name="nama" type="text" placeholder="Nama"/>
                </div>
                <div className={`mb-4`}>
                    <label className={`block text-gray-700 text-sm font-bold mb-2`} htmlFor={`kota`}>
                        Kota Domisili*
                    </label>
                    <input required={true} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="kota" name="kota" type="text" placeholder="Kota"/>
                </div>
                <div className={`mb-4`}>
                    <label className={`block text-gray-700 text-sm font-bold mb-2`} htmlFor={`phone`}>
                        No Wa Aktif
                    </label>
                    <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="phone" type="tel" name="phone" placeholder="No. WA"/>
                    <small>Isi agar tidak ketinggalan info terbaru soal artikel dan workshop melalui notifikasi Whatsapp.</small>
                </div>
                <div className={`mb-6`}>
                    <label className={`block text-gray-700 text-sm font-bold mb-2`} htmlFor={`phone`}>
                        Dari mana Mendapat Info Workshop Ini?*
                    </label>
                    {['facebook', 'discord', 'email', 'whatsapp', 'instagram', 'twitter', 'website'].map((channel, index) => (
                        <div className={`flex items-center mb-4`} key={index}>
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
                        required={true}
                        className={`before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10`}
                        id="checkbox-member" />
                        <span
                        className={`absolute text-dark transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                            stroke="currentColor" strokeWidth="1">
                            <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"></path>
                        </svg>
                        </span>
                    </label>
                    <label className={`pl-2`} htmlFor="checkbox-member">Setuju untuk didaftarkan sebagai member asinkron.com secara gratis.</label>
                </div>
                <div className={`inline-flex items-center mb-5`}>
                    <label className={`relative flex items-center rounded-full cursor-pointer`} htmlFor="checkbox-discord">
                        <input type="checkbox"
                        required={true}
                        className={`before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10`}
                        id="checkbox-discord" />
                        <span
                        className={`absolute text-dark transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                            stroke="currentColor" strokeWidth="1">
                            <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"></path>
                        </svg>
                        </span>
                    </label>
                    <label className={`pl-2`} htmlFor="checkbox-discord">Anda wajib memiliki akun discord, karena diskusi akan dilaksanakan di discord.</label>
                </div>

                <div className={`flex items-center justify-between`}>
                    <button className={`bg-purple w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`} type="submit">
                        {isLoading ? 'Loading...' : 'Submit'}
                    </button>
                </div>
            </form>
            )
        }
        </div>
    )
}