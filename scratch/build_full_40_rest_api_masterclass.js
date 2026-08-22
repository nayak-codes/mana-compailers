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

// 2. Define Complete 40-Chapter REST API Masterclass Data Structure across 14 Phases
const restPhases = [
  {
    phaseTag: 'Phase 01', phaseTitle: 'REST API Introduction', icon: '🌐',
    chapters: [
      {
        num: 1, file: '01-rest-api-ante-enti-what-is-rest-api.html', title: 'REST API Ante Enti?',
        subtopics: 'API ante enti? · REST ante enti? · REST API ante enti? · Client and server · Request and response · Resource ante enti? · Representation ante enti? · Statelessness · Uniform interface · Cacheability · Layered system · REST use cases · REST limitations · REST vs GraphQL · REST vs SOAP · REST vs WebSocket',
        summary: 'REST API is an HTTP-based interface that allows applications to communicate using resources, URLs, HTTP methods, headers and representations such as JSON.',
        code: `/* REST Architecture Request Flow:
Frontend / Mobile App
        ↓ HTTP Request
REST API Server
        ↓
Database / Business Logic
        ↑
JSON Response */`
      }
    ]
  },
  {
    phaseTag: 'Phase 02', phaseTitle: 'HTTP Fundamentals', icon: '📡',
    chapters: [
      {
        num: 2, file: '02-http-request.html', title: 'HTTP Request',
        subtopics: 'HTTP ante enti? · Request line · Request method · Request URL · Request headers · Request body · Query parameters · Path parameters · Cookies · Authentication headers · Content type · Accept header · Request lifecycle',
        summary: 'HTTP headers client and server madhya additional information pass cheyyadaniki use avutayi.',
        code: `POST /api/courses HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer token_abc123

{
  "title": "REST API Masterclass",
  "level": "Beginner"
}`
      },
      {
        num: 3, file: '03-http-response.html', title: 'HTTP Response',
        subtopics: 'Status line · Status code · Response headers · Response body · JSON response · Empty response · Error response · Content type · Cache headers · CORS headers · Request ID header · Response timing',
        summary: 'Analyze HTTP Response anatomy: status line (200 OK, 201 Created), response headers, JSON payload formatting, and CORS headers.',
        code: `HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8
Location: /api/courses/42
X-Request-ID: req_8f7b2a9c

{
  "id": 42,
  "title": "REST API Masterclass",
  "status": "published"
}`
      },
      {
        num: 4, file: '04-http-methods.html', title: 'HTTP Methods',
        subtopics: 'GET · POST · PUT · PATCH · DELETE · HEAD · OPTIONS · Safe methods · Idempotent methods · Method selection · Method misuse · Method security',
        summary: 'HTTP method semantics, status codes and request/response behavior RFC 9110 lo define chestundi.',
        code: `/* HTTP Methods Overview:
GET    /api/courses    -> Read data (Safe & Idempotent)
POST   /api/courses    -> Create data (Non-Idempotent)
PUT    /api/courses/1  -> Replace data (Idempotent)
PATCH  /api/courses/1  -> Partially update data
DELETE /api/courses/1  -> Remove data (Idempotent) */`
      },
      {
        num: 5, file: '05-http-status-codes.html', title: 'HTTP Status Codes',
        subtopics: '1xx informational · 2xx success · 3xx redirection · 4xx client errors · 5xx server errors · 200 OK · 201 Created · 202 Accepted · 204 No Content · 400 Bad Request · 401 Unauthorized · 403 Forbidden · 404 Not Found · 409 Conflict · 422 Unprocessable Content · 429 Too Many Requests · 500 Internal Server Error · 503 Service Unavailable',
        summary: 'HTTP status codes five major classes lo grouped untayi; 4xx client errors, 5xx server errors indicate chestayi.',
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
      }
    ]
  },
  {
    phaseTag: 'Phase 03', phaseTitle: 'Resource and URL Design', icon: '📐',
    chapters: [
      {
        num: 6, file: '06-resources.html', title: 'Resources',
        subtopics: 'Resource ante enti? · Resource naming · Nouns vs verbs · Singular resources · Collection resources · Nested resources · Resource identifiers · Slugs · Public IDs · Resource relationships · Avoiding action URLs · Consistent naming',
        summary: 'Design RESTful URIs using plural nouns and sub-resource hierarchies while strictly avoiding action verbs in paths.',
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
        num: 7, file: '07-url-structure.html', title: 'URL Structure',
        subtopics: 'Base URL · API prefix · Version prefix · Resource path · Path parameters · Query parameters · Nested paths · Trailing slash · URL encoding · Slugs · Case conventions · URL length',
        summary: 'Format scalable REST URL structures using base URLs, version prefixes, path parameters, and lowercase hyphenated slugs.',
        code: `https://api.ourcompiler.com/api/v1/tutorials/python/lessons`
      },
      {
        num: 8, file: '08-api-versioning.html', title: 'API Versioning',
        subtopics: 'Why versioning is needed · URL versioning · Header versioning · Query versioning · v1 · v2 · Breaking changes · Non-breaking changes · Deprecation · Migration guides · Backward compatibility · Sunset headers',
        summary: 'Version REST APIs to isolate breaking schema changes using URL prefixes, Accept headers, and Sunset deprecation headers.',
        code: `GET /api/v1/courses
GET /api/v2/courses`
      }
    ]
  },
  {
    phaseTag: 'Phase 04', phaseTitle: 'JSON and Data Formats', icon: '📄',
    chapters: [
      {
        num: 9, file: '09-json-basics.html', title: 'JSON Basics',
        subtopics: 'JSON ante enti? · JSON object · JSON array · Strings · Numbers · Boolean · Null · Nested objects · Nested arrays · JSON encoding · JSON decoding · Invalid JSON · JSON size · JSON naming conventions',
        summary: 'Format structured REST API data representations using standard JSON objects, primitive types, arrays, and camelCase/snake_case keys.',
        code: `{
  "id": 1,
  "title": "Python",
  "level": "Beginner",
  "published": true,
  "tags": ["programming", "backend"]
}`
      },
      {
        num: 10, file: '10-request-and-response-schemas.html', title: 'Request & Response Schemas',
        subtopics: 'Request schema · Response schema · DTO · Required fields · Optional fields · Nullable fields · Nested schema · Pagination schema · Error schema · Schema versioning · Sensitive field filtering · Consistent data shape',
        summary: 'Establish consistent success and error response payload shapes across all API endpoints using DTO schemas.',
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
        num: 11, file: '11-create-resource.html', title: 'Create Resource (POST)',
        subtopics: 'POST request · Request body · Validation · Database insert · 201 Created · Location header · Created response · Duplicate resource · Idempotency key · Create error handling',
        summary: 'Implement resource creation endpoints with POST requests, returning HTTP 201 Created and Location headers.',
        code: `POST /api/v1/courses
Content-Type: application/json

{
  "title": "JavaScript",
  "level": "Beginner"
}`
      },
      {
        num: 12, file: '12-read-resources.html', title: 'Read Resources (GET)',
        subtopics: 'Get collection · Get single resource · Path ID · Query filters · Sorting · Pagination · Field selection · 404 Not Found · Empty collection · Caching · ETags overview · Conditional requests',
        summary: 'Retrieve individual resources or collections using GET requests, supporting query parameters, pagination, and 404 Not Found.',
        code: `GET /api/v1/courses
GET /api/v1/courses/10
GET /api/v1/courses?level=beginner`
      },
      {
        num: 13, file: '13-update-resource.html', title: 'Update Resource (PUT & PATCH)',
        subtopics: 'PUT · PATCH · Full replacement · Partial update · Validation · Optimistic locking · Update response · 200 OK · 204 No Content · Missing resource · Conflict response · Concurrent updates',
        summary: 'Differentiate PUT full entity replacements from PATCH partial updates, handling optimistic concurrency locks and 200 OK.',
        code: `PATCH /api/v1/courses/10
Content-Type: application/json

{
  "price": 49.99
}`
      },
      {
        num: 14, file: '14-delete-resource.html', title: 'Delete Resource (DELETE)',
        subtopics: 'DELETE · Hard delete · Soft delete · Archive resource · Delete permissions · Cascade deletion · 204 No Content · Idempotent delete · Delete errors · Recovery strategy',
        summary: 'Remove or soft-delete resources using DELETE endpoints, returning 204 No Content upon successful removal.',
        code: `DELETE /api/v1/courses/10 HTTP/1.1`
      }
    ]
  },
  {
    phaseTag: 'Phase 06', phaseTitle: 'Querying, Filtering & Pagination', icon: '🔍',
    chapters: [
      {
        num: 15, file: '15-query-parameters.html', title: 'Query Parameters',
        subtopics: 'Query parameter ante enti? · Filtering · Search · Sorting · Multiple filters · Date filters · Range filters · Boolean filters · Query validation · URL encoding · Default values · Invalid query response',
        summary: 'Filter and search collection endpoints using URL query parameters (?level=beginner&published=true).',
        code: `GET /api/v1/courses?level=beginner&published=true`
      },
      {
        num: 16, file: '16-pagination.html', title: 'Pagination Strategies',
        subtopics: 'Why pagination is needed · Page-based pagination · Offset pagination · Limit · Page number · Cursor-based pagination · Next cursor · Previous cursor · Pagination metadata · Stable sorting · Large dataset performance',
        summary: 'Implement page/limit offset pagination and cursor-based pagination for high-performance dataset streaming.',
        code: `/* Offset Example: */
GET /api/v1/courses?page=2&limit=10

/* Cursor Example: */
GET /api/v1/courses?cursor=eyJpZCI6MTAwfQ&limit=10`
      },
      {
        num: 17, file: '17-sorting-and-searching.html', title: 'Sorting and Searching',
        subtopics: 'Sort by one field · Sort by multiple fields · Ascending order · Descending order · Search text · Full-text search · Search normalization · Search indexes · Search result ranking · Search pagination · Search security',
        summary: 'Provide sorting capabilities for REST collections using sort key conventions and full-text search index queries.',
        code: `GET /api/v1/products?sort=-price,name&q=python`
      }
    ]
  },
  {
    phaseTag: 'Phase 07', phaseTitle: 'Validation and Errors', icon: '🛡️',
    chapters: [
      {
        num: 18, file: '18-request-validation.html', title: 'Request Validation',
        subtopics: 'Why validation is needed · Required fields · Data types · String length · Number limits · Email validation · Enum values · Nested validation · Cross-field validation · File validation · Validation error format',
        summary: 'Validate incoming payload body schemas and parameters, returning structured 422 validation error field arrays.',
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
        num: 19, file: '19-error-handling.html', title: 'Error Handling',
        subtopics: 'Client errors · Server errors · Custom error codes · Global error handler · Exception mapping · Validation errors · Database errors · External API errors · Logging internal details · Safe public messages · Correlation IDs',
        summary: 'Intercept unhandled exceptions with global error middleware, mapping internal database errors to safe public HTTP responses.',
        code: `/* Global Exception Handler -> Catch Error -> Log Internal Stack -> Send Safe JSON to Client */`
      },
      {
        num: 20, file: '20-error-design.html', title: 'Error Design',
        subtopics: 'Consistent error format · Machine-readable code · Human-readable message · Field-level details · Trace ID · Error documentation · Localization · Retry instructions · Avoiding sensitive data · Error versioning',
        summary: 'Design machine-readable error payload envelopes with unique error codes, developer messages, and correlation trace IDs.',
        code: `{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please wait 60 seconds.",
    "trace_id": "tr_99182ab"
  }
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 08', phaseTitle: 'Authentication & Authorization', icon: '🔑',
    chapters: [
      {
        num: 21, file: '21-authentication-basics.html', title: 'Authentication Basics',
        subtopics: 'Authentication vs Authorization · Login · Registration · Logout · Sessions · Cookies · API keys · Bearer tokens · JWT · OAuth2 · OpenID Connect · Password hashing · Multi-factor authentication',
        summary: 'OpenAPI standard API descriptions lo API key, cookie, mutual TLS, OAuth2 and OpenID Connect security schemes support chestundi.',
        code: `/* Authentication Headers:
Authorization: Bearer token_abc123
X-API-Key: api_key_xyz987 */`
      },
      {
        num: 22, file: '22-jwt-authentication.html', title: 'JWT Authentication',
        subtopics: 'JWT structure · Header · Payload · Signature · Access tokens · Refresh tokens · Token expiry · Token validation · Token revocation · Role claims · Permission claims · Secure token storage · JWT risks',
        summary: 'Understand JWT token validation (Header.Payload.Signature), access/refresh token rotation, and Bearer authorization headers.',
        code: `Authorization: Bearer <access-token>`
      },
      {
        num: 23, file: '23-authorization.html', title: 'Authorization',
        subtopics: 'Role-based access (RBAC) · Permission-based access · Admin endpoints · User-owned resources · Policy checks · Scope-based access · Multi-tenant access · Forbidden response (403) · Authorization middleware',
        summary: 'Enforce access control policies using RBAC, permission scopes, and 403 Forbidden authorization middleware.',
        code: `HTTP/1.1 403 Forbidden
Content-Type: application/json

{ "error": { "code": "FORBIDDEN", "message": "Access denied" } }`
      }
    ]
  },
  {
    phaseTag: 'Phase 09', phaseTitle: 'API Security & Rate Limiting', icon: '🔒',
    chapters: [
      {
        num: 24, file: '24-api-security.html', title: 'API Security',
        subtopics: 'HTTPS · Input validation · SQL injection prevention · NoSQL injection · XSS · CSRF · CORS · Security headers · Rate limiting · Brute-force prevention · Request size limits · File upload security · Secret management · Audit logging',
        summary: 'Protect REST APIs against OWASP Top 10 vulnerabilities: SQL injection, XSS, CSRF, brute-force attacks, and secret leaks.',
        code: `Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY`
      },
      {
        num: 25, file: '25-cors.html', title: 'CORS',
        subtopics: 'Same-origin policy · CORS ante enti? · Simple request · Preflight request · OPTIONS · Allowed origins · Allowed methods · Allowed headers · Credentials · CORS errors · Development vs Production configuration',
        summary: 'CORS browser cross-origin request actual request mundu preflight request tho server permission check cheyyagaladu.',
        code: `HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://www.ourcompiler.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization`
      },
      {
        num: 26, file: '26-rate-limiting.html', title: 'Rate Limiting',
        subtopics: 'Rate limiting ante enti? · Requests per minute · IP-based limits · User-based limits · Token-based limits · Login rate limits · API quotas · 429 Too Many Requests · Retry-After header · Redis rate limiting · Distributed rate limiting',
        summary: 'Mitigate API abuse and server overload using Token Bucket rate limiting in Redis, returning 429 Too Many Requests.',
        code: `HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
Retry-After: 60`
      }
    ]
  },
  {
    phaseTag: 'Phase 10', phaseTitle: 'API Documentation & Client Tools', icon: '📖',
    chapters: [
      {
        num: 27, file: '27-openapi.html', title: 'OpenAPI Specification',
        subtopics: 'OpenAPI ante enti? · API specification · API metadata · Servers · Paths · Operations · Parameters · Request bodies · Responses · Schemas · Components · Security schemes · Tags · Examples',
        summary: 'OpenAPI is a programming-language-independent standard for describing HTTP APIs.',
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
        num: 28, file: '28-swagger-ui.html', title: 'Swagger UI',
        subtopics: 'Swagger UI ante enti? · Interactive documentation · Testing endpoints · Request examples · Response examples · Authentication in Swagger · Schema display · API grouping · Documentation deployment · Versioning',
        summary: 'Render interactive API documentation using Swagger UI, allowing developers to execute test requests directly from the browser.',
        code: `/* Swagger UI Dashboard -> Try It Out -> Execute Request */`
      },
      {
        num: 29, file: '29-api-client-tools.html', title: 'API Client Tools',
        subtopics: 'Postman · Insomnia · curl · HTTPie · Browser DevTools · Environment variables · Collections · Test scripts · Importing OpenAPI · Sharing API collections',
        summary: 'Master API client tooling: Postman collections, Insomnia environments, cURL terminal commands, and automated test scripts.',
        code: `# cURL execution example:
curl -i -X GET https://api.example.com/api/v1/courses`
      }
    ]
  },
  {
    phaseTag: 'Phase 11', phaseTitle: 'API Testing & Performance', icon: '🧪',
    chapters: [
      {
        num: 30, file: '30-api-testing-basics.html', title: 'API Testing Basics',
        subtopics: 'Unit testing · Integration testing · End-to-end testing · Contract testing · Request tests · Response tests · Status code tests · Header tests · JSON schema tests · Authentication tests · Validation tests · Error tests',
        summary: 'Write comprehensive automated test suites covering request payloads, HTTP status codes, headers, and JSON schema validation.',
        code: `/* Automated API Test Spec:
GET /api/v1/courses -> Expect 200 OK -> Validate Schema */`
      },
      {
        num: 31, file: '31-contract-testing.html', title: 'Contract Testing',
        subtopics: 'API contract ante enti? · Consumer expectations · Provider expectations · OpenAPI validation · Breaking change detection · Consumer-driven contracts · Contract test workflow · Version compatibility · CI integration',
        summary: 'Prevent breaking changes across microservices using Consumer-Driven Contract Testing and OpenAPI contract verification.',
        code: `/* Pact Contract Verification: Consumer Specs <-> Provider Endpoints */`
      },
      {
        num: 32, file: '32-load-and-performance-testing.html', title: 'Load & Performance Testing',
        subtopics: 'Load testing ante enti? · Stress testing · Spike testing · Endurance testing · Concurrent requests · Response latency · Throughput · Error rate · k6 overview · Apache JMeter overview · Bottleneck analysis · Performance baseline',
        summary: 'Benchmark API throughput and response latency under high concurrency using k6 and Apache JMeter test scripts.',
        code: `import http from 'k6/http';
export default function () {
  http.get('https://api.example.com/api/v1/courses');
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 12', phaseTitle: 'Caching & Reliability', icon: '🚀',
    chapters: [
      {
        num: 33, file: '33-http-caching.html', title: 'HTTP Caching',
        subtopics: 'Cache ante enti? · Cache-Control · ETag · Last-Modified · Conditional requests · 304 Not Modified · Public cache · Private cache · No-cache · No-store · Cache invalidation · CDN overview',
        summary: 'Optimize latency and server load using HTTP caching headers: Cache-Control, ETag validation, and 304 Not Modified status codes.',
        code: `HTTP/1.1 200 OK
Cache-Control: public, max-age=3600
ETag: "w/99a87f1"`
      },
      {
        num: 34, file: '34-reliability.html', title: 'Reliability & Resilience',
        subtopics: 'Timeouts · Retries · Exponential backoff · Jitter · Circuit breaker · Bulkheads · Fallbacks · Idempotency keys · Graceful degradation · Health checks (Readiness, Liveness)',
        summary: 'Build fault-tolerant distributed API services using exponential backoff retries, Circuit Breaker patterns, and /healthz checks.',
        code: `GET /healthz -> 200 OK {"status": "UP", "database": "connected"}`
      },
      {
        num: 35, file: '35-idempotency.html', title: 'Idempotency',
        subtopics: 'Idempotency ante enti? · Idempotent methods · Duplicate requests · Payment APIs · Idempotency key · Request storage · Retrying POST requests · Duplicate prevention · Conflict handling · Idempotency testing',
        summary: 'Prevent duplicate payment or transaction processing in non-idempotent POST requests using Idempotency-Key headers.',
        code: `POST /api/v1/payments
Idempotency-Key: 7b2a-99f1-40ac`
      }
    ]
  },
  {
    phaseTag: 'Phase 13', phaseTitle: 'Framework Implementations', icon: '⚙️',
    chapters: [
      {
        num: 36, file: '36-building-a-restful-ecommerce-api.html', title: 'E-Commerce REST API Design',
        subtopics: 'Complete RESTful E-Commerce Architecture · Endpoints for Auth, Products, Cart, Orders · JSON Schemas & HTTP Status Codes',
        summary: 'Architect a production-ready RESTful E-Commerce API covering resources, endpoints, HTTP status codes, and JSON schemas.',
        code: `POST /api/v1/cart/items
POST /api/v1/checkout/orders`
      },
      {
        num: 37, file: '37-nodejs-express-rest-api-implementation.html', title: 'Node.js Express REST API',
        subtopics: 'Building runnable Express.js REST API · Router setup · Controller functions · JWT authentication middleware · Error handler middleware',
        summary: 'Build a production-grade Node.js and Express REST API featuring modular routing, JWT auth middleware, and error handling.',
        code: `const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/v1/courses', (req, res) => {
  res.json({ success: true, data: [] });
});`
      },
      {
        num: 38, file: '38-python-fastapi-rest-api-implementation.html', title: 'Python FastAPI REST API',
        subtopics: 'Building auto-documented FastAPI REST API · Pydantic schemas · Dependency injection · Async route handlers · OpenAPI Swagger auto-gen',
        summary: 'Create high-performance asynchronous REST APIs in Python using FastAPI, Pydantic type validation, and automatic Swagger docs.',
        code: `from fastapi import FastAPI
app = FastAPI()

@app.get("/api/v1/courses")
def get_courses():
    return {"status": "success", "courses": []}`
      }
    ]
  },
  {
    phaseTag: 'Phase 14', phaseTitle: 'Deployment & Certification', icon: '🏆',
    chapters: [
      {
        num: 39, file: '39-rest-api-deployment-and-monitoring.html', title: 'REST API Deployment & Monitoring',
        subtopics: 'Dockerizing REST APIs · Health checks (/healthz) · Prometheus metrics · Cloud deployment · APM logging & tracing',
        summary: 'Containerize and deploy REST APIs to production with Docker, exposing /healthz health endpoints and APM monitoring metrics.',
        code: `GET /healthz -> 200 OK {"status": "UP"}`
      },
      {
        num: 40, file: '40-rest-api-quiz.html', title: 'REST API Practice Quiz',
        subtopics: 'Comprehensive REST API Knowledge Check · 30 Multiple Choice Certification Exam Questions · HTTP, Status Codes, Security & Design',
        summary: 'Test your REST API engineering mastery with our 30-question interactive certification practice quiz.',
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
  <title>REST API Complete Roadmap — 40 Chapters, 14 Phases (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master REST API design, HTTP fundamentals, status codes, JSON formatting, CRUD operations, query parameters, validation, errors, security, JWT authentication, CORS, rate limiting, OpenAPI, Swagger UI, Postman, contract testing, load testing, HTTP caching, reliability, Express.js, FastAPI, deployment, and quiz with our complete 40-chapter roadmap across 14 phases." />
  <meta name="keywords" content="rest api tutorial, learn rest api, rest api masterclass, http request, http response, status codes, openapi, swagger, jwt auth, api security, cors, rate limiting, contract testing, k6, express js api, fastapi" />
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

    <h1 class="page-title">REST API Complete Masterclass (40 Chapters, 14 Phases)</h1>

    <div class="page-meta">
      <span class="badge">🌐 HTTP / RFC 9110</span>
      <span class="badge">🟢 40 Complete Chapters</span>
      <span class="badge">📂 14 Complete Phases</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">REST API Ante Enti? · HTTP Requests &amp; Responses · HTTP Methods &amp; Status Codes · Resource &amp; URL Design · Versioning · JSON Schemas · CRUD API Operations · Query Parameters &amp; Pagination · Request Validation &amp; Error Design · Authentication &amp; JWT · CORS &amp; Rate Limiting · OpenAPI &amp; Swagger UI · API Testing &amp; Contract Verification · Load Testing · HTTP Caching &amp; Idempotency · Express.js &amp; FastAPI · Deployment &amp; Quiz</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's REST API Complete Master Course</strong>. REST (Representational State Transfer) is the architectural foundation of modern web and mobile applications. This comprehensive 40-chapter bootcamp guides you through HTTP fundamentals, status code semantics, clean URL design, security, JWT authentication, OpenAPI documentation, testing, caching, and building production REST APIs in Express.js and FastAPI.</p>
    </div>

    <div style="background:linear-gradient(135deg,rgba(16,185,129,0.12),rgba(20,24,32,0.6));border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:24px;margin:28px 0;">
      <h3 style="color:#10b981;margin-bottom:10px;font-size:18px;">🎯 Ready to Master REST API Architecture?</h3>
      <p style="color:var(--text2);margin-bottom:16px;font-size:14.5px;">Choose where to start: explore REST introduction, authentication, CORS, rate limiting, OpenAPI, contract testing, or backend API implementations:</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/blog-rest-api/01-rest-api-ante-enti-what-is-rest-api.html" style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 1: REST API Intro →</a>
        <a href="/blog-rest-api/21-authentication-basics.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 8: Auth Basics →</a>
        <a href="/blog-rest-api/22-jwt-authentication.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 8: JWT Auth →</a>
        <a href="/blog-rest-api/25-cors.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 9: CORS →</a>
        <a href="/blog-rest-api/27-openapi.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 10: OpenAPI →</a>
        <a href="/blog-rest-api/37-nodejs-express-rest-api-implementation.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 13: Express.js API →</a>
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
        <span>REST API Complete Masterclass · 40 Chapters · 14 Phases · 2026 Edition</span>
      </div>
    </div>

    <div class="nav-footer">
      <a href="/blog.html" class="nav-btn"><span class="label">← All Tutorials</span><span class="title">Course Hub</span></a>
      <a href="/blog-rest-api/01-rest-api-ante-enti-what-is-rest-api.html" class="nav-btn" style="text-align:right;"><span class="label">Start Learning →</span><span class="title">1. REST API Ante Enti?</span></a>
    </div>
  </main>
</div>
<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'blog-rest-api.html'), masterIndexHtml, 'utf8');
console.log('✅ Generated public/blog-rest-api.html master index page successfully!');

// 4. Generate all 40 Chapter HTML Files inside public/blog-rest-api/ adhering to the 15-Section Lesson Layout
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

    <!-- 4. Required HTTP headers & setup -->
    <div class="section-title"><span class="num">4</span>Required HTTP Headers &amp; Specification</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">HTTP — Specification Headers</span>
        </div>
        <pre><code>Content-Type: application/json; charset=utf-8
Accept: application/json</code></pre>
      </div>
    </div>

    <!-- 5. Basic syntax / HTTP spec format -->
    <div class="section-title"><span class="num">5</span>Basic HTTP Format</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">REST API — Endpoint Contract</span>
        </div>
        <pre><code>${ch.code}</code></pre>
      </div>
    </div>

    <!-- 6. Basic example -->
    <div class="section-title"><span class="num">6</span>Basic Example</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">REST API — Executable HTTP Payload</span>
        </div>
        <pre><code>${ch.code}</code></pre>
      </div>
    </div>

    <!-- 7. Command & execution -->
    <div class="section-title"><span class="num">7</span>Command &amp; Execution (cURL / Postman)</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Terminal — cURL Command</span>
        </div>
        <pre><code># Execute request via cURL
curl -i -X GET "https://api.example.com/api/v1/courses" \\
  -H "Accept: application/json" \\
  -H "Authorization: Bearer your_token_here"</code></pre>
      </div>
    </div>

    <!-- 8. Program output -->
    <div class="section-title"><span class="num">8</span>Expected HTTP Response</div>
    <div class="section-body">
      <div class="card" style="background:var(--bg2);padding:16px;border-radius:8px;margin:16px 0;font-size:13.5px;border-left:4px solid #10b981;">
        <strong style="color:#10b981;">📊 Expected HTTP Server Response:</strong>
        <pre style="margin-top:8px;background:rgba(0,0,0,0.3);padding:10px;border-radius:6px;color:#a6e22e;font-family:'JetBrains Mono',monospace;">HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "status": "success",
  "data": {
    "message": "REST API response executed cleanly."
  }
}</pre>
      </div>
    </div>

    <!-- 9. Code explanation & breakdown -->
    <div class="section-title"><span class="num">9</span>Code Explanation &amp; Breakdown</div>
    <div class="section-body">
      <table class="tbl spec-table">
        <thead><tr><th>REST / HTTP Component</th><th>Function &amp; Purpose</th></tr></thead>
        <tbody>
          <tr><td><code>HTTP Method</code></td><td>Defines target action (GET, POST, PUT, PATCH, DELETE).</td></tr>
          <tr><td><code>${ch.title.split(' ')[0]}</code></td><td>Core REST architectural or HTTP header feature in this lesson.</td></tr>
          <tr><td><code>JSON Payload</code></td><td>Standardized, lightweight data interchange representation.</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 10. Line-by-line breakdown -->
    <div class="section-title"><span class="num">10</span>Line-by-Line Breakdown</div>
    <div class="section-body">
      <ul style="line-height:1.8;margin-left:20px;">
        <li>Line 1: Specifies HTTP Request Line or Status Line.</li>
        <li>Line 2: Transmits headers such as <code>Content-Type</code> or <code>Authorization</code>.</li>
        <li>Line 4+: Contains formatted JSON response body payload.</li>
      </ul>
    </div>

    <!-- 11. Execution flow diagram -->
    <div class="section-title"><span class="num">11</span>Execution Flow Diagram</div>
    <div class="section-body">
      <div class="diagram-box">HTTP Client Request (cURL / Browser / Mobile App)
  │
  ├── Request Headers & Body Validation
  │     ├── Authentication & Rate Limiting Check
  │     └── Route Handler Execution
  │
  └── HTTP Response (Status Code + JSON Body) -> Client</div>
    </div>

    <!-- 12. Common mistakes -->
    <div class="section-title"><span class="num">12</span>Common Mistakes</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">⚠️ Anti-Patterns to Avoid</div>
        <ul style="margin:8px 0 0 18px;line-height:1.7;">
          <li>Using verbs in URIs (e.g. <code>/getCourses</code> or <code>/createCourse</code>) instead of standard HTTP methods.</li>
          <li>Returning <code>200 OK</code> for error responses containing <code>{"error": true}</code> inside the JSON body.</li>
          <li>Failing to validate incoming payload schemas, risking SQL injection or broken server exceptions.</li>
        </ul>
      </div>
    </div>

    <!-- 13. Coding challenge -->
    <div class="section-title"><span class="num">13</span>Hands-On API Challenge</div>
    <div class="section-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:18px 22px;margin-bottom:24px;">
        <strong style="color:#10b981;display:block;margin-bottom:8px;">🎯 Hands-On Challenge:</strong>
        <p>Design a RESTful API payload or execute cURL request demonstrating <strong>${ch.title}</strong>. Inspect headers and status codes in Postman or Bruno!</p>
      </div>
    </div>

    <!-- 14. Mini quiz -->
    <div class="section-title"><span class="num">14</span>Mini Quiz</div>
    <div class="section-body">
      <div class="faq-card">
        <h4>❓ Question: What is the primary role of ${ch.title} in REST API design?</h4>
        <p><strong>Answer:</strong> It provides standardized HTTP mechanisms for ${ch.subtopics.split('·')[0].trim()}, building predictable and scalable APIs.</p>
      </div>
    </div>

    <!-- 15. Quick recap & Prev/Next buttons -->
    <div class="section-title"><span class="num">15</span>Quick Recap</div>
    <div class="section-body">
      <ul style="line-height:1.8;margin-left:20px;">
        <li>${ch.summary}</li>
        <li>Subtopics covered: ${ch.subtopics}</li>
        <li>Follow RFC 9110 HTTP semantics and REST design best practices.</li>
      </ul>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on RFC 9110 HTTP Standards · Last updated August 2026</span>
      </div>
    </div>

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

console.log('✅ Generated all 40 REST API Masterclass chapter files in public/blog-rest-api/ successfully!');
