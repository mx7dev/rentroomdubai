'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase-server'

function parseRoomFormData(formData: FormData) {
  return {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    price: Number(formData.get('price')),
    area: formData.get('area') as string,
    room_type: formData.get('room_type') as string,
    amenities: (formData.get('amenities') as string)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
    is_available: formData.get('is_available') === 'on',
  }
}

export async function createRoom(formData: FormData) {
  const supabase = await createClient()
  const fields = parseRoomFormData(formData)

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
    ...fields,
    photo_urls: photoUrls,
  })

  if (error) {
    throw new Error(error.message)
  }

  redirect('/admin/rooms')
}

export async function updateRoom(id: string, formData: FormData) {
  const supabase = await createClient()
  const fields = parseRoomFormData(formData)

  const { error } = await supabase.from('rooms').update(fields).eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/rooms')
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
