/**
 * decode_badges.js  
 * Decode what each broken emoji sequence should actually be.
 * Strategy: look at the bytes of the broken chars and reconstruct original emoji.
 */

// The broken chars appear when a UTF-8 file's bytes were read as Latin-1/Windows-1252
// then saved again as UTF-8, causing double-encoding.
// To fix: we take the broken Unicode chars, get their codepoints, treat low bytes as 
// the original UTF-8 bytes, and decode.

function fixMojibake(brokenStr) {
  // Get the raw bytes that the broken characters represent in ISO-8859-1
  const bytes = [];
  for (const ch of brokenStr) {
    const cp = ch.codePointAt(0);
    if (cp <= 0xFF) {
      bytes.push(cp);
    } else if (cp === 0x0178) { // Ÿ mapped from 0x9F in win1252
      bytes.push(0x9F);
    } else if (cp === 0x2013) { // – mapped from 0x96 in win1252
      bytes.push(0x96);
    } else if (cp === 0x2014) { // — mapped from 0x97 in win1252
      bytes.push(0x97);
    } else if (cp === 0x2018) { // ' mapped from 0x91 in win1252
      bytes.push(0x91);
    } else if (cp === 0x2019) { // ' mapped from 0x92 in win1252
      bytes.push(0x92);
    } else if (cp === 0x201C) { // " mapped from 0x93 in win1252
      bytes.push(0x93);
    } else if (cp === 0x201D) { // " mapped from 0x94 in win1252
      bytes.push(0x94);
    } else if (cp === 0x2022) { // • mapped from 0x95 in win1252
      bytes.push(0x95);
    } else if (cp === 0x2026) { // … mapped from 0x85 in win1252
      bytes.push(0x85);
    } else if (cp === 0x2020) { // † mapped from 0x86 in win1252
      bytes.push(0x86);
    } else if (cp === 0x2021) { // ‡ mapped from 0x87 in win1252
      bytes.push(0x87);
    } else if (cp === 0x02C6) { // ˆ mapped from 0x88 in win1252
      bytes.push(0x88);
    } else if (cp === 0x2030) { // ‰ mapped from 0x89 in win1252
      bytes.push(0x89);
    } else if (cp === 0x0160) { // Š mapped from 0x8A in win1252
      bytes.push(0x8A);
    } else if (cp === 0x2039) { // ‹ mapped from 0x8B in win1252
      bytes.push(0x8B);
    } else if (cp === 0x0152) { // Œ mapped from 0x8C in win1252
      bytes.push(0x8C);
    } else if (cp === 0x017D) { // Ž mapped from 0x8E in win1252
      bytes.push(0x8E);
    } else if (cp === 0x2122) { // ™ mapped from 0x99 in win1252
      bytes.push(0x99);
    } else if (cp === 0x0161) { // š mapped from 0x9A in win1252
      bytes.push(0x9A);
    } else if (cp === 0x203A) { // › mapped from 0x9B in win1252
      bytes.push(0x9B);
    } else if (cp === 0x0153) { // œ mapped from 0x9C in win1252
      bytes.push(0x9C);
    } else if (cp === 0x017E) { // ž mapped from 0x9E in win1252
      bytes.push(0x9E);
    } else if (cp === 0x0178) { // Ÿ mapped from 0x9F in win1252
      bytes.push(0x9F);
    } else if (cp === 0x20AC) { // € mapped from 0x80 in win1252
      bytes.push(0x80);
    } else if (cp === 0x201A) { // ‚ mapped from 0x82 in win1252
      bytes.push(0x82);
    } else if (cp === 0x0192) { // ƒ mapped from 0x83 in win1252
      bytes.push(0x83);
    } else if (cp === 0x201E) { // „ mapped from 0x84 in win1252
      bytes.push(0x84);
    } else if (cp === 0x02DC) { // ˜ mapped from 0x98 in win1252
      bytes.push(0x98);
    } else {
      // Multi-byte codepoint - skip (these are correctly encoded chars like 🐘)
      bytes.push(...Buffer.from(String.fromCodePoint(cp), 'utf8'));
    }
  }
  
  try {
    return Buffer.from(bytes).toString('utf8');
  } catch(e) {
    return null;
  }
}

// All the broken badge inner texts (without span tags)
const brokenBadges = [
  'â˜• Java',           // ☕ Java ?
  'âš¡ C++',            // ⚡ C++
  'âš›ï¸ React',        // ⚛️ React
  'â–² Next.js',        // ▲ Next.js
  '🐘Ÿ¢ Beginner Friendly',
  '🐘Ÿ¢ Advanced Friendly',
  '🐘Ÿ¢ Intermediate Friendly',
  '🐘Ÿ¢ Beginner to Advanced',
  '🐘Ÿ¢ Lesson 1',
  '🐘"… July 2026',
  '🐘¹ Go Language',
  '🐘˜ PHP',
  '🐘¦€ Rust',
  '🐘Œ HTML Basics',
  '🐘Ÿ¨ JavaScript',
  '🐘Ž¨ CSS',
  '🐘\'š Vue.js',
  '🐘\'Ž Ruby',
  '🐘"µ C Programming',
  '🐘"· C# Programming',
  '🐘…°ï¸ Angular',
];

console.log('Decoding broken badge texts:\n');
for (const broken of brokenBadges) {
  // The 🐘 elephant (U+1F418) at the start of many means F0 9F 90 98 is stored correctly
  // But the NEXT chars are the mojibake. Let's split off the emoji prefix.
  
  // Find the first non-ASCII chars that might be broken
  // Actually let's just try to fix the whole thing
  const fixed = fixMojibake(broken);
  console.log(`Broken: ${JSON.stringify(broken)}`);
  console.log(`Fixed:  ${JSON.stringify(fixed)}`);
  console.log();
}

// Also decode single-char broken sequences:
const singleBroken = [
  'â€º',   // breadcrumb
  'â€"',   // em dash in meta
  'â–¶',   // play button
  'â†',    // left arrow
  'â†\'',  // right arrow
  'â†\'',  // right arrow variant
  'â˜•',   // coffee
  'âš¡',   // lightning
];

console.log('\nDecoding single broken sequences:\n');
for (const b of singleBroken) {
  console.log(`${JSON.stringify(b)} → ${JSON.stringify(fixMojibake(b))}`);
}
