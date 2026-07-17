const fs = require('fs');
const scripts = [
  'scratch/build_c_lessons.js',
  'scratch/build_csharp_lessons.js',
  'scratch/build_react_lessons.js',
  'scratch/build_nodejs_lessons.js',
  'scratch/build_express_lessons.js',
  'scratch/build_django_lessons.js',
  'scratch/build_flask_lessons.js',
  'scratch/build_springboot_lessons.js',
  'scratch/build_git_lessons.js',
  'scratch/build_graphql_lessons.js',
  'scratch/build_restapi_lessons.js',
];
for (const s of scripts) {
  try {
    const content = fs.readFileSync(s, 'utf8');
    const matches = [...content.matchAll(/class="badge">([^<]{1,30})<\/span>/g)].slice(0,3);
    if (matches.length) console.log(s.replace('scratch/','') + ': ' + matches.map(m=>JSON.stringify(m[1])).join(', '));
  } catch(e) { console.log(s + ': NOT FOUND'); }
}
