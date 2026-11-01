const fs = require('fs');
const app = fs.readFileSync('src/App.jsx', 'utf8');
const match = app.match(/\{[^}]*csharp[^}]*\}/i);
console.log(match ? match[0] : 'not found');

