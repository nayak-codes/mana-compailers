// server/index.js — Local Express backend
// Node 18+ has built-in fetch, no extra package needed!

const express = require('express')
const cors    = require('cors')

const app  = express()
const PORT = 3002  // Changed to 3002 to avoid conflicts

app.use(cors())
app.use(express.json())

const CLIENT_ID     = 'f0b9d26b55b41b417bc0804b19551187'
const CLIENT_SECRET = '7db23d86e627704c5eda59237167521c31ce0241ecbf78a6f5f3873a54666a4d'

app.post('/api/run', async (req, res) => {
  const { script, language, versionIndex, stdin } = req.body

  if (!script || !language) {
    return res.status(400).json({ error: 'script and language required' })
  }

  try {
    console.log(`[Mana Compiler] Running: ${language}`)

    const response = await fetch('https://api.jdoodle.com/v1/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId:     CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        script,
        language,
        versionIndex: versionIndex || '0',
        stdin: stdin || ''
      })
    })

    const data = await response.json()
    console.log(`[Mana Compiler] Result:`, data.output || data.error)
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
