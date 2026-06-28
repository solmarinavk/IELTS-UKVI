// Builds the standard IELTS rubric strings from exercise data, so every item
// shows a consistent, authentic instruction.

const VISUAL_NOUN = {
  bar: 'bar chart',
  line: 'line graph',
  pie: 'pie chart',
  table: 'table',
  process: 'diagram',
  map: 'maps',
  mixed: 'charts',
}

export function task1Rubric(exercise) {
  const noun = VISUAL_NOUN[exercise.type] || 'chart'
  const intro = exercise.type === 'map'
    ? `The ${noun} below show ${exercise.visualDescription}.`
    : `The ${noun} below shows ${exercise.visualDescription}.`
  const action = exercise.type === 'process'
    ? 'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.'
    : 'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.'
  return `${intro} ${action} Write at least 150 words.`
}

export function task2Rubric(exercise) {
  return `Write about the following topic:\n\n${exercise.prompt}\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.`
}
