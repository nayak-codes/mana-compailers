/**
 * build_mongodb_first_20.js
 * Generates extensive, high-quality, long-form content for MongoDB Chapters 1 through 20.
 */

const fs   = require('fs');
const path = require('path');

const mongoDir = path.join(__dirname, '..', 'public', 'blog-mongodb');

// Helper function to build structured sections
function sec(num, title, body) {
  return `    <div class="section">
      <div class="section-title"><span class="num">${num}</span>${title}</div>
      <div class="section-body">
${body}
      </div>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// DETAILED CONTENT FOR CHAPTERS 1 - 20
// ─────────────────────────────────────────────────────────────────────────────

const chapters = {
  1: {
    file: '01-mongodb-introduction.html',
    title: 'MongoDB — What is MongoDB & NoSQL?',
    intro: 'Welcome to Chapter 1 of the MongoDB Masterclass! In this lesson, we break down what NoSQL is, why modern web applications rely heavily on document databases, and how MongoDB stores data as flexible BSON documents.',
    content: [
      sec(1, "What is NoSQL & The Shift From Relational Databases", `
<p>For decades, software development was dominated by Relational Database Management Systems (RDBMS) like MySQL, PostgreSQL, and Oracle. In relational databases, data is organized into fixed <strong>tables</strong>, <strong>rows</strong>, and <strong>columns</strong>. While this structure works well for tabular data, it creates friction when working with modern object-oriented programming languages and rapidly evolving application requirements.</p>

<p><strong>NoSQL</strong> (which stands for "Not Only SQL") represents a category of databases designed to handle diverse data models — including key-value pairs, wide-column stores, graphs, and <strong>documents</strong>. MongoDB is the world's leading document-oriented NoSQL database.</p>

<div class="callout">
  <div class="callout-title">💡 Why NoSQL Emerged:</div>
  <ul style="line-height:1.8;margin-left:20px;">
    <li><strong>Unstructured & Semi-Structured Data:</strong> Modern apps process social feeds, JSON payloads, sensor logs, and media metadata that don't fit neatly into rigid tables.</li>
    <li><strong>Agile Development:</strong> Changing a SQL table schema requiring <code>ALTER TABLE</code> can lock production tables and cause downtime. NoSQL document databases are schema-flexible.</li>
    <li><strong>Horizontal Scalability:</strong> Traditional SQL databases scale vertically (buying larger hardware). NoSQL databases like MongoDB scale horizontally out-of-the-box using sharding across cheap commodity clusters.</li>
  </ul>
</div>
`),
      sec(2, "Core MongoDB Concepts: Mapping SQL to MongoDB", `
<p>To transition smoothly to MongoDB, it is helpful to map traditional SQL database concepts to their MongoDB equivalents:</p>

<table class="tbl">
  <thead>
    <tr><th>SQL Relational Concept</th><th>MongoDB Concept</th><th>Detailed Description</th></tr>
  </thead>
  <tbody>
    <tr><td>Database</td><td>Database</td><td>A container holding related collections of data.</td></tr>
    <tr><td>Table</td><td>Collection</td><td>A grouping of BSON documents (equivalent to a table without strict column definitions).</td></tr>
    <tr><td>Row / Record</td><td>Document</td><td>A single self-contained data record expressed as BSON (Binary JSON).</td></tr>
    <tr><td>Column</td><td>Field</td><td>A key-value pair inside a document.</td></tr>
    <tr><td>Primary Key</td><td><code>_id</code> Field</td><td>Unique identifier automatically generated for every document.</td></tr>
    <tr><td>Table Join</td><td>Embedded Document / <code>$lookup</code></td><td>Related data is embedded inside the document or joined using the <code>$lookup</code> stage.</td></tr>
  </tbody>
</table>
`),
      sec(3, "Anatomy of a MongoDB BSON Document", `
<p>MongoDB stores data as <strong>BSON</strong> (Binary JSON). In code, documents look like standard JSON objects with support for rich data types such as dates, 64-bit integers, and <code>ObjectId</code>s.</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">BSON Document Structure</span></div>
  <pre><code>{
  "_id": ObjectId("65d8f1e2a9b3c4d5e6f7a8b9"),
  "username": "tech_guru",
  "email": "guru@ourcompiler.com",
  "age": 28,
  "isVerified": true,
  "skills": ["JavaScript", "Node.js", "MongoDB", "Docker"],
  "profile": {
    "firstName": "Balaji",
    "lastName": "Nayak",
    "avatar": "https://example.com/avatar.png"
  },
  "loginCount": 142,
  "createdAt": ISODate("2026-08-26T10:15:30.000Z")
}</code></pre>
</div>

<p>Notice how the <code>profile</code> key contains an embedded object and <code>skills</code> contains an array of strings. In SQL, this single record would require three separate tables (<code>users</code>, <code>profiles</code>, <code>user_skills</code>) connected with foreign key JOINs.</p>
`),
      sec(4, "Key Features & Real-World Use Cases", `
<p>MongoDB is trusted by industry giants like Forbes, eBay, Adobe, and Uber for critical systems. Key architectural features include:</p>

<ul style="line-height:1.8;margin-left:20px;">
  <li><strong>WiredTiger Storage Engine:</strong> Provides document-level concurrency control, memory caching, and data compression (Snappy / Zlib).</li>
  <li><strong>High Availability (Replication):</strong> Uses 3-node Replica Sets with automatic failover to guarantee 99.999% uptime.</li>
  <li><strong>Horizontal Scalability (Sharding):</strong> Automatically partitions collections across multiple database instances based on a shard key.</li>
  <li><strong>Rich Aggregation Framework:</strong> Allows complex data transformations, grouping, and analytics directly inside the database.</li>
</ul>
`),
      sec(5, "Hands-On Challenge & Summary", `
<div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:20px;">
  <strong style="color:#00ed64;display:block;margin-bottom:8px;font-size:16px;">🎯 Practice Exercise:</strong>
  <p>Think about a Blogging Application. Write down the JSON structure of a <code>Post</code> document that includes the post title, content, author information, tags array, and a list of embedded comments (with commenter name and text). Compare how many SQL tables would be needed for the same feature!</p>
</div>
`)
    ]
  },

  2: {
    file: '02-mongodb-vs-sql.html',
    title: 'MongoDB — MongoDB vs SQL Databases',
    intro: 'A deep-dive technical comparison between MongoDB and Relational SQL databases (MySQL/PostgreSQL). Learn when to pick MongoDB, when to stick with SQL, and how data modeling differs between the two paradigms.',
    content: [
      sec(1, "The Fundamental Architectural Difference", `
<p>The core difference between SQL and MongoDB lies in how data relationships and schemas are handled. SQL databases are built around <strong>Relational Normalization</strong> (splitting data across small tables to eliminate redundancy). MongoDB is built around <strong>Document Co-location</strong> (grouping related data together inside the same document for fast retrieval).</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">SQL Approach vs MongoDB Approach</span></div>
  <pre><code>-- SQL Approach (Requires 2 Tables + JOIN query)
-- Table 1: Users (id, name, email)
-- Table 2: Orders (id, user_id, total, status)

SELECT Users.name, Orders.total 
FROM Users 
INNER JOIN Orders ON Users.id = Orders.user_id 
WHERE Users.id = 101;


// MongoDB Approach (Single Document Fetch - No JOIN needed!)
db.users.findOne(
  { _id: 101 },
  { name: 1, "orders.total": 1 }
)</code></pre>
</div>
`),
      sec(2, "Detailed Feature-by-Feature Comparison Matrix", `
<table class="tbl">
  <thead>
    <tr><th>Feature</th><th>Relational SQL (MySQL / PostgreSQL)</th><th>MongoDB (NoSQL Document Store)</th></tr>
  </thead>
  <tbody>
    <tr><td>Data Storage</td><td>Tables with strict columns and rows</td><td>Collections of flexible BSON documents</td></tr>
    <tr><td>Schema Flexibility</td><td>Rigid (Schema-on-Write). Requires ALTER TABLE to add columns.</td><td>Dynamic (Schema-on-Read). Documents can have varied fields.</td></tr>
    <tr><td>Query Language</td><td>Structured Query Language (SQL)</td><td>MongoDB Query API (JSON/JavaScript spec)</td></tr>
    <tr><td>Data Relationships</td><td>Foreign Keys and JOIN operations</td><td>Embedded Sub-Documents or <code>$lookup</code> References</td></tr>
    <tr><td>ACID Transactions</td><td>Native multi-table ACID transactions</td><td>Multi-document ACID transactions (supported since v4.0)</td></tr>
    <tr><td>Scaling Strategy</td><td>Vertical Scaling (Upgrading RAM/CPU on one machine)</td><td>Horizontal Scaling (Sharding data across clusters)</td></tr>
    <tr><td>Read Performance</td><td>Slower on complex multi-table JOIN queries</td><td>Blazing fast on embedded document reads</td></tr>
  </tbody>
</table>
`),
      sec(3, "When Should You Choose MongoDB?", `
<div class="callout">
  <div class="callout-title">✅ Ideal MongoDB Use Cases:</div>
  <ul style="line-height:1.8;margin-left:20px;">
    <li><strong>E-Commerce Catalogs:</strong> Products with wildly varying attributes (electronics have screen size/RAM; clothing has color/size).</li>
    <li><strong>Real-Time Analytics & Dashboards:</strong> Ingesting high-volume event streams, telemetry, and time-series data.</li>
    <li><strong>Content Management & User Profiles:</strong> Storing dynamic user metadata, preferences, and multi-language posts.</li>
    <li><strong>Agile & Rapid Prototyping:</strong> Requirements change daily during early startup development.</li>
    <li><strong>Mobile & Microservices Backends:</strong> APIs that natively send and receive JSON data.</li>
  </ul>
</div>
`),
      sec(4, "When Should You Choose SQL?", `
<div class="callout" style="border-left-color:#ff4757;">
  <div class="callout-title" style="color:#ff4757;">⚠️ When SQL is Still Better:</div>
  <ul style="line-height:1.8;margin-left:20px;">
    <li><strong>Banking & Financial Ledgers:</strong> Applications requiring strict multi-row relational constraints and legacy ACID compliance.</li>
    <li><strong>Highly Structured ERP Systems:</strong> Systems with thousands of interconnected entities where every record must adhere strictly to predefined column specs.</li>
  </ul>
</div>
`),
      sec(5, "Summary & Key Decision Rule", `
<p><strong>Rule of Thumb:</strong> If your application data reads together, store it together in MongoDB. If your data consists of deeply interconnected normalized relations that rarely change, choose SQL.</p>
`)
    ]
  },

  3: {
    file: '03-mongodb-installation.html',
    title: 'MongoDB — MongoDB Installation & Setup',
    intro: 'Complete guide to downloading, installing, and configuring MongoDB Community Server 7.0+ on Windows, macOS, and Linux. Learn how to verify the mongod background service and launch mongosh.',
    content: [
      sec(1, "MongoDB Architecture: Server vs Shell vs GUI", `
<p>Before installing, it is essential to understand the three distinct binaries in the MongoDB ecosystem:</p>

<ul style="line-height:1.8;margin-left:20px;">
  <li><strong><code>mongod</code> (Database Daemon):</strong> The background database server process that handles disk read/write, memory caching, index creation, and client connections.</li>
  <li><strong><code>mongosh</code> (MongoDB Shell):</strong> The modern interactive JavaScript command-line interface used to run queries and admin commands.</li>
  <li><strong>MongoDB Compass:</strong> The official graphical user interface (GUI) for visual data inspection.</li>
</ul>
`),
      sec(2, "Installing MongoDB on Windows (Step-by-Step)", `
<ol style="line-height:1.8;margin-left:20px;">
  <li>Go to the official <a href="https://www.mongodb.com/try/download/community" target="_blank" style="color:#00ed64;">MongoDB Download Center</a> and download the <strong>Windows MSI Installer</strong> for MongoDB Community Server 7.0+.</li>
  <li>Run the installer executable. Choose <strong>Complete Setup</strong>.</li>
  <li>Check the option <strong>"Install MongoDB as a Service"</strong>. This ensures <code>mongod</code> starts automatically when Windows boots up.</li>
  <li>Leave the default Service Name (<code>MongoDB</code>) and Data Directory paths (<code>C:\\Program Files\\MongoDB\\Server\\7.0\\data\\</code>).</li>
  <li>Check <strong>"Install MongoDB Compass"</strong> to get the official visual GUI client. Click Install!</li>
</ol>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Windows Command Prompt / PowerShell Verification</span></div>
  <pre><code># Check if mongod service is running
net start | findstr MongoDB

# If not running, start it manually
net start MongoDB</code></pre>
</div>
`),
      sec(3, "Installing MongoDB on macOS via Homebrew", `
<p>For Mac users, Homebrew is the easiest way to install and manage MongoDB:</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">macOS Terminal Commands</span></div>
  <pre><code># 1. Tap the official MongoDB Homebrew repository
brew tap mongodb/brew

# 2. Install MongoDB Community Edition
brew install mongodb-community@7.0

# 3. Start MongoDB background service
brew services start mongodb-community@7.0

# 4. Verify service status
brew services list</code></pre>
</div>
`),
      sec(4, "Installing MongoDB on Linux (Ubuntu/Debian)", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Ubuntu Terminal Commands</span></div>
  <pre><code># 1. Import official GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg

# 2. Add APT repository list
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# 3. Update package list and install
sudo apt update
sudo apt install -y mongodb-org

# 4. Start & enable systemd service
sudo systemctl start mongod
sudo systemctl enable mongod</code></pre>
</div>
`),
      sec(5, "Verifying Installation with mongosh", `
<p>Open your terminal or command prompt and execute <code>mongosh</code>:</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">mongosh Output</span></div>
  <pre><code>$ mongosh
Connecting to: mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000
Using MongoDB:      7.0.5
Using Mongosh:      2.1.1

test> db.runCommand({ ping: 1 })
{ ok: 1 }</code></pre>
</div>

<p>If you see <code>{ ok: 1 }</code>, congratulations! Your local MongoDB database engine is running smoothly.</p>
`)
    ]
  },

  4: {
    file: '04-mongodb-atlas.html',
    title: 'MongoDB — MongoDB Atlas Cloud Database',
    intro: 'Learn how to deploy a cloud-hosted MongoDB cluster on MongoDB Atlas (Free M0 Tier), configure IP Access Whitelisting, set up database credentials, and connect remotely from Node.js or mongosh.',
    content: [
      sec(1, "What is MongoDB Atlas?", `
<p><strong>MongoDB Atlas</strong> is the official Database-as-a-Service (DBaaS) developed by MongoDB Inc. Instead of manually provisioning servers, configuring disk storage, setting up firewall rules, and configuring backups, Atlas handles server management automatically across cloud infrastructure (AWS, Google Cloud, or Microsoft Azure).</p>

<div class="callout">
  <div class="callout-title">⚡ Advantages of MongoDB Atlas:</div>
  <ul style="line-height:1.8;margin-left:20px;">
    <li><strong>Free Tier (M0 Cluster):</strong> Includes 512 MB storage, shared RAM, and full features forever.</li>
    <li><strong>Automated Backups:</strong> Point-in-time recovery and automated cluster snapshots.</li>
    <li><strong>Global Cloud Distribution:</strong> Deploy multi-region clusters near your end users.</li>
    <li><strong>Built-in Security:</strong> TLS/SSL encryption in-transit, disk encryption at-rest, and VPC peering.</li>
  </ul>
</div>
`),
      sec(2, "Step-by-Step: Creating a Free M0 Cluster", `
<ol style="line-height:1.8;margin-left:20px;">
  <li>Go to <a href="https://www.mongodb.com/cloud/atlas/register" target="_blank" style="color:#00ed64;">mongodb.com/cloud/atlas</a> and register a free account.</li>
  <li>Click <strong>Create a Deployment</strong>. Select the <strong>M0 Free Cluster</strong> option.</li>
  <li>Choose your preferred Cloud Provider (AWS / GCP / Azure) and a Region close to your location (e.g., <code>ap-south-1</code> Mumbai for India).</li>
  <li>Give your cluster a name (e.g., <code>Cluster0</code>) and click <strong>Create Cluster</strong>.</li>
</ol>
`),
      sec(3, "Configuring Network & User Security", `
<p>Atlas blocks all incoming connections by default until you configure security rules:</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Security Setup Steps</span></div>
  <pre><code>1. Database Access (User Credentials):
   - Go to Security -> Database Access -> Add New Database User.
   - Select Password authentication.
   - Enter a Username (e.g., admin_user) and a strong Password.
   - Assign Role: "Read and write to any database".

2. Network Access (IP Whitelist):
   - Go to Security -> Network Access -> Add IP Address.
   - Click "Add Current IP Address" (or 0.0.0.0/0 for development access).
   - Click Confirm.</code></pre>
</div>
`),
      sec(4, "Connecting to Atlas via SRV Connection String", `
<p>In Atlas, click <strong>Connect</strong> on your cluster card. Select <strong>Drivers (Node.js/Python)</strong> or <strong>Compass / mongosh</strong> to get your connection URI:</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">SRV Connection URI Format</span></div>
  <pre><code>// Format:
mongodb+srv://&lt;username&gt;:&lt;password&gt;@&lt;cluster-address&gt;.mongodb.net/&lt;dbname&gt;?retryWrites=true&w=majority

// Example mongosh command:
mongosh "mongodb+srv://admin_user:MySecretPassword123@cluster0.abcde.mongodb.net/myAppDB"</code></pre>
</div>
`)
    ]
  },

  5: {
    file: '05-compass-and-mongosh.html',
    title: 'MongoDB — MongoDB Compass & mongosh CLI',
    intro: 'Master the visual features of MongoDB Compass and the command-line REPL environment of mongosh. Learn how to run scripts, visualize indexes, and inspect schema structures.',
    content: [
      sec(1, "MongoDB Compass Features Overview", `
<p><strong>MongoDB Compass</strong> is the official graphical user interface (GUI). It allows developers and DBAs to visually query, analyze, and optimize MongoDB data without typing raw commands.</p>

<ul style="line-height:1.8;margin-left:20px;">
  <li><strong>Documents Tab:</strong> View records in Tree View, JSON View, or Table View. Edit or delete documents with single-click buttons.</li>
  <li><strong>Schema Tab:</strong> Analyze field types, sampling data to inspect data cleanliness and missing fields.</li>
  <li><strong>Explain Plan Tab:</strong> Visually inspect query execution stages (IXSCAN vs COLLSCAN).</li>
  <li><strong>Aggregations Pipeline Builder:</strong> Build multi-stage aggregation pipelines with instant intermediate stage previews.</li>
</ul>
`),
      sec(2, "Mastering the mongosh Interactive REPL", `
<p><strong><code>mongosh</code></strong> is a modern Node.js-based REPL environment that supports ES6 JavaScript syntax, asynchronous promises, and custom helper methods.</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Useful mongosh Shortcuts & Commands</span></div>
  <pre><code>// List databases
show dbs

// Switch database context
use company_db

// Show active database name
db

// List collections
show collections

// Run inline JavaScript loops in mongosh
for (let i = 1; i <= 5; i++) {
  db.logs.insertOne({ logId: i, timestamp: new Date() });
}

// Print collection statistics
db.logs.stats()</code></pre>
</div>
`),
      sec(3, "Visual vs CLI Workflow Comparison", `
<table class="tbl">
  <thead>
    <tr><th>Task</th><th>mongosh CLI</th><th>MongoDB Compass GUI</th></tr>
  </thead>
  <tbody>
    <tr><td>Quick CRUD Testing</td><td>⚡ Extremely fast with command history</td><td>Good for visual visual editing</td></tr>
    <tr><td>Building Aggregation Pipeline</td><td>Requires manual JSON array syntax</td><td>✨ Visual stage-by-stage pipeline editor</td></tr>
    <tr><td>Server Admin & Scripting</td><td>Automation scripts via <code>.js</code> files</td><td>Read-only inspection</td></tr>
    <tr><td>Schema Analysis</td><td>Requires aggregations / mapReduce</td><td>Visual charts showing data types</td></tr>
  </tbody>
</table>
`)
    ]
  },

  6: {
    file: '06-databases-and-collections.html',
    title: 'MongoDB — Databases & Collections Management',
    intro: 'Learn how to create, list, and drop databases and collections in MongoDB. Understand implicit creation, explicit creation options, and capped collections for circular logging.',
    content: [
      sec(1, "Managing Databases in MongoDB", `
<p>In MongoDB, databases are namespaces that group collections together. Unlike SQL, you do not need to issue a <code>CREATE DATABASE</code> command before inserting data.</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Database Commands</span></div>
  <pre><code>// 1. Switch to a database (creates it in memory if it doesn't exist)
use store_db

// 2. Show databases (only databases containing at least 1 document are listed!)
show dbs

// 3. Drop the active database
db.dropDatabase()
// Output: { ok: 1, dropped: "store_db" }</code></pre>
</div>
`),
      sec(2, "Implicit vs Explicit Collection Creation", `
<p>MongoDB supports two ways to create a collection:</p>

<ul style="line-height:1.8;margin-left:20px;">
  <li><strong>Implicit Creation:</strong> Simply insert a document into a non-existent collection name. MongoDB automatically creates the collection on-the-fly!</li>
  <li><strong>Explicit Creation:</strong> Use <code>db.createCollection(name, options)</code> when you need custom collection options like validation or capping.</li>
</ul>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Collection Examples</span></div>
  <pre><code>// Implicit creation:
db.customers.insertOne({ name: "Alice", score: 95 });

// Explicit creation with options:
db.createCollection("products", {
  capped: false,
  storageEngine: { wiredTiger: {} }
});</code></pre>
</div>
`),
      sec(3, "Capped Collections (Fixed-Size Circular Buffers)", `
<p>A <strong>Capped Collection</strong> is a fixed-size collection that works like a circular FIFO (First-In, First-Out) buffer. When the specified maximum size or document limit is reached, MongoDB automatically overwrites the oldest documents with new ones!</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Creating a Capped Log Collection</span></div>
  <pre><code>// Create a capped collection of max 5 MB or 1,000 documents
db.createCollection("system_logs", {
  capped: true,
  size: 5242880, // 5 MB in bytes
  max: 1000      // max 1000 docs
});

// Check if a collection is capped:
db.system_logs.isCapped() // returns true</code></pre>
</div>
`),
      sec(4, "Collection Management Commands Cheat Sheet", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">mongosh Commands</span></div>
  <pre><code>// List collections in active database
show collections

// Rename a collection
db.customers.renameCollection("users")

// Drop a collection completely (deletes all documents & indexes)
db.users.drop()</code></pre>
</div>
`)
    ]
  },

  7: {
    file: '07-documents-and-bson.html',
    title: 'MongoDB — Documents & BSON Data Types',
    intro: 'Understand the BSON specification, document structures, array fields, embedded sub-documents, and the 16 MB document size limit.',
    content: [
      sec(1, "What is BSON?", `
<p>While developers write queries using JSON syntax, MongoDB stores documents internally as <strong>BSON</strong> (Binary JSON). BSON was designed to achieve three key benefits: fast serialisation/deserialisation, compact binary storage, and support for rich data types missing in standard JSON.</p>
`),
      sec(2, "Complete BSON Data Types Reference", `
<table class="tbl">
  <thead>
    <tr><th>BSON Type</th><th>Type Number</th><th>Description & Example</th></tr>
  </thead>
  <tbody>
    <tr><td>String</td><td>2</td><td>UTF-8 encoded string: <code>"Hello World"</code></td></tr>
    <tr><td>Integer (32-bit)</td><td>16</td><td>Standard integer: <code>NumberInt(42)</code></td></tr>
    <tr><td>Long (64-bit)</td><td>18</td><td>64-bit integer for large counts: <code>NumberLong(9007199254740991)</code></td></tr>
    <tr><td>Decimal128</td><td>19</td><td>High-precision decimal for currency: <code>NumberDecimal("99.95")</code></td></tr>
    <tr><td>Double</td><td>1</td><td>64-bit IEEE 754 floating point number: <code>3.14159</code></td></tr>
    <tr><td>Boolean</td><td>8</td><td><code>true</code> or <code>false</code></td></tr>
    <tr><td>Date</td><td>9</td><td>64-bit UTC timestamp: <code>ISODate("2026-08-26T12:00:00Z")</code></td></tr>
    <tr><td>ObjectId</td><td>7</td><td>12-byte primary key identifier: <code>ObjectId("...")</code></td></tr>
    <tr><td>Array</td><td>4</td><td>Ordered list of elements: <code>["apple", "banana"]</code></td></tr>
    <tr><td>Object</td><td>3</td><td>Embedded sub-document: <code>{ city: "Hyderabad" }</code></td></tr>
    <tr><td>Null</td><td>10</td><td>Null or missing value: <code>null</code></td></tr>
    <tr><td>Binary Data</td><td>5</td><td>Raw binary blobs (UUIDs, images): <code>BinData(...)</code></td></tr>
  </tbody>
</table>
`),
      sec(3, "The 16 MB Document Size Limit", `
<p>In MongoDB, a single BSON document cannot exceed <strong>16 Megabytes</strong> in size. This design limit serves two critical purposes:</p>

<ul style="line-height:1.8;margin-left:20px;">
  <li>Prevents developers from creating massive unbounded documents that saturate network RAM.</li>
  <li>Ensures fast memory lookup times in WiredTiger cache.</li>
</ul>

<div class="callout" style="border-left-color:#ffa500;">
  <div class="callout-title" style="color:#ffa500;">⚠️ Schema Tip:</div>
  <p>If you need to store files larger than 16 MB (such as videos or PDFs), use <strong>GridFS</strong> instead of embedding raw binary data directly into documents!</p>
</div>
`)
    ]
  },

  8: {
    file: '08-id-and-objectid.html',
    title: 'MongoDB — The _id Field & ObjectId Mechanics',
    intro: 'Explore the 12-byte binary structure of MongoDB ObjectIds, extract creation timestamps, and learn when to use custom _id values vs auto-generated ObjectIds.',
    content: [
      sec(1, "The Role of the _id Field", `
<p>In MongoDB, every document stored in a collection MUST contain a unique <code>_id</code> field that acts as its primary key. If you insert a document without an <code>_id</code> field, MongoDB automatically generates a 12-byte <code>ObjectId</code> for you.</p>
`),
      sec(2, "Anatomy of a 12-Byte ObjectId", `
<p>An <code>ObjectId</code> (e.g. <code>65d8f1e2a9b3c4d5e6f7a8b9</code>) is represented as a 24-character hexadecimal string, but internally it consists of <strong>12 raw binary bytes</strong> divided into three parts:</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">12-Byte Layout Breakdown</span></div>
  <pre><code> 4 Bytes: Unix Timestamp (seconds since epoch)
+ 5 Bytes: Random Value (unique per process/machine)
+ 3 Bytes: Incrementing Counter (initialized to random value)
-----------------------------------------------------------
= 12 Bytes total globally unique ID!</code></pre>
</div>
`),
      sec(3, "Extracting Creation Date from ObjectId", `
<p>Because the first 4 bytes of an <code>ObjectId</code> encode a Unix timestamp, you can extract the exact document creation time without storing a separate <code>createdAt</code> field!</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">mongosh Timestamp Extraction</span></div>
  <pre><code>// Extract creation time from an ObjectId
const id = ObjectId("65d8f1e2a9b3c4d5e6f7a8b9");
console.log(id.getTimestamp());
// Output: 2024-02-23T19:30:10.000Z</code></pre>
</div>
`),
      sec(4, "Custom _id Values vs Auto-Generated ObjectIds", `
<p>You can supply custom <code>_id</code> values (e.g., strings, integers, UUIDs) when inserting documents:</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Custom _id Examples</span></div>
  <pre><code>// Custom string _id (e.g. SKU or Email)
db.products.insertOne({ _id: "SKU-9921", title: "Wireless Mouse", price: 29.99 });

// Custom integer _id
db.categories.insertOne({ _id: 101, name: "Electronics" });</code></pre>
</div>
`)
    ]
  },

  9: {
    file: '09-json-vs-bson.html',
    title: 'MongoDB — JSON vs BSON Deep Dive',
    intro: 'Compare human-readable JSON against binary BSON. Learn about Extended JSON (EJSON) formats and how MongoDB driver serialization works.',
    content: [
      sec(1, "Side-by-Side Comparison: JSON vs BSON", `
<table class="tbl">
  <thead>
    <tr><th>Feature</th><th>JSON (JavaScript Object Notation)</th><th>BSON (Binary JSON)</th></tr>
  </thead>
  <tbody>
    <tr><td>Format</td><td>Text-based string format</td><td>Binary encoded bytes</td></tr>
    <tr><td>Readability</td><td>Human-readable</td><td>Machine-readable (requires parser)</td></tr>
    <tr><td>Data Types</td><td>String, Number, Boolean, Array, Object, Null</td><td>20+ Data types (Date, ObjectId, Decimal128, BinData)</td></tr>
    <tr><td>Traversal Speed</td><td>Slow (must parse entire text string)</td><td>Fast (contains length prefixes & index offsets)</td></tr>
    <tr><td>Storage Efficiency</td><td>Space inefficient for large numbers/dates</td><td>Highly optimized for disk and memory RAM</td></tr>
  </tbody>
</table>
`),
      sec(2, "MongoDB Extended JSON (EJSON)", `
<p>When converting BSON data to standard JSON for REST APIs, special BSON types are serialized using <strong>MongoDB Extended JSON (EJSON)</strong> specification:</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Canonical EJSON Example</span></div>
  <pre><code>{
  "_id": { "$oid": "65d8f1e2a9b3c4d5e6f7a8b9" },
  "createdAt": { "$date": "2026-08-26T12:00:00Z" },
  "price": { "$numberDecimal": "99.95" }
}</code></pre>
</div>
`)
    ]
  },

  10: {
    file: '10-data-modeling-and-schema-design.html',
    title: 'MongoDB — Data Modeling & Schema Design',
    intro: 'Master the principles of MongoDB schema design. Learn William Zola\'s 6 Rules of Thumb, when to embed sub-documents vs reference ObjectIds, and common design patterns.',
    content: [
      sec(1, "Embedding vs Referencing: The Golden Rule", `
<p>The central question in MongoDB schema design is: <strong>Should I embed related data inside a single document or store it in a separate collection using ObjectId references?</strong></p>

<div class="callout">
  <div class="callout-title">💡 The Core Rule:</div>
  <p><strong>Data that is accessed together should be stored together.</strong> Embed by default unless there is a compelling reason to reference.</p>
</div>
`),
      sec(2, "William Zola's 6 Rules of Thumb for Schema Design", `
<ol style="line-height:1.8;margin-left:20px;">
  <li><strong>Rule 1:</strong> Favor embedding unless there is a compelling reason not to.</li>
  <li><strong>Rule 2:</strong> Needed-together access is the best reason to embed fields.</li>
  <li><strong>Rule 3:</strong> One-to-Few relationships (e.g., user addresses) should be EMBEDDED.</li>
  <li><strong>Rule 4:</strong> One-to-Many relationships (e.g., product reviews) should use REFERENCES if array growth is unbounded.</li>
  <li><strong>Rule 5:</strong> One-to-Squillions (e.g., server log streams) should store parent reference ID on the child document.</li>
  <li><strong>Rule 6:</strong> How you query data dictates how you structure your data.</li>
</ol>
`),
      sec(3, "Practical Relationship Modeling Patterns", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Embedded 1:N (Addresses inside User)</span></div>
  <pre><code>// User Document (Embedded Addresses)
{
  "_id": ObjectId("..."),
  "name": "Balaji",
  "addresses": [
    { "type": "home", "city": "Hyderabad" },
    { "type": "office", "city": "Bengaluru" }
  ]
}</code></pre>
</div>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Referenced 1:N (Parent ID on Child Document)</span></div>
  <pre><code>// Order Document referencing User ID
{
  "_id": ObjectId("..."),
  "userId": ObjectId("65d8f1e2a9b3c4d5e6f7a8b9"), // Reference to User
  "totalAmount": 249.99,
  "orderDate": ISODate("2026-08-26")
}</code></pre>
</div>
`)
    ]
  },

  11: {
    file: '11-inserting-documents.html',
    title: 'MongoDB — Inserting Documents',
    intro: 'Learn how to write single and bulk insert operations using insertOne() and insertMany(). Understand ordered vs unordered bulk options and write concerns.',
    content: [
      sec(1, "Inserting a Single Document with insertOne()", `
<p>The <code>db.collection.insertOne()</code> method adds a single document to a collection:</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">insertOne Example</span></div>
  <pre><code>db.users.insertOne({
  name: "Balaji Nayak",
  email: "balaji@ourcompiler.com",
  role: "admin",
  createdAt: new Date()
});

// Returns:
// {
//   acknowledged: true,
//   insertedId: ObjectId("65d8f1e2a9b3c4d5e6f7a8b9")
// }</code></pre>
</div>
`),
      sec(2, "Inserting Multiple Documents with insertMany()", `
<p>Use <code>db.collection.insertMany()</code> to insert an array of documents in a single network round-trip:</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">insertMany Example</span></div>
  <pre><code>db.products.insertMany([
  { title: "Keyboard", price: 49.99, stock: 100 },
  { title: "Mouse", price: 24.99, stock: 150 },
  { title: "Monitor", price: 199.99, stock: 45 }
]);</code></pre>
</div>
`),
      sec(3, "Ordered vs Unordered Inserts", `
<p>By default, <code>insertMany()</code> executes in <strong>ordered mode</strong> (<code>{ ordered: true }</code>). If an error occurs on the 2nd document, execution halts immediately and remaining documents are skipped.</p>

<p>In <strong>unordered mode</strong> (<code>{ ordered: false }</code>), MongoDB continues inserting remaining valid documents even if one fails due to duplicate key errors!</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Unordered Bulk Insert</span></div>
  <pre><code>db.users.insertMany(
  [
    { _id: 1, name: "Alice" },
    { _id: 1, name: "Duplicate Alice" }, // Fails (duplicate key)
    { _id: 2, name: "Bob" }             // Inserted successfully!
  ],
  { ordered: false }
);</code></pre>
</div>
`)
    ]
  },

  12: {
    file: '12-finding-documents.html',
    title: 'MongoDB — Finding Documents & Query Selectors',
    intro: 'Master find() and findOne() methods. Learn equality filters, cursor manipulation, and how to inspect query execution plans with explain().',
    content: [
      sec(1, "Finding Documents with find() and findOne()", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Basic Find Queries</span></div>
  <pre><code>// 1. Find the first matching document (returns plain document object or null)
db.users.findOne({ email: "guru@ourcompiler.com" });

// 2. Find all matching documents (returns a cursor)
db.users.find({ role: "admin" });

// 3. Find all documents in a collection
db.users.find({});</code></pre>
</div>
`),
      sec(2, "Understanding MongoDB Query Cursors", `
<p>The <code>find()</code> method does not immediately return all matching documents to memory. Instead, it returns a <strong>Cursor</strong> — an iterator that fetches documents in batches of 101 records (or 4 MB).</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Cursor Methods</span></div>
  <pre><code>// Count total matching documents
db.users.find({ active: true }).count();

// Convert cursor result directly to a JavaScript Array
const activeUsers = db.users.find({ active: true }).toArray();</code></pre>
</div>
`)
    ]
  },

  13: {
    file: '13-comparison-operators.html',
    title: 'MongoDB — Comparison Operators',
    intro: 'Learn how to filter data using MongoDB comparison operators: $eq, $ne, $gt, $gte, $lt, $lte, $in, and $nin.',
    content: [
      sec(1, "Comparison Operators Syntax Reference", `
<table class="tbl">
  <thead>
    <tr><th>Operator</th><th>Meaning</th><th>Example Code</th></tr>
  </thead>
  <tbody>
    <tr><td><code>$eq</code></td><td>Equal to</td><td><code>db.products.find({ price: { $eq: 99.99 } })</code></td></tr>
    <tr><td><code>$ne</code></td><td>Not equal to</td><td><code>db.users.find({ status: { $ne: "banned" } })</code></td></tr>
    <tr><td><code>$gt</code></td><td>Greater than</td><td><code>db.products.find({ price: { $gt: 100 } })</code></td></tr>
    <tr><td><code>$gte</code></td><td>Greater than or equal</td><td><code>db.users.find({ age: { $gte: 18 } })</code></td></tr>
    <tr><td><code>$lt</code></td><td>Less than</td><td><code>db.products.find({ price: { $lt: 50 } })</code></td></tr>
    <tr><td><code>$lte</code></td><td>Less than or equal</td><td><code>db.scores.find({ score: { $lte: 35 } })</code></td></tr>
    <tr><td><code>$in</code></td><td>Matches any value in array</td><td><code>db.users.find({ role: { $in: ["admin", "editor"] } })</code></td></tr>
    <tr><td><code>$nin</code></td><td>Matches none of values in array</td><td><code>db.users.find({ role: { $nin: ["guest", "blocked"] } })</code></td></tr>
  </tbody>
</table>
`),
      sec(2, "Combining Comparison Operators for Ranges", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Range Query Example</span></div>
  <pre><code>// Find products with price between $50 and $200 (inclusive)
db.products.find({
  price: { $gte: 50, $lte: 200 }
});</code></pre>
</div>
`)
    ]
  },

  14: {
    file: '14-logical-operators.html',
    title: 'MongoDB — Logical Operators',
    intro: 'Combine multiple search conditions using $and, $or, $not, and $nor logical query operators.',
    content: [
      sec(1, "Logical Operators Summary", `
<ul style="line-height:1.8;margin-left:20px;">
  <li><strong><code>$and</code>:</strong> Joins query clauses with a logical AND (all conditions must be true).</li>
  <li><strong><code>$or</code>:</strong> Joins query clauses with a logical OR (at least one condition must be true).</li>
  <li><strong><code>$not</code>:</strong> Inverts the effect of a query expression.</li>
  <li><strong><code>$nor</code>:</strong> Joins query clauses with a logical NOR (all conditions must fail).</li>
</ul>
`),
      sec(2, "Practical Examples", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">$or Query Example</span></div>
  <pre><code>// Find users who are admins OR have score greater than 90
db.users.find({
  $or: [
    { role: "admin" },
    { score: { $gt: 90 } }
  ]
});</code></pre>
</div>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">$and Query Example</span></div>
  <pre><code>// Explicit $and (required when applying multiple conditions to same field)
db.products.find({
  $and: [
    { price: { $gt: 10 } },
    { price: { $lt: 50 } }
  ]
});</code></pre>
</div>
`)
    ]
  },

  15: {
    file: '15-element-and-evaluation-operators.html',
    title: 'MongoDB — Element & Evaluation Operators',
    intro: 'Query documents by field existence ($exists), BSON data type ($type), regex pattern ($regex), and document field evaluation ($expr).',
    content: [
      sec(1, "Element Operators ($exists & $type)", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">$exists & $type Examples</span></div>
  <pre><code>// Find users who have a phone field present
db.users.find({ phone: { $exists: true } });

// Find users where age is stored as a String instead of Number
db.users.find({ age: { $type: "string" } });</code></pre>
</div>
`),
      sec(2, "Evaluation Operators ($regex & $expr)", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">$regex & $expr Examples</span></div>
  <pre><code>// Case-insensitive regex search for users named "balaji"
db.users.find({ name: { $regex: /^balaji/i } });

// $expr: Compare two fields inside the SAME document!
// Find orders where spent amount exceeds total budget
db.orders.find({
  $expr: { $gt: ["$spentAmount", "$budgetLimit"] }
});</code></pre>
</div>
`)
    ]
  },

  16: {
    file: '16-querying-arrays.html',
    title: 'MongoDB — Querying Arrays & Multikey Fields',
    intro: 'Learn array matching rules, $all, $elemMatch, and array length ($size) query selectors.',
    content: [
      sec(1, "Array Element Equality Matching", `
<p>When you query an array field with a scalar value, MongoDB automatically matches if that value exists ANYWHERE in the array:</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Array Equality Query</span></div>
  <pre><code>// Matches if "MongoDB" is present inside the skills array
db.users.find({ skills: "MongoDB" });</code></pre>
</div>
`),
      sec(2, "Using $all and $elemMatch", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">$all & $elemMatch Examples</span></div>
  <pre><code>// $all: Must contain BOTH "MongoDB" AND "Node.js" in array
db.users.find({ skills: { $all: ["MongoDB", "Node.js"] } });

// $elemMatch: Matches array elements satisfying MULTIPLE conditions
db.scores.find({
  results: { $elemMatch: { score: { $gte: 80 }, subject: "Math" } }
});</code></pre>
</div>
`)
    ]
  },

  17: {
    file: '17-querying-embedded-documents.html',
    title: 'MongoDB — Querying Nested & Embedded Documents',
    intro: 'Master Dot Notation syntax to query nested fields inside sub-documents and arrays of sub-documents.',
    content: [
      sec(1, "Dot Notation Syntax Rules", `
<p>To query fields nested inside embedded sub-documents, use <strong>Dot Notation</strong>. In MongoDB, dot notation paths MUST be enclosed in quotes (<code>"address.city"</code>):</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Dot Notation Example</span></div>
  <pre><code>// Query embedded field
db.users.find({ "address.city": "Hyderabad" });

// Query array of sub-documents
db.orders.find({ "items.productName": "Wireless Mouse" });</code></pre>
</div>
`)
    ]
  },

  18: {
    file: '18-projection-and-field-selection.html',
    title: 'MongoDB — Projection & Field Selection',
    intro: 'Limit bandwidth and return only required fields using inclusion and exclusion projections.',
    content: [
      sec(1, "Inclusion vs Exclusion Projections", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Projection Examples</span></div>
  <pre><code>// Inclusion Projection: Return ONLY name and email (_id included by default)
db.users.find({}, { name: 1, email: 1 });

// Hide _id field explicitly
db.users.find({}, { _id: 0, name: 1, email: 1 });

// Exclusion Projection: Return everything EXCEPT password
db.users.find({}, { password: 0 });</code></pre>
</div>
`)
    ]
  },

  19: {
    file: '19-sorting-limiting-pagination.html',
    title: 'MongoDB — Sorting, Limiting & Pagination',
    intro: 'Sort results with .sort(), limit counts with .limit(), and build offset vs keyset pagination.',
    content: [
      sec(1, "Sorting & Limiting Syntax", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Sort & Limit</span></div>
  <pre><code>// Sort by age ascending (1), then score descending (-1)
db.users.find().sort({ age: 1, score: -1 }).limit(10);</code></pre>
</div>
`),
      sec(2, "Pagination: Offset (skip/limit) vs Keyset", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Pagination Examples</span></div>
  <pre><code>// Offset Pagination (Page 3, 10 items per page)
db.users.find().skip(20).limit(10);

// Keyset Pagination (Faster on large data)
db.users.find({ _id: { $gt: lastSeenId } }).limit(10);</code></pre>
</div>
`)
    ]
  },

  20: {
    file: '20-updating-documents.html',
    title: 'MongoDB — Updating Documents & Field Modifiers',
    intro: 'Modify documents atomically using updateOne(), updateMany(), $set, $unset, $inc, and $rename.',
    content: [
      sec(1, "Update Modifiers Cheat Sheet", `
<table class="tbl">
  <thead>
    <tr><th>Modifier</th><th>Description</th><th>Example</th></tr>
  </thead>
  <tbody>
    <tr><td><code>$set</code></td><td>Sets/creates field value</td><td><code>{ $set: { status: "active" } }</code></td></tr>
    <tr><td><code>$unset</code></td><td>Deletes field</td><td><code>{ $unset: { tempToken: "" } }</code></td></tr>
    <tr><td><code>$inc</code></td><td>Increments number</td><td><code>{ $inc: { views: 1 } }</code></td></tr>
    <tr><td><code>$rename</code></td><td>Renames field</td><td><code>{ $rename: { fname: "firstName" } }</code></td></tr>
  </tbody>
</table>
`),
      sec(2, "updateOne and updateMany Syntax", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Update Code Examples</span></div>
  <pre><code>// updateOne: Updates first matching document
db.users.updateOne(
  { _id: ObjectId("65d8f1e2a9b3c4d5e6f7a8b9") },
  { $set: { isVerified: true }, $inc: { loginCount: 1 } }
);

// updateMany: Updates all matching documents
db.users.updateMany(
  { status: "pending" },
  { $set: { status: "expired" } }
);</code></pre>
</div>
`)
    ]
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// BUILDER LOOP FOR CHAPTERS 1 - 20
// ─────────────────────────────────────────────────────────────────────────────

console.log('Writing extensive content for MongoDB Chapters 1 through 20...');

let updatedCount = 0;

for (let chNum = 1; chNum <= 20; chNum++) {
  const data = chapters[chNum];
  if (!data) continue;

  const filePath = path.join(mongoDir, data.file);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${data.file}`);
    continue;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Extract breadcrumbs, badges, nav-footer
  const breadcrumbMatch = html.match(/<div class="breadcrumb">[\s\S]*?<\/div>/);
  const pageMetaMatch   = html.match(/<div class="page-meta">[\s\S]*?<\/div>/);
  const navFooterMatch  = html.match(/<div class="nav-footer">[\s\S]*?<\/div>/);

  const breadcrumbs = breadcrumbMatch ? breadcrumbMatch[0] : '';
  const pageMeta    = pageMetaMatch   ? pageMetaMatch[0]   : '';
  const navFooter   = navFooterMatch  ? navFooterMatch[0]  : '';

  const sectionsHTML = data.content.join('\n\n');

  const newMain = `  <main class="content">
    ${breadcrumbs}

    <h1 class="page-title">${data.title}</h1>

    ${pageMeta}

    <div class="intro-box">
      <p>${data.intro}</p>
    </div>

${sectionsHTML}

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on MongoDB 7.0+ Standards · Last updated August 2026</span>
      </div>
    </div>

    ${navFooter}
  </main>`;

  const mainRegex = /<main\s+class="content">[\s\S]*?<\/main>/;
  if (mainRegex.test(html)) {
    html = html.replace(mainRegex, newMain);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅  Updated Chapters 1-20: ${data.file}`);
    updatedCount++;
  }
}

console.log(`\n🎉 Successfully updated ${updatedCount} MongoDB chapters (Chapters 1-20) with long-form detailed content!`);
