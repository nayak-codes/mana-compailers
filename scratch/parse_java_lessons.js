const fs = require('fs');
const path = require('path');

const javaDir = path.join(__dirname, '..', 'public', 'blog-java');
const files = fs.readdirSync(javaDir).filter(f => f.endsWith('.html')).sort();

console.log(`Found ${files.length} java lessons:\n`);

const lessons = files.map((file, idx) => {
  const content = fs.readFileSync(path.join(javaDir, file), 'utf8');
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  const h1Match = content.match(/<h1>([^<]+)<\/h1>/i);
  const introMatch = content.match(/<div class="intro-box">([\s\S]*?)<\/div>/i);
  
  let cleanTitle = titleMatch ? titleMatch[1].replace(/— Java Tutorial \| Our Compiler/g, '').trim() : file;
  let cleanH1 = h1Match ? h1Match[1].replace(/Java — /g, '').trim() : cleanTitle;
  let intro = introMatch ? introMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  return {
    num: idx + 1,
    file,
    title: cleanH1 || cleanTitle,
    desc: descMatch ? descMatch[1] : intro.substring(0, 120) + '...',
    introSummary: intro.substring(0, 140) + '...'
  };
});

console.log(JSON.stringify(lessons, null, 2));
