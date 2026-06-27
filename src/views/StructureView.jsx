import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useStore, masteryStatus } from '../state/store.js'
import { useNav } from '../state/nav.js'
import { STRUCTURE_BY_ID } from '../data/templates.js'
import { TASK1_BANK, TASK2_BANK } from '../data/phrasebank.js'
import { task1Rubric } from '../lib/rubric.js'
import { countWords, formatClock } from '../lib/wordcount.js'
import VisualRenderer from '../components/charts/VisualRenderer.jsx'
import Timer from '../components/Timer.jsx'
import PhraseBank from '../components/PhraseBank.jsx'
import DifficultyTag from '../components/DifficultyTag.jsx'

const LEVELS = [
  { n: 1, name: 'Con guías', sub: 'Copio el molde' },
  { n: 2, name: 'Solo etiquetas', sub: 'Recuerdo el molde' },
  { n: 3, name: 'En blanco', sub: 'Lo hago solo' },
]

function BoxEditor({ box, value, level, hideGuides, onChange, registerRef }) {
  const showGuides = level === 1 && !hideGuides
  const words = countWords(value)
  const filled = !!(value && value.trim())
  const taRef = useRef(null)

  const insert = (txt) => {
    const base = value && value.trim() ? value.replace(/\s*$/, '') + ' ' : ''
    onChange(base + txt)
    if (taRef.current) taRef.current.focus()
  }

  return (
    <div className={`rounded-lg border p-3 ${filled ? 'border-green-300 bg-green-50/30' : 'border-slate-200 bg-white'}`}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-bold uppercase tracking-wide text-slate-600">{box.label}</span>
        {filled ? <span className="text-green-600 text-sm">✓</span> : null}
      </div>
      {showGuides ? (
        <>
          <p className="text-xs text-slate-500 mb-2 italic">{box.guide}</p>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {box.frames.map((f, i) => (
              <button key={i} onClick={() => insert(f)} title="Insertar frase guía"
                className="chip bg-blue-50 text-blue-700 hover:bg-blue-100 text-left max-w-full">
                {f}
              </button>
            ))}
          </div>
          {box.connectors?.length ? (
            <div className="flex flex-wrap gap-1 mb-2">
              {box.connectors.map((c, i) => (
                <button key={i} onClick={() => insert(c)} className="chip bg-slate-100 text-slate-600 hover:bg-slate-200">{c}</button>
              ))}
            </div>
          ) : null}
        </>
      ) : null}
      <textarea
        ref={(el) => { taRef.current = el; if (registerRef) registerRef(box.id, el) }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        rows={showGuides ? 3 : 4}
        placeholder={level === 2 ? 'Escribe esta sección de memoria…' : 'Completa esta sección…'}
        className="w-full border border-slate-300 rounded-md p-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-teal-400 exam-textarea"
      />
      <div className="text-[11px] text-slate-400 mt-1 text-right">{words} palabras</div>
    </div>
  )
}

export default function StructureView({ id, focusBox }) {
  const { state, actions } = useStore()
  const { navigate } = useNav()
  const template = STRUCTURE_BY_ID[id]
  const { exercise, skeleton, task } = template

  const entry = state.structure[id]
  const level = entry?.currentLevel || 1
  const hideGuides = !!entry?.hideGuides
  const levelData = entry?.levels?.[level] || { boxes: {}, completed: false }
  const mastery = masteryStatus(entry)

  const [toast, setToast] = useState('')
  const [showClean, setShowClean] = useState(false)
  const [showMold, setShowMold] = useState(false)
  const elapsedRef = useRef(0)
  const boxRefs = useRef({})

  const flash = (m) => { setToast(m); setTimeout(() => setToast(''), 1800) }

  useEffect(() => () => { if (elapsedRef.current) actions.addStructureTime(id, elapsedRef.current) }, [id, actions])

  // focus a requested box
  useEffect(() => {
    if (focusBox && boxRefs.current[focusBox]) {
      boxRefs.current[focusBox].scrollIntoView({ behavior: 'smooth', block: 'center' })
      boxRefs.current[focusBox].focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusBox, level])

  const setBox = (boxId, text) => actions.saveStructureBox(id, level, boxId, text, true)

  const boxes = skeleton.boxes
  const filledCount = boxes.filter((b) => (levelData.boxes?.[b.id] || '').trim()).length
  const allFilled = level === 3
    ? !!(levelData.boxes?.sheet || '').trim()
    : filledCount === boxes.length

  const cleanText = useMemo(() => {
    if (level === 3) return (levelData.boxes?.sheet || '')
    return boxes.map((b) => (levelData.boxes?.[b.id] || '').trim()).filter(Boolean).join('\n\n')
  }, [levelData, boxes, level])
  const totalWords = countWords(cleanText)
  const totalTime = (entry?.timeSpent || 0) + elapsedRef.current

  const complete = () => {
    actions.completeStructureLevel(id, level)
    const nextMastery = level === 1 ? 'Reforzando' : level === 2 ? '¡Casi dominado!' : 'Dominado'
    flash(level === 3 ? '¡Estructura DOMINADA! 🎯' : `Nivel ${level} completado ✓ — ${nextMastery}`)
  }
  const repeat = () => { actions.repeatStructureLevel(id, level); flash('Nivel reiniciado — ¡a recordarlo!') }

  const repeats = entry ? (entry.repeats[1] + entry.repeats[2] + entry.repeats[3]) : 0

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* top bar */}
      <div className="bg-teal-800 text-white">
        <div className="px-3 sm:px-5 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => navigate('structureList', { task })} className="text-white/90 hover:text-white text-sm">← Plantillas</button>
            <div className="text-sm font-semibold truncate">
              Task {task} · Estructura <span className="hidden sm:inline font-normal text-white/70">· {exercise.title || exercise.topic}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs bg-white/15 rounded-full px-2.5 py-1">{mastery.label}</span>
            <Timer totalSeconds={task === 1 ? 1200 : 2400} onElapsed={(s) => { elapsedRef.current = s }} compact />
          </div>
        </div>
        {/* level tabs */}
        <div className="px-3 sm:px-5 bg-teal-900/50 flex items-center gap-1.5 overflow-x-auto thin-scroll">
          {LEVELS.map((l) => {
            const done = entry?.levels?.[l.n]?.completed
            const active = level === l.n
            return (
              <button key={l.n} onClick={() => actions.setStructureLevel(id, l.n)}
                className={`shrink-0 px-3 py-2 text-sm border-b-2 transition ${active ? 'border-white text-white' : 'border-transparent text-white/70 hover:text-white'}`}>
                <span className="font-semibold">Nivel {l.n}</span> · {l.name} {done ? '✓' : ''}
                <span className="block text-[10px] text-white/60">{l.sub}</span>
              </button>
            )
          })}
        </div>
      </div>

      {toast ? (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-sm px-4 py-2 rounded-full shadow-lg">{toast}</div>
      ) : null}

      {/* body: split */}
      <div className="flex-1 grid lg:grid-cols-2 gap-px bg-slate-200">
        {/* left: prompt/visual */}
        <div className="bg-white p-4 sm:p-6 overflow-y-auto thin-scroll lg:max-h-[calc(100vh-140px)]">
          {task === 1 ? (
            <>
              <p className="text-slate-700 leading-relaxed mb-4">{task1Rubric(exercise)}</p>
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
                <div className="text-sm font-semibold text-slate-600 mb-3">{exercise.title}</div>
                <VisualRenderer exercise={exercise} />
              </div>
            </>
          ) : (
            <>
              <p className="text-slate-600 mb-3">Write about the following topic:</p>
              <div className="border-l-4 border-teal-500 bg-slate-50 p-4 rounded-r-md">
                <p className="text-[17px] leading-relaxed text-slate-800 font-serif whitespace-pre-wrap">{exercise.prompt}</p>
              </div>
              <p className="text-slate-700 text-sm font-semibold mt-3">Write at least 250 words.</p>
            </>
          )}

          <div className="mt-4">
            <PhraseBank bank={task === 1 ? TASK1_BANK : TASK2_BANK} title="Banco de conectores y lenguaje" />
          </div>
        </div>

        {/* right: skeleton editor */}
        <div className="bg-slate-50 p-4 sm:p-6 overflow-y-auto thin-scroll lg:max-h-[calc(100vh-140px)]">
          {/* controls row */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="text-sm text-slate-600">
              {level === 3
                ? <>Hoja en blanco · <span className="font-semibold tabular-nums">{totalWords} palabras</span></>
                : <>Secciones: <span className="font-semibold tabular-nums">{filledCount}/{boxes.length}</span></>}
            </div>
            <div className="flex items-center gap-2">
              {level === 1 ? (
                <button onClick={() => actions.setHideGuides(id, !hideGuides)} className="btn-soft text-xs">
                  {hideGuides ? 'Mostrar guías' : 'Ocultar guías'}
                </button>
              ) : null}
              <button onClick={() => setShowClean((v) => !v)} className="btn-soft text-xs">Ver versión limpia</button>
            </div>
          </div>

          {level !== 3 ? (
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden mb-4">
              <div className="h-1.5 bg-teal-500 rounded-full transition-all" style={{ width: `${(filledCount / boxes.length) * 100}%` }} />
            </div>
          ) : null}

          {/* editors */}
          {level === 3 ? (
            <div className="space-y-3">
              <div className="rounded-lg border border-dashed border-slate-300 bg-amber-50/40 p-3 text-sm text-slate-600">
                Escribe la respuesta completa <span className="font-semibold">de memoria</span>, recordando la estructura. Cuando termines, pulsa <span className="font-semibold">“Mostrar molde”</span> para autoevaluarte.
              </div>
              <textarea
                value={levelData.boxes?.sheet || ''}
                onChange={(e) => setBox('sheet', e.target.value)}
                spellCheck={false}
                rows={16}
                placeholder="Escribe aquí tu respuesta completa…"
                className="w-full border border-slate-300 rounded-md p-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-teal-400 exam-textarea"
              />
              <button onClick={() => setShowMold((v) => !v)} className="btn-ghost text-sm">
                {showMold ? 'Ocultar molde ▲' : 'Mostrar molde (autoevaluación) ▼'}
              </button>
              {showMold ? (
                <div className="card p-3 space-y-3">
                  {boxes.map((b) => (
                    <div key={b.id}>
                      <div className="text-xs font-bold uppercase tracking-wide text-slate-600">{b.label}</div>
                      <p className="text-xs text-slate-500 italic">{b.guide}</p>
                      <ul className="mt-1 text-sm text-slate-600 list-disc list-inside">
                        {b.frames.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="space-y-3">
              {boxes.map((b) => (
                <BoxEditor
                  key={b.id}
                  box={b}
                  level={level}
                  hideGuides={hideGuides}
                  value={levelData.boxes?.[b.id] || ''}
                  onChange={(t) => setBox(b.id, t)}
                  registerRef={(boxId, el) => { boxRefs.current[boxId] = el }}
                />
              ))}
            </div>
          )}

          {/* clean version */}
          {showClean ? (
            <div className="card p-4 mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-700">Versión limpia</span>
                <span className="text-xs text-slate-500">{totalWords} palabras · {formatClock(totalTime)} empleados</span>
              </div>
              <div className="text-[15px] leading-relaxed text-slate-700 whitespace-pre-wrap font-serif border-t border-slate-200 pt-2">
                {cleanText || <span className="text-slate-400">Aún no has escrito nada.</span>}
              </div>
            </div>
          ) : null}

          {/* actions */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {!levelData.completed ? (
              <button onClick={complete} disabled={!allFilled}
                className="btn-primary disabled:opacity-40" title={allFilled ? '' : 'Completa todas las secciones primero'}>
                {level === 3 ? 'Marcar como DOMINADO' : `Marcar Nivel ${level} completado`}
              </button>
            ) : (
              <>
                <span className="chip bg-green-100 text-green-700">Nivel {level} completado ✓</span>
                <button onClick={repeat} className="btn-ghost">Repetir nivel</button>
                {level < 3 ? (
                  <button onClick={() => actions.setStructureLevel(id, level + 1)} className="btn-primary">Ir al Nivel {level + 1} →</button>
                ) : null}
              </>
            )}
            {repeats > 0 ? <span className="text-xs text-slate-400 ml-auto">La has hecho {repeats} {repeats === 1 ? 'vez' : 'veces'}</span> : null}
          </div>

          <div className="mt-4 card p-3">
            <DifficultyTag value={entry?.difficulty} onChange={(d) => actions.setStructureDifficulty(id, d)} />
          </div>
        </div>
      </div>
    </div>
  )
}
