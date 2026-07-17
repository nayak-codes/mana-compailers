/**
 * fix_all_broken_text.js
 * Comprehensive fix for ALL mojibake (garbled/broken text) in public HTML files.
 * 
 * Patterns verified by scanning actual file bytes using verify_patterns.js.
 * Each broken sequence confirmed by its actual Unicode codepoints in the files.
 */

const fs   = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// ─── REPLACEMENT TABLE ────────────────────────────────────────────────────────
// Each entry: [brokenString, correctString]
// IMPORTANT: longer/more-specific patterns FIRST to avoid partial replacements.

const FIXES = [

  // ════════════════════════════════════════════════════════════════════════════
  // SECTION 1: BROKEN 4-BYTE EMOJI SEQUENCES
  // These appear as 🐘 (U+1F418) + extra chars because F0 9F (first 2 bytes
  // of all 4-byte emoji) were stored as U+1F418 somehow, and the remaining
  // 2 bytes became extra Windows-1252 chars.
  // ════════════════════════════════════════════════════════════════════════════

  // 🅰️ Angular badge: 🐘…°️ → 🅰️
  // U+1F170 + U+FE0F = bytes F0 9F 85 B0 EF B8 8F
  // F0 9F → 🐘; 85→…(U+2026); B0→°(U+00B0); EF B8 8F stored as 3 Latin-1 chars: U+EF U+B8 U+8F
  ['\uD83D\uDC18\u2026\u00B0\u00EF\u00B8\u008F', '🅰️'],
  ['\uD83D\uDC18\u2026\u00B0\uFE0F', '🅰️'],  // fallback with proper FE0F

  // 🟢 Green circle - Lesson/Beginner Friendly badge: 🐘Ÿ¢ → 🟢
  // U+1F7E2 = bytes F0 9F 9F A2
  // F0 9F → 🐘; 9F→Ÿ(U+0178); A2→¢(U+00A2)
  ['\uD83D\uDC18\u0178\u00A2', '🟢'],

  // 📅 Calendar - Date badge: 🐘"… → 📅
  // U+1F4C5 = bytes F0 9F 93 85
  // F0 9F → 🐘; 93→"(U+201C); 85→…(U+2026)
  ['\uD83D\uDC18\u201C\u2026', '📅'],

  // 🐍 Python snake - Python 3 badge: 🐘[control chars] → 🐍
  // U+1F40D = bytes F0 9F 90 8D
  // F0 9F 90 → 🐘; 8D→(U+008D private use/control)
  // Verified: line 270 has U+1F418 + U+0090 + U+008D
  // Actually 🐘 = F0 9F 90 98 (4 bytes), 🐍 = F0 9F 90 8D (4 bytes)
  // If stored as: 🐘(F0 9F 90 98) then an extra 8D byte → that would give trailing char
  // The actual chars in file: U+1F418(🐘) U+90(\x90) U+8D(\x8D) -- these are C1 control codes
  ['\uD83D\uDC18\u0090\u008D', '🐍'],

  // 🐹 Hamster - Go Language badge: 🐘[U+0090]¹ → 🐹
  // U+1F439 = bytes F0 9F 90 B9
  // F0 9F 90 → decoded as 🐘(F0 9F 90 98) + control char(90) since 90≠98
  // Verified: U+1F418 + U+0090 + U+00B9 in file
  ['\uD83D\uDC18\u0090\u00B9', '🐹'],

  // 🐘 PHP badge: 🐘[U+0090]˜ → 🐘
  // build_php_lessons.js uses '🐘 PHP' (elephant emoji)
  // Verified: U+1F418 + U+0090 + U+02DC in file
  ['\uD83D\uDC18\u0090\u02DC PHP', '🐘 PHP'],
  ['\uD83D\uDC18\u02DC PHP', '🐘 PHP'],  // fallback without control char

  // 🦀 Crab - Rust badge: 🐘¦€ → 🦀
  // U+1F980 = bytes F0 9F A6 80
  // F0 9F → 🐘; A6→¦(U+00A6); 80→€(U+20AC)
  ['\uD83D\uDC18\u00A6\u20AC', '🦀'],

  // 🌐 Globe - HTML Basics badge: 🐘Œ → 🌐
  // U+1F310 = bytes F0 9F 8C 90
  // F0 9F → 🐘; 8C→Œ(U+0152); 90→(U+0090 control, may be stripped)
  ['\uD83D\uDC18\u0152\u0090', '🌐'],
  ['\uD83D\uDC18\u0152', '🌐'],  // fallback without control char

  // 🟨 Yellow square - JavaScript badge: 🐘Ÿ¨ → 🟨
  // U+1F7E8 = bytes F0 9F 9F A8
  // F0 9F → 🐘; 9F→Ÿ(U+0178); A8→¨(U+00A8)
  ['\uD83D\uDC18\u0178\u00A8', '🟨'],

  // 🎨 Palette - CSS badge: 🐘Ž¨ → 🎨
  // U+1F3A8 = bytes F0 9F 8E A8
  // F0 9F → 🐘; 8E→Ž(U+017D); A8→¨(U+00A8)
  ['\uD83D\uDC18\u017D\u00A8', '🎨'],

  // 💚 Green heart - Vue.js badge: 🐘'š → 💚
  // U+1F49A = bytes F0 9F 92 9A
  // F0 9F → 🐘; 92→'(U+2019); 9A→š(U+0161)
  ['\uD83D\uDC18\u2019\u0161', '💚'],

  // 💎 Gem - Ruby badge: 🐘'Ž → 💎
  // U+1F48E = bytes F0 9F 92 8E
  // F0 9F → 🐘; 92→'(U+2019); 8E→Ž(U+017D)
  ['\uD83D\uDC18\u2019\u017D', '💎'],

  // 🔵 Blue circle - C Programming badge: 🐘"µ → 🔵
  // U+1F535 = bytes F0 9F 94 B5
  // F0 9F → 🐘; 94→"(U+201D); B5→µ(U+00B5)
  ['\uD83D\uDC18\u201D\u00B5', '🔵'],

  // 🔷 Blue diamond - C# Programming badge: 🐘"· → 🔷
  // U+1F537 = bytes F0 9F 94 B7
  // F0 9F → 🐘; 94→"(U+201D); B7→·(U+00B7)
  ['\uD83D\uDC18\u201D\u00B7', '🔷'],

  // ════════════════════════════════════════════════════════════════════════════
  // SECTION 2: BROKEN 3-BYTE EMOJI/SYMBOL SEQUENCES (E2 XX YY)
  // ════════════════════════════════════════════════════════════════════════════

  // ⚛️ React atom + variation selector: âš›ï¸ → ⚛️
  // ⚛ = U+269B = bytes E2 9A 9B; ️ = U+FE0F (variation selector, bytes EF B8 8F)
  // Broken pattern 1: E2→â; 9A→š; 9B→›; EF B8 8F stored as 3 Latin-1 chars: U+EF U+B8 U+8F
  ['\u269B\u00EF\u00B8\u008F', '⚛️'],  // atom + broken variation selector bytes
  // Broken pattern 2: full E2 9A 9B mojibake + broken FE0F
  ['\u00E2\u0161\u203A\u00EF\u00B8\u008F', '⚛️'],
  ['\u00E2\u0161\u203A\uFE0F', '⚛️'],
  ['\u00E2\u0161\u203A', '⚛'],

  // ⚡ Lightning bolt - C++ badge: âš¡ → ⚡
  // ⚡ = U+26A1 = bytes E2 9A A1
  // Broken: E2→â(U+00E2); 9A→š(U+0161); A1→¡(U+00A1)
  ['\u00E2\u0161\u00A1', '⚡'],

  // ☕ Coffee cup - Java badge: â˜• → ☕
  // ☕ = U+2615 = bytes E2 98 95
  // Broken: E2→â(U+00E2); 98→˜(U+02DC); 95→•(U+2022)
  ['\u00E2\u02DC\u2022', '☕'],

  // ▲ Up triangle - Next.js badge: â–² → ▲
  // ▲ = U+25B2 = bytes E2 96 B2
  // Broken: E2→â(U+00E2); 96→–(U+2013); B2→²(U+00B2)
  ['\u00E2\u2013\u00B2', '▲'],

  // ▶ Play button - section-title/sidebar: â–¶ → ▶
  // ▶ = U+25B6 = bytes E2 96 B6
  // Broken: E2→â(U+00E2); 96→–(U+2013); B6→¶(U+00B6)
  // Verified in file: U+E2 U+2013 U+B6
  ['\u00E2\u2013\u00B6', '▶'],

  // ← Left arrow - nav footer: â† → ←
  // ← = U+2190 = bytes E2 86 90
  // Broken: E2→â(U+00E2); 86→†(U+2020); 90→(U+0090 device control char)
  // Verified in file: U+E2 U+2020 U+0090
  ['\u00E2\u2020\u0090', '←'],

  // → Right arrow - nav footer: â†' → →
  // → = U+2192 = bytes E2 86 92
  // Broken: E2→â(U+00E2); 86→†(U+2020); 92→'(U+2019)
  // Verified in file: U+E2 U+2020 U+2019
  ['\u00E2\u2020\u2019', '→'],

  // ════════════════════════════════════════════════════════════════════════════
  // SECTION 3: COMMON TEXT MOJIBAKE (meta descriptions, content text)
  // ════════════════════════════════════════════════════════════════════════════

  // › Right single guillemet - breadcrumb separator: â€º → ›
  // › = U+203A = bytes E2 80 BA
  // Broken: E2→â(U+00E2); 80→€(U+20AC); BA→º(U+00BA)
  // Verified in file: U+E2 U+20AC U+BA
  ['\u00E2\u20AC\u00BA', '\u203A'],

  // – En dash: â€" → –
  // – = U+2013 = bytes E2 80 93
  // Broken: E2→â; 80→€; 93→"(U+201C)
  ['\u00E2\u20AC\u201C', '\u2013'],

  // — Em dash: â€" → —
  // — = U+2014 = bytes E2 80 94
  // Broken: E2→â; 80→€; 94→"(U+201D)
  // Verified in file: U+E2 U+20AC U+201D
  ['\u00E2\u20AC\u201D', '\u2014'],

  // … Ellipsis: â€¦ → …
  // … = U+2026 = bytes E2 80 A6
  ['\u00E2\u20AC\u00A6', '\u2026'],

  // • Bullet: â€¢ → •
  // • = U+2022 = bytes E2 80 A2
  ['\u00E2\u20AC\u00A2', '\u2022'],

  // " Left double quote: â€œ → "
  // " = U+201C = bytes E2 80 9C → broken: â + € + œ(U+0153)
  ['\u00E2\u20AC\u0153', '\u201C'],

  // " Right double quote: â€ → "
  // " = U+201D = bytes E2 80 9D → broken: â + € + (U+009D)
  ['\u00E2\u20AC\u009D', '\u201D'],

  // ' Left single quote: â€˜ → '
  ['\u00E2\u20AC\u02DC', '\u2018'],

  // ' Right single quote: â€™ → '
  ['\u00E2\u20AC\u2122', '\u2019'],
];

// ─────────────────────────────────────────────────────────────────────────────

function getFilesRecursively(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = getFilesRecursively(publicDir);
const htmlFiles = allFiles.filter(f => f.endsWith('.html'));

console.log(`Processing ${htmlFiles.length} HTML files...\n`);

let filesFixed = 0;
let totalReplacements = 0;

for (const fpath of htmlFiles) {
  let html = fs.readFileSync(fpath, 'utf8');
  let fileReplacements = 0;

  for (const [broken, correct] of FIXES) {
    if (html.includes(broken)) {
      const count = html.split(broken).length - 1;
      html = html.split(broken).join(correct);
      fileReplacements += count;
    }
  }

  if (fileReplacements > 0) {
    fs.writeFileSync(fpath, html, 'utf8');
    filesFixed++;
    totalReplacements += fileReplacements;
    const rel = path.relative(publicDir, fpath);
    console.log(`  Fixed ${fileReplacements} issues in: ${rel}`);
  }
}

console.log(`\n✅ Fixed ${totalReplacements} encoding issues across ${filesFixed} HTML files!`);

if (filesFixed === 0) {
  console.log('No broken patterns found - files may already be fixed, or patterns need adjustment.');
}
