export async function generateStaticParams({ params }: { params: { slug: string } }) {
    const events = await fetch('https://web-tools.asinkron.com/api/events').then((res) => res.json())
    return events.map((event: { url: any }) => ({
        slug: event.url,
    }))

}

export default function EventDetail({ params }: { params: { slug: string } }) {
    return <div>My Post: {params.slug}</div>
}