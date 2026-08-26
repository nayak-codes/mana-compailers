/**
 * fix_mongodb_content.js
 * Replaces the generic "Simple Introduction" (section 1) and
 * "What You Will Learn" (section 2) in all 50 MongoDB chapter HTML files
 * with original, chapter-specific quality content.
 *
 * Run: node scratch/fix_mongodb_content.js
 */

const fs   = require('fs');
const path = require('path');

const mongoDir = path.join(__dirname, '..', 'public', 'blog-mongodb');

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER DATA — unique intro + learning objectives for every chapter
// ─────────────────────────────────────────────────────────────────────────────
const chapters = [
  {
    file: '01-mongodb-introduction.html',
    intro: `MongoDB is a <strong>document-oriented NoSQL database</strong> built for the way modern applications store data. Unlike traditional SQL databases that lock you into rigid tables and rows, MongoDB stores each record as a flexible <strong>BSON document</strong> — similar to a JavaScript object — inside a collection. This means a user document can have a <code>name</code>, an embedded <code>address</code> object, and an array of <code>orders</code> all in one place, with no JOINs needed. Created in 2007 by Dwight Merriman and Eliot Horowitz (co-founders of MongoDB, Inc.), MongoDB is today one of the <strong>most popular databases in the world</strong>, trusted by companies like Forbes, Adobe, eBay, and Uber to handle billions of records at scale.`,
    objectives: [
      'Understand what a document database is and why it differs from relational SQL databases',
      'Learn what BSON (Binary JSON) is and how MongoDB uses it to store data internally',
      'Identify the core components of MongoDB: documents, collections, and databases',
      'Recognize real-world use cases where MongoDB outperforms traditional SQL solutions',
      'Understand MongoDB\'s flexible schema model and horizontal scalability (sharding)',
    ],
  },
  {
    file: '02-mongodb-vs-sql.html',
    intro: `When developers choose between MongoDB and SQL databases like MySQL or PostgreSQL, they're choosing between two fundamentally different data philosophies. <strong>SQL databases</strong> organize data into tables with fixed columns and rows; relationships between tables are expressed through foreign keys and JOINs. <strong>MongoDB</strong> stores data as self-contained documents, embedding related data directly inside the parent document. A SQL "users + orders" relationship that requires two tables and a JOIN query becomes a single MongoDB document with an embedded <code>orders</code> array. Neither approach is universally superior — SQL excels at complex multi-table transactions and strict data integrity, while MongoDB wins on flexible schemas, horizontal scaling, and development speed for document-heavy workloads.`,
    objectives: [
      'Map SQL concepts (database → database, table → collection, row → document, column → field) to their MongoDB equivalents',
      'Understand when to choose MongoDB over SQL and vice versa based on project requirements',
      'Compare how MongoDB\'s <code>$lookup</code> aggregation stage replicates SQL JOIN behaviour',
      'Understand the role of <code>_id</code> as MongoDB\'s primary key and how it differs from SQL AUTO_INCREMENT',
      'Recognise the trade-offs of a flexible schema vs. a strict relational schema in production systems',
    ],
  },
  {
    file: '03-mongodb-installation.html',
    intro: `Getting MongoDB running on your machine is the first hands-on step in your database journey. MongoDB offers two primary installation paths: <strong>MongoDB Community Server</strong> (free, self-hosted, runs locally) and <strong>MongoDB Atlas</strong> (fully managed cloud database with a generous free tier). For local development on Windows, you install the MSI package, configure it as a Windows Service, and interact with it via the <strong>mongosh</strong> shell. On macOS you use Homebrew (<code>brew install mongodb-community</code>), and on Linux you add the official MongoDB APT/YUM repository. Once installed, the <code>mongod</code> process is your database server and <code>mongosh</code> is your interactive shell — knowing both is essential for productive MongoDB development.`,
    objectives: [
      'Install MongoDB Community Server 7.0+ on Windows, macOS, or Linux following the official steps',
      'Start, stop, and check the status of the <code>mongod</code> database server process',
      'Connect to a running MongoDB instance using the <code>mongosh</code> interactive shell',
      'Verify the installation by running <code>db.runCommand({ connectionStatus: 1 })</code> and <code>show dbs</code>',
      'Understand the default data directory (<code>/var/lib/mongodb</code> on Linux, <code>C:\\data\\db</code> on Windows) and log file locations',
    ],
  },
  {
    file: '04-mongodb-atlas.html',
    intro: `<strong>MongoDB Atlas</strong> is the official cloud-hosted database-as-a-service (DBaaS) from MongoDB, Inc. Rather than managing your own server, storage, backups, and scaling, Atlas handles all of that for you on AWS, Azure, or Google Cloud. Atlas provides a <strong>free M0 tier</strong> (512 MB storage, shared cluster) — perfect for learning and small projects — and scales to paid tiers for production workloads. Beyond raw hosting, Atlas bundles powerful add-ons: <strong>Atlas Search</strong> (full-text search powered by Lucene), <strong>Atlas Data API</strong> (HTTP access without a driver), <strong>Atlas Charts</strong> (data visualisation), and <strong>Atlas Triggers</strong> (serverless event-driven functions). For most modern Node.js/Python/Java applications, Atlas is the fastest path from code to production.`,
    objectives: [
      'Create a free MongoDB Atlas account and provision a free M0 cluster on your chosen cloud provider',
      'Whitelist your IP address and create a database user with a strong password in the Atlas Security settings',
      'Obtain the Atlas connection string (SRV format) and use it to connect with <code>mongosh</code> and Mongoose',
      'Use the Atlas UI\'s Collections browser to explore databases, insert test documents, and run queries',
      'Understand Atlas cluster tiers (M0, M2, M5, M10+) and when to upgrade from free to paid',
    ],
  },
  {
    file: '05-compass-and-mongosh.html',
    intro: `MongoDB gives you two powerful tools to interact with your database beyond writing application code. <strong>MongoDB Compass</strong> is the official GUI client — a visual application where you can browse collections, build queries with a point-and-click filter panel, visualise documents, create indexes, and run aggregation pipelines without writing a single line of code. It's the ideal tool for exploring data and debugging queries. <strong>mongosh</strong> (MongoDB Shell) is the modern command-line REPL — a full JavaScript environment where you run queries, inspect server stats, manage databases, and automate tasks with scripts. Every MongoDB developer needs both: Compass for visual exploration and mongosh for quick scripting and automation.`,
    objectives: [
      'Install MongoDB Compass and connect it to a local or Atlas MongoDB instance using a connection string',
      'Use the Compass Documents tab to browse, filter, and edit documents visually',
      'Build aggregation pipelines interactively in the Compass Aggregations tab and export them as code',
      'Open <code>mongosh</code>, connect to a database with <code>use mydb</code>, and run CRUD queries interactively',
      'Use mongosh helper methods like <code>db.stats()</code>, <code>db.collection.countDocuments()</code>, and <code>it</code> (iterator) for result pagination',
    ],
  },
  {
    file: '06-databases-and-collections.html',
    intro: `In MongoDB's data hierarchy, a <strong>database</strong> is the top-level namespace that groups related collections — similar to a SQL schema or database. Each MongoDB server (or Atlas cluster) can host many databases. Inside a database, <strong>collections</strong> are the equivalent of SQL tables — they hold documents. The key difference: MongoDB collections are <strong>schema-less by default</strong>, so different documents in the same collection can have different fields. You never need to run a CREATE TABLE statement; MongoDB creates a collection automatically the first time you insert a document into it. Managing databases and collections well — naming them clearly, planning your collection boundaries, and dropping test databases when done — is a fundamental database administration skill.`,
    objectives: [
      'Create and switch between MongoDB databases using <code>use databaseName</code> in mongosh',
      'List all databases with <code>show dbs</code> and all collections with <code>show collections</code>',
      'Create a collection explicitly with <code>db.createCollection("name", options)</code> vs. implicitly on first insert',
      'Drop a collection with <code>db.collection.drop()</code> and an entire database with <code>db.dropDatabase()</code>',
      'Understand MongoDB\'s implicit vs. explicit collection creation and when to use capped collections',
    ],
  },
  {
    file: '07-documents-and-bson.html',
    intro: `A MongoDB <strong>document</strong> is the fundamental unit of data — think of it as a record, but far more expressive than a SQL row. Documents are stored in <strong>BSON</strong> (Binary JSON), a binary serialisation format that extends JSON with additional data types: <code>ObjectId</code>, <code>Date</code>, <code>Int32</code>, <code>Int64</code>, <code>Decimal128</code>, <code>BinData</code>, <code>Timestamp</code>, and more. BSON is designed for fast serialisation/deserialisation and efficient traversal, which is why MongoDB chose it over plain JSON for internal storage. Documents can be <strong>nested</strong> (embedded sub-documents) and can contain <strong>arrays</strong> of any value — enabling rich, hierarchical data structures that map naturally to the objects in your application code.`,
    objectives: [
      'Understand the BSON data types available in MongoDB and when to use each (e.g., Date vs. String for timestamps)',
      'Create documents with nested embedded sub-documents and arrays of values',
      'Read a document\'s field types using <code>typeof</code> in mongosh and the Compass Schema Analyzer',
      'Understand the 16 MB document size limit and design strategies to stay within it',
      'Recognise how BSON differs from JSON and why MongoDB uses binary storage internally',
    ],
  },
  {
    file: '08-id-and-objectid.html',
    intro: `Every MongoDB document must have a unique <strong><code>_id</code></strong> field, which acts as its primary key. If you don't supply one on insert, MongoDB auto-generates an <strong>ObjectId</strong> — a 12-byte, globally unique identifier. The ObjectId is cleverly structured: the first 4 bytes encode a Unix timestamp (so you can extract the creation time from any ObjectId), the next 5 bytes are a random machine+process identifier, and the last 3 bytes are an auto-incrementing counter. This design guarantees uniqueness across distributed nodes without a central coordinator, making ObjectIds perfect for sharded clusters. You can use <code>new ObjectId()</code> in your application code or <code>ObjectId.getTimestamp()</code> in mongosh to inspect when a document was created.`,
    objectives: [
      'Understand the structure of a MongoDB ObjectId (timestamp + machine ID + counter) and its 12-byte layout',
      'Use <code>ObjectId.getTimestamp()</code> to extract the creation time of any document from its <code>_id</code>',
      'Query documents by their <code>_id</code> using <code>db.collection.findOne({ _id: ObjectId("...") })</code>',
      'Use custom <code>_id</code> values (strings, integers, UUIDs) and understand the uniqueness constraint implications',
      'Avoid common ObjectId mistakes: comparing as strings instead of ObjectId objects, and generating IDs client-side vs. server-side',
    ],
  },
  {
    file: '09-json-vs-bson.html',
    intro: `<strong>JSON</strong> (JavaScript Object Notation) is the data interchange format you write in your code and APIs — human-readable, text-based, and universally understood. <strong>BSON</strong> is what MongoDB stores on disk — a <em>binary</em> encoding of JSON-like documents that adds strict typing, efficiency, and additional data types. The same document you write as <code>{ "price": 29.99, "active": true }</code> in JSON is serialised to BSON with type-tagged bytes that tell MongoDB whether <code>price</code> is a <code>Double</code> or <code>Decimal128</code>. BSON supports types JSON doesn't: <code>Date</code> (as 64-bit milliseconds), <code>BinData</code> (for binary blobs), <code>Timestamp</code> (for oplog ordering), and <code>Regex</code>. Understanding the JSON ↔ BSON boundary helps you avoid subtle type-mismatch bugs when querying your data.`,
    objectives: [
      'Compare JSON and BSON side by side: where each format is used, and what data types each supports',
      'Understand why BSON is more efficient than JSON for database storage (type information, traversal speed)',
      'Recognise BSON-specific types — <code>ObjectId</code>, <code>Date</code>, <code>BinData</code>, <code>Decimal128</code>, <code>Timestamp</code> — and use them correctly in mongosh',
      'Convert between BSON and JSON using MongoDB\'s Extended JSON (EJSON) format for REST APIs and data export',
      'Debug type-mismatch query failures caused by storing numbers as strings or dates as strings',
    ],
  },
  {
    file: '10-data-modeling-and-schema-design.html',
    intro: `Even though MongoDB is schema-less, <strong>great schema design is still critical</strong> — arguably more so than in SQL, because poor document structure compounds as data grows. MongoDB schema design revolves around one central decision: should related data be <strong>embedded</strong> (stored together in one document) or <strong>referenced</strong> (stored in separate collections linked by ID)? The rule of thumb: embed when data is always read together and rarely exceeds 16 MB; reference when data is shared across many documents or grows unboundedly. The well-known <strong>"6 Rules of Thumb" by William Zola</strong> at MongoDB guide this decision. Good schema design dramatically reduces query complexity, eliminates expensive application-level JOINs, and keeps your indexes lean.`,
    objectives: [
      'Apply the embedding vs. referencing decision framework to real-world data models (blog posts, e-commerce, social networks)',
      'Design one-to-one, one-to-many, and many-to-many relationships using embedded documents and <code>$lookup</code>',
      'Understand the polymorphic pattern, the bucket pattern, and the attribute pattern for flexible schemas',
      'Avoid common schema anti-patterns: unbounded arrays, over-normalisation, and deeply nested documents',
      'Use MongoDB Compass\'s Schema Analyzer tab to visualise the structure of an existing collection',
    ],
  },
  {
    file: '11-inserting-documents.html',
    intro: `Inserting data into MongoDB is the starting point for all database work. MongoDB provides two primary insert methods: <strong><code>insertOne()</code></strong> for adding a single document and <strong><code>insertMany()</code></strong> for adding multiple documents in a single network round-trip. Both methods return a result object that confirms how many documents were inserted and what <code>_id</code> values were assigned. MongoDB insert operations are <strong>atomic at the document level</strong> — each document is either fully written or not written at all. For high-throughput applications, <code>insertMany()</code> with <code>ordered: false</code> allows MongoDB to continue inserting remaining documents even if one fails, maximising throughput and parallelism.`,
    objectives: [
      'Insert a single document using <code>db.collection.insertOne({ ... })</code> and inspect the returned <code>insertedId</code>',
      'Insert multiple documents at once using <code>db.collection.insertMany([...], { ordered: false })</code>',
      'Handle insert errors: duplicate <code>_id</code> conflicts (<code>E11000</code>), document validation failures, and write concern timeouts',
      'Use the <code>writeConcern</code> option to control durability guarantees (<code>w: 1</code>, <code>w: "majority"</code>)',
      'Generate custom <code>_id</code> values on the client side and understand when this is appropriate',
    ],
  },
  {
    file: '12-finding-documents.html',
    intro: `Reading data from MongoDB is done with the <strong><code>find()</code></strong> and <strong><code>findOne()</code></strong> methods. <code>find()</code> returns a cursor — a lazy iterator that streams matching documents — while <code>findOne()</code> immediately returns the first match or <code>null</code>. The first argument to <code>find()</code> is the <strong>query filter</strong>: a BSON document that specifies which fields and values to match. An empty filter <code>{}</code> matches all documents. You can chain cursor methods — <code>.sort()</code>, <code>.limit()</code>, <code>.skip()</code>, <code>.project()</code> — to shape the result set. Understanding how the query engine evaluates filters, and how to read the <code>explain()</code> plan to confirm index usage, is what separates fast queries from slow full-collection scans.`,
    objectives: [
      'Query all documents with <code>find({})</code> and a specific document with <code>findOne({ field: value })</code>',
      'Apply multiple field conditions in a single query filter and understand how MongoDB ANDs them together',
      'Use the projection parameter <code>{ field: 1 }</code> / <code>{ field: 0 }</code> to include or exclude specific fields from results',
      'Chain <code>.sort()</code>, <code>.limit()</code>, and <code>.skip()</code> on a cursor for pagination and result ordering',
      'Run <code>find().explain("executionStats")</code> to verify that queries use indexes (IXSCAN) rather than full scans (COLLSCAN)',
    ],
  },
  {
    file: '13-comparison-operators.html',
    intro: `Comparison operators are the building blocks of precise MongoDB queries. They let you match documents where a field is <strong>greater than, less than, equal to, or within a set of values</strong> — going far beyond simple exact-match queries. MongoDB's comparison operators are: <code>$eq</code> (equal), <code>$ne</code> (not equal), <code>$gt</code> (greater than), <code>$gte</code> (greater than or equal), <code>$lt</code> (less than), <code>$lte</code> (less than or equal), <code>$in</code> (matches any value in array), and <code>$nin</code> (matches none). These operators are embedded inside the query document, so <code>{ price: { $lt: 100 } }</code> reads naturally as "find documents where price is less than 100". Combining these with indexes makes range queries lightning fast.`,
    objectives: [
      'Write range queries using <code>$gt</code>, <code>$gte</code>, <code>$lt</code>, <code>$lte</code> for numeric and date fields',
      'Match a document against a list of allowed values using <code>$in: [...]</code> and exclude values with <code>$nin</code>',
      'Combine multiple comparison operators on the same field: <code>{ age: { $gte: 18, $lte: 65 } }</code>',
      'Understand why <code>$eq</code> is rarely written explicitly but is the implicit default for field: value matching',
      'Verify that comparison queries on indexed fields use <code>IXSCAN</code> by checking <code>explain("executionStats")</code>',
    ],
  },
  {
    file: '14-logical-operators.html',
    intro: `Logical operators let you combine multiple query conditions using Boolean logic — AND, OR, NOT, and NOR. In MongoDB: <strong><code>$and</code></strong> requires all conditions to match, <strong><code>$or</code></strong> requires at least one, <strong><code>$not</code></strong> inverts a condition, and <strong><code>$nor</code></strong> matches documents that fail all conditions. MongoDB implicitly ANDs field conditions in the query object — <code>{ status: "active", age: { $gt: 18 } }</code> is the same as an explicit <code>$and</code> array. You only need explicit <code>$and</code> when applying multiple conditions to the <em>same field</em>. These operators unlock complex business logic queries — filtering active users over 18 who are <em>not</em> in a banned list — that are impossible with simple field matching.`,
    objectives: [
      'Write implicit AND queries using multi-field filter objects and understand when explicit <code>$and</code> is required',
      'Use <code>$or</code> to match documents that satisfy at least one of several conditions',
      'Negate a condition with <code>$not</code> — for example, <code>{ price: { $not: { $gte: 100 } } }</code>',
      'Use <code>$nor</code> to find documents that fail all given conditions simultaneously',
      'Understand the index usage implications of <code>$or</code> (each clause needs its own index for optimal performance)',
    ],
  },
  {
    file: '15-element-and-evaluation-operators.html',
    intro: `Beyond comparing values, MongoDB provides operators to query based on a field's <strong>existence</strong>, its <strong>BSON type</strong>, and even <strong>pattern matching</strong> against string values. <code>$exists</code> finds documents where a field is present or absent — crucial when working with flexible schemas where not every document has the same fields. <code>$type</code> filters by BSON data type, letting you find documents where a field was accidentally stored as a string instead of a number. The <code>$regex</code> operator enables powerful text pattern matching using JavaScript-compatible regular expressions. The <code>$expr</code> operator allows you to use aggregation expressions inside a query, enabling comparisons between fields within the same document — something impossible with standard comparison operators.`,
    objectives: [
      'Find documents where a specific field exists or is missing using <code>{ field: { $exists: true/false } }</code>',
      'Filter by BSON data type with <code>{ field: { $type: "string" } }</code> to catch type-mismatch data quality issues',
      'Write regex queries with <code>{ field: { $regex: /pattern/i } }</code> for case-insensitive string searching',
      'Use <code>$expr</code> to compare two fields in the same document inside a query filter',
      'Understand why regex queries are slower than equality queries and how text indexes are a better alternative for search',
    ],
  },
  {
    file: '16-querying-arrays.html',
    intro: `Arrays are first-class citizens in MongoDB, and querying them is one of MongoDB's strongest features. When you query an array field with a simple equality filter, MongoDB automatically checks if that value <strong>exists anywhere in the array</strong> — you don't need a special operator. The <strong><code>$all</code></strong> operator matches documents where the array contains all the specified values (in any order). The <strong><code>$elemMatch</code></strong> operator matches documents where at least one array element satisfies multiple conditions simultaneously — crucial when your array elements are sub-documents with multiple fields. MongoDB also creates <strong>multikey indexes</strong> automatically when you index an array field, creating one index entry per array element for ultra-fast array membership queries.`,
    objectives: [
      'Query an array field for a single value: <code>{ tags: "mongodb" }</code> matches if any element equals the value',
      'Match documents where an array contains all of a set of values using <code>{ tags: { $all: ["a", "b"] } }</code>',
      'Use <code>$elemMatch</code> to apply multiple conditions to a single array element: <code>{ scores: { $elemMatch: { $gte: 80, $lt: 90 } } }</code>',
      'Query by array element position using dot notation: <code>{ "grades.0": "A" }</code>',
      'Query by array length using <code>{ field: { $size: 3 } }</code> and understand its index limitations',
    ],
  },
  {
    file: '17-querying-embedded-documents.html',
    intro: `One of MongoDB's most powerful features is the ability to <strong>embed related data directly inside a document</strong> as a sub-document (nested object). Querying these embedded structures uses MongoDB's <strong>dot notation</strong>: to query a field inside an embedded document, you write <code>"address.city": "Hyderabad"</code> — the field path becomes a dot-separated string. This works at any depth of nesting and even inside arrays of sub-documents. When the embedded document is an element of an array, combine dot notation with <code>$elemMatch</code> to ensure all conditions apply to the <em>same</em> array element, not across different elements — a common mistake that leads to incorrect query results.`,
    objectives: [
      'Query a nested field using dot notation: <code>{ "address.city": "Hyderabad" }</code>',
      'Query fields nested multiple levels deep: <code>{ "shipping.address.pincode": "500001" }</code>',
      'Use <code>$elemMatch</code> on arrays of embedded documents to match multiple conditions on the same element',
      'Understand the difference between dot notation queries on objects vs. on arrays of objects, and why results differ',
      'Project (include/exclude) nested fields using dot notation in the projection parameter',
    ],
  },
  {
    file: '18-projection-and-field-selection.html',
    intro: `By default, MongoDB's <code>find()</code> returns entire documents — every field, including ones your application doesn't need. <strong>Projection</strong> is MongoDB's mechanism for selecting exactly which fields to include or exclude in query results, reducing network bandwidth and improving application performance. Inclusion projection (<code>{ field: 1 }</code>) returns only the specified fields plus <code>_id</code>. Exclusion projection (<code>{ field: 0 }</code>) returns all fields <em>except</em> the specified ones. You cannot mix inclusions and exclusions in the same projection (except <code>_id</code>). Advanced projection operators — <code>$slice</code> (select a subset of an array), <code>$elemMatch</code> (return the first matching array element), and the positional <code>$</code> operator — give you surgical control over array field output.`,
    objectives: [
      'Write inclusion projections to return only specific fields: <code>db.users.find({}, { name: 1, email: 1 })</code>',
      'Write exclusion projections to hide sensitive fields: <code>db.users.find({}, { password: 0, __v: 0 })</code>',
      'Understand why <code>_id</code> is included by default in inclusion projections and how to suppress it with <code>{ _id: 0 }</code>',
      'Use <code>$slice</code> to return only the first N elements of an array field in the projection',
      'Apply the positional <code>$</code> operator to return only the first matching array element from a filtered array',
    ],
  },
  {
    file: '19-sorting-limiting-pagination.html',
    intro: `Real applications never dump an entire collection to the user at once — they <strong>sort, limit, and paginate</strong> results. MongoDB cursor methods make this straightforward: <code>.sort({ field: 1 })</code> orders results ascending (or <code>-1</code> for descending), <code>.limit(n)</code> caps the number of returned documents, and <code>.skip(n)</code> bypasses the first n results. The classic pagination formula is <code>.skip((page - 1) * pageSize).limit(pageSize)</code>. However, <code>skip()</code> is inefficient on large collections because MongoDB must scan and discard the skipped documents. For high-performance pagination on large datasets, the <strong>keyset (cursor-based) pagination</strong> pattern — using a filter on the last seen <code>_id</code> instead of skip — is the industry best practice.`,
    objectives: [
      'Sort query results ascending and descending using <code>.sort({ field: 1 })</code> and <code>.sort({ field: -1 })</code>',
      'Limit results to a maximum count with <code>.limit(n)</code> and skip the first n results with <code>.skip(n)</code>',
      'Implement classic offset-based pagination: <code>skip((page-1) * limit).limit(limit)</code>',
      'Understand why <code>skip()</code> degrades performance on large collections and how keyset pagination solves this',
      'Combine sort + limit in aggregation pipelines using <code>$sort</code> and <code>$limit</code> stages for server-side processing',
    ],
  },
  {
    file: '20-updating-documents.html',
    intro: `Updating documents in MongoDB is a surgical operation — you specify <em>which</em> documents to update with a filter and <em>what</em> to change with an update document. MongoDB's update operators let you make precise field-level changes without rewriting the entire document: <strong><code>$set</code></strong> adds or modifies specific fields, <strong><code>$unset</code></strong> removes fields, <strong><code>$inc</code></strong> atomically increments/decrements numeric values, <strong><code>$mul</code></strong> multiplies, <strong><code>$rename</code></strong> renames a field, and <strong><code>$min</code></strong>/<strong><code>$max</code></strong> only update if the new value is less/greater than the current value. The key methods are <code>updateOne()</code>, <code>updateMany()</code>, and <code>replaceOne()</code> — each with clear, distinct semantics.`,
    objectives: [
      'Update a single field in one document using <code>updateOne(filter, { $set: { field: value } })</code>',
      'Update all matching documents with <code>updateMany(filter, { $set: { ... } })</code> and verify the <code>modifiedCount</code>',
      'Atomically increment a counter field using <code>{ $inc: { views: 1 } }</code>',
      'Remove a field from documents using <code>{ $unset: { fieldName: "" } }</code>',
      'Replace an entire document (except <code>_id</code>) using <code>replaceOne(filter, newDocument)</code> and understand when to use it',
    ],
  },
  {
    file: '21-updating-arrays.html',
    intro: `Arrays inside MongoDB documents require special update operators because you're not just changing a scalar value — you're modifying a list that could have any number of elements. MongoDB provides a rich set of array update operators: <strong><code>$push</code></strong> appends an element, <strong><code>$pop</code></strong> removes the first or last element, <strong><code>$pull</code></strong> removes all elements matching a condition, <strong><code>$addToSet</code></strong> appends only if the element doesn't already exist (maintaining uniqueness), and <strong><code>$each</code></strong> (used with <code>$push</code> or <code>$addToSet</code>) allows inserting multiple elements at once. The <strong>positional operator <code>$</code></strong> lets you update a specific element matched by the query filter, while <strong><code>$[]</code></strong> updates all elements and <strong><code>$[identifier]</code></strong> uses array filters for conditional updates.`,
    objectives: [
      'Append an element to an array field using <code>{ $push: { tags: "nodejs" } }</code>',
      'Add an element only if it doesn\'t exist using <code>{ $addToSet: { ... } }</code> to prevent duplicates',
      'Remove a specific value from an array with <code>{ $pull: { tags: "deprecated" } }</code>',
      'Update a specific matched array element using the positional <code>$</code> operator',
      'Use the all-positional operator <code>$[]</code> and filtered positional operator <code>$[elem]</code> with <code>arrayFilters</code> for complex array updates',
    ],
  },
  {
    file: '22-upsert-and-find-and-modify.html',
    intro: `An <strong>upsert</strong> (update + insert) is one of the most useful patterns in MongoDB: if a matching document exists, update it; if it doesn't, insert a new one. This eliminates the need for a separate "check if document exists, then insert or update" round-trip. You enable upsert by passing <code>{ upsert: true }</code> as an option. When an upsert creates a new document, fields from the query filter are included in the new document — so <code>$set</code> adds extra fields on top of the filter fields. <strong><code>findOneAndUpdate()</code></strong>, <strong><code>findOneAndReplace()</code></strong>, and <strong><code>findOneAndDelete()</code></strong> are atomic operations that return the document as it existed before or after the modification — essential for implementing work queues, distributed counters, and optimistic locking.`,
    objectives: [
      'Perform an upsert using <code>db.collection.updateOne(filter, update, { upsert: true })</code>',
      'Understand how upserted documents are constructed from the filter + <code>$set</code>/<code>$setOnInsert</code> fields',
      'Use <code>$setOnInsert</code> to set fields only when a document is being created by an upsert, not on updates',
      'Return the updated document atomically using <code>findOneAndUpdate(filter, update, { returnDocument: "after" })</code>',
      'Implement an atomic "find and dequeue" work-queue pattern using <code>findOneAndUpdate()</code> with a status field',
    ],
  },
  {
    file: '23-deleting-documents.html',
    intro: `Deleting data in MongoDB requires the same precision as querying — a poorly written filter can delete far more (or far fewer) documents than intended. <strong><code>deleteOne()</code></strong> removes the <em>first</em> document matching the filter and is your go-to for deleting a specific record by its <code>_id</code>. <strong><code>deleteMany()</code></strong> removes all matching documents — use it carefully, always with a tested filter. A <strong>drop</strong> operation (<code>db.collection.drop()</code>) removes the entire collection including its indexes — much faster than <code>deleteMany({})</code> when you need to clear everything. Soft deletes — setting <code>{ isDeleted: true, deletedAt: new Date() }</code> instead of actually removing the document — are preferred in many production applications to preserve audit trails.`,
    objectives: [
      'Delete a specific document by its <code>_id</code> using <code>deleteOne({ _id: ObjectId("...") })</code>',
      'Delete all documents matching a filter using <code>deleteMany({ status: "archived" })</code>',
      'Understand the difference between <code>deleteMany({})</code> (slow, preserves indexes) and <code>drop()</code> (fast, removes collection)',
      'Implement a soft-delete pattern by adding an <code>isDeleted</code> boolean field and filtering it out in queries',
      'Return the deleted document before removal using <code>findOneAndDelete()</code> for atomic read-then-delete workflows',
    ],
  },
  {
    file: '24-bulk-write-operations.html',
    intro: `When you need to perform many write operations — inserts, updates, deletes — against MongoDB in one go, sending them one at a time over the network is extremely slow. <strong>Bulk write operations</strong> batch multiple write operations into a single network round-trip, drastically reducing latency and improving throughput. MongoDB's <code>bulkWrite()</code> method accepts an array of operation objects — <code>insertOne</code>, <code>updateOne</code>, <code>updateMany</code>, <code>replaceOne</code>, <code>deleteOne</code>, <code>deleteMany</code> — and executes them in <strong>ordered</strong> (default, stop on first error) or <strong>unordered</strong> mode (continue on errors, maximise parallelism). Bulk writes are essential for data migration scripts, ETL pipelines, batch reporting systems, and any use case involving thousands of write operations.`,
    objectives: [
      'Execute a batch of mixed write operations using <code>db.collection.bulkWrite([...operations])</code>',
      'Understand the <code>BulkWriteResult</code> object: <code>insertedCount</code>, <code>modifiedCount</code>, <code>deletedCount</code>, <code>upsertedCount</code>',
      'Compare ordered vs. unordered bulk writes and choose the right mode based on error-tolerance requirements',
      'Build a data migration script that uses <code>bulkWrite()</code> to transform and re-insert documents efficiently',
      'Handle partial failure in bulk writes: inspect the <code>writeErrors</code> array in the result for failed operations',
    ],
  },
  {
    file: '25-schema-validation.html',
    intro: `While MongoDB is schema-flexible by default, production databases almost always need <strong>schema validation</strong> to enforce data quality and prevent bad data from entering the system. MongoDB supports <strong>JSON Schema validation</strong> (the same standard used by APIs and OpenAPI specs) directly at the collection level. You define validation rules when creating a collection or add them later with <code>collMod</code>. Rules can enforce required fields, field types, string patterns (regex), numeric ranges, enum values, and more. MongoDB can either <strong>error</strong> on invalid documents (strict mode) or <strong>warn</strong> and log them (moderate mode) — letting you apply validation to existing collections without breaking old data. This eliminates an entire class of application bugs at the database layer.`,
    objectives: [
      'Create a collection with JSON Schema validation using <code>db.createCollection("name", { validator: { $jsonSchema: {...} } })</code>',
      'Define required fields, BSON types, minimum/maximum values, and string patterns in a <code>$jsonSchema</code> validator',
      'Set the validation action (<code>error</code> vs. <code>warn</code>) and validation level (<code>strict</code> vs. <code>moderate</code>)',
      'Add or update schema validation on an existing collection using the <code>collMod</code> command',
      'View the current validation rules of a collection using <code>db.getCollectionInfos({ name: "collectionName" })</code>',
    ],
  },
  {
    file: '26-indexing-fundamentals.html',
    intro: `Without indexes, MongoDB must scan <em>every document</em> in a collection to find matches — a full collection scan (COLLSCAN) that becomes catastrophically slow as your collection grows. <strong>Indexes</strong> are special data structures (B-trees) that MongoDB maintains alongside your collection, pre-sorting and pre-organizing field values so queries can jump directly to matching documents. The performance difference is dramatic: a COLLSCAN on 10 million documents might take 5 seconds; the same query with a good index returns in under 1 millisecond. Every MongoDB collection automatically gets a <strong>default index on <code>_id</code></strong>. Additional indexes must be created explicitly with <code>createIndex()</code>. The challenge — and the art — of indexing is choosing indexes that cover your most frequent queries without creating too many, since each index adds write overhead and storage cost.`,
    objectives: [
      'Understand what a B-tree index is and how MongoDB uses it to avoid full collection scans',
      'Create a single-field index with <code>db.collection.createIndex({ field: 1 })</code> (ascending) or <code>-1</code> (descending)',
      'List all indexes on a collection using <code>db.collection.getIndexes()</code>',
      'Drop an unused index with <code>db.collection.dropIndex("indexName")</code>',
      'Identify whether a query uses an index by examining the <code>winningPlan.stage</code> in <code>explain("executionStats")</code>',
    ],
  },
  {
    file: '27-single-field-and-compound-indexes.html',
    intro: `A <strong>compound index</strong> covers multiple fields in a single index structure, enabling fast queries that filter or sort on more than one field simultaneously. MongoDB evaluates compound indexes from left to right — this is the <strong>prefix rule</strong>: a compound index on <code>{ lastName: 1, firstName: 1, age: 1 }</code> automatically supports queries on <code>lastName</code> alone, or <code>lastName + firstName</code>, but <em>not</em> <code>firstName</code> alone. This is why the order of fields in a compound index matters enormously. The <strong>ESR (Equality → Sort → Range)</strong> rule tells you the optimal field ordering: put equality conditions first, then sort fields, then range conditions. This strategy maximises index efficiency and minimises in-memory sorting.`,
    objectives: [
      'Create a compound index and understand how the field order determines which queries it supports',
      'Apply the ESR rule (Equality, Sort, Range) to design optimal compound index field ordering',
      'Understand the prefix rule: which sub-queries a compound index automatically satisfies',
      'Verify that a compound index covers a sort operation (eliminates in-memory sort) using <code>explain()</code>',
      'Understand "covered queries" — where the index contains all fields needed to satisfy the query without touching documents',
    ],
  },
  {
    file: '28-specialized-indexes.html',
    intro: `Beyond standard B-tree indexes, MongoDB supports several specialised index types for specific use cases. <strong>Multikey indexes</strong> are automatically created when you index an array field — MongoDB creates one index entry per array element, enabling fast membership queries. <strong>Text indexes</strong> enable full-text search on string fields, supporting tokenisation, stemming, and relevance scoring with the <code>$text</code> query operator. <strong>Hashed indexes</strong> store a hash of the field value rather than the value itself — they support only exact equality queries but distribute data evenly across shards, making them ideal as shard keys. <strong>Sparse indexes</strong> only index documents where the indexed field actually exists, saving space when many documents omit the field. <strong>Partial indexes</strong> index only documents matching a filter expression — the most powerful way to create small, targeted indexes.`,
    objectives: [
      'Understand multikey indexes: how MongoDB automatically indexes arrays and what queries they accelerate',
      'Create a text index with <code>{ field: "text" }</code> and query it with <code>{ $text: { $search: "keyword" } }</code>',
      'Create a hashed index with <code>{ field: "hashed" }</code> and understand its use as a shard key',
      'Create a sparse index that only covers documents where a field is present',
      'Create a partial index with a filter expression to index only a subset of documents (e.g., only active users)',
    ],
  },
  {
    file: '29-geospatial-and-ttl-indexes.html',
    intro: `MongoDB has two powerful purpose-built index types for common real-world scenarios. <strong>Geospatial indexes</strong> store and query geographic coordinate data, enabling location-based queries: find all restaurants within 2 km of the user's GPS coordinates, or check if a coordinate falls within a polygon. The <strong>2dsphere index</strong> handles Earth-surface geometry (longitude/latitude) using GeoJSON objects, supporting <code>$near</code>, <code>$geoWithin</code>, <code>$geoIntersects</code>, and <code>$nearSphere</code> queries. <strong>TTL (Time-To-Live) indexes</strong> are a special type of index on a <code>Date</code> field that automatically deletes documents after a specified number of seconds — perfect for sessions, caches, one-time tokens, temporary jobs, and any data with a natural expiry time.`,
    objectives: [
      'Store location data as GeoJSON <code>Point</code> objects: <code>{ type: "Point", coordinates: [longitude, latitude] }</code>',
      'Create a <code>2dsphere</code> geospatial index and query for nearby locations using <code>$near</code> with <code>$maxDistance</code>',
      'Find documents within a geographic area using <code>$geoWithin</code> with a <code>$polygon</code> or <code>$centerSphere</code>',
      'Create a TTL index: <code>db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })</code>',
      'Understand TTL index limitations: one TTL per collection, fires every 60 seconds, only works on <code>Date</code> fields',
    ],
  },
  {
    file: '30-query-performance-explain.html',
    intro: `The <strong><code>explain()</code></strong> method is MongoDB's built-in query profiler — your primary tool for diagnosing slow queries and verifying that indexes are actually being used. Calling <code>find(filter).explain("executionStats")</code> returns a detailed plan showing exactly how MongoDB evaluated the query: which index was chosen, how many documents were scanned vs. returned, and how long each stage took. The most important fields to examine are <code>winningPlan.stage</code> (IXSCAN is good, COLLSCAN is bad), <code>totalDocsExamined</code> (should be close to <code>totalDocsReturned</code>), and <code>executionTimeMillis</code>. MongoDB also provides the <strong>Database Profiler</strong> (<code>db.setProfilingLevel(1, { slowms: 100 })</code>) to automatically log slow queries to the <code>system.profile</code> collection.`,
    objectives: [
      'Run <code>find(query).explain("executionStats")</code> and interpret the key metrics: stage, docsExamined, executionTimeMillis',
      'Distinguish between a COLLSCAN (full scan, bad) and IXSCAN (index scan, good) in the explain plan',
      'Identify index intersection and rejected plans in <code>rejectedPlans</code> to understand query plan selection',
      'Enable the slow query profiler with <code>db.setProfilingLevel(1, { slowms: 100 })</code> and query <code>system.profile</code>',
      'Use MongoDB Atlas Performance Advisor to get automated index recommendations based on your actual query patterns',
    ],
  },
  {
    file: '31-aggregation-pipeline-intro.html',
    intro: `The <strong>Aggregation Pipeline</strong> is MongoDB's most powerful data processing feature — a framework for transforming, grouping, filtering, and reshaping collections of documents through a sequence of processing stages. Think of it like a Unix pipe: documents flow through an ordered array of stages, each stage transforming the stream. <code>$match</code> filters, <code>$group</code> aggregates, <code>$project</code> reshapes, <code>$sort</code> orders, <code>$lookup</code> joins, <code>$unwind</code> deconstructs arrays. Unlike <code>find()</code>, the aggregation pipeline can compute totals, averages, and custom metrics across many documents and return completely new document shapes. It's the MongoDB equivalent of SQL's <code>GROUP BY</code>, <code>HAVING</code>, <code>SUM()</code>, <code>AVG()</code>, and subqueries — all in one expressive framework.`,
    objectives: [
      'Understand the aggregation pipeline concept: documents flow through an ordered array of transformation stages',
      'Run a basic pipeline using <code>db.collection.aggregate([stage1, stage2, ...])</code>',
      'Use <code>$match</code> at the start of the pipeline to reduce document count before expensive stages',
      'Understand how the pipeline differs from <code>find()</code>: it can reshape documents and compute across many records',
      'View and build aggregation pipelines visually in MongoDB Compass\'s Aggregations tab',
    ],
  },
  {
    file: '32-filtering-transformation-stages.html',
    intro: `The most frequently used aggregation stages are the ones that <strong>filter</strong> and <strong>transform</strong> document shapes. <code>$match</code> is identical to the <code>find()</code> filter — it reduces the pipeline to only matching documents. <code>$project</code> reshapes documents by including/excluding fields, computing new fields with expressions, and renaming fields — far more powerful than the projection in <code>find()</code> because it can use arithmetic, string, date, and conditional expressions. <code>$addFields</code> adds computed fields without discarding existing ones. <code>$replaceRoot</code> promotes a sub-document to the top level. <code>$count</code> returns a single document with the count of pipeline documents. Mastering these transformation stages gives you SQL-level <code>SELECT</code> and <code>WHERE</code> capabilities with MongoDB's document flexibility.`,
    objectives: [
      'Filter pipeline documents using <code>$match</code> with the same syntax as <code>find()</code> query operators',
      'Reshape documents with <code>$project</code>: include fields, exclude fields, create computed fields with expressions',
      'Add computed fields to documents without discarding other fields using <code>$addFields</code>',
      'Use aggregation expressions: <code>$concat</code>, <code>$toUpper</code>, <code>$subtract</code>, <code>$multiply</code>, <code>$cond</code>, <code>$ifNull</code>',
      'Apply <code>$replaceRoot</code> to promote a nested sub-document to the root level of pipeline output',
    ],
  },
  {
    file: '33-grouping-deconstruction-stages.html',
    intro: `The <code>$group</code> stage is the aggregation pipeline's most powerful tool — it collapses many input documents into grouped summary documents, similar to SQL's <code>GROUP BY</code>. You define the group key with <code>_id</code> (can be any expression) and compute accumulator values using operators like <code>$sum</code>, <code>$avg</code>, <code>$min</code>, <code>$max</code>, <code>$count</code>, <code>$first</code>, <code>$last</code>, <code>$push</code> (collect into array), and <code>$addToSet</code> (collect unique values). The <code>$unwind</code> stage is the opposite — it <em>deconstructs</em> an array field, outputting one document per array element. This is essential when you need to group or sort by values inside arrays. Together, <code>$unwind</code> + <code>$group</code> enable powerful array analytics.`,
    objectives: [
      'Group documents by a field using <code>$group: { _id: "$category", total: { $sum: "$price" } }</code>',
      'Compute multiple accumulators in a single <code>$group</code> stage: sum, average, min, max, count',
      'Use <code>$group</code> with <code>_id: null</code> to compute global aggregations across all documents',
      'Deconstruct array fields with <code>$unwind</code> to process individual array elements as separate documents',
      'Chain <code>$unwind</code> → <code>$group</code> to analyse array contents: e.g., count total tags used across all blog posts',
    ],
  },
  {
    file: '34-sorting-pagination-lookup-joins.html',
    intro: `Two critical aggregation pipeline stages enable SQL-like joins and efficient result ordering. <strong><code>$lookup</code></strong> performs a left outer join between the current pipeline collection and another collection in the same database — letting you fetch related documents without embedding them. You specify the foreign collection, the local field to match on, the foreign field to match against, and the output field name. <strong><code>$sort</code></strong> in the pipeline orders documents by one or more fields (and benefits from index optimisation when placed before <code>$group</code> or <code>$limit</code>). <strong><code>$limit</code></strong> and <strong><code>$skip</code></strong> provide pagination within the pipeline. Combining <code>$lookup</code> + <code>$unwind</code> + <code>$project</code> gives you the full power of SQL JOIN queries inside MongoDB's expressive pipeline.`,
    objectives: [
      'Perform a basic left outer join using <code>$lookup: { from, localField, foreignField, as }</code>',
      'Use the pipeline form of <code>$lookup</code> with <code>pipeline</code> and <code>let</code> for complex join conditions and filtering',
      'Flatten the joined array result to a single document using <code>$unwind</code> after <code>$lookup</code>',
      'Sort aggregation results by multiple fields using <code>$sort: { field1: -1, field2: 1 }</code>',
      'Combine <code>$sort</code> + <code>$skip</code> + <code>$limit</code> inside a pipeline to implement server-side pagination',
    ],
  },
  {
    file: '35-advanced-aggregation-stages.html',
    intro: `Beyond the core aggregation stages, MongoDB provides several advanced stages for complex analytics and data processing scenarios. <strong><code>$facet</code></strong> runs multiple sub-pipelines in parallel on the same input documents, returning multiple aggregation results in a single query — perfect for "search with filters" UIs that need faceted counts alongside the main results. <strong><code>$bucket</code></strong> and <strong><code>$bucketAuto</code></strong> categorise documents into ranges (like a histogram). <strong><code>$graphLookup</code></strong> performs recursive graph traversals on self-referencing collections — essential for org charts, social graphs, and category trees. <strong><code>$out</code></strong> writes pipeline results to a new collection and <strong><code>$merge</code></strong> upserts them into an existing one — enabling materialised views and pre-computed analytics.`,
    objectives: [
      'Run multiple sub-pipelines simultaneously with <code>$facet</code> to compute multiple analytics results in one query',
      'Bucket documents into numeric ranges using <code>$bucket</code> with <code>boundaries</code> and <code>$bucketAuto</code> for automatic ranges',
      'Traverse graph relationships recursively using <code>$graphLookup</code> with <code>maxDepth</code> and <code>depthField</code>',
      'Write aggregation results to a new collection using <code>$out</code> for materialised view patterns',
      'Upsert aggregation results into an existing collection using <code>$merge</code> with custom <code>on</code> and <code>whenMatched</code> options',
    ],
  },
  {
    file: '36-nodejs-driver-integration.html',
    intro: `MongoDB's official <strong>Node.js Driver</strong> (<code>mongodb</code> npm package) is the low-level, direct interface between your Node.js application and the database — no ORM or abstraction layer in between. You create a <code>MongoClient</code>, connect to your cluster (local or Atlas) with a connection string, and then interact with databases and collections using the same methods you've learned in mongosh: <code>insertOne()</code>, <code>find()</code>, <code>updateOne()</code>, <code>aggregate()</code>, etc. The driver uses a <strong>connection pool</strong> (default: 100 connections) for efficiency, handles automatic reconnection, and supports modern <strong>async/await</strong> syntax throughout. Understanding the raw driver is valuable even if you'll use Mongoose, because it reveals what's happening under the hood and is the right choice for performance-critical microservices.`,
    objectives: [
      'Install the MongoDB Node.js driver with <code>npm install mongodb</code> and connect using <code>MongoClient.connect(uri)</code>',
      'Perform CRUD operations with the driver using async/await: <code>insertOne()</code>, <code>findOne()</code>, <code>updateOne()</code>, <code>deleteOne()</code>',
      'Configure the connection pool size and server selection timeout for production deployments',
      'Use change streams with the driver to react to real-time database events: <code>collection.watch()</code>',
      'Handle driver errors properly: distinguish <code>MongoNetworkError</code>, <code>MongoDuplicateKeyError</code>, and <code>MongoServerError</code>',
    ],
  },
  {
    file: '37-mongoose-schemas-and-models.html',
    intro: `<strong>Mongoose</strong> is the most popular MongoDB ODM (Object Document Mapper) for Node.js. While the raw MongoDB driver gives you full control, Mongoose adds structure: you define <strong>Schemas</strong> (field names, types, validation rules, defaults) and <strong>Models</strong> (the interface between your code and a MongoDB collection). This schema layer catches data problems at the application level before they reach the database, generates TypeScript-friendly type definitions, and provides a rich plugin ecosystem. A Mongoose Schema defines what fields a document can have, what types they must be, whether they're required, what their defaults are, and custom validators. A Model is created from a Schema and is the class you use to query, save, and delete documents — <code>User.find()</code>, <code>new User({...}).save()</code>, etc.`,
    objectives: [
      'Define a Mongoose Schema with field types, required validation, default values, and custom validators',
      'Create a Mongoose Model from a schema using <code>mongoose.model("User", userSchema)</code>',
      'Connect to MongoDB Atlas with Mongoose using <code>mongoose.connect(uri)</code> and handle connection events',
      'Understand Mongoose\'s built-in SchemaTypes: String, Number, Date, Boolean, ObjectId, Array, Mixed',
      'Use schema options like <code>timestamps: true</code> to automatically add <code>createdAt</code> and <code>updatedAt</code> fields',
    ],
  },
  {
    file: '38-mongoose-crud-and-validation.html',
    intro: `With Mongoose Models defined, performing CRUD operations becomes intuitive and safe. <strong>Creating</strong> documents: <code>Model.create({...})</code> or <code>new Model({...}).save()</code> — both run schema validation before the insert. <strong>Reading</strong>: <code>Model.find()</code>, <code>Model.findById(id)</code>, <code>Model.findOne(filter)</code> — all return Mongoose Document instances with helper methods. <strong>Updating</strong>: <code>Model.findByIdAndUpdate(id, update, { new: true, runValidators: true })</code> — <code>runValidators: true</code> is critical so schema validation runs on updates too. <strong>Deleting</strong>: <code>Model.findByIdAndDelete(id)</code>. Mongoose's built-in validation — <code>required</code>, <code>minlength</code>, <code>maxlength</code>, <code>min</code>, <code>max</code>, <code>enum</code>, <code>match</code> (regex) — runs automatically before every save and create operation.`,
    objectives: [
      'Create and save a document using <code>Model.create({...})</code> and inspect Mongoose validation error messages',
      'Query with Mongoose: <code>find()</code>, <code>findById()</code>, <code>findOne()</code>, and chaining <code>.select()</code>, <code>.sort()</code>, <code>.limit()</code>',
      'Update with validation using <code>findByIdAndUpdate(id, update, { new: true, runValidators: true })</code>',
      'Add custom validator functions to Schema fields: <code>validate: { validator: fn, message: "..." }</code>',
      'Handle Mongoose <code>ValidationError</code> exceptions: parse the <code>errors</code> object to return field-level error messages to the client',
    ],
  },
  {
    file: '39-mongoose-middleware-and-virtuals.html',
    intro: `Mongoose <strong>middleware</strong> (also called hooks) lets you run custom logic at key lifecycle moments — before or after save, find, update, or delete operations. <code>pre("save")</code> hooks are commonly used to hash passwords before storing them, generate slugs from titles, or normalise data. <code>post("save")</code> hooks can trigger notifications, update related documents, or log activity. <strong>Virtuals</strong> are computed document properties that are not persisted to the database — they're derived from existing fields at query time. A classic example: a <code>fullName</code> virtual that concatenates <code>firstName</code> and <code>lastName</code>, or a <code>age</code> virtual computed from a stored <code>birthDate</code>. Virtuals keep your computed logic in one place and your stored data lean.`,
    objectives: [
      'Write a <code>pre("save")</code> middleware to hash a password field using bcrypt before saving to the database',
      'Write a <code>post("find")</code> middleware to log query metrics or populate related data after a query',
      'Define a virtual property with a getter that computes a value from stored fields at read time',
      'Enable virtuals in JSON output by passing <code>{ virtuals: true }</code> to <code>toJSON()</code> and <code>toObject()</code>',
      'Use <code>this.isModified("field")</code> inside a pre-save hook to conditionally run logic only when a specific field changes',
    ],
  },
  {
    file: '40-mongoose-population-referencing.html',
    intro: `When you choose to store related data as references (separate collections) rather than embedding, <strong>Mongoose populate</strong> is the tool that resolves those references into full document objects. You define a field with type <code>mongoose.Schema.Types.ObjectId</code> and a <code>ref</code> pointing to the related Model's name. When you query, you call <code>.populate("fieldName")</code> and Mongoose automatically runs a second query to fetch the referenced documents, replacing the ObjectId with the full document. Populate supports nested population (<code>.populate("author.friends")</code>), field selection (<code>.populate("author", "name email")</code>), and populate across multiple paths simultaneously. For complex cross-collection queries, Mongoose's virtual populate and the <code>$lookup</code> aggregation stage offer more flexible alternatives.`,
    objectives: [
      'Define a reference field with <code>{ type: Schema.Types.ObjectId, ref: "ModelName" }</code>',
      'Resolve references to full documents using <code>.populate("fieldName")</code> in a query chain',
      'Populate multiple reference fields in one query: <code>.populate("author").populate("category")</code>',
      'Select specific fields from the populated document: <code>.populate("author", "name email -_id")</code>',
      'Use virtual populate to define the relationship on the parent model without storing any reference in the child document',
    ],
  },
  {
    file: '41-multi-document-acid-transactions.html',
    intro: `Since MongoDB 4.0, multi-document <strong>ACID transactions</strong> are fully supported — a major milestone that addressed the biggest criticism of NoSQL databases. Within a transaction, multiple read and write operations across multiple documents (and even multiple collections) are guaranteed to be <strong>Atomic</strong> (all-or-nothing), <strong>Consistent</strong> (data remains valid), <strong>Isolated</strong> (concurrent transactions don't interfere), and <strong>Durable</strong> (committed data survives crashes). Transactions in MongoDB use a familiar session-based API: <code>session.startTransaction()</code>, <code>session.commitTransaction()</code>, <code>session.abortTransaction()</code>. They are essential for financial applications, inventory management, and any workflow where multiple related documents must be updated atomically — for example, debiting one account and crediting another simultaneously.`,
    objectives: [
      'Start, commit, and abort a multi-document transaction using <code>session.startTransaction()</code> and <code>session.commitTransaction()</code>',
      'Pass the session to all operations inside a transaction: <code>collection.insertOne(doc, { session })</code>',
      'Handle transaction errors with retry logic for transient <code>TransientTransactionError</code> errors',
      'Understand when to use transactions vs. atomic single-document operations (prefer single-document when possible)',
      'Measure the performance overhead of transactions and understand the lock contention implications in high-write scenarios',
    ],
  },
  {
    file: '42-replication-and-high-availability.html',
    intro: `A <strong>Replica Set</strong> is MongoDB's built-in high availability mechanism — a group of MongoDB servers that all maintain the same dataset. Every replica set has one <strong>Primary</strong> node (accepts all writes) and one or more <strong>Secondary</strong> nodes (replicate the primary's operations log, called the oplog). If the primary fails, the secondaries automatically elect a new primary within seconds — your application reconnects and continues with zero data loss. This automatic failover is what makes MongoDB suitable for production systems that must stay online 24/7. Replica sets also enable <strong>read scaling</strong> by directing read operations to secondaries using read preferences, and power <strong>change streams</strong> (real-time event feeds from the oplog).`,
    objectives: [
      'Understand the replica set architecture: primary, secondaries, arbiters, and the election process',
      'Initiate a local 3-node replica set for development using <code>rs.initiate()</code> in mongosh',
      'Configure read preferences to distribute read load to secondaries: <code>readPreference: "secondaryPreferred"</code>',
      'Understand write concerns and read concerns and how they control the consistency vs. availability trade-off',
      'Monitor replica set health using <code>rs.status()</code> and <code>rs.printReplicationInfo()</code> in mongosh',
    ],
  },
  {
    file: '43-sharding-and-horizontal-scaling.html',
    intro: `<strong>Sharding</strong> is MongoDB's solution for horizontal scaling — distributing data across multiple servers (shards) so that your database can grow beyond the capacity of a single machine. Each shard is a replica set, and together they form a sharded cluster managed by <strong>mongos</strong> router processes and <strong>config servers</strong>. The critical design decision in sharding is choosing a <strong>shard key</strong> — the field(s) by which MongoDB distributes documents across shards. A good shard key provides high cardinality (many unique values), even distribution, and matches your query patterns. A bad shard key creates "hotspot" shards that receive most of the traffic, negating all the benefits of sharding. MongoDB supports two shard key strategies: <strong>ranged sharding</strong> and <strong>hashed sharding</strong>.`,
    objectives: [
      'Understand the sharded cluster architecture: shards, mongos routers, and config servers',
      'Enable sharding on a database with <code>sh.enableSharding("dbName")</code> and shard a collection',
      'Choose an effective shard key: understand cardinality, write distribution, and query isolation requirements',
      'Compare ranged sharding (good for range queries) vs. hashed sharding (good for write distribution)',
      'Monitor shard balance with <code>sh.status()</code> and understand the chunk migration process',
    ],
  },
  {
    file: '44-mongodb-backups-restore-monitoring.html',
    intro: `Every production database system needs a solid backup and monitoring strategy — MongoDB is no exception. <strong><code>mongodump</code></strong> is MongoDB's CLI tool for creating binary backups of databases or collections, and <strong><code>mongorestore</code></strong> restores them. For point-in-time recovery on replica sets, MongoDB's oplog-based backup captures all changes since the last snapshot. MongoDB Atlas automates all of this — providing continuous backups, point-in-time restore to any second, and automated snapshot scheduling. On the monitoring side, <strong>MongoDB's free monitoring</strong> tool, the <strong>Atlas monitoring dashboard</strong>, and third-party tools like Prometheus + Grafana give you visibility into operations per second, connection count, index usage, replication lag, and disk utilisation.`,
    objectives: [
      'Create a full database backup using <code>mongodump --uri=... --out=./backup/</code> and restore it with <code>mongorestore</code>',
      'Export and import specific collections in JSON format using <code>mongoexport</code> and <code>mongoimport</code>',
      'Enable and use MongoDB Atlas automated backups with configurable snapshot schedules',
      'Monitor MongoDB performance with <code>db.currentOp()</code>, <code>db.serverStatus()</code>, and <code>mongostat</code>',
      'Set up alerts in MongoDB Atlas for critical metrics: CPU usage, connections, replication lag, and disk utilisation',
    ],
  },
  {
    file: '45-mongodb-security-access-control.html',
    intro: `A default MongoDB installation has no authentication enabled — any process on the local machine can connect and read or modify all data. In production, this is catastrophic. MongoDB's security model has multiple layers: <strong>Authentication</strong> (proving identity) using SCRAM, x.509 certificates, LDAP, or Kerberos; <strong>Role-Based Access Control (RBAC)</strong> (granting permissions) using built-in roles like <code>readWrite</code>, <code>dbAdmin</code>, <code>clusterAdmin</code>, and custom roles with fine-grained privileges; <strong>Network encryption</strong> using TLS/SSL for all connections; and <strong>Encryption at rest</strong> using WiredTiger's native encryption or MongoDB Enterprise's advanced options. MongoDB Atlas handles most of this automatically, but understanding the underlying concepts is essential for self-hosted deployments.`,
    objectives: [
      'Enable MongoDB authentication by creating an admin user and starting mongod with <code>--auth</code>',
      'Create database users with role-based access control using <code>db.createUser()</code> with specific built-in roles',
      'Understand MongoDB\'s built-in roles: <code>read</code>, <code>readWrite</code>, <code>dbAdmin</code>, <code>userAdmin</code>, <code>clusterAdmin</code>',
      'Create a custom role with fine-grained collection-level read/write privileges',
      'Enable TLS/SSL encryption for MongoDB connections and configure Atlas IP Access Lists and VPC peering',
    ],
  },
  {
    file: '46-real-time-change-streams.html',
    intro: `<strong>Change Streams</strong> are MongoDB's real-time event feed — they let your application subscribe to a collection, database, or entire deployment and receive a notification every time data changes: inserts, updates, deletes, and replacements. Under the hood, change streams are powered by MongoDB's replication oplog, making them resilient and resumable — if your application disconnects, it can resume from the last processed event using a <strong>resume token</strong> with zero data loss. Change streams are the foundation for building <strong>event-driven architectures</strong>: live dashboards, real-time notifications, cache invalidation, audit logging, and data synchronisation pipelines. They work with the MongoDB Node.js driver (<code>collection.watch()</code>), PyMongo, and other official drivers.`,
    objectives: [
      'Open a change stream on a collection using <code>collection.watch()</code> and iterate over change events',
      'Filter change stream events by operation type using a pipeline: <code>[{ $match: { operationType: "insert" } }]</code>',
      'Resume a change stream after reconnection using the <code>resumeAfter</code> or <code>startAfter</code> option with a resume token',
      'Use change streams to build a real-time notification system that alerts users when their data changes',
      'Understand change stream limitations: requires a replica set or sharded cluster, oplog retention window',
    ],
  },
  {
    file: '47-gridfs-large-file-storage.html',
    intro: `MongoDB documents are limited to <strong>16 MB</strong> — too small for storing video files, large PDFs, high-resolution images, or binary blobs. <strong>GridFS</strong> is MongoDB's specification for storing and retrieving files larger than 16 MB. It works by splitting files into chunks (default 255 KB each) and storing each chunk as a separate document in a <code>chunks</code> collection, with file metadata (filename, content type, upload date, custom metadata) in a <code>files</code> collection. The two collections are linked by a shared <code>files_id</code>. GridFS is built into the MongoDB drivers — in Node.js you use <code>GridFSBucket</code> to stream files in and out. While object storage services like AWS S3 are often better for massive file storage, GridFS is excellent when you want file storage tightly integrated with your MongoDB data and access control.`,
    objectives: [
      'Understand how GridFS splits files into chunks and stores metadata in the <code>.files</code> and <code>.chunks</code> collections',
      'Upload a file to GridFS using a Node.js write stream: <code>bucket.openUploadStream("filename.pdf")</code>',
      'Download a file from GridFS using a read stream: <code>bucket.openDownloadStreamByName("filename.pdf")</code>',
      'List files stored in GridFS with metadata using <code>bucket.find({})</code>',
      'Delete a file from GridFS by its <code>_id</code> using <code>bucket.delete(fileId)</code>',
    ],
  },
  {
    file: '48-timeseries-and-atlas-search.html',
    intro: `MongoDB 5.0 introduced native <strong>Time Series Collections</strong> — a specialised collection type optimised for storing measurements that arrive in time order, such as IoT sensor data, application metrics, stock prices, and server monitoring data. Time series collections automatically compress and sort data chronologically, reducing storage size by up to 50% and speeding up time-range queries dramatically. <strong>Atlas Search</strong> is MongoDB's fully managed full-text search engine built on Apache Lucene — available as a native Atlas feature with no separate Elasticsearch deployment needed. It supports relevance scoring, fuzzy matching (typo tolerance), autocomplete, faceting, highlighting, and synonym mapping. Atlas Search indexes are defined as Atlas Search index definitions, and queries use the <code>$search</code> aggregation stage.`,
    objectives: [
      'Create a time series collection with <code>db.createCollection("metrics", { timeseries: { timeField: "timestamp", metaField: "sensor" } })</code>',
      'Insert time series documents and query them efficiently using time-range filters on the <code>timeField</code>',
      'Create an Atlas Search index in the Atlas UI and query it using the <code>$search</code> aggregation stage',
      'Build a fuzzy search query with <code>$search: { text: { query: "...", fuzzy: { maxEdits: 1 } } }</code>',
      'Implement autocomplete search using Atlas Search\'s <code>autocomplete</code> operator and a custom index mapping',
    ],
  },
  {
    file: '49-enterprise-database-design-patterns.html',
    intro: `Building enterprise-grade applications with MongoDB requires applying proven <strong>design patterns</strong> that solve recurring architectural challenges at scale. The <strong>Bucket Pattern</strong> groups related time-series data into fewer, larger documents to reduce index overhead. The <strong>Outlier Pattern</strong> handles the rare "super-popular" document (a celebrity with 10 million followers) that would break a standard embedding approach. The <strong>Computed Pattern</strong> pre-computes expensive aggregation results and caches them in a document for instant reads. The <strong>Polymorphic Pattern</strong> stores different but related types of objects in the same collection with a discriminator field. The <strong>Extended Reference Pattern</strong> copies a subset of frequently-read fields from a referenced document into the referencing document, eliminating the need for a <code>$lookup</code> on hot query paths.`,
    objectives: [
      'Apply the Bucket Pattern to group time-series measurements into daily or hourly document buckets',
      'Use the Outlier Pattern to handle documents that would exceed size limits or cause hotspot problems',
      'Implement the Computed Pattern: pre-compute expensive analytics results and cache them with a background job',
      'Design a polymorphic collection where multiple document types share a collection with a discriminator field',
      'Apply the Extended Reference Pattern to embed a "read replica" of frequently accessed foreign fields',
    ],
  },
  {
    file: '50-mongodb-interview-preparation.html',
    intro: `Preparing for a MongoDB technical interview requires solid understanding across all layers: conceptual (what is a replica set?), practical (write a <code>$lookup</code> pipeline), and architectural (when to embed vs. reference?). Interviewers at top tech companies test MongoDB skills through scenario-based questions — "How would you model an e-commerce order system?", schema design whiteboarding, query writing, and performance troubleshooting. The most common interview topics are: CRUD operations, indexing strategy, aggregation pipeline, schema design patterns, replica sets and sharding, and transactions. This chapter distils the <strong>top 50 MongoDB interview questions</strong> — with detailed, production-quality answers — covering beginner through advanced levels so you walk into any technical interview with complete confidence.`,
    objectives: [
      'Confidently answer conceptual questions: ACID properties, CAP theorem, BASE consistency, replica set elections',
      'Write aggregation pipelines from scratch for common interview scenarios: top-N queries, join results, grouped analytics',
      'Explain schema design decisions: embedding vs. referencing trade-offs with concrete examples and reasoning',
      'Describe MongoDB indexing strategy: index types, compound index prefix rule, ESR rule, covered queries',
      'Solve system design questions: design a URL shortener, social media feed, or real-time chat system using MongoDB',
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HTML BUILDER — generate new section 1 + section 2 block
// ─────────────────────────────────────────────────────────────────────────────
function buildIntroSections(ch) {
  const liItems = ch.objectives
    .map(o => `          <li>${o}</li>`)
    .join('\n');

  return `    <!-- 1. Simple introduction -->
    <div class="section-title"><span class="num">1</span>Simple Introduction</div>
    <div class="section-body">
      <p>${ch.intro}</p>
    </div>

    <!-- 2. What you will learn -->
    <div class="section-title"><span class="num">2</span>What You Will Learn</div>
    <div class="section-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:16px 20px;margin-bottom:24px;">
        <strong style="color:#00ed64;display:block;margin-bottom:10px;">📚 Learning Objectives:</strong>
        <ul style="margin:0 0 0 20px;line-height:1.8;">
${liItems}
        </ul>
      </div>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// REGEX — matches from the section-1 comment to just before the section-3 comment
// ─────────────────────────────────────────────────────────────────────────────
const SECTION_REGEX = /    <!-- 1\. Simple introduction -->[\s\S]*?(?=\n    <!-- 3\.)/;

// ─────────────────────────────────────────────────────────────────────────────
// MAIN LOOP
// ─────────────────────────────────────────────────────────────────────────────
let updated = 0;
let skipped = 0;

for (const ch of chapters) {
  const filePath = path.join(mongoDir, ch.file);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  File not found: ${ch.file}`);
    skipped++;
    continue;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  if (!SECTION_REGEX.test(html)) {
    console.warn(`⚠️  Pattern not found in: ${ch.file}`);
    skipped++;
    continue;
  }

  const newBlock = buildIntroSections(ch);
  html = html.replace(SECTION_REGEX, newBlock);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅  Updated: ${ch.file}`);
  updated++;
}

console.log(`\n🎉 Done! Updated: ${updated} chapters, Skipped: ${skipped}`);
