import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import { updateRoom } from '../../actions'
import { SubmitButton } from '../../SubmitButton'

export default async function EditRoomPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: room } = await supabase.from('rooms').select('*').eq('id', id).single()

  if (!room) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Room</h1>
      <form action={updateRoom.bind(null, room.id)} className="flex flex-col gap-4">
        <input type="text" name="title" defaultValue={room.title} className="border rounded-lg px-3 py-2" required />
        <textarea name="description" defaultValue={room.description} className="border rounded-lg px-3 py-2" rows={4} />
        <input type="number" name="price" defaultValue={room.price} className="border rounded-lg px-3 py-2" required />
        <input type="text" name="area" defaultValue={room.area} className="border rounded-lg px-3 py-2" required />
        <input type="text" name="room_type" defaultValue={room.room_type} className="border rounded-lg px-3 py-2" required />
        <input type="text" name="amenities" defaultValue={room.amenities?.join(', ')} className="border rounded-lg px-3 py-2" />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="is_available" defaultChecked={room.is_available} />
          Available
        </label>

        <SubmitButton idleLabel="Save Changes" pendingLabel="Saving..." />
      </form>
    </main>
  )
}
