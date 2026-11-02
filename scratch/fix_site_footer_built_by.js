const fs = require('fs');
const path = require('path');

// Update public/site-footer.js
const footerJsPath = path.join(__dirname, '..', 'public', 'site-footer.js');
let footerJs = fs.readFileSync(footerJsPath, 'utf8');

footerJs = footerJs.replace(
  `'<div class="footer-banner">' +\r\n      \r\n      '<a href="https://balanju-solutions.vercel.app/"`,
  `'<div class="footer-banner">' +\r\n      '<span class="banner-title">Built by</span>' +\r\n      '<a href="https://balanju-solutions.vercel.app/"`
);

if (!footerJs.includes("Built by")) {
  footerJs = footerJs.replace(
    `'<div class="footer-banner">' +\n      \n      '<a href="https://balanju-solutions.vercel.app/"`,
    `'<div class="footer-banner">' +\n      '<span class="banner-title">Built by</span>' +\n      '<a href="https://balanju-solutions.vercel.app/"`
  );
}

fs.writeFileSync(footerJsPath, footerJs, 'utf8');
console.log("Updated site-footer.js, includes Built by:", footerJs.includes("Built by"));

// Update public/blog.html
const blogHtmlPath = path.join(__dirname, '..', 'public', 'blog.html');
let blogHtml = fs.readFileSync(blogHtmlPath, 'utf8');

blogHtml = blogHtml.replace(
  `<div class="footer-banner">\r\n      \r\n      <a href="https://balanju-solutions.vercel.app/"`,
  `<div class="footer-banner">\r\n      <span class="banner-title">Built by</span>\r\n      <a href="https://balanju-solutions.vercel.app/"`
);

if (!blogHtml.includes("<span class=\"banner-title\">Built by</span>")) {
  blogHtml = blogHtml.replace(
    `<div class="footer-banner">\n      \n      <a href="https://balanju-solutions.vercel.app/"`,
    `<div class="footer-banner">\n      <span class="banner-title">Built by</span>\n      <a href="https://balanju-solutions.vercel.app/"`
  );
}

fs.writeFileSync(blogHtmlPath, blogHtml, 'utf8');
console.log("Updated blog.html, includes Built by:", blogHtml.includes("Built by"));
