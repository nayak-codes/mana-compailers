/**
 * update_topnav.js
 * Replaces the top navigation bar inside all public blog and tutorial HTML files
 * recursively with a comprehensive scrollable list of 43 technologies.
 */

const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, '..', 'public');

const links = [
  { name: 'Python', url: '/blog-python.html', key: 'python' },
  { name: 'Java', url: '/blog-java.html', key: 'java' },
  { name: 'JavaScript', url: '/blog-javascript.html', key: 'javascript' },
  { name: 'C', url: '/blog-c.html', key: 'c' },
  { name: 'C++', url: '/blog-cpp.html', key: 'cpp' },
  { name: 'C#', url: '/blog-csharp.html', key: 'csharp' }, // Updated C# to point to its tutorial!
  { name: 'Go', url: '/blog-go.html', key: 'go' },
  { name: 'Ruby', url: '/blog-ruby.html', key: 'ruby' },
  { name: 'Rust', url: '/blog-rust.html', key: 'rust' },
  { name: 'PHP', url: '/blog-php.html', key: 'php' },
  { name: 'HTML', url: '/blog-html.html', key: 'html' },
  { name: 'CSS', url: '/blog-css.html', key: 'css' },
  { name: 'React', url: '/blog-react.html', key: 'react' },
  { name: 'Angular', url: '/blog-angular.html', key: 'angular' },
  { name: 'Vue.js', url: '/blog-vue.html', key: 'vuejs' },
  { name: 'Next.js', url: '/blog-nextjs.html', key: 'nextjs' },
  { name: 'Node.js', url: '/blog-nodejs.html', key: 'nodejs' },
  { name: 'REST API', url: '/blog-rest-api.html', key: 'restapi' },
  { name: 'GraphQL', url: '/blog-graphql.html', key: 'graphql' },
  { name: 'Spring Boot', url: '/blog-spring-boot.html', key: 'springboot' },
  { name: 'Django', url: '/blog-django.html', key: 'django' },
  { name: 'Flask', url: '/blog-flask.html', key: 'flask' },
  { name: 'Express.js', url: '/blog-express.html', key: 'expressjs' },
  { name: 'PostgreSQL', url: '/blog-postgresql.html', key: 'postgresql' },
  { name: 'MySQL', url: '/blog-mysql.html', key: 'mysql' },
  { name: 'MongoDB', url: '/blog-mongodb.html', key: 'mongodb' },
  { name: 'SQLite', url: '/blog-sqlite.html', key: 'sqlite' },
  { name: 'Redis', url: '/blog-redis.html', key: 'redis' },
  { name: 'Cassandra', url: '/blog-cassandra.html', key: 'cassandra' },
  { name: 'AWS', url: '/blog-aws.html', key: 'aws' },
  { name: 'Azure', url: '/blog-azure.html', key: 'azure' },
  { name: 'Google Cloud', url: '/blog-gcloud.html', key: 'gcloud' },
  { name: 'Docker', url: '/blog-docker.html', key: 'docker' },
  { name: 'Kubernetes', url: '/blog-kubernetes.html', key: 'kubernetes' },
  { name: 'CI/CD', url: '/blog-cicd.html', key: 'cicd' },
  { name: 'Data Science', url: '/blog-data-science.html', key: 'datascience' },
  { name: 'Machine Learning', url: '/blog-ml.html', key: 'ml' },
  { name: 'Deep Learning', url: '/blog-deep-learning.html', key: 'deeplearning' },
  { name: 'TensorFlow', url: '/blog-tensorflow.html', key: 'tensorflow' },
  { name: 'PyTorch', url: '/blog-pytorch.html', key: 'pytorch' },
  { name: 'Big Data', url: '/blog-big-data.html', key: 'bigdata' },
  { name: 'Git & GitHub', url: '/blog-git.html', key: 'git' },
  { name: 'Linux', url: '/blog-linux.html', key: 'linux' },
  { name: 'Shell Scripting', url: '/blog-shell.html', key: 'shell' },
  { name: 'Testing', url: '/blog-testing.html', key: 'testing' },
  { name: 'Agile & Scrum', url: '/blog-agile.html', key: 'agile' }
];

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
const blogFiles = allFiles.filter(f => f.endsWith('.html') && !f.endsWith('index.html'));

let count = 0;
for (const fpath of blogFiles) {
  let html = fs.readFileSync(fpath, 'utf8');

  // Detect active key based on path name
  let activeKey = '';
  const lowercasePath = fpath.toLowerCase();
  if (lowercasePath.includes('python')) activeKey = 'python';
  else if (lowercasePath.includes('java') && !lowercasePath.includes('javascript')) activeKey = 'java';
  else if (lowercasePath.includes('javascript')) activeKey = 'javascript';
  else if (lowercasePath.includes('cpp')) activeKey = 'cpp';
  else if (lowercasePath.includes('csharp')) activeKey = 'csharp';
  else if (lowercasePath.includes('blog-c-') || fpath.endsWith('blog-c.html')) activeKey = 'c';
  else if (lowercasePath.includes('rust')) activeKey = 'rust';
  else if (lowercasePath.includes('go')) activeKey = 'go';
  else if (lowercasePath.includes('php')) activeKey = 'php';
  else if (lowercasePath.includes('ruby')) activeKey = 'ruby';
  else if (lowercasePath.includes('blog-html')) activeKey = 'html';
  else if (lowercasePath.includes('blog-css')) activeKey = 'css';
  else if (lowercasePath.includes('blog-react')) activeKey = 'react';
  else if (lowercasePath.includes('blog-angular')) activeKey = 'angular';
  else if (lowercasePath.includes('blog-vue')) activeKey = 'vuejs';
  else if (lowercasePath.includes('blog-nextjs')) activeKey = 'nextjs';
  else if (lowercasePath.includes('blog-nodejs')) activeKey = 'nodejs';
  else if (lowercasePath.includes('blog-rest-api')) activeKey = 'restapi';
  else if (lowercasePath.includes('blog-graphql')) activeKey = 'graphql';
  else if (lowercasePath.includes('blog-spring-boot')) activeKey = 'springboot';
  else if (lowercasePath.includes('blog-django')) activeKey = 'django';
  else if (lowercasePath.includes('blog-flask')) activeKey = 'flask';
  else if (lowercasePath.includes('blog-express')) activeKey = 'expressjs';
  else if (lowercasePath.includes('blog-postgresql')) activeKey = 'postgresql';
  else if (lowercasePath.includes('blog-mysql')) activeKey = 'mysql';
  else if (lowercasePath.includes('blog-mongodb')) activeKey = 'mongodb';
  else if (lowercasePath.includes('blog-sqlite')) activeKey = 'sqlite';
  else if (lowercasePath.includes('blog-redis')) activeKey = 'redis';
  else if (lowercasePath.includes('blog-cassandra')) activeKey = 'cassandra';
  else if (lowercasePath.includes('blog-aws')) activeKey = 'aws';
  else if (lowercasePath.includes('blog-azure')) activeKey = 'azure';
  else if (lowercasePath.includes('blog-gcloud')) activeKey = 'gcloud';
  else if (lowercasePath.includes('blog-docker')) activeKey = 'docker';
  else if (lowercasePath.includes('blog-kubernetes')) activeKey = 'kubernetes';
  else if (lowercasePath.includes('blog-cicd')) activeKey = 'cicd';
  else if (lowercasePath.includes('blog-data-science')) activeKey = 'datascience';
  else if (lowercasePath.includes('blog-ml')) activeKey = 'ml';
  else if (lowercasePath.includes('blog-deep-learning')) activeKey = 'deeplearning';
  else if (lowercasePath.includes('blog-tensorflow')) activeKey = 'tensorflow';
  else if (lowercasePath.includes('blog-pytorch')) activeKey = 'pytorch';
  else if (lowercasePath.includes('blog-big-data')) activeKey = 'bigdata';
  else if (lowercasePath.includes('blog-git')) activeKey = 'git';
  else if (lowercasePath.includes('blog-linux')) activeKey = 'linux';
  else if (lowercasePath.includes('blog-shell')) activeKey = 'shell';
  else if (lowercasePath.includes('blog-testing')) activeKey = 'testing';
  else if (lowercasePath.includes('blog-agile')) activeKey = 'agile';

  // Build the .topnav HTML block dynamically
  let topnavHtml = '<nav class="topnav">\n';
  topnavHtml += '  <a href="/" class="brand">🖥️ Our Compiler</a>\n';
  
  for (const link of links) {
    const isActive = activeKey && link.key === activeKey;
    const activeClass = isActive ? ' class="active"' : '';
    
    if (link.url === '#') {
      topnavHtml += `  <a href="#"${activeClass} onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">${link.name}</a>\n`;
    } else {
      topnavHtml += `  <a href="${link.url}"${activeClass}>${link.name}</a>\n`;
    }
  }
  topnavHtml += '</nav>';

  // Replace existing <nav class="topnav"> ... </nav> block
  const navRegex = /<nav\s+class="topnav">[\s\S]*?<\/nav>/i;
  if (navRegex.test(html)) {
    html = html.replace(navRegex, topnavHtml);
    fs.writeFileSync(fpath, html, 'utf8');
    count++;
  }
}

console.log(`🎉 Successfully updated topnav navigation across ${count} HTML files!`);
