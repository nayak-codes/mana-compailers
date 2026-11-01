const fs = require('fs');
const c16 = fs.readFileSync('public/blog-c/16-c-pointers-with-arrays-and-double-pointers.html', 'utf8');
const c17 = fs.readFileSync('public/blog-c/17-c-structures-unions-and-typedef.html', 'utf8');
const c18 = fs.readFileSync('public/blog-c/18-c-dynamic-memory-allocation-malloc-calloc-realloc-free.html', 'utf8');

console.log('C16 code wrappers:', c16.match(/<div class="[^"]*code[^"]*"/g));
console.log('C17 code wrappers:', c17.match(/<div class="[^"]*code[^"]*"/g));
console.log('C18 code wrappers:', c18.match(/<div class="[^"]*code[^"]*"/g));
