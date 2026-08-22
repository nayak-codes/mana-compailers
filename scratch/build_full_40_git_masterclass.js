const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const gitDir = path.join(publicDir, 'blog-git');

if (!fs.existsSync(gitDir)) {
  fs.mkdirSync(gitDir, { recursive: true });
}

// 1. Create public/blog-git/style.css matching Git Red/Orange Theme (#f14e32 / #e24329)
const gitCssStyleContent = `/* Specialized styling enhancements for Git tutorial lessons & Accordion — Git Red/Orange Theme */
:root {
  --git-theme: #f14e32;
  --git-accent: #f14e32;
  --git-accent-hover: #e24329;
  --git-theme-bg: rgba(241, 78, 50, 0.12);
  --git-theme-border: rgba(241, 78, 50, 0.3);
}

body.lang-git {
  --accent: #f14e32;
  --accent-glow: rgba(241, 78, 50, 0.2);
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
  background: rgba(241, 78, 50, 0.08) !important;
  border: 1px solid rgba(241, 78, 50, 0.25) !important;
  border-radius: 99px !important;
  color: #f14e32 !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  text-decoration: none !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sidebar-home-link:hover {
  background: rgba(241, 78, 50, 0.16) !important;
  border-color: #f14e32 !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(241, 78, 50, 0.2);
}

.sidebar-home-link.active {
  background: linear-gradient(135deg, rgba(241, 78, 50, 0.18), rgba(20, 24, 32, 0.8)) !important;
  border-color: #f14e32 !important;
  color: #f14e32 !important;
  box-shadow: 0 0 12px rgba(241, 78, 50, 0.25);
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
  background: linear-gradient(135deg, rgba(241, 78, 50, 0.15) 0%, rgba(20, 24, 32, 0.6) 100%);
  border-color: #f14e32;
  box-shadow: 0 0 14px rgba(241, 78, 50, 0.18);
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
  background: rgba(241, 78, 50, 0.2);
  border-color: rgba(241, 78, 50, 0.4);
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
  color: #f14e32;
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
  background: rgba(241, 78, 50, 0.2);
  color: #f14e32;
  border-color: rgba(241, 78, 50, 0.35);
  font-weight: 700;
}

.accordion-chevron {
  color: var(--text3, #8b949e);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s;
  flex-shrink: 0;
}

.accordion-header.active .accordion-chevron {
  transform: rotate(90deg);
  color: #f14e32;
}

.accordion-content {
  display: none;
  flex-direction: column;
  padding: 4px 0 6px 10px;
  border-left: 2px solid rgba(241, 78, 50, 0.35);
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
  background: #f14e32 !important;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(241, 78, 50, 0.35);
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
  border-color: rgba(241, 78, 50, 0.4);
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
  background: rgba(241, 78, 50, 0.12);
  border: 1px solid rgba(241, 78, 50, 0.3);
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
  color: #f14e32;
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
  background: rgba(241, 78, 50, 0.08);
  border-color: rgba(241, 78, 50, 0.35);
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
  background: rgba(241, 78, 50, 0.15);
  color: #f14e32;
  font-size: 12px;
  font-weight: 800;
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.curriculum-lesson-row:hover .lesson-idx {
  background: #f14e32;
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
  color: #f14e32;
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
  color: #f14e32;
  padding: 5px 12px;
  border-radius: 6px;
  background: rgba(241, 78, 50, 0.1);
  border: 1px solid rgba(241, 78, 50, 0.2);
  transition: all 0.18s ease;
}

.curriculum-lesson-row:hover .lesson-btn {
  background: #f14e32;
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
  border-color: #f14e32;
  box-shadow: 0 6px 18px rgba(241, 78, 50, 0.12);
}

body.light-theme .phase-roadmap-header {
  border-bottom-color: #f1f5f9;
}

body.light-theme .phase-roadmap-icon {
  background: #ffedd5;
  border-color: #fed7aa;
}

body.light-theme .phase-roadmap-tag {
  color: #ea580c;
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
  background: #fff7ed;
  border-color: #fdba74;
}

body.light-theme .lesson-idx {
  background: #ffedd5;
  color: #ea580c;
}

body.light-theme .lesson-title {
  color: #0f172a;
}

body.light-theme .lesson-subtopics {
  color: #64748b;
}

body.light-theme .lesson-btn {
  background: #ffedd5;
  border-color: #fed7aa;
  color: #ea580c;
}

body.light-theme .curriculum-lesson-row:hover .lesson-btn {
  background: #ea580c;
  color: #ffffff;
}

body.light-theme .sidebar-home-link {
  background: #fff7ed !important;
  border-color: #fed7aa !important;
  color: #ea580c !important;
}

body.light-theme .sidebar-home-link.active {
  background: #ffedd5 !important;
  border-color: #f14e32 !important;
  color: #c2410c !important;
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
  border: 1.5px solid #f14e32 !important;
  color: #0f172a !important;
  box-shadow: 0 2px 10px rgba(241, 78, 50, 0.15) !important;
}
body.light-theme .phase-icon-box {
  background: #f1f5f9;
  border-color: #e2e8f0;
}
body.light-theme .accordion-header.active .phase-icon-box {
  background: #ffedd5 !important;
  border-color: #fed7aa !important;
}
body.light-theme .phase-tag {
  color: #64748b;
}
body.light-theme .accordion-header.active .phase-tag {
  color: #ea580c !important;
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
  background: #ffedd5 !important;
  color: #ea580c !important;
  border-color: #fb923c !important;
}
body.light-theme .accordion-chevron {
  color: #94a3b8;
}
body.light-theme .accordion-header.active .accordion-chevron {
  color: #ea580c !important;
}
body.light-theme .accordion-content a {
  color: #475569;
}
body.light-theme .accordion-content a:hover {
  color: #0f172a;
  background: #f1f5f9;
}
body.light-theme .accordion-content a.active {
  background: #ea580c !important;
  color: #ffffff !important;
  border-radius: 8px !important;
  font-weight: 700 !important;
}

.try-box {
  background: linear-gradient(135deg, rgba(241, 78, 50, 0.08) 0%, rgba(20, 24, 32, 0.6) 100%);
  border: 1px solid rgba(241, 78, 50, 0.25);
  border-radius: var(--radius, 12px);
  padding: 24px;
  margin: 32px 0;
}

.try-box .try-title {
  font-weight: 700;
  color: #f14e32;
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
  background: linear-gradient(135deg, #f14e32, #e24329);
  color: #ffffff !important;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.2s, opacity 0.2s;
  box-shadow: 0 4px 14px rgba(241, 78, 50, 0.3);
}

.try-box .run-btn:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

.callout {
  background: #161b22;
  border: 1px solid #30363d;
  border-left: 4px solid #f14e32;
  padding: 18px 22px;
  border-radius: var(--radius, 12px);
  margin: 28px 0;
}

.callout .callout-title {
  font-weight: 700;
  color: #f14e32;
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
  color: #f14e32;
  line-height: 1.55;
  white-space: pre !important;
  overflow-x: auto;
}

.faq-card {
  background: #141820;
  border: 1px solid #30363d;
  border-left: 4px solid #f14e32;
  border-radius: 10px;
  padding: 18px 22px;
  margin-bottom: 18px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, border-color 0.2s;
}

.faq-card:hover {
  transform: translateX(3px);
  border-color: #f14e32;
}

.faq-card h4 {
  color: #f14e32 !important;
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
  background: linear-gradient(135deg, #f14e32, #e24329);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 800;
  font-size: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(241, 78, 50, 0.3);
}

body.light-theme .try-box {
  background: #fff7ed;
  border-color: #fed7aa;
}
body.light-theme .callout {
  background: #f8fafc;
  border-color: #cbd5e1;
  border-left-color: #ea580c;
}
body.light-theme .callout .callout-title {
  color: #c2410c;
}
body.light-theme .diagram-box {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #0f172a;
}
body.light-theme .faq-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #ea580c;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
body.light-theme .faq-card h4 {
  color: #c2410c !important;
}
body.light-theme .faq-card p {
  color: #334155;
}
`;

fs.writeFileSync(path.join(gitDir, 'style.css'), gitCssStyleContent, 'utf8');

// 2. Define 40-Chapter Git Syllabus across 10 Phases
const gitPhases = [
  {
    phaseTag: 'Phase 01', phaseTitle: 'Git Basics & Setup', icon: '🐙',
    chapters: [
      { num: 1, file: '01-git-introduction-and-version-control.html', title: 'What is Git? Version Control, GitHub & Basic Workflow', subtopics: 'Git ante enti? · Version control · Local vs Remote · Repositories · Commits' },
      { num: 2, file: '02-git-installation-and-configuration.html', title: 'Git Installation & Configuration', subtopics: 'git config · user.name · user.email · Global vs Local config · Default branch' },
      { num: 3, file: '03-creating-a-git-repository.html', title: 'Creating a Git Repository', subtopics: 'git init · .git folder structure · Initializing local repos · Tracking files' },
      { num: 4, file: '04-working-tree-and-staging-area.html', title: 'Working Tree & Staging Area', subtopics: 'Working Directory · Staging Area (Index) · git add · Untracked vs Tracked files' },
      { num: 5, file: '05-git-commits.html', title: 'Git Commits', subtopics: 'git commit -m · Commit message best practices · SHA-1/SHA-256 hashes · Commit history' }
    ]
  },
  {
    phaseTag: 'Phase 02', phaseTitle: 'Tracking, Undoing & Inspection', icon: '🔍',
    chapters: [
      { num: 6, file: '06-viewing-changes-git-diff.html', title: 'Viewing Changes with git diff', subtopics: 'git diff · Staged diff · Working tree diff · Comparing commits & branches' },
      { num: 7, file: '07-restoring-files.html', title: 'Restoring Files (git restore)', subtopics: 'git restore · Unstaging files · Discarding local workspace changes' },
      { num: 8, file: '08-git-reset.html', title: 'Git Reset (Soft, Mixed, Hard)', subtopics: 'git reset --soft · git reset --mixed · git reset --hard · Resetting HEAD' },
      { num: 9, file: '09-git-revert-and-reflog.html', title: 'Git Revert & Reflog', subtopics: 'git revert · Safe undoing in public branches · git reflog · Recovering lost commits' }
    ]
  },
  {
    phaseTag: 'Phase 03', phaseTitle: 'Branching & Merging', icon: '🌿',
    chapters: [
      { num: 10, file: '10-git-branch-basics.html', title: 'Git Branch Basics', subtopics: 'git branch · Creating branches · Switching branches (checkout/switch) · Deleting branches' },
      { num: 11, file: '11-branch-workflow.html', title: 'Branch Workflow', subtopics: 'Feature branching · Hotfix branches · Branch naming conventions' },
      { num: 12, file: '12-git-merging.html', title: 'Merging Branches', subtopics: 'git merge · Fast-forward merges · Recursive merge commits · 3-way merge' },
      { num: 13, file: '13-merge-conflicts.html', title: 'Merge Conflicts', subtopics: 'Merge conflicts · Conflict markers (<<<<<<<, =======, >>>>>>>) · Resolving conflicts' }
    ]
  },
  {
    phaseTag: 'Phase 04', phaseTitle: 'GitHub & Remote Repositories', icon: '🌐',
    chapters: [
      { num: 14, file: '14-github-repository.html', title: 'GitHub Repositories', subtopics: 'GitHub dashboard · Public vs Private repos · Creating remote repos' },
      { num: 15, file: '15-connecting-local-and-remote.html', title: 'Connecting Local & Remote Repositories', subtopics: 'git remote add origin · Checking remotes · Changing remote URLs' },
      { num: 16, file: '16-git-push-and-pull.html', title: 'Push & Pull', subtopics: 'git push -u origin main · git pull · Upstream tracking' },
      { num: 17, file: '17-git-fetch-and-remote-tracking.html', title: 'Fetch & Remote Tracking', subtopics: 'git fetch · Remote tracking branches (origin/main) · Fetch vs Pull' }
    ]
  },
  {
    phaseTag: 'Phase 05', phaseTitle: 'Pull Requests & Open-Source', icon: '🔀',
    chapters: [
      { num: 18, file: '18-pull-requests.html', title: 'Pull Requests', subtopics: 'Creating PRs · PR templates · Requesting reviews · Merging PRs' },
      { num: 19, file: '19-code-review.html', title: 'Code Review on GitHub', subtopics: 'Reviewing code · Inline comments · Requesting changes · Approving PRs' },
      { num: 20, file: '20-forks-and-contributions.html', title: 'Forks & Open-Source Contributions', subtopics: 'Forking repos · Syncing forks · Upstream remotes · Open source etiquette' }
    ]
  },
  {
    phaseTag: 'Phase 06', phaseTitle: 'GitHub Management & Releases', icon: '📋',
    chapters: [
      { num: 21, file: '21-github-issues.html', title: 'GitHub Issues', subtopics: 'Issue tracking · Labels · Assignees · Milestones · Closing issues via commits' },
      { num: 22, file: '22-github-projects.html', title: 'GitHub Projects', subtopics: 'Project boards · Kanban workflows · Automation rules · Sprint planning' },
      { num: 23, file: '23-releases-and-tags.html', title: 'Releases & Tags', subtopics: 'git tag · Lightweight vs Annotated tags · Creating GitHub Releases · Release binaries' }
    ]
  },
  {
    phaseTag: 'Phase 07', phaseTitle: 'Advanced Git Commands', icon: '⚡',
    chapters: [
      { num: 24, file: '24-git-rebase.html', title: 'Git Rebase', subtopics: 'git rebase · Interactive rebase (rebase -i) · Squashing commits · Rebase safety rules' },
      { num: 25, file: '25-git-cherry-pick.html', title: 'Cherry-Pick', subtopics: 'git cherry-pick · Applying specific commits across branches · Resolving cherry-pick conflicts' },
      { num: 26, file: '26-git-stash.html', title: 'Git Stash', subtopics: 'git stash · git stash pop · git stash apply · Stash list · Stashing untracked files' },
      { num: 27, file: '27-reflog-and-recovery.html', title: 'Reflog & Recovery', subtopics: 'git reflog · Recovering deleted branches · Restoring hard reset commits' }
    ]
  },
  {
    phaseTag: 'Phase 08', phaseTitle: 'Best Practices & Automation', icon: '🛠️',
    chapters: [
      { num: 28, file: '28-commit-best-practices.html', title: 'Commit Best Practices', subtopics: 'Atomic commits · Conventional commits · Writing great commit messages' },
      { num: 29, file: '29-gitignore.html', title: '.gitignore', subtopics: '.gitignore patterns · Global gitignore · Ignoring tracked files · git rm --cached' },
      { num: 30, file: '30-git-hooks.html', title: 'Git Hooks', subtopics: 'Pre-commit hooks · Post-commit hooks · Husky · Automating linters & tests' }
    ]
  },
  {
    phaseTag: 'Phase 09', phaseTitle: 'CI/CD & GitHub Actions', icon: '🚀',
    chapters: [
      { num: 31, file: '31-github-actions-introduction.html', title: 'GitHub Actions Introduction', subtopics: 'Workflows · Jobs · Steps · Actions syntax (.github/workflows) · Triggers' },
      { num: 32, file: '32-continuous-integration.html', title: 'Continuous Integration with GitHub Actions', subtopics: 'Automated testing · Build matrices · Caching dependencies · Artifacts' },
      { num: 33, file: '33-deployment-with-actions.html', title: 'Deployment with GitHub Actions', subtopics: 'Automated deployments · Secrets management · Deploying to AWS/Vercel' }
    ]
  },
  {
    phaseTag: 'Phase 10', phaseTitle: 'Security, Hosting & Workflows', icon: '🔒',
    chapters: [
      { num: 34, file: '34-repository-security.html', title: 'Repository Security', subtopics: 'Dependabot · Secret scanning · Security advisories · CODEOWNERS' },
      { num: 35, file: '35-github-authentication.html', title: 'GitHub Authentication (HTTPS & SSH)', subtopics: 'Personal Access Tokens (PAT) · SSH key pair generation · Adding SSH keys' },
      { num: 36, file: '36-branch-protection.html', title: 'Branch Protection Rules', subtopics: 'Protecting main · Requiring PR reviews · Status checks · Restricting force pushes' },
      { num: 37, file: '37-readme-documentation.html', title: 'README & Documentation', subtopics: 'Markdown syntax · Badges · Architecture diagrams · GitHub Wiki & Discussions' },
      { num: 38, file: '38-github-pages.html', title: 'GitHub Pages', subtopics: 'Free static web hosting · Custom domains · Deploying static sites from main' },
      { num: 39, file: '39-team-collaboration.html', title: 'Team Collaboration on GitHub', subtopics: 'Organization roles · Teams · Access controls · Code review assignments' },
      { num: 40, file: '40-professional-git-workflow.html', title: 'Professional Git Workflow', subtopics: 'GitHub Flow vs Git Flow · Trunk-based development · Production deployment checklist' }
    ]
  }
];

// Flatten all 40 chapters
const allGitChapters = [];
gitPhases.forEach(p => p.chapters.forEach(c => allGitChapters.push({ ...c, phaseTag: p.phaseTag, phaseTitle: p.phaseTitle, icon: p.icon })));

// Helper to generate Accordion Sidebar HTML
function getGitSidebarHTML(activeNum) {
  let sidebarAccHTML = '';
  gitPhases.forEach(phase => {
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
        ${phase.chapters.map(c => `<a href="/blog-git/${c.file}" class="${c.num === activeNum ? 'active' : ''}">${c.num}. ${c.title}</a>`).join('')}
      </div>`;
  });
  return sidebarAccHTML;
}

// 3. Generate public/blog-git.html (Master Index Page)
const masterIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Git &amp; GitHub Complete Masterclass — 40 Chapters, 10 Phases (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master Git version control and GitHub workflow from beginner to advanced: repositories, staging area, commits, branching, merging, pull requests, rebasing, SSH keys, GitHub Actions, and production team workflows." />
  <meta name="keywords" content="git tutorial, learn git, github tutorial, git commands, git branch, git merge, git rebase, github actions, git cheat sheet" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-git.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-git/style.css" />
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
<body class="lang-git">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-git.html" class="active">Git &amp; GitHub</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rest-api.html">REST API</a>
  <a href="/blog-graphql.html">GraphQL</a>
  <a href="/blog-rust.html">Rust</a>
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
    <div class="sidebar-heading">Git Roadmap</div>
    <a href="/blog-git.html" class="sidebar-home-link active">🐙 Git Course HOME</a>
    <div class="sidebar-accordion">
      ${getGitSidebarHTML(0)}
    </div>
    <div class="sidebar-heading">Navigation</div>
    <a href="/blog.html">📚 All Tutorials</a>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">Git &amp; GitHub Roadmap</span>
    </div>

    <h1 class="page-title">Git &amp; GitHub Masterclass (40 Chapters, 10 Phases)</h1>

    <div class="page-meta">
      <span class="badge">🐙 Git 2.40+</span>
      <span class="badge">🟢 40 Complete Chapters</span>
      <span class="badge">📂 10 Complete Phases</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">Git Basics · Configuration · Repositories · Staging Area · Commits · git diff · Restoring Files · git reset · git revert · Reflog · Branching · Merging · Conflict Resolution · Remote Repos · Push &amp; Pull · Fetch · Pull Requests · Code Review · Forks · Issues &amp; Projects · Releases · Rebase · Cherry-Pick · Stash · .gitignore · Git Hooks · GitHub Actions · CI/CD · SSH Keys · Branch Protection · Professional Workflows</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's Git &amp; GitHub Complete Master Course</strong>. Git is the universal standard distributed version control system powering modern software development. From simple commit tracking and branching to GitHub Pull Requests, automated CI/CD pipelines with GitHub Actions, and professional team workflows, this course covers every essential Git concept in depth.</p>
    </div>

    <div style="background:linear-gradient(135deg,rgba(241,78,50,0.12),rgba(20,24,32,0.6));border:1px solid rgba(241,78,50,0.3);border-radius:12px;padding:24px;margin:28px 0;">
      <h3 style="color:#f14e32;margin-bottom:10px;font-size:18px;">🎯 Ready to Master Git Version Control?</h3>
      <p style="color:var(--text2);margin-bottom:16px;font-size:14.5px;">Choose where to start: explore Git introduction, branching, GitHub pull requests, rebasing, or GitHub Actions CI/CD:</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/blog-git/01-git-introduction-and-version-control.html" style="background:linear-gradient(135deg,#f14e32,#e24329);color:#ffffff;font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 1: Git Intro →</a>
        <a href="/blog-git/10-git-branch-basics.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 3: Branching &amp; Merging →</a>
        <a href="/blog-git/18-pull-requests.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 5: Pull Requests →</a>
        <a href="/blog-git/24-git-rebase.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 7: Advanced Git →</a>
        <a href="/blog-git/31-github-actions-introduction.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 9: GitHub Actions →</a>
      </div>
    </div>

    <div class="section-title"><span class="num">📚</span> Master Course Curriculum</div>
    <div class="curriculum-roadmap-container">
      ${gitPhases.map(phase => `
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
              <a href="/blog-git/${ch.file}" class="curriculum-lesson-row">
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
        <span>Git &amp; GitHub Complete Masterclass · 40 Chapters · 10 Phases · 2026 Edition</span>
      </div>
    </div>

    <div class="nav-footer">
      <a href="/blog.html" class="nav-btn"><span class="label">← All Tutorials</span><span class="title">Course Hub</span></a>
      <a href="/blog-git/01-git-introduction-and-version-control.html" class="nav-btn" style="text-align:right;"><span class="label">Start Learning →</span><span class="title">1. Introduction to Version Control</span></a>
    </div>
  </main>
</div>
<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'blog-git.html'), masterIndexHtml, 'utf8');
console.log('✅ Generated public/blog-git.html master index page successfully!');

// 4. Update all 40 Chapter HTML Files inside public/blog-git/
allGitChapters.forEach((ch, idx) => {
  const filePath = path.join(gitDir, ch.file);
  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: File missing ${ch.file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Update layout header to include style.css and topnav active state
  content = content.replace(/<link rel="stylesheet" href="\/blog-style\.css" \/>/g, '<link rel="stylesheet" href="/blog-style.css" />\n  <link rel="stylesheet" href="/blog-git/style.css" />\n  <link rel="stylesheet" href="/site-nav.css" />');
  
  // Replace old sidebar with new accordion sidebar
  const sidebarHTML = `  <aside class="sidebar">
    <div class="sidebar-heading">Git Tutorial</div>
    <a href="/blog-git.html" class="sidebar-home-link">🐙 Git HOME</a>
    <div class="sidebar-accordion">
${getGitSidebarHTML(ch.num)}
    </div>
  </aside>`;

  content = content.replace(/<aside class="sidebar">[\s\S]*?<\/aside>/i, sidebarHTML);

  // Update topnav link active state
  const newTopNav = `<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-git.html" class="active">Git &amp; GitHub</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rest-api.html">REST API</a>
  <a href="/blog-graphql.html">GraphQL</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-django.html">Django</a>
  <a href="/blog-flask.html">Flask</a>
  <a href="/blog-mysql.html">MySQL</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-css.html">CSS</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
</nav>`;

  content = content.replace(/<nav class="topnav">[\s\S]*?<\/nav>/i, newTopNav);

  // Update Nav footer navigation
  const prevChapter = idx > 0 ? allGitChapters[idx - 1] : null;
  const nextChapter = idx < allGitChapters.length - 1 ? allGitChapters[idx + 1] : null;

  let navFooterHtml = `<div class="nav-footer">\n`;
  if (prevChapter) {
    navFooterHtml += `      <a href="${prevChapter.file}" class="nav-btn"><span class="label">← Previous Lesson</span><span class="title">${prevChapter.num}. ${prevChapter.title}</span></a>\n`;
  } else {
    navFooterHtml += `      <a href="/blog-git.html" class="nav-btn"><span class="label">← Git Overview</span><span class="title">Course Index</span></a>\n`;
  }
  if (nextChapter) {
    navFooterHtml += `      <a href="${nextChapter.file}" class="nav-btn" style="text-align:right;"><span class="label">Next Lesson →</span><span class="title">${nextChapter.num}. ${nextChapter.title}</span></a>\n`;
  } else {
    navFooterHtml += `      <a href="/blog-git.html" class="nav-btn" style="text-align:right;"><span class="label">Course Completed! 🎉</span><span class="title">Git Index</span></a>\n`;
  }
  navFooterHtml += `    </div>`;

  if (content.includes('<div class="nav-footer">')) {
    content = content.replace(/<div class="nav-footer">[\s\S]*?<\/div>/i, navFooterHtml);
  } else {
    content = content.replace(/<\/main>/i, `${navFooterHtml}\n  </main>`);
  }

  // Ensure body tag class is lang-git
  content = content.replace(/<body[^>]*>/i, '<body class="lang-git">');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`🔥 Updated Git Chapter: ${ch.file}`);
});

console.log('✅ Generated all 40 Git Masterclass chapter files in public/blog-git/ successfully!');
