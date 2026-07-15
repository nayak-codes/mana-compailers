/**
 * build_coming_soon_pages.js
 * Generates proper "Coming Soon" landing pages for every technology
 * in the navbar that doesn't yet have a full tutorial, and updates
 * update_topnav.js to point each link to its new page.
 */

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

// Technologies that already have full tutorials (skip them)
const alreadyDone = new Set([
  'python', 'java', 'javascript', 'c', 'cpp', 'csharp',
  'go', 'ruby', 'rust', 'php', 'html', 'css'
]);

// All remaining navbar items
const comingSoon = [
  { key: 'react',         name: 'React',          slug: 'blog-react',        icon: '⚛️',  color: '#61dafb', desc: 'A JavaScript library for building fast, component-based user interfaces.' },
  { key: 'angular',       name: 'Angular',         slug: 'blog-angular',      icon: '🅰️',  color: '#dd0031', desc: 'A powerful TypeScript-based framework for building enterprise-scale web applications.' },
  { key: 'vuejs',         name: 'Vue.js',          slug: 'blog-vue',          icon: '💚',  color: '#42b883', desc: 'A progressive JavaScript framework for building modern, reactive user interfaces.' },
  { key: 'nextjs',        name: 'Next.js',         slug: 'blog-nextjs',       icon: '▲',   color: '#ffffff', desc: 'The React framework for production — with SSR, SSG, API routes, and more.' },
  { key: 'nodejs',        name: 'Node.js',         slug: 'blog-nodejs',       icon: '🟢',  color: '#339933', desc: 'Run JavaScript on the server side — build APIs, tools, and scalable back-end services.' },
  { key: 'restapi',       name: 'REST API',        slug: 'blog-rest-api',     icon: '🔗',  color: '#f59e0b', desc: 'Design and consume RESTful APIs using HTTP methods, status codes, and JSON payloads.' },
  { key: 'graphql',       name: 'GraphQL',         slug: 'blog-graphql',      icon: '◈',   color: '#e10098', desc: 'A flexible query language for APIs — request exactly the data you need, nothing more.' },
  { key: 'springboot',    name: 'Spring Boot',     slug: 'blog-spring-boot',  icon: '🍃',  color: '#6db33f', desc: 'Build production-ready Java microservices and REST APIs with Spring Boot.' },
  { key: 'django',        name: 'Django',          slug: 'blog-django',       icon: '🎸',  color: '#092e20', desc: 'The high-level Python web framework that encourages rapid development and clean design.' },
  { key: 'flask',         name: 'Flask',           slug: 'blog-flask',        icon: '🌶️',  color: '#000000', desc: 'A lightweight WSGI Python micro-framework for building simple and powerful web apps.' },
  { key: 'expressjs',     name: 'Express.js',      slug: 'blog-express',      icon: '🚂',  color: '#ffffff', desc: 'Fast, unopinionated, minimalist web framework for Node.js.' },
  { key: 'postgresql',    name: 'PostgreSQL',      slug: 'blog-postgresql',   icon: '🐘',  color: '#336791', desc: 'The world\'s most advanced open source relational database system.' },
  { key: 'mysql',         name: 'MySQL',           slug: 'blog-mysql',        icon: '🐬',  color: '#00758f', desc: 'The world\'s most popular open source relational database — fast, reliable, scalable.' },
  { key: 'mongodb',       name: 'MongoDB',         slug: 'blog-mongodb',      icon: '🍃',  color: '#47a248', desc: 'A document-oriented NoSQL database designed for modern, scalable applications.' },
  { key: 'sqlite',        name: 'SQLite',          slug: 'blog-sqlite',       icon: '🪶',  color: '#003b57', desc: 'A self-contained, serverless SQL database engine — perfect for embedded and local apps.' },
  { key: 'redis',         name: 'Redis',           slug: 'blog-redis',        icon: '⚡',  color: '#dc382d', desc: 'An in-memory data structure store used as a database, cache, and message broker.' },
  { key: 'cassandra',     name: 'Cassandra',       slug: 'blog-cassandra',    icon: '👁️',  color: '#1287b1', desc: 'A distributed NoSQL database built for massive scalability and high availability.' },
  { key: 'aws',           name: 'AWS',             slug: 'blog-aws',          icon: '☁️',  color: '#ff9900', desc: 'Amazon Web Services — the world\'s most comprehensive and widely adopted cloud platform.' },
  { key: 'azure',         name: 'Azure',           slug: 'blog-azure',        icon: '☁️',  color: '#0078d4', desc: 'Microsoft\'s cloud platform — build, test, deploy, and manage applications globally.' },
  { key: 'gcloud',        name: 'Google Cloud',    slug: 'blog-gcloud',       icon: '☁️',  color: '#4285f4', desc: 'Google Cloud Platform — powerful infrastructure, AI, and data analytics at scale.' },
  { key: 'docker',        name: 'Docker',          slug: 'blog-docker',       icon: '🐳',  color: '#2496ed', desc: 'Package applications into containers for consistent environments across development and production.' },
  { key: 'kubernetes',    name: 'Kubernetes',      slug: 'blog-kubernetes',   icon: '☸️',  color: '#326ce5', desc: 'Orchestrate containerized applications at scale — deployments, scaling, and self-healing.' },
  { key: 'cicd',          name: 'CI/CD',           slug: 'blog-cicd',         icon: '🔄',  color: '#7c3aed', desc: 'Continuous Integration & Continuous Delivery — automate testing, building, and deployments.' },
  { key: 'datascience',   name: 'Data Science',    slug: 'blog-data-science', icon: '📊',  color: '#0ea5e9', desc: 'Extract insights from data using statistics, machine learning, and visualization tools.' },
  { key: 'ml',            name: 'Machine Learning',slug: 'blog-ml',           icon: '🤖',  color: '#8b5cf6', desc: 'Build systems that learn from data — regression, classification, clustering, and more.' },
  { key: 'deeplearning',  name: 'Deep Learning',   slug: 'blog-deep-learning',icon: '🧠',  color: '#ec4899', desc: 'Neural networks that power image recognition, NLP, and generative AI models.' },
  { key: 'tensorflow',    name: 'TensorFlow',      slug: 'blog-tensorflow',   icon: '🔶',  color: '#ff6f00', desc: 'Google\'s open-source machine learning framework for research and production.' },
  { key: 'pytorch',       name: 'PyTorch',         slug: 'blog-pytorch',      icon: '🔥',  color: '#ee4c2c', desc: 'Meta\'s dynamic deep learning framework — the research community\'s top choice.' },
  { key: 'bigdata',       name: 'Big Data',        slug: 'blog-big-data',     icon: '🌊',  color: '#06b6d4', desc: 'Process and analyze massive datasets using Hadoop, Spark, Kafka, and cloud pipelines.' },
  { key: 'git',           name: 'Git & GitHub',    slug: 'blog-git',          icon: '🐙',  color: '#f05032', desc: 'Version control with Git and collaboration workflows on GitHub — essential for every developer.' },
  { key: 'linux',         name: 'Linux',           slug: 'blog-linux',        icon: '🐧',  color: '#fcc624', desc: 'Master the Linux command line, file system, permissions, processes, and shell scripting.' },
  { key: 'shell',         name: 'Shell Scripting', slug: 'blog-shell',        icon: '💻',  color: '#4ade80', desc: 'Automate tasks with Bash scripts — loops, functions, pipelines, and cron jobs.' },
  { key: 'testing',       name: 'Testing',         slug: 'blog-testing',      icon: '🧪',  color: '#22c55e', desc: 'Unit tests, integration tests, E2E tests — write software you can actually trust.' },
  { key: 'agile',         name: 'Agile & Scrum',   slug: 'blog-agile',        icon: '🏃',  color: '#a78bfa', desc: 'Agile methodologies and Scrum framework for iterative, collaborative software development.' },
];

// Shared topnav (minimal version pointing to tutorials)
function buildTopnav(activeKey) {
  const allLinks = [
    { name: 'Python',        url: '/blog-python.html',     key: 'python' },
    { name: 'Java',          url: '/blog-java.html',        key: 'java' },
    { name: 'JavaScript',    url: '/blog-javascript.html',  key: 'javascript' },
    { name: 'C',             url: '/blog-c.html',           key: 'c' },
    { name: 'C++',           url: '/blog-cpp.html',         key: 'cpp' },
    { name: 'C#',            url: '/blog-csharp.html',      key: 'csharp' },
    { name: 'Go',            url: '/blog-go.html',          key: 'go' },
    { name: 'Ruby',          url: '/blog-ruby.html',        key: 'ruby' },
    { name: 'Rust',          url: '/blog-rust.html',        key: 'rust' },
    { name: 'PHP',           url: '/blog-php.html',         key: 'php' },
    { name: 'HTML',          url: '/blog-html.html',        key: 'html' },
    { name: 'CSS',           url: '/blog-css.html',         key: 'css' },
    ...comingSoon.map(t => ({ name: t.name, url: `/${t.slug}.html`, key: t.key })),
  ];

  let nav = '<nav class="topnav">\n';
  nav += '  <a href="/" class="brand">🖥️ Our Compiler</a>\n';
  allLinks.forEach(l => {
    const cls = l.key === activeKey ? ' class="active"' : '';
    nav += `  <a href="${l.url}"${cls}>${l.name}</a>\n`;
  });
  nav += '</nav>';
  return nav;
}

function buildPage(tech) {
  const nav = buildTopnav(tech.key);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${tech.name} Tutorial — Coming Soon | Our Compiler</title>
  <meta name="description" content="${tech.desc}" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <style>
    .cs-wrapper {
      min-height: calc(100vh - 48px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
    }
    .cs-card {
      background: var(--surface-2, #1e293b);
      border: 1px solid var(--border, rgba(255,255,255,0.08));
      border-radius: 24px;
      padding: 60px 48px;
      max-width: 680px;
      width: 100%;
      text-align: center;
      box-shadow: 0 24px 64px rgba(0,0,0,0.4);
      animation: fadeUp 0.6s ease both;
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .cs-icon {
      font-size: 64px;
      line-height: 1;
      margin-bottom: 20px;
      display: block;
    }
    .cs-title {
      font-size: 2.4rem;
      font-weight: 800;
      background: linear-gradient(135deg, #fff 0%, ${tech.color} 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 12px;
      letter-spacing: -0.02em;
    }
    .cs-subtitle {
      font-size: 1.05rem;
      color: #94a3b8;
      line-height: 1.7;
      margin-bottom: 36px;
      max-width: 520px;
      margin-left: auto;
      margin-right: auto;
    }
    .cs-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 9999px;
      padding: 8px 20px;
      font-size: 0.85rem;
      font-weight: 600;
      color: #cbd5e1;
      margin-bottom: 32px;
    }
    .cs-pulse {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #facc15;
      animation: pulse 1.4s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.4; transform: scale(0.7); }
    }
    .cs-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .cs-btn {
      display: inline-block;
      padding: 12px 28px;
      border-radius: 10px;
      font-size: 0.95rem;
      font-weight: 600;
      text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .cs-btn:hover { transform: translateY(-2px); }
    .cs-btn-primary {
      background: linear-gradient(135deg, ${tech.color}, ${tech.color}bb);
      color: #000;
      box-shadow: 0 4px 20px ${tech.color}44;
    }
    .cs-btn-secondary {
      background: rgba(255,255,255,0.07);
      color: #f1f5f9;
      border: 1px solid rgba(255,255,255,0.15);
    }
    .cs-topics {
      margin-top: 48px;
      text-align: left;
    }
    .cs-topics h3 {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #64748b;
      margin-bottom: 16px;
    }
    .cs-topics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 10px;
    }
    .cs-topic-item {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 0.82rem;
      color: #94a3b8;
    }
  </style>
  <script>
    (function() {
      const t = localStorage.getItem('theme') || 'dark';
      if (t === 'light') { document.documentElement.classList.add('light-theme'); document.addEventListener('DOMContentLoaded', () => document.body.classList.add('light-theme')); }
      window.addEventListener('DOMContentLoaded', () => {
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const btn = document.createElement('button');
          btn.style.cssText = 'margin-left:auto;flex-shrink:0;background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.25);border-radius:6px;padding:4px 10px;font-size:12px;font-weight:600;cursor:pointer;font-family:"Inter",sans-serif;transition:all .2s;white-space:nowrap;margin-right:12px;';
          const upd = () => { btn.innerHTML = document.body.classList.contains('light-theme') ? '🌙 Dark' : '☀️ Light'; };
          upd();
          btn.addEventListener('click', () => { document.body.classList.toggle('light-theme'); document.documentElement.classList.toggle('light-theme'); localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark'); upd(); });
          topnav.appendChild(btn);
        }
      });
    })();
  </script>
</head>
<body>
${nav}

<div class="cs-wrapper">
  <div class="cs-card">
    <span class="cs-icon">${tech.icon}</span>
    <h1 class="cs-title">${tech.name} Tutorial</h1>
    <p class="cs-subtitle">${tech.desc}</p>

    <div class="cs-badge">
      <span class="cs-pulse"></span>
      Tutorial in active development — coming soon!
    </div>

    <div class="cs-actions">
      <a href="/?lang=javascript" class="cs-btn cs-btn-primary">Try in Compiler</a>
      <a href="/blog.html" class="cs-btn cs-btn-secondary">Browse All Tutorials</a>
    </div>

    <div class="cs-topics">
      <h3>What you'll learn</h3>
      <div class="cs-topics-grid">
        ${getTopics(tech.key).map(t => `<div class="cs-topic-item">${t}</div>`).join('\n        ')}
      </div>
    </div>
  </div>
</div>
</body>
</html>`;
}

function getTopics(key) {
  const map = {
    react:        ['Components','JSX','Props & State','Hooks','Context API','React Router','useEffect','Forms','Testing','Deployment'],
    angular:      ['Modules','Components','Templates','Directives','Services','Dependency Injection','RxJS','Forms','Routing','CLI'],
    vuejs:        ['Vue Instance','Templates','Components','Props','Events','Vuex','Vue Router','Composition API','Directives','Pinia'],
    nextjs:       ['File-based Routing','SSR','SSG','ISR','API Routes','Image Optimization','Middleware','Auth.js','Deployment','App Router'],
    nodejs:       ['Event Loop','Modules','File System','HTTP Server','Express','Streams','Buffers','NPM','Async/Await','Clusters'],
    restapi:      ['HTTP Methods','Status Codes','Headers','JSON','Authentication','CRUD','Pagination','Versioning','Rate Limiting','OpenAPI'],
    graphql:      ['Schema','Queries','Mutations','Subscriptions','Resolvers','Apollo Server','Type Definitions','Fragments','Directives','Federation'],
    springboot:   ['Auto-configuration','Starters','REST Controllers','JPA','Security','Actuator','Testing','Profiles','Docker','Microservices'],
    django:       ['Models','Views','Templates','URLs','ORM','Admin','Forms','Auth','REST Framework','Deployment'],
    flask:        ['Routing','Templates','Blueprints','SQLAlchemy','Auth','REST API','Testing','CLI','Middleware','Deployment'],
    expressjs:    ['Routing','Middleware','Error Handling','Static Files','Template Engines','Auth','REST API','WebSockets','Testing','Security'],
    postgresql:   ['Tables','Queries','Indexes','Joins','Transactions','Stored Procedures','Views','JSON','Replication','Performance'],
    mysql:        ['DDL / DML','Joins','Indexes','Stored Procedures','Triggers','Transactions','Replication','JSON','Partitioning','Performance'],
    mongodb:      ['Documents','Collections','CRUD','Aggregation','Indexes','Schema Design','Atlas','Replica Sets','Sharding','Mongoose'],
    sqlite:       ['DDL / DML','Joins','Indexes','WAL Mode','FTS5','JSON1','Python Integration','Node.js','Backup','Optimization'],
    redis:        ['Strings','Hashes','Lists','Sets','Sorted Sets','Pub/Sub','Streams','Lua Scripts','Cluster','Caching Patterns'],
    cassandra:    ['Keyspaces','Tables','CQL','Partitions','Clustering','Replication','Consistency Levels','Tombstones','UDTs','Performance'],
    aws:          ['EC2','S3','Lambda','RDS','IAM','VPC','CloudFront','ECS','DynamoDB','CloudFormation'],
    azure:        ['VMs','Blob Storage','Functions','SQL DB','Active Directory','AKS','DevOps','Cosmos DB','API Management','Bicep'],
    gcloud:       ['Compute Engine','Cloud Storage','Cloud Functions','BigQuery','GKE','Cloud Run','Pub/Sub','IAM','Terraform','Vertex AI'],
    docker:       ['Images','Containers','Dockerfile','Volumes','Networks','Docker Compose','Registry','Multi-stage Builds','Security','Swarm'],
    kubernetes:   ['Pods','Deployments','Services','Ingress','ConfigMaps','Secrets','StatefulSets','HPA','Helm','RBAC'],
    cicd:         ['Git Branching','GitHub Actions','Jenkins','Pipelines','Docker Build','Testing Stages','Artifacts','Environments','Notifications','GitOps'],
    datascience:  ['NumPy','Pandas','Matplotlib','Seaborn','Statistics','Hypothesis Testing','Feature Engineering','Scikit-learn','Jupyter','Storytelling'],
    ml:           ['Regression','Classification','Clustering','Decision Trees','SVM','Ensemble Methods','Feature Selection','Model Evaluation','Pipelines','Scikit-learn'],
    deeplearning: ['Neural Nets','Backprop','CNNs','RNNs','LSTMs','Transformers','Transfer Learning','Regularization','Optimizers','GPUs'],
    tensorflow:   ['Tensors','Keras API','Model Training','Callbacks','Custom Layers','TF Datasets','SavedModel','TF Serving','TFLite','TF.js'],
    pytorch:      ['Tensors','Autograd','nn.Module','DataLoader','Optimizers','Training Loop','GPU','TorchVision','ONNX Export','PyTorch Lightning'],
    bigdata:      ['Hadoop','HDFS','MapReduce','Spark','Kafka','Hive','HBase','Flink','Data Lakes','Delta Lake'],
    git:          ['Init & Clone','Staging','Commits','Branches','Merging','Rebasing','Pull Requests','Tags','Git Flow','GitHub Actions'],
    linux:        ['File System','Permissions','Users','Processes','Networking','Cron','Package Managers','SSH','Systemd','Performance'],
    shell:        ['Variables','Conditionals','Loops','Functions','Arrays','String Ops','File Operations','Pipes','Regex','Cron'],
    testing:      ['Unit Tests','Integration Tests','E2E Tests','TDD','BDD','Mocking','Coverage','Jest','Playwright','CI Integration'],
    agile:        ['Sprints','User Stories','Backlog','Scrum Roles','Daily Standups','Sprint Review','Retrospective','Kanban','Velocity','SAFe'],
  };
  return map[key] || ['Fundamentals','Core Concepts','Best Practices','Real Projects','Interview Prep','Advanced Topics'];
}

// Build all pages
console.log('Generating Coming Soon landing pages...');
comingSoon.forEach(tech => {
  const html = buildPage(tech);
  const outPath = path.join(publicDir, `${tech.slug}.html`);
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`Generated: ${tech.slug}.html`);
});
console.log(`\n🎉 Generated ${comingSoon.length} Coming Soon pages!`);
console.log('Now update update_topnav.js to point all links to their pages...');

// ── Also patch update_topnav.js in place ──────────────────────────────────────
const topnavPath = path.join(__dirname, 'update_topnav.js');
let topnavSrc = fs.readFileSync(topnavPath, 'utf8');

// Replace each '#' entry with the real slug
const replacements = {
  "{ name: 'React', url: '#' }":          "{ name: 'React', url: '/blog-react.html', key: 'react' }",
  "{ name: 'Angular', url: '#' }":        "{ name: 'Angular', url: '/blog-angular.html', key: 'angular' }",
  "{ name: 'Vue.js', url: '#' }":         "{ name: 'Vue.js', url: '/blog-vue.html', key: 'vuejs' }",
  "{ name: 'Next.js', url: '#' }":        "{ name: 'Next.js', url: '/blog-nextjs.html', key: 'nextjs' }",
  "{ name: 'Node.js', url: '/?lang=nodejs' }": "{ name: 'Node.js', url: '/blog-nodejs.html', key: 'nodejs' }",
  "{ name: 'REST API', url: '#' }":       "{ name: 'REST API', url: '/blog-rest-api.html', key: 'restapi' }",
  "{ name: 'GraphQL', url: '#' }":        "{ name: 'GraphQL', url: '/blog-graphql.html', key: 'graphql' }",
  "{ name: 'Spring Boot', url: '#' }":    "{ name: 'Spring Boot', url: '/blog-spring-boot.html', key: 'springboot' }",
  "{ name: 'Django', url: '#' }":         "{ name: 'Django', url: '/blog-django.html', key: 'django' }",
  "{ name: 'Flask', url: '#' }":          "{ name: 'Flask', url: '/blog-flask.html', key: 'flask' }",
  "{ name: 'Express.js', url: '#' }":     "{ name: 'Express.js', url: '/blog-express.html', key: 'expressjs' }",
  "{ name: 'PostgreSQL', url: '#' }":     "{ name: 'PostgreSQL', url: '/blog-postgresql.html', key: 'postgresql' }",
  "{ name: 'MySQL', url: '#' }":          "{ name: 'MySQL', url: '/blog-mysql.html', key: 'mysql' }",
  "{ name: 'MongoDB', url: '#' }":        "{ name: 'MongoDB', url: '/blog-mongodb.html', key: 'mongodb' }",
  "{ name: 'SQLite', url: '#' }":         "{ name: 'SQLite', url: '/blog-sqlite.html', key: 'sqlite' }",
  "{ name: 'Redis', url: '#' }":          "{ name: 'Redis', url: '/blog-redis.html', key: 'redis' }",
  "{ name: 'Cassandra', url: '#' }":      "{ name: 'Cassandra', url: '/blog-cassandra.html', key: 'cassandra' }",
  "{ name: 'AWS', url: '#' }":            "{ name: 'AWS', url: '/blog-aws.html', key: 'aws' }",
  "{ name: 'Azure', url: '#' }":          "{ name: 'Azure', url: '/blog-azure.html', key: 'azure' }",
  "{ name: 'Google Cloud', url: '#' }":   "{ name: 'Google Cloud', url: '/blog-gcloud.html', key: 'gcloud' }",
  "{ name: 'Docker', url: '#' }":         "{ name: 'Docker', url: '/blog-docker.html', key: 'docker' }",
  "{ name: 'Kubernetes', url: '#' }":     "{ name: 'Kubernetes', url: '/blog-kubernetes.html', key: 'kubernetes' }",
  "{ name: 'CI/CD', url: '#' }":          "{ name: 'CI/CD', url: '/blog-cicd.html', key: 'cicd' }",
  "{ name: 'Data Science', url: '#' }":   "{ name: 'Data Science', url: '/blog-data-science.html', key: 'datascience' }",
  "{ name: 'Machine Learning', url: '#' }": "{ name: 'Machine Learning', url: '/blog-ml.html', key: 'ml' }",
  "{ name: 'Deep Learning', url: '#' }":  "{ name: 'Deep Learning', url: '/blog-deep-learning.html', key: 'deeplearning' }",
  "{ name: 'TensorFlow', url: '#' }":     "{ name: 'TensorFlow', url: '/blog-tensorflow.html', key: 'tensorflow' }",
  "{ name: 'PyTorch', url: '#' }":        "{ name: 'PyTorch', url: '/blog-pytorch.html', key: 'pytorch' }",
  "{ name: 'Big Data', url: '#' }":       "{ name: 'Big Data', url: '/blog-big-data.html', key: 'bigdata' }",
  "{ name: 'Git & GitHub', url: '#' }":   "{ name: 'Git & GitHub', url: '/blog-git.html', key: 'git' }",
  "{ name: 'Linux', url: '#' }":          "{ name: 'Linux', url: '/blog-linux.html', key: 'linux' }",
  "{ name: 'Shell Scripting', url: '#' }":"{ name: 'Shell Scripting', url: '/blog-shell.html', key: 'shell' }",
  "{ name: 'Testing', url: '#' }":        "{ name: 'Testing', url: '/blog-testing.html', key: 'testing' }",
  "{ name: 'Agile & Scrum', url: '#' }":  "{ name: 'Agile & Scrum', url: '/blog-agile.html', key: 'agile' }",
};

Object.entries(replacements).forEach(([from, to]) => {
  topnavSrc = topnavSrc.replaceAll(from, to);
});

// Also add active key detections at the bottom of the key detection block
const lastDetection = `  else if (lowercasePath.includes('blog-css')) activeKey = 'css';`;
const newDetections = comingSoon.map(t => `  else if (lowercasePath.includes('${t.slug}')) activeKey = '${t.key}';`).join('\n');
topnavSrc = topnavSrc.replace(lastDetection, lastDetection + '\n' + newDetections);

fs.writeFileSync(topnavPath, topnavSrc, 'utf8');
console.log('\n✅ Patched update_topnav.js — all links now point to real pages!');
