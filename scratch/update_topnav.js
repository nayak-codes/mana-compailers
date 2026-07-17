/**
 * update_topnav.js
 * Replaces the top navigation bar inside all public blog and tutorial HTML files
 * recursively with a comprehensive scrollable list of 43 technologies.
 */

const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, '..', 'public');

const links = [
  { name: 'Python', url: '/blog-python.html', key: 'python' },
  { name: 'Java', url: '/blog-java.html', key: 'java' },
  { name: 'JavaScript', url: '/blog-javascript.html', key: 'javascript' },
  { name: 'C', url: '/blog-c.html', key: 'c' },
  { name: 'C++', url: '/blog-cpp.html', key: 'cpp' },
  { name: 'C#', url: '/blog-csharp.html', key: 'csharp' },
  { name: 'Go', url: '/blog-go.html', key: 'go' },
  { name: 'Rust', url: '/blog-rust.html', key: 'rust' },
  { name: 'PHP', url: '/blog-php.html', key: 'php' },
  { name: 'Ruby', url: '/blog-ruby.html', key: 'ruby' },
  { name: 'HTML', url: '/blog-html.html', key: 'html' },
  { name: 'CSS', url: '/blog-css.html', key: 'css' },
  { name: 'React', url: '/blog-react.html', key: 'react' },
  { name: 'Angular', url: '/blog-angular.html', key: 'angular' },
  { name: 'Vue.js', url: '/blog-vue.html', key: 'vuejs' },
  { name: 'Next.js', url: '/blog-nextjs.html', key: 'nextjs' },
  { name: 'Node.js', url: '/blog-nodejs.html', key: 'nodejs' },
  { name: 'Express.js', url: '/blog-express.html', key: 'expressjs' },
  { name: 'Django', url: '/blog-django.html', key: 'django' },
  { name: 'Flask', url: '/blog-flask.html', key: 'flask' },
  { name: 'Spring Boot', url: '/blog-spring-boot.html', key: 'springboot' },
  { name: 'MySQL', url: '/blog-mysql.html', key: 'mysql' },
  { name: 'MongoDB', url: '/blog-mongodb.html', key: 'mongodb' },
  { name: 'REST API', url: '/blog-rest-api.html', key: 'restapi' },
  { name: 'GraphQL', url: '/blog-graphql.html', key: 'graphql' },
  { name: 'Git & GitHub', url: '/blog-git.html', key: 'git' },
];


function getFilesRecursively(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allFiles = getFilesRecursively(publicDir);
const blogFiles = allFiles.filter(f => f.endsWith('.html') && !f.endsWith('index.html'));

let count = 0;
for (const fpath of blogFiles) {
  let html = fs.readFileSync(fpath, 'utf8');

  // Detect active key based on path name
  let activeKey = '';
  const lowercasePath = fpath.toLowerCase();
  if (lowercasePath.includes('python')) activeKey = 'python';
  else if (lowercasePath.includes('java') && !lowercasePath.includes('javascript')) activeKey = 'java';
  else if (lowercasePath.includes('javascript')) activeKey = 'javascript';
  else if (lowercasePath.includes('cpp')) activeKey = 'cpp';
  else if (lowercasePath.includes('csharp')) activeKey = 'csharp';
  else if (lowercasePath.includes('blog-c-') || fpath.endsWith('blog-c.html')) activeKey = 'c';
  else if (lowercasePath.includes('rust')) activeKey = 'rust';
  else if (lowercasePath.includes('go')) activeKey = 'go';
  else if (lowercasePath.includes('php')) activeKey = 'php';
  else if (lowercasePath.includes('ruby')) activeKey = 'ruby';
  else if (lowercasePath.includes('blog-html')) activeKey = 'html';
  else if (lowercasePath.includes('blog-css')) activeKey = 'css';
  else if (lowercasePath.includes('blog-react')) activeKey = 'react';
  else if (lowercasePath.includes('blog-angular')) activeKey = 'angular';
  else if (lowercasePath.includes('blog-vue')) activeKey = 'vuejs';
  else if (lowercasePath.includes('blog-nextjs')) activeKey = 'nextjs';
  else if (lowercasePath.includes('blog-nodejs')) activeKey = 'nodejs';
  else if (lowercasePath.includes('blog-rest-api')) activeKey = 'restapi';
  else if (lowercasePath.includes('blog-graphql')) activeKey = 'graphql';
  else if (lowercasePath.includes('blog-spring-boot')) activeKey = 'springboot';
  else if (lowercasePath.includes('blog-django')) activeKey = 'django';
  else if (lowercasePath.includes('blog-flask')) activeKey = 'flask';
  else if (lowercasePath.includes('blog-express')) activeKey = 'expressjs';
  else if (lowercasePath.includes('blog-mysql')) activeKey = 'mysql';
  else if (lowercasePath.includes('blog-mongodb')) activeKey = 'mongodb';
  else if (lowercasePath.includes('blog-rest-api')) activeKey = 'restapi';
  else if (lowercasePath.includes('blog-graphql')) activeKey = 'graphql';
  else if (lowercasePath.includes('blog-git')) activeKey = 'git';

  // Build the .topnav HTML block dynamically
  let topnavHtml = '<nav class="topnav">\n';
  topnavHtml += '  <a href="/" class="brand">🖥️ Our Compiler</a>\n';
  
  for (const link of links) {
    const isActive = activeKey && link.key === activeKey;
    const activeClass = isActive ? ' class="active"' : '';
    
    if (link.url === '#') {
      topnavHtml += `  <a href="#"${activeClass} onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">${link.name}</a>\n`;
    } else {
      topnavHtml += `  <a href="${link.url}"${activeClass}>${link.name}</a>\n`;
    }
  }
  topnavHtml += '</nav>';

  // Replace existing <nav class="topnav"> ... </nav> block
  const navRegex = /<nav\s+class="topnav">[\s\S]*?<\/nav>/i;
  if (navRegex.test(html)) {
    html = html.replace(navRegex, topnavHtml);
    fs.writeFileSync(fpath, html, 'utf8');
    count++;
  }
}

console.log(`🎉 Successfully updated topnav navigation across ${count} HTML files!`);
