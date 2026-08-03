import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'

export default async function AdminRoomsPage() {
  const supabase = await createClient()
  const { data: rooms, error } = await supabase
    .from('rooms')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <p className="p-8 text-red-600">Error: {error.message}</p>
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Rooms</h1>
        <Link
          href="/admin/rooms/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          New Room
        </Link>
      </div>

      <ul className="flex flex-col gap-2">
        {rooms.map((room) => (
          <li key={room.id} className="border rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">{room.title}</p>
              <p className="text-sm text-gray-500">{room.area} — AED {room.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
