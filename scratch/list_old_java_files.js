const fs = require('fs');
const path = require('path');

const javaFiles = fs.readdirSync('public/blog-java').filter(f => f.endsWith('.html'));
console.log('Total files in blog-java:', javaFiles.length);

const { LESSONS } = require('./java_curriculum_data.js');
const activeSet = new Set(LESSONS.map(l => l.file));
activeSet.add('index.html');

const oldFiles = javaFiles.filter(f => !activeSet.has(f));
console.log('Old/Unlinked files count:', oldFiles.length);
console.log(oldFiles);
