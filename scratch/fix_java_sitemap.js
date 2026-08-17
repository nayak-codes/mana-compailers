const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');

const javaLessons = [
  '01-welcome-hello-world.html',
  '02-java-setup-and-program-structure.html',
  '03-variables-and-data-types.html',
  '04-operators-and-input.html',
  '05-conditions.html',
  '06-loops.html',
  '07-strings.html',
  '08-arrays.html',
  '09-methods.html',
  '10-classes-and-objects.html',
  '11-constructors-and-encapsulation.html',
  '12-inheritance-and-polymorphism.html',
  '13-abstraction-and-interfaces.html',
  '14-exception-handling.html',
  '15-file-handling.html',
  '16-collections.html',
  '17-generics.html',
  '18-lambda-expressions.html',
  '19-stream-api.html',
  '20-date-and-time.html',
  '21-multithreading.html',
  '22-networking-and-apis.html',
  '23-jdbc-and-databases.html',
  '24-maven-and-testing.html',
  '25-spring-boot-basics.html',
  '26-java-projects.html',
  '27-interview-preparation.html'
];

let javaUrls = `  <url>
    <loc>https://www.ourcompiler.com/online-java-compiler.html</loc>
    <lastmod>2026-07-30</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.ourcompiler.com/blog-java.html</loc>
    <lastmod>2026-07-30</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;

javaLessons.forEach(file => {
  javaUrls += `  <url>
    <loc>https://www.ourcompiler.com/blog-java/${file}</loc>
    <lastmod>2026-07-30</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>\n`;
});

// Remove any existing java or blog-java entries first to avoid duplicates
sitemap = sitemap.replace(/  <url>\s*<loc>https:\/\/www\.ourcompiler\.com\/(?:blog-java|online-java-compiler)[^<]*<\/loc>[\s\S]*?<\/url>\n?/g, '');

// Insert after blog-c or near beginning
if (sitemap.includes('https://www.ourcompiler.com/blog-c.html')) {
  sitemap = sitemap.replace(
    /(<loc>https:\/\/www\.ourcompiler\.com\/blog-c\.html<\/loc>[\s\S]*?<\/url>\n)/,
    `$1${javaUrls}`
  );
} else {
  sitemap = sitemap.replace('</urlset>', `${javaUrls}</urlset>`);
}

fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log('✅ Updated sitemap.xml with Java compiler, Java blog hub, and all 27 Java lessons!');
