import { notFound } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { buildWhatsAppLink } from '@/lib/whatsapp'

function LocationPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 shrink-0"
    >
      <path
        fillRule="evenodd"
        d="M9.69 18.933a.75.75 0 00.62 0c.16-.073.394-.187.68-.348.573-.32 1.34-.805 2.11-1.435 1.535-1.256 3.11-3.058 3.11-5.15a6.25 6.25 0 10-12.5 0c0 2.092 1.575 3.894 3.11 5.15a13.53 13.53 0 002.11 1.435c.286.161.52.275.68.348zM10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: room, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !room) {
    notFound()
  }

  const [heroPhoto, ...otherPhotos] = room.photo_urls ?? []

  return (
    <main className="mx-auto max-w-3xl p-8">
      {heroPhoto && (
        <div className="relative mb-2 h-80 w-full overflow-hidden rounded-xl bg-gray-100">
          <Image src={heroPhoto} alt={room.title} fill priority className="object-cover" />
          <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-medium shadow-sm">
            {room.room_type}
          </span>
        </div>
      )}

      {otherPhotos.length > 0 && (
        <div className="mb-6 grid grid-cols-3 gap-2">
          {otherPhotos.map((url: string) => (
            <div key={url} className="relative h-24 w-full overflow-hidden rounded-lg">
              <Image src={url} alt={room.title} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      <h1 className="text-2xl font-bold">{room.title}</h1>
      <p className="mt-1 flex items-center gap-1 text-gray-500">
        <LocationPinIcon />
        {room.area}
      </p>
      <p className="mt-2 text-3xl font-bold text-gray-900">
        AED {room.price.toLocaleString()}
        <span className="text-base font-normal text-gray-500">/month</span>
      </p>

      {room.description && (
        <p className="mt-4 whitespace-pre-line text-gray-700">{room.description}</p>
      )}

      {room.amenities?.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {room.amenities.map((item: string) => (
            <li key={item} className="text-xs bg-blue-50 text-blue-700 rounded px-2 py-1">
              {item}
            </li>
          ))}
        </ul>
      )}

      <a
        href={buildWhatsAppLink(room)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block w-full text-center rounded-lg bg-green-500 px-4 py-2 text-white font-medium hover:bg-green-600 transition-colors"
      >
        Contact via WhatsApp
      </a>
    </main>
  )
}
