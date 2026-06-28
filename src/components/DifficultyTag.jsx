import React from 'react'

const OPTIONS = [
  { key: 'easy', label: 'Fácil', cls: 'bg-green-100 text-green-700 border-green-300' },
  { key: 'medium', label: 'Regular', cls: 'bg-amber-100 text-amber-700 border-amber-300' },
  { key: 'hard', label: 'Me costó', cls: 'bg-red-100 text-red-700 border-red-300' },
]

// Self-labelled difficulty. Items marked "hard" get prioritised by Next Step.
export default function DifficultyTag({ value, onChange }) {
  return (
    <div>
      <div className="text-xs text-slate-500 mb-1">¿Qué tal te resultó?</div>
      <div className="flex gap-2">
        {OPTIONS.map((o) => (
          <button
            key={o.key}
            onClick={() => onChange(value === o.key ? null : o.key)}
            className={`text-xs font-medium rounded-full border px-3 py-1 transition ${value === o.key ? o.cls : 'bg-white text-slate-500 border-slate-300 hover:bg-slate-50'}`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}
