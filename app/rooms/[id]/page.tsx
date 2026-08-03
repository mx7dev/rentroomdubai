import { notFound } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { buildWhatsAppLink } from '@/lib/whatsapp'

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

  return (
    <main className="mx-auto max-w-3xl p-8">
      {room.photo_urls?.length > 0 && (
        <div className="mb-6 grid grid-cols-2 gap-2">
          {room.photo_urls.map((url: string) => (
            <div key={url} className="relative h-56 w-full overflow-hidden rounded-lg">
              <Image src={url} alt={room.title} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      <h1 className="text-2xl font-bold">{room.title}</h1>
      <p className="text-gray-500">{room.area}</p>
      <p className="mt-2 text-2xl font-bold">AED {room.price.toLocaleString()}/month</p>

      <span className="inline-block mt-2 rounded-full bg-gray-100 px-3 py-1 text-xs">
        {room.room_type}
      </span>

      {room.description && (
        <p className="mt-4 text-gray-700">{room.description}</p>
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
