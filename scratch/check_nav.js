const fs = require('fs');
const py = fs.readFileSync('public/blog-python/01-python-introduction-features-and-setup.html', 'utf8');
const bodyIdx = py.indexOf('<body');
const layoutIdx = py.indexOf('class="layout"');
console.log('--- PYTHON TOP SECTION ---');
console.log(py.substring(bodyIdx, layoutIdx));

const css1 = fs.readFileSync('public/blog-style.css', 'utf8');
console.log('--- CSS topnav rules ---');
const topnavMatches = css1.match(/\.topnav[^{]*\{[^}]*\}/g);
console.log(topnavMatches);

const lightMatches = css1.match(/\.light-theme\s+\.topnav[^{]*\{[^}]*\}/g);
console.log('light topnav matches:', lightMatches);

