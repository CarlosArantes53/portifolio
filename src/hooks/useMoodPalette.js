import { useState, useCallback, useEffect, useRef } from 'react'

export const DEFAULT_COLORS = [
  'rgba(0, 15, 60, 0.70)',
  'rgba(10, 40, 140, 0.60)',
  'rgba(25, 70, 210, 0.50)',
  'rgba(45, 0, 100, 0.65)',
  'rgba(85, 20, 190, 0.55)',
  'rgba(120, 55, 255, 0.45)',
]

const PALETTES = {
  default: DEFAULT_COLORS,
  calmo: [
    'rgba(20, 120, 160, 0.65)',
    'rgba(40, 140, 180, 0.60)',
    'rgba(60, 160, 200, 0.55)',
    'rgba(30, 130, 170, 0.60)',
    'rgba(50, 150, 190, 0.50)',
    'rgba(80, 170, 210, 0.45)',
  ],
  energia: [
    'rgba(180, 30, 20, 0.65)',
    'rgba(200, 60, 0, 0.60)',
    'rgba(160, 20, 40, 0.70)',
    'rgba(220, 80, 10, 0.55)',
    'rgba(190, 50, 30, 0.60)',
    'rgba(210, 70, 20, 0.55)',
  ],
  alegria: [
    'rgba(180, 150, 0, 0.60)',
    'rgba(200, 130, 10, 0.65)',
    'rgba(160, 180, 0, 0.55)',
    'rgba(140, 180, 20, 0.50)',
    'rgba(190, 160, 5, 0.60)',
    'rgba(220, 140, 0, 0.55)',
  ],
  triste: [
    'rgba(15, 15, 35, 0.80)',
    'rgba(25, 25, 55, 0.75)',
    'rgba(35, 35, 70, 0.70)',
    'rgba(20, 20, 45, 0.75)',
    'rgba(30, 30, 60, 0.70)',
    'rgba(40, 40, 80, 0.65)',
  ],
  foco: [
    'rgba(50, 0, 100, 0.75)',
    'rgba(70, 10, 140, 0.70)',
    'rgba(40, 5, 85, 0.80)',
    'rgba(90, 20, 160, 0.60)',
    'rgba(60, 10, 120, 0.70)',
    'rgba(80, 15, 150, 0.65)',
  ],
  natureza: [
    'rgba(10, 100, 50, 0.65)',
    'rgba(30, 130, 70, 0.60)',
    'rgba(50, 120, 40, 0.70)',
    'rgba(20, 110, 60, 0.60)',
    'rgba(40, 140, 55, 0.55)',
    'rgba(70, 150, 80, 0.50)',
  ],
  nostalgia: [
    'rgba(160, 80, 40, 0.65)',
    'rgba(140, 60, 30, 0.70)',
    'rgba(120, 70, 35, 0.75)',
    'rgba(170, 90, 50, 0.60)',
    'rgba(150, 75, 45, 0.65)',
    'rgba(130, 65, 38, 0.70)',
  ],
}

const KEYWORD_MAP = {
  calmo: ['calm', 'calmo', 'calma', 'tranquilo', 'tranquila', 'paz', 'sereno', 'serena', 'relaxado', 'relaxada', 'suave', 'peaceful', 'quiet', 'zen', 'sossego', 'descansado'],
  energia: ['energia', 'energetico', 'animado', 'animada', 'excitado', 'excitada', 'ativo', 'ativa', 'intenso', 'intensa', 'forte', 'raiva', 'bravo', 'brava', 'hype', 'rage', 'pumped', 'fury', 'angry', 'adrenalina'],
  alegria: ['alegre', 'alegria', 'feliz', 'felicidade', 'contente', 'empolgado', 'empolgada', 'otimista', 'happy', 'joy', 'excited', 'amazing', 'great', 'awesome', 'love', 'maravilhoso', 'maravilhosa', 'ótimo', 'otimo'],
  triste: ['triste', 'tristeza', 'sad', 'melancolico', 'melancolica', 'deprimido', 'deprimida', 'cansado', 'cansada', 'entediado', 'entediada', 'bored', 'tired', 'exhausted', 'melancholy', 'down', 'blue', 'chateado'],
  foco: ['foco', 'focado', 'focada', 'concentrado', 'concentrada', 'produtivo', 'produtiva', 'trabalho', 'serio', 'seria', 'focus', 'focused', 'work', 'productive', 'determined', 'study', 'estudando'],
  natureza: ['natureza', 'verde', 'floresta', 'vida', 'terra', 'fresh', 'fresco', 'fresca', 'nature', 'forest', 'green', 'outdoor', 'plant', 'campo'],
  nostalgia: ['nostalgia', 'saudade', 'nostalgico', 'nostalgica', 'memoria', 'passado', 'antigo', 'antiga', 'longing', 'memory', 'past', 'vintage', 'retro', 'lembranca'],
}

function normalize(str) {
  return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()
}

function matchKeywords(input) {
  if (!input) return null
  const n = normalize(input)
  for (const [mood, keywords] of Object.entries(KEYWORD_MAP)) {
    if (keywords.some(kw => n.includes(normalize(kw)))) return mood
  }
  return null
}

// Maps sentiment model output to a palette mood
function sentimentToMood(result) {
  if (result.label === 'POSITIVE') return result.score > 0.88 ? 'alegria' : 'calmo'
  if (result.label === 'NEGATIVE') return result.score > 0.88 ? 'triste' : 'foco'
  return 'default'
}

export default function useMoodPalette() {
  const [colors, setColors] = useState(DEFAULT_COLORS)
  const [modelReady, setModelReady] = useState(false)
  const workerRef = useRef(null)
  const pendingRef = useRef(null)

  useEffect(() => {
    const worker = new Worker(
      new URL('../workers/classifier.worker.js', import.meta.url),
      { type: 'module' }
    )
    worker.onmessage = (e) => {
      if (e.data.type === 'ready') {
        setModelReady(true)
      } else if (e.data.type === 'result') {
        if (pendingRef.current && e.data.id === pendingRef.current) {
          setColors(PALETTES[sentimentToMood(e.data.result)])
        }
      }
    }
    workerRef.current = worker
    return () => worker.terminate()
  }, [])

  const applyMood = useCallback((input) => {
    const keywordMood = matchKeywords(input)
    if (keywordMood) {
      setColors(PALETTES[keywordMood])
      pendingRef.current = null
    } else if (modelReady && workerRef.current) {
      // Phase B: fall back to model for unrecognized inputs
      const id = Date.now()
      pendingRef.current = id
      workerRef.current.postMessage({ type: 'classify', text: input, id })
    } else {
      setColors(PALETTES.default)
    }
  }, [modelReady])

  const resetMood = useCallback(() => {
    setColors(DEFAULT_COLORS)
    pendingRef.current = null
  }, [])

  return { colors, modelReady, applyMood, resetMood }
}
