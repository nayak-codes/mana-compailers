const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const blogDir = path.join(publicDir, 'blog-graphql');

if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

const lessons = [
  { slug: 'intro',            num: 1,  title: 'What is GraphQL?',                          filename: 'blog-graphql/intro.html' },
  { slug: 'schema',           num: 2,  title: 'Schema Definition Language (SDL)',           filename: 'blog-graphql/schema.html' },
  { slug: 'queries',          num: 3,  title: 'Writing Queries & Fields',                   filename: 'blog-graphql/queries.html' },
  { slug: 'mutations',        num: 4,  title: 'Mutations — Creating & Updating Data',       filename: 'blog-graphql/mutations.html' },
  { slug: 'subscriptions',    num: 5,  title: 'Subscriptions & Real-Time Data',             filename: 'blog-graphql/subscriptions.html' },
  { slug: 'resolvers',        num: 6,  title: 'Resolvers & Execution Model',                filename: 'blog-graphql/resolvers.html' },
  { slug: 'variables',        num: 7,  title: 'Variables, Arguments & Directives',          filename: 'blog-graphql/variables.html' },
  { slug: 'types',            num: 8,  title: 'Types — Scalars, Enums & Interfaces',        filename: 'blog-graphql/types.html' },
  { slug: 'apollo-server',    num: 9,  title: 'Building with Apollo Server',                filename: 'blog-graphql/apollo-server.html' },
  { slug: 'apollo-client',    num: 10, title: 'Apollo Client with React',                   filename: 'blog-graphql/apollo-client.html' },
  { slug: 'dataloader',       num: 11, title: 'DataLoader & N+1 Problem',                   filename: 'blog-graphql/dataloader.html' },
  { slug: 'authentication',   num: 12, title: 'Authentication & Authorization',              filename: 'blog-graphql/authentication.html' },
  { slug: 'pagination',       num: 13, title: 'Pagination with Relay Connections',          filename: 'blog-graphql/pagination.html' },
  { slug: 'testing',          num: 14, title: 'Testing GraphQL APIs',                       filename: 'blog-graphql/testing.html' },
  { slug: 'deployment',       num: 15, title: 'Production, Persisted Queries & Monitoring', filename: 'blog-graphql/deployment.html' }
];

function getSidebar(activeSlug) {
  let html = '\n    <div class="sidebar-heading">GraphQL Tutorial</div>\n';
  html += '    <a href="/blog-graphql.html"' + (activeSlug === 'home' ? ' class="active"' : '') + '>GraphQL HOME</a>\n';
  lessons.forEach(l => {
    html += '    <a href="/' + l.filename + '"' + (activeSlug === l.slug ? ' class="active"' : '') + '>' + l.num + '. ' + l.title + '</a>\n';
  });
  html += '\n    <div class="sidebar-heading">Related Topics</div>\n';
  html += '    <a href="/blog-rest-api.html">REST API</a>\n';
  html += '    <a href="/blog-nodejs.html">Node.js</a>\n';
  html += '    <a href="/blog-react.html">React</a>\n';
  html += '    <a href="/blog-mongodb.html">MongoDB</a>\n';
  html += '    <a href="/blog-postgresql.html">PostgreSQL</a>\n';
  html += '    <a href="/blog.html">All Tutorials</a>\n';
  return html;
}

function wrapPage(slug, title, mainContent, prevFile, prevTitle, nextFile, nextTitle) {
  let navFooter = '<div class="nav-footer">\n';
  if (prevFile) {
    navFooter += '      <a href="/' + prevFile + '" class="nav-btn">\n';
    navFooter += '        <span class="label">&#8592; Previous Lesson</span>\n';
    navFooter += '        <span class="title">' + prevTitle + '</span>\n';
    navFooter += '      </a>\n';
  } else {
    navFooter += '      <a href="/blog-graphql.html" class="nav-btn">\n';
    navFooter += '        <span class="label">&#8592; GraphQL Overview</span>\n';
    navFooter += '        <span class="title">Course Index</span>\n';
    navFooter += '      </a>\n';
  }
  if (nextFile) {
    navFooter += '      <a href="/' + nextFile + '" class="nav-btn" style="text-align:right;">\n';
    navFooter += '        <span class="label">Next Lesson &#8594;</span>\n';
    navFooter += '        <span class="title">' + nextTitle + '</span>\n';
    navFooter += '      </a>\n';
  } else {
    navFooter += '      <a href="/blog.html" class="nav-btn" style="text-align:right;">\n';
    navFooter += '        <span class="label">All Tutorials &#8594;</span>\n';
    navFooter += '        <span class="title">Learning Hub</span>\n';
    navFooter += '      </a>\n';
  }
  navFooter += '    </div>';

  const lessonNum = slug === 'home' ? 'Index' : lessons.find(x => x.slug === slug).num;

  const navLinks =
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
'  <a href="/blog-graphql.html" class="active">GraphQL</a>\n' +
'  <a href="/blog-spring-boot.html">Spring Boot</a>\n' +
'  <a href="/blog-django.html">Django</a>\n' +
'  <a href="/blog-flask.html">Flask</a>\n' +
'  <a href="/blog-express.html">Express.js</a>\n' +
'  <a href="/blog-postgresql.html">PostgreSQL</a>\n' +
'  <a href="/blog-mysql.html">MySQL</a>\n' +
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

  return '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8" />\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
'  <title>' + title + ' | Our Compiler</title>\n' +
'  <meta name="description" content="Learn GraphQL — ' + title + ' with clear explanations, code examples, and practical challenges." />\n' +
'  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />\n' +
'  <link rel="icon" type="image/png" href="/logo.png" />\n' +
'  <link rel="preconnect" href="https://fonts.googleapis.com" />\n' +
'  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />\n' +
'  <link rel="stylesheet" href="/blog-style.css" />\n' +
'  <script>\n' +
'    (function() {\n' +
'      var t = localStorage.getItem("theme") || "dark";\n' +
'      if (t === "light") { document.documentElement.classList.add("light-theme"); document.addEventListener("DOMContentLoaded", function() { document.body.classList.add("light-theme"); }); }\n' +
'      window.addEventListener("DOMContentLoaded", function() {\n' +
'        var nav = document.querySelector(".topnav");\n' +
'        if (nav) {\n' +
'          var btn = document.createElement("button");\n' +
'          btn.style.cssText = "margin-left:auto;flex-shrink:0;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:6px;padding:4px 10px;font-size:12px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif;transition:all 0.2s;white-space:nowrap;margin-right:12px;";\n' +
'          var upd = function() { btn.innerHTML = document.body.classList.contains("light-theme") ? "&#127769; Dark" : "&#9728;&#65039; Light"; };\n' +
'          upd();\n' +
'          btn.onclick = function() { document.body.classList.toggle("light-theme"); document.documentElement.classList.toggle("light-theme"); localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark"); upd(); };\n' +
'          nav.appendChild(btn);\n' +
'        }\n' +
'        document.querySelectorAll(".code-block").forEach(function(block) {\n' +
'          var header = block.querySelector(".code-block-header");\n' +
'          var codeEl = block.querySelector("pre code");\n' +
'          if (!header || !codeEl) return;\n' +
'          var ac = header.querySelector(".code-actions");\n' +
'          if (!ac) { ac = document.createElement("div"); ac.className = "code-actions"; ac.style.cssText = "display:flex;gap:8px;align-items:center;margin-left:auto;"; header.appendChild(ac); }\n' +
'          var cb = document.createElement("button");\n' +
'          cb.innerHTML = "&#128203; Copy";\n' +
'          cb.style.cssText = "background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:6px;padding:4px 10px;font-size:11px;font-weight:600;cursor:pointer;transition:all 0.2s;font-family:Inter,sans-serif;white-space:nowrap;";\n' +
'          cb.onclick = function() { navigator.clipboard.writeText(codeEl.textContent).then(function() { cb.innerHTML = "&#9989; Copied!"; setTimeout(function() { cb.innerHTML = "&#128203; Copy"; }, 2000); }); };\n' +
'          ac.appendChild(cb);\n' +
'        });\n' +
'      });\n' +
'    })();\n' +
'  </script>\n' +
'</head>\n' +
'<body class="lang-graphql">\n' +
'<nav class="topnav">\n' +
'  <a href="/" class="brand">&#128187; Our Compiler</a>\n' +
navLinks +
'</nav>\n' +
'<div class="layout">\n' +
'  <aside class="sidebar">\n' +
'    ' + getSidebar(slug) + '\n' +
'  </aside>\n' +
'  <main class="content">\n' +
'    <div class="breadcrumb">\n' +
'      <a href="/">Home</a><span>&#8250;</span>\n' +
'      <a href="/blog.html">Tutorials</a><span>&#8250;</span>\n' +
'      <a href="/blog-graphql.html">GraphQL</a><span>&#8250;</span>\n' +
'      <span>Lesson ' + lessonNum + '</span>\n' +
'    </div>\n' +
'    ' + mainContent + '\n' +
'    ' + navFooter + '\n' +
'  </main>\n' +
'</div>\n' +
'</body>\n' +
'</html>';
}

// ─── LESSON CONTENTS ─────────────────────────────────────────────────────────
const L = {};

L['intro'] =
'<h1 class="page-title">What is GraphQL?</h1>\n' +
'<div class="page-meta"><span class="badge">&#9685; GraphQL</span><span class="badge">Lesson 1</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>GraphQL is a query language for APIs and a runtime for executing those queries, developed by Facebook in 2012 and open-sourced in 2015. Unlike REST, GraphQL lets clients request <strong>exactly the data they need</strong> — no more, no less — in a single request.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> The Core Problems GraphQL Solves</div>\n' +
'  <ul>\n' +
'    <li><strong>Over-fetching</strong>: REST returns entire objects even when you only need two fields. GraphQL returns only what you ask for.</li>\n' +
'    <li><strong>Under-fetching</strong>: REST often requires multiple round-trips (e.g., fetch user, then fetch their posts, then fetch post comments). GraphQL fetches it all in one query.</li>\n' +
'    <li><strong>Rigid endpoints</strong>: REST has fixed URL endpoints. GraphQL exposes a single endpoint (<code>/graphql</code>) and the query shape determines the response.</li>\n' +
'    <li><strong>Type safety</strong>: GraphQL schemas are strongly typed, enabling tooling, auto-complete, and validation at the schema level.</li>\n' +
'  </ul>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> REST vs GraphQL Side-by-Side</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">REST &#8212; Multiple Requests</span></div>\n' +
'    <pre><code>GET /users/1        -> { id, name, email, address, phone, ... } (over-fetch)\nGET /users/1/posts  -> [ { id, title, body, createdAt, ... } ]\nGET /posts/42/comments -> [ { id, text, author, ... } ]\n\n// 3 round trips, lots of unused data</code></pre>\n' +
'  </div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">GraphQL &#8212; Single Request, Exact Data</span></div>\n' +
'    <pre><code>POST /graphql\n\n# Query\n{\n  user(id: "1") {\n    name\n    posts {\n      title\n      comments {\n        text\n        author { name }\n      }\n    }\n  }\n}\n\n# Response — exactly what was asked\n{\n  "data": {\n    "user": {\n      "name": "Balaji",\n      "posts": [{ "title": "...", "comments": [...] }]\n    }\n  }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> When to Use GraphQL vs REST</div>\n' +
'  <table class="tbl">\n' +
'    <tr><th>Scenario</th><th>Best Choice</th></tr>\n' +
'    <tr><td>Public API with many different consumers</td><td>REST</td></tr>\n' +
'    <tr><td>Complex UIs with many data relationships</td><td>GraphQL</td></tr>\n' +
'    <tr><td>Mobile apps (limited bandwidth)</td><td>GraphQL</td></tr>\n' +
'    <tr><td>Simple CRUD microservices</td><td>REST</td></tr>\n' +
'    <tr><td>Real-time features</td><td>GraphQL (Subscriptions)</td></tr>\n' +
'    <tr><td>Third-party integrations</td><td>REST</td></tr>\n' +
'  </table>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">4</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Explore the public GitHub GraphQL API at <code>https://api.github.com/graphql</code> using the GitHub Explorer. Write a query that fetches your GitHub username, your 5 most recent repositories (name + star count), and your follower count — all in one request.</div>\n' +
'</div>\n';

L['schema'] =
'<h1 class="page-title">Schema Definition Language (SDL)</h1>\n' +
'<div class="page-meta"><span class="badge">&#9685; GraphQL</span><span class="badge">Lesson 2</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>The <strong>Schema Definition Language (SDL)</strong> is how you define the shape of your GraphQL API. It is the contract between client and server — describing every type, field, and operation available. All GraphQL servers start with a schema.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Defining Object Types</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">GraphQL SDL &#8212; Type Definitions</span></div>\n' +
'    <pre><code># Object Type — the building block of GraphQL schemas\ntype User {\n  id:        ID!          # ID scalar, non-null (! = required)\n  name:      String!      # Non-null string\n  email:     String!      # Non-null string\n  age:       Int          # Nullable integer\n  isActive:  Boolean!     # Non-null boolean\n  role:      Role!        # Enum type\n  posts:     [Post!]!     # Non-null list of non-null Posts\n  createdAt: String!\n}\n\ntype Post {\n  id:       ID!\n  title:    String!\n  body:     String!\n  author:   User!\n  tags:     [String!]\n  comments: [Comment!]!\n}\n\ntype Comment {\n  id:     ID!\n  text:   String!\n  author: User!\n  post:   Post!\n}\n\nenum Role {\n  USER\n  EDITOR\n  ADMIN\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Root Operation Types</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">GraphQL SDL &#8212; Query, Mutation, Subscription</span></div>\n' +
'    <pre><code># Every schema has up to 3 root types\n\ntype Query {\n  # Read operations\n  user(id: ID!): User\n  users(role: Role, limit: Int, offset: Int): [User!]!\n  post(id: ID!): Post\n  posts(authorId: ID): [Post!]!\n  me: User                        # Current authenticated user\n}\n\ntype Mutation {\n  # Write operations\n  createUser(input: CreateUserInput!): User!\n  updateUser(id: ID!, input: UpdateUserInput!): User!\n  deleteUser(id: ID!): Boolean!\n  createPost(input: CreatePostInput!): Post!\n  addComment(postId: ID!, text: String!): Comment!\n}\n\ntype Subscription {\n  # Real-time events\n  commentAdded(postId: ID!): Comment!\n  userOnline: User!\n}\n\n# Input types (used for mutations)\ninput CreateUserInput {\n  name:     String!\n  email:    String!\n  password: String!\n  role:     Role\n}\n\ninput UpdateUserInput {\n  name:  String\n  email: String\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Nullability Rules</div>\n' +
'  <table class="tbl">\n' +
'    <tr><th>Type Syntax</th><th>Meaning</th><th>Example Value</th></tr>\n' +
'    <tr><td><code>String</code></td><td>Nullable string</td><td>"hello" or null</td></tr>\n' +
'    <tr><td><code>String!</code></td><td>Non-null string</td><td>"hello" (never null)</td></tr>\n' +
'    <tr><td><code>[String]</code></td><td>Nullable list of nullable strings</td><td>["a", null] or null</td></tr>\n' +
'    <tr><td><code>[String!]</code></td><td>Nullable list of non-null strings</td><td>["a", "b"] or null</td></tr>\n' +
'    <tr><td><code>[String!]!</code></td><td>Non-null list of non-null strings</td><td>["a", "b"] (never null)</td></tr>\n' +
'  </table>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">4</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Design a GraphQL schema for an e-commerce platform. Define types for <code>Product</code>, <code>Order</code>, <code>OrderItem</code>, and <code>Customer</code>. Add appropriate queries to list/get products and orders, and mutations to place an order and update product stock.</div>\n' +
'</div>\n';

L['queries'] =
'<h1 class="page-title">Writing Queries &amp; Fields</h1>\n' +
'<div class="page-meta"><span class="badge">&#9685; GraphQL</span><span class="badge">Lesson 3</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>GraphQL <strong>queries</strong> are how clients read data. They look similar to JSON without values — you describe the shape of the data you want, and GraphQL returns exactly that shape filled in with real data.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Query Anatomy</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">GraphQL &#8212; Query Structure</span></div>\n' +
'    <pre><code># Operation type + optional name\nquery GetUserProfile {\n  # Field selection on root Query type\n  user(id: "42") {         # Argument in parentheses\n    id                     # Scalar field\n    name\n    email\n    role\n    posts {                # Nested object field\n      id\n      title\n      comments {\n        text\n        author {\n          name             # Field on nested object\n        }\n      }\n    }\n  }\n}\n\n# Shorthand syntax (anonymous, no operation keyword)\n{\n  users {\n    name\n    email\n  }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Aliases &amp; Multiple Queries</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">GraphQL &#8212; Aliases</span></div>\n' +
'    <pre><code># Aliases let you query the same field multiple times with different args\nquery CompareTwoUsers {\n  firstUser:  user(id: "1") { name email role }\n  secondUser: user(id: "2") { name email role }\n}\n\n# Response:\n{\n  "data": {\n    "firstUser":  { "name": "Balaji", "email": "b@example.com", "role": "ADMIN" },\n    "secondUser": { "name": "Priya",  "email": "p@example.com", "role": "USER"  }\n  }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Fragments — Reusable Field Sets</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">GraphQL &#8212; Fragments</span></div>\n' +
'    <pre><code># Define a reusable fragment\nfragment UserCard on User {\n  id\n  name\n  email\n  role\n}\n\n# Use it in multiple queries\nquery GetUsersAndAuthor {\n  users {\n    ...UserCard        # Spread the fragment\n    posts { title }\n  }\n  post(id: "10") {\n    title\n    author {\n      ...UserCard      # Reuse in a different context\n    }\n  }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">4</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a GraphQL query for a blogging platform that fetches the 10 most recent posts with their title, author name, the first 3 comments on each post, and the total comment count. Use a fragment for the author fields (id, name, avatar).</div>\n' +
'</div>\n';

L['mutations'] =
'<h1 class="page-title">Mutations &#8212; Creating &amp; Updating Data</h1>\n' +
'<div class="page-meta"><span class="badge">&#9685; GraphQL</span><span class="badge">Lesson 4</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>In GraphQL, <strong>mutations</strong> are used for all write operations — creating, updating, and deleting data. Unlike REST which uses different HTTP methods, GraphQL uses mutations for all data modifications through a single <code>POST /graphql</code> endpoint.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Writing Mutations</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">GraphQL &#8212; Mutation Examples</span></div>\n' +
'    <pre><code># Create a new user\nmutation CreateUser {\n  createUser(input: {\n    name:     "Balaji Nayak"\n    email:    "balaji@example.com"\n    password: "SecurePass123!"\n    role:     USER\n  }) {\n    id\n    name\n    email\n    createdAt\n  }\n}\n\n# Update a post\nmutation UpdatePost {\n  updatePost(id: "post-42", input: {\n    title: "Updated Title"\n    body:  "New content here..."\n  }) {\n    id\n    title\n    updatedAt\n    author { name }\n  }\n}\n\n# Delete — return boolean or deleted ID\nmutation DeleteComment {\n  deleteComment(id: "comment-7") {\n    success\n    message\n  }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Multiple Mutations in One Request</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">GraphQL &#8212; Sequential Mutations</span></div>\n' +
'    <pre><code># Multiple mutations run SEQUENTIALLY (in order), unlike queries\nmutation BatchCreate {\n  createCategory: createPost(input: { title: "Category Post", body: "..." }) {\n    id title\n  }\n  pinPost: updatePost(id: "10", input: { isPinned: true }) {\n    id isPinned\n  }\n}\n\n# Response includes both results\n{\n  "data": {\n    "createCategory": { "id": "99", "title": "Category Post" },\n    "pinPost": { "id": "10", "isPinned": true }\n  }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Mutation Return Types Best Practice</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">GraphQL SDL &#8212; Mutation Payload Pattern</span></div>\n' +
'    <pre><code"># Return a dedicated payload type for rich error info\ntype CreateUserPayload {\n  user:   User\n  errors: [UserError!]\n}\n\ntype UserError {\n  field:   String!\n  message: String!\n}\n\ntype Mutation {\n  createUser(input: CreateUserInput!): CreateUserPayload!\n}\n\n# Client query:\nmutation {\n  createUser(input: { name: "", email: "bad" }) {\n    user { id name }\n    errors {\n      field\n      message\n    }\n  }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">4</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write mutations for a shopping cart: <code>addToCart(productId, quantity)</code>, <code>updateCartItem(itemId, quantity)</code>, and <code>checkout(cartId, paymentMethod)</code>. Use payload types with both a success result and an errors array.</div>\n' +
'</div>\n';

L['subscriptions'] =
'<h1 class="page-title">Subscriptions &amp; Real-Time Data</h1>\n' +
'<div class="page-meta"><span class="badge">&#9685; GraphQL</span><span class="badge">Lesson 5</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>GraphQL <strong>subscriptions</strong> enable real-time functionality. Instead of polling an endpoint repeatedly, clients subscribe to events and the server pushes updates as they happen — powered by WebSockets under the hood.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Writing Subscriptions</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">GraphQL &#8212; Subscription Syntax</span></div>\n' +
'    <pre><code># Subscribe to new comments on a specific post\nsubscription WatchComments {\n  commentAdded(postId: "42") {\n    id\n    text\n    createdAt\n    author {\n      id\n      name\n      avatar\n    }\n  }\n}\n\n# Subscribe to live messages in a chat room\nsubscription ChatRoom {\n  messageSent(roomId: "room-1") {\n    id\n    content\n    sender { name }\n    timestamp\n  }\n}\n\n# Subscribe to order status changes\nsubscription TrackOrder {\n  orderStatusChanged(orderId: "ord-99") {\n    id\n    status      # PENDING, PROCESSING, SHIPPED, DELIVERED\n    updatedAt\n  }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Implementing Subscriptions (Apollo Server)</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Apollo Server Subscription Setup</span></div>\n' +
'    <pre><code>const { ApolloServer } = require("@apollo/server");\nconst { expressMiddleware } = require("@apollo/server/express4");\nconst { makeExecutableSchema } = require("@graphql-tools/schema");\nconst { WebSocketServer } = require("ws");\nconst { useServer } = require("graphql-ws/lib/use/ws");\nconst { PubSub } = require("graphql-subscriptions");\n\nconst pubsub = new PubSub();\n\nconst resolvers = {\n  Mutation: {\n    addComment: async (_, { postId, text }, { currentUser }) => {\n      const comment = await Comment.create({ postId, text, authorId: currentUser.id });\n\n      // Publish event to all subscribers\n      pubsub.publish("COMMENT_ADDED", {\n        commentAdded: comment,\n        postId\n      });\n\n      return comment;\n    }\n  },\n\n  Subscription: {\n    commentAdded: {\n      subscribe: (_, { postId }) =>\n        // Filter events — only send if postId matches\n        pubsub.asyncIterableIterator("COMMENT_ADDED"),\n      resolve: (payload) => payload.commentAdded\n    }\n  }\n};\n\n// WebSocket server for subscriptions\nconst wsServer = new WebSocketServer({ server: httpServer, path: "/graphql" });\nuseServer({ schema }, wsServer);</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Build a live notification system using GraphQL subscriptions. Create a <code>notificationReceived(userId: ID!)</code> subscription that fires whenever a new notification is created for that user via a <code>sendNotification</code> mutation.</div>\n' +
'</div>\n';

L['resolvers'] =
'<h1 class="page-title">Resolvers &amp; Execution Model</h1>\n' +
'<div class="page-meta"><span class="badge">&#9685; GraphQL</span><span class="badge">Lesson 6</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>A <strong>resolver</strong> is a function responsible for returning the value of a field in your schema. GraphQL executes resolvers in a tree-like fashion — starting from root query resolvers, then recursively resolving nested fields.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Resolver Signature</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Resolver Function Arguments</span></div>\n' +
'    <pre><code>// Every resolver receives 4 arguments:\n// resolver(parent, args, context, info)\n\nconst resolvers = {\n  Query: {\n    // parent = root value (null for top-level queries)\n    // args   = query arguments { id: "42" }\n    // context= shared data (auth user, DB connections, dataloaders)\n    // info   = query AST, field selection info\n    user: async (parent, args, context, info) => {\n      if (!context.currentUser) throw new Error("Not authenticated");\n      return context.db.User.findById(args.id);\n    },\n\n    users: async (_, { role, limit = 20, offset = 0 }, { db }) => {\n      const filter = role ? { role } : {};\n      return db.User.find(filter).skip(offset).limit(limit);\n    }\n  },\n\n  // Field-level resolvers on User type\n  User: {\n    // parent = the User object returned from the Query resolver\n    posts: async (user, _, { db }) => {\n      return db.Post.find({ authorId: user.id });\n    },\n    // Computed field — not stored in DB\n    fullName: (user) => user.firstName + " " + user.lastName\n  },\n\n  Mutation: {\n    createUser: async (_, { input }, { db, bcrypt }) => {\n      const hash = await bcrypt.hash(input.password, 12);\n      return db.User.create({ ...input, passwordHash: hash });\n    }\n  }\n};</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> The Context Object</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Apollo Server Context</span></div>\n' +
'    <pre><code">const server = new ApolloServer({ typeDefs, resolvers });\n\nawait startStandaloneServer(server, {\n  context: async ({ req }) => {\n    // Build context for EVERY request\n    const token = req.headers.authorization?.split(" ")[1];\n    let currentUser = null;\n    if (token) {\n      try {\n        const decoded = jwt.verify(token, process.env.JWT_SECRET);\n        currentUser = await User.findById(decoded.userId);\n      } catch {}\n    }\n    return {\n      currentUser,           // attached user\n      db: { User, Post },   // database models\n      dataloaders            // batch loaders (Lesson 11)\n    };\n  }\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a full resolver map for a <code>Post</code> type that includes: <code>author</code> (fetched from DB by authorId), <code>commentCount</code> (computed by counting comments), and <code>readingTime</code> (computed as body word count divided by 200, in minutes).</div>\n' +
'</div>\n';

L['variables'] =
'<h1 class="page-title">Variables, Arguments &amp; Directives</h1>\n' +
'<div class="page-meta"><span class="badge">&#9685; GraphQL</span><span class="badge">Lesson 7</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>GraphQL <strong>variables</strong> let you pass dynamic values into queries and mutations without string interpolation. <strong>Directives</strong> let you conditionally include or skip fields at query time.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Query Variables</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">GraphQL &#8212; Variables Syntax</span></div>\n' +
'    <pre><code># Define variables with $ prefix in the operation signature\nquery GetUser($userId: ID!, $includeInactive: Boolean = false) {\n  user(id: $userId) {\n    name\n    email\n    posts(includeInactive: $includeInactive) {\n      title\n      status\n    }\n  }\n}\n\n# Variables are passed as a separate JSON object\n# (sent alongside the query in the POST body)\n{\n  "userId": "42",\n  "includeInactive": true\n}\n\n# Mutation with variable\nmutation CreatePost($input: CreatePostInput!) {\n  createPost(input: $input) {\n    id title createdAt\n  }\n}\n\n# Variable values:\n{\n  "input": {\n    "title": "My First Post",\n    "body": "Content here...",\n    "tags": ["graphql", "tutorial"]\n  }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Built-in Directives</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">GraphQL &#8212; @include and @skip Directives</span></div>\n' +
'    <pre><code">query GetProfile($withPosts: Boolean!, $skipEmail: Boolean!) {\n  me {\n    id\n    name\n    email @skip(if: $skipEmail)      # omit field if true\n    posts @include(if: $withPosts) { # only include if true\n      title\n      createdAt\n    }\n  }\n}\n\n# Variables:\n{ "withPosts": true, "skipEmail": false }\n\n# Custom directives (defined in schema)\ntype Query {\n  secretData: String @deprecated(reason: "Use newSecretData instead")\n  newSecretData: String\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Inline Fragments for Union Types</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">GraphQL &#8212; Inline Fragments</span></div>\n' +
'    <pre><code>union SearchResult = User | Post | Comment\n\nquery Search($term: String!) {\n  search(term: $term) {\n    # Common field on all types\n    __typename\n\n    # Type-specific fields using inline fragments\n    ... on User {\n      name\n      email\n    }\n    ... on Post {\n      title\n      author { name }\n    }\n    ... on Comment {\n      text\n      post { title }\n    }\n  }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">4</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a paginated query with variables: <code>$page: Int = 1</code>, <code>$limit: Int = 10</code>, <code>$filter: PostFilter</code>, and <code>$orderBy: PostOrderBy</code>. Include a <code>@deprecated</code> directive on an old field and use <code>@skip</code> to conditionally include author details.</div>\n' +
'</div>\n';

L['types'] =
'<h1 class="page-title">Types &#8212; Scalars, Enums &amp; Interfaces</h1>\n' +
'<div class="page-meta"><span class="badge">&#9685; GraphQL</span><span class="badge">Lesson 8</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>GraphQL has a rich type system beyond simple Object Types. <strong>Scalars</strong> represent leaf values, <strong>Enums</strong> constrain string options, <strong>Interfaces</strong> define shared fields across types, and <strong>Unions</strong> group heterogeneous types.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Built-in &amp; Custom Scalars</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">GraphQL SDL &#8212; Scalars</span></div>\n' +
'    <pre><code"># Built-in scalars\n# Int, Float, String, Boolean, ID\n\n# Custom scalars (require resolver implementations)\nscalar DateTime    # ISO 8601 date string\nscalar Email       # Validated email address\nscalar URL         # Valid URL string\nscalar JSON        # Arbitrary JSON blob\nscalar Upload      # File upload\n\ntype User {\n  id:        ID!\n  email:     Email!\n  website:   URL\n  createdAt: DateTime!\n  metadata:  JSON\n}\n\n# Scalar resolver (Node.js)\nconst { GraphQLScalarType, Kind } = require("graphql");\n\nconst DateTimeScalar = new GraphQLScalarType({\n  name: "DateTime",\n  serialize:  (value) => new Date(value).toISOString(),\n  parseValue: (value) => new Date(value),\n  parseLiteral: (ast) => {\n    if (ast.kind === Kind.STRING) return new Date(ast.value);\n    return null;\n  }\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Interfaces &amp; Unions</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">GraphQL SDL &#8212; Interface &amp; Union</span></div>\n' +
'    <pre><code># Interface — shared contract\ninterface Node {\n  id: ID!\n}\n\ninterface Timestamped {\n  createdAt: DateTime!\n  updatedAt: DateTime!\n}\n\ntype User implements Node & Timestamped {\n  id:        ID!\n  name:      String!\n  createdAt: DateTime!\n  updatedAt: DateTime!\n}\n\ntype Post implements Node & Timestamped {\n  id:        ID!\n  title:     String!\n  createdAt: DateTime!\n  updatedAt: DateTime!\n}\n\n# Union — completely different types\nunion SearchResult = User | Post | Product\n\ntype Query {\n  node(id: ID!): Node          # Returns any Node implementor\n  search(q: String!): [SearchResult!]!\n}\n\n# __resolveType is required for interfaces and unions\nconst resolvers = {\n  SearchResult: {\n    __resolveType: (obj) => {\n      if (obj.email)  return "User";\n      if (obj.title)  return "Post";\n      if (obj.price)  return "Product";\n      return null;\n    }\n  }\n};</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Design a notification system schema using an interface: <code>interface Notification { id: ID!, createdAt: DateTime!, read: Boolean! }</code> with three implementing types: <code>CommentNotification</code>, <code>FollowNotification</code>, and <code>MentionNotification</code>. Each should have type-specific fields.</div>\n' +
'</div>\n';

L['apollo-server'] =
'<h1 class="page-title">Building with Apollo Server</h1>\n' +
'<div class="page-meta"><span class="badge">&#9685; GraphQL</span><span class="badge">Lesson 9</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p><strong>Apollo Server</strong> is the most popular GraphQL server library for Node.js. It integrates with Express, provides built-in error handling, a Sandbox explorer, and supports plugins for logging, caching, and tracing.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Standalone Apollo Server Setup</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Terminal &#8212; Install Apollo Server</span></div>\n' +
'    <pre><code>npm install @apollo/server graphql</code></pre>\n' +
'  </div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; server.js</span></div>\n' +
'    <pre><code">const { ApolloServer } = require("@apollo/server");\nconst { startStandaloneServer } = require("@apollo/server/standalone");\n\nconst typeDefs = `\n  type User {\n    id: ID!\n    name: String!\n    email: String!\n  }\n  type Query {\n    users: [User!]!\n    user(id: ID!): User\n  }\n  type Mutation {\n    createUser(name: String!, email: String!): User!\n  }\n`;\n\n// In-memory data\nconst users = [{ id: "1", name: "Balaji", email: "b@example.com" }];\n\nconst resolvers = {\n  Query: {\n    users: () => users,\n    user: (_, { id }) => users.find(u => u.id === id)\n  },\n  Mutation: {\n    createUser: (_, { name, email }) => {\n      const user = { id: String(users.length + 1), name, email };\n      users.push(user);\n      return user;\n    }\n  }\n};\n\nconst server = new ApolloServer({ typeDefs, resolvers });\n\nconst { url } = await startStandaloneServer(server, {\n  listen: { port: 4000 },\n  context: async ({ req }) => {\n    return { token: req.headers.authorization };\n  }\n});\nconsole.log("GraphQL Server ready at:", url);</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Apollo Server with Express (Production)</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Express Integration</span></div>\n' +
'    <pre><code>const express = require("express");\nconst { ApolloServer } = require("@apollo/server");\nconst { expressMiddleware } = require("@apollo/server/express4");\nconst cors    = require("cors");\nconst { json } = require("body-parser");\n\nconst app    = express();\nconst server = new ApolloServer({ typeDefs, resolvers });\n\nawait server.start();\n\napp.use(\n  "/graphql",\n  cors(),\n  json(),\n  expressMiddleware(server, {\n    context: async ({ req }) => buildContext(req)\n  })\n);\n\n// Can still add regular REST routes\napp.get("/health", (_, res) => res.json({ status: "ok" }));\n\napp.listen(4000, () => console.log("Server ready on port 4000"));</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Error Handling</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Apollo GraphQL Errors</span></div>\n' +
'    <pre><code">const { GraphQLError } = require("graphql");\n\nconst resolvers = {\n  Query: {\n    user: async (_, { id }, { currentUser }) => {\n      if (!currentUser) {\n        throw new GraphQLError("Not authenticated", {\n          extensions: { code: "UNAUTHENTICATED" }\n        });\n      }\n      const user = await User.findById(id);\n      if (!user) {\n        throw new GraphQLError("User not found", {\n          extensions: { code: "NOT_FOUND", id }\n        });\n      }\n      return user;\n    }\n  }\n};</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">4</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Build a fully working Apollo Server with a <code>Product</code> type. Implement <code>products</code> query (with optional <code>category</code> filter), <code>product(id)</code> query, <code>createProduct</code> mutation, and proper error handling for not-found cases.</div>\n' +
'</div>\n';

L['apollo-client'] =
'<h1 class="page-title">Apollo Client with React</h1>\n' +
'<div class="page-meta"><span class="badge">&#9685; GraphQL</span><span class="badge">Lesson 10</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p><strong>Apollo Client</strong> is the leading state management library for consuming GraphQL APIs in React. It handles fetching, caching, and synchronizing data from your GraphQL server with your React components.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Setup</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Terminal &#8212; Install Apollo Client</span></div>\n' +
'    <pre><code">npm install @apollo/client graphql</code></pre>\n' +
'  </div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Apollo Client Setup (main.jsx)</span></div>\n' +
'    <pre><code">import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";\nimport { setContext } from "@apollo/client/link/context";\n\nconst httpLink = createHttpLink({ uri: "http://localhost:4000/graphql" });\n\n// Attach JWT token to every request\nconst authLink = setContext((_, { headers }) => {\n  const token = localStorage.getItem("token");\n  return {\n    headers: { ...headers, authorization: token ? "Bearer " + token : "" }\n  };\n});\n\nconst client = new ApolloClient({\n  link: authLink.concat(httpLink),\n  cache: new InMemoryCache()\n});\n\nReactDOM.createRoot(document.getElementById("root")).render(\n  &lt;ApolloProvider client={client}&gt;\n    &lt;App /&gt;\n  &lt;/ApolloProvider&gt;\n);</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> useQuery &amp; useMutation Hooks</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; React Component with Apollo Hooks</span></div>\n' +
'    <pre><code">import { useQuery, useMutation, gql } from "@apollo/client";\n\nconst GET_POSTS = gql`\n  query GetPosts($limit: Int) {\n    posts(limit: $limit) {\n      id title\n      author { name }\n      commentCount\n    }\n  }\n`;\n\nconst CREATE_POST = gql`\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) { id title }\n  }\n`;\n\nfunction PostList() {\n  const { loading, error, data } = useQuery(GET_POSTS, {\n    variables: { limit: 10 }\n  });\n\n  const [createPost, { loading: creating }] = useMutation(CREATE_POST, {\n    // Automatically refetch posts after mutation\n    refetchQueries: [{ query: GET_POSTS, variables: { limit: 10 } }]\n  });\n\n  if (loading) return &lt;p&gt;Loading...&lt;/p&gt;;\n  if (error)   return &lt;p&gt;Error: {error.message}&lt;/p&gt;;\n\n  return (\n    &lt;div&gt;\n      {data.posts.map(post =&gt; (\n        &lt;div key={post.id}&gt;\n          &lt;h2&gt;{post.title}&lt;/h2&gt;\n          &lt;p&gt;by {post.author.name}&lt;/p&gt;\n        &lt;/div&gt;\n      ))}\n    &lt;/div&gt;\n  );\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Build a React component that uses <code>useQuery</code> to list products with a category filter dropdown, and <code>useMutation</code> to add a new product via a form. Use Apollo cache update (<code>cache.modify</code>) instead of refetching to update the list after creation.</div>\n' +
'</div>\n';

L['dataloader'] =
'<h1 class="page-title">DataLoader &amp; N+1 Problem</h1>\n' +
'<div class="page-meta"><span class="badge">&#9685; GraphQL</span><span class="badge">Lesson 11</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>The <strong>N+1 problem</strong> is GraphQL\'s most notorious performance pitfall. When fetching a list of items each with nested data, naive resolvers fire one database query per item. <strong>DataLoader</strong> batches and caches these calls into a single query.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> The N+1 Problem Illustrated</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">GraphQL Query that causes N+1</span></div>\n' +
'    <pre><code"># This innocent-looking query causes N+1 database queries\n{\n  posts {           # 1 query: SELECT * FROM posts\n    title\n    author {        # N queries: SELECT * FROM users WHERE id = ?\n      name          # One query per post!\n    }\n  }\n}\n\n# With 100 posts: 1 + 100 = 101 database queries!\n# With DataLoader:  1 + 1   = 2 database queries</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Fixing with DataLoader</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; DataLoader Setup</span></div>\n' +
'    <pre><code>const DataLoader = require("dataloader");\n\n// Batch function — receives array of IDs, returns array of results\nasync function batchUsers(userIds) {\n  // ONE query for all IDs at once\n  const users = await User.find({ _id: { $in: userIds } });\n  // Must return in same order as input IDs!\n  const userMap = {};\n  users.forEach(u => { userMap[u.id] = u; });\n  return userIds.map(id => userMap[id] || null);\n}\n\n// Create per-request DataLoader (never share between requests!)\nfunction createLoaders() {\n  return {\n    userLoader:    new DataLoader(batchUsers),\n    commentLoader: new DataLoader(batchCommentsByPostId)\n  };\n}\n\n// In Apollo Server context\ncontext: async ({ req }) => ({\n  currentUser: await getUser(req),\n  loaders: createLoaders()  // Fresh loaders per request\n});\n\n// In resolver — uses loader instead of direct DB call\nconst resolvers = {\n  Post: {\n    author: (post, _, { loaders }) => {\n      return loaders.userLoader.load(post.authorId); // batched automatically!\n    }\n  }\n};</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Add a <code>commentLoader</code> DataLoader that batches comment fetching by postId. Use it in the <code>Post.comments</code> resolver. Compare the number of DB queries before and after (use Mongoose\'s debug mode to see queries).</div>\n' +
'</div>\n';

L['authentication'] =
'<h1 class="page-title">Authentication &amp; Authorization</h1>\n' +
'<div class="page-meta"><span class="badge">&#9685; GraphQL</span><span class="badge">Lesson 12</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>GraphQL has no built-in auth mechanism. Authentication (who you are) and authorization (what you can do) are implemented via the <strong>context</strong> object and resolver-level guard checks. Schema-level directives offer a declarative alternative.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Context-Based Auth Guards</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Auth in Resolvers</span></div>\n' +
'    <pre><code>const { GraphQLError } = require("graphql");\n\n// Reusable auth helpers\nfunction requireAuth(context) {\n  if (!context.currentUser) {\n    throw new GraphQLError("Authentication required", {\n      extensions: { code: "UNAUTHENTICATED" }\n    });\n  }\n  return context.currentUser;\n}\n\nfunction requireRole(context, ...roles) {\n  const user = requireAuth(context);\n  if (!roles.includes(user.role)) {\n    throw new GraphQLError("Insufficient permissions", {\n      extensions: { code: "FORBIDDEN", requiredRoles: roles }\n    });\n  }\n  return user;\n}\n\n// Usage in resolvers\nconst resolvers = {\n  Query: {\n    me:    (_, __, ctx) => requireAuth(ctx),\n    users: (_, __, ctx) => { requireRole(ctx, "ADMIN"); return User.find(); },\n  },\n  Mutation: {\n    deleteUser: async (_, { id }, ctx) => {\n      requireRole(ctx, "ADMIN");\n      await User.findByIdAndDelete(id);\n      return true;\n    },\n    updatePost: async (_, { id, input }, ctx) => {\n      const user = requireAuth(ctx);\n      const post = await Post.findById(id);\n      if (!post) throw new GraphQLError("Post not found", { extensions: { code: "NOT_FOUND" } });\n      if (post.authorId.toString() !== user.id && user.role !== "ADMIN") {\n        throw new GraphQLError("You can only edit your own posts", { extensions: { code: "FORBIDDEN" } });\n      }\n      return Post.findByIdAndUpdate(id, input, { new: true });\n    }\n  }\n};</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Schema-Level Auth Directive</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">GraphQL SDL &#8212; @auth Directive</span></div>\n' +
'    <pre><code">directive @auth(requires: Role = USER) on FIELD_DEFINITION\n\nenum Role { USER EDITOR ADMIN }\n\ntype Query {\n  me:           User!  @auth\n  users:        [User] @auth(requires: ADMIN)\n  publicPosts:  [Post]                    # No auth required\n}\n\ntype Mutation {\n  createPost:  Post!  @auth\n  deleteUser:  Boolean @auth(requires: ADMIN)\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Implement a <code>@auth</code> directive using <code>mapSchema</code> from <code>@graphql-tools/schema</code> that wraps resolvers automatically, checking <code>context.currentUser</code> before executing the field resolver.</div>\n' +
'</div>\n';

L['pagination'] =
'<h1 class="page-title">Pagination with Relay Connections</h1>\n' +
'<div class="page-meta"><span class="badge">&#9685; GraphQL</span><span class="badge">Lesson 13</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>The <strong>Relay Cursor Connection Specification</strong> is the GraphQL community standard for pagination. It uses edges, nodes, and cursors to enable efficient, consistent pagination that works for both infinite scroll and page-based UIs.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Connection Schema Pattern</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">GraphQL SDL &#8212; Relay Connection Types</span></div>\n' +
'    <pre><code">type PostConnection {\n  edges:    [PostEdge!]!\n  pageInfo: PageInfo!\n  totalCount: Int!\n}\n\ntype PostEdge {\n  cursor: String!    # Opaque position marker\n  node:   Post!      # The actual data\n}\n\ntype PageInfo {\n  hasNextPage:     Boolean!\n  hasPreviousPage: Boolean!\n  startCursor:     String\n  endCursor:       String\n}\n\ntype Query {\n  # Forward pagination:  first + after\n  # Backward pagination: last  + before\n  posts(\n    first:  Int\n    after:  String\n    last:   Int\n    before: String\n    filter: PostFilter\n  ): PostConnection!\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Connection Resolver Implementation</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Cursor Pagination Resolver</span></div>\n' +
'    <pre><code">function encodeCursor(id) { return Buffer.from("cursor:" + id).toString("base64"); }\nfunction decodeCursor(cursor) { return Buffer.from(cursor, "base64").toString().split("cursor:")[1]; }\n\nconst resolvers = {\n  Query: {\n    posts: async (_, { first = 10, after, filter = {} }) => {\n      const query = { ...filter };\n      if (after) {\n        const lastId = decodeCursor(after);\n        query._id = { $gt: lastId };   // fetch records AFTER cursor\n      }\n\n      // Fetch one extra to determine hasNextPage\n      const items = await Post.find(query).sort({ _id: 1 }).limit(first + 1);\n      const hasNextPage = items.length > first;\n      const edges = items.slice(0, first).map(post => ({\n        cursor: encodeCursor(post.id),\n        node: post\n      }));\n\n      return {\n        edges,\n        totalCount: await Post.countDocuments(filter),\n        pageInfo: {\n          hasNextPage,\n          hasPreviousPage: !!after,\n          startCursor: edges[0]?.cursor || null,\n          endCursor:   edges[edges.length - 1]?.cursor || null\n        }\n      };\n    }\n  }\n};</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Build an infinite-scroll UI component in React using <code>useQuery</code> with <code>fetchMore</code>. When the user scrolls to the bottom, call <code>fetchMore</code> with the <code>endCursor</code> as the <code>after</code> variable, and merge the new results into the existing Apollo cache.</div>\n' +
'</div>\n';

L['testing'] =
'<h1 class="page-title">Testing GraphQL APIs</h1>\n' +
'<div class="page-meta"><span class="badge">&#9685; GraphQL</span><span class="badge">Lesson 14</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Testing GraphQL APIs requires a slightly different approach than REST — since all requests go to a single endpoint, you test by sending GraphQL operation strings. The <code>@apollo/server</code> testing utilities and Jest make this straightforward.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Unit Testing Resolvers</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Resolver Unit Tests</span></div>\n' +
'    <pre><code">// resolvers.test.js\nconst { resolvers } = require("../src/resolvers");\n\ndescribe("Query.user", () => {\n  it("returns a user when found", async () => {\n    const mockUser = { id: "1", name: "Balaji", email: "b@test.com" };\n    const mockDB   = { User: { findById: jest.fn().mockResolvedValue(mockUser) } };\n    const mockCtx  = { currentUser: { id: "1", role: "USER" }, db: mockDB };\n\n    const result = await resolvers.Query.user(null, { id: "1" }, mockCtx);\n    expect(result).toEqual(mockUser);\n    expect(mockDB.User.findById).toHaveBeenCalledWith("1");\n  });\n\n  it("throws UNAUTHENTICATED when no user in context", async () => {\n    const ctx = { currentUser: null };\n    await expect(\n      resolvers.Query.user(null, { id: "1" }, ctx)\n    ).rejects.toThrow("Authentication required");\n  });\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Integration Tests with Apollo Test Client</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Apollo Server Integration Tests</span></div>\n' +
'    <pre><code">const { ApolloServer } = require("@apollo/server");\nconst { typeDefs } = require("../src/schema");\nconst { resolvers } = require("../src/resolvers");\n\ndescribe("GraphQL Integration Tests", () => {\n  let server;\n\n  beforeAll(async () => {\n    server = new ApolloServer({ typeDefs, resolvers });\n    await server.start();\n  });\n\n  afterAll(() => server.stop());\n\n  it("fetches all users", async () => {\n    const { body } = await server.executeOperation({\n      query: "{ users { id name email } }"\n    });\n\n    expect(body.kind).toBe("single");\n    expect(body.singleResult.errors).toBeUndefined();\n    expect(Array.isArray(body.singleResult.data.users)).toBe(true);\n  });\n\n  it("creates a user via mutation", async () => {\n    const { body } = await server.executeOperation({\n      query:     "mutation CreateUser($input: CreateUserInput!) { createUser(input: $input) { id name } }",\n      variables: { input: { name: "Test User", email: "test@test.com", password: "Pass123!" } }\n    }, {\n      contextValue: { currentUser: null }\n    });\n\n    expect(body.singleResult.data.createUser.name).toBe("Test User");\n  });\n\n  it("returns UNAUTHENTICATED error for protected queries", async () => {\n    const { body } = await server.executeOperation(\n      { query: "{ me { id name } }" },\n      { contextValue: { currentUser: null } }\n    );\n\n    expect(body.singleResult.errors[0].extensions.code).toBe("UNAUTHENTICATED");\n  });\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a complete test suite for a <code>Post</code> resolver covering: listing posts (unauthenticated), creating a post (authenticated), updating a post (owner only), and deleting a post (admin only). Use mock contexts with different roles.</div>\n' +
'</div>\n';

L['deployment'] =
'<h1 class="page-title">Production, Persisted Queries &amp; Monitoring</h1>\n' +
'<div class="page-meta"><span class="badge">&#9685; GraphQL</span><span class="badge">Lesson 15</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Running GraphQL in production requires disabling introspection, implementing persisted queries for performance, setting query depth limits to prevent abuse, and connecting to monitoring/tracing tools.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Production Security Settings</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Apollo Server Production Config</span></div>\n' +
'    <pre><code">const { ApolloServer } = require("@apollo/server");\nconst depthLimit = require("graphql-depth-limit");\nconst { createComplexityLimitRule } = require("graphql-validation-complexity");\n\nconst server = new ApolloServer({\n  typeDefs,\n  resolvers,\n\n  // Disable introspection in production (hides schema from attackers)\n  introspection: process.env.NODE_ENV !== "production",\n\n  // Query validation rules\n  validationRules: [\n    depthLimit(7),                              // Max 7 levels of nesting\n    createComplexityLimitRule(1000)             // Max complexity score\n  ],\n\n  // Plugin for request logging\n  plugins: [\n    {\n      requestDidStart: async () => ({\n        willSendResponse: async ({ response, request }) => {\n          console.log({ operation: request.operationName, status: response.http.status });\n        }\n      })\n    }\n  ]\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Persisted Queries</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Automatic Persisted Queries (APQ)</span></div>\n' +
'    <pre><code">// Server: install persisted queries plugin\nnpm install @apollo/server-plugin-operation-registry\n\n// Client: enable APQ in Apollo Client\nimport { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";\nimport { sha256 } from "crypto-hash";\n\nconst persistedQueriesLink = createPersistedQueryLink({ sha256 });\n\nconst client = new ApolloClient({\n  link: persistedQueriesLink.concat(authLink).concat(httpLink),\n  cache: new InMemoryCache()\n});\n\n// How it works:\n// 1. Client sends only the hash of the query (tiny payload)\n// 2. If server recognizes hash -> executes query\n// 3. If not -> client resends with full query text\n// 4. Server stores hash->query mapping\n// Benefit: massive reduction in request payload size</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Monitoring with Apollo Studio</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Apollo Studio Connection</span></div>\n' +
'    <pre><code">// .env\nAPOLLO_KEY=service:my-api:xxxxx\nAPOLLO_GRAPH_REF=my-api@current\n\n// Automatic with @apollo/server — just set APOLLO_KEY env var\n// Apollo Studio provides:\n// - Field-level usage analytics\n// - Slow query tracing\n// - Error rate monitoring\n// - Schema change alerts\n// - Client-aware metrics</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">4</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Deploy your Apollo Server to <strong>Railway.app</strong> or <strong>Render.com</strong>. Configure it with: introspection disabled, depth limit of 5, CORS restricted to your frontend domain, and a <code>/health</code> REST endpoint for uptime monitoring.</div>\n' +
'</div>\n';

// ─── GENERATE FILES ──────────────────────────────────────────────────────────

console.log('Starting GraphQL lesson generation...');

lessons.forEach((l, index) => {
  const prev = index > 0 ? lessons[index - 1] : null;
  const next = index < lessons.length - 1 ? lessons[index + 1] : null;

  const html = wrapPage(
    l.slug, l.title,
    L[l.slug] || '<p>Content coming soon.</p>',
    prev ? prev.filename : null,
    prev ? prev.title : null,
    next ? next.filename : null,
    next ? next.title : null
  );

  fs.writeFileSync(path.join(publicDir, l.filename), html, 'utf8');
  console.log('Generated:', l.filename);
});

// Index page
const indexContent =
'<h1 class="page-title">GraphQL Tutorial &#8212; Complete Guide</h1>\n' +
'<div class="page-meta"><span class="badge">&#9685; GraphQL</span><span class="badge">&#128994; Beginner to Advanced</span><span class="badge">&#128197; July 2026</span></div>\n' +
'<div class="intro-box"><p>GraphQL is the modern alternative to REST for building flexible, efficient APIs. This 15-lesson course takes you from core concepts and schema design all the way to building real-time subscriptions, optimizing with DataLoader, and deploying to production.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">&#9658;</span> Course Curriculum</div>\n' +
'  <table class="tbl" style="margin-top:15px;">\n' +
'    <tr><th>Lesson</th><th>Topic</th></tr>\n' +
  lessons.map(l => '    <tr><td><strong>Lesson ' + l.num + '</strong></td><td><a href="/' + l.filename + '"><strong>' + l.title + '</strong></a></td></tr>').join('\n') + '\n' +
'  </table>\n' +
'</div>\n';

const indexHtml = wrapPage(
  'home',
  'GraphQL Tutorial — Complete Beginner to Advanced Guide',
  indexContent,
  null, null,
  lessons[0].filename,
  lessons[0].title
);

fs.writeFileSync(path.join(publicDir, 'blog-graphql.html'), indexHtml, 'utf8');
console.log('Generated: blog-graphql.html');
console.log('Done! All 15 GraphQL lessons generated successfully.');
