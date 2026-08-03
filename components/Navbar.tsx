import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'
import LogoutButton from './LogoutButton'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <Link href="/" className="font-bold text-lg">
        RentRoomDubai
      </Link>

      {user && (
        <div className="flex items-center gap-4">
          <Link href="/admin/rooms" className="text-sm text-gray-700 hover:underline">
            Manage Rooms
          </Link>
          <LogoutButton />
        </div>
      )}
    </nav>
  )
}
