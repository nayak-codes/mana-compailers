const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const blogDir = path.join(publicDir, 'blog-django');
if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

const lessons = [
  { slug: 'intro',                 num: 1,  title: 'Introduction to Django',                    filename: 'blog-django/intro.html' },
  { slug: 'project-structure',     num: 2,  title: 'Project vs App Structure',                  filename: 'blog-django/project-structure.html' },
  { slug: 'views-routing',         num: 3,  title: 'URL Routing & View Functions',              filename: 'blog-django/views-routing.html' },
  { slug: 'templates',             num: 4,  title: 'Django Template Language (DTL)',            filename: 'blog-django/templates.html' },
  { slug: 'models-migrations',     num: 5,  title: 'Models, Fields & Migrations',               filename: 'blog-django/models-migrations.html' },
  { slug: 'orm-queries',           num: 6,  title: 'Django ORM & Database Queries',             filename: 'blog-django/orm-queries.html' },
  { slug: 'admin-panel',           num: 7,  title: 'Customizing the Django Admin',              filename: 'blog-django/admin-panel.html' },
  { slug: 'forms',                 num: 8,  title: 'Working with Forms & ModelForms',           filename: 'blog-django/forms.html' },
  { slug: 'authentication',        num: 9,  title: 'Built-in Authentication & User Customization', filename: 'blog-django/authentication.html' },
  { slug: 'class-based-views',     num: 10, title: 'Class-Based Views (CBV) & Generic Views',   filename: 'blog-django/class-based-views.html' },
  { slug: 'rest-framework',        num: 11, title: 'Django REST Framework (DRF) Basics',        filename: 'blog-django/rest-framework.html' },
  { slug: 'drf-auth-permissions',  num: 12, title: 'DRF Authentication & Permissions',          filename: 'blog-django/drf-auth-permissions.html' },
  { slug: 'testing',               num: 13, title: 'Testing Django Apps & APIs',                filename: 'blog-django/testing.html' },
  { slug: 'celery-async',          num: 14, title: 'Background Tasks with Celery & Redis',      filename: 'blog-django/celery-async.html' },
  { slug: 'security-deployment',   num: 15, title: 'Security Best Practices & Deployment',      filename: 'blog-django/security-deployment.html' }
];

function getSidebar(activeSlug) {
  let h = '\n    <div class="sidebar-heading">Django Tutorial</div>\n';
  h += '    <a href="/blog-django.html"' + (activeSlug === 'home' ? ' class="active"' : '') + '>Django HOME</a>\n';
  lessons.forEach(l => {
    h += '    <a href="/' + l.filename + '"' + (activeSlug === l.slug ? ' class="active"' : '') + '>' + l.num + '. ' + l.title + '</a>\n';
  });
  h += '\n    <div class="sidebar-heading">Related Topics</div>\n';
  h += '    <a href="/blog-python.html">Python</a>\n';
  h += '    <a href="/blog-flask.html">Flask</a>\n';
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
    nav += '      <a href="/blog-django.html" class="nav-btn"><span class="label">&#8592; Django Overview</span><span class="title">Course Index</span></a>\n';
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
'  <a href="/blog-django.html" class="active">Django</a>\n' +
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

  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n' +
'  <meta charset="UTF-8" />\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
'  <title>' + title + ' | Our Compiler</title>\n' +
'  <meta name="description" content="Learn Django — ' + title + ' with clear Python examples, code challenges, and step-by-step setup guides." />\n' +
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
'<body class="lang-django">\n' +
'<nav class="topnav">\n' +
'  <a href="/" class="brand">&#128187; Our Compiler</a>\n' +
topnav +
'</nav>\n' +
'<div class="layout">\n' +
'  <aside class="sidebar">' + getSidebar(slug) + '  </aside>\n' +
'  <main class="content">\n' +
'    <div class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/blog.html">Tutorials</a><span>&#8250;</span><a href="/blog-django.html">Django</a><span>&#8250;</span><span>Lesson ' + num + '</span></div>\n' +
'    ' + body + '\n' +
'    ' + nav + '\n' +
'  </main>\n</div>\n</body>\n</html>';
}

// ─── LESSON CONTENTS ─────────────────────────────────────────────────────────
const L = {};

L['intro'] =
'<h1 class="page-title">Introduction to Django</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Django</span><span class="badge">Lesson 1</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p><strong>Django</strong> is a high-level Python web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of web development, so you can focus on writing your app without needing to reinvent the wheel.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Core Philosophy &amp; Features</div>\n' +
'  <ul>\n' +
'    <li><strong>Ridiculously Fast</strong>: Designed to help developers take applications from concept to completion as quickly as possible.</li>\n' +
'    <li><strong>Reassuringly Secure</strong>: Helps developers avoid common security mistakes like SQL injection, cross-site scripting (XSS), and CSRF.</li>\n' +
'    <li><strong>Exceedingly Scalable</strong>: Capable of handling high traffic volumes (used by Instagram, Pinterest, and Disqus).</li>\n' +
'    <li><strong>Batteries Included</strong>: Ships with an ORM, authentication panel, admin site, form validation, and sitemap handlers out of the box.</li>\n' +
'  </ul>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> MTV Architecture</div>\n' +
'  <p>Django follows the <strong>Model-Template-View (MTV)</strong> architectural pattern, which is a variation of the MVC design pattern:</p>\n' +
'  <ul>\n' +
'    <li><strong>Model</strong>: Defines the data structure and maps directly to database tables.</li>\n' +
'    <li><strong>Template</strong>: The presentation layer (HTML rendering logic).</li>\n' +
'    <li><strong>View</strong>: The business logic handler that receives requests, queries models, and renders templates.</li>\n' +
'  </ul>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Quick Contrast: Django vs Flask</div>\n' +
'  <table class="tbl">\n' +
'    <tr><th>Feature</th><th>Django</th><th>Flask</th></tr>\n' +
'    <tr><td>Style</td><td>Batteries-included, opinionated framework</td><td>Micro-framework, customizable &amp; lightweight</td></tr>\n' +
'    <tr><td>Admin Panel</td><td>Built-in automatically</td><td>Requires extension or manual build</td></tr>\n' +
'    <tr><td>ORM</td><td>Built-in Django ORM</td><td>Requires SQLAlchemy or other library</td></tr>\n' +
'    <tr><td>Project Layout</td><td>Strict, organized sub-apps</td><td>Flexible single-file layout possible</td></tr>\n' +
'  </table>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">4</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a simple description summarizing why Django&#39;s "batteries-included" approach is highly beneficial for rapidly prototyping an e-commerce platform.</div>\n' +
'</div>\n';

L['project-structure'] =
'<h1 class="page-title">Project vs App Structure</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Django</span><span class="badge">Lesson 2</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>In Django, a **Project** represents the entire web application and its configuration. An **App** is a self-contained module that does one specific job (e.g., a blog app, comments app, or checkout app). A project can contain multiple apps.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> File Layout and Structure</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Standard Project Layout</span></div>\n' +
'    <pre><code>myproject/                     # Project Root\n  manage.py                    # Command-line utility\n  myproject/                   # Configuration Directory\n    __init__.py\n    settings.py                # Main project settings\n    urls.py                    # Root URL routing\n    wsgi.py &amp; asgi.py          # Deployment entry points\n  blog/                        # A Django App\n    migrations/                # DB history files\n    __init__.py\n    admin.py                   # Register models here\n    apps.py                    # App configuration\n    models.py                  # Database schemas\n    tests.py                   # App-specific tests\n    views.py                   # View handlers\n    urls.py                    # App-specific routing</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Basic Management Commands</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Terminal Commands</span></div>\n' +
'    <pre><code># Create a new project\ndjango-admin startproject myproject\n\n# Create a new app inside the project\npython manage.py startapp blog\n\n# Run the local development server\npython manage.py runserver\n\n# Apply migrations\npython manage.py migrate</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Set up a new virtual environment, install Django, run <code>startproject config .</code>, create a new app named <code>accounts</code>, and register it inside the <code>INSTALLED_APPS</code> array in <code>settings.py</code>.</div>\n' +
'</div>\n';

L['views-routing'] =
'<h1 class="page-title">URL Routing &amp; View Functions</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Django</span><span class="badge">Lesson 3</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>Views are Python functions or classes that receive a web request and return a web response. URL Routing maps incoming URLs to specific views based on path matching.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Basic View Functions</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; views.py</span></div>\n' +
'    <pre><code>from django.http import HttpResponse, JsonResponse\n\ndef home_view(request):\n    return HttpResponse("&lt;h1&gt;Welcome to Django!&lt;/h1&gt;")\n\ndef api_status(request):\n    return JsonResponse({"status": "running", "version": "5.0"})</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> URL Configuration</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; urls.py</span></div>\n' +
'    <pre><code>from django.urls import path\nfrom . import views\n\nurlpatterns = [\n    path("", views.home_view, name="home"),\n    path("status/", views.api_status, name="status"),\n    # Path parameters / dynamic URLs\n    path("posts/&lt;int:post_id&gt;/", views.post_detail, name="post-detail"),\n    path("category/&lt;str:slug&gt;/", views.category_list, name="category"),\n]</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a view function <code>user_profile(request, username)</code> that returns a JSON response containing the username passed through the path. Configure its route in <code>urls.py</code> mapping to <code>/user/&lt;str:username&gt;/</code>.</div>\n' +
'</div>\n';

L['templates'] =
'<h1 class="page-title">Django Template Language (DTL)</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Django</span><span class="badge">Lesson 4</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>Django Template Language (DTL) enables you to dynamically generate HTML. DTL separation of concerns ensures that code files handle logic, while templates format display strings.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Base Template inheritance</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">HTML &#8212; templates/base.html</span></div>\n' +
'    <pre><code>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n    &lt;title&gt;{% block title %}My Site{% endblock %}&lt;/title&gt;\n&lt;/head&gt;\n&lt;body&gt;\n    &lt;header&gt;\n        &lt;nav&gt;&lt;a href="/"&gt;Home&lt;/a&gt;&lt;/nav&gt;\n    &lt;/header&gt;\n    &lt;main&gt;\n        {% block content %}{% endblock %}\n    &lt;/main&gt;\n&lt;/body&gt;\n&lt;/html&gt;</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Child Template &amp; Loops</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">HTML &#8212; templates/posts.html</span></div>\n' +
'    <pre><code>{% extends "base.html" %}\n\n{% block title %}All Blog Posts{% endblock %}\n\n{% block content %}\n&lt;h1&gt;Latest Posts&lt;/h1&gt;\n&lt;ul&gt;\n    {% for post in posts %}\n        &lt;li&gt;\n            &lt;a href="{% url &#39;post-detail&#39; post.id %}"&gt;{{ post.title }}&lt;/a&gt;\n            - Written by: {{ post.author|default:"Anonymous" }}\n        &lt;/li&gt;\n    {% empty %}\n        &lt;li&gt;No posts found.&lt;/li&gt;\n    {% endfor %}\n&lt;/ul&gt;\n{% endblock %}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a view that passes a list of active products to a template. In the template, use a loop to display the product name and price, and conditional tags (<code>if</code>) to highlight products priced over $100.</div>\n' +
'</div>\n';

L['models-migrations'] =
'<h1 class="page-title">Models, Fields &amp; Migrations</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Django</span><span class="badge">Lesson 5</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>Models are Python classes that describe the tables and database fields of your application. Migrations are Django&#39;s way of propagating changes you make to your models into your database schema.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Defining a Model</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; models.py</span></div>\n' +
'    <pre><code>from django.db import models\nfrom django.contrib.auth.models import User\n\nclass Category(models.Model):\n    name = models.CharField(max_length=100)\n    slug = models.SlugField(unique=True)\n\n    def __str__(self):\n        return self.name\n\nclass Post(models.Model):\n    title = models.CharField(max_length=200)\n    content = models.TextField()\n    created_at = models.DateTimeField(auto_now_add=True)\n    updated_at = models.DateTimeField(auto_now=True)\n    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")\n    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)\n    is_published = models.BooleanField(default=False)\n\n    def __str__(self):\n        return self.title</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Migration Lifecycle</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Terminal Commands</span></div>\n' +
'    <pre><code># Detect changes in models.py and create migration files\npython manage.py makemigrations\n\n# Inspect the raw SQL that a migration will execute\npython manage.py sqlmigrate blog 0001\n\n# Run the migrations and update database schema\npython manage.py migrate</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Add a new field named <code>views_count</code> (integer field, defaults to 0) to the <code>Post</code> model, generate the migration file, and apply it to your database.</div>\n' +
'</div>\n';

L['orm-queries'] =
'<h1 class="page-title">Django ORM &amp; Database Queries</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Django</span><span class="badge">Lesson 6</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Django features a powerful Object-Relational Mapper (ORM) that lets you interact with databases using Python objects instead of writing raw SQL queries.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Querying API Basics</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; ORM Queries</span></div>\n' +
'    <pre><code># Fetch all records\nposts = Post.objects.all()\n\n# Filter records (WHERE condition)\npublished_posts = Post.objects.filter(is_published=True)\n\n# Exact lookups and field double-underscores (__) lookup syntax\ntech_posts = Post.objects.filter(category__name__iexact="technology")\n\n# Fetch a single object\ntry:\n    post = Post.objects.get(id=42)\nexcept Post.DoesNotExist:\n    post = None\n\n# Complex AND/OR lookups using Q objects\nfrom django.db.models import Q\nquery = Post.objects.filter(Q(title__contains="python") | Q(content__contains="tutorial"))</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Optimization: select_related &amp; prefetch_related</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; Performance Queries</span></div>\n' +
'    <pre><code># select_related (SQL JOIN for ForeignKey relations)\nposts = Post.objects.select_related("author", "category").all()\n\n# prefetch_related (Separate query lookup for ManyToMany / Reverse ForeignKey relations)\ncategories = Category.objects.prefetch_related("posts").all()</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a query retrieving all published posts authored by a user named "balaji" created in the year 2026. Optimize the query using <code>select_related</code> to avoid N+1 issues.</div>\n' +
'</div>\n';

L['admin-panel'] =
'<h1 class="page-title">Customizing the Django Admin</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Django</span><span class="badge">Lesson 7</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>One of Django&#39;s most powerful features is the automatic admin interface. It reads metadata from your models to provide a ready-to-use interface for managing content.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Customizing ModelAdmin</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; admin.py</span></div>\n' +
'    <pre><code>from django.contrib import admin\nfrom .models import Post, Category\n\n@admin.register(Post)\nclass PostAdmin(admin.ModelAdmin):\n    list_display = ("title", "author", "category", "is_published", "created_at")\n    list_filter = ("is_published", "created_at", "category")\n    search_fields = ("title", "content")\n    prepopulated_fields = {"slug": ("title",)}   # Auto slug generation\n    raw_id_fields = ("author",)                  # Speed up loading for large database sets\n    date_hierarchy = "created_at"\n\nadmin.site.register(Category)</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Superuser Creation</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Terminal Command</span></div>\n' +
'    <pre><code>python manage.py createsuperuser</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Add a custom admin action to the <code>PostAdmin</code> list view that allows admins to publish selected posts simultaneously using an admin action method.</div>\n' +
'</div>\n';

L['forms'] =
'<h1 class="page-title">Working with Forms &amp; ModelForms</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Django</span><span class="badge">Lesson 8</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Django handles form rendering, validation, and serialization dynamically. You can create custom forms manually, or map forms directly to models using ModelForms.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Defining a ModelForm</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; forms.py</span></div>\n' +
'    <pre><code>from django import forms\nfrom .models import Post\n\nclass PostForm(forms.ModelForm):\n    class Meta:\n        model = Post\n        fields = ["title", "content", "category", "is_published"]\n        widgets = {\n            "title": forms.TextInput(attrs={"class": "form-control", "placeholder": "Enter title"}),\n            "content": forms.Textarea(attrs={"class": "form-control", "rows": 5}),\n        }\n\n    def clean_title(self):\n        title = self.cleaned_data.get("title")\n        if "spam" in title.lower():\n            raise forms.ValidationError("Spam titles are not allowed.")\n        return title</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Handling Forms in Views</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; views.py</span></div>\n' +
'    <pre><code>from django.shortcuts import render, redirect\nfrom .forms import PostForm\n\ndef create_post(request):\n    if request.method == "POST":\n        form = PostForm(request.POST)\n        if form.is_valid():\n            post = form.save(commit=False)\n            post.author = request.user\n            post.save()\n            return redirect("home")\n    else:\n        form = PostForm()\n    return render(request, "create_post.html", {"form": form})</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Design a custom form with field validation validating that the password matches a secondary password verification field. Throw a validation error if they do not match.</div>\n' +
'</div>\n';

L['authentication'] =
'<h1 class="page-title">Built-in Authentication &amp; User Customization</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Django</span><span class="badge">Lesson 9</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Django ships with a complete user authentication system. Extending it with a custom User model is recommended for all production projects.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Custom User Model Setup</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; models.py</span></div>\n' +
'    <pre><code>from django.contrib.auth.models import AbstractUser\nfrom django.db import models\n\nclass CustomUser(AbstractUser):\n    bio = models.TextField(max_length=500, blank=True)\n    birth_date = models.DateField(null=True, blank=True)\n    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)\n\n# Configure this in settings.py:\n# AUTH_USER_MODEL = "users.CustomUser"</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Auth Views &amp; Decorators</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; views.py</span></div>\n' +
'    <pre><code>from django.contrib.auth.decorators import login_required\nfrom django.shortcuts import render\n\n@login_required(login_url="login")\ndef dashboard_view(request):\n    return render(request, "dashboard.html", {"user": request.user})</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a custom middleware that redirects users who have not verified their email addresses to a specific registration page.</div>\n' +
'</div>\n';

L['class-based-views'] =
'<h1 class="page-title">Class-Based Views (CBV) &amp; Generic Views</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Django</span><span class="badge">Lesson 10</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Class-Based Views (CBVs) provide an alternative way to implement views as Python objects instead of functions, promoting reusability and organization using inheritance.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Generic Views Examples</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; views.py</span></div>\n' +
'    <pre><code>from django.views.generic import ListView, DetailView, CreateView\nfrom django.urls import reverse_lazy\nfrom .models import Post\n\nclass PostListView(ListView):\n    model = Post\n    template_name = "posts/list.html"\n    context_object_name = "posts"\n    paginate_by = 10\n\n    def get_queryset(self):\n        return Post.objects.filter(is_published=True).order_by("-created_at")\n\nclass PostCreateView(CreateView):\n    model = Post\n    fields = ["title", "content", "category"]\n    success_url = reverse_lazy("post-list")\n\n    def form_valid(self, form):\n        form.instance.author = self.request.user\n        return super().form_valid(form)</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Rewrite your basic <code>UpdateView</code> to edit dynamic posts, ensuring that users can only update posts which they authored.</div>\n' +
'</div>\n';

L['rest-framework'] =
'<h1 class="page-title">Django REST Framework (DRF) Basics</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Django</span><span class="badge">Lesson 11</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Django REST Framework (DRF) is a powerful, flexible toolkit for building web APIs on top of Django projects.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Serializers, ViewSets, and Routers</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; api.py</span></div>\n' +
'    <pre><code>from rest_framework import serializers, viewsets, routers\nfrom .models import Post\n\n# 1. Serializer\nclass PostSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Post\n        fields = ["id", "title", "content", "created_at", "author"]\n\n# 2. ViewSet\nclass PostViewSet(viewsets.ModelViewSet):\n    queryset = Post.objects.all()\n    serializer_class = PostSerializer\n\n# 3. Router configuration (urls.py)\nrouter = routers.DefaultRouter()\nrouter.register(r"posts", PostViewSet)\n\n# urlpatterns += router.urls</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create a <code>CategorySerializer</code> and a corresponding <code>CategoryViewSet</code> routing to <code>/api/categories/</code> endpoints displaying listing counts.</div>\n' +
'</div>\n';

L['drf-auth-permissions'] =
'<h1 class="page-title">DRF Authentication &amp; Permissions</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Django</span><span class="badge">Lesson 12</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>DRF provides pluggable authentication schemes (Token, Session, JWT) and granular permissions checking access rules for API endpoints.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Implementing Permissions</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; permissions.py</span></div>\n' +
'    <pre><code>from rest_framework import permissions\n\nclass IsAuthorOrReadOnly(permissions.BasePermission):\n    def has_object_permission(self, request, view, obj):\n        # Read permissions are allowed to any request\n        if request.method in permissions.SAFE_METHODS:\n            return True\n        # Write permissions are only allowed to the author of the post\n        return obj.author == request.user\n\n# Apply inside ViewSet\n# permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Integrate JWT Auth using the <code>djangorestframework-simplejwt</code> package, adding routes for obtaining and refreshing tokens.</div>\n' +
'</div>\n';

L['testing'] =
'<h1 class="page-title">Testing Django Apps &amp; APIs</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Django</span><span class="badge">Lesson 13</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Testing ensures software quality and prevents code regressions. Django provides a custom unit testing framework extending Python&#39;s built-in unit tests.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Writing Tests</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; tests.py</span></div>\n' +
'    <pre><code>from django.test import TestCase\nfrom django.contrib.auth import get_user_model\nfrom .models import Post\n\nclass PostModelTest(TestCase):\n    def setUp(self):\n        User = get_user_model()\n        self.user = User.objects.create_user(username="testuser", password="password")\n        self.post = Post.objects.create(title="Test Post", content="Post content", author=self.user)\n\n    def test_post_creation(self):\n        self.assertEqual(self.post.title, "Test Post")\n        self.assertEqual(str(self.post), "Test Post")</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a view validation test mapping endpoints to confirm unauthenticated clients receive 403 Forbidden errors when calling write actions.</div>\n' +
'</div>\n';

L['celery-async'] =
'<h1 class="page-title">Background Tasks with Celery &amp; Redis</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Django</span><span class="badge">Lesson 14</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Celery enables you to delegate slow execution tasks (sending emails, image processing, or data imports) to background worker queues, keeping the main request-response cycle fast.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Creating Celery Tasks</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; tasks.py</span></div>\n' +
'    <pre><code>from celery import shared_task\nfrom django.core.mail import send_mail\n\n@shared_task\ndef send_welcome_email(email):\n    send_mail(\n        "Welcome",\n        "Thank you for registering!",\n        "noreply@example.com",\n        [email],\n        fail_silently=False,\n    )</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Configure Celery Beat to execute a recurring database cleaning script executing every midnight cleanly.</div>\n' +
'</div>\n';

L['security-deployment'] =
'<h1 class="page-title">Security Best Practices &amp; Deployment</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Django</span><span class="badge">Lesson 15</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Deploying production-ready applications requires managing configurations, environment variables, SSL redirection, and serving files securely.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Deployment Settings Checklist</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Python &#8212; settings.py</span></div>\n' +
'    <pre><code># Disable debug mode in production\nDEBUG = False\n\n# Configure trusted host routes\nALLOWED_HOSTS = ["mysite.com"]\n\n# Force SSL connections\nSECURE_SSL_REDIRECT = True\nSESSION_COOKIE_SECURE = True\nCSRF_COOKIE_SECURE = True</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Configure <code>WhiteNoise</code> in your Django middleware stack to serve static files securely directly through Django application servers.</div>\n' +
'</div>\n';

// ─── GENERATE FILES ──────────────────────────────────────────────────────────
console.log('Starting Django lesson generation...');

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
'<h1 class="page-title">Django Tutorial &#8212; Complete Guide</h1>\n' +
'<div class="page-meta"><span class="badge">&#128013; Django</span><span class="badge">&#128994; Beginner to Advanced</span><span class="badge">&#128197; July 2026</span></div>\n' +
'<div class="intro-box"><p>Django is the industry standard Python framework for building full-stack web applications and robust REST APIs. This 15-lesson bootcamp takes you from initial configuration to model designs, ORM query tuning, background queues, security, and cloud deployment.</p></div>\n' +
'<div class="section">\n  <div class="section-title"><span class="num">&#9658;</span> Course Curriculum</div>\n' +
'  <table class="tbl" style="margin-top:15px;">\n    <tr><th>Lesson</th><th>Topic</th></tr>\n' +
lessons.map(l => '    <tr><td><strong>Lesson ' + l.num + '</strong></td><td><a href="/' + l.filename + '"><strong>' + l.title + '</strong></a></td></tr>').join('\n') +
'\n  </table>\n</div>\n';

const indexHtml = wrapPage('home',
  'Django Tutorial — Complete Beginner to Advanced Guide',
  indexContent, null, null, lessons[0].filename, lessons[0].title);

fs.writeFileSync(path.join(publicDir, 'blog-django.html'), indexHtml, 'utf8');
console.log('Generated: blog-django.html');
console.log('Done! All 15 Django lessons generated successfully.');
