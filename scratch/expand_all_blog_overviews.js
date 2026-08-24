const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

const overviewGuides = {
  'blog-postgresql.html': {
    title: 'PostgreSQL Masterclass Overview & Enterprise Relational Database Guide',
    intro: `<p>PostgreSQL is an advanced, open-source object-relational database management system (ORDBMS) renowned for reliability, feature robustness, and performance. Supporting complex data types, JSON queries, GIS spatial data (PostGIS), and ACID transactions, PostgreSQL is trusted by Apple, Instagram, Uber, and Spotify.</p>`,
    syntaxTitle: '🐘 PostgreSQL Query & Table Creation Example',
    code: `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email) 
VALUES ('dev_user', 'dev@ourcompiler.com');

SELECT * FROM users WHERE email LIKE '%@ourcompiler.com';`,
    mistakes: `<ul>
  <li><strong>1. Missing Indexes on Foreign Keys:</strong> Forgetting to index columns used in JOIN queries leads to slow sequential table scans.</li>
  <li><strong>2. Over-using SELECT *:</strong> Fetching unneeded columns increases I/O memory bandwidth consumption.</li>
  <li><strong>3. Transaction Locking:</strong> Long-running open transactions holding table locks delay concurrent user queries.</li>
</ul>`,
    faqs: [
      { q: "What is the difference between MySQL and PostgreSQL?", a: "MySQL is a popular relational database optimized for fast reads, while PostgreSQL is an object-relational database offering advanced data types, JSON support, and strict ANSI SQL compliance." },
      { q: "What is PostGIS?", a: "PostGIS is a spatial database extender for PostgreSQL that adds support for geographic objects, allowing location queries to be run in SQL." }
    ]
  },

  'blog-testing.html': {
    title: 'Software Testing & Quality Assurance Masterclass Overview',
    intro: `<p>Software Testing is the practice of evaluating software applications to identify bugs, verify functional requirements, and ensure performance reliability before deployment. Modern testing pipelines combine Unit Testing, Integration Testing, End-to-End (E2E) Automation, and Continuous Integration (CI/CD) checks.</p>`,
    syntaxTitle: '🧪 Automated Testing Code Example (Jest / Pytest)',
    code: `// Jest Unit Test Example
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

test('calculates correct order total', () => {
  const cart = [{ price: 10, quantity: 2 }, { price: 5, quantity: 1 }];
  expect(calculateTotal(cart)).toBe(25);
});`,
    mistakes: `<ul>
  <li><strong>1. Testing Implementation Details instead of Behavior:</strong> Tests that break whenever internal variable names change are fragile.</li>
  <li><strong>2. Flaky Tests:</strong> Tests that randomly fail due to race conditions or external API dependencies.</li>
  <li><strong>3. Lack of Test Isolation:</strong> Tests depending on state modified by previous tests.</li>
</ul>`,
    faqs: [
      { q: "What is TDD (Test-Driven Development)?", a: "TDD is a development process where developers write automated test cases before writing the actual implementation code." },
      { q: "What is the difference between Unit Testing and Integration Testing?", a: "Unit Testing tests isolated functions or components in isolation, while Integration Testing verifies that multiple modules or services work together correctly." }
    ]
  }
};

const files = ['blog-postgresql.html', 'blog-testing.html'];

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  const guide = overviewGuides[file];
  const articleHtml = `
    <!-- Comprehensive Overview & Learning Guide (AdSense High-Value Content) -->
    <article style="background:var(--bg2, #141922); border:1px solid var(--border, #27303f); border-radius:12px; padding:28px; margin:32px 0; line-height:1.7;">
      <h2 style="font-size:22px; color:var(--text, #ffffff); margin-bottom:16px; font-family:'Sora',sans-serif;">${guide.title}</h2>
      ${guide.intro}

      <h3 style="font-size:18px; color:var(--accent, #10b981); margin-top:24px; margin-bottom:12px; font-family:'Sora',sans-serif;">${guide.syntaxTitle}</h3>
      <div style="background:#0d1117; border:1px solid #21262d; border-radius:8px; padding:16px; font-family:'JetBrains Mono',monospace; font-size:13.5px; color:#e6edf3; overflow-x:auto; margin-bottom:20px;">
        <pre><code>${guide.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>

      <h3 style="font-size:18px; color:var(--accent, #10b981); margin-top:24px; margin-bottom:12px; font-family:'Sora',sans-serif;">⚠️ Common Beginner Pitfalls & Mistakes</h3>
      ${guide.mistakes}

      <h3 style="font-size:18px; color:var(--accent, #10b981); margin-top:24px; margin-bottom:12px; font-family:'Sora',sans-serif;">❓ Frequently Asked Questions (FAQ)</h3>
      ${guide.faqs.map(faq => `
        <div style="margin-bottom:16px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:14px 18px; border-radius:8px;">
          <strong style="color:var(--accent, #10b981); display:block; margin-bottom:4px;">Q: ${faq.q}</strong>
          <span style="color:var(--text2, #8b949e); font-size:14px;">${faq.a}</span>
        </div>
      `).join('')}
    </article>`;

  if (!content.includes('Overview & Architecture Guide') && !content.includes('Masterclass Overview')) {
    if (content.includes('</div>\n\n    <!-- Quick Start Card -->')) {
      content = content.replace('</div>\n\n    <!-- Quick Start Card -->', `</div>\n${articleHtml}\n\n    <!-- Quick Start Card -->`);
    } else if (content.includes('<main class="content">')) {
      content = content.replace('<main class="content">', `<main class="content">\n${articleHtml}`);
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Injected rich article overview into ${file}`);
  }
});
