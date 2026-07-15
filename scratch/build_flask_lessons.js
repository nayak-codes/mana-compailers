const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const blogDir = path.join(publicDir, 'blog-flask');
if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

const lessons = [
  { slug: 'intro',                 num: 1,  title: 'Introduction to Flask',                     filename: 'blog-flask/intro.html' },
  { slug: 'hello-world',           num: 2,  title: 'First Flask App & Debug Mode',              filename: 'blog-flask/hello-world.html' },
  { slug: 'routing-dynamic-urls',  num: 3,  title: 'Routing & Dynamic URL Parameters',          filename: 'blog-flask/routing-dynamic-urls.html' },
  { slug: 'templates-jinja',       num: 4,  title: 'Templates with Jinja2 & Static Files',      filename: 'blog-flask/templates-jinja.html' },
  { slug: 'request-response',      num: 5,  title: 'Request Handling & Custom Responses',       filename: 'blog-flask/request-response.html' },
  { slug: 'sessions-cookies',      num: 6,  title: 'Cookies, Sessions & Flash Messages',        filename: 'blog-flask/sessions-cookies.html' },
  { slug: 'sqlalchemy-models',     num: 7,  title: 'Flask-SQLAlchemy: Setup & Models',          filename: 'blog-flask/sqlalchemy-models.html' },
  { slug: 'database-crud',         num: 8,  title: 'Database CRUD & Flask-Migrate',             filename: 'blog-flask/database-crud.html' },
  { slug: 'user-authentication',    num: 9,  title: 'User Authentication with Flask-Login',      filename: 'blog-flask/user-authentication.html' },
  { slug: 'blueprints',            num: 10, title: 'Structuring Large Apps with Blueprints',     filename: 'blog-flask/blueprints.html' },
  { slug: 'rest-apis',             num: 11, title: 'Building REST APIs with Flask-RESTful',     filename: 'blog-flask/rest-apis.html' },
  { slug: 'forms-validation',      num: 12, title: 'Forms & Validation with Flask-WTF',         filename: 'blog-flask/forms-validation.html' },
  { slug: 'error-handling-logging', num: 13, title: 'Error Handlers & Application Logging',      filename: 'blog-flask/error-handling-logging.html' },
  { slug: 'testing',               num: 14, title: 'Unit Testing with Pytest & Flask Client',   filename: 'blog-flask/testing.html' },
  { slug: 'production-deployment', num: 15, title: 'Production Servers (Gunicorn & Nginx)',     filename: 'blog-flask/production-deployment.html' }
];

function getSidebar(activeSlug) {
  let h = '\n    <div class="sidebar-heading">Flask Tutorial</div>\n';
  h += '    <a href="/blog-flask.html"' + (activeSlug === 'home' ? ' class="active"' : '') + '>Flask HOME</a>\n';
  lessons.forEach(l => {
    h += '    <a href="/' + l.filename + '"' + (activeSlug === l.slug ? ' class="active"' : '') + '>' + l.num + '. ' + l.title + '</a>\n';
  });
  h += '\n    <div class="sidebar-heading">Related Topics</div>\n';
  h += '    <a href="/blog-python.html">Python</a>\n';
  h += '    <a href="/blog-django.html">Django</a>\n';
  h += '    <a href="/blog-rest-api.html">REST API</a>\n';
  h += '    <a href="/blog-postgresql.html">PostgreSQL</a>\n';
  h += '    <a href="/blog-docker.html">Docker</a>\n';
  h += '    <a href="/blog.html">All Tutorials</a>\n';
  return h;
}

function wrapPage(slug, title, body, prevFile, prevTitle, nextFile, nextTitle) {
  let nav = '<div class="nav-footer">\n';
  if (prevFile) {
    nav += '      <a href="/' + prevFile + '" class="nav-btn"><span class="label">&#8592; Previous Lesson</span><span class="title">' + prevTitle + '</span></a>\n';
  } else {
    nav += '      <a href="/blog-flask.html" class="nav-btn"><span class="label">&#8592; Flask Overview</span><span class="title">Course Index</span></a>\n';
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
'  <a href="/blog-flask.html" class="active">Flask</a>\n' +
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

  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n' +
'  <meta charset="UTF-8" />\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
'  <title>' + title + ' | Our Compiler</title>\n' +
'  <meta name="description" content="Learn Flask — ' + title + ' with clear Python examples, code challenges, and step-by-step setup guides." />\n' +
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
'<body class="lang-flask">\n' +
'<nav class="topnav">\n' +
'  <a href="/" class="brand">&#128187; Our Compiler</a>\n' +
topnav +
'</nav>\n' +
'<div class="layout">\n' +
'  <aside class="sidebar">' + getSidebar(slug) + '  </aside>\n' +
'  <main class="content">\n' +
'    <div class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/blog.html">Tutorials</a><span>&#8250;</span><a href="/blog-flask.html">Flask</a><span>&#8250;</span><span>Lesson ' + num + '</span></div>\n' +
'    ' + body + '\n' +
'    ' + nav + '\n' +
'  </main>\n</div>\n</body>\n</html>';
}

// ─── LESSON CONTENTS ─────────────────────────────────────────────────────────
const L = {};

L['intro'] =
'<h1 class="page-title">Introduction to Flask</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Flask</span><span class="badge">Lesson 1</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p><strong>Flask</strong> is a lightweight WSGI web application framework in Python. It is designed to make getting started quick and easy, with the ability to scale up to complex applications. It began as a simple wrapper around Werkzeug and Jinja and has become one of the most popular Python web frameworks.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Micro-Framework Philosophy</div>\n' +
'  <p>Flask is classified as a micro-framework because it does not require particular tools or libraries. It has no database abstraction layer, form validation, or any other components where pre-existing third-party libraries provide common functions. Instead, Flask supports extensions that can add application features as if they were implemented in Flask itself.</p>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Why Choose Flask?</div>\n' +
'  <ul>\n' +
'    <li><strong>Simple and Flexible</strong>: Only minimal boilerplate code is required to start a working server.</li>\n' +
'    <li><strong>Developer Control</strong>: You decide how to structure your app, which database to use, and how to validate inputs.</li>\n' +
'    <li><strong>Extensible</strong>: Huge ecosystem of extensions (Flask-SQLAlchemy, Flask-Login, Flask-Migrate, etc.).</li>\n' +
'    <li><strong>Great for Microservices</strong>: Low overhead makes it perfect for lightweight APIs and microservice architectures.</li>\n' +
'  </ul>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write down a short comparison of Flask and Django in your own words, explaining when you would prefer to use a micro-framework.</div>\n' +
'</div>\n';

L['hello-world'] =
'<h1 class="page-title">First Flask App &amp; Debug Mode</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Flask</span><span class="badge">Lesson 2</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>Getting started with Flask is incredibly fast. With just five lines of code, you can have a local development server running.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Writing Your First App</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; app.py</span></div>\n' +
'    <pre><code>from flask import Flask\n\napp = Flask(__name__)\n\n@app.route("/")\ndef hello_world():\n    return "Hello, World!"\n\nif __name__ == "__main__":\n    # Run server locally on port 5000 in debug mode\n    app.run(debug=True)</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Why Enable Debug Mode?</div>\n' +
'  <ul>\n' +
'    <li><strong>Auto-Reload</strong>: The server automatically restarts whenever you save changes to your code.</li>\n' +
'    <li><strong>Interactive Debugger</strong>: If an exception occurs, an interactive debugger will display in the browser, letting you execute code dynamically at the error line.</li>\n' +
'  </ul>\n' +
'  <div class="warning-box"><strong>Warning:</strong> Never enable debug mode in a production environment, as it allows arbitrary code execution on your server.</div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Install flask with <code>pip install flask</code>, create your first <code>app.py</code> script, and run it. Confirm that you can see "Hello, World!" by navigating to <code>http://127.0.0.1:5000</code>.</div>\n' +
'</div>\n';

L['routing-dynamic-urls'] =
'<h1 class="page-title">Routing &amp; Dynamic URL Parameters</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Flask</span><span class="badge">Lesson 3</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>Routing is used to bind a URL to a Python function. Dynamic routes allow you to extract variables from the path segment dynamically.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Defining Routes &amp; URL Converters</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; app.py</span></div>\n' +
'    <pre><code>from flask import Flask\n\napp = Flask(__name__)\n\n# Basic routing\n@app.route("/about")\ndef about():\n    return "About Us"\n\n# Dynamic routing with default string converter\n@app.route("/user/&lt;username&gt;")\ndef show_user_profile(username):\n    return f"User Profile: {username}"\n\n# Dynamic routing with specific type converters\n@app.route("/post/&lt;int:post_id&gt;")\ndef show_post(post_id):\n    return f"Showing Post ID: {post_id}"\n\n@app.route("/path/&lt;path:subpath&gt;")\ndef show_subpath(subpath):\n    return f"Subpath: {subpath}"</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Allowed Converters</div>\n' +
'  <table class="tbl">\n' +
'    <tr><th>Converter</th><th>Description</th></tr>\n' +
'    <tr><td><code>string</code></td><td>Accepts any text without a slash (default)</td></tr>\n' +
'    <tr><td><code>int</code></td><td>Accepts positive integers</td></tr>\n' +
'    <tr><td><code>float</code></td><td>Accepts positive floating point values</td></tr>\n' +
'    <tr><td><code>path</code></td><td>Accepts text with slashes (matches entire remaining path)</td></tr>\n' +
'    <tr><td><code>uuid</code></td><td>Accepts UUID strings</td></tr>\n' +
'  </table>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a route that accepts a float value <code>/temperature/&lt;float:val&gt;</code> and returns a statement indicating whether it is above or below freezing (0.0 degrees).</div>\n' +
'</div>\n';

L['templates-jinja'] =
'<h1 class="page-title">Templates with Jinja2 &amp; Static Files</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Flask</span><span class="badge">Lesson 4</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>Flask uses Jinja2 as its template engine. Templates allow you to output dynamic HTML, keeping presentation logic separated from Python source code.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Rendering a Template</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; app.py</span></div>\n' +
'    <pre><code>from flask import Flask, render_template\n\napp = Flask(__name__)\n\n@app.route("/items")\ndef list_items():\n    items_list = ["Laptop", "Mouse", "Keyboard"]\n    return render_template("items.html", items=items_list, title="Inventory")</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Jinja2 Syntax</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">HTML &#8212; templates/items.html</span></div>\n' +
'    <pre><code>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n    &lt;title&gt;{{ title }}&lt;/title&gt;\n    &lt;!-- Link to static files folder --&gt;\n    &lt;link rel="stylesheet" href="{{ url_for(&#39;static&#39;, filename=&#39;style.css&#39;) }}"&gt;\n&lt;/head&gt;\n&lt;body&gt;\n    &lt;h1&gt;Items list&lt;/h1&gt;\n    &lt;ul&gt;\n    {% for item in items %}\n        &lt;li&gt;{{ item|upper }}&lt;/li&gt;\n    {% else %}\n        &lt;li&gt;No items found.&lt;/li&gt;\n    {% endfor %}\n    &lt;/ul&gt;\n&lt;/body&gt;\n&lt;/html&gt;</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Set up a project containing a <code>templates/</code> directory and a <code>static/</code> directory. Create a base layout template that is inherited by a landing page template, displaying a list of products.</div>\n' +
'</div>\n';

L['request-response'] =
'<h1 class="page-title">Request Handling &amp; Custom Responses</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Flask</span><span class="badge">Lesson 5</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>Flask provides access to the global <code>request</code> object containing client data, and lets you return custom headers, status codes, and JSON payloads easily.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Query Params &amp; Forms</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; Handling Incoming Data</span></div>\n' +
'    <pre><code>from flask import Flask, request, jsonify, make_response\n\napp = Flask(__name__)\n\n@app.route("/search")\ndef search():\n    # Get query parameters: /search?q=flask&amp;limit=10\n    query = request.args.get("q", "")\n    limit = request.args.get("limit", 10, type=int)\n    return f"Search for: {query}, Limit: {limit}"\n\n@app.route("/login", methods=["POST"])\ndef login():\n    # Access POST form fields or JSON data\n    username = request.form.get("username")\n    # Or if request payload is JSON:\n    # data = request.get_json()\n    return jsonify({"authenticated": True, "user": username})</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Custom Headers &amp; Status Codes</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; Custom Responses</span></div>\n' +
'    <pre><code>@app.route("/resource")\ndef get_resource():\n    response = make_response(jsonify({"msg": "Content"}), 201)\n    response.headers["X-Custom-Header"] = "FlaskVal"\n    return response</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a route that accepts POST requests containing a JSON payload with fields <code>name</code> and <code>email</code>. Validate that both fields exist; if they do not, return a 400 Bad Request JSON response.</div>\n' +
'</div>\n';

L['sessions-cookies'] =
'<h1 class="page-title">Cookies, Sessions &amp; Flash Messages</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Flask</span><span class="badge">Lesson 6</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Flask uses cryptographically signed cookies to implement client-side sessions, ensuring that session data cannot be modified by users without a secret key.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Setting up Sessions</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; session_app.py</span></div>\n' +
'    <pre><code>from flask import Flask, session, redirect, url_for, flash\n\napp = Flask(__name__)\n# Secret key is required to sign session cookies\napp.secret_key = "super-secret-key-change-this-in-prod"\n\n@app.route("/login-session")\ndef login():\n    session["user"] = "Balaji"\n    flash("Logged in successfully!", "info")\n    return redirect(url_for("profile"))\n\n@app.route("/profile")\ndef profile():\n    user = session.get("user")\n    if not user:\n        flash("You are not logged in.", "warning")\n        return "Please log in first."\n    return f"Welcome, {user}!"</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Displaying Flashed Messages</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">HTML &#8212; base.html</span></div>\n' +
'    <pre><code>{% with messages = get_flashed_messages(with_categories=true) %}\n  {% if messages %}\n    &lt;div class="flashes"&gt;\n    {% for category, message in messages %}\n      &lt;div class="alert alert-{{ category }}"&gt;{{ message }}&lt;/div&gt;\n    {% endfor %}\n    &lt;/div&gt;\n  {% endif %}\n{% endwith %}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Add a logout route <code>/logout</code> that pops the user variable from the session, flashes a success message, and redirects the user back to the home page.</div>\n' +
'</div>\n';

L['sqlalchemy-models'] =
'<h1 class="page-title">Flask-SQLAlchemy: Setup &amp; Models</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Flask</span><span class="badge">Lesson 7</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Flask-SQLAlchemy is an extension that adds support for SQLAlchemy to your Flask application, simplifying database connection configuration and model structures.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Database Setup &amp; Schema</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; models.py</span></div>\n' +
'    <pre><code>from flask import Flask\nfrom flask_sqlalchemy import SQLAlchemy\n\ndb = SQLAlchemy()\n\ndef create_app():\n    app = Flask(__name__)\n    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"\n    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False\n    db.init_app(app)\n    return app\n\nclass User(db.Model):\n    __tablename__ = "users"\n    id = db.Column(db.Integer, primary_key=True)\n    username = db.Column(db.String(80), unique=True, nullable=False)\n    email = db.Column(db.String(120), unique=True, nullable=False)\n    # One-to-many relationship mapping\n    posts = db.relationship("Post", backref="author", lazy=True)\n\nclass Post(db.Model):\n    __tablename__ = "posts"\n    id = db.Column(db.Integer, primary_key=True)\n    title = db.Column(db.String(200), nullable=False)\n    content = db.Column(db.Text, nullable=False)\n    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Add a new field named <code>created_at</code> to the <code>Post</code> model utilizing SQLAlchemy&#39;s DateTime type, setting the default value to the current time.</div>\n' +
'</div>\n';

L['database-crud'] =
'<h1 class="page-title">Database CRUD &amp; Flask-Migrate</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Flask</span><span class="badge">Lesson 8</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Flask-Migrate handles database schema transitions using Alembic, while SQLAlchemy enables you to perform standard CRUD operations using session execution blocks.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Performing CRUD Operations</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; CRUD Actions</span></div>\n' +
'    <pre><code># Create new record\nnew_user = User(username="balaji", email="b@test.com")\ndb.session.add(new_user)\ndb.session.commit()\n\n# Read query lookup\nuser = User.query.filter_by(username="balaji").first()\n\n# Update record\nuser.email = "new_email@test.com"\ndb.session.commit()\n\n# Delete record\ndb.session.delete(user)\ndb.session.commit()</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Database Migrations Setup</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Terminal Commands</span></div>\n' +
'    <pre><code># Initialize migrations folder\nflask db init\n\n# Generate migration script file\nflask db migrate -m "Initial migration"\n\n# Apply migrations to database\nflask db upgrade</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a database initialization script or route that adds 10 dummy posts to the database using a bulk insertion list, committing them at the end.</div>\n' +
'</div>\n';

L['user-authentication'] =
'<h1 class="page-title">User Authentication with Flask-Login</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Flask</span><span class="badge">Lesson 9</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Flask-Login handles user sessions (logging in, logging out, and remembering users) in your Flask application. It works in tandem with Werkzeug password hashing utilities.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Authentication Integration</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; auth.py</span></div>\n' +
'    <pre><code>from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required\nfrom werkzeug.security import generate_password_hash, check_password_hash\n\nlogin_manager = LoginManager()\n\nclass User(UserMixin, db.Model):\n    id = db.Column(db.Integer, primary_key=True)\n    username = db.Column(db.String(80), unique=True)\n    password_hash = db.Column(db.String(128))\n\n    def set_password(self, password):\n        self.password_hash = generate_password_hash(password)\n\n    def check_password(self, password):\n        return check_password_hash(self.password_hash, password)\n\n@login_manager.user_loader\ndef load_user(user_id):\n    return User.query.get(int(user_id))</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create a protected route <code>/admin-only</code> that validates that the authenticated user&#39;s username is "admin" before granting access, otherwise returning a 403 Forbidden page.</div>\n' +
'</div>\n';

L['blueprints'] =
'<h1 class="page-title">Structuring Large Apps with Blueprints</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Flask</span><span class="badge">Lesson 10</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Blueprints allow you to organize your web application into modules. This helps in scaling applications, organizing code layers, and separating domain concerns.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Creating &amp; Registering Blueprints</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; blog/routes.py</span></div>\n' +
'    <pre><code>from flask import Blueprint, render_template\n\nblog_bp = Blueprint("blog", __name__, template_folder="templates")\n\n@blog_bp.route("/")\ndef index():\n    return render_template("blog/index.html")</code></pre>\n' +
'  </div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; main_app.py</span></div>\n' +
'    <pre><code>from flask import Flask\nfrom blog.routes import blog_bp\n\napp = Flask(__name__)\n# Registering Blueprint with URL prefix\napp.register_blueprint(blog_bp, url_prefix="/blog")</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create an <code>api_bp</code> blueprint structure for user-endpoints, configuring routing prefixes mapping to <code>/api/v1/users/</code> cleanly.</div>\n' +
'</div>\n';

L['rest-apis'] =
'<h1 class="page-title">Building REST APIs with Flask-RESTful</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Flask</span><span class="badge">Lesson 11</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>While Flask can return JSON naturally, extensions like Flask-RESTful provide cleaner routing mechanisms and resource class structures for API design.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Class-Based Resource Mapping</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; rest_api.py</span></div>\n' +
'    <pre><code>from flask import Flask\nfrom flask_restful import Resource, Api\n\napp = Flask(__name__)\napi = Api(app)\n\nclass UserResource(Resource):\n    def get(self, user_id):\n        return {"id": user_id, "username": "balaji"}\n\n    def put(self, user_id):\n        return {"updated": True}\n\napi.add_resource(UserResource, "/users/&lt;int:user_id&gt;")</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Extend the resource setup adding a <code>PostListResource</code> that supports both GET (retrieving all posts) and POST (creating a new post) actions using validation arguments.</div>\n' +
'</div>\n';

L['forms-validation'] =
'<h1 class="page-title">Forms &amp; Validation with Flask-WTF</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Flask</span><span class="badge">Lesson 12</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Flask-WTF integrates Flask with WTForms, providing secure form rendering, validation logic, and built-in CSRF protection mechanisms.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Secure WTForms Class</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; forms.py</span></div>\n' +
'    <pre><code>from flask_wtf import FlaskForm\nfrom wtforms import StringField, PasswordField, SubmitField\nfrom wtforms.validators import DataRequired, Email, Length\n\nclass RegistrationForm(FlaskForm):\n    username = StringField("Username", validators=[DataRequired(), Length(min=4, max=25)])\n    email = StringField("Email", validators=[DataRequired(), Email()])\n    password = PasswordField("Password", validators=[DataRequired(), Length(min=8)])\n    submit = SubmitField("Register")</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a template showing registration fields. Ensure the template renders error messages dynamically next to input fields when form validation fails.</div>\n' +
'</div>\n';

L['error-handling-logging'] =
'<h1 class="page-title">Error Handlers &amp; Application Logging</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Flask</span><span class="badge">Lesson 13</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Flask lets you register custom error handlers mapping to specific HTTP status codes or custom Python exceptions, while logging handles persistent audit logs.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Registering Error Handlers</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; errors.py</span></div>\n' +
'    <pre><code>from flask import render_template, jsonify\n\n@app.errorhandler(404)\ndef page_not_found(error):\n    # Return HTML template or JSON depending on request content-type\n    return render_template("404.html"), 404\n\n@app.errorhandler(Exception)\ndef handle_unexpected_error(error):\n    app.logger.error(f"Server Error: {error}")\n    return jsonify({"error": "Internal Server Error"}), 500</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Configure Python logging to store application info and warning messages inside a persistent log file named <code>app.log</code> on local workspaces.</div>\n' +
'</div>\n';

L['testing'] =
'<h1 class="page-title">Unit Testing with Pytest &amp; Flask Client</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Flask</span><span class="badge">Lesson 14</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Flask exposes an execution test client allowing unit tests to dispatch simulated web requests without needing a running server process.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Writing Pytest Fixtures</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; test_app.py</span></div>\n' +
'    <pre><code>import pytest\nfrom app import app as flask_app\n\n@pytest.fixture\ndef client():\n    with flask_app.test_client() as test_client:\n        yield test_client\n\ndef test_home_page(client):\n    response = client.get("/")\n    assert response.status_code == 200\n    assert b"Hello, World!" in response.data</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Add a test validation step confirming a JSON post action endpoint processes data records correctly and returns a 201 Created code.</div>\n' +
'</div>\n';

L['production-deployment'] =
'<h1 class="page-title">Production Servers (Gunicorn &amp; Nginx)</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Flask</span><span class="badge">Lesson 15</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Flask&#39;s built-in development server is not suited for production. You must configure WSGI application gateway servers like Gunicorn or uWSGI to coordinate requests.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Production Stack Configuration</div>\n' +
'  <p>The standard industry pipeline forces Nginx to capture internet requests, forwarding connections down to local Gunicorn processes executing Flask script files:</p>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Running Gunicorn</span></div>\n' +
'    <pre><code># Install Gunicorn server\npip install gunicorn\n\n# Run Gunicorn binding the app entry point\ngunicorn -w 4 -b 127.0.0.1:8000 app:app</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a custom <code>Dockerfile</code> that configures a production Python workspace, installs dependencies, and runs Gunicorn to launch your Flask application securely.</div>\n' +
'</div>\n';

// ─── GENERATE FILES ──────────────────────────────────────────────────────────
console.log('Starting Flask lesson generation...');

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
'<h1 class="page-title">Flask Tutorial &#8212; Complete Guide</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Flask</span><span class="badge">&#128994; Beginner to Advanced</span><span class="badge">&#128197; July 2026</span></div>\n' +
'<div class="intro-box"><p>Flask is a lightweight Python web framework perfect for creating fast REST APIs, rapid prototypes, and robust web applications. This 15-lesson bootcamp takes you from initial setups, route configurations, database modeling, validation systems, and final server deployments.</p></div>\n' +
'<div class="section">\n  <div class="section-title"><span class="num">&#9658;</span> Course Curriculum</div>\n' +
'  <table class="tbl" style="margin-top:15px;">\n    <tr><th>Lesson</th><th>Topic</th></tr>\n' +
lessons.map(l => '    <tr><td><strong>Lesson ' + l.num + '</strong></td><td><a href="/' + l.filename + '"><strong>' + l.title + '</strong></a></td></tr>').join('\n') +
'\n  </table>\n</div>\n';

const indexHtml = wrapPage('home',
  'Flask Tutorial — Complete Beginner to Advanced Guide',
  indexContent, null, null, lessons[0].filename, lessons[0].title);

fs.writeFileSync(path.join(publicDir, 'blog-flask.html'), indexHtml, 'utf8');
console.log('Generated: blog-flask.html');
console.log('Done! All 15 Flask lessons generated successfully.');
