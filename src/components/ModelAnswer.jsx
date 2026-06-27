import React, { useState } from 'react'
import { countWords } from '../lib/wordcount.js'

// Hidden by default — students should write first, then compare.
export default function ModelAnswer({ text }) {
  const [open, setOpen] = useState(false)
  if (!text) return null
  return (
    <div className="card p-3">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between text-left">
        <span className="font-semibold text-slate-700">Model answer (Band 8–9)</span>
        <span className="text-xs text-slate-500">{open ? 'Hide ▲' : 'Show ▼'}</span>
      </button>
      {open ? (
        <div className="mt-3 border-t border-slate-200 pt-3">
          <div className="text-xs text-slate-400 mb-2">{countWords(text)} words · Write your own version first, then compare.</div>
          <div className="text-[15px] leading-relaxed text-slate-700 whitespace-pre-wrap font-serif">{text}</div>
        </div>
      ) : null}
    </div>
  )
}
