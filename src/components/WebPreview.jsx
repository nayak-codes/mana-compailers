import { useState, useEffect, useRef, useMemo } from 'react'

export default function WebPreview({
  code,
  files,
  theme,
  isMobile,
  maximized,
  onToggleMaximize,
}) {
  const [deviceMode, setDeviceMode] = useState('desktop') // 'desktop' | 'mobile'
  const [consoleLogs, setConsoleLogs] = useState([])
  const [showConsole, setShowConsole] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const iframeRef = useRef(null)

  // Listen for console logs sent from the iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'web-editor-console') {
        const time = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
        setConsoleLogs((prev) => [
          ...prev.slice(-99), // keep last 100 logs
          {
            level: event.data.level || 'log',
            text: event.data.args.join(' '),
            time,
          },
        ])
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // Build the executable HTML string with CSS, JS, and console interceptor
  const srcDoc = useMemo(() => {
    let rawHtml = ''
    let rawCss = ''
    let rawJs = ''

    if (files && typeof files === 'object') {
      rawHtml = files.html || ''
      rawCss = files.css || ''
      rawJs = files.js || ''
    } else if (typeof code === 'string') {
      rawHtml = code
    }

    if (!rawHtml && !rawCss && !rawJs) return ''

    const consoleScript = `
      <script>
        (function() {
          const _log = console.log;
          const _err = console.error;
          const _warn = console.warn;
          const _info = console.info;

          function serialize(arg) {
            if (arg === null) return 'null';
            if (arg === undefined) return 'undefined';
            if (typeof arg === 'object') {
              try { return JSON.stringify(arg, null, 2); } catch(e) { return String(arg); }
            }
            return String(arg);
          }

          console.log = function(...args) {
            window.parent.postMessage({ type: 'web-editor-console', level: 'log', args: args.map(serialize) }, '*');
            _log.apply(console, args);
          };
          console.error = function(...args) {
            window.parent.postMessage({ type: 'web-editor-console', level: 'error', args: args.map(serialize) }, '*');
            _err.apply(console, args);
          };
          console.warn = function(...args) {
            window.parent.postMessage({ type: 'web-editor-console', level: 'warn', args: args.map(serialize) }, '*');
            _warn.apply(console, args);
          };
          console.info = function(...args) {
            window.parent.postMessage({ type: 'web-editor-console', level: 'info', args: args.map(serialize) }, '*');
            _info.apply(console, args);
          };

          window.onerror = function(msg, url, line, col, error) {
            window.parent.postMessage({
              type: 'web-editor-console',
              level: 'error',
              args: ['Uncaught Error: ' + msg + (line ? ' (line ' + line + ')' : '')]
            }, '*');
          };
        })();
      </script>
    `

    let bundled = rawHtml

    // 1. Inject CSS into HTML
    if (rawCss.trim()) {
      const styleTag = `<style>\n${rawCss}\n</style>`
      if (/<link[^>]*href=["'][^"']*styles?\.css["'][^>]*>/i.test(bundled)) {
        bundled = bundled.replace(/<link[^>]*href=["'][^"']*styles?\.css["'][^>]*>/i, styleTag)
      } else if (bundled.includes('</head>')) {
        bundled = bundled.replace('</head>', styleTag + '\n</head>')
      } else if (bundled.includes('<body>')) {
        bundled = bundled.replace('<body>', styleTag + '\n<body>')
      } else {
        bundled = styleTag + '\n' + bundled
      }
    }

    // 2. Inject JS into HTML
    if (rawJs.trim()) {
      const scriptTag = `<script>\n${rawJs}\n</script>`
      if (/<script[^>]*src=["'][^"']*scripts?\.js["'][^>]*>\s*<\/script>/i.test(bundled)) {
        bundled = bundled.replace(/<script[^>]*src=["'][^"']*scripts?\.js["'][^>]*>\s*<\/script>/i, scriptTag)
      } else if (bundled.includes('</body>')) {
        bundled = bundled.replace('</body>', scriptTag + '\n</body>')
      } else {
        bundled = bundled + '\n' + scriptTag
      }
    }

    // 3. Inject console interceptor
    if (bundled.includes('<head>')) {
      return bundled.replace('<head>', '<head>' + consoleScript)
    }
    if (bundled.includes('<html>')) {
      return bundled.replace('<html>', '<html><head>' + consoleScript + '</head>')
    }
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">${consoleScript}</head><body>${bundled}</body></html>`
  }, [code, files])

  const openInNewTab = () => {
    try {
      const blob = new Blob([srcDoc], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      window.open(url, '_blank')
    } catch (e) {
      const win = window.open('')
      if (win) {
        win.document.write(srcDoc)
        win.document.close()
      }
    }
  }

  const handleRefresh = () => {
    setConsoleLogs([])
    setReloadKey((k) => k + 1)
  }

  return (
    <div className="web-preview-container" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      background: 'var(--bg2)',
      overflow: 'hidden',
    }}>
      {/* PREVIEW TOOLBAR */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 12px',
        background: 'var(--bg2)',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
        gap: 8,
        flexWrap: 'wrap',
      }}>
        {/* Left: Title & Mock Address */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6 }}>
            🌐 <span className="preview-label">Live Preview</span>
          </span>
          {!isMobile && (
            <div style={{
              background: 'var(--bg3)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '2px 10px',
              fontSize: 11.5,
              color: 'var(--text3)',
              fontFamily: 'var(--mono)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <span style={{ color: '#3fb950', fontSize: 10 }}>●</span>
              <span>localhost:preview</span>
            </div>
          )}
        </div>

        {/* Right: Actions (Device mode, Refresh, Console, Popout, Maximize) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {!isMobile && (
            <div style={{
              display: 'inline-flex',
              background: 'var(--bg3)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: 2,
            }}>
              <button
                type="button"
                onClick={() => setDeviceMode('desktop')}
                style={{
                  background: deviceMode === 'desktop' ? 'var(--bg2)' : 'transparent',
                  color: deviceMode === 'desktop' ? 'var(--text)' : 'var(--text2)',
                  border: 'none',
                  borderRadius: 4,
                  padding: '2px 8px',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                title="Desktop View (100%)"
              >
                🖥️
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode('mobile')}
                style={{
                  background: deviceMode === 'mobile' ? 'var(--bg2)' : 'transparent',
                  color: deviceMode === 'mobile' ? 'var(--text)' : 'var(--text2)',
                  border: 'none',
                  borderRadius: 4,
                  padding: '2px 8px',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                title="Mobile View (375px)"
              >
                📱
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleRefresh}
            style={{
              background: 'var(--bg3)',
              color: 'var(--text2)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '3px 8px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
            title="Reload Preview"
          >
            🔄
          </button>

          <button
            type="button"
            onClick={() => setShowConsole((v) => !v)}
            style={{
              background: showConsole ? 'rgba(88,166,255,0.15)' : 'var(--bg3)',
              color: showConsole ? '#58a6ff' : 'var(--text2)',
              border: '1px solid',
              borderColor: showConsole ? '#58a6ff' : 'var(--border)',
              borderRadius: 6,
              padding: '3px 10px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
            title="Toggle Console Output"
          >
            📜 Console
            {consoleLogs.length > 0 && (
              <span style={{
                background: '#58a6ff',
                color: '#fff',
                borderRadius: 999,
                fontSize: 10,
                padding: '0 5px',
                fontWeight: 700,
              }}>
                {consoleLogs.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={openInNewTab}
            style={{
              background: 'var(--bg3)',
              color: 'var(--text2)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '3px 8px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
            title="Open Preview in New Tab"
          >
            ↗
          </button>

          {!isMobile && onToggleMaximize && (
            <button
              type="button"
              onClick={onToggleMaximize}
              style={{
                background: 'var(--bg3)',
                color: 'var(--text2)',
                border: '1px solid var(--border)',
                borderRadius: 6,
                padding: '3px 8px',
                fontSize: 12,
                cursor: 'pointer',
              }}
              title={maximized ? 'Restore Panel' : 'Maximize Panel'}
            >
              {maximized ? '🗗' : '⛶'}
            </button>
          )}
        </div>
      </div>

      {/* PREVIEW IFRAME STAGE */}
      <div style={{
        flex: 1,
        position: 'relative',
        background: theme === 'light' ? '#f6f8fa' : '#0d1117',
        display: 'flex',
        justifyContent: 'center',
        alignItems: deviceMode === 'mobile' ? 'center' : 'stretch',
        padding: deviceMode === 'mobile' ? '16px' : 0,
        overflow: 'hidden',
      }}>
        <iframe
          key={reloadKey}
          ref={iframeRef}
          srcDoc={srcDoc}
          title="HTML Live Web Preview"
          sandbox="allow-scripts allow-modals allow-same-origin allow-forms allow-popups"
          style={{
            width: deviceMode === 'mobile' ? '375px' : '100%',
            height: deviceMode === 'mobile' ? '667px' : '100%',
            maxHeight: '100%',
            border: deviceMode === 'mobile' ? '8px solid #30363d' : 'none',
            borderRadius: deviceMode === 'mobile' ? '28px' : 0,
            background: '#ffffff',
            boxShadow: deviceMode === 'mobile' ? '0 12px 32px rgba(0,0,0,0.5)' : 'none',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>

      {/* COLLAPSIBLE CONSOLE DRAWER */}
      {showConsole && (
        <div style={{
          height: 160,
          background: 'var(--bg3)',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'var(--mono)',
          fontSize: 12,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '4px 12px',
            background: 'var(--bg2)',
            borderBottom: '1px solid var(--border)',
            color: 'var(--text2)',
            fontSize: 11,
            fontWeight: 700,
          }}>
            <span>🖥️ CONSOLE OUTPUT ({consoleLogs.length})</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={() => setConsoleLogs([])}
                style={{
                  background: 'transparent',
                  color: 'var(--text2)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 11,
                }}
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setShowConsole(false)}
                style={{
                  background: 'transparent',
                  color: 'var(--text2)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 11,
                }}
              >
                ✕
              </button>
            </div>
          </div>

          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '8px 12px',
            lineHeight: 1.5,
          }}>
            {consoleLogs.length === 0 ? (
              <div style={{ color: 'var(--text3)', fontStyle: 'italic' }}>
                No console messages logged yet. Use console.log() in your JavaScript to see outputs here.
              </div>
            ) : (
              consoleLogs.map((log, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 8,
                    padding: '2px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                    color: log.level === 'error' ? '#ff6b6b' : log.level === 'warn' ? '#f0a500' : 'var(--text)',
                  }}
                >
                  <span style={{ color: 'var(--text3)', fontSize: 10 }}>[{log.time}]</span>
                  <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{log.text}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
