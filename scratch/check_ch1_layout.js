const fs = require('fs');
const c1 = fs.readFileSync('public/blog-java/01-java-introduction-features-and-jvm-architecture.html', 'utf8');
const mainMatch = c1.match(/<main[\s\S]*?>/);
console.log('--- Ch 1 main tag ---');
console.log(mainMatch ? mainMatch[0] : 'none');
const wrapperMatch = c1.match(/<div class=\"layout\"[\s\S]*?>/) || c1.match(/<body[\s\S]*?<aside/);
console.log('--- Ch 1 body/wrapper ---');
console.log(wrapperMatch ? wrapperMatch[0] : 'none');

