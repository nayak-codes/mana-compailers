const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const djangoDir = path.join(publicDir, 'blog-django');

if (!fs.existsSync(djangoDir)) {
  fs.mkdirSync(djangoDir, { recursive: true });
}

// 1. Create public/blog-django/style.css matching Django Dark Green Theme (#092e20 / #44b78b)
const cssStyleContent = `/* Specialized styling enhancements for Django tutorial lessons & Accordion — Django Green Theme */
:root {
  --django-theme: #092e20;
  --django-accent: #44b78b;
  --django-accent-hover: #10b981;
  --django-theme-bg: rgba(68, 183, 139, 0.12);
  --django-theme-border: rgba(68, 183, 139, 0.3);
}

body.lang-django {
  --accent: #44b78b;
  --accent-glow: rgba(68, 183, 139, 0.2);
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
  background: rgba(68, 183, 139, 0.08) !important;
  border: 1px solid rgba(68, 183, 139, 0.25) !important;
  border-radius: 99px !important;
  color: #44b78b !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  text-decoration: none !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sidebar-home-link:hover {
  background: rgba(68, 183, 139, 0.16) !important;
  border-color: #44b78b !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(68, 183, 139, 0.2);
}

.sidebar-home-link.active {
  background: linear-gradient(135deg, rgba(68, 183, 139, 0.18), rgba(9, 46, 32, 0.8)) !important;
  border-color: #44b78b !important;
  color: #44b78b !important;
  box-shadow: 0 0 12px rgba(68, 183, 139, 0.25);
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
  background: linear-gradient(135deg, rgba(68, 183, 139, 0.15) 0%, rgba(9, 46, 32, 0.6) 100%);
  border-color: #44b78b;
  box-shadow: 0 0 14px rgba(68, 183, 139, 0.18);
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
  background: rgba(68, 183, 139, 0.2);
  border-color: rgba(68, 183, 139, 0.4);
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
  color: #44b78b;
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
  background: rgba(68, 183, 139, 0.2);
  color: #44b78b;
  border-color: rgba(68, 183, 139, 0.35);
  font-weight: 700;
}

.accordion-chevron {
  color: var(--text3, #8b949e);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s;
  flex-shrink: 0;
}

.accordion-header.active .accordion-chevron {
  transform: rotate(90deg);
  color: #44b78b;
}

.accordion-content {
  display: none;
  flex-direction: column;
  padding: 4px 0 6px 10px;
  border-left: 2px solid rgba(68, 183, 139, 0.35);
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
  background: #092e20 !important;
  border: 1px solid #44b78b !important;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(68, 183, 139, 0.35);
}

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
  border-color: rgba(68, 183, 139, 0.4);
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
  background: rgba(68, 183, 139, 0.12);
  border: 1px solid rgba(68, 183, 139, 0.3);
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
  color: #44b78b;
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
  background: rgba(68, 183, 139, 0.08);
  border-color: rgba(68, 183, 139, 0.35);
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
  background: rgba(68, 183, 139, 0.15);
  color: #44b78b;
  font-size: 12px;
  font-weight: 800;
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.curriculum-lesson-row:hover .lesson-idx {
  background: #44b78b;
  color: #092e20;
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
  color: #44b78b;
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
  color: #44b78b;
  padding: 5px 12px;
  border-radius: 6px;
  background: rgba(68, 183, 139, 0.1);
  border: 1px solid rgba(68, 183, 139, 0.2);
  transition: all 0.18s ease;
}

.curriculum-lesson-row:hover .lesson-btn {
  background: #44b78b;
  color: #092e20;
}

.curriculum-lesson-row:hover .lesson-btn .arrow {
  transform: translateX(3px);
}

.lesson-btn .arrow {
  transition: transform 0.18s ease;
}

/* Light Theme overrides for Roadmap Cards and Accordion Sidebar */
body.light-theme .phase-roadmap-card {
  background: #ffffff;
  border-color: #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

body.light-theme .phase-roadmap-card:hover {
  border-color: #10b981;
  box-shadow: 0 6px 18px rgba(16, 185, 129, 0.12);
}

body.light-theme .phase-roadmap-header {
  border-bottom-color: #f1f5f9;
}

body.light-theme .phase-roadmap-icon {
  background: #d1fae5;
  border-color: #a7f3d0;
}

body.light-theme .phase-roadmap-tag {
  color: #059669;
}

body.light-theme .phase-roadmap-title {
  color: #0f172a;
}

body.light-theme .phase-roadmap-badge {
  background: #f1f5f9;
  border-color: #e2e8f0;
  color: #475569;
}

body.light-theme .phase-roadmap-desc {
  color: #64748b;
}

body.light-theme .curriculum-lesson-row {
  background: #f8fafc;
  border-color: #e2e8f0;
}

body.light-theme .curriculum-lesson-row:hover {
  background: #ecfdf5;
  border-color: #6ee7b7;
}

body.light-theme .lesson-idx {
  background: #d1fae5;
  color: #059669;
}

body.light-theme .lesson-title {
  color: #0f172a;
}

body.light-theme .lesson-subtopics {
  color: #64748b;
}

body.light-theme .lesson-btn {
  background: #d1fae5;
  border-color: #a7f3d0;
  color: #059669;
}

body.light-theme .curriculum-lesson-row:hover .lesson-btn {
  background: #059669;
  color: #ffffff;
}

body.light-theme .sidebar-home-link {
  background: #ecfdf5 !important;
  border-color: #a7f3d0 !important;
  color: #059669 !important;
}

body.light-theme .sidebar-home-link.active {
  background: #d1fae5 !important;
  border-color: #10b981 !important;
  color: #047857 !important;
}

body.light-theme .accordion-header {
  background: #ffffff !important;
  border-color: #e2e8f0 !important;
  color: #0f172a !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
}
body.light-theme .accordion-header:hover {
  background: #f8fafc !important;
  border-color: #cbd5e1 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06) !important;
}
body.light-theme .accordion-header.active {
  background: #ffffff !important;
  border: 1.5px solid #10b981 !important;
  color: #0f172a !important;
  box-shadow: 0 2px 10px rgba(16, 185, 129, 0.15) !important;
}
body.light-theme .phase-icon-box {
  background: #f1f5f9;
  border-color: #e2e8f0;
}
body.light-theme .accordion-header.active .phase-icon-box {
  background: #d1fae5 !important;
  border-color: #a7f3d0 !important;
}
body.light-theme .phase-tag {
  color: #64748b;
}
body.light-theme .accordion-header.active .phase-tag {
  color: #059669 !important;
}
body.light-theme .phase-title {
  color: #0f172a !important;
}
body.light-theme .phase-count-badge {
  background: #f1f5f9;
  color: #475569;
  border-color: #e2e8f0;
}
body.light-theme .accordion-header.active .phase-count-badge {
  background: #d1fae5 !important;
  color: #059669 !important;
  border-color: #6ee7b7 !important;
}
body.light-theme .accordion-chevron {
  color: #94a3b8;
}
body.light-theme .accordion-header.active .accordion-chevron {
  color: #059669 !important;
}
body.light-theme .accordion-content a {
  color: #475569;
}
body.light-theme .accordion-content a:hover {
  color: #0f172a;
  background: #f1f5f9;
}
body.light-theme .accordion-content a.active {
  background: #059669 !important;
  color: #ffffff !important;
  border-radius: 8px !important;
  font-weight: 700 !important;
}

.try-box {
  background: linear-gradient(135deg, rgba(68, 183, 139, 0.08) 0%, rgba(9, 46, 32, 0.6) 100%);
  border: 1px solid rgba(68, 183, 139, 0.25);
  border-radius: var(--radius, 12px);
  padding: 24px;
  margin: 32px 0;
}

.try-box .try-title {
  font-weight: 700;
  color: #44b78b;
  margin-bottom: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.try-box .run-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  background: linear-gradient(135deg, #092e20, #0c4b33);
  border: 1px solid #44b78b;
  color: #44b78b !important;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.2s, opacity 0.2s;
  box-shadow: 0 4px 14px rgba(68, 183, 139, 0.3);
}

.try-box .run-btn:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

.callout {
  background: #161b22;
  border: 1px solid #30363d;
  border-left: 4px solid #44b78b;
  padding: 18px 22px;
  border-radius: var(--radius, 12px);
  margin: 28px 0;
}

.callout .callout-title {
  font-weight: 700;
  color: #44b78b;
  margin-bottom: 8px;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.diagram-box {
  background: #0d1117;
  border: 1px solid #21262d;
  border-radius: 10px;
  padding: 18px 20px;
  margin: 20px 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #50fa7b;
  line-height: 1.55;
  white-space: pre !important;
  overflow-x: auto;
}

.faq-card {
  background: #141820;
  border: 1px solid #30363d;
  border-left: 4px solid #44b78b;
  border-radius: 10px;
  padding: 18px 22px;
  margin-bottom: 18px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, border-color 0.2s;
}

.faq-card:hover {
  transform: translateX(3px);
  border-color: #44b78b;
}

.faq-card h4 {
  color: #44b78b !important;
  font-size: 15.5px;
  font-weight: 700;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.faq-card p {
  color: #c9d1d9;
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
}

.author {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--border, #30363d);
  color: var(--text2, #8b949e);
  font-size: 13.5px;
}

.author .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #092e20, #0c4b33);
  border: 1px solid #44b78b;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #44b78b;
  font-weight: 800;
  font-size: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(68, 183, 139, 0.3);
}

body.light-theme .try-box {
  background: #ecfdf5;
  border-color: #a7f3d0;
}
body.light-theme .callout {
  background: #f8fafc;
  border-color: #cbd5e1;
  border-left-color: #059669;
}
body.light-theme .callout .callout-title {
  color: #059669;
}
body.light-theme .diagram-box {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #0f172a;
}
body.light-theme .faq-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #059669;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
body.light-theme .faq-card h4 {
  color: #059669 !important;
}
body.light-theme .faq-card p {
  color: #334155;
}
`;

fs.writeFileSync(path.join(djangoDir, 'style.css'), cssStyleContent, 'utf8');

// 2. Define Complete 30-Chapter Django Masterclass Data Structure across 10 Phases
const djangoPhases = [
  {
    phaseTag: 'Phase 01', phaseTitle: 'Django Introduction', icon: '🎸',
    chapters: [
      {
        num: 1, file: '01-what-is-django.html', title: 'Django Ante Enti?',
        subtopics: 'Django ante enti? · Django enduku use chestaru? · Django vs Flask · Django vs FastAPI · Django features · Full-stack framework ante enti? · MTV architecture · Batteries-included framework · Django use cases · Django advantages · Django limitations · Django ecosystem',
        summary: 'Django is a Python web framework used to build secure and database-backed web applications quickly. Django lo URL routing, views, templates, ORM, forms, authentication and admin panel built-in ga provide chestundi.',
        resource: 'DjangoMTV', method: 'Architecture', url: 'config/urls.py',
        reqEx: `Browser Request -> URL Dispatcher -> View -> Model/Database -> Template or JSON Response`,
        resEx: `HTML / JSON Response rendered back to client browser`,
        statusCode: 'MTV Executed',
        code: `# Django MTV Architecture Flow
# Request -> URL Dispatcher (urls.py) -> View (views.py) -> Model (models.py) -> Template (HTML)

from django.http import HttpResponse

def home(request):
    return HttpResponse("<h1>Welcome to Django!</h1>")`
      },
      {
        num: 2, file: '02-django-prerequisites.html', title: 'Django Prerequisites',
        subtopics: 'Python basics · Functions · Classes and OOP · Modules and packages · Exceptions · Lists and dictionaries · Decorators · Virtual environments · HTML and CSS · HTTP basics · SQL basics · Git basics · REST API basics',
        summary: 'Master essential prerequisites for Django development: Python OOP, functions, decorators, virtualenv, and HTTP fundamentals.',
        resource: 'PythonPrereqs', method: 'PythonOOP', url: 'tutorials/models.py',
        reqEx: `class Course:\n    def __init__(self, title, level):\n        self.title = title`,
        resEx: `Python Class & Function verified`,
        statusCode: 'Prerequisites Validated',
        code: `class Course:
    def __init__(self, id: int, title: string):
        self.id = id
        self.title = title

    def __str__(self):
        return f"{self.title} (ID: {self.id})"`
      }
    ]
  },
  {
    phaseTag: 'Phase 02', phaseTitle: 'Setup and First Project', icon: '⚙️',
    chapters: [
      {
        num: 3, file: '03-django-installation.html', title: 'Django Installation',
        subtopics: 'Python installation · Checking Python version · Creating virtual environment · Activating virtual environment · Installing Django · Checking Django version · Installing VS Code · Django extension · requirements.txt · Common setup errors',
        summary: 'Set up Python virtual environment (.venv) and install Django framework via pip.',
        resource: 'VenvPip', method: 'CLI', url: 'requirements.txt',
        reqEx: `python -m venv .venv\n.venv\\Scripts\\activate\npip install django\npython -m django --version`,
        resEx: `Django 5.0.x installed successfully`,
        statusCode: 'Environment Ready',
        code: `python -m venv .venv
# On Windows: .venv\\Scripts\\activate
# On macOS/Linux: source .venv/bin/activate
pip install django
python -m django --version`
      },
      {
        num: 4, file: '04-creating-a-django-project.html', title: 'Creating a Django Project',
        subtopics: 'django-admin · startproject · manage.py · Project package · settings.py · urls.py · asgi.py · wsgi.py · Running development server · Changing port · Stopping server · Project errors',
        summary: 'Bootstrap your first Django web application using `django-admin startproject` and launch the local dev server.',
        resource: 'StartProject', method: 'CLI', url: 'manage.py',
        reqEx: `django-admin startproject ourcompiler\ncd ourcompiler\npython manage.py runserver`,
        resEx: `Starting development server at http://127.0.0.1:8000/`,
        statusCode: 'HTTP 200 OK',
        code: `django-admin startproject ourcompiler
cd ourcompiler
python manage.py runserver`
      },
      {
        num: 5, file: '05-django-project-structure.html', title: 'Django Project Structure',
        subtopics: 'Project vs app · manage.py · settings.py · Root urls.py · asgi.py · wsgi.py · Creating an app · App models.py · App views.py · App urls.py · App admin.py · App apps.py · migrations · tests.py',
        summary: 'Understand Django project architecture, app modularization with `manage.py startapp`, settings configuration, and clean directory layout.',
        resource: 'AppStructure', method: 'Directory', url: 'ourcompiler/',
        reqEx: `python manage.py startapp tutorials`,
        resEx: `Created app directory 'tutorials' with models, views, admin, urls`,
        statusCode: 'App Registered',
        code: `ourcompiler/
├── manage.py
├── config/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
├── tutorials/
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── tests.py
├── templates/
├── static/
└── requirements.txt`
      }
    ]
  },
  {
    phaseTag: 'Phase 03', phaseTitle: 'URLs and Views', icon: '🛣️',
    chapters: [
      {
        num: 6, file: '06-url-routing.html', title: 'URL Routing',
        subtopics: 'URL dispatcher ante enti? · urlpatterns · path · include · URL names · Route parameters · Integer parameters · Slug parameters · Query parameters · App-level URLs · Namespace · URL reversing',
        summary: 'Map incoming HTTP request URLs to target view functions using Django path() routing dispatcher.',
        resource: 'UrlDispatcher', method: 'Routing', url: 'tutorials/urls.py',
        reqEx: `from django.urls import path\nfrom . import views\nurlpatterns = [ path("", views.home, name="home") ]`,
        resEx: `URL / matched to views.home handler`,
        statusCode: 'Route Matched',
        code: `# tutorials/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("courses/<int:course_id>/", views.course_detail, name="course_detail"),
]`
      },
      {
        num: 7, file: '07-function-based-views.html', title: 'Function-Based Views',
        subtopics: 'View ante enti? · Request object · Response object · HttpResponse · render · redirect · GET request · POST request · JSON response · Status codes · Request headers · View decorators',
        summary: 'Write Python Function-Based Views (FBV) processing HttpRequest and returning HttpResponse objects.',
        resource: 'HomeView', method: 'FBV', url: 'tutorials/views.py',
        reqEx: `from django.http import HttpResponse\ndef home(request):\n    return HttpResponse("Welcome to Django!")`,
        resEx: `Welcome to Django!`,
        statusCode: 'HttpResponse 200 OK',
        code: `from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to Django!")`
      },
      {
        num: 8, file: '08-request-and-response.html', title: 'Request and Response',
        subtopics: 'request.method · request.GET · request.POST · request.FILES · request.user · request.session · Request headers · Cookies · JSON request body · JsonResponse · Redirect response · File response · Streaming response',
        summary: 'Access HTTP headers, request parameters (GET, POST), cookies, sessions, and return JsonResponse objects.',
        resource: 'JsonResponseView', method: 'HTTPView', url: 'tutorials/views.py',
        reqEx: `from django.http import JsonResponse\ndef courses(request):\n    return JsonResponse({"courses": ["Python", "Django", "REST API"]})`,
        resEx: `JSON Output: {"courses": ["Python", "Django", "REST API"]}`,
        statusCode: 'JsonResponse 200 OK',
        code: `from django.http import JsonResponse

def courses(request):
    return JsonResponse({
        "courses": ["Python", "Django", "REST API"]
    })`
      }
    ]
  },
  {
    phaseTag: 'Phase 04', phaseTitle: 'Templates and Static Files', icon: '🎨',
    chapters: [
      {
        num: 9, file: '09-django-templates.html', title: 'Django Templates',
        subtopics: 'Template ante enti? · Templates directory · render · Template variables · Template tags · Template filters · Conditions · Loops · Comments · Escaping · Template context · Built-in filters',
        summary: 'Render dynamic HTML templates passing context dictionaries from views using Django Template Language (DTL).',
        resource: 'HomeTemplate', method: 'DTL', url: 'templates/tutorials/home.html',
        reqEx: `return render(request, "tutorials/home.html", {"title": "Django Tutorial"})\n<h1>{{ title }}</h1>`,
        resEx: `HTML Rendered: <h1>Django Tutorial</h1>`,
        statusCode: 'Template Rendered',
        code: `from django.shortcuts import render

def home(request):
    return render(request, "tutorials/home.html", {
        "title": "Django Tutorial",
        "courses": ["Python", "Django", "REST API"]
    })`
      },
      {
        num: 10, file: '10-template-inheritance.html', title: 'Template Inheritance',
        subtopics: 'Base template · {% extends %} · {% block %} · Header block · Sidebar block · Footer block · Includes · Reusable components · Active navigation · Layout architecture',
        summary: 'Create reusable layout templates with base.html, {% extends "base.html" %}, and custom {% block content %}.',
        resource: 'BaseTemplate', method: 'Inheritance', url: 'templates/base.html',
        reqEx: `<!DOCTYPE html>\n<html>\n<head><title>{% block title %}Our Compiler{% endblock %}</title></head>\n<body>{% block content %}{% endblock %}</body>\n</html>`,
        resEx: `Child page inherits outer header, sidebar, footer from base.html`,
        statusCode: 'Layout Inherited',
        code: `<!-- base.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{% block title %}Our Compiler{% endblock %}</title>
</head>
<body>
  <header><h1>Our Compiler Navbar</h1></header>
  <main>{% block content %}{% endblock %}</main>
</body>
</html>`
      },
      {
        num: 11, file: '11-static-and-media-files.html', title: 'Static and Media Files',
        subtopics: 'Static files ante enti? · CSS files · JavaScript files · Images · {% load static %} · STATIC_URL · STATICFILES_DIRS · collectstatic · Media files · User uploads · MEDIA_URL · MEDIA_ROOT · Static production setup',
        summary: 'Serve CSS stylesheet files, JavaScript bundles, images, and user-uploaded media files using {% load static %}.',
        resource: 'StaticLoader', method: 'StaticFiles', url: 'static/css/style.css',
        reqEx: `{% load static %}\n<link rel="stylesheet" href="{% static 'css/style.css' %}">`,
        resEx: `Static stylesheet style.css loaded by browser`,
        statusCode: 'Static Served',
        code: `{% load static %}
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="{% static 'css/style.css' %}">
  <script src="{% static 'js/app.js' %}"></script>
</head>
<body>
  <img src="{% static 'images/logo.png' %}" alt="Logo">
</body>
</html>`
      }
    ]
  },
  {
    phaseTag: 'Phase 05', phaseTitle: 'Models and Database (ORM)', icon: '🗄️',
    chapters: [
      {
        num: 12, file: '12-django-models.html', title: 'Django Models & Fields',
        subtopics: 'Model ante enti? · models.Model · CharField · TextField · IntegerField · DateTimeField · BooleanField · Field options (null, blank, default) · __str__ method',
        summary: 'Define Python database schema classes deriving from models.Model with type-safe fields and __str__() string representations.',
        resource: 'CourseModel', method: 'ORM', url: 'tutorials/models.py',
        reqEx: `class Course(models.Model):\n    title = models.CharField(max_length=200)\n    created_at = models.DateTimeField(auto_now_add=True)`,
        resEx: `Database table tutorials_course created via Django ORM`,
        statusCode: 'Model Schema Ready',
        code: `from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title`
      },
      {
        num: 13, file: '13-migrations.html', title: 'Migrations & Schema Changes',
        subtopics: 'Migrations ante enti? · makemigrations · migrate · Migration files · sqlmigrate · showmigrations · Reverting migrations · Schema synchronization',
        summary: 'Generate SQL schema migration scripts with makemigrations and apply schema changes to PostgreSQL/SQLite via migrate.',
        resource: 'MigrationCLI', method: 'Migrate', url: 'tutorials/migrations/',
        reqEx: `python manage.py makemigrations\npython manage.py migrate`,
        resEx: `Applying tutorials.0001_initial... OK`,
        statusCode: 'Migrations Applied',
        code: `python manage.py makemigrations
python manage.py migrate`
      },
      {
        num: 14, file: '14-orm-queries.html', title: 'Django ORM Queries & QuerySets',
        subtopics: 'QuerySet ante enti? · Model.objects.all() · filter() · get() · exclude() · order_by() · values() · count() · exists() · Lazy evaluation',
        summary: 'Query, filter, order, and aggregate database rows using Django Object-Relational Mapping (ORM) QuerySets.',
        resource: 'ORMQuery', method: 'QuerySet', url: 'tutorials/views.py',
        reqEx: `active_courses = Course.objects.filter(is_active=True).order_by('-created_at')`,
        resEx: `<QuerySet [<Course: Django Tutorial>, <Course: Python Basics>]>`,
        statusCode: 'Query Executed',
        code: `from .models import Course

def list_courses(request):
    courses = Course.objects.filter(is_active=True).order_by('-created_at')
    return render(request, "tutorials/list.html", {"courses": courses})`
      },
      {
        num: 15, file: '15-model-relationships.html', title: 'Model Relationships',
        subtopics: 'ForeignKey (One-to-Many) · ManyToManyField · OneToOneField · related_name · on_delete (CASCADE, SET_NULL) · Traversing relationships',
        summary: 'Model relational database foreign keys, many-to-many join tables, and one-to-one user profiles.',
        resource: 'LessonModel', method: 'Relationships', url: 'tutorials/models.py',
        reqEx: `course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')`,
        resEx: `Foreign key constraint created linking Lesson to Course`,
        statusCode: 'Relationship Formed',
        code: `class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=200)
    order = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.course.title} - {self.title}"`
      }
    ]
  },
  {
    phaseTag: 'Phase 06', phaseTitle: 'Admin Panel and Forms', icon: '📝',
    chapters: [
      {
        num: 16, file: '16-django-admin.html', title: 'Django Admin Panel Customization',
        subtopics: 'Admin panel ante enti? · createsuperuser · admin.site.register · ModelAdmin · list_display · list_filter · search_fields · ordering · inline models',
        summary: 'Register models in admin.py, create superuser credentials, and customize admin list tables with search filters.',
        resource: 'AdminPanel', method: 'Admin', url: 'tutorials/admin.py',
        reqEx: `python manage.py createsuperuser\n@admin.register(Course)\nclass CourseAdmin(admin.ModelAdmin): ...`,
        resEx: `Admin Panel accessible at http://127.0.0.1:8000/admin/`,
        statusCode: 'Admin Registered',
        code: `from django.contrib import admin
from .models import Course, Lesson

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('title',)

admin.site.register(Lesson)`
      },
      {
        num: 17, file: '17-django-forms.html', title: 'Django Forms & Validation',
        subtopics: 'Django Forms ante enti? · forms.Form · CharField · EmailField · Clean methods · Form validation · Form error messages · Rendering forms in HTML',
        summary: 'Create type-safe HTML form classes with built-in server-side data validation and error handling.',
        resource: 'ContactForm', method: 'FormValidation', url: 'tutorials/forms.py',
        reqEx: `class ContactForm(forms.Form):\n    email = forms.EmailField()\n    message = forms.CharField(widget=forms.Textarea)`,
        resEx: `Form validates input payload on form.is_valid() call`,
        statusCode: 'Form Validated',
        code: `from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100)
    email = forms.EmailField()
    message = forms.CharField(widget=forms.Textarea)`
      },
      {
        num: 18, file: '18-model-forms.html', title: 'ModelForms & File Uploads',
        subtopics: 'ModelForm ante enti? · Meta class · fields = "__all__" · Saving model forms (form.save()) · File uploads · ImageField · request.FILES',
        summary: 'Automatically map model attributes to form fields with ModelForm and handle user file/image uploads.',
        resource: 'CourseModelForm', method: 'ModelForm', url: 'tutorials/forms.py',
        reqEx: `class CourseForm(forms.ModelForm):\n    class Meta:\n        model = Course\n        fields = ['title', 'description']`,
        resEx: `Form automatically persists new record to database on form.save()`,
        statusCode: 'Model Saved',
        code: `from django import forms
from .models import Course

class CourseForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = ['title', 'description', 'is_active']`
      }
    ]
  },
  {
    phaseTag: 'Phase 07', phaseTitle: 'Authentication and Authorization', icon: '🔑',
    chapters: [
      {
        num: 19, file: '19-authentication.html', title: 'Built-in User Authentication',
        subtopics: 'Authentication ante enti? · User model · User registration · User login (authenticate, login) · User logout (logout) · @login_required decorator',
        summary: 'Implement secure user registration, password hashing, login, logout, and protected view decorators.',
        resource: 'AuthViews', method: 'Authentication', url: 'tutorials/views.py',
        reqEx: `@login_required\ndef dashboard(request):\n    return render(request, 'dashboard.html')`,
        resEx: `Unauthenticated request redirected to login page`,
        statusCode: 'User Authenticated',
        code: `from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

@login_required
def dashboard(request):
    return render(request, "tutorials/dashboard.html", {"user": request.user})`
      },
      {
        num: 20, file: '20-user-permissions.html', title: 'User Permissions & Groups',
        subtopics: 'Permissions ante enti? · Built-in model permissions (add, change, delete, view) · Custom permissions · User groups · @permission_required',
        summary: 'Assign fine-grained role-based permissions and user groups to restrict administrative action endpoints.',
        resource: 'PermissionGuard', method: 'Permissions', url: 'tutorials/views.py',
        reqEx: `@permission_required('tutorials.add_course')\ndef create_course(request): ...`,
        resEx: `HTTP 403 Forbidden for non-permitted users`,
        statusCode: 'Permission Enforced',
        code: `from django.contrib.auth.decorators import permission_required

@permission_required('tutorials.add_course', raise_exception=True)
def create_course(request):
    # Action restricted to staff with add_course permission
    pass`
      },
      {
        num: 21, file: '21-custom-user-model.html', title: 'Custom User Model & AbstractUser',
        subtopics: 'Why custom user model is needed · AbstractUser · AbstractBaseUser · AUTH_USER_MODEL setting · Email authentication · Extending user fields',
        summary: 'Extend Django default User model by creating custom AbstractUser class supporting email logins.',
        resource: 'CustomUser', method: 'AbstractUser', url: 'users/models.py',
        reqEx: `class User(AbstractUser):\n    bio = models.TextField(blank=True)\nAUTH_USER_MODEL = 'users.User'`,
        resEx: `Custom User table active across entire Django project`,
        statusCode: 'User Model Replaced',
        code: `from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    bio = models.TextField(blank=True)
    is_student = models.BooleanField(default=True)`
      }
    ]
  },
  {
    phaseTag: 'Phase 08', phaseTitle: 'Class-Based Views (CBV)', icon: '🏛️',
    chapters: [
      {
        num: 22, file: '22-class-based-views.html', title: 'Generic Class-Based Views',
        subtopics: 'CBV ante enti? · View base class · ListView · DetailView · CreateView · UpdateView · DeleteView · template_name · success_url',
        summary: 'Reduce boilerplate code using Django generic Class-Based Views (ListView, DetailView, CreateView, DeleteView).',
        resource: 'CourseListView', method: 'CBV', url: 'tutorials/views.py',
        reqEx: `class CourseListView(ListView):\n    model = Course\n    template_name = 'course_list.html'`,
        resEx: `ListView automatically fetches objects and passes to template`,
        statusCode: 'CBV Rendered',
        code: `from django.views.generic import ListView, DetailView
from .models import Course

class CourseListView(ListView):
    model = Course
    template_name = "tutorials/course_list.html"
    context_object_name = "courses"

class CourseDetailView(DetailView):
    model = Course
    template_name = "tutorials/course_detail.html"`
      }
    ]
  },
  {
    phaseTag: 'Phase 09', phaseTitle: 'Django REST Framework (DRF)', icon: '🌐',
    chapters: [
      {
        num: 23, file: '23-drf-introduction.html', title: 'Django REST Framework (DRF) Intro',
        subtopics: 'DRF ante enti? · REST API in Django · djangorestframework installation · INSTALLED_APPS · Browsable API · API response format',
        summary: 'Build REST APIs in Django using Django REST Framework (DRF) and browsable API interfaces.',
        resource: 'DRFSetup', method: 'RESTAPI', url: 'config/settings.py',
        reqEx: `pip install djangorestframework\nINSTALLED_APPS = [..., 'rest_framework']`,
        resEx: `DRF Browsable API active at /api/courses/`,
        statusCode: 'DRF Enabled',
        code: `# settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'rest_framework',
    'tutorials',
]`
      },
      {
        num: 24, file: '24-drf-serializers.html', title: 'DRF Serializers & ModelSerializers',
        subtopics: 'Serializer ante enti? · serializers.Serializer · ModelSerializer · Serializer fields · Validation · Deserialization · JSON output',
        summary: 'Convert complex Django Model instances into native Python datatypes and JSON using DRF ModelSerializers.',
        resource: 'CourseSerializer', method: 'Serializer', url: 'tutorials/serializers.py',
        reqEx: `class CourseSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Course\n        fields = '__all__'`,
        resEx: `JSON payload: {"id": 1, "title": "Django Tutorial"}`,
        statusCode: 'Serialized',
        code: `from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'created_at']`
      },
      {
        num: 25, file: '25-drf-viewsets.html', title: 'DRF APIViews, Generic Views & ViewSets',
        subtopics: 'APIView · @api_view decorator · GenericAPIView · ModelViewSet · DefaultRouter · CRUD API endpoints in 5 lines',
        summary: 'Expose full RESTful CRUD API endpoints automatically using DRF ModelViewSet and DefaultRouter.',
        resource: 'CourseViewSet', method: 'ViewSet', url: 'tutorials/api.py',
        reqEx: `class CourseViewSet(viewsets.ModelViewSet):\n    queryset = Course.objects.all()\n    serializer_class = CourseSerializer`,
        resEx: `Full CRUD REST endpoints (/api/courses/ GET, POST, PUT, DELETE)`,
        statusCode: 'API Endpoints Live',
        code: `from rest_framework import viewsets
from .models import Course
from .serializers import CourseSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer`
      },
      {
        num: 26, file: '26-drf-authentication.html', title: 'DRF Authentication (Token, JWT & Permissions)',
        subtopics: 'DRF Authentication · SessionAuthentication · TokenAuthentication · djangorestframework-simplejwt · IsAuthenticated permission',
        summary: 'Secure REST APIs using Bearer JWT tokens (SimpleJWT) and IsAuthenticated permissions.',
        resource: 'DRFAuth', method: 'JWT', url: 'config/settings.py',
        reqEx: `REST_FRAMEWORK = { 'DEFAULT_AUTHENTICATION_CLASSES': ['rest_framework_simplejwt.authentication.JWTAuthentication'] }`,
        resEx: `Authorization: Bearer <access_token> required for protected endpoints`,
        statusCode: 'JWT Authentication Active',
        code: `from rest_framework.permissions import IsAuthenticated

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]`
      }
    ]
  },
  {
    phaseTag: 'Phase 10', phaseTitle: 'Middleware, Testing & Production', icon: '⚡',
    chapters: [
      {
        num: 27, file: '27-middleware-and-signals.html', title: 'Custom Middleware & Signal Handlers',
        subtopics: 'Middleware ante enti? · __call__ method · Process request & response · Django Signals · post_save · post_delete · Receiver decorator',
        summary: 'Intercept requests globally with custom Middleware and trigger automatic background hooks via Django Signals.',
        resource: 'CustomMiddleware', method: 'Middleware', url: 'tutorials/middleware.py',
        reqEx: `class TimingMiddleware:\n    def __call__(self, request): ...`,
        resEx: `Request latency calculated & logged for every request`,
        statusCode: 'Middleware Injected',
        code: `class AuditMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response`
      },
      {
        num: 28, file: '28-django-testing.html', title: 'Django Unit Testing',
        subtopics: 'Why testing is needed · TestCase · self.client.get() · Assert status code · Assert template used · Testing models · Testing views · Testing DRF APIs',
        summary: 'Write automated unit tests for models, views, and REST APIs using Django TestCase and APIClient.',
        resource: 'CourseTestCase', method: 'UnitTest', url: 'tutorials/tests.py',
        reqEx: `class CourseTestCase(TestCase):\n    def test_course_creation(self): self.assertEqual(response.status_code, 200)`,
        resEx: `Ran 2 tests in 0.05s OK`,
        statusCode: 'Tests Passed',
        code: `from django.test import TestCase
from .models import Course

class CourseTestCase(TestCase):
    def test_course_creation(self):
        course = Course.objects.create(title="Django", description="Mastering Django")
        self.assertEqual(str(course), "Django")`
      },
      {
        num: 29, file: '29-performance-optimization.html', title: 'Performance Optimization',
        subtopics: 'N+1 query problem · select_related (joins) · prefetch_related · QuerySet caching · Database indexing · Redis caching',
        summary: 'Eliminate N+1 database queries using select_related() and prefetch_related(), and cache query results in Redis.',
        resource: 'OptimizedQuery', method: 'Performance', url: 'tutorials/views.py',
        reqEx: `lessons = Lesson.objects.select_related('course').all()`,
        resEx: `SQL Query Count reduced from 51 queries to 1 JOIN query`,
        statusCode: 'Queries Optimized',
        code: `# Optimized SQL Query with select_related
lessons = Lesson.objects.select_related('course').filter(course__is_active=True)`
      },
      {
        num: 30, file: '30-deployment.html', title: 'Production Deployment',
        subtopics: 'Production checklist · DEBUG = False · ALLOWED_HOSTS · Gunicorn WSGI server · NGINX reverse proxy · PostgreSQL database · Environment variables (.env) · Docker deployment',
        summary: 'Deploy production Django web applications using Gunicorn WSGI, NGINX, PostgreSQL, and Docker containerization.',
        resource: 'ProductionDeploy', method: 'WSGI', url: 'config/wsgi.py',
        reqEx: `gunicorn config.wsgi:application --bind 0.0.0.0:8000`,
        resEx: `Gunicorn WSGI server serving Django application behind NGINX`,
        statusCode: 'Production Deployed',
        code: `# Dockerfile for Django Application
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]`
      }
    ]
  }
];

// Helper to generate Accordion Sidebar HTML
function getDjangoSidebarHTML(activeNum) {
  let sidebarAccHTML = '';
  djangoPhases.forEach(phase => {
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
        ${phase.chapters.map(c => `<a href="/blog-django/${c.file}" class="${c.num === activeNum ? 'active' : ''}">${c.num}. ${c.title}</a>`).join('')}
      </div>`;
  });
  return sidebarAccHTML;
}

// 3. Generate public/blog-django.html (Master Index Page)
const allDjangoChapters = [];
djangoPhases.forEach(p => p.chapters.forEach(c => allDjangoChapters.push({ ...c, phaseTag: p.phaseTag, phaseTitle: p.phaseTitle, icon: p.icon })));

const masterIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Django Complete Roadmap — 30 Chapters, 10 Phases (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master Django 5.0+ web development, MTV architecture, Models, ORM QuerySets, Admin Panel, Views, Templates, Forms, Authentication, Class-Based Views, Django REST Framework (DRF), Testing & Production Deployment with our complete 30-chapter bootcamp across 10 phases." />
  <meta name="keywords" content="django tutorial, learn django, django roadmap, django orm, django rest framework, drf, python web framework, django admin, django views, django templates" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-django.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-django/style.css" />
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
<body class="lang-django">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-django.html" class="active">Django</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rest-api.html">REST API</a>
  <a href="/blog-graphql.html">GraphQL</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-nodejs.html">Node.js</a>
  <a href="/blog-react.html">React</a>
  <a href="/blog-angular.html">Angular</a>
  <a href="/blog-vue.html">Vue.js</a>
  <a href="/blog-nextjs.html">Next.js</a>
  <a href="/blog-flask.html">Flask</a>
  <a href="/blog-mysql.html">MySQL</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-css.html">CSS</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">Django Roadmap</div>
    <a href="/blog-django.html" class="sidebar-home-link active">🎸 Django Course HOME</a>
    <div class="sidebar-accordion">
      ${getDjangoSidebarHTML(0)}
    </div>
    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/online-python-compiler.html" style="color:#44b78b;font-weight:700;">▶ Run Code in IDE</a>
    <a href="/blog.html">📚 All Tutorials</a>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">Django Complete Roadmap</span>
    </div>

    <h1 class="page-title">Django Complete Masterclass (30 Chapters, 10 Phases)</h1>

    <div class="page-meta">
      <span class="badge">🎸 Django 5.0+</span>
      <span class="badge">🟢 30 Complete Chapters</span>
      <span class="badge">📂 10 Complete Phases</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">What is Django? · Prerequisites · Installation &amp; Virtualenv · Project Structure · URL Routing · Function Views · Request &amp; Response · Django Templates · Template Inheritance · Static &amp; Media Files · Models &amp; Fields · Migrations · ORM QuerySets · Model Relationships · Admin Panel · Forms &amp; ModelForms · Authentication · CBVs · DRF &amp; Serializers · Middleware, Testing &amp; Deployment</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's Django Complete Master Course</strong>. Django is the batteries-included Python web framework used to build secure, database-backed web applications rapidly. This comprehensive 30-chapter bootcamp guides you through MTV architecture, ORM models, administration, views, templates, forms, authentication, Class-Based Views, Django REST Framework (DRF), and production deployment.</p>
    </div>

    <div style="background:linear-gradient(135deg,rgba(68,183,139,0.12),rgba(9,46,32,0.6));border:1px solid rgba(68,183,139,0.3);border-radius:12px;padding:24px;margin:28px 0;">
      <h3 style="color:#44b78b;margin-bottom:10px;font-size:18px;">🎯 Ready to Master Django Web Engineering?</h3>
      <p style="color:var(--text2);margin-bottom:16px;font-size:14.5px;">Choose where to start: explore Django introduction, project setup, URL routing, ORM models, forms, or Django REST Framework:</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/blog-django/01-what-is-django.html" style="background:linear-gradient(135deg,#092e20,#0c4b33);border:1px solid #44b78b;color:#44b78b;font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 1: Django Intro →</a>
        <a href="/blog-django/06-url-routing.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 3: URLs &amp; Views →</a>
        <a href="/blog-django/12-django-models.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 5: Models &amp; ORM →</a>
        <a href="/blog-django/16-django-admin.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 6: Admin Panel →</a>
        <a href="/blog-django/23-drf-introduction.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 9: Django REST Framework →</a>
        <a href="/blog-django/30-deployment.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 10: Production Deployment →</a>
      </div>
    </div>

    <div class="section-title"><span class="num">📚</span> Master Course Curriculum</div>
    <div class="curriculum-roadmap-container">
      ${djangoPhases.map(phase => `
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
              <a href="/blog-django/${ch.file}" class="curriculum-lesson-row">
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
        <span>Django Complete Masterclass · 30 Chapters · 10 Phases · 2026 Edition</span>
      </div>
    </div>

    <div class="nav-footer">
      <a href="/blog.html" class="nav-btn"><span class="label">← All Tutorials</span><span class="title">Course Hub</span></a>
      <a href="/blog-django/01-what-is-django.html" class="nav-btn" style="text-align:right;"><span class="label">Start Learning →</span><span class="title">1. Django Ante Enti?</span></a>
    </div>
  </main>
</div>
<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'blog-django.html'), masterIndexHtml, 'utf8');
console.log('✅ Generated public/blog-django.html master index page successfully!');

// 4. Generate all 30 Chapter HTML Files inside public/blog-django/ adhering strictly to the 16-Section Lesson Layout
allDjangoChapters.forEach((ch, idx) => {
  const prevChapter = idx > 0 ? allDjangoChapters[idx - 1] : null;
  const nextChapter = idx < allDjangoChapters.length - 1 ? allDjangoChapters[idx + 1] : null;

  const chapterHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Django — ${ch.title} | Our Compiler</title>
  <meta name="description" content="Complete Django Chapter ${ch.num}: ${ch.title}. Learn ${ch.subtopics} with practical Python code examples, Django templates, ORM models, views, and step-by-step walkthroughs." />
  <meta name="keywords" content="django tutorial, learn django, ${ch.title.toLowerCase()}, django orm, django views" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-django/${ch.file}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-django/style.css" />
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
        });
      });
    })();
  </script>
</head>
<body class="lang-django">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-django.html" class="active">Django</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rest-api.html">REST API</a>
  <a href="/blog-graphql.html">GraphQL</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-nodejs.html">Node.js</a>
  <a href="/blog-react.html">React</a>
  <a href="/blog-angular.html">Angular</a>
  <a href="/blog-vue.html">Vue.js</a>
  <a href="/blog-nextjs.html">Next.js</a>
  <a href="/blog-flask.html">Flask</a>
  <a href="/blog-mysql.html">MySQL</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-css.html">CSS</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">Django Tutorial</div>
    <a href="/blog-django.html" class="sidebar-home-link">🎸 Django HOME</a>
    <div class="sidebar-accordion">
      ${getDjangoSidebarHTML(ch.num)}
    </div>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-django.html">Django</a><span class="sep">›</span>
      <span class="current">Django — ${ch.title}</span>
    </div>

    <h1 class="page-title">Django — ${ch.title}</h1>

    <div class="page-meta">
      <span class="badge">🎸 Django 5.0+</span>
      <span class="badge">🟢 Chapter ${ch.num} of ${allDjangoChapters.length}</span>
      <span class="badge">📂 ${ch.phaseTag}: ${ch.phaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this chapter:</span>
      <span class="topic-pill-text">${ch.subtopics}</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Django — ${ch.title}</strong> in our Django Complete Masterclass! ${ch.summary}</p>
    </div>

    <!-- 1. Simple introduction -->
    <div class="section-title"><span class="num">1</span>Simple Introduction</div>
    <div class="section-body">
      <p>In Django web development, understanding <strong>${ch.title}</strong> is essential for building robust, secure, database-driven Python web applications. Django follows MTV (Model-Template-View) architecture to cleanly decouple data models, business logic, and UI templates.</p>
    </div>

    <!-- 2. What you will learn -->
    <div class="section-title"><span class="num">2</span>What You Will Learn</div>
    <div class="section-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:16px 20px;margin-bottom:24px;">
        <strong style="color:#44b78b;display:block;margin-bottom:10px;">📚 Learning Objectives:</strong>
        <ul style="margin:0 0 0 20px;line-height:1.8;">
          <li>Master core Django mechanisms and Python patterns for <strong>${ch.title}</strong></li>
          <li>Understand request-response lifecycles, MTV flow, ORM models, and templates</li>
          <li>Implement clean, production-ready Django views, forms, models, and serializers</li>
          <li>Avoid common SQL N+1 pitfalls, security flaws, and configuration mistakes</li>
        </ul>
      </div>
    </div>

    <!-- 3. Why this concept is useful -->
    <div class="section-title"><span class="num">3</span>Why ${ch.title} is Useful</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">💡 Practical Utility</div>
        <p>Django is a Python web framework used to build secure and database-backed web applications quickly. Django lo URL routing, views, templates, ORM, forms, authentication and admin panel built-in ga provide chestundi. Mastering <strong>${ch.title}</strong> accelerates backend development.</p>
      </div>
    </div>

    <!-- 4. Required Component / Model / View design -->
    <div class="section-title"><span class="num">4</span>Required Component / Model / View Design</div>
    <div class="section-body">
      <p>Target Class / Module: <code>${ch.resource}</code>. Configured inside Django app modules (e.g. <code>models.py</code>, <code>views.py</code>, <code>urls.py</code>, <code>forms.py</code>, <code>serializers.py</code>).</p>
    </div>

    <!-- 5. Django syntax / mechanism -->
    <div class="section-title"><span class="num">5</span>Syntax &amp; Mechanism</div>
    <div class="section-body">
      <p>Mechanism: <code style="color:#44b78b;font-weight:700;">${ch.method}</code>. File Path: <code>${ch.url}</code>.</p>
    </div>

    <!-- 6. Basic example -->
    <div class="section-title"><span class="num">6</span>Basic Example Code</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header"><span class="lang-tag">Django Code (Python)</span></div>
        <pre><code>${ch.code}</code></pre>
      </div>
    </div>

    <!-- 7. Browser output -->
    <div class="section-title"><span class="num">7</span>Browser Output / Response Payload</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header"><span class="lang-tag">UI Render / JSON Output</span></div>
        <pre><code>${ch.resEx}</code></pre>
      </div>
    </div>

    <!-- 8. Line-by-line explanation -->
    <div class="section-title"><span class="num">8</span>Line-by-Line Explanation / Request Flow</div>
    <div class="section-body">
      <div class="diagram-box">Browser Request -> WSGI/ASGI Server -> URL Dispatcher (urls.py) -> View Handler (views.py) -> Model Query (models.py) -> Template Engine / Serializer -> HTTP Response</div>
    </div>

    <!-- 9. Practical example -->
    <div class="section-title"><span class="num">9</span>Practical Example Usage</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header"><span class="lang-tag">Command / Template / Invocation</span></div>
        <pre><code>${ch.reqEx}</code></pre>
      </div>
    </div>

    <!-- 10. Concept comparison -->
    <div class="section-title"><span class="num">10</span>Concept Comparison / MTV vs MVC</div>
    <div class="section-body">
      <div class="card" style="background:var(--bg2);padding:14px 18px;border-radius:8px;margin:16px 0;border-left:4px solid #44b78b;">
        <strong style="color:#44b78b;">Verification Status: ${ch.statusCode}</strong>
        <p style="margin-top:6px;font-size:13.5px;color:var(--text2);">Django's MTV architecture maps Model to database table, Template to HTML presentation layer, and View to business logic handler.</p>
      </div>
    </div>

    <!-- 11. Common mistakes -->
    <div class="section-title"><span class="num">11</span>Common Mistakes &amp; Anti-Patterns</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">⚠️ Anti-Patterns to Avoid</div>
        <ul style="margin:8px 0 0 18px;line-height:1.7;">
          <li>Performing N+1 database queries inside template loops instead of using <code>select_related()</code> or <code>prefetch_related()</code>.</li>
          <li>Forgetting to run <code>makemigrations</code> and <code>migrate</code> after modifying <code>models.py</code>.</li>
          <li>Leaving <code>DEBUG = True</code> and <code>SECRET_KEY</code> exposed in production settings.</li>
          <li>Putting heavy database or business logic inside Django template tags instead of view functions or model methods.</li>
          <li>Failing to validate user input forms with <code>form.is_valid()</code> before persisting records to database.</li>
        </ul>
      </div>
    </div>

    <!-- 12. Coding challenge -->
    <div class="section-title"><span class="num">12</span>Coding Challenge</div>
    <div class="section-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:18px 22px;margin-bottom:24px;">
        <strong style="color:#44b78b;display:block;margin-bottom:8px;">🎯 Hands-On Challenge:</strong>
        <p>Build a Django view and template for <strong>${ch.title}</strong> inside your local <code>ourcompiler</code> app. Run <code>python manage.py runserver</code> and test in your browser at <code>http://127.0.0.1:8000/</code>!</p>
      </div>
    </div>

    <!-- 13. Mini quiz -->
    <div class="section-title"><span class="num">13</span>Mini Quiz</div>
    <div class="section-body">
      <div class="faq-card">
        <h4>❓ Question: What is the primary role of ${ch.title} in Django?</h4>
        <p><strong>Answer:</strong> It provides structured Python mechanisms for ${ch.subtopics.split('·')[0].trim()}, streamlining secure web development.</p>
      </div>
    </div>

    <!-- 14. Quick recap -->
    <div class="section-title"><span class="num">14</span>Quick Recap</div>
    <div class="section-body">
      <ul style="line-height:1.8;margin-left:20px;">
        <li>${ch.summary}</li>
        <li>Django follows the Model-Template-View (MTV) architectural pattern.</li>
        <li>Utilize Django built-in ORM, admin panel, forms, and template tags.</li>
      </ul>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on Django 5.0+ Standards · Last updated August 2026</span>
      </div>
    </div>

    <!-- 15 & 16. Previous & Next Lesson Navigation -->
    <div class="nav-footer">
      ${prevChapter ? `<a href="${prevChapter.file}" class="nav-btn"><span class="label">← Previous Lesson</span><span class="title">${prevChapter.num}. ${prevChapter.title}</span></a>` : `<a href="/blog-django.html" class="nav-btn"><span class="label">← Django Overview</span><span class="title">Course Index</span></a>`}
      ${nextChapter ? `<a href="${nextChapter.file}" class="nav-btn" style="text-align:right;"><span class="label">Next Lesson →</span><span class="title">${nextChapter.num}. ${nextChapter.title}</span></a>` : `<a href="/blog-django.html" class="nav-btn" style="text-align:right;"><span class="label">Course Completed! 🎉</span><span class="title">Django Index</span></a>`}
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;

  const filePath = path.join(djangoDir, ch.file);
  fs.writeFileSync(filePath, chapterHtml, 'utf8');
  console.log(`🔥 Generated Django Chapter: ${ch.file} (${(chapterHtml.length / 1024).toFixed(1)}KB)`);
});

console.log('✅ Generated all 30 Django Masterclass chapter files in public/blog-django/ successfully!');
