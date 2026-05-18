import { useState, useCallback } from 'react'
import Editor from '@monaco-editor/react'
import { LANGUAGES, TEMPLATES } from './languages'

const DEFAULT = LANGUAGES[0]

export default function App() {
  const [lang, setLang]       = useState(DEFAULT)
  const [code, setCode]       = useState(TEMPLATES[DEFAULT.id])
  const [stdin, setStdin]     = useState('')
  const [output, setOutput]   = useState(null)
  const [running, setRunning] = useState(false)
  const [tab, setTab]         = useState('output')

  const changeLang = (id) => {
    const l = LANGUAGES.find(x => x.id === id)
    setLang(l)
    setCode(TEMPLATES[id] || '')
    setOutput(null)
  }

  const runCode = useCallback(async () => {
    if (!code.trim() || running) return
    setRunning(true)
    setOutput({ status: 'running' })
    setTab('output')
    const start = Date.now()

    try {
      // /api/run → proxied to localhost:3001 in dev
      //          → Vercel serverless function in production
      // Production: Render.com backend (unlimited, no API limits!)
      const BACKEND = 'https://mana-compailer-backend-docker.onrender.com'
      const res = await fetch(`${BACKEND}/api/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: lang.id,
          code:     code,
          stdin:    stdin || ''
        })
      })

      const data = await res.json()
      const elapsed = ((Date.now() - start) / 1000).toFixed(2)

      if (data.error) throw new Error(data.error)

      const out = data.output || '(no output)'
      setOutput({ status: 'ok', text: out, elapsed, label: 'Success' })

    } catch (err) {
      const elapsed = ((Date.now() - start) / 1000).toFixed(2)
      setOutput({ status: 'error', text: err.message, elapsed, label: 'Error' })
    } finally {
      setRunning(false)
    }
  }, [code, lang, stdin, running])

  return (
    <div style={s.root}>
      {/* NAV */}
      <nav style={s.nav}>
        <div style={s.brand}>
          <span style={s.brandIcon}>{'</>'}</span>
          <span style={s.brandName}>Mana Compiler</span>
          <span style={s.badge}>Beta</span>
        </div>
        <div style={{ display:'flex', gap:16, alignItems:'center' }}>
          <a href="https://github.com" target="_blank" rel="noreferrer" style={s.navLink}>GitHub</a>
          <span style={{ color:'var(--text3)', fontSize:12 }}>Free · No Login</span>
        </div>
      </nav>

      {/* TOP AD */}
      <div style={{ padding:'0 16px' }}>
        <div className="ad-slot">📢 Google Ad will appear here (AdSense)</div>
      </div>

      {/* TOOLBAR */}
      <div style={s.toolbar}>
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <select value={lang.id} onChange={e => changeLang(e.target.value)} style={s.select}>
            {LANGUAGES.map(l => (
              <option key={l.id} value={l.id}>{l.icon} {l.label}</option>
            ))}
          </select>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={() => { setCode(''); setOutput(null) }} style={s.btnGhost}>Clear</button>
          <button onClick={runCode} disabled={running} style={{ ...s.btnRun, opacity: running ? 0.6 : 1 }}>
            {running ? '⏳ Running...' : '▶ Run Code'}
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={s.main}>
        {/* EDITOR */}
        <div style={s.editorPanel}>
          <div style={s.panelHead}>
            <span style={{ fontSize:13, fontWeight:600 }}>📝 Editor</span>
            <span style={{ fontSize:12, color:'var(--text2)' }}>{lang.icon} {lang.label}</span>
          </div>
          <div style={{ flex:1, overflow:'hidden' }}>
            <Editor
              height="100%"
              language={lang.monacoLang}
              value={code}
              onChange={v => setCode(v || '')}
              theme="vs-dark"
              options={{
                fontSize: 14,
                fontFamily: "'JetBrains Mono', monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                automaticLayout: true,
                padding: { top: 12 }
              }}
            />
          </div>
        </div>

        {/* OUTPUT */}
        <div style={s.outPanel}>
          {/* Tabs */}
          <div style={s.tabs}>
            {['output','stdin'].map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ ...s.tab, ...(tab===t ? s.tabActive : {}) }}>
                {t === 'output' ? '📤 Output' : '📥 Stdin'}
              </button>
            ))}
            {output && output.status !== 'running' && (
              <span style={{
                marginLeft:'auto', fontSize:11, padding:'2px 10px',
                borderRadius:999, fontWeight:600,
                background: output.status==='ok' ? '#1a3a25' : '#3d1a1a',
                color: output.status==='ok' ? 'var(--green)' : 'var(--red)'
              }}>
                {output.label}
              </span>
            )}
          </div>

          {/* Output content */}
          {tab === 'output' && (
            <div style={s.outContent}>
              {!output && <div style={s.ph}>Click ▶ Run Code to see output...</div>}
              {output?.status === 'running' && <div style={s.ph}>⏳ Executing...</div>}
              {output?.text && (
                <>
                  <pre style={{ ...s.outText, color: output.status==='ok' ? 'var(--green)' : 'var(--red)' }}>
                    {output.text}
                  </pre>
                  {output.elapsed && (
                    <div style={{ marginTop:10, fontSize:11, color:'var(--text3)', fontFamily:'var(--mono)' }}>
                      ⏱ {output.elapsed}s · {lang.label}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {tab === 'stdin' && (
            <div style={{ flex:1, padding:14, display:'flex', flexDirection:'column' }}>
              <div style={{ fontSize:12, color:'var(--text2)', marginBottom:8 }}>
                Program input — one value per line
              </div>
              <textarea
                value={stdin}
                onChange={e => setStdin(e.target.value)}
                placeholder="Enter input here..."
                style={s.stdinTa}
              />
            </div>
          )}

          {/* SIDE AD */}
          <div style={{ padding:'0 12px 12px' }}>
            <div className="ad-slot">📢 Google Ad (AdSense)</div>
          </div>
        </div>
      </div>

      {/* BOTTOM AD */}
      <div style={{ padding:'0 16px' }}>
        <div className="ad-slot">📢 Google Ad will appear here (AdSense)</div>
      </div>

      <footer style={s.footer}>
        <span>© 2025 Mana Compiler · Built with ❤️ · Free Forever</span>
        <span style={{ color:'var(--text3)' }}>Powered by JDoodle API</span>
      </footer>
    </div>
  )
}

const s = {
  root:      { display:'flex', flexDirection:'column', minHeight:'100vh', background:'var(--bg)' },
  nav:       { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', height:52, background:'var(--bg2)', borderBottom:'1px solid var(--border)', flexShrink:0 },
  brand:     { display:'flex', alignItems:'center', gap:10 },
  brandIcon: { fontFamily:'var(--mono)', fontSize:18, fontWeight:700, color:'var(--accent)' },
  brandName: { fontSize:17, fontWeight:700 },
  badge:     { fontSize:11, padding:'2px 8px', background:'var(--bg3)', color:'var(--blue)', borderRadius:999, border:'1px solid var(--border)' },
  navLink:   { color:'var(--text2)', fontSize:13, textDecoration:'none' },
  toolbar:   { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 16px', background:'var(--bg2)', borderBottom:'1px solid var(--border)', flexShrink:0, flexWrap:'wrap', gap:8 },
  select:    { background:'var(--bg3)', color:'var(--text)', border:'1px solid var(--border)', borderRadius:8, padding:'6px 10px', fontSize:14, cursor:'pointer' },
  btnGhost:  { background:'transparent', color:'var(--text2)', border:'1px solid var(--border)', borderRadius:8, padding:'6px 14px', fontSize:13 },
  btnRun:    { background:'#238636', color:'#fff', border:'none', borderRadius:8, padding:'7px 20px', fontSize:14, fontWeight:600 },
  main:      { display:'flex', flex:1, overflow:'hidden', minHeight:0 },
  editorPanel: { display:'flex', flexDirection:'column', flex:'1 1 60%', minWidth:0, borderRight:'1px solid var(--border)' },
  panelHead: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 14px', background:'var(--bg2)', borderBottom:'1px solid var(--border)', flexShrink:0 },
  outPanel:  { display:'flex', flexDirection:'column', flex:'1 1 40%', minWidth:280, maxWidth:520 },
  tabs:      { display:'flex', alignItems:'center', gap:4, padding:'6px 12px', background:'var(--bg2)', borderBottom:'1px solid var(--border)', flexShrink:0 },
  tab:       { background:'transparent', color:'var(--text2)', border:'1px solid transparent', borderRadius:6, padding:'4px 12px', fontSize:13, fontFamily:'var(--ui)' },
  tabActive: { background:'var(--bg3)', color:'var(--text)', border:'1px solid var(--border)' },
  outContent:{ flex:1, overflow:'auto', padding:14 },
  ph:        { color:'var(--text3)', fontSize:13, fontStyle:'italic' },
  outText:   { fontFamily:'var(--mono)', fontSize:13, lineHeight:1.7, whiteSpace:'pre-wrap', wordBreak:'break-all' },
  stdinTa:   { flex:1, resize:'none', background:'var(--bg2)', color:'var(--text)', border:'1px solid var(--border)', borderRadius:8, padding:10, fontSize:13, lineHeight:1.6, fontFamily:'var(--mono)', outline:'none', minHeight:120 },
  footer:    { display:'flex', justifyContent:'space-between', padding:'10px 20px', background:'var(--bg2)', borderTop:'1px solid var(--border)', fontSize:12, color:'var(--text2)', flexShrink:0 },
}
