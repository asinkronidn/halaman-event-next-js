import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Form Registrasi Workshop',
    description: 'Workshop remix, next step. Kita akan membahas dasar remix dengan membuat projek notes app',
    openGraph: {
      title: 'Registrasi Workshop, Workshop remix, next step',
      description: 'Kita akan membahas dasar remix dengan membuat projek notes app',
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

export default function EventDetail() {
    return (
        <main>This Is EventDetail</main>
    )
}