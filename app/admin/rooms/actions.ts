'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'


export async function createRoom(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const price = Number(formData.get('price'))
  const area = formData.get('area') as string
  const roomType = formData.get('room_type') as string
  const amenities = (formData.get('amenities') as string)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
  const isAvailable = formData.get('is_available') === 'on'

  const photos = formData.getAll('photos') as File[]
  const photoUrls: string[] = []

  for (const photo of photos) {
    if (photo.size === 0) continue

    const fileName = `${crypto.randomUUID()}-${photo.name}`
    const { error: uploadError } = await supabase.storage
      .from('room-photos')
      .upload(fileName, photo)

    if (uploadError) {
      throw new Error(uploadError.message)
    }

    const { data } = supabase.storage.from('room-photos').getPublicUrl(fileName)
    photoUrls.push(data.publicUrl)
  }

  const { error } = await supabase.from('rooms').insert({
    title,
    description,
    price,
    area,
    room_type: roomType,
    amenities,
    is_available: isAvailable,
    photo_urls: photoUrls,
  })

  if (error) {
    throw new Error(error.message)
  }

  redirect('/admin/rooms')
}

export async function deleteRoom(id: string) {
  const supabase = await createClient()

  const { data: room } = await supabase
    .from('rooms')
    .select('photo_urls')
    .eq('id', id)
    .single()

  if (room?.photo_urls?.length) {
    const fileNames = room.photo_urls.map((url: string) => url.split('/room-photos/')[1])
    await supabase.storage.from('room-photos').remove(fileNames)
  }

  const { error } = await supabase.from('rooms').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/rooms')
}
