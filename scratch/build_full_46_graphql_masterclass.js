const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const graphqlDir = path.join(publicDir, 'blog-graphql');

if (!fs.existsSync(graphqlDir)) {
  fs.mkdirSync(graphqlDir, { recursive: true });
}

// 1. Create public/blog-graphql/style.css matching Vibrant Pink/Magenta Theme (#e10098)
const cssStyleContent = `/* Specialized styling enhancements for GraphQL tutorial lessons & Accordion — Vibrant Pink/Magenta Theme */
:root {
  --graphql-theme: #e10098;
  --graphql-theme-hover: #f472b6;
  --graphql-theme-bg: rgba(225, 0, 152, 0.12);
  --graphql-theme-border: rgba(225, 0, 152, 0.3);
}

body.lang-graphql {
  --accent: #e10098;
  --accent-glow: rgba(225, 0, 152, 0.2);
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
  background: rgba(225, 0, 152, 0.08) !important;
  border: 1px solid rgba(225, 0, 152, 0.25) !important;
  border-radius: 99px !important;
  color: #e10098 !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  text-decoration: none !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sidebar-home-link:hover {
  background: rgba(225, 0, 152, 0.16) !important;
  border-color: #e10098 !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(225, 0, 152, 0.2);
}

.sidebar-home-link.active {
  background: linear-gradient(135deg, rgba(225, 0, 152, 0.18), rgba(20, 24, 32, 0.8)) !important;
  border-color: #e10098 !important;
  color: #e10098 !important;
  box-shadow: 0 0 12px rgba(225, 0, 152, 0.25);
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
  background: linear-gradient(135deg, rgba(225, 0, 152, 0.15) 0%, rgba(20, 25, 34, 0.6) 100%);
  border-color: #e10098;
  box-shadow: 0 0 14px rgba(225, 0, 152, 0.18);
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
  background: rgba(225, 0, 152, 0.2);
  border-color: rgba(225, 0, 152, 0.4);
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
  color: #e10098;
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
  background: rgba(225, 0, 152, 0.2);
  color: #e10098;
  border-color: rgba(225, 0, 152, 0.35);
  font-weight: 700;
}

.accordion-chevron {
  color: var(--text3, #8b949e);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s;
  flex-shrink: 0;
}

.accordion-header.active .accordion-chevron {
  transform: rotate(90deg);
  color: #e10098;
}

.accordion-content {
  display: none;
  flex-direction: column;
  padding: 4px 0 6px 10px;
  border-left: 2px solid rgba(225, 0, 152, 0.35);
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
  background: #e10098 !important;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(225, 0, 152, 0.35);
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
  border-color: rgba(225, 0, 152, 0.4);
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
  background: rgba(225, 0, 152, 0.12);
  border: 1px solid rgba(225, 0, 152, 0.3);
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
  color: #e10098;
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
  background: rgba(225, 0, 152, 0.08);
  border-color: rgba(225, 0, 152, 0.35);
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
  background: rgba(225, 0, 152, 0.15);
  color: #e10098;
  font-size: 12px;
  font-weight: 800;
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.curriculum-lesson-row:hover .lesson-idx {
  background: #e10098;
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
  color: #e10098;
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
  color: #e10098;
  padding: 5px 12px;
  border-radius: 6px;
  background: rgba(225, 0, 152, 0.1);
  border: 1px solid rgba(225, 0, 152, 0.2);
  transition: all 0.18s ease;
}

.curriculum-lesson-row:hover .lesson-btn {
  background: #e10098;
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
  border-color: #e10098;
  box-shadow: 0 6px 18px rgba(225, 0, 152, 0.12);
}

body.light-theme .phase-roadmap-header {
  border-bottom-color: #f1f5f9;
}

body.light-theme .phase-roadmap-icon {
  background: #fce7f3;
  border-color: #fbcfe8;
}

body.light-theme .phase-roadmap-tag {
  color: #db2777;
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
  background: #fdf2f8;
  border-color: #f9a8d4;
}

body.light-theme .lesson-idx {
  background: #fce7f3;
  color: #db2777;
}

body.light-theme .lesson-title {
  color: #0f172a;
}

body.light-theme .lesson-subtopics {
  color: #64748b;
}

body.light-theme .lesson-btn {
  background: #fce7f3;
  border-color: #fbcfe8;
  color: #db2777;
}

body.light-theme .curriculum-lesson-row:hover .lesson-btn {
  background: #db2777;
  color: #ffffff;
}

body.light-theme .sidebar-home-link {
  background: #fdf2f8 !important;
  border-color: #fbcfe8 !important;
  color: #db2777 !important;
}

body.light-theme .sidebar-home-link.active {
  background: #fce7f3 !important;
  border-color: #e10098 !important;
  color: #be185d !important;
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
  border: 1.5px solid #e10098 !important;
  color: #0f172a !important;
  box-shadow: 0 2px 10px rgba(225, 0, 152, 0.15) !important;
}
body.light-theme .phase-icon-box {
  background: #f1f5f9;
  border-color: #e2e8f0;
}
body.light-theme .accordion-header.active .phase-icon-box {
  background: #fce7f3 !important;
  border-color: #fbcfe8 !important;
}
body.light-theme .phase-tag {
  color: #64748b;
}
body.light-theme .accordion-header.active .phase-tag {
  color: #db2777 !important;
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
  background: #fce7f3 !important;
  color: #db2777 !important;
  border-color: #f9a8d4 !important;
}
body.light-theme .accordion-chevron {
  color: #94a3b8;
}
body.light-theme .accordion-header.active .accordion-chevron {
  color: #db2777 !important;
}
body.light-theme .accordion-content a {
  color: #475569;
}
body.light-theme .accordion-content a:hover {
  color: #0f172a;
  background: #f1f5f9;
}
body.light-theme .accordion-content a.active {
  background: #e10098 !important;
  color: #ffffff !important;
  border-radius: 8px !important;
  font-weight: 700 !important;
}

.try-box {
  background: linear-gradient(135deg, rgba(225, 0, 152, 0.08) 0%, rgba(20, 24, 32, 0.6) 100%);
  border: 1px solid rgba(225, 0, 152, 0.25);
  border-radius: var(--radius, 12px);
  padding: 24px;
  margin: 32px 0;
}

.try-box .try-title {
  font-weight: 700;
  color: #e10098;
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
  background: linear-gradient(135deg, #e10098, #be185d);
  color: #ffffff !important;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.2s, opacity 0.2s;
  box-shadow: 0 4px 14px rgba(225, 0, 152, 0.3);
}

.try-box .run-btn:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

.callout {
  background: #161b22;
  border: 1px solid #30363d;
  border-left: 4px solid #e10098;
  padding: 18px 22px;
  border-radius: var(--radius, 12px);
  margin: 28px 0;
}

.callout .callout-title {
  font-weight: 700;
  color: #e10098;
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
  color: #ff79c6;
  line-height: 1.55;
  white-space: pre !important;
  overflow-x: auto;
}

.faq-card {
  background: #141820;
  border: 1px solid #30363d;
  border-left: 4px solid #e10098;
  border-radius: 10px;
  padding: 18px 22px;
  margin-bottom: 18px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, border-color 0.2s;
}

.faq-card:hover {
  transform: translateX(3px);
  border-color: #e10098;
}

.faq-card h4 {
  color: #e10098 !important;
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
  background: linear-gradient(135deg, #e10098, #be185d);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 800;
  font-size: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(225, 0, 152, 0.3);
}

body.light-theme .try-box {
  background: #fdf2f8;
  border-color: #fbcfe8;
}
body.light-theme .callout {
  background: #f8fafc;
  border-color: #cbd5e1;
  border-left-color: #db2777;
}
body.light-theme .callout .callout-title {
  color: #be185d;
}
body.light-theme .diagram-box {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #0f172a;
}
body.light-theme .faq-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #db2777;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
body.light-theme .faq-card h4 {
  color: #be185d !important;
}
body.light-theme .faq-card p {
  color: #334155;
}
`;

fs.writeFileSync(path.join(graphqlDir, 'style.css'), cssStyleContent, 'utf8');

// 2. Define Complete 46-Chapter GraphQL Masterclass Data Structure across 13 Phases
const graphqlPhases = [
  {
    phaseTag: 'Phase 01', phaseTitle: 'GraphQL Introduction', icon: '🚀',
    chapters: [
      {
        num: 1, file: '01-what-is-graphql.html', title: 'What is GraphQL?',
        subtopics: 'GraphQL ante enti? · GraphQL enduku create chesaru? · GraphQL vs REST · GraphQL features · Query language ante enti? · Strongly typed API · Client-selected fields · Single endpoint concept · Over-fetching · Under-fetching · GraphQL use cases · GraphQL limitations',
        summary: 'GraphQL is a query language and execution engine for APIs. Client ki kavalsina fields ni exact ga request cheyyachu. Server schema based ga query validate and execute chestundi.',
        resource: 'Query', method: 'POST', url: '/graphql',
        reqEx: `POST /graphql\nContent-Type: application/json\n\n{\n  query: "query { hello }"\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "hello": "Hello, GraphQL!"\n  }\n}`,
        statusCode: '200 OK',
        code: `/* GraphQL Operation Flow:
Client -> GraphQL Operation -> Single GraphQL Endpoint (/graphql) -> Resolvers -> Database / Services / APIs */`
      },
      {
        num: 2, file: '02-graphql-vs-rest.html', title: 'GraphQL vs REST',
        subtopics: 'REST endpoints vs GraphQL single endpoint · Over-fetching & Under-fetching · Multiple REST requests vs Nested GraphQL query · REST caching vs GraphQL caching · HTTP status behavior · File uploads · Best use cases · Choosing REST or GraphQL',
        summary: 'Compare REST multiple endpoints and fixed server representations with GraphQL single endpoint client-driven field selections.',
        resource: 'Comparison', method: 'POST', url: '/graphql',
        reqEx: `/* REST: GET /api/courses/1 + GET /api/courses/1/lessons */\n\n/* GraphQL Single Query: */\nquery {\n  course(id: 1) {\n    title\n    lessons {\n      title\n    }\n  }\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "course": {\n      "title": "Python Masterclass",\n      "lessons": [{ "title": "Variables" }]\n    }\n  }\n}`,
        statusCode: '200 OK',
        code: `/* REST vs GraphQL Feature Matrix:
Endpoints: Multiple resources (REST) vs Usually one endpoint (GraphQL)
Data selection: Server decides (REST) vs Client selects fields (GraphQL)
Schema: Often separate docs (REST) vs Strong schema (GraphQL)
Nested data: Multiple requests possible (REST) vs One query (GraphQL)
Main operations: HTTP methods (REST) vs Query, mutation, subscription (GraphQL) */`
      }
    ]
  },
  {
    phaseTag: 'Phase 02', phaseTitle: 'Setup and First GraphQL App', icon: '⚙️',
    chapters: [
      {
        num: 3, file: '03-graphql-project-setup.html', title: 'GraphQL Setup',
        subtopics: 'Node.js setup · npm project · GraphQL package · GraphQL server options · Apollo Server overview · GraphQL Yoga overview · Express integration · TypeScript setup · Environment variables · Project scripts · Development server',
        summary: 'Initialize a production-ready Node.js & TypeScript GraphQL server project using Apollo Server or GraphQL Yoga.',
        resource: 'ProjectSetup', method: 'POST', url: '/graphql',
        reqEx: `npm init -y\nnpm install graphql @apollo/server express cors dotenv`,
        resEx: `✅ Package setup complete with Apollo Server & Express integration.`,
        statusCode: '200 OK',
        code: `npm install graphql @apollo/server express cors dotenv`
      },
      {
        num: 4, file: '04-first-graphql-server.html', title: 'Your First GraphQL Server',
        subtopics: 'Schema definition · Resolver definition · Query root · GraphQL endpoint · Starting server · GraphQL IDE · Sending first query · JSON response · Resolver flow · Error response',
        summary: 'Write your first runnable GraphQL server defining schema type Query and resolver function returning JSON responses.',
        resource: 'Query', method: 'POST', url: '/graphql',
        reqEx: `type Query {\n  hello: String!\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "hello": "Hello, GraphQL!"\n  }\n}`,
        statusCode: '200 OK',
        code: `const { ApolloServer } = require('@apollo/server');

const typeDefs = \`
  type Query {
    hello: String!
  }
\`;

const resolvers = {
  Query: {
    hello: () => "Hello, GraphQL!"
  }
};`
      },
      {
        num: 5, file: '05-project-structure.html', title: 'Project Structure',
        subtopics: 'schema folder · resolvers folder · queries folder · mutations folder · types folder · services folder · repositories folder · middleware folder · context folder · tests folder · Code-first structure · Schema-first structure',
        summary: 'Organize scalable GraphQL projects into modular folders separating type definitions, resolvers, services, and context.',
        resource: 'Architecture', method: 'POST', url: '/graphql',
        reqEx: `graphql-api/\n├── src/\n│   ├── schema/\n│   ├── resolvers/\n│   ├── types/\n│   ├── services/\n│   └── server.ts`,
        resEx: `200 OK\n{ "structure": "Modular Schema-First Architecture" }`,
        statusCode: '200 OK',
        code: `graphql-api/
├── src/
│   ├── schema/
│   ├── resolvers/
│   ├── types/
│   ├── services/
│   ├── repositories/
│   ├── context/
│   ├── middleware/
│   └── server.ts
├── tests/
├── .env
├── package.json
└── tsconfig.json`
      }
    ]
  },
  {
    phaseTag: 'Phase 03', phaseTitle: 'Schema and Type System', icon: '📐',
    chapters: [
      {
        num: 6, file: '06-schema-basics.html', title: 'Schema Basics',
        subtopics: 'Schema ante enti? · Type definitions · Root types · Query · Mutation · Subscription · Fields · Arguments · Return types · Non-null types · List types · Schema validation',
        summary: 'GraphQL schema API capabilities ni describe chestundi; clients schema based ga predictable queries send cheyyachu.',
        resource: 'Course', method: 'POST', url: '/graphql',
        reqEx: `type Course {\n  id: ID!\n  title: String!\n  level: String!\n}\n\ntype Query {\n  courses: [Course!]!\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "courses": [{ "id": "1", "title": "Python", "level": "Beginner" }]\n  }\n}`,
        statusCode: '200 OK',
        code: `type Course {
  id: ID!
  title: String!
  level: String!
}

type Query {
  courses: [Course!]!
}`
      },
      {
        num: 7, file: '07-scalar-types.html', title: 'Scalar Types',
        subtopics: 'String · Int · Float · Boolean · ID · Non-null ! · List [Type] · Nested lists · Custom scalars · Date scalar · JSON scalar · Upload scalar overview',
        summary: 'Understand GraphQL built-in scalar primitives (String, Int, Float, Boolean, ID), nullability modifier (!), and custom scalars.',
        resource: 'Course', method: 'POST', url: '/graphql',
        reqEx: `type Course {\n  id: ID!\n  title: String!\n  duration: Int\n  price: Float\n  published: Boolean!\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "id": "c101",\n    "duration": 12,\n    "price": 49.99,\n    "published": true\n  }\n}`,
        statusCode: '200 OK',
        code: `type Course {
  id: ID!
  title: String!
  duration: Int
  price: Float
  published: Boolean!
}`
      },
      {
        num: 8, file: '08-object-types.html', title: 'Object Types',
        subtopics: 'Object type · Fields · Nested object fields · Relationships · Nullable fields · Required fields · Type reuse · Type naming conventions · Schema documentation · Type evolution',
        summary: 'Define GraphQL custom object types representing business entities and inter-type relationships.',
        resource: 'User', method: 'POST', url: '/graphql',
        reqEx: `type User {\n  id: ID!\n  name: String!\n  email: String!\n  courses: [Course!]!\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "user": { "name": "Balaji", "courses": [] }\n  }\n}`,
        statusCode: '200 OK',
        code: `type User {
  id: ID!
  name: String!
  email: String!
  courses: [Course!]!
}`
      },
      {
        num: 9, file: '09-enums.html', title: 'Enums',
        subtopics: 'Enum ante enti? · Defining enums · Enum arguments · Enum response values · Course level enum · Status enum · Role enum · Enum validation · Enum evolution · Enum client handling',
        summary: 'Define GraphQL Enum types restricting field values to predefined sets of allowed constant values.',
        resource: 'CourseLevel', method: 'POST', url: '/graphql',
        reqEx: `enum CourseLevel {\n  BEGINNER\n  INTERMEDIATE\n  ADVANCED\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "course": { "level": "BEGINNER" }\n  }\n}`,
        statusCode: '200 OK',
        code: `enum CourseLevel {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}`
      },
      {
        num: 10, file: '10-input-types.html', title: 'Input Types',
        subtopics: 'Input type ante enti? · Input object · Create input · Update input · Nested input · Required input fields · Optional input fields · Input validation · Reusing input types · Input naming conventions',
        summary: 'Define GraphQL Input types for passing structured complex arguments into mutation operations.',
        resource: 'CreateCourseInput', method: 'POST', url: '/graphql',
        reqEx: `input CreateCourseInput {\n  title: String!\n  level: CourseLevel!\n  description: String\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "createCourse": { "id": "102", "title": "React" }\n  }\n}`,
        statusCode: '200 OK',
        code: `input CreateCourseInput {
  title: String!
  level: CourseLevel!
  description: String
}`
      },
      {
        num: 11, file: '11-interfaces-and-unions.html', title: 'Interfaces & Unions',
        subtopics: 'Interface ante enti? · Implementing interfaces · Shared fields · Union types · Inline fragments · Type resolution · Search result union · Interface vs union · Schema design · Client handling',
        summary: 'Abstract common fields using Interfaces and return polymorphic heterogeneous type lists using Unions.',
        resource: 'SearchResult', method: 'POST', url: '/graphql',
        reqEx: `union SearchResult = Course | User\n\nquery {\n  search(q: "code") {\n    ... on Course { title }\n    ... on User { name }\n  }\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "search": [{ "__typename": "Course", "title": "Python" }]\n  }\n}`,
        statusCode: '200 OK',
        code: `union SearchResult = Course | User

query Search {
  search(q: "code") {
    ... on Course {
      title
    }
    ... on User {
      name
    }
  }
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 04', phaseTitle: 'Queries', icon: '🔍',
    chapters: [
      {
        num: 12, file: '12-basic-queries.html', title: 'Queries',
        subtopics: 'Query ante enti? · Selection sets · Fields · Nested fields · Aliases · Operation names · Multiple fields · Multiple operations · Query comments · Query formatting',
        summary: 'GraphQL query lo client required fields selection set form lo specify chestundi; server selected fields ni resolve chestundi.',
        resource: 'GetCourses', method: 'POST', url: '/graphql',
        reqEx: `query GetCourses {\n  courses {\n    id\n    title\n    level\n  }\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "courses": [\n      { "id": "1", "title": "Python", "level": "BEGINNER" }\n    ]\n  }\n}`,
        statusCode: '200 OK',
        code: `query GetCourses {
  courses {
    id
    title
    level
  }
}`
      },
      {
        num: 13, file: '13-arguments.html', title: 'Arguments',
        subtopics: 'Field arguments · ID arguments · Filter arguments · Search arguments · Pagination arguments · Optional arguments · Required arguments · Default arguments · Multiple arguments · Argument validation',
        summary: 'Pass input parameters directly into GraphQL query fields to filter or locate specific resource entities.',
        resource: 'GetCourse', method: 'POST', url: '/graphql',
        reqEx: `query GetCourse {\n  course(id: "1") {\n    id\n    title\n    description\n  }\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "course": { "id": "1", "title": "Python", "description": "Master Python programming" }\n  }\n}`,
        statusCode: '200 OK',
        code: `query GetCourse {
  course(id: "1") {
    id
    title
    description
  }
}`
      },
      {
        num: 14, file: '14-variables.html', title: 'Variables',
        subtopics: 'Why variables are needed · Variable declaration · Variable types · Required variables · Optional variables · Variable defaults · Variables in nested inputs · Variables in client apps · Variable validation · Avoiding string interpolation',
        summary: 'Parameterize dynamic query values with GraphQL Variables ($courseId: ID!), avoiding dangerous string interpolation.',
        resource: 'GetCourseVar', method: 'POST', url: '/graphql',
        reqEx: `query GetCourse($courseId: ID!) {\n  course(id: $courseId) {\n    id\n    title\n  }\n}\n\nVariables: { "courseId": "1" }`,
        resEx: `200 OK\n{\n  "data": {\n    "course": { "id": "1", "title": "Python" }\n  }\n}`,
        statusCode: '200 OK',
        code: `query GetCourse($courseId: ID!) {
  course(id: $courseId) {
    id
    title
  }
}`
      },
      {
        num: 15, file: '15-fragments.html', title: 'Fragments',
        subtopics: 'Fragment ante enti? · Reusing selections · Named fragments · Inline fragments · Fragment arguments overview · Nested fragments · Fragment organization · Fragment composition · Fragment performance · Fragment best practices',
        summary: 'Create reusable selection sets using GraphQL Fragments (...CourseFields) across multiple queries.',
        resource: 'CourseFields', method: 'POST', url: '/graphql',
        reqEx: `fragment CourseFields on Course {\n  id\n  title\n  level\n}\n\nquery GetCourses {\n  courses {\n    ...CourseFields\n  }\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "courses": [{ "id": "1", "title": "Python", "level": "BEGINNER" }]\n  }\n}`,
        statusCode: '200 OK',
        code: `fragment CourseFields on Course {
  id
  title
  level
}

query GetCourses {
  courses {
    ...CourseFields
  }
}`
      },
      {
        num: 16, file: '16-directives.html', title: 'Directives',
        subtopics: 'Directive ante enti? · @include · @skip · @deprecated · @specifiedBy · Custom directives · Schema directives · Query directives · Authorization directives · Directive validation',
        summary: 'GraphQL directives @ syntax use chesi schema or operation behavior modify cheyyadaniki use chestayi.',
        resource: 'Directives', method: 'POST', url: '/graphql',
        reqEx: `query GetCourse($withDesc: Boolean!) {\n  course(id: "1") {\n    title\n    description @include(if: $withDesc)\n  }\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "course": { "title": "Python", "description": "Master Python" }\n  }\n}`,
        statusCode: '200 OK',
        code: `query GetCourse($withDesc: Boolean!) {
  course(id: "1") {
    title
    description @include(if: $withDesc)
  }
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 05', phaseTitle: 'Resolvers and Execution', icon: '⚙️',
    chapters: [
      {
        num: 17, file: '17-resolvers.html', title: 'Resolvers',
        subtopics: 'Resolver ante enti? · Root resolver · Field resolver · Resolver arguments · Parent object · Context · Info object · Resolver return values · Async resolvers · Resolver errors · Resolver organization · Resolver testing',
        summary: 'Resolvers are functions responsible for fetching data for fields defined in the GraphQL schema.',
        resource: 'Resolvers', method: 'POST', url: '/graphql',
        reqEx: `const resolvers = {\n  Query: {\n    courses: async (_, args, context) => {\n      return context.courseService.getCourses();\n    }\n  }\n};`,
        resEx: `200 OK\n{\n  "data": { "courses": [{ "id": "1", "title": "Python" }] }\n}`,
        statusCode: '200 OK',
        code: `const resolvers = {
  Query: {
    courses: async (_, args, context) => {
      return context.courseService.getCourses();
    }
  }
};`
      },
      {
        num: 18, file: '18-resolver-arguments-and-context.html', title: 'Resolver Context',
        subtopics: 'Resolver signature · Parent value · Arguments · Context object · GraphQL info · Current user · Database connection · Service injection · Request headers · Request ID · Context security · Context testing',
        summary: 'Inject request context, authentication tokens, database connections, and service dependencies into resolver functions.',
        resource: 'Context', method: 'POST', url: '/graphql',
        reqEx: `const resolvers = {\n  Query: {\n    me: (_, args, { currentUser }) => currentUser\n  }\n};`,
        resEx: `200 OK\n{\n  "data": { "me": { "id": "101", "email": "balaji@example.com" } }\n}`,
        statusCode: '200 OK',
        code: `const resolvers = {
  Query: {
    me: (_, args, { currentUser }) => {
      if (!currentUser) throw new Error("Unauthorized");
      return currentUser;
    }
  }
};`
      },
      {
        num: 19, file: '19-nested-resolvers.html', title: 'Nested Resolvers',
        subtopics: 'Nested object resolver · Course lessons · Lesson course · Resolver chaining · Parent object · Relationship resolution · Async nested data · N+1 problem · DataLoader · Resolver performance',
        summary: 'Implement field-level resolvers for relational data fetching and resolve N+1 performance issues using Facebook DataLoader.',
        resource: 'NestedResolver', method: 'POST', url: '/graphql',
        reqEx: `const resolvers = {\n  Course: {\n    lessons: (parent, _, { lessonLoader }) => lessonLoader.load(parent.id)\n  }\n};`,
        resEx: `200 OK\n{\n  "data": { "course": { "lessons": [{ "title": "Variables" }] } }\n}`,
        statusCode: '200 OK',
        code: `const resolvers = {
  Course: {
    lessons: async (parent, _, { lessonLoader }) => {
      return await lessonLoader.load(parent.id);
    }
  }
};`
      },
      {
        num: 20, file: '20-execution-and-validation.html', title: 'Validation & Execution',
        subtopics: 'Parsing query · Validation · Execution · Resolver execution order · Parallel fields · Serial mutations · Null propagation · Partial errors · Error paths · Query complexity · Query depth · Validation rules',
        summary: 'GraphQL requests first schema against validate ayi, valid operation tarvata execute avtundi; errors response lo data tho paatu include avvachu.',
        resource: 'Execution', method: 'POST', url: '/graphql',
        reqEx: `query InvalidQuery {\n  course(id: 123) { invalidField }\n}`,
        resEx: `400 Bad Request\n{\n  "errors": [{ "message": "Cannot query field 'invalidField' on type 'Course'." }]\n}`,
        statusCode: '400 Bad Request',
        code: `/* GraphQL Execution Pipeline:
1. Parse AST -> 2. Validate AST against Schema -> 3. Execute Resolvers -> 4. Return Data & Errors */`
      }
    ]
  },
  {
    phaseTag: 'Phase 06', phaseTitle: 'Mutations', icon: '✍️',
    chapters: [
      {
        num: 21, file: '21-mutation-basics.html', title: 'Mutations',
        subtopics: 'Mutation ante enti? · Create operation · Update operation · Delete operation · Mutation input · Mutation payload · Success response · Error response · Mutation naming · Mutation testing',
        summary: 'GraphQL specification lo mutation write operation followed by fetch operation ga model chestundi.',
        resource: 'Mutation', method: 'POST', url: '/graphql',
        reqEx: `mutation {\n  createCourse(input: { title: "Go", level: BEGINNER }) {\n    id\n    title\n  }\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "createCourse": { "id": "109", "title": "Go" }\n  }\n}`,
        statusCode: '200 OK',
        code: `type Mutation {
  createCourse(input: CreateCourseInput!): Course!
}`
      },
      {
        num: 22, file: '22-mutation-inputs-and-payloads.html', title: 'Mutation Inputs & Payloads',
        subtopics: 'Input validation · Create payload · Update payload · Delete payload · Success flag · Error list · Client-friendly payload · Mutation id · Mutation idempotency · Mutation authorization',
        summary: 'Design client-friendly mutation payload wrappers returning mutated entities alongside explicit field-level user errors.',
        resource: 'Payload', method: 'POST', url: '/graphql',
        reqEx: `type CreateCoursePayload {\n  course: Course\n  errors: [UserError!]!\n}\n\ntype UserError {\n  field: String\n  message: String!\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "createCourse": {\n      "course": { "id": "110", "title": "Rust" },\n      "errors": []\n    }\n  }\n}`,
        statusCode: '200 OK',
        code: `type CreateCoursePayload {
  course: Course
  errors: [UserError!]!
}

type UserError {
  field: String
  message: String!
}`
      },
      {
        num: 23, file: '23-crud-mutations.html', title: 'CRUD Mutations',
        subtopics: 'createCourse · updateCourse · deleteCourse · createLesson · updateLesson · deleteLesson · publishLesson · completeLesson · submitQuiz · Mutation transactions',
        summary: 'Implement standard CRUD mutations for courses, lessons, and interactive quiz submissions.',
        resource: 'CRUDMutations', method: 'POST', url: '/graphql',
        reqEx: `mutation {\n  updateCourse(id: "1", input: { title: "Python 3.12" }) {\n    id\n    title\n  }\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "updateCourse": { "id": "1", "title": "Python 3.12" }\n  }\n}`,
        statusCode: '200 OK',
        code: `type Mutation {
  createCourse(input: CreateCourseInput!): CreateCoursePayload!
  updateCourse(id: ID!, input: UpdateCourseInput!): Course!
  deleteCourse(id: ID!): Boolean!
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 07', phaseTitle: 'Subscriptions and Real-Time', icon: '📡',
    chapters: [
      {
        num: 24, file: '24-subscriptions.html', title: 'Subscriptions',
        subtopics: 'Subscription ante enti? · Long-lived requests · Real-time events · WebSockets · Subscription resolver · Subscribe operation · Publish events · Connection authentication · Reconnection · Subscription cleanup',
        summary: 'GraphQL subscriptions events sequence respond avvadaniki long-lived request ga model chestayi.',
        resource: 'Subscription', method: 'WS', url: 'wss://api.ourcompiler.com/graphql',
        reqEx: `subscription {\n  courseProgressUpdated(userId: "101") {\n    lessonId\n    completed\n  }\n}`,
        resEx: `101 Switching Protocols -> Streamed Data: { "courseProgressUpdated": { "lessonId": "l5", "completed": true } }`,
        statusCode: '101 Switching Protocols',
        code: `type Subscription {
  courseProgressUpdated(userId: ID!): Progress!
}`
      },
      {
        num: 25, file: '25-real-time-project.html', title: 'Real-Time Project',
        subtopics: 'Chat messages · Online users · Typing status · Lesson progress · Compiler output · Notifications · Subscription filtering · Event authorization · Reconnection handling · Scaling subscriptions',
        summary: 'Build a real-time collaborative feature streaming chat messages, live compiler output, and user typing notifications over WebSockets.',
        resource: 'RealTimeChat', method: 'WS', url: 'wss://api.ourcompiler.com/graphql',
        reqEx: `subscription {\n  messageAdded(channelId: "telugu_ruby") {\n    id\n    text\n    user { name }\n  }\n}`,
        resEx: `101 Switching Protocols -> Live Event Stream`,
        statusCode: '101 Switching Protocols',
        code: `subscription OnMessageAdded($channelId: ID!) {
  messageAdded(channelId: $channelId) {
    id
    text
    user { name }
  }
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 08', phaseTitle: 'Pagination and Filtering', icon: '📑',
    chapters: [
      {
        num: 26, file: '26-offset-pagination.html', title: 'Offset Pagination',
        subtopics: 'Offset pagination · Page number · Limit · Total count · Page metadata · Sorting · Offset limitations · Large dataset problems · API implementation · Client pagination',
        summary: 'Implement page/limit offset pagination returning total entity counts and page metadata.',
        resource: 'OffsetPagination', method: 'POST', url: '/graphql',
        reqEx: `query Courses($page: Int!, $limit: Int!) {\n  courses(page: $page, limit: $limit) {\n    items {\n      id\n      title\n    }\n    total\n    page\n    limit\n  }\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "courses": {\n      "items": [{ "id": "1", "title": "Python" }],\n      "total": 45,\n      "page": 1,\n      "limit": 10\n    }\n  }\n}`,
        statusCode: '200 OK',
        code: `query Courses($page: Int!, $limit: Int!) {
  courses(page: $page, limit: $limit) {
    items {
      id
      title
    }
    total
    page
    limit
  }
}`
      },
      {
        num: 27, file: '27-cursor-pagination.html', title: 'Cursor Pagination',
        subtopics: 'Cursor ante enti? · Connection · Edge · Node · PageInfo · hasNextPage · hasPreviousPage · startCursor · endCursor · first · after · Cursor stability',
        summary: 'GraphQL learning resources pagination strategies including slicing and connected edges/nodes cover chestayi.',
        resource: 'CourseConnection', method: 'POST', url: '/graphql',
        reqEx: `query {\n  courses(first: 10, after: "cursor_abc") {\n    edges {\n      node { title }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "courses": {\n      "edges": [{ "node": { "title": "Python" }, "cursor": "c1" }],\n      "pageInfo": { "hasNextPage": true, "endCursor": "c1" }\n    }\n  }\n}`,
        statusCode: '200 OK',
        code: `type CourseConnection {
  edges: [CourseEdge!]!
  pageInfo: PageInfo!
}

type CourseEdge {
  node: Course!
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
}`
      },
      {
        num: 28, file: '28-filtering-and-sorting.html', title: 'Filtering & Sorting',
        subtopics: 'Filter input · Search input · Level filter · Published filter · Date filter · Sort input · Ascending sort · Descending sort · Combining filters · Query performance · Input validation · Filter schema design',
        summary: 'Pass structured filter and sort inputs to GraphQL queries for flexible collection search and ordering.',
        resource: 'FilterInput', method: 'POST', url: '/graphql',
        reqEx: `query {\n  courses(filter: { level: BEGINNER }, sort: { field: PRICE, order: ASC }) {\n    id\n    title\n  }\n}`,
        resEx: `200 OK\n{\n  "data": { "courses": [{ "id": "1", "title": "Python" }] }\n}`,
        statusCode: '200 OK',
        code: `input CourseFilterInput {
  level: CourseLevel
  published: Boolean
  search: String
}

input CourseSortInput {
  field: CourseSortField!
  order: SortOrder!
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 09', phaseTitle: 'Authentication, Authorization & Security', icon: '🛡️',
    chapters: [
      {
        num: 29, file: '29-graphql-authentication.html', title: 'Authentication',
        subtopics: 'Authentication ante enti? · Context user · Cookies · Sessions · JWT · Bearer token · Login mutation · Logout mutation · Refresh token · Password hashing · Current user query · Authentication errors',
        summary: 'Authenticate GraphQL clients using JWT Bearer tokens, HTTP cookies, and context user injection.',
        resource: 'Auth', method: 'POST', url: '/graphql',
        reqEx: `query {\n  me {\n    id\n    email\n  }\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "me": { "id": "101", "email": "balaji@example.com" }\n  }\n}`,
        statusCode: '200 OK',
        code: `type Query {
  me: User
}`
      },
      {
        num: 30, file: '30-graphql-authorization.html', title: 'Authorization',
        subtopics: 'Authorization ante enti? · Field-level authorization · Resolver authorization · Role-based access · Permission-based access · Admin fields · User-owned resources · Authorization directives · Context authorization · Authorization testing',
        summary: 'Enforce field-level role-based authorization (RBAC) and user-owned resource access control in GraphQL resolvers.',
        resource: 'Authorization', method: 'POST', url: '/graphql',
        reqEx: `mutation {\n  deleteCourse(id: "1")\n}`,
        resEx: `200 OK\n{\n  "errors": [{ "message": "Forbidden", "extensions": { "code": "FORBIDDEN" } }]\n}`,
        statusCode: '200 OK',
        code: `const resolvers = {
  Mutation: {
    deleteCourse: (_, { id }, { user }) => {
      if (!user || user.role !== 'ADMIN') throw new Error("Forbidden");
      return db.deleteCourse(id);
    }
  }
};`
      },
      {
        num: 31, file: '31-graphql-security.html', title: 'GraphQL Security',
        subtopics: 'Query depth limiting · Query complexity limiting · Query cost analysis · Rate limiting · Introspection control · Disable playground in production · Input validation · Error masking · Resource authorization · Batch attack prevention · Alias abuse · Timeout handling · Upload security',
        summary: 'Harden GraphQL endpoints against query depth attacks, complexity abuse, batching attacks, and disable introspection in production.',
        resource: 'Security', method: 'POST', url: '/graphql',
        reqEx: `query MaliciousQuery { a: me { friends { friends { friends ... } } } }`,
        resEx: `400 Bad Request\n{\n  "errors": [{ "message": "Query depth exceeds maximum limit of 5" }]\n}`,
        statusCode: '400 Bad Request',
        code: `/* Security Pipeline: Depth Limit (5), Max Complexity (1000), Production Introspection Disabled */`
      }
    ]
  },
  {
    phaseTag: 'Phase 10', phaseTitle: 'Database Integration & Performance', icon: '🗄️',
    chapters: [
      {
        num: 32, file: '32-graphql-with-sql.html', title: 'SQL Integration',
        subtopics: 'Database connection · Models · Repository · Query resolver · Mutation resolver · Transactions · Pagination · Filtering · Sorting · Database errors · Connection pooling · Query optimization',
        summary: 'Connect GraphQL resolvers to relational SQL databases (PostgreSQL/MySQL) with ORMs or query builders.',
        resource: 'SQLDb', method: 'POST', url: '/graphql',
        reqEx: `query {\n  courses {\n    id\n    title\n  }\n}`,
        resEx: `200 OK\n{\n  "data": { "courses": [{ "id": "1", "title": "Python" }] }\n}`,
        statusCode: '200 OK',
        code: `const resolvers = {
  Query: {
    courses: async (_, args, { db }) => {
      return await db('courses').select('*');
    }
  }
};`
      },
      {
        num: 33, file: '33-graphql-with-mongodb.html', title: 'MongoDB Integration',
        subtopics: 'MongoDB connection · Document resolver · Nested documents · Reference resolver · Aggregation · Pagination · Transactions · Change streams · Database errors · MongoDB project',
        summary: 'Connect GraphQL resolvers to MongoDB documents, nested subdocuments, and aggregation pipelines.',
        resource: 'MongoDb', method: 'POST', url: '/graphql',
        reqEx: `query {\n  course(id: "650a1b2c3d") {\n    title\n  }\n}`,
        resEx: `200 OK\n{\n  "data": { "course": { "title": "MongoDB Basics" } }\n}`,
        statusCode: '200 OK',
        code: `const resolvers = {
  Query: {
    course: async (_, { id }, { models }) => {
      return await models.Course.findById(id);
    }
  }
};`
      },
      {
        num: 34, file: '34-dataloader-and-n1.html', title: 'DataLoader & N+1',
        subtopics: 'N+1 problem · Nested resolver issue · DataLoader ante enti? · Batching · Caching · DataLoader keys · Per-request loader · SQL batching · MongoDB batching · Performance testing',
        summary: 'Eliminate N+1 database queries by batching and caching entity lookups per-request using DataLoader.',
        resource: 'DataLoader', method: 'POST', url: '/graphql',
        reqEx: `const lessonLoader = new DataLoader(keys => batchGetLessons(keys));`,
        resEx: `200 OK\n(Single Batched SQL/NoSQL Database Query Executed)`,
        statusCode: '200 OK',
        code: `const DataLoader = require('dataloader');

const lessonLoader = new DataLoader(async (courseIds) => {
  const lessons = await db.lessons.find({ courseId: { $in: courseIds } });
  return courseIds.map(id => lessons.filter(l => l.courseId === id));
});`
      }
    ]
  },
  {
    phaseTag: 'Phase 11', phaseTitle: 'Client Development & State', icon: '💻',
    chapters: [
      {
        num: 35, file: '35-graphql-clients.html', title: 'GraphQL Clients',
        subtopics: 'GraphQL client ante enti? · Manual fetch · Apollo Client · Relay overview · urql overview · Client setup · Query documents · Mutation documents · Variables · Error handling · Loading states · Empty states',
        summary: 'Overview of client-side GraphQL libraries (Apollo Client, Relay, urql, native fetch) and query document management.',
        resource: 'ClientFetch', method: 'POST', url: '/graphql',
        reqEx: `fetch('/graphql', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ query: '{ courses { title } }' })\n})`,
        resEx: `200 OK\n{\n  "data": { "courses": [{ "title": "Python" }] }\n}`,
        statusCode: '200 OK',
        code: `fetch('/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'query { courses { id title } }' })
});`
      },
      {
        num: 36, file: '36-apollo-client.html', title: 'Apollo Client',
        subtopics: 'Apollo Client setup · ApolloProvider · useQuery · useMutation · useSubscription · Query variables · Refetching · Polling · Cache updates · Optimistic UI · Error policies · Network status',
        summary: 'Integrate Apollo Client in React applications using useQuery, useMutation, and useSubscription hooks with optimistic UI.',
        resource: 'ApolloReact', method: 'POST', url: '/graphql',
        reqEx: `const { data, loading } = useQuery(GET_COURSES);`,
        resEx: `200 OK\n(React UI Renders State Automatically)`,
        statusCode: '200 OK',
        code: `import { useQuery, gql } from '@apollo/client';

const GET_COURSES = gql\`
  query GetCourses {
    courses { id title }
  }
\`;`
      },
      {
        num: 37, file: '37-client-cache.html', title: 'Client Cache',
        subtopics: 'Normalized cache · Cache keys · Cache reads · Cache writes · Cache invalidation · Refetch queries · Update mutation cache · Optimistic updates · Pagination cache · Cache debugging',
        summary: 'Manage Apollo Client normalized InMemoryCache, write direct cache updates, and handle cache invalidation.',
        resource: 'InMemoryCache', method: 'POST', url: '/graphql',
        reqEx: `cache.writeQuery({ query: GET_COURSES, data: newCourses });`,
        resEx: `200 OK\n(Client Cache Updated Instantly)`,
        statusCode: '200 OK',
        code: `const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        courses: { merge(existing, incoming) { return incoming; } }
      }
    }
  }
});`
      }
    ]
  },
  {
    phaseTag: 'Phase 12', phaseTitle: 'Schema Design and Federation', icon: '🌐',
    chapters: [
      {
        num: 38, file: '38-schema-design.html', title: 'Schema Design',
        subtopics: 'Schema-first design · Code-first design · Domain modeling · Naming conventions · Nullable vs non-null fields · Input design · Payload design · Relationship design · Deprecation · Schema evolution · Backward compatibility · Documentation descriptions',
        summary: 'Design scalable, future-proof GraphQL schemas adhering to clear naming, nullability, and backward-compatible evolution rules.',
        resource: 'SchemaDesign', method: 'POST', url: '/graphql',
        reqEx: `type Course {\n  id: ID!\n  title: String!\n  oldTitle: String @deprecated(reason: "Use title instead")\n}`,
        resEx: `200 OK\n(Schema Deprecation Note Rendered in IDE)`,
        statusCode: '200 OK',
        code: `type Course {
  id: ID!
  title: String!
  oldTitle: String @deprecated(reason: "Use title instead")
}`
      },
      {
        num: 39, file: '39-introspection.html', title: 'Introspection',
        subtopics: 'Introspection ante enti? · __schema · __type · __typename · Schema documentation tools · GraphQL IDEs · Client code generation · Production introspection policy · Introspection security · Schema discovery',
        summary: 'GraphQL introspection __schema, __type and __typename fields dwara schema and concrete type details discover cheyyadaniki use avutundi.',
        resource: 'Introspection', method: 'POST', url: '/graphql',
        reqEx: `query Introspect {\n  __schema {\n    types {\n      name\n    }\n  }\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "__schema": { "types": [{ "name": "Course" }, { "name": "User" }] }\n  }\n}`,
        statusCode: '200 OK',
        code: `query IntrospectSchema {
  __schema {
    types {
      name
      kind
    }
  }
}`
      },
      {
        num: 40, file: '40-federation.html', title: 'Federation',
        subtopics: 'Federation ante enti? · Monolith schema · Subgraphs · Supergraph · Entities · Gateway · Shared types · Cross-service fields · Federation composition · Distributed authorization · Federation observability · When federation is needed',
        summary: 'Decompose monolithic GraphQL schemas into autonomous Apollo Federation subgraphs composed by a gateway.',
        resource: 'Federation', method: 'POST', url: '/gateway',
        reqEx: `type Course @key(fields: "id") {\n  id: ID!\n  title: String!\n}`,
        resEx: `200 OK\n(Gateway Composes Subgraphs into Unified Supergraph)`,
        statusCode: '200 OK',
        code: `@key(fields: "id")
extend type User @key(fields: "id") {
  id: ID! @external
  reviews: [Review!]!
}`
      }
    ]
  },
  {
    phaseTag: 'Phase 13', phaseTitle: 'Testing, Documentation and Deployment', icon: '🚢',
    chapters: [
      {
        num: 41, file: '41-graphql-testing.html', title: 'Testing',
        subtopics: 'Schema tests · Resolver unit tests · Query tests · Mutation tests · Authentication tests · Authorization tests · Error tests · Integration tests · Database tests · Subscription tests · Contract tests · Test fixtures',
        summary: 'Write automated unit, integration, and contract tests for GraphQL schemas and resolvers using Apollo Server testUtils.',
        resource: 'Testing', method: 'POST', url: '/graphql',
        reqEx: `const response = await testServer.executeOperation({ query: 'query { courses { title } }' });`,
        resEx: `200 OK\n(Jest Assertions Pass)`,
        statusCode: '200 OK',
        code: `const response = await testServer.executeOperation({
  query: 'query { courses { id title } }'
});
expect(response.body.singleResult.data.courses).toBeDefined();`
      },
      {
        num: 42, file: '42-graphql-documentation.html', title: 'Documentation',
        subtopics: 'Schema descriptions · Field descriptions · Type descriptions · Query examples · Mutation examples · Deprecation reasons · GraphQL Playground · GraphiQL · API explorer · Client documentation · Changelog · Schema registry',
        summary: 'Document GraphQL schemas inline using markdown comments, GraphiQL, and automated schema registries.',
        resource: 'Documentation', method: 'POST', url: '/graphql',
        reqEx: `"""\nRepresents an enrolled student\n"""\ntype Student {\n  id: ID!\n}`,
        resEx: `200 OK\n(Interactive Schema Docs Rendered)`,
        statusCode: '200 OK',
        code: `"""
Represents an online learning course
"""
type Course {
  """Unique identifier for course"""
  id: ID!
  title: String!
}`
      },
      {
        num: 43, file: '43-monitoring.html', title: 'Monitoring',
        subtopics: 'Request logging · Resolver timing · Query complexity · Query depth · Error tracking · Tracing · Correlation IDs · Database timings · Cache metrics · Subscription metrics · Slow query reports · Alerts',
        summary: 'Monitor GraphQL server health, resolver execution latency, slow queries, and field usage metrics with Apollo Studio.',
        resource: 'Monitoring', method: 'POST', url: '/graphql',
        reqEx: `ApolloServerPluginUsageReporting()`,
        resEx: `200 OK\n(Metrics Streamed to Tracing Dashboard)`,
        statusCode: '200 OK',
        code: `/* Tracing & Resolver Latency Plugin Active */`
      },
      {
        num: 44, file: '44-deployment.html', title: 'Deployment',
        subtopics: 'Production build · Environment variables · Database deployment · GraphQL endpoint · HTTPS · CORS · Rate limiting · Introspection policy · Docker · CI/CD · Horizontal scaling · WebSocket scaling · Health checks · Rollback',
        summary: 'Deploy production-ready GraphQL API servers using Docker, HTTPS, environment configs, CORS, and rate limiting.',
        resource: 'Deployment', method: 'POST', url: '/graphql',
        reqEx: `docker build -t our-compiler-graphql .`,
        resEx: `200 OK\n(Server Deployed and Healthy at https://api.ourcompiler.com/graphql)`,
        statusCode: '200 OK',
        code: `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["node", "dist/server.js"]`
      },
      {
        num: 45, file: '45-graphql-projects.html', title: 'GraphQL Projects',
        subtopics: 'Beginner Projects (Course API, Book library) · Intermediate Projects (E-commerce, Recipe search) · Advanced Projects (Our Compiler Platform, Real-time quiz, Federation) · Complete Schema & Operations Specification',
        summary: 'Build real-world GraphQL project applications including Our Compiler GraphQL API specification.',
        resource: 'Projects', method: 'POST', url: '/graphql',
        reqEx: `query GetTutorial($language: String!) {\n  tutorials(language: $language) {\n    title\n    lessons { title order }\n  }\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "tutorials": [{ "title": "Python Basics", "lessons": [{ "title": "Intro", "order": 1 }] }]\n  }\n}`,
        statusCode: '200 OK',
        code: `type Language {
  id: ID!
  name: String!
  slug: String!
  icon: String
}

type Tutorial {
  id: ID!
  title: String!
  slug: String!
  description: String
  language: Language!
  lessons: [Lesson!]!
}

type Lesson {
  id: ID!
  title: String!
  slug: String!
  order: Int!
  content: String!
  hasQuiz: Boolean!
}

type Query {
  languages: [Language!]!
  tutorials(language: String): [Tutorial!]!
  lesson(language: String!, slug: String!): Lesson
  me: User
}

type Mutation {
  createProgress(input: ProgressInput!): ProgressPayload!
  submitQuiz(input: QuizSubmissionInput!): QuizResultPayload!
}

type Subscription {
  progressUpdated(userId: ID!): UserProgress!
}`
      },
      {
        num: 46, file: '46-graphql-quiz.html', title: 'GraphQL Practice Quiz',
        subtopics: 'Comprehensive GraphQL Knowledge Check · 30 Multiple Choice Certification Exam Questions · Schema, Resolvers, Auth, Subscriptions, DataLoader & Federation',
        summary: 'Test your GraphQL engineering mastery with our 30-question interactive certification practice quiz.',
        resource: 'Quiz', method: 'POST', url: '/graphql',
        reqEx: `mutation SubmitQuiz($answers: QuizAnswersInput!) {\n  submitQuiz(answers: $answers) {\n    score\n    passed\n  }\n}`,
        resEx: `200 OK\n{\n  "data": {\n    "submitQuiz": { "score": 100, "passed": true }\n  }\n}`,
        statusCode: '200 OK',
        code: `/* GraphQL Masterclass Certification Exam Active! */`
      }
    ]
  }
];

// Helper to generate Accordion Sidebar HTML
function getGraphqlSidebarHTML(activeNum) {
  let sidebarAccHTML = '';
  graphqlPhases.forEach(phase => {
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
        ${phase.chapters.map(c => `<a href="/blog-graphql/${c.file}" class="${c.num === activeNum ? 'active' : ''}">${c.num}. ${c.title}</a>`).join('')}
      </div>`;
  });
  return sidebarAccHTML;
}

// 3. Generate public/blog-graphql.html (Master Index Page)
const allGraphqlChapters = [];
graphqlPhases.forEach(p => p.chapters.forEach(c => allGraphqlChapters.push({ ...c, phaseTag: p.phaseTag, phaseTitle: p.phaseTitle, icon: p.icon })));

const masterIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GraphQL Complete Roadmap — 46 Chapters, 13 Phases (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master GraphQL schema design, SDL types, Query, Mutation, Subscriptions, Apollo Server, DataLoader, Authentication, Directives, Apollo Client, Federation, Tooling, and Testing with our complete 46-chapter roadmap across 13 phases." />
  <meta name="keywords" content="graphql tutorial, learn graphql, graphql masterclass, apollo server, schema sdl, dataloader, graphql query, graphql mutation, graphql subscription, apollo client, apollo federation" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-graphql.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-graphql/style.css" />
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
<body class="lang-graphql">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rest-api.html">REST API</a>
  <a href="/blog-graphql.html" class="active">GraphQL</a>
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
    <div class="sidebar-heading">GraphQL Roadmap</div>
    <a href="/blog-graphql.html" class="sidebar-home-link active">🚀 GraphQL Course HOME</a>
    <div class="sidebar-accordion">
      ${getGraphqlSidebarHTML(0)}
    </div>
    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/online-python-compiler.html" style="color:#e10098;font-weight:700;">▶ Run Code in IDE</a>
    <a href="/blog.html">📚 All Tutorials</a>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">GraphQL Complete Roadmap</span>
    </div>

    <h1 class="page-title">GraphQL Complete Masterclass (46 Chapters, 13 Phases)</h1>

    <div class="page-meta">
      <span class="badge">🚀 GraphQL Spec 2026</span>
      <span class="badge">🟢 46 Complete Chapters</span>
      <span class="badge">📂 13 Complete Phases</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">What is GraphQL? · GraphQL vs REST · Project Setup &amp; Folder Structure · Schema SDL &amp; Root Types · Scalars, Objects, Enums &amp; Input Types · Interfaces &amp; Unions · Queries, Arguments &amp; Variables · Fragments &amp; Directives · Resolver Signature &amp; Context · Nested Resolvers &amp; DataLoader · Mutation Basics &amp; Payloads · Subscriptions &amp; Real-Time · Offset &amp; Cursor Pagination · Auth &amp; Security · SQL &amp; MongoDB Integration · Apollo Client &amp; Federation · Testing, Codegen, Projects &amp; Quiz</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's GraphQL Complete Master Course</strong>. GraphQL is the modern query language and execution engine empowering client applications to request exact data requirements. This comprehensive 46-chapter bootcamp guides you through GraphQL schema design, SDL types, resolvers, DataLoader optimization, JWT authentication, Apollo Client, Federation subgraphs, and testing production GraphQL servers.</p>
    </div>

    <div style="background:linear-gradient(135deg,rgba(225,0,152,0.12),rgba(20,24,32,0.6));border:1px solid rgba(225,0,152,0.3);border-radius:12px;padding:24px;margin:28px 0;">
      <h3 style="color:#e10098;margin-bottom:10px;font-size:18px;">🎯 Ready to Master GraphQL API Architecture?</h3>
      <p style="color:var(--text2);margin-bottom:16px;font-size:14.5px;">Choose where to start: explore GraphQL introduction, basic queries, mutations, DataLoader, subscriptions, cursor pagination, or platform API project:</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/blog-graphql/01-what-is-graphql.html" style="background:linear-gradient(135deg,#e10098,#be185d);color:#fff;font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 1: GraphQL Intro →</a>
        <a href="/blog-graphql/12-basic-queries.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 4: Queries →</a>
        <a href="/blog-graphql/19-nested-resolvers.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 5: Nested Resolvers →</a>
        <a href="/blog-graphql/21-mutation-basics.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 6: Mutations →</a>
        <a href="/blog-graphql/27-cursor-pagination.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 8: Cursor Pagination →</a>
        <a href="/blog-graphql/45-graphql-projects.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 13: GraphQL Projects →</a>
      </div>
    </div>

    <div class="section-title"><span class="num">📚</span> Master Course Curriculum</div>
    <div class="curriculum-roadmap-container">
      ${graphqlPhases.map(phase => `
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
              <a href="/blog-graphql/${ch.file}" class="curriculum-lesson-row">
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
        <span>GraphQL Complete Masterclass · 46 Chapters · 13 Phases · 2026 Edition</span>
      </div>
    </div>

    <div class="nav-footer">
      <a href="/blog.html" class="nav-btn"><span class="label">← All Tutorials</span><span class="title">Course Hub</span></a>
      <a href="/blog-graphql/01-what-is-graphql.html" class="nav-btn" style="text-align:right;"><span class="label">Start Learning →</span><span class="title">1. What is GraphQL?</span></a>
    </div>
  </main>
</div>
<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'blog-graphql.html'), masterIndexHtml, 'utf8');
console.log('✅ Generated public/blog-graphql.html master index page successfully!');

// 4. Generate all 46 Chapter HTML Files inside public/blog-graphql/ adhering strictly to the 18-Section Lesson Layout
allGraphqlChapters.forEach((ch, idx) => {
  const prevChapter = idx > 0 ? allGraphqlChapters[idx - 1] : null;
  const nextChapter = idx < allGraphqlChapters.length - 1 ? allGraphqlChapters[idx + 1] : null;

  const chapterHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GraphQL — ${ch.title} | Our Compiler</title>
  <meta name="description" content="Complete GraphQL Chapter ${ch.num}: ${ch.title}. Learn ${ch.subtopics} with practical GraphQL SDL definitions, queries, mutations, resolvers, and step-by-step walkthroughs." />
  <meta name="keywords" content="graphql tutorial, learn graphql, ${ch.title.toLowerCase()}, apollo server, dataloader, schema sdl" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-graphql/${ch.file}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-graphql/style.css" />
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
<body class="lang-graphql">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rest-api.html">REST API</a>
  <a href="/blog-graphql.html" class="active">GraphQL</a>
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
    <div class="sidebar-heading">GraphQL Tutorial</div>
    <a href="/blog-graphql.html" class="sidebar-home-link">🚀 GraphQL HOME</a>
    <div class="sidebar-accordion">
      ${getGraphqlSidebarHTML(ch.num)}
    </div>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-graphql.html">GraphQL</a><span class="sep">›</span>
      <span class="current">GraphQL — ${ch.title}</span>
    </div>

    <h1 class="page-title">GraphQL — ${ch.title}</h1>

    <div class="page-meta">
      <span class="badge">🚀 GraphQL Spec 2026</span>
      <span class="badge">🟢 Chapter ${ch.num} of ${allGraphqlChapters.length}</span>
      <span class="badge">📂 ${ch.phaseTag}: ${ch.phaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this chapter:</span>
      <span class="topic-pill-text">${ch.subtopics}</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>GraphQL — ${ch.title}</strong> in our GraphQL Complete Masterclass! ${ch.summary}</p>
    </div>

    <!-- 1. Simple introduction -->
    <div class="section-title"><span class="num">1</span>Simple Introduction</div>
    <div class="section-body">
      <p>In API engineering, understanding <strong>${ch.title}</strong> is essential for building flexible, strongly-typed GraphQL APIs. GraphQL replaces multiple REST endpoints with a single endpoint and client-driven field selections.</p>
    </div>

    <!-- 2. What you will learn -->
    <div class="section-title"><span class="num">2</span>What You Will Learn</div>
    <div class="section-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:16px 20px;margin-bottom:24px;">
        <strong style="color:#e10098;display:block;margin-bottom:10px;">📚 Learning Objectives:</strong>
        <ul style="margin:0 0 0 20px;line-height:1.8;">
          <li>Master schema definition language (SDL) and type mechanics behind <strong>${ch.title}</strong></li>
          <li>Understand resolver execution flows, context injection, and DataLoader optimization</li>
          <li>Design standardized, production-ready GraphQL schemas and operations</li>
          <li>Avoid common architectural pitfalls, N+1 query performance bugs, and security risks</li>
        </ul>
      </div>
    </div>

    <!-- 3. Why this concept is useful -->
    <div class="section-title"><span class="num">3</span>Why ${ch.title} is Useful</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">💡 Practical Utility</div>
        <p>GraphQL empowers frontend teams to request exact data shapes without backend API modifications. Mastering <strong>${ch.title}</strong> enables full-stack developers to build efficient, scalable GraphQL services in Node.js, TypeScript, Python, and Go.</p>
      </div>
    </div>

    <!-- 4. Required schema -->
    <div class="section-title"><span class="num">4</span>Required Schema Design</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header"><span class="lang-tag">GraphQL SDL Schema Definition</span></div>
        <pre><code>type ${ch.resource} {\n  id: ID!\n  title: String!\n  level: String!\n}\n\ntype Query {\n  ${ch.resource.toLowerCase()}s: [${ch.resource}!]!\n}</code></pre>
      </div>
    </div>

    <!-- 5. Query / Mutation syntax -->
    <div class="section-title"><span class="num">5</span>Query / Operation Syntax</div>
    <div class="section-body">
      <p>Operation Type: <code style="color:#e10098;font-weight:700;">${ch.method}</code>. Specifies whether the operation reads data (Query), modifies state (Mutation), or streams real-time updates (Subscription).</p>
    </div>

    <!-- 6. Basic example -->
    <div class="section-title"><span class="num">6</span>Basic Operation Example</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header"><span class="lang-tag">GraphQL Operation String</span></div>
        <pre><code>${ch.reqEx}</code></pre>
      </div>
    </div>

    <!-- 7. Variables / Arguments -->
    <div class="section-title"><span class="num">7</span>Variables &amp; Arguments</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header"><span class="lang-tag">Resolver Definition &amp; Code Logic</span></div>
        <pre><code>${ch.code}</code></pre>
      </div>
    </div>

    <!-- 8. Response output -->
    <div class="section-title"><span class="num">8</span>Response Output</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header"><span class="lang-tag">GraphQL JSON Payload Response</span></div>
        <pre><code>${ch.resEx}</code></pre>
      </div>
    </div>

    <!-- 9. Resolver flow -->
    <div class="section-title"><span class="num">9</span>Resolver Flow &amp; Execution Path</div>
    <div class="section-body">
      <div class="diagram-box">GraphQL HTTP Request -> AST Parsing -> Schema Validation -> Context Authentication -> Root Resolver Execution -> Nested Field Tree Walk -> DataLoader Batching -> JSON Data Response</div>
    </div>

    <!-- 10. Error handling -->
    <div class="section-title"><span class="num">10</span>Error Handling</div>
    <div class="section-body">
      <div class="card" style="background:var(--bg2);padding:14px 18px;border-radius:8px;margin:16px 0;border-left:4px solid #e10098;">
        <strong style="color:#e10098;">GraphQL Error Envelope: HTTP ${ch.statusCode}</strong>
        <p style="margin-top:6px;font-size:13.5px;color:var(--text2);">GraphQL servers return errors inside the top-level <code>errors</code> JSON array envelope containing error <code>message</code>, <code>locations</code>, <code>path</code>, and <code>extensions.code</code>.</p>
      </div>
    </div>

    <!-- 11. Performance note -->
    <div class="section-title"><span class="num">11</span>Performance Note</div>
    <div class="section-body">
      <p>Use DataLoader to batch parallel field execution lookups. Ensure query complexity scoring and max depth limits are configured to prevent server exhaustion on complex query trees.</p>
    </div>

    <!-- 12. Common mistakes -->
    <div class="section-title"><span class="num">12</span>Common Mistakes</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">⚠️ Anti-Patterns to Avoid</div>
        <ul style="margin:8px 0 0 18px;line-height:1.7;">
          <li>Querying fields not defined in the GraphQL schema before validation.</li>
          <li>Forgetting required operation variables in client app requests.</li>
          <li>Confusing Query (Read) operations with Mutation (Write) operations.</li>
          <li>Executing un-batched database queries inside nested resolvers (N+1 problem).</li>
          <li>Exposing sensitive user credentials or internal database fields directly in GraphQL schemas.</li>
          <li>Allowing unlimited query depth or introspection in production environments.</li>
        </ul>
      </div>
    </div>

    <!-- 13. Coding challenge -->
    <div class="section-title"><span class="num">13</span>Coding Challenge</div>
    <div class="section-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:18px 22px;margin-bottom:24px;">
        <strong style="color:#e10098;display:block;margin-bottom:8px;">🎯 Hands-On Challenge (Our Compiler Schema):</strong>
        <p>Create a GraphQL schema for <strong>Our Compiler Platform</strong> with <code>Language</code>, <code>Tutorial</code>, <code>Lesson</code>, and <code>Quiz</code> entities. Write a query returning Language name, Tutorial title, Lesson title, Lesson order, and Quiz availability!</p>
      </div>
    </div>

    <!-- 14. Mini quiz -->
    <div class="section-title"><span class="num">14</span>Mini Quiz</div>
    <div class="section-body">
      <div class="faq-card">
        <h4>❓ Question: What is the primary advantage of ${ch.title} in GraphQL API development?</h4>
        <p><strong>Answer:</strong> It enables strongly-typed schema contracts and ${ch.subtopics.split('·')[0].trim()}, eliminating REST over-fetching and under-fetching.</p>
      </div>
    </div>

    <!-- 15. Quick recap -->
    <div class="section-title"><span class="num">15</span>Quick Recap</div>
    <div class="section-body">
      <ul style="line-height:1.8;margin-left:20px;">
        <li>${ch.summary}</li>
        <li>GraphQL operations use Query (Read), Mutation (Write), and Subscription (Real-time events).</li>
        <li>Follow GraphQL SDL best practices, DataLoader batching, and security depth limits.</li>
      </ul>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on GraphQL Spec 2026 Standards · Last updated August 2026</span>
      </div>
    </div>

    <!-- 17 & 18. Previous & Next Lesson Navigation -->
    <div class="nav-footer">
      ${prevChapter ? `<a href="${prevChapter.file}" class="nav-btn"><span class="label">← Previous Lesson</span><span class="title">${prevChapter.num}. ${prevChapter.title}</span></a>` : `<a href="/blog-graphql.html" class="nav-btn"><span class="label">← GraphQL Overview</span><span class="title">Course Index</span></a>`}
      ${nextChapter ? `<a href="${nextChapter.file}" class="nav-btn" style="text-align:right;"><span class="label">Next Lesson →</span><span class="title">${nextChapter.num}. ${nextChapter.title}</span></a>` : `<a href="/blog-graphql.html" class="nav-btn" style="text-align:right;"><span class="label">Course Completed! 🎉</span><span class="title">GraphQL Index</span></a>`}
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;

  const filePath = path.join(graphqlDir, ch.file);
  fs.writeFileSync(filePath, chapterHtml, 'utf8');
  console.log(`🔥 Generated GraphQL Chapter: ${ch.file} (${(chapterHtml.length / 1024).toFixed(1)}KB)`);
});

console.log('✅ Generated all 46 GraphQL Masterclass chapter files in public/blog-graphql/ successfully!');
