import { useState } from 'react'

export default function MoodInput({ onMood, onReset, modelReady }) {
  const [value, setValue] = useState('')
  const [active, setActive] = useState(false)

  const submit = () => {
    const trimmed = value.trim()
    if (!trimmed) return
    onMood(trimmed)
    setActive(true)
    setValue('')
  }

  const reset = () => {
    onReset()
    setActive(false)
    setValue('')
  }

  return (
    <div className="mt-10 flex flex-col items-center gap-2">
      <span
        className="text-xs font-mono"
        style={{ color: 'rgba(255,255,255,0.30)', fontFamily: "'JetBrains Mono', monospace" }}
      >
        qual é o seu humor agora?
      </span>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="calmo, energia, saudade..."
          maxLength={40}
          className="bg-transparent rounded-full px-4 py-1.5 text-sm font-mono text-white/60 outline-none transition-all focus:text-white/90 placeholder:text-white/20"
          style={{
            border: '1px solid rgba(255,255,255,0.12)',
            fontFamily: "'JetBrains Mono', monospace",
            width: '210px',
          }}
        />
        <button
          onClick={submit}
          className="rounded-full px-3 py-1.5 text-sm font-mono transition-all hover:scale-110 active:scale-95"
          style={{
            background: 'rgba(125, 211, 252, 0.08)',
            border: '1px solid rgba(125, 211, 252, 0.25)',
            color: '#7dd3fc',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          →
        </button>
        {active && (
          <button
            onClick={reset}
            className="rounded-full px-2.5 py-1.5 text-xs font-mono transition-all hover:scale-110 opacity-50 hover:opacity-100"
            style={{
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: "'JetBrains Mono', monospace",
            }}
            title="resetar"
          >
            ✕
          </button>
        )}
      </div>

      <div className="h-4 flex items-center">
        {modelReady ? (
          <span
            className="text-xs font-mono flex items-center gap-1"
            style={{ color: 'rgba(125, 211, 252, 0.35)', fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span style={{ fontSize: '7px' }}>✦</span> AI ativo
          </span>
        ) : (
          <span
            className="text-xs font-mono"
            style={{ color: 'rgba(255,255,255,0.15)', fontFamily: "'JetBrains Mono', monospace" }}
          >
            carregando modelo...
          </span>
        )}
      </div>
    </div>
  )
}
