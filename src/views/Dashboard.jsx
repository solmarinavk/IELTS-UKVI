import React from 'react'
import { useStore } from '../state/store.js'
import { useNav } from '../state/nav.js'
import ProgressBar from '../components/ProgressBar.jsx'
import {
  practiceProgress, structureProgress, nextStep, masteryForBase, streakInfo, totalMicroSteps,
} from '../state/selectors.js'
import { BASE_STRUCTURES } from '../data/templates.js'
import { TASK1_BY_ID } from '../data/task1.js'
import { TASK2_BY_ID } from '../data/task2.js'
import { exportJSON, exportTXT } from '../lib/exportData.js'

function ModeRow({ label, done, total, onClick, color }) {
  return (
    <button onClick={onClick} className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-xs text-slate-500 tabular-nums">{done} / {total}</span>
      </div>
      <ProgressBar value={done} max={total} color={color} />
    </button>
  )
}

function Ladder({ steps }) {
  const perMilestone = 5
  const reached = Math.floor(steps / perMilestone)
  const milestones = Math.max(8, reached + 4)
  const dots = Array.from({ length: milestones })
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-700">Tu sendero de progreso</h3>
        <span className="text-xs text-slate-500">{steps} micro-pasos · próximo hito en {perMilestone - (steps % perMilestone)}</span>
      </div>
      <div className="flex items-center gap-1 overflow-x-auto thin-scroll pb-1">
        {dots.map((_, i) => {
          const filled = i < reached
          const isMilestone = (i + 1) % 1 === 0
          return (
            <div key={i} className="flex items-center">
              <div className={`h-3.5 w-3.5 rounded-full border-2 ${filled ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300'}`} title={`Hito ${i + 1}`} />
              {i < dots.length - 1 ? <div className={`h-0.5 w-6 ${i < reached - 1 ? 'bg-blue-500' : 'bg-slate-200'}`} /> : null}
            </div>
          )
        })}
      </div>
      <p className="text-xs text-slate-500 mt-2">Cada caja que completas y cada estructura que dominas suma un paso. Pasito a pasito.</p>
    </div>
  )
}

export default function Dashboard() {
  const { state, actions } = useStore()
  const { navigate } = useNav()

  const t1p = practiceProgress(state, 1)
  const t2p = practiceProgress(state, 2)
  const t1s = structureProgress(state, 1)
  const t2s = structureProgress(state, 2)
  const step = nextStep(state)
  const streak = streakInfo(state)
  const steps = totalMicroSteps(state)
  const last = state.ui?.lastView

  let lastTitle = ''
  if (last?.name === 'practice') {
    const ex = TASK1_BY_ID[last.params.id] || TASK2_BY_ID[last.params.id]
    lastTitle = ex ? (ex.title || ex.topic) : ''
  } else if (last?.name === 'structure') {
    lastTitle = 'estructura guiada'
  }

  return (
    <div className="space-y-6">
      {/* Hero / streak */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Práctica de IELTS Academic Writing</h1>
          <p className="text-slate-500 text-sm mt-1">Task 1 y Task 2 · cronómetro, conteo de palabras y estructuras band 9.</p>
        </div>
        <div className="flex gap-2">
          <div className="card px-3 py-2 text-center">
            <div className="text-xl font-bold text-blue-700 tabular-nums">🔥 {streak.dayCount}</div>
            <div className="text-[11px] text-slate-500">días seguidos</div>
          </div>
          <div className="card px-3 py-2 text-center">
            <div className="text-xl font-bold text-green-700 tabular-nums">{streak.stepsToday}</div>
            <div className="text-[11px] text-slate-500">pasos hoy</div>
          </div>
        </div>
      </div>

      {/* Next step */}
      <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-700 mb-1">
          <span className="inline-block h-2 w-2 rounded-full bg-blue-600 animate-pulse" /> Siguiente paso
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="text-lg font-semibold text-slate-800">{step.label}</div>
            {step.sub ? <div className="text-sm text-slate-500">{step.sub}</div> : null}
          </div>
          <button onClick={() => navigate(step.target.name, step.target.params)} className="btn-primary shrink-0">
            Empezar este paso →
          </button>
        </div>
      </div>

      {last ? (
        <button onClick={() => navigate(last.name, last.params)} className="w-full sm:w-auto btn-ghost">
          ↩ Reanudar lo último{lastTitle ? `: ${lastTitle}` : ''}
        </button>
      ) : null}

      {/* Task sections */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-slate-800">Task 1 <span className="text-sm font-normal text-slate-400">· Gráficos & diagramas</span></h2>
          </div>
          <div className="space-y-3">
            <ModeRow label="Práctica libre (30)" done={t1p.done} total={t1p.total} color="bg-blue-600" onClick={() => navigate('list', { task: 1, mode: 'practice' })} />
            <ModeRow label="Modo estructura (15)" done={t1s.done} total={t1s.total} color="bg-teal-600" onClick={() => navigate('structureList', { task: 1 })} />
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-slate-800">Task 2 <span className="text-sm font-normal text-slate-400">· Ensayos</span></h2>
          </div>
          <div className="space-y-3">
            <ModeRow label="Práctica libre (40)" done={t2p.done} total={t2p.total} color="bg-blue-600" onClick={() => navigate('list', { task: 2, mode: 'practice' })} />
            <ModeRow label="Modo estructura (15)" done={t2s.done} total={t2s.total} color="bg-teal-600" onClick={() => navigate('structureList', { task: 2 })} />
          </div>
        </div>
      </div>

      {/* Full test */}
      <button onClick={() => navigate('fulltest')} className="w-full card p-4 text-left hover:border-blue-400 transition flex items-center justify-between">
        <div>
          <div className="font-bold text-slate-800">Full Test (60 min)</div>
          <div className="text-sm text-slate-500">Task 1 (20 min) + Task 2 (40 min) seguidos, como el examen real.</div>
        </div>
        <span className="btn-primary">Comenzar →</span>
      </button>

      {/* Mastery bars */}
      <div className="card p-4">
        <h3 className="font-semibold text-slate-700 mb-3">Niveles de dominio por estructura</h3>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
          {BASE_STRUCTURES.map((b) => {
            const m = masteryForBase(state, b)
            return (
              <div key={b.key}>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>{b.name}</span>
                  <span className="tabular-nums">{Math.round(m * 100)}%</span>
                </div>
                <ProgressBar value={Math.round(m * 100)} max={100} color={m >= 0.99 ? 'bg-green-600' : 'bg-amber-500'} />
              </div>
            )
          })}
        </div>
        <p className="text-[11px] text-slate-400 mt-3">El dominio sube con cada nivel completado (con guías → solo etiquetas → en blanco).</p>
      </div>

      {/* Ladder */}
      <Ladder steps={steps} />

      {/* Export / reset */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button onClick={() => exportTXT(state)} className="btn-ghost">⬇ Exportar respuestas (.txt)</button>
        <button onClick={() => exportJSON(state)} className="btn-ghost">⬇ Exportar todo (.json)</button>
        <button
          onClick={() => { if (confirm('¿Borrar todo tu progreso guardado? Esto no se puede deshacer.')) actions.resetAll() }}
          className="btn-ghost text-red-600 border-red-200 hover:bg-red-50 ml-auto"
        >
          Borrar progreso
        </button>
      </div>
    </div>
  )
}
