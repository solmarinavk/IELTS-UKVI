import { GENERATED_T2 } from './task2Generated.js'

// Assemble the 40 Task 2 prompts in a fixed order with stable ids and types.
// Order: 10 opinion, 8 discussion, 7 adv/dis, 8 problem, 7 two-part.
const groups = [
  ['opinion', GENERATED_T2.opinion],
  ['discussion', GENERATED_T2.discussion],
  ['advdis', GENERATED_T2.advdis],
  ['problem', GENERATED_T2.problem],
  ['twopart', GENERATED_T2.twopart],
]

const list = []
let n = 0
for (const [type, items] of groups) {
  for (const item of items) {
    n += 1
    list.push({ id: `t2-${String(n).padStart(2, '0')}`, type, ...item })
  }
}

export const TASK2 = list
export const TASK2_BY_ID = Object.fromEntries(list.map((e) => [e.id, e]))
