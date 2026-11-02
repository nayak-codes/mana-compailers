const fs = require('fs');
const css = fs.readFileSync('public/blog-style.css', 'utf8');

['.code-header', '.file-name', '.btn-copy', '.btn-run', '.output-body', '.code-block-header'].forEach(s => {
  const i = css.indexOf(s);
  console.log(s, i !== -1 ? css.slice(i, i + 100) : 'NOT FOUND IN blog-style.css');
});
