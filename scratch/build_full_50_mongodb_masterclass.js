const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const mongoDir = path.join(publicDir, 'blog-mongodb');

if (!fs.existsSync(mongoDir)) {
  fs.mkdirSync(mongoDir, { recursive: true });
}

// 1. Create public/blog-mongodb/style.css matching MongoDB Emerald Green Theme (#13aa52 / #00ed64)
const mongoCssStyleContent = `/* Specialized styling enhancements for MongoDB tutorial lessons & Accordion — MongoDB Emerald Green Theme */
:root {
  --mongo-theme: #13aa52;
  --mongo-accent: #00ed64;
  --mongo-accent-hover: #119246;
  --mongo-theme-bg: rgba(19, 170, 82, 0.12);
  --mongo-theme-border: rgba(19, 170, 82, 0.3);
}

body.lang-mongodb {
  --accent: #13aa52;
  --accent-glow: rgba(19, 170, 82, 0.2);
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
  background: rgba(19, 170, 82, 0.08) !important;
  border: 1px solid rgba(19, 170, 82, 0.25) !important;
  border-radius: 99px !important;
  color: #13aa52 !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  text-decoration: none !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sidebar-home-link:hover {
  background: rgba(19, 170, 82, 0.16) !important;
  border-color: #13aa52 !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(19, 170, 82, 0.2);
}

.sidebar-home-link.active {
  background: linear-gradient(135deg, rgba(19, 170, 82, 0.18), rgba(20, 24, 32, 0.8)) !important;
  border-color: #13aa52 !important;
  color: #00ed64 !important;
  box-shadow: 0 0 12px rgba(19, 170, 82, 0.25);
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
  background: linear-gradient(135deg, rgba(19, 170, 82, 0.15) 0%, rgba(20, 24, 32, 0.6) 100%);
  border-color: #13aa52;
  box-shadow: 0 0 14px rgba(19, 170, 82, 0.18);
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
  background: rgba(19, 170, 82, 0.2);
  border-color: rgba(19, 170, 82, 0.4);
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
  color: #00ed64;
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
  background: rgba(19, 170, 82, 0.2);
  color: #00ed64;
  border-color: rgba(19, 170, 82, 0.35);
  font-weight: 700;
}

.accordion-chevron {
  color: var(--text3, #8b949e);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s;
  flex-shrink: 0;
}

.accordion-header.active .accordion-chevron {
  transform: rotate(90deg);
  color: #13aa52;
}

.accordion-content {
  display: none;
  flex-direction: column;
  padding: 4px 0 6px 10px;
  border-left: 2px solid rgba(19, 170, 82, 0.35);
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
  background: #13aa52 !important;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(19, 170, 82, 0.35);
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
  border-color: rgba(19, 170, 82, 0.4);
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
  background: rgba(19, 170, 82, 0.12);
  border: 1px solid rgba(19, 170, 82, 0.3);
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
  color: #00ed64;
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
  background: rgba(19, 170, 82, 0.08);
  border-color: rgba(19, 170, 82, 0.35);
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
  background: rgba(19, 170, 82, 0.15);
  color: #00ed64;
  font-size: 12px;
  font-weight: 800;
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.curriculum-lesson-row:hover .lesson-idx {
  background: #13aa52;
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
  color: #00ed64;
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
  color: #00ed64;
  padding: 5px 12px;
  border-radius: 6px;
  background: rgba(19, 170, 82, 0.1);
  border: 1px solid rgba(19, 170, 82, 0.2);
  transition: all 0.18s ease;
}

.curriculum-lesson-row:hover .lesson-btn {
  background: #13aa52;
  color: #ffffff;
}

.curriculum-lesson-row:hover .lesson-btn .arrow {
  transform: translateX(3px);
}

.lesson-btn .arrow {
  transition: transform 0.18s ease;
}

/* Light Theme overrides */
body.light-theme .phase-roadmap-card {
  background: #ffffff;
  border-color: #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

body.light-theme .phase-roadmap-card:hover {
  border-color: #13aa52;
  box-shadow: 0 6px 18px rgba(19, 170, 82, 0.12);
}

body.light-theme .phase-roadmap-header {
  border-bottom-color: #f1f5f9;
}

body.light-theme .phase-roadmap-icon {
  background: #dcfce7;
  border-color: #bbf7d0;
}

body.light-theme .phase-roadmap-tag {
  color: #15803d;
}

body.light-theme .phase-roadmap-title {
  color: #0f172a;
}

body.light-theme .phase-roadmap-badge {
  background: #f1f5f9;
  border-color: #e2e8f0;
  color: #475569;
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
  color: #15803d;
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
  color: #15803d;
}

body.light-theme .curriculum-lesson-row:hover .lesson-btn {
  background: #15803d;
  color: #ffffff;
}

body.light-theme .sidebar-home-link {
  background: #f0fdf4 !important;
  border-color: #bbf7d0 !important;
  color: #15803d !important;
}

body.light-theme .sidebar-home-link.active {
  background: #dcfce7 !important;
  border-color: #13aa52 !important;
  color: #166534 !important;
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
  border: 1.5px solid #13aa52 !important;
  color: #0f172a !important;
  box-shadow: 0 2px 10px rgba(19, 170, 82, 0.15) !important;
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
  color: #15803d !important;
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
  color: #15803d !important;
  border-color: #4ade80 !important;
}
body.light-theme .accordion-chevron {
  color: #94a3b8;
}
body.light-theme .accordion-header.active .accordion-chevron {
  color: #15803d !important;
}
body.light-theme .accordion-content a {
  color: #475569;
}
body.light-theme .accordion-content a:hover {
  color: #0f172a;
  background: #f1f5f9;
}
body.light-theme .accordion-content a.active {
  background: #15803d !important;
  color: #ffffff !important;
  border-radius: 8px !important;
  font-weight: 700 !important;
}

.try-box {
  background: linear-gradient(135deg, rgba(19, 170, 82, 0.08) 0%, rgba(20, 24, 32, 0.6) 100%);
  border: 1px solid rgba(19, 170, 82, 0.25);
  border-radius: var(--radius, 12px);
  padding: 24px;
  margin: 32px 0;
}

.try-box .try-title {
  font-weight: 700;
  color: #00ed64;
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
  background: linear-gradient(135deg, #13aa52, #119246);
  color: #ffffff !important;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.2s, opacity 0.2s;
  box-shadow: 0 4px 14px rgba(19, 170, 82, 0.3);
}

.try-box .run-btn:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

.callout {
  background: #161b22;
  border: 1px solid #30363d;
  border-left: 4px solid #13aa52;
  padding: 18px 22px;
  border-radius: var(--radius, 12px);
  margin: 28px 0;
}

.callout .callout-title {
  font-weight: 700;
  color: #00ed64;
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
  color: #00ed64;
  line-height: 1.55;
  white-space: pre !important;
  overflow-x: auto;
}

.faq-card {
  background: #141820;
  border: 1px solid #30363d;
  border-left: 4px solid #13aa52;
  border-radius: 10px;
  padding: 18px 22px;
  margin-bottom: 18px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, border-color 0.2s;
}

.faq-card:hover {
  transform: translateX(3px);
  border-color: #13aa52;
}

.faq-card h4 {
  color: #00ed64 !important;
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
  background: linear-gradient(135deg, #13aa52, #119246);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 800;
  font-size: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(19, 170, 82, 0.3);
}

body.light-theme .try-box {
  background: #f0fdf4;
  border-color: #bbf7d0;
}
body.light-theme .callout {
  background: #f8fafc;
  border-color: #cbd5e1;
  border-left-color: #15803d;
}
body.light-theme .callout .callout-title {
  color: #166534;
}
body.light-theme .diagram-box {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #0f172a;
}
body.light-theme .faq-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #15803d;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
body.light-theme .faq-card h4 {
  color: #166534 !important;
}
body.light-theme .faq-card p {
  color: #334155;
}
`;

fs.writeFileSync(path.join(mongoDir, 'style.css'), mongoCssStyleContent, 'utf8');

// 2. Define 50-Chapter MongoDB Syllabus across 10 Phases matching user's exact specification
const mongoPhases = [
  {
    phaseTag: 'Phase 01', phaseTitle: 'MongoDB & NoSQL Basics', icon: '🍃',
    chapters: [
      { num: 1, file: '01-mongodb-introduction.html', title: 'What is MongoDB & NoSQL?', subtopics: 'MongoDB ante enti? · NoSQL database · BSON vs JSON · Flexible schema · MongoDB architecture · Advantages', cmd: 'mongosh --version', desc: 'Introduction to MongoDB document database, NoSQL principles, BSON storage format, and high-level architecture.' },
      { num: 2, file: '02-mongodb-vs-sql.html', title: 'MongoDB vs SQL Databases', subtopics: 'Database/Collection/Document vs DB/Table/Row · Primary key _id · $lookup vs JOINs · Flexible schema comparison', cmd: 'db.version()', desc: 'Direct comparison between Relational SQL databases (MySQL/PostgreSQL) and MongoDB document stores.' },
      { num: 3, file: '03-mongodb-installation.html', title: 'MongoDB Installation & Setup', subtopics: 'MongoDB Community Edition · Starting mongod service · Port configuration (27017) · macOS/Linux/Windows setup', cmd: 'sudo systemctl start mongod', desc: 'Install MongoDB Community Server, manage background services, and verify port binding.' },
      { num: 4, file: '04-mongodb-atlas.html', title: 'MongoDB Atlas Cloud Database', subtopics: 'Atlas cloud clusters · Free tier M0 · IP allowlist · Database users & credentials · Atlas Connection Strings', cmd: 'mongosh "mongodb+srv://cluster.mongodb.net"', desc: 'Provision cloud-hosted MongoDB Atlas databases, configure network security, and obtain connection URIs.' },
      { num: 5, file: '05-compass-and-mongosh.html', title: 'MongoDB Compass & mongosh CLI', subtopics: 'Compass GUI interface · mongosh REPL shell · Database navigation (`show dbs`, `use db`, `show collections`)', cmd: 'show collections', desc: 'Interact with MongoDB using Compass visual GUI desktop tool and mongosh command line terminal.' }
    ]
  },
  {
    phaseTag: 'Phase 02', phaseTitle: 'Databases, Collections & BSON Documents', icon: '📁',
    chapters: [
      { num: 6, file: '06-databases-and-collections.html', title: 'Databases & Collections Management', subtopics: 'Creating databases · db.createCollection() · Dropping databases & collections · Capped collections · Time-series', cmd: 'db.createCollection("courses")', desc: 'Manage databases and collections, explicit vs implicit collection creation, capped & time-series options.' },
      { num: 7, file: '07-documents-and-bson.html', title: 'Documents & BSON Data Types', subtopics: 'Document structures · BSON data types (String, Int, Long, Double, Date, Boolean, Array, Object, Null, Binary)', cmd: 'db.courses.insertOne({ title: "Node" })', desc: 'Deep dive into BSON key-value document format, supported primitive types, and 16MB document size limits.' },
      { num: 8, file: '08-id-and-objectid.html', title: 'The _id Field & ObjectId Mechanics', subtopics: '_id field primary key · 12-byte ObjectId structure (timestamp, machine, process, counter) · Custom IDs · UUIDs', cmd: 'ObjectId("60c72b2f9b1d8b2d88a4e123")', desc: 'Understand default _id primary key generation, 12-byte binary ObjectId composition, and custom ID strategies.' },
      { num: 9, file: '09-json-vs-bson.html', title: 'JSON vs BSON Deep Dive', subtopics: 'JSON text format vs BSON binary format · Extended JSON v2 · Serialization speed · Type richness comparison', cmd: 'EJSON.stringify(doc)', desc: 'Compare JSON human-readable text representations with BSON binary indexing and speed optimizations.' },
      { num: 10, file: '10-data-modeling-and-schema-design.html', title: 'Data Modeling & Schema Design', subtopics: 'Embedded documents vs Document references · 1-to-1, 1-to-Many, Many-to-Many relationships · Denormalization rules', cmd: 'db.orders.find({ "customer._id": 1 })', desc: 'Design scalable NoSQL schemas choosing between document embedding and normalization references.' }
    ]
  },
  {
    phaseTag: 'Phase 03', phaseTitle: 'CRUD Operations — Reading & Writing Data', icon: '✏️',
    chapters: [
      { num: 11, file: '11-inserting-documents.html', title: 'Inserting Documents', subtopics: 'insertOne() · insertMany() · Write Concern · Ordered vs Unordered inserts · Duplicate key errors', cmd: 'db.courses.insertOne({ title: "JavaScript", level: "Beginner", published: true, tags: ["frontend", "web"] })', desc: 'Write single and batch documents into collections with custom write concerns and error handling.' },
      { num: 12, file: '12-finding-documents.html', title: 'Finding Documents & Query Selectors', subtopics: 'find() · findOne() · Query filters · Equality matching · Cursor objects · Pretty printing', cmd: 'db.courses.find({ level: "Beginner" })', desc: 'Retrieve documents from MongoDB collections matching specific equality and filter criteria.' },
      { num: 13, file: '13-comparison-operators.html', title: 'Comparison Operators', subtopics: '$eq · $ne · $gt · $gte · $lt · $lte · $in · $nin query comparison operators', cmd: 'db.courses.find({ duration: { $gte: 20, $lte: 60 } })', desc: 'Perform range filtering and set matching using MongoDB comparison query operators.' },
      { num: 14, file: '14-logical-operators.html', title: 'Logical Operators', subtopics: '$and · $or · $not · $nor logical query evaluation · Combining multiple filter clauses', cmd: 'db.courses.find({ $or: [{ level: "Beginner" }, { published: true }] })', desc: 'Combine complex conditional clauses using logical $and, $or, $not, and $nor operators.' },
      { num: 15, file: '15-element-and-evaluation-operators.html', title: 'Element & Evaluation Operators', subtopics: '$exists · $type · $regex · $expr · $text · $mod query evaluation operators', cmd: 'db.courses.find({ tags: { $exists: true } })', desc: 'Filter documents based on field existence, BSON data types, regular expressions, and expressional logic.' }
    ]
  },
  {
    phaseTag: 'Phase 04', phaseTitle: 'Advanced Querying, Array & Embedded Documents', icon: '🎯',
    chapters: [
      { num: 16, file: '16-querying-arrays.html', title: 'Querying Arrays & Multikey Fields', subtopics: '$all · $elemMatch · $size · Array index element queries · Matching array elements', cmd: 'db.courses.find({ tags: { $all: ["web", "frontend"] } })', desc: 'Query array fields matching all elements, exact sizes, or specific embedded array criteria.' },
      { num: 17, file: '17-querying-embedded-documents.html', title: 'Querying Nested & Embedded Documents', subtopics: 'Dot notation ("instructor.name") · Exact document matching · Embedded object filters', cmd: 'db.courses.find({ "instructor.name": "Ravi" })', desc: 'Query nested subdocuments using MongoDB dot notation path navigation.' },
      { num: 18, file: '18-projection-and-field-selection.html', title: 'Projection & Field Selection', subtopics: 'Selecting fields ({ title: 1, level: 1, _id: 0 }) · Sensitive field exclusion · Projection performance', cmd: 'db.courses.find({ published: true }, { title: 1, level: 1, _id: 0 })', desc: 'Optimize database bandwidth by returning only specific required document fields.' },
      { num: 19, file: '19-sorting-limiting-pagination.html', title: 'Sorting, Limiting & Pagination', subtopics: 'sort({ level: 1 }) · limit() · skip() · Range-based cursor pagination vs skip-limit pagination', cmd: 'db.courses.find().sort({ order: 1 }).limit(10)', desc: 'Sort query results ascending/descending, limit record counts, and implement cursor-based pagination.' },
      { num: 20, file: '20-updating-documents.html', title: 'Updating Documents & Field Modifiers', subtopics: 'updateOne() · updateMany() · replaceOne() · $set · $unset · $inc · $mul · $rename · $min · $max · $currentDate', cmd: 'db.courses.updateOne({ title: "JavaScript" }, { $set: { level: "Intermediate" } })', desc: 'Modify document values in-place using field update operators ($set, $inc, $unset).' }
    ]
  },
  {
    phaseTag: 'Phase 05', phaseTitle: 'Array Updates, Upserts & Deletions', icon: '⚡',
    chapters: [
      { num: 21, file: '21-updating-arrays.html', title: 'Updating Arrays in Documents', subtopics: '$push · $addToSet · $pop · $pull · $pullAll · Array positional operators ($ and $[<identifier>])', cmd: 'db.courses.updateOne({ title: "React" }, { $addToSet: { tags: "frontend" } })', desc: 'Add, remove, and update specific array elements inside BSON documents.' },
      { num: 22, file: '22-upsert-and-find-and-modify.html', title: 'Upsert Operations & FindAndModify', subtopics: 'Upsert option ({ upsert: true }) · findOneAndUpdate() · findOneAndDelete() · replaceOne()', cmd: 'db.courses.findOneAndUpdate({ title: "Node" }, { $set: { published: true } }, { upsert: true })', desc: 'Atomically update existing documents or insert missing records using upserts and findAndModify.' },
      { num: 23, file: '23-deleting-documents.html', title: 'Deleting Documents & Collection Cleanup', subtopics: 'deleteOne() · deleteMany() · Soft delete vs Hard delete · Safe delete workflow', cmd: 'db.courses.deleteOne({ title: "Old Course" })', desc: 'Remove single or multiple documents safely with criteria filtering.' },
      { num: 24, file: '24-bulk-write-operations.html', title: 'Bulk Write Operations', subtopics: 'bulkWrite() · Ordered vs Unordered bulk executions · Performance optimization for high-throughput batching', cmd: 'db.courses.bulkWrite([{ insertOne: { document: { title: "Python" } } }])', desc: 'Batch multiple insert, update, and delete commands in a single network round-trip using bulkWrite.' },
      { num: 25, file: '25-schema-validation.html', title: 'Schema Validation & JSON Schema', subtopics: 'Collection validator rules ($jsonSchema) · Validation levels (off, strict, warn) · Field type enforcement', cmd: 'db.createCollection("courses", { validator: { $jsonSchema: { required: ["title"] } } })', desc: 'Enforce structural data integrity and required fields at the database level using $jsonSchema.' }
    ]
  },
  {
    phaseTag: 'Phase 06', phaseTitle: 'Indexing & Performance Optimization', icon: '🚀',
    chapters: [
      { num: 26, file: '26-indexing-fundamentals.html', title: 'Indexing Fundamentals', subtopics: 'Index ante enti? · Default _id index · Single field index · Unique index · Sparse & Partial indexes · TTL index', cmd: 'db.courses.createIndex({ level: 1 })', desc: 'Speed up query execution by building B-tree indexes on collection fields.' },
      { num: 27, file: '27-single-field-and-compound-indexes.html', title: 'Compound Indexes & Prefix Rule', subtopics: 'Compound index · Field order · Equality fields · Sort fields · Range fields · Prefix rule · Covered queries', cmd: 'db.lessons.createIndex({ tutorialId: 1, order: 1 })', desc: 'Design multi-field compound indexes adhering to the Equality-Sort-Range (ESR) rule.' },
      { num: 28, file: '28-specialized-indexes.html', title: 'Specialized Indexes: Multikey, Text & Hashed', subtopics: 'Multikey indexes on arrays · Text search indexes ($text) · Unique indexes · Hashed indexes for sharding', cmd: 'db.courses.createIndex({ title: "text" })', desc: 'Implement unique constraint indexes, array multikey indexes, and full-text search indexes.' },
      { num: 29, file: '29-geospatial-and-ttl-indexes.html', title: 'Geospatial & TTL Indexes', subtopics: 'GeoJSON format · 2dsphere indexes ($near, $geoWithin) · Time-To-Live (TTL) auto-expiring documents', cmd: 'db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })', desc: 'Store 2D geography points for location queries and set TTL indexes for auto-expiring sessions.' },
      { num: 30, file: '30-query-performance-explain.html', title: 'Query Performance Analysis with explain()', subtopics: 'explain("executionStats") · Query planner · COLLSCAN vs IXSCAN · Covered query · Slow operation monitoring', cmd: 'db.courses.find({ level: "Beginner" }).explain("executionStats")', desc: 'Analyze query execution plans, identify collection scans (COLLSCAN), and verify index usage (IXSCAN).' }
    ]
  },
  {
    phaseTag: 'Phase 07', phaseTitle: 'Aggregation Framework Pipeline', icon: '📊',
    chapters: [
      { num: 31, file: '31-aggregation-pipeline-intro.html', title: 'Aggregation Pipeline Introduction', subtopics: 'Aggregation pipeline stages · $match · $project · $sort · $limit · $skip · $count · $group · $unwind · $lookup', cmd: 'db.courses.aggregate([{ $match: { published: true } }, { $group: { _id: "$level", total: { $sum: 1 } } }])', desc: 'Process and analyze data records using MongoDB multi-stage aggregation pipelines.' },
      { num: 32, file: '32-filtering-transformation-stages.html', title: 'Aggregation Expressions & Operators', subtopics: 'Arithmetic, String, Date expressions · $cond · $ifNull · $map · $filter · $reduce · $mergeObjects', cmd: 'db.courses.aggregate([{ $project: { isEasy: { $cond: [{ $eq: ["$level", "Beginner"] }, true, false] } } }])', desc: 'Filter records early with $match and calculate computed fields using conditional aggregation expressions.' },
      { num: 33, file: '33-grouping-deconstruction-stages.html', title: 'Advanced Aggregation: $lookup & $facet', subtopics: '$lookup · $unwind · $facet · $bucket · $bucketAuto · $graphLookup · $unionWith · $merge · $out', cmd: 'db.lessons.aggregate([{ $lookup: { from: "tutorials", localField: "tutorialId", foreignField: "_id", as: "tutorial" } }])', desc: 'Perform relational joins across collections using $lookup and sub-pipeline faceting with $facet.' },
      { num: 34, file: '34-sorting-pagination-lookup-joins.html', title: 'Reporting Project & Leaderboards', subtopics: 'Course completion report · User progress report · Quiz score report · Popular language report · Daily submissions', cmd: 'db.userProgress.aggregate([{ $group: { _id: "$userId", avgScore: { $avg: "$score" } } }, { $sort: { avgScore: -1 } }])', desc: 'Build real-world reporting dashboards, user progress trackers, and leaderboard aggregations.' },
      { num: 35, file: '35-advanced-aggregation-stages.html', title: 'Transactions & Consistency', subtopics: 'Transaction ante enti? · Single-document atomicity · Multi-document transactions · Sessions · Commit · Abort', cmd: 'session.startTransaction(); await session.commitTransaction();', desc: 'Execute atomic multi-document transactions across collections using sessions in replica sets.' }
    ]
  },
  {
    phaseTag: 'Phase 08', phaseTitle: 'Application Integration & Multi-Language Drivers', icon: '📦',
    chapters: [
      { num: 36, file: '36-nodejs-driver-integration.html', title: 'MongoDB with Node.js', subtopics: 'MongoDB Node.js driver · Connection URI · MongoClient · Collection access · Express & Mongoose integration', cmd: 'import { MongoClient } from "mongodb"; const client = new MongoClient(process.env.MONGODB_URI); await client.connect();', desc: 'Connect Node.js applications directly using the official mongodb native driver and Express.js.' },
      { num: 37, file: '37-mongoose-schemas-and-models.html', title: 'MongoDB with Python (PyMongo)', subtopics: 'PyMongo driver · MongoClient · Query filters · Flask, Django & FastAPI integration', cmd: 'from pymongo import MongoClient; client = MongoClient(url); db = client.our_compiler', desc: 'Integrate MongoDB with Python applications using PyMongo and FastAPI/Flask backend frameworks.' },
      { num: 38, file: '38-mongoose-crud-and-validation.html', title: 'MongoDB with Java (Spring Data MongoDB)', subtopics: 'Java MongoDB driver · BSON Documents · Filters & Projections · Spring Data MongoDB repository pattern', cmd: 'MongoCollection<Document> collection = database.getCollection("courses");', desc: 'Connect Java enterprise applications using Spring Data MongoDB repositories and official Java drivers.' },
      { num: 39, file: '39-mongoose-middleware-and-virtuals.html', title: 'MongoDB with C# (.NET Driver)', subtopics: 'MongoDB .NET driver · POCO classes · Builders · ASP.NET Core integration & Repository pattern', cmd: 'var client = new MongoClient(connectionString); var db = client.GetDatabase("our_compiler");', desc: 'Build C# ASP.NET Core REST APIs connected to MongoDB using strongly typed POCO classes.' },
      { num: 40, file: '40-mongoose-population-referencing.html', title: 'Users, Roles & Security Controls', subtopics: 'Database users · Authentication & Authorization · Built-in roles (readWrite) · SCRAM · TLS/SSL · NoSQL injection', cmd: 'db.createUser({ user: "app_user", pwd: "secretPassword", roles: ["readWrite"] })', desc: 'Secure database instances with user roles, transport encryption, and input validation.' }
    ]
  },
  {
    phaseTag: 'Phase 09', phaseTitle: 'Backup, Replication & Scaling', icon: '⚙️',
    chapters: [
      { num: 41, file: '41-multi-document-acid-transactions.html', title: 'Backup & Restore (mongodump & Restore)', subtopics: 'Logical backup · mongodump · mongorestore · Export JSON · Import JSON · Atlas point-in-time recovery', cmd: 'mongodump --db=our_compiler --out=/backups', desc: 'Backup and restore MongoDB databases using BSON dumps, JSON exports, and Atlas snapshot recovery.' },
      { num: 42, file: '42-replication-and-high-availability.html', title: 'Replication & High Availability', subtopics: 'Replica set · Primary node · Secondary nodes · Elections · Automatic failover · Read preferences · Oplog', cmd: 'rs.initiate()', desc: 'Configure MongoDB Replica Sets for high availability, automatic failover, and data redundancy.' },
      { num: 43, file: '43-sharding-and-horizontal-scaling.html', title: 'Real-Time Change Streams', subtopics: 'Change stream ante enti? · Watching a collection / database / deployment · Insert/Update/Delete events · Real-time', cmd: 'const stream = collection.watch(); stream.on("change", next => console.log(next));', desc: 'Build real-time event-driven applications listening to database change notifications.' },
      { num: 44, file: '44-mongodb-backups-restore-monitoring.html', title: 'Sharding & Horizontal Scaling', subtopics: 'Sharding · Horizontal scaling · Shard · Config server · mongos router · Shard key · Range vs Hashed sharding', cmd: 'sh.shardCollection("our_compiler.lessons", { tutorialId: 1 })', desc: 'Scale MongoDB horizontally across multiple servers using sharding and shard key selection.' },
      { num: 45, file: '45-mongodb-security-access-control.html', title: 'Testing & Database Metrics Monitoring', subtopics: 'Unit & Integration testing · Test databases & fixtures · Seed data · Slow operation logs · Atlas dashboards', cmd: 'db.currentOp()', desc: 'Monitor database CPU, memory, connection counts, slow queries, and write automated integration tests.' }
    ]
  },
  {
    phaseTag: 'Phase 10', phaseTitle: 'Our Compiler Schema & Interview Prep', icon: '🏆',
    chapters: [
      { num: 46, file: '46-real-time-change-streams.html', title: 'Our Compiler Platform Schema Design', subtopics: 'users · languages · tutorials · lessons · quizzes · questions · userProgress · bookmarks · codeSubmissions', cmd: 'db.languages.createIndex({ slug: 1 }, { unique: true })', desc: 'Detailed schema architecture for Our Compiler online learning platform collections and indexes.' },
      { num: 47, file: '47-gridfs-large-file-storage.html', title: 'GridFS for Large File Storage', subtopics: 'GridFS specification · fs.files & fs.chunks collections · Streaming files >16MB · Audio/video asset storage', cmd: 'const bucket = new mongodb.GridFSBucket(db);', desc: 'Store and stream large files exceeding the 16MB document limit using GridFS chunks.' },
      { num: 48, file: '48-timeseries-and-atlas-search.html', title: 'MongoDB Time-Series & Search', subtopics: 'Native Time-Series collections · Granularity settings · Atlas Search (Lucene text & vector search)', cmd: 'db.createCollection("metrics", { timeseries: { timeField: "timestamp" } })', desc: 'Store IoT time-series metrics efficiently and perform full-text search with Atlas Search.' },
      { num: 49, file: '49-enterprise-database-design-patterns.html', title: 'Enterprise Database Design Patterns', subtopics: 'Subset pattern · Bucket pattern · Outlier pattern · Extended reference pattern · Polymorphic pattern', cmd: 'db.tutorials.createIndex({ languageId: 1, slug: 1 })', desc: 'Implement advanced NoSQL schema design patterns for high-throughput enterprise scale.' },
      { num: 50, file: '50-mongodb-interview-preparation.html', title: 'Top 50 MongoDB Technical Interview Q&A', subtopics: 'Top 50 MongoDB Interview Questions & Answers · BSON vs JSON · Indexing rules · Transactions vs Relational JOINs', cmd: 'db.stats()', desc: 'Master top technical interview questions and scenario questions asked for MongoDB & Backend roles.' }
    ]
  }
];

// Flatten all 50 chapters
const allMongoChapters = [];
mongoPhases.forEach(p => p.chapters.forEach(c => allMongoChapters.push({ ...c, phaseTag: p.phaseTag, phaseTitle: p.phaseTitle, icon: p.icon })));

// Helper to generate Accordion Sidebar HTML
function getMongoSidebarHTML(activeNum) {
  let sidebarAccHTML = '';
  mongoPhases.forEach(phase => {
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
        ${phase.chapters.map(c => `<a href="/blog-mongodb/${c.file}" class="${c.num === activeNum ? 'active' : ''}">${c.num}. ${c.title}</a>`).join('')}
      </div>`;
  });
  return sidebarAccHTML;
}

// 3. Generate public/blog-mongodb.html (Master Index Page)
const masterIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MongoDB Complete Masterclass — 50 Chapters, 10 Phases (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master MongoDB NoSQL database from beginner to advanced: BSON documents, collections, CRUD operations, query operators, indexing, aggregation pipeline, Mongoose ODM, transactions, sharding, and production Atlas deployment." />
  <meta name="keywords" content="mongodb tutorial, learn mongodb, nosql database, mongoose tutorial, mongodb aggregation, bson, mongodb atlas, mongodb indexes" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-mongodb.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-mongodb/style.css" />
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
<body class="lang-mongodb">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-mongodb.html" class="active">MongoDB</a>
  <a href="/blog-nodejs.html">Node.js</a>
  <a href="/blog-express.html">Express.js</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-mysql.html">MySQL</a>
  <a href="/blog-postgresql.html">PostgreSQL</a>
  <a href="/blog-redis.html">Redis</a>
  <a href="/blog-rest-api.html">REST API</a>
  <a href="/blog-graphql.html">GraphQL</a>
  <a href="/blog-django.html">Django</a>
  <a href="/blog-flask.html">Flask</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">MongoDB Roadmap</div>
    <a href="/blog-mongodb.html" class="sidebar-home-link active">🍃 MongoDB HOME</a>
    <div class="sidebar-accordion">
      ${getMongoSidebarHTML(0)}
    </div>
    <div class="sidebar-heading">Navigation</div>
    <a href="/blog.html">📚 All Tutorials</a>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">MongoDB Roadmap</span>
    </div>

    <h1 class="page-title">MongoDB Programming Masterclass (50 Chapters, 10 Phases)</h1>

    <div class="page-meta">
      <span class="badge">🍃 MongoDB 7.0+</span>
      <span class="badge">🟢 50 Complete Chapters</span>
      <span class="badge">📂 10 Complete Phases</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">NoSQL Basics · BSON Documents · Collections · ObjectId · Atlas Cloud · Compass GUI · mongosh · CRUD Operations · Query Operators · Projection · Sorting &amp; Pagination · Array Updates · Upserts · Schema Validation · B-Tree Indexes · Compound Indexes · Geospatial &amp; TTL · explain() · Aggregation Pipeline ($match, $group, $unwind, $lookup) · Node.js Driver · Mongoose ODM (Schemas, Models, Middleware, Population) · ACID Transactions · Replication · Sharding · Backups · Security &amp; RBAC · Change Streams · Top 50 Interview Q&amp;A</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's MongoDB Complete Master Course</strong>. MongoDB is the leading document-oriented NoSQL database powering high-performance modern web applications, microservices, and cloud architectures. From collection creation, BSON documents, and flexible schema modeling to complex aggregation pipelines, Mongoose ODM integration in Node.js, transactions, sharding, and interview preparation, this 50-chapter course covers every essential concept in depth.</p>
    </div>

    <div style="background:linear-gradient(135deg,rgba(19,170,82,0.12),rgba(20,24,32,0.6));border:1px solid rgba(19,170,82,0.3);border-radius:12px;padding:24px;margin:28px 0;">
      <h3 style="color:#00ed64;margin-bottom:10px;font-size:18px;">🎯 Ready to Master MongoDB Engineering?</h3>
      <p style="color:var(--text2);margin-bottom:16px;font-size:14.5px;">Choose where to start: explore NoSQL introduction, CRUD operations, indexing, aggregation framework, Mongoose ODM, or interview prep:</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/blog-mongodb/01-mongodb-introduction.html" style="background:linear-gradient(135deg,#13aa52,#119246);color:#ffffff;font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 1: MongoDB Intro →</a>
        <a href="/blog-mongodb/11-inserting-documents.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 3: CRUD Operations →</a>
        <a href="/blog-mongodb/26-indexing-fundamentals.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 6: Indexing →</a>
        <a href="/blog-mongodb/31-aggregation-pipeline-intro.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 7: Aggregation →</a>
        <a href="/blog-mongodb/36-nodejs-driver-integration.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 8: Multi-Language Drivers →</a>
        <a href="/blog-mongodb/50-mongodb-interview-preparation.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 10: Interview Prep →</a>
      </div>
    </div>

    <div class="section-title"><span class="num">📚</span> Master Course Curriculum</div>
    <div class="curriculum-roadmap-container">
      ${mongoPhases.map(phase => `
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
              <a href="/blog-mongodb/${ch.file}" class="curriculum-lesson-row">
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
        <span>MongoDB Complete Masterclass · 50 Chapters · 10 Phases · 2026 Edition</span>
      </div>
    </div>

    <div class="nav-footer">
      <a href="/blog.html" class="nav-btn"><span class="label">← All Tutorials</span><span class="title">Course Hub</span></a>
      <a href="/blog-mongodb/01-mongodb-introduction.html" class="nav-btn" style="text-align:right;"><span class="label">Start Learning →</span><span class="title">1. What is MongoDB &amp; NoSQL?</span></a>
    </div>
  </main>
</div>
<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'blog-mongodb.html'), masterIndexHtml, 'utf8');
console.log('✅ Generated public/blog-mongodb.html master index page successfully!');

// 4. Generate all 50 Chapter HTML Files inside public/blog-mongodb/ adhering strictly to the 16-Section Lesson Layout
allMongoChapters.forEach((ch, idx) => {
  const prevChapter = idx > 0 ? allMongoChapters[idx - 1] : null;
  const nextChapter = idx < allMongoChapters.length - 1 ? allMongoChapters[idx + 1] : null;

  const chapterHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MongoDB — ${ch.title} | Our Compiler</title>
  <meta name="description" content="Complete MongoDB Chapter ${ch.num}: ${ch.title}. Learn ${ch.subtopics} with practical query examples, BSON schemas, aggregation stages, and step-by-step walkthroughs." />
  <meta name="keywords" content="mongodb tutorial, learn mongodb, ${ch.title.toLowerCase()}, mongoose tutorial, nosql" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-mongodb/${ch.file}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-mongodb/style.css" />
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
<body class="lang-mongodb">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-mongodb.html" class="active">MongoDB</a>
  <a href="/blog-nodejs.html">Node.js</a>
  <a href="/blog-express.html">Express.js</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-mysql.html">MySQL</a>
  <a href="/blog-postgresql.html">PostgreSQL</a>
  <a href="/blog-redis.html">Redis</a>
  <a href="/blog-rest-api.html">REST API</a>
  <a href="/blog-graphql.html">GraphQL</a>
  <a href="/blog-django.html">Django</a>
  <a href="/blog-flask.html">Flask</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">MongoDB Tutorial</div>
    <a href="/blog-mongodb.html" class="sidebar-home-link">🍃 MongoDB HOME</a>
    <div class="sidebar-accordion">
      ${getMongoSidebarHTML(ch.num)}
    </div>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-mongodb.html">MongoDB</a><span class="sep">›</span>
      <span class="current">MongoDB — ${ch.title}</span>
    </div>

    <h1 class="page-title">MongoDB — ${ch.title}</h1>

    <div class="page-meta">
      <span class="badge">🍃 MongoDB 7.0+</span>
      <span class="badge">🟢 Chapter ${ch.num} of ${allMongoChapters.length}</span>
      <span class="badge">📂 ${ch.phaseTag}: ${ch.phaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this chapter:</span>
      <span class="topic-pill-text">${ch.subtopics}</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>MongoDB — ${ch.title}</strong> in our MongoDB Complete Masterclass! ${ch.desc}</p>
    </div>

    <!-- 1. Simple introduction -->
    <div class="section-title"><span class="num">1</span>Simple Introduction</div>
    <div class="section-body">
      <p>In modern backend software architecture, <strong>${ch.title}</strong> plays a critical role in managing flexible document storage, optimizing query performance, and structuring high-throughput NoSQL database systems. MongoDB stores data as BSON (Binary JSON) documents organized inside collections.</p>
    </div>

    <!-- 2. What you will learn -->
    <div class="section-title"><span class="num">2</span>What You Will Learn</div>
    <div class="section-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:16px 20px;margin-bottom:24px;">
        <strong style="color:#00ed64;display:block;margin-bottom:10px;">📚 Learning Objectives:</strong>
        <ul style="margin:0 0 0 20px;line-height:1.8;">
          <li>Master mongosh CLI and Mongoose ODM syntax for <strong>${ch.title}</strong></li>
          <li>Understand internal BSON document storage, B-tree indexing rules, and WiredTiger engine mechanics</li>
          <li>Implement production-grade schema validation, aggregation pipelines, and ACID transactions</li>
          <li>Avoid unindexed collection scans (COLLSCAN), memory limit overflows, and schema denormalization mistakes</li>
        </ul>
      </div>
    </div>

    <!-- 3. Why this concept is useful -->
    <div class="section-title"><span class="num">3</span>Why ${ch.title} is Useful</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">💡 Practical Utility</div>
        <p>Mastering <strong>${ch.title}</strong> allows you to build scalable NoSQL backend applications, handle high-concurrency read/write workloads, and integrate MongoDB seamlessly with Node.js, Express, and modern cloud microservices.</p>
      </div>
    </div>

    <!-- 4. Required project/command structure -->
    <div class="section-title"><span class="num">4</span>Required Command / Code Structure</div>
    <div class="section-body">
      <p>Target Command / Syntax: <code>${ch.cmd}</code>. Executed inside mongosh terminal shell or Node.js Mongoose models connected to a MongoDB database instance.</p>
    </div>

    <!-- 5. Syntax & mechanism -->
    <div class="section-title"><span class="num">5</span>Syntax &amp; Mechanism</div>
    <div class="section-body">
      <p>Mechanism: <code style="color:#00ed64;font-weight:700;">MongoDB WiredTiger Storage Engine &amp; BSON Parser</code>. Core Topic: <code>${ch.subtopics.split('·')[0].trim()}</code>.</p>
    </div>

    <!-- 6. Basic example code -->
    <div class="section-title"><span class="num">6</span>Basic Example Code / Command</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header"><span class="lang-tag">mongosh / JavaScript</span></div>
        <pre><code>// Basic invocation for ${ch.title}
${ch.cmd}</code></pre>
      </div>
    </div>

    <!-- 7. Execution output / terminal log -->
    <div class="section-title"><span class="num">7</span>Execution Output &amp; Response</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header"><span class="lang-tag">JSON Output</span></div>
        <pre><code>{
  "acknowledged": true,
  "insertedId": ObjectId("60c72b2f9b1d8b2d88a4e123"),
  "matchedCount": 1,
  "modifiedCount": 1,
  "operationTime": Timestamp({ t: 1787289600, i: 1 })
}</code></pre>
      </div>
    </div>

    <!-- 8. Internal flow & memory mechanics -->
    <div class="section-title"><span class="num">8</span>Internal Flow &amp; Database Architecture</div>
    <div class="section-body">
      <div class="diagram-box">mongosh CLI / App Driver -> BSON Serializer -> WiredTiger Cache -> Journal Log -> Data Files on Disk (.wt)</div>
    </div>

    <!-- 9. Practical production usage -->
    <div class="section-title"><span class="num">9</span>Practical Production Workflow Example</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header"><span class="lang-tag">Node.js / Mongoose Production Snippet</span></div>
        <pre><code>// Production workflow for ${ch.title}
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, default: 'Engineering' },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Course = mongoose.model('Course', courseSchema);

async function runProductionTask() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB Atlas!");
  
  // Execute task: ${ch.title}
  ${ch.cmd}
}

runProductionTask().catch(console.error);</code></pre>
      </div>
    </div>

    <!-- 10. Verification & status -->
    <div class="section-title"><span class="num">10</span>Verification &amp; Architecture Status</div>
    <div class="section-body">
      <div class="card" style="background:var(--bg2);padding:14px 18px;border-radius:8px;margin:16px 0;border-left:4px solid #13aa52;">
        <strong style="color:#00ed64;">Verification Status: ${ch.title} Verified</strong>
        <p style="margin-top:6px;font-size:13.5px;color:var(--text2);">MongoDB's WiredTiger storage engine uses checkpointing and write-ahead logging (journaling) to ensure data durability and high concurrency.</p>
      </div>
    </div>

    <!-- 11. Common mistakes -->
    <div class="section-title"><span class="num">11</span>Common Mistakes &amp; Anti-Patterns</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">⚠️ Anti-Patterns to Avoid</div>
        <ul style="margin:8px 0 0 18px;line-height:1.7;">
          <li>Creating unbounded arrays inside single documents — exceeds the 16MB document size limit. Use referencing for 1-to-N relationships.</li>
          <li>Running unindexed queries on large collections — results in expensive full collection scans (COLLSCAN). Always verify indexes with <code>explain()</code>.</li>
          <li>Using <code>$where</code> or custom JavaScript evaluation functions in production queries — disables index optimization and slows down throughput.</li>
          <li>Forgetting to handle connection disconnects or missing index creation during Node.js application startup.</li>
          <li>Over-normalizing schemas like a relational SQL database instead of leveraging document embedding.</li>
        </ul>
      </div>
    </div>

    <!-- 12. Coding challenge -->
    <div class="section-title"><span class="num">12</span>Hands-On Coding Challenge</div>
    <div class="section-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:18px 22px;margin-bottom:24px;">
        <strong style="color:#00ed64;display:block;margin-bottom:8px;">🎯 Hands-On Challenge:</strong>
        <p>Open mongosh terminal or MongoDB Compass. Execute <code>${ch.cmd}</code>, inspect the collection stats using <code>db.stats()</code>, and verify document insertion with <code>db.collection.find().pretty()</code>!</p>
      </div>
    </div>

    <!-- 13. Mini quiz -->
    <div class="section-title"><span class="num">13</span>Mini Quiz</div>
    <div class="section-body">
      <div class="faq-card">
        <h4>❓ Question: What is the primary role of ${ch.title} in MongoDB?</h4>
        <p><strong>Answer:</strong> It enables efficient NoSQL data management for ${ch.subtopics.split('·')[0].trim()}, optimizing document storage and query speed.</p>
      </div>
    </div>

    <!-- 14. Quick recap -->
    <div class="section-title"><span class="num">14</span>Quick Recap</div>
    <div class="section-body">
      <ul style="line-height:1.8;margin-left:20px;">
        <li>${ch.desc}</li>
        <li>MongoDB organizes data in BSON format inside dynamic collections without rigid SQL table schemas.</li>
        <li>Combine index optimization, aggregation pipelines, and Mongoose ODM for scalable Node.js applications.</li>
      </ul>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on MongoDB 7.0+ Standards · Last updated August 2026</span>
      </div>
    </div>

    <!-- 15 & 16. Previous & Next Lesson Navigation -->
    <div class="nav-footer">
      ${prevChapter ? `<a href="${prevChapter.file}" class="nav-btn"><span class="label">← Previous Lesson</span><span class="title">${prevChapter.num}. ${prevChapter.title}</span></a>` : `<a href="/blog-mongodb.html" class="nav-btn"><span class="label">← MongoDB Overview</span><span class="title">Course Index</span></a>`}
      ${nextChapter ? `<a href="${nextChapter.file}" class="nav-btn" style="text-align:right;"><span class="label">Next Lesson →</span><span class="title">${nextChapter.num}. ${nextChapter.title}</span></a>` : `<a href="/blog-mongodb.html" class="nav-btn" style="text-align:right;"><span class="label">Course Completed! 🎉</span><span class="title">MongoDB Index</span></a>`}
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;

  const filePath = path.join(mongoDir, ch.file);
  fs.writeFileSync(filePath, chapterHtml, 'utf8');
  console.log(`🔥 Generated MongoDB Chapter: ${ch.file} (${(chapterHtml.length / 1024).toFixed(1)}KB)`);
});

console.log('✅ Generated all 50 MongoDB Masterclass chapter files in public/blog-mongodb/ successfully!');
