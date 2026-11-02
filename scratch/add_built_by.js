const fs = require('fs');
const path = require('path');

// 1. Update src/App.jsx
const appPath = path.join(__dirname, '..', 'src', 'App.jsx');
let appContent = fs.readFileSync(appPath, 'utf8');

const targetApp = `        {/* Balanju banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(108,61,232,0.2) 0%, rgba(88,166,255,0.12) 100%)',
          borderBottom: '1px solid rgba(108,61,232,0.25)',
          padding: '14px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px'
        }}>
          
          <a href="https://balanju-solutions.vercel.app/"`;

const replApp = `        {/* Balanju banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(108,61,232,0.2) 0%, rgba(88,166,255,0.12) 100%)',
          borderBottom: '1px solid rgba(108,61,232,0.25)',
          padding: '14px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px'
        }}>
          <span style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Built by</span>
          <a href="https://balanju-solutions.vercel.app/"`;

appContent = appContent.replace(targetApp, replApp);
fs.writeFileSync(appPath, appContent, 'utf8');
console.log("Added 'Built by' to src/App.jsx!");

// 2. Update public/site-footer.js
const footerJsPath = path.join(__dirname, '..', 'public', 'site-footer.js');
let footerJs = fs.readFileSync(footerJsPath, 'utf8');

footerJs = footerJs.replace(
  `    '<div class="footer-banner">' +
      
      '<a href="https://balanju-solutions.vercel.app/"`,
  `    '<div class="footer-banner">' +
      '<span class="banner-title">Built by</span>' +
      '<a href="https://balanju-solutions.vercel.app/"`
);
fs.writeFileSync(footerJsPath, footerJs, 'utf8');
console.log("Added 'Built by' to public/site-footer.js!");

// 3. Update public/blog.html
const blogHtmlPath = path.join(__dirname, '..', 'public', 'blog.html');
if (fs.existsSync(blogHtmlPath)) {
  let blogHtml = fs.readFileSync(blogHtmlPath, 'utf8');
  blogHtml = blogHtml.replace(
    `    <div class="footer-banner">
      
      <a href="https://balanju-solutions.vercel.app/"`,
    `    <div class="footer-banner">
      <span class="banner-title">Built by</span>
      <a href="https://balanju-solutions.vercel.app/"`
  );
  fs.writeFileSync(blogHtmlPath, blogHtml, 'utf8');
  console.log("Added 'Built by' to public/blog.html!");
}
