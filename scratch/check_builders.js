const fs = require('fs');

const scripts = [
  'scratch/build_java_lessons.js',
  'scratch/build_vue_lessons.js', 
  'scratch/build_angular_lessons.js',
  'scratch/build_php_lessons.js',
  'scratch/build_ruby_lessons.js',
  'scratch/build_go_lessons.js',
  'scratch/build_rust_lessons.js',
  'scratch/build_html_lessons.js',
  'scratch/build_css_lessons.js',
  'scratch/build_cpp_lessons.js',
  'scratch/build_csharp_lessons.js',
  'scratch/build_nextjs_lessons.js',
  'scratch/build_javascript_lessons.js',
  'scratch/build_mysql_lessons.js',
  'scratch/build_mongodb_lessons.js',
];

for (const s of scripts) {
  try {
    const content = fs.readFileSync(s, 'utf8');
    const m = content.match(/class="badge">([^<]{1,30})<\/span>/);
    if (m) console.log(s.replace('scratch/', '') + ': ' + JSON.stringify(m[1]));
  } catch(e) {
    console.log(s + ': ERROR ' + e.message);
  }
}
