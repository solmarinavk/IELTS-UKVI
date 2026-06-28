import React from 'react'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'
import { colorAt } from '../../lib/colors.js'
import { toRows, seriesNames } from './chartUtils.js'

export default function LineChartView({ chart }) {
  const rows = toRows(chart)
  const names = seriesNames(chart)
  return (
    <div className="w-full">
      <div className="text-sm font-medium text-slate-600 mb-1">{chart.yLabel} {chart.unit ? `(${chart.unit})` : ''}</div>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={rows} margin={{ top: 8, right: 18, left: 0, bottom: 22 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="__x" tick={{ fontSize: 12 }} label={{ value: chart.xLabel, position: 'insideBottom', offset: -12, fontSize: 12, fill: '#64748b' }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => `${v}${chart.unit ? ' ' + chart.unit : ''}`} />
          <Legend verticalAlign="top" height={30} wrapperStyle={{ fontSize: 12 }} />
          {names.map((n, i) => (
            <Line key={n} type="monotone" dataKey={n} stroke={colorAt(i)} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} isAnimationActive={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
