const fs = require('fs');

for (let i = 1; i <= 10; i++) {
  const path = `scratch/java_phase${i}_data.js`;
  if (fs.existsSync(path)) {
    let content = fs.readFileSync(path, 'utf8');
    
    // Remove lines starting with digit(s) followed by a colon and space
    // e.g. "130:     " becomes "    "
    // To do this safely, we match ^\d+:\s and replace it with just the spaces if we want, but wait, 
    // the line numbers were added at the very start of the line.
    
    let lines = content.split('\n');
    let fixed = false;
    for (let j = 0; j < lines.length; j++) {
      let match = lines[j].match(/^(\d+:\s)/);
      if (match) {
        lines[j] = lines[j].substring(match[0].length);
        fixed = true;
      }
    }
    
    if (fixed) {
      fs.writeFileSync(path, lines.join('\n'), 'utf8');
      console.log(`Fixed ${path}`);
    } else {
      console.log(`${path} was already clean`);
    }
  }
}
