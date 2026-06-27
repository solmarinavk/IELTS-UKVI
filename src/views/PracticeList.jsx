import React, { useState } from 'react'
import { useStore } from '../state/store.js'
import { useNav } from '../state/nav.js'
import { TASK1 } from '../data/task1.js'
import { TASK2 } from '../data/task2.js'
import { TASK1_TYPE_LABEL, TASK2_TYPE_SHORT } from '../data/labels.js'
import { practiceStatus, practiceProgress } from '../state/selectors.js'
import ProgressBar from '../components/ProgressBar.jsx'

const FILTERS = [
  { key: 'all', label: 'Todos' },
  { key: 'pending', label: 'Pendientes' },
  { key: 'completed', label: 'Completados' },
]

const STATUS_CHIP = {
  pending: { label: 'Pendiente', cls: 'bg-slate-100 text-slate-500' },
  draft: { label: 'Borrador', cls: 'bg-amber-100 text-amber-700' },
  completed: { label: 'Completado ✓', cls: 'bg-green-100 text-green-700' },
}

export default function PracticeList({ task }) {
  const { state } = useStore()
  const { navigate } = useNav()
  const [filter, setFilter] = useState('all')

  const list = task === 1 ? TASK1 : TASK2
  const prog = practiceProgress(state, task)

  const filtered = list.filter((ex) => {
    const st = practiceStatus(state, ex.id)
    if (filter === 'all') return true
    if (filter === 'completed') return st === 'completed'
    return st !== 'completed'
  })

  const typeLabel = (ex) => task === 1 ? TASK1_TYPE_LABEL[ex.type] : TASK2_TYPE_SHORT[ex.type]

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Task {task} · Práctica libre
            <span className="text-sm font-normal text-slate-400"> ({task === 1 ? '30 gráficos' : '40 ensayos'})</span>
          </h1>
          <div className="mt-2 max-w-xs"><ProgressBar value={prog.done} max={prog.total} label="Completados" /></div>
        </div>
        <div className="flex gap-1.5">
          {FILTERS.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`text-sm rounded-md px-3 py-1.5 border ${filter === f.key ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((ex, i) => {
          const st = practiceStatus(state, ex.id)
          const ans = state.practice[ex.id]
          const chip = STATUS_CHIP[st]
          const completed = st === 'completed'
          const num = list.indexOf(ex) + 1
          return (
            <button key={ex.id} onClick={() => navigate('practice', { task, id: ex.id })}
              className={`text-left card p-4 hover:border-blue-400 transition ${completed ? 'opacity-70' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400">#{String(num).padStart(2, '0')}</span>
                <span className={`chip ${chip.cls}`}>{chip.label}</span>
              </div>
              <div className="text-sm font-semibold text-slate-800 leading-snug min-h-[2.5rem]">{ex.title || ex.topic}</div>
              <div className="mt-2 flex items-center justify-between">
                <span className="chip bg-blue-50 text-blue-700">{typeLabel(ex)}</span>
                {ans?.words ? <span className="text-xs text-slate-400 tabular-nums">{ans.words} palabras</span> : null}
              </div>
            </button>
          )
        })}
      </div>
      {!filtered.length ? <div className="text-center text-slate-400 py-12">No hay ejercicios en este filtro.</div> : null}
    </div>
  )
}
