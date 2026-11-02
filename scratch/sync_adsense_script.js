const fs = require('fs');
const path = require('path');

const SCRIPT_TAG = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7028247458903242" crossorigin="anonymous"></script>';

// 1. Update index.html
const indexPath = path.join(__dirname, '..', 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Replace lazy loader
const lazyBlockRegex = /<!-- Google AdSense - Lazy Loaded to prevent blocking page load -->[\s\S]*?<\/script>/;
if (lazyBlockRegex.test(indexContent)) {
  indexContent = indexContent.replace(lazyBlockRegex, '<!-- Google AdSense Official Script -->\r\n  ' + SCRIPT_TAG);
  console.log('Replaced lazy loader in index.html with static script tag');
}

fs.writeFileSync(indexPath, indexContent, 'utf8');

// 2. Scan public/ and ensure SCRIPT_TAG is in <head> for every html file
function scan(dir) {
  let res = [];
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) res = res.concat(scan(p));
    else if (f.endsWith('.html')) res.push(p);
  });
  return res;
}

const files = scan(path.join(__dirname, '..', 'public'));
let updatedCount = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('pagead2.googlesyndication.com')) {
    // Already has script tag
    return;
  }
  
  if (content.includes('<meta name="google-adsense-account" content="ca-pub-7028247458903242" />')) {
    content = content.replace(
      '<meta name="google-adsense-account" content="ca-pub-7028247458903242" />',
      '<meta name="google-adsense-account" content="ca-pub-7028247458903242" />\n  ' + SCRIPT_TAG
    );
    fs.writeFileSync(f, content, 'utf8');
    updatedCount++;
  } else if (content.includes('<meta name="google-adsense-account" content="ca-pub-7028247458903242">')) {
    content = content.replace(
      '<meta name="google-adsense-account" content="ca-pub-7028247458903242">',
      '<meta name="google-adsense-account" content="ca-pub-7028247458903242">\n  ' + SCRIPT_TAG
    );
    fs.writeFileSync(f, content, 'utf8');
    updatedCount++;
  } else if (content.includes('</head>')) {
    content = content.replace(
      '</head>',
      '  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />\n  ' + SCRIPT_TAG + '\n</head>'
    );
    fs.writeFileSync(f, content, 'utf8');
    updatedCount++;
  }
});

console.log(`Updated AdSense script tag in ${updatedCount} files.`);
