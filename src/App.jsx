import React, { useCallback, useMemo, useState } from 'react'
import { StoreProvider, useStore } from './state/store.js'
import { NavContext } from './state/nav.js'
import Dashboard from './views/Dashboard.jsx'
import PracticeList from './views/PracticeList.jsx'
import PracticeView from './views/PracticeView.jsx'
import StructureList from './views/StructureList.jsx'
import StructureView from './views/StructureView.jsx'
import FullTest from './views/FullTest.jsx'

const FULLSCREEN = new Set(['practice', 'structure', 'fulltest'])

function Shell() {
  const { actions } = useStore()
  const [view, setView] = useState({ name: 'dashboard', params: {} })

  const navigate = useCallback((name, params = {}) => {
    setView({ name, params })
    if (name === 'practice' || name === 'structure') {
      actions.setLastView({ name, params })
    }
    window.scrollTo(0, 0)
  }, [actions])

  const navValue = useMemo(() => ({ view, navigate }), [view, navigate])

  let content = null
  if (view.name === 'dashboard') content = <Dashboard />
  else if (view.name === 'list') content = <PracticeList task={view.params.task} mode={view.params.mode} />
  else if (view.name === 'practice') content = <PracticeView task={view.params.task} id={view.params.id} />
  else if (view.name === 'structureList') content = <StructureList task={view.params.task} />
  else if (view.name === 'structure') content = <StructureView id={view.params.id} focusBox={view.params.focusBox} />
  else if (view.name === 'fulltest') content = <FullTest />
  else content = <Dashboard />

  const fullscreen = FULLSCREEN.has(view.name)

  return (
    <NavContext.Provider value={navValue}>
      {!fullscreen ? (
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <button onClick={() => navigate('dashboard')} className="flex items-center gap-2 font-bold text-slate-800">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-blue-700 text-white text-sm">IE</span>
              <span>IELTS Academic Writing</span>
            </button>
            <button onClick={() => navigate('dashboard')} className="btn-ghost">Inicio</button>
          </div>
        </header>
      ) : null}
      <main className={fullscreen ? '' : 'max-w-6xl mx-auto px-4 py-6'}>{content}</main>
    </NavContext.Provider>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  )
}
