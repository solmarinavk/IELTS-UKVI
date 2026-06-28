import React from 'react'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'
import { colorAt } from '../../lib/colors.js'
import { toRows, seriesNames } from './chartUtils.js'

export default function BarChartView({ chart }) {
  const rows = toRows(chart)
  const names = seriesNames(chart)
  return (
    <div className="w-full">
      <div className="text-sm font-medium text-slate-600 mb-1">{chart.yLabel} {chart.unit ? `(${chart.unit})` : ''}</div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={rows} margin={{ top: 8, right: 12, left: 0, bottom: 22 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="__x" tick={{ fontSize: 12 }} label={{ value: chart.xLabel, position: 'insideBottom', offset: -12, fontSize: 12, fill: '#64748b' }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => `${v}${chart.unit ? ' ' + chart.unit : ''}`} />
          <Legend verticalAlign="top" height={30} wrapperStyle={{ fontSize: 12 }} />
          {names.map((n, i) => (
            <Bar key={n} dataKey={n} fill={colorAt(i)} radius={[2, 2, 0, 0]} maxBarSize={48} isAnimationActive={false} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
