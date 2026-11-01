const { buildSidebar } = require('./csharp_curriculum_data');
const sb = buildSidebar(9);
console.log('Sidebar starts with:');
console.log(sb.substring(0, 150));
console.log('Sidebar ends with:');
console.log(sb.substring(sb.length - 150));

