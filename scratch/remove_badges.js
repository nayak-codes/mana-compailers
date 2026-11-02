const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'src', 'App.jsx');
let content = fs.readFileSync(appPath, 'utf8');

// 1. Remove badge from HTML/CSS/JS Editor in LANG_CARDS
content = content.replace(
  "{ id: 'html',     label: 'HTML/CSS/JS Editor',     accentColor: '#E44D26', bgGlow: 'rgba(228,77,38,0.18)', badge: 'Live Preview' },",
  "{ id: 'html',     label: 'HTML/CSS/JS Editor',     accentColor: '#E44D26', bgGlow: 'rgba(228,77,38,0.18)' },"
);

// 2. Remove badge: 'Popular' from Python Tutorial
content = content.replace(
  "{ path: '/blog-python.html',     id: 'python3',  title: 'Python Tutorial',     color: '#3776AB', badge: 'Popular' },",
  "{ path: '/blog-python.html',     id: 'python3',  title: 'Python Tutorial',     color: '#3776AB' },"
);

// 3. Remove badge: 'Live Preview' from HTML/CSS/JS Tutorial
content = content.replace(
  "{ path: '/blog-html.html',       id: 'html',     title: 'HTML/CSS/JS Tutorial',color: '#E44D26', badge: 'Live Preview' },",
  "{ path: '/blog-html.html',       id: 'html',     title: 'HTML/CSS/JS Tutorial',color: '#E44D26' },"
);

// 4. Remove badge: 'Hot' from JavaScript Tutorial
content = content.replace(
  "{ path: '/blog-javascript.html', id: 'nodejs',   title: 'JavaScript Tutorial', color: '#F0DB4F', badge: 'Hot' },",
  "{ path: '/blog-javascript.html', id: 'nodejs',   title: 'JavaScript Tutorial', color: '#F0DB4F' },"
);

fs.writeFileSync(appPath, content, 'utf8');
console.log('Successfully removed badges from App.jsx!');
