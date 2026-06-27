import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../state/store.js'
import { useNav } from '../state/nav.js'
import { TASK1, TASK1_BY_ID } from '../data/task1.js'
import { TASK2, TASK2_BY_ID } from '../data/task2.js'
import { TASK1_TYPE_LABEL, TASK2_TYPE_LABEL } from '../data/labels.js'
import { task1Rubric, task2Rubric } from '../lib/rubric.js'
import { countWords } from '../lib/wordcount.js'
import { TASK1_BANK, TASK2_BANK } from '../data/phrasebank.js'
import VisualRenderer from '../components/charts/VisualRenderer.jsx'
import Timer from '../components/Timer.jsx'
import WordCounter from '../components/WordCounter.jsx'
import ModelAnswer from '../components/ModelAnswer.jsx'
import PhraseBank from '../components/PhraseBank.jsx'
import CriteriaChecklist from '../components/CriteriaChecklist.jsx'
import DifficultyTag from '../components/DifficultyTag.jsx'

function Task2Prompt({ exercise }) {
  return (
    <div>
      <p className="text-slate-600 mb-3">Write about the following topic:</p>
      <div className="border-l-4 border-blue-500 bg-slate-50 p-4 rounded-r-md">
        <p className="text-[17px] leading-relaxed text-slate-800 font-serif whitespace-pre-wrap">{exercise.prompt}</p>
      </div>
      <p className="text-slate-500 text-sm mt-3">
        Give reasons for your answer and include any relevant examples from your own knowledge or experience.
      </p>
      <p className="text-slate-700 text-sm font-semibold mt-1">Write at least 250 words.</p>
    </div>
  )
}

export default function PracticeView({ task, id }) {
  const { state, actions } = useStore()
  const { navigate } = useNav()

  const list = task === 1 ? TASK1 : TASK2
  const byId = task === 1 ? TASK1_BY_ID : TASK2_BY_ID
  const exercise = byId[id]
  const index = list.findIndex((e) => e.id === id)

  const [text, setText] = useState('')
  const [toast, setToast] = useState('')
  const baseTimeRef = useRef(0)
  const elapsedRef = useRef(0)
  const saveTimer = useRef(null)
  const textRef = useRef('')

  // (re)load when the exercise id changes
  useEffect(() => {
    const ans = state.practice[id]
    const t = ans?.text || ''
    setText(t)
    textRef.current = t
    baseTimeRef.current = ans?.timeSpent || 0
    elapsedRef.current = 0
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const words = countWords(text)
  const min = task === 1 ? 150 : 250

  const persist = (extra = {}) => {
    actions.savePractice(id, { text, words, timeSpent: baseTimeRef.current + elapsedRef.current, ...extra })
  }

  const onChange = (e) => {
    const v = e.target.value
    setText(v)
    textRef.current = v
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      actions.savePractice(id, { text: v, words: countWords(v), timeSpent: baseTimeRef.current + elapsedRef.current })
    }, 800)
  }

  const flash = (m) => { setToast(m); setTimeout(() => setToast(''), 1800) }

  const handleSave = () => { persist(); flash('Guardado ✓') }
  const handleComplete = () => {
    persist()
    actions.setPracticeComplete(id, true)
    flash('¡Marcado como completado! ✓')
  }

  const go = (dir) => {
    persist()
    const ni = index + dir
    if (ni >= 0 && ni < list.length) navigate('practice', { task, id: list[ni].id })
  }

  // persist on unmount / id change (reads latest via refs to avoid re-subscribing per keystroke)
  useEffect(() => () => {
    const t = textRef.current
    actions.savePractice(id, { text: t, words: countWords(t), timeSpent: baseTimeRef.current + elapsedRef.current })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const ans = state.practice[id]
  const typeLabel = task === 1 ? TASK1_TYPE_LABEL[exercise.type] : TASK2_TYPE_LABEL[exercise.type]

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* exam top bar */}
      <div className="bg-exam-accentDark text-white">
        <div className="px-3 sm:px-5 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => { persist(); navigate('list', { task, mode: 'practice' }) }} className="text-white/90 hover:text-white text-sm">← Lista</button>
            <div className="text-sm font-semibold truncate">
              Task {task} · #{String(index + 1).padStart(2, '0')}/{list.length}
              <span className="hidden sm:inline font-normal text-white/70"> · {typeLabel}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Timer totalSeconds={task === 1 ? 1200 : 2400} onElapsed={(s) => { elapsedRef.current = s }} compact />
          </div>
        </div>
        <div className="px-3 sm:px-5 h-11 flex items-center justify-between gap-2 bg-blue-800/60">
          <div className="flex items-center gap-2">
            <button onClick={() => go(-1)} disabled={index <= 0} className="btn-soft bg-white/10 text-white hover:bg-white/20 border-0">← Anterior</button>
            <button onClick={() => go(1)} disabled={index >= list.length - 1} className="btn-soft bg-white/10 text-white hover:bg-white/20 border-0">Siguiente →</button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleSave} className="btn-soft bg-white/10 text-white hover:bg-white/20 border-0">Guardar</button>
            <button onClick={handleComplete} className={`btn ${ans?.completed ? 'bg-green-500 text-white' : 'bg-green-600 text-white hover:bg-green-700'}`}>
              {ans?.completed ? 'Completado ✓' : 'Marcar completado'}
            </button>
          </div>
        </div>
      </div>

      {toast ? (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-sm px-4 py-2 rounded-full shadow-lg">{toast}</div>
      ) : null}

      {/* split screen */}
      <div className="flex-1 grid lg:grid-cols-2 gap-0 lg:gap-px bg-slate-200">
        {/* left: prompt + visual */}
        <div className="bg-white p-4 sm:p-6 overflow-y-auto thin-scroll lg:max-h-[calc(100vh-100px)]">
          {task === 1 ? (
            <>
              <p className="text-slate-700 leading-relaxed mb-4">{task1Rubric(exercise)}</p>
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
                <div className="text-sm font-semibold text-slate-600 mb-3">{exercise.title}</div>
                <VisualRenderer exercise={exercise} />
              </div>
            </>
          ) : (
            <Task2Prompt exercise={exercise} />
          )}
        </div>

        {/* right: writing */}
        <div className="bg-white p-4 sm:p-6 flex flex-col lg:max-h-[calc(100vh-100px)]">
          <textarea
            value={text}
            onChange={onChange}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            placeholder="Type your answer here…"
            className="exam-textarea flex-1 min-h-[300px] w-full border border-slate-300 rounded-lg p-4 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
            <WordCounter count={words} min={min} />
            <span className="text-xs text-slate-400">Tiempo recomendado: {task === 1 ? '20' : '40'} min</span>
          </div>
        </div>
      </div>

      {/* study aids */}
      <div className="bg-slate-100 p-4 sm:p-6 space-y-3">
        <div className="grid md:grid-cols-2 gap-3">
          <ModelAnswer text={exercise.modelAnswer} />
          <PhraseBank bank={task === 1 ? TASK1_BANK : TASK2_BANK} />
        </div>
        <div className="grid md:grid-cols-2 gap-3 items-start">
          <CriteriaChecklist value={ans?.criteria || {}} onChange={(c) => actions.setCriteria(id, c)} />
          <div className="card p-3">
            <DifficultyTag value={ans?.difficulty} onChange={(d) => actions.setDifficulty(id, d)} />
            <p className="text-[11px] text-slate-400 mt-3">
              Lo que marques como “me costó” se prioriza en <span className="font-medium">Siguiente paso</span> y se sugiere repetir más veces.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
