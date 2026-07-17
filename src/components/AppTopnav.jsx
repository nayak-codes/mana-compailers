import { useState, useEffect, useRef } from 'react'

const COMPILER_LANGS = [
  { name: 'Python', url: '/?lang=python3', blog: '/blog-python.html' },
  { name: 'Java', url: '/?lang=java', blog: '/blog-java.html' },
  { name: 'JavaScript', url: '/?lang=nodejs', blog: '/blog-javascript.html' },
  { name: 'C', url: '/?lang=c', blog: '/blog-c.html' },
  { name: 'C++', url: '/?lang=cpp17', blog: '/blog-cpp.html' },
  { name: 'C#', url: '/?lang=csharp', blog: '/blog-csharp.html' },
  { name: 'Go', url: '/?lang=go', blog: '/blog-go.html' },
  { name: 'Rust', url: '/?lang=rust', blog: '/blog-rust.html' },
  { name: 'PHP', url: '/?lang=php', blog: '/blog-php.html' },
  { name: 'Ruby', url: '/?lang=ruby', blog: '/blog-ruby.html' },
]

const TUTORIAL_GROUPS = [
  {
    title: 'Core Languages',
    items: [
      { name: 'Python', url: '/blog-python.html' },
      { name: 'Java', url: '/blog-java.html' },
      { name: 'JavaScript', url: '/blog-javascript.html' },
      { name: 'C', url: '/blog-c.html' },
      { name: 'C++', url: '/blog-cpp.html' },
      { name: 'C#', url: '/blog-csharp.html' },
      { name: 'Go', url: '/blog-go.html' },
      { name: 'Rust', url: '/blog-rust.html' },
      { name: 'PHP', url: '/blog-php.html' },
      { name: 'Ruby', url: '/blog-ruby.html' },
    ],
  },
  {
    title: 'Web & Frameworks',
    items: [
      { name: 'HTML', url: '/blog-html.html' },
      { name: 'CSS', url: '/blog-css.html' },
      { name: 'React', url: '/blog-react.html' },
      { name: 'Angular', url: '/blog-angular.html' },
      { name: 'Vue.js', url: '/blog-vue.html' },
      { name: 'Next.js', url: '/blog-nextjs.html' },
      { name: 'Node.js', url: '/blog-nodejs.html' },
      { name: 'Express.js', url: '/blog-express.html' },
      { name: 'Django', url: '/blog-django.html' },
      { name: 'Flask', url: '/blog-flask.html' },
      { name: 'Spring Boot', url: '/blog-spring-boot.html' },
    ],
  },
  {
    title: 'Databases & APIs',
    items: [
      { name: 'MySQL', url: '/blog-mysql.html' },
      { name: 'MongoDB', url: '/blog-mongodb.html' },
      { name: 'REST API', url: '/blog-rest-api.html' },
      { name: 'GraphQL', url: '/blog-graphql.html' },
    ],
  },
  {
    title: 'Version Control',
    items: [
      { name: 'Git & GitHub', url: '/blog-git.html' },
    ],
  },
]

const STATIC_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features.html' },
  { name: 'About', href: '/about.html' },
  { name: 'Contact', href: '/contact.html' },
  { name: 'Privacy', href: '/privacy-policy.html' },
]

function langBlogSlug(langId) {
  if (langId === 'python3') return 'python'
  if (langId === 'nodejs') return 'javascript'
  if (langId === 'cpp17') return 'cpp'
  return langId
}

export default function AppTopnav({ theme, setTheme, goHome, view, lang }) {
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const toggleMenu = (name) => {
    setOpenMenu(prev => (prev === name ? null : name))
  }

  const activeLangSlug = lang ? langBlogSlug(lang.id) : null

  return (
    <header className={`app-topnav${mobileOpen ? ' app-topnav--mobile-open' : ''}`} ref={navRef}>
      <div className="app-topnav-inner">
        <div
          className="app-topnav-brand"
          onClick={goHome}
          onKeyDown={e => e.key === 'Enter' && goHome()}
          role="button"
          tabIndex={0}
          aria-label="Go to homepage"
        >
          <img src="/logo-nav.png" alt="Compiler logo" />
          <div className="app-topnav-brand-text">
            <span className="app-topnav-brand-name"> Our Compiler</span>
          </div>
        </div>

        <nav className="app-topnav-desktop" aria-label="Main navigation">
          <a href="/" className={`app-topnav-link${view === 'home' ? ' active' : ''}`}>Home</a>

          <div className={`app-topnav-dropdown${openMenu === 'compiler' ? ' open' : ''}`}>
            <button
              type="button"
              className={`app-topnav-link app-topnav-trigger${view === 'compiler' ? ' active' : ''}`}
              onClick={() => toggleMenu('compiler')}
              aria-expanded={openMenu === 'compiler'}
            >
              Online Compiler
              <svg className="app-topnav-chevron" viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
                <path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <div className="app-topnav-panel app-topnav-panel--compiler">
              <p className="app-topnav-panel-title">Run Code Instantly</p>
              <div className="app-topnav-compiler-grid">
                {COMPILER_LANGS.map(item => (
                  <a
                    key={item.name}
                    href={item.url}
                    className={`app-topnav-compiler-item${activeLangSlug && item.blog.includes(activeLangSlug) ? ' active' : ''}`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className={`app-topnav-dropdown${openMenu === 'tutorials' ? ' open' : ''}`}>
            <button
              type="button"
              className="app-topnav-link app-topnav-trigger"
              onClick={() => toggleMenu('tutorials')}
              aria-expanded={openMenu === 'tutorials'}
            >
              Tutorials
              <svg className="app-topnav-chevron" viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
                <path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <div className="app-topnav-panel app-topnav-panel--mega">
              <div className="app-topnav-mega-grid">
                {TUTORIAL_GROUPS.map(group => (
                  <div key={group.title} className="app-topnav-mega-col">
                    <p className="app-topnav-mega-title">{group.title}</p>
                    {group.items.map(item => (
                      <a key={item.name} href={item.url} className="app-topnav-mega-link">
                        {item.name}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
              <a href="/blog.html" className="app-topnav-mega-footer">
                View All Tutorials →
              </a>
            </div>
          </div>

          {STATIC_LINKS.filter(l => l.name !== 'Home').map(link => (
            <a key={link.name} href={link.href} className="app-topnav-link">
              {link.name}
            </a>
          ))}
        </nav>

        <div className="app-topnav-actions">
          <a href="/?lang=python3" className="app-topnav-cta">▶ Start Coding</a>
          <button
            type="button"
            onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
            className="app-topnav-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            type="button"
            className="app-topnav-hamburger"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className="app-topnav-mobile">
          <a href="/" className="app-topnav-mobile-link" onClick={() => setMobileOpen(false)}>Home</a>
          <p className="app-topnav-mobile-heading">Online Compiler</p>
          <div className="app-topnav-mobile-grid">
            {COMPILER_LANGS.map(item => (
              <a key={item.name} href={item.url} className="app-topnav-mobile-chip" onClick={() => setMobileOpen(false)}>
                {item.name}
              </a>
            ))}
          </div>
          <a href="/blog.html" className="app-topnav-mobile-link" onClick={() => setMobileOpen(false)}>All Tutorials</a>
          {STATIC_LINKS.filter(l => l.name !== 'Home').map(link => (
            <a key={link.name} href={link.href} className="app-topnav-mobile-link" onClick={() => setMobileOpen(false)}>
              {link.name}
            </a>
          ))}
          <a href="/?lang=python3" className="app-topnav-mobile-cta" onClick={() => setMobileOpen(false)}>▶ Start Coding</a>
        </div>
    </header>
  )
}
