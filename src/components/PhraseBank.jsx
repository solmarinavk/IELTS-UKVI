import React, { useState } from 'react'

export default function PhraseBank({ bank, title = 'Useful language' }) {
  const [open, setOpen] = useState(false)
  if (!bank || !bank.length) return null
  return (
    <div className="card p-3">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between text-left">
        <span className="font-semibold text-slate-700">{title}</span>
        <span className="text-xs text-slate-500">{open ? 'Hide ▲' : 'Show ▼'}</span>
      </button>
      {open ? (
        <div className="mt-3 border-t border-slate-200 pt-3 grid sm:grid-cols-2 gap-3">
          {bank.map((group, i) => (
            <div key={i}>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{group.title}</div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((it, j) => (
                  <span key={j} className="chip bg-slate-100 text-slate-700">{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
