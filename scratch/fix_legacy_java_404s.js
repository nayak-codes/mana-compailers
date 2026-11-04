const fs = require('fs');
const path = require('path');

const javaDir = path.join(__dirname, '..', 'public', 'blog-java');
const vercelPath = path.join(__dirname, '..', 'vercel.json');

// Real 25 chapters
const { LESSONS } = require('./java_curriculum_data.js');
const lessonMap = {};
LESSONS.forEach(l => {
  lessonMap[l.num] = `/blog-java/${l.file}`;
});

// List of all 41 broken legacy links found
const legacyBrokenLinks = [
  '01-java-java-introduction-features-jvm-architecture.html',
  '02-java-java-installation-ides-first-hello-world-program.html',
  '04-java-java-comments-industry-naming-conventions.html',
  '05-java-java-error-types-stack-traces-debugging.html',
  '06-java-java-variables-declaration-memory-allocation.html',
  '07-java-java-8-primitive-data-types-literals.html',
  '09-java-java-type-casting-widening-narrowing-var-keyword.html',
  '10-java-java-arithmetic-assignment-relational-operators.html',
  '12-java-java-user-input-with-scanner-newline-trap.html',
  '14-java-java-basics-user-input-capstone-projects.html',
  '15-java-java-conditional-statements-if-if-else-else-if-nested-if.html',
  '17-java-java-traditional-switch-statement-string-switching.html',
  '19-java-java-for-loop-core-loop-mechanics.html',
  '20-java-java-while-do-while-loops-number-digit-algorithms.html',
  '22-java-java-nested-loops-star-number-pattern-masterclass.html',
  '23-java-java-string-fundamentals-string-constant-pool-scp.html',
  '24-java-java-string-methods-search-extraction-transformation.html',
  '25-java-java-string-comparison-vs-equals-compareto-hashing.html',
  '26-java-java-stringbuilder-stringbuffer-string-formatting-masterclass.html',
  '27-java-java-strings-capstone-projects-5-production-grade-systems.html',
  '28-java-java-array-fundamentals-memory-architecture-traversal.html',
  '29-java-java-array-algorithms-sum-average-min-max-searching.html',
  '30-java-java-array-sorting-copying-java-util-arrays-masterclass.html',
  '31-java-java-multidimensional-jagged-arrays-masterclass.html',
  '32-java-java-arrays-capstone-projects-7-production-grade-systems-limitations.html',
  '33-java-java-method-fundamentals-anatomy-call-stack-execution.html',
  '34-java-java-pass-by-value-mechanics-variable-scope-deep-dive.html',
  '35-java-java-method-overloading-type-promotion-static-vs-instance-methods.html',
  '36-java-java-recursion-call-stack-lifecycle-masterclass.html',
  '37-java-java-methods-capstone-projects-4-production-grade-modular-systems.html',
  '38-java-java-class-object-fundamentals-blueprint-vs-instance.html',
  '39-java-java-constructors-this-keyword-constructor-overloading.html',
  '40-java-java-static-members-nested-classes-enums-masterclass.html',
  '41-java-java-tostring-encapsulation-getters-setters-object-best-practices.html',
  '42-java-java-oop-capstone-projects-4-production-grade-class-systems.html',
  '43-java-java-access-modifiers-public-private-protected-default-explained.html',
  '44-java-java-getters-setters-data-validation-controlled-access.html',
  '45-java-java-immutable-objects-final-keyword-thread-safety.html',
  '46-java-java-good-class-design-packages-access-control-solid-principles.html',
  '47-java-java-encapsulation-capstone-4-production-grade-secure-systems.html'
];

let createdStubs = 0;

legacyBrokenLinks.forEach(legacyName => {
  const numMatch = legacyName.match(/^(\d{2})/);
  const num = numMatch ? parseInt(numMatch[1], 10) : 1;
  const targetUrl = (num <= 25 && lessonMap[num]) ? lessonMap[num] : '/blog-java.html';
  
  const stubHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Redirecting to Java Masterclass...</title>
  <meta http-equiv="refresh" content="0; url=${targetUrl}">
  <link rel="canonical" href="https://www.ourcompiler.com${targetUrl}">
  <script>
    window.location.replace('${targetUrl}');
  </script>
</head>
<body style="background:#0d1117; color:#fff; font-family:sans-serif; text-align:center; padding:100px 20px;">
  <h2>Redirecting to Java Masterclass...</h2>
  <p><a href="${targetUrl}" style="color:#58a6ff;">Click here if not redirected automatically</a></p>
</body>
</html>`;

  fs.writeFileSync(path.join(javaDir, legacyName), stubHtml, 'utf8');
  createdStubs++;
});

console.log(`Created ${createdStubs} HTML redirect stubs in public/blog-java/`);

// Now update vercel.json
const vercel = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));

const redirects = [
  vercel.redirects[0], // preserve host redirect
  {
    "source": "/blog-java/01-java-java-:slug*",
    "destination": "/blog-java/01-java-introduction-features-and-jvm-architecture.html",
    "permanent": true
  },
  {
    "source": "/blog-java/02-java-java-:slug*",
    "destination": "/blog-java/02-java-installation-ide-and-first-program.html",
    "permanent": true
  },
  {
    "source": "/blog-java/03-java-how-:slug*",
    "destination": "/blog-java/03-java-syntax-class-structure-and-main-method.html",
    "permanent": true
  },
  {
    "source": "/blog-java/04-java-java-:slug*",
    "destination": "/blog-java/04-java-variables-primitive-data-types-and-memory.html",
    "permanent": true
  },
  {
    "source": "/blog-java/05-java-java-:slug*",
    "destination": "/blog-java/05-java-operators-expressions-and-type-casting.html",
    "permanent": true
  },
  {
    "source": "/blog-java/:prefix(\\d{2})-java-java-:slug*",
    "destination": "/blog-java.html",
    "permanent": true
  }
];

vercel.redirects = redirects;
fs.writeFileSync(vercelPath, JSON.stringify(vercel, null, 2), 'utf8');
console.log('Updated vercel.json with safe, specific Java redirects!');

