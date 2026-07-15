const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const blogDir = path.join(publicDir, 'blog-spring-boot');
if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

const lessons = [
  { slug: 'intro',          num: 1,  title: 'Introduction to Spring Boot',               filename: 'blog-spring-boot/intro.html' },
  { slug: 'project-setup',  num: 2,  title: 'Project Setup with Spring Initializr',      filename: 'blog-spring-boot/project-setup.html' },
  { slug: 'dependency-injection', num: 3, title: 'Dependency Injection & IoC Container', filename: 'blog-spring-boot/dependency-injection.html' },
  { slug: 'rest-controllers', num: 4, title: 'REST Controllers & Request Mapping',       filename: 'blog-spring-boot/rest-controllers.html' },
  { slug: 'jpa-hibernate',  num: 5,  title: 'Spring Data JPA & Hibernate',               filename: 'blog-spring-boot/jpa-hibernate.html' },
  { slug: 'repositories',   num: 6,  title: 'Repositories & CRUD Operations',            filename: 'blog-spring-boot/repositories.html' },
  { slug: 'service-layer',  num: 7,  title: 'Service Layer & Business Logic',            filename: 'blog-spring-boot/service-layer.html' },
  { slug: 'validation',     num: 8,  title: 'Validation & Exception Handling',           filename: 'blog-spring-boot/validation.html' },
  { slug: 'security',       num: 9,  title: 'Spring Security & JWT Auth',                filename: 'blog-spring-boot/security.html' },
  { slug: 'configuration',  num: 10, title: 'Configuration & Profiles',                  filename: 'blog-spring-boot/configuration.html' },
  { slug: 'actuator',       num: 11, title: 'Actuator & Monitoring',                     filename: 'blog-spring-boot/actuator.html' },
  { slug: 'testing',        num: 12, title: 'Testing Spring Boot Applications',           filename: 'blog-spring-boot/testing.html' },
  { slug: 'async-scheduling', num: 13, title: 'Async Tasks & Scheduling',               filename: 'blog-spring-boot/async-scheduling.html' },
  { slug: 'microservices',  num: 14, title: 'Microservices with Spring Cloud',           filename: 'blog-spring-boot/microservices.html' },
  { slug: 'deployment',     num: 15, title: 'Dockerizing & Deploying Spring Boot',       filename: 'blog-spring-boot/deployment.html' }
];

function getSidebar(activeSlug) {
  let h = '\n    <div class="sidebar-heading">Spring Boot Tutorial</div>\n';
  h += '    <a href="/blog-spring-boot.html"' + (activeSlug === 'home' ? ' class="active"' : '') + '>Spring Boot HOME</a>\n';
  lessons.forEach(l => {
    h += '    <a href="/' + l.filename + '"' + (activeSlug === l.slug ? ' class="active"' : '') + '>' + l.num + '. ' + l.title + '</a>\n';
  });
  h += '\n    <div class="sidebar-heading">Related Topics</div>\n';
  h += '    <a href="/blog-java.html">Java</a>\n';
  h += '    <a href="/blog-rest-api.html">REST API</a>\n';
  h += '    <a href="/blog-postgresql.html">PostgreSQL</a>\n';
  h += '    <a href="/blog-docker.html">Docker</a>\n';
  h += '    <a href="/blog-kubernetes.html">Kubernetes</a>\n';
  h += '    <a href="/blog.html">All Tutorials</a>\n';
  return h;
}

function wrapPage(slug, title, body, prevFile, prevTitle, nextFile, nextTitle) {
  let nav = '<div class="nav-footer">\n';
  if (prevFile) {
    nav += '      <a href="/' + prevFile + '" class="nav-btn"><span class="label">&#8592; Previous Lesson</span><span class="title">' + prevTitle + '</span></a>\n';
  } else {
    nav += '      <a href="/blog-spring-boot.html" class="nav-btn"><span class="label">&#8592; Spring Boot Overview</span><span class="title">Course Index</span></a>\n';
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
'  <a href="/blog-spring-boot.html" class="active">Spring Boot</a>\n' +
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
'  <a href="/blog-git.html">Git &amp; GitHub</a>\n' +
'  <a href="/blog-linux.html">Linux</a>\n' +
'  <a href="/blog-shell.html">Shell Scripting</a>\n' +
'  <a href="/blog-testing.html">Testing</a>\n' +
'  <a href="/blog-agile.html">Agile &amp; Scrum</a>\n';

  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n' +
'  <meta charset="UTF-8" />\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
'  <title>' + title + ' | Our Compiler</title>\n' +
'  <meta name="description" content="Learn Spring Boot — ' + title + ' with clear Java examples, annotations explained, and practical challenges." />\n' +
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
'<body class="lang-spring-boot">\n' +
'<nav class="topnav">\n' +
'  <a href="/" class="brand">&#128187; Our Compiler</a>\n' +
topnav +
'</nav>\n' +
'<div class="layout">\n' +
'  <aside class="sidebar">' + getSidebar(slug) + '  </aside>\n' +
'  <main class="content">\n' +
'    <div class="breadcrumb"><a href="/">Home</a><span>&#8250;</span><a href="/blog.html">Tutorials</a><span>&#8250;</span><a href="/blog-spring-boot.html">Spring Boot</a><span>&#8250;</span><span>Lesson ' + num + '</span></div>\n' +
'    ' + body + '\n' +
'    ' + nav + '\n' +
'  </main>\n</div>\n</body>\n</html>';
}

// ─── LESSON CONTENTS ─────────────────────────────────────────────────────────
const L = {};

L['intro'] =
'<h1 class="page-title">Introduction to Spring Boot</h1>\n' +
'<div class="page-meta"><span class="badge">&#127807; Spring Boot</span><span class="badge">Lesson 1</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p><strong>Spring Boot</strong> is an opinionated, convention-over-configuration framework built on top of the Spring Framework. It eliminates boilerplate configuration and lets you build production-ready Java applications in minutes, not days.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Why Spring Boot?</div>\n' +
'  <ul>\n' +
'    <li><strong>Auto-configuration</strong>: Spring Boot auto-configures beans based on the JARs present on your classpath. No XML required.</li>\n' +
'    <li><strong>Embedded Server</strong>: Ships with embedded Tomcat, Jetty, or Undertow — just run <code>java -jar app.jar</code>.</li>\n' +
'    <li><strong>Starter POMs</strong>: Curated dependency sets (<code>spring-boot-starter-web</code>, <code>spring-boot-starter-data-jpa</code>, etc.) that eliminate version conflicts.</li>\n' +
'    <li><strong>Actuator</strong>: Built-in production monitoring endpoints (/health, /metrics, /info).</li>\n' +
'    <li><strong>Spring Ecosystem</strong>: Seamlessly integrates with Spring Security, Spring Data, Spring Cloud, and more.</li>\n' +
'  </ul>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Your First Spring Boot Application</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; Main Application Class</span></div>\n' +
'    <pre><code>package com.example.demo;\n\nimport org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\nimport org.springframework.web.bind.annotation.GetMapping;\nimport org.springframework.web.bind.annotation.RestController;\n\n@SpringBootApplication  // Combines @Configuration + @EnableAutoConfiguration + @ComponentScan\n@RestController\npublic class DemoApplication {\n\n    public static void main(String[] args) {\n        SpringApplication.run(DemoApplication.class, args);\n        // Starts embedded Tomcat on port 8080\n    }\n\n    @GetMapping("/")\n    public String hello() {\n        return "Hello, Spring Boot!";\n    }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Spring Boot vs Plain Spring</div>\n' +
'  <table class="tbl">\n' +
'    <tr><th>Feature</th><th>Plain Spring</th><th>Spring Boot</th></tr>\n' +
'    <tr><td>Configuration</td><td>XML or Java @Configuration</td><td>Auto-configured, minimal setup</td></tr>\n' +
'    <tr><td>Web Server</td><td>External (deploy WAR)</td><td>Embedded (run JAR)</td></tr>\n' +
'    <tr><td>Dependencies</td><td>Manual, version-managed</td><td>Starters with BOM</td></tr>\n' +
'    <tr><td>Startup Time</td><td>Slow (heavy XML)</td><td>Fast (lazy init option)</td></tr>\n' +
'    <tr><td>Production Ready</td><td>Manual setup</td><td>Actuator built-in</td></tr>\n' +
'  </table>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">4</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create a Spring Boot app with two endpoints: <code>GET /ping</code> that returns <code>{"status":"ok","timestamp":"..."}</code> and <code>GET /version</code> that returns the app version from <code>application.properties</code>.</div>\n' +
'</div>\n';

L['project-setup'] =
'<h1 class="page-title">Project Setup with Spring Initializr</h1>\n' +
'<div class="page-meta"><span class="badge">&#127807; Spring Boot</span><span class="badge">Lesson 2</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p><strong>Spring Initializr</strong> at <code>start.spring.io</code> is the official project bootstrapper. It generates a ready-to-run Maven or Gradle project with your chosen dependencies in seconds.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Project Structure</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Standard Maven Project Layout</span></div>\n' +
'    <pre><code>my-api/\n  src/\n    main/\n      java/com/example/myapi/\n        MyApiApplication.java    # Entry point\n        controller/              # REST controllers\n        service/                 # Business logic\n        repository/              # Data access\n        model/                   # Entity classes\n        dto/                     # Data Transfer Objects\n        config/                  # Configuration classes\n        exception/               # Custom exceptions\n      resources/\n        application.properties   # Configuration\n        application-dev.properties\n        application-prod.properties\n    test/\n      java/com/example/myapi/   # Test classes\n  pom.xml                        # Maven dependencies</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> pom.xml — Essential Dependencies</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">XML &#8212; pom.xml</span></div>\n' +
'    <pre><code>&lt;parent&gt;\n  &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;\n  &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;\n  &lt;version&gt;3.3.0&lt;/version&gt;\n&lt;/parent&gt;\n\n&lt;dependencies&gt;\n  &lt;!-- Web MVC + Embedded Tomcat --&gt;\n  &lt;dependency&gt;\n    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;\n    &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;\n  &lt;/dependency&gt;\n\n  &lt;!-- Spring Data JPA + Hibernate --&gt;\n  &lt;dependency&gt;\n    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;\n    &lt;artifactId&gt;spring-boot-starter-data-jpa&lt;/artifactId&gt;\n  &lt;/dependency&gt;\n\n  &lt;!-- PostgreSQL Driver --&gt;\n  &lt;dependency&gt;\n    &lt;groupId&gt;org.postgresql&lt;/groupId&gt;\n    &lt;artifactId&gt;postgresql&lt;/artifactId&gt;\n    &lt;scope&gt;runtime&lt;/scope&gt;\n  &lt;/dependency&gt;\n\n  &lt;!-- Validation --&gt;\n  &lt;dependency&gt;\n    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;\n    &lt;artifactId&gt;spring-boot-starter-validation&lt;/artifactId&gt;\n  &lt;/dependency&gt;\n\n  &lt;!-- Lombok (reduces boilerplate) --&gt;\n  &lt;dependency&gt;\n    &lt;groupId&gt;org.projectlombok&lt;/groupId&gt;\n    &lt;artifactId&gt;lombok&lt;/artifactId&gt;\n    &lt;optional&gt;true&lt;/optional&gt;\n  &lt;/dependency&gt;\n\n  &lt;!-- Testing --&gt;\n  &lt;dependency&gt;\n    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;\n    &lt;artifactId&gt;spring-boot-starter-test&lt;/artifactId&gt;\n    &lt;scope&gt;test&lt;/scope&gt;\n  &lt;/dependency&gt;\n&lt;/dependencies&gt;</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> application.properties</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Properties &#8212; application.properties</span></div>\n' +
'    <pre><code># Server\nserver.port=8080\nspring.application.name=my-api\n\n# Database\nspring.datasource.url=jdbc:postgresql://localhost:5432/mydb\nspring.datasource.username=postgres\nspring.datasource.password=secret\nspring.datasource.driver-class-name=org.postgresql.Driver\n\n# JPA / Hibernate\nspring.jpa.hibernate.ddl-auto=update\nspring.jpa.show-sql=true\nspring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect\nspring.jpa.properties.hibernate.format_sql=true\n\n# Custom property\napp.version=1.0.0\napp.name=My Spring Boot API</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">4</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Use <code>start.spring.io</code> to generate a Spring Boot 3 project with Web, JPA, PostgreSQL, Validation, and Lombok. Import it into IntelliJ IDEA, run it, and confirm the embedded Tomcat starts on port 8080.</div>\n' +
'</div>\n';

L['dependency-injection'] =
'<h1 class="page-title">Dependency Injection &amp; IoC Container</h1>\n' +
'<div class="page-meta"><span class="badge">&#127807; Spring Boot</span><span class="badge">Lesson 3</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p><strong>Dependency Injection (DI)</strong> is the core of the Spring Framework. Instead of objects creating their own dependencies, Spring\'s IoC (Inversion of Control) container creates and injects them, making your code loosely coupled and easily testable.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Spring Beans &amp; Stereotypes</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; Spring Stereotype Annotations</span></div>\n' +
'    <pre><code>// @Component — generic Spring-managed bean\n@Component\npublic class EmailService {\n    public void send(String to, String subject) { /* ... */ }\n}\n\n// @Service — marks business logic layer\n@Service\npublic class UserService {\n    // Dependencies are injected, not new-ed up\n}\n\n// @Repository — marks data access layer, enables exception translation\n@Repository\npublic interface UserRepository extends JpaRepository&lt;User, Long&gt; {}\n\n// @Controller / @RestController — marks web layer\n@RestController\npublic class UserController {}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Constructor Injection (Recommended)</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; Constructor Injection with Lombok</span></div>\n' +
'    <pre><code>import lombok.RequiredArgsConstructor;\nimport org.springframework.stereotype.Service;\n\n@Service\n@RequiredArgsConstructor  // Lombok generates constructor for all final fields\npublic class UserService {\n\n    private final UserRepository userRepository;  // injected\n    private final EmailService   emailService;    // injected\n    private final PasswordEncoder passwordEncoder; // injected\n\n    public User createUser(CreateUserRequest req) {\n        String hash = passwordEncoder.encode(req.getPassword());\n        User user = new User(req.getName(), req.getEmail(), hash);\n        User saved = userRepository.save(user);\n        emailService.send(saved.getEmail(), "Welcome!");\n        return saved;\n    }\n}\n\n// Why constructor injection?\n// - Dependencies are explicit and mandatory\n// - Makes classes easily testable (just pass mocks to constructor)\n// - Works with final fields (immutable)\n// - No circular dependency surprises at runtime</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> @Bean &amp; @Configuration</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; Manual Bean Definition</span></div>\n' +
'    <pre><code>@Configuration  // This class provides bean definitions\npublic class AppConfig {\n\n    // Register a bean manually (useful for third-party classes)\n    @Bean\n    public PasswordEncoder passwordEncoder() {\n        return new BCryptPasswordEncoder(12);\n    }\n\n    @Bean\n    public ModelMapper modelMapper() {\n        return new ModelMapper();\n    }\n\n    // Profile-specific bean\n    @Bean\n    @Profile("dev")\n    public DataSource devDataSource() {\n        return new EmbeddedDatabaseBuilder()\n            .setType(EmbeddedDatabaseType.H2)\n            .build();\n    }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">4</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create a <code>NotificationService</code> interface with two implementations: <code>EmailNotificationService</code> and <code>SmsNotificationService</code>. Use <code>@Primary</code> on email and <code>@Qualifier</code> on SMS. Inject both into a controller and test that the correct one is used.</div>\n' +
'</div>\n';

L['rest-controllers'] =
'<h1 class="page-title">REST Controllers &amp; Request Mapping</h1>\n' +
'<div class="page-meta"><span class="badge">&#127807; Spring Boot</span><span class="badge">Lesson 4</span><span class="badge">Beginner</span></div>\n' +
'<div class="intro-box"><p>Spring Boot makes building REST APIs extremely concise with <code>@RestController</code> and mapping annotations. Controllers handle HTTP requests, delegate to services, and return JSON responses automatically via Jackson.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> REST Controller Anatomy</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; ProductController.java</span></div>\n' +
'    <pre><code>import org.springframework.http.HttpStatus;\nimport org.springframework.http.ResponseEntity;\nimport org.springframework.web.bind.annotation.*;\nimport lombok.RequiredArgsConstructor;\n\n@RestController                          // = @Controller + @ResponseBody\n@RequestMapping("/api/v1/products")      // Base path for all methods\n@RequiredArgsConstructor\npublic class ProductController {\n\n    private final ProductService productService;\n\n    // GET /api/v1/products?category=electronics&amp;page=0&amp;size=20\n    @GetMapping\n    public ResponseEntity&lt;Page&lt;ProductDto&gt;&gt; getAll(\n            @RequestParam(required = false) String category,\n            @RequestParam(defaultValue = "0") int page,\n            @RequestParam(defaultValue = "20") int size) {\n        return ResponseEntity.ok(productService.findAll(category, page, size));\n    }\n\n    // GET /api/v1/products/42\n    @GetMapping("/{id}")\n    public ResponseEntity&lt;ProductDto&gt; getById(@PathVariable Long id) {\n        return ResponseEntity.ok(productService.findById(id));\n    }\n\n    // POST /api/v1/products\n    @PostMapping\n    public ResponseEntity&lt;ProductDto&gt; create(\n            @RequestBody @Valid CreateProductRequest req) {\n        ProductDto created = productService.create(req);\n        return ResponseEntity.status(HttpStatus.CREATED).body(created);\n    }\n\n    // PATCH /api/v1/products/42\n    @PatchMapping("/{id}")\n    public ResponseEntity&lt;ProductDto&gt; update(\n            @PathVariable Long id,\n            @RequestBody @Valid UpdateProductRequest req) {\n        return ResponseEntity.ok(productService.update(id, req));\n    }\n\n    // DELETE /api/v1/products/42\n    @DeleteMapping("/{id}")\n    public ResponseEntity&lt;Void&gt; delete(@PathVariable Long id) {\n        productService.delete(id);\n        return ResponseEntity.noContent().build();  // 204 No Content\n    }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Request Parameter Types</div>\n' +
'  <table class="tbl">\n' +
'    <tr><th>Annotation</th><th>Source</th><th>Example</th></tr>\n' +
'    <tr><td><code>@PathVariable</code></td><td>URL path segment</td><td><code>/users/{id}</code></td></tr>\n' +
'    <tr><td><code>@RequestParam</code></td><td>Query string</td><td><code>/users?role=admin</code></td></tr>\n' +
'    <tr><td><code>@RequestBody</code></td><td>JSON request body</td><td>POST/PUT/PATCH body</td></tr>\n' +
'    <tr><td><code>@RequestHeader</code></td><td>HTTP header</td><td><code>Authorization: Bearer ...</code></td></tr>\n' +
'    <tr><td><code>@CookieValue</code></td><td>Cookie</td><td><code>Cookie: sessionId=abc</code></td></tr>\n' +
'  </table>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Build a <code>BookController</code> with full CRUD endpoints. Add a <code>GET /api/v1/books/search</code> endpoint that accepts <code>?title=spring&amp;author=Craig</code> query params and returns matching books. Return proper HTTP status codes for each operation.</div>\n' +
'</div>\n';

L['jpa-hibernate'] =
'<h1 class="page-title">Spring Data JPA &amp; Hibernate</h1>\n' +
'<div class="page-meta"><span class="badge">&#127807; Spring Boot</span><span class="badge">Lesson 5</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p><strong>Spring Data JPA</strong> drastically reduces the boilerplate of database access. Combined with <strong>Hibernate</strong> as the JPA provider, it maps Java objects to relational database tables using annotations.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Entity Class</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; User Entity</span></div>\n' +
'    <pre><code>import jakarta.persistence.*;\nimport lombok.*;\nimport java.time.LocalDateTime;\n\n@Entity\n@Table(name = "users",\n    uniqueConstraints = @UniqueConstraint(columnNames = "email"))\n@Getter @Setter @NoArgsConstructor\npublic class User {\n\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n\n    @Column(nullable = false, length = 100)\n    private String name;\n\n    @Column(nullable = false, unique = true)\n    private String email;\n\n    @Column(name = "password_hash", nullable = false)\n    private String passwordHash;\n\n    @Enumerated(EnumType.STRING)\n    @Column(nullable = false)\n    private Role role = Role.USER;\n\n    @Column(name = "is_active")\n    private boolean active = true;\n\n    @CreationTimestamp\n    @Column(name = "created_at", updatable = false)\n    private LocalDateTime createdAt;\n\n    @UpdateTimestamp\n    @Column(name = "updated_at")\n    private LocalDateTime updatedAt;\n\n    // One user has many posts\n    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, fetch = FetchType.LAZY)\n    private List&lt;Post&gt; posts = new ArrayList&lt;&gt;();\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> JPA Relationships</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; Relationship Annotations</span></div>\n' +
'    <pre><code">// @ManyToOne — Post belongs to a User\n@Entity\npublic class Post {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n\n    @ManyToOne(fetch = FetchType.LAZY)\n    @JoinColumn(name = "author_id", nullable = false)\n    private User author;\n\n    @ManyToMany\n    @JoinTable(\n        name = "post_tags",\n        joinColumns = @JoinColumn(name = "post_id"),\n        inverseJoinColumns = @JoinColumn(name = "tag_id")\n    )\n    private Set&lt;Tag&gt; tags = new HashSet&lt;&gt;();\n}\n\n// @OneToOne — User has one Profile\n@Entity\npublic class Profile {\n    @Id\n    private Long id;\n\n    @OneToOne(fetch = FetchType.LAZY)\n    @MapsId  // shares primary key with User\n    @JoinColumn(name = "id")\n    private User user;\n\n    private String bio;\n    private String avatarUrl;\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create a <code>Product</code> entity with fields: id, name, description, price (BigDecimal), stockQuantity, and a ManyToOne relationship to a <code>Category</code> entity. Enable Hibernate SQL logging and verify the generated DDL matches expectations.</div>\n' +
'</div>\n';

L['repositories'] =
'<h1 class="page-title">Repositories &amp; CRUD Operations</h1>\n' +
'<div class="page-meta"><span class="badge">&#127807; Spring Boot</span><span class="badge">Lesson 6</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Spring Data JPA repositories eliminate the need to write SQL for common operations. By extending <code>JpaRepository</code>, you get dozens of CRUD methods for free — plus the ability to derive queries from method names.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> JpaRepository Interface</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; UserRepository.java</span></div>\n' +
'    <pre><code>import org.springframework.data.jpa.repository.JpaRepository;\nimport org.springframework.data.jpa.repository.Query;\nimport org.springframework.data.repository.query.Param;\nimport java.util.Optional;\nimport java.util.List;\n\npublic interface UserRepository extends JpaRepository&lt;User, Long&gt; {\n\n    // --- Derived Query Methods (Spring generates SQL automatically) ---\n    Optional&lt;User&gt; findByEmail(String email);\n    boolean existsByEmail(String email);\n    List&lt;User&gt; findByRoleOrderByCreatedAtDesc(Role role);\n    List&lt;User&gt; findByNameContainingIgnoreCase(String name);\n    long countByActiveTrue();\n\n    // --- JPQL Query ---\n    @Query("SELECT u FROM User u WHERE u.active = true AND u.role = :role")\n    List&lt;User&gt; findActiveByRole(@Param("role") Role role);\n\n    // --- Native SQL Query ---\n    @Query(value = "SELECT * FROM users WHERE created_at &gt; NOW() - INTERVAL &#39;7 days&#39;,\n           nativeQuery = true)\n    List&lt;User&gt; findNewUsersThisWeek();\n\n    // --- Modifying Query ---\n    @Modifying\n    @Transactional\n    @Query("UPDATE User u SET u.active = false WHERE u.id = :id")\n    int deactivateUser(@Param("id") Long id);\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Pagination &amp; Sorting</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; Pageable &amp; Sorting</span></div>\n' +
'    <pre><code">// Repository — just extend JpaRepository, Pageable support is free\nPage&lt;User&gt; findByRole(Role role, Pageable pageable);\n\n// Service — build the Pageable\npublic Page&lt;UserDto&gt; getUsers(Role role, int page, int size, String sortBy) {\n    Pageable pageable = PageRequest.of(\n        page, size,\n        Sort.by(Sort.Direction.DESC, sortBy)\n    );\n    return userRepository.findByRole(role, pageable)\n                         .map(userMapper::toDto);\n}\n\n// Controller\n@GetMapping\npublic ResponseEntity&lt;Page&lt;UserDto&gt;&gt; getUsers(\n        @RequestParam(defaultValue = "USER") Role role,\n        @RequestParam(defaultValue = "0") int page,\n        @RequestParam(defaultValue = "20") int size,\n        @RequestParam(defaultValue = "createdAt") String sortBy) {\n    return ResponseEntity.ok(userService.getUsers(role, page, size, sortBy));\n}\n// GET /api/v1/users?role=ADMIN&amp;page=0&amp;size=10&amp;sortBy=name</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create a <code>ProductRepository</code> with: findByCategory, findByPriceBetween, findByNameContaining, a JPQL query for low-stock products (quantity below a threshold), and a native query for the top 5 most expensive products per category.</div>\n' +
'</div>\n';

L['service-layer'] =
'<h1 class="page-title">Service Layer &amp; Business Logic</h1>\n' +
'<div class="page-meta"><span class="badge">&#127807; Spring Boot</span><span class="badge">Lesson 7</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>The <strong>Service Layer</strong> sits between controllers and repositories. It contains all business logic, transaction management, and orchestration between multiple repositories. This separation keeps controllers thin and logic reusable.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Service Interface + Implementation</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; UserService Interface</span></div>\n' +
'    <pre><code">public interface UserService {\n    Page&lt;UserDto&gt;   findAll(int page, int size);\n    UserDto         findById(Long id);\n    UserDto         create(CreateUserRequest req);\n    UserDto         update(Long id, UpdateUserRequest req);\n    void            delete(Long id);\n    UserDto         findByEmail(String email);\n}</code></pre>\n' +
'  </div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; UserServiceImpl.java</span></div>\n' +
'    <pre><code">@Service\n@RequiredArgsConstructor\n@Transactional(readOnly = true)  // Default: read-only for all methods\npublic class UserServiceImpl implements UserService {\n\n    private final UserRepository  userRepository;\n    private final PasswordEncoder passwordEncoder;\n    private final UserMapper      userMapper;\n\n    @Override\n    public Page&lt;UserDto&gt; findAll(int page, int size) {\n        Pageable p = PageRequest.of(page, size, Sort.by("createdAt").descending());\n        return userRepository.findAll(p).map(userMapper::toDto);\n    }\n\n    @Override\n    public UserDto findById(Long id) {\n        return userRepository.findById(id)\n            .map(userMapper::toDto)\n            .orElseThrow(() -> new ResourceNotFoundException("User", id));\n    }\n\n    @Override\n    @Transactional  // Override: write transaction for this method\n    public UserDto create(CreateUserRequest req) {\n        if (userRepository.existsByEmail(req.getEmail())) {\n            throw new ConflictException("Email already registered: " + req.getEmail());\n        }\n        User user = userMapper.toEntity(req);\n        user.setPasswordHash(passwordEncoder.encode(req.getPassword()));\n        return userMapper.toDto(userRepository.save(user));\n    }\n\n    @Override\n    @Transactional\n    public void delete(Long id) {\n        User user = userRepository.findById(id)\n            .orElseThrow(() -> new ResourceNotFoundException("User", id));\n        userRepository.delete(user);\n    }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> DTO Pattern with MapStruct</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; UserMapper with MapStruct</span></div>\n' +
'    <pre><code>@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)\npublic interface UserMapper {\n\n    @Mapping(target = "passwordHash", ignore = true)\n    User toEntity(CreateUserRequest req);\n\n    @Mapping(source = "active", target = "isActive")\n    UserDto toDto(User user);\n\n    List&lt;UserDto&gt; toDtoList(List&lt;User&gt; users);\n}\n\n// UserDto.java (Lombok)\n@Data\n@Builder\npublic class UserDto {\n    private Long          id;\n    private String        name;\n    private String        email;\n    private Role          role;\n    private boolean       isActive;\n    private LocalDateTime createdAt;\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Build a <code>ProductService</code> that validates stock before allowing a purchase, updates the stock quantity atomically using <code>@Transactional</code>, and throws a custom <code>InsufficientStockException</code> if stock goes below zero.</div>\n' +
'</div>\n';

L['validation'] =
'<h1 class="page-title">Validation &amp; Exception Handling</h1>\n' +
'<div class="page-meta"><span class="badge">&#127807; Spring Boot</span><span class="badge">Lesson 8</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Spring Boot integrates with the Bean Validation API (JSR-380) via Hibernate Validator. Combined with a global <code>@ControllerAdvice</code> exception handler, you can produce consistent, informative error responses across your entire API.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Bean Validation Annotations</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; Request DTO with Validation</span></div>\n' +
'    <pre><code>import jakarta.validation.constraints.*;\nimport lombok.Data;\n\n@Data\npublic class CreateUserRequest {\n\n    @NotBlank(message = "Name is required")\n    @Size(min = 2, max = 100, message = "Name must be 2-100 characters")\n    private String name;\n\n    @NotBlank(message = "Email is required")\n    @Email(message = "Must be a valid email address")\n    private String email;\n\n    @NotBlank(message = "Password is required")\n    @Size(min = 8, message = "Password must be at least 8 characters")\n    @Pattern(regexp = ".*[A-Z].*", message = "Password must contain at least one uppercase letter")\n    private String password;\n\n    @Min(value = 0, message = "Age must be positive")\n    @Max(value = 120, message = "Age must be realistic")\n    private Integer age;\n\n    @NotNull(message = "Role is required")\n    private Role role;\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Global Exception Handler</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; GlobalExceptionHandler.java</span></div>\n' +
'    <pre><code">@RestControllerAdvice\npublic class GlobalExceptionHandler {\n\n    // Handle validation errors (400)\n    @ExceptionHandler(MethodArgumentNotValidException.class)\n    public ResponseEntity&lt;ErrorResponse&gt; handleValidation(MethodArgumentNotValidException ex) {\n        Map&lt;String, String&gt; fieldErrors = new LinkedHashMap&lt;&gt;();\n        ex.getBindingResult().getFieldErrors().forEach(err -&gt;\n            fieldErrors.put(err.getField(), err.getDefaultMessage())\n        );\n        return ResponseEntity.badRequest().body(\n            new ErrorResponse("VALIDATION_ERROR", "Input validation failed", fieldErrors)\n        );\n    }\n\n    // Handle not found (404)\n    @ExceptionHandler(ResourceNotFoundException.class)\n    public ResponseEntity&lt;ErrorResponse&gt; handleNotFound(ResourceNotFoundException ex) {\n        return ResponseEntity.status(HttpStatus.NOT_FOUND)\n            .body(new ErrorResponse("NOT_FOUND", ex.getMessage(), null));\n    }\n\n    // Handle conflict (409)\n    @ExceptionHandler(ConflictException.class)\n    public ResponseEntity&lt;ErrorResponse&gt; handleConflict(ConflictException ex) {\n        return ResponseEntity.status(HttpStatus.CONFLICT)\n            .body(new ErrorResponse("CONFLICT", ex.getMessage(), null));\n    }\n\n    // Catch-all (500)\n    @ExceptionHandler(Exception.class)\n    public ResponseEntity&lt;ErrorResponse&gt; handleGeneral(Exception ex) {\n        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)\n            .body(new ErrorResponse("INTERNAL_ERROR", "An unexpected error occurred", null));\n    }\n}\n\n// ErrorResponse DTO\n@Data @AllArgsConstructor\npublic class ErrorResponse {\n    private String              code;\n    private String              message;\n    private Map&lt;String, String&gt; fieldErrors;\n    private String              timestamp = Instant.now().toString();\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create a custom annotation <code>@UniqueEmail</code> using <code>ConstraintValidator</code> that checks the database to ensure the email doesn\'t already exist during registration. Apply it to the <code>CreateUserRequest.email</code> field.</div>\n' +
'</div>\n';

L['security'] =
'<h1 class="page-title">Spring Security &amp; JWT Auth</h1>\n' +
'<div class="page-meta"><span class="badge">&#127807; Spring Boot</span><span class="badge">Lesson 9</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p><strong>Spring Security</strong> is a powerful, highly customizable authentication and authorization framework. Combined with JWT (JSON Web Tokens), it enables stateless REST API security without sessions.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Security Configuration</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; SecurityConfig.java</span></div>\n' +
'    <pre><code">@Configuration\n@EnableWebSecurity\n@RequiredArgsConstructor\npublic class SecurityConfig {\n\n    private final JwtAuthFilter jwtAuthFilter;\n    private final UserDetailsService userDetailsService;\n\n    @Bean\n    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {\n        http\n            .csrf(AbstractHttpConfigurer::disable)  // Disabled for stateless APIs\n            .sessionManagement(s -&gt; s.sessionCreationPolicy(STATELESS))\n            .authorizeHttpRequests(auth -&gt; auth\n                // Public endpoints\n                .requestMatchers(POST, "/api/v1/auth/**").permitAll()\n                .requestMatchers(GET, "/api/v1/products/**").permitAll()\n                .requestMatchers("/actuator/health").permitAll()\n                // Protected endpoints\n                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")\n                .anyRequest().authenticated()\n            )\n            // Add JWT filter before username/password filter\n            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);\n        return http.build();\n    }\n\n    @Bean\n    public PasswordEncoder passwordEncoder() {\n        return new BCryptPasswordEncoder(12);\n    }\n\n    @Bean\n    public AuthenticationManager authManager(AuthenticationConfiguration config) throws Exception {\n        return config.getAuthenticationManager();\n    }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> JWT Filter &amp; Token Service</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; JwtAuthFilter.java</span></div>\n' +
'    <pre><code>@Component\n@RequiredArgsConstructor\npublic class JwtAuthFilter extends OncePerRequestFilter {\n\n    private final JwtService jwtService;\n    private final UserDetailsService userDetailsService;\n\n    @Override\n    protected void doFilterInternal(HttpServletRequest request,\n                                    HttpServletResponse response,\n                                    FilterChain filterChain) throws ServletException, IOException {\n        String authHeader = request.getHeader("Authorization");\n        if (authHeader == null || !authHeader.startsWith("Bearer ")) {\n            filterChain.doFilter(request, response);\n            return;\n        }\n\n        String jwt = authHeader.substring(7);\n        String username = jwtService.extractUsername(jwt);\n\n        if (username != null &amp;&amp; SecurityContextHolder.getContext().getAuthentication() == null) {\n            UserDetails user = userDetailsService.loadUserByUsername(username);\n            if (jwtService.isTokenValid(jwt, user)) {\n                UsernamePasswordAuthenticationToken authToken =\n                    new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());\n                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));\n                SecurityContextHolder.getContext().setAuthentication(authToken);\n            }\n        }\n        filterChain.doFilter(request, response);\n    }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Implement a complete auth flow: <code>POST /auth/register</code> creates a user and returns tokens, <code>POST /auth/login</code> validates credentials and returns access + refresh tokens, and <code>POST /auth/refresh</code> validates the refresh token and returns a new access token.</div>\n' +
'</div>\n';

L['configuration'] =
'<h1 class="page-title">Configuration &amp; Profiles</h1>\n' +
'<div class="page-meta"><span class="badge">&#127807; Spring Boot</span><span class="badge">Lesson 10</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p>Spring Boot\'s externalized configuration lets you manage settings for different environments (dev, test, prod) without changing code. <strong>@ConfigurationProperties</strong> provides a type-safe, IDE-friendly way to bind configuration values to Java objects.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> @ConfigurationProperties</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; AppProperties.java</span></div>\n' +
'    <pre><code">@ConfigurationProperties(prefix = "app")\n@Component\n@Validated\n@Data\npublic class AppProperties {\n\n    @NotBlank\n    private String name;\n\n    @NotBlank\n    private String version;\n\n    private Security security = new Security();\n    private Cors cors = new Cors();\n\n    @Data\n    public static class Security {\n        @NotBlank\n        private String jwtSecret;\n\n        @Positive\n        private long accessTokenExpiry  = 900;    // 15 minutes\n\n        @Positive\n        private long refreshTokenExpiry = 604800; // 7 days\n    }\n\n    @Data\n    public static class Cors {\n        private List&lt;String&gt; allowedOrigins = List.of("http://localhost:3000");\n        private List&lt;String&gt; allowedMethods = List.of("GET","POST","PUT","PATCH","DELETE");\n    }\n}</code></pre>\n' +
'  </div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">YAML &#8212; application.yml</span></div>\n' +
'    <pre><code">app:\n  name: My Spring API\n  version: 1.0.0\n  security:\n    jwt-secret: ${JWT_SECRET}   # Read from env variable\n    access-token-expiry: 900\n    refresh-token-expiry: 604800\n  cors:\n    allowed-origins:\n      - https://myapp.com\n      - https://admin.myapp.com</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Spring Profiles</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Profile-Specific Files</span></div>\n' +
'    <pre><code">resources/\n  application.yml           # Common config\n  application-dev.yml       # Dev overrides\n  application-prod.yml      # Prod overrides\n  application-test.yml      # Test overrides\n\n# Activate profile:\n# Via env: SPRING_PROFILES_ACTIVE=prod\n# Via CLI: java -jar app.jar --spring.profiles.active=prod\n# Via code: @ActiveProfiles("test") in tests</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create a <code>RateLimitProperties</code> configuration class with <code>prefix = "app.rate-limit"</code> containing <code>maxRequests</code>, <code>windowSeconds</code>, and a map of <code>endpointOverrides</code> (e.g., <code>auth: 10</code>). Wire it into a rate-limiting filter.</div>\n' +
'</div>\n';

L['actuator'] =
'<h1 class="page-title">Actuator &amp; Monitoring</h1>\n' +
'<div class="page-meta"><span class="badge">&#127807; Spring Boot</span><span class="badge">Lesson 11</span><span class="badge">Intermediate</span></div>\n' +
'<div class="intro-box"><p><strong>Spring Boot Actuator</strong> adds production-ready monitoring endpoints to your application with zero code. It exposes health checks, metrics, environment info, thread dumps, and more — integratable with Prometheus and Grafana.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Actuator Setup &amp; Endpoints</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">YAML &#8212; Actuator Configuration</span></div>\n' +
'    <pre><code">management:\n  endpoints:\n    web:\n      exposure:\n        include: health,info,metrics,prometheus,loggers,threaddump,env\n      base-path: /actuator\n  endpoint:\n    health:\n      show-details: when-authorized   # always | never | when-authorized\n  info:\n    env:\n      enabled: true\n\n# Info endpoint custom data\ninfo:\n  app:\n    name: ${spring.application.name}\n    version: ${app.version}\n    java-version: ${java.version}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Custom Health Indicator</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; Custom Health Check</span></div>\n' +
'    <pre><code">@Component\npublic class ExternalApiHealthIndicator implements HealthIndicator {\n\n    private final RestTemplate restTemplate;\n\n    @Override\n    public Health health() {\n        try {\n            ResponseEntity&lt;String&gt; response =\n                restTemplate.getForEntity("https://external-api.com/ping", String.class);\n\n            if (response.getStatusCode().is2xxSuccessful()) {\n                return Health.up()\n                    .withDetail("external-api", "Available")\n                    .withDetail("status", response.getStatusCode())\n                    .build();\n            }\n        } catch (Exception ex) {\n            return Health.down()\n                .withDetail("external-api", "Unavailable")\n                .withException(ex)\n                .build();\n        }\n        return Health.unknown().build();\n    }\n}\n\n// Result at GET /actuator/health:\n// {\n//   "status": "UP",\n//   "components": {\n//     "db": { "status": "UP" },\n//     "externalApi": { "status": "UP", "details": {...} }\n//   }\n// }</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Add <code>micrometer-registry-prometheus</code> to your project and configure Prometheus scraping at <code>/actuator/prometheus</code>. Create a custom counter metric that tracks the number of API requests per endpoint using <code>MeterRegistry</code>.</div>\n' +
'</div>\n';

L['testing'] =
'<h1 class="page-title">Testing Spring Boot Applications</h1>\n' +
'<div class="page-meta"><span class="badge">&#127807; Spring Boot</span><span class="badge">Lesson 12</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Spring Boot provides first-class testing support with <code>@SpringBootTest</code>, <code>@WebMvcTest</code>, <code>@DataJpaTest</code>, and Mockito. A solid test suite covers unit tests for services, slice tests for controllers, and integration tests with a real database.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Controller Slice Tests (@WebMvcTest)</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; UserControllerTest.java</span></div>\n' +
'    <pre><code>@WebMvcTest(UserController.class)  // Only loads web layer, not full context\nclass UserControllerTest {\n\n    @Autowired\n    private MockMvc mockMvc;\n\n    @MockBean\n    private UserService userService;\n\n    @Autowired\n    private ObjectMapper objectMapper;\n\n    @Test\n    void getUser_whenExists_returns200() throws Exception {\n        UserDto dto = new UserDto(1L, "Balaji", "b@test.com", Role.USER, true);\n        when(userService.findById(1L)).thenReturn(dto);\n\n        mockMvc.perform(get("/api/v1/users/1")\n                .header("Authorization", "Bearer " + validToken))\n            .andExpect(status().isOk())\n            .andExpect(jsonPath("$.name").value("Balaji"))\n            .andExpect(jsonPath("$.email").value("b@test.com"));\n    }\n\n    @Test\n    void createUser_withInvalidBody_returns400() throws Exception {\n        var req = new CreateUserRequest("", "not-an-email", "weak");\n\n        mockMvc.perform(post("/api/v1/users")\n                .contentType(MediaType.APPLICATION_JSON)\n                .content(objectMapper.writeValueAsString(req)))\n            .andExpect(status().isBadRequest())\n            .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"))\n            .andExpect(jsonPath("$.fieldErrors.name").exists())\n            .andExpect(jsonPath("$.fieldErrors.email").exists());\n    }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Repository Tests (@DataJpaTest)</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; UserRepositoryTest.java</span></div>\n' +
'    <pre><code">@DataJpaTest  // Uses in-memory H2, only loads JPA layer\n@AutoConfigureTestDatabase(replace = Replace.NONE)  // Use real PostgreSQL\nclass UserRepositoryTest {\n\n    @Autowired\n    private UserRepository userRepository;\n\n    @Autowired\n    private TestEntityManager em;\n\n    @Test\n    void findByEmail_whenExists_returnsUser() {\n        User user = new User("Balaji", "b@test.com", "hash", Role.USER);\n        em.persistAndFlush(user);\n\n        Optional&lt;User&gt; found = userRepository.findByEmail("b@test.com");\n\n        assertThat(found).isPresent();\n        assertThat(found.get().getName()).isEqualTo("Balaji");\n    }\n\n    @Test\n    void existsByEmail_whenNotExists_returnsFalse() {\n        assertThat(userRepository.existsByEmail("nobody@test.com")).isFalse();\n    }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Write a full integration test using <code>@SpringBootTest(webEnvironment = RANDOM_PORT)</code> and <code>TestRestTemplate</code> that registers a user, logs in to get a JWT, then uses it to call a protected endpoint. Use Testcontainers to spin up a real PostgreSQL container.</div>\n' +
'</div>\n';

L['async-scheduling'] =
'<h1 class="page-title">Async Tasks &amp; Scheduling</h1>\n' +
'<div class="page-meta"><span class="badge">&#127807; Spring Boot</span><span class="badge">Lesson 13</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>Spring Boot makes it trivial to run tasks asynchronously in a thread pool or schedule them on a cron-like schedule — without requiring external message queues for simple use cases.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> @Async — Non-Blocking Execution</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; Async Configuration &amp; Usage</span></div>\n' +
'    <pre><code">// Enable async support in your main app class or config\n@SpringBootApplication\n@EnableAsync\npublic class MyApp { public static void main(String[] args) { SpringApplication.run(MyApp.class, args); } }\n\n// Configure thread pool\n@Configuration\npublic class AsyncConfig implements AsyncConfigurer {\n    @Override\n    public Executor getAsyncExecutor() {\n        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();\n        executor.setCorePoolSize(4);\n        executor.setMaxPoolSize(10);\n        executor.setQueueCapacity(100);\n        executor.setThreadNamePrefix("async-task-");\n        executor.initialize();\n        return executor;\n    }\n}\n\n// Mark methods as async\n@Service\npublic class EmailService {\n\n    @Async  // Runs in a separate thread\n    public CompletableFuture&lt;Void&gt; sendWelcomeEmail(String to, String name) {\n        // Simulate slow email sending\n        Thread.sleep(2000);\n        System.out.println("Email sent to " + to);\n        return CompletableFuture.completedFuture(null);\n    }\n}\n\n// Controller doesn&#39;t wait for email\n@PostMapping\npublic ResponseEntity&lt;UserDto&gt; create(@RequestBody @Valid CreateUserRequest req) {\n    UserDto user = userService.create(req);\n    emailService.sendWelcomeEmail(user.getEmail(), user.getName()); // Fire and forget\n    return ResponseEntity.status(201).body(user);\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> @Scheduled — Cron Jobs</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; Scheduled Tasks</span></div>\n' +
'    <pre><code">@Component\n@EnableScheduling\npublic class ScheduledTasks {\n\n    // Fixed delay: 5 seconds AFTER last execution completes\n    @Scheduled(fixedDelay = 5000)\n    public void cleanupExpiredTokens() {\n        tokenRepository.deleteByExpiryBefore(Instant.now());\n        log.info("Expired tokens cleaned up");\n    }\n\n    // Fixed rate: every 60 seconds regardless of completion\n    @Scheduled(fixedRate = 60000)\n    public void syncExternalData() {\n        externalApiService.syncProducts();\n    }\n\n    // Cron expression: every day at 2:00 AM\n    @Scheduled(cron = "0 0 2 * * *")\n    public void generateDailyReport() {\n        reportService.generateAndEmail();\n    }\n\n    // Cron: every Monday at 9:00 AM (with timezone)\n    @Scheduled(cron = "0 0 9 * * MON", zone = "Asia/Kolkata")\n    public void weeklyNewsletter() {\n        newsletterService.sendToAllSubscribers();\n    }\n}</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Create a report generation service that runs every night at midnight (using <code>@Scheduled</code>), generates a sales summary CSV asynchronously (using <code>@Async</code> for the heavy computation), and emails it to admins when complete using <code>CompletableFuture.thenRun()</code>.</div>\n' +
'</div>\n';

L['microservices'] =
'<h1 class="page-title">Microservices with Spring Cloud</h1>\n' +
'<div class="page-meta"><span class="badge">&#127807; Spring Boot</span><span class="badge">Lesson 14</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p><strong>Spring Cloud</strong> extends Spring Boot with tools for distributed systems: service discovery (Eureka), client-side load balancing (Spring Cloud LoadBalancer), API gateway (Spring Cloud Gateway), and external configuration (Config Server).</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Service Discovery with Eureka</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; Eureka Server &amp; Client</span></div>\n' +
'    <pre><code">// --- EUREKA SERVER ---\n@SpringBootApplication\n@EnableEurekaServer\npublic class DiscoveryServer { public static void main(String[] args) { SpringApplication.run(DiscoveryServer.class, args); } }\n\n# application.yml (Eureka Server)\nserver.port: 8761\neureka.client.register-with-eureka: false\neureka.client.fetch-registry: false\n\n// --- MICROSERVICE CLIENT ---\n@SpringBootApplication\n@EnableDiscoveryClient\npublic class UserService { ... }\n\n# application.yml (Client)\nspring.application.name: user-service\neureka.client.service-url.default-zone: http://localhost:8761/eureka/</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Inter-Service Communication with OpenFeign</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Java &#8212; Feign Client</span></div>\n' +
'    <pre><code">// Declarative HTTP client — no RestTemplate boilerplate\n@FeignClient(name = "product-service")  // Name matches spring.application.name\npublic interface ProductClient {\n\n    @GetMapping("/api/v1/products/{id}")\n    ProductDto getProduct(@PathVariable Long id);\n\n    @GetMapping("/api/v1/products")\n    Page&lt;ProductDto&gt; getProducts(@RequestParam String category,\n                                  @RequestParam int page);\n}\n\n// Use in your service — Feign handles HTTP, load balancing, retries\n@Service\n@RequiredArgsConstructor\npublic class OrderService {\n    private final ProductClient productClient;\n\n    public Order createOrder(CreateOrderRequest req) {\n        ProductDto product = productClient.getProduct(req.getProductId());\n        // Build order using product data...\n    }\n}\n\n// Enable Feign in main app:\n@SpringBootApplication\n@EnableFeignClients\npublic class OrderServiceApp { ... }</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Build a mini microservices system with three services: <code>user-service</code>, <code>product-service</code>, and <code>order-service</code>. The order-service should use Feign to call both user-service and product-service. Register all three with Eureka and route external traffic through a Spring Cloud Gateway.</div>\n' +
'</div>\n';

L['deployment'] =
'<h1 class="page-title">Dockerizing &amp; Deploying Spring Boot</h1>\n' +
'<div class="page-meta"><span class="badge">&#127807; Spring Boot</span><span class="badge">Lesson 15</span><span class="badge">Advanced</span></div>\n' +
'<div class="intro-box"><p>The final step is getting your Spring Boot application into production. This lesson covers building optimized Docker images with layered JARs, deploying with Docker Compose, and publishing to cloud platforms.</p></div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">1</span> Layered JAR Dockerfile</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Dockerfile &#8212; Optimized Multi-Stage Build</span></div>\n' +
'    <pre><code"># Stage 1: Extract layers from the Spring Boot fat JAR\nFROM eclipse-temurin:21-jre-alpine AS builder\nWORKDIR /app\nCOPY target/*.jar app.jar\nRUN java -Djarmode=layertools -jar app.jar extract\n\n# Stage 2: Final minimal image\nFROM eclipse-temurin:21-jre-alpine\n\n# Security: run as non-root\nRUN addgroup -S spring &amp;&amp; adduser -S spring -G spring\nUSER spring:spring\n\nWORKDIR /app\n\n# Copy layers in order of least-to-most frequently changing\n# (maximizes Docker cache reuse)\nCOPY --from=builder /app/dependencies/           ./\nCOPY --from=builder /app/spring-boot-loader/     ./\nCOPY --from=builder /app/snapshot-dependencies/  ./\nCOPY --from=builder /app/application/            ./\n\nEXPOSE 8080\n\nHEALTHCHECK --interval=30s --timeout=3s \\\n  CMD wget -qO- http://localhost:8080/actuator/health || exit 1\n\nENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">2</span> Docker Compose</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">YAML &#8212; docker-compose.yml</span></div>\n' +
'    <pre><code">version: "3.9"\nservices:\n  api:\n    build: .\n    ports: ["8080:8080"]\n    environment:\n      SPRING_PROFILES_ACTIVE: prod\n      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/mydb\n      SPRING_DATASOURCE_USERNAME: postgres\n      SPRING_DATASOURCE_PASSWORD: ${DB_PASSWORD}\n      APP_SECURITY_JWT_SECRET: ${JWT_SECRET}\n    depends_on:\n      postgres:\n        condition: service_healthy\n    restart: unless-stopped\n\n  postgres:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_DB: mydb\n      POSTGRES_USER: postgres\n      POSTGRES_PASSWORD: ${DB_PASSWORD}\n    volumes:\n      - pg_data:/var/lib/postgresql/data\n    healthcheck:\n      test: ["CMD-SHELL", "pg_isready -U postgres"]\n      interval: 10s\n      timeout: 5s\n      retries: 5\n\nvolumes:\n  pg_data:</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">3</span> Build &amp; Run Commands</div>\n' +
'  <div class="code-block">\n' +
'    <div class="code-block-header"><span class="lang-tag">Shell &#8212; Build &amp; Deploy</span></div>\n' +
'    <pre><code"># Build JAR\nmvn clean package -DskipTests\n\n# Build Docker image\ndocker build -t my-api:1.0.0 .\n\n# Run with Docker Compose\ndocker-compose up -d\n\n# View logs\ndocker-compose logs -f api\n\n# Spring Boot Buildpacks (no Dockerfile needed!)\nmvn spring-boot:build-image -Dspring-boot.build-image.imageName=my-api:1.0.0</code></pre>\n' +
'  </div>\n' +
'</div>\n' +
'<div class="section">\n' +
'  <div class="section-title"><span class="num">4</span> Code Challenge</div>\n' +
'  <div class="info-box"><strong>Challenge:</strong> Dockerize your Spring Boot application with the layered JAR Dockerfile. Write a <code>docker-compose.yml</code> with the API, PostgreSQL, and a Redis container. Deploy to <strong>Railway.app</strong> using their GitHub integration and verify the <code>/actuator/health</code> endpoint returns UP.</div>\n' +
'</div>\n';

// ─── GENERATE FILES ──────────────────────────────────────────────────────────
console.log('Starting Spring Boot lesson generation...');

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
'<h1 class="page-title">Spring Boot Tutorial &#8212; Complete Guide</h1>\n' +
'<div class="page-meta"><span class="badge">&#127807; Spring Boot</span><span class="badge">&#128994; Beginner to Advanced</span><span class="badge">&#128197; July 2026</span></div>\n' +
'<div class="intro-box"><p>Spring Boot is the most popular Java framework for building production-ready REST APIs, microservices, and enterprise applications. This 15-lesson course takes you from project setup all the way to Docker deployment and Spring Cloud microservices.</p></div>\n' +
'<div class="section">\n  <div class="section-title"><span class="num">&#9658;</span> Course Curriculum</div>\n' +
'  <table class="tbl" style="margin-top:15px;">\n    <tr><th>Lesson</th><th>Topic</th></tr>\n' +
lessons.map(l => '    <tr><td><strong>Lesson ' + l.num + '</strong></td><td><a href="/' + l.filename + '"><strong>' + l.title + '</strong></a></td></tr>').join('\n') +
'\n  </table>\n</div>\n';

const indexHtml = wrapPage('home',
  'Spring Boot Tutorial — Complete Beginner to Advanced Guide',
  indexContent, null, null, lessons[0].filename, lessons[0].title);

fs.writeFileSync(path.join(publicDir, 'blog-spring-boot.html'), indexHtml, 'utf8');
console.log('Generated: blog-spring-boot.html');
console.log('Done! All 15 Spring Boot lessons generated successfully.');
