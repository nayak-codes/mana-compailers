const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const blogDir = path.join(publicDir, 'blog-mongodb');
if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

const lessons = [
  { slug: 'intro',                 num: 1,  title: 'Introduction to NoSQL &amp; MongoDB',         filename: 'blog-mongodb/intro.html' },
  { slug: 'installation-setup',     num: 2,  title: 'Installing MongoDB &amp; mongosh Setup',     filename: 'blog-mongodb/installation-setup.html' },
  { slug: 'documents-collections', num: 3,  title: 'BSON Documents &amp; Collections',          filename: 'blog-mongodb/documents-collections.html' },
  { slug: 'crud-insert-find',      num: 4,  title: 'Creating &amp; Finding Documents',          filename: 'blog-mongodb/crud-insert-find.html' },
  { slug: 'operators-filtering',   num: 5,  title: 'Query Operators &amp; Filtering',             filename: 'blog-mongodb/operators-filtering.html' },
  { slug: 'crud-update-delete',    num: 6,  title: 'Updating &amp; Deleting Documents',          filename: 'blog-mongodb/crud-update-delete.html' },
  { slug: 'embedded-documents',    num: 7,  title: 'Embedded Documents &amp; Subdocuments',      filename: 'blog-mongodb/embedded-documents.html' },
  { slug: 'document-references',   num: 8,  title: 'Document References vs Embedding',          filename: 'blog-mongodb/document-references.html' },
  { slug: 'indexes',               num: 9,  title: 'Indexing: Single, Compound &amp; Text',      filename: 'blog-mongodb/indexes.html' },
  { slug: 'aggregation-pipeline',  num: 10, title: 'The Aggregation Pipeline Framework',        filename: 'blog-mongodb/aggregation-pipeline.html' },
  { slug: 'mongoose-schemas',      num: 11, title: 'Mongoose: Schemas &amp; Models in Node.js',  filename: 'blog-mongodb/mongoose-schemas.html' },
  { slug: 'mongoose-middleware',   num: 12, title: 'Mongoose: Middleware, Hooks &amp; Virtuals', filename: 'blog-mongodb/mongoose-middleware.html' },
  { slug: 'transactions',          num: 13, title: 'Multi-Document ACID Transactions',          filename: 'blog-mongodb/transactions.html' },
  { slug: 'backups-restore',        num: 14, title: 'Atlas Backup, mongodump &amp; Restore',      filename: 'blog-mongodb/backups-restore.html' },
  { slug: 'security-deployment',   num: 15, title: 'Atlas Deployment &amp; Security Settings',   filename: 'blog-mongodb/security-deployment.html' }
];

function getSidebar(activeSlug) {
  let h = '\n    <div class="sidebar-heading">MongoDB Tutorial</div>\n';
  h += '    <a href="/blog-mongodb.html"' + (activeSlug === 'home' ? ' class="active"' : '') + '>MongoDB HOME</a>\n';
  lessons.forEach(l => {
    h += '    <a href="/' + l.filename + '"' + (activeSlug === l.slug ? ' class="active"' : '') + '>' + l.num + '. ' + l.title + '</a>\n';
  });
  h += '\n    <div class="sidebar-heading">Related Topics</div>\n';
  h += '    <a href="/blog-nodejs.html">Node.js</a>\n';
  h += '    <a href="/blog-express.html">Express.js</a>\n';
  h += '    <a href="/blog-postgresql.html">PostgreSQL</a>\n';
  h += '    <a href="/blog-mysql.html">MySQL</a>\n';
  h += '    <a href="/blog-redis.html">Redis</a>\n';
  h += '    <a href="/blog.html">All Tutorials</a>\n';
  return h;
}

function wrapPage(slug, title, body, prevFile, prevTitle, nextFile, nextTitle) {
  let nav = '<div class="nav-footer">\n';
  if (prevFile) {
    nav += '      <a href="/' + prevFile + '" class="nav-btn"><span class="label">&#8592; Previous Lesson</span><span class="title">' + prevTitle + '</span></a>\n';
  } else {
    nav += '      <a href="/blog-mongodb.html" class="nav-btn"><span class="label">&#8592; MongoDB Overview</span><span class="title">Course Index</span></a>\n';
  }
  if (nextFile) {
    nav += '      <a href="/' + nextFile + '" class="nav-btn" style="text-align:right;"><span class="label">Next Lesson &#8594;</span><span class="title">' + nextTitle + '</span></a>\n';
  } else {
    nav += '      <a href="/blog.html" class="nav-btn" style="text-align:right;"><span class="label">All Tutorials &#8594;</span><span class="title">Learning Hub</span></a>\n';
  }
  nav += '    </div>';

  const num = slug === 'home' ? 'Index' : lessons.find(x => x.slug === slug).num;

  const topnav =
'  <a href="/blog-python.html">Python</a>\n' +
'  <a href="/blog-java.html">Java</a>\n' +
'  <a href="/blog-javascript.html">JavaScript</a>\n' +
'  <a href="/blog-c.html">C</a>\n' +
'  <a href="/blog-cpp.html">C++</a>\n' +
'  <a href="/blog-csharp.html">C#</a>\n' +
'  <a href="/blog-go.html">Go</a>\n' +
'  <a href="/blog-ruby.html">Ruby</a>\n' +
'  <a href="/blog-rust.html">Rust</a>\n' +
'  <a href="/blog-php.html">PHP</a>\n' +
'  <a href="/blog-html.html">HTML</a>\n' +
'  <a href="/blog-css.html">CSS</a>\n' +
'  <a href="/blog-react.html">React</a>\n' +
'  <a href="/blog-angular.html">Angular</a>\n' +
'  <a href="/blog-vue.html">Vue.js</a>\n' +
'  <a href="/blog-nextjs.html">Next.js</a>\n' +
'  <a href="/blog-nodejs.html">Node.js</a>\n' +
'  <a href="/blog-rest-api.html">REST API</a>\n' +
'  <a href="/blog-graphql.html">GraphQL</a>\n' +
'  <a href="/blog-spring-boot.html">Spring Boot</a>\n' +
'  <a href="/blog-django.html">Django</a>\n' +
'  <a href="/blog-flask.html">Flask</a>\n' +
'  <a href="/blog-express.html">Express.js</a>\n' +
'  <a href="/blog-postgresql.html">PostgreSQL</a>\n' +
'  <a href="/blog-mysql.html">MySQL</a>\n' +
'  <a href="/blog-mongodb.html" class="active">MongoDB</a>\n' +
'  <a href="/blog-sqlite.html">SQLite</a>\n' +
'  <a href="/blog-redis.html">Redis</a>\n' +
'  <a href="/blog-cassandra.html">Cassandra</a>\n' +
'  <a href="/blog-aws.html">AWS</a>\n' +
'  <a href="/blog-azure.html">Azure</a>\n' +
'  <a href="/blog-gcloud.html">Google Cloud</a>\n' +
'  <a href="/blog-docker.html">Docker</a>\n' +
'  <a href="/blog-kubernetes.html">Kubernetes</a>\n' +
'  <a href="/blog-cicd.html">CI/CD</a>\n' +
'  <a href="/blog-data-science.html">Data Science</a>\n' +
'  <a href="/blog-ml.html">Machine Learning</a>\n' +
'  <a href="/blog-deep-learning.html">Deep Learning</a>\n' +
'  <a href="/blog-tensorflow.html">TensorFlow</a>\n' +
'  <a href="/blog-pytorch.html">PyTorch</a>\n' +
'  <a href="/blog-big-data.html">Big Data</a>\n' +
'  <a href="/blog-git.html">Git &amp; GitHub</a>\n' +
'  <a href="/blog-linux.html">Linux</a>\n' +
'  <a href="/blog-shell.html">Shell Scripting</a>\n' +
'  <a href="/blog-testing.html">Testing</a>\n' +
'  <a href="/blog-agile.html">Agile &amp; Scrum</a>\n';

  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n' +
'  <meta charset="UTF-8" />\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
'  <title>' + title + ' | Our Compiler</title>\n' +
'  <meta name="description" content="Learn MongoDB — ' + title + ' with clear BSON examples, Mongoose model structures, aggregation pipelines, and challenges." />\n' +
'  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />\n' +
'  <link rel="icon" type="image/png" href="/logo.png" />\n' +
'  <link rel="preconnect" href="https://fonts.googleapis.com" />\n' +
'  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />\n' +
'  <link rel="stylesheet" href="/blog-style.css" />\n' +
'  <script>\n' +
'    (function(){\n' +
'      var t=localStorage.getItem("theme")||"dark";\n' +
'      if(t==="light"){document.documentElement.classList.add("light-theme");document.addEventListener("DOMContentLoaded",function(){document.body.classList.add("light-theme");});}\n' +
'      window.addEventListener("DOMContentLoaded",function(){\n' +
'        var nav=document.querySelector(".topnav");\n' +
'        if(nav){var btn=document.createElement("button");btn.style.cssText="margin-left:auto;flex-shrink:0;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:6px;padding:4px 10px;font-size:12px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif;transition:all 0.2s;white-space:nowrap;margin-right:12px;";var upd=function(){btn.innerHTML=document.body.classList.contains("light-theme")?"&#127769; Dark":"&#9728;&#65039; Light";};upd();btn.onclick=function(){document.body.classList.toggle("light-theme");document.documentElement.classList.toggle("light-theme");localStorage.setItem("theme",document.body.classList.contains("light-theme")?"light":"dark");upd();};nav.appendChild(btn);}\n' +
'        document.querySelectorAll(".code-block").forEach(function(block){var header=block.querySelector(".code-block-header");var codeEl=block.querySelector("pre code");if(!header||!codeEl)return;var ac=header.querySelector(".code-actions");if(!ac){ac=document.createElement("div");ac.className="code-actions";ac.style.cssText="display:flex;gap:8px;align-items:center;margin-left:auto;";header.appendChild(ac);}var cb=document.createElement("button");cb.innerHTML="&#128203; Copy";cb.style.cssText="background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:6px;padding:4px 10px;font-size:11px;font-weight:600;cursor:pointer;transition:all 0.2s;font-family:Inter,sans-serif;white-space:nowrap;";cb.onclick=function(){navigator.clipboard.writeText(codeEl.textContent).then(function(){cb.innerHTML="&#9989; Copied!";setTimeout(function(){cb.innerHTML="&#128203; Copy";},2000);});};ac.appendChild(cb);});\n' +
'      });\n' +
'    })();\n' +
'  </script>\n' +
'</head>\n' +
'<body class="lang-mongodb">\n' +
'<nav class="topnav">\n' +
'  <a href="/" class="brand">&#128187; Our Compiler</a>\n' +
topnav +
'</nav>\n' +
'<div class="layout">\n' +
'  <aside class="sidebar">' + getSidebar(slug) + '  </aside>\n' +
'  <main class="content">\n' +
'    <div class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/blog.html">Tutorials</a><span>&#8250;</span><a href="/blog-mongodb.html">MongoDB</a><span>&#8250;</span><span>Lesson ' + num + '</span></div>\n' +
'    ' + body + '\n' +
'    ' + nav + '\n' +
'  </main>\n</div>\n</body>\n</html>';
}

// ─── LESSON CONTENTS ─────────────────────────────────────────────────────────
const L = {};

L['intro'] =
'<h1 class="page-title">Introduction to NoSQL &amp; MongoDB</h1>\n' +
'<div class="page-meta"><span class="badge">&#127809; MongoDB</span><span class="badge">Lesson 1</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p><strong>MongoDB</strong> is a source-available, document-oriented database classified as a NoSQL database. It replaces the traditional relational table-based structure with flexible, JSON-like documents (BSON) containing dynamic schemas.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Relational vs Document Databases</div>\n' +
'  <ul>\n' +
'    <li><strong>Tables vs Collections</strong>: In SQL databases, data is stored in tables. In MongoDB, data is stored in Collections of Documents.</li>\n' +
'    <li><strong>Rows vs Documents</strong>: SQL rows are replaced by BSON documents.</li>\n' +
'    <li><strong>Schema Flexibility</strong>: MongoDB documents inside a single collection can contain varying fields or datatypes.</li>\n' +
'    <li><strong>No Complex Joins</strong>: Data is structured hierarchically using nested documents and arrays, eliminating the performance overhead of relational SQL joins.</li>\n' +
'  </ul>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a brief summary explaining how MongoDB handles database schemas compared to traditional relational systems.</div>\n' +
'</div>\n';

L['installation-setup'] =
'<h1 class="page-title">Installing MongoDB &amp; mongosh Setup</h1>\n' +
'<div class="page-meta"><span class="badge">&#127809; MongoDB</span><span class="badge">Lesson 2</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>To use MongoDB locally, you must install the community server and use the MongoDB Shell (<code>mongosh</code>) command line utility.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Running mongosh Commands</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Terminal Access</span></div>\n' +
'    <pre><code># Login to local database server\nmongosh\n\n# List all existing databases\nshow dbs\n\n# Create/Select a database\nuse library\n\n# Show current active database\ndb</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Install MongoDB locally or create a free MongoDB Atlas cloud cluster. Connect to the server using <code>mongosh</code>, and create a database named <code>shop_db</code>.</div>\n' +
'</div>\n';

L['documents-collections'] =
'<h1 class="page-title">BSON Documents &amp; Collections</h1>\n' +
'<div class="page-meta"><span class="badge">&#127809; MongoDB</span><span class="badge">Lesson 3</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>MongoDB stores data records as BSON documents. BSON is a binary serialization of JSON that contains additional data types like ObjectId, Date, and Binary data.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Document Structure Example</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JSON &#8212; Sample Document</span></div>\n' +
'    <pre><code>{\n  "_id": ObjectId("507f1f77bcf86cd799439011"),\n  "username": "balaji",\n  "email": "balaji@test.com",\n  "age": 25,\n  "hobbies": ["coding", "reading"],\n  "address": {\n    "city": "Hyderabad",\n    "country": "India"\n  },\n  "created_at": ISODate("2026-07-13T10:00:00Z")\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a custom JSON document representing an e-commerce product. Include nested properties for product dimensions (width, height, depth) and an array of tags.</div>\n' +
'</div>\n';

L['crud-insert-find'] =
'<h1 class="page-title">Creating &amp; Finding Documents</h1>\n' +
'<div class="page-meta"><span class="badge">&#127809; MongoDB</span><span class="badge">Lesson 4</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>Basic write operations in MongoDB are performed using <code>insertOne</code> and <code>insertMany</code>. Querying documents is done using the <code>find</code> command.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> CRUD Syntax</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Database Queries</span></div>\n' +
'    <pre><code># 1. Insert one document\ndb.users.insertOne({ name: "Balaji", age: 25 });\n\n# 2. Insert multiple documents\ndb.users.insertMany([\n  { name: "Priya", age: 22 },\n  { name: "Vikram", age: 30 }\n]);\n\n# 3. Query all documents\ndb.users.find();\n\n# 4. Filter queries with projection (selecting specific fields)\ndb.users.find({ age: 25 }, { name: 1, _id: 0 });</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write query commands inserting three product documents, and write a <code>find</code> query selecting only products that match a specific category name.</div>\n' +
'</div>\n';

L['operators-filtering'] =
'<h1 class="page-title">Query Operators &amp; Filtering</h1>\n' +
'<div class="page-meta"><span class="badge">&#127809; MongoDB</span><span class="badge">Lesson 5</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>MongoDB query operators enable complex filtering based on numeric ranges, logic conditions, array matching, and regex patterns.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Filtering Operators</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Filter Operators</span></div>\n' +
'    <pre><code># Find users older than 21 ($gt = greater than)\ndb.users.find({ age: { $gt: 21 } });\n\n# Find users matching specific ages ($in)\ndb.users.find({ age: { $in: [18, 21, 25] } });\n\n# Logical AND query matching multiple fields ($and)\ndb.users.find({ \n  $and: [\n    { age: { $gte: 20 } },\n    { age: { $lte: 30 } }\n  ]\n});\n\n# Regular expressions for string pattern search ($regex)\ndb.users.find({ name: { $regex: "^Bal", $options: "i" } });</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Common Operators</div>\n' +
'  <table class="tbl">\n' +
'    <tr><th>Operator</th><th>Meaning</th></tr>\n' +
'    <tr><td><code>$eq</code> / <code>$ne</code></td><td>Equals / Not Equals</td></tr>\n' +
'    <tr><td><code>$gt</code> / <code>$gte</code></td><td>Greater Than / Greater Than or Equal</td></tr>\n' +
'    <tr><td><code>$lt</code> / <code>$lte</code></td><td>Less Than / Less Than or Equal</td></tr>\n' +
'    <tr><td><code>$in</code> / <code>$nin</code></td><td>In Array / Not In Array</td></tr>\n' +
'  </table>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a query finding all products priced between $100 and $500, ordered from lowest to highest price (hint: use <code>.sort({ price: 1 })</code>).</div>\n' +
'</div>\n';

L['crud-update-delete'] =
'<h1 class="page-title">Updating &amp; Deleting Documents</h1>\n' +
'<div class="page-meta"><span class="badge">&#127809; MongoDB</span><span class="badge">Lesson 6</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>Updating and deleting records in MongoDB is managed using structural operators that modify specific fields without replacing entire documents.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Updates &amp; Deletes</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Write Operations</span></div>\n' +
'    <pre><code># Update one field in a matching document ($set)\ndb.users.updateOne(\n  { name: "Balaji" },\n  { $set: { email: "new_email@test.com" } }\n);\n\n# Increment numeric fields ($inc)\ndb.users.updateMany(\n  { age: { $lt: 30 } },\n  { $inc: { age: 1 } }\n);\n\n# Delete matching document\ndb.users.deleteOne({ name: "Balaji" });\n\n# Delete multiple documents\ndb.users.deleteMany({ age: { $gte: 40 } });</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write an update statement that adds a new element <code>"vip"</code> to an array field named <code>tags</code> in a document (hint: use the <code>$push</code> operator).</div>\n' +
'</div>\n';

L['embedded-documents'] =
'<h1 class="page-title">Embedded Documents &amp; Subdocuments</h1>\n' +
'<div class="page-meta"><span class="badge">&#127809; MongoDB</span><span class="badge">Lesson 7</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Embedding documents inside other documents is the most common way to model relationships in MongoDB, keeping connected data local and fast to query.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Querying Nested Fields</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Nested Documents Query</span></div>\n' +
'    <pre><code># Query nested properties using dot notation (wrap in quotes)\ndb.users.find({ "address.city": "Hyderabad" });\n\n# Query elements inside arrays\ndb.users.find({ hobbies: "coding" });</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a query searching a product collection for products having a nested specification block containing weight properties greater than 10.</div>\n' +
'</div>\n';

L['document-references'] =
'<h1 class="page-title">Document References vs Embedding</h1>\n' +
'<div class="page-meta"><span class="badge">&#127809; MongoDB</span><span class="badge">Lesson 8</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Data modeling in MongoDB involves deciding between Embedding (nested schemas) and Referencing (linking documents using IDs).</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Reference Modeling Syntax</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JSON &#8212; Linked Documents</span></div>\n' +
'    <pre><code># User Document\n{\n  "_id": ObjectId("507f1f77bcf86cd799439011"),\n  "name": "Balaji"\n}\n\n# Post Document referencing User\n{\n  "title": "Learning MongoDB",\n  "author_id": ObjectId("507f1f77bcf86cd799439011")\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Explain when embedding is a better model choice than referencing, and when referencing should be preferred for data consistency.</div>\n' +
'</div>\n';

L['indexes'] =
'<h1 class="page-title">Indexing: Single, Compound &amp; Text</h1>\n' +
'<div class="page-meta"><span class="badge">&#127809; MongoDB</span><span class="badge">Lesson 9</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Indexes improve the search speed of query filtering by building index keys structured as balanced B-Trees.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Creating Indexes</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Index operations</span></div>\n' +
'    <pre><code># Create index on specific field (1 = ascending, -1 = descending)\ndb.users.createIndex({ email: 1 });\n\n# Create a compound index on multiple fields\ndb.users.createIndex({ age: 1, created_at: -1 });\n\n# List all active indexes in a collection\ndb.users.getIndexes();</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create a text index on a product collection covering name and description fields, and write a query searching for products matching the term "phone".</div>\n' +
'</div>\n';

L['aggregation-pipeline'] =
'<h1 class="page-title">The Aggregation Pipeline Framework</h1>\n' +
'<div class="page-meta"><span class="badge">&#127809; MongoDB</span><span class="badge">Lesson 10</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>The aggregation pipeline provides a framework to perform data transformations, grouping operations, and data joins inside MongoDB.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Aggregation Pipeline Example</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Aggregation Pipeline</span></div>\n' +
'    <pre><code>db.orders.aggregate([\n  # Stage 1: Filter active orders\n  { $match: { status: "completed" } },\n  # Stage 2: Group by category and compute total sales sum\n  { $group: { _id: "$category", total_sales: { $sum: "$price" } } },\n  # Stage 3: Sort categories by total sales volume\n  { $sort: { total_sales: -1 } }\n]);</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write an aggregation pipeline that joins a <code>posts</code> collection to a <code>users</code> collection using the <code>$lookup</code> operator to map author user names.</div>\n' +
'</div>\n';

L['mongoose-schemas'] =
'<h1 class="page-title">Mongoose: Schemas &amp; Models in Node.js</h1>\n' +
'<div class="page-meta"><span class="badge">&#127809; MongoDB</span><span class="badge">Lesson 11</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides validation, schema structural constraints, and model lifecycles.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Schema Definitions</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; user.model.js</span></div>\n' +
'    <pre><code>const mongoose = require("mongoose");\n\nconst userSchema = new mongoose.Schema({\n  username: { type: String, required: true, unique: true },\n  email: { type: String, required: true },\n  age: { type: Number, default: 18 }\n}, { timestamps: true });\n\nmodule.exports = mongoose.model("User", userSchema);</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Define a Mongoose schema for a product containing name (required string), price (number), stock (number, default 0), and categories (array of strings).</div>\n' +
'</div>\n';

L['mongoose-middleware'] =
'<h1 class="page-title">Mongoose: Middleware, Hooks &amp; Virtuals</h1>\n' +
'<div class="page-meta"><span class="badge">&#127809; MongoDB</span><span class="badge">Lesson 12</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Mongoose supports middleware hooks (pre and post triggers) executing before save/delete operations, and virtual properties.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Pre-Save Hooks and Virtuals</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Schema hooks</span></div>\n' +
'    <pre><code>const bcrypt = require("bcrypt");\n\n# Pre-save hook to hash password fields\nuserSchema.pre("save", async function(next) {\n  if (!this.isModified("password")) return next();\n  this.password = await bcrypt.hash(this.password, 10);\n  next();\n});\n\n# Virtual properties (not saved in database, computed on the fly)\nuserSchema.virtual("fullName").get(function() {\n  return `${this.firstName} ${this.lastName}`;\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create a Mongoose schema using a pre-save hook that automatically formats a user&#39;s email to lowercase before inserting it into the database.</div>\n' +
'</div>\n';

L['transactions'] =
'<h1 class="page-title">Multi-Document ACID Transactions</h1>\n' +
'<div class="page-meta"><span class="badge">&#127809; MongoDB</span><span class="badge">Lesson 13</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>MongoDB supports multi-document transactions inside Replica Sets, enabling standard ACID validation patterns across multiple collections.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Running Transactions in Node.js</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Session Transaction block</span></div>\n' +
'    <pre><code>const session = await mongoose.startSession();\nsession.startTransaction();\ntry {\n  # Deduct user balance\n  await Account.updateOne({ _id: user1 }, { $inc: { balance: -100 } }, { session });\n  # Add payee balance\n  await Account.updateOne({ _id: user2 }, { $inc: { balance: 100 } }, { session });\n  \n  await session.commitTransaction();\n} catch (error) {\n  await session.abortTransaction();\n} finally {\n  session.endSession();\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a transaction script representing order completion: inserting a record into an orders collection, and updating product stock in product collection atomically.</div>\n' +
'</div>\n';

L['backups-restore'] =
'<h1 class="page-title">Atlas Backup, mongodump &amp; Restore</h1>\n' +
'<div class="page-meta"><span class="badge">&#127809; MongoDB</span><span class="badge">Lesson 14</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Backing up collections protects data against corruption, accidental drops, and service failures.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Backup and Restore Operations</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Backup Commands</span></div>\n' +
'    <pre><code># Backup database to a folder\nmongodump --db shop_db --out ./backups/\n\n# Restore database from backup folder\nmongorestore --db shop_db ./backups/shop_db/\n\n# Export specific collection to JSON\nmongoexport --db shop_db --collection products --out products.json\n\n# Import collection from JSON file\nmongoimport --db shop_db --collection products --file products.json</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Run <code>mongodump</code> locally, verify that backup files contain BSON metadata, drop the collection, and restore it from backup files.</div>\n' +
'</div>\n';

L['security-deployment'] =
'<h1 class="page-title">Atlas Deployment &amp; Security Settings</h1>\n' +
'<div class="page-meta"><span class="badge">&#127809; MongoDB</span><span class="badge">Lesson 15</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Deploying production databases requires enabling authentication, configuring firewall rules, and restricting user access roles.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Deployment Security Checklist</div>\n' +
'  <ul>\n' +
'    <li><strong>Atlas Clusters</strong>: Always run database clusters inside isolated MongoDB Atlas or cloud environments.</li>\n' +
'    <li><strong>IP Access Lists</strong>: Restrict ingress traffic to only allow your web server IP addresses.</li>\n' +
'    <li><strong>Granular Roles</strong>: Do not connect applications using admin database credentials; create users having limited readWrite roles.</li>\n' +
'  </ul>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create a new database user in Atlas with custom roles restricting write operations on database audit collections.</div>\n' +
'</div>\n';

// ─── GENERATE FILES ──────────────────────────────────────────────────────────
console.log('Starting MongoDB lesson generation...');

lessons.forEach((l, i) => {
  const prev = i > 0 ? lessons[i - 1] : null;
  const next = i < lessons.length - 1 ? lessons[i + 1] : null;
  const html = wrapPage(
    l.slug, l.title,
    L[l.slug] || '<p>Content coming soon.</p>',
    prev ? prev.filename : null, prev ? prev.title : null,
    next ? next.filename : null, next ? next.title : null
  );
  fs.writeFileSync(path.join(publicDir, l.filename), html, 'utf8');
  console.log('Generated:', l.filename);
});

// Index page
const indexContent =
'<h1 class="page-title">MongoDB Tutorial &#8212; Complete Guide</h1>\n' +
'<div class="page-meta"><span class="badge">&#127809; MongoDB</span><span class="badge">&#128994; Beginner to Advanced</span><span class="badge">&#128197; July 2026</span></div>\n' +
'<div class="intro-box"><p>MongoDB is the world&#39;s most popular document database, allowing developers to build flexible, high-performance applications without relational SQL bottlenecks. This 15-lesson bootcamp takes you from NoSQL fundamentals and document structure to query operators, indexing, aggregation frameworks, Mongoose models, and production Atlas deployments.</p></div>\n' +
'<div class="section">\n  <div class="section-title"><span class="num">&#9658;</span> Course Curriculum</div>\n' +
'  <table class="tbl" style="margin-top:15px;">\n    <tr><th>Lesson</th><th>Topic</th></tr>\n' +
lessons.map(l => '    <tr><td><strong>Lesson ' + l.num + '</strong></td><td><a href="/' + l.filename + '"><strong>' + l.title + '</strong></a></td></tr>').join('\n') +
'\n  </table>\n</div>\n';

const indexHtml = wrapPage('home',
  'MongoDB Tutorial — Complete Beginner to Advanced Guide',
  indexContent, null, null, lessons[0].filename, lessons[0].title);

fs.writeFileSync(path.join(publicDir, 'blog-mongodb.html'), indexHtml, 'utf8');
console.log('Generated: blog-mongodb.html');
console.log('Done! All 15 MongoDB lessons generated successfully.');
