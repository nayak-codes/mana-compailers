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

  const promptRegex = /([^]*?[:?â¯>$#](?!\/|\d)\s*)/g
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


// Silent warmup â€” wakes Render backend before user clicks Run
function warmupBackend() {
  fetch(`${BACKEND_URL}/api/health`, { method: 'GET', signal: AbortSignal.timeout(30000) })
    .catch(() => {}) // Ignore errors silently
}

export default function App() {
  const queryParams = new URLSearchParams(window.location.search)
  const urlLangId = queryParams.get('lang')
  const initialLang = urlLangId ? (LANGUAGES.find(x => x.id === urlLangId) || DEFAULT) : DEFAULT
  const initialView = urlLangId && LANGUAGES.some(x => x.id === urlLangId) ? 'compiler' : 'home'
  const initialCode = localStorage.getItem(`code_${initialLang.id}`) !== null 
    ? localStorage.getItem(`code_${initialLang.id}`) 
    : (TEMPLATES[initialLang.id] || '')

  const [view, setView] = useState(initialView)
  const [lang, setLang] = useState(initialLang)
  const [code, setCode] = useState(initialCode)
  const [tutorialHtml, setTutorialHtml] = useState('')

  useEffect(() => {
    let langFile = lang.id
    if (lang.id === 'python3') langFile = 'python'
    if (lang.id === 'nodejs') langFile = 'javascript'
    if (lang.id === 'cpp17') langFile = 'cpp'
    
    setTutorialHtml('')
    fetch(`/blog-${langFile}.html`)
      .then(res => res.text())
      .then(html => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        const main = doc.querySelector('main')
        if (main) {
          const backLink = main.querySelector('.back-link') || main.querySelector('a[href="/blog.html"]')
          if (backLink) backLink.remove()
          const footer = main.querySelector('.footer')
          if (footer) footer.remove()
          setTutorialHtml(main.innerHTML)
        } else {
          setTutorialHtml(doc.body.innerHTML)
        }
      })
      .catch(() => {
        setTutorialHtml('<p>Tutorial guide currently unavailable for this language. You can still compile and run your code above.</p>')
      })
  }, [lang])

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
    const savedCode = localStorage.getItem(`code_${id}`)
    setCode(savedCode !== null ? savedCode : (TEMPLATES[id] || ''))
    setOutput(null)
    setInputs([])
    setView('compiler')
    // Push history so browser back works correctly
    const newUrl = `${window.location.pathname}?lang=${id}`
    window.history.pushState({ view: 'compiler', lang: id }, '', newUrl)
  }

  const changeLang = (id) => {
    const l = LANGUAGES.find(x => x.id === id)
    setLang(l)
    const savedCode = localStorage.getItem(`code_${id}`)
    setCode(savedCode !== null ? savedCode : (TEMPLATES[id] || ''))
    setOutput(null)
    setInputs([])
    // Update URL query parameter
    const newUrl = `${window.location.pathname}?lang=${id}`
    window.history.pushState({ view: 'compiler', lang: id }, '', newUrl)
  }

  const goHome = () => {
    setView('home')
    setOutput(null)
    setInputs([])
    // Clear URL query parameter
    window.history.replaceState({ view: 'home' }, '', window.location.pathname)
  }

  // ðŸ”¥ Warmup backend on first load â€” eliminates cold start delay
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
      const queryParams = new URLSearchParams(window.location.search)
      const urlLangId = queryParams.get('lang')
      if (e.state?.view === 'home' || (!e.state && !urlLangId)) {
        setView('home')
      } else {
        const langId = e.state?.lang || urlLangId
        if (langId) {
          const l = LANGUAGES.find(x => x.id === langId)
          if (l) {
            setLang(l)
            const savedCode = localStorage.getItem(`code_${l.id}`)
            setCode(savedCode !== null ? savedCode : (TEMPLATES[l.id] || ''))
          }
          setView('compiler')
        } else {
          setView('home')
        }
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
      // âœ… Docker backend â€” Unlimited, No API limits!
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
              <button onClick={goHome} style={s.btnHome}>ðŸ  Home</button>
              <button onClick={() => { setCode(''); setOutput(null) }} style={s.btnGhost}>Clear</button>
              <button onClick={() => setSwap(x => !x)} style={s.btnSwap}>{swap ? 'â‡¤ Editor Right' : 'Editor Left â‡¥'}</button>
              <button onClick={runCode} disabled={running} style={{ ...s.btnRun, opacity: running ? 0.6 : 1, cursor: running ? 'not-allowed' : 'pointer' }}>
                {running ? 'â³ Running...' : 'â–¶ Run Code'}
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
                <span style={{ fontSize: 13, fontWeight: 600 }}>ðŸ“ Editor</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 12, color: 'var(--text2)' }}>{lang.icon} {lang.label}</span>
                  <button onClick={() => toggleMaximize('editor')} style={s.panelBtn}>
                    {maximizedPanel === 'editor' ? 'ðŸ——' : 'â›¶'}
                  </button>
                </div>
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <Editor
                  height="100%"
                  language={lang.monacoLang}
                  value={code}
                  onChange={v => {
                    const newCode = v || ''
                    setCode(newCode)
                    localStorage.setItem(`code_${lang.id}`, newCode)
                  }}
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
                  ðŸ–¥ï¸ Terminal
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
                  {maximizedPanel === 'output' ? 'ðŸ——' : 'â›¶'}
                </button>
              </div>

              {/* TERMINAL BODY */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: 'var(--bg2)' }}>
                {/* Output content area */}
                <div style={s.outContent}>
                  {!output && <div style={s.ph}>Click â–¶ Run Code to see output...</div>}
                  {output?.status === 'running' && <div style={s.ph}>â³ Executing...</div>}
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
                                  <span style={{ color: 'var(--green)', fontWeight: 700 }}>â¯</span>
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
                          â± {output.elapsed}s Â· {lang.label}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* TUTORIAL CONTENT PANEL */}
          <div className="tutorial-section">
            <div className="tutorial-header">
              <h2>ðŸ“š {lang.label} Tutorial & Reference Guide</h2>
              <p>Read the guide below to learn the syntax and features of {lang.label}, and practice by running code in the editor above.</p>
            </div>
            {tutorialHtml ? (
              <div 
                className="tutorial-body"
                dangerouslySetInnerHTML={{ __html: tutorialHtml }} 
              />
            ) : (
              <div className="tutorial-loading">Loading tutorial...</div>
            )}
          </div>

          <footer style={s.footer}>
            <div>Our Compiler â€¢ <a href="/about.html" style={{ color: 'var(--text2)' }}>About</a> â€¢ <a href="/features.html" style={{ color: 'var(--text2)' }}>Features</a> â€¢ <a href="/contact.html" style={{ color: 'var(--text2)' }}>Contact</a> â€¢ <a href="/privacy-policy.html" style={{ color: 'var(--text2)' }}>Privacy Policy</a></div>
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

// â”€â”€â”€ Per-language brand colors for the home page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const LANG_META = {
  python3: { color: '#3fb950', bg: 'rgba(63,185,80,0.08)',   desc: 'Beginner-friendly Â· great for AI, data & scripting' },
  java:    { color: '#f0a500', bg: 'rgba(240,165,0,0.08)',   desc: 'Industry-standard OOP for enterprise applications' },
  c:       { color: '#58a6ff', bg: 'rgba(88,166,255,0.08)',  desc: 'Low-level power â€” pointers, memory & systems' },
  cpp17:   { color: '#e3b341', bg: 'rgba(227,179,65,0.08)',  desc: 'C with superpowers â€” STL, templates & C++17' },
  nodejs:  { color: '#f1e05a', bg: 'rgba(241,224,90,0.08)',  desc: 'Modern ES6+ JavaScript & Node.js runtime' },
  go:      { color: '#00add8', bg: 'rgba(0,173,216,0.08)',   desc: 'Fast, compiled & built for concurrency & cloud' },
  rust:    { color: '#f74c00', bg: 'rgba(247,76,0,0.08)',    desc: 'Memory-safe systems with zero-cost abstractions' },
  php:     { color: '#8892bf', bg: 'rgba(136,146,191,0.08)', desc: 'The backbone of the web â€” server-side scripting' },
  ruby:    { color: '#cc342d', bg: 'rgba(204,52,45,0.08)',   desc: 'Elegant OOP â€” the language Rails developers love' },
}

// â”€â”€â”€ HomePage Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function HomePage({ selectLanguage }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)', overflowX: 'hidden' }}>

      {/* â•â• HERO â•â• */}
      <header style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        {/* glow blobs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: -140, left: '-10%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(88,166,255,0.10) 0%,transparent 70%)', filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', top: 0, right: '-8%',   width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(63,185,80,0.09) 0%,transparent 70%)',  filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', bottom: -80, left: '40%',width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(247,76,0,0.06) 0%,transparent 70%)',   filter: 'blur(80px)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '80px 28px 72px', textAlign: 'center' }}>

          {/* badge */}
          <div style={{ marginBottom: 28 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(88,166,255,0.09)', border: '1px solid rgba(88,166,255,0.25)', borderRadius: 999, padding: '7px 22px', fontSize: 11.5, fontWeight: 700, color: '#58a6ff', letterSpacing: 1, textTransform: 'uppercase' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#3fb950', boxShadow: '0 0 8px #3fb950', display: 'inline-block', flexShrink: 0 }} />
              Free Â· No Login Â· No Setup Required
            </span>
          </div>

          {/* logo */}
          <div style={{ marginBottom: 22 }}>
            <img src="/logo.png" alt="Our Compiler" style={{ height: 100, width: 100, objectFit: 'contain', borderRadius: 24, filter: 'drop-shadow(0 10px 30px rgba(88,166,255,0.40))' }} />
          </div>

          {/* headline */}
          <h1 style={{ margin: '0 0 10px', fontSize: 'clamp(40px,7vw,74px)', fontWeight: 900, lineHeight: 1.06, letterSpacing: '-2.5px', color: 'var(--text)' }}>
            Our Compiler
          </h1>
          <div style={{ fontSize: 'clamp(18px,3.2vw,30px)', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 22, background: 'linear-gradient(90deg,#58a6ff 0%,#3fb950 48%,#f0a500 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Write Â· Compile Â· Execute â€” Instantly
          </div>
          <p style={{ margin: '0 auto 44px', fontSize: 17, color: 'var(--text2)', maxWidth: 520, lineHeight: 1.8 }}>
            Code in <strong style={{ color: 'var(--text)' }}>9+ programming languages</strong> right in your browser.
            Zero downloads Â· Zero accounts Â· Just code.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
            <button
              onClick={() => selectLanguage('python3')}
              style={{ background: 'linear-gradient(135deg,#58a6ff,#1f6feb)', color: '#fff', border: 'none', borderRadius: 12, padding: '15px 40px', fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 24px rgba(88,166,255,0.40)', transition: 'all .22s', letterSpacing: 0.2 }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(88,166,255,0.55)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(88,166,255,0.40)' }}
            >â–¶ Start Coding Now</button>
            <a
              href="/blog.html"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 12, padding: '15px 30px', fontSize: 16, fontWeight: 600, textDecoration: 'none', transition: 'all .22s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#58a6ff'; e.currentTarget.style.background = 'rgba(88,166,255,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent' }}
            >ðŸ“š View Tutorials</a>
          </div>

          {/* stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
            {[
              { num: '9+',   lbl: 'Languages' },
              { num: '100%', lbl: 'Free Forever' },
              { num: '<2s',  lbl: 'Avg. Runtime' },
              { num: '0',    lbl: 'Setup Needed' },
            ].map(stat => (
              <div key={stat.lbl} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--text)', lineHeight: 1, letterSpacing: '-0.5px' }}>{stat.num}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 6, textTransform: 'uppercase', letterSpacing: 1.4, fontWeight: 600 }}>{stat.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* â•â• MAIN â•â• */}
      <main style={{ flex: 1, maxWidth: 1200, margin: '0 auto', width: '100%', padding: '72px 24px 80px' }}>

        {/* â”€â”€ LANGUAGE PICKER â”€â”€ */}
        <section style={{ marginBottom: 96 }}>
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: 2.5, color: '#58a6ff', textTransform: 'uppercase', margin: '0 0 10px' }}>â€” Choose Your Language</p>
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 900, color: 'var(--text)', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
              Select a Language &amp; Start Coding
            </h2>
            <p style={{ color: 'var(--text2)', fontSize: 15, margin: 0, maxWidth: 480, lineHeight: 1.75 }}>
              Click any card to instantly open the editor. Ready-to-run examples included.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 12 }}>
            {LANGUAGES.map(lang => {
              const meta = LANG_META[lang.id] || { color: '#58a6ff', bg: 'rgba(88,166,255,0.08)', desc: '' }
              return (
                <button
                  key={lang.id}
                  onClick={() => selectLanguage(lang.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '16px 20px',
                    background: 'var(--bg2)',
                    border: '1px solid var(--border)',
                    borderLeft: `4px solid ${meta.color}`,
                    borderRadius: 14,
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                    width: '100%', fontFamily: 'inherit',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = meta.bg
                    e.currentTarget.style.borderColor = meta.color
                    e.currentTarget.style.borderLeftColor = meta.color
                    e.currentTarget.style.transform = 'translateX(5px)'
                    e.currentTarget.style.boxShadow = `0 6px 22px ${meta.color}28`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--bg2)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.borderLeftColor = meta.color
                    e.currentTarget.style.transform = 'translateX(0)'
                    e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.15)'
                  }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 12, flexShrink: 0, background: meta.bg, border: `1px solid ${meta.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>
                    {lang.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 3, letterSpacing: '-0.2px' }}>{lang.label}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{meta.desc}</div>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 800, color: meta.color, flexShrink: 0, opacity: 0.9 }}>Open â†’</span>
                </button>
              )
            })}
          </div>
        </section>

        {/* â”€â”€ TUTORIALS GRID â”€â”€ */}
        <section style={{ marginBottom: 96 }}>
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: 2.5, color: '#3fb950', textTransform: 'uppercase', margin: '0 0 10px' }}>â€” Learn Programming</p>
            <h2 style={{ fontSize: 'clamp(24px,4vw,38px)', fontWeight: 900, color: 'var(--text)', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
              Free Step-by-Step Tutorials
            </h2>
            <p style={{ color: 'var(--text2)', fontSize: 15, margin: 0, maxWidth: 540, lineHeight: 1.75 }}>
              Each guide follows a W3Schools-style layout â€” sidebar navigation, deep explanations, and runnable code examples.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {[
              { path: '/blog-python.html',     icon: 'ðŸ', title: 'Python 3',      color: '#3fb950', desc: 'Variables to OOP â€” the most beginner-friendly Python guide.' },
              { path: '/blog-java.html',       icon: 'â˜•', title: 'Java',          color: '#f0a500', desc: 'Classes, inheritance, exceptions â€” master Java step by step.' },
              { path: '/blog-c.html',          icon: 'ðŸ”µ', title: 'C Programming', color: '#58a6ff', desc: 'Pointers, memory & structs â€” the foundation of systems programming.' },
              { path: '/blog-cpp.html',        icon: 'âš¡', title: 'C++',           color: '#e3b341', desc: 'STL, templates and modern C++17 features explained clearly.' },
              { path: '/blog-javascript.html', icon: 'ðŸŸ¡', title: 'JavaScript',    color: '#f1e05a', desc: 'Promises, async/await and ES6+ for Node.js backend dev.' },
              { path: '/blog-go.html',         icon: 'ðŸ¹', title: 'Go',            color: '#00add8', desc: 'Goroutines, channels & idiomatic Go for concurrency.' },
              { path: '/blog-rust.html',       icon: 'ðŸ¦€', title: 'Rust',          color: '#f74c00', desc: 'Ownership, borrowing & memory safety without a GC.' },
              { path: '/blog-php.html',        icon: 'ðŸ˜', title: 'PHP',           color: '#8892bf', desc: 'Server-side scripting, arrays, OOP & web dev in PHP.' },
              { path: '/blog-ruby.html',       icon: 'ðŸ’Ž', title: 'Ruby',          color: '#cc342d', desc: 'Elegant blocks, iterators & OOP the Ruby way.' },
            ].map(guide => (
              <a
                key={guide.path}
                href={guide.path}
                style={{ display: 'block', textDecoration: 'none', color: 'inherit', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: '26px 22px', transition: 'all 0.25s ease', boxShadow: '0 2px 8px rgba(0,0,0,0.18)', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = guide.color; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 16px 32px ${guide.color}22` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.18)' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${guide.color},transparent)`, borderRadius: '16px 16px 0 0' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>{guide.icon}</span>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>{guide.title}</h3>
                </div>
                <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.65 }}>{guide.desc}</p>
                <div style={{ marginTop: 16, fontSize: 12, color: guide.color, fontWeight: 700 }}>View Tutorial â†’</div>
              </a>
            ))}
          </div>
        </section>

        {/* â”€â”€ FEATURES â”€â”€ */}
        <section style={{ marginBottom: 96 }}>
          <div style={{ marginBottom: 40, textAlign: 'center' }}>
            <p style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: 2.5, color: '#f0a500', textTransform: 'uppercase', margin: '0 0 10px' }}>â€” Why Us</p>
            <h2 style={{ fontSize: 'clamp(24px,4vw,38px)', fontWeight: 900, color: 'var(--text)', margin: '0 0 12px', letterSpacing: '-0.5px' }}>Why Choose Our Compiler?</h2>
            <p style={{ color: 'var(--text2)', fontSize: 15, margin: '0 auto', maxWidth: 480, lineHeight: 1.75 }}>Built for developers who want speed, simplicity, and professionalism in a browser-based tool.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
            {[
              { icon: 'âš¡', title: 'Lightning Fast Execution', desc: 'Docker-isolated containers execute your code in under 2 seconds â€” no cold starts.',           color: '#f1e05a' },
              { icon: 'ðŸ“', title: 'Monaco Code Editor',       desc: 'The same engine powering VS Code â€” syntax highlighting, auto-complete & smart indentation.', color: '#58a6ff' },
              { icon: 'ðŸ”’', title: 'Privacy First',            desc: 'Your code is never stored. Complete sandbox isolation and zero tracking â€” guaranteed.',       color: '#3fb950' },
              { icon: 'ðŸŒ', title: '9 Languages Supported',    desc: 'Python, Java, C, C++, JavaScript, Go, Rust, PHP, Ruby â€” one platform for every stack.',      color: '#f74c00' },
              { icon: 'ðŸ“±', title: 'Works on Any Device',      desc: 'Fully responsive â€” works on desktop, tablet, and mobile with an adaptive layout.',           color: '#d2a8ff' },
              { icon: 'âœ¨', title: 'Zero Setup Required',       desc: 'Open your browser, choose a language, and start. No install, no frustration.',               color: '#f0a500' },
            ].map((f, i) => (
              <div key={i}
                style={{ padding: '26px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, transition: 'all 0.25s ease', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = f.color; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 28px ${f.color}20` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${f.color}18`, border: `1px solid ${f.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 18 }}>{f.icon}</div>
                <h3 style={{ margin: '0 0 10px', fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>{f.title}</h3>
                <p style={{ margin: 0, fontSize: 14, color: 'var(--text2)', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* â”€â”€ CTA BANNER â”€â”€ */}
        <section style={{ background: 'linear-gradient(135deg,rgba(88,166,255,0.08) 0%,rgba(63,185,80,0.06) 50%,rgba(248,129,80,0.06) 100%)', border: '1px solid rgba(88,166,255,0.22)', borderRadius: 24, padding: '64px 40px', textAlign: 'center' }}>
          <h3 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 900, margin: '0 0 14px', color: 'var(--text)', letterSpacing: '-0.5px' }}>Ready to Write Your First Program?</h3>
          <p style={{ fontSize: 16, color: 'var(--text2)', margin: '0 auto 32px', maxWidth: 460, lineHeight: 1.75 }}>Join thousands of developers and students who code faster with Our Compiler every day.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => selectLanguage('python3')}
              style={{ background: 'linear-gradient(135deg,#58a6ff,#1f6feb)', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 36px', fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(88,166,255,0.35)', transition: 'all .22s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(88,166,255,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(88,166,255,0.35)' }}
            >ðŸ Try Python Now</button>
            <button
              onClick={() => selectLanguage('java')}
              style={{ background: 'linear-gradient(135deg,#f0a500,#e8890c)', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 36px', fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(240,165,0,0.30)', transition: 'all .22s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
            >â˜• Try Java Now</button>
          </div>
        </section>

      </main>

      {/* â•â• FOOTER â•â• */}
      <footer style={{ padding: '36px 24px 28px', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src="/logo.png" alt="logo" style={{ height: 32, width: 32, objectFit: 'contain', borderRadius: 8 }} />
              <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>Our Compiler</span>
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[
                { href: '/about.html',         label: 'About' },
                { href: '/features.html',       label: 'Features' },
                { href: '/blog.html',           label: 'Tutorials' },
                { href: '/contact.html',         label: 'Contact' },
                { href: '/privacy-policy.html',  label: 'Privacy' },
              ].map(l => (
                <a key={l.href} href={l.href}
                  style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text2)'}
                >{l.label}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--text3)' }}>Our Compiler â€” Free Online Code Compiler Â· Â© 2026</span>
            <span style={{ fontSize: 12, color: 'var(--text3)' }}>Built with â¤ï¸ for developers</span>
          </div>
        </div>
      </footer>

    </div>
  )
}

