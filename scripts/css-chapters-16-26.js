// Chapters 16-26 — appended to generate-css-chapters.js
module.exports = [
  {
    num: 16, file: '16-css-fonts.html',
    title: 'Fonts',
    metaTitle: 'CSS Fonts — font-family, @font-face, Variable Fonts & Performance | CSS Tutorial',
    desc: 'Learn CSS font-family, generic font families, web-safe fonts, web fonts, @font-face, font loading, weight, style, stretch, variable fonts, fallback, and performance.',
    phase: 'Phase 06: Typography', phaseNum: 6,
    topics: 'font-family · Generic Families · Web-Safe · Web Fonts · @font-face · Font Loading · Weight · Style · Stretch · Variable Fonts · Fallback · Performance',
    prev: { href: '15-css-borders-and-shadows.html', title: '15. Borders & Shadows' },
    next: { href: '17-css-text-styling.html', title: '17. Text Styling' },
    sections: `
<div class="section-title"><span class="num">1</span>Font Family &amp; Generic Font Families</div>
<div class="section-body">
  <p><code>font-family</code> — text render chese typeface stack. Browser first available font use chestundi left nundi right ki.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}</code></pre>
  </div>
  <p><strong>Generic families:</strong> <code>serif</code>, <code>sans-serif</code>, <code>monospace</code>, <code>cursive</code>, <code>fantasy</code> — ultimate fallbacks.</p>
</div>

<div class="section-title"><span class="num">2</span>Web-Safe Fonts, Web Fonts &amp; @font-face</div>
<div class="section-body">
  <p><strong>Web-safe fonts:</strong> Arial, Georgia, Times — system lo pre-installed. <strong>Web fonts</strong> — custom files download avuthayi.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — @font-face</span></div>
    <pre><code>@font-face {
  font-family: 'CustomBrand';
  src: url('/fonts/custom-brand.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}</code></pre>
  </div>
  <p><strong>font-display: swap</strong> — text immediately visible with fallback, custom font load ayyaka swap avuthundi. Performance ki critical.</p>
</div>

<div class="section-title"><span class="num">3</span>Font Weight, Style, Stretch &amp; Variable Fonts</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>.heading {
  font-weight: 700;
  font-style: normal;
}

.emphasis {
  font-weight: 600;
  font-style: italic;
}

.variable-heading {
  font-family: 'Inter', sans-serif;
  font-weight: 350;
  font-stretch: 95%;
}</code></pre>
  </div>
  <p><strong>Variable fonts</strong> — single file lo weight, width, slant axes control. <code>font-weight: 350</code> lanti fine values possible.</p>
</div>

<div class="section-title"><span class="num">4</span>Font Fallback &amp; Performance</div>
<div class="section-body">
  <ul>
    <li>Always provide fallback stack ending with generic family</li>
    <li>Use <code>woff2</code> format — best compression</li>
    <li>Preload critical fonts: <code>&lt;link rel="preload" href="font.woff2" as="font" crossorigin&gt;</code></li>
    <li>Subset fonts — only needed characters include cheyandi</li>
    <li>Limit font families and weights — each file HTTP request</li>
  </ul>
</div>`
  },
  {
    num: 17, file: '17-css-text-styling.html',
    title: 'Text Styling',
    metaTitle: 'CSS Text Styling — font-size, line-height, text-align & Readability | CSS Tutorial',
    desc: 'Master CSS font-size, line-height, letter-spacing, word-spacing, text-align, decoration, transform, indent, text-shadow, white-space, overflow, ellipsis, and typography scale.',
    phase: 'Phase 06: Typography', phaseNum: 6,
    topics: 'font-size · line-height · letter-spacing · word-spacing · text-align · text-decoration · text-transform · text-indent · text-shadow · white-space · text-overflow · ellipsis · Readability · Typography Scale',
    prev: { href: '16-css-fonts.html', title: '16. Fonts' },
    next: { href: '18-css-web-fonts-and-icons.html', title: '18. Web Fonts & Icons' },
    sections: `
<div class="section-title"><span class="num">1</span>Font Size, Line Height &amp; Spacing</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Readable Text</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>.description {
  max-width: 65ch;
  line-height: 1.6;
  color: #4b5563;
  font-size: 1rem;
  letter-spacing: 0.01em;
  word-spacing: normal;
}</code></pre>
  </div>
  <p><strong>Readability:</strong> Body text <code>line-height: 1.5–1.7</code>, max width <code>65ch</code>, sufficient contrast.</p>
</div>

<div class="section-title"><span class="num">2</span>Text Alignment, Decoration &amp; Transform</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>h1 { text-align: center; text-transform: capitalize; }
a { text-decoration: none; }
a:hover { text-decoration: underline; }
.label { text-transform: uppercase; letter-spacing: 0.05em; }
.quote { text-indent: 2rem; }</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Text Shadow, White Space &amp; Ellipsis</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>.hero-title {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.preserve {
  white-space: pre-wrap;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Typography Scale</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Type Scale</span></div>
    <pre><code>:root {
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
}</code></pre>
  </div>
  <p>Consistent modular scale — design system lo headings and body harmonious ga untayi.</p>
</div>`
  },
  {
    num: 18, file: '18-css-web-fonts-and-icons.html',
    title: 'Web Fonts and Icons',
    metaTitle: 'CSS Web Fonts & Icons — Google Fonts, SVG Icons & Accessibility | CSS Tutorial',
    desc: 'Learn Google Fonts, local fonts, font loading strategies, icon fonts, SVG icons, icon accessibility, aria-hidden, icon buttons, and performance.',
    phase: 'Phase 06: Typography', phaseNum: 6,
    topics: 'Google Fonts · Local Fonts · Font Loading · Icon Fonts · SVG Icons · Accessibility · aria-hidden · Icon Buttons · Fallback · Performance',
    prev: { href: '17-css-text-styling.html', title: '17. Text Styling' },
    next: { href: '19-css-display.html', title: '19. Display' },
    sections: `
<div class="section-title"><span class="num">1</span>Google Fonts &amp; Local Fonts</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">HTML — Google Fonts</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>&lt;link rel="preconnect" href="https://fonts.googleapis.com"&gt;
&lt;link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;display=swap" rel="stylesheet"&gt;

&lt;style&gt;
  body { font-family: 'Inter', sans-serif; }
&lt;/style&gt;</code></pre>
  </div>
  <p><strong>Local fonts</strong> — self-host for privacy, GDPR, and faster CDN control. <code>@font-face</code> with <code>font-display: swap</code>.</p>
</div>

<div class="section-title"><span class="num">2</span>SVG Icons vs Icon Fonts</div>
<div class="section-body">
  <p><strong>Icon fonts</strong> (Font Awesome) — legacy, accessibility issues. <strong>SVG icons</strong> — modern standard, scalable, style with CSS.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">HTML — Accessible Icon Button</span></div>
    <pre><code>&lt;button type="button" aria-label="Close dialog"&gt;
  &lt;svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"&gt;
    &lt;path d="M6 6l12 12M18 6L6 18" stroke="currentColor"/&gt;
  &lt;/svg&gt;
&lt;/button&gt;</code></pre>
  </div>
  <p><code>aria-hidden="true"</code> — decorative icons screen readers skip chestayi. Meaningful icons ki <code>aria-label</code> on button mandatory.</p>
</div>

<div class="section-title"><span class="num">3</span>Performance &amp; Fallback Icons</div>
<div class="section-body">
  <ul>
    <li>Preload only critical font weights (400, 600)</li>
    <li>SVG inline for above-fold icons — no extra request</li>
    <li>Fallback: Unicode symbols or text label if icon fails</li>
    <li>Icon sprite sheets for many repeated icons</li>
  </ul>
</div>`
  },
  {
    num: 19, file: '19-css-display.html',
    title: 'Display',
    metaTitle: 'CSS Display — block, inline, flex, none & visibility | CSS Tutorial',
    desc: 'Learn CSS display values: block, inline, inline-block, none, contents, flow-root, table, visibility, opacity, debugging, and accessibility.',
    phase: 'Phase 07: Display & Positioning', phaseNum: 7,
    topics: 'block · inline · inline-block · none · contents · flow-root · table · visibility · opacity · Debugging · Hidden vs Removed · Accessibility',
    prev: { href: '18-css-web-fonts-and-icons.html', title: '18. Web Fonts & Icons' },
    next: { href: '20-css-positioning.html', title: '20. Positioning' },
    sections: `
<div class="section-title"><span class="num">1</span>Display Values Overview</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Value</th><th>Behavior</th></tr></thead>
    <tbody>
      <tr><td><code>block</code></td><td>Full width, new line (<code>div</code>, <code>p</code>)</td></tr>
      <tr><td><code>inline</code></td><td>Content width, same line (<code>span</code>, <code>a</code>)</td></tr>
      <tr><td><code>inline-block</code></td><td>Inline flow + width/height set cheyochu</td></tr>
      <tr><td><code>none</code></td><td>Element completely removed from layout</td></tr>
      <tr><td><code>flex</code> / <code>grid</code></td><td>Modern layout modes</td></tr>
      <tr><td><code>contents</code></td><td>Box disappear — children direct parent ki attach</td></tr>
      <tr><td><code>flow-root</code></td><td>BFC create — float containment</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>visibility vs display: none</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>.hidden-layout { display: none; }       /* Removed from layout */
.invisible { visibility: hidden; }       /* Space reserved, not visible */
.fade { opacity: 0; }                   /* Transparent but interactive unless pointer-events: none */</code></pre>
  </div>
  <p><strong>Accessibility:</strong> Visually hidden but screen-reader accessible content ki <code>.sr-only</code> utility pattern use cheyandi — <code>display:none</code> screen readers kuda hide chestundi.</p>
</div>

<div class="section-title"><span class="num">3</span>Display Debugging</div>
<div class="section-body">
  <p>DevTools → Elements → Computed tab lo <code>display</code> value verify cheyandi. Unexpected layout issues often wrong display value valla vastayi.</p>
</div>`
  },
  {
    num: 20, file: '20-css-positioning.html',
    title: 'Positioning',
    metaTitle: 'CSS Positioning — relative, absolute, fixed, sticky & z-index | CSS Tutorial',
    desc: 'Master static, relative, absolute, fixed, sticky positioning, top/right/bottom/left, containing block, z-index, stacking context, sticky sidebar, fixed header, and modals.',
    phase: 'Phase 07: Display & Positioning', phaseNum: 7,
    topics: 'static · relative · absolute · fixed · sticky · top/right/bottom/left · Containing Block · z-index · Stacking Context · Sticky Sidebar · Fixed Header · Modal',
    prev: { href: '19-css-display.html', title: '19. Display' },
    next: { href: '21-css-flexbox-basics.html', title: '21. Flexbox Basics' },
    sections: `
<div class="section-title"><span class="num">1</span>Position Values</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Position</th><th>Behavior</th></tr></thead>
    <tbody>
      <tr><td><code>static</code></td><td>Default — normal document flow</td></tr>
      <tr><td><code>relative</code></td><td>Own position nundi offset — space reserved</td></tr>
      <tr><td><code>absolute</code></td><td>Nearest positioned ancestor ki relative</td></tr>
      <tr><td><code>fixed</code></td><td>Viewport ki relative — scroll avvadu</td></tr>
      <tr><td><code>sticky</code></td><td>Hybrid — scroll until threshold, then fixed</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Sticky Sidebar &amp; Fixed Header</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.sidebar {
  position: sticky;
  top: 20px;
  align-self: start;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Containing Block, z-index &amp; Stacking Context</div>
<div class="section-body">
  <p><strong>Containing block:</strong> Absolute positioned elements nearest <code>position: relative/absolute/fixed/sticky</code> ancestor ni reference ga use chestayi.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Modal</span></div>
    <pre><code>.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  position: relative;
  z-index: 1001;
}</code></pre>
  </div>
  <p><strong>Stacking context:</strong> New context creates properties — <code>position + z-index</code>, <code>opacity &lt; 1</code>, <code>transform</code>, <code>filter</code>. z-index only same context lo compare avuthundi.</p>
</div>`
  },
  {
    num: 21, file: '21-css-flexbox-basics.html',
    title: 'Flexbox Basics',
    metaTitle: 'CSS Flexbox Basics — display flex, justify-content & align-items | CSS Tutorial',
    desc: 'Learn what Flexbox is, flex container, flex items, main/cross axis, flex-direction, flex-wrap, gap, justify-content, align-items, and align-content.',
    phase: 'Phase 08: Flexbox', phaseNum: 8,
    topics: 'Flexbox Definition · Container · Items · Main Axis · Cross Axis · display:flex · flex-direction · flex-wrap · gap · justify-content · align-items · align-content',
    prev: { href: '20-css-positioning.html', title: '20. Positioning' },
    next: { href: '22-css-flex-items.html', title: '22. Flex Items' },
    sections: `
<div class="section-title"><span class="num">1</span>Flexbox Ante Enti?</div>
<div class="section-body">
  <p><strong>Flexbox ante enti?</strong> Flexbox one-dimensional layout model — items ni row or column direction lo arrange and align cheyyadaniki optimized. Main axis along flow, cross axis perpendicular.</p>
  <p>Flex container lo direct children flex items avuthayi.</p>
</div>

<div class="section-title"><span class="num">2</span>Flex Container Properties</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Navbar</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}</code></pre>
  </div>
  <ul>
    <li><code>flex-direction</code> — row (default), column, row-reverse, column-reverse</li>
    <li><code>flex-wrap</code> — nowrap, wrap, wrap-reverse</li>
    <li><code>flex-flow</code> — direction + wrap shorthand</li>
    <li><code>justify-content</code> — main axis alignment (flex-start, center, space-between, space-around)</li>
    <li><code>align-items</code> — cross axis alignment (stretch, center, flex-start, flex-end)</li>
    <li><code>align-content</code> — multi-line cross axis (when wrap enabled)</li>
    <li><code>gap</code> — space between items (modern, margin hacks avoid)</li>
  </ul>
</div>`
  },
  {
    num: 22, file: '22-css-flex-items.html',
    title: 'Flex Items',
    metaTitle: 'CSS Flex Items — flex-grow, flex-shrink, flex-basis & order | CSS Tutorial',
    desc: 'Learn flex-grow, flex-shrink, flex-basis, flex shorthand, align-self, order, equal-height layouts, centering, wrapping, and flex debugging.',
    phase: 'Phase 08: Flexbox', phaseNum: 8,
    topics: 'flex-grow · flex-shrink · flex-basis · flex shorthand · align-self · order · Flexible Cards · Equal Height · Centering · Wrapping · Common Mistakes · Debugging',
    prev: { href: '21-css-flexbox-basics.html', title: '21. Flexbox Basics' },
    next: { href: '23-css-flexbox-projects.html', title: '23. Flexbox Projects' },
    sections: `
<div class="section-title"><span class="num">1</span>flex-grow, flex-shrink, flex-basis</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>.sidebar { flex: 0 0 240px; }    /* don't grow, don't shrink, 240px basis */
.main { flex: 1 1 auto; }       /* grow to fill remaining space */
.card { flex: 1 1 300px; }       /* flexible cards, min ~300px */</code></pre>
  </div>
  <p><code>flex: 1</code> shorthand = <code>flex: 1 1 0%</code> — equal distribution.</p>
</div>

<div class="section-title"><span class="num">2</span>align-self, order &amp; Centering</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Perfect Center</span></div>
    <pre><code>.center-box {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.item-first { order: -1; }
.item-center { align-self: center; }</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Equal-Height Layouts &amp; Common Mistakes</div>
<div class="section-body">
  <div class="callout">
    <div class="callout-title">⚠️ Common Flex Mistakes</div>
    <ul style="margin:8px 0 0 18px;line-height:1.7;">
      <li><code>align-items: center</code> on parent — children stretch avvavu, equal height lost</li>
      <li>Forgetting <code>min-width: 0</code> on flex children — text overflow issues</li>
      <li>Using margins instead of <code>gap</code> for spacing</li>
      <li><code>order</code> abuse — visual order DOM order nundi different, accessibility problem</li>
    </ul>
  </div>
</div>`
  },
  {
    num: 23, file: '23-css-flexbox-projects.html',
    title: 'Flexbox Projects',
    metaTitle: 'CSS Flexbox Projects — Navbar, Cards, Modal & Footer Layouts | CSS Tutorial',
    desc: 'Build real layouts with Flexbox: navigation bar, pricing cards, profile card, login layout, centered modal, responsive header, sidebar, footer, media object, and dashboard toolbar.',
    phase: 'Phase 08: Flexbox', phaseNum: 8,
    topics: 'Navigation Bar · Pricing Cards · Profile Card · Login Layout · Centered Modal · Responsive Header · Tutorial Sidebar · Footer · Media Object · Dashboard Toolbar',
    prev: { href: '22-css-flex-items.html', title: '22. Flex Items' },
    next: { href: '24-css-grid-basics.html', title: '24. Grid Basics' },
    sections: `
<div class="section-title"><span class="num">1</span>Navigation Bar &amp; Responsive Header</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Nav + Header</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
  gap: 24px;
}

.nav-links {
  display: flex;
  gap: 16px;
  list-style: none;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Pricing Cards &amp; Profile Card</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>.pricing-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}

.pricing-card {
  flex: 1 1 280px;
  max-width: 360px;
  display: flex;
  flex-direction: column;
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 16px;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Footer, Media Object &amp; Dashboard Toolbar</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Media Object Pattern</span></div>
    <pre><code>.media {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.media-body { flex: 1; }

.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 32px;
}</code></pre>
  </div>
  <p>Other projects: login layout (centered flex), modal overlay (flex center), tutorial sidebar (column flex), dashboard toolbar (space-between + gap).</p>
</div>`
  },
  {
    num: 24, file: '24-css-grid-basics.html',
    title: 'Grid Basics',
    metaTitle: 'CSS Grid Basics — grid-template-columns, fr, repeat & minmax | CSS Tutorial',
    desc: 'Learn what CSS Grid is, grid container, grid items, rows, columns, gap, fr unit, repeat(), minmax(), explicit and implicit grid.',
    phase: 'Phase 09: CSS Grid', phaseNum: 9,
    topics: 'Grid Definition · Container · Items · Rows · Columns · grid-template-columns/rows · gap · fr · repeat() · minmax() · Explicit · Implicit Grid',
    prev: { href: '23-css-flexbox-projects.html', title: '23. Flexbox Projects' },
    next: { href: '25-css-grid-placement.html', title: '25. Grid Placement' },
    sections: `
<div class="section-title"><span class="num">1</span>CSS Grid Ante Enti?</div>
<div class="section-body">
  <p><strong>CSS Grid ante enti?</strong> CSS Grid two-dimensional layout kosam suitable — rows and columns ni simultaneously control cheyyachu. Flexbox one-dimensional; Grid page-level layouts ki ideal.</p>
</div>

<div class="section-title"><span class="num">2</span>Grid Container Basics</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Course Grid</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>.course-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}</code></pre>
  </div>
  <ul>
    <li><code>grid-template-rows</code> — explicit row sizes</li>
    <li><code>fr</code> — fractional unit, remaining space divide chestundi</li>
    <li><code>repeat(3, 1fr)</code> — 3 equal columns</li>
    <li><code>minmax(200px, 1fr)</code> — minimum 200px, maximum flexible</li>
    <li><strong>Explicit grid</strong> — defined tracks; <strong>implicit grid</strong> — auto-created rows for overflow items</li>
  </ul>
</div>`
  },
  {
    num: 25, file: '25-css-grid-placement.html',
    title: 'Grid Placement',
    metaTitle: 'CSS Grid Placement — grid-area, grid-template-areas & Spanning | CSS Tutorial',
    desc: 'Learn grid-column, grid-row, grid lines, grid-area, named areas, spanning, place-items, place-content, justify-items, align-items, and auto placement.',
    phase: 'Phase 09: CSS Grid', phaseNum: 9,
    topics: 'grid-column · grid-row · Grid Lines · grid-area · Named Areas · Spanning · place-items · place-content · justify-items · align-items · Auto Placement',
    prev: { href: '24-css-grid-basics.html', title: '24. Grid Basics' },
    next: { href: '26-css-grid-projects.html', title: '26. Grid Projects' },
    sections: `
<div class="section-title"><span class="num">1</span>Named Grid Areas — Page Layout</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — App Layout</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 0;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>grid-column, grid-row &amp; Spanning</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span></div>
    <pre><code>.hero {
  grid-column: 1 / -1;       /* span all columns */
}

.featured {
  grid-column: span 2;
  grid-row: span 2;
}

/* Line numbers: grid-column: 2 / 4; */</code></pre>
  </div>
  <p><code>place-items</code> / <code>place-content</code> — align and justify shorthand for grid container.</p>
</div>`
  },
  {
    num: 26, file: '26-css-grid-projects.html',
    title: 'Grid Projects',
    metaTitle: 'CSS Grid Projects — Dashboard, Gallery, Blog & Magazine Layouts | CSS Tutorial',
    desc: 'Build real layouts with CSS Grid: card grid, photo gallery, dashboard, tutorial layout, blog, magazine, responsive grid, sidebar-content, pricing, and admin dashboard.',
    phase: 'Phase 09: CSS Grid', phaseNum: 9,
    topics: 'Card Grid · Photo Gallery · Dashboard · Tutorial Layout · Blog Layout · Magazine · Responsive Grid · Sidebar-Content · Pricing · Admin Dashboard',
    prev: { href: '25-css-grid-placement.html', title: '25. Grid Placement' },
    next: { href: '27-css-responsive-design.html', title: '27. Responsive CSS' },
    sections: `
<div class="section-title"><span class="num">1</span>Card Grid &amp; Photo Gallery</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS</span><a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a></div>
    <pre><code>.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 8px;
}

.gallery-item:first-child {
  grid-column: span 2;
  grid-row: span 2;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Dashboard &amp; Tutorial Layout</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Dashboard</span></div>
    <pre><code>.dashboard {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  min-height: 100vh;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Blog, Magazine &amp; Responsive Grid</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Magazine Layout</span></div>
    <pre><code>.blog-layout {
  display: grid;
  grid-template-columns: 1fr min(65ch, 100%) 1fr;
  grid-column-gap: 24px;
}

.magazine {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(120px, auto);
  gap: 16px;
}</code></pre>
  </div>
  <p>Projects covered: pricing layout (equal columns), admin dashboard (sidebar + stats grid), responsive grid with <code>auto-fit</code>, sidebar-content split.</p>
</div>`
  }
];
