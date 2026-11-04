const fs = require('fs');

let c = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Remove broken cookieConsent state from App()
c = c.replace(/const \[cookieConsent, setCookieConsent\] = useState\([\s\S]*?setCookieConsent\(true\)\s*\}/, '');

// 2. Remove broken banner from HomePage
c = c.replace(/\{\!cookieConsent && \([\s\S]*?\)\s*\}\s*<\/div>\s*\)\s*\}\s*$/, '    </div>\r\n  )\r\n}\r\n');
if (!c.endsWith('}\r\n') && !c.endsWith('}\n')) {
  // in case regex didn't match exactly due to line endings
  const hpEnd = c.lastIndexOf('</footer>');
  if (hpEnd !== -1) {
    const afterFooter = c.indexOf('</div>', hpEnd);
    if (afterFooter !== -1) {
      // Find the final </div>\r\n  )\r\n}
      const rest = c.slice(afterFooter);
      c = c.slice(0, afterFooter) + '</div>\r\n      </footer>\r\n    </div>\r\n  )\r\n}\r\n';
    }
  }
}

// 3. Define CookieConsent standalone component before HomePage
const cookieConsentComponent = `
function CookieConsent() {
  const [show, setShow] = React.useState(() => {
    try {
      return !localStorage.getItem('ourcompiler_cookie_consent')
    } catch (e) {
      return false
    }
  })

  if (!show) return null

  const handleConsent = (type) => {
    try {
      localStorage.setItem('ourcompiler_cookie_consent', type)
    } catch (e) {}
    setShow(false)
  }

  return (
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
  )
}
`;

if (!c.includes('function CookieConsent()')) {
  c = c.replace('function HomePage(', cookieConsentComponent + '\nfunction HomePage(');
}

// 4. Place <CookieConsent /> inside App() right before closing div
if (!c.includes('<CookieConsent />')) {
  // Find closing of App():
  // It has:
  //           </footer>
  //         </div>
  //       )}
  //     </div>
  //   )
  // }
  c = c.replace(
    /(\s*<\/footer>\s*<\/div>\s*\}\)\s*)(<\/div>\s*\)\s*\}\s*const LANG_ICONS)/,
    '$1  <CookieConsent />\r\n    $2'
  );
}

fs.writeFileSync('src/App.jsx', c, 'utf8');
console.log('Fixed src/App.jsx!');

