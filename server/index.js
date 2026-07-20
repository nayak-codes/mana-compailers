// server/index.js — Local Express backend
// Node 18+ has built-in fetch, no extra package needed!

const express = require('express')
const cors    = require('cors')
const https   = require('https')

const app  = express()
const PORT = 3002  // Changed to 3002 to avoid conflicts

// Reuse HTTPS connections to reduce cold-start latency
const agent = new https.Agent({ keepAlive: true })

function preprocessJavaCode(code) {
  // 1. Escape non-ASCII characters to \uXXXX unicode escapes
  let escapedCode = '';
  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    const codePoint = code.charCodeAt(i);
    if (codePoint > 127) {
      const hex = codePoint.toString(16).padStart(4, '0');
      escapedCode += '\\u' + hex;
    } else {
      escapedCode += char;
    }
  }
  code = escapedCode;

  // 2. Rename class to Main if necessary
  if (/\bclass\s+Main\b/.test(code)) {
    return code;
  }
  const publicClassMatch = code.match(/\bpublic\s+class\s+([A-Za-z0-9_]+)\b/);
  let targetClassName = null;
  if (publicClassMatch) {
    targetClassName = publicClassMatch[1];
  } else {
    const classMatch = code.match(/\bclass\s+([A-Za-z0-9_]+)\b/);
    if (classMatch) {
      targetClassName = classMatch[1];
    }
  }
  if (targetClassName && targetClassName !== 'Main') {
    const escapedName = targetClassName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const replacementRegex = new RegExp('\\b' + escapedName + '\\b', 'g');
    return code.replace(replacementRegex, 'Main');
  }
  return code;
}

app.use(cors())
app.use(express.json())

// 🔥 Health check endpoint for warmup pings
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Mana Compiler backend is awake!' })
})

// 📋 Code Clipboard — Share code with a 4-digit PIN (expires in 24 hours)
const clipboardStore = new Map()

function generatePin() {
  return String(Math.floor(1000 + Math.random() * 9000))
}

function cleanupClipboard() {
  const now = Date.now()
  for (const [key, val] of clipboardStore.entries()) {
    if (now > val.expiresAt) clipboardStore.delete(key)
  }
}

// Save code → returns 4-digit PIN
app.post('/api/clipboard', (req, res) => {
  cleanupClipboard()
  const { code, language, languageLabel } = req.body
  if (!code || !language) {
    return res.status(400).json({ error: 'code and language are required' })
  }
  if (code.length > 50000) {
    return res.status(400).json({ error: 'Code too large (max 50KB)' })
  }
  let pin
  let attempts = 0
  do {
    pin = generatePin()
    attempts++
  } while (clipboardStore.has(pin) && attempts < 100)

  clipboardStore.set(pin, {
    code,
    language,
    languageLabel: languageLabel || language,
    createdAt: Date.now(),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
  })

  console.log(`[Clipboard] Saved PIN ${pin} (${language})`)
  return res.json({ pin, expiresIn: '24 hours' })
})

// Retrieve code by 4-digit PIN
app.get('/api/clipboard', (req, res) => {
  cleanupClipboard()
  const { pin } = req.query
  if (!pin || !/^\d{4}$/.test(pin)) {
    return res.status(400).json({ error: 'Invalid PIN format. Must be 4 digits.' })
  }
  const entry = clipboardStore.get(pin)
  if (!entry || Date.now() > entry.expiresAt) {
    if (entry) clipboardStore.delete(pin)
    return res.status(404).json({ error: 'Code not found. PIN may have expired or is incorrect.' })
  }
  console.log(`[Clipboard] Retrieved PIN ${pin} (${entry.language})`)
  return res.json({
    code: entry.code,
    language: entry.language,
    languageLabel: entry.languageLabel,
    createdAt: entry.createdAt,
  })
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
        code: language === 'java' ? preprocessJavaCode(code) : code,
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
