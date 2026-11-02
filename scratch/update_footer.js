const fs = require('fs');
const path = require('path');

const footerPath = path.join(__dirname, '..', 'public', 'site-footer.js');
let s = fs.readFileSync(footerPath, 'utf8');

const target1 = "<li><a href=\"/terms-of-service.html\">📜 Terms of Service</a></li>";
const repl1 = "<li><a href=\"/terms-of-service.html\">📜 Terms of Service</a></li>' +\n            '<li><a href=\"/disclaimer.html\">⚖️ Disclaimer</a></li>";

if (s.includes("<li><a href=\"/disclaimer.html\">⚖️ Disclaimer</a></li>")) {
  console.log("Already has disclaimer in list!");
} else {
  s = s.replace(target1, target1 + "' +\r\n            '<li><a href=\"/disclaimer.html\">⚖️ Disclaimer</a></li>");
}

const target2 = "<a href=\"/terms-of-service.html\">Terms</a>' +\r\n          '<span class=\"divider\">·</span>";
const repl2 = "<a href=\"/terms-of-service.html\">Terms</a>' +\r\n          '<span class=\"divider\">·</span>' +\r\n          '<a href=\"/disclaimer.html\">Disclaimer</a>' +\r\n          '<span class=\"divider\">·</span>";

if (s.includes("'<a href=\"/disclaimer.html\">Disclaimer</a>'")) {
  console.log("Already has disclaimer in bottom!");
} else {
  s = s.replace(target2, repl2);
}

fs.writeFileSync(footerPath, s, 'utf8');
console.log("Footer updated successfully!");

