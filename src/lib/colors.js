// Sober exam-style palette. Renderers assign colors by index so content data
// never needs to carry colours.
export const SERIES_COLORS = [
  '#1d4ed8', // blue
  '#0d9488', // teal
  '#b45309', // amber-brown
  '#7c3aed', // violet
  '#dc2626', // red
  '#0369a1', // sky
  '#65a30d', // lime
  '#be185d', // pink
]

export const colorAt = (i) => SERIES_COLORS[i % SERIES_COLORS.length]
