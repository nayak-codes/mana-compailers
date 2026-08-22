(function () {
  'use strict';

  if (document.querySelector('.app-topnav')) return;

  var COMPILER_LANGS = [
    { name: 'Python', url: '/online-python-compiler.html', blog: '/blog-python.html', slug: 'python' },
    { name: 'Java', url: '/online-java-compiler.html', blog: '/blog-java.html', slug: 'java' },
    { name: 'HTML / CSS / JS', url: '/online-html-editor.html', blog: '/blog-html.html', slug: 'html' },
    { name: 'JavaScript', url: '/online-javascript-compiler.html', blog: '/blog-javascript.html', slug: 'javascript' },
    { name: 'C', url: '/online-c-compiler.html', blog: '/blog-c.html', slug: 'c' },
    { name: 'C++', url: '/online-cpp-compiler.html', blog: '/blog-cpp.html', slug: 'cpp' },
    { name: 'C#', url: '/online-csharp-compiler.html', blog: '/blog-csharp.html', slug: 'csharp' },
    { name: 'Go', url: '/online-go-compiler.html', blog: '/blog-go.html', slug: 'go' },
    { name: 'Rust', url: '/online-rust-compiler.html', blog: '/blog-rust.html', slug: 'rust' },
    { name: 'PHP', url: '/online-php-compiler.html', blog: '/blog-php.html', slug: 'php' },
    { name: 'Ruby', url: '/online-ruby-compiler.html', blog: '/blog-ruby.html', slug: 'ruby' }
  ];

  var TUTORIAL_GROUPS = [
    {
      title: 'Core Languages',
      items: [
        { name: 'Python', url: '/blog-python.html' },
        { name: 'Java', url: '/blog-java.html' },
        { name: 'JavaScript', url: '/blog-javascript.html' },
        { name: 'C', url: '/blog-c.html' },
        { name: 'C++', url: '/blog-cpp.html' },
        { name: 'C#', url: '/blog-csharp.html' },
        { name: 'Go', url: '/blog-go.html' },
        { name: 'Rust', url: '/blog-rust.html' },
        { name: 'PHP', url: '/blog-php.html' },
        { name: 'Ruby', url: '/blog-ruby.html' }
      ]
    },
    {
      title: 'Web & Frameworks',
      items: [
        { name: 'HTML', url: '/blog-html.html' },
        { name: 'CSS', url: '/blog-css.html' },
        { name: 'React', url: '/blog-react.html' },
        { name: 'Angular', url: '/blog-angular.html' },
        { name: 'Vue.js', url: '/blog-vue.html' },
        { name: 'Next.js', url: '/blog-nextjs.html' },
        { name: 'Node.js', url: '/blog-nodejs.html' },
        { name: 'Express.js', url: '/blog-express.html' },
        { name: 'Django', url: '/blog-django.html' },
        { name: 'Flask', url: '/blog-flask.html' },
        { name: 'Spring Boot', url: '/blog-springboot.html' }
      ]
    },
    {
      title: 'Databases & APIs',
      items: [
        { name: 'MySQL', url: '/blog-mysql.html' },
        { name: 'MongoDB', url: '/blog-mongodb.html' },
        { name: 'REST API', url: '/blog-rest-api.html' },
        { name: 'GraphQL', url: '/blog-graphql.html' }
      ]
    },
    {
      title: 'Version Control',
      items: [
        { name: 'Git & GitHub', url: '/blog-git.html' }
      ]
    }
  ];

  var STATIC_LINKS = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features.html' },
    { name: 'About', href: '/about.html' },
    { name: 'Contact', href: '/contact.html' },
    { name: 'Privacy', href: '/privacy-policy.html' }
  ];

  function detectContext() {
    var path = window.location.pathname;
    var ctx = { home: false, compiler: false, tutorialSlug: null, staticPage: null };

    if (path === '/' || path === '/index.html') {
      ctx.home = true;
      return ctx;
    }

    var staticMap = {
      '/about.html': 'About',
      '/features.html': 'Features',
      '/contact.html': 'Contact',
      '/privacy-policy.html': 'Privacy',
      '/terms-of-service.html': 'Terms',
      '/blog.html': 'Tutorials'
    };
    if (staticMap[path]) {
      ctx.staticPage = staticMap[path];
      return ctx;
    }

    var tutorialMatch = path.match(/\/blog-([a-z0-9-]+)(?:\/|\.html)?/i);
    if (tutorialMatch) {
      ctx.tutorialSlug = tutorialMatch[1].replace(/\.html$/, '');
      if (ctx.tutorialSlug.indexOf('/') !== -1) {
        ctx.tutorialSlug = ctx.tutorialSlug.split('/')[0];
      }
    }

    // Also detect /python/, /java/ etc. subfolders as tutorial pages
    var subfolderMatch = path.match(/^\/([a-z0-9-]+)\//);
    if (!ctx.tutorialSlug && subfolderMatch) {
      ctx.tutorialSlug = subfolderMatch[1];
    }

    return ctx;
  }

  function slugMatchesCompiler(slug, itemSlug) {
    if (!slug) return false;
    return slug === itemSlug || slug.indexOf(itemSlug + '-') === 0;
  }

  function buildNavHTML(ctx) {
    var activeSlug = ctx.tutorialSlug;
    var isHome = ctx.home;
    var isCompiler = !!window.location.search.match(/lang=/);

    var compilerItems = COMPILER_LANGS.map(function (item) {
      var active = slugMatchesCompiler(activeSlug, item.slug) ? ' active' : '';
      return '<a href="' + item.url + '" class="app-topnav-compiler-item' + active + '">' + item.name + '</a>';
    }).join('');

    var megaCols = TUTORIAL_GROUPS.map(function (group) {
      var links = group.items.map(function (item) {
        var itemSlug = item.url.replace('/blog-', '').replace('.html', '');
        var active = activeSlug && (activeSlug === itemSlug || activeSlug.indexOf(itemSlug + '-') === 0) ? ' active' : '';
        return '<a href="' + item.url + '" class="app-topnav-mega-link' + active + '">' + item.name + '</a>';
      }).join('');
      return '<div class="app-topnav-mega-col"><p class="app-topnav-mega-title">' + group.title + '</p>' + links + '</div>';
    }).join('');

    var staticLinks = STATIC_LINKS.filter(function (l) { return l.name !== 'Home'; }).map(function (link) {
      var active = ctx.staticPage === link.name ? ' active' : '';
      return '<a href="' + link.href + '" class="app-topnav-link' + active + '">' + link.name + '</a>';
    }).join('');

    var mobileChips = COMPILER_LANGS.map(function (item) {
      return '<a href="' + item.url + '" class="app-topnav-mobile-chip">' + item.name + '</a>';
    }).join('');

    var mobileStatic = STATIC_LINKS.filter(function (l) { return l.name !== 'Home'; }).map(function (link) {
      return '<a href="' + link.href + '" class="app-topnav-mobile-link">' + link.name + '</a>';
    }).join('');

    return (
      '<div class="app-topnav-inner">' +
        '<a href="/" class="app-topnav-brand" aria-label="Our Compiler Home">' +
          '<img src="/logo-nav.png" alt="Our Compiler" />' +
          '<div class="app-topnav-brand-text">' +
            '<span class="app-topnav-brand-name">Our Compiler</span>' +
          '</div>' +
        '</a>' +
        '<nav class="app-topnav-desktop" aria-label="Main navigation">' +
          '<a href="/" class="app-topnav-link' + (isHome && !isCompiler ? ' active' : '') + '">Home</a>' +
          '<div class="app-topnav-dropdown" data-menu="compiler">' +
            '<button type="button" class="app-topnav-link app-topnav-trigger' + (isCompiler ? ' active' : '') + '" aria-expanded="false">' +
              'Online Compiler' +
              '<svg class="app-topnav-chevron" viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">' +
                '<path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />' +
              '</svg>' +
            '</button>' +
            '<div class="app-topnav-panel app-topnav-panel--compiler">' +
              '<p class="app-topnav-panel-title">Run Code Instantly</p>' +
              '<div class="app-topnav-compiler-grid">' + compilerItems + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="app-topnav-dropdown" data-menu="tutorials">' +
            '<button type="button" class="app-topnav-link app-topnav-trigger' + (activeSlug || ctx.staticPage === 'Tutorials' ? ' active' : '') + '" aria-expanded="false">' +
              'Tutorials' +
              '<svg class="app-topnav-chevron" viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">' +
                '<path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />' +
              '</svg>' +
            '</button>' +
            '<div class="app-topnav-panel app-topnav-panel--mega">' +
              '<div class="app-topnav-mega-grid">' + megaCols + '</div>' +
              '<a href="/blog.html" class="app-topnav-mega-footer">View All Tutorials →</a>' +
            '</div>' +
          '</div>' +
          staticLinks +
        '</nav>' +
        '<div class="app-topnav-actions">' +
          '<a href="/?lang=python3" class="app-topnav-cta">▶ Start Coding</a>' +
          '<button type="button" class="app-topnav-toggle" aria-label="Toggle theme">☀️</button>' +
          '<button type="button" class="app-topnav-hamburger" aria-label="Toggle menu" aria-expanded="false">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div class="app-topnav-mobile">' +
        '<a href="/" class="app-topnav-mobile-link">Home</a>' +
        '<p class="app-topnav-mobile-heading">Online Compiler</p>' +
        '<div class="app-topnav-mobile-grid">' + mobileChips + '</div>' +
        '<a href="/blog.html" class="app-topnav-mobile-link">All Tutorials</a>' +
        mobileStatic +
        '<a href="/?lang=python3" class="app-topnav-mobile-cta">▶ Start Coding</a>' +
      '</div>'
    );
  }

  function bindNavEvents(header) {
    var openMenu = null;

    function closeMenus() {
      openMenu = null;
      header.querySelectorAll('.app-topnav-dropdown').forEach(function (el) {
        el.classList.remove('open');
        var btn = el.querySelector('.app-topnav-trigger');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }

    header.querySelectorAll('.app-topnav-dropdown').forEach(function (dropdown) {
      var trigger = dropdown.querySelector('.app-topnav-trigger');
      if (!trigger) return;
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        var name = dropdown.getAttribute('data-menu');
        if (openMenu === name) {
          closeMenus();
        } else {
          closeMenus();
          openMenu = name;
          dropdown.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) closeMenus();
    });

    var hamburger = header.querySelector('.app-topnav-hamburger');
    if (hamburger) {
      hamburger.addEventListener('click', function () {
        var open = header.classList.toggle('app-topnav--mobile-open');
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
      });
    }

    var themeBtn = header.querySelector('.app-topnav-toggle');
    if (themeBtn) {
      function updateThemeIcon() {
        var isLight = document.body.classList.contains('light-theme');
        themeBtn.textContent = isLight ? '☀️' : '🌙';
      }
      updateThemeIcon();
      themeBtn.addEventListener('click', function () {
        document.body.classList.toggle('light-theme');
        document.documentElement.classList.toggle('light-theme');
        var isLight = document.body.classList.contains('light-theme');
        var isCompiler = window.location.pathname.indexOf('online-') !== -1 || window.location.pathname === '/' || window.location.pathname === '/index.html';
        localStorage.setItem(isCompiler ? 'compiler_theme' : 'theme', isLight ? 'light' : 'dark');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateThemeIcon();
      });
    }
  }

  function isTutorialPage() {
    var path = window.location.pathname;
    return path.indexOf('/blog') !== -1
      || !!document.querySelector('link[href*="blog"]')
      || /^\/[a-z0-9-]+\//.test(path);  // e.g. /python/, /java/
  }

  function buildTutorialNavHTML(ctx) {
    var activeSlug = ctx.tutorialSlug;
    var allItems = [];
    TUTORIAL_GROUPS.forEach(function (group) {
      group.items.forEach(function (item) {
        allItems.push(item);
      });
    });

    var itemsHTML = allItems.map(function (item) {
      var itemSlug = item.url.replace('/blog-', '').replace('.html', '');
      var active = activeSlug && (activeSlug === itemSlug || activeSlug.indexOf(itemSlug + '-') === 0 || (itemSlug === 'git' && activeSlug.indexOf('git') === 0)) ? ' active' : '';
      return '<a href="' + item.url + '" class="app-topnav-tut-item' + active + '">' + item.name + '</a>';
    }).join('');

    return (
      '<div class="app-topnav-inner">' +
        '<a href="/" class="app-topnav-brand" aria-label="Our Compiler Home">' +
          '<img src="/logo-nav.png" alt="Our Compiler" />' +
          '<div class="app-topnav-brand-text">' +
            '<span class="app-topnav-brand-name">Our Compiler</span>' +
          '</div>' +
        '</a>' +
        '<nav class="app-topnav-tutorial-nav" aria-label="Programming Language Tutorials">' +
          itemsHTML +
        '</nav>' +
        '<div class="app-topnav-actions">' +
          '<a href="/?lang=python3" class="app-topnav-cta">▶ Start Coding</a>' +
          '<button type="button" class="app-topnav-toggle" aria-label="Toggle theme">☀️</button>' +
        '</div>' +
      '</div>'
    );
  }

  function getCompilerUrl(slug) {
    if (!slug) return '/?lang=python3';
    var clean = slug.replace(/^blog-/, '').replace(/\.html$/, '');
    var map = {
      'python': '/?lang=python3',
      'java': '/?lang=java',
      'c': '/?lang=c',
      'cpp': '/?lang=cpp17',
      'csharp': '/?lang=csharp',
      'javascript': '/?lang=nodejs',
      'nodejs': '/?lang=nodejs',
      'go': '/?lang=go',
      'rust': '/?lang=rust',
      'php': '/?lang=php',
      'ruby': '/?lang=ruby',
      'html': '/?lang=nodejs',
      'css': '/?lang=nodejs',
      'react': '/?lang=nodejs',
      'angular': '/?lang=nodejs',
      'vue': '/?lang=nodejs',
      'nextjs': '/?lang=nodejs',
      'express': '/?lang=nodejs',
      'django': '/?lang=python3',
      'flask': '/?lang=python3',
      'spring-boot': '/?lang=java',
      'springboot': '/?lang=java',
      'mysql': '/?lang=python3',
      'mongodb': '/?lang=nodejs',
      'graphql': '/?lang=nodejs',
      'git': '/?lang=python3'
    };
    for (var key in map) {
      if (clean === key || clean.indexOf(key + '-') === 0) return map[key];
    }
    return '/?lang=python3';
  }

  function initSidebarModes(ctx) {
    var sidebar = document.querySelector('aside.sidebar, .sidebar');
    if (!sidebar || sidebar.querySelector('.sidebar-modes-bar')) return;

    var compilerUrl = getCompilerUrl(ctx.tutorialSlug);

    var bar = document.createElement('div');
    bar.className = 'sidebar-modes-bar';
    bar.innerHTML = (
      '<a href="#tutorial" class="sidebar-mode-box active" data-mode="tutorial" title="Tutorials" aria-label="Tutorials">' +
        '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>' +
          '<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>' +
        '</svg>' +
        '<span class="mode-tooltip">Tutorials</span>' +
      '</a>' +
      '<a href="#problems" class="sidebar-mode-box" data-mode="problems" title="Problems" aria-label="Practice Problems">' +
        '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<polyline points="16 18 22 12 16 6"></polyline>' +
          '<polyline points="8 6 2 12 8 18"></polyline>' +
          '<line x1="14" y1="4" x2="10" y2="20"></line>' +
        '</svg>' +
        '<span class="mode-tooltip">Problems</span>' +
      '</a>' +
      '<a href="#quiz" class="sidebar-mode-box" data-mode="quiz" title="Quiz" aria-label="Quiz & FAQ">' +
        '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<circle cx="12" cy="12" r="10"></circle>' +
          '<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>' +
          '<line x1="12" y1="17" x2="12.01" y2="17"></line>' +
        '</svg>' +
        '<span class="mode-tooltip">Quiz</span>' +
      '</a>' +
      '<a href="' + compilerUrl + '" class="sidebar-mode-box" data-mode="compiler" title="Compiler" aria-label="Online Compiler">' +
        '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>' +
        '</svg>' +
        '<span class="mode-tooltip">Compiler</span>' +
      '</a>'
    );

    // Bind mode click events
    bar.querySelector('[data-mode="problems"]').addEventListener('click', function(e) {
      var target = document.querySelector('.exercise-box, #practice, .code-output, #problems');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    bar.querySelector('[data-mode="quiz"]').addEventListener('click', function(e) {
      // Build quiz URL: /python/quiz.html, /java/quiz.html, etc. based on current slug
      var slug = ctx.tutorialSlug || 'python';
      var quizUrl = '/' + slug + '/quiz.html';
      var target = document.querySelector('.faq-section, #faq, #quiz');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        var first = target.querySelector('.faq-item');
        if (first && !first.classList.contains('open')) {
          var btn = first.querySelector('.faq-question');
          if (btn) btn.click();
        }
      } else {
        // No FAQ on page — navigate to dedicated quiz page
        e.preventDefault();
        window.location.href = quizUrl;
      }
    });

    bar.querySelector('[data-mode="tutorial"]').addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    if (sidebar.firstChild) {
      sidebar.insertBefore(bar, sidebar.firstChild);
    } else {
      sidebar.appendChild(bar);
    }
  }

  function initNav() {
    if (document.querySelector('.app-topnav')) return;

    // Ensure site-nav.css is loaded
    if (!document.querySelector('link[href="/site-nav.css"]')) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/site-nav.css';
      document.head.appendChild(link);
    }

    // Hide any legacy navigation
    var legacyNavs = document.querySelectorAll('nav.topnav, header.header, .blog-topnav, .blog-subnav, .app-subnav');
    legacyNavs.forEach(function(el) {
      el.classList.add('site-nav-replaced');
      el.style.display = 'none';
    });

    var ctx = detectContext();
    var isTutorial = isTutorialPage();
    var header = document.createElement('header');
    header.className = 'app-topnav' + (isTutorial ? ' app-topnav--tutorial' : '');
    header.innerHTML = isTutorial ? buildTutorialNavHTML(ctx) : buildNavHTML(ctx);

    if (document.body.firstChild) {
      document.body.insertBefore(header, document.body.firstChild);
    } else {
      document.body.appendChild(header);
    }

    bindNavEvents(header);

    // If tutorial page, scroll active item into view
    if (isTutorial) {
      // Sidebar mode buttons removed as requested
      setTimeout(function () {
        var activeItem = header.querySelector('.app-topnav-tut-item.active');
        if (activeItem) {
          activeItem.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
        }
      }, 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
