import { TASK1_BY_ID, TASK1 } from './task1.js'
import { TASK2_BY_ID, TASK2 } from './task2.js'
import { TASK1_SKELETONS, skeletonGroupForType, TASK2_SKELETONS } from './skeletons.js'

// 15 Task 1 structure templates: ~3 bar, 3 line, 2 pie, 2 table, 2 process, 2 map, 1 mixed.
export const STRUCTURE_T1_IDS = [
  't1-01', 't1-02', 't1-03', // bar
  't1-07', 't1-08', 't1-09', // line
  't1-13', 't1-14', // pie
  't1-17', 't1-18', // table
  't1-21', 't1-22', // process
  't1-25', 't1-26', // map
  't1-28', // mixed
]

// 15 Task 2 structure templates: 3 per essay type.
export const STRUCTURE_T2_IDS = [
  't2-01', 't2-02', 't2-03', // opinion
  't2-11', 't2-12', 't2-13', // discussion
  't2-19', 't2-20', 't2-21', // advdis
  't2-26', 't2-27', 't2-28', // problem
  't2-34', 't2-35', 't2-36', // twopart
]

export const STRUCTURE_T1 = STRUCTURE_T1_IDS.map((id) => {
  const ex = TASK1_BY_ID[id]
  const group = skeletonGroupForType(ex.type)
  return { id, task: 1, exercise: ex, skeleton: TASK1_SKELETONS[group], skeletonKey: group }
})

export const STRUCTURE_T2 = STRUCTURE_T2_IDS.map((id) => {
  const ex = TASK2_BY_ID[id]
  return { id, task: 2, exercise: ex, skeleton: TASK2_SKELETONS[ex.type], skeletonKey: ex.type }
})

export const STRUCTURE_ALL = [...STRUCTURE_T1, ...STRUCTURE_T2]
export const STRUCTURE_BY_ID = Object.fromEntries(STRUCTURE_ALL.map((t) => [t.id, t]))

// "Base structures" used for the mastery bars on the dashboard.
export const BASE_STRUCTURES = [
  { key: 't1-data', name: 'Task 1 · Charts & tables', task: 1, match: (t) => t.task === 1 && t.skeletonKey === 'data' },
  { key: 't1-process', name: 'Task 1 · Process diagrams', task: 1, match: (t) => t.task === 1 && t.skeletonKey === 'process' },
  { key: 't1-map', name: 'Task 1 · Maps', task: 1, match: (t) => t.task === 1 && t.skeletonKey === 'map' },
  { key: 't2-opinion', name: 'Task 2 · Opinion', task: 2, match: (t) => t.skeletonKey === 'opinion' },
  { key: 't2-discussion', name: 'Task 2 · Discussion', task: 2, match: (t) => t.skeletonKey === 'discussion' },
  { key: 't2-advdis', name: 'Task 2 · Adv / Disadv', task: 2, match: (t) => t.skeletonKey === 'advdis' },
  { key: 't2-problem', name: 'Task 2 · Problem / Solution', task: 2, match: (t) => t.skeletonKey === 'problem' },
  { key: 't2-twopart', name: 'Task 2 · Two-part', task: 2, match: (t) => t.skeletonKey === 'twopart' },
]
