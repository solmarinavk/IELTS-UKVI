import React from 'react'

export default function TableView({ table }) {
  if (!table) return null
  const { columns = [], rows = [], unit } = table
  return (
    <div className="overflow-x-auto thin-scroll">
      {unit ? <div className="text-xs text-slate-500 mb-2">All figures in {unit}.</div> : null}
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border border-slate-300 bg-slate-100 px-3 py-2 text-left font-semibold"></th>
            {columns.map((c, i) => (
              <th key={i} className="border border-slate-300 bg-slate-100 px-3 py-2 text-center font-semibold whitespace-nowrap">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className={ri % 2 ? 'bg-slate-50' : ''}>
              <th className="border border-slate-300 px-3 py-2 text-left font-medium bg-slate-50 whitespace-nowrap">{r.label}</th>
              {(r.values || []).map((v, ci) => (
                <td key={ci} className="border border-slate-300 px-3 py-2 text-center tabular-nums">{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
