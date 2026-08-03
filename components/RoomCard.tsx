import Image from 'next/image'
import Link from 'next/link'

type Room = {
    id: string
    title: string
    description: string | null
    price: number
    area: string
    room_type: string
    amenities: string[]
    is_available: boolean
    photo_urls: string[]
}

export default function RoomCard({ room }: { room: Room }) {
    return (
        <Link
            href={`/rooms/${room.id}`}
            className="block rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
        >
            {room.photo_urls?.[0] && (
                <div className="relative mb-3 h-48 w-full overflow-hidden rounded-lg">
                    <Image
                        src={room.photo_urls[0]}
                        alt={room.title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}
            <h2 className="text-lg font-semibold">{room.title}</h2>
            <p className="text-sm text-gray-500">{room.area}</p>
            <p className="mt-2 text-xl font-bold">AED {room.price.toLocaleString()}/month</p>
            <span className="inline-block mt-2 rounded-full bg-gray-100 px-3 py-1 text-xs">
                {room.room_type}
            </span>
            {room.amenities.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                    {room.amenities.map((item) => (
                        <li key={item} className="text-xs bg-blue-50 text-blue-700 rounded px-2 py-1">
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </Link>
    )
}
