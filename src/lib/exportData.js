import { TASK1_BY_ID } from '../data/task1.js'
import { TASK2_BY_ID } from '../data/task2.js'
import { STRUCTURE_BY_ID } from '../data/templates.js'

function download(filename, content, mime) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function exportJSON(state) {
  download('ielts-writing-progress.json', JSON.stringify(state, null, 2), 'application/json')
}

export function exportTXT(state) {
  const lines = []
  lines.push('IELTS ACADEMIC WRITING — MY RESPONSES')
  lines.push('Exported: ' + new Date().toLocaleString())
  lines.push('')

  lines.push('==================== FREE PRACTICE ====================')
  for (const [id, ans] of Object.entries(state.practice || {})) {
    if (!ans || !(ans.text && ans.text.trim())) continue
    const ex = TASK1_BY_ID[id] || TASK2_BY_ID[id]
    const title = ex ? (ex.title || ex.topic || id) : id
    lines.push('')
    lines.push(`----- ${id} · ${title} ${ans.completed ? '[COMPLETED]' : '[DRAFT]'} -----`)
    lines.push(`Words: ${ans.words || 0} · Time: ${Math.round((ans.timeSpent || 0) / 60)} min${ans.difficulty ? ' · Difficulty: ' + ans.difficulty : ''}`)
    lines.push(ans.text.trim())
  }

  lines.push('')
  lines.push('==================== STRUCTURE MODE ====================')
  for (const [id, st] of Object.entries(state.structure || {})) {
    const tpl = STRUCTURE_BY_ID[id]
    if (!tpl) continue
    const anyText = [1, 2, 3].some((l) => st.levels?.[l] && Object.values(st.levels[l].boxes || {}).some((t) => t && t.trim()))
    if (!anyText) continue
    lines.push('')
    lines.push(`----- ${id} · ${tpl.exercise.title || tpl.exercise.topic} -----`)
    for (const level of [1, 2, 3]) {
      const lvl = st.levels?.[level]
      if (!lvl) continue
      const boxes = tpl.skeleton.boxes
      const filled = boxes.map((b) => (lvl.boxes?.[b.id] || '').trim()).filter(Boolean)
      if (!filled.length) continue
      lines.push(`  [Level ${level}${lvl.completed ? ' ✓' : ''}]`)
      boxes.forEach((b) => {
        const t = (lvl.boxes?.[b.id] || '').trim()
        if (t) lines.push(`   ${b.label}\n   ${t}`)
      })
    }
  }

  download('ielts-writing-responses.txt', lines.join('\n'), 'text/plain')
}
