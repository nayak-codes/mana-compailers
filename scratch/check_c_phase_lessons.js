const fs = require('fs');
const content = fs.readFileSync('scratch/c_curriculum_data.js', 'utf8');

const idx = content.indexOf('phaseLessons.forEach');
console.log(content.slice(idx, idx + 600));

