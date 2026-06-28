import React from 'react'

const FILL = {
  building: { fill: '#dbeafe', stroke: '#1d4ed8' },
  rect: { fill: '#dbeafe', stroke: '#1d4ed8' },
  park: { fill: '#dcfce7', stroke: '#16a34a' },
  green: { fill: '#dcfce7', stroke: '#16a34a' },
  water: { fill: '#bae6fd', stroke: '#0284c7' },
  sand: { fill: '#fef9c3', stroke: '#ca8a04' },
  road: { fill: '#e2e8f0', stroke: '#94a3b8' },
  car: { fill: '#fee2e2', stroke: '#dc2626' },
  circle: { fill: '#ede9fe', stroke: '#7c3aed' },
}

function MapElement({ el }) {
  const s = FILL[el.shape] || FILL.rect
  const cx = el.x + el.w / 2
  const cy = el.y + el.h / 2
  const labelLines = String(el.label || '').split('\n')

  let shapeEl
  if (el.shape === 'tree') {
    shapeEl = (
      <g>
        <circle cx={cx} cy={cy} r={Math.min(el.w, el.h) / 2} fill="#22c55e" stroke="#15803d" strokeWidth="0.4" />
      </g>
    )
  } else if (el.shape === 'circle') {
    shapeEl = <circle cx={cx} cy={cy} r={Math.min(el.w, el.h) / 2} fill={s.fill} stroke={s.stroke} strokeWidth="0.5" />
  } else if (el.shape === 'road') {
    const horizontal = el.w >= el.h
    shapeEl = (
      <g>
        <rect x={el.x} y={el.y} width={el.w} height={el.h} fill={s.fill} stroke={s.stroke} strokeWidth="0.3" />
        <line
          x1={horizontal ? el.x : cx} y1={horizontal ? cy : el.y}
          x2={horizontal ? el.x + el.w : cx} y2={horizontal ? cy : el.y + el.h}
          stroke="#ffffff" strokeWidth="0.6" strokeDasharray="2 2"
        />
      </g>
    )
  } else {
    shapeEl = <rect x={el.x} y={el.y} width={el.w} height={el.h} rx={el.shape === 'water' ? 1 : 0.6} fill={s.fill} stroke={s.stroke} strokeWidth="0.5" />
  }

  return (
    <g>
      {shapeEl}
      {el.label && el.shape !== 'tree' ? (
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="3" fill="#1e293b" style={{ pointerEvents: 'none' }}>
          {labelLines.map((l, i) => (
            <tspan key={i} x={cx} dy={i === 0 ? -(labelLines.length - 1) * 1.6 : 3.4}>{l}</tspan>
          ))}
        </text>
      ) : null}
    </g>
  )
}

function Panel({ title, elements }) {
  return (
    <div className="flex-1 min-w-[260px]">
      <div className="text-center text-sm font-semibold text-slate-700 mb-1">{title}</div>
      <svg viewBox="0 0 100 100" className="w-full h-auto border border-slate-300 rounded-md bg-[#f8fafc]" role="img" aria-label={`map ${title}`}>
        {(elements || []).map((el, i) => <MapElement key={i} el={el} />)}
      </svg>
    </div>
  )
}

export default function MapDiagram({ map }) {
  if (!map) return null
  return (
    <div>
      <div className="flex flex-wrap gap-4">
        <Panel title={map.beforeLabel} elements={map.before} />
        <Panel title={map.afterLabel} elements={map.after} />
      </div>
    </div>
  )
}
