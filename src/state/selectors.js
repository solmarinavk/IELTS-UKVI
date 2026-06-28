import { TASK1 } from '../data/task1.js'
import { TASK2 } from '../data/task2.js'
import { STRUCTURE_T1, STRUCTURE_T2, STRUCTURE_ALL, BASE_STRUCTURES } from '../data/templates.js'
import { masteryStatus, todayStr } from './store.js'

// --- free-practice progress -------------------------------------------------
export function practiceProgress(state, task) {
  const list = task === 1 ? TASK1 : TASK2
  const done = list.filter((e) => state.practice[e.id]?.completed).length
  return { done, total: list.length }
}

export function practiceStatus(state, id) {
  const a = state.practice[id]
  if (!a) return 'pending'
  if (a.completed) return 'completed'
  if (a.text && a.text.trim()) return 'draft'
  return 'pending'
}

// --- structure progress -----------------------------------------------------
export function structureProgress(state, task) {
  const list = task === 1 ? STRUCTURE_T1 : task === 2 ? STRUCTURE_T2 : STRUCTURE_ALL
  let dominated = 0
  for (const t of list) {
    const st = state.structure[t.id]
    if (st?.levels?.[3]?.completed) dominated += 1
  }
  return { done: dominated, total: list.length }
}

// number of boxes filled in a given template/level
export function boxesFilled(state, template, level) {
  const st = state.structure[template.id]
  const boxes = template.skeleton.boxes
  const lvl = st?.levels?.[level]
  if (!lvl) return 0
  return boxes.filter((b) => (lvl.boxes?.[b.id] || '').trim()).length
}

export function templateMastery(state, id) {
  return masteryStatus(state.structure[id])
}

// --- family helpers ---------------------------------------------------------
function practiceFamilyKey(ex) {
  if (ex.id.startsWith('t1')) {
    if (ex.type === 'process') return 't1-process'
    if (ex.type === 'map') return 't1-map'
    return 't1-data'
  }
  return 't2-' + ex.type
}

export function hardFamilies(state) {
  const set = new Set()
  for (const ex of [...TASK1, ...TASK2]) {
    if (state.practice[ex.id]?.difficulty === 'hard') set.add(practiceFamilyKey(ex))
  }
  for (const t of STRUCTURE_ALL) {
    if (state.structure[t.id]?.difficulty === 'hard') {
      set.add(t.task === 1 ? 't1-' + (t.skeletonKey === 'data' ? 'data' : t.skeletonKey) : 't2-' + t.skeletonKey)
    }
  }
  return set
}

// --- mastery bar value (0..1) per base structure ---------------------------
export function masteryForBase(state, base) {
  const templates = STRUCTURE_ALL.filter(base.match)
  if (!templates.length) return 0
  let sum = 0
  for (const t of templates) {
    const st = state.structure[t.id]
    let lvl = 0
    if (st?.levels?.[3]?.completed) lvl = 3
    else if (st?.levels?.[2]?.completed) lvl = 2
    else if (st?.levels?.[1]?.completed) lvl = 1
    sum += lvl / 3
  }
  return sum / templates.length
}

// --- streak / momentum ------------------------------------------------------
export function streakInfo(state) {
  const t = todayStr()
  return {
    dayCount: state.streak?.dayCount || 0,
    stepsToday: state.streak?.stepsByDate?.[t] || 0,
  }
}

// --- progress ladder (micro steps) -----------------------------------------
export function totalMicroSteps(state) {
  let n = 0
  // each completed practice exercise = a step
  for (const ex of [...TASK1, ...TASK2]) if (state.practice[ex.id]?.completed) n += 1
  // each filled structure box (across levels) = a step
  for (const t of STRUCTURE_ALL) {
    const st = state.structure[t.id]
    if (!st) continue
    for (const level of [1, 2, 3]) {
      const lvl = st.levels?.[level]
      if (!lvl) continue
      n += t.skeleton.boxes.filter((b) => (lvl.boxes?.[b.id] || '').trim()).length
    }
  }
  return n
}

// --- the single "next step" micro-action -----------------------------------
export function nextStep(state) {
  const hard = hardFamilies(state)

  // Build structure candidates: first incomplete box at the current level.
  const candidates = []
  for (const t of STRUCTURE_ALL) {
    const st = state.structure[t.id]
    if (st?.levels?.[3]?.completed) continue // mastered — skip
    const level = st?.currentLevel || 1
    const lvl = st?.levels?.[level] || { boxes: {} }
    const familyKey = t.task === 1 ? 't1-' + t.skeletonKey : 't2-' + t.skeletonKey
    const familyKeyNorm = t.skeletonKey === 'data' ? 't1-data' : familyKey
    const isHard = hard.has(familyKeyNorm)
    let score = 0
    if (isHard) score += 100
    score += (3 - level)
    const subBase = `${t.task === 1 ? 'Task 1' : 'Task 2'} · ${t.exercise.title || t.exercise.topic} · Nivel ${level}`

    if (level === 3) {
      // blank-sheet level
      const sheet = (lvl.boxes?.sheet || '').trim()
      if (!sheet) {
        candidates.push({ score: score + (isHard ? 0 : 0), kind: 'structure-sheet', template: t, level,
          label: 'Escribe la respuesta completa de memoria', sub: subBase + ' (en blanco)',
          target: { name: 'structure', params: { id: t.id } } })
      } else if (!lvl.completed) {
        candidates.push({ score: score + 20, kind: 'structure-complete', template: t, level,
          label: 'Compara con el molde y marca Dominado', sub: subBase,
          target: { name: 'structure', params: { id: t.id } } })
      }
      continue
    }

    const boxes = t.skeleton.boxes
    const firstEmpty = boxes.find((b) => !((lvl.boxes?.[b.id] || '').trim()))
    const filled = boxes.filter((b) => (lvl.boxes?.[b.id] || '').trim()).length
    const inProgress = filled > 0 && filled < boxes.length
    if (inProgress) score += 40 // nudge to finish what's started
    if (firstEmpty) {
      candidates.push({
        score,
        kind: 'structure-box',
        template: t,
        level,
        box: firstEmpty,
        label: `Escribe solo el ${firstEmpty.label.split('—')[0].trim()}`,
        sub: subBase,
        target: { name: 'structure', params: { id: t.id, focusBox: firstEmpty.id } },
      })
    } else if (filled === boxes.length && !lvl.completed) {
      candidates.push({
        score: score + 20,
        kind: 'structure-complete',
        template: t,
        level,
        label: `Revisa y marca completada esta estructura`,
        sub: subBase,
        target: { name: 'structure', params: { id: t.id } },
      })
    }
  }

  candidates.sort((a, b) => b.score - a.score)
  if (candidates.length) return candidates[0]

  // Fallback: first pending free-practice exercise (prefer Task 2 weak spot).
  const pendingT1 = TASK1.find((e) => !state.practice[e.id]?.completed)
  const pendingT2 = TASK2.find((e) => !state.practice[e.id]?.completed)
  const pick = pendingT2 || pendingT1
  if (pick) {
    const task = pick.id.startsWith('t1') ? 1 : 2
    return {
      kind: 'practice',
      label: `Escribe una respuesta de ${task === 1 ? 'Task 1' : 'Task 2'}`,
      sub: pick.title || pick.topic,
      target: { name: 'practice', params: { task, id: pick.id } },
    }
  }
  return { kind: 'done', label: '¡Has completado todo! Repite tus estructuras difíciles para afinar.', sub: '', target: { name: 'dashboard' } }
}
