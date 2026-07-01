// server/index.js — Local Express backend
// Node 18+ has built-in fetch, no extra package needed!

const express = require('express')
const cors    = require('cors')
const https   = require('https')

const app  = express()
const PORT = 3002  // Changed to 3002 to avoid conflicts

// Reuse HTTPS connections to reduce cold-start latency
const agent = new https.Agent({ keepAlive: true })

app.use(cors())
app.use(express.json())

// 🔥 Health check endpoint for warmup pings
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Mana Compiler backend is awake!' })
})

app.post('/api/run', async (req, res) => {
  const { code, language, stdin } = req.body

  if (!code || !language) {
    return res.status(400).json({ error: 'code and language required' })
  }

  try {
    console.log(`[Mana Compiler] Running: ${language}`)
    const startTime = Date.now()

    // ✅ Use Render Docker backend (faster, no API rate limits!)
    const response = await fetch('https://mana-compailer-backend-docker.onrender.com/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: language,
        code: code,
        stdin: stdin || ''
      }),
      agent  // ✅ Keep-alive connections
    })

    const data = await response.json()
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2)
    console.log(`[Mana Compiler] Result (${elapsed}s):`, data.output || data.error)
    return res.json(data)

  } catch (err) {
    console.error('[Mana Compiler] Error:', err.message)
    return res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`✅ Mana Compiler backend: http://localhost:${PORT}`)
  console.log(`   Open frontend at:      http://localhost:5173`)
})
