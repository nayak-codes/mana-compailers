const fs = require('fs');
const css = fs.readFileSync('public/blog-c/style.css', 'utf8');

console.log('CSS length:', css.length);
console.log('Has light-theme block:', css.includes('.light-theme') || css.includes('body.light-theme'));
console.log('Sample root vars:', css.substring(0, 500));

