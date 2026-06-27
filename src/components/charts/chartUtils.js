// Transform our content schema { categories, series:[{name, values}] } into the
// row format Recharts consumes: [{ x: cat, seriesName: value, ... }].
export function toRows(chart) {
  if (!chart || !Array.isArray(chart.categories)) return []
  return chart.categories.map((cat, i) => {
    const row = { __x: cat }
    ;(chart.series || []).forEach((s) => {
      row[s.name] = s.values?.[i] ?? null
    })
    return row
  })
}

export const seriesNames = (chart) => (chart?.series || []).map((s) => s.name)
