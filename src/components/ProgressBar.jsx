import React from 'react'

export default function ProgressBar({ value, max, label, color = 'bg-blue-600', height = 'h-2.5' }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div>
      {label ? (
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>{label}</span>
          <span className="tabular-nums">{value} / {max}</span>
        </div>
      ) : null}
      <div className={`w-full ${height} bg-slate-200 rounded-full overflow-hidden`}>
        <div className={`${height} ${color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
