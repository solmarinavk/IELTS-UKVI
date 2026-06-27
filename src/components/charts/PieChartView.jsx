import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { colorAt } from '../../lib/colors.js'

function OnePie({ chart, unit }) {
  const data = (chart.slices || []).map((s) => ({ name: s.label, value: s.value }))
  return (
    <div className="flex-1 min-w-[240px]">
      <div className="text-center text-sm font-medium text-slate-600 mb-1">{chart.label}</div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="72%"
            startAngle={90}
            endAngle={-270}
            isAnimationActive={false}
            label={({ value }) => `${value}${unit || ''}`}
            labelLine={true}
            style={{ fontSize: 11 }}
          >
            {data.map((d, i) => <Cell key={i} fill={colorAt(i)} />)}
          </Pie>
          <Tooltip formatter={(v, n) => [`${v}${unit || ''}`, n]} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default function PieChartView({ pie }) {
  const charts = pie?.charts || []
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {charts.map((c, i) => <OnePie key={i} chart={c} unit={pie.unit} />)}
    </div>
  )
}
