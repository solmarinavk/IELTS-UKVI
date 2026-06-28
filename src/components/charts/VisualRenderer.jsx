import React from 'react'
import BarChartView from './BarChartView.jsx'
import LineChartView from './LineChartView.jsx'
import PieChartView from './PieChartView.jsx'
import TableView from './TableView.jsx'
import ProcessDiagram from './ProcessDiagram.jsx'
import MapDiagram from './MapDiagram.jsx'
import MixedView from './MixedView.jsx'

// Renders the visual for any Task 1 exercise based on its type.
export default function VisualRenderer({ exercise }) {
  if (!exercise) return null
  switch (exercise.type) {
    case 'bar':
      return <BarChartView chart={exercise.chart} />
    case 'line':
      return <LineChartView chart={exercise.chart} />
    case 'pie':
      return <PieChartView pie={exercise.pie} />
    case 'table':
      return <TableView table={exercise.table} />
    case 'process':
      return <ProcessDiagram process={exercise.process} />
    case 'map':
      return <MapDiagram map={exercise.map} />
    case 'mixed':
      return <MixedView mixed={exercise.mixed} />
    default:
      return <div className="text-sm text-slate-500">No visual available.</div>
  }
}
