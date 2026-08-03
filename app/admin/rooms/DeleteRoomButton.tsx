'use client'

export function DeleteRoomButton() {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm('Delete this room? This cannot be undone.')) {
          e.preventDefault()
        }
      }}
      className="rounded-lg border border-red-600 text-red-600 px-3 py-1.5 text-sm font-medium hover:bg-red-50 transition-colors"
    >
      Delete
    </button>
  )
}
