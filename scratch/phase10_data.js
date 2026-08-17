// Phase 10: Web Development Data (Flask & Django with Deep Conceptual Foundations & 6 Capstone Projects)
module.exports = [
  // =========================================================================
  // CHAPTER 48: FLASK FUNDAMENTALS & ROUTING
  // =========================================================================
  {
    num: 48,
    phaseId: 'phase10',
    phaseTitle: 'Phase 10: Web Development',
    slug: '48-python-flask-fundamentals-and-routing',
    title: 'Flask Fundamentals & Routing',
    badge: '48. Flask Basics & Routing',
    subtopics: 'Microframeworks vs Full-Stack · Flask(__name__) · WSGI Request Lifecycle · Dynamic Routing (<int:id>) · HTTP Methods · Request Parsing (args vs form)',
    desc: 'Master microframework web development with Flask: understanding the WSGI web protocol, the Flask application instance, dynamic URL converters (<int:id>, <string:slug>), handling GET/POST request bodies, query parameters, and building clean RESTful route handlers.',
    sections: [
      {
        title: '1. What is Flask? Microframeworks vs Full-Stack Frameworks',
        body: `<p>When building web backends in Python, frameworks fall into two main architectural philosophies:</p>
        
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>Feature</th><th>Microframework (Flask / FastAPI)</th><th>Full-Stack (Django)</th></tr>
          <tr><td><strong>Philosophy</strong></td><td><strong>Minimalist & Unopinionated:</strong> Provides only routing and template rendering; you choose your own ORM, auth, and database.</td><td><strong>"Batteries-Included":</strong> Bundles built-in ORM, admin panel, auth system, migrations, and forms out of the box.</td></tr>
          <tr><td><strong>Learning Curve</strong></td><td>Gentle; start with a single 5-line Python file.</td><td>Steeper; requires understanding project/app structure and configuration settings.</td></tr>
          <tr><td><strong>Best Used For</strong></td><td>Microservices, lightweight REST APIs, single-page web apps, prototyping.</td><td>Large enterprise web portals, SaaS platforms, content management systems (CMS).</td></tr>
        </table>

        <h4 style="color:#10b981; margin:16px 0 8px;">The WSGI (Web Server Gateway Interface) Lifecycle:</h4>
        <p><strong>WSGI (PEP 3333)</strong> is the standard specification that allows Python web applications to communicate with production web servers (like Nginx, Apache, or Gunicorn).</p>

        <div class="diagram-box">┌────────────────────────────────────────────────────────────────────────┐
│                        THE FLASK WSGI REQUEST CYCLE                    │
├────────────────────────────────────────────────────────────────────────┤
│  Client Browser ───(HTTP GET /products/42)───> Web Server (Nginx)      │
│                                                       │                │
│                                                (WSGI Protocol)         │
│                                                       ▼                │
│  Flask Application Instance (app = Flask(__name__))                    │
│  ├── 1. URL Routing Table Match -> @app.route('/products/<int:id>')    │
│  ├── 2. Creates Request Context (request.args, request.headers)        │
│  ├── 3. Executes View Function -> get_product(42)                      │
│  └── 4. Returns WSGI Response -> HTTP 200 OK + JSON / HTML            │
└────────────────────────────────────────────────────────────────────────┘</div>`,
        code: `# Minimal Single-File Flask Web Server Application:
from flask import Flask, jsonify, request

# 1. Instantiate the WSGI Application:
# __name__ informs Flask where to locate templates and static files:
app = Flask(__name__)

# 2. Define the Root Endpoint Route:
@app.route("/", methods=["GET"])
def home():
    """Returns a welcome message."""
    return "<h1>🚀 Welcome to Our Compiler Flask Web Server!</h1><p>Status: Healthy & Online.</p>"

# 3. Dynamic URL Route with Integer Type Converter (<int:user_id>):
@app.route("/users/<int:user_id>", methods=["GET"])
def get_user_by_id(user_id):
    """Dynamic route matching /users/1, /users/42, etc."""
    return jsonify({
        "user_id": user_id,
        "name": f"Developer #{user_id}",
        "status": "Active",
        "query_params_received": dict(request.args)
    })

# 4. Entry point check:
if __name__ == "__main__":
    # debug=True auto-reloads server when Python files are modified:
    print("⚡ Starting local Flask development server on http://127.0.0.1:5000")
    # app.run(debug=True, port=5000)`,
        codeTitle: 'Example 1: Minimal Flask Web Server with Dynamic Routing',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Step-by-Step Code Walkthrough:</strong>
          <ol style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>app = Flask(__name__)</code>: Creates the central WSGI application object.</li>
            <li><code>@app.route(...)</code>: Decorator registering the URL path pattern and allowed HTTP methods in Flask's internal URL routing table.</li>
            <li><code>&lt;int:user_id&gt;</code>: Built-in URL converter that rejects non-integer strings (e.g. <code>/users/abc</code> returns 404 automatically) and casts the value to a Python <code>int</code> before passing it as a function argument.</li>
            <li><code>jsonify(...)</code>: Converts Python dictionaries into JSON responses with the appropriate <code>Content-Type: application/json</code> HTTP header.</li>
          </ol>
        </div>`
      },
      {
        title: '2. Request Data Extraction: Query Strings (request.args) vs Form/JSON Payloads',
        body: `<p>In Flask, incoming client data is accessed through the global <strong><code>request</code> context proxy</strong>:</p>
        <ul>
          <li><strong><code>request.args</code> (Query Parameters):</strong> Immutable multidict containing parameters from the URL query string (e.g. <code>/search?q=python&page=2</code> -> <code>request.args.get('q')</code>).</li>
          <li><strong><code>request.form</code> (Form POST Data):</strong> Contains key-value pairs submitted by HTML <code>&lt;form method="POST"&gt;</code> elements.</li>
          <li><strong><code>request.json</code> (REST JSON Payload):</strong> Contains deserialized JSON dictionaries submitted in POST/PUT API calls.</li>
          <li><strong><code>request.headers</code>:</strong> Dictionary containing client HTTP headers (like <code>User-Agent</code> or <code>Authorization</code>).</li>
        </ul>`,
        code: `from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample in-memory catalog:
PRODUCTS_DB = [
    {"id": 1, "name": "Mechanical Keyboard", "price": 2499.00},
    {"id": 2, "name": "Wireless Mouse", "price": 799.00},
    {"id": 3, "name": "USB-C Hub", "price": 1299.00}
]

@app.route("/api/products", methods=["GET", "POST"])
def handle_products():
    if request.method == "GET":
        # Extract optional max_price query filter: /api/products?max_price=1500
        max_price = request.args.get("max_price", type=float)
        if max_price is not None:
            filtered = [p for p in PRODUCTS_DB if p["price"] <= max_price]
            return jsonify(filtered)
        return jsonify(PRODUCTS_DB)

    elif request.method == "POST":
        # Extract JSON payload from incoming POST request body:
        payload = request.get_json()
        if not payload or "name" not in payload or "price" not in payload:
            return jsonify({"error": "Missing required fields: 'name' and 'price'"}), 400

        new_item = {
            "id": len(PRODUCTS_DB) + 1,
            "name": payload["name"],
            "price": float(payload["price"])
        }
        PRODUCTS_DB.append(new_item)
        return jsonify({"message": "Product created successfully", "product": new_item}), 201`,
        codeTitle: 'Example 2: Handling Query Filters (GET) and JSON Payloads (POST)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Safe Parameter Extraction:</strong>
          <p style="margin-top:6px;">Always use <code>request.args.get('param', default_val, type=int)</code> instead of direct dictionary indexing <code>request.args['param']</code>. The <code>.get()</code> method avoids <code>KeyError</code> crashes if the user omits the query parameter.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Running app.run(debug=True) in Production',
      text: 'Enabling debug=True starts Werkzeug\'s interactive in-browser debugger. In production, this allows anyone who triggers an error to execute arbitrary Python commands directly on your server terminal! Always disable debug mode and use a production WSGI server like Gunicorn in production.'
    },
    tryIt: {
      desc: 'Define a Flask route /calculator/<operation> that accepts num1 and num2 as query parameters (e.g. /calculator/add?num1=10&num2=5) and returns a JSON result.',
      code: `from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/calculator/<operation>")
def calculate(operation):
    n1 = request.args.get("num1", 0, type=float)
    n2 = request.args.get("num2", 0, type=float)

    if operation == "add": res = n1 + n2
    elif operation == "sub": res = n1 - n2
    elif operation == "mul": res = n1 * n2
    elif operation == "div": res = n1 / n2 if n2 != 0 else "Error: Div by Zero"
    else: return jsonify({"error": "Unknown operation"}), 400

    return jsonify({"operation": operation, "num1": n1, "num2": n2, "result": res})`
    },
    faqs: [
      {
        q: 'What is the difference between Flask and FastAPI?',
        a: 'Flask is a synchronous WSGI microframework primarily designed for HTML templating and REST APIs. FastAPI is a modern, asynchronous ASGI framework built on top of Pydantic and Starlette, providing automatic OpenAPI documentation and high-concurrency async performance.'
      },
      {
        q: 'What are Flask URL Converters?',
        a: 'URL converters match and cast dynamic parts of URLs: <string:name> (default string without slashes), <int:id> (positive integers), <float:price> (floating point numbers), and <path:subpath> (strings containing forward slashes).'
      },
      {
        q: 'What is the purpose of url_for() in Flask?',
        a: 'url_for(endpoint, **values) dynamically generates URLs based on view function names. If you change a route URL from "/user-login" to "/signin", url_for("login") updates all template links automatically without hardcoded URL breakage.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 49: FLASK JINJA2, FORMS & AUTHENTICATION
  // =========================================================================
  {
    num: 49,
    phaseId: 'phase10',
    phaseTitle: 'Phase 10: Web Development',
    slug: '49-python-flask-templates-forms-and-auth',
    title: 'Flask Jinja2, Forms & Auth',
    badge: '49. Flask Templates & Auth',
    subtopics: 'Jinja2 Template Engine · Template Inheritance ({% extends %}) · Static Assets · Client Sessions (session) · Password Hashing (werkzeug.security) · Custom Error Pages (404)',
    desc: 'Master server-side rendering and user authentication in Flask: the Jinja2 template engine, template inheritance with base layouts, managing user sessions with signed cryptographic cookies, hashing passwords with werkzeug.security, and handling 404/500 error pages.',
    sections: [
      {
        title: '1. Server-Side Rendering with Jinja2 & Template Inheritance',
        body: `<p>Instead of hardcoding HTML strings inside Python functions, Flask uses the <strong>Jinja2 Template Engine</strong>. HTML templates are stored in a <code>templates/</code> directory and rendered via <code>render_template('page.html', var=value)</code>.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">The 3 Core Jinja2 Delimiter Syntax Rules:</h4>
        <ul>
          <li><strong><code>{{ expression }}</code>:</strong> Prints the value of a Python variable or expression into the HTML (auto-escapes HTML tags to prevent XSS attacks).</li>
          <li><strong><code>{% statement %}</code>:</strong> Controls program logic (e.g. <code>{% if user %}</code>, <code>{% for item in items %}</code>, <code>{% extends 'base.html' %}</code>).</li>
          <li><strong><code>{# comment #}</code>:</strong> Server-side comments ignored during HTML rendering.</li>
        </ul>

        <h4 style="color:#10b981; margin:16px 0 8px;">Template Inheritance Architecture (DRY Principle):</h4>
        <p>Instead of duplicating the HTML <code>&lt;head&gt;</code>, navbar, and footer across dozens of pages, you define a single <strong><code>base.html</code></strong> layout with <code>{% block content %}{% endblock %}</code> placeholders that child templates fill in!</p>`,
        code: `<!-- 1. BASE TEMPLATE: templates/base.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{% block title %}My Flask Portal{% endblock %}</title>
  <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
</head>
<body>
  <nav class="navbar">
    <a href="{{ url_for('home') }}">🏠 Home</a>
    <a href="{{ url_for('dashboard') }}">📊 Dashboard</a>
  </nav>

  <main class="container">
    {% block content %}
    <!-- Child page HTML injected here -->
    {% endblock %}
  </main>
</body>
</html>

<!-- 2. CHILD TEMPLATE: templates/dashboard.html -->
{% extends "base.html" %}

{% block title %}User Dashboard{% endblock %}

{% block content %}
  <h2>Welcome back, {{ username }}! 👋</h2>
  <h3>Your Enrolled Courses ({{ courses|length }}):</h3>
  <ul>
    {% for course in courses %}
      <li><strong>{{ course.title }}</strong> - Instructor: {{ course.instructor }}</li>
    {% else %}
      <li>No courses enrolled yet.</li>
    {% endfor %}
  </ul>
{% endblock %}`,
        codeTitle: 'Jinja2 Blueprint: Base Layout and Child Template Inheritance',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Template Filters:</strong>
          <p style="margin-top:6px;">Jinja2 includes powerful pipe filters like <code>{{ username|upper }}</code> (capitalizes string), <code>{{ courses|length }}</code> (counts items), and <code>{{ post.date|format_date }}</code>.</p>
        </div>`
      },
      {
        title: '2. User Sessions & Secure Password Hashing with werkzeug.security',
        body: `<p>HTTP is a stateless protocol. To remember that a user has successfully logged in across multiple page clicks, Flask provides the <strong><code>session</code> dictionary</strong>.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">How Flask Sessions Work:</h4>
        <p>Flask serializes the session dictionary into a <strong>Cryptographically Signed Cookie</strong> stored in the user's browser. The user can view the cookie, but cannot tamper with or modify its values without invalidating the cryptographic signature (calculated using <code>app.secret_key</code>).</p>

        <h4 style="color:#ef4444; margin:16px 0 8px;">Security Rule: NEVER Store Plaintext Passwords!</h4>
        <p>Always hash user passwords using <strong>one-way cryptographic hash functions</strong> (like PBKDF2 with SHA-256 and salted hashes) via <code>werkzeug.security</code>:</p>`,
        code: `from flask import Flask, render_template_string, request, session, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
# Cryptographic secret key used to sign session cookies:
app.secret_key = "super_secret_production_key_change_in_env"

# Simulated User Database with Hashed Passwords:
USERS_DB = {
    "balaji": generate_password_hash("SuperSecret2026!") # Stored as salted hash!
}

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        # 1. Verify user exists and check password hash:
        stored_hash = USERS_DB.get(username)
        if stored_hash and check_password_hash(stored_hash, password):
            # 2. Store user in session cookie:
            session["user"] = username
            return redirect(url_for("profile"))
        
        return "<h3>❌ Invalid Username or Password</h3><a href='/login'>Try again</a>", 401

    # Render simple login form:
    return '''
    <h2>🔐 User Login</h2>
    <form method="POST">
        <input type="text" name="username" placeholder="Username" required><br><br>
        <input type="password" name="password" placeholder="Password" required><br><br>
        <button type="submit">Sign In</button>
    </form>
    '''

@app.route("/profile")
def profile():
    # 3. Check if user session exists:
    if "user" not in session:
        return redirect(url_for("login"))
    return f"<h2>🎉 Welcome to your private profile, {session['user']}!</h2><a href='/logout'>Log Out</a>"

@app.route("/logout")
def logout():
    session.pop("user", None) # Clear session
    return redirect(url_for("login"))

# Custom 404 Error Handler:
@app.errorhandler(404)
def page_not_found(error):
    return "<h2>404 - Oops! The requested page does not exist.</h2><a href='/login'>Go Home</a>", 404`,
        codeTitle: 'Example 2: Complete User Authentication Flow with Password Hashing & Sessions',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Security Breakdown:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>generate_password_hash("pass")</code> creates a random salt and hashes it (e.g. <code>pbkdf2:sha256:600000$...</code>). Even if two users have the same password, their hashes are completely different.</li>
            <li><code>check_password_hash(hash, pass)</code> safely compares the input password against the salt in constant time to prevent timing attacks.</li>
          </ul>
        </div>`
      }
    ],
    mistake: {
      title: 'Storing Sensitive Confidential Data (like Credit Card numbers) in Flask Sessions',
      text: 'By default, Flask sessions are client-side signed cookies. While the user cannot tamper with the cookie, the payload is NOT encrypted and can be easily decoded by anyone inspecting browser cookies! Only store non-sensitive identifiers like user_id in the session.'
    },
    tryIt: {
      desc: 'Create a password validator helper that generates a hash for a new user and validates whether a submitted login password matches.',
      code: `from werkzeug.security import generate_password_hash, check_password_hash

raw_pass = "PythonRocks2026"
hashed_pass = generate_password_hash(raw_pass)

print("Generated Salted Hash:", hashed_pass)
print("Correct Password Match:  ", check_password_hash(hashed_pass, "PythonRocks2026")) # True
print("Incorrect Password Match:", check_password_hash(hashed_pass, "WrongPassword"))    # False`
    },
    faqs: [
      {
        q: 'What is CSRF (Cross-Site Request Forgery) in web forms?',
        a: 'CSRF is an exploit where a malicious website tricks a user\'s browser into performing an unauthorized action on a site where they are logged in. Prevent it using Flask-WTF CSRF tokens in all POST forms.'
      },
      {
        q: 'What is the difference between client-side sessions and server-side sessions?',
        a: 'Flask\'s default session stores signed data in browser cookies. Server-side session extensions (like Flask-Session) store session data in Redis or a database, sending only an opaque session UUID to the browser cookie.'
      },
      {
        q: 'How do custom error handlers work in Flask?',
        a: 'Decorating a function with @app.errorhandler(404) or @app.errorhandler(500) intercepts HTTP error codes across the entire application and returns a custom-styled error template.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 50: DJANGO ARCHITECTURE, MODELS & ADMIN PANEL
  // =========================================================================
  {
    num: 50,
    phaseId: 'phase10',
    phaseTitle: 'Phase 10: Web Development',
    slug: '50-python-django-architecture-models-and-admin',
    title: 'Django Architecture & ORM',
    badge: '50. Django Architecture & ORM',
    subtopics: 'The "Batteries-Included" Philosophy · Projects vs Apps · MTV (Model-Template-View) Pattern · Django ORM Models · Migrations · Auto-Generated Admin Panel',
    desc: 'Master enterprise web development with Django: understanding the MTV design pattern, project vs app modular structure, defining relational database models with Django ORM, the database migrations lifecycle (makemigrations & migrate), and the production admin dashboard.',
    sections: [
      {
        title: '1. Django\'s "Batteries-Included" Philosophy & MTV Pattern',
        body: `<p><strong>Django</strong> is the world's leading high-level Python web framework, designed to help developers build secure, scalable applications in hours instead of months.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">The "Batteries-Included" Concept:</h4>
        <p>Unlike Flask where you must manually choose and configure dozens of third-party libraries for databases, authentication, admin interfaces, and migrations, <strong>Django bundles all of them into the core framework</strong> with unified, battle-tested security standards.</p>

        <h4 style="color:#10b981; margin:16px 0 8px;">The MTV (Model-Template-View) Architecture:</h4>
        <p>While traditional frameworks refer to <em>MVC (Model-View-Controller)</em>, Django uses the <strong>MTV</strong> terminology:</p>
        <ul>
          <li><strong>Model (M):</strong> The data layer (Python classes defining database tables and business logic via Django ORM).</li>
          <li><strong>Template (T):</strong> The presentation layer (HTML files rendered with the Django Template Language / DTL).</li>
          <li><strong>View (V):</strong> The controller/logic layer (Python functions or classes that process requests, query Models, and return Templates or JSON).</li>
        </ul>

        <div class="diagram-box">┌────────────────────────────────────────────────────────────────────────┐
│                   THE DJANGO MTV (MODEL-TEMPLATE-VIEW) FLOW            │
├────────────────────────────────────────────────────────────────────────┤
│  Client Request ───> urls.py (URL Dispatcher matches path)             │
│                           │                                            │
│                           ▼                                            │
│                      views.py (View Logic Controller)                  │
│                     ┌─────┴──────────────────┐                         │
│                     ▼                        ▼                         │
│                 models.py               templates/                     │
│           (Queries Database ORM)   (Renders HTML Template)             │
│                     └─────┬──────────────────┘                         │
│                           ▼                                            │
│               Client Response (HTTP 200 HTML)                          │
└────────────────────────────────────────────────────────────────────────┘</div>`,
        code: `# Django Project Structure Overview (Created via django-admin startproject):
"""
my_ecommerce_project/
├── manage.py               <-- CLI utility for running server, migrations, tests
├── my_ecommerce_project/   <-- Project root configuration package
│   ├── __init__.py
│   ├── settings.py         <-- Central configuration (DB, installed apps, middleware)
│   ├── urls.py             <-- Master URL routing dispatcher
│   ├── asgi.py             <-- Asynchronous server entry point
│   └── wsgi.py             <-- WSGI production deployment entry point
└── store_app/              <-- Modular Django Application (python manage.py startapp store_app)
    ├── models.py           <-- Database ORM Models
    ├── views.py            <-- Request Handler Views
    ├── urls.py             <-- App-specific URL routes
    ├── admin.py            <-- Admin Dashboard Configuration
    └── migrations/         <-- Version-controlled DB schema migration scripts
"""
print("Django Project vs App Modular Architecture Loaded.")`,
        codeTitle: 'Architecture Blueprint: Django Project vs Modular App Directory Tree',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">💡 Project vs App Concept:</strong>
          <p style="margin-top:6px;">A <strong>Project</strong> is the entire website configuration (settings, database connection, URLs). An <strong>App</strong> is a self-contained, reusable module (e.g. <code>blog_app</code>, <code>payment_app</code>, <code>user_auth_app</code>) that can be plugged into multiple different Django projects.</p>
        </div>`
      },
      {
        title: '2. Django ORM Models, Migrations & The Built-in Admin Dashboard',
        body: `<p>In Django, you define your database schema as Python classes inheriting from <code>models.Model</code>. Django ORM handles table creation, column types, validations, and SQL generation.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">The 2-Step Migrations Lifecycle:</h4>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong><code>python manage.py makemigrations</code>:</strong> Scans your <code>models.py</code> files, detects any added/changed/deleted fields, and writes a version-controlled migration blueprint script in <code>migrations/0001_initial.py</code>.</li>
          <li><strong><code>python manage.py migrate</code>:</strong> Executes the pending migration blueprints and updates the physical SQL tables on PostgreSQL/MySQL/SQLite.</li>
        </ol>`,
        code: `# 1. Defining Models: store_app/models.py
from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=50, unique=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} (₹{self.price})"

# 2. Registering with Admin: store_app/admin.py
from django.contrib import admin

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "price", "stock", "is_active")
    list_filter = ("is_active", "category")
    search_fields = ("title", "description")
    list_editable = ("price", "stock", "is_active")`,
        codeTitle: 'Example 2: Django ORM Relational Models & Custom Admin Configuration',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Django Admin Power:</strong>
          <p style="margin-top:6px;">By writing just 8 lines in <code>admin.py</code>, Django automatically generates a complete web admin interface with search bars, filters, pagination, and bulk editing capabilities!</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Manually Editing SQL Database Tables Instead of Using Django Migrations',
      text: 'Never manually add or alter columns directly in your SQL database when using Django! Doing so causes Django\'s internal django_migrations history table to fall out of sync, causing future "makemigrations" and "migrate" commands to fail.'
    },
    tryIt: {
      desc: 'Simulate a Django ORM query: Write a Python list filter to get all active products in the "Electronics" category with price < 5000.',
      code: `products = [
    {"title": "Earphones", "cat": "Electronics", "price": 1499.0, "is_active": True},
    {"title": "Laptop", "cat": "Electronics", "price": 65000.0, "is_active": True},
    {"title": "Desk Lamp", "cat": "Furniture", "price": 899.0, "is_active": True},
    {"title": "USB Cable", "cat": "Electronics", "price": 299.0, "is_active": False}
]

# Django ORM equivalent: Product.objects.filter(is_active=True, category__name="Electronics", price__lt=5000)
matched = [p for p in products if p["is_active"] and p["cat"] == "Electronics" and p["price"] < 5000]
print("Matched Products:", matched)`
    },
    faqs: [
      {
        q: 'What does on_delete=models.CASCADE do in Django ForeignKeys?',
        a: 'models.CASCADE specifies that if a parent record is deleted (e.g. Category), all related child records (all Products in that category) are automatically deleted from the database. Other options include models.PROTECT and models.SET_NULL.'
      },
      {
        q: 'How do I create a superuser for the Django admin panel?',
        a: 'Run "python manage.py createsuperuser" in your terminal and follow the interactive prompts to enter a username, email, and secure password.'
      },
      {
        q: 'What is the purpose of the __str__() method in Django models?',
        a: 'The __str__() method defines the human-readable string representation of a model instance displayed in the Django Admin portal, dropdown menus, and console logs.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 51: DJANGO VIEWS, TEMPLATES & AUTHENTICATION
  // =========================================================================
  {
    num: 51,
    phaseId: 'phase10',
    phaseTitle: 'Phase 10: Web Development',
    slug: '51-python-django-views-templates-and-auth',
    title: 'Django Views, Forms & Auth',
    badge: '51. Django Views & Auth',
    subtopics: 'URL Dispatcher (path, include) · FBVs vs CBVs · Django Template Language (DTL) · ModelForms · django.contrib.auth · @login_required Decorator',
    desc: 'Master request processing and security in Django: function-based views (FBVs) vs class-based views (CBVs), dynamic URL routing with path(), building forms with automated ModelForms validation, and implementing complete user authentication with django.contrib.auth.',
    sections: [
      {
        title: '1. URL Dispatcher, Function-Based Views (FBVs) & Class-Based Views (CBVs)',
        body: `<p>In Django, incoming HTTP requests hit <code>urls.py</code>, which matches the URL path and routes execution to the appropriate <strong>View</strong> function or class in <code>views.py</code>.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">Function-Based Views (FBVs) vs Class-Based Views (CBVs):</h4>
        <ul>
          <li><strong>Function-Based Views (FBVs):</strong> Simple, explicit, and easy to read. You handle HTTP methods manually using <code>if request.method == "POST":</code>.</li>
          <li><strong>Class-Based Views (CBVs):</strong> Object-oriented views that promote code reuse via inheritance and mixins (e.g. <code>ListView</code>, <code>DetailView</code>, <code>CreateView</code>).</li>
        </ul>`,
        code: `# 1. URL Dispatcher: store_app/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("", views.product_list_view, name="product_list"),
    path("<int:product_id>/", views.product_detail_view, name="product_detail"),
    path("create/", views.ProductCreateView.as_view(), name="product_create"),
]

# 2. View Handlers: store_app/views.py
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.views.generic import CreateView
from .models import Product

# Function-Based View (FBV):
def product_list_view(request):
    """Fetches and displays all active products."""
    products = Product.objects.filter(is_active=True).order_by("-created_at")
    context = {"products": products, "page_title": "Product Catalog"}
    return render(request, "store/product_list.html", context)

# FBV with 404 Guard:
def product_detail_view(request, product_id):
    """Fetches single product or returns 404 automatically."""
    product = get_object_or_404(Product, id=product_id, is_active=True)
    return render(request, "store/product_detail.html", {"product": product})

# Class-Based View (CBV):
class ProductCreateView(CreateView):
    model = Product
    fields = ["title", "category", "price", "stock"]
    template_name = "store/product_form.html"
    success_url = "/products/"`,
        codeTitle: 'Example 1: Django URL Routing, FBVs and Generic CBVs',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 get_object_or_404 Utility:</strong>
          <p style="margin-top:6px;"><code>get_object_or_404(Model, id=...)</code> queries the database and automatically raises an <code>Http404</code> exception if no record exists, eliminating manual try-except <code>Model.DoesNotExist</code> blocks.</p>
        </div>`
      },
      {
        title: '2. Django ModelForms & Built-in User Authentication (django.contrib.auth)',
        body: `<p>Django includes an enterprise-grade authentication system in <strong><code>django.contrib.auth</code></strong>, providing secure User models, password hashing, session management, and access decorators.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">The Power of ModelForms:</h4>
        <p>A <strong>ModelForm</strong> automatically inspects your Django Model and generates corresponding HTML form widgets with automatic server-side validation, error messages, and direct <code>form.save()</code> database persistence!</p>`,
        code: `# 1. Defining a ModelForm: store_app/forms.py
from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ["title", "category", "price", "stock"]
        widgets = {
            "title": forms.TextInput(attrs={"class": "form-control", "placeholder": "Enter product title"}),
            "price": forms.NumberInput(attrs={"class": "form-control", "min": "0"}),
        }

# 2. Authenticated View Protected with @login_required: store_app/views.py
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

@login_required(login_url="/accounts/login/")
def create_product_view(request):
    """Only logged-in users can access this page."""
    if request.method == "POST":
        form = ProductForm(request.POST)
        if form.is_valid(): # Validates data types, lengths, and constraints!
            product = form.save() # Automatically inserts row into DB!
            return redirect("product_detail", product_id=product.id)
    else:
        form = ProductForm()

    return render(request, "store/product_form.html", {"form": form})`,
        codeTitle: 'Example 2: Django ModelForms & @login_required Protected View',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 form.is_valid() & Automatic CSRF:</strong>
          <p style="margin-top:6px;">When rendering forms in templates, always include <code>{% csrf_token %}</code> inside the <code>&lt;form&gt;</code>. <code>form.is_valid()</code> validates clean data, checks constraints, and populates <code>form.errors</code> if validation fails.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Forgetting the {% csrf_token %} Tag in Django Forms',
      text: 'Every POST form in a Django template must include the {% csrf_token %} template tag. If omitted, Django\'s CSRF middleware will immediately reject the submission with an HTTP 403 Forbidden error.'
    },
    tryIt: {
      desc: 'Simulate Django\'s authentication check: write a function check_login_status(user) that returns "Access Granted" if user.is_authenticated is True, else "Redirecting to /login/".',
      code: `class MockUser:
    def __init__(self, name, is_auth):
        self.username = name
        self.is_authenticated = is_auth

def protect_dashboard(user):
    if not user.is_authenticated:
        return "🛑 HTTP 302: Redirecting to /accounts/login/?next=/dashboard/"
    return f"✅ Access Granted: Welcome to Dashboard, {user.username}!"

print(protect_dashboard(MockUser("Anonymous", False)))
print(protect_dashboard(MockUser("Balaji", True)))`
    },
    faqs: [
      {
        q: 'What is the difference between authenticate() and login() in Django?',
        a: 'authenticate(request, username=..., password=...) verifies credentials and returns a User object (or None). login(request, user) attaches the authenticated user to the current session cookie.'
      },
      {
        q: 'What are Django Context Processors?',
        a: 'Context processors are functions that automatically inject variables into the context of every rendered template across the entire site (e.g. {{ user }}, {{ request }}, {{ messages }}).'
      },
      {
        q: 'How do I extend the default User model in Django?',
        a: 'The recommended practice is to create a CustomUser model inheriting from AbstractUser, configured via AUTH_USER_MODEL = "users.CustomUser" in settings.py.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 52: DJANGO REST FRAMEWORK (DRF) & DEPLOYMENT
  // =========================================================================
  {
    num: 52,
    phaseId: 'phase10',
    phaseTitle: 'Phase 10: Web Development',
    slug: '52-python-django-rest-framework-and-deployment',
    title: 'Django REST Framework & Deploy',
    badge: '52. DRF & Deployment',
    subtopics: 'What is DRF? · Serializers & ModelSerializers · ViewSets & Routers · Token Authentication · Production Stack (Gunicorn, Nginx, WhiteNoise, Environment Variables)',
    desc: 'Master building enterprise web APIs and production deployment in Python: the Django REST Framework (DRF) architecture, Serializers, ModelViewSets, Routers, token authentication, and deploying with Gunicorn, Nginx, and WhiteNoise.',
    sections: [
      {
        title: '1. What is Django REST Framework (DRF)? Serializers & ViewSets',
        body: `<p><strong>Django REST Framework (DRF)</strong> is a powerful, flexible toolkit for building production-grade Web APIs on top of Django.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">The 3 Core Building Blocks of DRF:</h4>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong>Serializers (<code>ModelSerializer</code>):</strong> Converts complex Django ORM model instances to native Python datatypes that can be rendered into JSON (and validates incoming JSON payloads back into models).</li>
          <li><strong>ViewSets (<code>ModelViewSet</code>):</strong> Combines standard REST CRUD operations (list, create, retrieve, update, destroy) into a single unified class.</li>
          <li><strong>Routers (<code>DefaultRouter</code>):</strong> Automatically generates all RESTful URL patterns (<code>/api/products/</code>, <code>/api/products/1/</code>) without writing manual path declarations!</li>
        </ol>`,
        code: `# 1. Defining DRF Serializer: api/serializers.py
from rest_framework import serializers
from store_app.models import Product, Category

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source="category.name")

    class Meta:
        model = Product
        fields = ["id", "title", "category", "category_name", "price", "stock", "is_active"]

# 2. Defining DRF ModelViewSet: api/views.py
from rest_framework import viewsets, permissions
from rest_framework.authentication import TokenAuthentication

class ProductViewSet(viewsets.ModelViewSet):
    """Provides complete CRUD REST endpoints automatically."""
    queryset = Product.objects.filter(is_active=True).order_by("-created_at")
    serializer_class = ProductSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# 3. Automatic REST URL Routing: api/urls.py
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"products", ProductViewSet, basename="product")
urlpatterns = router.urls`,
        codeTitle: 'Example 1: Complete DRF ModelSerializer, ModelViewSet, and DefaultRouter',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 What DefaultRouter Generates in 3 Lines:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>GET /api/products/</code> -> List all products</li>
            <li><code>POST /api/products/</code> -> Create product</li>
            <li><code>GET /api/products/42/</code> -> Retrieve product #42</li>
            <li><code>PUT / PATCH /api/products/42/</code> -> Update product #42</li>
            <li><code>DELETE /api/products/42/</code> -> Delete product #42</li>
          </ul>
        </div>`
      },
      {
        title: '2. Production Web Architecture & Deployment Best Practices',
        body: `<p>Never use the built-in <code>python manage.py runserver</code> in production (it is single-threaded and not hardened for security). A production deployment uses a robust multi-tier architecture:</p>
        
        <div class="diagram-box">┌────────────────────────────────────────────────────────────────────────┐
│                     PRODUCTION PYTHON WEB ARCHITECTURE                 │
├────────────────────────────────────────────────────────────────────────┤
│  Client Traffic ───> Cloudflare (DDoS / SSL / CDN)                     │
│                            │                                           │
│                            ▼                                           │
│                      Nginx Reverse Proxy                               │
│                     ┌──────┴─────────────────────┐                     │
│                     ▼                            ▼                     │
│          Static Files (/static/)        WSGI Application Server        │
│          (Served via WhiteNoise)          (Gunicorn / Uvicorn)         │
│                                                  │                     │
│                                                  ▼                     │
│                                        Django / Flask Backend          │
│                                                  │                     │
│                                                  ▼                     │
│                                        PostgreSQL Database             │
└────────────────────────────────────────────────────────────────────────┘</div>

        <h4 style="color:#10b981; margin:16px 0 8px;">Production Deployment Checklist:</h4>
        <ul>
          <li><strong><code>DEBUG = False</code>:</strong> Never expose error traces in production.</li>
          <li><strong><code>ALLOWED_HOSTS = ['yourdomain.com']</code>:</strong> Prevents HTTP Host header attacks.</li>
          <li><strong>Environment Secrets (<code>.env</code>):</strong> Store <code>SECRET_KEY</code> and <code>DATABASE_URL</code> in environment variables.</li>
          <li><strong>Static Files with WhiteNoise:</strong> Enables Django to serve its own static files efficiently without separate storage servers.</li>
        </ul>`,
        code: `# Production Settings Configuration (settings.py):
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# 1. Load Secrets from Environment:
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "fallback_local_key_not_for_prod")
DEBUG = os.getenv("DJANGO_DEBUG", "False") == "True"
ALLOWED_HOSTS = os.getenv("DJANGO_ALLOWED_HOSTS", "ourcompiler.com,127.0.0.1").split(",")

# 2. Production Security Headers:
SECURE_SSL_REDIRECT = not DEBUG
SESSION_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SECURE = not DEBUG
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True

# 3. WhiteNoise Static Files Configuration:
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware", # Serves compressed static assets!
    # ... standard middlewares ...
]
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

print("Production Settings Blueprint Configured.")`,
        codeTitle: 'Reference: Production Deployment Security & WhiteNoise Configuration',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Gunicorn Execution Command:</strong>
          <p style="margin-top:6px;">In production, start your app using: <code>gunicorn my_project.wsgi:application --workers 4 --bind 0.0.0.0:8000</code>. A general rule for worker count is <code>(2 x CPU_Cores) + 1</code>.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Hardcoding SECRET_KEY in Public GitHub Repositories',
      text: 'Hardcoding Django\'s SECRET_KEY exposes your application to session tampering and remote code execution vulnerabilities. Always use python-decouple or os.getenv() to load secrets from environment variables.'
    },
    tryIt: {
      desc: 'Write a simulated DRF serializer validate_price method that raises a ValidationError if price is less than or equal to zero.',
      code: `def validate_price(price):
    if price <= 0:
        raise ValueError("Price must be a positive value greater than zero!")
    return price

try:
    print("Valid Price:  ", validate_price(499.0))
    print("Invalid Price:", validate_price(-10.0))
except ValueError as err:
    print(f"Validation Error Caught: {err}")`
    },
    faqs: [
      {
        q: 'What is the difference between Gunicorn and Uvicorn?',
        a: 'Gunicorn is a WSGI HTTP server for synchronous Python frameworks (Flask, standard Django). Uvicorn is an ASGI server for asynchronous Python frameworks (FastAPI, Django Channels).'
      },
      {
        q: 'What is JWT (JSON Web Token) authentication in DRF?',
        a: 'JWT is a stateless token format containing encrypted user claims. Unlike session cookies, the server does not need to query a database to verify JWT validity, making it ideal for distributed microservices.'
      },
      {
        q: 'What is WhiteNoise in Django?',
        a: 'WhiteNoise is a Python package that allows Django to serve its own static files (CSS, JS, images) with caching and Gzip/Brotli compression directly from the application server, without needing separate S3 buckets for small-to-medium deployments.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 53: WEB DEVELOPMENT CAPSTONE PROJECTS
  // =========================================================================
  {
    num: 53,
    phaseId: 'phase10',
    phaseTitle: 'Phase 10: Web Development',
    slug: '53-python-web-development-capstone-projects',
    title: 'Web Development Capstone Projects',
    badge: '53. Web Capstone Projects',
    subtopics: '6 Full Projects · 1. Multi-Author Blog · 2. Secure Auth System · 3. Task Manager · 4. E-Commerce Backend · 5. Student Portal · 6. DRF REST API',
    desc: 'Build six complete real-world web applications in Python: a Full-Featured Multi-Author Blog Engine, a Secure User Authentication & Session System, a Task & Project Management App, an E-Commerce Backend Engine with inventory orders, a Student Academic Portal with grade cards, and a Production-Grade DRF REST API.',
    sections: [
      {
        title: '1. Project 1: Full-Featured Multi-Author Blog Application',
        body: `<p>A complete blog application featuring Post creation, dynamic slug generation, author relationships, tag filtering, and publication status management:</p>`,
        code: `# =========================================================================
# PROJECT 1: MULTI-AUTHOR BLOG APPLICATION ENGINE
# =========================================================================
import datetime

class BlogPost:
    """Models an individual blog article."""
    def __init__(self, post_id, title, content, author, tags=None):
        self.id = post_id
        self.title = title
        self.slug = title.lower().replace(" ", "-")
        self.content = content
        self.author = author
        self.tags = tags or []
        self.created_at = datetime.datetime.now()
        self.is_published = True
        self.views = 0

    def record_view(self):
        self.views += 1

    def __repr__(self):
        return f"<Post #{self.id}: '{self.title}' by {self.author} ({self.views} views)>"

class BlogEngine:
    """Manages publishing, querying, and filtering blog articles."""
    def __init__(self):
        self.posts = []
        self._next_id = 1

    def publish_post(self, title, content, author, tags=None):
        post = BlogPost(self._next_id, title, content, author, tags)
        self.posts.append(post)
        self._next_id += 1
        print(f"📝 Published: '{post.title}' by {author}")
        return post

    def get_by_slug(self, slug):
        for p in self.posts:
            if p.slug == slug and p.is_published:
                p.record_view()
                return p
        return None

    def filter_by_tag(self, tag):
        return [p for p in self.posts if tag.lower() in [t.lower() for t in p.tags] and p.is_published]

# Run Project 1 Demonstration:
blog = BlogEngine()
p1 = blog.publish_post("Mastering Python 3 in 2026", "Comprehensive guide to Python...", "Balaji", ["Python", "Tutorial"])
p2 = blog.publish_post("Building Web Backends with Django", "Learn MTV architecture...", "Alex", ["Django", "Web"])
p3 = blog.publish_post("Flask REST API Microservices", "Fast and lightweight APIs...", "Balaji", ["Flask", "Python", "API"])

# Query by tag:
print("\\n--- 🏷️ Posts Tagged 'Python' ---")
for p in blog.filter_by_tag("Python"):
    print("•", p)

# Read post:
read_post = blog.get_by_slug("mastering-python-3-in-2026")
print(f"\\n📖 Read Post: {read_post.title} | Views: {read_post.views}")`,
        codeTitle: 'Project 1: Multi-Author Blog Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Key Features:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li>Automatic slugification of titles for SEO-friendly URLs (<code>/posts/mastering-python-3-in-2026</code>).</li>
            <li>Tag-based multi-category filtering and view counter tracking.</li>
          </ul>
        </div>`
      },
      {
        title: '2. Project 2: Secure User Authentication & Session System',
        body: `<p>A complete authentication service implementing salted password hashing, credential verification, session management, and login throttling:</p>`,
        code: `# =========================================================================
# PROJECT 2: SECURE USER AUTHENTICATION & SESSION SYSTEM
# =========================================================================
import hashlib
import secrets
import time

class SecureAuthService:
    """Production authentication service with salted hashing & session tokens."""
    
    def __init__(self):
        self.user_database = {}  # {username: {"salt": salt, "hash": hash, "role": role}}
        self.active_sessions = {} # {session_token: {"username": username, "expires": timestamp}}

    def _hash_password(self, password, salt):
        """Generates SHA-256 hash combined with random salt."""
        return hashlib.sha256((password + salt).encode("utf-8")).hexdigest()

    def register_user(self, username, password, role="User"):
        if username in self.user_database:
            raise ValueError(f"Username '{username}' is already taken!")
        
        salt = secrets.token_hex(16) # Cryptographically secure 32-char hex salt
        pw_hash = self._hash_password(password, salt)
        self.user_database[username] = {"salt": salt, "hash": pw_hash, "role": role}
        print(f"✅ Registered user: {username} [{role}]")

    def login(self, username, password):
        user_record = self.user_database.get(username)
        if not user_record:
            print(f"❌ Login Failed: User '{username}' does not exist.")
            return None
        
        input_hash = self._hash_password(password, user_record["salt"])
        if secrets.compare_digest(input_hash, user_record["hash"]):
            token = secrets.token_urlsafe(32) # Generate 43-character session token
            self.active_sessions[token] = {"username": username, "role": user_record["role"], "login_time": time.time()}
            print(f"🔓 Login Successful for '{username}'! Session Token: {token[:12]}...")
            return token
        else:
            print(f"❌ Login Failed: Invalid password for '{username}'.")
            return None

    def validate_session(self, token):
        session_info = self.active_sessions.get(token)
        if session_info:
            return True, session_info["username"], session_info["role"]
        return False, None, None

# Run Project 2 Demonstration:
auth = SecureAuthService()
auth.register_user("balaji_dev", "SecurePass#2026", role="Admin")
auth.register_user("alex_smith", "SimplePass123", role="User")

# Attempt Login:
token = auth.login("balaji_dev", "SecurePass#2026")
is_valid, user, role = auth.validate_session(token)
print(f"Session Valid: {is_valid} | Authenticated as: {user} ({role})")`,
        codeTitle: 'Project 2: Secure User Authentication & Session System',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Security Best Practices:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>secrets.token_hex(16)</code>: Generates true random cryptographic salts.</li>
            <li><code>secrets.compare_digest()</code>: Prevents timing attacks during hash verification.</li>
          </ul>
        </div>`
      },
      {
        title: '3. Project 3: Collaborative Task & Project Management App',
        body: `<p>A complete task management engine supporting projects, priority levels, status updates, and milestone tracking:</p>`,
        code: `# =========================================================================
# PROJECT 3: COLLABORATIVE TASK & PROJECT MANAGEMENT APP
# =========================================================================
from enum import Enum, auto

class Priority(Enum):
    LOW = auto()
    MEDIUM = auto()
    HIGH = auto()
    CRITICAL = auto()

class TaskItem:
    def __init__(self, task_id, title, priority=Priority.MEDIUM, assignee="Unassigned"):
        self.id = task_id
        self.title = title
        self.priority = priority
        self.assignee = assignee
        self.is_completed = False

    def mark_complete(self):
        self.is_completed = True

    def __repr__(self):
        status = "✅ Done" if self.is_completed else "⏳ In Progress"
        return f"  • Task #{self.id}: {self.title:30} [{self.priority.name:8}] Assignee: {self.assignee:12} [{status}]"

class ProjectBoard:
    def __init__(self, project_name):
        self.name = project_name
        self.tasks = []
        self._counter = 1

    def add_task(self, title, priority=Priority.MEDIUM, assignee="Unassigned"):
        task = TaskItem(self._counter, title, priority, assignee)
        self.tasks.append(task)
        self._counter += 1
        return task

    def get_progress_summary(self):
        total = len(self.tasks)
        completed = sum(1 for t in self.tasks if t.is_completed)
        pct = (completed / total * 100) if total > 0 else 0
        return f"📊 Project '{self.name}': {completed}/{total} Tasks Completed ({pct:.1f}%)"

# Run Project 3 Demonstration:
board = ProjectBoard("Python Masterclass 2026")
t1 = board.add_task("Write Phase 10 Web Development", Priority.CRITICAL, "Balaji")
t2 = board.add_task("Verify Code Examples in IDE", Priority.HIGH, "Alex")
t3 = board.add_task("Deploy Sitemap to Production", Priority.MEDIUM, "Chloe")

t1.mark_complete()
print(board.get_progress_summary())
print("\\n--- Current Task Board ---")
for t in board.tasks:
    print(t)`,
        codeTitle: 'Project 3: Collaborative Task & Project Management App',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Enum State Typing:</strong>
          <p style="margin-top:6px;">Using <code>Priority</code> enums guarantees that priority values cannot be corrupted by typos (like <code>"critcal"</code>).</p>
        </div>`
      },
      {
        title: '4. Project 4: Enterprise E-Commerce Backend Engine',
        body: `<p>A complete e-commerce domain model featuring product catalogs, cart management, discounts, and inventory validation:</p>`,
        code: `# =========================================================================
# PROJECT 4: ENTERPRISE E-COMMERCE BACKEND ENGINE
# =========================================================================

class ECommerceStore:
    def __init__(self):
        self.catalog = {
            101: {"name": "MacBook Pro M3", "price": 169999.00, "stock": 5},
            102: {"name": "Mechanical Keyboard", "price": 2499.00, "stock": 20},
            103: {"name": "4K Ultra-Wide Monitor", "price": 34999.00, "stock": 4}
        }
        self.orders = []

    def place_order(self, customer_name, items_dict, coupon_code=None):
        """Processes order atomically: items_dict = {product_id: quantity}"""
        print(f"\\n--- 🛍️ Processing Checkout for '{customer_name}' ---")
        
        # 1. Validate Stock:
        subtotal = 0.0
        for pid, qty in items_dict.items():
            product = self.catalog.get(pid)
            if not product:
                raise ValueError(f"Product #{pid} does not exist!")
            if product["stock"] < qty:
                raise ValueError(f"Insufficient stock for '{product['name']}'! Only {product['stock']} available.")
            subtotal += product["price"] * qty

        # 2. Apply Coupon:
        discount = 0.0
        if coupon_code == "SUPER2026":
            discount = subtotal * 0.10 # 10% discount
            print("🏷️ Coupon 'SUPER2026' applied (-10% Discount)!")

        total = subtotal - discount

        # 3. Deduct Stock:
        for pid, qty in items_dict.items():
            self.catalog[pid]["stock"] -= qty

        order_record = {
            "order_id": len(self.orders) + 1001,
            "customer": customer_name,
            "items": items_dict,
            "total": total
        }
        self.orders.append(order_record)
        print(f"✅ Order #{order_record['order_id']} Confirmed! Total Charged: ₹{total:,.2f}")
        return order_record

# Run Project 4 Demonstration:
store = ECommerceStore()
store.place_order("Balaji", {101: 1, 102: 2}, coupon_code="SUPER2026")
store.place_order("Alex", {103: 1})

print("\\n--- Current Warehouse Inventory ---")
for pid, p in store.catalog.items():
    print(f"• #{pid}: {p['name']:25} | In Stock: {p['stock']} | Price: ₹{p['price']:,.2f}")`,
        codeTitle: 'Project 4: Enterprise E-Commerce Backend Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Inventory Integrity:</strong>
          <p style="margin-top:6px;">Validating all stock quantities before deducting ensures orders never fail halfway through checkout.</p>
        </div>`
      },
      {
        title: '5. Project 5: Student Academic Portal & Grade Tracking System',
        body: `<p>A complete educational management portal modeling Students, Courses, dynamic Grade calculation, and GPA computation:</p>`,
        code: `# =========================================================================
# PROJECT 5: STUDENT ACADEMIC PORTAL & GRADE TRACKING SYSTEM
# =========================================================================

class StudentPortal:
    def __init__(self):
        self.students = {} # {student_id: {"name": str, "grades": {course: score}}}

    def enroll_student(self, student_id, name):
        self.students[student_id] = {"name": name, "grades": {}}
        print(f"🎓 Enrolled Student #{student_id}: {name}")

    def record_grade(self, student_id, course_name, score):
        if student_id not in self.students:
            raise KeyError(f"Student #{student_id} not found!")
        self.students[student_id]["grades"][course_name] = score

    def generate_report_card(self, student_id):
        student = self.students.get(student_id)
        if not student:
            return "Student record not found."
        
        grades = student["grades"]
        if not grades:
            return f"No grades recorded yet for {student['name']}."
        
        avg = sum(grades.values()) / len(grades)
        gpa = round((avg / 100) * 10, 2)
        
        report = [
            f"========================================",
            f"🎓 ACADEMIC REPORT: {student['name']} (ID #{student_id})",
            f"----------------------------------------"
        ]
        for course, score in grades.items():
            letter = "A+" if score >= 90 else ("A" if score >= 80 else ("B" if score >= 70 else "C"))
            report.append(f"  • {course:25}: {score}/100 [{letter}]")
        report.append(f"----------------------------------------")
        report.append(f"Average Score: {avg:.1f}% | GPA: {gpa}/10.0")
        report.append(f"========================================")
        return "\\n".join(report)

# Run Project 5 Demonstration:
portal = StudentPortal()
portal.enroll_student(202601, "Balaji Dev")
portal.record_grade(202601, "Python Programming", 98)
portal.record_grade(202601, "Web Architecture", 94)
portal.record_grade(202601, "Database Systems", 92)

print(portal.generate_report_card(202601))`,
        codeTitle: 'Project 5: Student Academic Portal & GPA Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Academic Model:</strong>
          <p style="margin-top:6px;">Calculates weighted GPAs and letter grades dynamically from raw scores.</p>
        </div>`
      },
      {
        title: '6. Project 6: Production-Grade REST API Client & Server Emulator',
        body: `<p>A complete REST API system with structured JSON responses, validation, and token authentication:</p>`,
        code: `# =========================================================================
# PROJECT 6: PRODUCTION-GRADE REST API SERVICE
# =========================================================================
import json

class RESTAPIService:
    """Production REST API Router & Handler Service."""
    
    def __init__(self):
        self.articles = {
            1: {"id": 1, "title": "Flask vs Django", "author": "Balaji"},
            2: {"id": 2, "title": "SQLAlchemy 2.0 Deep Dive", "author": "Alex"}
        }

    def dispatch(self, method, path, payload=None, auth_token=None):
        """Unified API Dispatcher."""
        # 1. Auth Guard for write operations:
        if method in ["POST", "PUT", "DELETE"]:
            if auth_token != "secret_token_2026":
                return {"status_code": 401, "body": {"error": "Unauthorized: Invalid API Token"}}

        # 2. Route Matching:
        if method == "GET" and path == "/api/v1/articles":
            return {"status_code": 200, "body": list(self.articles.values())}
        
        elif method == "GET" and path.startswith("/api/v1/articles/"):
            art_id = int(path.split("/")[-1])
            article = self.articles.get(art_id)
            if article:
                return {"status_code": 200, "body": article}
            return {"status_code": 404, "body": {"error": "Article not found"}}

        elif method == "POST" and path == "/api/v1/articles":
            if not payload or "title" not in payload:
                return {"status_code": 400, "body": {"error": "Missing 'title' field"}}
            new_id = len(self.articles) + 1
            new_art = {"id": new_id, "title": payload["title"], "author": payload.get("author", "Anonymous")}
            self.articles[new_id] = new_art
            return {"status_code": 201, "body": new_art}

        return {"status_code": 404, "body": {"error": "Endpoint not found"}}

# Run Project 6 Demonstration:
api = RESTAPIService()
print("1. GET /api/v1/articles:")
print(json.dumps(api.dispatch("GET", "/api/v1/articles"), indent=2))

print("\\n2. Unauthorized POST /api/v1/articles:")
print(json.dumps(api.dispatch("POST", "/api/v1/articles", {"title": "New Post"}, auth_token="invalid"), indent=2))

print("\\n3. Authorized POST /api/v1/articles:")
print(json.dumps(api.dispatch("POST", "/api/v1/articles", {"title": "Asyncio in Python 3.12", "author": "Balaji"}, auth_token="secret_token_2026"), indent=2))`,
        codeTitle: 'Project 6: Production REST API Service',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 REST Specification:</strong>
          <p style="margin-top:6px;">Implements HTTP status code compliance (200, 201, 400, 401, 404) and JSON payload formatting.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Deploying Without Database Connection Pooling',
      text: 'Creating a new database connection on every single HTTP request will quickly overwhelm your database server under moderate load. Always use a connection pool (like SQLAlchemy QueuePool or PgBouncer for PostgreSQL).'
    },
    tryIt: {
      desc: 'Instantiate the ECommerceStore from Project 4 and place an order for 2 Mechanical Keyboards and 1 MacBook Pro.',
      code: `store = ECommerceStore()
order = store.place_order("Kavya", {102: 2, 101: 1}, coupon_code="SUPER2026")
print("Order Details:", order)`
    },
    faqs: [
      {
        q: 'How do I choose between Flask and Django for a new project?',
        a: 'Choose Flask if you are building a small-to-medium microservice, lightweight REST API, or want total freedom over your database and ORM choice. Choose Django if you are building a full-featured web app needing user authentication, database migrations, and an admin dashboard immediately.'
      },
      {
        q: 'What is ASGI in modern Python web development?',
        a: 'ASGI (Asynchronous Server Gateway Interface) is the successor to WSGI. It supports async/await concurrency, WebSockets, and long-polling HTTP connections.'
      },
      {
        q: 'How should static files be handled in high-traffic production web apps?',
        a: 'In high-scale production apps, static assets (CSS, JS, images, videos) should be offloaded to an Object Storage service (like AWS S3 or Cloudflare R2) fronted by a global Content Delivery Network (CDN).'
      }
    ]
  }
];
