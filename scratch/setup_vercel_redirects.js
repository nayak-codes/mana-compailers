const fs = require('fs');
const path = require('path');

const vercelPath = path.join(__dirname, '..', 'vercel.json');
const vercel = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));

// Clean URL map for Java chapters
const javaChapterMap = [
  { match: '01-java-java-', target: '/blog-java/01-java-introduction-features-and-jvm-architecture.html' },
  { match: '02-java-java-', target: '/blog-java/02-java-installation-ide-and-first-program.html' },
  { match: '03-java-how-', target: '/blog-java/03-java-syntax-class-structure-and-main-method.html' },
  { match: '04-java-java-', target: '/blog-java/04-java-variables-primitive-data-types-and-memory.html' },
  { match: '05-java-java-', target: '/blog-java/05-java-operators-expressions-and-type-casting.html' },
  { match: '06-java-java-', target: '/blog-java/06-java-conditional-statements-if-else.html' },
  { match: '07-java-java-', target: '/blog-java/07-java-switch-statements-and-switch-expressions.html' },
  { match: '08-java-reference-', target: '/blog-java/08-java-loops-while-for-and-enhanced-foreach.html' },
  { match: '09-java-java-', target: '/blog-java/09-java-strings-memory-pool-and-immutability.html' },
  { match: '10-java-java-', target: '/blog-java/10-java-stringbuilder-stringbuffer-and-methods.html' },
  { match: '11-java-logical-', target: '/blog-java/11-java-arrays-multidimensional-and-algorithms.html' },
  { match: '12-java-java-', target: '/blog-java/12-java-methods-call-stack-and-pass-by-value.html' },
  { match: '13-java-formatted-', target: '/blog-java/13-java-method-overloading-and-varargs.html' },
  { match: '14-java-java-', target: '/blog-java/14-java-oop-classes-objects-and-constructors.html' },
  { match: '15-java-java-', target: '/blog-java/15-java-constructors-this-keyword-and-chaining.html' },
  { match: '16-java-ternary-', target: '/blog-java/16-java-encapsulation-access-modifiers-and-records.html' },
  { match: '17-java-java-', target: '/blog-java/17-java-inheritance-super-keyword-and-object-class.html' },
  { match: '18-java-modern-', target: '/blog-java/18-java-polymorphism-method-overriding-dynamic-binding.html' },
  { match: '19-java-java-', target: '/blog-java/19-java-abstract-classes-and-interfaces.html' },
  { match: '20-java-java-', target: '/blog-java/20-java-exception-handling-and-custom-exceptions.html' },
  { match: '21-java-jump-', target: '/blog-java/21-java-collections-list-arraylist-linkedlist.html' },
  { match: '22-java-java-', target: '/blog-java/22-java-collections-set-and-map-deep-dive.html' },
  { match: '23-java-java-', target: '/blog-java/23-java-generics-and-type-safety.html' },
  { match: '24-java-java-', target: '/blog-java/24-java-lambdas-and-stream-api.html' },
  { match: '25-java-java-', target: '/blog-java/25-java-capstone-project.html' }
];

const newRedirects = [
  vercel.redirects[0] // preserve host redirect
];

javaChapterMap.forEach(item => {
  newRedirects.push({
    source: `/blog-java/${item.match}:slug*`,
    destination: item.target,
    permanent: true
  });
});

// Redirect old chapters 26-70 to main Java guide
newRedirects.push({
  source: '/blog-java/:num(\\d{2})-:slug*',
  destination: '/blog-java.html',
  permanent: false
});

vercel.redirects = newRedirects;
fs.writeFileSync(vercelPath, JSON.stringify(vercel, null, 2), 'utf8');
console.log('Updated vercel.json with Java redirects!');

