const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const restDir = path.join(publicDir, 'blog-rest-api');

if (!fs.existsSync(restDir)) {
  fs.mkdirSync(restDir, { recursive: true });
}

// 1. Create public/blog-rest-api/style.css matching Emerald Green Theme (#10b981)
const cssStyleContent = `/* Specialized styling enhancements for REST API tutorial lessons & Accordion — Emerald Green Theme */
:root {
  --rest-theme: #10b981;
  --rest-theme-hover: #34d399;
  --rest-theme-bg: rgba(16, 185, 129, 0.12);
  --rest-theme-border: rgba(16, 185, 129, 0.3);
}

body.lang-rest-api {
  --accent: #10b981;
  --accent-glow: rgba(16, 185, 129, 0.2);
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
  background: rgba(16, 185, 129, 0.08) !important;
  border: 1px solid rgba(16, 185, 129, 0.25) !important;
  border-radius: 99px !important;
  color: #10b981 !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  text-decoration: none !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sidebar-home-link:hover {
  background: rgba(16, 185, 129, 0.16) !important;
  border-color: #10b981 !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.sidebar-home-link.active {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(20, 24, 32, 0.8)) !important;
  border-color: #10b981 !important;
  color: #10b981 !important;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.25);
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
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(20, 25, 34, 0.6) 100%);
  border-color: #10b981;
  box-shadow: 0 0 14px rgba(16, 185, 129, 0.18);
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
  background: rgba(16, 185, 129, 0.2);
  border-color: rgba(16, 185, 129, 0.4);
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
  color: #10b981;
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
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  border-color: rgba(16, 185, 129, 0.35);
  font-weight: 700;
}

.accordion-chevron {
  color: var(--text3, #8b949e);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s;
  flex-shrink: 0;
}

.accordion-header.active .accordion-chevron {
  transform: rotate(90deg);
  color: #10b981;
}

.accordion-content {
  display: none;
  flex-direction: column;
  padding: 4px 0 6px 10px;
  border-left: 2px solid rgba(16, 185, 129, 0.35);
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
  background: #10b981 !important;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.35);
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
  border-color: rgba(16, 185, 129, 0.4);
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
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
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
  color: #10b981;
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
  background: rgba(16, 185, 129, 0.08);
  border-color: rgba(16, 185, 129, 0.35);
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
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  font-size: 12px;
  font-weight: 800;
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.curriculum-lesson-row:hover .lesson-idx {
  background: #10b981;
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
  color: #10b981;
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
  color: #10b981;
  padding: 5px 12px;
  border-radius: 6px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  transition: all 0.18s ease;
}

.curriculum-lesson-row:hover .lesson-btn {
  background: #10b981;
  color: #ffffff;
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
  background: #dcfce7;
  border-color: #bbf7d0;
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
  background: #f0fdf4;
  border-color: #86efac;
}

body.light-theme .lesson-idx {
  background: #dcfce7;
  color: #059669;
}

body.light-theme .lesson-title {
  color: #0f172a;
}

body.light-theme .lesson-subtopics {
  color: #64748b;
}

body.light-theme .lesson-btn {
  background: #dcfce7;
  border-color: #bbf7d0;
  color: #059669;
}

body.light-theme .curriculum-lesson-row:hover .lesson-btn {
  background: #059669;
  color: #ffffff;
}

body.light-theme .sidebar-home-link {
  background: #f0fdf4 !important;
  border-color: #bbf7d0 !important;
  color: #059669 !important;
}

body.light-theme .sidebar-home-link.active {
  background: #dcfce7 !important;
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
  background: #dcfce7 !important;
  border-color: #bbf7d0 !important;
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
  background: #dcfce7 !important;
  color: #059669 !important;
  border-color: #86efac !important;
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
  background: #10b981 !important;
  color: #ffffff !important;
  border-radius: 8px !important;
  font-weight: 700 !important;
}

.try-box {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(20, 24, 32, 0.6) 100%);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: var(--radius, 12px);
  padding: 24px;
  margin: 32px 0;
}

.try-box .try-title {
  font-weight: 700;
  color: #10b981;
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
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ffffff !important;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.2s, opacity 0.2s;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
}

.try-box .run-btn:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

.callout {
  background: #161b22;
  border: 1px solid #30363d;
  border-left: 4px solid #10b981;
  padding: 18px 22px;
  border-radius: var(--radius, 12px);
  margin: 28px 0;
}

.callout .callout-title {
  font-weight: 700;
  color: #10b981;
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
  color: #7ee787;
  line-height: 1.55;
  white-space: pre !important;
  overflow-x: auto;
}

.faq-card {
  background: #141820;
  border: 1px solid #30363d;
  border-left: 4px solid #10b981;
  border-radius: 10px;
  padding: 18px 22px;
  margin-bottom: 18px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, border-color 0.2s;
}

.faq-card:hover {
  transform: translateX(3px);
  border-color: #10b981;
}

.faq-card h4 {
  color: #10b981 !important;
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
  background: linear-gradient(135deg, #10b981, #059669);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 800;
  font-size: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

body.light-theme .try-box {
  background: #f0fdf4;
  border-color: #bbf7d0;
}
body.light-theme .callout {
  background: #f8fafc;
  border-color: #cbd5e1;
  border-left-color: #059669;
}
body.light-theme .callout .callout-title {
  color: #047857;
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
  color: #047857 !important;
}
body.light-theme .faq-card p {
  color: #334155;
}
`;

fs.writeFileSync(path.join(restDir, 'style.css'), cssStyleContent, 'utf8');

// 2. Define Complete 39-Chapter REST API Masterclass Data Structure across 15 Phases matching User's Recommended Outline 1-to-1
const restPhases = [
  {
    phaseTag: 'Phase 01', phaseTitle: 'REST API Introduction', icon: '🌐',
    chapters: [
      {
        num: 1, file: '01-what-is-rest-api.html', title: 'What is REST API?',
        subtopics: 'API ante enti? · REST ante enti? · REST API ante enti? · Client and server · Request and response · Resource ante enti? · Representation ante enti? · Statelessness · Uniform interface · Cacheability · Layered system · REST use cases · REST limitations · REST vs GraphQL · REST vs SOAP · REST vs WebSocket',
        summary: 'REST API is an HTTP-based interface that allows applications to communicate using resources, URLs, HTTP methods, headers and representations such as JSON.',
        resource: 'api_info', method: 'GET', url: '/api/v1/info',
        reqEx: `GET /api/v1/info HTTP/1.1\nHost: api.ourcompiler.com\nAccept: application/json`,
        resEx: `200 OK\n{\n  "name": "Our Compiler REST API",\n  "version": "1.0.0"\n}`,
        statusCode: '200 OK',
        code: `/* REST Architecture Request Flow:
Frontend / Mobile App -> HTTP Request -> REST API Server -> Database -> JSON Response */`
      }
    ]
  },
  {
    phaseTag: 'Phase 02', phaseTitle: 'HTTP Fundamentals', icon: '📡',
    chapters: [
      {
        num: 2, file: '02-http-request-and-response.html', title: 'HTTP Request & Response',
        subtopics: 'HTTP ante enti? · Request line · Request method · Request URL · Request headers · Request body · Query parameters · Path parameters · Status line · Status code · Response headers · Response body · Content type',
        summary: 'HTTP headers client and server madhya additional information pass cheyyadaniki use avutayi.',
        resource: 'courses', method: 'POST', url: '/api/v1/courses',
        reqEx: `POST /api/v1/courses HTTP/1.1\nHost: api.ourcompiler.com\nContent-Type: application/json\n\n{\n  "title": "Python",\n  "level": "Beginner"\n}`,
        resEx: `201 Created\nContent-Type: application/json\nLocation: /api/v1/courses/1\n\n{\n  "data": {\n    "id": 1,\n    "title": "Python",\n    "level": "Beginner"\n  }\n}`,
        statusCode: '201 Created',
        code: `POST /api/v1/courses HTTP/1.1
Host: api.ourcompiler.com
Content-Type: application/json

{
  "title": "Python",
  "level": "Beginner"
}`
      },
      {
        num: 3, file: '03-http-methods.html', title: 'HTTP Methods',
        subtopics: 'GET · POST · PUT · PATCH · DELETE · HEAD · OPTIONS · Safe methods · Idempotent methods · Method selection · Method misuse · Method security',
        summary: 'HTTP method semantics, status codes and request/response behavior RFC 9110 lo define chestundi.',
        resource: 'courses', method: 'GET', url: '/api/v1/courses',
        reqEx: `GET /api/v1/courses HTTP/1.1\nHost: api.ourcompiler.com`,
        resEx: `200 OK\n{\n  "data": [{ "id": 1, "title": "Python" }]\n}`,
        statusCode: '200 OK',
        code: `/* HTTP Methods Overview:
GET    /api/v1/courses    -> Read data (Safe & Idempotent)
POST   /api/v1/courses    -> Create data (Non-Idempotent)
PUT    /api/v1/courses/1  -> Replace data (Idempotent)
PATCH  /api/v1/courses/1  -> Partially update data
DELETE /api/v1/courses/1  -> Remove data (Idempotent) */`
      },
      {
        num: 4, file: '04-http-status-codes.html', title: 'HTTP Status Codes',
        subtopics: '1xx informational · 2xx success · 3xx redirection · 4xx client errors · 5xx server errors · 200 OK · 201 Created · 202 Accepted · 204 No Content · 400 Bad Request · 401 Unauthorized · 403 Forbidden · 404 Not Found · 409 Conflict · 422 Unprocessable Content · 429 Too Many Requests · 500 Internal Server Error · 503 Service Unavailable',
        summary: 'HTTP status codes five major classes lo grouped untayi; 4xx client errors, 5xx server errors indicate chestayi.',
        resource: 'courses', method: 'GET', url: '/api/v1/courses/999',
        reqEx: `GET /api/v1/courses/999 HTTP/1.1`,
        resEx: `404 Not Found\n{\n  "error": {\n    "code": "COURSE_NOT_FOUND",\n    "message": "Requested course ID 999 does not exist"\n  }\n}`,
        statusCode: '404 Not Found',
        code: `/* HTTP Status Code Categories:
200 OK          -> Successful GET/PUT/PATCH
201 Created     -> Successful POST resource creation
204 No Content  -> Successful DELETE with empty body
400 Bad Request -> Malformed payload
401 Unauth      -> Missing/Invalid Token
403 Forbidden   -> Lack permission
404 Not Found   -> Resource URI missing
422 Unprocessable -> Schema validation error
500 Server Err  -> Uncaught exception on backend */`
      },
      {
        num: 5, file: '05-headers.html', title: 'Headers',
        subtopics: 'Content-Type · Accept · Authorization · Location · Cache-Control · ETag · CORS headers · Request ID header · Rate limit headers · Custom headers',
        summary: 'Header definitions pass additional metadata between client and server for content negotiation, authorization, and caching.',
        resource: 'courses', method: 'GET', url: '/api/v1/courses',
        reqEx: `GET /api/v1/courses HTTP/1.1\nAccept: application/json\nAuthorization: Bearer token_abc`,
        resEx: `200 OK\nContent-Type: application/json; charset=utf-8\nETag: "w/33a918f"\n\n{ "data": [] }`,
        statusCode: '200 OK',
        code: `Content-Type: application/json; charset=utf-8
Accept: application/json
Authorization: Bearer token_abc123`
      }
    ]
  },
  {
    phaseTag: 'Phase 03', phaseTitle: 'Resource & URL Design', icon: '📐',
    chapters: [
      {
        num: 6, file: '06-resources-and-urls.html', title: 'Resources & URLs',
        subtopics: 'Resource ante enti? · Resource naming · Nouns vs verbs · Singular resources · Collection resources · Nested resources · Resource identifiers · Slugs · Public IDs · Resource relationships · Avoiding action URLs · Consistent naming',
        summary: 'Design RESTful URIs using plural nouns and sub-resource hierarchies while strictly avoiding action verbs in paths.',
        resource: 'lessons', method: 'GET', url: '/api/v1/courses/10/lessons',
        reqEx: `GET /api/v1/courses/10/lessons HTTP/1.1`,
        resEx: `200 OK\n{\n  "data": [{ "id": 101, "title": "Variables in Python" }]\n}`,
        statusCode: '200 OK',
        code: `/* Good Nouns Pattern:
GET /api/courses
GET /api/courses/10
GET /api/courses/10/lessons

/* Avoid Action URLs:
GET /api/getCourses
POST /api/createCourse
GET /api/deleteCourse/10 */`
      },
      {
        num: 7, file: '07-api-versioning.html', title: 'API Versioning',
        subtopics: 'Why versioning is needed · URL versioning · Header versioning · Query versioning · v1 · v2 · Breaking changes · Non-breaking changes · Deprecation · Migration guides · Backward compatibility · Sunset headers',
        summary: 'Version REST APIs to isolate breaking schema changes using URL prefixes, Accept headers, and Sunset deprecation headers.',
        resource: 'courses', method: 'GET', url: '/api/v1/courses',
        reqEx: `GET /api/v1/courses HTTP/1.1\nGET /api/v2/courses HTTP/1.1`,
        resEx: `200 OK\n{ "data": [], "version": "v1" }`,
        statusCode: '200 OK',
        code: `GET /api/v1/courses
GET /api/v2/courses`
      }
    ]
  },
  {
    phaseTag: 'Phase 04', phaseTitle: 'JSON & Data Formats', icon: '📄',
    chapters: [
      {
        num: 8, file: '08-json.html', title: 'JSON',
        subtopics: 'JSON ante enti? · JSON object · JSON array · Strings · Numbers · Boolean · Null · Nested objects · Nested arrays · JSON encoding · JSON decoding · Invalid JSON · JSON size · JSON naming conventions',
        summary: 'Format structured REST API data representations using standard JSON objects, primitive types, arrays, and camelCase/snake_case keys.',
        resource: 'courses', method: 'GET', url: '/api/v1/courses/1',
        reqEx: `GET /api/v1/courses/1 HTTP/1.1`,
        resEx: `200 OK\n{\n  "id": 1,\n  "title": "Python",\n  "level": "Beginner",\n  "published": true,\n  "tags": ["programming", "backend"]\n}`,
        statusCode: '200 OK',
        code: `{
  "id": 1,
  "title": "Python",
  "level": "Beginner",
  "published": true,
  "tags": ["programming", "backend"]
}`
      },
      {
        num: 9, file: '09-request-and-response-schemas.html', title: 'Request & Response Schemas',
        subtopics: 'Request schema · Response schema · DTO · Required fields · Optional fields · Nullable fields · Nested schema · Pagination schema · Error schema · Schema versioning · Sensitive field filtering · Consistent data shape',
        summary: 'Establish consistent success and error response payload shapes across all API endpoints using DTO schemas.',
        resource: 'courses', method: 'GET', url: '/api/v1/courses/1',
        reqEx: `GET /api/v1/courses/1 HTTP/1.1`,
        resEx: `200 OK\n{\n  "data": {\n    "id": 1,\n    "title": "Python"\n  },\n  "meta": {}\n}`,
        statusCode: '200 OK',
        code: `/* Recommended Success Response: */
{
  "data": {
    "id": 1,
    "title": "Python"
  },
  "meta": {}
}

/* Recommended Error Response: */
{
  "error": {
    "code": "COURSE_NOT_FOUND",
    "message": "Course was not found",
    "details": []
  }
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 05', phaseTitle: 'CRUD API Operations', icon: '⚡',
    chapters: [
      {
        num: 10, file: '10-crud-apis.html', title: 'CRUD APIs',
        subtopics: 'Course CRUD · POST create · GET read collection · GET read single · PATCH partial update · DELETE remove · 201 Created · 200 OK · 204 No Content · 404 Not Found · 422 Unprocessable Content · Server-side flow · Validation · DB operation',
        summary: 'Implement complete CRUD API endpoints for resources using standard HTTP verbs, status codes, validations, and database operations.',
        resource: 'courses', method: 'POST', url: '/api/v1/courses',
        reqEx: `POST /api/v1/courses\nContent-Type: application/json\n\n{\n  "title": "Python",\n  "level": "Beginner"\n}`,
        resEx: `201 Created\n{\n  "data": {\n    "id": 1,\n    "title": "Python",\n    "level": "Beginner"\n  }\n}`,
        statusCode: '201 Created',
        code: `/* REST API Course CRUD Endpoints:
POST   /api/v1/courses        -> 201 Created
GET    /api/v1/courses        -> 200 OK
PATCH  /api/v1/courses/1      -> 200 OK
DELETE /api/v1/courses/1      -> 204 No Content */`
      }
    ]
  },
  {
    phaseTag: 'Phase 06', phaseTitle: 'Querying, Filtering & Pagination', icon: '🔍',
    chapters: [
      {
        num: 11, file: '11-query-parameters.html', title: 'Query Parameters',
        subtopics: 'Query parameter ante enti? · Filtering · Search · Sorting · Multiple filters · Date filters · Range filters · Boolean filters · Query validation · URL encoding · Default values · Invalid query response',
        summary: 'Filter and search collection endpoints using URL query parameters (?level=beginner&published=true).',
        resource: 'courses', method: 'GET', url: '/api/v1/courses?level=beginner&published=true',
        reqEx: `GET /api/v1/courses?level=beginner&published=true HTTP/1.1`,
        resEx: `200 OK\n{\n  "data": [{ "id": 1, "title": "Python", "level": "beginner" }]\n}`,
        statusCode: '200 OK',
        code: `GET /api/v1/courses?level=beginner&published=true`
      },
      {
        num: 12, file: '12-filtering-and-searching.html', title: 'Filtering & Searching',
        subtopics: 'Multi-field filters · Full-text search · Search text normalization · Search indexes · Search result ranking · Search pagination · Search security · Search performance',
        summary: 'Filter multi-field criteria and perform full-text search index queries across collection endpoints.',
        resource: 'courses', method: 'GET', url: '/api/v1/courses?search=python&category=backend',
        reqEx: `GET /api/v1/courses?search=python&category=backend HTTP/1.1`,
        resEx: `200 OK\n{\n  "data": [{ "id": 1, "title": "Python Basics" }]\n}`,
        statusCode: '200 OK',
        code: `GET /api/v1/courses?search=python&category=backend`
      },
      {
        num: 13, file: '13-sorting.html', title: 'Sorting',
        subtopics: 'Sort by one field · Sort by multiple fields · Ascending order · Descending order (-field) · DB index optimization · Stable sorting',
        summary: 'Provide sorting capabilities for REST collections using sort key conventions (-price,name) and database index optimizations.',
        resource: 'products', method: 'GET', url: '/api/v1/products?sort=-price,name',
        reqEx: `GET /api/v1/products?sort=-price,name HTTP/1.1`,
        resEx: `200 OK\n{\n  "data": [{ "id": 99, "name": "Laptop", "price": 1200 }]\n}`,
        statusCode: '200 OK',
        code: `GET /api/v1/products?sort=-price,name`
      },
      {
        num: 14, file: '14-pagination.html', title: 'Pagination',
        subtopics: 'Why pagination is needed · Page-based pagination · Offset pagination · Limit · Page number · Cursor-based pagination · Next cursor · Previous cursor · Pagination metadata · Stable sorting · Large dataset performance',
        summary: 'Implement page/limit offset pagination and cursor-based pagination for high-performance dataset streaming.',
        resource: 'courses', method: 'GET', url: '/api/v1/courses?page=2&limit=10',
        reqEx: `GET /api/v1/courses?page=2&limit=10 HTTP/1.1`,
        resEx: `200 OK\n{\n  "data": [],\n  "meta": {\n    "page": 2,\n    "limit": 10,\n    "total": 45\n  }\n}`,
        statusCode: '200 OK',
        code: `/* Offset Example: */
GET /api/v1/courses?page=2&limit=10

/* Cursor Example: */
GET /api/v1/courses?cursor=eyJpZCI6MTAwfQ&limit=10`
      }
    ]
  },
  {
    phaseTag: 'Phase 07', phaseTitle: 'Validation & Error Handling', icon: '🛡️',
    chapters: [
      {
        num: 15, file: '15-validation.html', title: 'Validation',
        subtopics: 'Why validation is needed · Required fields · Data types · String length · Number limits · Email validation · Enum values · Nested validation · Cross-field validation · File validation · Validation error format',
        summary: 'Validate incoming payload body schemas and parameters, returning structured 422 validation error field arrays.',
        resource: 'courses', method: 'POST', url: '/api/v1/courses',
        reqEx: `POST /api/v1/courses\nContent-Type: application/json\n\n{\n  "level": "InvalidLevel"\n}`,
        resEx: `422 Unprocessable Content\n{\n  "error": {\n    "code": "VALIDATION_ERROR",\n    "message": "Request validation failed",\n    "fields": {\n      "title": "Title is required",\n      "level": "Level is invalid"\n    }\n  }\n}`,
        statusCode: '422 Unprocessable Content',
        code: `{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "fields": {
      "title": "Title is required",
      "level": "Level is invalid"
    }
  }
}`
      },
      {
        num: 16, file: '16-error-handling.html', title: 'Error Handling',
        subtopics: 'Client errors · Server errors · Custom error codes · Global error handler · Exception mapping · Validation errors · Database errors · External API errors · Logging internal details · Safe public messages · Correlation IDs · Retryable errors',
        summary: 'Intercept unhandled exceptions with global error middleware, mapping internal database errors to safe public HTTP responses with correlation IDs.',
        resource: 'courses', method: 'GET', url: '/api/v1/courses/abc',
        reqEx: `GET /api/v1/courses/abc HTTP/1.1`,
        resEx: `400 Bad Request\n{\n  "error": {\n    "code": "INVALID_ID",\n    "message": "ID must be a numeric integer",\n    "trace_id": "tr_8912a"\n  }\n}`,
        statusCode: '400 Bad Request',
        code: `/* Global Exception Handler -> Catch Error -> Log Internal Stack -> Send Safe JSON + Trace ID */`
      }
    ]
  },
  {
    phaseTag: 'Phase 08', phaseTitle: 'Authentication & Authorization', icon: '🔑',
    chapters: [
      {
        num: 17, file: '17-authentication.html', title: 'Authentication',
        subtopics: 'Authentication ante enti? · Authorization ante enti? · Login · Registration · Logout · Sessions · Cookies · API keys · Bearer tokens · JWT · OAuth2 · OpenID Connect · Password hashing · Multi-factor authentication',
        summary: 'OpenAPI standard API descriptions lo API key, cookie, mutual TLS, OAuth2 and OpenID Connect security schemes support chestundi.',
        resource: 'auth', method: 'POST', url: '/api/v1/auth/login',
        reqEx: `POST /api/v1/auth/login\nContent-Type: application/json\n\n{\n  "email": "user@example.com",\n  "password": "Secret123!"\n}`,
        resEx: `200 OK\n{\n  "access_token": "eyJhbGci...",\n  "token_type": "Bearer",\n  "expires_in": 3600\n}`,
        statusCode: '200 OK',
        code: `/* Authentication Headers:
Authorization: Bearer token_abc123
X-API-Key: api_key_xyz987 */`
      },
      {
        num: 18, file: '18-jwt.html', title: 'JWT',
        subtopics: 'JWT structure · Header · Payload · Signature · Access tokens · Refresh tokens · Token expiry · Token validation · Token revocation · Role claims · Permission claims · Secure token storage · JWT risks',
        summary: 'Understand JWT token validation (Header.Payload.Signature), access/refresh token rotation, and Bearer authorization headers.',
        resource: 'profile', method: 'GET', url: '/api/v1/users/me',
        reqEx: `GET /api/v1/users/me HTTP/1.1\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,
        resEx: `200 OK\n{\n  "id": 1,\n  "email": "user@example.com",\n  "role": "student"\n}`,
        statusCode: '200 OK',
        code: `Authorization: Bearer <access-token>`
      },
      {
        num: 19, file: '19-authorization.html', title: 'Authorization',
        subtopics: 'Role-based access (RBAC) · Permission-based access · Admin endpoints · User-owned resources · Policy checks · Scope-based access · Multi-tenant access · Forbidden response (403) · Authorization middleware',
        summary: 'Enforce access control policies using RBAC, permission scopes, and 403 Forbidden authorization middleware.',
        resource: 'admin', method: 'DELETE', url: '/api/v1/courses/10',
        reqEx: `DELETE /api/v1/courses/10 HTTP/1.1\nAuthorization: Bearer student_token`,
        resEx: `403 Forbidden\n{\n  "error": {\n    "code": "FORBIDDEN",\n    "message": "Only admin users can delete courses"\n  }\n}`,
        statusCode: '403 Forbidden',
        code: `HTTP/1.1 403 Forbidden
Content-Type: application/json

{ "error": { "code": "FORBIDDEN", "message": "Access denied" } }`
      }
    ]
  },
  {
    phaseTag: 'Phase 09', phaseTitle: 'Security & Rate Limiting', icon: '🔒',
    chapters: [
      {
        num: 20, file: '20-cors.html', title: 'CORS',
        subtopics: 'Same-origin policy · CORS ante enti? · Simple request · Preflight request · OPTIONS · Allowed origins · Allowed methods · Allowed headers · Credentials · CORS errors · Development vs Production configuration',
        summary: 'CORS browser cross-origin request actual request mundu preflight request tho server permission check cheyyagaladu.',
        resource: 'cors', method: 'OPTIONS', url: '/api/v1/courses',
        reqEx: `OPTIONS /api/v1/courses HTTP/1.1\nOrigin: https://www.ourcompiler.com\nAccess-Control-Request-Method: POST`,
        resEx: `204 No Content\nAccess-Control-Allow-Origin: https://www.ourcompiler.com\nAccess-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`,
        statusCode: '204 No Content',
        code: `HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://www.ourcompiler.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization`
      },
      {
        num: 21, file: '21-rate-limiting.html', title: 'Rate Limiting',
        subtopics: 'Rate limiting ante enti? · Requests per minute · IP-based limits · User-based limits · Token-based limits · Login rate limits · API quotas · 429 Too Many Requests · Retry-After header · Redis rate limiting · Distributed rate limiting',
        summary: 'Mitigate API abuse and server overload using Token Bucket rate limiting in Redis, returning 429 Too Many Requests.',
        resource: 'search', method: 'GET', url: '/api/v1/courses?q=fast',
        reqEx: `GET /api/v1/courses?q=fast HTTP/1.1 (101st request in 1 min)`,
        resEx: `429 Too Many Requests\nX-RateLimit-Limit: 100\nX-RateLimit-Remaining: 0\nRetry-After: 60\n\n{\n  "error": { "code": "RATE_LIMIT_EXCEEDED", "message": "Too many requests" }\n}`,
        statusCode: '429 Too Many Requests',
        code: `HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
Retry-After: 60`
      },
      {
        num: 22, file: '22-api-security.html', title: 'API Security',
        subtopics: 'HTTPS · Input validation · SQL injection prevention · NoSQL injection · XSS · CSRF · Security headers · Rate limiting · Brute-force prevention · Request size limits · Secret management · Audit logging',
        summary: 'Protect REST APIs against OWASP Top 10 vulnerabilities: SQL injection, XSS, CSRF, brute-force attacks, and secret leaks.',
        resource: 'security', method: 'POST', url: '/api/v1/auth/login',
        reqEx: `POST /api/v1/auth/login\nContent-Type: application/json\n\n{\n  "email": "' OR '1'='1"\n}`,
        resEx: `400 Bad Request\n{\n  "error": { "code": "INVALID_EMAIL", "message": "Email format invalid" }\n}`,
        statusCode: '400 Bad Request',
        code: `Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY`
      }
    ]
  },
  {
    phaseTag: 'Phase 10', phaseTitle: 'OpenAPI & Documentation', icon: '📖',
    chapters: [
      {
        num: 23, file: '23-openapi.html', title: 'OpenAPI',
        subtopics: 'OpenAPI ante enti? · API specification · API metadata · Servers · Paths · Operations · Parameters · Request bodies · Responses · Schemas · Components · Security schemes · Tags · Examples',
        summary: 'OpenAPI is a programming-language-independent standard for describing HTTP APIs.',
        resource: 'openapi', method: 'GET', url: '/openapi.json',
        reqEx: `GET /openapi.json HTTP/1.1`,
        resEx: `200 OK\n{\n  "openapi": "3.0.0",\n  "info": { "title": "Our Compiler API", "version": "1.0.0" }\n}`,
        statusCode: '200 OK',
        code: `openapi: 3.0.0
info:
  title: Our Compiler REST API
  version: 1.0.0
paths:
  /api/v1/courses:
    get:
      summary: List all courses`
      },
      {
        num: 24, file: '24-swagger-ui.html', title: 'Swagger UI',
        subtopics: 'Swagger UI ante enti? · Interactive documentation · Testing endpoints · Request examples · Response examples · Authentication in Swagger · Schema display · API grouping · Documentation deployment · Versioning',
        summary: 'Render interactive API documentation using Swagger UI, allowing developers to execute test requests directly from the browser.',
        resource: 'swagger', method: 'GET', url: '/docs',
        reqEx: `GET /docs HTTP/1.1`,
        resEx: `200 OK (Swagger UI HTML Web Dashboard)`,
        statusCode: '200 OK',
        code: `/* Swagger UI Dashboard -> Try It Out -> Execute Request */`
      },
      {
        num: 25, file: '25-postman-and-curl.html', title: 'Postman & curl',
        subtopics: 'Postman · Insomnia · curl · HTTPie · Browser DevTools · Environment variables · Collections · Test scripts · Importing OpenAPI · Sharing API collections',
        summary: 'Master API client tooling: Postman collections, Insomnia environments, cURL terminal commands, and automated test scripts.',
        resource: 'client_tools', method: 'GET', url: '/api/v1/courses',
        reqEx: `curl -i -X GET https://api.ourcompiler.com/api/v1/courses`,
        resEx: `HTTP/1.1 200 OK\n{ "data": [] }`,
        statusCode: '200 OK',
        code: `# cURL execution example:
curl -i -X GET https://api.ourcompiler.com/api/v1/courses`
      }
    ]
  },
  {
    phaseTag: 'Phase 11', phaseTitle: 'Testing & Performance', icon: '🧪',
    chapters: [
      {
        num: 26, file: '26-api-testing.html', title: 'API Testing',
        subtopics: 'Unit testing · Integration testing · End-to-end testing · Contract testing · Request tests · Response tests · Status code tests · Header tests · JSON schema tests · Authentication tests · Validation tests · Error tests',
        summary: 'Write comprehensive automated test suites covering request payloads, HTTP status codes, headers, and JSON schema validation.',
        resource: 'test', method: 'GET', url: '/api/v1/courses',
        reqEx: `GET /api/v1/courses HTTP/1.1`,
        resEx: `200 OK\n(Assert status == 200 and data is Array)`,
        statusCode: '200 OK',
        code: `/* Automated API Test Spec:
GET /api/v1/courses -> Expect 200 OK -> Validate Schema */`
      },
      {
        num: 27, file: '27-contract-testing.html', title: 'Contract Testing',
        subtopics: 'API contract ante enti? · Consumer expectations · Provider expectations · OpenAPI validation · Breaking change detection · Consumer-driven contracts · Contract test workflow · Version compatibility · CI integration',
        summary: 'Prevent breaking changes across microservices using Consumer-Driven Contract Testing and OpenAPI contract verification.',
        resource: 'contract', method: 'POST', url: '/pact/verify',
        reqEx: `POST /pact/verify HTTP/1.1`,
        resEx: `200 OK\n{ "status": "CONTRACT_VERIFIED" }`,
        statusCode: '200 OK',
        code: `/* Pact Contract Verification: Consumer Specs <-> Provider Endpoints */`
      },
      {
        num: 28, file: '28-load-testing.html', title: 'Load Testing',
        subtopics: 'Load testing ante enti? · Stress testing · Spike testing · Endurance testing · Concurrent requests · Response latency · Throughput · Error rate · k6 overview · Apache JMeter overview · Bottleneck analysis · Performance baseline',
        summary: 'Benchmark API throughput and response latency under high concurrency using k6 and Apache JMeter test scripts.',
        resource: 'k6_test', method: 'GET', url: '/api/v1/courses',
        reqEx: `k6 run load_test.js`,
        resEx: `http_req_duration: avg=18ms p(95)=42ms\nhttp_reqs: 2500/s`,
        statusCode: '200 OK',
        code: `import http from 'k6/http';
export default function () {
  http.get('https://api.ourcompiler.com/api/v1/courses');
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 12', phaseTitle: 'Caching & Reliability', icon: '🚀',
    chapters: [
      {
        num: 29, file: '29-http-caching.html', title: 'HTTP Caching',
        subtopics: 'Cache ante enti? · Cache-Control · ETag · Last-Modified · Conditional requests · 304 Not Modified · Public cache · Private cache · No-cache · No-store · Cache invalidation · CDN overview',
        summary: 'Optimize latency and server load using HTTP caching headers: Cache-Control, ETag validation, and 304 Not Modified status codes.',
        resource: 'courses', method: 'GET', url: '/api/v1/courses',
        reqEx: `GET /api/v1/courses HTTP/1.1\nIf-None-Match: "w/33a918f"`,
        resEx: `304 Not Modified\nETag: "w/33a918f"\n(No response body)`,
        statusCode: '304 Not Modified',
        code: `HTTP/1.1 200 OK
Cache-Control: public, max-age=3600
ETag: "w/33a918f"`
      },
      {
        num: 30, file: '30-reliability-and-retries.html', title: 'Reliability & Retries',
        subtopics: 'Timeouts · Retries · Exponential backoff · Jitter · Circuit breaker · Bulkheads · Fallbacks · Idempotency keys · Graceful degradation · Health checks (Readiness, Liveness)',
        summary: 'Build fault-tolerant distributed API services using exponential backoff retries, Circuit Breaker patterns, and /healthz checks.',
        resource: 'health', method: 'GET', url: '/healthz',
        reqEx: `GET /healthz HTTP/1.1`,
        resEx: `200 OK\n{\n  "status": "UP",\n  "database": "connected",\n  "redis": "connected"\n}`,
        statusCode: '200 OK',
        code: `GET /healthz -> 200 OK {"status": "UP", "database": "connected"}`
      },
      {
        num: 31, file: '31-idempotency.html', title: 'Idempotency',
        subtopics: 'Idempotency ante enti? · Idempotent methods · Duplicate requests · Payment APIs · Idempotency key · Request storage · Retrying POST requests · Duplicate prevention · Conflict handling · Idempotency testing',
        summary: 'Prevent duplicate payment or transaction processing in non-idempotent POST requests using Idempotency-Key headers.',
        resource: 'payments', method: 'POST', url: '/api/v1/payments',
        reqEx: `POST /api/v1/payments\nIdempotency-Key: 7b2a-99f1-40ac\n\n{ "amount": 99.00 }`,
        resEx: `201 Created\n{ "transaction_id": "tx_9918", "status": "completed" }`,
        statusCode: '201 Created',
        code: `POST /api/v1/payments
Idempotency-Key: 7b2a-99f1-40ac`
      }
    ]
  },
  {
    phaseTag: 'Phase 13', phaseTitle: 'Real-Time APIs & Events', icon: '⚡',
    chapters: [
      {
        num: 32, file: '32-websockets.html', title: 'WebSockets',
        subtopics: 'WebSocket ante enti? · REST vs WebSocket · Connection · Messages · Broadcasting · Rooms · Authentication · Reconnection · Error handling · Chat API',
        summary: 'Establish persistent, full-duplex TCP connections for real-time bidirectional communication in chat apps and live dashboards.',
        resource: 'ws_chat', method: 'WS', url: 'wss://api.ourcompiler.com/ws/chat',
        reqEx: `GET /ws/chat HTTP/1.1\nUpgrade: websocket\nConnection: Upgrade`,
        resEx: `101 Switching Protocols\nUpgrade: websocket\nConnection: Upgrade`,
        statusCode: '101 Switching Protocols',
        code: `const socket = new WebSocket('wss://api.ourcompiler.com/ws/chat');
socket.onmessage = (event) => console.log(event.data);`
      },
      {
        num: 33, file: '33-server-sent-events.html', title: 'Server-Sent Events',
        subtopics: 'SSE ante enti? · One-way server updates · Event stream · Reconnection · Notifications · Progress updates · Browser EventSource · SSE vs WebSocket · Scaling SSE · SSE security',
        summary: 'SSE provides one-way server-to-client streaming updates over HTTP using text/event-stream content types.',
        resource: 'sse_progress', method: 'GET', url: '/api/v1/compiler/stream/sub_99',
        reqEx: `GET /api/v1/compiler/stream/sub_99 HTTP/1.1\nAccept: text/event-stream`,
        resEx: `200 OK\nContent-Type: text/event-stream\n\ndata: {"status": "compiling"}\n\ndata: {"status": "passed"}`,
        statusCode: '200 OK',
        code: `const evtSource = new EventSource('/api/v1/compiler/stream/sub_99');
evtSource.onmessage = (e) => console.log(JSON.parse(e.data));`
      },
      {
        num: 34, file: '34-webhooks.html', title: 'Webhooks',
        subtopics: 'Webhook ante enti? · Event notification · Webhook endpoint · Signature verification · Retry handling · Duplicate events · Event IDs · Webhook logs · Webhook testing · Payment webhook project',
        summary: 'Publish real-time event notifications to third-party endpoints, verifying payload integrity with HMAC SHA-256 signatures.',
        resource: 'webhooks', method: 'POST', url: 'https://client.example.com/webhooks/payments',
        reqEx: `POST /webhooks/payments HTTP/1.1\nX-Signature-SHA256: 7d2b8b9f1a2...\n\n{ "event": "payment.succeeded", "id": "evt_101" }`,
        resEx: `200 OK\n{ "received": true }`,
        statusCode: '200 OK',
        code: `X-Signature-SHA256: 7d2b8b9f1a2...`
      }
    ]
  },
  {
    phaseTag: 'Phase 14', phaseTitle: 'Advanced API Architecture', icon: '🏛️',
    chapters: [
      {
        num: 35, file: '35-api-gateway.html', title: 'API Gateway',
        subtopics: 'API gateway ante enti? · Routing · Authentication · Rate limiting · Load balancing · Request transformation · Response aggregation · Gateway security · Gateway monitoring · Microservices gateway',
        summary: 'Centralize routing, authentication, rate limiting, and SSL termination in front of backend microservices using API Gateways.',
        resource: 'gateway', method: 'GET', url: '/api/v1/users/10',
        reqEx: `GET /api/v1/users/10 HTTP/1.1 (Targeting API Gateway)`,
        resEx: `200 OK (Routed to User Microservice)`,
        statusCode: '200 OK',
        code: `Client -> API Gateway (Kong/NGINX) -> Microservices (Auth, Users, Compiler)`
      },
      {
        num: 36, file: '36-microservices-apis.html', title: 'Microservices APIs',
        subtopics: 'Monolith vs microservices · Service boundaries · Inter-service communication · REST between services · Service discovery · API gateway · Distributed tracing · Correlation IDs · Eventual consistency · Distributed transactions · Saga pattern · Service versioning',
        summary: 'Decompose monolithic backends into decoupled microservices communicating via inter-service REST, correlation IDs, and Saga transactions.',
        resource: 'microservice', method: 'GET', url: '/internal/v1/orders/1',
        reqEx: `GET /internal/v1/orders/1 HTTP/1.1\nX-Correlation-ID: corr_9918a`,
        resEx: `200 OK\n{ "order_id": 1, "status": "shipped" }`,
        statusCode: '200 OK',
        code: `GET /internal/v1/inventory/item_99 HTTP/1.1`
      },
      {
        num: 37, file: '37-graphql-and-grpc.html', title: 'GraphQL & gRPC Overview',
        subtopics: 'GraphQL ante enti? · REST vs GraphQL · gRPC ante enti? · REST vs gRPC · Protocol Buffers · Streaming · Internal services · Public APIs · Choosing the right protocol · Hybrid architecture',
        summary: 'Compare REST APIs with GraphQL flexible query selection and gRPC high-performance binary Protocol Buffer RPC streaming.',
        resource: 'graphql_grpc', method: 'POST', url: '/graphql',
        reqEx: `POST /graphql\nContent-Type: application/json\n\n{ query: "{ course(id: 1) { title level } }" }`,
        resEx: `200 OK\n{ "data": { "course": { "title": "Python", "level": "Beginner" } } }`,
        statusCode: '200 OK',
        code: `/* Protocol Selection:
REST: Public Web/Mobile APIs (HTTP + JSON)
GraphQL: Complex Frontend Query Projections
gRPC: High-Performance Internal Microservices */`
      }
    ]
  },
  {
    phaseTag: 'Phase 15', phaseTitle: 'Projects & Certification', icon: '🏆',
    chapters: [
      {
        num: 38, file: '38-rest-api-projects.html', title: 'REST API Projects',
        subtopics: 'Beginner Projects (Calculator, Todo, Notes, Contact API) · Intermediate Projects (Blog REST API, Auth API, E-commerce API) · Advanced Projects (Our Compiler REST API Architecture, Real-time Chat, Payment API) · Complete Our Compiler Endpoint Specification',
        summary: 'Build real-world REST API projects from beginner todo tools to advanced production microservices and our platform REST API specification.',
        resource: 'compiler_run', method: 'POST', url: '/api/v1/compiler/run',
        reqEx: `POST /api/v1/compiler/run\nContent-Type: application/json\n\n{\n  "language": "python",\n  "code": "print('Hello World!')"\n}`,
        resEx: `200 OK\n{\n  "submission_id": "sub_101",\n  "status": "success",\n  "stdout": "Hello World!\\n",\n  "execution_time_ms": 42\n}`,
        statusCode: '200 OK',
        code: `/* Our Compiler REST API Architecture:
Authentication: POST /api/v1/auth/register | login | refresh | logout
Languages:      GET  /api/v1/languages | /{slug}
Tutorials:      GET  /api/v1/tutorials | /{language} | /{language}/{lesson}
Compiler:       POST /api/v1/compiler/run | GET /api/v1/compiler/submissions/{id}
Quizzes:        GET  /api/v1/quizzes/{language} | POST /submit
Progress:       GET  /api/v1/progress | POST /progress | PATCH /{lessonId}
Bookmarks:      GET  /api/v1/bookmarks | POST /bookmarks | DELETE /{lessonId} */`
      },
      {
        num: 39, file: '39-rest-api-quiz.html', title: 'REST API Practice Quiz',
        subtopics: 'Comprehensive REST API Knowledge Check · 30 Multiple Choice Certification Exam Questions · HTTP, Status Codes, Security & Design',
        summary: 'Test your REST API engineering mastery with our 30-question interactive certification practice quiz.',
        resource: 'quiz', method: 'POST', url: '/api/v1/quizzes/rest-api/submit',
        reqEx: `POST /api/v1/quizzes/rest-api/submit\nContent-Type: application/json\n\n{ "answers": { "q1": "A", "q2": "B" } }`,
        resEx: `200 OK\n{\n  "score": 100,\n  "passed": true,\n  "certificate_id": "cert_rest_99182"\n}`,
        statusCode: '200 OK',
        code: `/* REST API Masterclass Certification Quiz Active! */`
      }
    ]
  }
];

// Helper to generate Accordion Sidebar HTML
function getRestSidebarHTML(activeNum) {
  let sidebarAccHTML = '';
  restPhases.forEach(phase => {
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
        ${phase.chapters.map(c => `<a href="/blog-rest-api/${c.file}" class="${c.num === activeNum ? 'active' : ''}">${c.num}. ${c.title}</a>`).join('')}
      </div>`;
  });
  return sidebarAccHTML;
}

// 3. Generate public/blog-rest-api.html (Master Index Page)
const allRestChapters = [];
restPhases.forEach(p => p.chapters.forEach(c => allRestChapters.push({ ...c, phaseTag: p.phaseTag, phaseTitle: p.phaseTitle, icon: p.icon })));

const masterIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>REST API Complete Roadmap — 39 Chapters, 15 Phases (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master REST API design, HTTP fundamentals, status codes, JSON formatting, CRUD operations, query parameters, validation, errors, security, JWT authentication, CORS, rate limiting, OpenAPI, Swagger UI, Postman, contract testing, load testing, HTTP caching, WebSockets, SSE, Webhooks, API Gateway, Microservices, REST API Projects, and Quiz with our complete 39-chapter roadmap across 15 phases." />
  <meta name="keywords" content="rest api tutorial, learn rest api, rest api masterclass, http request, http response, status codes, openapi, swagger, jwt auth, api security, cors, rate limiting, websockets, sse, webhooks, api gateway, microservices" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-rest-api.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-rest-api/style.css" />
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
<body class="lang-rest-api">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rest-api.html" class="active">REST API</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-nodejs.html">Node.js</a>
  <a href="/blog-react.html">React</a>
  <a href="/blog-vue.html">Vue.js</a>
  <a href="/blog-nextjs.html">Next.js</a>
  <a href="/blog-django.html">Django</a>
  <a href="/blog-flask.html">Flask</a>
  <a href="/blog-mysql.html">MySQL</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-css.html">CSS</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">REST API Roadmap</div>
    <a href="/blog-rest-api.html" class="sidebar-home-link active">🌐 REST API Course HOME</a>
    <div class="sidebar-accordion">
      ${getRestSidebarHTML(0)}
    </div>
    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/online-python-compiler.html" style="color:#10b981;font-weight:700;">▶ Run Code in IDE</a>
    <a href="/blog.html">📚 All Tutorials</a>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">REST API Complete Roadmap</span>
    </div>

    <h1 class="page-title">REST API Complete Masterclass (39 Chapters, 15 Phases)</h1>

    <div class="page-meta">
      <span class="badge">🌐 HTTP / RFC 9110</span>
      <span class="badge">🟢 39 Complete Chapters</span>
      <span class="badge">📂 15 Complete Phases</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">What is REST API? · HTTP Request &amp; Response · HTTP Methods &amp; Status Codes · Headers · Resources &amp; URLs · API Versioning · JSON · Request &amp; Response Schemas · CRUD APIs · Query Parameters · Filtering &amp; Searching · Sorting · Pagination · Validation · Error Handling · Authentication &amp; JWT · Authorization · CORS &amp; Rate Limiting · API Security · OpenAPI &amp; Swagger UI · Postman &amp; curl · API Testing · Contract Testing · Load Testing · HTTP Caching · Reliability &amp; Retries · Idempotency · WebSockets · SSE · Webhooks · API Gateway · Microservices APIs · GraphQL &amp; gRPC · REST API Projects &amp; Quiz</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's REST API Complete Master Course</strong>. REST (Representational State Transfer) is the architectural foundation of modern web and mobile applications. This comprehensive 39-chapter bootcamp guides you through HTTP fundamentals, status code semantics, clean URL design, security, JWT authentication, OpenAPI documentation, WebSockets, Webhooks, API Gateways, Microservices, and building real-world projects like Our Compiler REST API.</p>
    </div>

    <div style="background:linear-gradient(135deg,rgba(16,185,129,0.12),rgba(20,24,32,0.6));border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:24px;margin:28px 0;">
      <h3 style="color:#10b981;margin-bottom:10px;font-size:18px;">🎯 Ready to Master REST API Architecture?</h3>
      <p style="color:var(--text2);margin-bottom:16px;font-size:14.5px;">Choose where to start: explore REST introduction, CRUD APIs, WebSockets, Webhooks, API Gateway, Microservices, or Our Compiler REST API Architecture:</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/blog-rest-api/01-what-is-rest-api.html" style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 1: REST API Intro →</a>
        <a href="/blog-rest-api/10-crud-apis.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 5: CRUD APIs →</a>
        <a href="/blog-rest-api/18-jwt.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 8: JWT Auth →</a>
        <a href="/blog-rest-api/32-websockets.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 13: WebSockets →</a>
        <a href="/blog-rest-api/34-webhooks.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 13: Webhooks →</a>
        <a href="/blog-rest-api/38-rest-api-projects.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 15: Platform API →</a>
      </div>
    </div>

    <div class="section-title"><span class="num">📚</span> Master Course Curriculum</div>
    <div class="curriculum-roadmap-container">
      ${restPhases.map(phase => `
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
              <a href="/blog-rest-api/${ch.file}" class="curriculum-lesson-row">
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
        <span>REST API Complete Masterclass · 39 Chapters · 15 Phases · 2026 Edition</span>
      </div>
    </div>

    <div class="nav-footer">
      <a href="/blog.html" class="nav-btn"><span class="label">← All Tutorials</span><span class="title">Course Hub</span></a>
      <a href="/blog-rest-api/01-what-is-rest-api.html" class="nav-btn" style="text-align:right;"><span class="label">Start Learning →</span><span class="title">1. What is REST API?</span></a>
    </div>
  </main>
</div>
<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'blog-rest-api.html'), masterIndexHtml, 'utf8');
console.log('✅ Generated public/blog-rest-api.html master index page successfully!');

// 4. Generate all 39 Chapter HTML Files inside public/blog-rest-api/ adhering strictly to the 18-Section Lesson Layout
allRestChapters.forEach((ch, idx) => {
  const prevChapter = idx > 0 ? allRestChapters[idx - 1] : null;
  const nextChapter = idx < allRestChapters.length - 1 ? allRestChapters[idx + 1] : null;

  const chapterHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>REST API — ${ch.title} | Our Compiler</title>
  <meta name="description" content="Complete REST API Chapter ${ch.num}: ${ch.title}. Learn ${ch.subtopics} with practical HTTP payloads, status code semantics, and step-by-step walkthroughs." />
  <meta name="keywords" content="rest api tutorial, learn rest api, ${ch.title.toLowerCase()}, http request, http response, status codes, openapi, swagger" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-rest-api/${ch.file}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-rest-api/style.css" />
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
<body class="lang-rest-api">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rest-api.html" class="active">REST API</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-nodejs.html">Node.js</a>
  <a href="/blog-react.html">React</a>
  <a href="/blog-vue.html">Vue.js</a>
  <a href="/blog-nextjs.html">Next.js</a>
  <a href="/blog-django.html">Django</a>
  <a href="/blog-flask.html">Flask</a>
  <a href="/blog-mysql.html">MySQL</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-css.html">CSS</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">REST API Tutorial</div>
    <a href="/blog-rest-api.html" class="sidebar-home-link">🌐 REST API HOME</a>
    <div class="sidebar-accordion">
      ${getRestSidebarHTML(ch.num)}
    </div>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-rest-api.html">REST API</a><span class="sep">›</span>
      <span class="current">REST API — ${ch.title}</span>
    </div>

    <h1 class="page-title">REST API — ${ch.title}</h1>

    <div class="page-meta">
      <span class="badge">🌐 HTTP / RFC 9110</span>
      <span class="badge">🟢 Chapter ${ch.num} of ${allRestChapters.length}</span>
      <span class="badge">📂 ${ch.phaseTag}: ${ch.phaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this chapter:</span>
      <span class="topic-pill-text">${ch.subtopics}</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>REST API — ${ch.title}</strong> in our REST API Complete Masterclass! ${ch.summary}</p>
    </div>

    <!-- 1. Simple introduction -->
    <div class="section-title"><span class="num">1</span>Simple Introduction</div>
    <div class="section-body">
      <p>In web application engineering, understanding <strong>${ch.title}</strong> is essential for building scalable, secure, and developer-friendly REST APIs. REST APIs communicate using HTTP protocol standards and JSON representations.</p>
    </div>

    <!-- 2. What you will learn -->
    <div class="section-title"><span class="num">2</span>What You Will Learn</div>
    <div class="section-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:16px 20px;margin-bottom:24px;">
        <strong style="color:#10b981;display:block;margin-bottom:10px;">📚 Learning Objectives:</strong>
        <ul style="margin:0 0 0 20px;line-height:1.8;">
          <li>Master HTTP protocol mechanics behind <strong>${ch.title}</strong></li>
          <li>Understand request/response semantics, headers, and status code specifications</li>
          <li>Design standardized, production-ready RESTful endpoints and JSON payloads</li>
          <li>Avoid common architectural pitfalls, security flaws, and breaking API changes</li>
        </ul>
      </div>
    </div>

    <!-- 3. Why this concept is useful -->
    <div class="section-title"><span class="num">3</span>Why ${ch.title} is Useful</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">💡 Practical Utility</div>
        <p>REST APIs connect web frontends, mobile applications, microservices, and third-party integrations. Mastering <strong>${ch.title}</strong> equips developers to build robust API backends in Node.js, Python, Java, Go, Ruby, and PHP.</p>
      </div>
    </div>

    <!-- 4. Resource design -->
    <div class="section-title"><span class="num">4</span>Resource Design</div>
    <div class="section-body">
      <p>Target Resource Entity: <code>${ch.resource}</code>. RESTful resource design focuses on nouns representing business domain objects rather than action verbs.</p>
    </div>

    <!-- 5. HTTP method -->
    <div class="section-title"><span class="num">5</span>HTTP Method</div>
    <div class="section-body">
      <p>HTTP Method: <code style="color:#10b981;font-weight:700;">${ch.method}</code>. Defines the operation performed on the target resource contract.</p>
    </div>

    <!-- 6. Endpoint URL -->
    <div class="section-title"><span class="num">6</span>Endpoint URL</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header"><span class="lang-tag">Target Endpoint URL</span></div>
        <pre><code>${ch.method} ${ch.url}</code></pre>
      </div>
    </div>

    <!-- 7. Request example -->
    <div class="section-title"><span class="num">7</span>Request Example</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header"><span class="lang-tag">HTTP Request Example</span></div>
        <pre><code>${ch.reqEx}</code></pre>
      </div>
    </div>

    <!-- 8. Response example -->
    <div class="section-title"><span class="num">8</span>Response Example</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header"><span class="lang-tag">HTTP Response Example</span></div>
        <pre><code>${ch.resEx}</code></pre>
      </div>
    </div>

    <!-- 9. Status code -->
    <div class="section-title"><span class="num">9</span>Status Code</div>
    <div class="section-body">
      <div class="card" style="background:var(--bg2);padding:14px 18px;border-radius:8px;margin:16px 0;border-left:4px solid #10b981;">
        <strong style="color:#10b981;">HTTP Status Code: ${ch.statusCode}</strong>
        <p style="margin-top:6px;font-size:13.5px;color:var(--text2);">Indicates successful execution or specific client/server error condition per RFC 9110 semantics.</p>
      </div>
    </div>

    <!-- 10. Server-side flow -->
    <div class="section-title"><span class="num">10</span>Server-Side Flow</div>
    <div class="section-body">
      <div class="diagram-box">HTTP Request Received -> Router Matching -> Authentication & CORS -> Validation -> Service Logic -> Database Operation -> JSON Serialization -> HTTP Response</div>
    </div>

    <!-- 11. Validation -->
    <div class="section-title"><span class="num">11</span>Validation</div>
    <div class="section-body">
      <p>Server-side request validation ensures required fields, data types, email formats, and parameter ranges are satisfied before executing database queries. If validation fails, the API responds with <code>422 Unprocessable Content</code>.</p>
    </div>

    <!-- 12. Database operation -->
    <div class="section-title"><span class="num">12</span>Database Operation</div>
    <div class="section-body">
      <p>Queries are executed using parameterized SQL or ORM abstractions (e.g. <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>), preventing SQL injection vulnerabilities.</p>
    </div>

    <!-- 13. Common mistakes -->
    <div class="section-title"><span class="num">13</span>Common Mistakes</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">⚠️ Anti-Patterns to Avoid</div>
        <ul style="margin:8px 0 0 18px;line-height:1.7;">
          <li>Using verbs in URLs (e.g. <code>/getCourses</code> or <code>/createCourse</code>).</li>
          <li>Returning <code>200 OK</code> for all error responses containing <code>{"error": true}</code> inside JSON.</li>
          <li>Failing to validate input or concatenating unescaped SQL/NoSQL query strings.</li>
          <li>Confusing Authentication (who you are) with Authorization (what you can do).</li>
          <li>Returning huge dataset lists without pagination.</li>
          <li>Hardcoding API secrets or credentials in public client code.</li>
        </ul>
      </div>
    </div>

    <!-- 14. Coding challenge -->
    <div class="section-title"><span class="num">14</span>Coding Challenge</div>
    <div class="section-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:18px 22px;margin-bottom:24px;">
        <strong style="color:#10b981;display:block;margin-bottom:8px;">🎯 Hands-On Challenge:</strong>
        <p>Create a REST API for lessons featuring: <code>GET /api/v1/lessons</code>, <code>GET /api/v1/lessons/{id}</code>, <code>POST /api/v1/lessons</code>, <code>PATCH /api/v1/lessons/{id}</code>, <code>DELETE /api/v1/lessons/{id}</code> with request validation, pagination, search, authentication, error response envelopes, and OpenAPI documentation!</p>
      </div>
    </div>

    <!-- 15. Mini quiz -->
    <div class="section-title"><span class="num">15</span>Mini Quiz</div>
    <div class="section-body">
      <div class="faq-card">
        <h4>❓ Question: What is the primary role of ${ch.title} in REST API design?</h4>
        <p><strong>Answer:</strong> It provides standardized HTTP mechanisms for ${ch.subtopics.split('·')[0].trim()}, building predictable and scalable APIs.</p>
      </div>
    </div>

    <!-- 16. Quick recap -->
    <div class="section-title"><span class="num">16</span>Quick Recap</div>
    <div class="section-body">
      <ul style="line-height:1.8;margin-left:20px;">
        <li>${ch.summary}</li>
        <li>POST creates resources (201 Created), GET reads data (200 OK), PATCH partially updates (200 OK), DELETE removes resources (204 No Content).</li>
        <li>Follow RFC 9110 HTTP semantics, status code standards, and REST design best practices.</li>
      </ul>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on RFC 9110 HTTP Standards · Last updated August 2026</span>
      </div>
    </div>

    <!-- 17 & 18. Previous & Next Lesson Navigation -->
    <div class="nav-footer">
      ${prevChapter ? `<a href="${prevChapter.file}" class="nav-btn"><span class="label">← Previous Lesson</span><span class="title">${prevChapter.num}. ${prevChapter.title}</span></a>` : `<a href="/blog-rest-api.html" class="nav-btn"><span class="label">← REST API Overview</span><span class="title">Course Index</span></a>`}
      ${nextChapter ? `<a href="${nextChapter.file}" class="nav-btn" style="text-align:right;"><span class="label">Next Lesson →</span><span class="title">${nextChapter.num}. ${nextChapter.title}</span></a>` : `<a href="/blog-rest-api.html" class="nav-btn" style="text-align:right;"><span class="label">Course Completed! 🎉</span><span class="title">REST API Index</span></a>`}
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;

  const filePath = path.join(restDir, ch.file);
  fs.writeFileSync(filePath, chapterHtml, 'utf8');
  console.log(`🔥 Generated REST API Chapter: ${ch.file} (${(chapterHtml.length / 1024).toFixed(1)}KB)`);
});

console.log('✅ Generated all 39 REST API Masterclass chapter files in public/blog-rest-api/ successfully!');
