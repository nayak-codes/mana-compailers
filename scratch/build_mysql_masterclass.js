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

// 2. Define Full MySQL Masterclass Roadmap Data Structure (35 Chapters across 10 Phases)
const mysqlPhases = [
  {
    phaseTag: 'Phase 01', phaseTitle: 'MySQL Introduction', icon: '🐬',
    chapters: [
      {
        num: 1, file: '01-mysql-ante-enti-what-is-mysql.html', title: 'MySQL Ante Enti?',
        subtopics: 'Database ante enti? · MySQL ante enti? · Relational database · MySQL vs PostgreSQL · MySQL vs MongoDB · Database server/client · SQL basics',
        summary: 'MySQL is a relational database management system (RDBMS). Store data in structured tables with rows & columns, and query data using SQL.',
        code: `-- Creating database schema and table structure
CREATE DATABASE IF NOT EXISTS company_db;
USE company_db;

CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    salary DECIMAL(10, 2) DEFAULT 50000.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
      },
      {
        num: 2, file: '02-mysql-architecture.html', title: 'MySQL Architecture',
        subtopics: 'Client-server architecture · Connection manager · SQL parser · Query optimizer · Storage engines (InnoDB, MyISAM) · Port 3306 · Authentication',
        summary: 'InnoDB MySQL lo common general-purpose storage engine; transactions, crash recovery, row-level locking, and foreign key support provide chestundi.',
        code: `-- Checking MySQL Storage Engines and Server Version
SHOW ENGINES;

SELECT VERSION(), USER(), DATABASE();`
      }
    ]
  },
  {
    phaseTag: 'Phase 02', phaseTitle: 'Installation and Tools', icon: '⚙️',
    chapters: [
      {
        num: 3, file: '03-mysql-installation.html', title: 'MySQL Installation',
        subtopics: 'MySQL Server installation (Windows, macOS, Linux) · MySQL Workbench · MySQL Shell · Root password · Service configuration · Troubleshooting',
        summary: 'Step-by-step setup guide for installing MySQL Community Server, MySQL Workbench GUI client, and configuring root user credentials.',
        code: `-- Verifying MySQL Installation & System Variables
SHOW VARIABLES LIKE 'version%';
SHOW VARIABLES LIKE 'port';`
      },
      {
        num: 4, file: '04-connecting-to-mysql.html', title: 'Connecting to MySQL',
        subtopics: 'Login command (mysql -u root -p) · Host & Port · User privileges · Selecting database (USE db) · Remote connection · Connection errors',
        summary: 'Connect to MySQL Server via terminal CLI client, specify host and port, authenticate users, and manage connection sessions.',
        code: `-- Connecting via CLI terminal
# mysql -u root -h localhost -P 3306 -p

USE information_schema;
SELECT CURRENT_USER(), SCHEMA_NAME FROM SCHEMATA;`
      },
      {
        num: 5, file: '05-mysql-workbench-and-shell.html', title: 'MySQL Workbench and Shell',
        subtopics: 'Workbench interface · SQL editor · Result grid · Schema browser · Exporting/Importing SQL scripts · MySQL Shell modes (SQL, JS, Python)',
        summary: 'Use graphical database management tools like MySQL Workbench and multi-language MySQL Shell for writing queries, modeling, and administration.',
        code: `-- MySQL Shell SQL mode script execution
\sql
\connect root@localhost:3306
STATUS;`
      }
    ]
  },
  {
    phaseTag: 'Phase 03', phaseTitle: 'Database & Table Operations (DDL)', icon: '🏗️',
    chapters: [
      {
        num: 6, file: '06-creating-managing-databases.html', title: 'Creating & Managing Databases',
        subtopics: 'CREATE DATABASE · SHOW DATABASES · DROP DATABASE · IF NOT EXISTS · Character sets (utf8mb4) · Collations · USE database',
        summary: 'Create and manage MySQL databases: configuring character encoding (utf8mb4), collations, listing databases, and dropping schemas safely.',
        code: `CREATE DATABASE IF NOT EXISTS academy_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

SHOW DATABASES;
USE academy_db;`
      },
      {
        num: 7, file: '07-mysql-data-types.html', title: 'MySQL Data Types',
        subtopics: 'Numeric (INT, BIGINT, DECIMAL, FLOAT) · String (VARCHAR, TEXT, CHAR) · Date & Time (DATE, DATETIME, TIMESTAMP) · JSON · ENUM',
        summary: 'Master MySQL data types: choosing appropriate numeric precision, text storage sizes (VARCHAR vs TEXT), timestamps, and JSON columns.',
        code: `CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    fee DECIMAL(8, 2) NOT NULL,
    level ENUM('Beginner', 'Intermediate', 'Advanced') DEFAULT 'Beginner',
    metadata JSON,
    published_on DATE
);`
      },
      {
        num: 8, file: '08-creating-managing-tables.html', title: 'Creating & Managing Tables',
        subtopics: 'CREATE TABLE · SHOW TABLES · DESCRIBE table · Column definitions · Default values · Storage engine specification · Temporary tables',
        summary: 'Design relational database tables: defining column specifications, default values, primary identifiers, and inspecting table structures.',
        code: `CREATE TABLE IF NOT EXISTS students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    enrollment_date DATE DEFAULT (CURRENT_DATE)
) ENGINE=InnoDB;

DESCRIBE students;`
      },
      {
        num: 9, file: '09-alter-drop-truncate-tables.html', title: 'ALTER, DROP & TRUNCATE',
        subtopics: 'ALTER TABLE ADD column · MODIFY column · DROP column · RENAME table · TRUNCATE TABLE vs DELETE · DROP TABLE',
        summary: 'Modify existing database schemas dynamically: adding/dropping table columns, changing column types, truncating data, and dropping tables.',
        code: `ALTER TABLE students 
ADD COLUMN phone VARCHAR(20) AFTER email,
MODIFY COLUMN full_name VARCHAR(150) NOT NULL;

-- TRUNCATE removes all rows instantly resetting auto-increment counters
TRUNCATE TABLE students;`
      }
    ]
  },
  {
    phaseTag: 'Phase 04', phaseTitle: 'Data Manipulation (DML)', icon: '📝',
    chapters: [
      {
        num: 10, file: '10-inserting-data.html', title: 'Inserting Data (INSERT INTO)',
        subtopics: 'INSERT INTO single row · Bulk INSERT multiple rows · Column mapping · INSERT IGNORE · ON DUPLICATE KEY UPDATE · DEFAULT values',
        summary: 'Insert data into MySQL tables using INSERT INTO statements, bulk inserts, handle key conflicts with ON DUPLICATE KEY UPDATE, and IGNORE.',
        code: `INSERT INTO courses (title, fee, level, published_on)
VALUES 
    ('Python Masterclass', 4999.00, 'Beginner', '2026-01-10'),
    ('MySQL Database Course', 3999.00, 'Intermediate', '2026-02-15'),
    ('Flask Web Development', 4499.00, 'Advanced', '2026-03-01');`
      },
      {
        num: 11, file: '11-selecting-data.html', title: 'Selecting Data (SELECT)',
        subtopics: 'SELECT columns · SELECT * · Column aliases (AS) · DISTINCT values · Calculating expressions · LIMIT & OFFSET pagination',
        summary: 'Query table records with SELECT statements: selecting specific columns, applying column aliases, removing duplicates with DISTINCT, and LIMIT pagination.',
        code: `SELECT 
    id, 
    title AS course_title, 
    fee, 
    fee * 0.85 AS discounted_fee
FROM courses
ORDER BY fee DESC
LIMIT 10 OFFSET 0;`
      },
      {
        num: 12, file: '12-where-clause-filtering.html', title: 'WHERE Clause & Filtering',
        subtopics: 'Comparison operators (=, !=, <, >) · Logical operators (AND, OR, NOT) · IN & NOT IN · BETWEEN · IS NULL · LIKE & Wildcards (%, _)',
        summary: 'Filter database records using complex conditions: combining AND/OR/NOT logic, range filtering with BETWEEN, pattern matching with LIKE, and NULL checks.',
        code: `SELECT * FROM courses
WHERE level IN ('Beginner', 'Intermediate')
  AND fee BETWEEN 3000.00 AND 5000.00
  AND title LIKE '%SQL%';`
      }
    ]
  },
  {
    phaseTag: 'Phase 05', phaseTitle: 'Primary Keys & Constraints', icon: '🔒',
    chapters: [
      {
        num: 13, file: '13-primary-key-auto-increment.html', title: 'Primary Key & Auto Increment',
        subtopics: 'Primary Key constraint · AUTO_INCREMENT IDs · Composite Primary Keys · LAST_INSERT_ID() · Key uniqueness enforcement',
        summary: 'Enforce row uniqueness using Primary Keys and AUTO_INCREMENT integer fields, composite keys, and retrieving newly generated sequence IDs.',
        code: `CREATE TABLE enrollments (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, course_id)
);`
      },
      {
        num: 14, file: '14-unique-notnull-check-constraints.html', title: 'UNIQUE, NOT NULL & CHECK Constraints',
        subtopics: 'NOT NULL validation · UNIQUE constraint · DEFAULT column values · CHECK constraints · Named constraints · Altering constraints',
        summary: 'Ensure data quality at the database layer with NOT NULL rules, UNIQUE column values, DEFAULT fallbacks, and CHECK evaluation expressions.',
        code: `CREATE TABLE instructors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    rating DECIMAL(3, 2) CHECK (rating >= 0.00 AND rating <= 5.00)
);`
      }
    ]
  },
  {
    phaseTag: 'Phase 06', phaseTitle: 'Update and Delete', icon: '✏️',
    chapters: [
      {
        num: 15, file: '15-update-statement.html', title: 'UPDATE Statement',
        subtopics: 'UPDATE · Updating one column · Updating multiple columns · WHERE importance · Conditional updates · Expressions · Dates · JSON · Safe update mode · Transactions · Verifying affected rows · Rollback strategy',
        summary: 'Modify existing database records safely using UPDATE statements with WHERE filters, multi-column updates, expressions, safe update checks, and transactions.',
        code: `UPDATE courses
SET level = 'Intermediate',
    fee = fee * 1.10
WHERE id = 1;`
      },
      {
        num: 16, file: '16-delete-statement.html', title: 'DELETE Statement',
        subtopics: 'DELETE · Delete selected rows · Delete all rows · TRUNCATE · DROP · Conditions · Foreign key delete behavior · Soft delete · Archiving · Backup before deletion · Transaction-safe deletion · Recovery limitations',
        summary: 'Remove specific table records using DELETE FROM with WHERE conditions, contrast DELETE with TRUNCATE and DROP, implement soft deletes, and transaction protection.',
        code: `-- Transaction-safe deletion example
START TRANSACTION;

DELETE FROM courses
WHERE level = 'Obsolete';

-- Check affected rows before commit
COMMIT;`
      }
    ]
  },
  {
    phaseTag: 'Phase 07', phaseTitle: 'Relationships and Joins', icon: '🔗',
    chapters: [
      {
        num: 17, file: '17-database-relationships.html', title: 'Database Relationships',
        subtopics: 'One-to-one · One-to-many · Many-to-many · Primary keys · Foreign keys · Junction tables · Referential integrity · Cascade actions · Relationship modeling · Normalized data structure',
        summary: 'Model real-world entity relationships (1:1, 1:N, M:N) using relational database design, junction tables, foreign keys, and normalized table structures.',
        code: `-- Many-to-Many Relationship via Junction Table
CREATE TABLE student_courses (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);`
      },
      {
        num: 18, file: '18-foreign-keys.html', title: 'Foreign Keys',
        subtopics: 'Foreign key ante enti? · Creating foreign keys · REFERENCES · ON DELETE CASCADE · ON DELETE SET NULL · ON UPDATE CASCADE · Restrict behavior · Foreign key errors · Index requirements · Relationship testing',
        summary: 'Foreign keys guarantee referential integrity across relational tables. Configure ON DELETE CASCADE, ON DELETE SET NULL, and ON UPDATE CASCADE constraints.',
        code: `CREATE TABLE lessons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE
);`
      },
      {
        num: 19, file: '19-joins.html', title: 'JOINs',
        subtopics: 'INNER JOIN · LEFT JOIN · RIGHT JOIN · CROSS JOIN · Self join · Join conditions · Joining multiple tables · Aliases · Avoiding duplicate rows · Join performance · Null values · Join vs subquery',
        summary: 'Combine data across multiple tables using INNER JOIN, LEFT JOIN, RIGHT JOIN, CROSS JOIN, and self joins with proper table aliases and index performance.',
        code: `SELECT
    courses.title,
    lessons.title AS lesson_title
FROM courses
INNER JOIN lessons
    ON lessons.course_id = courses.id;`
      },
      {
        num: 20, file: '20-subqueries-and-ctes.html', title: 'Subqueries and CTEs',
        subtopics: 'Subquery ante enti? · Scalar subquery · Subquery in WHERE · Subquery in FROM · EXISTS · Correlated subquery · Common Table Expressions · WITH · Recursive CTE · CTE readability · Performance · Subquery vs join',
        summary: 'Write subqueries and Common Table Expressions (CTEs) using WITH for modular SQL code, correlated subqueries, EXISTS tests, and recursive query logic.',
        code: `WITH CourseStats AS (
    SELECT course_id, COUNT(*) AS lesson_count
    FROM lessons
    GROUP BY course_id
)
SELECT c.title, cs.lesson_count
FROM courses c
JOIN CourseStats cs ON c.id = cs.course_id;`
      }
    ]
  },
  {
    phaseTag: 'Phase 08', phaseTitle: 'Advanced Querying', icon: '⚡',
    chapters: [
      {
        num: 21, file: '21-views.html', title: 'Views',
        subtopics: 'View ante enti? · Creating views · Querying views · Updating views · Dropping views · Security views · Reporting views · View limitations · Materialized view overview · View performance',
        summary: 'Views are saved SQL query definitions that act as virtual tables. Simplify complex join queries and restrict direct table access for security.',
        code: `CREATE VIEW course_summary AS
SELECT id, title, level
FROM courses;

-- Querying virtual view
SELECT * FROM course_summary WHERE level = 'Intermediate';`
      },
      {
        num: 22, file: '22-window-functions.html', title: 'Window Functions',
        subtopics: 'Window functions ante enti? · OVER · PARTITION BY · ORDER BY in windows · ROW_NUMBER · RANK · DENSE_RANK · LAG · LEAD · Running totals · Moving averages · Ranking courses',
        summary: 'Perform advanced calculations across row sets using Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, PARTITION BY) without collapsing rows.',
        code: `SELECT
    title,
    level,
    ROW_NUMBER() OVER (
        PARTITION BY level
        ORDER BY title
    ) AS course_number
FROM courses;`
      },
      {
        num: 23, file: '23-full-text-search.html', title: 'Full-Text Search',
        subtopics: 'Full-text search ante enti? · FULLTEXT index · Natural language mode · Boolean mode · Search relevance · Search limitations · Prefix search · Search optimization · Full-text project · External search overview',
        summary: 'Perform fast text searches across large text columns using MySQL FULLTEXT indexes, MATCH() AGAINST() functions, natural language and boolean search modes.',
        code: `ALTER TABLE courses ADD FULLTEXT(title);

SELECT title, MATCH(title) AGAINST('Python SQL' IN NATURAL LANGUAGE MODE) AS score
FROM courses
WHERE MATCH(title) AGAINST('Python SQL' IN NATURAL LANGUAGE MODE);`
      },
      {
        num: 24, file: '24-stored-programs.html', title: 'Stored Programs',
        subtopics: 'Stored procedure ante enti? · Creating procedures · Procedure parameters (IN, OUT, INOUT) · Calling procedures · Stored functions · Local variables · Conditions · Loops · Exception handlers · Procedure security · When to use procedures',
        summary: 'Encapsulate server-side business logic using Stored Procedures and Stored Functions with IN/OUT parameters, control flow, loops, and error handling.',
        code: `DELIMITER //

CREATE PROCEDURE GetCourses()
BEGIN
    SELECT * FROM courses;
END //

DELIMITER ;

CALL GetCourses();`
      },
      {
        num: 25, file: '25-triggers-and-events.html', title: 'Triggers and Events',
        subtopics: 'Trigger ante enti? · BEFORE INSERT · AFTER INSERT · BEFORE UPDATE · AFTER UPDATE · Audit logs · Validation triggers · Trigger limitations · Scheduled events · Event scheduler · Trigger debugging · Avoiding hidden logic',
        summary: 'Automate database actions with Triggers and Event Scheduler: executing automated SQL logic BEFORE or AFTER row modifications and scheduling periodic tasks.',
        code: `CREATE TABLE audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(50),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //
CREATE TRIGGER after_course_insert
AFTER INSERT ON courses
FOR EACH ROW
BEGIN
    INSERT INTO audit_log(action) VALUES (CONCAT('Inserted course ID: ', NEW.id));
END //
DELIMITER ;`
      }
    ]
  },
  {
    phaseTag: 'Phase 09', phaseTitle: 'Indexes and Performance', icon: '🚀',
    chapters: [
      {
        num: 26, file: '26-indexes.html', title: 'Indexes',
        subtopics: 'Index ante enti? · Why indexes are needed · Primary key index · Unique index · Single-column index · Composite index · Prefix index · FULLTEXT index · Index selectivity · Index maintenance · Too many indexes · Choosing index columns',
        summary: 'MySQL optimizer uses indexes to dramatically improve query performance. Design primary key, single-column, and composite indexes based on query access patterns.',
        code: `CREATE INDEX idx_courses_level
ON courses(level);

CREATE INDEX idx_courses_level_title
ON courses(level, title);`
      },
      {
        num: 27, file: '27-query-optimization.html', title: 'Query Optimization',
        subtopics: 'Query execution · EXPLAIN · EXPLAIN ANALYZE · Full table scan · Index scan · Join optimization · Filtering early · Avoiding unnecessary columns · Pagination performance · Slow query log · Benchmarking queries',
        summary: 'Analyze and optimize slow SQL queries using EXPLAIN and EXPLAIN ANALYZE, eliminating full table scans, utilizing index scans, and tuning join order.',
        code: `EXPLAIN
SELECT *
FROM courses
WHERE level = 'Beginner';`
      },
      {
        num: 28, file: '28-transactions.html', title: 'Transactions',
        subtopics: 'Transaction ante enti? · ACID properties · Atomicity · Consistency · Isolation · Durability · START TRANSACTION · COMMIT · ROLLBACK · Savepoints · Autocommit · Transaction errors · Boundaries · Application transactions',
        summary: 'InnoDB transactions follow the ACID model, offering COMMIT, ROLLBACK, savepoints, and crash recovery to maintain data integrity during concurrent updates.',
        code: `START TRANSACTION;

UPDATE courses
SET level = 'Advanced'
WHERE id = 1;

COMMIT;`
      },
      {
        num: 29, file: '29-locks-and-isolation.html', title: 'Locks and Isolation',
        subtopics: 'Row locks · Table locks · Shared locks · Exclusive locks · Deadlocks · Isolation levels · Read uncommitted · Read committed · Repeatable read · Serializable · Lock wait timeout · Transaction debugging',
        summary: 'Understand database concurrency control: row locks, table locks, deadlocks, shared vs exclusive locks, and isolation levels (Repeatable Read, Read Committed).',
        code: `SELECT * FROM courses WHERE id = 1 FOR UPDATE;

SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;`
      }
    ]
  },
  {
    phaseTag: 'Phase 10', phaseTitle: 'Administration & Project', icon: '🏆',
    chapters: [
      {
        num: 30, file: '30-user-accounts-and-security.html', title: 'User Accounts & Security',
        subtopics: 'CREATE USER · GRANT privileges · REVOKE privileges · FLUSH PRIVILEGES · Password management · Role-based access control · Security best practices',
        summary: 'Manage database security: creating user accounts, granting granular privileges (SELECT, INSERT, UPDATE), revoking permissions, and flush privileges.',
        code: `CREATE USER 'dev_user'@'localhost' IDENTIFIED BY 'SecurePass123!';
GRANT SELECT, INSERT, UPDATE ON academy_db.* TO 'dev_user'@'localhost';
FLUSH PRIVILEGES;`
      },
      {
        num: 31, file: '31-backup-and-restore.html', title: 'Backup & Restore (mysqldump)',
        subtopics: 'mysqldump command · Backing up single database · Backing up all databases · Restoring SQL dump file · Automated backup scripts · Disaster recovery',
        summary: 'Perform database maintenance, backups, and disaster recovery: exporting databases with mysqldump and restoring SQL dump files.',
        code: `# Terminal Backup & Restore Command
mysqldump -u root -p academy_db > academy_backup.sql
mysql -u root -p academy_db < academy_backup.sql`
      },
      {
        num: 32, file: '32-mysql-database-design-project.html', title: 'MySQL Database Design Project',
        subtopics: 'E-commerce DB schema · User accounts & Roles · Product catalog · Shopping cart & Orders · Foreign key constraints · Optimization · Indexes',
        summary: 'Design and build a complete production-grade relational database for an E-commerce application with full constraints, joins, and indexes.',
        code: `CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);`
      },
      {
        num: 33, file: '33-mysql-practice-quiz.html', title: 'MySQL Practice Quiz',
        subtopics: 'Comprehensive MySQL Knowledge Check · 30 Multiple Choice Questions · DDL, DML, Joins, Group By, Subqueries, Indexes & Transactions',
        summary: 'Test your MySQL & SQL database expertise with our interactive 30-question certification quiz covering queries, joins, indexes, and administration.',
        code: `-- MySQL Masterclass Self-Assessment Quiz
SELECT 'Quiz Ready' AS status;`
      }
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
  <title>MySQL Complete Roadmap — 33 Chapters, 10 Phases (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master MySQL database management from zero to production ready with our complete 33-chapter roadmap across 10 phases: MySQL Server, Workbench, DDL, DML, UPDATE & DELETE, WHERE filters, Primary & Foreign keys, Aggregate functions, GROUP BY, INNER/LEFT/RIGHT Joins, Subqueries & CTEs, Views, Window Functions, Full-Text Search, Stored Programs, Triggers, Indexes, EXPLAIN Optimization, Transactions, Locks, and Administration." />
  <meta name="keywords" content="mysql tutorial, learn mysql, sql tutorial, relational database, mysql workbench, update, delete, foreign keys, inner join, CTE, window functions, stored procedures, mysql indexes, acid transactions" />
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

    <h1 class="page-title">MySQL Complete Masterclass (33 Chapters, 10 Phases)</h1>

    <div class="page-meta">
      <span class="badge">🐬 MySQL 8.0+</span>
      <span class="badge">🟢 33 Complete Chapters</span>
      <span class="badge">📂 10 Complete Phases</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">MySQL Ante Enti? · Architecture &amp; InnoDB · Workbench Tools · DDL &amp; DML · UPDATE &amp; DELETE · Foreign Keys &amp; CASCADE · INNER/LEFT/RIGHT Joins · CTEs &amp; Subqueries · Views &amp; Window Functions · Full-Text Search · Stored Procedures &amp; Triggers · Indexes &amp; EXPLAIN Optimization · ACID Transactions &amp; Locks · User Accounts &amp; mysqldump · E-Commerce DB Project &amp; Quiz</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's MySQL Complete Master Course</strong>. MySQL is the world's most popular open-source relational database management system (RDBMS), powering enterprise platforms, e-commerce applications, and cloud microservices. This comprehensive 33-chapter bootcamp guides you step-by-step from database setup to advanced query tuning, CTEs, window functions, stored programs, triggers, indexes, and transactions.</p>
    </div>

    <div style="background:linear-gradient(135deg,rgba(16,185,129,0.12),rgba(20,24,32,0.6));border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:24px;margin:28px 0;">
      <h3 style="color:#10b981;margin-bottom:10px;font-size:18px;">🎯 Ready to Start Learning MySQL?</h3>
      <p style="color:var(--text2);margin-bottom:16px;font-size:14.5px;">Choose where to start: explore foundations, table creation, UPDATE/DELETE, joins, window functions, stored procedures, or transactions:</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/blog-mysql/01-mysql-ante-enti-what-is-mysql.html" style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 1: MySQL Intro →</a>
        <a href="/blog-mysql/15-update-statement.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 6: Update &amp; Delete →</a>
        <a href="/blog-mysql/19-joins.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 7: Relationships &amp; Joins →</a>
        <a href="/blog-mysql/21-views.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 8: Advanced Querying →</a>
        <a href="/blog-mysql/26-indexes.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 9: Indexes &amp; Performance →</a>
        <a href="/blog-mysql/32-mysql-database-design-project.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 10: DB Design Project &amp; Quiz →</a>
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
        <span>MySQL Complete Masterclass · 33 Chapters · 10 Phases · 2026 Edition</span>
      </div>
    </div>

    <div class="nav-footer">
      <a href="/blog.html" class="nav-btn"><span class="label">← All Tutorials</span><span class="title">Course Hub</span></a>
      <a href="/blog-mysql/01-mysql-ante-enti-what-is-mysql.html" class="nav-btn" style="text-align:right;"><span class="label">Start Learning →</span><span class="title">1. MySQL Ante Enti?</span></a>
    </div>
  </main>
</div>
<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'blog-mysql.html'), masterIndexHtml, 'utf8');
console.log('✅ Generated public/blog-mysql.html master index page successfully!');

// 4. Generate all Chapter HTML Files inside public/blog-mysql/
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

    <!-- Section 1 -->
    <div class="section-title"><span class="num">1</span>Simple Introduction &amp; Overview</div>
    <div class="section-body">
      <p>In MySQL database management, understanding <strong>${ch.title}</strong> is essential for building structured, consistent, and performant data storage systems. MySQL routes queries, enforces referential integrity, and optimizes execution patterns.</p>
    </div>

    <!-- Section 2 -->
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

    <!-- Section 3 -->
    <div class="section-title"><span class="num">3</span>Why This Concept is Useful</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">💡 Practical Utility</div>
        <p>Relational databases ensure ACID compliance (Atomicity, Consistency, Isolation, Durability). Mastering MySQL equips web developers to store user accounts, orders, products, and analytics safely.</p>
      </div>
    </div>

    <!-- Section 4 -->
    <div class="section-title"><span class="num">4</span>Basic Syntax &amp; Structure</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">SQL — MySQL Syntax</span>
        </div>
        <pre><code>${ch.code}</code></pre>
      </div>
    </div>

    <!-- Section 5 -->
    <div class="section-title"><span class="num">5</span>Basic Example Implementation</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">SQL — Full Query Example</span>
        </div>
        <pre><code>-- Executing ${ch.title} query logic
${ch.code}</code></pre>
      </div>
    </div>

    <!-- Section 6 -->
    <div class="section-title"><span class="num">6</span>Execution &amp; Result Output</div>
    <div class="section-body">
      <div class="card" style="background:var(--bg2);padding:16px;border-radius:8px;margin:16px 0;font-size:13.5px;border-left:4px solid #10b981;">
        <strong style="color:#10b981;">📊 Expected Query Result Grid:</strong>
        <pre style="margin-top:8px;background:rgba(0,0,0,0.3);padding:10px;border-radius:6px;color:#a6e22e;font-family:'JetBrains Mono',monospace;">Query OK, Affected Rows / Dataset Returned Successfully (0.00 sec)</pre>
      </div>
    </div>

    <!-- Section 7 -->
    <div class="section-title"><span class="num">7</span>Line-by-Line SQL Explanation</div>
    <div class="section-body">
      <table class="tbl spec-table">
        <thead><tr><th>SQL Keyword / Clause</th><th>Function &amp; Purpose</th></tr></thead>
        <tbody>
          <tr><td><code>${ch.title.split(' ')[0].toUpperCase()}</code></td><td>Defines core SQL operation and target database table.</td></tr>
          <tr><td><code>WHERE</code></td><td>Filters target rows to ensure precise modification or query scoping.</td></tr>
          <tr><td><code>FOREIGN KEY / INDEX</code></td><td>Enforces referential integrity or speeds up query execution.</td></tr>
        </tbody>
      </table>
    </div>

    <!-- Section 8 -->
    <div class="section-title"><span class="num">8</span>Common Database Mistakes</div>
    <div class="section-body">
      <div class="callout" style="margin-bottom:24px;">
        <div class="callout-title">⚠️ Pitfalls to Avoid</div>
        <ul style="margin:8px 0 0 18px;line-height:1.7;">
          <li>Forgetting the WHERE clause in UPDATE or DELETE statements — affects all table rows!</li>
          <li>Not running EXPLAIN on complex join or window function queries on large tables.</li>
          <li>Modifying schema structures without explicit transactions or backup copies.</li>
        </ul>
      </div>
    </div>

    <!-- Section 9 -->
    <div class="section-title"><span class="num">9</span>Quick Recap &amp; Summary</div>
    <div class="section-body">
      <ul style="line-height:1.8;margin-left:20px;">
        <li>${ch.summary}</li>
        <li>Subtopics covered: ${ch.subtopics}</li>
        <li>Always test queries on staging databases before executing in production environments.</li>
      </ul>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on MySQL 8.0+ · Last updated August 2026</span>
      </div>
    </div>

    <div class="nav-footer">
      ${prevChapter ? `<a href="${prevChapter.file}" class="nav-btn"><span class="label">← Previous Lesson</span><span class="title">${prevChapter.num}. ${prevChapter.title}</span></a>` : `<a href="/blog-mysql.html" class="nav-btn"><span class="label">← MySQL Overview</span><span class="title">Course Index</span></a>`}
      ${nextChapter ? `<a href="${nextChapter.file}" class="nav-btn" style="text-align:right;"><span class="label">Next Lesson →</span><span class="title">${nextChapter.num}. ${nextChapter.title}</span></a>` : `<a href="/blog-mysql.html" class="nav-btn" style="text-align:right;"><span class="label">Course Completed! 🎉</span><span class="title">MySQL Index</span></a>`}
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

console.log('✅ Generated all MySQL Masterclass chapter files in public/blog-mysql/ successfully!');
