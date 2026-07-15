const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const angularBlogDir = path.join(publicDir, 'blog-angular');

// Ensure directory exists
if (!fs.existsSync(angularBlogDir)) {
  fs.mkdirSync(angularBlogDir, { recursive: true });
}

// Angular Curriculum
const lessons = [
  { slug: 'intro', num: 1, title: 'Introduction to Angular & CLI', filename: 'blog-angular/intro.html' },
  { slug: 'components', num: 2, title: 'Components & Metadata (@Component)', filename: 'blog-angular/components.html' },
  { slug: 'data-binding', num: 3, title: 'Data Binding & Interpolation', filename: 'blog-angular/data-binding.html' },
  { slug: 'directives', num: 4, title: 'Directives (*ngIf & *ngFor)', filename: 'blog-angular/directives.html' },
  { slug: 'communication', num: 5, title: 'Component Communication (@Input & @Output)', filename: 'blog-angular/communication.html' },
  { slug: 'lifecycle', num: 6, title: 'Component Lifecycle Hooks', filename: 'blog-angular/lifecycle.html' },
  { slug: 'services-di', num: 7, title: 'Services & Dependency Injection', filename: 'blog-angular/services-di.html' },
  { slug: 'rxjs-observables', num: 8, title: 'RxJS Basics & Observables', filename: 'blog-angular/rxjs-observables.html' },
  { slug: 'template-forms', num: 9, title: 'Template-Driven Forms', filename: 'blog-angular/template-forms.html' },
  { slug: 'reactive-forms', num: 10, title: 'Reactive Forms & FormBuilder', filename: 'blog-angular/reactive-forms.html' },
  { slug: 'routing', num: 11, title: 'Routing & Navigation', filename: 'blog-angular/routing.html' },
  { slug: 'route-guards', num: 12, title: 'Route Guards & Resolvers', filename: 'blog-angular/route-guards.html' },
  { slug: 'http-client', num: 13, title: 'HTTP Client & API Calls', filename: 'blog-angular/http-client.html' },
  { slug: 'content-projection', num: 14, title: 'Content Projection & Templates', filename: 'blog-angular/content-projection.html' },
  { slug: 'best-practices', num: 15, title: 'Angular Best Practices & Standalone Components', filename: 'blog-angular/best-practices.html' }
];

function getSidebar(activeSlug) {
  let html = `\n    <div class="sidebar-heading">Angular Tutorial</div>\n`;
  html += `    <a href="/blog-angular.html"${activeSlug === 'home' ? ' class="active"' : ''}>Angular HOME</a>\n`;
  
  lessons.forEach(l => {
    html += `    <a href="/${l.filename}"${activeSlug === l.slug ? ' class="active"' : ''}>${l.num}. ${l.title}</a>\n`;
  });

  html += `\n    <div class="sidebar-heading">Reference</div>\n`;
  html += `    <a href="/blog.html">All Tutorials</a>\n\n`;

  html += `    <div class="sidebar-heading">Other Frontend</div>\n`;
  html += `    <a href="/blog-react.html">React</a>\n`;
  html += `    <a href="/blog-vue.html">Vue.js</a>\n`;
  html += `    <a href="/blog-nextjs.html">Next.js</a>\n`;
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
    navFooter += `      <a href="/blog-angular.html" class="nav-btn">\n`;
    navFooter += `        <span class="label">← Angular Overview</span>\n`;
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
  <meta name="description" content="Learn Angular — ${title} with clear explanations, structured elements, interactive code snippets, and custom component challenges." />
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
<body class="lang-angular">

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
  <a href="/blog-angular.html" class="active">Angular</a>
  <a href="/blog-vue.html">Vue.js</a>
  <a href="/blog-nextjs.html">Next.js</a>
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
      <a href="/blog-angular.html">Angular</a><span>›</span>
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
<h1 class="page-title">Introduction to Angular & CLI</h1>
<div class="page-meta">
  <span class="badge">🅰️ Angular</span>
  <span class="badge">Lesson 1</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Angular is a comprehensive, TypeScript-based development platform and framework for building scalable web applications. Developed by Google, it provides a structured foundation containing dependency injection, routing, forms, and client-side templating out of the box.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Angular Architecture Overview</div>
  <p>Angular differs from libraries like React by being highly structured and opinionated. It is organized around the following key concepts:</p>
  <ul>
    <li><strong>Components</strong>: Define views, layout templates, and associated JavaScript controller logic.</li>
    <li><strong>Services</strong>: Hold application business logic that does not belong in views, sharing state across components.</li>
    <li><strong>Modules (NgModule) / Standalone Components</strong>: Compile units that group related components, directives, and pipes.</li>
    <li><strong>TypeScript</strong>: Out-of-the-box static typing, decorators, and modern JavaScript syntax support.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Installing the Angular CLI & Creating Projects</div>
  <p>The Angular CLI is the official command-line tool for initialization, generating files, building, and deploying Angular apps.</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Terminal — Angular CLI Usage</span>
    </div>
    <pre><code># 1. Install CLI globally
npm install -g @angular/cli

# 2. Initialize a new Angular workspace
ng new my-angular-app

# 3. Navigate into project
cd my-angular-app

# 4. Spin up development server
ng serve --open</code></pre>
  </div>
  <p>The <code>ng serve</code> command automatically compiles the project in memory, starts a local server (defaulting to <code>http://localhost:4200</code>), and watches files for changes, refreshing the browser page on updates.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Open your terminal, verify your Angular installation version using <code>ng version</code>, and list the key folder structures created inside a newly initialized workspace directory (like <code>src/app/</code>).
  </div>
</div>
`;

// Lesson 2
lessonContents['components'] = `
<h1 class="page-title">Components & Metadata (@Component)</h1>
<div class="page-meta">
  <span class="badge">🅰️ Angular</span>
  <span class="badge">Lesson 2</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Components are the primary building blocks of an Angular application. They consist of a TypeScript class, an HTML template, and CSS stylesheets, linked together using the <code>@Component</code> decorator.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Decoupled MVC Architecture</div>
  <p>The <code>@Component</code> decorator applies configurations to a class, turning it into a functional component:</p>
  <ul>
    <li><strong>selector</strong>: Custom CSS selector targeting where this component will be rendered in the DOM (e.g. <code>&lt;app-user&gt;&lt;/app-user&gt;</code>).</li>
    <li><strong>templateUrl / template</strong>: Links external HTML layouts or defines inline markup structures.</li>
    <li><strong>styleUrls / styles</strong>: Links external stylesheets or defines inline CSS selectors local to this component.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Declaring a Component Class</div>
  <p>Let's inspect a modern component written in TypeScript:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TypeScript — User Component</span>
    </div>
    <pre><code>import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  template: \`
    <div class="profile-card">
      <h2>{{ username }}</h2>
      <p>Status: {{ status }}</p>
    </div>
  \`,
  styles: [\`
    .profile-card { border: 1px solid #ddd; padding: 16px; border-radius: 8px; }
  \`]
})
export class UserProfileComponent {
  username: string = 'Balaji Nayak';
  status: string = 'Active';
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a new component class called <code>HeaderComponent</code> that defines a selector <code>app-header</code>, an inline template displaying a logo banner, and basic component styling.
  </div>
</div>
`;

// Lesson 3
lessonContents['data-binding'] = `
<h1 class="page-title">Data Binding & Interpolation</h1>
<div class="page-meta">
  <span class="badge">🅰️ Angular</span>
  <span class="badge">Lesson 3</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Data binding establishes communication flow between a component's TypeScript controller and its HTML template layout, enabling dynamic updates.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Four Types of Binding Flow</div>
  <p>Angular supports specific syntax pathways based on data flow directions:</p>
  <ul>
    <li><strong>Interpolation</strong>: Outputs data value strings into templates using double curly braces: <code>{{ expression }}</code>.</li>
    <li><strong>Property Binding</strong>: Binds variable expressions to DOM element attributes from controller to template: <code>[src]="imageUrl"</code>.</li>
    <li><strong>Event Binding</strong>: Listens for user interactions, running class methods from template to controller: <code>(click)="onSave()"</code>.</li>
    <li><strong>Two-Way Binding</strong>: Synchronizes values between view inputs and component variables instantly: <code>[(ngModel)]="username"</code>.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Data Binding Implementation</div>
  <p>Let's check these methods inside a single template block:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Angular Data Bindings</span>
    </div>
    <pre><code>&lt;!-- Interpolation --&gt;
&lt;h3&gt;Welcome, {{ user.name }}&lt;/h3&gt;

&lt;!-- Property Binding --&gt;
&lt;button [disabled]="isButtonDisabled"&gt;Action&lt;/button&gt;

&lt;!-- Event Binding --&gt;
&lt;button (click)="toggleState()"&gt;Toggle Status&lt;/button&gt;

&lt;!-- Two-way Binding (Requires FormsModule) --&gt;
&lt;input [(ngModel)]="user.name" placeholder="Edit name"&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a component class mapping a boolean flag. Render a button that toggles this flag value when clicked, and bind it to a text section showing "ON" or "OFF" dynamically.
  </div>
</div>
`;

// Lesson 4
lessonContents['directives'] = `
<h1 class="page-title">Directives (*ngIf & *ngFor)</h1>
<div class="page-meta">
  <span class="badge">🅰️ Angular</span>
  <span class="badge">Lesson 4</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Directives add custom behaviors to elements. Structural directives modify DOM layouts by adding or removing elements, while attribute directives change look behaviors.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Structural vs Attribute Directives</div>
  <p>Directives fall into three main categories:</p>
  <ul>
    <li><strong>Structural Directives</strong>: Demarcated with an asterisk (*). They dynamically alter the DOM structure (e.g. <code>*ngIf</code> for conditional renders, <code>*ngFor</code> for iterating items lists).</li>
    <li><strong>Attribute Directives</strong>: Modify look details or styles of an existing element (e.g. <code>[ngClass]</code>, <code>[ngStyle]</code>).</li>
    <li><strong>Custom Directives</strong>: Created with the <code>@Directive</code> decorator to add custom event listeners and styling directly to DOM nodes.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Listing items and conditionals in code</div>
  <p>Let's check structural loops and conditional directives:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Directives Example</span>
    </div>
    <pre><code>&lt;!-- Conditional rendering --&gt;
&lt;div *ngIf="items.length &gt; 0; else noItems"&gt;
  &lt;h4&gt;Active Inventory:&lt;/h4&gt;
  
  &lt;!-- List Iteration with index and trackBy --&gt;
  &lt;ul&gt;
    &lt;li *ngFor="let item of items; let idx = index; trackBy: trackById"
        [ngClass]="{'highlight': item.isFeatured}"&gt;
      {{ idx + 1 }}. {{ item.name }}
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;

&lt;ng-template #noItems&gt;
  &lt;p&gt;Inventory is currently empty.&lt;/p&gt;
&lt;/ng-template&gt;</code></pre>
  </div>
  <p>Using <code>trackBy</code> inside <code>*ngFor</code> optimizes performance by telling Angular how to track updates to specific items (typically by ID), preventing unnecessary re-renders of the entire list.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a component containing an array of task objects (each with a <code>name</code> and <code>completed</code> boolean flag). Loop through tasks, using <code>[ngStyle]</code> to display completed tasks in green with a line-through decoration.
  </div>
</div>
`;

// Lesson 5
lessonContents['communication'] = `
<h1 class="page-title">Component Communication (@Input & @Output)</h1>
<div class="page-meta">
  <span class="badge">🅰️ Angular</span>
  <span class="badge">Lesson 5</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Components often need to share data. In this lesson, we will look at passing data from parents to children using <code>@Input</code>, and triggering notifications upwards using <code>@Output</code> event emitters.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Unidirectional Data Flow Channels</div>
  <p>Angular components establish explicit boundaries:</p>
  <ul>
    <li><strong>@Input() Property decorator</strong>: Declares a property that a parent component can write data into (downwards flow).</li>
    <li><strong>@Output() Event emitter decorator</strong>: Declares an custom event that a child component can fire upwards, passing data to the parent's event handlers.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Child Emitter and Parent Listener setup</div>
  <p>Let's check how a child component emits events to its parent:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TypeScript — Child Component</span>
    </div>
    <pre><code>import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-card',
  template: \`
    <div class="item">
      <h3>{{ itemTitle }}</h3>
      <button (click)="selectItem()">Select This</button>
    </div>
  \`
})
export class ItemCardComponent {
  @Input() itemTitle: string = '';
  @Output() selected = new EventEmitter<string>();

  selectItem() {
    this.selected.emit(this.itemTitle);
  }
}</code></pre>
  </div>
  <p>The parent component binds to these decorators in its HTML template:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Parent Binding Template</span>
    </div>
    <pre><code>&lt;app-item-card 
  [itemTitle]="parentTitle" 
  (selected)="onItemSelect($event)"&gt;
&lt;/app-item-card&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Build a child component <code>CounterControlsComponent</code> that contains increment and decrement buttons, emitting values of <code>+1</code> or <code>-1</code> back to a parent count variable.
  </div>
</div>
`;

// Lesson 6
lessonContents['lifecycle'] = `
<h1 class="page-title">Component Lifecycle Hooks</h1>
<div class="page-meta">
  <span class="badge">🅰️ Angular</span>
  <span class="badge">Lesson 6</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Angular manages component lifecycles through built-in hooks, allowing you to run custom code when components are created, modified, or destroyed.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Core Hook Order</div>
  <p>The most important lifecycle hooks are run in a specific sequence:</p>
  <ul>
    <li><strong>ngOnChanges</strong>: Runs when input properties (@Input) are first initialized or updated.</li>
    <li><strong>ngOnInit</strong>: Runs once after input properties are first set. This is the best place to fetch data from services.</li>
    <li><strong>ngAfterViewInit</strong>: Runs after the component's view templates are fully initialized. Useful for direct DOM queries.</li>
    <li><strong>ngOnDestroy</strong>: Runs just before the component is destroyed. Critical for cleanups (unsubscribing from Observables, clearing intervals).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Implementing Lifecycle Interfaces</div>
  <p>To use these hooks, implement their respective TypeScript interfaces:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TypeScript — Component Lifecycle</span>
    </div>
    <pre><code>import { Component, OnInit, OnDestroy, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-tracker',
  template: \`<p>Tracking data updates...</p>\`
})
export class TrackerComponent implements OnChanges, OnInit, OnDestroy {
  @Input() dataId: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataId']) {
      console.log('dataId updated:', changes['dataId'].currentValue);
    }
  }

  ngOnInit() {
    console.log('Component initialized — fetch startup data here.');
  }

  ngOnDestroy() {
    console.log('Component destroyed — clear active listeners.');
  }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a component that starts a timer inside <code>ngOnInit</code> using <code>setInterval</code>. Ensure the timer is properly cleared in <code>ngOnDestroy</code> to prevent memory leaks.
  </div>
</div>
`;

// Lesson 7
lessonContents['services-di'] = `
<h1 class="page-title">Services & Dependency Injection</h1>
<div class="page-meta">
  <span class="badge">🅰️ Angular</span>
  <span class="badge">Lesson 7</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Services handle application business logic, while Dependency Injection (DI) manages how components receive these services, promoting clean, testable code.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Singleton patterns and local instances</div>
  <p>Angular's dependency injection system uses a tree structure:</p>
  <ul>
    <li><strong>providedIn: 'root'</strong>: Registers the service as a global singleton, meaning a single shared instance is used across the entire application.</li>
    <li><strong>Component-level providers</strong>: Registering a service in a component's <code>providers</code> array creates a new, local instance for that component and its children.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Creating and Injecting services</div>
  <p>Let's check how a data service is written and injected:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TypeScript — Log Service</span>
    </div>
    <pre><code>import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // singleton registration
})
export class LogService {
  private logs: string[] = [];

  addLog(msg: string) {
    this.logs.push(msg);
    console.log('[LOG SERVICE]:', msg);
  }

  getLogs() {
    return this.logs;
  }
}</code></pre>
  </div>
  <p>To use the service, inject it through a component's class constructor:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TypeScript — Injecting Service</span>
    </div>
    <pre><code>import { Component, OnInit } from '@angular/core';
import { LogService } from './log.service';

@Component({
  selector: 'app-dashboard',
  template: \`<p>Dashboard loaded. See console logs.</p>\`
})
export class DashboardComponent implements OnInit {
  // Service injection via constructor parameter
  constructor(private logger: LogService) {}

  ngOnInit() {
    this.logger.addLog('DashboardComponent initialized successfully.');
  }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a new service called <code>UserService</code> that stores a private list of users. Expose methods to fetch and add users, and inject it into a list component.
  </div>
</div>
`;

// Lesson 8
lessonContents['rxjs-observables'] = `
<h1 class="page-title">RxJS Basics & Observables</h1>
<div class="page-meta">
  <span class="badge">🅰️ Angular</span>
  <span class="badge">Lesson 8</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>RxJS is a library for reactive programming using Observables. Angular uses RxJS extensively to handle asynchronous events, HTTP calls, and route changes.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Observables vs Promises</div>
  <p>Unlike standard JavaScript Promises, RxJS Observables are highly flexible:</p>
  <ul>
    <li><strong>Multiple Emissions</strong>: Promises emit a single value and resolve once. Observables can emit multiple values over time.</li>
    <li><strong>Lazy Execution</strong>: Observables do not run until you call <code>subscribe()</code>.</li>
    <li><strong>Cancellable</strong>: You can cancel active asynchronous requests by calling <code>unsubscribe()</code>.</li>
    <li><strong>RxJS Operators</strong>: Provide powerful methods to transform, filter, and combine data streams (e.g. <code>map</code>, <code>filter</code>, <code>catchError</code>).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Managing Observable Subscriptions</div>
  <p>To display data from an Observable, you can either subscribe manually or use Angular's built-in **\`async\`** pipe:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TypeScript — Observable Handling</span>
    </div>
    <pre><code>import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ticker',
  template: \`<p>Ticks: {{ tickValue }}</p>\`
})
export class TickerComponent implements OnInit, OnDestroy {
  private sub: Subscription | null = null;
  tickValue: string = '';

  ngOnInit() {
    const customObservable = interval(1000).pipe(
      map(val => 'Seconds active: ' + val)
    );

    // Subscribe to start stream
    this.sub = customObservable.subscribe(msg => {
      this.tickValue = msg;
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Research Angular's <code>async</code> pipe. Write an explanation of how using it in your HTML template (e.g. <code>*ngIf="data$ | async"</code>) automatically handles subscription cleanups for you.
  </div>
</div>
`;

// Lesson 9
lessonContents['template-forms'] = `
<h1 class="page-title">Template-Driven Forms</h1>
<div class="page-meta">
  <span class="badge">🅰️ Angular</span>
  <span class="badge">Lesson 9</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Template-Driven forms build their form control models in the template layout using directive properties, making them simple to write and maintain.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> ngModel, ngForm and validation checks</div>
  <p>Template-driven forms rely on three core features:</p>
  <ul>
    <li><strong>ngModel</strong>: Binds individual form inputs to properties on your component class.</li>
    <li><strong>#myForm="ngForm"</strong>: Creates a local template reference variable mapping to Angular's form control object.</li>
    <li><strong>CSS validation states</strong>: Angular automatically applies classes like <code>ng-valid</code>, <code>ng-invalid</code>, <code>ng-dirty</code>, and <code>ng-touched</code>, allowing you to style invalid input fields dynamically.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Template-Driven Form Implementation</div>
  <p>Let's check how to build a basic form in HTML:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Template Form</span>
    </div>
    <pre><code>&lt;!-- #myForm exports ngForm instance --&gt;
&lt;form #myForm="ngForm" (ngSubmit)="onSubmit(myForm)"&gt;
  &lt;div&gt;
    &lt;label&gt;Email Address:&lt;/label&gt;
    &lt;input type="email" name="email" ngModel required #emailInput="ngModel"&gt;
    &lt;span *ngIf="emailInput.invalid && emailInput.touched" class="error"&gt;
      A valid email is required.
    &lt;/span&gt;
  &lt;/div&gt;

  &lt;button type="submit" [disabled]="myForm.invalid"&gt;Submit Form&lt;/button&gt;
&lt;/form&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Add a password input field to the form above. Apply validation rules (minimum length of 6 characters, required field), and display a warning if validation checks fail.
  </div>
</div>
`;

// Lesson 10
lessonContents['reactive-forms'] = `
<h1 class="page-title">Reactive Forms & FormBuilder</h1>
<div class="page-meta">
  <span class="badge">🅰️ Angular</span>
  <span class="badge">Lesson 10</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Reactive forms build explicit form control models in your component class, providing robust validation, easier testing, and real-time reactive features.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> FormGroup, FormControl and Validators</div>
  <p>Unlike template-driven forms, reactive forms define the form model programmatically:</p>
  <ul>
    <li><strong>FormControl</strong>: Tracks the value and validation status of an individual form input.</li>
    <li><strong>FormGroup</strong>: Groups related FormControls into a single object, tracking their collective validity.</li>
    <li><strong>Validators</strong>: Static helper functions used to check input validity (e.g. <code>Validators.required</code>, <code>Validators.email</code>, <code>Validators.pattern()</code>).</li>
    <li><strong>FormBuilder</strong>: A helper service that simplifies the syntax of creating large form groups.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Reactive Form Implementation</div>
  <p>Let's check how to construct a reactive form in TypeScript:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TypeScript — Reactive Form Setup</span>
    </div>
    <pre><code>import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Submitted Data:', this.registerForm.value);
    }
  }
}</code></pre>
  </div>
  <p>Bind this form model to your HTML template using the <code>formGroup</code> and <code>formControlName</code> directives:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Reactive Form Template</span>
    </div>
    <pre><code>&lt;form [formGroup]="registerForm" (ngSubmit)="onSubmit()"&gt;
  &lt;input formControlName="username" placeholder="Username"&gt;
  &lt;input formControlName="email" type="email" placeholder="Email"&gt;
  &lt;button type="submit" [disabled]="registerForm.invalid"&gt;Register&lt;/button&gt;
&lt;/form&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a custom validator function that checks if a user input does not contain the word "admin", and add it to the username input field.
  </div>
</div>
`;

// Lesson 11
lessonContents['routing'] = `
<h1 class="page-title">Routing & Navigation</h1>
<div class="page-meta">
  <span class="badge">🅰️ Angular</span>
  <span class="badge">Lesson 11</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Angular Router maps URL paths to component views, enabling multi-page navigation in single-page applications without full page reloads.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Routing Parameters and Routes Mapping</div>
  <p>Configuring routing requires setting up path routes mappings:</p>
  <ul>
    <li><strong>path</strong>: The URL path matched by the browser (e.g. <code>'users'</code> matches <code>/users</code>).</li>
    <li><strong>component</strong>: The view component template to render when the path is matched.</li>
    <li><strong>router-outlet</strong>: A placeholder tag telling the router where to render the matched component.</li>
    <li><strong>routerLink</strong>: Directive attribute used on anchors to navigate without refreshing: <code>routerLink="/users"</code>.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Defining routes configurations</div>
  <p>Let's check a standard routing configuration:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TypeScript — App Routing setup</span>
    </div>
    <pre><code>import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { UserDetailComponent } from './user-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/:id', component: UserDetailComponent }, // dynamic route parameter
  { path: '**', redirectTo: '' } // wildcard redirect
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}</code></pre>
  </div>
  <p>Access dynamic route parameters (like <code>:id</code>) inside components using the <code>ActivatedRoute</code> service:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TypeScript — Route parameters access</span>
    </div>
    <pre><code>import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  template: \`<p>Viewing profile ID: {{ userId }}</p>\`
})
export class UserDetailComponent implements OnInit {
  userId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Read route param parameter mapping
    this.userId = this.route.snapshot.paramMap.get('id');
  }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Add a navigation links bar with <code>routerLinkActive="active"</code> attributes on the anchors. Verify the active CSS class is applied when navigating to the corresponding route.
  </div>
</div>
`;

// Lesson 12
lessonContents['route-guards'] = `
<h1 class="page-title">Route Guards & Resolvers</h1>
<div class="page-meta">
  <span class="badge">🅰️ Angular</span>
  <span class="badge">Lesson 12</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Route guards protect views from unauthorized access, while Resolvers prefetch server data before views are loaded.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Routing guards types</div>
  <p>Angular provides specialized route guard interfaces:</p>
  <ul>
    <li><strong>CanActivate</strong>: Checks if a user has permission to navigate to a route (e.g. validating auth tokens).</li>
    <li><strong>CanDeactivate</strong>: Checks if a user can navigate away from a route (useful for warning users about unsaved form changes).</li>
    <li><strong>Resolve</strong>: Fetches API data in the background before rendering a component, preventing partially loaded views.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Writing a CanActivate Guard</div>
  <p>Let's check how an authentication guard is written in modern Angular:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TypeScript — Auth Guard</span>
    </div>
    <pre><code>import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('token');
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}</code></pre>
  </div>
  <p>Apply this guard to your routing configurations array:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TypeScript — Guard Configuration</span>
    </div>
    <pre><code>{ 
  path: 'admin-dashboard', 
  component: AdminDashboardComponent, 
  canActivate: [AuthGuard] 
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a mock <code>Resolver</code> service that simulates fetching database configurations (using <code>of()</code> with a 2-second delay) and binds it to a route path.
  </div>
</div>
`;

// Lesson 13
lessonContents['http-client'] = `
<h1 class="page-title">HTTP Client & API Calls</h1>
<div class="page-meta">
  <span class="badge">🅰️ Angular</span>
  <span class="badge">Lesson 13</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>The <code>HttpClient</code> service facilitates HTTP request communication with external API endpoints, returning RxJS Observables to handle responses.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> HttpClient methods and interceptors</div>
  <p>Key HTTP features in Angular include:</p>
  <ul>
    <li><strong>Typed Responses</strong>: Define request structures using TypeScript interfaces: <code>http.get&lt;User[]&gt;(...)</code>.</li>
    <li><strong>HTTP Interceptors</strong>: Intercept and modify outgoing requests or incoming responses globally (e.g. adding authorization headers, logging requests, handling global errors).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> HttpClient Integration Service</div>
  <p>Let's check how to make API calls in a service:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TypeScript — API Service</span>
    </div>
    <pre><code>import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a component that injects the <code>ApiService</code> above, calls <code>getUsers()</code>, and uses the <code>async</code> pipe in its HTML template to display the names of the fetched users.
  </div>
</div>
`;

// Lesson 14
lessonContents['content-projection'] = `
<h1 class="page-title">Content Projection & Templates</h1>
<div class="page-meta">
  <span class="badge">🅰️ Angular</span>
  <span class="badge">Lesson 14</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Content projection allows you to inject custom HTML content into component templates dynamically, enabling the creation of highly reusable UI layouts.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> ng-content projection selectors</div>
  <p>Angular provides specific features for projection layouts:</p>
  <ul>
    <li><strong>&lt;ng-content&gt;</strong>: A placeholder tag that injects content passed from parent components directly into the child template.</li>
    <li><strong>Select Projection</strong>: Projects specific content based on CSS selectors or element tags: <code>&lt;ng-content select=".card-body"&gt;&lt;/ng-content&gt;</code>.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Card Template Projection Setup</div>
  <p>Let's check how to build a flexible card component:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Card Template</span>
    </div>
    <pre><code><div class="card">
  <div class="card-header">
    &lt;!-- Project header contents --&gt;
    &lt;ng-content select="[card-header]"&gt;&lt;/ng-content&gt;
  </div>
  <div class="card-body">
    &lt;!-- Project default body contents --&gt;
    &lt;ng-content&gt;&lt;/ng-content&gt;
  </div>
</div></code></pre>
  </div>
  <p>Parents can project custom layouts into these placeholders:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Parent Usage Layout</span>
    </div>
    <pre><code>&lt;app-card&gt;
  &lt;h1 card-header&gt;Featured Article&lt;/h1&gt;
  &lt;p&gt;This body paragraph is projected into the default card body section.&lt;/p&gt;
&lt;/app-card&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a custom alert dialog box component that uses content projection to inject custom body message layouts, and style it with color schemes based on alert types.
  </div>
</div>
`;

// Lesson 15
lessonContents['best-practices'] = `
<h1 class="page-title">Angular Best Practices & Standalone Components</h1>
<div class="page-meta">
  <span class="badge">🅰️ Angular</span>
  <span class="badge">Lesson 15</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Writing clean, optimized Angular code ensures high performance, small bundle sizes, and maintainability. In this lesson, we will look at Angular best practices and standalone components.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> OnPush Change Detection and Standalone components</div>
  <p>Key optimizations for modern Angular include:</p>
  <ul>
    <li><strong>Standalone Components</strong>: Introduced in Angular 14+, standalone components eliminate the need for NgModules. They are self-contained and import their dependencies directly: <code>standalone: true</code>.</li>
    <li><strong>ChangeDetectionStrategy.OnPush</strong>: Optimizes performance by checking component templates for updates only when input values (@Input) change or events are fired, rather than running change detection globally.</li>
    <li><strong>Lazy Loading Components</strong>: Dynamically import routes in your routing configuration to reduce initial bundle size.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Writing a Standalone Component</div>
  <p>Let's check how to declare a standalone component using <code>OnPush</code> change detection:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TypeScript — Standalone Component</span>
    </div>
    <pre><code>import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true, // standalone declaration
  imports: [CommonModule], // imports dependencies directly
  template: \`<img *ngIf="src" [src]="src" alt="User avatar" class="avatar"&gt;\`,
  styles: [\`
    .avatar { border-radius: 50%; width: 48px; height: 48px; }
  \`],
  changeDetection: ChangeDetectionStrategy.OnPush // performance optimization
})
export class AvatarComponent {
  @Input() src: string = '';
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a routing configuration that lazy-loads a standalone dashboard component using the <code>loadComponent</code> property instead of <code>component</code>.
  </div>
</div>
`;

// Build lessons
console.log('Starting Angular lesson generation...');

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

// Generate main index page: blog-angular.html
const indexContent = `
<h1 class="page-title">Angular Programming Tutorial</h1>
<div class="page-meta">
  <span class="badge">🅰️ Angular</span>
  <span class="badge">🟢 Intermediate Friendly</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>Angular is a comprehensive web development framework designed to build robust single-page applications. In this comprehensive, 15-lesson course, you will learn component-based structures, TypeScript programming advantage, properties & events bindings, loops list rendering, child emitters triggers, component lifecycle hooks ordering, services injection singleton, RxJS observables stream mapping, reactive dynamic validation forms, route parameter navigation, route guards auth checks, HttpClient module requests, transclusion projection slots, change detection strategy OnPush, and modern standalone modules models.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">▶</span> Course Curriculum</div>
  <p>Choose a topic from the left sidebar or click a lesson below to start learning Angular:</p>
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
  'Angular Programming Tutorial & Reference Guide',
  indexContent,
  null,
  null,
  lessons[0].filename,
  lessons[0].title
);

fs.writeFileSync(path.join(publicDir, 'blog-angular.html'), outputIndexHtml, 'utf8');
console.log('Generated: blog-angular.html');
console.log('🎉 Successfully generated all 15 Angular tutorial files inside blog-angular/ folder!');
