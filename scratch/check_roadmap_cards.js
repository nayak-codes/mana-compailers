const fs = require('fs');
const content = fs.readFileSync('public/blog-csharp.html', 'utf8');

const roadmapCards = content.match(/<div class="phase-roadmap-card">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g) || [];
console.log('Roadmap cards count:', roadmapCards.length);

const lessonItems = content.match(/<li class="lesson-item[\s\S]*?<\/li>/g) || [];
console.log('Lesson items count:', lessonItems.length);
if (lessonItems.length > 0) {
  console.log('Sample lesson item 1:');
  console.log(lessonItems[0]);
}

