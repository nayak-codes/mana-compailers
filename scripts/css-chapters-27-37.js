// Chapters 27-37 — Phases 10-13
module.exports = [
  {
    num: 27, file: '27-css-responsive-design.html',
    title: 'Responsive CSS',
    metaTitle: 'Responsive CSS — Mobile-First, Viewport & Breakpoints | CSS Tutorial',
    desc: 'Learn responsive design, mobile-first approach, viewport meta, fluid layouts, flexible images, breakpoints, mobile navigation, responsive typography and spacing.',
    phase: 'Phase 10: Responsive Design', phaseNum: 10,
    topics: 'Responsive Definition · Mobile-First · Viewport · Fluid Layouts · Flexible Widths · Flexible Images · Breakpoints · Mobile Nav · Responsive Typography · Spacing · Device Testing · Orientation',
    prev: { href: '26-css-grid-projects.html', title: '26. Grid Projects' },
    next: { href: '28-css-media-queries.html', title: '28. Media Queries' },
    sections: `
<div class="section-title"><span class="num">1</span>Responsive Design Ante Enti?</div>
<div class="section-body">
  <p><strong>Responsive design ante enti?</strong> Web pages all screen sizes lo — mobile, tablet, desktop — properly render avvali. Layout, typography, spacing screen width batti adapt avuthundi.</p>
  <p><strong>Mobile-first design:</strong> Small screens ki styles first write chesi, <code>min-width</code> media queries tho larger screens ki enhance cheyadam. Progressive enhancement approach.</p>
</div>

<div class="section-title"><span class="num">2</span>Viewport &amp; Fluid Layouts</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">HTML — Viewport Meta</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code></pre>
  </div>
  <p>Without viewport meta, mobile browsers desktop width simulate chestayi — tiny zoomed-out page.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Fluid Layout</span></div>
    <pre><code>.container {
  width: min(100% - 2rem, 1200px);
  margin-inline: auto;
}

img {
  max-width: 100%;
  height: auto;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Breakpoints, Mobile Nav &amp; Responsive Typography</div>
<div class="section-body">
  <p><strong>Common breakpoints:</strong> 480px (mobile), 768px (tablet), 1024px (laptop), 1280px (desktop). Content-driven breakpoints prefer cheyandi — device-specific numbers kante.</p>
  <ul>
    <li><strong>Mobile navigation:</strong> Hamburger menu, bottom nav, or collapsible drawer</li>
    <li><strong>Responsive typography:</strong> <code>clamp()</code> for fluid font sizes</li>
    <li><strong>Responsive spacing:</strong> <code>rem</code> and viewport units for padding/margins</li>
    <li><strong>Orientation:</strong> Portrait vs landscape — media queries tho handle</li>
    <li><strong>Device testing:</strong> DevTools device mode, real devices, BrowserStack</li>
  </ul>
</div>`
  },
  {
    num: 28, file: '28-css-media-queries.html',
    title: 'Media Queries',
    metaTitle: 'CSS Media Queries — @media, Dark Mode & Print Styles | CSS Tutorial',
    desc: 'Master @media queries: min-width, max-width, orientation, prefers-color-scheme, prefers-reduced-motion, pointer, hover, print styles, and combining queries.',
    phase: 'Phase 10: Responsive Design', phaseNum: 10,
    topics: '@media · min-width · max-width · Width/Height Queries · Orientation · Dark Mode · Reduced Motion · Pointer · Hover · Print · Combining Queries',
    prev: { href: '27-css-responsive-design.html', title: '27. Responsive CSS' },
    next: { href: '29-css-container-queries.html', title: '29. Container Queries' },
    sections: `
<div class="section-title"><span class="num">1</span>@media — Conditional Styles</div>
<div class="section-body">
  <p>Media queries viewport or device features ni check chesi conditional styles apply cheyyadaniki use chestayi.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Responsive Grid</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>.course-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .course-grid {
    grid-template-columns: 1fr;
  }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Width, Height &amp; Orientation Queries</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>/* Mobile-first */
.sidebar { display: none; }

@media (min-width: 768px) {
  .sidebar { display: block; width: 240px; }
}

@media (orientation: landscape) and (max-height: 500px) {
  .hero { min-height: auto; padding: 2rem; }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>User Preference Queries</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Accessibility Media Features</span></div>
    <pre><code>@media (prefers-color-scheme: dark) {
  :root { --bg: #111827; --text: #f9fafb; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

@media (hover: hover) and (pointer: fine) {
  .card:hover { transform: translateY(-4px); }
}

@media print {
  .nav, .sidebar { display: none; }
  body { font-size: 12pt; color: #000; }
}</code></pre>
  </div>
  <p><strong>Combining queries:</strong> <code>@media (min-width: 768px) and (max-width: 1024px)</code> — comma for OR: <code>@media (max-width: 768px), (orientation: portrait)</code></p>
</div>`
  },
  {
    num: 29, file: '29-css-container-queries.html',
    title: 'Container Queries',
    metaTitle: 'CSS Container Queries — @container & Component Responsiveness | CSS Tutorial',
    desc: 'Learn container queries, container-type, named containers, @container, component-level responsiveness, container query units, and browser support.',
    phase: 'Phase 10: Responsive Design', phaseNum: 10,
    topics: 'Container Queries · container-type · Named Containers · @container · Component Responsiveness · CQ Units · vs Media Queries · Responsive Cards · Browser Support',
    prev: { href: '28-css-media-queries.html', title: '28. Media Queries' },
    next: { href: '30-css-backgrounds.html', title: '30. Backgrounds' },
    sections: `
<div class="section-title"><span class="num">1</span>Container Queries Ante Enti?</div>
<div class="section-body">
  <p><strong>Container queries ante enti?</strong> Container queries viewport size badulu specific parent container dimensions based ga styles apply chestayi — reusable components ki extremely useful.</p>
  <p>Media queries page-level; container queries component-level responsiveness.</p>
</div>

<div class="section-title"><span class="num">2</span>container-type &amp; @container</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

@container (min-width: 500px) {
  .card {
    display: flex;
    gap: 16px;
  }

  .card-image { flex: 0 0 200px; }
}</code></pre>
  </div>
  <p><strong>Named containers:</strong> <code>@container card (min-width: 400px)</code> — specific container target cheyochu.</p>
</div>

<div class="section-title"><span class="num">3</span>Container Query Units &amp; vs Media Queries</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — CQ Units</span></div>
    <pre><code>@container (min-width: 300px) {
  .title {
    font-size: clamp(1rem, 5cqi, 1.5rem);
    padding: 2cqi;
  }
}</code></pre>
  </div>
  <table class="tbl spec-table">
    <thead><tr><th>Feature</th><th>Media Queries</th><th>Container Queries</th></tr></thead>
    <tbody>
      <tr><td>Scope</td><td>Viewport / device</td><td>Parent container</td></tr>
      <tr><td>Use case</td><td>Page layout</td><td>Reusable components</td></tr>
      <tr><td>Units</td><td>vw, vh</td><td>cqi, cqw, cqh (container units)</td></tr>
    </tbody>
  </table>
  <p><strong>Browser support:</strong> Modern browsers (Chrome 105+, Safari 16+, Firefox 110+) — check caniuse.com for production.</p>
</div>`
  },
  {
    num: 30, file: '30-css-backgrounds.html',
    title: 'Backgrounds',
    metaTitle: 'CSS Backgrounds — background-image, size, position & Overlays | CSS Tutorial',
    desc: 'Learn background-color, background-image, size, position, repeat, attachment, multiple backgrounds, gradients, and background overlays.',
    phase: 'Phase 11: Backgrounds & Visual Effects', phaseNum: 11,
    topics: 'background-color · background-image · background-size · background-position · background-repeat · background-attachment · Multiple Backgrounds · Gradients · Overlays',
    prev: { href: '29-css-container-queries.html', title: '29. Container Queries' },
    next: { href: '31-css-gradients.html', title: '31. Gradients' },
    sections: `
<div class="section-title"><span class="num">1</span>Background Properties</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>.hero {
  background-color: #1e293b;
  background-image: url('/images/hero.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}</code></pre>
  </div>
  <ul>
    <li><code>background-size: cover</code> — fill container, crop if needed</li>
    <li><code>background-size: contain</code> — full image visible</li>
    <li><code>background-position</code> — top, center, 50% 30%, etc.</li>
    <li><code>background-attachment: fixed</code> — parallax-like effect</li>
  </ul>
</div>

<div class="section-title"><span class="num">2</span>Multiple Backgrounds &amp; Overlays</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>.hero-overlay {
  background:
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)),
    url('/images/hero.jpg') center / cover no-repeat;
  min-height: 60vh;
  color: #fff;
}</code></pre>
  </div>
  <p>First listed background top layer — gradient overlay image meeda render avuthundi.</p>
</div>`
  },
  {
    num: 31, file: '31-css-gradients.html',
    title: 'Gradients',
    metaTitle: 'CSS Gradients — Linear, Radial, Conic & Gradient Text | CSS Tutorial',
    desc: 'Master linear gradients, radial gradients, conic gradients, direction, color stops, gradient borders, gradient text, overlays, and performance.',
    phase: 'Phase 11: Backgrounds & Visual Effects', phaseNum: 11,
    topics: 'Linear Gradient · Direction · Color Stops · Radial · Conic · Gradient Backgrounds · Gradient Borders · Gradient Text · Overlays · Performance',
    prev: { href: '30-css-backgrounds.html', title: '30. Backgrounds' },
    next: { href: '32-css-filters-and-blend-modes.html', title: '32. Filters & Blend Modes' },
    sections: `
<div class="section-title"><span class="num">1</span>Linear &amp; Radial Gradients</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>.gradient-bg {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
}

.radial-bg {
  background: radial-gradient(circle at top left, #eff6ff, #dbeafe);
}

.conic-badge {
  background: conic-gradient(from 180deg, #2563eb, #7c3aed, #2563eb);
}</code></pre>
  </div>
  <p><strong>Color stops:</strong> <code>linear-gradient(to right, red 0%, yellow 50%, green 100%)</code></p>
</div>

<div class="section-title"><span class="num">2</span>Gradient Borders, Text &amp; Performance</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>.gradient-text {
  background: linear-gradient(90deg, #2563eb, #7c3aed);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.gradient-border {
  border: 2px solid transparent;
  background: linear-gradient(#fff, #fff) padding-box,
              linear-gradient(135deg, #2563eb, #7c3aed) border-box;
}</code></pre>
  </div>
  <p><strong>Performance:</strong> CSS gradients GPU-friendly — large image backgrounds kante often faster. Complex animated gradients CPU use cheyochu.</p>
</div>`
  },
  {
    num: 32, file: '32-css-filters-and-blend-modes.html',
    title: 'Filters and Blend Modes',
    metaTitle: 'CSS Filters & Blend Modes — blur, grayscale, mix-blend-mode | CSS Tutorial',
    desc: 'Learn CSS filter, blur, brightness, contrast, grayscale, saturate, drop-shadow, mix-blend-mode, background-blend-mode, accessibility and performance.',
    phase: 'Phase 11: Backgrounds & Visual Effects', phaseNum: 11,
    topics: 'filter · Blur · Brightness · Contrast · Grayscale · Saturate · Drop Shadow · mix-blend-mode · background-blend-mode · Accessibility · Performance',
    prev: { href: '31-css-gradients.html', title: '31. Gradients' },
    next: { href: '33-css-transforms.html', title: '33. Transforms' },
    sections: `
<div class="section-title"><span class="num">1</span>CSS filter Property</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>.photo:hover {
  filter: brightness(1.1) contrast(1.05);
}

.disabled-img {
  filter: grayscale(100%) opacity(0.6);
}

.glass {
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.2);
}

.shadow-icon {
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Blend Modes &amp; Accessibility</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>.blend-overlay {
  mix-blend-mode: multiply;
}

.texture-bg {
  background-blend-mode: overlay;
  background-image: url('texture.png'), linear-gradient(#2563eb, #1d4ed8);
}</code></pre>
  </div>
  <div class="callout">
    <div class="callout-title">♿ Accessibility &amp; Performance</div>
    <ul style="margin:8px 0 0 18px;line-height:1.7;">
      <li>Heavy blur/backdrop-filter mobile lo slow avvochu</li>
      <li>Filters contrast affect cheyochu — text readability verify cheyandi</li>
      <li><code>prefers-reduced-motion</code> lo animated filters avoid cheyandi</li>
    </ul>
  </div>
</div>`
  },
  {
    num: 33, file: '33-css-transforms.html',
    title: 'Transforms',
    metaTitle: 'CSS Transforms — translate, scale, rotate & 3D | CSS Tutorial',
    desc: 'Learn CSS transform, translate, scale, rotate, skew, transform-origin, 2D/3D transforms, perspective, hover effects, compositing and performance.',
    phase: 'Phase 12: Transforms & Animations', phaseNum: 12,
    topics: 'transform · Translate · Scale · Rotate · Skew · transform-origin · 2D · 3D · Perspective · Hover Effects · Compositing · Performance',
    prev: { href: '32-css-filters-and-blend-modes.html', title: '32. Filters & Blend Modes' },
    next: { href: '34-css-transitions.html', title: '34. Transitions' },
    sections: `
<div class="section-title"><span class="num">1</span>CSS Transforms Overview</div>
<div class="section-body">
  <p>CSS transforms elements ni 2D or 3D space lo visually transform cheyyadaniki use chestayi — layout reflow trigger cheyadu (position unchanged in document flow for 2D).</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Card Hover</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>.card:hover {
  transform: translateY(-6px) scale(1.02);
}

.card {
  transition: transform 200ms ease;
  transform-origin: center bottom;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>2D &amp; 3D Transforms</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>.slide-in { transform: translateX(20px); }
.zoom { transform: scale(1.2); }
.rotate { transform: rotate(45deg); }
.skew { transform: skewX(-5deg); }

.scene {
  perspective: 800px;
}

.flip-card {
  transform: rotateY(180deg);
  transform-style: preserve-3d;
}</code></pre>
  </div>
  <p><strong>Performance:</strong> <code>transform</code> and <code>opacity</code> compositor-friendly — 60fps animations ki ideal. <code>width</code>/<code>height</code> animate cheyakandi.</p>
</div>`
  },
  {
    num: 34, file: '34-css-transitions.html',
    title: 'Transitions',
    metaTitle: 'CSS Transitions — transition-property, duration & timing | CSS Tutorial',
    desc: 'Learn CSS transitions: transition-property, duration, timing-function, delay, shorthand, hover/focus transitions, limitations, and prefers-reduced-motion.',
    phase: 'Phase 12: Transforms & Animations', phaseNum: 12,
    topics: 'Transition Definition · transition-property · duration · timing-function · delay · Shorthand · Hover · Focus · Limitations · Reduced Motion',
    prev: { href: '33-css-transforms.html', title: '33. Transforms' },
    next: { href: '35-css-animations.html', title: '35. Animations' },
    sections: `
<div class="section-title"><span class="num">1</span>Transition Ante Enti?</div>
<div class="section-body">
  <p><strong>Transition ante enti?</strong> Property value change smooth ga animate cheyadam — state A nundi state B ki gradual interpolation.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>.button {
  background: #2563eb;
  transition: background-color 200ms ease,
              transform 200ms ease;
}

.button:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

.button:focus-visible {
  outline: 3px solid #93c5fd;
  transition: outline-offset 150ms ease;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Transition Properties &amp; Limitations</div>
<div class="section-body">
  <ul>
    <li><code>transition-property</code> — which properties animate (or <code>all</code> — avoid in production)</li>
    <li><code>transition-duration</code> — 200ms, 0.3s</li>
    <li><code>transition-timing-function</code> — ease, linear, ease-in-out, cubic-bezier()</li>
    <li><code>transition-delay</code> — start delay</li>
    <li><strong>Shorthand:</strong> <code>transition: property duration timing delay;</code></li>
  </ul>
  <p><strong>Limitations:</strong> Transitions need trigger (hover, class change) — auto-starting loops ki animations use cheyandi. Only discrete steps ki transitions work avvavu.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Reduced Motion</span></div>
    <pre><code>@media (prefers-reduced-motion: reduce) {
  .button { transition: none; }
}</code></pre>
  </div>
</div>`
  },
  {
    num: 35, file: '35-css-animations.html',
    title: 'Animations',
    metaTitle: 'CSS Animations — @keyframes, duration & reduced motion | CSS Tutorial',
    desc: 'Master @keyframes, animation-name, duration, timing, delay, iteration, direction, fill-mode, loading/entrance/exit animations, and prefers-reduced-motion.',
    phase: 'Phase 12: Transforms & Animations', phaseNum: 12,
    topics: '@keyframes · animation-name · duration · timing · delay · iteration-count · direction · fill-mode · play-state · Loading · Entrance · Exit · Reduced Motion',
    prev: { href: '34-css-transitions.html', title: '34. Transitions' },
    next: { href: '36-css-variables.html', title: '36. CSS Variables' },
    sections: `
<div class="section-title"><span class="num">1</span>@keyframes &amp; Animation Properties</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Fade In</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fade-in 400ms ease-out;
}</code></pre>
  </div>
  <ul>
    <li><code>animation-iteration-count: infinite</code> — loading spinners</li>
    <li><code>animation-direction: alternate</code> — back and forth</li>
    <li><code>animation-fill-mode: forwards</code> — end state retain</li>
    <li><code>animation-play-state: paused</code> — pause on hover</li>
  </ul>
</div>

<div class="section-title"><span class="num">2</span>Loading, Entrance &amp; Exit Animations</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 800ms linear infinite;
}

@keyframes slide-out {
  to { opacity: 0; transform: translateX(-100%); }
}

.toast-exit {
  animation: slide-out 300ms ease-in forwards;
}</code></pre>
  </div>
  <p><strong>Reduced motion:</strong> Always respect <code>prefers-reduced-motion: reduce</code> — disable or simplify animations for vestibular disorder users.</p>
</div>`
  },
  {
    num: 36, file: '36-css-variables.html',
    title: 'CSS Variables',
    metaTitle: 'CSS Custom Properties — var(), :root & Component Variables | CSS Tutorial',
    desc: 'Learn CSS custom properties, declaring variables, var(), root variables, component variables, fallback values, inheritance, naming, and debugging.',
    phase: 'Phase 13: Custom Properties & Themes', phaseNum: 13,
    topics: 'Custom Properties · Declaring · var() · Root Variables · Component Variables · Fallback · Inheritance · Dynamic Values · Naming · Debugging',
    prev: { href: '35-css-animations.html', title: '35. Animations' },
    next: { href: '37-css-themes.html', title: '37. Themes' },
    sections: `
<div class="section-title"><span class="num">1</span>Custom Properties Ante Enti?</div>
<div class="section-body">
  <p><strong>Custom properties ante enti?</strong> CSS variables — values store chesi reuse cheyochu. Preprocessor variables kante dynamic — runtime lo JavaScript tho change cheyochu.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>:root {
  --color-primary: #2563eb;
  --radius-md: 8px;
  --space-md: 16px;
}

.button {
  background: var(--color-primary);
  border-radius: var(--radius-md);
  padding: var(--space-md);
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Fallback, Inheritance &amp; Component Variables</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>.card {
  --card-padding: 24px;
  --card-bg: #ffffff;
  padding: var(--card-padding);
  background: var(--card-bg);
}

.alert {
  color: var(--alert-color, #dc2626); /* fallback if undefined */
}</code></pre>
  </div>
  <p><strong>Inheritance:</strong> Custom properties inherit like regular properties — child elements parent variables access cheyochu.</p>
  <p><strong>Naming:</strong> Semantic names (<code>--color-primary</code>) not presentational (<code>--blue</code>). BEM-style: <code>--button-bg-hover</code>.</p>
</div>`
  },
  {
    num: 37, file: '37-css-themes.html',
    title: 'Themes',
    metaTitle: 'CSS Themes — Light/Dark Mode, prefers-color-scheme & Theme Switch | CSS Tutorial',
    desc: 'Learn light/dark themes, theme variables, prefers-color-scheme, manual theme switch, data attributes, persistence, high-contrast, and accessibility.',
    phase: 'Phase 13: Custom Properties & Themes', phaseNum: 13,
    topics: 'Light Theme · Dark Theme · Theme Variables · prefers-color-scheme · Manual Switch · Data Attributes · Persistence · High Contrast · Component Themes · Accessibility',
    prev: { href: '36-css-variables.html', title: '36. CSS Variables' },
    next: { href: '38-css-styling-forms.html', title: '38. Styling Forms' },
    sections: `
<div class="section-title"><span class="num">1</span>Light &amp; Dark Theme Variables</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Theme System</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --border-color: #e5e7eb;
  --color-primary: #2563eb;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #111827;
    --bg-secondary: #1f2937;
    --text-primary: #f9fafb;
    --text-secondary: #9ca3af;
    --border-color: #374151;
    --color-primary: #3b82f6;
  }
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Manual Theme Switch &amp; Persistence</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Data Attribute Theme</span></div>
    <pre><code>[data-theme="dark"] {
  --bg-primary: #111827;
  --text-primary: #f9fafb;
}

[data-theme="light"] {
  --bg-primary: #ffffff;
  --text-primary: #111827;
}</code></pre>
  </div>
  <p><strong>JavaScript persistence:</strong> <code>localStorage.setItem('theme', 'dark')</code> + <code>document.documentElement.dataset.theme = 'dark'</code> on load.</p>
</div>

<div class="section-title"><span class="num">3</span>High Contrast &amp; Theme Accessibility</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>@media (prefers-contrast: more) {
  :root {
    --text-primary: #000000;
    --border-color: #000000;
  }
}</code></pre>
  </div>
  <ul>
    <li>Both themes lo WCAG contrast ratios maintain cheyandi</li>
    <li>Theme toggle button accessible — <code>aria-label</code>, keyboard support</li>
    <li>Component-level theme variables for nested theming (cards in dark sidebar)</li>
    <li>Respect system preference as default — manual override optional</li>
  </ul>
</div>`
  }
];
