// Word count that mirrors the CD-IELTS behaviour: split on whitespace.
export function countWords(text) {
  if (!text) return 0
  const trimmed = String(text).trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}

export function formatClock(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds))
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}
