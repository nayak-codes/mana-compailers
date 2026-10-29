// api/run.js — Vercel serverless
// High-speed multi-language runner with Render Docker backend fallback

const BACKEND_URL = 'https://mana-compailer-backend-docker.onrender.com'

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
      }),
      signal: AbortSignal.timeout(8000)
    })
    const createData = await createRes.json()
    if (!createData || !createData.id) return null

    const id = createData.id
    let maxTries = 40
    while (maxTries-- > 0) {
      await new Promise(r => setTimeout(r, 120))
      const detailsRes = await fetch(`https://api.paiza.io/runners/get_details?id=${id}&api_key=guest`, {
        signal: AbortSignal.timeout(4000)
      })
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
    console.warn(`[Fast Runner Vercel] Exception for ${language}, falling back to Docker:`, e.message)
  }
  return null
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  // 🔥 Health check — used for warmup pings to wake Render backend
  if (req.method === 'GET') {
    try {
      await fetch(`${BACKEND_URL}/`, { signal: AbortSignal.timeout(5000) })
    } catch (_) {}
    return res.status(200).json({ status: 'ok' })
  }

  try {
    const payload = { ...req.body }
    let data = null

    if (payload.language && payload.code) {
      data = await runFastRunner(payload.language, payload.code, payload.stdin)
    }

    if (!data) {
      if (payload.language === 'java' && payload.code) {
        payload.code = preprocessJavaCode(payload.code)
      }
      const r = await fetch(`${BACKEND_URL}/api/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      data = await r.json()
    }

    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
