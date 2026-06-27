import React from 'react'

const CRITERIA = [
  { key: 'ta', label: 'Task Achievement / Response', hint: 'Did I answer fully, cover all parts and give a clear position/overview?' },
  { key: 'cc', label: 'Coherence & Cohesion', hint: 'Are my paragraphs logical with good linking words?' },
  { key: 'lr', label: 'Lexical Resource', hint: 'Did I use varied, precise vocabulary (not repetitive)?' },
  { key: 'gra', label: 'Grammatical Range & Accuracy', hint: 'Did I use a mix of structures with few errors?' },
]

export default function CriteriaChecklist({ value = {}, onChange }) {
  const toggle = (k) => onChange({ ...value, [k]: !value[k] })
  return (
    <div className="card p-3">
      <div className="font-semibold text-slate-700 mb-2">Self-assessment (4 IELTS criteria)</div>
      <ul className="space-y-2">
        {CRITERIA.map((c) => (
          <li key={c.key} className="flex items-start gap-2">
            <input id={c.key} type="checkbox" checked={!!value[c.key]} onChange={() => toggle(c.key)} className="mt-1 h-4 w-4 accent-blue-700" />
            <label htmlFor={c.key} className="text-sm">
              <span className="font-medium text-slate-700">{c.label}</span>
              <span className="block text-xs text-slate-500">{c.hint}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
