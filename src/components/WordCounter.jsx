import React from 'react'

// Live word count with a study-aid target indicator (red/amber below the
// minimum, green once reached).
export default function WordCounter({ count, min }) {
  const ok = count >= min
  const close = !ok && count >= min * 0.6
  const color = ok ? 'text-green-700' : close ? 'text-amber-600' : 'text-red-600'
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className={`font-semibold tabular-nums ${color}`}>Words: {count}</span>
      <span className="text-slate-400">·</span>
      <span className="text-slate-500">Target: {min}+</span>
      {ok ? <span className="text-green-600">✓</span> : null}
    </div>
  )
}
