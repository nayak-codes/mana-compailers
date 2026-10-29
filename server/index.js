// server/index.js — Local Express backend
// Node 18+ has built-in fetch, no extra package needed!

const express = require('express')
const cors    = require('cors')
const https   = require('https')

const app  = express()
const PORT = 3002  // Changed to 3002 to avoid conflicts

// Reuse HTTPS connections to reduce cold-start latency
const agent = new https.Agent({ keepAlive: true })

const PAIZA_LANG_MAP = {
  python3: 'python3',
  nodejs: 'javascript',
  c: 'c',
  cpp17: 'cpp',
  java: 'java',
  go: 'go',
  rust: 'rust',
  php: 'php',
  ruby: 'ruby',
  csharp: 'csharp'
}

// Detect if Java code uses Scanner/BufferedReader/System.in
function javaUsesInput(code) {
  return /scanner|bufferedreader|system\.in/i.test(code);
}

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

async function runFastRunner(language, code, stdin = '') {
  const paizaLang = PAIZA_LANG_MAP[language]
  if (!paizaLang) return null

  try {
    const processedCode = language === 'java' ? preprocessJavaCode(code) : code
    const createRes = await fetch('https://api.paiza.io/runners/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: paizaLang,
        source_code: processedCode,
        input: stdin || '',
        api_key: 'guest'
      })
    })
    const createData = await createRes.json()
    if (!createData || !createData.id) return null

    const id = createData.id
    let maxTries = 40
    while (maxTries-- > 0) {
      await new Promise(r => setTimeout(r, 120))
      const detailsRes = await fetch(`https://api.paiza.io/runners/get_details?id=${id}&api_key=guest`)
      const details = await detailsRes.json()
      if (details.status === 'completed') {
        if (details.result === 'timeout') {
          return { output: '', error: 'Time Limit Exceeded (10s)', type: 'runtime_error' }
        }
        if (details.build_stderr) {
          return { output: details.stdout || '', error: details.build_stderr, type: 'compile_error' }
        }
        if (details.stderr && !details.stdout) {
          return { output: '', error: details.stderr, type: 'runtime_error' }
        }
        return {
          output: details.stdout || (details.stderr ? '' : '(no output)'),
          error: details.stderr || null,
          type: details.stderr ? 'runtime_error' : 'success'
        }
      }
    }
  } catch (e) {
    console.warn(`[Fast Runner Server] Exception for ${language}, falling back:`, e.message)
  }
  return null
}

app.post('/api/run', async (req, res) => {
  const { code, language, stdin } = req.body

  if (!code || !language) {
    return res.status(400).json({ error: 'code and language required' })
  }

  try {
    console.log(`[Mana Compiler] Running: ${language}`)
    const startTime = Date.now()
    let data = null

    data = await runFastRunner(language, code, stdin)

    if (!data) {
      // ✅ Fallback to Render Docker backend
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
      data = await response.json()
    }

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
