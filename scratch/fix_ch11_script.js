const fs = require('fs');

let code = fs.readFileSync('scratch/build_cpp_chapter11_deep.js', 'utf8');

// Replace markdown backticks inside HTML section titles and text
code = code.replace(/`\+`/g, '<code>+</code>');
code = code.replace(/`-`/g, '<code>-</code>');
code = code.replace(/`\+\+`/g, '<code>++</code>');
code = code.replace(/`ptrdiff_t`/g, '<code>ptrdiff_t</code>');
code = code.replace(/`\*`/g, '<code>*</code>');
code = code.replace(/`&`/g, '<code>&amp;</code>');
code = code.replace(/`T&`/g, '<code>T&amp;</code>');
code = code.replace(/`nullptr`/g, '<code>nullptr</code>');
code = code.replace(/`NULL`/g, '<code>NULL</code>');
code = code.replace(/`const`/g, '<code>const</code>');
code = code.replace(/`void\*`/g, '<code>void*</code>');

fs.writeFileSync('scratch/build_cpp_chapter11_deep.js', code, 'utf8');
console.log('Replacements done in scratch/build_cpp_chapter11_deep.js');
