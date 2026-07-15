const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const nextjsBlogDir = path.join(publicDir, 'blog-nextjs');

// Ensure directory exists
if (!fs.existsSync(nextjsBlogDir)) {
  fs.mkdirSync(nextjsBlogDir, { recursive: true });
}

// Next.js Curriculum
const lessons = [
  { slug: 'intro', num: 1, title: 'Introduction to Next.js & Setup', filename: 'blog-nextjs/intro.html' },
  { slug: 'routing', num: 2, title: 'App Router File-Based Routing', filename: 'blog-nextjs/routing.html' },
  { slug: 'server-client-components', num: 3, title: 'Server Components vs Client Components', filename: 'blog-nextjs/server-client-components.html' },
  { slug: 'data-fetching', num: 4, title: 'Data Fetching, Caching & Revalidation', filename: 'blog-nextjs/data-fetching.html' },
  { slug: 'ssg-static-exports', num: 5, title: 'Static Site Generation (SSG) & Static Exports', filename: 'blog-nextjs/ssg-static-exports.html' },
  { slug: 'server-actions', num: 6, title: 'Server Actions & Form Submissions', filename: 'blog-nextjs/server-actions.html' },
  { slug: 'navigation', num: 7, title: 'Next.js Routing Navigation (Link & useRouter)', filename: 'blog-nextjs/navigation.html' },
  { slug: 'image-optimization', num: 8, title: 'Optimizing Media: Image Component', filename: 'blog-nextjs/image-optimization.html' },
  { slug: 'fonts-scripts', num: 9, title: 'Optimizing Fonts & Scripts', filename: 'blog-nextjs/fonts-scripts.html' },
  { slug: 'dynamic-routes', num: 10, title: 'Dynamic Routing & Dynamic Params', filename: 'blog-nextjs/dynamic-routes.html' },
  { slug: 'route-handlers', num: 11, title: 'Route Handlers (API Routes)', filename: 'blog-nextjs/route-handlers.html' },
  { slug: 'middleware', num: 12, title: 'Next.js Middleware & Headers', filename: 'blog-nextjs/middleware.html' },
  { slug: 'metadata-seo', num: 13, title: 'Next.js Metadata & SEO', filename: 'blog-nextjs/metadata-seo.html' },
  { slug: 'error-loading-states', num: 14, title: 'Error Handling & Loading States', filename: 'blog-nextjs/error-loading-states.html' },
  { slug: 'production-deployment', num: 15, title: 'Production Builds & Vercel Deployment', filename: 'blog-nextjs/production-deployment.html' }
];

function getSidebar(activeSlug) {
  let html = `\n    <div class="sidebar-heading">Next.js Tutorial</div>\n`;
  html += `    <a href="/blog-nextjs.html"${activeSlug === 'home' ? ' class="active"' : ''}>Next.js HOME</a>\n`;
  
  lessons.forEach(l => {
    html += `    <a href="/${l.filename}"${activeSlug === l.slug ? ' class="active"' : ''}>${l.num}. ${l.title}</a>\n`;
  });

  html += `\n    <div class="sidebar-heading">Reference</div>\n`;
  html += `    <a href="/blog.html">All Tutorials</a>\n\n`;

  html += `    <div class="sidebar-heading">Other Frontend</div>\n`;
  html += `    <a href="/blog-react.html">React</a>\n`;
  html += `    <a href="/blog-vue.html">Vue.js</a>\n`;
  html += `    <a href="/blog-angular.html">Angular</a>\n`;
  html += `    <a href="/blog-javascript.html">JavaScript</a>\n`;
  html += `    <a href="/blog-html.html">HTML</a>\n`;
  html += `    <a href="/blog-css.html">CSS</a>\n`;
  
  return html;
}

function wrapPage(slug, title, mainContent, prevFile, prevTitle, nextFile, nextTitle) {
  let navFooter = `<div class="nav-footer">\n`;
  if (prevFile) {
    navFooter += `      <a href="/${prevFile}" class="nav-btn">\n`;
    navFooter += `        <span class="label">← Previous Lesson</span>\n`;
    navFooter += `        <span class="title">${prevTitle}</span>\n`;
    navFooter += `      </a>\n`;
  } else {
    navFooter += `      <a href="/blog-nextjs.html" class="nav-btn">\n`;
    navFooter += `        <span class="label">← Next.js Overview</span>\n`;
    navFooter += `        <span class="title">Course Index</span>\n`;
    navFooter += `      </a>\n`;
  }

  if (nextFile) {
    navFooter += `      <a href="/${nextFile}" class="nav-btn" style="text-align:right;">\n`;
    navFooter += `        <span class="label">Next Lesson →</span>\n`;
    navFooter += `        <span class="title">${nextTitle}</span>\n`;
    navFooter += `      </a>\n`;
  } else {
    navFooter += `      <a href="/blog.html" class="nav-btn" style="text-align:right;">\n`;
    navFooter += `        <span class="label">All Tutorials →</span>\n`;
    navFooter += `        <span class="title">Learning Hub</span>\n`;
    navFooter += `      </a>\n`;
  }
  navFooter += `    </div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Our Compiler</title>
  <meta name="description" content="Learn Next.js — ${title} with clear explanations, structured templates, interactive code snippets, and custom component challenges." />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  
  <!-- Blog Theme Switcher -->
  <script>
    (function() {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          document.body.classList.add('light-theme');
        });
      }
      window.addEventListener('DOMContentLoaded', () => {
        // Theme Toggle Button
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'blog-theme-toggle';
          toggleBtn.style.cssText = 'margin-left: auto; flex-shrink: 0; background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: "Inter", sans-serif; transition: all 0.2s; white-space: nowrap; margin-right: 12px;';
          toggleBtn.addEventListener('mouseenter', () => {
            toggleBtn.style.background = 'rgba(255, 255, 255, 0.25)';
            toggleBtn.style.borderColor = '#ffffff';
          });
          toggleBtn.addEventListener('mouseleave', () => {
            toggleBtn.style.background = 'rgba(255, 255, 255, 0.15)';
            toggleBtn.style.borderColor = 'rgba(255, 255, 255, 0.25)';
          });
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

        // Decorate Code Blocks (Copy Code)
        document.querySelectorAll('.code-block').forEach(block => {
          const header = block.querySelector('.code-block-header');
          const codeEl = block.querySelector('pre code');
          if (!header || !codeEl) return;

          // Find or create actions container inside header
          let actionsContainer = header.querySelector('.code-actions');
          if (!actionsContainer) {
            actionsContainer = document.createElement('div');
            actionsContainer.className = 'code-actions';
            actionsContainer.style.cssText = 'display: flex; gap: 8px; align-items: center; margin-left: auto;';
            header.appendChild(actionsContainer);
          }

          // Inject Copy Button
          const copyBtn = document.createElement('button');
          copyBtn.className = 'copy-btn';
          copyBtn.innerHTML = '📋 Copy';
          copyBtn.style.cssText = 'background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: "Inter", sans-serif; white-space: nowrap;';
          copyBtn.addEventListener('mouseenter', () => {
            copyBtn.style.background = 'rgba(255, 255, 255, 0.25)';
            copyBtn.style.borderColor = '#ffffff';
          });
          copyBtn.addEventListener('mouseleave', () => {
            copyBtn.style.background = 'rgba(255, 255, 255, 0.15)';
            copyBtn.style.borderColor = 'rgba(255, 255, 255, 0.25)';
          });
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(codeEl.textContent).then(() => {
              copyBtn.innerHTML = '✅ Copied!';
              setTimeout(() => {
                copyBtn.innerHTML = '📋 Copy';
              }, 2000);
            }).catch(err => {
              console.error('Failed to copy: ', err);
            });
          });
          actionsContainer.appendChild(copyBtn);
        });
      });
    })();
  </script>
</head>
<body class="lang-nextjs">

<!-- TOP LANGUAGE BAR -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-csharp.html">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-css.html">CSS</a>
  <a href="/blog-react.html">React</a>
  <a href="/blog-angular.html">Angular</a>
  <a href="/blog-vue.html">Vue.js</a>
  <a href="/blog-nextjs.html" class="active">Next.js</a>
  <a href="/blog-nodejs.html">Node.js</a>
  <a href="/blog-rest-api.html">REST API</a>
  <a href="/blog-graphql.html">GraphQL</a>
  <a href="/blog-spring-boot.html">Spring Boot</a>
  <a href="/blog-django.html">Django</a>
  <a href="/blog-flask.html">Flask</a>
  <a href="/blog-express.html">Express.js</a>
  <a href="/blog-postgresql.html">PostgreSQL</a>
  <a href="/blog-mysql.html">MySQL</a>
  <a href="/blog-mongodb.html">MongoDB</a>
  <a href="/blog-sqlite.html">SQLite</a>
  <a href="/blog-redis.html">Redis</a>
  <a href="/blog-cassandra.html">Cassandra</a>
  <a href="/blog-aws.html">AWS</a>
  <a href="/blog-azure.html">Azure</a>
  <a href="/blog-gcloud.html">Google Cloud</a>
  <a href="/blog-docker.html">Docker</a>
  <a href="/blog-kubernetes.html">Kubernetes</a>
  <a href="/blog-cicd.html">CI/CD</a>
  <a href="/blog-data-science.html">Data Science</a>
  <a href="/blog-ml.html">Machine Learning</a>
  <a href="/blog-deep-learning.html">Deep Learning</a>
  <a href="/blog-tensorflow.html">TensorFlow</a>
  <a href="/blog-pytorch.html">PyTorch</a>
  <a href="/blog-big-data.html">Big Data</a>
  <a href="/blog-git.html">Git &amp; GitHub</a>
  <a href="/blog-linux.html">Linux</a>
  <a href="/blog-shell.html">Shell Scripting</a>
  <a href="/blog-testing.html">Testing</a>
  <a href="/blog-agile.html">Agile &amp; Scrum</a>
</nav>

<div class="layout">
  <!-- LEFT SIDEBAR -->
  <aside class="sidebar">
    ${getSidebar(slug)}
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span>›</span>
      <a href="/blog.html">Tutorials</a><span>›</span>
      <a href="/blog-nextjs.html">Next.js</a><span>›</span>
      <span>Lesson ${slug === 'home' ? 'Index' : lessons.find(x => x.slug === slug).num}</span>
    </div>
    
    ${mainContent}
    
    ${navFooter}
  </main>
</div>
</body>
</html>`;
}

const lessonContents = {};

// Lesson 1
lessonContents['intro'] = `
<h1 class="page-title">Introduction to Next.js & Setup</h1>
<div class="page-meta">
  <span class="badge">▲ Next.js</span>
  <span class="badge">Lesson 1</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Next.js is a flexible React framework built by Vercel. It extends React's capabilities by providing out-of-the-box support for Server-Side Rendering (SSR), Static Site Generation (SSG), dynamic image loading, routing, and backend API routes.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> React vs Next.js: Why use a Framework?</div>
  <p>Standard React apps run client-side (Single Page Applications). This means the browser receives an empty HTML shell and uses JavaScript to build the view, which presents challenges for SEO crawlers and initial load performance.</p>
  <p>Next.js solves these issues by rendering pages on the server first, delivering fully populated HTML pages to users instantly:</p>
  <ul>
    <li><strong>Server-Side Rendering (SSR)</strong>: Renders pages dynamically on each request.</li>
    <li><strong>Static Site Generation (SSG)</strong>: Pre-renders pages at build time for fast, CDN-ready loading.</li>
    <li><strong>App Router</strong>: A modern file-system router with support for React Server Components.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Scaffolding with create-next-app</div>
  <p>Use the official Next.js CLI to initialize projects programmatically:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Terminal — Create Next.js App</span>
    </div>
    <pre><code># 1. Initialize project scaffold
npx create-next-app@latest my-next-app

# 2. Select setup preferences:
#    - TypeScript: Yes
#    - ESLint: Yes
#    - Tailwind CSS: Yes/No
#    - Src Directory: Yes
#    - App Router: Yes (Recommended)
#    - Import Alias: @/*

# 3. Navigate into folder
cd my-next-app

# 4. Start local development server
npm run dev</code></pre>
  </div>
  <p>The compiler runs the application locally on <code>http://localhost:3000</code>, watching files for updates.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Open your command prompt, initialize a new Next.js workspace, and identify the primary difference between the <code>pages/</code> routing model and the modern <code>app/</code> router directory layout.
  </div>
</div>
`;

// Lesson 2
lessonContents['routing'] = `
<h1 class="page-title">App Router File-Based Routing</h1>
<div class="page-meta">
  <span class="badge">▲ Next.js</span>
  <span class="badge">Lesson 2</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Next.js features a file-system based router built on the App Router model, where folder structures directly map URL routes and layouts.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Core Routing Components</div>
  <p>In Next.js, routes are defined by folder hierarchies, using specific reserved files to structure views:</p>
  <ul>
    <li><strong>page.js / page.tsx</strong>: Defines the unique UI rendered for a specific route. A folder must contain a <code>page.js</code> file to be publicly accessible.</li>
    <li><strong>layout.js / layout.tsx</strong>: Defines shared layouts across subroutes (e.g. Navbars, Sidebars), preserving state and avoiding re-renders on transitions.</li>
    <li><strong>Dynamic Routes ([id])</strong>: Folders wrapped in square brackets define dynamic parameters (e.g. <code>app/blog/[slug]/page.js</code> maps to <code>/blog/first-post</code>).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Defining Layouts and Pages in Code</div>
  <p>Let's check how layout templates wrap pages dynamically:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">React — app/layout.js</span>
    </div>
    <pre><code>// Root layout wraps all pages
export default function RootLayout({ children }) {
  return (
    &lt;html lang="en"&gt;
      &lt;body&gt;
        &lt;header&gt;
          &lt;nav&gt;Shared Navigation Header&lt;/nav&gt;
        &lt;/header&gt;
        &lt;main&gt;{{ children }}&lt;/main&gt;
        &lt;footer&gt;Shared Footer&lt;/footer&gt;
      &lt;/body&gt;
    &lt;/html&gt;
  );
}</code></pre>
  </div>
  <p>The content is projected into the root layout inside the <code>children</code> parameter dynamically.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Create a folder hierarchy inside your project called <code>app/dashboard/settings/</code>, add a <code>page.js</code> file returning a heading, and verify you can access it in the browser at <code>/dashboard/settings</code>.
  </div>
</div>
`;

// Lesson 3
lessonContents['server-client-components'] = `
<h1 class="page-title">Server Components vs Client Components</h1>
<div class="page-meta">
  <span class="badge">▲ Next.js</span>
  <span class="badge">Lesson 3</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Next.js divides components into two main categories: Server Components (rendered on the server for speed and SEO) and Client Components (rendered in the browser for interactivity).</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Rendering Boundaries Rules</div>
  <p>Choosing the correct component type optimizes application size and loading speed:</p>
  <ul>
    <li><strong>React Server Components (RSC)</strong>: The default in the App Router. They render entirely on the server, sending zero client-side JavaScript to the browser. This is ideal for SEO-rich pages, database queries, and static layouts.</li>
    <li><strong>Client Components ("use client")</strong>: Opt-in by adding the &#96;"use client"&#96; directive at the very top of the file. Required for components that use browser APIs, react state hooks (<code>useState</code>, <code>useEffect</code>), or event listeners (<code>onClick</code>).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Separating Component Scopes</div>
  <p>Let's check how to declare a client component with interactive state:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">React — Client Component</span>
    </div>
    <pre><code>"use client"; // Marks this file as a Client Component

import { useState } from 'react';

export default function CounterButton() {
  const [clicks, setClicks] = useState(0);

  return (
    &lt;button onClick={() =&gt; setClicks(clicks + 1)}&gt;
      Clicks Count: {{ clicks }}
    &lt;/button&gt;
  );
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write an explanation of why you should keep your Client Components as far down the component tree as possible (component colocation), and how this optimization reduces JavaScript bundle sizes.
  </div>
</div>
`;

// Lesson 4
lessonContents['data-fetching'] = `
<h1 class="page-title">Data Fetching, Caching & Revalidation</h1>
<div class="page-meta">
  <span class="badge">▲ Next.js</span>
  <span class="badge">Lesson 4</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Next.js extends the native <code>fetch</code> API, providing advanced features for caching, data revalidation, and asynchronous data fetching directly in Server Components.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Server Side Fetching and Caching</div>
  <p>Data fetching in Next.js is configured through specific fetch parameters:</p>
  <ul>
    <li><strong>Force Caching</strong>: Default behavior. Fetches data once at build time and caches it indefinitely for static loading.</li>
    <li><strong>No Store</strong>: Tells Next.js to bypass caching and fetch fresh data dynamically on every request: <code>cache: 'no-store'</code>.</li>
    <li><strong>Incremental Static Revalidation (ISR)</strong>: Revalidates cached data at specified time intervals: <code>next: { revalidate: 60 }</code> (revalidates every 60 seconds).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Async Fetching in Server Component</div>
  <p>Let's check how to fetch data directly inside an async Server Component:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">React — Server Fetch</span>
    </div>
    <pre><code>// Async component fetches data directly on the server
export default async function UserList() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    next: { revalidate: 3600 } // revalidate cache every hour
  });
  
  const users = await response.json();

  return (
    &lt;div&gt;
      &lt;h4&gt;Active System Users:&lt;/h4&gt;
      &lt;ul&gt;
        &lt;li v-for="user in users" :key="user.id"&gt;
          {{ user.name }} ({{ user.email }})
        &lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
  );
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a Server Component that uses <code>fetch</code> to call an API. Configure the request to disable caching completely (<code>cache: 'no-store'</code>), and display the fetched timestamp dynamically on each refresh.
  </div>
</div>
`;

// Lesson 5
lessonContents['ssg-static-exports'] = `
<h1 class="page-title">Static Site Generation (SSG) & Static Exports</h1>
<div class="page-meta">
  <span class="badge">▲ Next.js</span>
  <span class="badge">Lesson 5</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Static Site Generation (SSG) pre-renders pages at build time, optimizing load performance. Next.js also supports fully static exports, allowing projects to be hosted on simple static servers.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> generateStaticParams and output export</div>
  <p>Key concepts for static generation in Next.js include:</p>
  <ul>
    <li><strong>Static Pre-rendering</strong>: Renders pages to static HTML during the build process, reducing runtime server overhead.</li>
    <li><strong>generateStaticParams()</strong>: Used with dynamic routes to pre-generate paths at build time (e.g. generating static pages for a list of blog post IDs).</li>
    <li><strong>Static Exports</strong>: Generates static assets (HTML, CSS, JS) that can be hosted on any static hosting provider (e.g. Netlify, GitHub Pages) without needing a Node.js server.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Defining Dynamic Parameters in Code</div>
  <p>Let's check how to pre-render dynamic blog routes statically:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">React — generateStaticParams</span>
    </div>
    <pre><code>// Pre-generate dynamic routes at build time
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(res => res.json());

  // Return list of dynamic param values (e.g. [{ id: '1' }, { id: '2' }])
  return posts.map(post =&gt; ({
    id: post.id.toString()
  }));
}

export default function PostPage({ params }) {
  return (
    &lt;article&gt;
      &lt;h1&gt;Post ID: {{ params.id }}&lt;/h1&gt;
      &lt;p&gt;Pre-rendered static article page.&lt;/p&gt;
    &lt;/article&gt;
  );
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Research Next.js configuration settings. Update your <code>next.config.js</code> file to export static files by adding the line <code>output: 'export'</code>, and run <code>npm run build</code> to check the generated output.
  </div>
</div>
`;

// Lesson 6
lessonContents['server-actions'] = `
<h1 class="page-title">Server Actions & Form Submissions</h1>
<div class="page-meta">
  <span class="badge">▲ Next.js</span>
  <span class="badge">Lesson 6</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Server Actions are asynchronous functions that run on the server. They integrate directly with forms, allowing you to handle form submissions and database mutations without writing manual API routes.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> use server, progressive enhancement and client states</div>
  <p>Server Actions provide a seamless way to handle form submissions:</p>
  <ul>
    <li><strong>"use server" directive</strong>: Declares a function as a Server Action that runs exclusively on the server.</li>
    <li><strong>Progressive Enhancement</strong>: Forms can be submitted even if client-side JavaScript is not fully loaded or is disabled in the browser.</li>
    <li><strong>Form Validation & Revalidation</strong>: Revalidate cached data dynamically using <code>revalidatePath()</code> after database mutations.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Writing a Form Server Action</div>
  <p>Let's check how to define a Server Action and bind it to a form:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">React — Server Action</span>
    </div>
    <pre><code>// Import revalidation utility
import { revalidatePath } from 'next/cache';

export default function NewTaskForm() {
  // Define action inside component or separate action file
  async function addTask(formData) {
    "use server"; // marks function as running on the server

    const taskTitle = formData.get('title');
    console.log('Saving task to database:', taskTitle);

    // Revalidate index page cache dynamically
    revalidatePath('/');
  }

  return (
    &lt;form action={addTask}&gt;
      &lt;input name="title" placeholder="New Task Title" required&gt;
      &lt;button type="submit"&gt;Add Task&lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a form that captures a user email. Bind it to a Server Action, print the email value in the server terminal, and display a success status message in the browser.
  </div>
</div>
`;

// Lesson 7
lessonContents['navigation'] = `
<h1 class="page-title">Next.js Routing Navigation (Link & useRouter)</h1>
<div class="page-meta">
  <span class="badge">▲ Next.js</span>
  <span class="badge">Lesson 7</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Next.js provides dedicated features for client-side navigation, including the <code>&lt;Link&gt;</code> component and routing hooks for programmatic redirects.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Link component prefetching and useRouter hook</div>
  <p>Common navigation features in Next.js include:</p>
  <ul>
    <li><strong>&lt;Link&gt; Component</strong>: Extends standard HTML anchor tags (<code>&lt;a&gt;</code>) to prefetch linked page assets in the background, making page transitions nearly instantaneous.</li>
    <li><strong>useRouter Hook</strong>: Allows you to trigger route transitions programmatically inside Client Components (e.g. redirecting a user after a successful login).</li>
    <li><strong>usePathname Hook</strong>: Reads the current active URL path (useful for highlighting active links in a navigation menu).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Programmatic Navigation in Code</div>
  <p>Let's check how to use these navigation methods:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">React — Navigation Methods</span>
    </div>
    <pre><code>"use client";

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const currentPath = usePathname();

  function handleLogout() {
    console.log('Logging out user...');
    // Programmatic redirect to home page
    router.push('/login');
  }

  return (
    &lt;nav&gt;
      &lt;!-- Prefetching anchor --&gt;
      &lt;Link href="/dashboard" className={currentPath === '/dashboard' ? 'active' : ''}&gt;
        Dashboard
      &lt;/Link&gt;

      &lt;button onClick={handleLogout}&gt;Logout&lt;/button&gt;
    &lt;/nav&gt;
  );
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a component containing a back button (<code>&lt;button&gt;</code>) that redirects users to the previous page in their browser history using the <code>router.back()</code> method.
  </div>
</div>
`;

// Lesson 8
lessonContents['image-optimization'] = `
<h1 class="page-title">Optimizing Media: Image Component</h1>
<div class="page-meta">
  <span class="badge">▲ Next.js</span>
  <span class="badge">Lesson 8</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>The Next.js Image component (<code>next/image</code>) extends standard HTML image elements, automatically optimizing images to improve core web vitals.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Auto sizing, format compression and layout shifts</div>
  <p>Key optimizations provided by the Image component include:</p>
  <ul>
    <li><strong>Modern Format Compression</strong>: Automatically converts images to compressed formats (like WebP or AVIF) based on browser support.</li>
    <li><strong>Prevent Layout Shifts</strong>: Requires explicit width and height configurations to reserve layout space, preventing Cumulative Layout Shift (CLS) as images load.</li>
    <li><strong>Responsive Sizes</strong>: Uses the <code>sizes</code> attribute to serve appropriately sized images to different device screens.</li>
    <li><strong>Lazy Loading</strong>: Images are lazy-loaded by default, loading only when they enter the viewport.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Using the Image Component</div>
  <p>Let's check how to implement the Image component:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">React — Image Component</span>
    </div>
    <pre><code>import Image from 'next/image';

export default function Banner() {
  return (
    &lt;div class="banner-wrapper"&gt;
      &lt;!-- Optimized responsive image --&gt;
      &lt;Image 
        src="/assets/featured.jpg" 
        alt="Featured Product" 
        width={800} 
        height={400}
        priority // loads immediately without lazy-loading (useful for LCP images)
        sizes="(max-width: 768px) 100vw, 800px"
      /&gt;
    &lt;/div&gt;
  );
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a layout that uses an image with the <code>fill</code> attribute configuration. Explain why setting the parent container to <code>position: relative</code> is required when using this layout mode.
  </div>
</div>
`;

// Lesson 9
lessonContents['fonts-scripts'] = `
<h1 class="page-title">Optimizing Fonts & Scripts</h1>
<div class="page-meta">
  <span class="badge">▲ Next.js</span>
  <span class="badge">Lesson 9</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Next.js includes built-in loaders for optimizing third-party fonts and scripts, ensuring fast initial page loads and improving Core Web Vitals.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> next/font loading styles and next/script parameters</div>
  <p>Key features for managing fonts and scripts include:</p>
  <ul>
    <li><strong>next/font</strong>: Self-hosts Google Fonts locally during the build process. This prevents layout shifts and blocks external network requests for font assets, improving privacy and speed.</li>
    <li><strong>next/script</strong>: Optimizes loading strategies for third-party scripts (e.g. Google Analytics). Use the <code>strategy</code> attribute to control load timing (e.g. <code>beforeInteractive</code>, <code>afterInteractive</code>, <code>lazyOnload</code>).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Fonts and Scripts Implementation</div>
  <p>Let's check how to import and apply an optimized font:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">React — Font and Script Loading</span>
    </div>
    <pre><code>import { Inter } from 'next/font/google';
import Script from 'next/script';

// Configure font parameters
const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export default function Layout({ children }) {
  return (
    &lt;div className={inter.className}&gt;
      &lt;!-- Load analytics script lazily --&gt;
      &lt;Script 
        src="https://example.com/analytics.js" 
        strategy="lazyOnload"
        onLoad={() =&gt; console.log('Analytics loaded successfully.')}
      /&gt;
      {{ children }}
    &lt;/div&gt;
  );
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Configure a Google Font with custom weight parameters (e.g. <code>'400'</code>, <code>'700'</code>) using the <code>next/font/google</code> loader, and apply it to a heading element.
  </div>
</div>
`;

// Lesson 10
lessonContents['dynamic-routes'] = `
<h1 class="page-title">Dynamic Routing & Dynamic Params</h1>
<div class="page-meta">
  <span class="badge">▲ Next.js</span>
  <span class="badge">Lesson 10</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Dynamic routing maps variable URL parameters to page inputs, letting you render dynamic content like product pages or user profiles from a single layout template.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Query parameters, path dynamic mappings and params keys</div>
  <p>Dynamic routes map folders to matching parameters:</p>
  <ul>
    <li><strong>dynamic path param</strong>: Files like <code>app/product/[id]/page.js</code> map parameters to the <code>params</code> object (e.g. <code>/product/123</code> provides <code>params.id = '123'</code>).</li>
    <li><strong>searchParams</strong>: Optional query string parameters (e.g. <code>/search?q=query</code>) are passed to pages via the <code>searchParams</code> object.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Reading Dynamic Parameters in Code</div>
  <p>Let's check how to read URL parameters inside a page component:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">React — Reading params</span>
    </div>
    <pre><code>// Dynamic params parameters are injected directly into the Page props
export default function ProductDetailPage({ params, searchParams }) {
  const productId = params.id;
  const filterQuery = searchParams.filter; // reads ?filter=val query parameter

  return (
    &lt;div&gt;
      &lt;h3&gt;Viewing Product: {{ productId }}&lt;/h3&gt;
      &lt;p&gt;Active Filter: {{ filterQuery ?? 'None' }}&lt;/p&gt;
    &lt;/div&gt;
  );
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a dynamic route layout path representing a blog slug (e.g. <code>app/blog/[slug]/page.js</code>). Fetch the corresponding post contents from a mock JSON API using the dynamic parameter value.
  </div>
</div>
`;

// Lesson 11
lessonContents['route-handlers'] = `
<h1 class="page-title">Route Handlers (API Routes)</h1>
<div class="page-meta">
  <span class="badge">▲ Next.js</span>
  <span class="badge">Lesson 11</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Route Handlers allow you to create custom backend API endpoints, handling requests using standard HTTP methods and returning structured JSON payloads.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> route.js files and dynamic backend endpoints</div>
  <p>Writing custom API endpoints in Next.js is configured through specific naming conventions:</p>
  <ul>
    <li><strong>route.js / route.ts</strong>: Files containing request handlers. Like page files, they map directly to folder paths (e.g. <code>app/api/users/route.js</code> exposes <code>/api/users</code>).</li>
    <li><strong>Http methods handlers</strong>: Export functions named after HTTP methods (GET, POST, PUT, DELETE, PATCH).</li>
    <li><strong>NextResponse</strong>: Helper class extending standard Web Response objects, simplifying sending JSON payloads and headers.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Writing a Route Handler API</div>
  <p>Let's check how to write a GET/POST handler API endpoint:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TypeScript — app/api/users/route.js</span>
    </div>
    <pre><code>import { NextResponse } from 'next/server';

// Handle HTTP GET requests
export async function GET() {
  const users = [
    { id: 1, name: 'Balaji' },
    { id: 2, name: 'Nayak' }
  ];
  
  return NextResponse.json(users);
}

// Handle HTTP POST requests
export async function POST(request) {
  const body = await request.json();
  console.log('Received post payload:', body);

  return NextResponse.json({ 
    status: 'success', 
    received: body 
  }, { status: 201 });
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a dynamic route handler representing a delete endpoint (e.g. <code>app/api/tasks/[id]/route.js</code>). Read the dynamic ID parameter and log it in the console on a DELETE request.
  </div>
</div>
`;

// Lesson 12
lessonContents['middleware'] = `
<h1 class="page-title">Next.js Middleware & Headers</h1>
<div class="page-meta">
  <span class="badge">▲ Next.js</span>
  <span class="badge">Lesson 12</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Middleware intercepts incoming browser requests globally, allowing you to run security validations, redirects, and header modifications before routes render.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> middleware.js matching routes rules</div>
  <p>Key features of Next.js middleware include:</p>
  <ul>
    <li><strong>middleware.js</strong>: Exposes a global hook file at the root level of your project.</li>
    <li><strong>Matcher configurations</strong>: Match specific path routes using regex to run middleware only where required (e.g. protecting dashboard views while skipping public home routes).</li>
    <li><strong>Redirects / Rewrites</strong>: Dynamically redirect unauthorized requests to a login page, or rewrite URL paths in the background.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Writing a Middleware Interceptor</div>
  <p>Let's check how to write a route protector middleware script:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TypeScript — middleware.js</span>
    </div>
    <pre><code>import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('session_token')?.value;

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      // Redirect unauthorized users to login page
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Config limits middleware to specific paths
export const config = {
  matcher: ['/dashboard/:path*']
};</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a middleware function that appends a custom header (e.g. <code>'x-custom-request-id'</code>) to all incoming API requests and verify it using browser DevTools.
  </div>
</div>
`;

// Lesson 13
lessonContents['metadata-seo'] = `
<h1 class="page-title">Next.js Metadata & SEO</h1>
<div class="page-meta">
  <span class="badge">▲ Next.js</span>
  <span class="badge">Lesson 13</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Next.js includes a metadata API that dynamically updates page headers (titles, descriptions, keywords), helping search engine crawlers index views correctly.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Static and dynamic metadata variables</div>
  <p>Next.js supports two ways to configure page metadata:</p>
  <ul>
    <li><strong>Static Metadata</strong>: Export a static <code>metadata</code> object in your layout or page files for fast, simple header configurations.</li>
    <li><strong>Dynamic Metadata</strong>: Export a <code>generateMetadata()</code> function for dynamic route parameters (e.g. setting the page title to the name of a specific product).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Writing dynamic metadata configurations</div>
  <p>Let's check how to configure dynamic page titles and Open Graph fields:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">React — Metadata Setup</span>
    </div>
    <pre><code>// Static metadata example
export const metadata = {
  title: 'Home Page | Tech Portal',
  description: 'Welcome to the tech portal home page.'
};

// Dynamic metadata configuration
export async function generateMetadata({ params }) {
  const product = await fetch(\&#96;https://api.example.com/products/\${params.id}\&#96;).then(r => r.json());

  return {
    title: \&#96;\${product.name} | Tech Portal\&#96;,
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }]
    }
  };
}

export default function Page({ params }) {
  return &lt;h1&gt;Dynamic Metadata Page&lt;/h1&gt;;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Add a fallback metadata configuration inside your root layout component, and verify that subpages inherit these properties automatically.
  </div>
</div>
`;

// Lesson 14
lessonContents['error-loading-states'] = `
<h1 class="page-title">Error Handling & Loading States</h1>
<div class="page-meta">
  <span class="badge">▲ Next.js</span>
  <span class="badge">Lesson 14</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Next.js includes built-in support for rendering loading skeletons and catching runtime errors gracefully using specialized layout files.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> error.js reset actions and loading.js skeletons</div>
  <p>Managing view transitions and errors is simplified using these reserved files:</p>
  <ul>
    <li><strong>loading.js</strong>: Automatically wraps component routes in a React Suspense boundary, rendering fallback templates instantly while route data fetches.</li>
    <li><strong>error.js</strong>: Wraps routes in a React Error Boundary, catching runtime rendering errors gracefully and providing <code>reset()</code> functions to recover from errors.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Implementing a custom error page</div>
  <p>Let's check how to write a recovery error view component:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">React — error.js template</span>
    </div>
    <pre><code>"use client"; // Error components must be Client Components

import { useEffect } from 'react';

export default function ErrorBoundary({ error, reset }) {
  useEffect(() =&gt; {
    // Log error to server analytics
    console.error('Captured runtime error:', error);
  }, [error]);

  return (
    &lt;div class="error-panel"&gt;
      &lt;h3&gt;Oops, something went wrong!&lt;/h3&gt;
      &lt;button onClick={() =&gt; reset()}&gt;Try Again&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a custom <code>loading.js</code> file that renders a loading spinner layout or card skeleton templates for a dashboard view.
  </div>
</div>
`;

// Lesson 15
lessonContents['production-deployment'] = `
<h1 class="page-title">Production Builds & Vercel Deployment</h1>
<div class="page-meta">
  <span class="badge">▲ Next.js</span>
  <span class="badge">Lesson 15</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Building your Next.js application optimizes files for production, preparing assets for hosting on serverless platforms like Vercel.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> next build, production compile steps and deployment hosting</div>
  <p>Getting your app ready for users involves these compile stages:</p>
  <ul>
    <li><strong>Build Optimization (next build)</strong>: Compresses CSS, minifies JavaScript, bundles packages, and generates static HTML files, saving assets to the hidden <code>.next/</code> directory.</li>
    <li><strong>Vercel Integration</strong>: Next.js is optimized out-of-the-box for Vercel, featuring seamless support for serverless functions, globally cached static assets, and instant preview builds from GitHub.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Production Scripts</div>
  <p>Run these build scripts to compile and preview your production builds locally:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Terminal — Build Commands</span>
    </div>
    <pre><code># 1. Compile production build
npm run build

# 2. Start production server locally
npm run start</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Research Vercel deployments. Connect your GitHub repository to Vercel, trigger an automatic deployment build, and inspect the build output logs in the dashboard.
  </div>
</div>
`;

// Build lessons
console.log('Starting Next.js lesson generation...');

lessons.forEach((l, index) => {
  const prevLesson = index > 0 ? lessons[index - 1] : null;
  const nextLesson = index < lessons.length - 1 ? lessons[index + 1] : null;
  
  const prevFile = prevLesson ? prevLesson.filename : null;
  const prevTitle = prevLesson ? prevLesson.title : null;
  const nextFile = nextLesson ? nextLesson.filename : null;
  const nextTitle = nextLesson ? nextLesson.title : null;
  
  const contentHtml = lessonContents[l.slug];
  if (!contentHtml) {
    console.error(`Missing content for lesson: ${l.slug}`);
    return;
  }
  
  const outputHtml = wrapPage(
    l.slug,
    l.title,
    contentHtml,
    prevFile,
    prevTitle,
    nextFile,
    nextTitle
  );
  
  fs.writeFileSync(path.join(publicDir, l.filename), outputHtml, 'utf8');
  console.log(`Generated: ${l.filename}`);
});

// Generate main index page: blog-nextjs.html
const indexContent = `
<h1 class="page-title">Next.js Programming Tutorial</h1>
<div class="page-meta">
  <span class="badge">▲ Next.js</span>
  <span class="badge">🟢 Advanced Friendly</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>Next.js is the React framework built for production applications, enabling server-side rendering, static generation, and backend API routes. In this comprehensive, 15-lesson course, you will learn server rendering benefits setup, App Router directories file-system routing models, Server Components vs Client Components, server async fetch data query, dynamic routes SSG static exports, Server Actions forms mutations, route redirects navigation hooks, optimized Media components image layouts, next/font Google Fonts loader scripts, dynamic route searchParams query parsing, custom API route route.js GET/POST handlers, middleware request cookies validation, metadata search engine optimization header fields, custom error boundaries fallback loading states, and production builds command next build Vercel serverless deployments.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">▶</span> Course Curriculum</div>
  <p>Choose a topic from the left sidebar or click a lesson below to start learning Next.js:</p>
  <table class="tbl" style="margin-top: 15px;">
    <tr><th>Lesson</th><th>Topic</th></tr>
    ${lessons.map(l => `
      <tr>
        <td><strong>Lesson ${l.num}</strong></td>
        <td><strong><a href="/${l.filename}">${l.title}</a></strong></td>
      </tr>
    `).join('')}
  </table>
</div>
`;

const outputIndexHtml = wrapPage(
  'home',
  'Next.js Programming Tutorial & Reference Guide',
  indexContent,
  null,
  null,
  lessons[0].filename,
  lessons[0].title
);

fs.writeFileSync(path.join(publicDir, 'blog-nextjs.html'), outputIndexHtml, 'utf8');
console.log('Generated: blog-nextjs.html');
console.log('🎉 Successfully generated all 15 Next.js tutorial files inside blog-nextjs/ folder!');
