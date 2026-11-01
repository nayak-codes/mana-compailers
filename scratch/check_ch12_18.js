const fs = require('fs');
const content = fs.readFileSync('public/blog-csharp.html', 'utf8');

const ch12Idx = content.indexOf('12-csharp-collections-and-generics-list-dict.html');
console.log('Ch 12 slice:');
console.log(content.slice(ch12Idx - 300, ch12Idx + 200));

const ch18Idx = content.indexOf('18-csharp-delegates-events-and-lambdas.html');
console.log('Ch 18 slice:');
console.log(content.slice(ch18Idx - 300, ch18Idx + 200));

