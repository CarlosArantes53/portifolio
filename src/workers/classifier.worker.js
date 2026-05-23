import { pipeline, env } from '@xenova/transformers'

env.allowLocalModels = false

let classifier = null

async function loadModel() {
  classifier = await pipeline(
    'sentiment-analysis',
    'Xenova/distilbert-base-uncased-finetuned-sst-2-english',
    { quantized: true }
  )
  self.postMessage({ type: 'ready' })
}

self.addEventListener('message', async (e) => {
  if (e.data.type === 'classify' && classifier) {
    const result = await classifier(e.data.text, { topk: 1 })
    self.postMessage({ type: 'result', result: result[0], id: e.data.id })
  }
})

loadModel()
