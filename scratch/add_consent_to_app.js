const fs = require('fs');

let c = fs.readFileSync('src/App.jsx', 'utf8');

const stateCode = `
  const [cookieConsent, setCookieConsent] = useState(() => {
    try {
      return !!localStorage.getItem('ourcompiler_cookie_consent')
    } catch (e) {
      return true
    }
  })

  const handleConsent = (type) => {
    try {
      localStorage.setItem('ourcompiler_cookie_consent', type)
    } catch (e) {}
    setCookieConsent(true)
  }
`;

if (!c.includes('cookieConsent')) {
  c = c.replace("const toggleHideErrorHint = (hide) => {", stateCode + "\n  const toggleHideErrorHint = (hide) => {");
}

const bannerJSX = `
      {!cookieConsent && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          left: '20px',
          maxWidth: '520px',
          margin: '0 auto',
          background: 'rgba(13, 17, 23, 0.96)',
          color: '#e6edf3',
          border: '1px solid rgba(88, 166, 255, 0.4)',
          borderRadius: '12px',
          padding: '18px 22px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.7)',
          zIndex: 999999,
          fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
          fontSize: '13px',
          lineHeight: '1.5',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '14px', color: '#58a6ff' }}>
              <span>🍪 Privacy &amp; Cookie Consent</span>
            </div>
          </div>
          <div style={{ color: '#8b949e', fontSize: '13px' }}>
            We use essential cookies and trusted analytics to ensure you get the best code editing and compilation experience. By continuing to use Our Compiler, you agree to our <a href="/privacy-policy.html" style={{ color: '#58a6ff', textDecoration: 'underline' }}>Privacy Policy</a> and <a href="/terms-of-service.html" style={{ color: '#58a6ff', textDecoration: 'underline' }}>Terms of Service</a>.
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', alignItems: 'center', marginTop: '4px' }}>
            <button
              onClick={() => handleConsent('essential')}
              style={{ background: 'transparent', border: '1px solid #30363d', color: '#c9d1d9', borderRadius: '6px', padding: '6px 14px', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}
            >
              Essential Only
            </button>
            <button
              onClick={() => handleConsent('accepted')}
              style={{ background: '#238636', border: '1px solid rgba(240, 246, 252, 0.1)', color: '#fff', borderRadius: '6px', padding: '6px 18px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
            >
              Accept All
            </button>
          </div>
        </div>
      )}
`;

if (!c.includes('!cookieConsent && (')) {
  const target = '      </footer>\r\n    </div>';
  const targetLF = '      </footer>\n    </div>';
  if (c.includes(target)) {
    c = c.replace(target, '      </footer>\r\n' + bannerJSX + '\r\n    </div>');
  } else if (c.includes(targetLF)) {
    c = c.replace(targetLF, '      </footer>\n' + bannerJSX + '\n    </div>');
  }
}

fs.writeFileSync('src/App.jsx', c, 'utf8');
console.log('Successfully updated src/App.jsx with Cookie Consent!');

