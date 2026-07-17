const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

// Helper to get files recursively
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

function updateSitemap() {
  const allFiles = getFilesRecursively(publicDir);
  const htmlFiles = allFiles
    .filter(f => f.endsWith('.html') && !f.endsWith('index.html'))
    .map(f => path.relative(publicDir, f).replace(/\\/g, '/')); // Normalize paths for URL formatting

  // Add the newly created compiler pages to sitemap
  const compilerPages = [
    'online-python-compiler.html',
    'online-java-compiler.html',
    'online-c-compiler.html',
    'online-cpp-compiler.html',
    'online-javascript-compiler.html',
    'online-csharp-compiler.html',
    'online-go-compiler.html',
    'online-rust-compiler.html',
    'online-php-compiler.html',
    'online-ruby-compiler.html'
  ];
  htmlFiles.push(...compilerPages);

  const dateStr = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Root URL
  xml += `  <url>\n`;
  xml += `    <loc>https://www.ourcompiler.com/</loc>\n`;
  xml += `    <lastmod>${dateStr}</lastmod>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `  </url>\n`;

  // Add all HTML files
  htmlFiles.forEach(f => {
    let priority = '0.6';
    let freq = 'weekly';

    // Highlight main hub pages with higher priority
    const hubPages = [
      'blog.html', 
      'blog-python.html', 
      'blog-java.html', 
      'blog-javascript.html', 
      'blog-c.html', 
      'blog-cpp.html', 
      'blog-go.html', 
      'blog-rust.html', 
      'blog-php.html', 
      'blog-ruby.html', 
      'about.html', 
      'features.html', 
      'contact.html', 
      'privacy-policy.html'
    ];
    
    if (compilerPages.includes(f)) {
      priority = '0.9';
      freq = 'daily';
    } else if (hubPages.includes(f)) {
      priority = '0.8';
      freq = 'monthly';
    }

    xml += `  <url>\n`;
    xml += `    <loc>https://www.ourcompiler.com/${f}</loc>\n`;
    xml += `    <lastmod>${dateStr}</lastmod>\n`;
    xml += `    <changefreq>${freq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;

  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`🎉 Sitemap updated successfully at public/sitemap.xml with ${htmlFiles.length + 1} links!`);
}

updateSitemap();
