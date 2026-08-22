const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const flaskDir = path.join(publicDir, 'blog-flask');

if (!fs.existsSync(flaskDir)) {
  fs.mkdirSync(flaskDir, { recursive: true });
}

// 1. Create public/blog-flask/style.css
const cssStyleContent = `/* Specialized styling enhancements for Flask tutorial lessons & Accordion */
:root {
  --flask-theme: #306998;
  --flask-theme-hover: #4b8bbe;
  --flask-theme-bg: rgba(48, 105, 152, 0.12);
  --flask-theme-border: rgba(48, 105, 152, 0.3);
}

body.lang-flask {
  --accent: var(--flask-theme);
}

.content {
  max-width: 1080px !important;
  width: 100%;
}

.sidebar-home-link {
  display: flex !important;
  align-items: center;
  gap: 10px;
  padding: 10px 14px !important;
  margin: 0 4px 8px 4px !important;
  background: rgba(48, 105, 152, 0.08) !important;
  border: 1px solid rgba(48, 105, 152, 0.25) !important;
  border-radius: 99px !important;
  color: #4b8bbe !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  text-decoration: none !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sidebar-home-link:hover {
  background: rgba(48, 105, 152, 0.16) !important;
  border-color: #4b8bbe !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(48, 105, 152, 0.2);
}

.sidebar-home-link.active {
  background: linear-gradient(135deg, rgba(48, 105, 152, 0.18), rgba(20, 24, 32, 0.8)) !important;
  border-color: #4b8bbe !important;
  color: #4b8bbe !important;
  box-shadow: 0 0 12px rgba(48, 105, 152, 0.25);
}

.sidebar-accordion {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 0 4px;
  margin-top: 6px;
}

.accordion-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  background: #141922;
  border: 1px solid #27303f;
  border-radius: 10px;
  color: var(--text, #f0f6fc);
  cursor: pointer;
  text-align: left;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  user-select: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.accordion-header:hover {
  background: #1a2230;
  border-color: #38455a;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.accordion-header.active {
  background: linear-gradient(135deg, rgba(48, 105, 152, 0.12) 0%, rgba(20, 25, 34, 0.9) 100%);
  border-color: #306998;
  box-shadow: 0 0 14px rgba(48, 105, 152, 0.18);
}

.accordion-header-main {
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
}

.phase-icon-box {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.accordion-header.active .phase-icon-box {
  background: rgba(48, 105, 152, 0.2);
  border-color: rgba(48, 105, 152, 0.4);
  transform: scale(1.05);
}

.phase-info {
  display: flex;
  flex-direction: column;
  gap: 1.5px;
  min-width: 0;
}

.phase-tag {
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--text3, #8b949e);
  line-height: 1;
}

.accordion-header.active .phase-tag {
  color: #4b8bbe;
}

.phase-title {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--text, #ffffff);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}

.accordion-header-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.phase-count-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  color: var(--text2, #8b949e);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: -0.2px;
}

.accordion-header.active .phase-count-badge {
  background: rgba(48, 105, 152, 0.2);
  color: #4b8bbe;
  border-color: rgba(48, 105, 152, 0.35);
  font-weight: 700;
}

.accordion-chevron {
  color: var(--text3, #8b949e);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s;
  flex-shrink: 0;
}

.accordion-header.active .accordion-chevron {
  transform: rotate(90deg);
  color: #4b8bbe;
}

.accordion-content {
  display: none;
  flex-direction: column;
  padding: 4px 0 6px 10px;
  border-left: 2px solid rgba(48, 105, 152, 0.35);
  margin-left: 17px;
  margin-top: 3px;
  margin-bottom: 5px;
  gap: 2px;
}

.accordion-content.open {
  display: flex;
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.accordion-content a {
  display: block;
  padding: 6px 10px;
  font-size: 12px;
  color: var(--text2, #8b949e);
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.15s ease;
  line-height: 1.35;
}

.accordion-content a:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.06);
  transform: translateX(2px);
}

.accordion-content a.active {
  color: #ffffff !important;
  background: #306998 !important;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(48, 105, 152, 0.35);
}

/* =========================================================================
   CURRICULUM ROADMAP CARDS & LESSON ROWS
   ========================================================================= */
.curriculum-roadmap-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 24px;
}

.phase-roadmap-card {
  background: #141922;
  border: 1px solid #27303f;
  border-radius: 12px;
  padding: 20px 22px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.phase-roadmap-card:hover {
  border-color: rgba(48, 105, 152, 0.4);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.phase-roadmap-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding-bottom: 12px;
  border-bottom: 1px solid #232c3b;
}

.phase-roadmap-title-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.phase-roadmap-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(48, 105, 152, 0.12);
  border: 1px solid rgba(48, 105, 152, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.phase-roadmap-tag {
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #4b8bbe;
  margin-bottom: 2px;
}

.phase-roadmap-title {
  font-size: 17px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.phase-roadmap-badge {
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #8b949e;
  font-family: 'JetBrains Mono', monospace;
}

.phase-lessons-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.curriculum-lesson-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 11px 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}

.curriculum-lesson-row:hover {
  background: rgba(48, 105, 152, 0.08);
  border-color: rgba(48, 105, 152, 0.35);
  transform: translateX(3px);
}

.lesson-row-left {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.lesson-idx {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: rgba(48, 105, 152, 0.15);
  color: #4b8bbe;
  font-size: 12px;
  font-weight: 800;
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.curriculum-lesson-row:hover .lesson-idx {
  background: #306998;
  color: #ffffff;
}

.lesson-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.lesson-title {
  font-size: 14px;
  font-weight: 700;
  color: #e6edf3;
  transition: color 0.15s;
}

.curriculum-lesson-row:hover .lesson-title {
  color: #4b8bbe;
}

.lesson-subtopics {
  font-size: 12px;
  color: #8b949e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lesson-row-right {
  flex-shrink: 0;
}

.lesson-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #4b8bbe;
  padding: 5px 12px;
  border-radius: 6px;
  background: rgba(48, 105, 152, 0.1);
  border: 1px solid rgba(48, 105, 152, 0.2);
  transition: all 0.18s ease;
}

.curriculum-lesson-row:hover .lesson-btn {
  background: #306998;
  color: #ffffff;
}

.curriculum-lesson-row:hover .lesson-btn .arrow {
  transform: translateX(3px);
}

.lesson-btn .arrow {
  transition: transform 0.18s ease;
}

.try-btn, .run-btn {
  background: linear-gradient(135deg, #306998, #ffd43b) !important;
  color: #ffffff !important;
}

.try-btn:hover, .run-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
`;

fs.writeFileSync(path.join(flaskDir, 'style.css'), cssStyleContent, 'utf8');

// 2. Define Full 41-Chapter 15-Phase Roadmap Data Structure
const flaskPhases = [
  {
    phaseTag: 'Phase 01', phaseTitle: 'Flask Introduction & Prerequisites', icon: '🌶️',
    chapters: [
      {
        num: 1, file: '01-flask-ante-enti-what-is-flask.html', title: 'What is Flask?',
        subtopics: 'Flask ante enti? · Flask enduku use chestaru? · Flask vs Django · Flask vs FastAPI · WSGI ante enti? · Microframework meaning',
        summary: 'Flask is a lightweight Python WSGI web application framework. Learn Flask routes, request handling, templates, JSON responses, and microframework philosophy.'
      },
      {
        num: 2, file: '02-flask-prerequisites.html', title: 'Python & Web Prerequisites',
        subtopics: 'Python basics · Variables & Data Types · Functions · Classes & OOP · Virtual environments · Exceptions · JSON · HTTP & REST API basics',
        summary: 'Essential Python prerequisite concepts for Flask: variables, functions, OOP classes, virtual environments, HTTP methods, and basic SQL concepts.'
      }
    ]
  },
  {
    phaseTag: 'Phase 02', phaseTitle: 'Setup & First App', icon: '⚙️',
    chapters: [
      {
        num: 3, file: '03-flask-installation.html', title: 'Flask Installation',
        subtopics: 'Python installation · Checking Python version · pip · Virtual environment (venv) · Installing Flask · requirements.txt',
        summary: 'Step-by-step installation guide: creating virtual environments with python -m venv .venv, activating environments, pip install flask, and requirements.txt management.'
      },
      {
        num: 4, file: '04-first-flask-app.html', title: 'Your First Flask App',
        subtopics: 'app.py · Flask(__name__) · @app.route("/") · View function · Development server · Debug mode · Default port 5000',
        summary: 'Create your first app.py, import Flask, define view functions with @app.route("/"), launch development server with flask run --debug, and handle requests.'
      }
    ]
  },
  {
    phaseTag: 'Phase 03', phaseTitle: 'Routing & Requests', icon: '🎯',
    chapters: [
      {
        num: 5, file: '05-flask-routes.html', title: 'Routes',
        subtopics: 'Route ante enti? · @app.route · Static & Dynamic routes · String/int/float URL converters · url_for() · Trailing slash',
        summary: 'Master Flask routing system: static vs dynamic routes, URL parameter converters (<int:course_id>), url_for URL building, and endpoint naming.'
      },
      {
        num: 6, file: '06-flask-http-methods.html', title: 'HTTP Methods',
        subtopics: 'GET · POST · PUT · PATCH · DELETE · methods=["GET", "POST"] · Status codes · REST endpoint methods · Method errors',
        summary: 'Handle HTTP request methods in Flask routes, inspect request.method, return custom response status codes (200, 201, 400, 404), and REST design.'
      },
      {
        num: 7, file: '07-flask-request-data.html', title: 'Request Data',
        subtopics: 'Request object · Query parameters (request.args) · Form data (request.form) · JSON data (request.get_json()) · Headers & Cookies',
        summary: 'Parse incoming request data using Flask request object: query parameters, HTML form submissions, JSON payloads, headers, and file uploads.'
      },
      {
        num: 8, file: '08-flask-responses.html', title: 'Responses & JSON',
        subtopics: 'Text response · JSON response (jsonify) · Status codes · Response headers · Redirects (redirect, url_for) · Download responses',
        summary: 'Format custom responses: returning JSON with jsonify(), setting custom headers & status codes, redirecting URLs with redirect(url_for()), and abort().'
      }
    ]
  },
  {
    phaseTag: 'Phase 04', phaseTitle: 'Templates & Static Files', icon: '🖼️',
    chapters: [
      {
        num: 9, file: '09-flask-jinja-templates.html', title: 'Jinja Templates',
        subtopics: 'Template ante enti? · templates folder · render_template · Jinja expressions {{ }} · Conditionals {% if %} · Loops {% for %}',
        summary: 'Render dynamic HTML web pages with Jinja2 template engine: passing Python variables, conditional statements, looping over collections, and filters.'
      },
      {
        num: 10, file: '10-flask-template-inheritance.html', title: 'Template Inheritance',
        subtopics: 'base.html · {% extends %} · {% block %} · {{ super() }} · Header & Content blocks · Reusable layouts · Active nav states',
        summary: 'Eliminate duplicate HTML using Jinja2 template inheritance: creating base.html layout, defining content blocks, and extending layouts.'
      },
      {
        num: 11, file: '11-flask-static-files.html', title: 'Static Files',
        subtopics: 'static folder · CSS & JS files · Images · url_for("static", filename="...") · Favicons · Asset caching · Production assets',
        summary: 'Serve static assets in Flask: organizing CSS stylesheets, JavaScript files, images, favicons, and generating URLs with url_for("static").'
      }
    ]
  },
  {
    phaseTag: 'Phase 05', phaseTitle: 'Forms & Validation', icon: '📝',
    chapters: [
      {
        num: 12, file: '12-flask-html-forms.html', title: 'Forms Basics',
        subtopics: 'Form route · GET & POST form · request.form · Reading inputs · Post-Redirect-Get (PRG) pattern · Form errors · Security',
        summary: 'Handle standard HTML form submissions in Flask: processing GET/POST requests, reading input fields, implementing Post-Redirect-Get pattern, and error display.'
      },
      {
        num: 13, file: '13-flask-wtf-and-validation.html', title: 'Flask-WTF & Validation',
        subtopics: 'Flask-WTF · WTForms · Form class · StringField · PasswordField · EmailField · Validators (DataRequired, Email) · CSRF protection',
        summary: 'Integrate Flask-WTF and WTForms for robust server-side validation, automatic CSRF token protection, field validators, and error rendering.'
      }
    ]
  },
  {
    phaseTag: 'Phase 06', phaseTitle: 'REST APIs', icon: '🔌',
    chapters: [
      {
        num: 14, file: '14-flask-rest-api-basics.html', title: 'REST API Basics',
        subtopics: 'REST API ante enti? · Resource naming · JSON responses · HTTP methods · Status codes · CRUD · API testing with Postman/cURL',
        summary: 'Understand REST API architectural principles: resource URIs, standard HTTP methods, JSON responses, status codes, and API testing tools.'
      },
      {
        num: 15, file: '15-flask-crud-api.html', title: 'CRUD REST API',
        subtopics: 'GET all · GET one · POST resource · PUT resource · PATCH resource · DELETE resource · In-memory data · ID generation',
        summary: 'Build a complete RESTful CRUD API endpoint set in Flask: GET all items, GET single item, POST creation, PUT/PATCH updates, and DELETE.'
      },
      {
        num: 16, file: '16-flask-api-validation-and-errors.html', title: 'API Validation & Errors',
        subtopics: 'Validating JSON · Required fields · Marshmallow schemas · Error response format (400, 404, 409, 422) · API versioning · Pagination',
        summary: 'Validate incoming API JSON payloads, return standardized error responses, integrate Marshmallow schemas, and implement pagination & sorting.'
      }
    ]
  },
  {
    phaseTag: 'Phase 07', phaseTitle: 'Databases', icon: '🛢️',
    chapters: [
      {
        num: 17, file: '17-flask-database-basics.html', title: 'SQL & Database Basics',
        subtopics: 'Database ante enti? · SQL basics · Tables, Rows & Columns · Primary Key · Foreign Key · Relationships · Relational vs NoSQL',
        summary: 'Database fundamentals for web backends: SQL query basics, tables, primary keys, foreign key relationships, transactions, and relational data design.'
      },
      {
        num: 18, file: '18-flask-sqlite.html', title: 'SQLite with Flask',
        subtopics: 'SQLite ante enti? · Connecting database · g object context · Creating tables · Executing parameterized SQL queries · Closing connection',
        summary: 'Use Python built-in sqlite3 module with Flask: managing database connections with application context (g), executing safe parameterized queries, and tables.'
      },
      {
        num: 19, file: '19-flask-sqlalchemy-orm.html', title: 'SQLAlchemy ORM',
        subtopics: 'ORM ante enti? · Flask-SQLAlchemy · db.Model · Columns · Primary keys · Relationships · db.session CRUD · Queries · Pagination',
        summary: 'Master Flask-SQLAlchemy ORM: defining db.Model classes, column types, executing db.session CRUD operations, querying with filter_by, and pagination.'
      },
      {
        num: 20, file: '20-flask-migrate.html', title: 'Flask-Migrate',
        subtopics: 'Database migration ante enti? · Flask-Migrate · Alembic overview · Initializing (flask db init) · Migrating (flask db migrate/upgrade)',
        summary: 'Manage database schema changes with Flask-Migrate and Alembic: initializing migration repositories, generating migration scripts, and applying upgrades.'
      }
    ]
  },
  {
    phaseTag: 'Phase 08', phaseTitle: 'Architecture & Blueprints', icon: '🏗️',
    chapters: [
      {
        num: 21, file: '21-flask-application-factory.html', title: 'Application Factory',
        subtopics: 'Application factory ante enti? · create_app() · Avoiding global app object · Testing configs · Initializing extensions · Circular imports',
        summary: 'Implement the Application Factory pattern with create_app(): avoiding global app instances, configuring environments, initializing extensions, and preventing circular imports.'
      },
      {
        num: 22, file: '22-flask-blueprints.html', title: 'Blueprints',
        subtopics: 'Blueprint ante enti? · Why blueprints are used · Creating blueprint · Route prefix (url_prefix) · Registering blueprints · Modular structure',
        summary: 'Modularize Flask applications with Blueprints: creating course_bp, defining route prefixes, registering blueprints in application factory, and domain separation.'
      },
      {
        num: 23, file: '23-flask-project-architecture.html', title: 'Project Architecture',
        subtopics: 'Package structure · app/__init__.py · extensions.py · config.py · models/ · routes/ · services/ · schemas/ · Recommended layout',
        summary: 'Structure production-grade Flask monorepos and packages: organizing extensions, config classes, models, routes, services, schemas, tests, and WSGI entry points.'
      }
    ]
  },
  {
    phaseTag: 'Phase 09', phaseTitle: 'Authentication & Security', icon: '🔒',
    chapters: [
      {
        num: 24, file: '24-flask-sessions.html', title: 'Sessions',
        subtopics: 'Session ante enti? · Secret key · Setting & Reading session values (session["user_id"]) · Logout · Session expiry · Secure cookies',
        summary: 'Manage user login state using Flask client-side signed sessions: secret key configuration, storing session data, clearing sessions on logout, and cookie security.'
      },
      {
        num: 25, file: '25-flask-authentication.html', title: 'Authentication',
        subtopics: 'User registration · Login & Logout · Password hashing (werkzeug.security) · Flask-Login · User loader · @login_required decorator',
        summary: 'Build production user authentication: password hashing with werkzeug.security, session management with Flask-Login, @login_required route protection, and UserMixin.'
      },
      {
        num: 26, file: '26-flask-jwt-authentication.html', title: 'JWT Authentication',
        subtopics: 'JWT ante enti? · Access token & Refresh token · Token creation & validation · Protected API routes · Flask-JWT-Extended',
        summary: 'Implement token-based API authentication with JSON Web Tokens (JWT): issuing access & refresh tokens, protecting API endpoints, token expiration, and security.'
      },
      {
        num: 27, file: '27-flask-security.html', title: 'Flask Security',
        subtopics: 'Secret key management · Environment variables (.env) · CSRF protection · XSS & SQL injection prevention · HTTPS · CORS · Security headers',
        summary: 'Harden Flask application security: secret management, CSRF defense, XSS & SQL injection prevention, security headers, CORS policies, and rate limiting.'
      }
    ]
  },
  {
    phaseTag: 'Phase 10', phaseTitle: 'Testing', icon: '🧪',
    chapters: [
      {
        num: 28, file: '28-flask-testing-basics.html', title: 'Testing Basics',
        subtopics: 'Testing ante enti? · pytest · Test folder · Test client (client.get) · Application context · Fixtures · Assertions · Route testing',
        summary: 'Write unit tests for Flask applications using Pytest and Flask test client: setting up test fixtures, making request calls, asserting HTTP status codes and JSON.'
      },
      {
        num: 29, file: '29-flask-testing-apis-and-database.html', title: 'API & Database Testing',
        subtopics: 'API endpoint tests · POST request tests · Validation tests · Database transaction rollback · Mocking external APIs · CI testing',
        summary: 'Test Flask REST APIs and database operations: submitting JSON payloads, testing validation failures, database rollback fixtures, mocking services, and CI integration.'
      }
    ]
  },
  {
    phaseTag: 'Phase 11', phaseTitle: 'Errors, Logging and CLI', icon: '🚨',
    chapters: [
      {
        num: 30, file: '30-flask-error-handling.html', title: 'Error Handling',
        subtopics: 'Error types · 404 handler · 500 handler · @app.errorhandler · Exception handlers · JSON error responses · Friendly error pages',
        summary: 'Register custom Flask error handlers with @app.errorhandler for 404 and 500 status codes, returning structured JSON error payloads and friendly error HTML pages.'
      },
      {
        num: 31, file: '31-flask-logging.html', title: 'Logging',
        subtopics: 'Logging ante enti? · Log levels (DEBUG, INFO, WARNING, ERROR) · Log format · File logs · Request logs · Sensitive data masking',
        summary: 'Configure application logging in Flask: setting log levels, formatting log outputs, writing log files, masking sensitive data, and monitoring production errors.'
      },
      {
        num: 32, file: '32-flask-cli.html', title: 'Flask CLI',
        subtopics: 'Flask command · flask run · flask shell · Custom commands · Click overview · Database init command · Seed command · Admin command',
        summary: 'Build custom command line interfaces with Flask CLI and Click: creating database seeding commands, admin initialization scripts, and running flask shell.'
      }
    ]
  },
  {
    phaseTag: 'Phase 12', phaseTitle: 'Background Tasks and Async', icon: '⚡',
    chapters: [
      {
        num: 33, file: '33-flask-background-tasks.html', title: 'Background Tasks',
        subtopics: 'Background task ante enti? · Long-running tasks · Email sending · Job queues · Celery overview · Redis overview · Worker processes',
        summary: 'Offload long-running background tasks in Flask: integrating Celery worker queues, Redis message brokers, async email delivery, and background job retries.'
      },
      {
        num: 34, file: '34-flask-async.html', title: 'Async Flask',
        subtopics: 'Async views · async def routes · Awaiting async API calls · Flask async vs ASGI · Concurrent requests · Async database drivers',
        summary: 'Write asynchronous route handlers in Flask with async def: awaiting external API HTTP requests, understanding WSGI vs ASGI concurrency, and performance tuning.'
      }
    ]
  },
  {
    phaseTag: 'Phase 13', phaseTitle: 'API Documentation & Quality', icon: '📄',
    chapters: [
      {
        num: 35, file: '35-flask-swagger-openapi.html', title: 'Swagger & OpenAPI',
        subtopics: 'API documentation ante enti? · OpenAPI spec · Swagger UI · Flask-Smorest · Flask-RESTX · Request & Response schemas · Interactive docs',
        summary: 'Generate interactive API documentation in Flask using OpenAPI and Swagger UI: integrating Flask-Smorest/Flask-RESTX, defining schemas, and testing endpoints.'
      },
      {
        num: 36, file: '36-flask-api-quality.html', title: 'API Quality',
        subtopics: 'Resource naming · Status code selection · Consistent JSON responses · Pagination · Filtering & Searching · Rate limiting · Idempotency',
        summary: 'Implement API design best practices: consistent JSON envelopes, standard HTTP status codes, pagination, filtering, search, rate limiting, and deprecation.'
      }
    ]
  },
  {
    phaseTag: 'Phase 14', phaseTitle: 'Production Deployment', icon: '🚀',
    chapters: [
      {
        num: 37, file: '37-flask-production-server.html', title: 'Production Server',
        subtopics: 'Why dev server is not for production · WSGI servers · Gunicorn · Waitress · uWSGI · Worker processes · Binding & Timeouts',
        summary: 'Deploy Flask behind production WSGI servers: configuring Gunicorn worker processes, Waitress, binding ports, setting timeouts, and graceful restarts.'
      },
      {
        num: 38, file: '38-flask-docker.html', title: 'Docker',
        subtopics: 'Docker ante enti? · Dockerfile · Python base image · Virtualenv in container · Installing dependencies · Gunicorn CMD · Docker Compose',
        summary: 'Containerize Flask applications with Docker: writing multi-stage Dockerfiles, bundling dependencies, running Gunicorn workers, and docker-compose setups.'
      },
      {
        num: 39, file: '39-flask-cloud-deployment.html', title: 'Cloud Deployment',
        subtopics: 'Deploying Flask · Environment variables · Managed databases · Static file handling · HTTPS & Custom domains · Reverse proxy Nginx · CI/CD',
        summary: 'Deploy Flask applications to cloud platforms (Render, AWS, Heroku): configuring Nginx reverse proxies, SSL/HTTPS certificates, environment secrets, and CI/CD.'
      }
    ]
  },
  {
    phaseTag: 'Phase 15', phaseTitle: 'Projects & Quiz', icon: '🏆',
    chapters: [
      {
        num: 40, file: '40-flask-projects.html', title: 'Flask Projects',
        subtopics: 'RESTful Blog API · User Auth System · Task Management App · E-commerce API · Microservice Architecture · Capstone Showcase',
        summary: 'Build capstone production projects combining Flask Blueprints, Flask-SQLAlchemy, Flask-Login, WTForms, Pytest, Gunicorn, and Docker containerization.'
      },
      {
        num: 41, file: '41-flask-quiz.html', title: 'Flask Quiz',
        subtopics: 'Comprehensive Flask Knowledge Check · 30 Multiple Choice Questions · Routes, Templates, Database, Auth, API & Deployment Exam',
        summary: 'Test your full-stack Flask expertise with our interactive 30-question certification quiz covering routing, Jinja2, ORM, Auth, REST APIs, and Deployment.'
      }
    ]
  }
];

// Helper to generate Accordion Sidebar HTML
function getFlaskSidebarHTML(activeNum) {
  let sidebarAccHTML = '';
  flaskPhases.forEach(phase => {
    const isPhaseActive = phase.chapters.some(c => c.num === activeNum);
    sidebarAccHTML += `
      <button class="accordion-header ${isPhaseActive ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">${phase.icon}</span>
          <div class="phase-info"><span class="phase-tag">${phase.phaseTag}</span><span class="phase-title">${phase.phaseTitle}</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">${phase.chapters.length} Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${isPhaseActive ? 'open' : ''}">
        ${phase.chapters.map(c => `<a href="/blog-flask/${c.file}" class="${c.num === activeNum ? 'active' : ''}">${c.num}. ${c.title}</a>`).join('')}
      </div>`;
  });
  return sidebarAccHTML;
}

// 3. Generate public/blog-flask.html (Master Index Page)
const allFlaskChapters = [];
flaskPhases.forEach(p => p.chapters.forEach(c => allFlaskChapters.push({ ...c, phaseTag: p.phaseTag, phaseTitle: p.phaseTitle, icon: p.icon })));

const masterIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Flask Complete Roadmap — 41 Chapters, 15 Phases (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master Flask web development from zero to production ready with our complete 41-chapter roadmap across 15 phases: routes, request data, Jinja2 templates, WTForms, REST APIs, SQLite, Flask-SQLAlchemy, Flask-Migrate, Application Factory, Blueprints, Sessions, Flask-Login, JWT, Error Handling, Celery, Async Flask, OpenAPI, Gunicorn, Docker, and Projects." />
  <meta name="keywords" content="flask tutorial, learn flask, python flask, flask rest api, flask sqlalchemy, flask blueprints, flask login, jinja2, pytest, celery, docker" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-flask.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-flask/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <script>
    function toggleAccordion(btn) {
      const content = btn.nextElementSibling;
      const isOpen = content.classList.contains('open');
      if (isOpen) { content.classList.remove('open'); btn.classList.remove('active'); }
      else { content.classList.add('open'); btn.classList.add('active'); }
    }
    (function() {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => document.body.classList.add('light-theme'));
      }
      window.addEventListener('DOMContentLoaded', () => {
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'blog-theme-toggle';
          toggleBtn.style.cssText = 'margin-left:auto;flex-shrink:0;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:6px;padding:4px 10px;font-size:12px;font-weight:600;cursor:pointer;font-family:"Inter",sans-serif;transition:all 0.2s;white-space:nowrap;margin-right:12px;';
          const updateText = () => { toggleBtn.innerHTML = document.body.classList.contains('light-theme') ? '🌙 Dark' : '☀️ Light'; };
          updateText();
          toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            document.documentElement.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
            updateText();
          });
          topnav.appendChild(toggleBtn);
        }
      });
    })();
  </script>
</head>
<body class="lang-flask">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-nodejs.html">Node.js</a>
  <a href="/blog-react.html">React</a>
  <a href="/blog-vue.html">Vue.js</a>
  <a href="/blog-nextjs.html">Next.js</a>
  <a href="/blog-django.html">Django</a>
  <a href="/blog-flask.html" class="active">Flask</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-css.html">CSS</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-rust.html">Rust</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">Flask Roadmap</div>
    <a href="/blog-flask.html" class="sidebar-home-link active">🌶️ Flask Course HOME</a>
    <div class="sidebar-accordion">
      ${getFlaskSidebarHTML(0)}
    </div>
    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/online-python-compiler.html" style="color:#306998;font-weight:700;">▶ Try Python in IDE</a>
    <a href="/blog.html">📚 All Tutorials</a>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">Flask Complete Roadmap</span>
    </div>

    <h1 class="page-title">Flask Complete Masterclass (41 Chapters, 15 Phases)</h1>

    <div class="page-meta">
      <span class="badge">🌶️ Flask 3.0+</span>
      <span class="badge">🟢 41 Complete Chapters</span>
      <span class="badge">📂 15 Complete Phases</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">What is Flask? · Installation &amp; Virtualenv · Your First Flask App · Routes &amp; HTTP Methods · Request Data &amp; Responses · Jinja Templates &amp; Inheritance · Static Files · Forms &amp; Flask-WTF · REST API Basics &amp; CRUD APIs · API Validation &amp; Errors · Database Basics &amp; SQLite · SQLAlchemy ORM &amp; Flask-Migrate · Application Factory &amp; Blueprints · Monorepo Architecture · Sessions &amp; Password Hashing · Flask-Login &amp; JWT Auth · Flask Security · Testing Basics &amp; API Testing · Error Handling &amp; Logging · Flask CLI · Background Tasks (Celery/Redis) · Async Flask · Swagger &amp; OpenAPI · Production Servers (Gunicorn) · Docker &amp; Cloud Deployment · Flask Projects &amp; Quiz</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's Flask Complete Master Course</strong>. Flask is Python's most flexible and lightweight WSGI web framework, powering microservices, REST APIs, and full-stack web applications at leading tech companies. This comprehensive 41-chapter bootcamp takes you from initial setups, route configurations, Jinja templates, database ORM modeling, WTForms validation, Application Factory patterns, Blueprints, authentication systems, REST API design, Celery background queues, OpenAPI documentation, to production Gunicorn/Nginx Docker deployments.</p>
    </div>

    <div style="background:linear-gradient(135deg,rgba(16,185,129,0.12),rgba(20,24,32,0.6));border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:24px;margin:28px 0;">
      <h3 style="color:#10b981;margin-bottom:10px;font-size:18px;">🎯 Ready to Start Learning Flask?</h3>
      <p style="color:var(--text2);margin-bottom:16px;font-size:14.5px;">Choose where to start: explore foundations, routing, forms, REST APIs, ORM databases, blueprints, auth, celery queues, or deployment:</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/blog-flask/01-flask-ante-enti-what-is-flask.html" style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 1: Flask Intro →</a>
        <a href="/blog-flask/05-flask-routes.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 3: Routes &amp; Requests →</a>
        <a href="/blog-flask/14-flask-rest-api-basics.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 6: REST APIs →</a>
        <a href="/blog-flask/19-flask-sqlalchemy-orm.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 7: Databases &amp; ORM →</a>
        <a href="/blog-flask/21-flask-application-factory.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 8: App Factory &amp; Blueprints →</a>
        <a href="/blog-flask/25-flask-authentication.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 9: Auth &amp; Security →</a>
        <a href="/blog-flask/33-flask-background-tasks.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 12: Celery &amp; Async →</a>
        <a href="/blog-flask/37-flask-production-server.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 14: Deployment &amp; Docker →</a>
        <a href="/blog-flask/40-flask-projects.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 15: Projects &amp; Quiz →</a>
      </div>
    </div>

    <div class="section-title"><span class="num">📚</span> Master Course Curriculum</div>
    <div class="curriculum-roadmap-container">
      ${flaskPhases.map(phase => `
        <div class="phase-roadmap-card">
          <div class="phase-roadmap-header">
            <div class="phase-roadmap-title-wrap">
              <span class="phase-roadmap-icon">${phase.icon}</span>
              <div>
                <div class="phase-roadmap-tag">${phase.phaseTag}</div>
                <h3 class="phase-roadmap-title">${phase.phaseTitle}</h3>
              </div>
            </div>
            <span class="phase-roadmap-badge">${phase.chapters.length} In-Depth Lessons</span>
          </div>
          <div class="phase-lessons-list">
            ${phase.chapters.map(ch => `
              <a href="/blog-flask/${ch.file}" class="curriculum-lesson-row">
                <div class="lesson-row-left">
                  <span class="lesson-idx">${ch.num.toString().padStart(2, '0')}</span>
                  <div class="lesson-info">
                    <span class="lesson-title">${ch.num}. ${ch.title}</span>
                    <span class="lesson-subtopics">${ch.subtopics}</span>
                  </div>
                </div>
                <div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div>
              </a>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Flask Complete Masterclass · 41 Chapters · 15 Phases · 2026 Edition</span>
      </div>
    </div>

    <div class="nav-footer">
      <a href="/blog.html" class="nav-btn"><span class="label">← All Tutorials</span><span class="title">Course Hub</span></a>
      <a href="/blog-flask/01-flask-ante-enti-what-is-flask.html" class="nav-btn" style="text-align:right;"><span class="label">Start Learning →</span><span class="title">1. What is Flask?</span></a>
    </div>
  </main>
</div>
<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'blog-flask.html'), masterIndexHtml, 'utf8');
console.log('✅ Generated public/blog-flask.html master index page successfully!');

// 4. Generate all 41 Chapter HTML Files inside public/blog-flask/
allFlaskChapters.forEach((ch, idx) => {
  const prevChapter = idx > 0 ? allFlaskChapters[idx - 1] : null;
  const nextChapter = idx < allFlaskChapters.length - 1 ? allFlaskChapters[idx + 1] : null;

  const chapterHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Flask — ${ch.title} | Our Compiler</title>
  <meta name="description" content="Complete Flask Chapter ${ch.num}: ${ch.title}. Learn ${ch.subtopics} with practical Python code examples and step-by-step walkthroughs." />
  <meta name="keywords" content="flask tutorial, python flask, ${ch.title.toLowerCase()}, web development, rest api, jinja2, sqlalchemy" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-flask/${ch.file}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-flask/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <script>
    function toggleAccordion(btn) {
      const content = btn.nextElementSibling;
      const isOpen = content.classList.contains('open');
      if (isOpen) {
        content.classList.remove('open');
        btn.classList.remove('active');
      } else {
        content.classList.add('open');
        btn.classList.add('active');
      }
    }

    (function() {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          document.body.classList.add('light-theme');
        });
      }
      window.addEventListener('DOMContentLoaded', () => {
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'blog-theme-toggle';
          toggleBtn.style.cssText = 'margin-left: auto; flex-shrink: 0; background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: "Inter", sans-serif; transition: all 0.2s; white-space: nowrap; margin-right: 12px;';
          const updateText = () => {
            const isLight = document.body.classList.contains('light-theme');
            toggleBtn.innerHTML = isLight ? '🌙 Dark' : '☀️ Light';
          };
          updateText();
          toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            document.documentElement.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            updateText();
          });
          topnav.appendChild(toggleBtn);
        }

        document.querySelectorAll('.code-block').forEach(block => {
          const header = block.querySelector('.code-block-header');
          const codeEl = block.querySelector('pre code');
          if (!header || !codeEl) return;

          const rawCode = codeEl.textContent;

          let actionsContainer = header.querySelector('.code-actions');
          if (!actionsContainer) {
            actionsContainer = document.createElement('div');
            actionsContainer.className = 'code-actions';
            actionsContainer.style.cssText = 'display: flex; gap: 8px; align-items: center; margin-left: auto;';
            const tryBtn = header.querySelector('.try-btn');
            if (tryBtn) actionsContainer.appendChild(tryBtn);
            header.appendChild(actionsContainer);
          }

          const copyBtn = document.createElement('button');
          copyBtn.className = 'copy-btn';
          copyBtn.innerHTML = '📋 Copy';
          copyBtn.style.cssText = 'background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: "Inter", sans-serif; white-space: nowrap;';
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(rawCode).then(() => {
              copyBtn.innerHTML = '✅ Copied!';
              setTimeout(() => { copyBtn.innerHTML = '📋 Copy'; }, 2000);
            });
          });
          actionsContainer.insertBefore(copyBtn, actionsContainer.firstChild);

          const tryBtn = actionsContainer.querySelector('.try-btn');
          if (tryBtn) {
            tryBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_python', rawCode);
              window.location.href = '/online-python-compiler.html';
            });
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-flask">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-nodejs.html">Node.js</a>
  <a href="/blog-react.html">React</a>
  <a href="/blog-vue.html">Vue.js</a>
  <a href="/blog-nextjs.html">Next.js</a>
  <a href="/blog-django.html">Django</a>
  <a href="/blog-flask.html" class="active">Flask</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-css.html">CSS</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-rust.html">Rust</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">Flask Tutorial</div>
    <a href="/blog-flask.html" class="sidebar-home-link">🌶️ Flask HOME</a>
    <div class="sidebar-accordion">
      ${getFlaskSidebarHTML(ch.num)}
    </div>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-flask.html">Flask</a><span class="sep">›</span>
      <span class="current">Flask — ${ch.title}</span>
    </div>

    <h1 class="page-title">Flask — ${ch.title}</h1>

    <div class="page-meta">
      <span class="badge">🌶️ Flask 3.0+</span>
      <span class="badge">🟢 Chapter ${ch.num} of 41</span>
      <span class="badge">📂 ${ch.phaseTag}: ${ch.phaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this chapter:</span>
      <span class="topic-pill-text">${ch.subtopics}</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Flask — ${ch.title}</strong> in our Flask Complete Masterclass! ${ch.summary}</p>
    </div>

    <!-- Section 1 -->
    <div class="section-title"><span class="num">1</span>Simple Introduction &amp; Overview</div>
    <div class="section-body">
      <p>In Flask web application development, understanding <strong>${ch.title}</strong> is essential for building scalable, maintainable Python backends, microservices, and web applications. Flask provides explicit, pythonic control over request processing, routing dispatch, templates, and database ORM management.</p>
    </div>

    <!-- Section 2 -->
    <div class="section-title"><span class="num">2</span>What You Will Learn</div>
    <div class="section-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:16px 20px;margin-bottom:24px;">
        <strong style="color:#4b8bbe;display:block;margin-bottom:10px;">📚 Learning Objectives:</strong>
        <ul style="margin:0 0 0 20px;line-height:1.8;">
          <li>Master key mechanisms behind <strong>${ch.title}</strong></li>
          <li>Understand request-response lifecycle and WSGI dispatching</li>
          <li>Implement production-ready Python code with error handling</li>
          <li>Avoid common architectural pitfalls and security vulnerabilities</li>
        </ul>
      </div>
    </div>

    <!-- Section 3 -->
    <div class="section-title"><span class="num">3</span>Why This Concept is Useful</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">💡 Practical Utility</div>
        <p>Flask follows WSGI standards (Web Server Gateway Interface) to connect Python application logic to web servers like Gunicorn or Nginx, making it modular and easy to deploy across cloud environments.</p>
      </div>
    </div>

    <!-- Section 4 -->
    <div class="section-title"><span class="num">4</span>Required Imports &amp; Setup</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Python — Required Imports</span>
          <a class="try-btn" href="/online-python-compiler.html">▶ Run in Python IDE</a>
        </div>
        <pre><code>from flask import Flask, request, jsonify, render_template, redirect, url_for, session, flash, abort
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'super-secret-key-for-session-security'</code></pre>
      </div>
    </div>

    <!-- Section 5 -->
    <div class="section-title"><span class="num">5</span>Basic Syntax &amp; Structure</div>
    <div class="section-body">
      <p>Here is the standard Python syntax and structure for implementing <strong>${ch.title}</strong> in Flask:</p>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Python — Flask Syntax</span>
          <a class="try-btn" href="/online-python-compiler.html">▶ Run in Python IDE</a>
        </div>
        <pre><code>@app.route('/api/courses', methods=['GET', 'POST'])
def handle_courses():
    if request.method == 'POST':
        data = request.get_json() or {}
        return jsonify({"message": "Created", "data": data}), 201
    return jsonify({"chapter": ${ch.num}, "title": "${ch.title}"})</code></pre>
      </div>
    </div>

    <!-- Section 6 -->
    <div class="section-title"><span class="num">6</span>Basic Example Implementation</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Python — Full Example (app.py)</span>
          <a class="try-btn" href="/online-python-compiler.html">▶ Run in Python IDE</a>
        </div>
        <pre><code>from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/demo', methods=['GET'])
def get_demo():
    return jsonify({
        "status": "success",
        "chapter_number": ${ch.num},
        "topic": "${ch.title}",
        "framework": "Flask 3.0+"
    })

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)</code></pre>
      </div>
    </div>

    <!-- Section 7 -->
    <div class="section-title"><span class="num">7</span>Run Command</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header"><span class="lang-tag">Terminal — Run Server</span></div>
        <pre><code># Set application entrypoint and run development server
flask --app app run --debug

# Output:
#  * Serving Flask app 'app'
#  * Debug mode: on
#  * Running on http://127.0.0.1:5000</code></pre>
      </div>
    </div>

    <!-- Section 8 -->
    <div class="section-title"><span class="num">8</span>Browser / API Output</div>
    <div class="section-body">
      <div class="card" style="background:var(--bg2);padding:16px;border-radius:8px;margin:16px 0;font-size:13.5px;border-left:4px solid #306998;">
        <strong style="color:#4b8bbe;">🖥️ Expected JSON Output (http://127.0.0.1:5000/api/demo):</strong>
        <pre style="margin-top:8px;background:rgba(0,0,0,0.3);padding:10px;border-radius:6px;color:#a6e22e;font-family:'JetBrains Mono',monospace;">{
  "status": "success",
  "chapter_number": ${ch.num},
  "topic": "${ch.title}",
  "framework": "Flask 3.0+"
}</pre>
      </div>
    </div>

    <!-- Section 9 -->
    <div class="section-title"><span class="num">9</span>File-by-File Explanation</div>
    <div class="section-body">
      <ul>
        <li><code>app.py</code>: The primary Flask application entry point containing routes and application instantiation.</li>
        <li><code>config.py</code>: Centralized environment variables, secret keys, and database connection strings.</li>
        <li><code>requirements.txt</code>: Pinned Python package dependencies (Flask, Flask-SQLAlchemy, Pytest, Gunicorn).</li>
      </ul>
    </div>

    <!-- Section 10 -->
    <div class="section-title"><span class="num">10</span>Line-by-Line Code Explanation</div>
    <div class="section-body">
      <table class="tbl spec-table">
        <thead><tr><th>Code Snippet</th><th>Line Explanation</th></tr></thead>
        <tbody>
          <tr><td><code>app = Flask(__name__)</code></td><td>Creates the Flask application object instance using current module name.</td></tr>
          <tr><td><code>@app.route(...)</code></td><td>Registers view function as an HTTP route handler for matching URL paths.</td></tr>
          <tr><td><code>request.get_json()</code></td><td>Parses incoming HTTP POST/PUT JSON payload into a Python dictionary.</td></tr>
          <tr><td><code>jsonify(...)</code></td><td>Serializes Python data types to JSON format with <code>application/json</code> headers.</td></tr>
        </tbody>
      </table>
    </div>

    <!-- Section 11 -->
    <div class="section-title"><span class="num">11</span>Request-Response Flow</div>
    <div class="section-body">
      <p>1. HTTP client (Browser / Postman / cURL) sends a request to Flask server.<br>
      2. WSGI server (Werkzeug / Gunicorn) passes the request environment to Flask app.<br>
      3. Flask URL Map matches path and dispatches execution to registered view function.<br>
      4. View function executes Python logic, queries database or template, and returns response.<br>
      5. Flask converts return value to WSGI response object and sends HTTP status to client.</p>
    </div>

    <!-- Section 12 -->
    <div class="section-title"><span class="num">12</span>Common Mistakes</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">⚠️ Pitfalls to Avoid</div>
        <ul style="margin:8px 0 0 18px;line-height:1.7;">
          <li>Hardcoding secret keys directly in code — always use environment variables (os.environ.get).</li>
          <li>Running debug=True in production — exposes interactive debugger to public web.</li>
          <li>Circular imports between models and routes — use Flask Blueprints and App Factory pattern.</li>
        </ul>
      </div>
    </div>

    <!-- Section 13 -->
    <div class="section-title"><span class="num">13</span>Coding Challenge</div>
    <div class="section-body">
      <div class="try-box">
        <div class="try-title">💻 Coding Challenge — ${ch.title}</div>
        <p>Write a Flask route handler that accepts a POST request with JSON payload containing name and email, validates that email contains @, and returns a 201 Created response.</p>
        <a class="run-btn" href="/online-python-compiler.html">Open in Python IDE →</a>
      </div>
    </div>

    <!-- Section 14 -->
    <div class="section-title"><span class="num">14</span>Mini Quiz</div>
    <div class="section-body">
      <div class="faq-card">
        <h4><span style="background:rgba(48,105,152,0.15); color:#4b8bbe; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q1</span> What is the default port for Flask development server?</h4>
        <p>Port 5000 (http://127.0.0.1:5000).</p>
      </div>
      <div class="faq-card">
        <h4><span style="background:rgba(48,105,152,0.15); color:#4b8bbe; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q2</span> Which function converts Python dictionaries into HTTP JSON responses?</h4>
        <p><code>jsonify()</code> from Flask package.</p>
      </div>
    </div>

    <!-- Section 15 -->
    <div class="section-title"><span class="num">15</span>Quick Recap</div>
    <div class="section-body">
      <ul style="line-height:1.8;margin-left:20px;">
        <li>Flask is a lightweight Python WSGI web application framework</li>
        <li>View functions are connected to URLs using @app.route() decorator</li>
        <li>Request data is accessed via request.args, request.form, or request.get_json()</li>
        <li>Always use virtual environments and keep secret keys in environment configuration files</li>
      </ul>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on Flask 3.0+ (Python 3.12) · Last updated August 2026</span>
      </div>
    </div>

    <div class="nav-footer">
      ${prevChapter ? `<a href="${prevChapter.file}" class="nav-btn"><span class="label">← Previous Lesson</span><span class="title">${prevChapter.num}. ${prevChapter.title}</span></a>` : `<a href="/blog-flask.html" class="nav-btn"><span class="label">← Flask Overview</span><span class="title">Course Index</span></a>`}
      ${nextChapter ? `<a href="${nextChapter.file}" class="nav-btn" style="text-align:right;"><span class="label">Next Lesson →</span><span class="title">${nextChapter.num}. ${nextChapter.title}</span></a>` : `<a href="/blog-flask.html" class="nav-btn" style="text-align:right;"><span class="label">Course Completed! 🎉</span><span class="title">Flask Index</span></a>`}
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;

  const filePath = path.join(flaskDir, ch.file);
  fs.writeFileSync(filePath, chapterHtml, 'utf8');
  console.log(`🔥 Generated Flask Chapter: ${ch.file} (${(chapterHtml.length / 1024).toFixed(1)}KB)`);
});

console.log('✅ Generated all 41 Flask Masterclass chapter files in public/blog-flask/ successfully!');
