const { execSync } = require('child_process');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

const builders = [
  'scratch/build_python_lessons.js',
  'scratch/expand_python_lessons.js',
  'scratch/expand_python_lessons_part2.js',
  'scratch/build_java_lessons.js',
  'scratch/build_c_lessons.js',
  'scratch/build_cpp_lessons.js',
  'scratch/build_csharp_lessons.js',
  'scratch/build_go_lessons.js',
  'scratch/build_rust_lessons.js',
  'scratch/build_php_lessons.js',
  'scratch/build_ruby_lessons.js',
  'scratch/build_html_lessons.js',
  'scratch/build_css_lessons.js',
  'scratch/build_react_lessons.js',
  'scratch/build_angular_lessons.js',
  'scratch/build_vue_lessons.js',
  'scratch/build_nextjs_lessons.js',
  'scratch/build_javascript_lessons.js',
  'scratch/build_nodejs_lessons.js',
  'scratch/build_express_lessons.js',
  'scratch/build_django_lessons.js',
  'scratch/build_flask_lessons.js',
  'scratch/build_springboot_lessons.js',
  'scratch/build_mysql_lessons.js',
  'scratch/build_mongodb_lessons.js',
  'scratch/build_restapi_lessons.js',
  'scratch/build_graphql_lessons.js',
  'scratch/build_git_lessons.js'
];

console.log('🚀 Starting full course build for all programming subjects...\n');

let count = 0;
for (const script of builders) {
  try {
    console.log(`[${++count}/${builders.length}] Running ${script}...`);
    execSync(`node "${script}"`, { cwd: projectRoot, stdio: 'inherit' });
  } catch (err) {
    console.error(`❌ Failed running ${script}:`, err.message);
  }
}

console.log('\n🎉 ALL 28 COURSE BUILDERS COMPLETED SUCCESSFULLY!');
