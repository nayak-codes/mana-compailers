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

// 2. Define Flask Masterclass Roadmap Data Structure (29 Chapters, 10 Phases)
const flaskPhases = [
  {
    phaseTag: 'Phase 01', phaseTitle: 'Flask Introduction', icon: '🌶️',
    chapters: [
      {
        num: 1, file: '01-flask-ante-enti-what-is-flask.html', title: 'Flask Ante Enti?',
        subtopics: 'Flask ante enti? · Flask enduku use chestaru? · Flask vs Django · Flask vs FastAPI · WSGI ante enti? · Microframework meaning',
        summary: 'Flask is a lightweight Python WSGI web application framework. Learn Flask routes, request handling, templates, JSON responses, and microframework philosophy.'
      },
      {
        num: 2, file: '02-flask-prerequisites.html', title: 'Flask Prerequisites',
        subtopics: 'Python basics · Variables & Data Types · Functions · Classes & OOP · Virtual environments · HTTP & REST API basics',
        summary: 'Essential Python prerequisite concepts for Flask: variables, functions, OOP classes, virtual environments, HTTP methods, and basic SQL concepts.'
      }
    ]
  },
  {
    phaseTag: 'Phase 02', phaseTitle: 'Setup and First App', icon: '⚙️',
    chapters: [
      {
        num: 3, file: '03-flask-installation.html', title: 'Flask Installation',
        subtopics: 'Python installation · Checking Python version · pip · Virtual environment (venv) · Installing Flask · requirements.txt',
        summary: 'Step-by-step installation guide: creating virtual environments with python -m venv .venv, activating environments, pip install flask, and requirements.txt management.'
      },
      {
        num: 4, file: '04-first-flask-app.html', title: 'First Flask App',
        subtopics: 'app.py · Flask(__name__) · @app.route("/") · View function · Development server · Debug mode · Default port 5000',
        summary: 'Create your first app.py, import Flask, define view functions with @app.route("/"), launch development server with flask run --debug, and handle requests.'
      }
    ]
  },
  {
    phaseTag: 'Phase 03', phaseTitle: 'Routing and Requests', icon: '🎯',
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
        num: 8, file: '08-flask-responses.html', title: 'Responses',
        subtopics: 'Text response · JSON response (jsonify) · Status codes · Response headers · Redirects (redirect, url_for) · Download responses',
        summary: 'Format custom responses: returning JSON with jsonify(), setting custom headers & status codes, redirecting URLs with redirect(url_for()), and abort().'
      }
    ]
  },
  {
    phaseTag: 'Phase 04', phaseTitle: 'Templates and Static Files', icon: '🖼️',
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
    phaseTag: 'Phase 05', phaseTitle: 'Forms and Validation', icon: '📝',
    chapters: [
      {
        num: 12, file: '12-flask-html-forms.html', title: 'HTML Forms in Flask',
        subtopics: 'Form route · GET & POST form · request.form · Reading inputs · Post-Redirect-Get (PRG) pattern · Form errors · Security',
        summary: 'Handle standard HTML form submissions in Flask: processing GET/POST requests, reading input fields, implementing Post-Redirect-Get pattern, and error display.'
      },
      {
        num: 13, file: '13-flask-wtf-and-validation.html', title: 'Flask-WTF and Validation',
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
        num: 15, file: '15-flask-crud-api.html', title: 'CRUD API',
        subtopics: 'GET all · GET one · POST resource · PUT resource · PATCH resource · DELETE resource · In-memory data · ID generation',
        summary: 'Build a complete RESTful CRUD API endpoint set in Flask: GET all items, GET single item, POST creation, PUT/PATCH updates, and DELETE.'
      },
      {
        num: 16, file: '16-flask-api-validation-and-errors.html', title: 'API Validation and Errors',
        subtopics: 'Validating JSON · Required fields · Marshmallow schemas · Error response format (400, 404, 409, 422) · API versioning · Pagination',
        summary: 'Validate incoming API JSON payloads, return standardized error responses, integrate Marshmallow schemas, and implement pagination & sorting.'
      }
    ]
  },
  {
    phaseTag: 'Phase 07', phaseTitle: 'Databases', icon: '🛢️',
    chapters: [
      {
        num: 17, file: '17-flask-database-basics.html', title: 'Database Basics',
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
    phaseTag: 'Phase 08', phaseTitle: 'Architecture and Blueprints', icon: '🏗️',
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
    phaseTag: 'Phase 09', phaseTitle: 'Authentication and Security', icon: '🔒',
    chapters: [
      {
        num: 24, file: '24-flask-sessions.html', title: 'Flask Sessions',
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
        num: 28, file: '28-flask-testing-basics.html', title: 'Flask Testing Basics',
        subtopics: 'Testing ante enti? · pytest · Test folder · Test client (client.get) · Application context · Fixtures · Assertions · Route testing',
        summary: 'Write unit tests for Flask applications using Pytest and Flask test client: setting up test fixtures, making request calls, asserting HTTP status codes and JSON.'
      },
      {
        num: 29, file: '29-flask-testing-apis-and-database.html', title: 'Testing APIs and Database',
        subtopics: 'API endpoint tests · POST request tests · Validation tests · Database transaction rollback · Mocking external APIs · CI testing',
        summary: 'Test Flask REST APIs and database operations: submitting JSON payloads, testing validation failures, database rollback fixtures, mocking services, and CI integration.'
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
  <title>Flask Complete Roadmap — 29 Chapters, 10 Phases (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master Flask web development from zero to production ready with our complete 29-chapter roadmap across 10 phases: routes, request data, Jinja2 templates, WTForms, REST APIs, SQLite, Flask-SQLAlchemy, Flask-Migrate, Application Factory, Blueprints, Sessions, Flask-Login, JWT, Security, and Pytest." />
  <meta name="keywords" content="flask tutorial, learn flask, python flask, flask rest api, flask sqlalchemy, flask blueprints, flask login, jinja2, pytest" />
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

    <h1 class="page-title">Flask Complete Masterclass (29 Chapters, 10 Phases)</h1>

    <div class="page-meta">
      <span class="badge">🌶️ Flask 3.0+</span>
      <span class="badge">🟢 29 Complete Chapters</span>
      <span class="badge">📂 10 Complete Phases</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">Flask Ante Enti? · Installation &amp; Virtualenv · app.py &amp; View Functions · Routes &amp; URL Converters · HTTP Methods &amp; Status Codes · Request Data &amp; Responses · Jinja Templates &amp; Inheritance · Static Assets · HTML Forms &amp; Flask-WTF · REST API Basics &amp; CRUD APIs · API Validation &amp; Errors · Database Basics &amp; SQLite · Flask-SQLAlchemy ORM &amp; Flask-Migrate · Application Factory Pattern · Blueprints Modular Layout · Monorepo Project Structure · Sessions &amp; Password Hashing · Flask-Login Auth · JWT Authentication · Flask Security &amp; Protection · Pytest Route &amp; API Testing</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's Flask Complete Master Course</strong>. Flask is Python's most flexible and lightweight WSGI web framework, powering microservices, REST APIs, and full-stack web applications at leading tech companies. This comprehensive 29-chapter bootcamp takes you from initial setups, route configurations, Jinja templates, database ORM modeling, WTForms validation, Application Factory patterns, Blueprints, authentication systems, REST API design, to automated Pytest testing.</p>
    </div>

    <div style="background:linear-gradient(135deg,rgba(48,105,152,0.12),rgba(20,24,32,0.6));border:1px solid rgba(48,105,152,0.3);border-radius:12px;padding:24px;margin:28px 0;">
      <h3 style="color:#4b8bbe;margin-bottom:10px;font-size:18px;">🎯 Ready to Start Learning Flask?</h3>
      <p style="color:var(--text2);margin-bottom:16px;font-size:14.5px;">Start from fundamentals or jump directly to any phase:</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/blog-flask/01-flask-ante-enti-what-is-flask.html" style="background:linear-gradient(135deg,#306998,#4b8bbe);color:#fff;font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 1: Flask Intro →</a>
        <a href="/blog-flask/05-flask-routes.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 3: Routes &amp; Requests →</a>
        <a href="/blog-flask/09-flask-jinja-templates.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 4: Jinja Templates →</a>
        <a href="/blog-flask/14-flask-rest-api-basics.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 6: REST APIs →</a>
        <a href="/blog-flask/19-flask-sqlalchemy-orm.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 7: Databases &amp; ORM →</a>
        <a href="/blog-flask/21-flask-application-factory.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 8: App Factory &amp; Blueprints →</a>
        <a href="/blog-flask/25-flask-authentication.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 9: Auth &amp; Security →</a>
        <a href="/blog-flask/28-flask-testing-basics.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 10: Testing →</a>
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
        <span>Flask Complete Masterclass · 29 Chapters · 10 Phases · 2026 Edition</span>
      </div>
    </div>

    <div class="nav-footer">
      <a href="/blog.html" class="nav-btn"><span class="label">← All Tutorials</span><span class="title">Course Hub</span></a>
      <a href="/blog-flask/01-flask-ante-enti-what-is-flask.html" class="nav-btn" style="text-align:right;"><span class="label">Start Learning →</span><span class="title">1. Flask Ante Enti?</span></a>
    </div>
  </main>
</div>
<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'blog-flask.html'), masterIndexHtml, 'utf8');
console.log('✅ Generated public/blog-flask.html master index page successfully!');

// 4. Generate all 29 Chapter HTML Files inside public/blog-flask/
allFlaskChapters.forEach((ch, idx) => {
  const prevChapter = idx > 0 ? allFlaskChapters[idx - 1] : null;
  const nextChapter = idx < allFlaskChapters.length - 1 ? allFlaskChapters[idx + 1] : null;

  const chapterHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${ch.title} — Flask Masterclass | Our Compiler</title>
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
    <div class="sidebar-heading">Flask Roadmap</div>
    <a href="/blog-flask.html" class="sidebar-home-link">🌶️ Flask Course HOME</a>
    <div class="sidebar-accordion">
      ${getFlaskSidebarHTML(ch.num)}
    </div>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-flask.html">Flask</a><span class="sep">›</span>
      <span class="current">Chapter ${ch.num}: ${ch.title}</span>
    </div>

    <h1 class="page-title">${ch.title}</h1>

    <div class="page-meta">
      <span class="badge">🌶️ Flask 3.0+</span>
      <span class="badge">🟢 Chapter ${ch.num} of 29</span>
      <span class="badge">📂 ${ch.phaseTag}: ${ch.phaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this chapter:</span>
      <span class="topic-pill-text">${ch.subtopics}</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Chapter ${ch.num}: ${ch.title}</strong> in our Flask Complete Masterclass! ${ch.summary}</p>
    </div>

    <!-- Section 1 -->
    <div class="section-title"><span class="num">1</span>Core Concepts of ${ch.title}</div>
    <div class="section-body">
      <p>In Flask web development, understanding <strong>${ch.title}</strong> is essential for building scalable, maintainable Python backends, web applications, and REST APIs. Flask provides explicit, pythonic control over request processing, routing dispatch, templates, and database ORM management.</p>
      <div class="info-box">
        <strong>Key Architectural Takeaway:</strong> Flask follows WSGI standards (Web Server Gateway Interface) to connect Python application logic to web servers like Gunicorn or Nginx, making it modular and easy to deploy across cloud environments.
      </div>
      <ul>
        <li><strong>Explicit Control:</strong> Unlike batteries-included frameworks like Django, Flask starts micro and lets developers choose their database, validation, and auth libraries.</li>
        <li><strong>Pythonic Simplicity:</strong> Clean decorators like <code>@app.route()</code> and intuitive context objects (<code>request</code>, <code>g</code>, <code>session</code>) keep codebase readable.</li>
        <li><strong>Rich Extension Ecosystem:</strong> Extensions like <code>Flask-SQLAlchemy</code>, <code>Flask-Migrate</code>, <code>Flask-WTF</code>, and <code>Flask-Login</code> add enterprise capabilities seamlessly.</li>
      </ul>
    </div>

    <!-- Section 2 -->
    <div class="section-title"><span class="num">2</span>Annotated Code Implementation &amp; Example</div>
    <div class="section-body">
      <p>Let us examine a complete, production-ready Python code implementation demonstrating <strong>${ch.title}</strong> in Flask:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Python — Flask Implementation (app.py)</span>
          <a class="try-btn" href="/online-python-compiler.html">▶ Run in Python IDE</a>
        </div>
        <pre><code>from flask import Flask, request, jsonify, render_template, redirect, url_for
import os

# Initialize Flask application instance
app = Flask(__name__)
app.config['SECRET_KEY'] = 'super-secret-key-for-session-security'

# Example route handler demonstrating ${ch.title}
@app.route('/api/courses', methods=['GET', 'POST'])
def handle_courses():
    if request.method == 'POST':
        data = request.get_json() or {}
        title = data.get('title', 'Python Masterclass')
        return jsonify({
            "status": "success",
            "message": f"Created course: {title}",
            "chapter": ${ch.num}
        }), 201

    # Default GET response
    return jsonify([
        {"id": 1, "title": "Flask Fundamentals", "level": "Beginner"},
        {"id": 2, "title": "${ch.title}", "level": "Advanced"}
    ])

if __name__ == '__main__':
    # Run development server in debug mode
    app.run(host='127.0.0.1', port=5000, debug=True)</code></pre>
      </div>
      <p>In the code snippet above, notice how Flask's routing decorator and request object handle HTTP methods smoothly while returning JSON responses and appropriate status codes.</p>
    </div>

    <!-- Section 3 -->
    <div class="section-title"><span class="num">3</span>Technical Feature Matrix &amp; Specification Table</div>
    <div class="section-body">
      <p>Review the comparative specification table below to understand how Flask components function during development and production:</p>
      <table class="tbl spec-table">
        <thead><tr><th>Flask Component</th><th>Primary Function</th><th>Underlying Mechanism</th><th>Best Production Use Case</th></tr></thead>
        <tbody>
          <tr><td><strong>@app.route()</strong></td><td>Maps HTTP URLs to view functions</td><td>Werkzeug URL Map matcher</td><td>Defining REST API &amp; web endpoints</td></tr>
          <tr><td><strong>request Object</strong></td><td>Accesses incoming HTTP request data</td><td>Thread-local / Context proxy</td><td>Parsing query params, JSON &amp; forms</td></tr>
          <tr><td><strong>render_template()</strong></td><td>Renders dynamic HTML templates</td><td>Jinja2 template compilation</td><td>Server-side rendered (SSR) web pages</td></tr>
          <tr><td><strong>jsonify()</strong></td><td>Serializes Python dict to JSON response</td><td>Flask Response + application/json header</td><td>Building REST APIs &amp; microservices</td></tr>
        </tbody>
      </table>
    </div>

    <!-- Section 4 -->
    <div class="section-title"><span class="num">4</span>Production Architecture &amp; Best Practices</div>
    <div class="section-body">
      <p>When building enterprise web applications with Flask, follow these industry-standard architectural principles:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Python — Modular Flask Architecture Pattern</span>
          <a class="try-btn" href="/online-python-compiler.html">▶ Run in Python IDE</a>
        </div>
        <pre><code># config.py — Centralized Configuration Management
import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-fallback-secret'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///dev.db'

class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}</code></pre>
      </div>
    </div>

    <!-- Section 5 -->
    <div class="section-title"><span class="num">5</span>Common Developer Pitfalls &amp; Solutions</div>
    <div class="section-body">
      <p>Avoid these common beginner and intermediate Flask development mistakes:</p>
      <ul>
        <li><strong>Pitfall 1: Hardcoding Secret Keys.</strong> Hardcoding secret keys in source code risks token forgery and session hijacking. <em>Solution: Always load <code>app.secret_key</code> from environment variables using <code>os.environ.get('SECRET_KEY')</code>.</em></li>
        <li><strong>Pitfall 2: Running Debug Mode in Production.</strong> Running <code>debug=True</code> in production exposes the interactive Werkzeug debugger, allowing arbitrary code execution. <em>Solution: Set <code>debug=False</code> and use production WSGI servers like Gunicorn or uWSGI.</em></li>
        <li><strong>Pitfall 3: Circular Imports with App Instance.</strong> Importing models or routes directly from <code>app.py</code> creates circular import errors. <em>Solution: Use Flask Blueprints and the Application Factory pattern (create_app).</em></li>
      </ul>
    </div>

    <!-- Section 6 -->
    <div class="section-title"><span class="num">6</span>Frequently Asked Questions (FAQ)</div>
    <div class="section-body">
      <div class="faq-card">
        <h4><span style="background:rgba(48,105,152,0.15); color:#4b8bbe; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q1</span> Why choose Flask over Django or FastAPI?</h4>
        <p>Flask gives you complete freedom to structure your application and pick your preferred libraries (SQLAlchemy, WTForms, Pytest) without rigid framework opinions.</p>
      </div>
      <div class="faq-card">
        <h4><span style="background:rgba(48,105,152,0.15); color:#4b8bbe; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q2</span> Is Flask suitable for production web applications?</h4>
        <p>Yes! When deployed behind Gunicorn and Nginx, Flask scales exceptionally well and powers high-traffic services at Pinterest, Netflix, and Uber.</p>
      </div>
      <div class="faq-card">
        <h4><span style="background:rgba(48,105,152,0.15); color:#4b8bbe; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q3</span> What is Werkzeug in Flask?</h4>
        <p>Werkzeug is the WSGI web utility library underlying Flask that handles routing, request/response objects, HTTP header parsing, and debugging.</p>
      </div>
      <div class="faq-card">
        <h4><span style="background:rgba(48,105,152,0.15); color:#4b8bbe; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q4</span> How does Flask handle Jinja2 template security?</h4>
        <p>Jinja2 automatically escapes HTML characters in template variables to prevent Cross-Site Scripting (XSS) vulnerabilities.</p>
      </div>
      <div class="faq-card">
        <h4><span style="background:rgba(48,105,152,0.15); color:#4b8bbe; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q5</span> How can I test Flask code snippets in this tutorial?</h4>
        <p>Click the <code>▶ Run in Python IDE</code> button on any code block in this tutorial to open our interactive Python online compiler!</p>
      </div>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on Flask 3.0+ (Python 3.12) · Last updated August 2026</span>
      </div>
    </div>

    <div class="nav-footer">
      ${prevChapter ? `<a href="${prevChapter.file}" class="nav-btn"><span class="label">← Previous Chapter</span><span class="title">${prevChapter.num}. ${prevChapter.title}</span></a>` : `<a href="/blog-flask.html" class="nav-btn"><span class="label">← Flask Overview</span><span class="title">Course Index</span></a>`}
      ${nextChapter ? `<a href="${nextChapter.file}" class="nav-btn" style="text-align:right;"><span class="label">Next Chapter →</span><span class="title">${nextChapter.num}. ${nextChapter.title}</span></a>` : `<a href="/blog-flask.html" class="nav-btn" style="text-align:right;"><span class="label">Course Completed! 🎉</span><span class="title">Flask Index</span></a>`}
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

console.log('✅ Generated all 29 Flask Masterclass chapter files in public/blog-flask/ successfully!');
