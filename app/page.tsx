import { supabase } from '@/lib/supabase'
import RoomCard from '@/components/RoomCard'

export default async function Home() {
  const { data: rooms, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('is_available', true)
    .order('created_at', { ascending: false })

  if (error) {
    return <p className="p-8 text-red-600">Error: {error.message}</p>
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-2xl font-bold mb-6">Rooms available in Dubai</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  )
}