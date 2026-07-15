const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const blogDir = path.join(publicDir, 'blog-mysql');
if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

const lessons = [
  { slug: 'intro',                 num: 1,  title: 'Introduction to MySQL &amp; RDBMS',          filename: 'blog-mysql/intro.html' },
  { slug: 'installation-setup',     num: 2,  title: 'Installation &amp; Command Line Setup',     filename: 'blog-mysql/installation-setup.html' },
  { slug: 'databases-tables',     num: 3,  title: 'Databases, Tables &amp; Data Types',         filename: 'blog-mysql/databases-tables.html' },
  { slug: 'crud-operations',       num: 4,  title: 'CRUD Operations: Writing Basic SQL',        filename: 'blog-mysql/crud-operations.html' },
  { slug: 'filtering-sorting',     num: 5,  title: 'Filtering (WHERE, LIKE) &amp; Sorting',      filename: 'blog-mysql/filtering-sorting.html' },
  { slug: 'joins',                 num: 6,  title: 'Relational SQL: INNER &amp; LEFT Joins',     filename: 'blog-mysql/joins.html' },
  { slug: 'aggregate-functions',   num: 7,  title: 'Aggregation: GROUP BY &amp; HAVING',         filename: 'blog-mysql/aggregate-functions.html' },
  { slug: 'subqueries',           num: 8,  title: 'Subqueries &amp; Common Table Expressions',  filename: 'blog-mysql/subqueries.html' },
  { slug: 'constraints-indexes',   num: 9,  title: 'Keys, Constraints &amp; Indexing',           filename: 'blog-mysql/constraints-indexes.html' },
  { slug: 'transactions',          num: 10, title: 'Transactions &amp; ACID Properties',          filename: 'blog-mysql/transactions.html' },
  { slug: 'views',                 num: 11, title: 'Working with Database Views',              filename: 'blog-mysql/views.html' },
  { slug: 'stored-procedures',     num: 12, title: 'Stored Procedures &amp; Functions',         filename: 'blog-mysql/stored-procedures.html' },
  { slug: 'triggers',              num: 13, title: 'Database Triggers &amp; Audit Logs',        filename: 'blog-mysql/triggers.html' },
  { slug: 'backup-restore',        num: 14, title: 'Backups with mysqldump &amp; Restoring',    filename: 'blog-mysql/backup-restore.html' },
  { slug: 'optimization-performance', num: 15, title: 'Query Optimization &amp; EXPLAIN Analysis', filename: 'blog-mysql/optimization-performance.html' }
];

function getSidebar(activeSlug) {
  let h = '\n    <div class="sidebar-heading">MySQL Tutorial</div>\n';
  h += '    <a href="/blog-mysql.html"' + (activeSlug === 'home' ? ' class="active"' : '') + '>MySQL HOME</a>\n';
  lessons.forEach(l => {
    h += '    <a href="/' + l.filename + '"' + (activeSlug === l.slug ? ' class="active"' : '') + '>' + l.num + '. ' + l.title + '</a>\n';
  });
  h += '\n    <div class="sidebar-heading">Related Topics</div>\n';
  h += '    <a href="/blog-postgresql.html">PostgreSQL</a>\n';
  h += '    <a href="/blog-mongodb.html">MongoDB</a>\n';
  h += '    <a href="/blog-sqlite.html">SQLite</a>\n';
  h += '    <a href="/blog-redis.html">Redis</a>\n';
  h += '    <a href="/blog.html">All Tutorials</a>\n';
  return h;
}

function wrapPage(slug, title, body, prevFile, prevTitle, nextFile, nextTitle) {
  let nav = '<div class="nav-footer">\n';
  if (prevFile) {
    nav += '      <a href="/' + prevFile + '" class="nav-btn"><span class="label">&#8592; Previous Lesson</span><span class="title">' + prevTitle + '</span></a>\n';
  } else {
    nav += '      <a href="/blog-mysql.html" class="nav-btn"><span class="label">&#8592; MySQL Overview</span><span class="title">Course Index</span></a>\n';
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
'  <a href="/blog-mysql.html" class="active">MySQL</a>\n' +
'  <a href="/blog-mongodb.html">MongoDB</a>\n' +
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
'  <meta name="description" content="Learn MySQL — ' + title + ' with clear SQL queries, database structures, performance tips, and challenges." />\n' +
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
'<body class="lang-mysql">\n' +
'<nav class="topnav">\n' +
'  <a href="/" class="brand">&#128187; Our Compiler</a>\n' +
topnav +
'</nav>\n' +
'<div class="layout">\n' +
'  <aside class="sidebar">' + getSidebar(slug) + '  </aside>\n' +
'  <main class="content">\n' +
'    <div class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/blog.html">Tutorials</a><span>&#8250;</span><a href="/blog-mysql.html">MySQL</a><span>&#8250;</span><span>Lesson ' + num + '</span></div>\n' +
'    ' + body + '\n' +
'    ' + nav + '\n' +
'  </main>\n</div>\n</body>\n</html>';
}

// ─── LESSON CONTENTS ─────────────────────────────────────────────────────────
const L = {};

L['intro'] =
'<h1 class="page-title">Introduction to MySQL &amp; RDBMS</h1>\n' +
'<div class="page-meta"><span class="badge">&#128196; MySQL</span><span class="badge">Lesson 1</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p><strong>MySQL</strong> is the world&#39;s most popular open-source Relational Database Management System (RDBMS). It is owned and sponsored by Oracle Corporation, and powers some of the largest internet sites including Facebook, Twitter, and YouTube.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> RDBMS Core Concepts</div>\n' +
'  <ul>\n' +
'    <li><strong>Tables</strong>: Data is structured in relations (commonly called tables) with rows and columns.</li>\n' +
'    <li><strong>SQL (Structured Query Language)</strong>: The standard language used to interact with relation schemas.</li>\n' +
'    <li><strong>Data Integrity</strong>: Strict schemas, types, and constraints (e.g., Primary Keys, Foreign Keys) enforce validity.</li>\n' +
'    <li><strong>ACID Compliance</strong>: Transactions ensure database operations are Atomic, Consistent, Isolated, and Durable.</li>\n' +
'  </ul>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a brief summary explaining how a relational database differ from a document database like MongoDB.</div>\n' +
'</div>\n';

L['installation-setup'] =
'<h1 class="page-title">Installation &amp; Command Line Setup</h1>\n' +
'<div class="page-meta"><span class="badge">&#128196; MySQL</span><span class="badge">Lesson 2</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>To use MySQL, you need to install the MySQL Server and the command-line client utility.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Running MySQL Commands</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Terminal Access</span></div>\n' +
'    <pre><code># Login to local database server\nmysql -u root -p\n\n# List all existing databases\nSHOW DATABASES;\n\n# Create a new database\nCREATE DATABASE library_db;\n\n# Select the database to write commands\nUSE library_db;\n\n# Confirm active database selection\nSELECT DATABASE();</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Install MySQL Server locally, connect via terminal using your root user credentials, create a database named <code>ecommerce_db</code>, and confirm its creation by running <code>SHOW DATABASES;</code>.</div>\n' +
'</div>\n';

L['databases-tables'] =
'<h1 class="page-title">Databases, Tables &amp; Data Types</h1>\n' +
'<div class="page-meta"><span class="badge">&#128196; MySQL</span><span class="badge">Lesson 3</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>Tables hold your database records. When designing tables, you must declare appropriate data types for each column to optimize storage and validate values.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Creating a Table</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">SQL &#8212; Table Definition</span></div>\n' +
'    <pre><code>CREATE TABLE users (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    username VARCHAR(50) NOT NULL UNIQUE,\n    email VARCHAR(100) NOT NULL,\n    age INT DEFAULT 18,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n# Show fields of a table\nDESCRIBE users;</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Common Data Types</div>\n' +
'  <table class="tbl">\n' +
'    <tr><th>Type Class</th><th>Datatype</th><th>Description</th></tr>\n' +
'    <tr><td>Numeric</td><td><code>INT</code>, <code>DECIMAL(10,2)</code></td><td>Integers &amp; exact fixed point fractions</td></tr>\n' +
'    <tr><td>String</td><td><code>VARCHAR(len)</code>, <code>TEXT</code></td><td>Variable strings &amp; large blocks of text</td></tr>\n' +
'    <tr><td>Date/Time</td><td><code>DATE</code>, <code>TIMESTAMP</code></td><td>Calendar date &amp; timezone-aware time</td></tr>\n' +
'  </table>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a SQL command creating a table named <code>products</code> containing fields: <code>id</code> (int), <code>name</code> (varchar), <code>price</code> (decimal for money values), and <code>stock</code> (int).</div>\n' +
'</div>\n';

L['crud-operations'] =
'<h1 class="page-title">CRUD Operations: Writing Basic SQL</h1>\n' +
'<div class="page-meta"><span class="badge">&#128196; MySQL</span><span class="badge">Lesson 4</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>CRUD stands for Create, Read, Update, and Delete. These basic commands are used to insert records, query data, and manipulate existing table information.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Basic SQL Queries</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">SQL &#8212; CRUD Syntax</span></div>\n' +
'    <pre><code># 1. CREATE (Insert)\nINSERT INTO users (username, email, age) \nVALUES (&#39;balaji&#39;, &#39;balaji@test.com&#39;, 25);\n\n# 2. READ (Select)\nSELECT username, email FROM users;\n\n# 3. UPDATE\nUPDATE users \nSET age = 26 \nWHERE username = &#39;balaji&#39;;\n\n# 4. DELETE\nDELETE FROM users \nWHERE id = 1;</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write an SQL statement inserting three products into your products table, query all records priced below $50, and update a product stock quantity to zero.</div>\n' +
'</div>\n';

L['filtering-sorting'] =
'<h1 class="page-title">Filtering (WHERE, LIKE) &amp; Sorting</h1>\n' +
'<div class="page-meta"><span class="badge">&#128196; MySQL</span><span class="badge">Lesson 5</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>SQL query search spaces are constrained using the <code>WHERE</code> clause, and ordered using the <code>ORDER BY</code> command.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> SQL Clauses</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">SQL &#8212; Query Constraints</span></div>\n' +
'    <pre><code># Filter with matching strings\nSELECT * FROM users WHERE username = &#39;balaji&#39;;\n\n# Pattern matching with LIKE (% acts as wildcard)\nSELECT * FROM users WHERE email LIKE &#39;%@gmail.com&#39;;\n\n# Filter with range lists\nSELECT * FROM users WHERE age BETWEEN 20 AND 30;\nSELECT * FROM users WHERE age IN (18, 21, 25);\n\n# Sorting and Limiting\nSELECT * FROM users \nORDER BY age DESC, created_at ASC\nLIMIT 5 OFFSET 10;</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a query retrieving the top 5 most expensive products whose names contain the word "phone", ordered from most to least expensive.</div>\n' +
'</div>\n';

L['joins'] =
'<h1 class="page-title">Relational SQL: INNER &amp; LEFT Joins</h1>\n' +
'<div class="page-meta"><span class="badge">&#128196; MySQL</span><span class="badge">Lesson 6</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Relational databases avoid duplicate data by linking tables. Joins query connected records by matching matching keys across distinct files.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Joining Tables</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">SQL &#8212; JOIN Examples</span></div>\n' +
'    <pre><code># INNER JOIN: Matches records that exist in BOTH tables\nSELECT posts.id, posts.title, users.username\nFROM posts\nINNER JOIN users ON posts.user_id = users.id;\n\n# LEFT JOIN: Returns ALL left-table records, plus matching right-table records (null if no match)\nSELECT users.username, posts.title\nFROM users\nLEFT JOIN posts ON users.id = posts.user_id;</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a query connecting an <code>orders</code> table to a <code>customers</code> table using an inner join. Retrieve order date, order total, and customer email address fields.</div>\n' +
'</div>\n';

L['aggregate-functions'] =
'<h1 class="page-title">Aggregation: GROUP BY &amp; HAVING</h1>\n' +
'<div class="page-meta"><span class="badge">&#128196; MySQL</span><span class="badge">Lesson 7</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Aggregation collapses multiple matching rows into calculation fields using SUM, AVG, COUNT, MIN, and MAX operations.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Grouping Results</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">SQL &#8212; Aggregations</span></div>\n' +
'    <pre><code># Calculate count of posts per user\nSELECT user_id, COUNT(id) AS total_posts\nFROM posts\nGROUP BY user_id;\n\n# GROUP BY with HAVING filter constraint on aggregated results\nSELECT user_id, COUNT(id) AS total_posts\nFROM posts\nGROUP BY user_id\nHAVING total_posts &gt; 5;</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a query groups products by category, displaying category name, average product price, and total stock quantity. Filter out categories having average price below $10.</div>\n' +
'</div>\n';

L['subqueries'] =
'<h1 class="page-title">Subqueries &amp; Common Table Expressions</h1>\n' +
'<div class="page-meta"><span class="badge">&#128196; MySQL</span><span class="badge">Lesson 8</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>A subquery is a query nested inside another SQL statement. Common Table Expressions (CTEs) define temporary result sets accessible within statements.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Subqueries &amp; CTEs Syntax</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">SQL &#8212; Subqueries &amp; CTEs</span></div>\n' +
'    <pre><code># Subquery lookup\nSELECT title FROM posts \nWHERE user_id = (SELECT id FROM users WHERE username = &#39;balaji&#39;);\n\n# CTE Definition\nWITH user_post_counts AS (\n    SELECT user_id, COUNT(id) AS post_count\n    FROM posts\n    GROUP BY user_id\n)\nSELECT users.username, user_post_counts.post_count\nFROM users\nINNER JOIN user_post_counts ON users.id = user_post_counts.user_id;</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a query finding all products priced higher than the average price of all database items, utilizing a nested subquery.</div>\n' +
'</div>\n';

L['constraints-indexes'] =
'<h1 class="page-title">Keys, Constraints &amp; Indexing</h1>\n' +
'<div class="page-meta"><span class="badge">&#128196; MySQL</span><span class="badge">Lesson 9</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Constraints enforce schema integrity rules. Indexes speed up lookup operations by building structural binary trees referencing rows.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Adding Constraints &amp; Indexes</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">SQL &#8212; Indexes and Alter commands</span></div>\n' +
'    <pre><code># Create index on specific column to speed up filtering\nCREATE INDEX idx_users_email ON users(email);\n\n# Add Foreign Key constraint to table mapping relation references\nALTER TABLE posts\nADD CONSTRAINT fk_posts_user\nFOREIGN KEY (user_id) REFERENCES users(id)\nON DELETE CASCADE;</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Alter the <code>products</code> table adding a unique constraint to the product code field, and create a composite index covering both category and price fields.</div>\n' +
'</div>\n';

L['transactions'] =
'<h1 class="page-title">Transactions &amp; ACID Properties</h1>\n' +
'<div class="page-meta"><span class="badge">&#128196; MySQL</span><span class="badge">Lesson 10</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Transactions group SQL operations into atomic statements that execute successfully as a group, or revert database modifications on errors.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> SQL Transaction Syntax</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">SQL &#8212; Transaction Blocks</span></div>\n' +
'    <pre><code>START TRANSACTION;\n\n# Deduct user balance\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\n\n# Add payee balance\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n\n# Commit alterations if everything succeeded\nCOMMIT;\n\n# Revert modifications in case of error conditions\n# ROLLBACK;</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a transaction script representing order completion: inserting a record into an orders table, updating product stock, and committing changes atomically.</div>\n' +
'</div>\n';

L['views'] =
'<h1 class="page-title">Working with Database Views</h1>\n' +
'<div class="page-meta"><span class="badge">&#128196; MySQL</span><span class="badge">Lesson 11</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>A View is a virtual table containing data generated from a stored query. Views hide complex query structures and secure tables by restricting direct field access.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Creating &amp; Dropping Views</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">SQL &#8212; View Syntax</span></div>\n' +
'    <pre><code>CREATE VIEW published_posts_summary AS\nSELECT posts.id, posts.title, users.username AS author_name\nFROM posts\nINNER JOIN users ON posts.user_id = users.id\nWHERE posts.is_published = 1;\n\n# Query the view as if it were a normal table\nSELECT * FROM published_posts_summary;</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create a view named <code>expensive_products</code> displaying only products priced above $500, showing name, price, and category properties.</div>\n' +
'</div>\n';

L['stored-procedures'] =
'<h1 class="page-title">Stored Procedures &amp; Functions</h1>\n' +
'<div class="page-meta"><span class="badge">&#128196; MySQL</span><span class="badge">Lesson 12</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Stored Procedures let you run database logic (control structures, variables, parameter mappings) directly inside MySQL engines.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Stored Procedure Structure</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">SQL &#8212; Stored Procedure Definition</span></div>\n' +
'    <pre><code>DELIMITER //\nCREATE PROCEDURE GetUserPosts(IN input_user_id INT)\nBEGIN\n    SELECT * FROM posts WHERE user_id = input_user_id;\nEND //\nDELIMITER ;\n\n# Call the procedure\nCALL GetUserPosts(1);</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a stored procedure named <code>ProcessStockUpdate</code> accepting a product ID and quantity change parameter, modifying product stock volumes accordingly.</div>\n' +
'</div>\n';

L['triggers'] =
'<h1 class="page-title">Database Triggers &amp; Audit Logs</h1>\n' +
'<div class="page-meta"><span class="badge">&#128196; MySQL</span><span class="badge">Lesson 13</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Database triggers execute automatically when insert, update, or delete commands are run on tables.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Audit Log Trigger Example</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">SQL &#8212; Trigger Syntax</span></div>\n' +
'    <pre><code>CREATE TABLE user_audit (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    user_id INT,\n    action VARCHAR(50),\n    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nDELIMITER //\nCREATE TRIGGER after_user_insert\nAFTER INSERT ON users\nFOR EACH ROW\nBEGIN\n    INSERT INTO user_audit (user_id, action)\n    VALUES (NEW.id, &#39;CREATED&#39;);\nEND //\nDELIMITER ;</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a trigger tracking product price updates, saving previous price, new price, and change timestamps in an audit log table.</div>\n' +
'</div>\n';

L['backup-restore'] =
'<h1 class="page-title">Backups with mysqldump &amp; Restoring</h1>\n' +
'<div class="page-meta"><span class="badge">&#128196; MySQL</span><span class="badge">Lesson 14</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Backing up databases ensures safety against server failures, file corruption, or database drops.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Backup and Restore Operations</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Backup Commands</span></div>\n' +
'    <pre><code># Export database schema and records to sql script\nmysqldump -u root -p library_db &gt; backup.sql\n\n# Backup all databases\nmysqldump -u root -p --all-databases &gt; all_backup.sql\n\n# Import / Restore SQL script\nmysql -u root -p library_db &lt; backup.sql</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Export your <code>ecommerce_db</code> using mysqldump, drop the database, recreate it, and restore the export script verifying that all fields are restored.</div>\n' +
'</div>\n';

L['optimization-performance'] =
'<h1 class="page-title">Query Optimization &amp; EXPLAIN Analysis</h1>\n' +
'<div class="page-meta"><span class="badge">&#128196; MySQL</span><span class="badge">Lesson 15</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Slow SQL queries impact application scalability. Using the <code>EXPLAIN</code> analyzer identifies bottlenecks and helps you optimize keys.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> EXPLAIN Statement</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">SQL &#8212; Query Execution Plan</span></div>\n' +
'    <pre><code># Analyze query execution path\nEXPLAIN SELECT * FROM users WHERE email = &#39;balaji@test.com&#39;;\n\n# Key properties returned by EXPLAIN:\n# - type: scan type (const/eq_ref are fast, ALL is slow full-table scan)\n# - possible_keys: matching indexes MySQL can use\n# - key: the index MySQL actually decided to use\n# - rows: count of records MySQL needs to examine</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Find a slow full-table scan query inside your application database, verify the scan pattern using <code>EXPLAIN</code>, and add an index to reduce scanned rows.</div>\n' +
'</div>\n';

// ─── GENERATE FILES ──────────────────────────────────────────────────────────
console.log('Starting MySQL lesson generation...');

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
'<h1 class="page-title">MySQL Tutorial &#8212; Complete Guide</h1>\n' +
'<div class="page-meta"><span class="badge">&#128196; MySQL</span><span class="badge">&#128994; Beginner to Advanced</span><span class="badge">&#128197; July 2026</span></div>\n' +
'<div class="intro-box"><p>MySQL is the industry standard open-source SQL database powering millions of web applications worldwide. This 15-lesson tutorial takes you from SQL syntax basic queries to table joins, subqueries, index optimization, transactions, triggers, and backup operations.</p></div>\n' +
'<div class="section">\n  <div class="section-title"><span class="num">&#9658;</span> Course Curriculum</div>\n' +
'  <table class="tbl" style="margin-top:15px;">\n    <tr><th>Lesson</th><th>Topic</th></tr>\n' +
lessons.map(l => '    <tr><td><strong>Lesson ' + l.num + '</strong></td><td><a href="/' + l.filename + '"><strong>' + l.title + '</strong></a></td></tr>').join('\n') +
'\n  </table>\n</div>\n';

const indexHtml = wrapPage('home',
  'MySQL Tutorial — Complete Beginner to Advanced Guide',
  indexContent, null, null, lessons[0].filename, lessons[0].title);

fs.writeFileSync(path.join(publicDir, 'blog-mysql.html'), indexHtml, 'utf8');
console.log('Generated: blog-mysql.html');
console.log('Done! All 15 MySQL lessons generated successfully.');
