const fs = require('fs');
const path = require('path');

// 1. Update src/App.jsx
const appPath = path.join(__dirname, '..', 'src', 'App.jsx');
let appContent = fs.readFileSync(appPath, 'utf8');

// Remove <span ...>Proudly built by</span>
appContent = appContent.replace(
  `<span style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Proudly built by</span>`,
  ''
);

// Replace 🔷 in banner badge
appContent = appContent.replace(
  `<span style={{ fontSize: '15px' }}>🔷</span>`,
  `<img src="/balanju-logo.jpg" alt="Balanju Solutions" style={{ height: '22px', width: '22px', objectFit: 'contain', borderRadius: '4px' }} />`
);

// Replace 🔷 in card
appContent = appContent.replace(
  `<span style={{ fontSize: '18px' }}>🔷</span>`,
  `<img src="/balanju-logo.jpg" alt="Balanju Solutions" style={{ height: '26px', width: '26px', objectFit: 'contain', borderRadius: '6px' }} />`
);

// Replace 🔷 in bottom bar
appContent = appContent.replace(
  `🔷 Balanju Solutions`,
  `<img src="/balanju-logo.jpg" alt="" style={{ height: '16px', width: '16px', borderRadius: '3px', objectFit: 'contain', verticalAlign: 'middle', marginRight: '6px' }} />Balanju Solutions`
);

fs.writeFileSync(appPath, appContent, 'utf8');
console.log("Updated src/App.jsx with Balanju logo and removed 'Proudly built by'!");

// 2. Update public/site-footer.js
const footerJsPath = path.join(__dirname, '..', 'public', 'site-footer.js');
let footerJs = fs.readFileSync(footerJsPath, 'utf8');

// Remove banner title
footerJs = footerJs.replace(
  `'<span class="banner-title">Proudly built by</span>' +`,
  ''
);

// Replace badge-icon 🔷
footerJs = footerJs.replace(
  `<span class="badge-icon">🔷</span>`,
  `<img src="/balanju-logo.jpg" alt="Balanju Solutions" style="height: 20px; width: 20px; object-fit: contain; border-radius: 4px;" />`
);

// Replace card-header 🔷
footerJs = footerJs.replace(
  `<span>🔷</span>`,
  `<img src="/balanju-logo.jpg" alt="Balanju Solutions" style="height: 22px; width: 22px; object-fit: contain; border-radius: 5px; margin-right: 6px;" />`
);

fs.writeFileSync(footerJsPath, footerJs, 'utf8');
console.log("Updated public/site-footer.js with Balanju logo and removed 'Proudly built by'!");

// 3. Update public/blog.html if it has footer
const blogHtmlPath = path.join(__dirname, '..', 'public', 'blog.html');
if (fs.existsSync(blogHtmlPath)) {
  let blogHtml = fs.readFileSync(blogHtmlPath, 'utf8');
  blogHtml = blogHtml.replace(
    `<span class="banner-title">Proudly built by</span>`,
    ''
  );
  blogHtml = blogHtml.replace(
    `<span class="badge-icon">🔷</span>`,
    `<img src="/balanju-logo.jpg" alt="Balanju Solutions" style="height: 20px; width: 20px; object-fit: contain; border-radius: 4px;" />`
  );
  blogHtml = blogHtml.replace(
    `<span>🔷</span><span class="card-title">Balanju Solutions</span>`,
    `<img src="/balanju-logo.jpg" alt="Balanju Solutions" style="height: 22px; width: 22px; object-fit: contain; border-radius: 5px; margin-right: 6px;" /><span class="card-title">Balanju Solutions</span>`
  );
  fs.writeFileSync(blogHtmlPath, blogHtml, 'utf8');
  console.log("Updated public/blog.html with Balanju logo!");
}

