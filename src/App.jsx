import { useState, useCallback, useRef, useEffect } from 'react'
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
  const [swap, setSwap]       = useState(false)
  const [maximizedPanel, setMaximizedPanel] = useState(null)
  const [editorWidth, setEditorWidth] = useState(900)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragStartWidth, setDragStartWidth] = useState(0)
  const containerRef = useRef(null)

  const changeLang = (id) => {
    const l = LANGUAGES.find(x => x.id === id)
    setLang(l)
    setCode(TEMPLATES[id] || '')
    setOutput(null)
  }

  const AD_WIDTH = 140
  const RESIZER_WIDTH = 10
  const MIN_EDITOR_WIDTH = 420
  const MIN_OUTPUT_WIDTH = 260

  const getTotalAvailable = () => {
    const rect = containerRef.current?.getBoundingClientRect()
    return rect ? Math.max(rect.width - AD_WIDTH - RESIZER_WIDTH, 0) : editorWidth + MIN_OUTPUT_WIDTH
  }

  const toggleMaximize = (panel) => {
    setMaximizedPanel(prev => prev === panel ? null : panel)
  }

  const handlePointerDown = (event) => {
    event.preventDefault()
    setIsDragging(true)
    setDragStartX(event.clientX)
    setDragStartWidth(editorWidth)
  }

  useEffect(() => {
    if (!isDragging) return
    const onPointerMove = (event) => {
      const total = getTotalAvailable()
      const delta = event.clientX - dragStartX
      const next = dragStartWidth + delta
      const clamped = Math.min(Math.max(next, MIN_EDITOR_WIDTH), total - MIN_OUTPUT_WIDTH)
      setEditorWidth(clamped)
    }
    const onPointerUp = () => setIsDragging(false)
    document.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerup', onPointerUp)
    return () => {
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerup', onPointerUp)
    }
  }, [isDragging, dragStartX, dragStartWidth, editorWidth])

  useEffect(() => {
    const onResize = () => {
      const total = getTotalAvailable()
      const clampMax = Math.max(total - MIN_OUTPUT_WIDTH, MIN_EDITOR_WIDTH)
      if (editorWidth > clampMax) setEditorWidth(clampMax)
    }
    window.addEventListener('resize', onResize)
    onResize()
    return () => window.removeEventListener('resize', onResize)
  }, [editorWidth])

  const editorSize  = maximizedPanel === 'editor' ? getTotalAvailable() : maximizedPanel === 'output' ? 0 : editorWidth
  const outputSize  = maximizedPanel === 'output' ? getTotalAvailable() : getTotalAvailable() - editorSize
  const showResizer = maximizedPanel === null

  const runCode = useCallback(async () => {
    if (!code.trim() || running) return
    setRunning(true)
    setOutput({ status: 'running' })
    setTab('output')
    const start = Date.now()

    try {
      // ✅ Docker backend — Unlimited, No API limits!
      const res = await fetch('https://mana-compailer-backend-docker.onrender.com/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: lang.id,
          code:     code,
          stdin:    stdin || ''
        })
      })

      const data    = await res.json()
      const elapsed = ((Date.now() - start) / 1000).toFixed(2)

      if (data.error) throw new Error(data.error)

      setOutput({ status: 'ok', text: data.output || '(no output)', elapsed, label: 'Success' })

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
        </div>
        <div style={s.navAdContainer}>
          <div className="ad-slot" style={{ width:'60%', maxWidth:600, height:48, display:'flex', alignItems:'center', justifyContent:'center' }}>
            
          </div>
        </div>
        <div style={{ width:120 }} />
      </nav>

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
          <button onClick={() => setSwap(x => !x)} style={s.btnSwap}>{swap ? '⇤ Editor Right' : 'Editor Left ⇥'}</button>
          <button onClick={runCode} disabled={running} style={{ ...s.btnRun, opacity: running ? 0.6 : 1 }}>
            {running ? '⏳ Running...' : '▶ Run Code'}
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div ref={containerRef} style={{
        ...s.main,
        display: 'grid',
        gridTemplateColumns: swap
          ? `${outputSize}px ${showResizer ? RESIZER_WIDTH : 0}px ${editorSize}px ${AD_WIDTH}px`
          : `${editorSize}px ${showResizer ? RESIZER_WIDTH : 0}px ${outputSize}px ${AD_WIDTH}px`,
        overflowX: 'auto'
      }}>
        {/* EDITOR */}
        <div style={{ ...s.editorPanel, ...(maximizedPanel === 'editor' ? s.maxPanel : maximizedPanel === 'output' ? s.minPanel : {}) }}>
          <div style={s.panelHead}>
            <span style={{ fontSize:13, fontWeight:600 }}>📝 Editor</span>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:12, color:'var(--text2)' }}>{lang.icon} {lang.label}</span>
              <button onClick={() => toggleMaximize('editor')} style={s.panelBtn}>
                {maximizedPanel === 'editor' ? '🗗' : '⛶'}
              </button>
            </div>
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

        <div style={{ ...s.resizer, width: showResizer ? s.resizer.width : 0, pointerEvents: showResizer ? 'auto' : 'none' }} onPointerDown={handlePointerDown} />

        {/* OUTPUT */}
        <div style={{ ...s.outPanel, ...(maximizedPanel === 'output' ? s.maxPanel : maximizedPanel === 'editor' ? s.minPanel : {}) }}>
          <div style={s.tabs}>
            {['output','stdin'].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ ...s.tab, ...(tab===t ? s.tabActive : {}) }}>
                {t === 'output' ? '📤 Output' : '📥 Stdin'}
              </button>
            ))}
            {output && output.status !== 'running' && (
              <span style={{
                marginLeft:'auto', fontSize:11, padding:'2px 10px', borderRadius:999, fontWeight:600,
                background: output.status==='ok' ? '#1a3a25' : '#3d1a1a',
                color:      output.status==='ok' ? 'var(--green)' : 'var(--red)'
              }}>
                {output.label}
              </span>
            )}
            <button onClick={() => toggleMaximize('output')} style={s.panelBtn}>
              {maximizedPanel === 'output' ? '🗗' : '⛶'}
            </button>
          </div>

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
        </div>

        {/* RIGHT AD COLUMN */}
        <div style={s.adColumn}>
          <div className="ad-slot" style={{ height:'100%', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:12 }}>
            
          </div>
        </div>
      </div>
    </div>
  )
}

const s = {
  root:        { display:'flex', flexDirection:'column', minHeight:'100vh', background:'var(--bg)' },
  nav:         { display:'flex', alignItems:'center', padding:'0 20px', height:88, background:'var(--bg2)', borderBottom:'1px solid var(--border)', flexShrink:0 },
  brand:       { display:'flex', alignItems:'center', gap:10 },
  brandIcon:   { fontFamily:'var(--mono)', fontSize:18, fontWeight:700, color:'var(--accent)' },
  brandName:   { fontSize:17, fontWeight:700 },
  navLink:     { color:'var(--text2)', fontSize:13, textDecoration:'none' },
  navAdContainer: { flex:1, display:'flex', alignItems:'center', justifyContent:'center' },
  toolbar:     { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 16px', background:'var(--bg2)', borderBottom:'1px solid var(--border)', flexShrink:0, flexWrap:'wrap', gap:8 },
  select:      { background:'var(--bg3)', color:'var(--text)', border:'1px solid var(--border)', borderRadius:8, padding:'6px 10px', fontSize:14, cursor:'pointer' },
  btnGhost:    { background:'transparent', color:'var(--text2)', border:'1px solid var(--border)', borderRadius:8, padding:'6px 14px', fontSize:13 },
  btnSwap:     { background:'transparent', color:'var(--text2)', border:'1px solid var(--border)', borderRadius:8, padding:'6px 10px', fontSize:13, marginLeft:4 },
  panelBtn:    { background:'transparent', color:'var(--text2)', border:'1px solid transparent', borderRadius:6, padding:'4px 8px', fontSize:13, cursor:'pointer' },
  btnRun:      { background:'#238636', color:'#fff', border:'none', borderRadius:8, padding:'7px 20px', fontSize:14, fontWeight:600 },
  main:        { display:'flex', flex:1, overflow:'hidden', minHeight:0 },
  editorPanel: { display:'flex', flexDirection:'column', width:'100%', minWidth:0 },
  panelHead:   { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 14px', background:'var(--bg2)', borderBottom:'1px solid var(--border)', flexShrink:0 },
  resizer:     { width:10, cursor:'col-resize', background:'transparent', position:'relative', zIndex:1, display:'flex', alignItems:'center', justifyContent:'center' },
  outPanel:    { display:'flex', flexDirection:'column', width:'100%', minWidth:0, borderLeft:'1px solid var(--border)' },
  adColumn:    { width:140, minWidth:120, background:'var(--bg2)', borderLeft:'1px solid var(--border)', display:'flex', flexDirection:'column', flexShrink:0 },
  maxPanel:    { flex:'1 1 100%', minWidth:0 },
  minPanel:    { flex:'0 0 0', minWidth:0, maxWidth:0, overflow:'hidden' },
  tabs:        { display:'flex', alignItems:'center', gap:4, padding:'6px 12px', background:'var(--bg2)', borderBottom:'1px solid var(--border)', flexShrink:0 },
  tab:         { background:'transparent', color:'var(--text2)', border:'1px solid transparent', borderRadius:6, padding:'4px 12px', fontSize:13, fontFamily:'var(--ui)' },
  tabActive:   { background:'var(--bg3)', color:'var(--text)', border:'1px solid var(--border)' },
  outContent:  { flex:1, overflow:'auto', padding:14 },
  ph:          { color:'var(--text3)', fontSize:13, fontStyle:'italic' },
  outText:     { fontFamily:'var(--mono)', fontSize:13, lineHeight:1.7, whiteSpace:'pre-wrap', wordBreak:'break-all' },
  stdinTa:     { flex:1, resize:'none', background:'var(--bg2)', color:'var(--text)', border:'1px solid var(--border)', borderRadius:8, padding:10, fontSize:13, lineHeight:1.6, fontFamily:'var(--mono)', outline:'none', minHeight:120 },
  footer:      { display:'flex', justifyContent:'space-between', padding:'10px 20px', background:'var(--bg2)', borderTop:'1px solid var(--border)', fontSize:12, color:'var(--text2)', flexShrink:0 },
}
