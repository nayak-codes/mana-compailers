const fs = require('fs')
const path = require('path')

const publicDir = path.join(__dirname, '..', 'public')

function scanAndFixHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      scanAndFixHtmlFiles(fullPath)
    } else if (entry.isFile() && entry.name.endsWith('.html') && entry.name !== 'index.html') {
      let content = fs.readFileSync(fullPath, 'utf8')
      let changed = false

      // Ensure site-nav.css is linked
      if (!content.includes('site-nav.css')) {
        if (content.includes('</head>')) {
          content = content.replace('</head>', '  <link rel="stylesheet" href="/site-nav.css" />\n</head>')
          changed = true
        }
      }

      // Ensure site-nav.js is loaded
      if (!content.includes('site-nav.js')) {
        if (content.includes('</body>')) {
          content = content.replace('</body>', '  <script src="/site-nav.js" defer></script>\n</body>')
          changed = true
        } else if (content.includes('</head>')) {
          content = content.replace('</head>', '  <script src="/site-nav.js" defer></script>\n</head>')
          changed = true
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8')
        console.log(`Updated ${path.relative(publicDir, fullPath)}`)
      }
    }
  }
}

scanAndFixHtmlFiles(publicDir)
console.log('Finished updating all HTML files with universal site-nav.css and site-nav.js!')
