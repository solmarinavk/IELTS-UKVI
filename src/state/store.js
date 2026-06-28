import React, { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react'

const STORAGE_KEY = 'ielts.writing.v1'

const todayStr = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const emptyState = () => ({
  practice: {}, // id -> { text, words, timeSpent, completed, lastAttemptAt, difficulty, criteria:{ta,cc,lr,gra} }
  structure: {}, // id -> { currentLevel, repeats:{1,2,3}, levels:{1:{boxes,completed},2,3}, hideGuides, timeSpent }
  streak: { lastActiveDate: null, dayCount: 0, stepsByDate: {} },
  ui: { lastView: null }, // { kind:'practice'|'structure', id, task }
})

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState()
    const parsed = JSON.parse(raw)
    return { ...emptyState(), ...parsed }
  } catch (e) {
    return emptyState()
  }
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, setState] = useState(loadState)
  const saveTimer = useRef(null)

  // Debounced persistence so big essays don't serialise on every keystroke.
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      } catch (e) {
        /* storage full / unavailable — ignore */
      }
    }, 400)
    return () => saveTimer.current && clearTimeout(saveTimer.current)
  }, [state])

  // --- Streak / momentum -------------------------------------------------
  const touchStreak = useCallback((stepsDelta = 0) => {
    setState((s) => {
      const t = todayStr()
      const streak = { ...s.streak, stepsByDate: { ...s.streak.stepsByDate } }
      if (streak.lastActiveDate !== t) {
        // figure out if yesterday was active to continue the run
        const y = new Date()
        y.setDate(y.getDate() - 1)
        const yStr = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, '0')}-${String(y.getDate()).padStart(2, '0')}`
        streak.dayCount = streak.lastActiveDate === yStr ? (streak.dayCount || 0) + 1 : 1
        streak.lastActiveDate = t
      }
      streak.stepsByDate[t] = (streak.stepsByDate[t] || 0) + stepsDelta
      return { ...s, streak }
    })
  }, [])

  // --- Practice mode -----------------------------------------------------
  const savePractice = useCallback((id, patch) => {
    setState((s) => {
      const prev = s.practice[id] || { text: '', words: 0, timeSpent: 0, completed: false, criteria: {} }
      return { ...s, practice: { ...s.practice, [id]: { ...prev, ...patch, lastAttemptAt: Date.now() } } }
    })
  }, [])

  const setPracticeComplete = useCallback((id, completed) => {
    setState((s) => {
      const prev = s.practice[id] || { text: '', words: 0, timeSpent: 0, criteria: {} }
      return { ...s, practice: { ...s.practice, [id]: { ...prev, completed, lastAttemptAt: Date.now() } } }
    })
    if (completed) touchStreak(1)
  }, [touchStreak])

  const setDifficulty = useCallback((id, difficulty) => {
    setState((s) => {
      const prev = s.practice[id] || { text: '', words: 0, timeSpent: 0, criteria: {} }
      return { ...s, practice: { ...s.practice, [id]: { ...prev, difficulty } } }
    })
  }, [])

  const setCriteria = useCallback((id, criteria) => {
    setState((s) => {
      const prev = s.practice[id] || { text: '', words: 0, timeSpent: 0, criteria: {} }
      return { ...s, practice: { ...s.practice, [id]: { ...prev, criteria } } }
    })
  }, [])

  // --- Structure mode ----------------------------------------------------
  const ensureStructure = (s, id) => s.structure[id] || {
    currentLevel: 1,
    repeats: { 1: 0, 2: 0, 3: 0 },
    levels: { 1: { boxes: {}, completed: false }, 2: { boxes: {}, completed: false }, 3: { boxes: {}, completed: false } },
    hideGuides: false,
    timeSpent: 0,
  }

  const saveStructureBox = useCallback((id, level, boxId, text, isStepComplete) => {
    setState((s) => {
      const cur = ensureStructure(s, id)
      const lvl = cur.levels[level] || { boxes: {}, completed: false }
      const wasEmpty = !(lvl.boxes[boxId] && lvl.boxes[boxId].trim())
      const nowFilled = !!(text && text.trim())
      const boxes = { ...lvl.boxes, [boxId]: text }
      const newLevels = { ...cur.levels, [level]: { ...lvl, boxes } }
      const next = { ...s, structure: { ...s.structure, [id]: { ...cur, levels: newLevels } } }
      // a freshly-filled box is a micro-victory (caller decides via isStepComplete)
      if (wasEmpty && nowFilled && isStepComplete) {
        const t = todayStr()
        next.streak = { ...s.streak, stepsByDate: { ...s.streak.stepsByDate, [t]: (s.streak.stepsByDate[t] || 0) + 1 } }
      }
      return next
    })
  }, [])

  const setStructureLevel = useCallback((id, level) => {
    setState((s) => {
      const cur = ensureStructure(s, id)
      return { ...s, structure: { ...s.structure, [id]: { ...cur, currentLevel: level } } }
    })
  }, [])

  const setHideGuides = useCallback((id, hide) => {
    setState((s) => {
      const cur = ensureStructure(s, id)
      return { ...s, structure: { ...s.structure, [id]: { ...cur, hideGuides: hide } } }
    })
  }, [])

  const completeStructureLevel = useCallback((id, level) => {
    setState((s) => {
      const cur = ensureStructure(s, id)
      const lvl = cur.levels[level] || { boxes: {}, completed: false }
      const repeats = { ...cur.repeats, [level]: (cur.repeats[level] || 0) + 1 }
      const newLevels = { ...cur.levels, [level]: { ...lvl, completed: true } }
      // advance to next level on first completion
      const nextLevel = Math.min(3, Math.max(cur.currentLevel, level + (level < 3 ? 1 : 0)))
      return { ...s, structure: { ...s.structure, [id]: { ...cur, levels: newLevels, repeats, currentLevel: nextLevel } } }
    })
    touchStreak(1)
  }, [touchStreak])

  const repeatStructureLevel = useCallback((id, level) => {
    setState((s) => {
      const cur = ensureStructure(s, id)
      const newLevels = { ...cur.levels, [level]: { boxes: {}, completed: false } }
      return { ...s, structure: { ...s.structure, [id]: { ...cur, levels: newLevels, currentLevel: level } } }
    })
  }, [])

  const setStructureDifficulty = useCallback((id, difficulty) => {
    setState((s) => {
      const cur = ensureStructure(s, id)
      return { ...s, structure: { ...s.structure, [id]: { ...cur, difficulty } } }
    })
  }, [])

  const addStructureTime = useCallback((id, seconds) => {
    setState((s) => {
      const cur = ensureStructure(s, id)
      return { ...s, structure: { ...s.structure, [id]: { ...cur, timeSpent: (cur.timeSpent || 0) + seconds } } }
    })
  }, [])

  const setLastView = useCallback((view) => {
    setState((s) => ({ ...s, ui: { ...s.ui, lastView: view } }))
  }, [])

  const resetAll = useCallback(() => {
    setState(emptyState())
  }, [])

  const actions = useMemo(() => ({
    savePractice, setPracticeComplete, setDifficulty, setCriteria,
    saveStructureBox, setStructureLevel, setHideGuides, completeStructureLevel, repeatStructureLevel, setStructureDifficulty, addStructureTime,
    touchStreak, setLastView, resetAll,
  }), [savePractice, setPracticeComplete, setDifficulty, setCriteria, saveStructureBox, setStructureLevel, setHideGuides, completeStructureLevel, repeatStructureLevel, setStructureDifficulty, addStructureTime, touchStreak, setLastView, resetAll])

  const value = useMemo(() => ({ state, actions, setState }), [state, actions])
  return React.createElement(StoreContext.Provider, { value }, children)
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}

// ---- Derived helpers (pure) ----------------------------------------------
export function masteryStatus(structureEntry) {
  if (!structureEntry) return { key: 'new', label: 'Sin empezar', stars: 0 }
  const lv = structureEntry.levels || {}
  if (lv[3] && lv[3].completed) return { key: 'dominado', label: 'Dominado', stars: 3 }
  if (lv[2] && lv[2].completed) return { key: 'reforzando', label: 'Reforzando', stars: 2 }
  if (lv[1] && lv[1].completed) return { key: 'aprendiendo', label: 'Aprendiendo', stars: 1 }
  // any content started?
  const started = [1, 2, 3].some((l) => lv[l] && Object.values(lv[l].boxes || {}).some((t) => t && t.trim()))
  return started ? { key: 'aprendiendo', label: 'Aprendiendo', stars: 1 } : { key: 'new', label: 'Sin empezar', stars: 0 }
}

export { todayStr }
