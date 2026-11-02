const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'generate_comprehensive_sitemap.js');
let content = fs.readFileSync(scriptPath, 'utf8');

if (!content.includes("'disclaimer.html'")) {
  content = content.replace(
    "'terms-of-service.html',",
    "'terms-of-service.html',\r\n  'disclaimer.html',"
  );
  fs.writeFileSync(scriptPath, content, 'utf8');
  console.log("Added disclaimer.html to scratch/generate_comprehensive_sitemap.js");
} else {
  console.log("disclaimer.html already in scratch/generate_comprehensive_sitemap.js");
}
