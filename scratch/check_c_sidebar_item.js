const fs = require('fs');
const content = fs.readFileSync('scratch/c_curriculum_data.js', 'utf8');

const idx = content.indexOf('<li class="lesson-item');
console.log(content.slice(idx, idx + 400));

