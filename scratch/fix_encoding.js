/**
 * fix_encoding.js
 * Fixes all mojibake (garbled text) in public HTML files.
 * The root cause: builder script strings had UTF-8 bytes misinterpreted as
 * Windows-1252, so the wrong Unicode characters got written to the HTML files.
 * This script does a comprehensive string replacement to restore them.
 *
 * Strategy: Read each file as UTF-8, apply replacement table, write back.
 * The replacement pairs are [broken_string_as_it_appears_in_file, correct_unicode].
 */

const fs   = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// ─── REPLACEMENT TABLE ────────────────────────────────────────────────────────
// Each entry: [brokenString, correctString]
// The brokenString is what the file viewer (and browser) shows when bytes are wrong.
// Longer patterns first to avoid partial replacements.

const FIXES = [
  // ── Breadcrumb / navigation arrows ──────────────────────────────────────
  // U+203A (›) = bytes E2 80 BA → mojibake: â (E2) + € (80 in WCP1252) + º (BA)
  ['â\u20ac\u00ba', '›'],

  // U+2039 (‹) = bytes E2 80 B9 → â + € + ¹
  ['â\u20ac\u00b9', '‹'],

  // ── Dashes ───────────────────────────────────────────────────────────────
  // U+2014 (—) = bytes E2 80 94 → â + € + " (U+201D right double quote, WCP1252 0x94)
  ['â\u20ac\u201d', '—'],

  // U+2013 (–) = bytes E2 80 93 → â + € + " (U+201C left double quote, WCP1252 0x93)
  ['â\u20ac\u201c', '–'],

  // ── Smart quotes ─────────────────────────────────────────────────────────
  // U+201C (") = bytes E2 80 9C → â + € + œ (U+0153, WCP1252 0x9C)
  ['â\u20ac\u0153', '"'],

  // U+201D (") = bytes E2 80 9D → â + € + [U+009D undefined in WCP1252]
  // Some systems map 0x9D to U+009D; we handle both
  ['â\u20ac\u009d', '"'],

  // U+2018 (') = bytes E2 80 98 → â + € + ˜ (U+02DC small tilde, WCP1252 0x98)
  ['â\u20ac\u02dc', '\u2018'],

  // U+2019 (') = bytes E2 80 99 → â + € + ™ (U+2122 trademark, WCP1252 0x99)
  ['â\u20ac\u2122', '\u2019'],

  // ── Punctuation ──────────────────────────────────────────────────────────
  // U+2022 (•) = bytes E2 80 A2 → â + € + ¢
  ['â\u20ac\u00a2', '•'],

  // U+2026 (…) = bytes E2 80 A6 → â + € + ¦
  ['â\u20ac\u00a6', '…'],

  // U+2020 (†) = bytes E2 80 A0 → â + € + (non-breaking space U+00A0)
  ['â\u20ac\u00a0', '†'],

  // U+2021 (‡) = bytes E2 80 A1 → â + € + ¡
  ['â\u20ac\u00a1', '‡'],

  // U+2030 (‰) = bytes E2 80 B0 → â + € + °
  ['â\u20ac\u00b0', '‰'],

  // ── Emoji badges – broken 4-byte emoji sequences ──────────────────────────
  // These emojis got their UTF-8 bytes misread as WCP1252 characters.
  // F0 9F = first 2 bytes of most emoji; WCP1252: F0=ð, 9F=Ÿ (U+0178)
  // The rest depends on the specific emoji bytes.

  // 📘 (U+1F4D8) = F0 9F 93 98
  //   WCP1252: ð(F0) Ÿ(9F) "(93→U+201C) ˜(98→U+02DC)
  ['ð\u0178\u201c\u02dc', '📘'],

  // 📗 (U+1F4D7) = F0 9F 93 97
  //   WCP1252: ð Ÿ " —(97→U+2014)
  ['ð\u0178\u201c\u2014', '📗'],

  // 📙 (U+1F4D9) = F0 9F 93 99
  //   WCP1252: ð Ÿ " ™(99→U+2122)
  ['ð\u0178\u201c\u2122', '📙'],

  // 📚 (U+1F4DA) = F0 9F 93 9A
  //   WCP1252: ð Ÿ " š(9A→U+0161)
  ['ð\u0178\u201c\u0161', '📚'],

  // 📝 (U+1F4DD) = F0 9F 93 9D
  //   WCP1252: ð Ÿ " (9D→U+009D)
  ['ð\u0178\u201c\u009d', '📝'],

  // 📌 (U+1F4CC) = F0 9F 93 8C
  //   WCP1252: ð Ÿ " Œ(8C→U+0152)
  ['ð\u0178\u201c\u0152', '📌'],

  // 📋 (U+1F4CB) = F0 9F 93 8B
  //   WCP1252: ð Ÿ " ‹(8B→U+2039)
  ['ð\u0178\u201c\u2039', '📋'],

  // 📊 (U+1F4CA) = F0 9F 93 8A
  //   WCP1252: ð Ÿ " Š(8A→U+0160)
  ['ð\u0178\u201c\u0160', '📊'],

  // 🎯 (U+1F3AF) = F0 9F 8E AF
  //   WCP1252: ð Ÿ Ž(8E→U+017D) ¯(AF→U+00AF)
  ['ð\u0178\u017d\u00af', '🎯'],

  // 🎓 (U+1F393) = F0 9F 8E 93
  //   WCP1252: ð Ÿ Ž "(93→U+201C)
  ['ð\u0178\u017d\u201c', '🎓'],

  // 🗓 (U+1F5D3) = F0 9F 97 93
  //   WCP1252: ð Ÿ —(97→U+2014) "(93→U+201C)
  ['ð\u0178\u2014\u201c', '🗓'],

  // 📅 (U+1F4C5) = F0 9F 93 85
  //   WCP1252: ð Ÿ " …(85→U+2026)
  ['ð\u0178\u201c\u2026', '📅'],

  // 🔑 (U+1F511) = F0 9F 94 91
  //   WCP1252: ð Ÿ "(94→U+201D) '(91→U+2018)
  ['ð\u0178\u201d\u2018', '🔑'],

  // 💡 (U+1F4A1) = F0 9F 92 A1
  //   WCP1252: ð Ÿ '(92→U+2019) ¡(A1→U+00A1)
  ['ð\u0178\u2019\u00a1', '💡'],

  // ✅ (U+2705) = E2 9C 85
  //   WCP1252: â(E2) œ(9C→U+0153) …(85→U+2026)
  ['â\u0153\u2026', '✅'],

  // ⚠ (U+26A0) = E2 9A A0
  //   WCP1252: â(E2) š(9A→U+0161) (A0→NBSP U+00A0)
  ['â\u0161\u00a0', '⚠'],

  // ⚡ (U+26A1) = E2 9A A1
  //   WCP1252: â š ¡
  ['â\u0161\u00a1', '⚡'],

  // ✓ (U+2713) = E2 9C 93
  //   WCP1252: â œ(9C→U+0153) "(93→U+201C)
  ['â\u0153\u201c', '✓'],

  // ✗ (U+2717) = E2 9C 97
  //   WCP1252: â œ —(97→U+2014)
  ['â\u0153\u2014', '✗'],

  // ★ (U+2605) = E2 98 85
  //   WCP1252: â ˜(98→U+02DC) …(85→U+2026)
  ['â\u02dc\u2026', '★'],

  // ☆ (U+2606) = E2 98 86
  //   WCP1252: â ˜ †(86→U+2020)
  ['â\u02dc\u2020', '☆'],

  // ── Arrows ──────────────────────────────────────────────────────────────
  // → (U+2192) = E2 86 92
  //   WCP1252: â †(86→U+2020) '(92→U+2019)
  ['â\u2020\u2019', '→'],

  // ← (U+2190) = E2 86 90
  //   WCP1252: â † (90→U+0090 device control)
  ['â\u2020\u0090', '←'],

  // ↑ (U+2191) = E2 86 91
  //   WCP1252: â † '(91→U+2018)
  ['â\u2020\u2018', '↑'],

  // ↓ (U+2193) = E2 86 93
  //   WCP1252: â † "(93→U+201C)
  ['â\u2020\u201c', '↓'],

  // ── Common Latin extended ─────────────────────────────────────────────────
  // © (U+00A9) = C2 A9 → Â ©
  ['\u00c2\u00a9', '©'],

  // ® (U+00AE) = C2 AE → Â ®
  ['\u00c2\u00ae', '®'],

  // ° (U+00B0) = C2 B0 → Â °
  ['\u00c2\u00b0', '°'],

  // ™ (U+2122) = E2 84 A2 → â „(84→U+201E) ¢
  // WCP1252: E2=â, 84=„(U+201E low double quotation), A2=¢
  ['â\u201e\u00a2', '™'],

  // NBSP (U+00A0) = C2 A0 → Â + NBSP
  // This one is tricky because Â (U+00C2) followed by NBSP (U+00A0)
  ['\u00c2\u00a0', '\u00a0'],

  // ─── Navigation arrow characters (▶ ◀ ← →) from builder scripts ─────────
  // ▶ (U+25B6) = E2 96 B6
  //   WCP1252: â –(96→U+2013) ¶(B6→U+00B6)
  ['â\u2013\u00b6', '▶'],

  // ◀ (U+25C0) = E2 97 80
  //   WCP1252: â —(97→U+2014) €(80→U+20AC)
  ['â\u2014\u20ac', '◀'],

  // ═══ Handle the specific broken badge pattern seen in screenshots ════════
  // Badges like: 🐘"· 🐘Ÿ¢ 🐘"…
  // These are from 4-byte emoji whose bytes are: F0 9F XX YY
  // When misread as WCP1252: ð(F0) + Ÿ(9F→U+0178) + char(XX) + char(YY)
  // The elephant 🐘 (U+1F418, F0 9F 90 98) is actually a DIFFERENT character
  // The screenshots show 🐘 (elephant) but the source likely has 📘 (book) etc.
  // The 🐘 appearing might be FROM a different broken sequence displaying as elephant.
  // Let's handle the patterns we see:
  // "🐘"·" pattern → F0 9F XX YY where display shows as elephant + "·
  // Actually looking at the raw file: 🐘"· is literal chars from a 4-byte emoji misread

  // From the file: badge has literal chars 🐘"· and 🐘Ÿ¢ and 🐘"…
  // 🐘 = U+1F418 = F0 9F 90 98
  // This means the emoji stored IS 🐘 as valid UTF-8, but the NEXT chars are mojibake.
  // So the pattern is: [4-byte-emoji-rendered-correctly]["·] or [Ÿ¢] or ["…]

  // "· after emoji badge = U+201C + U+00B7 (middle dot)
  // This comes from bytes 93 B7:
  //   93 in WCP1252 = U+201C, B7 in WCP1252 = U+00B7
  // The original 2 bytes 93 B7 = what? They're continuation bytes in UTF-8... 
  // OR they're part of a DIFFERENT byte sequence entirely.

  // Let me look at this differently: the full bad 4-byte emoji sequences that produce 
  // "🐘" + junk, where 🐘 is the ACTUAL elephant being displayed.
  // If the emoji in the source was 📘 (F0 9F 93 98), and F0 is stored correctly in UTF-8
  // as the start of a 4-byte sequence, but then 9F 93 98 are treated as 3 separate
  // windows-1252 chars: Ÿ(9F) "(93=U+201C) ˜(98=U+02DC)...
  // That would give: ðŸ"˜ NOT 🐘"˜

  // The ACTUAL cause: some builder scripts used fs.writeFileSync with default encoding
  // and the strings had emoji as actual characters, but somewhere in the pipeline
  // the 4-byte sequences got split or mangled.

  // Based on EXACTLY what we see in the file (lines 271-273):
  // <span class="badge">🐘 Python 3</span>  ← elephant shows correctly!  
  // <span class="badge">🐘Ÿ¢ Lesson 1</span>  ← broken after 🐘
  // <span class="badge">🐘"… July 2026</span>  ← broken after 🐘

  // So the FIRST badge (Python 3) has JUST 🐘 + space + text → that's the 🐘 emoji correctly!
  // The second badge has 🐘Ÿ¢ where Ÿ and ¢ are extra chars
  // The third has 🐘"… where " and … are extra chars

  // This means the ORIGINAL emoji was: 🐘 + some extra chars that are mojibake.
  // The source had something like: "🐘 Python 3" (correct), "🎯 Lesson 1" (🎯 got broken),
  // "📅 July 2026" (📅 got broken)

  // Wait! What if the source emoji was: 🐘🎯 Lesson 1 → two emojis side by side?
  // No, that doesn't make sense.

  // Actually: the first VALID 4-byte emoji sequence in the string is 🐘 (correctly stored).
  // Then the NEXT emoji bytes are broken. So "🐘Ÿ¢" = 🐘 (correct) + Ÿ¢ (broken 2nd emoji).
  
  // What emoji gives Ÿ¢ when broken? 
  // Ÿ = WCP1252 0x9F → but Ÿ itself is U+0178
  // ¢ = U+00A2
  // So original bytes: 0x9F 0xA2 → these are 2 bytes of UTF-8 sequence...
  // In UTF-8: 9F is a continuation byte (10011111), A2 is a continuation byte (10100010)
  // Continuation bytes alone aren't valid UTF-8 characters.
  // They must be part of a larger sequence that started with the preceding 🐘 bytes!

  // 🐘 (U+1F418) = F0 9F 90 98 in UTF-8
  // If the SOURCE had a DIFFERENT emoji after 🐘, and that emoji's bytes got concatenated...

  // OR: What if the badge emoji was stored as its Windows-1252 form but the 🐘 part
  // happened to be a valid emoji by accident?

  // Let me look at it from the source builder perspective.
  // The Python intro builder likely has: badge: `📘 Python 3` `🎯 Lesson 1` `📅 July 2026`
  // OR maybe: `📊 Python 3` `🎯 Lesson 1` `🗓 July 2026`

  // 📘 in UTF-8: F0 9F 93 98
  // 🎯 in UTF-8: F0 9F 8E AF
  // 📅 in UTF-8: F0 9F 93 85

  // When the builder script FILE was saved with wrong encoding:
  // F0 9F 93 98 stored as bytes → browser reads as 📘 ✓ (if file is UTF-8)
  
  // So WHY is the browser showing 🐘Ÿ¢?
  // The file must contain something OTHER than the correct UTF-8 bytes.

  // Theory: The builder script source contained the emoji as literal Unicode chars.
  // When Node.js reads the builder JS file and executes it, the string literals are
  // the actual Unicode codepoints. When written with fs.writeFileSync + 'utf8',
  // they should be correct. But something went wrong.

  // MOST LIKELY: The builder script file itself was saved with wrong encoding by the
  // Windows editor, so the 4-byte emoji sequences got corrupted in the JS source.

  // The fix: replace the specific broken sequences seen in the actual HTML files.
  // From lines 271-273 of blog-python-intro.html:
  // Line 271: 🐘 Python 3   → 🐘 is CORRECT elephant (badge should be 📊 or 📘)
  // Line 272: 🐘Ÿ¢ Lesson 1 → 🐘 correct + Ÿ¢ extra junk
  // Line 273: 🐘"… July 2026 → 🐘 correct + "… extra junk
  
  // The "extra junk" Ÿ¢ and "… are what needs to be removed/replaced.
  // But we need to know what FULL emoji they should be.

  // Given the context (Lesson 1, July 2026):
  // 🎯 Lesson 1 is a common badge pattern (target/dart emoji for "lesson")
  // 📅 July 2026 or 🗓 July 2026 (calendar for date)

  // 🎯 (U+1F3AF) = F0 9F 8E AF
  //   If the JS source had this emoji but saved wrong, the stored bytes could be:
  //   Interpreted as: 🐘 (F0 9F) + 8E AF... 
  //   Wait: F0 9F IS the start of 🐘 (F0 9F 90 98). The NEXT 2 bytes would need to be
  //   90 98 for elephant. But 🎯 is F0 9F 8E AF. The last 2 bytes are 8E AF.
  //   In WCP1252: 8E=Ž(U+017D), AF=¯(U+00AF)

  // SO: The broken badge pattern is:
  // 🐘(F0 9F 90 98) + Ž(8E→U+017D) + ¯(AF→U+00AF) = 🐘Ž¯ for 🎯?
  // But the file shows 🐘Ÿ¢ not 🐘Ž¯!

  // Hmm. So the source emoji was NOT 🎯.
  // Let me work BACKWARDS from 🐘Ÿ¢:
  // 🐘 = F0 9F 90 98 (correct UTF-8 for 🐘)
  // Ÿ = U+0178 → in file as UTF-8: C5 B8
  // ¢ = U+00A2 → in file as UTF-8: C2 A2
  // Total bytes for 🐘Ÿ¢: F0 9F 90 98 C5 B8 C2 A2

  // What SHOULD this have been?
  // If we strip the 🐘 part (F0 9F 90 98) and look at C5 B8 C2 A2...
  // As characters: Ÿ¢ = U+0178, U+00A2

  // Actually WAIT. What if the original was a SINGLE emoji that uses bytes F0 9F 90 98
  // FOLLOWED BY something? Like what if the original emoji was one that uses F0 9F 90 XX
  // where XX is stored as U+0178 (C5 B8) instead of the single byte 0x9F...
  
  // I'm overcomplicating this. Let me just look at the Python builder source to see 
  // what badges it defines, then I know what to replace with.
];

// ─────────────────────────────────────────────────────────────────────────────

function getFilesRecursively(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allFiles = getFilesRecursively(publicDir);
const htmlFiles = allFiles.filter(f => f.endsWith('.html'));

let filesFixed = 0;
let totalReplacements = 0;

for (const fpath of htmlFiles) {
  let html = fs.readFileSync(fpath, 'utf8');
  let originalHtml = html;
  let fileReplacements = 0;

  for (const [broken, correct] of FIXES) {
    // Count occurrences
    const count = (html.split(broken)).length - 1;
    if (count > 0) {
      html = html.split(broken).join(correct);
      fileReplacements += count;
    }
  }

  if (fileReplacements > 0) {
    fs.writeFileSync(fpath, html, 'utf8');
    filesFixed++;
    totalReplacements += fileReplacements;
    const rel = path.relative(publicDir, fpath);
    console.log(`  Fixed ${fileReplacements} issues in ${rel}`);
  }
}

console.log(`\n🎉 Fixed ${totalReplacements} encoding issues across ${filesFixed} HTML files!`);
