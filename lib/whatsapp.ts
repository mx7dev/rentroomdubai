const WHATSAPP_NUMBER = '971501234567' // TODO: replace with the real contact number

type WhatsAppRoomInfo = {
  title: string
  area: string
  price: number
}

export function buildWhatsAppLink(room: WhatsAppRoomInfo) {
  const message = `Hi! I'm interested in the room "${room.title}" in ${room.area} (AED ${room.price}/month).`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
