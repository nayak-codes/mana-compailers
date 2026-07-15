export default function CompilerHeader({ theme, setTheme, goHome }) {
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
        <span className="compiler-header-name">Our Compiler</span>
      </div>
      <button
        type="button"
        onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
        className="compiler-header-theme"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </header>
  )
}
