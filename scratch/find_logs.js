const fs = require('fs');
const path = require('path');

const baseDir = 'C:\\Users\\Balaji\\.gemini';

function searchDir(dir) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        // Skip some big system dirs if necessary, but search brain and config
        if (file === 'node_modules' || file === '.git' || file === 'cache') continue;
        searchDir(fullPath);
      } else {
        if (file.endsWith('.jsonl') || file.endsWith('.json') || file.endsWith('.txt')) {
          if (stat.size > 0 && stat.size < 10000000) { // < 10MB
            const content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('blog-php.html') && content.includes('Product')) {
              console.log(`FOUND IN FILE: ${fullPath} (size: ${stat.size})`);
            }
          }
        }
      }
    }
  } catch (err) {
    // Ignore errors
  }
}

searchDir(baseDir);
console.log("Search finished.");
