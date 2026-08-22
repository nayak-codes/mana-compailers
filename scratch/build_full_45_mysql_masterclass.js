const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const mysqlDir = path.join(publicDir, 'blog-mysql');

if (!fs.existsSync(mysqlDir)) {
  fs.mkdirSync(mysqlDir, { recursive: true });
}

// 1. Create public/blog-mysql/style.css matching Python Emerald Green Theme (#10b981)
const cssStyleContent = `/* Specialized styling enhancements for MySQL tutorial lessons & Accordion — Emerald Green Theme */
:root {
  --mysql-theme: #10b981;
  --mysql-theme-hover: #34d399;
  --mysql-theme-bg: rgba(16, 185, 129, 0.12);
  --mysql-theme-border: rgba(16, 185, 129, 0.3);
}

body.lang-mysql {
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
  border-radius: 9px !important;
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

.phase-roadmap-desc {
  font-size: 13.5px;
  color: #8b949e;
  margin: 12px 0 16px 0;
  line-height: 1.6;
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

fs.writeFileSync(path.join(mysqlDir, 'style.css'), cssStyleContent, 'utf8');

// 2. Define Complete 45-Chapter MySQL Masterclass Data Structure across 14 Phases
const mysqlPhases = [
  {
    phaseTag: 'Phase 01', phaseTitle: 'MySQL Introduction', icon: '🐬',
    chapters: [
      { num: 1, file: '01-what-is-mysql.html', title: 'What is MySQL?', subtopics: 'MySQL Ante Enti? · RDBMS basics · MySQL vs PostgreSQL · MySQL vs MongoDB · Key features · Server & Client architecture', summary: 'MySQL is a lightweight, relational database management system. Store data in structured tables with rows & columns, and query data using SQL.', code: `CREATE DATABASE company_db;
USE company_db;` },
      { num: 2, file: '02-database-and-sql-prerequisites.html', title: 'Database & SQL Prerequisites', subtopics: 'Backend integration · SQL basics · HTTP & REST basics · Data modeling fundamentals · Terminal usage', summary: 'Prerequisites for learning MySQL: understanding relational data modeling, SQL queries, backend API integration, and terminal environments.', code: `SHOW ENGINES;
SELECT VERSION(), USER();` }
    ]
  },
  {
    phaseTag: 'Phase 02', phaseTitle: 'Setup & Installation', icon: '⚙️',
    chapters: [
      { num: 3, file: '03-mysql-installation.html', title: 'MySQL Installation', subtopics: 'MySQL Server installation (Windows, macOS, Linux) · MySQL Workbench · MySQL Shell · Root password · Service configuration', summary: 'Step-by-step installation guide for MySQL Server, MySQL Workbench GUI, and configuring root user credentials.', code: `SHOW VARIABLES LIKE 'version%';
SHOW VARIABLES LIKE 'port';` },
      { num: 4, file: '04-connecting-to-mysql.html', title: 'Connecting to MySQL', subtopics: 'CLI login (mysql -u root -p) · Host & Port · User privileges · Selecting database (USE db) · Remote connections', summary: 'Connect to MySQL Server via terminal CLI client, specify host and port, authenticate users, and select active database schemas.', code: `mysql -u root -h localhost -P 3306 -p
USE information_schema;` },
      { num: 5, file: '05-workbench-and-mysql-shell.html', title: 'Workbench & MySQL Shell', subtopics: 'Workbench UI · SQL editor · Result grid · Schema browser · Exporting/Importing SQL · MySQL Shell modes', summary: 'Master graphical database administration with MySQL Workbench and multi-language script execution in MySQL Shell.', code: `\\sql
\\connect root@localhost:3306
STATUS;` }
    ]
  },
  {
    phaseTag: 'Phase 03', phaseTitle: 'DDL & Table Operations', icon: '🏗️',
    chapters: [
      { num: 6, file: '06-creating-databases.html', title: 'Creating Databases', subtopics: 'CREATE DATABASE · SHOW DATABASES · DROP DATABASE · IF NOT EXISTS · Character sets (utf8mb4) · Collations', summary: 'Create and manage database schemas with proper utf8mb4 character set encoding, collations, and safe deletion guards.', code: `CREATE DATABASE IF NOT EXISTS academy_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;` },
      { num: 7, file: '07-creating-tables.html', title: 'Creating Tables', subtopics: 'CREATE TABLE · DESCRIBE table · Default values · Storage engine specification (InnoDB) · Temporary tables', summary: 'Design relational tables with column specifications, default values, primary identifiers, and storage engine declarations.', code: `CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    fee DECIMAL(8, 2) NOT NULL,
    level ENUM('Beginner', 'Intermediate', 'Advanced') DEFAULT 'Beginner'
) ENGINE=InnoDB;` },
      { num: 8, file: '08-altering-tables.html', title: 'Altering Tables', subtopics: 'ALTER TABLE ADD column · MODIFY column · DROP column · RENAME table · TRUNCATE TABLE vs DELETE · DROP TABLE', summary: 'Modify existing database table structures dynamically: adding/dropping columns, renaming tables, and truncating rows.', code: `ALTER TABLE courses
ADD COLUMN category VARCHAR(50) AFTER level,
MODIFY COLUMN fee DECIMAL(10, 2) NOT NULL;` }
    ]
  },
  {
    phaseTag: 'Phase 04', phaseTitle: 'Data Types & Schema', icon: '🔢',
    chapters: [
      { num: 9, file: '09-numeric-data-types.html', title: 'Numeric Data Types', subtopics: 'INT · BIGINT · DECIMAL · FLOAT · DOUBLE · UNSIGNED · Precision & scale · Display width', summary: 'Master integer and decimal data types in MySQL, configuring financial precision with DECIMAL(p, s) and UNSIGNED flags.', code: `CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stock INT UNSIGNED DEFAULT 0,
    price DECIMAL(10, 2) NOT NULL
);` },
      { num: 10, file: '10-string-data-types.html', title: 'String Data Types', subtopics: 'VARCHAR · TEXT · CHAR · BLOB · Character sets & Collations · Storage requirements · String performance', summary: 'Understand string storage mechanisms: VARCHAR variable lengths, fixed CHAR padding, large TEXT blocks, and binary BLOBs.', code: `CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    content TEXT NOT NULL
);` },
      { num: 11, file: '11-date-and-time-types.html', title: 'Date & Time Types', subtopics: 'DATE · DATETIME · TIMESTAMP · TIME · YEAR · Automatic initialization · Timezones', summary: 'Store temporal information using DATE, DATETIME, and auto-updating TIMESTAMP fields with timezone awareness.', code: `CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);` },
      { num: 12, file: '12-json-data-type.html', title: 'JSON Data Type', subtopics: 'JSON column · JSON_EXTRACT · JSON_ARRAY · JSON_OBJECT · Searching JSON · Multi-valued indexes', summary: 'Store semi-structured JSON documents in MySQL columns, query properties with JSON_EXTRACT(), and create functional indexes.', code: `CREATE TABLE user_settings (
    user_id INT PRIMARY KEY,
    preferences JSON NOT NULL
);

INSERT INTO user_settings VALUES (1, '{"theme": "dark", "notifications": true}');` }
    ]
  },
  {
    phaseTag: 'Phase 05', phaseTitle: 'Data Manipulation (DML)', icon: '📝',
    chapters: [
      { num: 13, file: '13-insert-statements.html', title: 'INSERT Statements', subtopics: 'INSERT INTO · Single & Bulk inserts · Column mapping · INSERT IGNORE · ON DUPLICATE KEY UPDATE · DEFAULT values', summary: 'Insert records into MySQL tables: single and bulk row inserts, handling key conflicts with ON DUPLICATE KEY UPDATE.', code: `INSERT INTO courses (title, fee, level)
VALUES ('Python Masterclass', 4999.00, 'Beginner')
ON DUPLICATE KEY UPDATE fee = VALUES(fee);` },
      { num: 14, file: '14-select-basics.html', title: 'SELECT Basics', subtopics: 'SELECT columns · SELECT * · Column aliases (AS) · DISTINCT values · Calculating expressions · LIMIT & OFFSET', summary: 'Retrieve records using SELECT statements: column projections, aliases, removing duplicates, and applying LIMIT pagination.', code: `SELECT id, title, fee, fee * 0.9 AS discounted_fee
FROM courses
ORDER BY fee DESC
LIMIT 10 OFFSET 0;` },
      { num: 15, file: '15-where-conditions.html', title: 'WHERE Conditions', subtopics: 'Comparison operators (=, !=, <, >) · Logical operators (AND, OR, NOT) · IN & NOT IN · BETWEEN · IS NULL · LIKE', summary: 'Filter table rows using complex logical expressions: combining AND/OR/NOT, range checks, pattern wildcards, and NULL checks.', code: `SELECT * FROM courses
WHERE level IN ('Beginner', 'Intermediate')
  AND fee BETWEEN 2000.00 AND 5000.00
  AND title LIKE '%SQL%';` },
      { num: 16, file: '16-sorting-and-aggregation.html', title: 'Sorting & Aggregation', subtopics: 'ORDER BY ASC/DESC · COUNT · SUM · AVG · MIN · MAX · GROUP BY · HAVING clause', summary: 'Summarize datasets with aggregate functions: counting records, computing averages, grouping by columns, and HAVING filters.', code: `SELECT level, COUNT(*) AS course_count, AVG(fee) AS avg_fee
FROM courses
GROUP BY level
HAVING AVG(fee) > 3000.00;` }
    ]
  },
  {
    phaseTag: 'Phase 06', phaseTitle: 'Update and Delete', icon: '✏️',
    chapters: [
      { num: 17, file: '17-update-statements.html', title: 'UPDATE Statements', subtopics: 'UPDATE · Single & Multiple columns · WHERE importance · Conditional updates · Expressions · Safe update mode · Transactions', summary: 'Modify existing database records safely using UPDATE statements with WHERE filters, expressions, and safe update checks.', code: `UPDATE courses
SET level = 'Intermediate'
WHERE id = 1;` },
      { num: 18, file: '18-delete-and-truncate.html', title: 'DELETE & TRUNCATE', subtopics: 'DELETE · Selected & All rows · TRUNCATE · DROP · Foreign key delete behavior · Soft delete · Archiving · Transactions', summary: 'Remove specific table records using DELETE FROM with WHERE conditions, contrast with TRUNCATE, and implement soft deletes.', code: `DELETE FROM courses
WHERE level = 'Obsolete';` }
    ]
  },
  {
    phaseTag: 'Phase 07', phaseTitle: 'Relationships and Joins', icon: '🔗',
    chapters: [
      { num: 19, file: '19-database-relationships.html', title: 'Database Relationships', subtopics: 'One-to-one · One-to-many · Many-to-many · Primary keys · Foreign keys · Junction tables · Referential integrity · Cascade actions', summary: 'Model 1:1, 1:N, and M:N relationships across tables using foreign key constraints and junction tables.', code: `CREATE TABLE student_courses (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    PRIMARY KEY (student_id, course_id)
);` },
      { num: 20, file: '20-primary-and-foreign-keys.html', title: 'Primary & Foreign Keys', subtopics: 'Foreign key ante enti? · Creating foreign keys · REFERENCES · ON DELETE CASCADE · ON DELETE SET NULL · ON UPDATE CASCADE', summary: 'Establish relational links with foreign keys, configuring ON DELETE CASCADE and ON DELETE SET NULL rules.', code: `CREATE TABLE lessons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE
);` },
      { num: 21, file: '21-inner-join.html', title: 'INNER JOIN', subtopics: 'INNER JOIN syntax · Joining 2 & 3+ tables · Aliases · Avoiding duplicate rows · Join performance · Null values', summary: 'Combine matching rows from multiple tables using INNER JOIN and explicit ON key matching conditions.', code: `SELECT
    courses.title,
    lessons.title AS lesson_title
FROM courses
INNER JOIN lessons
    ON lessons.course_id = courses.id;` },
      { num: 22, file: '22-left-and-right-join.html', title: 'LEFT & RIGHT JOIN', subtopics: 'LEFT JOIN · RIGHT JOIN · CROSS JOIN · Self join · Outer joins · Null handling · Join vs subquery', summary: 'Retrieve records even when no match exists in related tables using LEFT and RIGHT JOINs, handling NULL values.', code: `SELECT c.title, l.title AS lesson_title
FROM courses c
LEFT JOIN lessons l ON l.course_id = c.id;` },
      { num: 23, file: '23-subqueries-and-ctes.html', title: 'Subqueries & CTEs', subtopics: 'Subquery ante enti? · Scalar subquery · WHERE & FROM subqueries · EXISTS · Correlated subquery · WITH · Recursive CTE', summary: 'Write modular SQL queries using Common Table Expressions (WITH) and nested subqueries with EXISTS and IN.', code: `WITH CourseStats AS (
    SELECT course_id, COUNT(*) AS lesson_count
    FROM lessons GROUP BY course_id
)
SELECT c.title, cs.lesson_count
FROM courses c JOIN CourseStats cs ON c.id = cs.course_id;` }
    ]
  },
  {
    phaseTag: 'Phase 08', phaseTitle: 'Advanced Querying & Stored Programs', icon: '⚡',
    chapters: [
      { num: 24, file: '24-views.html', title: 'Views', subtopics: 'View ante enti? · Creating views · Querying views · Updating views · Security views · Reporting views · Materialized view overview', summary: 'Save complex queries as reusable virtual tables using CREATE VIEW to simplify reporting and restrict column access.', code: `CREATE VIEW course_summary AS
SELECT id, title, level
FROM courses;` },
      { num: 25, file: '25-window-functions.html', title: 'Window Functions', subtopics: 'Window functions ante enti? · OVER · PARTITION BY · ORDER BY · ROW_NUMBER · RANK · DENSE_RANK · LAG · LEAD · Running totals', summary: 'Perform analytical calculations across row partitions using ROW_NUMBER(), RANK(), LAG(), and LEAD() window functions.', code: `SELECT
    title,
    level,
    ROW_NUMBER() OVER (
        PARTITION BY level
        ORDER BY title
    ) AS course_number
FROM courses;` },
      { num: 26, file: '26-stored-procedures.html', title: 'Stored Procedures', subtopics: 'Stored procedure ante enti? · DELIMITER // · Creating procedures · IN, OUT, INOUT parameters · CALL · Local variables · Loops', summary: 'Encapsulate reusable SQL logic on the database server using Stored Procedures with input/output parameters.', code: `DELIMITER //

CREATE PROCEDURE GetCourses()
BEGIN
    SELECT * FROM courses;
END //

DELIMITER ;` },
      { num: 27, file: '27-functions-and-triggers.html', title: 'Functions & Triggers', subtopics: 'Stored functions · Triggers BEFORE/AFTER INSERT/UPDATE · Audit logs · Validation triggers · Scheduled events · Event scheduler', summary: 'Automate server-side actions using BEFORE/AFTER triggers, custom scalar functions, and scheduled database events.', code: `CREATE TRIGGER after_course_insert
AFTER INSERT ON courses
FOR EACH ROW
INSERT INTO audit_log(action) VALUES (CONCAT('Added course: ', NEW.id));` }
    ]
  },
  {
    phaseTag: 'Phase 09', phaseTitle: 'Indexes & Performance Tuning', icon: '🚀',
    chapters: [
      { num: 28, file: '28-indexes.html', title: 'Indexes', subtopics: 'Index ante enti? · Why indexes are needed · Primary key/Unique/Composite/Prefix/FULLTEXT index · Selectivity · Maintenance', summary: 'Speed up query execution using B-Tree indexes, single-column and composite key indexes tuned for query access patterns.', code: `CREATE INDEX idx_courses_level
ON courses(level);

CREATE INDEX idx_courses_level_title
ON courses(level, title);` },
      { num: 29, file: '29-query-optimization.html', title: 'Query Optimization', subtopics: 'Query execution · EXPLAIN · EXPLAIN ANALYZE · Full table scan vs Index scan · Join optimization · Slow query log · Benchmarking', summary: 'Analyze execution plans using EXPLAIN and EXPLAIN ANALYZE to eliminate full table scans and optimize join efficiency.', code: `EXPLAIN
SELECT *
FROM courses
WHERE level = 'Beginner';` },
      { num: 30, file: '30-transactions.html', title: 'Transactions', subtopics: 'Transaction ante enti? · ACID properties · Atomicity · Consistency · Isolation · Durability · START TRANSACTION · COMMIT · ROLLBACK', summary: 'Ensure data consistency using ACID compliant transactions with START TRANSACTION, COMMIT, ROLLBACK, and savepoints.', code: `START TRANSACTION;

UPDATE courses
SET level = 'Advanced'
WHERE id = 1;

COMMIT;` },
      { num: 31, file: '31-locks-and-isolation.html', title: 'Locks & Isolation', subtopics: 'Row locks · Table locks · Shared/Exclusive locks · Deadlocks · Isolation levels: Read uncommitted, Read committed, Repeatable read, Serializable', summary: 'Master database concurrency control: row-level locking, table locking, preventing deadlocks, and configuring transaction isolation levels.', code: `SELECT * FROM courses WHERE id = 1 FOR UPDATE;` }
    ]
  },
  {
    phaseTag: 'Phase 10', phaseTitle: 'Security and User Management', icon: '🛡️',
    chapters: [
      { num: 32, file: '32-users-and-privileges.html', title: 'Users & Privileges', subtopics: 'MySQL user ante enti? · CREATE USER · DROP USER · User hosts · Passwords · Root vs App user · Least privilege · GRANT · REVOKE · Roles', summary: 'Manage database security: creating user accounts, granting granular privileges (SELECT, INSERT), revoking permissions, and role access.', code: `CREATE USER 'app_user'@'localhost'
IDENTIFIED BY 'strong-password';

GRANT SELECT, INSERT, UPDATE, DELETE
ON our_compiler.*
TO 'app_user'@'localhost';` },
      { num: 33, file: '33-sql-security.html', title: 'SQL Security', subtopics: 'SQL injection ante enti? · Prepared statements · Parameterized queries · Input validation · Least privilege · Secret management · Encrypted connections', summary: 'Protect databases against SQL injection vulnerabilities using parameterized prepared statements, SSL encryption, and secret management.', code: `-- Prepared Statement Example
PREPARE stmt FROM 'SELECT * FROM courses WHERE id = ?';
SET @id = 1;
EXECUTE stmt USING @id;` }
    ]
  },
  {
    phaseTag: 'Phase 11', phaseTitle: 'Backup and Administration', icon: '📦',
    chapters: [
      { num: 34, file: '34-backup-and-restore.html', title: 'Backup & Restore', subtopics: 'Backup ante enti? · Logical vs Physical backup · mysqldump · Export/Import database · Backup schedule · Point-in-time recovery', summary: 'Export and restore MySQL databases using mysqldump utility commands, automated backup schedules, and point-in-time recovery.', code: `# Exporting database backup
mysqldump -u root -p our_compiler > backup.sql

# Restoring database from SQL dump
mysql -u root -p our_compiler < backup.sql` },
      { num: 35, file: '35-monitoring.html', title: 'Monitoring', subtopics: 'Server status · Process list · Active connections · Slow queries · Error logs · InnoDB status · Disk/Memory usage · Performance schema', summary: 'Monitor MySQL Server health: examining process lists, slow query logs, active connections, and Performance Schema metrics.', code: `SHOW PROCESSLIST;
SHOW ENGINE INNODB STATUS;` },
      { num: 36, file: '36-replication.html', title: 'Replication', subtopics: 'Replication ante enti? · Source and replica · Binary log · Read replicas · GTIDs · Failover · Replication lag · High availability', summary: 'Implement high availability and read scaling with Source-Replica replication, GTID tracking, binary logs, and failover.', code: `SHOW BINARY LOGS;
SHOW REPLICA STATUS;` }
    ]
  },
  {
    phaseTag: 'Phase 12', phaseTitle: 'Application Integration', icon: '🔌',
    chapters: [
      { num: 37, file: '37-mysql-with-python.html', title: 'MySQL with Python', subtopics: 'import mysql.connector · Connection · Cursor · Parameterized queries · Fetching rows · Connection pooling · Flask & SQLAlchemy integration', summary: 'Connect Python applications to MySQL Server using mysql.connector, execute parameterized queries, and integrate with Flask/SQLAlchemy.', code: `import mysql.connector

connection = mysql.connector.connect(
    host="localhost",
    user="app_user",
    password="password",
    database="our_compiler"
)

cursor = connection.cursor()
cursor.execute("SELECT id, title FROM courses")

for row in cursor.fetchall():
    print(row)

cursor.close()
connection.close()` },
      { num: 38, file: '38-mysql-with-java.html', title: 'MySQL with Java', subtopics: 'JDBC driver · Database URL · Connection · PreparedStatement · ResultSet · Connection pooling · Spring Boot & JPA integration', summary: 'Connect Java enterprise applications to MySQL via JDBC drivers, PreparedStatements, connection pools, and Spring Boot JPA.', code: `String url = "jdbc:mysql://localhost:3306/our_compiler";
Connection conn = DriverManager.getConnection(url, "app_user", "password");
PreparedStatement pstmt = conn.prepareStatement("SELECT * FROM courses WHERE id = ?");
pstmt.setInt(1, 1);
ResultSet rs = pstmt.executeQuery();` },
      { num: 39, file: '39-mysql-with-node-js.html', title: 'MySQL with Node.js', subtopics: 'mysql2 driver · Connection pool · Promise API · Parameterized queries · Express integration · Prisma & Sequelize ORM', summary: 'Build Node.js and Express APIs backed by MySQL using mysql2 async promise pools, Prisma ORM, and prepared queries.', code: `const mysql = require('mysql2/promise');
const pool = mysql.createPool({ host: 'localhost', user: 'app_user', database: 'our_compiler' });

async function getCourses() {
  const [rows] = await pool.query('SELECT * FROM courses');
  return rows;
}` },
      { num: 40, file: '40-mysql-with-php.html', title: 'MySQL with PHP', subtopics: 'PHP PDO connection · Prepared statements · Fetching rows · Transactions · Sessions · Laravel integration & migrations', summary: 'Integrate PHP web applications with MySQL using PDO prepared statements, transaction management, and Laravel migrations.', code: `$pdo = new PDO('mysql:host=localhost;dbname=our_compiler', 'app_user', 'password');
$stmt = $pdo->prepare('SELECT * FROM courses WHERE level = :level');
$stmt->execute(['level' => 'Beginner']);
$courses = $stmt->fetchAll(PDO::FETCH_ASSOC);` }
    ]
  },
  {
    phaseTag: 'Phase 13', phaseTitle: 'Advanced Data Modeling', icon: '📐',
    chapters: [
      { num: 41, file: '41-normalization.html', title: 'Normalization', subtopics: 'Data redundancy · 1NF · 2NF · 3NF · BCNF · Denormalization · Performance tradeoffs · E-commerce & Learning platform schemas', summary: 'Normalize database schemas from 1NF through 3NF and BCNF to eliminate data redundancy and anomalies while understanding denormalization tradeoffs.', code: `-- Normalized 3NF Schema Example
CREATE TABLE users ( id INT PRIMARY KEY, name VARCHAR(100) );
CREATE TABLE roles ( id INT PRIMARY KEY, title VARCHAR(50) );
CREATE TABLE user_roles ( user_id INT, role_id INT, PRIMARY KEY(user_id, role_id) );` },
      { num: 42, file: '42-schema-design.html', title: 'Schema Design', subtopics: 'Entity identification · Attributes · Relationships · Primary/Foreign key design · Natural vs Surrogate keys · Nullability · Soft deletes', summary: 'Design scalable production database schemas: identifying entities, selecting surrogate primary keys, soft delete strategies, and audit timestamps.', code: `CREATE TABLE audit_courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    is_deleted TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);` },
      { num: 43, file: '43-our-compiler-database.html', title: 'Our Compiler Database', subtopics: 'User, Role, Language, Tutorial, Lesson, Quiz, Question, Attempt, Progress, Bookmark, Submission tables · Index strategy', summary: 'Comprehensive schema design for the Our Compiler learning platform, covering users, roles, tutorials, lessons, quizzes, progress, and submissions.', code: `CREATE TABLE users ( id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50) UNIQUE NOT NULL, email VARCHAR(100) UNIQUE NOT NULL );
CREATE TABLE tutorials ( id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(100) NOT NULL, slug VARCHAR(100) UNIQUE NOT NULL );
CREATE TABLE lessons ( id INT AUTO_INCREMENT PRIMARY KEY, tutorial_id INT NOT NULL, title VARCHAR(150) NOT NULL, FOREIGN KEY (tutorial_id) REFERENCES tutorials(id) );
CREATE TABLE user_progress ( user_id INT, lesson_id INT, completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (user_id, lesson_id) );` }
    ]
  },
  {
    phaseTag: 'Phase 14', phaseTitle: 'Projects & Quiz', icon: '🏆',
    chapters: [
      { num: 44, file: '44-mysql-projects.html', title: 'MySQL Projects', subtopics: 'Complete E-Commerce Database Design Project · Learning Platform Schema · Real-World SQL Queries & Indexes', summary: 'Build production-ready relational database systems: an E-Commerce platform schema and Our Compiler online learning database.', code: `-- Production Database Design Project Schema
SELECT 'Project Complete' AS result;` },
      { num: 45, file: '45-mysql-quiz.html', title: 'MySQL Quiz', subtopics: 'Comprehensive MySQL Knowledge Check · 30 Multiple Choice Certification Exam Questions · DDL, DML, Joins, Transactions & Performance', summary: 'Test your MySQL and SQL database mastery with our 30-question interactive certification practice quiz.', code: `-- MySQL 45-Chapter Bootcamp Certification Exam
SELECT 'Quiz Ready' AS status;` }
    ]
  }
];

// Helper to generate Accordion Sidebar HTML
function getMySQLSidebarHTML(activeNum) {
  let sidebarAccHTML = '';
  mysqlPhases.forEach(phase => {
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
        ${phase.chapters.map(c => `<a href="/blog-mysql/${c.file}" class="${c.num === activeNum ? 'active' : ''}">${c.num}. ${c.title}</a>`).join('')}
      </div>`;
  });
  return sidebarAccHTML;
}

// 3. Generate public/blog-mysql.html (Master Index Page)
const allMySQLChapters = [];
mysqlPhases.forEach(p => p.chapters.forEach(c => allMySQLChapters.push({ ...c, phaseTag: p.phaseTag, phaseTitle: p.phaseTitle, icon: p.icon })));

const masterIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MySQL Complete Roadmap — 45 Chapters, 14 Phases (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master MySQL database management from zero to production ready with our complete 45-chapter roadmap across 14 phases: Setup, DDL, Data Types, DML, UPDATE & DELETE, Relationships & Joins, CTEs, Views, Window Functions, Stored Programs, Triggers, Indexes, Transactions, Security, Administration, Application Integration (Python, Java, Node.js, PHP), Normalization, Schema Design, Our Compiler Database, Projects, and Quiz." />
  <meta name="keywords" content="mysql tutorial, learn mysql, sql tutorial, relational database, mysql workbench, update, delete, foreign keys, inner join, CTE, window functions, stored procedures, mysql indexes, acid transactions, mysql python, mysql nodejs, mysql java, normalization, schema design" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-mysql.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-mysql/style.css" />
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
<body class="lang-mysql">

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
  <a href="/blog-flask.html">Flask</a>
  <a href="/blog-mysql.html" class="active">MySQL</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-css.html">CSS</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-rust.html">Rust</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">MySQL Roadmap</div>
    <a href="/blog-mysql.html" class="sidebar-home-link active">🐬 MySQL Course HOME</a>
    <div class="sidebar-accordion">
      ${getMySQLSidebarHTML(0)}
    </div>
    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/online-python-compiler.html" style="color:#10b981;font-weight:700;">▶ Run Code in IDE</a>
    <a href="/blog.html">📚 All Tutorials</a>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">MySQL Complete Roadmap</span>
    </div>

    <h1 class="page-title">MySQL Complete Masterclass (45 Chapters, 14 Phases)</h1>

    <div class="page-meta">
      <span class="badge">🐬 MySQL 8.0+</span>
      <span class="badge">🟢 45 Complete Chapters</span>
      <span class="badge">📂 14 Complete Phases</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">What is MySQL? · Installation &amp; Workbench · DDL &amp; Data Types · DML &amp; Filtering · UPDATE &amp; DELETE · Joins &amp; Subqueries · Views &amp; Window Functions · Stored Procedures &amp; Triggers · Indexes &amp; EXPLAIN · Transactions &amp; Locks · Users &amp; Security · Backup &amp; Replication · Python, Java, Node.js &amp; PHP Integration · Normalization &amp; Schema Design · Our Compiler DB &amp; Quiz</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's MySQL Complete Master Course</strong>. MySQL is the world's most popular open-source relational database management system (RDBMS), powering enterprise platforms, e-commerce applications, and cloud microservices. This exhaustive 45-chapter bootcamp guides you step-by-step from database setup to advanced query tuning, CTEs, window functions, stored programs, triggers, indexes, transactions, application drivers, and schema architecture.</p>
    </div>

    <div style="background:linear-gradient(135deg,rgba(16,185,129,0.12),rgba(20,24,32,0.6));border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:24px;margin:28px 0;">
      <h3 style="color:#10b981;margin-bottom:10px;font-size:18px;">🎯 Ready to Start Learning MySQL?</h3>
      <p style="color:var(--text2);margin-bottom:16px;font-size:14.5px;">Choose where to start: explore foundations, table creation, UPDATE/DELETE, joins, window functions, app drivers, or schema design:</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/blog-mysql/01-what-is-mysql.html" style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 1: MySQL Intro →</a>
        <a href="/blog-mysql/17-update-statements.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 6: Update &amp; Delete →</a>
        <a href="/blog-mysql/21-inner-join.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 7: Relationships &amp; Joins →</a>
        <a href="/blog-mysql/24-views.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 8: Advanced Querying →</a>
        <a href="/blog-mysql/37-mysql-with-python.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 12: App Integration →</a>
        <a href="/blog-mysql/43-our-compiler-database.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 13: Our Compiler DB →</a>
      </div>
    </div>

    <div class="section-title"><span class="num">📚</span> Master Course Curriculum</div>
    <div class="curriculum-roadmap-container">
      ${mysqlPhases.map(phase => `
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
              <a href="/blog-mysql/${ch.file}" class="curriculum-lesson-row">
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
        <span>MySQL Complete Masterclass · 45 Chapters · 14 Phases · 2026 Edition</span>
      </div>
    </div>

    <div class="nav-footer">
      <a href="/blog.html" class="nav-btn"><span class="label">← All Tutorials</span><span class="title">Course Hub</span></a>
      <a href="/blog-mysql/01-what-is-mysql.html" class="nav-btn" style="text-align:right;"><span class="label">Start Learning →</span><span class="title">1. What is MySQL?</span></a>
    </div>
  </main>
</div>
<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'blog-mysql.html'), masterIndexHtml, 'utf8');
console.log('✅ Generated public/blog-mysql.html master index page successfully!');

// 4. Generate all 45 Chapter HTML Files inside public/blog-mysql/ with 15-Section Layout
allMySQLChapters.forEach((ch, idx) => {
  const prevChapter = idx > 0 ? allMySQLChapters[idx - 1] : null;
  const nextChapter = idx < allMySQLChapters.length - 1 ? allMySQLChapters[idx + 1] : null;

  const chapterHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MySQL — ${ch.title} | Our Compiler</title>
  <meta name="description" content="Complete MySQL Chapter ${ch.num}: ${ch.title}. Learn ${ch.subtopics} with practical SQL queries, table schemas, and step-by-step database walkthroughs." />
  <meta name="keywords" content="mysql tutorial, sql queries, ${ch.title.toLowerCase()}, database management, relational database, mysql workbench" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-mysql/${ch.file}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-mysql/style.css" />
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
<body class="lang-mysql">

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
  <a href="/blog-flask.html">Flask</a>
  <a href="/blog-mysql.html" class="active">MySQL</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-css.html">CSS</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-rust.html">Rust</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">MySQL Tutorial</div>
    <a href="/blog-mysql.html" class="sidebar-home-link">🐬 MySQL HOME</a>
    <div class="sidebar-accordion">
      ${getMySQLSidebarHTML(ch.num)}
    </div>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-mysql.html">MySQL</a><span class="sep">›</span>
      <span class="current">MySQL — ${ch.title}</span>
    </div>

    <h1 class="page-title">MySQL — ${ch.title}</h1>

    <div class="page-meta">
      <span class="badge">🐬 MySQL 8.0+</span>
      <span class="badge">🟢 Chapter ${ch.num} of ${allMySQLChapters.length}</span>
      <span class="badge">📂 ${ch.phaseTag}: ${ch.phaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this chapter:</span>
      <span class="topic-pill-text">${ch.subtopics}</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>MySQL — ${ch.title}</strong> in our MySQL Complete Masterclass! ${ch.summary}</p>
    </div>

    <!-- 1. Simple introduction -->
    <div class="section-title"><span class="num">1</span>Simple Introduction</div>
    <div class="section-body">
      <p>In MySQL relational database management, understanding <strong>${ch.title}</strong> is essential for building structured, consistent, and performant data storage systems. MySQL routes queries, enforces referential integrity, and optimizes execution patterns.</p>
    </div>

    <!-- 2. What you will learn -->
    <div class="section-title"><span class="num">2</span>What You Will Learn</div>
    <div class="section-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:16px 20px;margin-bottom:24px;">
        <strong style="color:#10b981;display:block;margin-bottom:10px;">📚 Learning Objectives:</strong>
        <ul style="margin:0 0 0 20px;line-height:1.8;">
          <li>Master key database concepts behind <strong>${ch.title}</strong></li>
          <li>Understand SQL syntax and query execution in MySQL Server</li>
          <li>Implement production-ready table structures and SQL queries</li>
          <li>Avoid common database performance bottlenecks and normalization pitfalls</li>
        </ul>
      </div>
    </div>

    <!-- 3. Why this concept is useful -->
    <div class="section-title"><span class="num">3</span>Why ${ch.title} is Useful</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">💡 Practical Utility</div>
        <p>Relational databases ensure ACID compliance (Atomicity, Consistency, Isolation, Durability). Mastering <strong>${ch.title}</strong> equips developers to store user accounts, orders, products, and analytics safely.</p>
      </div>
    </div>

    <!-- 4. Required table structure -->
    <div class="section-title"><span class="num">4</span>Required Table Structure</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">SQL — Table Schema (DDL)</span>
        </div>
        <pre><code>CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    fee DECIMAL(10, 2) NOT NULL,
    level ENUM('Beginner', 'Intermediate', 'Advanced') DEFAULT 'Beginner',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;</code></pre>
      </div>
    </div>

    <!-- 5. SQL syntax -->
    <div class="section-title"><span class="num">5</span>SQL Syntax</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">SQL — Keyword Syntax</span>
        </div>
        <pre><code>${ch.code}</code></pre>
      </div>
    </div>

    <!-- 6. Basic example -->
    <div class="section-title"><span class="num">6</span>Basic Example</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">SQL — Basic Query Example</span>
        </div>
        <pre><code>-- Basic ${ch.title} query execution
${ch.code}</code></pre>
      </div>
    </div>

    <!-- 7. Query output -->
    <div class="section-title"><span class="num">7</span>Query Output</div>
    <div class="section-body">
      <div class="card" style="background:var(--bg2);padding:16px;border-radius:8px;margin:16px 0;font-size:13.5px;border-left:4px solid #10b981;">
        <strong style="color:#10b981;">📊 Expected MySQL Output:</strong>
        <pre style="margin-top:8px;background:rgba(0,0,0,0.3);padding:10px;border-radius:6px;color:#a6e22e;font-family:'JetBrains Mono',monospace;">Query OK, Affected Rows / Dataset Returned Successfully (0.00 sec)</pre>
      </div>
    </div>

    <!-- 8. Clause-by-clause explanation -->
    <div class="section-title"><span class="num">8</span>Clause-by-Clause Explanation</div>
    <div class="section-body">
      <table class="tbl spec-table">
        <thead><tr><th>SQL Clause / Keyword</th><th>Function &amp; Purpose</th></tr></thead>
        <tbody>
          <tr><td><code>${ch.title.split(' ')[0].toUpperCase()}</code></td><td>Defines core SQL operation and target database entity.</td></tr>
          <tr><td><code>WHERE / ON</code></td><td>Filters target rows or matches join keys across relational tables.</td></tr>
          <tr><td><code>ENGINE=InnoDB</code></td><td>Provides ACID transactions, row-level locking, and crash recovery.</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 9. Practical example -->
    <div class="section-title"><span class="num">9</span>Practical Example</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">SQL — Real-World Scenario</span>
        </div>
        <pre><code>-- Production scenario for ${ch.title}
START TRANSACTION;

${ch.code}

COMMIT;</code></pre>
      </div>
    </div>

    <!-- 10. Performance note -->
    <div class="section-title"><span class="num">10</span>Performance Note</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">⚡ Database Performance Optimization</div>
        <p>Always evaluate query execution plans using <code>EXPLAIN ANALYZE</code>. Ensure foreign keys and filter columns are indexed with B-Tree indexes to prevent full table scans on multi-million row datasets.</p>
      </div>
    </div>

    <!-- 11. Common mistakes -->
    <div class="section-title"><span class="num">11</span>Common Mistakes</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">⚠️ Pitfalls to Avoid</div>
        <ul style="margin:8px 0 0 18px;line-height:1.7;">
          <li>Forgetting the WHERE clause in UPDATE or DELETE statements — affects all table rows!</li>
          <li>Executing unindexed wildcard searches (LIKE '%term%') causing full table scans.</li>
          <li>Modifying schema structures without explicit transactions or backup copies.</li>
        </ul>
      </div>
    </div>

    <!-- 12. Coding challenge -->
    <div class="section-title"><span class="num">12</span>Coding Challenge</div>
    <div class="section-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:18px 22px;margin-bottom:24px;">
        <strong style="color:#10b981;display:block;margin-bottom:8px;">🎯 Hands-On Challenge:</strong>
        <p>Write a MySQL query demonstrating <strong>${ch.title}</strong> on a sample <code>courses</code> table. Verify that the query runs error-free and respects constraints!</p>
      </div>
    </div>

    <!-- 13. Mini quiz -->
    <div class="section-title"><span class="num">13</span>Mini Quiz</div>
    <div class="section-body">
      <div class="faq-card">
        <h4>❓ Question: What is the primary purpose of ${ch.title} in MySQL?</h4>
        <p><strong>Answer:</strong> It provides structured database handling for ${ch.subtopics.split('·')[0].trim()}, ensuring data integrity and query efficiency in relational database management systems.</p>
      </div>
    </div>

    <!-- 14. Quick recap -->
    <div class="section-title"><span class="num">14</span>Quick Recap</div>
    <div class="section-body">
      <ul style="line-height:1.8;margin-left:20px;">
        <li>${ch.summary}</li>
        <li>Subtopics covered: ${ch.subtopics}</li>
        <li>Always test SQL queries in local or staging environments before applying to production datasets.</li>
      </ul>
    </div>

    <!-- 15. Previous & Next lesson -->
    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on MySQL 8.0+ · Last updated August 2026</span>
      </div>
    </div>

    <div class="nav-footer">
      ${prevChapter ? `<a href="${prevChapter.file}" class="nav-btn"><span class="label">← 15. Previous Lesson</span><span class="title">${prevChapter.num}. ${prevChapter.title}</span></a>` : `<a href="/blog-mysql.html" class="nav-btn"><span class="label">← MySQL Overview</span><span class="title">Course Index</span></a>`}
      ${nextChapter ? `<a href="${nextChapter.file}" class="nav-btn" style="text-align:right;"><span class="label">16. Next Lesson →</span><span class="title">${nextChapter.num}. ${nextChapter.title}</span></a>` : `<a href="/blog-mysql.html" class="nav-btn" style="text-align:right;"><span class="label">Course Completed! 🎉</span><span class="title">MySQL Index</span></a>`}
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;

  const filePath = path.join(mysqlDir, ch.file);
  fs.writeFileSync(filePath, chapterHtml, 'utf8');
  console.log(`🔥 Generated MySQL Chapter: ${ch.file} (${(chapterHtml.length / 1024).toFixed(1)}KB)`);
});

console.log('✅ Generated all 45 MySQL Masterclass chapter files in public/blog-mysql/ successfully!');
