import React, { useMemo, useState } from 'react'
import { useStore } from '../state/store.js'
import { useNav } from '../state/nav.js'
import { TASK1 } from '../data/task1.js'
import { TASK2 } from '../data/task2.js'
import { task1Rubric } from '../lib/rubric.js'
import { countWords } from '../lib/wordcount.js'
import VisualRenderer from '../components/charts/VisualRenderer.jsx'
import Timer from '../components/Timer.jsx'
import WordCounter from '../components/WordCounter.jsx'

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export default function FullTest() {
  const { actions } = useStore()
  const { navigate } = useNav()
  const [pair, setPair] = useState(() => ({ t1: pick(TASK1), t2: pick(TASK2) }))
  const [tab, setTab] = useState(1)
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [toast, setToast] = useState('')

  const flash = (m) => { setToast(m); setTimeout(() => setToast(''), 2000) }
  const w1 = countWords(text1)
  const w2 = countWords(text2)

  const reshuffle = () => {
    if (text1 || text2) { if (!confirm('Cambiar de ejercicios borrará lo escrito en este test. ¿Continuar?')) return }
    setPair({ t1: pick(TASK1), t2: pick(TASK2) })
    setText1(''); setText2('')
  }

  const finish = () => {
    actions.savePractice(pair.t1.id, { text: text1, words: w1 })
    actions.savePractice(pair.t2.id, { text: text2, words: w2 })
    actions.setPracticeComplete(pair.t1.id, true)
    actions.setPracticeComplete(pair.t2.id, true)
    flash('Test guardado y marcado como completado ✓')
    setTimeout(() => navigate('dashboard'), 900)
  }

  const ex = tab === 1 ? pair.t1 : pair.t2

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <div className="bg-slate-900 text-white">
        <div className="px-3 sm:px-5 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button onClick={() => { if (!text1 && !text2) navigate('dashboard'); else if (confirm('¿Salir del test? Lo escrito no se guardará salvo que lo guardes.')) navigate('dashboard') }} className="text-white/90 hover:text-white text-sm">← Salir</button>
            <span className="font-semibold text-sm">Full Test · 60 minutos</span>
          </div>
          <Timer totalSeconds={3600} compact />
        </div>
        <div className="px-3 sm:px-5 bg-slate-800 flex items-center gap-2">
          {[1, 2].map((n) => (
            <button key={n} onClick={() => setTab(n)}
              className={`px-4 py-2.5 text-sm border-b-2 ${tab === n ? 'border-white text-white' : 'border-transparent text-white/60 hover:text-white'}`}>
              Task {n} <span className="text-white/50">· {n === 1 ? '20 min · 150+' : '40 min · 250+'}</span>
            </button>
          ))}
          <button onClick={reshuffle} className="ml-auto text-xs text-white/70 hover:text-white">↻ Cambiar ejercicios</button>
        </div>
      </div>

      {toast ? <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-sm px-4 py-2 rounded-full shadow-lg">{toast}</div> : null}

      <div className="flex-1 grid lg:grid-cols-2 gap-px bg-slate-200">
        <div className="bg-white p-4 sm:p-6 overflow-y-auto thin-scroll lg:max-h-[calc(100vh-100px)]">
          {tab === 1 ? (
            <>
              <p className="text-slate-700 leading-relaxed mb-4">{task1Rubric(ex)}</p>
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
                <div className="text-sm font-semibold text-slate-600 mb-3">{ex.title}</div>
                <VisualRenderer exercise={ex} />
              </div>
            </>
          ) : (
            <>
              <p className="text-slate-600 mb-3">Write about the following topic:</p>
              <div className="border-l-4 border-blue-500 bg-slate-50 p-4 rounded-r-md">
                <p className="text-[17px] leading-relaxed text-slate-800 font-serif whitespace-pre-wrap">{ex.prompt}</p>
              </div>
              <p className="text-slate-700 text-sm font-semibold mt-3">Write at least 250 words.</p>
            </>
          )}
        </div>

        <div className="bg-white p-4 sm:p-6 flex flex-col lg:max-h-[calc(100vh-100px)]">
          <textarea
            value={tab === 1 ? text1 : text2}
            onChange={(e) => (tab === 1 ? setText1(e.target.value) : setText2(e.target.value))}
            spellCheck={false}
            placeholder={`Type your Task ${tab} answer here…`}
            className="exam-textarea flex-1 min-h-[320px] w-full border border-slate-300 rounded-lg p-4 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
            <WordCounter count={tab === 1 ? w1 : w2} min={tab === 1 ? 150 : 250} />
            <button onClick={finish} className="btn-primary">Terminar y guardar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
