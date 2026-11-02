const fs = require('fs');
const s = fs.readFileSync('public/blog-angular/01-what-is-angular.html', 'utf8');
const article = s.match(/<article[\s\S]*?<\/article>/i);
if (article) {
  console.log(article[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 600));
} else {
  console.log('No article tag found');
}

