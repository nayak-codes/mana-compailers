export default function CompilerHeader({ theme, setTheme, goHome, lang, onStartTour, isMobile }) {
  let headerName = 'Our Compiler'
  let logoSrc = '/logo-nav.png'
  if (lang) {
    if (lang.id === 'python3') { headerName = 'Python Compiler'; logoSrc = '/logos/python.svg'; }
    else if (lang.id === 'java') { headerName = 'Java Compiler'; logoSrc = '/logos/java.svg'; }
    else if (lang.id === 'c') { headerName = 'C Compiler'; logoSrc = '/logos/c.svg'; }
    else if (lang.id === 'cpp17') { headerName = 'C++ Compiler'; logoSrc = '/logos/cpp.svg'; }
    else if (lang.id === 'nodejs') { headerName = 'JavaScript Compiler'; logoSrc = '/logos/javascript.svg'; }
    else if (lang.id === 'html') { headerName = 'HTML Editor'; logoSrc = '/logos/html.svg'; }
    else if (lang.id === 'csharp') { headerName = 'C# Compiler'; logoSrc = '/logos/csharp.svg'; }
    else if (lang.id === 'go') { headerName = 'Go Compiler'; logoSrc = '/logos/go.svg'; }
    else if (lang.id === 'rust') { headerName = 'Rust Compiler'; logoSrc = '/logos/rust.svg'; }
    else if (lang.id === 'php') { headerName = 'PHP Compiler'; logoSrc = '/logos/php.svg'; }
    else if (lang.id === 'ruby') { headerName = 'Ruby Compiler'; logoSrc = '/logos/ruby.svg'; }
    else { headerName = `${lang.label || lang.name} Compiler`; if (lang.logo) logoSrc = lang.logo; }
  }

  return (
    <header className="compiler-header">
      <div
        className="compiler-header-brand"
        onClick={goHome}
        onKeyDown={e => e.key === 'Enter' && goHome()}
        role="button"
        tabIndex={0}
        aria-label="Go to homepage"
      >
        <img src={logoSrc} alt={`${headerName} logo`} style={{ height: 26, width: 26, objectFit: 'contain' }} />
        <span className="compiler-header-name">{headerName}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {onStartTour && !isMobile && (
          <button
            type="button"
            onClick={onStartTour}
            className="tour-guide-trigger-btn"
            title="Interactive Feature Walkthrough"
          >
            💡 Guided Tour
          </button>
        )}
        <button
          type="button"
          onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
          className="compiler-header-theme"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>
    </header>
  )
}


