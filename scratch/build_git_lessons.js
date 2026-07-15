const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const blogDir = path.join(publicDir, 'blog-git');
if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

const lessons = [
  { slug: 'intro',                 num: 1,  title: 'Introduction to Version Control &amp; Git',   filename: 'blog-git/intro.html' },
  { slug: 'installation-config',   num: 2,  title: 'Installing Git &amp; Profile Configuration', filename: 'blog-git/installation-config.html' },
  { slug: 'git-init-clone',        num: 3,  title: 'Initializing &amp; Cloning Repositories',     filename: 'blog-git/git-init-clone.html' },
  { slug: 'staging-commits',       num: 4,  title: 'Staging Area: git add &amp; git commit',       filename: 'blog-git/staging-commits.html' },
  { slug: 'git-status-log',        num: 5,  title: 'Inspecting Status, Diff &amp; Commit History',filename: 'blog-git/git-status-log.html' },
  { slug: 'git-branching',         num: 6,  title: 'Branching: Creating, Switching &amp; Deleting', filename: 'blog-git/git-branching.html' },
  { slug: 'git-merging',           num: 7,  title: 'Merging Branches &amp; Conflict Resolution',   filename: 'blog-git/git-merging.html' },
  { slug: 'remote-repositories',   num: 8,  title: 'Remotes: git push, pull, fetch &amp; clone',   filename: 'blog-git/remote-repositories.html' },
  { slug: 'undoing-changes',       num: 9,  title: 'Undoing Changes: reset, revert &amp; restore',filename: 'blog-git/undoing-changes.html' },
  { slug: 'git-stashing',          num: 10, title: 'Temporary Saves: git stash pop &amp; apply',  filename: 'blog-git/git-stashing.html' },
  { slug: 'git-rebasing',          num: 11, title: 'Rebasing vs Merging &amp; Squashing',        filename: 'blog-git/git-rebasing.html' },
  { slug: 'github-intro',          num: 12, title: 'GitHub Collaboration &amp; Pull Requests',   filename: 'blog-git/github-intro.html' },
  { slug: 'ssh-keys',              num: 13, title: 'SSH Keys Configuration &amp; Security',      filename: 'blog-git/ssh-keys.html' },
  { slug: 'git-workflows',         num: 14, title: 'Git Workflows: Git Flow vs GitHub Flow',    filename: 'blog-git/git-workflows.html' },
  { slug: 'git-best-practices',    num: 15, title: 'Best Practices, gitignore &amp; Hooks',       filename: 'blog-git/git-best-practices.html' }
];

function getSidebar(activeSlug) {
  let h = '\n    <div class="sidebar-heading">Git &amp; GitHub</div>\n';
  h += '    <a href="/blog-git.html"' + (activeSlug === 'home' ? ' class="active"' : '') + '>Git HOME</a>\n';
  lessons.forEach(l => {
    h += '    <a href="/' + l.filename + '"' + (activeSlug === l.slug ? ' class="active"' : '') + '>' + l.num + '. ' + l.title + '</a>\n';
  });
  h += '\n    <div class="sidebar-heading">Related Topics</div>\n';
  h += '    <a href="/blog-linux.html">Linux</a>\n';
  h += '    <a href="/blog-shell.html">Shell Scripting</a>\n';
  h += '    <a href="/blog-docker.html">Docker</a>\n';
  h += '    <a href="/blog.html">All Tutorials</a>\n';
  return h;
}

function wrapPage(slug, title, body, prevFile, prevTitle, nextFile, nextTitle) {
  let nav = '<div class="nav-footer">\n';
  if (prevFile) {
    nav += '      <a href="/' + prevFile + '" class="nav-btn"><span class="label">&#8592; Previous Lesson</span><span class="title">' + prevTitle + '</span></a>\n';
  } else {
    nav += '      <a href="/blog-git.html" class="nav-btn"><span class="label">&#8592; Git Overview</span><span class="title">Course Index</span></a>\n';
  }
  if (nextFile) {
    nav += '      <a href="/' + nextFile + '" class="nav-btn" style="text-align:right;"><span class="label">Next Lesson &#8594;</span><span class="title">' + nextTitle + '</span></a>\n';
  } else {
    nav += '      <a href="/blog.html" class="nav-btn" style="text-align:right;"><span class="label">All Tutorials &#8594;</span><span class="title">Learning Hub</span></a>\n';
  }
  nav += '    </div>';

  const num = slug === 'home' ? 'Index' : lessons.find(x => x.slug === slug).num;

  const topnav =
'  <a href="/blog-python.html">Python</a>\n' +
'  <a href="/blog-java.html">Java</a>\n' +
'  <a href="/blog-javascript.html">JavaScript</a>\n' +
'  <a href="/blog-c.html">C</a>\n' +
'  <a href="/blog-cpp.html">C++</a>\n' +
'  <a href="/blog-csharp.html">C#</a>\n' +
'  <a href="/blog-go.html">Go</a>\n' +
'  <a href="/blog-ruby.html">Ruby</a>\n' +
'  <a href="/blog-rust.html">Rust</a>\n' +
'  <a href="/blog-php.html">PHP</a>\n' +
'  <a href="/blog-html.html">HTML</a>\n' +
'  <a href="/blog-css.html">CSS</a>\n' +
'  <a href="/blog-react.html">React</a>\n' +
'  <a href="/blog-angular.html">Angular</a>\n' +
'  <a href="/blog-vue.html">Vue.js</a>\n' +
'  <a href="/blog-nextjs.html">Next.js</a>\n' +
'  <a href="/blog-nodejs.html">Node.js</a>\n' +
'  <a href="/blog-rest-api.html">REST API</a>\n' +
'  <a href="/blog-graphql.html">GraphQL</a>\n' +
'  <a href="/blog-spring-boot.html">Spring Boot</a>\n' +
'  <a href="/blog-django.html">Django</a>\n' +
'  <a href="/blog-flask.html">Flask</a>\n' +
'  <a href="/blog-express.html">Express.js</a>\n' +
'  <a href="/blog-postgresql.html">PostgreSQL</a>\n' +
'  <a href="/blog-mysql.html">MySQL</a>\n' +
'  <a href="/blog-mongodb.html">MongoDB</a>\n' +
'  <a href="/blog-sqlite.html">SQLite</a>\n' +
'  <a href="/blog-redis.html">Redis</a>\n' +
'  <a href="/blog-cassandra.html">Cassandra</a>\n' +
'  <a href="/blog-aws.html">AWS</a>\n' +
'  <a href="/blog-azure.html">Azure</a>\n' +
'  <a href="/blog-gcloud.html">Google Cloud</a>\n' +
'  <a href="/blog-docker.html">Docker</a>\n' +
'  <a href="/blog-kubernetes.html">Kubernetes</a>\n' +
'  <a href="/blog-cicd.html">CI/CD</a>\n' +
'  <a href="/blog-data-science.html">Data Science</a>\n' +
'  <a href="/blog-ml.html">Machine Learning</a>\n' +
'  <a href="/blog-deep-learning.html">Deep Learning</a>\n' +
'  <a href="/blog-tensorflow.html">TensorFlow</a>\n' +
'  <a href="/blog-pytorch.html">PyTorch</a>\n' +
'  <a href="/blog-big-data.html">Big Data</a>\n' +
'  <a href="/blog-git.html" class="active">Git &amp; GitHub</a>\n' +
'  <a href="/blog-linux.html">Linux</a>\n' +
'  <a href="/blog-shell.html">Shell Scripting</a>\n' +
'  <a href="/blog-testing.html">Testing</a>\n' +
'  <a href="/blog-agile.html">Agile &amp; Scrum</a>\n';

  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n' +
'  <meta charset="UTF-8" />\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
'  <title>' + title + ' | Our Compiler</title>\n' +
'  <meta name="description" content="Learn Git and GitHub — ' + title + ' with clear commands, branching diagrams, repository workflows, and challenges." />\n' +
'  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />\n' +
'  <link rel="icon" type="image/png" href="/logo.png" />\n' +
'  <link rel="preconnect" href="https://fonts.googleapis.com" />\n' +
'  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />\n' +
'  <link rel="stylesheet" href="/blog-style.css" />\n' +
'  <script>\n' +
'    (function(){\n' +
'      var t=localStorage.getItem("theme")||"dark";\n' +
'      if(t==="light"){document.documentElement.classList.add("light-theme");document.addEventListener("DOMContentLoaded",function(){document.body.classList.add("light-theme");});}\n' +
'      window.addEventListener("DOMContentLoaded",function(){\n' +
'        var nav=document.querySelector(".topnav");\n' +
'        if(nav){var btn=document.createElement("button");btn.style.cssText="margin-left:auto;flex-shrink:0;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:6px;padding:4px 10px;font-size:12px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif;transition:all 0.2s;white-space:nowrap;margin-right:12px;";var upd=function(){btn.innerHTML=document.body.classList.contains("light-theme")?"&#127769; Dark":"&#9728;&#65039; Light";};upd();btn.onclick=function(){document.body.classList.toggle("light-theme");document.documentElement.classList.toggle("light-theme");localStorage.setItem("theme",document.body.classList.contains("light-theme")?"light":"dark");upd();};nav.appendChild(btn);}\n' +
'        document.querySelectorAll(".code-block").forEach(function(block){var header=block.querySelector(".code-block-header");var codeEl=block.querySelector("pre code");if(!header||!codeEl)return;var ac=header.querySelector(".code-actions");if(!ac){ac=document.createElement("div");ac.className="code-actions";ac.style.cssText="display:flex;gap:8px;align-items:center;margin-left:auto;";header.appendChild(ac);}var cb=document.createElement("button");cb.innerHTML="&#128203; Copy";cb.style.cssText="background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:6px;padding:4px 10px;font-size:11px;font-weight:600;cursor:pointer;transition:all 0.2s;font-family:Inter,sans-serif;white-space:nowrap;";cb.onclick=function(){navigator.clipboard.writeText(codeEl.textContent).then(function(){cb.innerHTML="&#9989; Copied!";setTimeout(function(){cb.innerHTML="&#128203; Copy";},2000);});};ac.appendChild(cb);});\n' +
'      });\n' +
'    })();\n' +
'  </script>\n' +
'</head>\n' +
'<body class="lang-git">\n' +
'<nav class="topnav">\n' +
'  <a href="/" class="brand">&#128187; Our Compiler</a>\n' +
topnav +
'</nav>\n' +
'<div class="layout">\n' +
'  <aside class="sidebar">' + getSidebar(slug) + '  </aside>\n' +
'  <main class="content">\n' +
'    <div class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/blog.html">Tutorials</a><span>&#8250;</span><a href="/blog-git.html">Git</a><span>&#8250;</span><span>Lesson ' + num + '</span></div>\n' +
'    ' + body + '\n' +
'    ' + nav + '\n' +
'  </main>\n</div>\n</body>\n</html>';
}

// ─── LESSON CONTENTS ─────────────────────────────────────────────────────────
const L = {};

L['intro'] =
'<h1 class="page-title">Introduction to Version Control &amp; Git</h1>\n' +
'<div class="page-meta"><span class="badge">&#128187; Git</span><span class="badge">Lesson 1</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p><strong>Git</strong> is a distributed version control system designed to handle everything from small to very large projects with speed and efficiency. Unlike centralized VCS, every Git clone is a full-fledged repository with complete history and tracking capabilities.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Version Control Fundamentals</div>\n' +
'  <ul>\n' +
'    <li><strong>Tracking History</strong>: Git records all snapshots of files over time, allowing you to review changes, trace bugs, and revert to previous states.</li>\n' +
'    <li><strong>Branching and Merging</strong>: Multiple developers can work on distinct features in isolation and merge their changes safely.</li>\n' +
'    <li><strong>Distributed System</strong>: You don&#39;t need server connections to write commits, review logs, or switch branches; your local machine contains the full database.</li>\n' +
'  </ul>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write down a short description explaining the difference between centralized VCS (like SVN) and distributed VCS (like Git).</div>\n' +
'</div>\n';

L['installation-config'] =
'<h1 class="page-title">Installing Git &amp; Profile Configuration</h1>\n' +
'<div class="page-meta"><span class="badge">&#128187; Git</span><span class="badge">Lesson 2</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>Before writing Git commits, you must install the application and configure your identity profiles (username and email).</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Initial Configurations</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Git Profile Config</span></div>\n' +
'    <pre><code># Configure global commit user name\ngit config --global user.name "Balaji Nayak"\n\n# Configure global commit email address\ngit config --global user.email "balaji@test.com"\n\n# Configure default branch name globally\ngit config --global init.defaultBranch main\n\n# List all active configurations\ngit config --list</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Open your terminal, verify your current Git version using <code>git --version</code>, configure your name and email globally, and inspect the resulting config file using <code>git config --list</code>.</div>\n' +
'</div>\n';

L['git-init-clone'] =
'<h1 class="page-title">Initializing &amp; Cloning Repositories</h1>\n' +
'<div class="page-meta"><span class="badge">&#128187; Git</span><span class="badge">Lesson 3</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>To start tracking code files, you must initialize a new repository locally, or clone an existing tracking repository from a remote server.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Init &amp; Clone Commands</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Getting Repositories</span></div>\n' +
'    <pre><code># 1. Initialize a new local repository (creates hidden .git folder)\ngit init\n\n# 2. Clone a remote repository to your local system\ngit clone https://github.com/user/repository.git\n\n# Clone a repository into a custom folder name\ngit clone https://github.com/user/repository.git my-project</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create a new directory named <code>git-test</code>, initialize a Git repository inside it, and confirm the hidden <code>.git</code> database folder exists.</div>\n' +
'</div>\n';

L['staging-commits'] =
'<h1 class="page-title">Staging Area: git add &amp; git commit</h1>\n' +
'<div class="page-meta"><span class="badge">&#128187; Git</span><span class="badge">Lesson 4</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>The staging area is a buffer between your local workspace alterations and final repository commits. Git commits act as snapshots of your staged modifications.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Stage and Commit Commands</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Saving changes</span></div>\n' +
'    <pre><code># Add a specific file to the staging area\ngit add index.html\n\n# Add all modified and new files to the staging area\ngit add .\n\n# Save staged changes into a commit with a descriptive message\ngit commit -m "Add responsive layout changes to index page"\n\n# Add and commit modified files directly (skips staging, doesn&#39;t track new files)\ngit commit -am "Update page styles"</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create a new text file <code>README.md</code>, add it to the staging area, write a commit named <code>"Initial commit"</code>, and modify the file to stage and commit it again.</div>\n' +
'</div>\n';

L['git-status-log'] =
'<h1 class="page-title">Inspecting Status, Diff &amp; Commit History</h1>\n' +
'<div class="page-meta"><span class="badge">&#128187; Git</span><span class="badge">Lesson 5</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>Tracking states is managed by inspecting file alterations, staging statuses, and commit history lists.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Git History &amp; Logs</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Status and History CLI</span></div>\n' +
'    <pre><code># Check active file statuses (untracked, modified, staged)\ngit status\n\n# Check lines altered compared to the staging area\ngit diff\n\n# Check full list of commits\ngit log\n\n# Inspect logs in a single line format\ngit log --oneline --graph --decorate</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Modify an existing file, run <code>git diff</code> to review the line modifications, stage the file, run <code>git status</code> to confirm it is ready for commit, and execute the commit.</div>\n' +
'</div>\n';

L['git-branching'] =
'<h1 class="page-title">Branching: Creating, Switching &amp; Deleting</h1>\n' +
'<div class="page-meta"><span class="badge">&#128187; Git</span><span class="badge">Lesson 6</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>Branching creates dynamic sandbox paths for features or bug fixes, keeping modifications isolated from the main production code.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Branch Commands</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Branch Management</span></div>\n' +
'    <pre><code># List all local branches (starred is current)\ngit branch\n\n# Create a new branch\ngit branch feature-login\n\n# Switch your active workspace to that branch\ngit checkout feature-login\n# Or use the modern switch command:\ngit switch feature-login\n\n# Create and switch to a new branch in a single command\ngit checkout -b feature-payment\ngit switch -c feature-payment\n\n# Delete a branch (only if merged)\ngit branch -d feature-login\n\n# Force delete an unmerged branch\ngit branch -D feature-login</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create a branch named <code>feature-about</code>, switch to it, add a new file <code>about.html</code>, and commit it on that branch. Switch back to <code>main</code> and confirm the file is not present.</div>\n' +
'</div>\n';

L['git-merging'] =
'<h1 class="page-title">Merging Branches &amp; Conflict Resolution</h1>\n' +
'<div class="page-meta"><span class="badge">&#128187; Git</span><span class="badge">Lesson 7</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Merging merges isolated branch features back into your active branch. Conflict resolution handles overlapping file modifications manually.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Merging &amp; Conflicts</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Merging Branches</span></div>\n' +
'    <pre><code># 1. Switch to the target merge branch (e.g. main)\ngit checkout main\n\n# 2. Merge the feature branch into main\ngit merge feature-about\n\n# Fast-forward merges occur when no commits occurred on target\n# Recursive merges occur when conflicts require a merge commit</code></pre>\n' +
'  </div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Text &#8212; Merge Conflict Markers</span></div>\n' +
'    <pre><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD\nContent on main branch (target)\n=======\nContent on feature branch (incoming)\n&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature-about</code></pre>\n' +
'  </div>\n' +
'  <p>To resolve conflict errors, open the marked files, choose which block to preserve, delete the markers, stage the file, and commit the merge.</p>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Trigger a merge conflict by editing the same line of a text file on both <code>main</code> and a feature branch. Attempt a merge, resolve the conflict markers manually, and commit.</div>\n' +
'</div>\n';

L['remote-repositories'] =
'<h1 class="page-title">Remotes: git push, pull, fetch &amp; clone</h1>\n' +
'<div class="page-meta"><span class="badge">&#128187; Git</span><span class="badge">Lesson 8</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Remote repositories are hosting points (like GitHub or GitLab) used to back up commits, trace histories, and sync modifications across developer teams.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Remote Operations</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Remote Management</span></div>\n' +
'    <pre><code># Show linked remote tracking URLs\ngit remote -v\n\n# Link a local repository to a remote server\ngit remote add origin https://github.com/user/repository.git\n\n# Push local commits to remote branch\ngit push -u origin main\n\n# Fetch changes from remote without merging them\ngit fetch origin\n\n# Fetch and merge changes in a single command\ngit pull origin main</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create an empty repository on GitHub, map it as the <code>origin</code> remote on your local test repository, and push your commits to the remote <code>main</code> branch.</div>\n' +
'</div>\n';

L['undoing-changes'] =
'<h1 class="page-title">Undoing Changes: reset, revert &amp; restore</h1>\n' +
'<div class="page-meta"><span class="badge">&#128187; Git</span><span class="badge">Lesson 9</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Git provides safety nets to undo errors, revert previous commits, or reset the local workspace back to a clean tracking state.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Restoring and Undoing CLI</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Undo Commands</span></div>\n' +
'    <pre><code># Discard modifications in a local file before staging\ngit restore index.html\n\n# Unstage a file keeping modifications intact\ngit restore --staged index.html\n\n# Create a new commit that completely reverses a previous commit ID\ngit revert d5e8f12\n\n# Reset branch head back to commit history state (leaves files modified)\ngit reset d5e8f12\n\n# WARNING: Hard reset completely wipes staging and files back to target commit\ngit reset --hard d5e8f12</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Make some edits to a file, stage it, unstage it using <code>git restore --staged</code>, modify the file again, and discard all modifications using <code>git restore</code>.</div>\n' +
'</div>\n';

L['git-stashing'] =
'<h1 class="page-title">Temporary Saves: git stash pop &amp; apply</h1>\n' +
'<div class="page-meta"><span class="badge">&#128187; Git</span><span class="badge">Lesson 10</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Stashing saves uncommitted modifications (staged and unstaged files) to a temporary stack, returning your workspace back to a clean HEAD state.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Git Stash commands</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Stash CLI</span></div>\n' +
'    <pre><code># Stash current uncommitted work\ngit stash\n\n# Stash with a descriptive message\ngit stash save "Work in progress on login layout"\n\n# List all stashed item slices\ngit stash list\n\n# Apply the latest stashed change and remove it from stack\ngit stash pop\n\n# Apply stashed change keeping it in stash stack\ngit stash apply stash@{0}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Edit a file without committing, run <code>git stash</code>, switch branches to confirm a clean HEAD state, switch back, and restore your modifications using <code>git stash pop</code>.</div>\n' +
'</div>\n';

L['git-rebasing'] =
'<h1 class="page-title">Rebasing vs Merging &amp; Squashing</h1>\n' +
'<div class="page-meta"><span class="badge">&#128187; Git</span><span class="badge">Lesson 11</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Rebasing moves or combines a sequence of commits to a new base commit, generating a cleaner linear commit history list.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Rebase Commands</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Rebasing CLI</span></div>\n' +
'    <pre><code># Rebase active feature branch onto main\ngit checkout feature-login\ngit rebase main\n\n# Interactive rebase (squash multiple commits into a single commit)\ngit rebase -i HEAD~3</code></pre>\n' +
'  </div>\n' +
'  <div class="warning-box"><strong>Warning:</strong> Never rebase commits that have been pushed to public remote repositories, as it rewrites history and breaks other developers workspaces.</div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create three trivial commits in a feature branch, run an interactive rebase (<code>rebase -i</code>), and squash the last two commits into the first one.</div>\n' +
'</div>\n';

L['github-intro'] =
'<h1 class="page-title">GitHub Collaboration &amp; Pull Requests</h1>\n' +
'<div class="page-meta"><span class="badge">&#128187; Git</span><span class="badge">Lesson 12</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>GitHub is a web-based Git repository hosting platform, providing collaboration features like issues, pull requests, forking, and project trackers.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Collaborating with Pull Requests</div>\n' +
'  <ul>\n' +
'    <li><strong>Forking</strong>: Copying another developer&#39;s remote repository to your personal profile workspace.</li>\n' +
'    <li><strong>Pull Requests (PR)</strong>: Proposing code changes from a feature branch or fork back to a target repository, enabling reviews and discussion.</li>\n' +
'    <li><strong>Clone &amp; Upstream</strong>: Syncing your personal fork with upstream changes using remotes.</li>\n' +
'  </ul>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Fork an open-source test repository on GitHub, clone it, create a feature branch, commit a change, push it to your fork, and open a Pull Request.</div>\n' +
'</div>\n';

L['ssh-keys'] =
'<h1 class="page-title">SSH Keys Configuration &amp; Security</h1>\n' +
'<div class="page-meta"><span class="badge">&#128187; Git</span><span class="badge">Lesson 13</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>SSH keys establish secure connections between your local system and GitHub, removing the need to type passwords on every push/pull action.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Generating SSH Keys</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Generating Ed25519 Key</span></div>\n' +
'    <pre><code># Generate key pair\nssh-keygen -t ed25519 -C "balaji@test.com"\n\n# Start ssh-agent in the background\neval "$(ssh-agent -s)"\n\n# Add your private key to agent\nssh-add ~/.ssh/id_ed25519\n\n# Copy public key string (add this to GitHub Profile settings)\ncat ~/.ssh/id_ed25519.pub\n\n# Test connection authentication\nssh -T git@github.com</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Generate an Ed25519 SSH key pair, add it to your GitHub profile SSH settings, and verify the connection returns success from SSH.</div>\n' +
'</div>\n';

L['git-workflows'] =
'<h1 class="page-title">Git Workflows: Git Flow vs GitHub Flow</h1>\n' +
'<div class="page-meta"><span class="badge">&#128187; Git</span><span class="badge">Lesson 14</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Git Workflows structure branching conventions, release schedules, and deployment architectures across developer teams.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Flow Comparisons</div>\n' +
'  <table class="tbl">\n' +
'    <tr><th>Workflow</th><th>Branch Structure</th><th>Deployment Style</th></tr>\n' +
'    <tr><td><strong>GitHub Flow</strong></td><td>main, feature branches</td><td>Continuous Deployment (merge to main deploys directly)</td></tr>\n' +
'    <tr><td><strong>Git Flow</strong></td><td>main, develop, feature, release, hotfix</td><td>Scheduled Releases (main tracks release commits only)</td></tr>\n' +
'  </table>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a brief summary describing which workflow fits best for a cloud startup deploying updates multiple times per day.</div>\n' +
'</div>\n';

L['git-best-practices'] =
'<h1 class="page-title">Best Practices, gitignore &amp; Hooks</h1>\n' +
'<div class="page-meta"><span class="badge">&#128187; Git</span><span class="badge">Lesson 15</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Maintaining clean commit records requires managing patterns inside <code>.gitignore</code> and running pre-commit validation tests with Git Hooks.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Ignoring Files &amp; Hooks</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Text &#8212; .gitignore Template</span></div>\n' +
'    <pre><code># Ignore node_modules dependency folder\nnode_modules/\n\n# Ignore environment variable keys\n.env\n\n# Ignore system temporary files\n.DS_Store\nThumbs.db</code></pre>\n' +
'  </div>\n' +
'  <p><strong>Git Hooks</strong> are scripts placed inside <code>.git/hooks/</code> that trigger validations (like running linters or tests) before commit tasks execute.</p>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create a <code>.gitignore</code> file ignoring all files matching `.log` extensions, and confirm they do not show up when running <code>git status</code>.</div>\n' +
'</div>\n';

// ─── GENERATE FILES ──────────────────────────────────────────────────────────
console.log('Starting Git lesson generation...');

lessons.forEach((l, i) => {
  const prev = i > 0 ? lessons[i - 1] : null;
  const next = i < lessons.length - 1 ? lessons[i + 1] : null;
  const html = wrapPage(
    l.slug, l.title,
    L[l.slug] || '<p>Content coming soon.</p>',
    prev ? prev.filename : null, prev ? prev.title : null,
    next ? next.filename : null, next ? next.title : null
  );
  fs.writeFileSync(path.join(publicDir, l.filename), html, 'utf8');
  console.log('Generated:', l.filename);
});

// Index page
const indexContent =
'<h1 class="page-title">Git &amp; GitHub Tutorial &#8212; Complete Guide</h1>\n' +
'<div class="page-meta"><span class="badge">&#128187; Git</span><span class="badge">&#128994; Beginner to Advanced</span><span class="badge">&#128197; July 2026</span></div>\n' +
'<div class="intro-box"><p>Git is the universal standard version control system for software development. This 15-lesson tutorial takes you from setting up profiles, committing changes, and managing feature branches, to resolving merge conflicts, configuring secure SSH credentials, running interactive rebases, and managing team workflow conventions on GitHub.</p></div>\n' +
'<div class="section">\n  <div class="section-title"><span class="num">&#9658;</span> Course Curriculum</div>\n' +
'  <table class="tbl" style="margin-top:15px;">\n    <tr><th>Lesson</th><th>Topic</th></tr>\n' +
lessons.map(l => '    <tr><td><strong>Lesson ' + l.num + '</strong></td><td><a href="/' + l.filename + '"><strong>' + l.title + '</strong></a></td></tr>').join('\n') +
'\n  </table>\n</div>\n';

const indexHtml = wrapPage('home',
  'Git & GitHub Tutorial — Complete Beginner to Advanced Guide',
  indexContent, null, null, lessons[0].filename, lessons[0].title);

fs.writeFileSync(path.join(publicDir, 'blog-git.html'), indexHtml, 'utf8');
console.log('Generated: blog-git.html');
console.log('Done! All 15 Git lessons generated successfully.');
