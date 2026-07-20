// api/clipboard.js — Vercel Serverless API
// Code Clipboard: Share code with a 4-digit code, valid for 24 hours

// In-memory store (Vercel functions are stateless, but this works for short-lived sharing)
// For production persistence, swap this for a KV store like Vercel KV or Redis
const store = new Map();

function generateCode() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function cleanup() {
  const now = Date.now();
  for (const [key, val] of store.entries()) {
    if (now > val.expiresAt) store.delete(key);
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  cleanup();

  // POST /api/clipboard — Save code, return 4-digit code
  if (req.method === 'POST') {
    const { code, language, languageLabel } = req.body;
    if (!code || !language) {
      return res.status(400).json({ error: 'code and language are required' });
    }
    if (code.length > 50000) {
      return res.status(400).json({ error: 'Code too large (max 50KB)' });
    }

    let pin;
    let attempts = 0;
    do {
      pin = generateCode();
      attempts++;
    } while (store.has(pin) && attempts < 100);

    store.set(pin, {
      code,
      language,
      languageLabel: languageLabel || language,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    return res.status(200).json({ pin, expiresIn: '24 hours' });
  }

  // GET /api/clipboard?pin=XXXX — Retrieve code by pin
  if (req.method === 'GET') {
    const { pin } = req.query;
    if (!pin || !/^\d{4}$/.test(pin)) {
      return res.status(400).json({ error: 'Invalid PIN format. Must be 4 digits.' });
    }

    const entry = store.get(pin);
    if (!entry) {
      return res.status(404).json({ error: 'Code not found. PIN may have expired or is incorrect.' });
    }
    if (Date.now() > entry.expiresAt) {
      store.delete(pin);
      return res.status(404).json({ error: 'This PIN has expired.' });
    }

    return res.status(200).json({
      code: entry.code,
      language: entry.language,
      languageLabel: entry.languageLabel,
      createdAt: entry.createdAt,
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
