import { useState, useRef, useEffect } from 'react'

/**
 * LangDropdown — Custom language selector that looks like a native <select>
 * but renders official SVG logos + language names in the list.
 */
export default function LangDropdown({ lang, languages, onChange, isMobile }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (id) => {
    onChange(id)
    setOpen(false)
  }

  const btnW = isMobile ? 140 : 180
  const dropW = isMobile ? 180 : 220

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      {/* ── Trigger Button ── */}
      <button
        id="lang-dropdown-trigger"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          width: btnW,
          padding: '7px 10px',
          background: 'var(--bg3)',
          border: '1px solid var(--border)',
          borderRadius: 9,
          cursor: 'pointer',
          color: 'var(--text)',
          fontFamily: 'var(--ui)',
          fontSize: 14,
          fontWeight: 600,
          transition: 'border-color 0.15s, box-shadow 0.15s',
          boxShadow: open ? '0 0 0 2px rgba(63,185,80,0.4)' : 'none',
          borderColor: open ? '#3fb950' : 'var(--border)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {/* Current language logo */}
        {lang.logo ? (
          <img
            src={lang.logo}
            alt={lang.label}
            style={{ width: 22, height: 22, objectFit: 'contain', flexShrink: 0 }}
          />
        ) : (
          <span style={{ fontSize: 20, lineHeight: 1, flexShrink: 0 }}>{lang.icon}</span>
        )}

        {/* Current language name */}
        <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {lang.label}
        </span>

        {/* Chevron */}
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            opacity: 0.6,
          }}
        >
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* ── Dropdown Panel ── */}
      {open && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            width: dropW,
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: 11,
            boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
            zIndex: 9999,
            overflow: 'hidden',
            animation: 'langDropIn 0.15s ease both',
          }}
        >
          {languages.map((l) => {
            const isActive = l.id === lang.id
            return (
              <button
                key={l.id}
                role="option"
                aria-selected={isActive}
                onClick={() => handleSelect(l.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  padding: '9px 14px',
                  background: isActive ? 'rgba(63,185,80,0.14)' : 'transparent',
                  border: 'none',
                  borderLeft: isActive ? '3px solid #3fb950' : '3px solid transparent',
                  cursor: 'pointer',
                  color: 'var(--text)',
                  fontFamily: 'var(--ui)',
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 400,
                  textAlign: 'left',
                  transition: 'background 0.12s ease',
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.background = 'transparent'
                }}
              >
                {/* Logo */}
                <span style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {l.logo ? (
                    <img src={l.logo} alt={l.label} style={{ width: 24, height: 24, objectFit: 'contain' }} />
                  ) : (
                    <span style={{ fontSize: 20, lineHeight: 1 }}>{l.icon}</span>
                  )}
                </span>

                {/* Name */}
                <span style={{ flex: 1 }}>{l.label}</span>

                {/* Active checkmark */}
                {isActive && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7L5.5 10.5L12 4" stroke="#3fb950" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
