import { useState, useCallback, useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { LANGUAGES, TEMPLATES } from './languages'


const DEFAULT = LANGUAGES[0]


const TerminalInput = ({ onSubmit }) => {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSubmit(value)
      setValue('')
    }
  }

  return (
    <input
      ref={inputRef}
      type="text"
      className="terminal-active-input"
      value={value}
      onChange={e => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      style={{
        background: 'transparent',
        border: 'none',
        outline: 'none',
        color: '#58a6ff',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: 'inherit',
        padding: 0,
        margin: 0,
        width: '120px',
        caretColor: 'var(--text)',
      }}
    />
  )
}

const parseTerminalSession = (rawOutput, inputs, code, langId) => {
  if (!rawOutput) return []

  const promptRegex = /([^]*?[:?❯>$#](?!\/|\d)\s*)/g
  const matches = []
  let lastIndex = 0
  let match

  while ((match = promptRegex.exec(rawOutput)) !== null) {
    matches.push(match[1])
    lastIndex = promptRegex.lastIndex
  }

  const remainder = rawOutput.substring(lastIndex)
  const segments = []
  let inputIdx = 0

  for (let i = 0; i < matches.length; i++) {
    const promptText = matches[i]
    if (inputIdx < inputs.length) {
      segments.push({ type: 'output', text: promptText })
      segments.push({ type: 'input', text: inputs[inputIdx] })
      segments.push({ type: 'output', text: '\n' })
      inputIdx++
    } else {
      segments.push({ type: 'output', text: promptText })
      segments.push({ type: 'active-input' })
      return segments
    }
  }

  if (remainder) {
    segments.push({ type: 'output', text: remainder })
  }

  if (detectsInput(code, langId) && !segments.some(s => s.type === 'active-input')) {
    if (inputs.length < 10) {
      segments.push({ type: 'generic-active-input' })
    }
  }

  return segments
}

const detectsInput = (code, langId) => {
  const codeLower = code.toLowerCase();
  switch (langId) {
    case 'c':
      return /scanf|gets|fgets|getchar/i.test(code);
    case 'cpp17':
      return /cin\s*>>|getline/i.test(code);
    case 'python3':
      return /input\s*\(/i.test(code);
    case 'java':
      return /scanner|bufferedreader|system\.in/i.test(code);
    case 'nodejs':
      return /readline|process\.stdin/i.test(code);
    case 'go':
      return /scan|scanln|scanf|readstring|bufio/i.test(codeLower);
    case 'rust':
      return /stdin\s*\(\)/i.test(code);
    case 'php':
      return /readline|stdin/i.test(codeLower);
    case 'ruby':
      return /gets/i.test(code);
    default:
      return false;
  }
}

const formatTerminalOutput = (text, langId, isErrorStatus = false) => {
  if (!text) return null;

  // Clean up docker container internal paths (e.g. /tmp/mana-compiler/xxxxxx/)
  const cleanedText = text.replace(/\/tmp\/mana-compiler\/[^/]+\//g, '');

  const lines = cleanedText.split('\n');

  return lines.map((line, idx) => {
    let style = { color: isErrorStatus ? '#ff6b6b' : 'var(--green)' };
    let lineElements = [];

    const isError = /error:/i.test(line) || /exception/i.test(line) || /failed/i.test(line);
    const isWarning = /warning:/i.test(line);
    const isLineNumber = /^\s*\d+\s*\|/g.test(line); // e.g. "  20 |"

    if (isError) {
      style.color = '#ff6b6b';
      const parts = line.split(/(error:)/i);
      lineElements = parts.map((part, pIdx) => {
        if (part.toLowerCase() === 'error:') {
          return <strong key={pIdx} style={{ backgroundColor: 'rgba(255, 107, 107, 0.15)', padding: '1px 6px', borderRadius: '4px', marginRight: '6px', color: '#ff6b6b' }}>{part}</strong>;
        }
        return <span key={pIdx}>{part}</span>;
      });
    } else if (isWarning) {
      style.color = '#f1c40f';
      const parts = line.split(/(warning:)/i);
      lineElements = parts.map((part, pIdx) => {
        if (part.toLowerCase() === 'warning:') {
          return <strong key={pIdx} style={{ backgroundColor: 'rgba(241, 196, 15, 0.15)', padding: '1px 6px', borderRadius: '4px', marginRight: '6px', color: '#f1c40f' }}>{part}</strong>;
        }
        return <span key={pIdx}>{part}</span>;
      });
    } else if (isLineNumber) {
      const pipeIdx = line.indexOf('|');
      if (pipeIdx !== -1) {
        const numPart = line.substring(0, pipeIdx + 1);
        const codePart = line.substring(pipeIdx + 1);
        lineElements = [
          <span key="num" style={{ color: 'var(--text3)', marginRight: '8px' }}>{numPart}</span>,
          <span key="code" style={{ color: isErrorStatus ? '#ff6b6b' : 'var(--green)' }}>{codePart}</span>
        ];
      } else {
        lineElements = [<span>{line}</span>];
      }
    } else if (line.trim().startsWith('|') || /^\s*\|\s*[\^~]+/.test(line)) {
      style.color = '#58a6ff';
      lineElements = [<span>{line}</span>];
    } else {
      lineElements = [<span>{line}</span>];
    }

    return (
      <span key={idx} style={{ display: 'block', ...style, minHeight: '1.2em' }}>
        {lineElements}
      </span>
    );
  });
}

const BACKEND_URL = 'https://mana-compailer-backend-docker.onrender.com'


// Silent warmup — wakes Render backend before user clicks Run
function warmupBackend() {
  fetch(`${BACKEND_URL}/api/health`, { method: 'GET', signal: AbortSignal.timeout(30000) })
    .catch(() => {}) // Ignore errors silently
}

export default function App() {
  const [view, setView] = useState('home') // 'home' or 'compiler'
  const [lang, setLang] = useState(DEFAULT)
  const [code, setCode] = useState(TEMPLATES[DEFAULT.id])
  const [inputs, setInputs] = useState([])
  const [output, setOutput] = useState(null)
  const [running, setRunning] = useState(false)
  const [tab, setTab] = useState('output')
  const [swap, setSwap] = useState(false)
  const [maximizedPanel, setMaximizedPanel] = useState(null)
  const [editorWidth, setEditorWidth] = useState(55) // percentage
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragStartWidth, setDragStartWidth] = useState(0)
  const containerRef = useRef(null)
  const [highlightStdin, setHighlightStdin] = useState(false)
  const warmupDoneRef = useRef(false)

  const selectLanguage = (id) => {
    const l = LANGUAGES.find(x => x.id === id)
    setLang(l)
    setCode(TEMPLATES[id] || '')
    setOutput(null)
    setInputs([])
    setView('compiler')
    // Push history so browser back works correctly
    window.history.pushState({ view: 'compiler', lang: id }, '', window.location.href)
  }

  const changeLang = (id) => {
    const l = LANGUAGES.find(x => x.id === id)
    setLang(l)
    setCode(TEMPLATES[id] || '')
    setOutput(null)
    setInputs([])
  }

  const goHome = () => {
    setView('home')
    setOutput(null)
    setInputs([])
    // Replace history so browser back goes to previous page
    window.history.replaceState({ view: 'home' }, '', window.location.href)
  }

  // 🔥 Warmup backend on first load — eliminates cold start delay
  useEffect(() => {
    if (warmupDoneRef.current) return
    warmupDoneRef.current = true
    // Ping Render backend root to wake it from sleep (no-cors: any response = awake)
    fetch(BACKEND_URL, {
      method: 'GET',
      signal: AbortSignal.timeout(60000),
      mode: 'no-cors' // Use no-cors so CORS errors don't block us
    }).catch(() => {}) // Ignore errors silently
  }, [])

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state?.view === 'home' || !e.state) {
        setView('home')
      } else if (e.state?.view === 'compiler') {
        setView('compiler')
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const RESIZER_WIDTH = 6
  const MIN_EDITOR_PCT = 25   // minimum 25% for editor
  const MIN_OUTPUT_PCT = 20   // minimum 20% for terminal

  const getTotalAvailable = () => {
    const rect = containerRef.current?.getBoundingClientRect()
    return rect ? rect.width : window.innerWidth
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
      if (total === 0) return
      const delta = event.clientX - dragStartX
      const deltaPct = (delta / total) * 100
      const next = dragStartWidth + deltaPct
      const clamped = Math.min(Math.max(next, MIN_EDITOR_PCT), 100 - MIN_OUTPUT_PCT)
      setEditorWidth(clamped)
    }
    const onPointerUp = () => setIsDragging(false)
    document.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerup', onPointerUp)
    return () => {
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerup', onPointerUp)
    }
  }, [isDragging, dragStartX, dragStartWidth])

  useEffect(() => {
    // No-op: percentage-based layout auto-adjusts on resize
  }, [])

  const editorPct = maximizedPanel === 'editor' ? 100 : maximizedPanel === 'output' ? 0 : editorWidth
  const outputPct = maximizedPanel === 'output' ? 100 : maximizedPanel === 'editor' ? 0 : (100 - editorWidth)
  const showResizer = maximizedPanel === null

  const executeCode = useCallback(async (inputVal) => {
    const inputToSend = inputVal !== undefined ? inputVal : inputs.join('\n')
    if (!code.trim() || running) return
    setRunning(true)
    setOutput({ status: 'running' })
    const start = Date.now()

    try {
      // ✅ Docker backend — Unlimited, No API limits!
      const res = await fetch(`${BACKEND_URL}/api/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: lang.id,
          code: code,
          stdin: inputToSend || ''
        })
      })

      const data = await res.json()
      const elapsed = ((Date.now() - start) / 1000).toFixed(2)

      let isEofError = false
      if (data.error && detectsInput(code, lang.id)) {
        const eofPatterns = /(EOFError|NoSuchElementException|No line found|readline|stdin|EOF)/i
        if (eofPatterns.test(data.error)) {
          isEofError = true
        }
      }

      if (data.error && !isEofError) throw new Error(data.error)

      setOutput({
        status: 'ok',
        text: isEofError ? (data.output || '') : (data.output || '(no output)'),
        elapsed,
        label: 'Success',
        usedStdin: inputToSend
      })

    } catch (err) {
      const elapsed = ((Date.now() - start) / 1000).toFixed(2)
      setOutput({ status: 'error', text: err.message, elapsed, label: 'Error' })
    } finally {
      setRunning(false)
    }
  }, [code, lang, inputs, running])

  const runCode = useCallback(() => {
    setInputs([])
    executeCode("")
  }, [executeCode])

  const handleTerminalClick = () => {
    const inputEl = document.querySelector('.terminal-active-input')
    if (inputEl) {
      inputEl.focus()
    }
  }

  return (
    <div style={s.root}>
      {view === 'home' ? (
        <HomePage selectLanguage={selectLanguage} />
      ) : (
        <>
          {/* NAV */}
          <nav style={s.nav}>
            <div style={s.brand} onClick={goHome} role="button" tabIndex={0} aria-label="Go to homepage">
              <img src="/logo.png" alt="Our Compiler Logo" style={{ height: 44, width: 44, objectFit: 'contain', cursor: 'pointer', borderRadius: 8 }} />
              <span onClick={goHome} style={{ ...s.brandName, cursor: 'pointer' }}>Our Compiler</span>
            </div>
          </nav>

          {/* TOOLBAR */}
          <div style={s.toolbar}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <select value={lang.id} onChange={e => changeLang(e.target.value)} style={s.select}>
                {LANGUAGES.map(l => (
                  <option key={l.id} value={l.id}>{l.icon} {l.label}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button onClick={goHome} style={s.btnHome}>🏠 Home</button>
              <button onClick={() => { setCode(''); setOutput(null) }} style={s.btnGhost}>Clear</button>
              <button onClick={() => setSwap(x => !x)} style={s.btnSwap}>{swap ? '⇤ Editor Right' : 'Editor Left ⇥'}</button>
              <button onClick={runCode} disabled={running} style={{ ...s.btnRun, opacity: running ? 0.6 : 1, cursor: running ? 'not-allowed' : 'pointer' }}>
                {running ? '⏳ Running...' : '▶ Run Code'}
              </button>
            </div>
          </div>

          {/* MAIN */}
          <div ref={containerRef} style={{
            ...s.main,
            display: 'flex',
            flexDirection: swap ? 'row-reverse' : 'row',
            overflow: 'hidden'
          }}>
            {/* EDITOR */}
            <div style={{
              ...s.editorPanel,
              flex: maximizedPanel === 'editor' ? '1 1 100%' : maximizedPanel === 'output' ? '0 0 0' : `0 0 ${editorPct}%`,
              maxWidth: maximizedPanel === 'editor' ? '100%' : maximizedPanel === 'output' ? '0' : `${editorPct}%`,
              overflow: maximizedPanel === 'output' ? 'hidden' : 'hidden'
            }}>
              <div style={s.panelHead}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>📝 Editor</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 12, color: 'var(--text2)' }}>{lang.icon} {lang.label}</span>
                  <button onClick={() => toggleMaximize('editor')} style={s.panelBtn}>
                    {maximizedPanel === 'editor' ? '🗗' : '⛶'}
                  </button>
                </div>
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <Editor
                  height="100%"
                  language={lang.monacoLang}
                  value={code}
                  onChange={v => setCode(v || '')}
                  theme="vs-dark"
                  onMount={(editor, monaco) => {
                    document.fonts.ready.then(() => {
                      monaco.editor.remeasureFonts();
                    });
                  }}
                  options={{
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', monospace",
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    wordWrap: 'off',
                    automaticLayout: true,
                    padding: { top: 12 },
                    scrollbar: { horizontalScrollbarSize: 6 }
                  }}
                />
              </div>
            </div>

            {/* RESIZER */}
            {showResizer && (
              <div
                style={{ ...s.resizer, width: RESIZER_WIDTH, cursor: 'col-resize', flexShrink: 0 }}
                onPointerDown={handlePointerDown}
              />
            )}

            {/* UNIFIED TERMINAL PANEL */}
            <div
              onClick={handleTerminalClick}
              style={{
                ...s.outPanel,
                flex: maximizedPanel === 'output' ? '1 1 100%' : maximizedPanel === 'editor' ? '0 0 0' : `0 0 ${outputPct}%`,
                maxWidth: maximizedPanel === 'output' ? '100%' : maximizedPanel === 'editor' ? '0' : `${outputPct}%`,
                overflow: maximizedPanel === 'editor' ? 'hidden' : undefined,
                cursor: 'text',
              }}
            >
              {/* TERMINAL HEADER */}
              <div style={s.tabs}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  🖥️ Terminal
                </span>
                {output && output.status !== 'running' && (
                  <span style={{
                    marginLeft: 'auto', marginRight: 10, fontSize: 11, padding: '2px 10px', borderRadius: 999, fontWeight: 600,
                    background: output.status === 'ok' ? '#1a3a25' : '#3d1a1a',
                    color: output.status === 'ok' ? 'var(--green)' : 'var(--red)'
                  }}>
                    {output.label}
                  </span>
                )}
                <button onClick={() => toggleMaximize('output')} style={{ ...s.panelBtn, marginLeft: !output || output.status === 'running' ? 'auto' : 0 }}>
                  {maximizedPanel === 'output' ? '🗗' : '⛶'}
                </button>
              </div>

              {/* TERMINAL BODY */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: 'var(--bg2)' }}>
                {/* Output content area */}
                <div style={s.outContent}>
                  {!output && <div style={s.ph}>Click ▶ Run Code to see output...</div>}
                  {output?.status === 'running' && <div style={s.ph}>⏳ Executing...</div>}
                  {output?.text && (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div style={{
                        ...s.outText,
                        color: 'var(--green)',
                        whiteSpace: 'pre-wrap',
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                        fontSize: 14,
                        lineHeight: 1.6
                      }}>
                        {(() => {
                          if (output.status !== 'ok') {
                            return <div>{formatTerminalOutput(output.text, lang.id, true)}</div>
                          }
                          const tv = parseTerminalSession(output.text, inputs, code, lang.id)
                          return tv.map((seg, idx) => {
                            if (seg.type === 'output') {
                              return <div key={idx} style={{ display: 'inline' }}>{formatTerminalOutput(seg.text, lang.id)}</div>
                            }
                            if (seg.type === 'input') {
                              return <span key={idx} style={{ color: '#58a6ff', fontWeight: 600 }}>{seg.text}</span>
                            }
                            if (seg.type === 'active-input') {
                              return (
                                <TerminalInput
                                  key={idx}
                                  onSubmit={(val) => {
                                    const nextInputs = [...inputs, val]
                                    setInputs(nextInputs)
                                    executeCode(nextInputs.join('\n'))
                                  }}
                                />
                              )
                            }
                            if (seg.type === 'generic-active-input') {
                              return (
                                <div key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                  <span style={{ color: 'var(--green)', fontWeight: 700 }}>❯</span>
                                  <TerminalInput
                                    onSubmit={(val) => {
                                      const nextInputs = [...inputs, val]
                                      setInputs(nextInputs)
                                      executeCode(nextInputs.join('\n'))
                                    }}
                                  />
                                </div>
                              )
                            }
                            return null
                          })
                        })()}
                      </div>
                      {output.elapsed && (
                        <div style={{ marginTop: 16, fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                          ⏱ {output.elapsed}s · {lang.label}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
          <footer style={s.footer}>
            <div>Our Compiler • <a href="/about.html" style={{ color: 'var(--text2)' }}>About</a> • <a href="/features.html" style={{ color: 'var(--text2)' }}>Features</a> • <a href="/contact.html" style={{ color: 'var(--text2)' }}>Contact</a> • <a href="/privacy-policy.html" style={{ color: 'var(--text2)' }}>Privacy Policy</a></div>
            <div>Free online code compiler with fast execution and support for multiple languages.</div>
          </footer>
        </>
      )}
    </div>
  )
}

const s = {
  root: { display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)' },
  nav: { display: 'flex', alignItems: 'center', padding: '0 20px', height: 88, background: 'var(--bg2)', borderBottom: '1px solid var(--border)', flexShrink: 0 },
  brand: { display: 'flex', alignItems: 'center', gap: 10 },
  brandIcon: { fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 700, color: 'var(--accent)' },
  brandName: { fontSize: 17, fontWeight: 700, cursor: 'pointer' },
  navLinks: { display: 'flex', alignItems: 'center', gap: 16 },
  navLink: { color: 'var(--text2)', fontSize: 13, textDecoration: 'none' },
  toolbar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)', flexShrink: 0, flexWrap: 'wrap', gap: 8 },
  select: { background: 'var(--bg3)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', fontSize: 14, cursor: 'pointer' },
  btnGhost: { background: 'transparent', color: 'var(--text2)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 14px', fontSize: 13 },
  btnHome: { background: 'transparent', color: 'var(--text2)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 14px', fontSize: 13, cursor: 'pointer' },
  btnSwap: { background: 'transparent', color: 'var(--text2)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', fontSize: 13, marginLeft: 4 },
  panelBtn: { background: 'transparent', color: 'var(--text2)', border: '1px solid transparent', borderRadius: 6, padding: '4px 8px', fontSize: 13, cursor: 'pointer' },
  btnRun: { background: '#238636', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 20px', fontSize: 14, fontWeight: 600 },
  main: { display: 'flex', height: 'calc(100vh - 190px)', minHeight: '520px', flexShrink: 0 },
  editorPanel: { display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0 },
  panelHead: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)', flexShrink: 0 },
  resizer: { width: 10, cursor: 'col-resize', background: 'transparent', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  outPanel: { display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0, borderLeft: '1px solid var(--border)' },
  adColumn: { width: 140, minWidth: 120, background: 'var(--bg2)', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', flexShrink: 0 },
  maxPanel: { flex: '1 1 100%', minWidth: 0 },
  minPanel: { flex: '0 0 0', minWidth: 0, maxWidth: 0, overflow: 'hidden' },
  tabs: { display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)', flexShrink: 0 },
  tab: { background: 'transparent', color: 'var(--text2)', border: '1px solid transparent', borderRadius: 6, padding: '4px 12px', fontSize: 13, fontFamily: 'var(--ui)' },
  tabActive: { background: 'var(--bg3)', color: 'var(--text)', border: '1px solid var(--border)' },
  outContent: { flex: 1, overflow: 'auto', padding: 14 },
  ph: { color: 'var(--text3)', fontSize: 13, fontStyle: 'italic' },
  outText: { fontFamily: 'var(--mono)', fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-all' },
  stdinTa: { flex: 1, resize: 'none', background: 'var(--bg2)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 8, padding: 10, fontSize: 13, lineHeight: 1.6, fontFamily: 'var(--mono)', outline: 'none', minHeight: 120 },
  footer: { display: 'flex', justifyContent: 'space-between', padding: '10px 20px', background: 'var(--bg2)', borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--text2)', flexShrink: 0 },
}

function HomePage({ selectLanguage }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* HERO HEADER */}
      <header style={{
        background: 'var(--bg2)',
        borderBottom: '1px solid var(--border)',
        textAlign: 'center',
        padding: '40px 20px',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Logo + Title */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            marginBottom: 12
          }}>
            <img
              src="/logo.png"
              alt="Our Compiler Logo"
              style={{
                height: 80,
                width: 80,
                objectFit: 'contain',
                borderRadius: 16,
                filter: 'drop-shadow(0 4px 16px rgba(88,166,255,0.3))'
              }}
            />
            <div style={{
              fontSize: 48,
              fontWeight: 700,
              color: 'var(--text)'
            }}>
              Our Compiler
            </div>
          </div>

          {/* Tagline */}
          <p style={{
            fontSize: 16,
            color: 'var(--text2)',
            margin: '8px 0 0 0',
            fontWeight: 400
          }}>
            Write • Compile • Execute — Instantly
          </p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: '60px 20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* CHOOSE LANGUAGE SECTION */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{
              fontSize: 32,
              fontWeight: 700,
              marginBottom: 12,
              color: 'var(--text)'
            }}>
              Choose Your Language
            </h2>
            <p style={{
              color: 'var(--text2)',
              fontSize: 15,
              margin: 0,
              maxWidth: '600px'
            }}>
              Select any language below to start coding instantly. No setup required — just click and start.
            </p>
          </div>

          {/* LANGUAGE GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 20,
            marginBottom: 20
          }}>
            {LANGUAGES.map(lang => (
              <button
                key={lang.id}
                onClick={() => selectLanguage(lang.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16,
                  padding: 28,
                  background: 'var(--bg2)',
                  border: '1px solid var(--border)',
                  borderRadius: 16,
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontSize: 15,
                  color: 'var(--text)',
                  fontWeight: 600,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bg3)'
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(88, 166, 255, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--bg2)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)'
                }}
              >
                <span style={{ fontSize: 40, lineHeight: 1 }}>{lang.icon}</span>
                <span style={{ fontWeight: 600, letterSpacing: '0.2px' }}>{lang.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ marginBottom: 40, textAlign: 'center' }}>
            <h2 style={{
              fontSize: 32,
              fontWeight: 700,
              marginBottom: 12,
              color: 'var(--text)'
            }}>
              Why Choose Our Compiler?
            </h2>
            <p style={{
              color: 'var(--text2)',
              fontSize: 15,
              margin: 0
            }}>
              Everything you need for professional code compilation
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 28
          }}>
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Execute code in milliseconds using isolated Docker containers for secure, sandboxed execution.' },
              { icon: '📝', title: 'Professional Editor', desc: 'Monaco editor with syntax highlighting, auto-complete, intelligent code folding, and keyboard shortcuts.' },
              { icon: '🔒', title: 'Privacy First', desc: 'Your code is never stored on our servers. Complete isolation and zero tracking whatsoever.' },
              { icon: '🌍', title: '9+ Languages', desc: 'Python, Java, C, C++, JavaScript, Go, Rust, PHP, Ruby, and more coming soon.' },
              { icon: '📱', title: 'Fully Responsive', desc: 'Works seamlessly on desktop, tablet, and mobile devices with optimized interface.' },
              { icon: '✨', title: 'No Setup Required', desc: 'Start coding instantly in your browser. Zero installation, zero configuration needed.' }
            ].map((feature, idx) => (
              <div key={idx} style={{
                padding: 32,
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(88, 166, 255, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{feature.icon}</div>
                <h3 style={{
                  marginTop: 0,
                  marginBottom: 12,
                  color: 'var(--text)',
                  fontSize: 18,
                  fontWeight: 700
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: 14,
                  color: 'var(--text2)',
                  margin: 0,
                  lineHeight: 1.6
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(88, 166, 255, 0.1) 0%, rgba(88, 166, 255, 0.05) 100%)',
          border: '1px solid var(--accent)',
          borderRadius: 20,
          padding: '60px 40px',
          textAlign: 'center',
          marginBottom: 40
        }}>
          <h3 style={{
            fontSize: 28,
            fontWeight: 700,
            marginTop: 0,
            marginBottom: 12,
            color: 'var(--text)'
          }}>
            Ready to Start Coding?
          </h3>
          <p style={{
            fontSize: 16,
            color: 'var(--text2)',
            margin: '0 0 28px 0',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Choose a programming language below and start writing, compiling, and executing code instantly.
          </p>
          <button
            onClick={() => selectLanguage('python3')}
            style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, #58a6ff 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '14px 40px',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 16px rgba(88, 166, 255, 0.3)',
              letterSpacing: '0.3px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(88, 166, 255, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(88, 166, 255, 0.3)'
            }}
          >
            Try Python Now →
          </button>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{
        padding: '32px 20px',
        background: 'var(--bg2)',
        borderTop: '1px solid var(--border)',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          marginBottom: 16
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <a href="/about.html" style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--text2)'}>About</a>
            <a href="/features.html" style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--text2)'}>Features</a>
            <a href="/blog.html" style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--text2)'}>Blog</a>
            <a href="/contact.html" style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--text2)'}>Contact</a>
            <a href="/privacy-policy.html" style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--text2)'}>Privacy</a>
          </div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text3)' }}>
          Our Compiler — Free Online Code Compiler. © 2024 • Built with ❤️
        </div>
      </footer>
    </div>
  )
}

