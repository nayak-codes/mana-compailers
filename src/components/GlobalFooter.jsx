import React from 'react'

export default function GlobalFooter({ isMobile = false }) {
  return (
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
        <span style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Built by</span>
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
          <img src="/balanju-logo.jpg" alt="Balanju Solutions" style={{ height: '22px', width: '22px', objectFit: 'contain', borderRadius: '4px' }} />
          <span style={{ fontSize: '13px', fontWeight: '800', color: '#c4b5fd', letterSpacing: '0.2px' }}>Balanju Solutions</span>
          <span style={{ fontSize: '11px', color: 'rgba(196,181,253,0.9)', fontWeight: '700' }}>↗</span>
        </a>
      </div>

      {/* Main grid */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: isMobile ? '40px 16px 24px' : '56px 36px 36px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(240px, 1.3fr) minmax(130px, 1fr) minmax(130px, 1fr) minmax(140px, 1.1fr) minmax(230px, 1.3fr)',
          gap: isMobile ? '32px' : '24px',
          marginBottom: '48px',
          alignItems: 'start'
        }}>

          {/* Col 1 — Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <img src="/logo-nav.png" alt="Our Compiler logo" style={{ height: '36px', width: '36px', objectFit: 'contain', borderRadius: '9px', boxShadow: '0 0 16px rgba(88,166,255,0.4)' }} />
              <span style={{ fontSize: '19px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.3px' }}>Our Compiler</span>
            </div>
            <p style={{ fontSize: '13.5px', color: '#e2e8f0', lineHeight: '1.85', margin: '0 0 14px', maxWidth: '240px' }}>
              Free online code compiler and programming tutorials. Write, compile, and run code in 10+ languages — instantly in your browser. No setup. No login. Always free.
            </p>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 20px' }}>
              📧 <a href="mailto:balanjusolutions@gmail.com" style={{ color: '#58a6ff', textDecoration: 'none' }}>balanjusolutions@gmail.com</a>
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { icon: '𝕏', label: 'Twitter', href: 'https://twitter.com' },
                { icon: '⌨', label: 'GitHub', href: 'https://github.com' },
                { icon: 'in', label: 'LinkedIn', href: 'https://linkedin.com' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
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

          {/* Col 2 — Online Compiler */}
          <div>
            <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#58a6ff', margin: '0 0 18px', borderBottom: '1px solid rgba(88,166,255,0.35)', paddingBottom: '10px' }}>Online Compiler</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {[
                { icon: '🐍', label: 'Python 3', lang: 'python3' },
                { icon: '☕', label: 'Java', lang: 'java' },
                { icon: '🟨', label: 'JavaScript', lang: 'nodejs' },
                { icon: '🔵', label: 'C', lang: 'c' },
                { icon: '⚡', label: 'C++', lang: 'cpp17' },
                { icon: '🔷', label: 'C#', lang: 'csharp' },
                { icon: '🐹', label: 'Go', lang: 'go' },
                { icon: '🦀', label: 'Rust', lang: 'rust' },
                { icon: '🐘', label: 'PHP', lang: 'php' },
                { icon: '💎', label: 'Ruby', lang: 'ruby' },
              ].map(l => (
                <li key={l.lang}>
                  <a href={`/?lang=${l.lang}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.18s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#58a6ff'}
                    onMouseLeave={e => e.currentTarget.style.color = '#cbd5e1'}
                  ><span>{l.icon}</span>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Learn */}
          <div>
            <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#eab308', margin: '0 0 18px', borderBottom: '1px solid rgba(234,179,8,0.35)', paddingBottom: '10px' }}>Learn</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {[
                { href: '/blog.html', label: '📚 All Tutorials' },
                { href: '/blog-python.html', label: 'Python Guide' },
                { href: '/blog-java.html', label: 'Java Guide' },
                { href: '/blog-javascript.html', label: 'JavaScript Guide' },
                { href: '/blog-cpp.html', label: 'C++ Guide' },
                { href: '/blog-c.html', label: 'C Guide' },
                { href: '/blog-html.html', label: 'HTML5 Guide' },
              ].map(l => (
                <li key={l.href}>
                  <a href={l.href}
                    style={{ fontSize: '13px', color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.18s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#eab308'}
                    onMouseLeave={e => e.currentTarget.style.color = '#cbd5e1'}
                  >{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Company & Legal */}
          <div>
            <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#3fb950', margin: '0 0 18px', borderBottom: '1px solid rgba(63,185,80,0.35)', paddingBottom: '10px' }}>Company &amp; Legal</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {[
                { href: '/about.html', label: 'ℹ️ About Us' },
                { href: '/features.html', label: '⚡ Features' },
                { href: '/contact.html', label: '📬 Contact' },
                { href: '/privacy-policy.html', label: '🔒 Privacy Policy' },
                { href: '/terms-of-service.html', label: '📜 Terms of Service' },
                { href: '/disclaimer.html', label: '⚖️ Disclaimer' },
                { href: 'https://balanju-solutions.vercel.app/', label: '🏢 Balanju Solutions', target: '_blank' },
              ].map(l => (
                <li key={l.href}>
                  <a href={l.href} target={l.target || '_self'} rel={l.target ? 'noopener noreferrer' : undefined}
                    style={{ fontSize: '13px', color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.18s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#3fb950'}
                    onMouseLeave={e => e.currentTarget.style.color = '#cbd5e1'}
                  >{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5 — Balanju Solutions Card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(108,61,232,0.18) 0%, rgba(108,61,232,0.06) 100%)',
            border: '1px solid rgba(108,61,232,0.35)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <img src="/balanju-logo.jpg" alt="Balanju Solutions" style={{ height: '26px', width: '26px', objectFit: 'contain', borderRadius: '6px' }} />
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#c4b5fd', letterSpacing: '-0.2px' }}>Balanju Solutions</span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#e9d5ff', lineHeight: '1.75', margin: '0 0 18px' }}>
              Our Compiler is a flagship product of Balanju Solutions — building free developer tools and software for learners worldwide.
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
            >Visit Company →</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.15)',
          paddingTop: '24px', paddingBottom: '32px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12.5px', color: '#cbd5e1' }}>© 2026 Our Compiler · Balanju Solutions. All rights reserved.</span>
            <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.3)' }}>|</span>
            <span style={{ fontSize: '12.5px', color: '#cbd5e1' }}>Made with ❤️ in India</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <a href="/privacy-policy.html" style={{ fontSize: '12.5px', color: '#94a3b8', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color='#fff'} onMouseLeave={e => e.currentTarget.style.color='#94a3b8'}>Privacy</a>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
            <a href="/terms-of-service.html" style={{ fontSize: '12.5px', color: '#94a3b8', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color='#fff'} onMouseLeave={e => e.currentTarget.style.color='#94a3b8'}>Terms</a>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
            <a href="/disclaimer.html" style={{ fontSize: '12.5px', color: '#94a3b8', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color='#fff'} onMouseLeave={e => e.currentTarget.style.color='#94a3b8'}>Disclaimer</a>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
            <a href="/contact.html" style={{ fontSize: '12.5px', color: '#94a3b8', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color='#fff'} onMouseLeave={e => e.currentTarget.style.color='#94a3b8'}>Contact</a>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
            <a href="https://www.ourcompiler.com" style={{ fontSize: '12.5px', color: '#58a6ff', textDecoration: 'none', fontWeight: '600' }}>ourcompiler.com</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
