const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const blogDir = path.join(publicDir, 'blog-rest-api');

if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

const lessons = [
  { slug: 'intro',           num: 1,  title: 'What is a REST API?',                     filename: 'blog-rest-api/intro.html' },
  { slug: 'http-methods',    num: 2,  title: 'HTTP Methods & Status Codes',              filename: 'blog-rest-api/http-methods.html' },
  { slug: 'endpoints',       num: 3,  title: 'Designing RESTful Endpoints',              filename: 'blog-rest-api/endpoints.html' },
  { slug: 'request-response',num: 4,  title: 'Request & Response Structure',             filename: 'blog-rest-api/request-response.html' },
  { slug: 'json-data',       num: 5,  title: 'JSON Data Format & Serialization',         filename: 'blog-rest-api/json-data.html' },
  { slug: 'authentication',  num: 6,  title: 'Authentication — API Keys & JWT',          filename: 'blog-rest-api/authentication.html' },
  { slug: 'authorization',   num: 7,  title: 'Authorization & Role-Based Access',        filename: 'blog-rest-api/authorization.html' },
  { slug: 'crud-api',        num: 8,  title: 'Building a CRUD API (Node + Express)',     filename: 'blog-rest-api/crud-api.html' },
  { slug: 'pagination',      num: 9,  title: 'Pagination, Filtering & Sorting',          filename: 'blog-rest-api/pagination.html' },
  { slug: 'validation',      num: 10, title: 'Input Validation & Error Responses',       filename: 'blog-rest-api/validation.html' },
  { slug: 'versioning',      num: 11, title: 'API Versioning Strategies',                filename: 'blog-rest-api/versioning.html' },
  { slug: 'rate-limiting',   num: 12, title: 'Rate Limiting & Security Headers',         filename: 'blog-rest-api/rate-limiting.html' },
  { slug: 'documentation',   num: 13, title: 'API Documentation with Swagger/OpenAPI',  filename: 'blog-rest-api/documentation.html' },
  { slug: 'testing',         num: 14, title: 'Testing REST APIs (Jest + Supertest)',     filename: 'blog-rest-api/testing.html' },
  { slug: 'deployment',      num: 15, title: 'Deploying & Monitoring REST APIs',         filename: 'blog-rest-api/deployment.html' }
];

function getSidebar(activeSlug) {
  let html = '\n    <div class="sidebar-heading">REST API Tutorial</div>\n';
  html += '    <a href="/blog-rest-api.html"' + (activeSlug === 'home' ? ' class="active"' : '') + '>REST API HOME</a>\n';
  lessons.forEach(l => {
    html += '    <a href="/' + l.filename + '"' + (activeSlug === l.slug ? ' class="active"' : '') + '>' + l.num + '. ' + l.title + '</a>\n';
  });
  html += '\n    <div class="sidebar-heading">Related Topics</div>\n';
  html += '    <a href="/blog-nodejs.html">Node.js</a>\n';
  html += '    <a href="/blog-express.html">Express.js</a>\n';
  html += '    <a href="/blog-graphql.html">GraphQL</a>\n';
  html += '    <a href="/blog-mongodb.html">MongoDB</a>\n';
  html += '    <a href="/blog-postgresql.html">PostgreSQL</a>\n';
  html += '    <a href="/blog-docker.html">Docker</a>\n';
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
    navFooter += '      <a href="/blog-rest-api.html" class="nav-btn">\n';
    navFooter += '        <span class="label">&#8592; REST API Overview</span>\n';
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

  return '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8" />\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
'  <title>' + title + ' | Our Compiler</title>\n' +
'  <meta name="description" content="Learn REST APIs — ' + title + ' with clear explanations, structured code examples, and practical challenges." />\n' +
'  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />\n' +
'  <link rel="icon" type="image/png" href="/logo.png" />\n' +
'  <link rel="preconnect" href="https://fonts.googleapis.com" />\n' +
'  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />\n' +
'  <link rel="stylesheet" href="/blog-style.css" />\n' +
'  <script>\n' +
'    (function() {\n' +
'      const t = localStorage.getItem("theme") || "dark";\n' +
'      if (t === "light") { document.documentElement.classList.add("light-theme"); document.addEventListener("DOMContentLoaded", () => { document.body.classList.add("light-theme"); }); }\n' +
'      window.addEventListener("DOMContentLoaded", () => {\n' +
'        const nav = document.querySelector(".topnav");\n' +
'        if (nav) {\n' +
'          const btn = document.createElement("button");\n' +
'          btn.style.cssText = "margin-left:auto;flex-shrink:0;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:6px;padding:4px 10px;font-size:12px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif;transition:all 0.2s;white-space:nowrap;margin-right:12px;";\n' +
'          const upd = () => { btn.innerHTML = document.body.classList.contains("light-theme") ? "&#127769; Dark" : "&#9728;&#65039; Light"; };\n' +
'          upd();\n' +
'          btn.onclick = () => { document.body.classList.toggle("light-theme"); document.documentElement.classList.toggle("light-theme"); localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark"); upd(); };\n' +
'          nav.appendChild(btn);\n' +
'        }\n' +
'        document.querySelectorAll(".code-block").forEach(block => {\n' +
'          const header = block.querySelector(".code-block-header");\n' +
'          const codeEl = block.querySelector("pre code");\n' +
'          if (!header || !codeEl) return;\n' +
'          let ac = header.querySelector(".code-actions");\n' +
'          if (!ac) { ac = document.createElement("div"); ac.className = "code-actions"; ac.style.cssText = "display:flex;gap:8px;align-items:center;margin-left:auto;"; header.appendChild(ac); }\n' +
'          const cb = document.createElement("button");\n' +
'          cb.innerHTML = "&#128203; Copy";\n' +
'          cb.style.cssText = "background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:6px;padding:4px 10px;font-size:11px;font-weight:600;cursor:pointer;transition:all 0.2s;font-family:Inter,sans-serif;white-space:nowrap;";\n' +
'          cb.onclick = () => { navigator.clipboard.writeText(codeEl.textContent).then(() => { cb.innerHTML = "&#9989; Copied!"; setTimeout(() => { cb.innerHTML = "&#128203; Copy"; }, 2000); }); };\n' +
'          ac.appendChild(cb);\n' +
'        });\n' +
'      });\n' +
'    })();\n' +
'  </script>\n' +
'</head>\n' +
'<body class="lang-rest-api">\n' +
'<nav class="topnav">\n' +
'  <a href="/" class="brand">&#128187; Our Compiler</a>\n' +
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
'  <a href="/blog-rest-api.html" class="active">REST API</a>\n' +
'  <a href="/blog-graphql.html">GraphQL</a>\n' +
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
'  <a href="/blog-agile.html">Agile &amp; Scrum</a>\n' +
'</nav>\n' +
'<div class="layout">\n' +
'  <aside class="sidebar">\n' +
'    ' + getSidebar(slug) + '\n' +
'  </aside>\n' +
'  <main class="content">\n' +
'    <div class="breadcrumb">\n' +
'      <a href="/">Home</a><span>&#8250;</span>\n' +
'      <a href="/blog.html">Tutorials</a><span>&#8250;</span>\n' +
'      <a href="/blog-rest-api.html">REST API</a><span>&#8250;</span>\n' +
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
'<h1 class="page-title">What is a REST API?</h1>\n' +
'<div class="page-meta">\n' +
'  <span class="badge">&#128279; REST API</span>\n' +
'  <span class="badge">Lesson 1</span>\n' +
'  <span class="badge">Beginner</span>\n' +
'</div>\n' +
'<div class="intro-box">\n' +
'  <p>A <strong>REST API</strong> (Representational State Transfer Application Programming Interface) is a set of rules that allows software programs to communicate over the web using standard HTTP. It is the most widely-adopted API design architecture in modern software development.</p>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> The 6 REST Constraints</div>\n' +
'  <p>An API is RESTful when it follows these architectural constraints defined by Roy Fielding in 2000:</p>\n' +
'  <ul>\n' +
'    <li><strong>Client-Server</strong>: The UI and data storage concerns are separated. The client and server evolve independently.</li>\n' +
'    <li><strong>Stateless</strong>: Every request from client to server must contain all information needed to understand it. The server stores no session state between requests.</li>\n' +
'    <li><strong>Cacheable</strong>: Responses must define themselves as cacheable or non-cacheable to improve efficiency.</li>\n' +
'    <li><strong>Uniform Interface</strong>: A consistent, standardized way to interact with the server (resources, HTTP verbs, self-describing messages).</li>\n' +
'    <li><strong>Layered System</strong>: Clients cannot tell whether they are connected directly to the server or a middleware layer (load balancer, cache, gateway).</li>\n' +
'    <li><strong>Code on Demand</strong> (optional): Servers can send executable code to clients (e.g. JavaScript snippets).</li>\n' +
'  </ul>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> How REST Works — The Request/Response Cycle</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">HTTP &#8212; A REST Request Example</span></div>\n' +
'    <pre><code>--- REQUEST ---\nGET /api/v1/users/42 HTTP/1.1\nHost: api.example.com\nAuthorization: Bearer eyJhbGci...\nAccept: application/json\n\n--- RESPONSE ---\nHTTP/1.1 200 OK\nContent-Type: application/json\nCache-Control: max-age=300\n\n{\n  "id": 42,\n  "name": "Balaji Nayak",\n  "email": "balaji@example.com",\n  "role": "admin",\n  "createdAt": "2026-01-15T10:30:00Z"\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> REST vs Other API Styles</div>\n' +
'  <table class="tbl">\n' +
'    <tr><th>Feature</th><th>REST</th><th>GraphQL</th><th>SOAP</th><th>gRPC</th></tr>\n' +
'    <tr><td>Protocol</td><td>HTTP</td><td>HTTP</td><td>HTTP/SMTP</td><td>HTTP/2</td></tr>\n' +
'    <tr><td>Data Format</td><td>JSON/XML</td><td>JSON</td><td>XML</td><td>Protobuf</td></tr>\n' +
'    <tr><td>Flexibility</td><td>High</td><td>Very High</td><td>Low</td><td>Medium</td></tr>\n' +
'    <tr><td>Learning Curve</td><td>Low</td><td>Medium</td><td>High</td><td>Medium</td></tr>\n' +
'    <tr><td>Best For</td><td>Public APIs</td><td>Complex UIs</td><td>Enterprise</td><td>Microservices</td></tr>\n' +
'  </table>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">4</span> Code Challenge</div>\n' +
'  <div class="info-box">\n' +
'    <strong>Challenge:</strong> Use the browser\'s DevTools Network tab (or a tool like Postman) to inspect a REST API call to <code>https://jsonplaceholder.typicode.com/users/1</code>. Identify the request method, status code, response headers, and the JSON body fields returned.\n' +
'  </div>\n' +
'</div>\n';

L['http-methods'] =
'<h1 class="page-title">HTTP Methods &amp; Status Codes</h1>\n' +
'<div class="page-meta">\n' +
'  <span class="badge">&#128279; REST API</span>\n' +
'  <span class="badge">Lesson 2</span>\n' +
'  <span class="badge">Beginner</span>\n' +
'</div>\n' +
'<div class="intro-box">\n' +
'  <p>HTTP methods (also called verbs) define the type of action to perform on a resource. HTTP status codes tell the client exactly what happened with their request. Choosing the right verb and status code is the foundation of a well-designed REST API.</p>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> The Core HTTP Methods</div>\n' +
'  <table class="tbl">\n' +
'    <tr><th>Method</th><th>Action</th><th>Idempotent?</th><th>Has Body?</th><th>Example</th></tr>\n' +
'    <tr><td><strong>GET</strong></td><td>Read / retrieve a resource</td><td>Yes</td><td>No</td><td>GET /users</td></tr>\n' +
'    <tr><td><strong>POST</strong></td><td>Create a new resource</td><td>No</td><td>Yes</td><td>POST /users</td></tr>\n' +
'    <tr><td><strong>PUT</strong></td><td>Replace a resource entirely</td><td>Yes</td><td>Yes</td><td>PUT /users/1</td></tr>\n' +
'    <tr><td><strong>PATCH</strong></td><td>Partially update a resource</td><td>No</td><td>Yes</td><td>PATCH /users/1</td></tr>\n' +
'    <tr><td><strong>DELETE</strong></td><td>Remove a resource</td><td>Yes</td><td>No</td><td>DELETE /users/1</td></tr>\n' +
'    <tr><td><strong>HEAD</strong></td><td>GET without response body</td><td>Yes</td><td>No</td><td>HEAD /users</td></tr>\n' +
'    <tr><td><strong>OPTIONS</strong></td><td>List allowed methods (CORS preflight)</td><td>Yes</td><td>No</td><td>OPTIONS /users</td></tr>\n' +
'  </table>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> HTTP Status Code Groups</div>\n' +
'  <table class="tbl">\n' +
'    <tr><th>Range</th><th>Category</th><th>Common Codes</th></tr>\n' +
'    <tr><td>1xx</td><td>Informational</td><td>100 Continue, 101 Switching Protocols</td></tr>\n' +
'    <tr><td>2xx</td><td>Success</td><td>200 OK, 201 Created, 204 No Content</td></tr>\n' +
'    <tr><td>3xx</td><td>Redirection</td><td>301 Moved Permanently, 304 Not Modified</td></tr>\n' +
'    <tr><td>4xx</td><td>Client Errors</td><td>400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable, 429 Too Many Requests</td></tr>\n' +
'    <tr><td>5xx</td><td>Server Errors</td><td>500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable</td></tr>\n' +
'  </table>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Correct Method &amp; Status Mapping</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">HTTP &#8212; REST Method Examples</span></div>\n' +
'    <pre><code># List all users\nGET /api/users             -> 200 OK  (with array body)\n\n# Create user\nPOST /api/users            -> 201 Created  (with new resource body)\n\n# Get specific user\nGET /api/users/42          -> 200 OK  |  404 Not Found\n\n# Full replace\nPUT /api/users/42          -> 200 OK  (with updated body)\n\n# Partial update\nPATCH /api/users/42        -> 200 OK  (with updated body)\n\n# Delete — returns NO body\nDELETE /api/users/42       -> 204 No Content\n\n# Bad request body\nPOST /api/users            -> 400 Bad Request  (missing required fields)\n\n# No token\nGET /api/admin             -> 401 Unauthorized\n\n# Valid token, wrong permissions\nGET /api/admin             -> 403 Forbidden</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">4</span> Code Challenge</div>\n' +
'  <div class="info-box">\n' +
'    <strong>Challenge:</strong> Using curl or Postman, test all 5 CRUD operations against <code>https://jsonplaceholder.typicode.com/posts</code> and record the HTTP method, URL, request body (if any), and the response status code for each.\n' +
'  </div>\n' +
'</div>\n';

L['endpoints'] =
'<h1 class="page-title">Designing RESTful Endpoints</h1>\n' +
'<div class="page-meta">\n' +
'  <span class="badge">&#128279; REST API</span>\n' +
'  <span class="badge">Lesson 3</span>\n' +
'  <span class="badge">Beginner</span>\n' +
'</div>\n' +
'<div class="intro-box">\n' +
'  <p>URL design is the public contract of your API. Good endpoint design makes your API intuitive, predictable, and easy to consume. Poor design creates confusion and forces breaking changes.</p>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> URL Design Best Practices</div>\n' +
'  <ul>\n' +
'    <li><strong>Use nouns, not verbs</strong>: Resources are things, not actions. <code>/users</code> not <code>/getUsers</code>.</li>\n' +
'    <li><strong>Use plural nouns</strong>: <code>/products</code> not <code>/product</code>.</li>\n' +
'    <li><strong>Lowercase with hyphens</strong>: <code>/blog-posts</code> not <code>/blogPosts</code> or <code>/BlogPosts</code>.</li>\n' +
'    <li><strong>Hierarchical nesting</strong>: Represent relationships: <code>/users/42/orders</code>.</li>\n' +
'    <li><strong>Keep it shallow</strong>: No more than 3 levels deep. Beyond that, use query params.</li>\n' +
'    <li><strong>No trailing slashes</strong>: <code>/users</code> not <code>/users/</code>.</li>\n' +
'    <li><strong>Version your API</strong>: <code>/api/v1/users</code>.</li>\n' +
'  </ul>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Good vs Bad URL Examples</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">REST &#8212; URL Design Comparison</span></div>\n' +
'    <pre><code>--- BAD ---\nGET  /getAllUsers\nPOST /createUser\nGET  /user?id=42\nPOST /user/delete/42\nGET  /api/users/get-user-orders-by-user-id\n\n--- GOOD ---\nGET    /api/v1/users             # List all users\nPOST   /api/v1/users             # Create user\nGET    /api/v1/users/42          # Get user 42\nPUT    /api/v1/users/42          # Replace user 42\nPATCH  /api/v1/users/42          # Update user 42\nDELETE /api/v1/users/42          # Delete user 42\nGET    /api/v1/users/42/orders   # User 42\'s orders\nGET    /api/v1/orders/7/items    # Order 7\'s items\n\n--- ACTIONS (use sparingly) ---\nPOST /api/v1/users/42/activate\nPOST /api/v1/orders/7/cancel\nPOST /api/v1/auth/refresh-token</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Resource Relationships</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">REST &#8212; Nested Resource Patterns</span></div>\n' +
'    <pre><code># E-commerce API endpoints\nGET    /api/v1/products                    # All products\nGET    /api/v1/products?category=laptops   # Filter by category\nGET    /api/v1/products/101                # Product detail\nGET    /api/v1/products/101/reviews        # Product reviews\nPOST   /api/v1/products/101/reviews        # Add a review\n\nGET    /api/v1/users/5/cart                # User cart\nPOST   /api/v1/users/5/cart/items          # Add to cart\nDELETE /api/v1/users/5/cart/items/3        # Remove cart item\nPOST   /api/v1/users/5/cart/checkout       # Checkout (action)</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">4</span> Code Challenge</div>\n' +
'  <div class="info-box">\n' +
'    <strong>Challenge:</strong> Design the full set of RESTful endpoints for a <strong>blog platform</strong> that has users, posts, comments, and tags. Write out all the routes needed using correct HTTP verbs, nouns, and nesting.\n' +
'  </div>\n' +
'</div>\n';

L['request-response'] =
'<h1 class="page-title">Request &amp; Response Structure</h1>\n' +
'<div class="page-meta">\n' +
'  <span class="badge">&#128279; REST API</span>\n' +
'  <span class="badge">Lesson 4</span>\n' +
'  <span class="badge">Beginner</span>\n' +
'</div>\n' +
'<div class="intro-box">\n' +
'  <p>Every HTTP interaction consists of a <strong>request</strong> sent by the client and a <strong>response</strong> returned by the server. Understanding each component of these messages is essential for building and consuming REST APIs effectively.</p>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Anatomy of an HTTP Request</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">HTTP &#8212; Full Request Breakdown</span></div>\n' +
'    <pre><code>POST /api/v1/users HTTP/1.1\n\n# ---- REQUEST LINE ----\n# Method: POST\n# Path: /api/v1/users\n# Protocol: HTTP/1.1\n\n# ---- HEADERS ----\nHost: api.example.com                    # Required — server hostname\nContent-Type: application/json           # Body format\nAccept: application/json                 # Desired response format\nAuthorization: Bearer eyJhbGciOiJI...    # Auth token\nUser-Agent: PostmanRuntime/7.36.0\nX-Request-ID: 550e8400-e29b-41d4-a716   # Custom correlation header\n\n# ---- BODY ----\n{\n  "name": "Balaji Nayak",\n  "email": "balaji@example.com",\n  "password": "SecurePass123!",\n  "role": "user"\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Anatomy of an HTTP Response</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">HTTP &#8212; Full Response Breakdown</span></div>\n' +
'    <pre><code>HTTP/1.1 201 Created\n\n# ---- STATUS LINE ----\n# Protocol: HTTP/1.1\n# Status Code: 201\n# Reason: Created\n\n# ---- HEADERS ----\nContent-Type: application/json\nLocation: /api/v1/users/99               # URL of new resource\nX-Request-ID: 550e8400-e29b-41d4-a716   # Echo correlation header\nX-Rate-Limit-Limit: 100\nX-Rate-Limit-Remaining: 99\n\n# ---- BODY ----\n{\n  "success": true,\n  "data": {\n    "id": 99,\n    "name": "Balaji Nayak",\n    "email": "balaji@example.com",\n    "role": "user",\n    "createdAt": "2026-07-13T10:30:00Z"\n  },\n  "message": "User created successfully"\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Consistent Response Envelope</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JSON &#8212; Standard Response Shape</span></div>\n' +
'    <pre><code>// Success response\n{\n  "success": true,\n  "data": { ... },\n  "meta": { "page": 1, "total": 240, "limit": 20 }\n}\n\n// List response\n{\n  "success": true,\n  "data": [ ... ],\n  "meta": { "count": 20, "total": 240, "page": 1 }\n}\n\n// Error response\n{\n  "success": false,\n  "error": {\n    "code": "VALIDATION_ERROR",\n    "message": "The email field is required.",\n    "fields": { "email": "This field is required" }\n  }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">4</span> Code Challenge</div>\n' +
'  <div class="info-box">\n' +
'    <strong>Challenge:</strong> Design a consistent JSON response envelope for your API. Write a Node.js/Express utility function <code>sendSuccess(res, data, meta)</code> and <code>sendError(res, statusCode, message, code)</code> that formats all responses uniformly.\n' +
'  </div>\n' +
'</div>\n';

L['json-data'] =
'<h1 class="page-title">JSON Data Format &amp; Serialization</h1>\n' +
'<div class="page-meta">\n' +
'  <span class="badge">&#128279; REST API</span>\n' +
'  <span class="badge">Lesson 5</span>\n' +
'  <span class="badge">Beginner</span>\n' +
'</div>\n' +
'<div class="intro-box">\n' +
'  <p>JSON (JavaScript Object Notation) is the de-facto data format for REST APIs. Understanding how to properly structure, validate, and serialize JSON data is critical for building interoperable, predictable APIs.</p>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> JSON Data Types</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JSON &#8212; All Data Types</span></div>\n' +
'    <pre><code>{\n  "string":   "Hello, World!",\n  "number":   42,\n  "float":    3.14159,\n  "boolean":  true,\n  "nullValue": null,\n  "array":    [1, "two", false, null],\n  "object":   { "nested": "value" },\n  "isoDate":  "2026-07-13T10:30:00Z",     // dates as ISO 8601 strings\n  "currency": 1999,                        // store cents as integers\n  "id":       "550e8400-e29b-41d4-a716"   // UUIDs as strings\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> JSON Naming Conventions</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JSON &#8212; Naming Best Practices</span></div>\n' +
'    <pre><code>// Use camelCase for all keys (not snake_case or PascalCase)\n{\n  "userId":      42,          // NOT: user_id or UserId\n  "firstName":   "Balaji",    // NOT: first_name or FirstName\n  "emailAddress":"b@ex.com",\n  "createdAt":   "2026-01-01T00:00:00Z",\n  "isActive":    true,        // booleans start with is/has/can\n  "totalCount":  100,\n  "itemsPerPage": 20\n}\n\n// Arrays use plural names\n{\n  "users": [...],\n  "tags": ["nodejs", "rest"],\n  "relatedProductIds": [1, 5, 7]\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Parsing &amp; Serializing JSON in Node.js</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; JSON Serialization</span></div>\n' +
'    <pre><code>// Serialize object to JSON string\nconst user = { id: 1, name: "Balaji", createdAt: new Date() };\nconst jsonStr = JSON.stringify(user);\n// Output: {"id":1,"name":"Balaji","createdAt":"2026-07-13T10:30:00.000Z"}\n\n// Pretty print (for logging/debugging)\nconsole.log(JSON.stringify(user, null, 2));\n\n// Parse JSON string to object\nconst parsed = JSON.parse(jsonStr);\nconsole.log(parsed.name); // Balaji\n\n// Custom serialization — exclude sensitive fields\nconst sensitiveUser = { id: 1, name: "Balaji", passwordHash: "abc123" };\nconst safe = JSON.stringify(sensitiveUser, (key, val) => {\n  if (key === "passwordHash") return undefined; // exclude\n  return val;\n});\n// Output: {"id":1,"name":"Balaji"}\n\n// Transform dates during serialization\nconst withDates = JSON.parse(jsonStr, (key, val) => {\n  if (key === "createdAt") return new Date(val); // parse back to Date object\n  return val;\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">4</span> Code Challenge</div>\n' +
'  <div class="info-box">\n' +
'    <strong>Challenge:</strong> Write a Node.js serializer function <code>toPublicUser(userDoc)</code> that transforms a MongoDB user document (with <code>_id</code>, <code>passwordHash</code>, <code>__v</code>) into a clean public-facing JSON object with camelCase keys and no sensitive fields.\n' +
'  </div>\n' +
'</div>\n';

L['authentication'] =
'<h1 class="page-title">Authentication &#8212; API Keys &amp; JWT</h1>\n' +
'<div class="page-meta">\n' +
'  <span class="badge">&#128279; REST API</span>\n' +
'  <span class="badge">Lesson 6</span>\n' +
'  <span class="badge">Intermediate</span>\n' +
'</div>\n' +
'<div class="intro-box">\n' +
'  <p>Authentication answers "Who are you?" REST APIs must be stateless, which means traditional session cookies don\'t apply. The two most common methods are <strong>API Keys</strong> for machine-to-machine auth and <strong>JWT (JSON Web Tokens)</strong> for user identity.</p>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> API Keys</div>\n' +
'  <p>API keys are simple opaque strings passed in a header or query param. Best for server-to-server communication:</p>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">HTTP &#8212; API Key Authentication</span></div>\n' +
'    <pre><code># Preferred: send in header\nGET /api/v1/data\nX-API-Key: ak_live_9f8e7d6c5b4a3210\n\n# Alternative: query param (less secure — visible in logs)\nGET /api/v1/data?api_key=ak_live_9f8e7d6c5b4a3210</code></pre>\n' +
'  </div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; API Key Middleware (Express)</span></div>\n' +
'    <pre><code>async function apiKeyAuth(req, res, next) {\n  const key = req.headers["x-api-key"];\n  if (!key) return res.status(401).json({ error: "API key required" });\n\n  // Look up key in database\n  const apiKey = await ApiKey.findOne({ key, isActive: true });\n  if (!apiKey) return res.status(401).json({ error: "Invalid API key" });\n\n  req.client = apiKey.owner;\n  next();\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> JWT — JSON Web Tokens</div>\n' +
'  <p>A JWT is a <strong>self-contained</strong> token with three Base64-encoded parts: <code>Header.Payload.Signature</code>:</p>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; JWT Sign &amp; Verify</span></div>\n' +
'    <pre><code>const jwt = require("jsonwebtoken");\n\n// --- SIGN (on login) ---\nconst accessToken = jwt.sign(\n  { userId: user.id, role: user.role, email: user.email }, // payload\n  process.env.JWT_SECRET,                                  // secret\n  { expiresIn: "15m", issuer: "api.example.com" }          // options\n);\n\n// --- VERIFY (in middleware) ---\nfunction verifyToken(req, res, next) {\n  const auth = req.headers.authorization;\n  if (!auth || !auth.startsWith("Bearer ")) {\n    return res.status(401).json({ error: "Token required" });\n  }\n  try {\n    const decoded = jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET);\n    req.user = decoded;\n    next();\n  } catch (err) {\n    const msg = err.name === "TokenExpiredError" ? "Token expired" : "Invalid token";\n    res.status(401).json({ error: msg });\n  }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Access + Refresh Token Strategy</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">REST &#8212; Token Flow</span></div>\n' +
'    <pre><code>1. POST /auth/login  -> { accessToken (15min), refreshToken (7d) }\n2. Client stores refreshToken in httpOnly cookie (not localStorage!)\n3. Client sends accessToken in Authorization header with every request\n4. When accessToken expires, client calls:\n   POST /auth/refresh  (sends refreshToken cookie)\n   -> { new accessToken }\n5. On logout:\n   POST /auth/logout   -> invalidate refreshToken in DB</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">4</span> Code Challenge</div>\n' +
'  <div class="info-box">\n' +
'    <strong>Challenge:</strong> Build a complete <code>POST /auth/login</code> and <code>POST /auth/refresh</code> flow using Express and the <code>jsonwebtoken</code> package. The refresh token should be stored as an httpOnly, SameSite=Strict cookie.\n' +
'  </div>\n' +
'</div>\n';

L['authorization'] =
'<h1 class="page-title">Authorization &amp; Role-Based Access</h1>\n' +
'<div class="page-meta">\n' +
'  <span class="badge">&#128279; REST API</span>\n' +
'  <span class="badge">Lesson 7</span>\n' +
'  <span class="badge">Intermediate</span>\n' +
'</div>\n' +
'<div class="intro-box">\n' +
'  <p>Authorization answers "What are you allowed to do?" It runs <em>after</em> authentication and determines whether an authenticated user has permission to access a specific resource or perform an action.</p>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> RBAC — Role-Based Access Control</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Role Middleware (Express)</span></div>\n' +
'    <pre><code>// Define roles and their permissions\nconst ROLES = {\n  user:    ["read:own"],\n  editor:  ["read:any", "write:own"],\n  admin:   ["read:any", "write:any", "delete:any"]\n};\n\n// Middleware factory — authorize by role\nfunction authorize(...allowedRoles) {\n  return (req, res, next) => {\n    if (!req.user) return res.status(401).json({ error: "Not authenticated" });\n\n    if (!allowedRoles.includes(req.user.role)) {\n      return res.status(403).json({\n        error: "Forbidden",\n        message: "You don\'t have permission to perform this action"\n      });\n    }\n    next();\n  };\n}\n\n// Usage on routes\nrouter.get("/users",          authenticate, authorize("admin"),           getAllUsers);\nrouter.delete("/users/:id",   authenticate, authorize("admin"),           deleteUser);\nrouter.patch("/posts/:id",    authenticate, authorize("admin", "editor"), updatePost);\nrouter.get("/profile",        authenticate,                               getProfile); // any authenticated</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Resource Ownership Check</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Ownership Guard</span></div>\n' +
'    <pre><code>// Only the owner (or admin) can edit their resource\nasync function canEditPost(req, res, next) {\n  const post = await Post.findById(req.params.id);\n  if (!post) return res.status(404).json({ error: "Post not found" });\n\n  const isOwner = post.authorId.toString() === req.user.userId;\n  const isAdmin = req.user.role === "admin";\n\n  if (!isOwner && !isAdmin) {\n    return res.status(403).json({ error: "You can only edit your own posts" });\n  }\n\n  req.post = post; // attach for the next handler\n  next();\n}\n\nrouter.put("/posts/:id", authenticate, canEditPost, updatePost);</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box">\n' +
'    <strong>Challenge:</strong> Implement a permission system where <code>admin</code> can CRUD all users, <code>editor</code> can read all and update their own profile, and <code>user</code> can only read and update their own profile. Write the middleware for each scenario.\n' +
'  </div>\n' +
'</div>\n';

L['crud-api'] =
'<h1 class="page-title">Building a CRUD API (Node + Express)</h1>\n' +
'<div class="page-meta">\n' +
'  <span class="badge">&#128279; REST API</span>\n' +
'  <span class="badge">Lesson 8</span>\n' +
'  <span class="badge">Intermediate</span>\n' +
'</div>\n' +
'<div class="intro-box">\n' +
'  <p>A CRUD API implements the four fundamental data operations: <strong>Create, Read, Update, Delete</strong>. This lesson walks you through building a production-quality CRUD API for a <code>products</code> resource using Node.js, Express, and in-memory data.</p>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Project Structure</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Project Layout</span></div>\n' +
'    <pre><code>my-rest-api/\n  src/\n    routes/\n      products.js    # Route handlers\n    middleware/\n      validate.js    # Input validation\n      errors.js      # Error handler\n    models/\n      Product.js     # Data model\n    app.js           # Express setup\n    server.js        # Entry point\n  package.json</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Complete CRUD Route Handler</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; routes/products.js</span></div>\n' +
'    <pre><code>const express = require("express");\nconst router = express.Router();\n\nlet products = [\n  { id: 1, name: "Mechanical Keyboard", price: 8999, category: "electronics", inStock: true }\n];\nlet nextId = 2;\n\n// GET /products — list with optional filtering\nrouter.get("/", (req, res) => {\n  let result = [...products];\n  const { category, minPrice, maxPrice, inStock } = req.query;\n  if (category) result = result.filter(p => p.category === category);\n  if (minPrice) result = result.filter(p => p.price >= Number(minPrice));\n  if (maxPrice) result = result.filter(p => p.price &lt;= Number(maxPrice));\n  if (inStock !== undefined) result = result.filter(p => p.inStock === (inStock === "true"));\n  res.json({ success: true, data: result, count: result.length });\n});\n\n// GET /products/:id\nrouter.get("/:id", (req, res) => {\n  const product = products.find(p => p.id === Number(req.params.id));\n  if (!product) return res.status(404).json({ success: false, error: "Product not found" });\n  res.json({ success: true, data: product });\n});\n\n// POST /products — create\nrouter.post("/", (req, res) => {\n  const { name, price, category, inStock = true } = req.body;\n  if (!name || price === undefined || !category) {\n    return res.status(400).json({ success: false, error: "name, price, category are required" });\n  }\n  const product = { id: nextId++, name, price, category, inStock };\n  products.push(product);\n  res.status(201).json({ success: true, data: product });\n});\n\n// PATCH /products/:id — partial update\nrouter.patch("/:id", (req, res) => {\n  const idx = products.findIndex(p => p.id === Number(req.params.id));\n  if (idx === -1) return res.status(404).json({ success: false, error: "Product not found" });\n  products[idx] = { ...products[idx], ...req.body, id: products[idx].id };\n  res.json({ success: true, data: products[idx] });\n});\n\n// DELETE /products/:id\nrouter.delete("/:id", (req, res) => {\n  const idx = products.findIndex(p => p.id === Number(req.params.id));\n  if (idx === -1) return res.status(404).json({ success: false, error: "Product not found" });\n  products.splice(idx, 1);\n  res.status(204).send();\n});\n\nmodule.exports = router;</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box">\n' +
'    <strong>Challenge:</strong> Add a <code>GET /products/stats</code> endpoint (placed before <code>/:id</code> to avoid param conflict) that returns the total count, average price, and count per category of all products.\n' +
'  </div>\n' +
'</div>\n';

L['pagination'] =
'<h1 class="page-title">Pagination, Filtering &amp; Sorting</h1>\n' +
'<div class="page-meta">\n' +
'  <span class="badge">&#128279; REST API</span>\n' +
'  <span class="badge">Lesson 9</span>\n' +
'  <span class="badge">Intermediate</span>\n' +
'</div>\n' +
'<div class="intro-box">\n' +
'  <p>Returning thousands of database records in a single response is a common performance mistake. Pagination, filtering, and sorting make your API efficient and developer-friendly for large datasets.</p>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Pagination Strategies</div>\n' +
'  <ul>\n' +
'    <li><strong>Offset Pagination</strong>: Use <code>page</code> and <code>limit</code> params. Simple but can miss records on large, fast-changing datasets.</li>\n' +
'    <li><strong>Cursor Pagination</strong>: Uses a <code>cursor</code> (last seen ID) for efficient, consistent pagination on large collections. Used by Facebook, Twitter.</li>\n' +
'  </ul>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Offset Pagination (Express + Mongoose)</span></div>\n' +
'    <pre><code>router.get("/", async (req, res) => {\n  // Parse pagination params with safe defaults\n  const page  = Math.max(1, parseInt(req.query.page)  || 1);\n  const limit = Math.min(100, parseInt(req.query.limit) || 20);\n  const skip  = (page - 1) * limit;\n\n  // Build filter object from query params\n  const filter = {};\n  if (req.query.category) filter.category = req.query.category;\n  if (req.query.inStock)  filter.inStock  = req.query.inStock === "true";\n\n  // Build sort (e.g. ?sort=-price,name means price DESC, name ASC)\n  const sortStr = req.query.sort || "-createdAt";\n  const sort = {};\n  sortStr.split(",").forEach(field => {\n    if (field.startsWith("-")) sort[field.slice(1)] = -1;\n    else sort[field] = 1;\n  });\n\n  const [data, total] = await Promise.all([\n    Product.find(filter).sort(sort).skip(skip).limit(limit),\n    Product.countDocuments(filter)\n  ]);\n\n  res.json({\n    success: true,\n    data,\n    meta: {\n      page, limit, total,\n      totalPages: Math.ceil(total / limit),\n      hasNextPage: page * limit &lt; total,\n      hasPrevPage: page > 1\n    }\n  });\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Query Parameter Conventions</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">REST &#8212; Query Parameter Patterns</span></div>\n' +
'    <pre><code># Pagination\nGET /api/v1/products?page=2&amp;limit=20\n\n# Filtering\nGET /api/v1/products?category=electronics&amp;inStock=true\nGET /api/v1/products?minPrice=1000&amp;maxPrice=5000\n\n# Sorting (prefix - for descending)\nGET /api/v1/products?sort=-price          # price DESC\nGET /api/v1/products?sort=name,-createdAt # name ASC, createdAt DESC\n\n# Field selection (sparse fieldsets)\nGET /api/v1/products?fields=id,name,price\n\n# Search\nGET /api/v1/products?q=laptop\n\n# Combined\nGET /api/v1/products?category=laptops&amp;sort=-price&amp;page=1&amp;limit=10</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box">\n' +
'    <strong>Challenge:</strong> Implement cursor-based pagination for a <code>GET /messages</code> endpoint. Use the last message\'s <code>_id</code> as the cursor, and return a <code>nextCursor</code> in the response metadata for the client to use in the next request.\n' +
'  </div>\n' +
'</div>\n';

L['validation'] =
'<h1 class="page-title">Input Validation &amp; Error Responses</h1>\n' +
'<div class="page-meta">\n' +
'  <span class="badge">&#128279; REST API</span>\n' +
'  <span class="badge">Lesson 10</span>\n' +
'  <span class="badge">Intermediate</span>\n' +
'</div>\n' +
'<div class="intro-box">\n' +
'  <p>Never trust client input. Thorough input validation prevents security vulnerabilities, database corruption, and confusing bugs. Well-structured error responses make your API easy to debug and integrate with.</p>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Validation with express-validator</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Input Validation Middleware</span></div>\n' +
'    <pre><code>const { body, param, query, validationResult } = require("express-validator");\n\n// Validation rules for POST /users\nconst createUserRules = [\n  body("name")\n    .trim()\n    .notEmpty().withMessage("Name is required")\n    .isLength({ min: 2, max: 100 }).withMessage("Name must be 2-100 chars"),\n  body("email")\n    .isEmail().withMessage("Valid email is required")\n    .normalizeEmail(),\n  body("password")\n    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")\n    .matches(/[A-Z]/).withMessage("Must contain at least one uppercase letter")\n    .matches(/[0-9]/).withMessage("Must contain at least one number"),\n  body("role")\n    .optional()\n    .isIn(["user", "editor", "admin"]).withMessage("Invalid role")\n];\n\n// Middleware to handle validation errors\nfunction validate(req, res, next) {\n  const errors = validationResult(req);\n  if (!errors.isEmpty()) {\n    return res.status(422).json({\n      success: false,\n      error: {\n        code: "VALIDATION_ERROR",\n        message: "Input validation failed",\n        fields: errors.array().reduce((acc, err) => {\n          acc[err.path] = err.msg;\n          return acc;\n        }, {})\n      }\n    });\n  }\n  next();\n}\n\n// Apply to route\nrouter.post("/users", createUserRules, validate, createUser);</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Standard Error Response Format</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JSON &#8212; Error Response Examples</span></div>\n' +
'    <pre><code>// 400 Bad Request\n{\n  "success": false,\n  "error": { "code": "BAD_REQUEST", "message": "Request body is malformed JSON" }\n}\n\n// 422 Validation Error (most useful — field-level details)\n{\n  "success": false,\n  "error": {\n    "code": "VALIDATION_ERROR",\n    "message": "Input validation failed",\n    "fields": {\n      "email": "Valid email is required",\n      "password": "Must contain at least one uppercase letter"\n    }\n  }\n}\n\n// 404 Not Found\n{\n  "success": false,\n  "error": { "code": "NOT_FOUND", "message": "Product with id 99 not found" }\n}\n\n// 429 Rate Limited\n{\n  "success": false,\n  "error": {\n    "code": "RATE_LIMITED",\n    "message": "Too many requests. Try again in 60 seconds.",\n    "retryAfter": 60\n  }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box">\n' +
'    <strong>Challenge:</strong> Write validation rules for a <code>POST /products</code> endpoint: <code>name</code> (string, 3-200 chars), <code>price</code> (integer, min 0), <code>category</code> (one of: electronics, clothing, books, food), <code>inStock</code> (boolean). Return field-level errors in a unified error envelope.\n' +
'  </div>\n' +
'</div>\n';

L['versioning'] =
'<h1 class="page-title">API Versioning Strategies</h1>\n' +
'<div class="page-meta">\n' +
'  <span class="badge">&#128279; REST API</span>\n' +
'  <span class="badge">Lesson 11</span>\n' +
'  <span class="badge">Intermediate</span>\n' +
'</div>\n' +
'<div class="intro-box">\n' +
'  <p>APIs evolve over time. Versioning lets you make breaking changes to your API without disrupting existing clients. Choosing the right strategy from day one is critical for long-term maintainability.</p>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Versioning Strategies Compared</div>\n' +
'  <table class="tbl">\n' +
'    <tr><th>Strategy</th><th>Example</th><th>Pros</th><th>Cons</th></tr>\n' +
'    <tr><td><strong>URL Path</strong></td><td>/api/v1/users</td><td>Simple, visible, easily cacheable</td><td>URL changes on upgrade</td></tr>\n' +
'    <tr><td><strong>Query Param</strong></td><td>/api/users?version=1</td><td>No URL change</td><td>Easy to miss, pollutes URLs</td></tr>\n' +
'    <tr><td><strong>Header</strong></td><td>Accept-Version: 1</td><td>Clean URLs</td><td>Less discoverable, harder to test</td></tr>\n' +
'    <tr><td><strong>Content Type</strong></td><td>Accept: application/vnd.app.v1+json</td><td>RFC standard</td><td>Complex header management</td></tr>\n' +
'  </table>\n' +
'  <p style="margin-top:12px;"><strong>Recommendation:</strong> Use URL path versioning (<code>/api/v1/</code>) for public APIs &#8212; it is the most widely understood and tooling-friendly approach.</p>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Implementing URL Versioning in Express</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Multi-version Express Router</span></div>\n' +
'    <pre><code>const express = require("express");\nconst app = express();\n\n// --- V1 routes ---\nconst v1Router = express.Router();\nconst v1Users  = require("./routes/v1/users");\nconst v1Products = require("./routes/v1/products");\nv1Router.use("/users",    v1Users);\nv1Router.use("/products", v1Products);\napp.use("/api/v1", v1Router);\n\n// --- V2 routes (breaking changes) ---\nconst v2Router = express.Router();\nconst v2Users  = require("./routes/v2/users");    // new response shape\nv2Router.use("/users", v2Users);\napp.use("/api/v2", v2Router);\n\n// --- Version negotiation middleware ---\napp.use((req, res, next) => {\n  const version = req.headers["accept-version"] || "1";\n  req.apiVersion = parseInt(version);\n  next();\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Deprecation Notices</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Deprecation Header Middleware</span></div>\n' +
'    <pre><code>// Warn clients they are using a deprecated version\nfunction deprecationWarning(sunsetDate) {\n  return (req, res, next) => {\n    res.set("Deprecation", "true");\n    res.set("Sunset", sunsetDate);        // RFC 8594\n    res.set("Link", \'&lt;/api/v2/docs&gt;; rel="successor-version"\');\n    next();\n  };\n}\n\n// Apply to all v1 routes\napp.use("/api/v1", deprecationWarning("2027-01-01"), v1Router);</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">4</span> Code Challenge</div>\n' +
'  <div class="info-box">\n' +
'    <strong>Challenge:</strong> Refactor an existing Express router to support <code>v1</code> and <code>v2</code>. In v2, rename the <code>name</code> field to <code>fullName</code> in user responses. Both versions should work simultaneously without breaking existing v1 clients.\n' +
'  </div>\n' +
'</div>\n';

L['rate-limiting'] =
'<h1 class="page-title">Rate Limiting &amp; Security Headers</h1>\n' +
'<div class="page-meta">\n' +
'  <span class="badge">&#128279; REST API</span>\n' +
'  <span class="badge">Lesson 12</span>\n' +
'  <span class="badge">Advanced</span>\n' +
'</div>\n' +
'<div class="intro-box">\n' +
'  <p>A public REST API without rate limiting is an open invitation for abuse, DoS attacks, and runaway costs. Security headers protect against common web vulnerabilities like XSS, clickjacking, and data leaking.</p>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Rate Limiting with express-rate-limit</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Rate Limiting Setup</span></div>\n' +
'    <pre><code>const rateLimit = require("express-rate-limit");\n\n// General API limiter\nconst apiLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 100,                 // max 100 requests per window per IP\n  standardHeaders: true,    // Return RateLimit-* headers\n  legacyHeaders: false,\n  message: {\n    success: false,\n    error: { code: "RATE_LIMITED", message: "Too many requests. Try again later." }\n  }\n});\n\n// Stricter limiter for auth endpoints (prevent brute force)\nconst authLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 10,\n  skipSuccessfulRequests: true, // only count failed attempts\n  message: {\n    success: false,\n    error: { code: "RATE_LIMITED", message: "Too many login attempts. Try again in 15 minutes." }\n  }\n});\n\napp.use("/api/", apiLimiter);\napp.use("/api/v1/auth/login",    authLimiter);\napp.use("/api/v1/auth/register", authLimiter);</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Security Headers with Helmet</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Helmet Security Headers</span></div>\n' +
'    <pre><code">const helmet = require("helmet");\nconst cors   = require("cors");\n\napp.use(helmet()); // Sets 15+ security headers automatically\n\n// What helmet sets:\n// Strict-Transport-Security: max-age=15552000; includeSubDomains\n// X-Content-Type-Options: nosniff\n// X-Frame-Options: SAMEORIGIN\n// X-XSS-Protection: 0\n// Content-Security-Policy: default-src \'self\'...\n\n// CORS — control who can access your API\napp.use(cors({\n  origin: ["https://myapp.com", "https://admin.myapp.com"],\n  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],\n  allowedHeaders: ["Content-Type", "Authorization", "X-API-Key"],\n  credentials: true, // allow cookies\n  maxAge: 86400      // preflight cache for 24h\n}));</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box">\n' +
'    <strong>Challenge:</strong> Implement a Redis-backed rate limiter using <code>express-rate-limit</code> with the <code>rate-limit-redis</code> store. This ensures rate limits persist across multiple server instances in a load-balanced environment.\n' +
'  </div>\n' +
'</div>\n';

L['documentation'] =
'<h1 class="page-title">API Documentation with Swagger/OpenAPI</h1>\n' +
'<div class="page-meta">\n' +
'  <span class="badge">&#128279; REST API</span>\n' +
'  <span class="badge">Lesson 13</span>\n' +
'  <span class="badge">Advanced</span>\n' +
'</div>\n' +
'<div class="intro-box">\n' +
'  <p>Good API documentation is as important as good code. The <strong>OpenAPI Specification (OAS 3.0)</strong>, formerly Swagger, is the industry standard for describing REST APIs. It auto-generates interactive documentation and enables client SDK generation.</p>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> OpenAPI 3.0 Spec Structure</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">YAML &#8212; openapi.yaml</span></div>\n' +
'    <pre><code>openapi: 3.0.3\ninfo:\n  title: Products REST API\n  description: A complete product management REST API\n  version: 1.0.0\n  contact:\n    name: API Support\n    email: api@example.com\n\nservers:\n  - url: https://api.example.com/api/v1\n    description: Production\n  - url: http://localhost:3000/api/v1\n    description: Development\n\npaths:\n  /products:\n    get:\n      summary: List all products\n      tags: [Products]\n      parameters:\n        - name: category\n          in: query\n          schema: { type: string }\n        - name: page\n          in: query\n          schema: { type: integer, default: 1 }\n        - name: limit\n          in: query\n          schema: { type: integer, default: 20, maximum: 100 }\n      responses:\n        "200":\n          description: Successful response\n          content:\n            application/json:\n              schema:\n                type: object\n                properties:\n                  success: { type: boolean }\n                  data:\n                    type: array\n                    items: { $ref: "#/components/schemas/Product" }\n\ncomponents:\n  schemas:\n    Product:\n      type: object\n      required: [name, price, category]\n      properties:\n        id:       { type: integer, example: 1 }\n        name:     { type: string, example: "Mechanical Keyboard" }\n        price:    { type: integer, example: 8999 }\n        category: { type: string, example: "electronics" }\n        inStock:  { type: boolean, example: true }\n  securitySchemes:\n    BearerAuth:\n      type: http\n      scheme: bearer\n      bearerFormat: JWT</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Serving Swagger UI in Express</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Swagger UI Setup</span></div>\n' +
'    <pre><code>npm install swagger-ui-express swagger-jsdoc\n\nconst swaggerUi   = require("swagger-ui-express");\nconst swaggerJsdoc = require("swagger-jsdoc");\n\nconst options = {\n  definition: {\n    openapi: "3.0.3",\n    info: { title: "My REST API", version: "1.0.0" }\n  },\n  apis: ["./src/routes/*.js"] // parses JSDoc annotations\n};\n\nconst spec = swaggerJsdoc(options);\napp.use("/api/docs", swaggerUi.serve, swaggerUi.setup(spec));\n// Visit http://localhost:3000/api/docs</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">4</span> Code Challenge</div>\n' +
'  <div class="info-box">\n' +
'    <strong>Challenge:</strong> Add JSDoc <code>@swagger</code> annotations to your <code>GET /products</code> and <code>POST /products</code> routes. Document all query parameters, request body schema, and possible response codes. Verify the Swagger UI renders it correctly.\n' +
'  </div>\n' +
'</div>\n';

L['testing'] =
'<h1 class="page-title">Testing REST APIs (Jest + Supertest)</h1>\n' +
'<div class="page-meta">\n' +
'  <span class="badge">&#128279; REST API</span>\n' +
'  <span class="badge">Lesson 14</span>\n' +
'  <span class="badge">Advanced</span>\n' +
'</div>\n' +
'<div class="intro-box">\n' +
'  <p>Automated tests are your safety net when making changes. <strong>Jest</strong> is the most popular JavaScript testing framework and <strong>Supertest</strong> lets you fire real HTTP requests against your Express app in memory, without needing a running server.</p>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Setup</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Terminal &#8212; Install Testing Dependencies</span></div>\n' +
'    <pre><code>npm install --save-dev jest supertest\n\n# package.json scripts\n"scripts": {\n  "test": "jest --detectOpenHandles",\n  "test:watch": "jest --watch",\n  "test:coverage": "jest --coverage"\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Writing API Integration Tests</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; products.test.js</span></div>\n' +
'    <pre><code>const request = require("supertest");\nconst app     = require("../src/app"); // your Express app\n\ndescribe("Products API", () => {\n\n  describe("GET /api/v1/products", () => {\n    it("returns 200 with products array", async () => {\n      const res = await request(app).get("/api/v1/products");\n      expect(res.statusCode).toBe(200);\n      expect(res.body.success).toBe(true);\n      expect(Array.isArray(res.body.data)).toBe(true);\n      expect(res.body.meta).toHaveProperty("total");\n    });\n  });\n\n  describe("POST /api/v1/products", () => {\n    it("creates a new product with valid data", async () => {\n      const res = await request(app)\n        .post("/api/v1/products")\n        .set("Authorization", "Bearer " + validToken)\n        .send({ name: "Test Product", price: 1000, category: "electronics" });\n\n      expect(res.statusCode).toBe(201);\n      expect(res.body.data.name).toBe("Test Product");\n      expect(res.body.data.id).toBeDefined();\n    });\n\n    it("returns 422 when required fields are missing", async () => {\n      const res = await request(app)\n        .post("/api/v1/products")\n        .set("Authorization", "Bearer " + validToken)\n        .send({ name: "Incomplete" }); // missing price and category\n\n      expect(res.statusCode).toBe(422);\n      expect(res.body.error.code).toBe("VALIDATION_ERROR");\n      expect(res.body.error.fields).toHaveProperty("price");\n    });\n\n    it("returns 401 without a token", async () => {\n      const res = await request(app)\n        .post("/api/v1/products")\n        .send({ name: "Test", price: 100, category: "books" });\n      expect(res.statusCode).toBe(401);\n    });\n  });\n\n  describe("DELETE /api/v1/products/:id", () => {\n    it("deletes an existing product and returns 204", async () => {\n      const create = await request(app)\n        .post("/api/v1/products")\n        .set("Authorization", "Bearer " + adminToken)\n        .send({ name: "To Delete", price: 500, category: "books" });\n\n      const res = await request(app)\n        .delete("/api/v1/products/" + create.body.data.id)\n        .set("Authorization", "Bearer " + adminToken);\n\n      expect(res.statusCode).toBe(204);\n    });\n  });\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box">\n' +
'    <strong>Challenge:</strong> Write a full test suite for a <code>POST /auth/login</code> endpoint. Test: successful login returns 200 with a token, wrong password returns 401, missing fields return 422, and a non-existent user returns 401.\n' +
'  </div>\n' +
'</div>\n';

L['deployment'] =
'<h1 class="page-title">Deploying &amp; Monitoring REST APIs</h1>\n' +
'<div class="page-meta">\n' +
'  <span class="badge">&#128279; REST API</span>\n' +
'  <span class="badge">Lesson 15</span>\n' +
'  <span class="badge">Advanced</span>\n' +
'</div>\n' +
'<div class="intro-box">\n' +
'  <p>Getting your REST API to production requires careful environment configuration, process management, and observability setup. This lesson covers Dockerization, cloud deployment, logging, and health checks.</p>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Health Check Endpoint</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Health &amp; Readiness Checks</span></div>\n' +
'    <pre><code">const mongoose = require("mongoose");\n\n// Liveness probe — is the process alive?\napp.get("/health", (req, res) => {\n  res.json({\n    status: "ok",\n    timestamp: new Date().toISOString(),\n    uptime: process.uptime(),\n    version: process.env.npm_package_version\n  });\n});\n\n// Readiness probe — is the app ready to serve traffic?\napp.get("/ready", async (req, res) => {\n  const checks = {\n    database: mongoose.connection.readyState === 1 ? "ok" : "fail"\n  };\n  const allReady = Object.values(checks).every(v => v === "ok");\n  res.status(allReady ? 200 : 503).json({\n    status: allReady ? "ready" : "not ready",\n    checks\n  });\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Dockerfile for Production</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Dockerfile &#8212; Multi-Stage Build</span></div>\n' +
'    <pre><code># Stage 1: Install deps\nFROM node:20-alpine AS deps\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\n\n# Stage 2: Production image\nFROM node:20-alpine\nWORKDIR /app\nCOPY --from=deps /app/node_modules ./node_modules\nCOPY src/ ./src/\n\nENV NODE_ENV=production\nUSER node\nEXPOSE 3000\nHEALTHCHECK --interval=30s CMD wget -qO- http://localhost:3000/health || exit 1\nCMD ["node", "src/server.js"]</code></pre>\n' +
'  </div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">YAML &#8212; docker-compose.yml</span></div>\n' +
'    <pre><code>version: "3.9"\nservices:\n  api:\n    build: .\n    ports: ["3000:3000"]\n    environment:\n      - NODE_ENV=production\n      - MONGODB_URI=mongodb://mongo:27017/mydb\n      - JWT_SECRET=${JWT_SECRET}\n    depends_on: [mongo]\n    restart: unless-stopped\n\n  mongo:\n    image: mongo:7\n    volumes:\n      - mongo_data:/data/db\n    restart: unless-stopped\n\nvolumes:\n  mongo_data:</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Structured Logging with Winston</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Production Logging</span></div>\n' +
'    <pre><code>const winston = require("winston");\n\nconst logger = winston.createLogger({\n  level: process.env.LOG_LEVEL || "info",\n  format: winston.format.combine(\n    winston.format.timestamp(),\n    winston.format.errors({ stack: true }),\n    winston.format.json()   // structured JSON logs\n  ),\n  transports: [\n    new winston.transports.Console(),\n    new winston.transports.File({ filename: "logs/error.log", level: "error" }),\n    new winston.transports.File({ filename: "logs/combined.log" })\n  ]\n});\n\n// Request logger middleware\napp.use((req, res, next) => {\n  const start = Date.now();\n  res.on("finish", () => {\n    logger.info("HTTP request", {\n      method: req.method, url: req.url,\n      status: res.statusCode,\n      duration: Date.now() - start + "ms",\n      ip: req.ip\n    });\n  });\n  next();\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">4</span> Code Challenge</div>\n' +
'  <div class="info-box">\n' +
'    <strong>Challenge:</strong> Deploy your REST API to <strong>Railway.app</strong> or <strong>Render.com</strong> (both have free tiers). Configure your environment variables through their dashboard, set up a MongoDB Atlas database, and verify your API is live at a public URL.\n' +
'  </div>\n' +
'</div>\n';

// ─── GENERATE FILES ──────────────────────────────────────────────────────────

console.log('Starting REST API lesson generation...');

lessons.forEach((l, index) => {
  const prev = index > 0 ? lessons[index - 1] : null;
  const next = index < lessons.length - 1 ? lessons[index + 1] : null;

  const html = wrapPage(
    l.slug,
    l.title,
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
'<h1 class="page-title">REST API Tutorial &#8212; Complete Guide</h1>\n' +
'<div class="page-meta">\n' +
'  <span class="badge">&#128279; REST API</span>\n' +
'  <span class="badge">&#128994; Beginner to Advanced</span>\n' +
'  <span class="badge">&#128197; July 2026</span>\n' +
'</div>\n' +
'<div class="intro-box">\n' +
'  <p>REST APIs power virtually every modern application &#8212; from mobile apps to microservices. This 15-lesson course takes you from HTTP fundamentals to building, securing, documenting, testing, and deploying production-ready REST APIs.</p>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">&#9658;</span> Course Curriculum</div>\n' +
'  <table class="tbl" style="margin-top:15px;">\n' +
'    <tr><th>Lesson</th><th>Topic</th></tr>\n' +
  lessons.map(l => '    <tr><td><strong>Lesson ' + l.num + '</strong></td><td><strong><a href="/' + l.filename + '">' + l.title + '</a></strong></td></tr>').join('\n') + '\n' +
'  </table>\n' +
'</div>\n';

const indexHtml = wrapPage(
  'home',
  'REST API Tutorial — Complete Beginner to Advanced Guide',
  indexContent,
  null, null,
  lessons[0].filename,
  lessons[0].title
);

fs.writeFileSync(path.join(publicDir, 'blog-rest-api.html'), indexHtml, 'utf8');
console.log('Generated: blog-rest-api.html');
console.log('Done! All 15 REST API lessons generated successfully.');
