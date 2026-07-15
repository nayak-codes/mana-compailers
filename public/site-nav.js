(function () {
  'use strict';

  if (document.querySelector('.app-topnav')) return;

  var COMPILER_LANGS = [
    { name: 'Python', url: '/?lang=python3', blog: '/blog-python.html', slug: 'python' },
    { name: 'Java', url: '/?lang=java', blog: '/blog-java.html', slug: 'java' },
    { name: 'JavaScript', url: '/?lang=nodejs', blog: '/blog-javascript.html', slug: 'javascript' },
    { name: 'C', url: '/?lang=c', blog: '/blog-c.html', slug: 'c' },
    { name: 'C++', url: '/?lang=cpp17', blog: '/blog-cpp.html', slug: 'cpp' },
    { name: 'C#', url: '/?lang=csharp', blog: '/blog-csharp.html', slug: 'csharp' },
    { name: 'Go', url: '/?lang=go', blog: '/blog-go.html', slug: 'go' },
    { name: 'Rust', url: '/?lang=rust', blog: '/blog-rust.html', slug: 'rust' },
    { name: 'PHP', url: '/?lang=php', blog: '/blog-php.html', slug: 'php' },
    { name: 'Ruby', url: '/?lang=ruby', blog: '/blog-ruby.html', slug: 'ruby' }
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
        { name: 'Django', url: '/blog-django.html' },
        { name: 'Flask', url: '/blog-flask.html' },
        { name: 'Spring Boot', url: '/blog-spring-boot.html' }
      ]
    },
    {
      title: 'Databases & APIs',
      items: [
        { name: 'MySQL', url: '/blog-mysql.html' },
        { name: 'PostgreSQL', url: '/blog-postgresql.html' },
        { name: 'MongoDB', url: '/blog-mongodb.html' },
        { name: 'SQLite', url: '/blog-sqlite.html' },
        { name: 'Redis', url: '/blog-redis.html' },
        { name: 'REST API', url: '/blog-rest-api.html' },
        { name: 'GraphQL', url: '/blog-graphql.html' }
      ]
    },
    {
      title: 'Cloud & DevOps',
      items: [
        { name: 'AWS', url: '/blog-aws.html' },
        { name: 'Azure', url: '/blog-azure.html' },
        { name: 'Google Cloud', url: '/blog-gcloud.html' },
        { name: 'Docker', url: '/blog-docker.html' },
        { name: 'Kubernetes', url: '/blog-kubernetes.html' },
        { name: 'CI/CD', url: '/blog-cicd.html' },
        { name: 'Git & GitHub', url: '/blog-git.html' },
        { name: 'Linux', url: '/blog-linux.html' }
      ]
    },
    {
      title: 'Data & ML',
      items: [
        { name: 'Data Science', url: '/blog-data-science.html' },
        { name: 'Machine Learning', url: '/blog-ml.html' },
        { name: 'Deep Learning', url: '/blog-deep-learning.html' },
        { name: 'TensorFlow', url: '/blog-tensorflow.html' },
        { name: 'PyTorch', url: '/blog-pytorch.html' },
        { name: 'Big Data', url: '/blog-big-data.html' }
      ]
    }
  ];

  var STATIC_LINKS = [
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

    var staticLinks = STATIC_LINKS.map(function (link) {
      var active = ctx.staticPage === link.name ? ' active' : '';
      return '<a href="' + link.href + '" class="app-topnav-link' + active + '">' + link.name + '</a>';
    }).join('');

    var mobileChips = COMPILER_LANGS.map(function (item) {
      return '<a href="' + item.url + '" class="app-topnav-mobile-chip">' + item.name + '</a>';
    }).join('');

    var mobileStatic = STATIC_LINKS.map(function (link) {
      return '<a href="' + link.href + '" class="app-topnav-mobile-link">' + link.name + '</a>';
    }).join('');

    return (
      '<div class="app-topnav-inner">' +
        '<a href="/" class="app-topnav-brand" aria-label="Our Compiler Home">' +
          '<img src="/logo-nav.png" alt="Our Compiler" />' +
          '<div class="app-topnav-brand-text">' +
            '<span class="app-topnav-brand-name">Our Compiler</span>' +
            '<span class="app-topnav-brand-tag">Free Online IDE</span>' +
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
        themeBtn.textContent = isLight ? '🌙' : '☀️';
      }
      updateThemeIcon();
      themeBtn.addEventListener('click', function () {
        document.body.classList.toggle('light-theme');
        document.documentElement.classList.toggle('light-theme');
        localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        updateThemeIcon();
      });
    }
  }

  function isTutorialPage() {
    if (document.querySelector('link[href="/blog-style.css"]')) return true;
    return /\/blog-/.test(window.location.pathname);
  }

  function initTutorialNav() {
    var topnav = document.querySelector('nav.topnav');
    if (!topnav || topnav.dataset.enhanced === 'true') return;
    topnav.dataset.enhanced = 'true';

    var brand = topnav.querySelector('.brand');
    if (brand && !brand.querySelector('img')) {
      brand.innerHTML = '<img src="/logo-nav.png" alt="Our Compiler" /> Our Compiler';
    }

    var path = window.location.pathname;
    var slugMatch = path.match(/\/blog-([a-z0-9-]+)/i);
    topnav.querySelectorAll('a').forEach(function (a) {
      if (a.classList.contains('brand')) return;
      a.classList.remove('active');
      var href = a.getAttribute('href') || '';
      if (href === path) {
        a.classList.add('active');
      } else if (slugMatch && href.indexOf('/blog-' + slugMatch[1]) === 0) {
        a.classList.add('active');
      }
    });

    if (!topnav.querySelector('.tutorial-theme-toggle') && !topnav.querySelector('.blog-theme-toggle')) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tutorial-theme-toggle';
      btn.setAttribute('aria-label', 'Toggle theme');
      function updateIcon() {
        btn.textContent = document.body.classList.contains('light-theme') ? '🌙 Dark' : '☀️ Light';
      }
      updateIcon();
      btn.addEventListener('click', function () {
        document.body.classList.toggle('light-theme');
        document.documentElement.classList.toggle('light-theme');
        localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        updateIcon();
      });
      topnav.appendChild(btn);
    }
  }

  function initNav() {
    if (isTutorialPage()) {
      initTutorialNav();
      return;
    }

    var legacyNav = document.querySelector('nav.topnav') || document.querySelector('header.header');
    if (!legacyNav) return;

    legacyNav.classList.add('site-nav-replaced');

    var header = document.createElement('header');
    header.className = 'app-topnav';
    header.innerHTML = buildNavHTML(detectContext());
    legacyNav.parentNode.insertBefore(header, legacyNav);
    bindNavEvents(header);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
