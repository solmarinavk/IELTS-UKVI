import React from 'react'
import { useStore } from '../state/store.js'
import { useNav } from '../state/nav.js'
import { STRUCTURE_T1, STRUCTURE_T2 } from '../data/templates.js'
import { TASK1_TYPE_LABEL, TASK2_TYPE_LABEL } from '../data/labels.js'
import { templateMastery, structureProgress } from '../state/selectors.js'
import ProgressBar from '../components/ProgressBar.jsx'

const MASTERY_CHIP = {
  new: 'bg-slate-100 text-slate-500',
  aprendiendo: 'bg-amber-100 text-amber-700',
  reforzando: 'bg-blue-100 text-blue-700',
  dominado: 'bg-green-100 text-green-700',
}

function Stars({ n }) {
  return <span className="tracking-tight">{'★'.repeat(n)}<span className="text-slate-300">{'★'.repeat(3 - n)}</span></span>
}

export default function StructureList({ task }) {
  const { state } = useStore()
  const { navigate } = useNav()
  const list = task === 1 ? STRUCTURE_T1 : STRUCTURE_T2
  const prog = structureProgress(state, task)

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-800">
          Task {task} · Modo estructura <span className="text-sm font-normal text-slate-400">(15 plantillas band 9)</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Memoriza la estructura por repetición: <span className="font-medium">con guías → solo etiquetas → en blanco</span>.
        </p>
        <div className="mt-2 max-w-xs"><ProgressBar value={prog.done} max={prog.total} label="Dominadas (Nivel 3)" color="bg-teal-600" /></div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {list.map((t, i) => {
          const m = templateMastery(state, t.id)
          const st = state.structure[t.id]
          const repeats = st ? (st.repeats[1] + st.repeats[2] + st.repeats[3]) : 0
          const label = task === 1 ? TASK1_TYPE_LABEL[t.exercise.type] : TASK2_TYPE_LABEL[t.exercise.type]
          return (
            <button key={t.id} onClick={() => navigate('structure', { id: t.id })}
              className="text-left card p-4 hover:border-teal-400 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400">#{String(i + 1).padStart(2, '0')}</span>
                <span className={`chip ${MASTERY_CHIP[m.key]}`}>{m.label}</span>
              </div>
              <div className="text-sm font-semibold text-slate-800 leading-snug min-h-[2.5rem]">{t.exercise.title || t.exercise.topic}</div>
              <div className="mt-2 flex items-center justify-between">
                <span className="chip bg-teal-50 text-teal-700">{label}</span>
                <span className="text-xs"><Stars n={m.stars} /></span>
              </div>
              {repeats > 0 ? <div className="text-[11px] text-slate-400 mt-2">La has hecho {repeats} {repeats === 1 ? 'vez' : 'veces'}</div> : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
