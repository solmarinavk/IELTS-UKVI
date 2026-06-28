import { GENERATED_T1 } from './task1Generated.js'
import { MAPS, MIXED } from './task1Authored.js'

// Assemble the 30 Task 1 exercises in a fixed order with stable ids and types.
// Order: 6 bar, 6 line, 4 pie, 4 table, 4 process, 3 maps, 3 mixed.
const groups = [
  ['bar', GENERATED_T1.bar],
  ['line', GENERATED_T1.line],
  ['pie', GENERATED_T1.pie],
  ['table', GENERATED_T1.table],
  ['process', GENERATED_T1.process],
  ['map', MAPS],
  ['mixed', MIXED],
]

const list = []
let n = 0
for (const [type, items] of groups) {
  for (const item of items) {
    n += 1
    list.push({ id: `t1-${String(n).padStart(2, '0')}`, type, ...item })
  }
}

export const TASK1 = list
export const TASK1_BY_ID = Object.fromEntries(list.map((e) => [e.id, e]))
