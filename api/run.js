// api/run.js — Vercel serverless
// Redirects to Render Docker backend

const BACKEND_URL = 'https://mana-compailer-backend-docker.onrender.com'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  // 🔥 Health check — used for warmup pings to wake Render backend
  if (req.method === 'GET') {
    try {
      await fetch(`${BACKEND_URL}/api/health`, { signal: AbortSignal.timeout(5000) })
    } catch (_) {}
    return res.status(200).json({ status: 'ok' })
  }

  try {
    const r = await fetch(`${BACKEND_URL}/api/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    })
    const data = await r.json()
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
