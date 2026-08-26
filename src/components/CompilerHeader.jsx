export default function CompilerHeader({ theme, setTheme, goHome, lang }) {
  let headerName = 'Our Compiler'
  if (lang) {
    if (lang.id === 'python3') headerName = 'Python Compiler'
    else if (lang.id === 'java') headerName = 'Java Compiler'
    else if (lang.id === 'c') headerName = 'C Compiler'
    else if (lang.id === 'cpp17') headerName = 'C++ Compiler'
    else if (lang.id === 'nodejs') headerName = 'JavaScript Compiler'
    else if (lang.id === 'html') headerName = 'HTML Editor'
    else if (lang.id === 'csharp') headerName = 'C# Compiler'
    else if (lang.id === 'go') headerName = 'Go Compiler'
    else if (lang.id === 'rust') headerName = 'Rust Compiler'
    else if (lang.id === 'php') headerName = 'PHP Compiler'
    else if (lang.id === 'ruby') headerName = 'Ruby Compiler'
    else headerName = `${lang.label || lang.name} Compiler`
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
        <img src="/logo-nav.png" alt="Compiler logo" />
        <span className="compiler-header-name">{headerName}</span>
      </div>
      <button
        type="button"
        onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
        className="compiler-header-theme"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
    </header>
  )
}

