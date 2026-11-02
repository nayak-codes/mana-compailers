const fs = require('fs');
const c21 = fs.readFileSync('public/blog-java/21-java-collections-list-arraylist-linkedlist.html', 'utf8');

const headIdx = c21.indexOf('<head>');
const bodyIdx = c21.indexOf('<body');
console.log(c21.slice(headIdx, bodyIdx));

