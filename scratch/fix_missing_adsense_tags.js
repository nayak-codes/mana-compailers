const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

const allHtml = getFiles('public');
const tag = '  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />\n';

let fixedCount = 0;
allHtml.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('ca-pub-7028247458903242')) {
    if (content.includes('<head>')) {
      content = content.replace('<head>', '<head>\n' + tag);
      fs.writeFileSync(file, content, 'utf8');
      fixedCount++;
    } else if (content.includes('<head ')) {
      content = content.replace(/(<head[^>]*>)/i, '$1\n' + tag);
      fs.writeFileSync(file, content, 'utf8');
      fixedCount++;
    }
  }
});

console.log(`✅ Added AdSense meta tag to ${fixedCount} files.`);
