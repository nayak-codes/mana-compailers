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

// 2. Define Complete 45-Chapter Django Masterclass Data Structure across 15 Phases
const djangoPhases = [
  {
    phaseTag: 'Phase 01', phaseTitle: 'Django Basics & Setup', icon: '🎸',
    chapters: [
      {
        num: 1, file: '01-what-is-django.html', title: 'What is Django?',
        subtopics: 'Django ante enti? · Django enduku use chestaru? · Django vs Flask · Django vs FastAPI · Django features · Full-stack framework ante enti? · MTV architecture · Batteries-included framework · Django use cases · Django advantages · Django limitations · Django ecosystem',
        summary: 'Django is a Python web framework used to build secure and database-backed web applications quickly. Django lo URL routing, views, templates, ORM, forms, authentication and admin panel built-in ga provide chestundi.',
        resource: 'DjangoMTV', method: 'Architecture', url: 'config/urls.py',
        reqEx: `Browser Request -> URL Dispatcher -> View -> Model/Database -> Template or JSON Response`,
        resEx: `HTML / JSON Response rendered back to client browser`,
        statusCode: 'MTV Executed',
        code: `# Django MTV Architecture Flow
from django.http import HttpResponse

def home(request):
    return HttpResponse("<h1>Welcome to Django!</h1>")`
      },
      {
        num: 2, file: '02-django-prerequisites.html', title: 'Python & Web Prerequisites',
        subtopics: 'Python basics · Functions · Classes and OOP · Modules and packages · Exceptions · Lists and dictionaries · Decorators · Virtual environments · HTML and CSS · HTTP basics · SQL basics · Git basics · REST API basics',
        summary: 'Master essential prerequisites for Django development: Python OOP, functions, decorators, virtualenv, and HTTP fundamentals.',
        resource: 'PythonPrereqs', method: 'PythonOOP', url: 'tutorials/models.py',
        reqEx: `class Course:\n    def __init__(self, title, level):\n        self.title = title`,
        resEx: `Python Class & Function verified`,
        statusCode: 'Prerequisites Validated',
        code: `class Course:
    def __init__(self, id: int, title: str):
        self.id = id
        self.title = title

    def __str__(self):
        return f"{self.title} (ID: {self.id})"`
      },
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
        num: 5, file: '05-django-project-structure.html', title: 'Project Structure',
        subtopics: 'Project vs app · manage.py · settings.py · Root urls.py · asgi.py · wsgi.py · App models.py · App views.py · App urls.py · App admin.py · App apps.py · migrations · tests.py',
        summary: 'Understand Django project architecture, app modularization, settings configuration, and clean directory layout.',
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
      },
      {
        num: 6, file: '06-creating-django-apps.html', title: 'Creating Django Apps',
        subtopics: 'App concept · startapp · INSTALLED_APPS · Modular design · Reusable apps · App config · App registry',
        summary: 'Create decoupled, reusable Django apps using `python manage.py startapp` and register them in INSTALLED_APPS.',
        resource: 'StartApp', method: 'AppRegistration', url: 'config/settings.py',
        reqEx: `python manage.py startapp courses\nINSTALLED_APPS = [..., 'courses']`,
        resEx: `New app 'courses' registered in project settings`,
        statusCode: 'App Installed',
        code: `# config/settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'tutorials',
    'courses',
]`
      }
    ]
  },
  {
    phaseTag: 'Phase 02', phaseTitle: 'Routing & Views', icon: '🛣️',
    chapters: [
      {
        num: 7, file: '07-url-routing.html', title: 'URL Routing',
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
        num: 8, file: '08-function-based-views.html', title: 'Function-Based Views',
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
        num: 9, file: '09-request-and-response.html', title: 'Request & Response',
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
    phaseTag: 'Phase 03', phaseTitle: 'Templates & Static Files', icon: '🎨',
    chapters: [
      {
        num: 10, file: '10-django-templates.html', title: 'Django Templates',
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
        num: 11, file: '11-template-inheritance.html', title: 'Template Inheritance',
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
        num: 12, file: '12-static-and-media-files.html', title: 'Static & Media Files',
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
    phaseTag: 'Phase 04', phaseTitle: 'Models, Database & ORM', icon: '🗄️',
    chapters: [
      {
        num: 13, file: '13-models.html', title: 'Models',
        subtopics: 'Model ante enti? · Model class · Database table · Model fields · Primary key · CharField · TextField · IntegerField · BooleanField · DateTimeField · DecimalField · SlugField · FileField · ImageField · Model metadata',
        summary: 'Define Python database table structures deriving from models.Model with type-safe fields and metadata options.',
        resource: 'CourseModel', method: 'ORM', url: 'tutorials/models.py',
        reqEx: `class Course(models.Model):\n    title = models.CharField(max_length=150)\n    published = models.BooleanField(default=False)`,
        resEx: `Database table tutorials_course created via Django ORM`,
        statusCode: 'Model Schema Ready',
        code: `from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=150)
    level = models.CharField(max_length=50)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title`
      },
      {
        num: 14, file: '14-migrations.html', title: 'Migrations',
        subtopics: 'Migration ante enti? · makemigrations · migrate · Migration files · Applying migrations · Reversing migrations · Fake migrations · Migration conflicts · Data migrations · Production migrations · Migration best practices · Migration testing',
        summary: 'Django documentation migrations ki creation, application, reversing, dependencies and migration files cover chestundi.',
        resource: 'MigrationCLI', method: 'Migrate', url: 'tutorials/migrations/',
        reqEx: `python manage.py makemigrations\npython manage.py migrate`,
        resEx: `Applying tutorials.0001_initial... OK`,
        statusCode: 'Migrations Applied',
        code: `python manage.py makemigrations
python manage.py migrate`
      },
      {
        num: 15, file: '15-querysets.html', title: 'QuerySets',
        subtopics: 'QuerySet ante enti? · all() · get() · filter() · exclude() · first() · last() · exists() · count() · order_by() · values() · values_list() · Lazy evaluation · Query debugging',
        summary: 'Query, filter, and order database records efficiently using Django ORM QuerySet chaining.',
        resource: 'QuerySetFilter', method: 'QuerySet', url: 'tutorials/views.py',
        reqEx: `courses = Course.objects.filter(published=True).order_by("-created_at")`,
        resEx: `<QuerySet [<Course: Django>, <Course: Python>]>`,
        statusCode: 'Query Executed',
        code: `from .models import Course

published_courses = Course.objects.filter(
    published=True
).order_by("-created_at")`
      },
      {
        num: 16, file: '16-orm-crud.html', title: 'ORM CRUD',
        subtopics: 'Creating records · save() · create() · Reading records · Updating records · update() · Deleting records · delete() · Bulk operations · get_or_create() · update_or_create() · ORM errors',
        summary: 'Perform Create, Read, Update, and Delete (CRUD) operations on database models using Django ORM methods.',
        resource: 'CrudOps', method: 'ORM', url: 'tutorials/views.py',
        reqEx: `course = Course.objects.create(title="Django", level="Beginner")`,
        resEx: `Persisted Course record with ID 1 to database`,
        statusCode: 'Record Created',
        code: `# Create record via ORM
course = Course.objects.create(
    title="Django",
    level="Beginner"
)

# Update record
course.published = True
course.save()`
      },
      {
        num: 17, file: '17-relationships.html', title: 'Relationships',
        subtopics: 'One-to-one · Foreign key · Many-to-many · OneToOneField · ForeignKey · ManyToManyField · related_name · on_delete · Cascade delete · Protect behavior · Reverse relationships · Nested objects',
        summary: 'Connect tables with ForeignKey (One-to-Many), ManyToManyField, and OneToOneField model relationships.',
        resource: 'LessonModel', method: 'ForeignKey', url: 'tutorials/models.py',
        reqEx: `course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="lessons")`,
        resEx: `Foreign key relationship linking Lesson to Course active`,
        statusCode: 'Relationship Active',
        code: `class Lesson(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="lessons"
    )
    title = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.course.title} - {self.title}"`
      },
      {
        num: 18, file: '18-query-optimization.html', title: 'Query Optimization',
        subtopics: 'select_related · prefetch_related · N+1 query problem · only · defer · Database indexes · db_index · Query logging · explain · Pagination performance · Bulk queries · Query optimization checklist',
        summary: 'Eliminate N+1 database queries using select_related() for SQL joins and prefetch_related() for many-to-many sets.',
        resource: 'QueryOpt', method: 'SelectRelated', url: 'tutorials/views.py',
        reqEx: `lessons = Lesson.objects.select_related('course').all()`,
        resEx: `SQL query count reduced from 101 to 1 single JOIN query`,
        statusCode: 'Query Optimized',
        code: `# Optimized SQL JOIN query
lessons = Lesson.objects.select_related("course").filter(course__published=True)`
      }
    ]
  },
  {
    phaseTag: 'Phase 05', phaseTitle: 'Admin & Forms', icon: '📝',
    chapters: [
      {
        num: 19, file: '19-django-admin.html', title: 'Django Admin',
        subtopics: 'Django admin ante enti? · Superuser · Admin login · Registering models · List display · Search fields · List filters · Ordering · Read-only fields · Inline models · Custom admin actions · Admin permissions',
        summary: 'Manage application content using Django built-in admin dashboard, superuser accounts, and model registration.',
        resource: 'AdminSite', method: 'AdminRegister', url: 'tutorials/admin.py',
        reqEx: `python manage.py createsuperuser\nadmin.site.register(Course)`,
        resEx: `Admin Dashboard live at http://127.0.0.1:8000/admin/`,
        statusCode: 'Admin Active',
        code: `from django.contrib import admin
from .models import Course, Lesson

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "level", "published", "created_at")
    search_fields = ("title",)
    list_filter = ("published",)

admin.site.register(Lesson)`
      },
      {
        num: 20, file: '20-django-forms.html', title: 'Django Forms',
        subtopics: 'Form ante enti? · forms.Form · Form fields · Text field · Email field · Choice field · File field · Form rendering · Form submission · is_valid() · cleaned_data · Form errors',
        summary: 'Build HTML forms in Python using forms.Form with automatic field parsing and cleaned_data validation.',
        resource: 'CourseForm', method: 'Form', url: 'tutorials/forms.py',
        reqEx: `class CourseForm(forms.Form):\n    title = forms.CharField(max_length=150)\n    level = forms.CharField(max_length=50)`,
        resEx: `Form cleaned_data dictionary: {"title": "Django", "level": "Beginner"}`,
        statusCode: 'Form Validated',
        code: `from django import forms

class CourseForm(forms.Form):
    title = forms.CharField(max_length=150)
    level = forms.CharField(max_length=50)`
      },
      {
        num: 21, file: '21-model-forms.html', title: 'Model Forms',
        subtopics: 'ModelForm · Meta class · Selecting model fields · Excluding fields · Custom widgets · Labels · Help text · Field validation · Save form · Commit false · Update existing model · ModelForm security',
        summary: 'Map Django models directly to HTML forms using forms.ModelForm for automatic database persistence.',
        resource: 'CourseModelForm', method: 'ModelForm', url: 'tutorials/forms.py',
        reqEx: `class CourseForm(forms.ModelForm):\n    class Meta:\n        model = Course\n        fields = ["title", "level", "published"]`,
        resEx: `form.save() persists form inputs directly into database table`,
        statusCode: 'Model Form Saved',
        code: `from django import forms
from .models import Course

class CourseForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = ["title", "level", "published"]`
      },
      {
        num: 22, file: '22-form-validation.html', title: 'Form Validation',
        subtopics: 'Required validation · Field validation · clean_<field>() · Form-level clean() · Custom validators · Validation messages · Duplicate validation · Cross-field validation · File validation · Security validation',
        summary: 'Enforce custom data validation rules with clean_<field>() methods and raise ValidationError exceptions.',
        resource: 'FormValidator', method: 'CleanValidation', url: 'tutorials/forms.py',
        reqEx: `def clean_title(self):\n    title = self.cleaned_data['title']\n    if len(title) < 5: raise forms.ValidationError("Too short!")`,
        resEx: `Validation error message rendered next to input field`,
        statusCode: 'Validation Applied',
        code: `class CourseForm(forms.Form):
    title = forms.CharField(max_length=150)

    def clean_title(self):
        title = self.cleaned_data.get('title')
        if "test" in title.lower():
            raise forms.ValidationError("Title cannot contain reserved word 'test'.")
        return title`
      }
    ]
  },
  {
    phaseTag: 'Phase 06', phaseTitle: 'Class-Based Views', icon: '🏛️',
    chapters: [
      {
        num: 23, file: '23-class-based-views.html', title: 'Class-Based Views',
        subtopics: 'CBV ante enti? · View · TemplateView · ListView · DetailView · CreateView · UpdateView · DeleteView · FormView · Mixins · Overriding methods · CBV vs FBV',
        summary: 'Django documentation class-based views and built-in generic views provide chestundi, so repeated CRUD view code reduce cheyyachu.',
        resource: 'GenericViews', method: 'CBV', url: 'tutorials/views.py',
        reqEx: `class CourseListView(ListView):\n    model = Course\n    template_name = "course_list.html"`,
        resEx: `Generic ListView queries database and passes object_list to template`,
        statusCode: 'CBV Active',
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
    phaseTag: 'Phase 07', phaseTitle: 'Authentication & Authorization', icon: '🔑',
    chapters: [
      {
        num: 24, file: '24-authentication.html', title: 'Authentication',
        subtopics: 'Authentication ante enti? · Built-in User model · User registration · Login · Logout · Password hashing · Sessions · Cookies · login_required · Current user · Password change · Password reset · Email verification',
        summary: 'Django built-in authentication system credentials check, users and authentication backends support chestundi.',
        resource: 'AuthSystem', method: 'LoginRequired', url: 'tutorials/views.py',
        reqEx: `@login_required\ndef dashboard(request):\n    return render(request, "dashboard.html")`,
        resEx: `Protected dashboard rendered for authenticated users`,
        statusCode: 'Auth Protected',
        code: `from django.contrib.auth.decorators import login_required
from django.shortcuts import render

@login_required
def dashboard(request):
    return render(request, "tutorials/dashboard.html", {"user": request.user})`
      },
      {
        num: 25, file: '25-custom-user-model.html', title: 'Custom User Model',
        subtopics: 'Why custom user model? · AbstractUser · AbstractBaseUser · Custom fields · Email login · User manager · AUTH_USER_MODEL · Migration planning · Admin integration · Custom user testing',
        summary: 'Replace default User model with custom AbstractUser subclass supporting custom user fields and email authentication.',
        resource: 'CustomUser', method: 'AbstractUser', url: 'users/models.py',
        reqEx: `class User(AbstractUser):\n    bio = models.TextField(blank=True)\nAUTH_USER_MODEL = 'users.User'`,
        resEx: `Custom User model activated project-wide`,
        statusCode: 'Custom User Active',
        code: `from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    bio = models.TextField(blank=True)
    is_teacher = models.BooleanField(default=False)`
      },
      {
        num: 26, file: '26-authorization.html', title: 'Authorization',
        subtopics: 'Authentication vs authorization · Permissions · Groups · Staff users · Superusers · Object-level permissions · Permission decorators · Permission mixins · Role-based access · Admin-only pages · Course author access · Authorization testing',
        summary: 'Restrict administrative access using permissions, groups, and @permission_required view decorators.',
        resource: 'PermissionGuard', method: 'PermissionRequired', url: 'tutorials/views.py',
        reqEx: `@permission_required('tutorials.add_course')\ndef create_course(request): ...`,
        resEx: `Permission check validated before granting access`,
        statusCode: 'Permission Enforced',
        code: `from django.contrib.auth.decorators import permission_required

@permission_required('tutorials.add_course', raise_exception=True)
def create_course(request):
    # Action allowed only for authorized users
    pass`
      }
    ]
  },
  {
    phaseTag: 'Phase 08', phaseTitle: 'Security', icon: '🔒',
    chapters: [
      {
        num: 27, file: '27-django-security.html', title: 'Django Security',
        subtopics: 'CSRF protection · XSS prevention · SQL injection protection · Clickjacking protection · Host header validation · HTTPS · Secure cookies · Security middleware · Secret key management · Password security · File upload security · Security checklist',
        summary: 'Harden Django web applications against CSRF, XSS, and SQL Injection attacks using built-in security middleware.',
        resource: 'SecurityMiddleware', method: 'Security', url: 'config/settings.py',
        reqEx: `{% csrf_token %}\nSECURE_BROWSER_XSS_FILTER = True\nSECURE_SSL_REDIRECT = True`,
        resEx: `CSRF tokens validated on POST forms; security headers injected`,
        statusCode: 'Security Active',
        code: `<!-- CSRF protection tag inside forms -->
<form method="post">
  {% csrf_token %}
  <input type="text" name="title" />
  <button type="submit">Submit</button>
</form>`
      }
    ]
  },
  {
    phaseTag: 'Phase 09', phaseTitle: 'Django REST Framework (DRF)', icon: '🌐',
    chapters: [
      {
        num: 28, file: '28-django-rest-framework.html', title: 'Django REST Framework',
        subtopics: 'Django REST Framework ante enti? · Django vs DRF · REST API basics · Serializers · API views · Generic views · ViewSets · Routers · Authentication · Permissions · Pagination · Browsable API',
        summary: 'DRF quickstart serializers, viewsets, routers and pagination tho API build cheyyadam demonstrate chestundi.',
        resource: 'DRFSetup', method: 'RESTAPI', url: 'config/settings.py',
        reqEx: `pip install djangorestframework\nINSTALLED_APPS = [..., 'rest_framework']`,
        resEx: `DRF Browsable API dashboard active`,
        statusCode: 'DRF Active',
        code: `# settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'rest_framework',
    'tutorials',
]`
      },
      {
        num: 29, file: '29-serializers.html', title: 'Serializers',
        subtopics: 'Serializer ante enti? · ModelSerializer · Serializer fields · Read-only fields · Write-only fields · Nested serializers · Custom validation · Serializer method fields · Create behavior · Update behavior · Serializer errors · Response serialization',
        summary: 'Serialize Django ORM Model instances to JSON format and deserialize JSON payloads with ModelSerializer.',
        resource: 'CourseSerializer', method: 'Serializer', url: 'tutorials/serializers.py',
        reqEx: `class CourseSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Course\n        fields = ["id", "title", "level", "published"]`,
        resEx: `JSON payload: {"id": 1, "title": "Django", "level": "Beginner", "published": true}`,
        statusCode: 'Serialized',
        code: `from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["id", "title", "level", "published"]`
      },
      {
        num: 30, file: '30-api-views.html', title: 'API Views',
        subtopics: 'APIView · GET method · POST method · PUT method · PATCH method · DELETE method · Response · Status codes · Request data · Error responses · Permissions · API testing',
        summary: 'Build custom RESTful API endpoints handling GET, POST, PUT, and DELETE methods using DRF APIView.',
        resource: 'CourseApiView', method: 'APIView', url: 'tutorials/api.py',
        reqEx: `class CourseListApiView(APIView):\n    def get(self, request): return Response(serializer.data)`,
        resEx: `HTTP 200 OK with JSON payload response`,
        statusCode: 'API Endpoint Ready',
        code: `from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Course
from .serializers import CourseSerializer

class CourseListApiView(APIView):
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)`
      },
      {
        num: 31, file: '31-viewsets-and-routers.html', title: 'ViewSets & Routers',
        subtopics: 'ViewSet ante enti? · ModelViewSet · List action · Create action · Retrieve action · Update action · Destroy action · Custom actions · Routers · DefaultRouter · URL generation · ViewSet permissions',
        summary: 'DRF ViewSet related actions like list, create, retrieve, update and destroy ni one class lo combine chestundi; routers URL patterns automatically create chestayi.',
        resource: 'CourseViewSet', method: 'ViewSetRouter', url: 'tutorials/urls.py',
        reqEx: `router = DefaultRouter()\nrouter.register(r'courses', CourseViewSet)`,
        resEx: `Automatic REST endpoints generated: /api/courses/`,
        statusCode: 'Router Registered',
        code: `from rest_framework import viewsets
from .models import Course
from .serializers import CourseSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer`
      },
      {
        num: 32, file: '32-api-authentication.html', title: 'API Authentication',
        subtopics: 'Session authentication · Token authentication · JWT overview · IsAuthenticated · AllowAny · IsAdminUser · Custom permissions · Object permissions · Role-based API access · Authentication errors · Permission testing · Throttling',
        summary: 'Secure DRF REST APIs using Token authentication, JWT Bearer tokens, and IsAuthenticated permissions.',
        resource: 'DRFAuth', method: 'TokenAuth', url: 'config/settings.py',
        reqEx: `REST_FRAMEWORK = {'DEFAULT_AUTHENTICATION_CLASSES': ['rest_framework.authentication.TokenAuthentication']}`,
        resEx: `Authorization: Token <key> validated on incoming API requests`,
        statusCode: 'API Auth Active',
        code: `from rest_framework.permissions import IsAuthenticated

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]`
      },
      {
        num: 33, file: '33-api-permissions.html', title: 'API Permissions',
        subtopics: 'IsAuthenticated · IsAdminUser · IsAuthenticatedOrReadOnly · Custom BasePermission · has_permission · has_object_permission · Role-based API control',
        summary: 'Write granular API permissions controlling read vs write capabilities across endpoints.',
        resource: 'CustomApiPermission', method: 'BasePermission', url: 'tutorials/permissions.py',
        reqEx: `class IsAuthorOrReadOnly(permissions.BasePermission): ...`,
        resEx: `Read requests allowed for public; edit requests restricted to author`,
        statusCode: 'Permission Active',
        code: `from rest_framework import permissions

class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user`
      },
      {
        num: 34, file: '34-pagination-and-filtering.html', title: 'Pagination & Filtering',
        subtopics: 'Page pagination · Limit-offset pagination · Cursor pagination · Search filters · Ordering filters · Field filters · django-filter · Query parameters · Pagination response · Filter security · Performance · API documentation',
        summary: 'Paginate large API responses and filter records dynamically with DjangoFilterBackend and SearchFilter.',
        resource: 'DRFPagination', method: 'FilterBackend', url: 'tutorials/api.py',
        reqEx: `filter_backends = [DjangoFilterBackend, filters.SearchFilter]\nsearch_fields = ['title']`,
        resEx: `API results filtered by ?search=django & paginated to 10 items/page`,
        statusCode: 'Filtered & Paginated',
        code: `from rest_framework import filters

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'level']`
      }
    ]
  },
  {
    phaseTag: 'Phase 10', phaseTitle: 'Testing', icon: '🧪',
    chapters: [
      {
        num: 35, file: '35-testing.html', title: 'Testing',
        subtopics: 'Why testing is needed · TestCase · Test client · URL tests · View tests · Model tests · Form tests · Authentication tests · Database tests · Fixtures · Test setup · Test teardown',
        summary: 'Write unit tests for Django models, views, and forms deriving from django.test.TestCase.',
        resource: 'CourseTest', method: 'TestCase', url: 'tutorials/tests.py',
        reqEx: `class CourseTest(TestCase):\n    def test_course_title(self):\n        course = Course.objects.create(title="Django", level="Beginner")\n        self.assertEqual(course.title, "Django")`,
        resEx: `Ran 1 test in 0.02s OK`,
        statusCode: 'Test Passed',
        code: `from django.test import TestCase
from .models import Course

class CourseTest(TestCase):
    def test_course_title(self):
        course = Course.objects.create(
            title="Django",
            level="Beginner"
        )
        self.assertEqual(course.title, "Django")`
      },
      {
        num: 36, file: '36-api-testing.html', title: 'API Testing',
        subtopics: 'DRF APIClient · GET endpoint tests · POST endpoint tests · Authentication tests · Permission tests · Validation tests · Status code tests · JSON response tests · Pagination tests · Error tests · Integration tests · Coverage',
        summary: 'Test DRF REST API endpoints using rest_framework.test.APIClient and assert HTTP status codes.',
        resource: 'ApiTestCase', method: 'APIClient', url: 'tutorials/tests.py',
        reqEx: `client = APIClient()\nresponse = client.get('/api/courses/')\nself.assertEqual(response.status_code, 200)`,
        resEx: `API endpoint test suite executed cleanly`,
        statusCode: 'API Test Passed',
        code: `from rest_framework.test import APITestCase
from rest_framework import status

class CourseApiTest(APITestCase):
    def test_get_courses(self):
        response = self.client.get('/api/courses/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)`
      }
    ]
  },
  {
    phaseTag: 'Phase 11', phaseTitle: 'Background Tasks & Async', icon: '⚡',
    chapters: [
      {
        num: 37, file: '37-background-tasks.html', title: 'Background Tasks',
        subtopics: 'Background task ante enti? · Long-running tasks · Email sending · Report generation · Celery overview · Redis broker · Task workers · Retry tasks · Failed tasks · Scheduled tasks · Task monitoring · Idempotent jobs',
        summary: 'Delegate long-running tasks like asynchronous email delivery and report generation to Celery with Redis broker.',
        resource: 'CeleryTask', method: 'AsyncWorker', url: 'tutorials/tasks.py',
        reqEx: `@shared_task\ndef send_welcome_email(user_id): ...`,
        resEx: `Background task queued and executed asynchronously in worker thread`,
        statusCode: 'Task Queued',
        code: `from celery import shared_task

@shared_task
def send_welcome_email(email):
    # Asynchronous email delivery logic
    pass`
      },
      {
        num: 38, file: '38-async-django.html', title: 'Async Django',
        subtopics: 'Async views · async def · await · ASGI · Async middleware · Async ORM methods · Async external API calls · Sync-to-async · Async limitations · Async testing · When to use async · WSGI vs ASGI',
        summary: 'Django documentation current topics lo asynchronous class-based views and async support include chestundi.',
        resource: 'AsyncView', method: 'ASGI', url: 'tutorials/views.py',
        reqEx: `async def async_home(request):\n    data = await get_external_data()\n    return JsonResponse(data)`,
        resEx: `Asynchronous HTTP view processed on ASGI server without blocking worker thread`,
        statusCode: 'Async Handled',
        code: `from django.http import JsonResponse
import asyncio

async def async_home(request):
    await asyncio.sleep(0.1)
    return JsonResponse({"status": "Asynchronous response success"})`
      }
    ]
  },
  {
    phaseTag: 'Phase 12', phaseTitle: 'Caching & Signals', icon: '⚡',
    chapters: [
      {
        num: 39, file: '39-caching.html', title: 'Caching',
        subtopics: 'Cache ante enti? · Per-site cache · Per-view cache · Template fragment cache · Low-level cache API · Redis cache · Cache keys · Cache invalidation · Timeout · Cache headers · Database caching · Cache testing',
        summary: 'Cache database queries and template fragments using Redis and Django low-level cache API.',
        resource: 'RedisCache', method: 'CacheAPI', url: 'tutorials/views.py',
        reqEx: `cache.set('courses_list', courses, timeout=600)\ncourses = cache.get('courses_list')`,
        resEx: `Cached QuerySet returned in < 2ms latency`,
        statusCode: 'Cache Hit',
        code: `from django.core.cache import cache

def get_cached_courses():
    courses = cache.get('all_courses')
    if not courses:
        courses = list(Course.objects.filter(published=True))
        cache.set('all_courses', courses, 300)
    return courses`
      },
      {
        num: 40, file: '40-signals.html', title: 'Signals',
        subtopics: 'Signal ante enti? · post_save · pre_save · post_delete · User creation signal · Profile creation · Signal registration · Signal limitations · Signals vs services · Testing signals',
        summary: 'Trigger automatic model event hooks like post_save to generate user profile records whenever a User is created.',
        resource: 'PostSaveSignal', method: 'SignalHandler', url: 'tutorials/signals.py',
        reqEx: `@receiver(post_save, sender=User)\ndef create_profile(sender, instance, created, **kwargs): ...`,
        resEx: `Signal triggered automatically on User save`,
        statusCode: 'Signal Handled',
        code: `from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        print(f"Profile created for user {instance.username}")`
      }
    ]
  },
  {
    phaseTag: 'Phase 13', phaseTitle: 'Advanced Management', icon: '💻',
    chapters: [
      {
        num: 41, file: '41-management-commands.html', title: 'Management Commands',
        subtopics: 'Management command ante enti? · Creating commands · Arguments · Options · Database seed command · Import command · Cleanup command · Scheduled commands · Command testing · Command logging',
        summary: 'Create custom CLI management commands using BaseCommand to seed initial database records or run cleanup scripts.',
        resource: 'SeedCommand', method: 'BaseCommand', url: 'tutorials/management/commands/seed.py',
        reqEx: `python manage.py seed --count=50`,
        resEx: `Successfully seeded 50 sample courses into database`,
        statusCode: 'Command Executed',
        code: `from django.core.management.base import BaseCommand
from tutorials.models import Course

class Command(BaseCommand):
    help = 'Seeds initial sample courses into database'

    def handle(self, *args, **kwargs):
        Course.objects.create(title="Django Masterclass", level="Advanced")
        self.stdout.write(self.style.SUCCESS('Successfully seeded sample course!'))`
      }
    ]
  },
  {
    phaseTag: 'Phase 14', phaseTitle: 'Containerization & Deployment', icon: '🐳',
    chapters: [
      {
        num: 42, file: '42-docker-and-ci-cd.html', title: 'Docker & CI/CD',
        subtopics: 'Docker ante enti? · Python Dockerfile · Installing dependencies · Gunicorn command · Database container · Redis container · Docker Compose · Environment variables · GitHub Actions · Test pipeline · Build pipeline · Deployment pipeline',
        summary: 'Containerize Django applications with Dockerfile, docker-compose.yml (PostgreSQL + Redis + Gunicorn), and automated GitHub Actions CI/CD.',
        resource: 'DockerCompose', method: 'DockerContainer', url: 'docker-compose.yml',
        reqEx: `docker-compose up -d --build`,
        resEx: `Django app, PostgreSQL, and Redis containers running on port 8000`,
        statusCode: 'Containers Live',
        code: `# Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]`
      },
      {
        num: 43, file: '43-deployment.html', title: 'Deployment',
        subtopics: 'Development server limitations · WSGI · ASGI · Gunicorn · Uvicorn · Daphne overview · Worker processes · Timeouts · Graceful shutdown · Static files · Media files · Production logging · Cloud hosting · Managed database · HTTPS · Backups',
        summary: 'Deploy production Django web applications using Gunicorn WSGI server, NGINX reverse proxy, PostgreSQL, and HTTPS certificates.',
        resource: 'ProductionWsgi', method: 'WSGI', url: 'config/wsgi.py',
        reqEx: `gunicorn config.wsgi:application --workers 4 --bind 0.0.0.0:8000`,
        resEx: `Gunicorn WSGI server handling production traffic behind NGINX`,
        statusCode: 'Production Deployed',
        code: `# Production NGINX Config Snippet
server {
    listen 80;
    server_name ourcompiler.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
    }
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 15', phaseTitle: 'Projects & Certification', icon: '🏆',
    chapters: [
      {
        num: 44, file: '44-django-projects.html', title: 'Django Projects',
        subtopics: 'Beginner Projects (Personal Blog, Task Manager) · Intermediate Projects (E-commerce Store, Auth Portal) · Advanced Projects (Our Compiler Django App Platform, DRF API Service) · Complete Architecture & Code Specs',
        summary: 'Build complete real-world Django applications including Our Compiler Django Platform backend.',
        resource: 'Projects', method: 'DjangoProjects', url: 'config/urls.py',
        reqEx: `python manage.py runserver`,
        resEx: `Our Compiler Django Application Backend Live`,
        statusCode: 'Platform Live',
        code: `# Our Compiler Django Core App Handler
from django.shortcuts import render
from .models import Course

def platform_home(request):
    courses = Course.objects.filter(published=True)
    return render(request, "tutorials/platform.html", {"courses": courses})`
      },
      {
        num: 45, file: '45-django-quiz.html', title: 'Django Practice Quiz',
        subtopics: 'Comprehensive Django Knowledge Check · 30 Multiple Choice Certification Exam Questions · MTV, ORM, Views, Templates, Forms, Admin, Auth, DRF & Security',
        summary: 'Test your Django web engineering mastery with our 30-question interactive certification practice quiz.',
        resource: 'Quiz', method: 'Certification', url: 'tutorials/views.py',
        reqEx: `Submit quiz answers for Instant Certification Evaluation`,
        resEx: `Score: 100% — Passed Django Engineer Certification Exam`,
        statusCode: 'Certified',
        code: `# Django Masterclass Certification Exam Active!`
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
  <title>Django Complete Roadmap — 45 Chapters, 15 Phases (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master Django 5.0+ web development, MTV architecture, Models, ORM QuerySets, Admin Panel, Views, Templates, Forms, Authentication, Class-Based Views, Django REST Framework (DRF), Testing & Production Deployment with our complete 45-chapter bootcamp across 15 phases." />
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

    <h1 class="page-title">Django Complete Masterclass (45 Chapters, 15 Phases)</h1>

    <div class="page-meta">
      <span class="badge">🎸 Django 5.0+</span>
      <span class="badge">🟢 45 Complete Chapters</span>
      <span class="badge">📂 15 Complete Phases</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">What is Django? · Prerequisites · Installation &amp; Setup · Project Structure · Creating Apps · URL Routing · Function-Based Views · Request &amp; Response · Django Templates · Template Inheritance · Static &amp; Media Files · Models · Migrations · QuerySets · ORM CRUD · Relationships · Query Optimization · Django Admin · Forms &amp; Model Forms · Validation · CBVs · Auth &amp; Custom User · Permissions · Security · DRF &amp; Serializers · ViewSets &amp; Routers · Testing · Celery &amp; Async · Docker, Deployment &amp; Quiz</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's Django Complete Master Course</strong>. Django is the batteries-included Python web framework used to build secure, database-backed web applications rapidly. This comprehensive 45-chapter bootcamp guides you through MTV architecture, ORM models, administration, views, templates, forms, authentication, Class-Based Views, Django REST Framework (DRF), and production deployment.</p>
    </div>

    <div style="background:linear-gradient(135deg,rgba(68,183,139,0.12),rgba(9,46,32,0.6));border:1px solid rgba(68,183,139,0.3);border-radius:12px;padding:24px;margin:28px 0;">
      <h3 style="color:#44b78b;margin-bottom:10px;font-size:18px;">🎯 Ready to Master Django Web Engineering?</h3>
      <p style="color:var(--text2);margin-bottom:16px;font-size:14.5px;">Choose where to start: explore Django introduction, project setup, URL routing, ORM models, forms, or Django REST Framework:</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/blog-django/01-what-is-django.html" style="background:linear-gradient(135deg,#092e20,#0c4b33);border:1px solid #44b78b;color:#44b78b;font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 1: Django Intro →</a>
        <a href="/blog-django/07-url-routing.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 2: URLs &amp; Views →</a>
        <a href="/blog-django/13-models.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 4: Models &amp; ORM →</a>
        <a href="/blog-django/19-django-admin.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 5: Admin &amp; Forms →</a>
        <a href="/blog-django/28-django-rest-framework.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 9: Django REST Framework →</a>
        <a href="/blog-django/43-deployment.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 14: Production Deployment →</a>
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
        <span>Django Complete Masterclass · 45 Chapters · 15 Phases · 2026 Edition</span>
      </div>
    </div>

    <div class="nav-footer">
      <a href="/blog.html" class="nav-btn"><span class="label">← All Tutorials</span><span class="title">Course Hub</span></a>
      <a href="/blog-django/01-what-is-django.html" class="nav-btn" style="text-align:right;"><span class="label">Start Learning →</span><span class="title">1. What is Django?</span></a>
    </div>
  </main>
</div>
<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'blog-django.html'), masterIndexHtml, 'utf8');
console.log('✅ Generated public/blog-django.html master index page successfully!');

// 4. Generate all 45 Chapter HTML Files inside public/blog-django/ adhering strictly to the 16-Section Lesson Layout
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
        <p>Django model Python class form lo database table structure define chestundi. Migration model changes ni database schema changes ga convert chesi apply chestundi. Mastering <strong>${ch.title}</strong> accelerates backend development.</p>
      </div>
    </div>

    <!-- 4. Required project structure -->
    <div class="section-title"><span class="num">4</span>Required Project Structure</div>
    <div class="section-body">
      <p>Target Class / Module: <code>${ch.resource}</code>. Configured inside Django app modules (e.g. <code>models.py</code>, <code>views.py</code>, <code>urls.py</code>, <code>forms.py</code>, <code>serializers.py</code>).</p>
    </div>

    <!-- 5. Model / View syntax & mechanism -->
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

    <!-- 7. Migration commands / Browser output -->
    <div class="section-title"><span class="num">7</span>Migration Commands / Output</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header"><span class="lang-tag">CLI / Execution Output</span></div>
        <pre><code>${ch.reqEx}</code></pre>
      </div>
    </div>

    <!-- 8. Database table explanation / Request flow -->
    <div class="section-title"><span class="num">8</span>Database Table Explanation / Request Flow</div>
    <div class="section-body">
      <div class="diagram-box">Browser Request -> WSGI/ASGI Server -> URL Dispatcher (urls.py) -> View Handler (views.py) -> Model Query (models.py) -> Template Engine / Serializer -> HTTP Response</div>
    </div>

    <!-- 9. Query example / Practical usage -->
    <div class="section-title"><span class="num">9</span>Query Example / Practical Usage</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header"><span class="lang-tag">ORM Query / View Invocation</span></div>
        <pre><code>${ch.resEx}</code></pre>
      </div>
    </div>

    <!-- 10. Admin integration / MTV concept comparison -->
    <div class="section-title"><span class="num">10</span>Admin Integration / Concept Comparison</div>
    <div class="section-body">
      <div class="card" style="background:var(--bg2);padding:14px 18px;border-radius:8px;margin:16px 0;border-left:4px solid #44b78b;">
        <strong style="color:#44b78b;">Verification Status: ${ch.statusCode}</strong>
        <p style="margin-top:6px;font-size:13.5px;color:var(--text2);">Django's MTV architecture maps Model to database table, Template to HTML presentation layer, and View to business logic handler. Registered models appear automatically in the Django Admin panel.</p>
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

console.log('✅ Generated all 45 Django Masterclass chapter files in public/blog-django/ successfully!');
