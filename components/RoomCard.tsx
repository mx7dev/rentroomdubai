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

export default function RoomCard({ room }: { room: Room }) {
    return (
        <Link
            href={`/rooms/${room.id}`}
            className="block overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="relative h-56 w-full bg-gray-100">
                {room.photo_urls?.[0] && (
                    <Image
                        src={room.photo_urls[0]}
                        alt={room.title}
                        fill
                        className="object-cover"
                    />
                )}
                <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-medium shadow-sm">
                    {room.room_type}
                </span>
            </div>
            <div className="p-4">
                <h2 className="text-lg font-semibold">{room.title}</h2>
                <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                    <LocationPinIcon />
                    {room.area}
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                    AED {room.price.toLocaleString()}
                    <span className="text-sm font-normal text-gray-500">/month</span>
                </p>
                {room.amenities.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                        {room.amenities.map((item) => (
                            <li key={item} className="text-xs bg-blue-50 text-blue-700 rounded px-2 py-1">
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Link>
    )
}
