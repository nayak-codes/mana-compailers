const fs = require('fs');
const content = fs.readFileSync('public/blog-csharp.html', 'utf8');

// The items have:
// <div style="font-weight:700; font-size:15px; color:var(--text); margin-bottom:4px;">\s*(\d+)\.\s*([^<]+)<\/div>
// <div style="font-size:12.5px; color:var(--text2); line-height:1.5;">\s*([^<]+)<\/div>
// <a href="/blog-csharp/([^"]+)"

const itemRegex = /<div style="font-weight:700; font-size:15px; color:var\(--text\); margin-bottom:4px;">\s*(\d+)\.\s*([^<]+)<\/div>\s*<div style="font-size:12.5px; color:var\(--text2\); line-height:1.5;">\s*([^<]+)<\/div>[\s\S]*?<a href="\/blog-csharp\/([^"]+)"/g;

let match;
let lessons = [];
while ((match = itemRegex.exec(content)) !== null) {
  const num = parseInt(match[1]);
  const title = match[2].trim();
  const subtopics = match[3].trim();
  const file = match[4].trim();

  let phase = Math.ceil(num / 4);
  let phaseTag = `Phase 0${phase}`;
  let phaseTitle = '';
  if (phase === 1) phaseTitle = 'C# ఫండమెంటల్స్ & బేసిక్స్';
  else if (phase === 2) phaseTitle = 'కంట్రోల్ ఫ్లో, లూప్స్ & ప్యాటర్న్ మ్యాచింగ్';
  else if (phase === 3) phaseTitle = 'మెథడ్స్, స్ట్రింగ్స్ & కలెక్షన్స్';
  else if (phase === 4) phaseTitle = 'ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్ (OOP)';
  else if (phase === 5) phaseTitle = 'అడ్వాన్స్‌డ్ C#, LINQ & ప్రాజెక్ట్';

  lessons.push({
    num,
    id: num < 10 ? `0${num}` : `${num}`,
    phase,
    phaseTag,
    phaseTitle,
    file,
    title,
    subtopics
  });
}

console.log('Total parsed lessons from main:', lessons.length);
lessons.forEach(l => {
  console.log(`[Ch ${l.id}] ${l.file}`);
  console.log(`     Title: ${l.title}`);
  console.log(`     Subtopics: ${l.subtopics}`);
});

