const fs = require('fs');
const path = require('path');

// 1. Update src/App.jsx
const appPath = path.join(__dirname, '..', 'src', 'App.jsx');
let appContent = fs.readFileSync(appPath, 'utf8');

// Replace maxWidth: '1200px' in footer container
appContent = appContent.replace(
  "        {/* Main grid */}\r\n        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 40px 40px' }}>\r\n          <div style={{\r\n            display: 'grid',\r\n            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',\r\n            gap: '36px',\r\n            marginBottom: '56px'\r\n          }}>",
  "        {/* Main grid */}\r\n        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: isMobile ? '40px 16px 24px' : '56px 36px 36px' }}>\r\n          <div style={{\r\n            display: 'grid',\r\n            gridTemplateColumns: isMobile ? '1fr' : 'minmax(240px, 1.3fr) minmax(130px, 1fr) minmax(130px, 1fr) minmax(140px, 1.1fr) minmax(230px, 1.3fr)',\r\n            gap: isMobile ? '32px' : '24px',\r\n            marginBottom: '48px',\r\n            alignItems: 'start'\r\n          }}>"
);

// If CRLF vs LF had differences, fallback:
if (!appContent.includes("minmax(240px, 1.3fr)")) {
  const targetRegex = /{\/\* Main grid \*\/}[\s\S]*?<div style={{\s*maxWidth: '1200px'[\s\S]*?gridTemplateColumns: 'repeat\(auto-fit, minmax\(200px, 1fr\)\)',[\s\S]*?gap: '36px',[\s\S]*?marginBottom: '56px'\s*}}>/;
  appContent = appContent.replace(targetRegex, `{/* Main grid */}
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: isMobile ? '40px 16px 24px' : '56px 36px 36px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'minmax(240px, 1.3fr) minmax(130px, 1fr) minmax(130px, 1fr) minmax(140px, 1.1fr) minmax(230px, 1.3fr)',
            gap: isMobile ? '32px' : '24px',
            marginBottom: '48px',
            alignItems: 'start'
          }}>`);
}

fs.writeFileSync(appPath, appContent, 'utf8');
console.log("Updated src/App.jsx footer grid to single row!");

// 2. Update public/pages.css
const cssPath = path.join(__dirname, '..', 'public', 'pages.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

cssContent = cssContent.replace(
  `.footer-grid-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 24px 40px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 40px;
  margin-bottom: 56px;
}`,
  `.footer-grid-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 56px 36px 36px;
}

.footer-grid {
  display: grid;
  grid-template-columns: minmax(240px, 1.3fr) minmax(130px, 1fr) minmax(130px, 1fr) minmax(140px, 1.1fr) minmax(230px, 1.3fr);
  gap: 24px;
  margin-bottom: 48px;
  align-items: start;
}

@media (max-width: 992px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}`
);

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log("Updated public/pages.css footer grid to single row!");

