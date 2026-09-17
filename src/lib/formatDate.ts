function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function formatDueDate(iso: string | null, hasTime: boolean, now: Date = new Date()): string {
  if (!iso) return 'No date'

  const date = new Date(iso)
  const tomorrow = new Date(now)
  tomorrow.setDate(now.getDate() + 1)

  let dayLabel: string
  if (isSameDay(date, now)) dayLabel = 'Today'
  else if (isSameDay(date, tomorrow)) dayLabel = 'Tomorrow'
  else dayLabel = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })

  if (!hasTime) return dayLabel

  const timeLabel = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  return `${dayLabel}, ${timeLabel}`
}

/** Formats an ISO date for use as the value of an <input type="datetime-local">. */
export function toDatetimeLocalValue(iso: string | null): string {
  if (!iso) return ''
  const date = new Date(iso)
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}
