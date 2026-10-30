const fs = require('fs');

console.log('blog-javascript/style.css exists:', fs.existsSync('public/blog-javascript/style.css'));
console.log('blog-html/style.css exists:', fs.existsSync('public/blog-html/style.css'));

const bJs = fs.readFileSync('public/blog-javascript.html', 'utf8');
const jsLinks = bJs.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/g) || [];
console.log('blog-javascript.html links:', jsLinks);

const bHtml = fs.readFileSync('public/blog-html.html', 'utf8');
const htmlLinks = bHtml.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/g) || [];
console.log('blog-html.html links:', htmlLinks);

// Check primary colors / css variables in bJs and bHtml
const jsStyles = bJs.match(/<style[\s\S]*?<\/style>/g) || [];
console.log('blog-javascript.html inline style count:', jsStyles.length);
if (jsStyles.length > 0) {
  console.log('JS style sample:', jsStyles[0].substring(0, 300));
}

const htmlStyles = bHtml.match(/<style[\s\S]*?<\/style>/g) || [];
console.log('blog-html.html inline style count:', htmlStyles.length);
if (htmlStyles.length > 0) {
  console.log('HTML style sample:', htmlStyles[0].substring(0, 300));
}

