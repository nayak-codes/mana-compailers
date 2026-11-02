const fs = require('fs');
const css = fs.readFileSync('public/blog-java/style.css', 'utf8');
['.code-output-card', '.output-header', '.code-header', '.btn-run'].forEach(sel => {
  const idx = css.indexOf(sel);
  console.log(sel, idx !== -1 ? css.slice(idx, idx + 150) : 'none');
});
