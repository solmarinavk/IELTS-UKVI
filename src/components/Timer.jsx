import React, { useEffect, useRef, useState, useCallback } from 'react'
import { formatClock } from '../lib/wordcount.js'

// Countdown timer that mirrors the exam: start/pause/reset, amber in the last
// 5 minutes, red in the last minute, and does NOT block writing at 0:00.
export default function Timer({ totalSeconds = 1200, autoStart = false, onElapsed, compact = false }) {
  const [remaining, setRemaining] = useState(totalSeconds)
  const [running, setRunning] = useState(autoStart)
  const elapsedRef = useRef(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    setRemaining(totalSeconds)
    elapsedRef.current = 0
  }, [totalSeconds])

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        elapsedRef.current += 1
        if (onElapsed) onElapsed(elapsedRef.current)
        setRemaining((r) => (r > 0 ? r - 1 : 0))
      }, 1000)
    }
    return () => intervalRef.current && clearInterval(intervalRef.current)
  }, [running, onElapsed])

  const reset = useCallback(() => {
    setRunning(false)
    setRemaining(totalSeconds)
    elapsedRef.current = 0
  }, [totalSeconds])

  const overtime = remaining === 0
  const danger = remaining > 0 && remaining <= 60
  const warning = remaining > 60 && remaining <= 300

  const color = overtime
    ? 'text-red-700 bg-red-50 border-red-300'
    : danger
      ? 'text-red-700 bg-red-50 border-red-300 animate-pulse'
      : warning
        ? 'text-amber-700 bg-amber-50 border-amber-300'
        : 'text-slate-800 bg-white border-slate-300'

  return (
    <div className="flex items-center gap-2">
      <div className={`flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono font-semibold tabular-nums ${color}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2 2M12 2h0M9 2h6" /></svg>
        <span className={compact ? 'text-sm' : 'text-base'}>{overtime ? "0:00" : formatClock(remaining)}</span>
        {overtime ? <span className="text-xs font-sans font-medium">Time up</span> : null}
      </div>
      <div className="flex items-center gap-1">
        {!running ? (
          <button onClick={() => setRunning(true)} className="btn-soft px-2 py-1.5" title="Start" aria-label="Start">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          </button>
        ) : (
          <button onClick={() => setRunning(false)} className="btn-soft px-2 py-1.5" title="Pause" aria-label="Pause">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
          </button>
        )}
        <button onClick={reset} className="btn-soft px-2 py-1.5" title="Reset" aria-label="Reset">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
        </button>
      </div>
    </div>
  )
}
