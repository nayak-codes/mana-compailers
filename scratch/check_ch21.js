const fs = require('fs');
const c21 = fs.readFileSync('public/blog-java/21-java-collections-list-arraylist-linkedlist.html', 'utf8');

console.log('--- Ch 21 wrapper and main ---');
const mainM = c21.match(/<body[\s\S]*?<main[^>]*>/);
console.log(mainM ? mainM[0].replace(/<aside[\s\S]*?<\/aside>/, '<aside>...</aside>') : 'none');

console.log('--- Ch 21 code block sample ---');
const cbM = c21.match(/<div class=\"code-block\"[\s\S]*?<\/pre>/);
console.log(cbM ? cbM[0] : 'none');

