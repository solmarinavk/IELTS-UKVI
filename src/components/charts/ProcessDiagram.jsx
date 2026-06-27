import React from 'react'

// --- small text wrapper for SVG (no native wrapping) ---
function wrap(text, maxChars, maxLines) {
  const words = String(text || '').split(/\s+/)
  const lines = []
  let line = ''
  for (const w of words) {
    if ((line + ' ' + w).trim().length <= maxChars) {
      line = (line + ' ' + w).trim()
    } else {
      if (line) lines.push(line)
      line = w
      if (lines.length === maxLines - 1) break
    }
  }
  if (line && lines.length < maxLines) lines.push(line)
  // overflow indicator
  if (lines.length === maxLines) {
    const used = lines.join(' ').length
    if (used < String(text || '').length - 1) lines[maxLines - 1] = lines[maxLines - 1].replace(/\.?$/, '…')
  }
  return lines
}

function StepBox({ x, y, w, h, n, title, description, accent }) {
  const titleLines = wrap(title, Math.floor(w / 7.5), 2)
  const descLines = wrap(description, Math.floor(w / 6.0), 3)
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="#ffffff" stroke={accent} strokeWidth="1.5" />
      <circle cx={x + 16} cy={y + 16} r={11} fill={accent} />
      <text x={x + 16} y={y + 20} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">{n}</text>
      {titleLines.map((l, i) => (
        <text key={`t${i}`} x={x + 34} y={y + 14 + i * 14} fontSize="12.5" fontWeight="700" fill="#1e293b">{l}</text>
      ))}
      {descLines.map((l, i) => (
        <text key={`d${i}`} x={x + 12} y={y + 16 + titleLines.length * 14 + i * 13} fontSize="11" fill="#475569">{l}</text>
      ))}
    </g>
  )
}

function Arrow({ x1, y1, x2, y2 }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
}

function LinearProcess({ steps, accent }) {
  const cols = steps.length <= 3 ? steps.length : (steps.length <= 8 ? 3 : 4)
  const boxW = 250, boxH = 96, gapX = 56, gapY = 64, mX = 16, mY = 16
  const rows = Math.ceil(steps.length / cols)
  const width = mX * 2 + cols * boxW + (cols - 1) * gapX
  const height = mY * 2 + rows * boxH + (rows - 1) * gapY

  const pos = steps.map((_, i) => {
    const row = Math.floor(i / cols)
    const colInRow = i % cols
    const visCol = row % 2 === 0 ? colInRow : (cols - 1 - colInRow)
    return { x: mX + visCol * (boxW + gapX), y: mY + row * (boxH + gapY) }
  })

  const arrows = []
  for (let i = 0; i < steps.length - 1; i++) {
    const a = pos[i], b = pos[i + 1]
    if (a.y === b.y) {
      // same row
      if (b.x > a.x) arrows.push({ x1: a.x + boxW, y1: a.y + boxH / 2, x2: b.x, y2: b.y + boxH / 2 })
      else arrows.push({ x1: a.x, y1: a.y + boxH / 2, x2: b.x + boxW, y2: b.y + boxH / 2 })
    } else {
      // row change — vertical
      arrows.push({ x1: a.x + boxW / 2, y1: a.y + boxH, x2: b.x + boxW / 2, y2: b.y })
    }
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" role="img" aria-label="process diagram">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="8" refX="8" refY="4" orient="auto">
          <path d="M0,0 L10,4 L0,8 z" fill="#64748b" />
        </marker>
      </defs>
      {arrows.map((a, i) => <Arrow key={i} {...a} />)}
      {steps.map((s, i) => (
        <StepBox key={i} x={pos[i].x} y={pos[i].y} w={boxW} h={boxH} n={i + 1} title={s.title} description={s.description} accent={accent} />
      ))}
    </svg>
  )
}

function CycleProcess({ steps, accent }) {
  const n = steps.length
  const size = 560
  const cx = size / 2, cy = size / 2
  const R = 196
  const boxW = 168, boxH = 78
  const centers = steps.map((_, i) => {
    const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n
    return { cx: cx + R * Math.cos(ang), cy: cy + R * Math.sin(ang), ang }
  })
  // arrows along the circle (clockwise) between consecutive box edges
  const arc = (i) => {
    const a = centers[i], b = centers[(i + 1) % n]
    // start/end slightly inside toward the ring
    const sa = a.ang + 0.42, ea = b.ang - 0.42
    const sx = cx + (R - 4) * Math.cos(sa), sy = cy + (R - 4) * Math.sin(sa)
    const ex = cx + (R - 4) * Math.cos(ea), ey = cy + (R - 4) * Math.sin(ea)
    return `M ${sx} ${sy} A ${R - 4} ${R - 4} 0 0 1 ${ex} ${ey}`
  }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto max-h-[520px]" role="img" aria-label="cyclical process diagram">
      <defs>
        <marker id="arrowhead-c" markerWidth="11" markerHeight="9" refX="8" refY="4.5" orient="auto">
          <path d="M0,0 L11,4.5 L0,9 z" fill="#64748b" />
        </marker>
      </defs>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 5" />
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="14" fontWeight="700" fill="#94a3b8">CYCLE</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="11" fill="#cbd5e1">↻ repeats continuously</text>
      {steps.map((_, i) => (
        <path key={i} d={arc(i)} fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead-c)" />
      ))}
      {steps.map((s, i) => {
        const c = centers[i]
        const x = c.cx - boxW / 2, y = c.cy - boxH / 2
        const titleLines = wrap(s.title, 24, 2)
        const descLines = wrap(s.description, 28, 2)
        return (
          <g key={i}>
            <rect x={x} y={y} width={boxW} height={boxH} rx={9} fill="#ffffff" stroke={accent} strokeWidth="1.5" />
            <circle cx={x + 15} cy={y + 15} r={10} fill={accent} />
            <text x={x + 15} y={y + 19} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">{i + 1}</text>
            {titleLines.map((l, li) => (
              <text key={`t${li}`} x={x + 31} y={y + 13 + li * 13} fontSize="11.5" fontWeight="700" fill="#1e293b">{l}</text>
            ))}
            {descLines.map((l, li) => (
              <text key={`d${li}`} x={x + 10} y={y + 14 + titleLines.length * 13 + li * 12} fontSize="10" fill="#475569">{l}</text>
            ))}
          </g>
        )
      })}
    </svg>
  )
}

export default function ProcessDiagram({ process, accent = '#1d4ed8' }) {
  if (!process || !Array.isArray(process.steps)) return null
  return (
    <div className="w-full">
      {process.kind === 'cycle'
        ? <CycleProcess steps={process.steps} accent={accent} />
        : <LinearProcess steps={process.steps} accent={accent} />}
    </div>
  )
}
