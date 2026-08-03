import { createRoom } from '../actions'
import { SubmitButton } from '../SubmitButton'

export default function NewRoomPage() {
  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-bold mb-6">New Room</h1>
      <form action={createRoom} className="flex flex-col gap-4">
        <input type="text" name="title" placeholder="Title" className="border rounded-lg px-3 py-2" required />
        <textarea name="description" placeholder="Description" className="border rounded-lg px-3 py-2" rows={4} />
        <input type="number" name="price" placeholder="Price (AED/month)" className="border rounded-lg px-3 py-2" required />
        <input type="text" name="area" placeholder="Area (e.g. JVC, Marina)" className="border rounded-lg px-3 py-2" required />
        <input type="text" name="room_type" placeholder="Room type (e.g. Studio, Shared Room)" className="border rounded-lg px-3 py-2" required />
        <input type="text" name="amenities" placeholder="Amenities (comma-separated)" className="border rounded-lg px-3 py-2" />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="is_available" defaultChecked />
          Available
        </label>

        <label className="flex flex-col gap-1">
          Photos
          <input type="file" name="photos" multiple accept="image/jpeg,image/png,image/webp" className="border rounded-lg px-3 py-2" />
        </label>

        <SubmitButton />
      </form>
    </main>
  )
}
