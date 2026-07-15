import { useState, useCallback, useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { LANGUAGES, TEMPLATES } from './languages'
import AppTopnav from './components/AppTopnav'
import CompilerHeader from './components/CompilerHeader'


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

const BACKEND_URL = 'https://mana-compailer-backend-docker.onrender.com'


// Silent warmup — wakes Render backend before user clicks Run
function warmupBackend() {
  fetch(`${BACKEND_URL}/api/health`, { method: 'GET', signal: AbortSignal.timeout(30000) })
    .catch(() => {}) // Ignore errors silently
}

export default function App() {
  const queryParams = new URLSearchParams(window.location.search)
  const urlLangId = queryParams.get('lang')
  const initialLang = urlLangId ? (LANGUAGES.find(x => x.id === urlLangId) || DEFAULT) : DEFAULT
  const initialView = urlLangId && LANGUAGES.some(x => x.id === urlLangId) ? 'compiler' : 'home'

  // 🔄 Cache busting — if template version changed, clear old saved code
  const TEMPLATE_VERSION = 'v2'
  if (localStorage.getItem('template_version') !== TEMPLATE_VERSION) {
    LANGUAGES.forEach(l => localStorage.removeItem(`code_${l.id}`))
    localStorage.setItem('template_version', TEMPLATE_VERSION)
  }

  const savedInitial = localStorage.getItem(`code_${initialLang.id}`)
  const initialCode = (savedInitial !== null && savedInitial.trim() !== '')
    ? savedInitial
    : (TEMPLATES[initialLang.id] || '')

  const [view, setView] = useState(initialView)
  const [lang, setLang] = useState(initialLang)
  const [code, setCode] = useState(initialCode)
  const [tutorialHtml, setTutorialHtml] = useState('')
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme')
    } else {
      document.body.classList.remove('light-theme')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

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
    setCode(savedCode !== null && savedCode.trim() !== '' ? savedCode : (TEMPLATES[id] || ''))
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
    setCode(savedCode !== null && savedCode.trim() !== '' ? savedCode : (TEMPLATES[id] || ''))
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
      // ✅ Docker backend — Unlimited, No API limits!
      const res = await fetch(`${BACKEND_URL}/api/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: lang.id,
          code: lang.id === 'java' ? preprocessJavaCode(code) : code,
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
      {view === 'home' && (
        <AppTopnav theme={theme} setTheme={setTheme} goHome={goHome} view={view} lang={lang} />
      )}
      {view === 'home' ? (
        <HomePage selectLanguage={selectLanguage} theme={theme} setTheme={setTheme} />
      ) : (
        <>

          <CompilerHeader theme={theme} setTheme={setTheme} goHome={goHome} />

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
                  onChange={v => {
                    const newCode = v || ''
                    setCode(newCode)
                    localStorage.setItem(`code_${lang.id}`, newCode)
                  }}
                  theme={theme === 'light' ? 'vs' : 'vs-dark'}
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

          {/* TUTORIAL CONTENT PANEL */}
          <div className="tutorial-section">
            <div className="tutorial-header">
              <h2>📚 {lang.label} Tutorial & Reference Guide</h2>
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
            <div><a href="/about.html" style={{ color: 'var(--text2)', textDecoration: 'none' }}>About</a> • <a href="/features.html" style={{ color: 'var(--text2)' }}>Features</a> • <a href="/blog.html" style={{ color: 'var(--text2)' }}>Tutorials</a> • <a href="/contact.html" style={{ color: 'var(--text2)' }}>Contact</a> • <a href="/privacy-policy.html" style={{ color: 'var(--text2)' }}>Privacy Policy</a></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span>Free online code compiler for developers worldwide.</span>
              <a
                href="https://balanju-solutions.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#a78bfa', fontWeight: 800, textDecoration: 'none', fontSize: 11, letterSpacing: 0.5, transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#c4b5fd'}
                onMouseLeave={e => e.currentTarget.style.color = '#a78bfa'}
              >🔷 A Balanju Solutions Product</a>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}

const s = {
  root: { display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)' },
  nav: { display: 'flex', alignItems: 'center', padding: '0 20px', height: 72, background: '#003366', flexShrink: 0 },
  brand: { display: 'flex', alignItems: 'center', gap: 10 },
  brandIcon: { fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 700, color: 'var(--accent)' },
  brandName: { fontSize: 17, fontWeight: 700, cursor: 'pointer', color: '#ffffff' },
  navLinks: { display: 'flex', alignItems: 'center', gap: 16 },
  navLink: { color: 'var(--text2)', fontSize: 13, textDecoration: 'none' },
  toolbar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)', flexShrink: 0, flexWrap: 'wrap', gap: 8 },
  select: { background: 'var(--bg3)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', fontSize: 14, cursor: 'pointer' },
  btnGhost: { background: 'transparent', color: 'var(--text2)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 14px', fontSize: 13 },
  btnHome: { background: 'transparent', color: 'var(--text2)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 14px', fontSize: 13, cursor: 'pointer' },
  btnSwap: { background: 'transparent', color: 'var(--text2)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', fontSize: 13, marginLeft: 4 },
  panelBtn: { background: 'transparent', color: 'var(--text2)', border: '1px solid transparent', borderRadius: 6, padding: '4px 8px', fontSize: 13, cursor: 'pointer' },
  btnRun: { background: '#238636', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 20px', fontSize: 14, fontWeight: 600 },
  main: { display: 'flex', height: 'calc(100vh - 140px)', minHeight: '520px', flexShrink: 0 },
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

// ── SVG Language Logos ──────────────────────────────────────────────────
const LangLogos = {
  python3: (
    <svg viewBox="0 0 128 128" width="48" height="48">
      <linearGradient id="py-a" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.563 0 0 -.568 -29.222 710.817)">
        <stop offset="0" stopColor="#5A9FD4"/><stop offset="1" stopColor="#306998"/>
      </linearGradient>
      <linearGradient id="py-b" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.563 0 0 -.568 -29.222 710.817)">
        <stop offset="0" stopColor="#FFD43B"/><stop offset="1" stopColor="#FFE873"/>
      </linearGradient>
      <path fill="url(#py-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"/>
      <path fill="url(#py-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"/>
    </svg>
  ),
  java: (
    <svg viewBox="0 0 128 128" width="48" height="48">
      <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zM44.629 84.455s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
      <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"/>
      <path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.556 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zM90.609 93.041c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"/>
      <path fill="#EA2D2E" d="M76.491 1.587s12.968 12.976-12.303 32.923c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"/>
      <path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"/>
    </svg>
  ),
  c: (
    <svg viewBox="0 0 128 128" width="48" height="48">
      <path fill="#659AD3" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z"/>
      <path fill="#03599C" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"/>
      <path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-13-7.6z"/>
    </svg>
  ),
  cpp17: (
    <svg viewBox="0 0 128 128" width="48" height="48">
      <path fill="#9C033A" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z"/>
      <path fill="#6A0120" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"/>
      <path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-13-7.6zM88.5 61.5v5h5v-5h5v5h5v5h-5v5h-5v-5h-5v5h-5v-5h-5v-5h5v-5zM108.5 61.5v5h5v-5h5v5h5v5h-5v5h-5v-5h-5v5h-5v-5h-5v-5h5v-5z"/>
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 128 128" width="48" height="48">
      <path fill="#F0DB4F" d="M1.408 63.945v62.304l17.384 9.938 17.04-9.938V82.76h-8.978v37.37l-8.064 4.668-8.062-4.668V68.38z"/>
      <path fill="#323330" d="M1.408 63.945v62.304l17.384 9.938 17.04-9.938V82.76h-8.978v37.37l-8.064 4.668-8.062-4.668V68.38z" opacity=".05"/>
      <path fill="#F0DB4F" d="M44.217 126.249l17.041 9.594V82.76h-8.978v37.115l-8.063 4.668z"/>
      <path fill="#323330" d="M64 1.408C29.64 1.408 1.408 29.64 1.408 64S29.64 126.592 64 126.592 126.592 98.36 126.592 64 98.36 1.408 64 1.408zm0 19.35c24.474 0 44.242 19.768 44.242 44.242 0 24.474-19.768 44.242-44.242 44.242-24.474 0-44.242-19.768-44.242-44.242 0-24.474 19.768-44.242 44.242-44.242z"/>
      <text x="64" y="87" textAnchor="middle" fill="#323330" fontSize="55" fontWeight="bold" fontFamily="Arial">JS</text>
    </svg>
  ),
  go: (
    <svg viewBox="0 0 207.436 78" width="60" height="30" style={{marginBottom:4}}>
      <path fill="#00ACD7" d="M16.2 24.1c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h35.7c.4 0 .5.3.3.6l-1.7 2.6c-.2.3-.7.6-1 .6z"/>
      <path fill="#00ACD7" d="M1.1 33.3c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h45.6c.4 0 .6.3.5.6l-.8 2.4c-.1.4-.5.6-.9.6z"/>
      <path fill="#00ACD7" d="M25.3 42.5c-.4 0-.5-.3-.3-.6l1.4-2.5c.2-.3.6-.6 1-.6h20c.4 0 .6.3.6.7l-.2 2.4c0 .4-.4.7-.7.7z"/>
      <path fill="#00ACD7" d="M155.1 19.6c-6.3 1.6-10.6 2.8-16.8 4.4-1.5.4-1.6.5-2.9-1-1.5-1.7-2.6-2.8-4.7-3.8-6.3-3.1-12.4-2.2-18.1 1.5-6.8 4.4-10.3 10.9-10.2 19 .1 8 5.6 14.6 13.5 15.7 6.8.9 12.5-1.5 17-6.6.9-1.1 1.7-2.3 2.7-3.7h-19.3c-2.1 0-2.6-1.3-1.9-3 1.3-3.1 3.7-8.3 5.1-10.9.3-.6 1-1.6 2.5-1.6h36.4c-.2 2.7-.2 5.4-.6 8.1-1.1 7.2-3.8 13.8-8.2 19.6-7.2 9.5-16.6 15.4-28.5 17-9.8 1.3-18.9-.6-26.9-6.6-7.4-5.6-11.6-13-12.7-22.2-1.3-10.9 1.9-20.7 8.5-29.3C101.1 9.3 111.1 3.6 123.1 2c9.8-1.3 19.1.3 27.3 6.4 5.2 3.9 8.9 9 11.1 15.1.5.6.2 1-.4 1.1z"/>
      <path fill="#00ACD7" d="M186.2 64.1c-9.1-.2-17.4-2.8-24.4-8.8-5.9-5.1-9.6-11.6-10.8-19.3-1.8-11.3 1.3-21.3 8.1-30.1 7.3-9.3 16.7-14.6 28.3-16.7 9.9-1.8 19.6-.8 28.5 4.5 8.1 4.9 13.2 11.8 14.9 21.1 2.3 12.5-1 23-9.2 32-5.9 6.5-13.1 10.6-21.5 12.6-4.6 1.1-9.3 1.5-13.9 1.7zm23.8-40.4c-.1-1.3-.1-2.3-.3-3.3-1.8-9.9-10.9-15.5-20.4-13.3-9.3 2.1-15.3 8-17.5 17.4-1.8 7.8 2 15.7 9.2 18.9 5.5 2.4 11 2.1 16.3-.6 7.9-4.1 12.2-10.5 12.7-19.1z"/>
    </svg>
  ),
  rust: (
    <svg viewBox="0 0 128 128" width="48" height="48">
      <path d="M62.27 5.6L30.4 22.16 6.88 42.84 2.5 70.32l13.9 24.26 26.42 17.03 27.06 5.35 24.56-8.66 17.86-20.8 5.13-25.63-7.9-24.04-21.52-19.42zM64.98 3.78l3.79 2.06L56.2 8.08z"/>
      <path fill="#CE422B" d="M64 9.15l38.68 22.3v44.59L64 118.35 25.32 76.04V31.45z"/>
      <path fill="#fff" d="M86.64 46.22c0-5.45-3.74-8.16-10.54-8.16H60.87v28.98h6.33V57.4h5.35c2.07 0 3.22.8 3.78 2.94.69 2.55.72 4.87 1.38 6.7h6.33c-.84-2.17-.95-4.87-1.64-7.55-.57-2.25-1.61-3.93-3.45-4.73 2.91-1.22 4.69-3.62 4.69-7.54zm-11.3 5.74h-8.14v-7.97h8.14c2.79 0 4.38 1.3 4.38 3.94 0 2.73-1.6 4.03-4.38 4.03z"/>
      <path fill="#fff" d="M51.59 38.06H42.3v28.98h6.33V55.8h3.3c7.49 0 12.19-3.39 12.19-9.13 0-5.47-3.82-8.61-12.53-8.61zm-.46 12.28H48.63V43.53h2.5c4.15 0 5.8 1.1 5.8 3.44 0 2.23-1.65 3.37-5.8 3.37z"/>
      <path fill="#fff" d="M91.6 65.39l-6.29-9.35c3.76-1.14 6.02-4.03 6.02-8.4 0-5.9-4.07-9.57-11.38-9.57H65.86v28.98h6.33V57.17h3.71c.46 0 .9-.03 1.34-.08l5.56 8.3z"/>
    </svg>
  ),
  php: (
    <svg viewBox="0 0 128 128" width="48" height="48">
      <path fill="#6181B6" d="M64 33.039C30.26 33.039 2.906 47.401 2.906 64.971 2.906 82.54 30.26 96.9 64 96.9c33.74 0 61.094-14.359 61.094-31.929 0-17.569-27.354-31.931-61.094-31.931z"/>
      <path fill="#fff" d="M85.51 64.875l2.588-12.802H80.3l-2.588 12.802H85.51zM43.1 52.072l-2.588 12.803H47.9l2.588-12.803H43.1zM51.812 64.875l2.588-12.802H46.6l-2.588 12.802H51.812zM58.6 64.875H65.4l2.588-12.802H61.188L58.6 64.875z"/>
    </svg>
  ),
  ruby: (
    <svg viewBox="0 0 128 128" width="48" height="48">
      <linearGradient id="rb-a" x1="84.75" y1="111.15" x2="59.25" y2="66.26" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#FB7655"/><stop offset="1" stopColor="#E82D09"/>
      </linearGradient>
      <linearGradient id="rb-b" x1="116.52" y1="55.98" x2="20.78" y2="115.63" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#FB7655"/><stop offset="1" stopColor="#E82D09"/>
      </linearGradient>
      <path fill="url(#rb-a)" d="M97.078 83.214L28.34 124l78.914-6.408 15.236-56.514z"/>
      <path fill="url(#rb-b)" d="M124.873 67.178L118.03 7.492l-43.795 40.47 50.638 19.216z"/>
      <path fill="#E82D09" d="M124.297 66.947l-2.844-28.815-23.124 27.837z"/>
      <path fill="#8B1A0E" d="M98.329 65.969l-14.237-32.87-37.677 29.328z"/>
      <path fill="#FB7655" d="M3.802 100.898l10.239-48.178 56.988 14.064z"/>
      <path fill="#E82D09" d="M3.802 100.898l-1.186-40.394 11.319-7.784z"/>
      <path fill="#8B1A0E" d="M2.616 60.504l19.063-16.015L3.802 100.898z"/>
      <path fill="#FB7655" d="M21.679 44.489l61.73-12.534-29.012-21.483z"/>
      <path fill="#E82D09" d="M21.679 44.489L54.397 10.472 21.679 44.489z"/>
      <path fill="#E82D09" d="M54.397 10.472l29.012 21.483 35.164-16.8z"/>
      <path fill="#8B1A0E" d="M118.573 15.155L54.397 10.472l64.176 4.683z"/>
    </svg>
  ),
  csharp: (
    <svg viewBox="0 0 128 128" width="48" height="48">
      <path fill="#9B4F96" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z"/>
      <path fill="#68217A" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"/>
      <path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-13-7.6zM97 66.5v-5H92v5h-5v5h5v5h5v-5h5v-5zm13 0v-5h-5v5h-5v5h5v5h5v-5h5v-5z"/>
    </svg>
  ),
}

// ── Language metadata for the homepage cards ───────────────────────────
const LANG_CARDS = [
  { id: 'python3',  label: 'Python 3',   accentColor: '#3776AB', bgGlow: 'rgba(55,118,171,0.18)', desc: 'Beginner-friendly, versatile' },
  { id: 'java',     label: 'Java',       accentColor: '#f0a500', bgGlow: 'rgba(240,165,0,0.15)',  desc: 'Object-oriented, enterprise' },
  { id: 'c',        label: 'C',          accentColor: '#659AD3', bgGlow: 'rgba(101,154,211,0.18)', desc: 'Systems, low-level, fast' },
  { id: 'cpp17',    label: 'C++',        accentColor: '#9C033A', bgGlow: 'rgba(156,3,58,0.18)',   desc: 'High-performance, STL' },
  { id: 'nodejs',   label: 'JavaScript', accentColor: '#F0DB4F', bgGlow: 'rgba(240,219,79,0.15)', desc: 'Web, async, Node.js' },
  { id: 'go',       label: 'Go',         accentColor: '#00ACD7', bgGlow: 'rgba(0,172,215,0.18)', desc: 'Concurrency, cloud-native' },
  { id: 'rust',     label: 'Rust',       accentColor: '#CE422B', bgGlow: 'rgba(206,66,43,0.18)',  desc: 'Memory-safe, blazing fast' },
  { id: 'php',      label: 'PHP',        accentColor: '#8892BF', bgGlow: 'rgba(136,146,191,0.18)', desc: 'Server-side, web scripting' },
  { id: 'ruby',     label: 'Ruby',       accentColor: '#E82D09', bgGlow: 'rgba(232,45,9,0.18)',   desc: 'Elegant, Rails-ready' },
  { id: 'csharp',   label: 'C#',         accentColor: '#9B4F96', bgGlow: 'rgba(155,79,150,0.18)', desc: '.NET, Unity, enterprise' },
]

// ── Tutorial guide list ───────────────────────────────────────────────
const TUTORIAL_GUIDES = [
  { path: '/blog-python.html',     id: 'python3',  title: 'Python 3',   color: '#3776AB', desc: 'From variables to OOP — the most beginner-friendly guide to Python 3 with 15 in-depth lessons.', badge: 'Most Popular' },
  { path: '/blog-java.html',       id: 'java',     title: 'Java',       color: '#f0a500', desc: 'Classes, inheritance, exceptions — everything you need to master Java from scratch to advanced.' },
  { path: '/blog-c.html',          id: 'c',        title: 'C',          color: '#659AD3', desc: 'Pointers, memory, structs — the foundation of systems programming explained step by step.' },
  { path: '/blog-cpp.html',        id: 'cpp17',    title: 'C++',        color: '#9C033A', desc: 'STL, templates, modern C++17 — high-performance programming with in-depth 15-lesson guide.' },
  { path: '/blog-javascript.html', id: 'nodejs',   title: 'JavaScript', color: '#F0DB4F', desc: 'Promises, async/await, and ES6+ features — master JavaScript for web and Node.js development.' },
  { path: '/blog-go.html',         id: 'go',       title: 'Go',         color: '#00ACD7', desc: 'Goroutines, channels, and idiomatic Go — cloud-native concurrency made simple.' },
  { path: '/blog-rust.html',       id: 'rust',     title: 'Rust',       color: '#CE422B', desc: 'Ownership, borrowing, and memory safety — no garbage collector, maximum performance.' },
  { path: '/blog-php.html',        id: 'php',      title: 'PHP',        color: '#8892BF', desc: 'Server-side scripting, arrays, OOP, and web development — PHP from beginner to advanced.' },
  { path: '/blog-ruby.html',       id: 'ruby',     title: 'Ruby',       color: '#E82D09', desc: 'Elegant blocks, iterators, and OOP design — Ruby programming the beautiful way.' },
]

function HomePage({ selectLanguage, theme, setTheme }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* HERO HEADER */}
      <header style={{
        background: 'var(--bg2)',
        textAlign: 'center',
        padding: '40px 20px',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: '60px 20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* CHOOSE LANGUAGE SECTION */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2.5, color: '#58a6ff', textTransform: 'uppercase', marginBottom: 10 }}>⚡ Online Compiler</p>
            <h2 style={{
              fontSize: 'clamp(24px,4vw,38px)',
              fontWeight: 800,
              marginBottom: 12,
              color: 'var(--text)',
              letterSpacing: '-0.5px'
            }}>
              Choose Your Language
            </h2>
            <p style={{
              color: 'var(--text2)',
              fontSize: 15,
              margin: 0,
              maxWidth: '600px'
            }}>
              10 languages supported — click any card to open the editor instantly. No login, no setup, always free.
            </p>
          </div>

          {/* LANGUAGE GRID — Real SVG Logos */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 18,
            marginBottom: 20
          }}>
            {LANG_CARDS.map(lang => (
              <button
                key={lang.id}
                onClick={() => selectLanguage(lang.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
                  padding: '28px 16px 22px',
                  background: 'var(--bg2)',
                  border: `1px solid var(--border)`,
                  borderRadius: 18,
                  cursor: 'pointer',
                  transition: 'all 0.28s cubic-bezier(0.4,0,0.2,1)',
                  fontSize: 14, color: 'var(--text)', fontWeight: 700,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.22)',
                  position: 'relative', overflow: 'hidden',
                  textAlign: 'center'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = lang.bgGlow
                  e.currentTarget.style.borderColor = lang.accentColor
                  e.currentTarget.style.transform = 'translateY(-9px) scale(1.03)'
                  e.currentTarget.style.boxShadow = `0 18px 38px ${lang.accentColor}33`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--bg2)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.22)'
                }}
              >
                {/* top accent line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${lang.accentColor}, transparent)`, opacity: 0.7 }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64 }}>
                  {LangLogos[lang.id] || <span style={{ fontSize: 40 }}>💻</span>}
                </div>
                <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: 0.2, color: 'var(--text)' }}>{lang.label}</span>
                <span style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 500 }}>{lang.desc}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── TUTORIALS GRID ── */}
        <section style={{ marginBottom: 96 }}>
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2.5, color: '#3fb950', textTransform: 'uppercase', marginBottom: 10 }}>📚 Learn Programming</p>
            <h2 style={{ fontSize: 'clamp(24px,4vw,38px)', fontWeight: 800, color: 'var(--text)', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
              Free Step-by-Step Tutorials
            </h2>
            <p style={{ color: 'var(--text2)', fontSize: 15, margin: 0, maxWidth: 560 }}>
              Each guide has <strong style={{ color: 'var(--text)' }}>15 in-depth lessons</strong> — structured with deep-dive explanations, code examples, and live runnable demos.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
            {TUTORIAL_GUIDES.map(guide => (
              <a
                key={guide.path}
                href={guide.path}
                style={{
                  display: 'flex', flexDirection: 'column',
                  textDecoration: 'none', color: 'inherit',
                  background: 'var(--bg2)', border: '1px solid var(--border)',
                  borderRadius: 20, padding: '0',
                  transition: 'all 0.28s cubic-bezier(0.4,0,0.2,1)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.22)',
                  position: 'relative', overflow: 'hidden'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = guide.color
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = `0 20px 40px ${guide.color}28`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.22)'
                }}
              >
                {/* top color bar */}
                <div style={{ height: 4, background: `linear-gradient(90deg, ${guide.color} 0%, ${guide.color}55 100%)` }} />
                <div style={{ padding: '22px 24px 20px' }}>
                  {/* Logo + Title row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 12, background: `${guide.color}14`, border: `1px solid ${guide.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {LangLogos[guide.id] ? (
                        <div style={{ transform: 'scale(0.85)', display: 'flex' }}>{LangLogos[guide.id]}</div>
                      ) : <span style={{ fontSize: 26 }}>💻</span>}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.2px' }}>{guide.title}</h3>
                        {guide.badge && (
                          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', color: '#3fb950', background: 'rgba(63,185,80,0.14)', border: '1px solid rgba(63,185,80,0.35)', borderRadius: 999, padding: '2px 8px' }}>
                            {guide.badge}
                          </span>
                        )}
                      </div>
                      <div style={{ marginTop: 3, fontSize: 11.5, color: guide.color, fontWeight: 600 }}>15 Lessons · Free</div>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.7 }}>{guide.desc}</p>
                  <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, color: guide.color, fontWeight: 700 }}>Start Learning →</span>
                    <span style={{ fontSize: 11, color: 'var(--text3)', background: 'var(--bg3)', borderRadius: 6, padding: '3px 9px', fontWeight: 600 }}>Tutorial</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── FEATURES GRID ── */}
        <section style={{ marginBottom: 96 }}>
          <div style={{ marginBottom: 40, textAlign: 'center' }}>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: '#f0a500', textTransform: 'uppercase', marginBottom: 10 }}>— Why Us</p>
            <h2 style={{ fontSize: 'clamp(24px,4vw,38px)', fontWeight: 800, color: 'var(--text)', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
              Why Choose This Compiler?
            </h2>
            <p style={{ color: 'var(--text2)', fontSize: 15, margin: '0 auto', maxWidth: 480 }}>
              Built for developers who want speed, simplicity, and professionalism in a browser-based tool.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {[
              { icon: '⚡', title: 'Lightning Fast Execution', desc: 'Docker-isolated containers execute your code in under 2 seconds on average — no cold starts, no waiting.', color: '#f1e05a' },
              { icon: '📝', title: 'Monaco Code Editor', desc: 'The same engine powering VS Code — full syntax highlighting, auto-complete, and smart indentation.', color: '#58a6ff' },
              { icon: '🔒', title: 'Privacy First', desc: 'Your code is never stored. Complete sandbox isolation and zero tracking — guaranteed.', color: '#3fb950' },
              { icon: '🌍', title: '9 Languages Supported', desc: 'Python, Java, C, C++, JavaScript, Go, Rust, PHP, Ruby — one platform for every stack.', color: '#f74c00' },
              { icon: '📱', title: 'Works on Any Device', desc: 'Fully responsive design — works flawlessly on desktop, tablet, and mobile with an adaptive layout.', color: '#d2a8ff' },
              { icon: '✨', title: 'Zero Setup Required', desc: 'Open your browser, choose a language, and start. No terminal, no installation, no frustration.', color: '#f0a500' },
            ].map((f, i) => (
              <div key={i} style={{
                padding: '28px 28px', background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 16, transition: 'all 0.3s ease', cursor: 'default', position: 'relative', overflow: 'hidden'
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = f.color
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = `0 12px 28px ${f.color}20`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${f.color}18`, border: `1px solid ${f.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 18 }}>
                  {f.icon}
                </div>
                <h3 style={{ margin: '0 0 10px', fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>{f.title}</h3>
                <p style={{ margin: 0, fontSize: 14, color: 'var(--text2)', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(88,166,255,0.08) 0%, rgba(63,185,80,0.06) 50%, rgba(248,129,80,0.06) 100%)',
          border: '1px solid rgba(88,166,255,0.25)',
          borderRadius: 24, padding: '64px 40px', textAlign: 'center'
        }}>
          <h3 style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 800, margin: '0 0 14px', color: 'var(--text)', letterSpacing: '-0.5px' }}>
            Ready to Write Your First Program?
          </h3>
          <p style={{ fontSize: 16, color: 'var(--text2)', margin: '0 auto 32px', maxWidth: 460 }}>
            Join thousands of developers and students who code faster every day.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => selectLanguage('python3')}
              style={{ background: 'linear-gradient(135deg, #58a6ff 0%, #1f6feb 100%)', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 36px', fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(88,166,255,0.35)', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(88,166,255,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(88,166,255,0.35)' }}
            >🐍 Try Python Now</button>
            <button
              onClick={() => selectLanguage('java')}
              style={{ background: 'linear-gradient(135deg, #f0a500 0%, #e8890c 100%)', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 36px', fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(240,165,0,0.3)', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
            >☕ Try Java Now</button>
          </div>
        </section>

      </main>

      {/* ── PREMIUM FOOTER ── */}
      <footer style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #0d121c 0%, #07090e 100%)',
        fontFamily: "'Inter', 'Segoe UI', sans-serif"
      }}>

        {/* Glowing top accent */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(108,61,232,0.8) 30%, rgba(88,166,255,1.0) 50%, rgba(63,185,80,0.8) 70%, transparent 100%)',
        }} />

        {/* Balanju banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(108,61,232,0.2) 0%, rgba(88,166,255,0.12) 100%)',
          borderBottom: '1px solid rgba(108,61,232,0.25)',
          padding: '14px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px'
        }}>
          <span style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Proudly built by</span>
          <a href="https://balanju-solutions.vercel.app/" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              textDecoration: 'none',
              background: 'rgba(108,61,232,0.25)',
              border: '1px solid rgba(108,61,232,0.5)',
              borderRadius: '999px', padding: '6px 18px',
              transition: 'all 0.25s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(108,61,232,0.4)'; e.currentTarget.style.borderColor = '#9f75ff'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(108,61,232,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(108,61,232,0.25)'; e.currentTarget.style.borderColor = 'rgba(108,61,232,0.5)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            <span style={{ fontSize: '15px' }}>🔷</span>
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#c4b5fd', letterSpacing: '0.2px' }}>Balanju Solutions</span>
            <span style={{ fontSize: '11px', color: 'rgba(196,181,253,0.9)', fontWeight: '700' }}>↗</span>
          </a>
        </div>

        {/* Main grid */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 40px 40px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '40px',
            marginBottom: '56px'
          }}>

            {/* Col 1 — Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <img src="/logo-nav.png" alt="Compiler logo" style={{ height: '36px', width: '36px', objectFit: 'contain', borderRadius: '9px', boxShadow: '0 0 16px rgba(88,166,255,0.4)' }} />
                <span style={{ fontSize: '19px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.3px' }}>Compiler</span>
              </div>
              <p style={{ fontSize: '13.5px', color: '#e2e8f0', lineHeight: '1.85', margin: '0 0 22px', maxWidth: '240px' }}>
                Write, compile &amp; run code in 10+ languages — instantly in your browser. No setup. No login. Always free.
              </p>
              {/* Social icons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { icon: '𝕏', label: 'Twitter' },
                  { icon: '⌨', label: 'GitHub' },
                  { icon: 'in', label: 'LinkedIn' },
                ].map(s => (
                  <a key={s.label} href="#" aria-label={s.label}
                    style={{
                      width: '34px', height: '34px', borderRadius: '8px',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      color: '#e2e8f0', fontSize: '13px', fontWeight: '700',
                      textDecoration: 'none', transition: 'all 0.2s', cursor: 'pointer'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(88,166,255,0.2)'; e.currentTarget.style.borderColor = 'rgba(88,166,255,0.5)'; e.currentTarget.style.color = '#58a6ff' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = '#e2e8f0' }}
                  >{s.icon}</a>
                ))}
              </div>
            </div>

            {/* Col 2 — Languages */}
            <div>
              <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#58a6ff', margin: '0 0 18px', borderBottom: '1px solid rgba(88,166,255,0.35)', paddingBottom: '10px' }}>Languages</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { icon: '🐍', label: 'Python', lang: 'python3' },
                  { icon: '☕', label: 'Java', lang: 'java' },
                  { icon: '⚙️', label: 'C / C++', lang: 'cpp17' },
                  { icon: '🟨', label: 'JavaScript', lang: 'nodejs' },
                  { icon: '🦀', label: 'Rust', lang: 'rust' },
                  { icon: '🐹', label: 'Go', lang: 'go' },
                ].map(l => (
                  <li key={l.lang}>
                    <a href={`/?lang=${l.lang}`}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.18s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#58a6ff'}
                      onMouseLeave={e => e.currentTarget.style.color = '#cbd5e1'}
                    ><span>{l.icon}</span>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Product */}
            <div>
              <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#3fb950', margin: '0 0 18px', borderBottom: '1px solid rgba(63,185,80,0.35)', paddingBottom: '10px' }}>Product</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { href: '/features.html', label: '⚡ Features' },
                  { href: '/blog.html', label: '📚 Tutorials' },
                  { href: '/about.html', label: 'ℹ️ About' },
                  { href: '/contact.html', label: '📬 Contact' },
                  { href: '/privacy-policy.html', label: '🔒 Privacy' },
                ].map(l => (
                  <li key={l.href}>
                    <a href={l.href}
                      style={{ fontSize: '13.5px', color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.18s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#3fb950'}
                      onMouseLeave={e => e.currentTarget.style.color = '#cbd5e1'}
                    >{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Balanju Solutions (highlighted) */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(108,61,232,0.18) 0%, rgba(108,61,232,0.06) 100%)',
              border: '1px solid rgba(108,61,232,0.35)',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '18px' }}>🔷</span>
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#c4b5fd', letterSpacing: '-0.2px' }}>Balanju Solutions</span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#e9d5ff', lineHeight: '1.75', margin: '0 0 18px' }}>
                This flagship product of Balanju Solutions is built by a tech startup creating innovative software for developers &amp; businesses.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {[
                  { href: 'https://balanju-solutions.vercel.app/', label: '🌐 Company Website' },
                  { href: 'https://balanju-solutions.vercel.app/products.html', label: '🚀 All Products' },
                  { href: 'https://balanju-solutions.vercel.app/services.html', label: '🛠️ Our Services' },
                  { href: 'https://balanju-solutions.vercel.app/contact.html', label: '🤝 Hire Us' },
                ].map(l => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: '13px', color: '#d8b4fe', textDecoration: 'none', transition: 'color 0.18s', fontWeight: '500' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                      onMouseLeave={e => e.currentTarget.style.color = '#d8b4fe'}
                    >{l.label}</a>
                  </li>
                ))}
              </ul>
              <a href="https://balanju-solutions.vercel.app/" target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  fontSize: '12px', fontWeight: '800', color: '#ffffff',
                  textDecoration: 'none',
                  background: 'rgba(108,61,232,0.35)',
                  border: '1px solid rgba(108,61,232,0.6)',
                  borderRadius: '999px', padding: '7px 18px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(108,61,232,0.5)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(108,61,232,0.45)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(108,61,232,0.35)'; e.currentTarget.style.boxShadow = 'none' }}
              >Visit Balanju →</a>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.15)',
            paddingTop: '24px', paddingBottom: '32px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12.5px', color: '#cbd5e1' }}>© 2026 Balanju Solutions. All rights reserved.</span>
              <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.3)' }}>|</span>
              <span style={{ fontSize: '12.5px', color: '#cbd5e1' }}>Free · Trusted by developers worldwide</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '12px', color: '#cbd5e1' }}>Made with ❤️ in India by</span>
              <a href="https://balanju-solutions.vercel.app/" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '12.5px', fontWeight: '800', color: '#c4b5fd', textDecoration: 'none', letterSpacing: '0.2px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={e => e.currentTarget.style.color = '#c4b5fd'}
              >🔷 Balanju Solutions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
