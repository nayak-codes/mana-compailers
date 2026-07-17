const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const blogDir = path.join(publicDir, 'blog-express');
if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

const lessons = [
  { slug: 'intro',                 num: 1,  title: 'Introduction to Express.js & Node.js',              filename: 'blog-express/intro.html' },
  { slug: 'setup',                 num: 2,  title: 'Installing Express & Setting up the Server',        filename: 'blog-express/setup.html' },
  { slug: 'routing-http-methods',  num: 3,  title: 'Basic Routing & HTTP Methods',                      filename: 'blog-express/routing-http-methods.html' },
  { slug: 'request-response',      num: 4,  title: 'Request Handling & Custom Responses',               filename: 'blog-express/request-response.html' },
  { slug: 'middleware',            num: 5,  title: 'Middleware Architecture & Custom Hooks',            filename: 'blog-express/middleware.html' },
  { slug: 'serving-static-ejs',    num: 6,  title: 'Serving Static Files & EJS Templates',              filename: 'blog-express/serving-static-ejs.html' },
  { slug: 'forms-json-query',      num: 7,  title: 'Handling Forms, JSON payloads & Queries',           filename: 'blog-express/forms-json-query.html' },
  { slug: 'express-router',        num: 8,  title: 'Structuring Large Apps with Express Router',        filename: 'blog-express/express-router.html' },
  { slug: 'mongoose-setup',        num: 9,  title: 'Mongoose Setup: Database Schemas & Models',         filename: 'blog-express/mongoose-setup.html' },
  { slug: 'database-crud',         num: 10, title: 'Database CRUD operations with async/await',         filename: 'blog-express/database-crud.html' },
  { slug: 'sessions-cookies',      num: 11, title: 'Cookies, Session Management & Security',            filename: 'blog-express/sessions-cookies.html' },
  { slug: 'error-handling-logging', num: 12, title: 'Error Handlers & Application Logging',              filename: 'blog-express/error-handling-logging.html' },
  { slug: 'validation',            num: 13, title: 'Input Validation with express-validator',           filename: 'blog-express/validation.html' },
  { slug: 'testing-supertest',     num: 14, title: 'Unit Testing with Jest & Supertest',                filename: 'blog-express/testing-supertest.html' },
  { slug: 'pm2-nginx-deployment',  num: 15, title: 'Production Deployments with PM2 & Nginx',           filename: 'blog-express/pm2-nginx-deployment.html' }
];

function getSidebar(activeSlug) {
  let h = '\n    <div class="sidebar-heading">Express.js Tutorial</div>\n';
  h += '    <a href="/blog-express.html"' + (activeSlug === 'home' ? ' class="active"' : '') + '>Express HOME</a>\n';
  lessons.forEach(l => {
    h += '    <a href="/' + l.filename + '"' + (activeSlug === l.slug ? ' class="active"' : '') + '>' + l.num + '. ' + l.title + '</a>\n';
  });
  h += '\n    <div class="sidebar-heading">Related Topics</div>\n';
  h += '    <a href="/blog-javascript.html">JavaScript</a>\n';
  h += '    <a href="/blog-nodejs.html">Node.js</a>\n';
  h += '    <a href="/blog-rest-api.html">REST API</a>\n';
  h += '    <a href="/blog-mongodb.html">MongoDB</a>\n';
  h += '    <a href="/blog-docker.html">Docker</a>\n';
  h += '    <a href="/blog.html">All Tutorials</a>\n';
  return h;
}

function wrapPage(slug, title, body, prevFile, prevTitle, nextFile, nextTitle) {
  let nav = '<div class="nav-footer">\n';
  if (prevFile) {
    nav += '      <a href="/' + prevFile + '" class="nav-btn"><span class="label">&#8592; Previous Lesson</span><span class="title">' + prevTitle + '</span></a>\n';
  } else {
    nav += '      <a href="/blog-express.html" class="nav-btn"><span class="label">&#8592; Express Overview</span><span class="title">Course Index</span></a>\n';
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
'  <a href="/blog-express.html" class="active">Express.js</a>\n' +
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

  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n' +
'  <meta charset="UTF-8" />\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
'  <title>' + title + ' | Our Compiler</title>\n' +
'  <meta name="description" content="Learn Express.js — ' + title + ' with clear JavaScript examples, code challenges, and step-by-step setup guides." />\n' +
'  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />\n' +
'  <link rel="icon" type="image/png" href="/logo.png" />\n' +
'  <link rel="preconnect" href="https://fonts.googleapis.com" />\n' +
'  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />\n' +
'  <link rel="stylesheet" href="/blog-style.css" />\n' +
'</head>\n' +
'<body class="lang-nodejs">\n' +
'<nav class="topnav">\n' +
'  <a href="/" class="brand">&#128187; Our Compiler</a>\n' +
  topnav +
'</nav>\n' +
'<div class="layout">\n' +
'  <aside class="sidebar">' + getSidebar(slug) + '  </aside>\n' +
'  <main class="content">\n' +
'    <div class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/blog.html">Tutorials</a><span>&#8250;</span><a href="/blog-express.html">Express.js</a><span>&#8250;</span><span>Lesson ' + num + '</span></div>\n' +
'    ' + body + '\n' +
'    ' + nav + '\n' +
'  </main>\n</div>\n</body>\n</html>';
}

// ─── LESSON CONTENTS ─────────────────────────────────────────────────────────
const L = {};

L['intro'] =
'<h1 class="page-title">Introduction to Express.js &amp; Node.js</h1>\n' +
'<div class="page-meta"><span class="badge">&#129409; Express.js</span><span class="badge">Lesson 1</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p><strong>Express.js</strong>, or simply Express, is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It is the de facto standard server framework for JavaScript developers, serving as the "E" in MongoDB-Express-React-Node (MERN) stack.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Node.js &amp; Express Relationship</div>\n' +
'  <p>Node.js is a runtime environment that allows you to execute JavaScript on the server side. While Node.js has a built-in <code>http</code> module to create web servers, the code quickly becomes verbose and complex to manage. Express sits on top of Node\'s HTTP server, abstracting boilerplate tasks like route parsing, request filtering, template rendering, and error handling into a sleek, declarative API.</p>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Core Architecture Philosophy</div>\n' +
'  <ul>\n' +
'    <li><strong>Minimalist</strong>: Express does not force opinions on databases, folder structures, or validation tools. You customize your stack completely.</li>\n' +
'    <li><strong>Middleware-Driven</strong>: An Express app is essentially a stack of middleware function calls executed sequentially on every incoming request.</li>\n' +
'    <li><strong>Routing System</strong>: A powerful, clean route matching engine supporting string paths and regular expressions.</li>\n' +
'  </ul>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write down the primary benefits of Node.js asynchronous event-driven model and why it is well suited for web framework architectures like Express.js.</div>\n' +
'</div>\n';

L['setup'] =
'<h1 class="page-title">Installing Express &amp; Setting up the Server</h1>\n' +
'<div class="page-meta"><span class="badge">&#129409; Express.js</span><span class="badge">Lesson 2</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>Getting a server up and running with Express takes only a few lines of code. Let\'s initialize a Node.js project and configure our entry server file.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Project Initialization &amp; Installation</div>\n' +
'  <p>First, initialize a new Node project and install Express from the package registry:</p>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Terminal Setup</span></div>\n' +
'    <pre><code># Create project directory\nmkdir express-app &amp;&amp; cd express-app\n\n# Initialize npm project package file\nnpm init -y\n\n# Install the Express package\nnpm install express</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Creating index.js Entry Point</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; index.js</span></div>\n' +
'    <pre><code>const express = require("express");\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\n// Basic route entry point\napp.get("/", (req, res) =&gt; {\n  res.send("Hello, World from Express!");\n});\n\n// Start the listener\napp.listen(PORT, () =&gt; {\n  console.log(`Server is running on port ${PORT}`);\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a start command script inside your <code>package.json</code> file, and run the server locally. Test the server locally in your browser at <code>http://localhost:3000</code>.</div>\n' +
'</div>\n';

L['routing-http-methods'] =
'<h1 class="page-title">Basic Routing &amp; HTTP Methods</h1>\n' +
'<div class="page-meta"><span class="badge">&#129409; Express.js</span><span class="badge">Lesson 3</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI and a specific HTTP request method.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> RESTful Endpoint Routings</div>\n' +
'  <p>Express supports all HTTP verbs including GET, POST, PUT, and DELETE out of the box:</p>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; server.js</span></div>\n' +
'    <pre><code>const express = require("express");\nconst app = express();\n\n// GET request - retrieve info\napp.get("/api/users", (req, res) =&gt; {\n  res.send("Fetching all user profiles...");\n});\n\n// POST request - create new resource\napp.post("/api/users", (req, res) =&gt; {\n  res.send("Creating a new user profile...");\n});\n\n// PUT request - replace/update existing resource\napp.put("/api/users", (req, res) =&gt; {\n  res.send("Updating user profile completely...");\n});\n\n// DELETE request - delete resource\napp.delete("/api/users", (req, res) =&gt; {\n  res.send("Deleting user profile...");\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> app.all() and Route Parameters Pattern</div>\n' +
'  <p>The <code>app.all()</code> method is useful for loading middleware functions at a path for all request methods. Express also supports route pattern matching with parameters:</p>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Pattern Matching</span></div>\n' +
'    <pre><code>// Matches any HTTP method on /secret path\napp.all("/secret", (req, res, next) =&gt; {\n  console.log("Accessing the secret section...");\n  next(); // pass control to the next handler\n});\n\n// Route paths with string patterns (matches /acd and /abcd)\napp.get("/ab?cd", (req, res) =&gt; {\n  res.send("ab?cd match!");\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a route path pattern that matches both <code>/profile</code> and <code>/user-profile</code> dynamically using a regular expression or wildcard matching pattern in Express.</div>\n' +
'</div>\n';

L['request-response'] =
'<h1 class="page-title">Request Handling &amp; Custom Responses</h1>\n' +
'<div class="page-meta"><span class="badge">&#129409; Express.js</span><span class="badge">Lesson 4</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>The Request (<code>req</code>) and Response (<code>res</code>) objects are the primary conduits through which your Express server exchanges information with clients.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Essential req properties</div>\n' +
'  <ul>\n' +
'    <li><code>req.params</code>: Extracts variables from dynamic path segments (e.g. <code>/users/:id</code>).</li>\n' +
'    <li><code>req.query</code>: Extracts query parameters from URLs (e.g. <code>/search?q=js</code>).</li>\n' +
'    <li><code>req.headers</code>: Inspects HTTP headers sent by the client.</li>\n' +
'    <li><code>req.ip</code>: Retrieves the remote IP address of the client connection.</li>\n' +
'  </ul>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Dynamic response methods</div>\n' +
'  <p>Express extends response handling with methods like <code>res.json()</code>, <code>res.status()</code>, and <code>res.download()</code>:</p>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; req_res_demo.js</span></div>\n' +
'    <pre><code>app.get("/users/:id", (req, res) =&gt; {\n  const userId = req.params.id;\n  const filter = req.query.filter || "none";\n  \n  // Return a JSON response with status code 200\n  res.status(200).json({\n    id: userId,\n    filter: filter,\n    active: true\n  });\n});\n\napp.get("/download-log", (req, res) =&gt; {\n  // Initiates download request for a local file\n  res.download("./logs/app.log");\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write an endpoint <code>/api/headers</code> that returns a JSON list showing the incoming request\'s <code>User-Agent</code> header and host details, with a custom header <code>X-Powered-By-Mana</code> added to the response.</div>\n' +
'</div>\n';

L['middleware'] =
'<h1 class="page-title">Middleware Architecture &amp; Custom Hooks</h1>\n' +
'<div class="page-meta"><span class="badge">&#129409; Express.js</span><span class="badge">Lesson 5</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Custom Request Logging Logger</div>\n' +
'  <p>Middleware functions can execute any code, make changes to the request and the response objects, end the request-response cycle, and call the next middleware in the stack:</p>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; custom_middleware.js</span></div>\n' +
'    <pre><code>const express = require("express");\nconst app = express();\n\n// Custom logging middleware\nconst requestLogger = (req, res, next) =&gt; {\n  const method = req.method;\n  const url = req.url;\n  const time = new Date().toISOString();\n  console.log(`[${time}] ${method} request sent to ${url}`);\n  \n  next(); // Crucial! Calls the next middleware or route handler\n};\n\n// Apply middleware globally to all incoming routes\napp.use(requestLogger);</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Middleware Categories</div>\n' +
'  <ul>\n' +
'    <li><strong>Application-level</strong>: Bound to an instance of the app object using <code>app.use()</code> or <code>app.METHOD()</code>.</li>\n' +
'    <li><strong>Router-level</strong>: Bound to an instance of <code>express.Router()</code>.</li>\n' +
'    <li><strong>Built-in</strong>: Native express middleware like <code>express.json()</code> and <code>express.static()</code>.</li>\n' +
'    <li><strong>Third-party</strong>: Community modules like <code>cookie-parser</code>, <code>cors</code>, and <code>morgan</code>.</li>\n' +
'  </ul>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a custom route-specific authentication middleware <code>requireApiKey</code> that verifies if the header <code>x-api-key</code> equals "secret123". If it does not match, return a 401 Unauthorized JSON error code.</div>\n' +
'</div>\n';

L['serving-static-ejs'] =
'<h1 class="page-title">Serving Static Files &amp; EJS Templates</h1>\n' +
'<div class="page-meta"><span class="badge">&#129409; Express.js</span><span class="badge">Lesson 6</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>Express makes serving static files such as images, CSS files, and JavaScript files extremely straightforward. It also natively supports dynamic template rendering engines like EJS.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Serving Static Assets</div>\n' +
'  <p>To serve static files, use the built-in <code>express.static</code> middleware. Typically, static assets are stored inside a folder named <code>public</code>:</p>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; static_files.js</span></div>\n' +
'    <pre><code>const express = require("express");\nconst path = require("path");\nconst app = express();\n\n// Serve assets under the /static URL prefix\napp.use("/static", express.static(path.join(__dirname, "public")));</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Configuring EJS Template Engine</div>\n' +
'  <p>EJS (Embedded JavaScript) lets you generate HTML pages with template interpolation tags:</p>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; view_engine.js</span></div>\n' +
'    <pre><code>app.set("view engine", "ejs");\napp.set("views", path.join(__dirname, "views"));\n\napp.get("/welcome", (req, res) =&gt; {\n  res.render("welcome", {\n    title: "Welcome Page",\n    user: "Balaji Nayak"\n  });\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a basic EJS layout page inside the <code>views/</code> folder named <code>welcome.ejs</code>. Display a loop rendering an array of technology strings passed down from your controller.</div>\n' +
'</div>\n';

L['forms-json-query'] =
'<h1 class="page-title">Handling Forms, JSON payloads &amp; Queries</h1>\n' +
'<div class="page-meta"><span class="badge">&#129409; Express.js</span><span class="badge">Lesson 7</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>To handle incoming form submissions or JSON data, Express needs parser middlewares configuration. Express provides built-in parsers since version 4.16.0.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Body Parsing Middleware Configuration</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; payload_parsers.js</span></div>\n' +
'    <pre><code>const express = require("express");\nconst app = express();\n\n// Parses incoming JSON request payloads\napp.use(express.json());\n\n// Parses incoming url-encoded forms submissions\napp.use(express.urlencoded({ extended: true }));\n\napp.post("/submit-form", (req, res) =&gt; {\n  // Access form variables sent via POST\n  const username = req.body.username;\n  const email = req.body.email;\n  res.send(`Form parsed: ${username} - ${email}`);\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Parsing Query String Parameters</div>\n' +
'  <p>Express naturally parses query parameter strings into the <code>req.query</code> object, making paging and search queries straightforward:</p>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Parsing Queries</span></div>\n' +
'    <pre><code>// GET /api/search?q=express&amp;limit=5\napp.get("/api/search", (req, res) =&gt; {\n  const searchVal = req.query.q;\n  const limitVal = parseInt(req.query.limit) || 10;\n  res.json({ search: searchVal, limit: limitVal });\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a route handler that receives a POST request containing JSON data with fields <code>id</code> and <code>status</code>. Send back a JSON response confirming status change with status code 202.</div>\n' +
'</div>\n';

L['express-router'] =
'<h1 class="page-title">Structuring Large Apps with Express Router</h1>\n' +
'<div class="page-meta"><span class="badge">&#129409; Express.js</span><span class="badge">Lesson 8</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>As applications grow, keeping all routes in one file becomes unsustainable. Use the <code>express.Router</code> class to create modular, mountable route handlers.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Building Modular Route Files</div>\n' +
'  <p>Create a dedicated file for each module or feature area in your application:</p>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; routes/users.js</span></div>\n' +
'    <pre><code>const express = require("express");\nconst router = express.Router();\n\n// Defines base routes inside user router\nrouter.get("/", (req, res) =&gt; {\n  res.send("Get all users");\n});\n\nrouter.get("/:id", (req, res) =&gt; {\n  res.send(`Get user profile for ${req.params.id}`);\n});\n\nmodule.exports = router;</code></pre>\n' +
'  </div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; server.js</span></div>\n' +
'    <pre><code>const express = require("express");\nconst app = express();\nconst userRouter = require("./routes/users");\n\n// Mount the router onto a specific prefix path\napp.use("/api/v1/users", userRouter);</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create an <code>api/posts.js</code> Router module, configure standard endpoints for retrieving all blog posts, and mount the router at <code>/api/v1/posts</code> inside server config.</div>\n' +
'</div>\n';

L['mongoose-setup'] =
'<h1 class="page-title">Mongoose Setup: Database Schemas &amp; Models</h1>\n' +
'<div class="page-meta"><span class="badge">&#129409; Express.js</span><span class="badge">Lesson 9</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and translates between objects in code and database documents.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Connecting to MongoDB &amp; Schema Setup</div>\n' +
'  <p>First, install Mongoose: <code>npm install mongoose</code>. Then write your DB setup and schema definitions:</p>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; models/User.js</span></div>\n' +
'    <pre><code>const mongoose = require("mongoose");\n\n// Establish MongoDB connection\nmongoose.connect("mongodb://localhost:27017/expressdb")\n  .then(() =&gt; console.log("Connected to MongoDB..."))\n  .catch(err =&gt; console.error("Database connection error:", err));\n\n// Define Schema model structure\nconst userSchema = new mongoose.Schema({\n  username: { type: String, required: true, unique: true },\n  email: { type: String, required: true },\n  role: { type: String, default: "user" },\n  createdAt: { type: Date, default: Date.now }\n});\n\n// Compile schema into model export class\nmodule.exports = mongoose.model("User", userSchema);</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create a Mongoose schema configuration for a <code>Post</code> model featuring properties <code>title</code>, <code>body</code>, and <code>author</code>, making the title property required.</div>\n' +
'</div>\n';

L['database-crud'] =
'<h1 class="page-title">Database CRUD operations with async/await</h1>\n' +
'<div class="page-meta"><span class="badge">&#129409; Express.js</span><span class="badge">Lesson 10</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Using Mongoose, we can build REST controller endpoints inside our Express app to perform standard CRUD operations against a MongoDB database.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> REST Endpoint Controller Actions</div>\n' +
'  <p>Ensure you handle asynchronous operations cleanly using async/await syntax and try/catch blocks:</p>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; controllers/userController.js</span></div>\n' +
'    <pre><code>const User = require("../models/User");\n\n// Create user\napp.post("/users", async (req, res) =&gt; {\n  try {\n    const newUser = new User(req.body);\n    await newUser.save();\n    res.status(201).json(newUser);\n  } catch (err) {\n    res.status(400).json({ error: err.message });\n  }\n});\n\n// Read user profiles\napp.get("/users", async (req, res) =&gt; {\n  try {\n    const users = await User.find();\n    res.status(200).json(users);\n  } catch (err) {\n    res.status(500).json({ error: err.message });\n  }\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Modifying and Deleting Records</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Update &amp; Delete Actions</span></div>\n' +
'    <pre><code>// Update database record by ID\napp.put("/users/:id", async (req, res) =&gt; {\n  try {\n    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });\n    res.json(updatedUser);\n  } catch (err) {\n    res.status(400).json({ error: err.message });\n  }\n});\n\n// Delete database record by ID\napp.delete("/users/:id", async (req, res) =&gt; {\n  try {\n    await User.findByIdAndDelete(req.params.id);\n    res.json({ message: "User deleted successfully" });\n  } catch (err) {\n    res.status(400).json({ error: err.message });\n  }\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a route mapping GET requests to <code>/users/:username</code>. Lookup the database for a user matching the passed username param, returning a 404 error if not found.</div>\n' +
'</div>\n';

L['sessions-cookies'] =
'<h1 class="page-title">Cookies, Session Management &amp; Security</h1>\n' +
'<div class="page-meta"><span class="badge">&#129409; Express.js</span><span class="badge">Lesson 11</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Session identifiers stored inside encrypted cookies are standard features for handling stateful actions like logins. In Express, use the <code>express-session</code> module.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Configuring express-session middleware</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; session_setup.js</span></div>\n' +
'    <pre><code>const session = require("express-session");\n\napp.use(session({\n  secret: "extremely-secret-key-change-this",\n  resave: false,\n  saveUninitialized: false,\n  cookie: {\n    secure: false, // Set to true if utilizing HTTPS\n    httpOnly: true, // Safeguards cookie from client-side JS read\n    maxAge: 3600000 // Session timeout in milliseconds (1 hour)\n  }\n}));\n\napp.post("/login", (req, res) =&gt; {\n  // Assign session properties upon verification\n  req.session.userId = "user_12345";\n  res.send("Logged in session successfully!");\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Session Destroy and Logout</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; Logout flow</span></div>\n' +
'    <pre><code>app.post("/logout", (req, res) =&gt; {\n  req.session.destroy(err =&gt; {\n    if (err) return res.status(500).send("Error logging out");\n    res.clearCookie("connect.sid"); // clear default session cookie\n    res.send("Logged out successfully");\n  });\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a route mapping GET requests to <code>/dashboard</code>. Ensure that the dashboard route only renders the data model if <code>req.session.userId</code> exists, returning a 403 Forbidden code if it does not.</div>\n' +
'</div>\n';

L['error-handling-logging'] =
'<h1 class="page-title">Error Handlers &amp; Application Logging</h1>\n' +
'<div class="page-meta"><span class="badge">&#129409; Express.js</span><span class="badge">Lesson 12</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Express features a built-in default error handler that takes care of errors in the router middleware stack. Custom error handlers are defined as special middlewares containing 4 arguments.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Custom 4-parameter Error Middleware</div>\n' +
'  <p>To register an error-handling middleware, place it at the very bottom of your application stack after all other routes and middleware definitions:</p>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; error_handler.js</span></div>\n' +
'    <pre><code>// 4 argument signature: (err, req, res, next)\napp.use((err, req, res, next) =&gt; {\n  console.error("Global Error Handler caught:", err.stack);\n  \n  res.status(err.status || 500).json({\n    error: true,\n    message: err.message || "Internal Server Error"\n  });\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Integrating morgan HTTP logging</div>\n' +
'  <p>Morgan logs server activity in detail. Install it with <code>npm install morgan</code>:</p>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; HTTP Logs configuration</span></div>\n' +
'    <pre><code>const morgan = require("morgan");\n\n// Write all requests to combined log format\napp.use(morgan("combined"));</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a route that intentionally throws a custom JavaScript error (e.g. <code>new Error("Resource missing")</code>). Test that your custom global error middleware catches it and returns a 500 status payload.</div>\n' +
'</div>\n';

L['validation'] =
'<h1 class="page-title">Input Validation with express-validator</h1>\n' +
'<div class="page-meta"><span class="badge">&#129409; Express.js</span><span class="badge">Lesson 13</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Sanitizing inputs from user forms prevents SQL injections, XSS, and bad schemas. The package <code>express-validator</code> provides a clean API built as standard middleware blocks.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Setting up validation chains</div>\n' +
'  <p>Install the package: <code>npm install express-validator</code>. Configure validation rules for POST/PUT parameters:</p>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; validation_app.js</span></div>\n' +
'    <pre><code>const { body, validationResult } = require("express-validator");\n\napp.post("/register", [\n  // Validation checks\n  body("email").isEmail().withMessage("Must be a valid email address"),\n  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")\n], (req, res) =&gt; {\n  const errors = validationResult(req);\n  if (!errors.isEmpty()) {\n    return res.status(400).json({ errors: errors.array() });\n  }\n  \n  res.send("Registration input validated successfully!");\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Add validation rules to registration inputs: ensure that the <code>username</code> property is not empty, and use `.trim()` and `.escape()` to sanitize the input values.</div>\n' +
'</div>\n';

L['testing-supertest'] =
'<h1 class="page-title">Unit Testing with Jest &amp; Supertest</h1>\n' +
'<div class="page-meta"><span class="badge">&#129409; Express.js</span><span class="badge">Lesson 14</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Supertest is a Node library for testing HTTP servers, allowing developers to write clean, assertion-driven API tests without having to start local listener sockets.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Configuring Jest and Supertest</div>\n' +
'  <p>Install testing utilities: <code>npm install --save-dev jest supertest</code>. Separate your server config from your server listener so you don\'t bind ports during tests:</p>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">JavaScript &#8212; app.test.js</span></div>\n' +
'    <pre><code>const request = require("supertest");\nconst express = require("express");\nconst app = express();\n\napp.get("/api/health", (req, res) =&gt; res.status(200).send("OK"));\n\ndescribe("GET /api/health", () =&gt; {\n  it("should return a status code of 200 and OK string payload", async () =&gt; {\n    const res = await request(app).get("/api/health");\n    expect(res.statusCode).toEqual(200);\n    expect(res.text).toBe("OK");\n  });\n});</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a unit test script mapping POST request actions to <code>/api/users</code>. Validate that creating a new user record successfully returns a JSON response containing an ID.</div>\n' +
'</div>\n';

L['pm2-nginx-deployment'] =
'<h1 class="page-title">Production Deployments with PM2 &amp; Nginx</h1>\n' +
'<div class="page-meta"><span class="badge">&#129409; Express.js</span><span class="badge">Lesson 15</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Deploying Express applications in production requires process managers to handle background daemon processes, auto-restarts, and load-balancing proxies.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Setting up PM2 Process Manager</div>\n' +
'  <p>PM2 is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever:</p>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Running PM2</span></div>\n' +
'    <pre><code># Install PM2 globally\nnpm install pm2 -g\n\n# Start your application in cluster mode across all available cores\npm2 start index.js -i max --name "express-api"\n\n# View daemon processes list and system metrics\npm2 list\npm2 monit</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Configuring Nginx Proxy Pass</div>\n' +
'  <p>Nginx acts as a reverse proxy, forwarding external internet requests to the local Express app running behind your firewall:</p>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Nginx &#8212; /etc/nginx/sites-available/default</span></div>\n' +
'    <pre><code>server {\n  listen 80;\n  server_name yourdomain.com;\n\n  location / {\n    proxy_pass http://localhost:3000;\n    proxy_http_version 1.1;\n    proxy_set_header Upgrade $http_upgrade;\n    proxy_set_header Connection \'upgrade\';\n    proxy_set_header Host $host;\n    proxy_cache_bypass $http_upgrade;\n  }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a basic <code>ecosystem.config.js</code> PM2 launch file that configures application environment variables and auto-restart properties for deployment.</div>\n' +
'</div>\n';

// ─── GENERATE FILES ──────────────────────────────────────────────────────────
console.log('Starting Express lesson generation...');

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
'<h1 class="page-title">Express.js Tutorial &#8212; Complete Guide</h1>\n' +
'<div class="page-meta"><span class="badge">&#129409; Express.js</span><span class="badge">&#128994; Beginner to Advanced</span><span class="badge">&#128197; July 2026</span></div>\n' +
'<div class="intro-box"><p>Express.js is a minimal, fast, and unopinionated web framework for Node.js. It is the core backend framework for modern JavaScript web development. This 15-lesson bootcamp takes you from initial setups, route configurations, middleware design, Mongoose integration, database operations, user session cookies, inputs validation, testing routines, and production server deployments.</p></div>\n' +
'<div class="section">\n  <div class="section-title"><span class="num">&#9658;</span> Course Curriculum</div>\n' +
'  <table class="tbl" style="margin-top:15px;">\n    <tr><th>Lesson</th><th>Topic</th></tr>\n' +
lessons.map(l => '    <tr><td><strong>Lesson ' + l.num + '</strong></td><td><a href="/' + l.filename + '"><strong>' + l.title + '</strong></a></td></tr>').join('\n') +
'\n  </table>\n</div>\n';

const indexHtml = wrapPage('home',
  'Express.js Tutorial — Complete Beginner to Advanced Guide',
  indexContent, null, null, lessons[0].filename, lessons[0].title);

fs.writeFileSync(path.join(publicDir, 'blog-express.html'), indexHtml, 'utf8');
console.log('Generated: blog-express.html');
console.log('Done! All 15 Express lessons generated successfully.');
