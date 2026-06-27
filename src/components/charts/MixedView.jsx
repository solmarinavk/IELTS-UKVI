import React from 'react'
import BarChartView from './BarChartView.jsx'
import LineChartView from './LineChartView.jsx'
import PieChartView from './PieChartView.jsx'
import TableView from './TableView.jsx'

function SubChart({ part }) {
  if (part.kind === 'bar') return <BarChartView chart={part.chart} />
  if (part.kind === 'line') return <LineChartView chart={part.chart} />
  if (part.kind === 'pie') return <PieChartView pie={part.pie} />
  if (part.kind === 'table') return <TableView table={part.table} />
  return null
}

export default function MixedView({ mixed }) {
  if (!mixed || !Array.isArray(mixed.charts)) return null
  return (
    <div className="space-y-5">
      {mixed.charts.map((part, i) => (
        <div key={i} className="border border-slate-200 rounded-lg p-3 bg-white">
          {part.title ? <div className="text-sm font-semibold text-slate-700 mb-2">{String.fromCharCode(65 + i)}. {part.title}</div> : null}
          <SubChart part={part} />
        </div>
      ))}
    </div>
  )
}
