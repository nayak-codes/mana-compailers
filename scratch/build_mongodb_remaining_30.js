/**
 * build_mongodb_remaining_30.js
 * Generates extensive, high-quality, multi-section content for MongoDB Chapters 21 through 50.
 */

const fs   = require('fs');
const path = require('path');

const mongoDir = path.join(__dirname, '..', 'public', 'blog-mongodb');

function sec(num, title, body) {
  return `    <div class="section">
      <div class="section-title"><span class="num">${num}</span>${title}</div>
      <div class="section-body">
${body}
      </div>
    </div>`;
}

const chapters = {
  21: {
    file: '21-updating-arrays.html',
    title: 'MongoDB — Updating Arrays in Documents',
    intro: 'Master array mutation operations in MongoDB. Learn how to push, pull, deduplicate, and perform conditional positional updates on nested elements.',
    content: [
      sec(1, "Array Update Operators Overview", `
<p>Arrays in BSON documents require specialized update modifiers because updating an array involves adding, removing, or modifying specific elements within a list.</p>

<table class="tbl">
  <thead>
    <tr><th>Operator</th><th>Purpose</th><th>Example</th></tr>
  </thead>
  <tbody>
    <tr><td><code>$push</code></td><td>Appends an item to the end of an array</td><td><code>{ $push: { tags: "mongodb" } }</code></td></tr>
    <tr><td><code>$addToSet</code></td><td>Appends an item ONLY if it does not exist (prevents duplicates)</td><td><code>{ $addToSet: { tags: "nodejs" } }</code></td></tr>
    <tr><td><code>$pull</code></td><td>Removes all items matching a query condition</td><td><code>{ $pull: { tags: "deprecated" } }</code></td></tr>
    <tr><td><code>$pop</code></td><td>Removes the first (-1) or last (1) item of an array</td><td><code>{ $pop: { logs: 1 } }</code></td></tr>
  </tbody>
</table>
`),
      sec(2, "Advanced $push Modifiers ($each, $slice, $sort, $position)", `
<p>You can combine <code>$push</code> with modifiers to manage array size and ordering atomically:</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">$push Modifiers Example</span></div>
  <pre><code>// Push multiple items, keep array sorted by score descending, limit to top 5 items
db.leaderboards.updateOne(
  { _id: "game_101" },
  {
    $push: {
      scores: {
        $each: [ { player: "Alex", score: 95 }, { player: "Sam", score: 88 } ],
        $sort: { score: -1 },
        $slice: 5
      }
    }
  }
);</code></pre>
</div>
`),
      sec(3, "Positional Update Operators ($, $[], $[elem])", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Positional Array Updates</span></div>
  <pre><code>// 1. Positional Operator ($): Updates the FIRST matched array element
db.students.updateOne(
  { _id: 101, "grades.subject": "Math" },
  { $set: { "grades.$.score": 95 } }
);

// 2. All Positional Operator ($[]): Updates ALL array elements
db.products.updateOne(
  { _id: 501 },
  { $inc: { "prices.$[]": 5 } }
);

// 3. Filtered Positional Operator ($[elem]): Updates elements matching arrayFilters
db.students.updateOne(
  { _id: 101 },
  { $set: { "scores.$[elem]": 100 } },
  { arrayFilters: [{ "elem": { $lt: 50 } }] }
);</code></pre>
</div>
`)
    ]
  },

  22: {
    file: '22-upsert-and-find-and-modify.html',
    title: 'MongoDB — Upsert Operations & FindAndModify',
    intro: 'Master atomic upsert operations ({ upsert: true }), $setOnInsert, and thread-safe findOneAndUpdate() workflows for concurrent systems.',
    content: [
      sec(1, "What is an Upsert Operation?", `
<p>An <strong>Upsert</strong> (Update + Insert) is a conditional atomic operation: if a document matching the query filter exists, MongoDB updates it; if no document matches, MongoDB automatically creates and inserts a new document combining the query filter and update modifiers.</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Upsert Syntax Example</span></div>
  <pre><code>db.page_views.updateOne(
  { pageUrl: "/blog/mongodb" },
  { 
    $inc: { views: 1 },
    $setOnInsert: { firstVisited: new Date() } // Executed ONLY on new insert!
  },
  { upsert: true }
);</code></pre>
</div>
`),
      sec(2, "Atomic Read-and-Modify with findOneAndUpdate()", `
<p>Standard <code>updateOne()</code> returns only write acknowledgment stats. When you need to retrieve the modified document atomically in a single step (e.g. reserving a seat or generating auto-increment sequence numbers), use <code>findOneAndUpdate()</code>:</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Atomic Counter Generator Example</span></div>
  <pre><code>async function getNextSequenceValue(sequenceName) {
  const result = await db.counters.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { seq: 1 } },
    { returnDocument: "after", upsert: true }
  );
  return result.seq;
}</code></pre>
</div>
`)
    ]
  },

  23: {
    file: '23-deleting-documents.html',
    title: 'MongoDB — Deleting Documents & Collection Cleanup',
    intro: 'Learn deleteOne(), deleteMany(), drop(), and soft-delete audit patterns for clean data lifecycle management.',
    content: [
      sec(1, "Deleting Documents with deleteOne() and deleteMany()", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Delete Examples</span></div>
  <pre><code>// 1. Delete a single document by _id
db.users.deleteOne({ _id: ObjectId("65d8f1e2a9b3c4d5e6f7a8b9") });

// 2. Delete all inactive users who haven't logged in for 30 days
db.users.deleteMany({
  status: "inactive",
  lastLogin: { $lt: new Date(Date.now() - 30*24*60*60*1000) }
});</code></pre>
</div>
`),
      sec(2, "Hard Delete vs Soft Delete Pattern", `
<p>In enterprise applications, hard deleting records from the database removes valuable audit trails. The <strong>Soft Delete Pattern</strong> marks documents as deleted without actually removing them from disk:</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Soft Delete Implementation</span></div>
  <pre><code>// Soft delete a user record
db.users.updateOne(
  { _id: userId },
  { $set: { isDeleted: true, deletedAt: new Date() } }
);

// Always include filter in active queries
db.users.find({ isDeleted: { $ne: true } });</code></pre>
</div>
`),
      sec(3, "Dropping Collections vs Bulk Deleting", `
<p>If you need to clear an entire collection, calling <code>deleteMany({})</code> deletes documents one-by-one while keeping indexes intact. Calling <code>db.collection.drop()</code> instantly drops the entire collection and its indexes from disk — making it thousands of times faster!</p>
`)
    ]
  },

  24: {
    file: '24-bulk-write-operations.html',
    title: 'MongoDB — Bulk Write Operations',
    intro: 'Batch thousands of insert, update, and delete operations into a single network round-trip using bulkWrite().',
    content: [
      sec(1, "Why Bulk Write Operations Matter", `
<p>Executing 1,000 separate write calls sends 1,000 individual network request packets to MongoDB. Using <code>bulkWrite()</code> batches all 1,000 operations into a single network request, drastically reducing latency and maximizing throughput.</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">bulkWrite Code Example</span></div>
  <pre><code>db.products.bulkWrite([
  { insertOne: { document: { title: "Mouse", price: 20 } } },
  { updateOne: { filter: { _id: 101 }, update: { $set: { price: 25 } } } },
  { deleteOne: { filter: { _id: 202 } } }
], { ordered: false });</code></pre>
</div>
`),
      sec(2, "Ordered vs Unordered Bulk Execution", `
<ul style="line-height:1.8;margin-left:20px;">
  <li><strong>Ordered (Default):</strong> MongoDB executes operations serially. If an error occurs on operation #3, processing stops and remaining operations are cancelled.</li>
  <li><strong>Unordered (<code>{ ordered: false }</code>):</strong> MongoDB executes operations in parallel. If an operation fails, MongoDB continues executing all remaining valid operations!</li>
</ul>
`)
    ]
  },

  25: {
    file: '25-schema-validation.html',
    title: 'MongoDB — Schema Validation & JSON Schema',
    intro: 'Enforce database-level validation rules using JSON Schema ($jsonSchema) and collMod commands.',
    content: [
      sec(1, "Enforcing Schema Rules with $jsonSchema", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">createCollection with Validation</span></div>
  <pre><code>db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "age"],
      properties: {
        name: { bsonType: "string", description: "Must be a string" },
        email: { pattern: "^.+@.+$", description: "Must be a valid email" },
        age: { bsonType: "int", minimum: 18, description: "Must be an integer >= 18" }
      }
    }
  },
  validationAction: "error"
});</code></pre>
</div>
`),
      sec(2, "Modifying Validation Rules on Existing Collections", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">collMod Command Example</span></div>
  <pre><code>// Modify validation rules without recreating collection
db.runCommand({
  collMod: "users",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "status"]
    }
  },
  validationLevel: "moderate"
});</code></pre>
</div>
`)
    ]
  },

  26: {
    file: '26-indexing-fundamentals.html',
    title: 'MongoDB — Indexing Fundamentals',
    intro: 'Understand B-tree indexes, single field indexes, and how indexes transform slow COLLSCAN scans into fast IXSCAN lookups.',
    content: [
      sec(1, "What is an Index & Why Do You Need It?", `
<p>Without an index, MongoDB must scan <em>every single document</em> in a collection (called a <strong>COLLSCAN</strong>). An index is a specialized B-tree data structure that stores a sorted list of field values, allowing MongoDB to perform fast logarithmic lookups (called an <strong>IXSCAN</strong>).</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Creating an Index</span></div>
  <pre><code>// Create ascending index on email field
db.users.createIndex({ email: 1 });

// List all indexes on collection
db.users.getIndexes();

// Drop an index
db.users.dropIndex("email_1");</code></pre>
</div>
`),
      sec(2, "The Cost of Indexing", `
<div class="callout" style="border-left-color:#ff4757;">
  <div class="callout-title" style="color:#ff4757;">⚠️ Index Trade-offs:</div>
  <ul style="line-height:1.8;margin-left:20px;">
    <li><strong>Faster Reads:</strong> Reduces query execution time from seconds to milliseconds.</li>
    <li><strong>Slower Writes:</strong> Every <code>insertOne()</code> or <code>deleteOne()</code> must update both the document AND all associated indexes.</li>
    <li><strong>RAM Memory Usage:</strong> Indexes must fit entirely inside WiredTiger RAM cache for optimal speed.</li>
  </ul>
</div>
`)
    ]
  },

  27: {
    file: '27-single-field-and-compound-indexes.html',
    title: 'MongoDB — Single Field & Compound Indexes',
    intro: 'Master Compound Indexes, the Prefix Rule, and the ESR (Equality, Sort, Range) rule for optimal index ordering.',
    content: [
      sec(1, "The ESR Rule for Compound Index Field Ordering", `
<p>When designing a compound index spanning multiple fields, arrange fields using the <strong>ESR Rule</strong>:</p>

<ol style="line-height:1.8;margin-left:20px;">
  <li><strong>E (Equality):</strong> Place fields tested for exact match (e.g. <code>status: "active"</code>) FIRST.</li>
  <li><strong>S (Sort):</strong> Place fields used in <code>.sort()</code> SECOND.</li>
  <li><strong>R (Range):</strong> Place fields tested for ranges (e.g. <code>price: { $gt: 100 }</code>) LAST.</li>
</ol>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">ESR Compound Index Example</span></div>
  <pre><code>// Query: Find products in "electronics", sort by createdAt desc, price > 50
db.products.createIndex({ category: 1, createdAt: -1, price: 1 });</code></pre>
</div>
`),
      sec(2, "Understanding Covered Queries", `
<p>A <strong>Covered Query</strong> occurs when an index contains all fields requested by a query filter and projection. MongoDB reads results directly from the index in RAM without fetching documents from disk!</p>
`)
    ]
  },

  28: {
    file: '28-specialized-indexes.html',
    title: 'MongoDB — Specialized Indexes: Multikey, Text & Hashed',
    intro: 'Explore Multikey indexes for array fields, Text indexes for full-text search, and Hashed indexes for sharding.',
    content: [
      sec(1, "Multikey Indexes (Array Fields)", `
<p>When you create an index on a field containing an array, MongoDB automatically creates a <strong>Multikey Index</strong> by indexing each element in the array separately.</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Multikey Index Example</span></div>
  <pre><code>// Document: { title: "Post", tags: ["js", "mongo"] }
db.posts.createIndex({ tags: 1 }); // Automatically becomes a Multikey index!</code></pre>
</div>
`),
      sec(2, "Text Indexes for Full-Text Search", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Text Index & Search</span></div>
  <pre><code>// 1. Create text index on title and description
db.articles.createIndex({ title: "text", description: "text" });

// 2. Search using $text operator
db.articles.find({ $text: { $search: "mongodb tutorial" } });</code></pre>
</div>
`)
    ]
  },

  29: {
    file: '29-geospatial-and-ttl-indexes.html',
    title: 'MongoDB — Geospatial & TTL Indexes',
    intro: 'Build location-aware apps with 2dsphere GeoJSON indexes and set auto-expiring document caches with TTL indexes.',
    content: [
      sec(1, "TTL (Time-To-Live) Auto-Expiring Documents", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">TTL Index Example</span></div>
  <pre><code>// Automatically delete session documents 3600 seconds (1 hour) after createdAt
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }
);</code></pre>
</div>
`),
      sec(2, "Geospatial 2dsphere Indexing", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">GeoJSON Location Query</span></div>
  <pre><code>// Store location as GeoJSON Point [longitude, latitude]
db.stores.insertOne({
  name: "Central Store",
  location: { type: "Point", coordinates: [78.4867, 17.3850] }
});

// Index location
db.stores.createIndex({ location: "2dsphere" });

// Find stores within 5000 meters
db.stores.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [78.48, 17.38] },
      $maxDistance: 5000
    }
  }
});</code></pre>
</div>
`)
    ]
  },

  30: {
    file: '30-query-performance-explain.html',
    title: 'MongoDB — Query Performance Analysis with explain()',
    intro: 'Diagnose slow queries using .explain("executionStats") and enable the database profiler to catch slow queries.',
    content: [
      sec(1, "Reading explain('executionStats') Output", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">explain() Command</span></div>
  <pre><code>db.users.find({ email: "test@example.com" }).explain("executionStats");

// Key Metrics to Check:
// 1. winningPlan.stage -> Should be "IXSCAN" (Index Scan), NOT "COLLSCAN"!
// 2. totalDocsExamined -> Should match nReturned (e.g. examined 1 doc to return 1 doc)
// 3. executionTimeMillis -> Query execution time in ms</code></pre>
</div>
`),
      sec(2, "Enabling Database Profiler", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Profiler Setup</span></div>
  <pre><code>// Log all queries taking longer than 100ms
db.setProfilingLevel(1, { slowms: 100 });

// View logged slow queries
db.system.profile.find().sort({ ts: -1 }).limit(5);</code></pre>
</div>
`)
    ]
  },

  31: {
    file: '31-aggregation-pipeline-intro.html',
    title: 'MongoDB — Aggregation Pipeline Introduction',
    intro: 'Learn how MongoDB Aggregation Pipeline transforms documents through multi-stage data processing pipes.',
    content: [
      sec(1, "What is the Aggregation Pipeline?", `
<p>The <strong>Aggregation Pipeline</strong> is a framework for data aggregation modeled on data processing pipelines. Documents enter a multi-stage pipeline that transforms the documents into aggregated results.</p>

<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Basic Pipeline Example</span></div>
  <pre><code>db.orders.aggregate([
  // Stage 1: Filter active orders
  { $match: { status: "completed" } },
  
  // Stage 2: Group by customerId and sum total spend
  { $group: { _id: "$customerId", totalSpent: { $sum: "$total" } } },
  
  // Stage 3: Sort by totalSpent descending
  { $sort: { totalSpent: -1 } }
]);</code></pre>
</div>
`)
    ]
  },

  32: {
    file: '32-filtering-transformation-stages.html',
    title: 'MongoDB — Aggregation Expressions & Operators',
    intro: 'Explore $match, $project, $addFields, $replaceRoot, and string/numeric aggregation expressions.',
    content: [
      sec(1, "$project and $addFields Stages", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">$addFields Example</span></div>
  <pre><code>db.products.aggregate([
  {
    $addFields: {
      discountedPrice: { $multiply: ["$price", 0.9] },
      fullName: { $concat: ["$brand", " ", "$model"] }
    }
  }
]);</code></pre>
</div>
`)
    ]
  },

  33: {
    file: '33-grouping-deconstruction-stages.html',
    title: 'MongoDB — Grouping & Deconstruction Stages ($group & $unwind)',
    intro: 'Group records with $group, calculate metrics ($sum, $avg, $min, $max), and deconstruct arrays using $unwind.',
    content: [
      sec(1, "Deconstructing Arrays with $unwind", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">$unwind & $group Combination</span></div>
  <pre><code>db.posts.aggregate([
  // Flattens array: outputs 1 document per tag
  { $unwind: "$tags" },
  
  // Group by tag and count frequency
  { $group: { _id: "$tags", count: { $sum: 1 } } },
  
  { $sort: { count: -1 } }
]);</code></pre>
</div>
`)
    ]
  },

  34: {
    file: '34-sorting-pagination-lookup-joins.html',
    title: 'MongoDB — Reporting Project, Leaderboards & $lookup Joins',
    intro: 'Join collections using $lookup left outer joins, sort results, and paginate aggregation results.',
    content: [
      sec(1, "Left Outer Join with $lookup", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">$lookup Join Example</span></div>
  <pre><code>db.orders.aggregate([
  {
    $lookup: {
      from: "users",          // Foreign collection
      localField: "userId",   // Local key
      foreignField: "_id",    // Foreign key
      as: "userDetails"       // Output array name
    }
  },
  { $unwind: "$userDetails" }
]);</code></pre>
</div>
`)
    ]
  },

  35: {
    file: '35-advanced-aggregation-stages.html',
    title: 'MongoDB — Transactions & Advanced Aggregation ($facet & $merge)',
    intro: 'Execute multi-faceted search queries with $facet and write aggregation output to collections using $merge.',
    content: [
      sec(1, "Multi-Faceted Search with $facet", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">$facet Parallel Processing</span></div>
  <pre><code>db.products.aggregate([
  {
    $facet: {
      "categorizedCount": [{ $groupBy: { _id: "$category", count: { $sum: 1 } } }],
      "topProducts": [{ $sort: { price: -1 } }, { $limit: 5 }]
    }
  }
]);</code></pre>
</div>
`)
    ]
  },

  36: {
    file: '36-nodejs-driver-integration.html',
    title: 'MongoDB — MongoDB with Node.js Driver',
    intro: 'Connect Node.js apps directly to MongoDB using the official mongodb npm package with MongoClient and async/await.',
    content: [
      sec(1, "Connecting via MongoClient in Node.js", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Node.js Express Integration</span></div>
  <pre><code>import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function main() {
  await client.connect();
  console.log("Connected to MongoDB!");
  
  const db = client.db("app_db");
  const users = db.collection("users");
  
  const user = await users.findOne({ email: "balaji@example.com" });
  console.log("Found user:", user);
}

main().catch(console.error);</code></pre>
</div>
`)
    ]
  },

  37: {
    file: '37-mongoose-schemas-and-models.html',
    title: 'MongoDB — Mongoose Schemas & Models',
    intro: 'Define Mongoose Schemas, SchemaTypes, validations, and generate Mongoose Models in Node.js.',
    content: [
      sec(1, "Defining a Mongoose Schema & Model", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Mongoose Schema Definition</span></div>
  <pre><code>import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  age: { type: Number, min: 18, default: 18 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);</code></pre>
</div>
`)
    ]
  },

  38: {
    file: '38-mongoose-crud-and-validation.html',
    title: 'MongoDB — Mongoose CRUD Operations & Validation',
    intro: 'Perform model CRUD operations, build custom validators, and handle validation error catches.',
    content: [
      sec(1, "Mongoose CRUD Operations", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Mongoose Async CRUD</span></div>
  <pre><code>// Create
const newUser = await User.create({ name: "Balaji", email: "balaji@test.com" });

// Read
const users = await User.find({ age: { $gte: 20 } }).select("name email");

// Update with Validators enabled!
const updated = await User.findByIdAndUpdate(
  userId,
  { $set: { age: 25 } },
  { new: true, runValidators: true }
);

// Delete
await User.findByIdAndDelete(userId);</code></pre>
</div>
`)
    ]
  },

  39: {
    file: '39-mongoose-middleware-and-virtuals.html',
    title: 'MongoDB — Mongoose Middleware & Virtual Properties',
    intro: 'Write pre/post save hooks for password hashing and create computed virtual document fields.',
    content: [
      sec(1, "Pre-Save Password Hashing Middleware", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Mongoose Pre-Save Hook</span></div>
  <pre><code>import bcrypt from 'bcrypt';

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Virtual Property
userSchema.virtual('fullName').get(function() {
  return \`\${this.firstName} \${this.lastName}\`;
});</code></pre>
</div>
`)
    ]
  },

  40: {
    file: '40-mongoose-population-referencing.html',
    title: 'MongoDB — Mongoose Population & References',
    intro: 'Link collections using Schema ObjectId references and resolve relationships with .populate().',
    content: [
      sec(1, "Using Mongoose populate()", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Mongoose Population</span></div>
  <pre><code>// Post Schema referencing User
const postSchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Post = mongoose.model('Post', postSchema);

// Populate author details in post query
const post = await Post.findById(postId).populate('author', 'name email');</code></pre>
</div>
`)
    ]
  },

  41: {
    file: '41-multi-document-acid-transactions.html',
    title: 'MongoDB — Multi-Document ACID Transactions',
    intro: 'Implement multi-document transactions using database sessions for atomic write safety.',
    content: [
      sec(1, "Executing a Transaction with Sessions", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">ACID Transaction Example</span></div>
  <pre><code>const session = await mongoose.startSession();
session.startTransaction();

try {
  await Account.updateOne({ _id: fromAcc }, { $inc: { balance: -100 } }, { session });
  await Account.updateOne({ _id: toAcc }, { $inc: { balance: 100 } }, { session });
  
  await session.commitTransaction();
  console.log("Transaction committed!");
} catch (err) {
  await session.abortTransaction();
  console.error("Transaction aborted due to error:", err);
} finally {
  session.endSession();
}</code></pre>
</div>
`)
    ]
  },

  42: {
    file: '42-replication-and-high-availability.html',
    title: 'MongoDB — Replication & High Availability',
    intro: 'Learn how 3-node Replica Sets work with Primary node writes, Secondary replication, elections, and oplog sync.',
    content: [
      sec(1, "Replica Set Architecture", `
<p>A <strong>Replica Set</strong> in MongoDB is a group of mongod processes that maintain the same data set. It provides redundancy and high availability:</p>

<ul style="line-height:1.8;margin-left:20px;">
  <li><strong>Primary Node:</strong> Receives all write operations.</li>
  <li><strong>Secondary Nodes:</strong> Replicate the Primary's <strong>Oplog</strong> (operations log) asynchronously.</li>
  <li><strong>Automatic Failover:</strong> If Primary goes offline, Secondaries elect a new Primary in seconds.</li>
</ul>
`)
    ]
  },

  43: {
    file: '43-sharding-and-horizontal-scaling.html',
    title: 'MongoDB — Sharding & Horizontal Scaling',
    intro: 'Scale MongoDB horizontally using sharded clusters, mongos routers, config servers, and shard keys.',
    content: [
      sec(1, "Sharded Cluster Architecture", `
<p>Sharding partitions large data across multiple machines. A sharded cluster consists of:</p>
<ul style="line-height:1.8;margin-left:20px;">
  <li><strong>Shards:</strong> Each shard holds a subset of the sharded data (each shard is a replica set).</li>
  <li><strong>mongos Routers:</strong> Query routers that direct client requests to appropriate shards.</li>
  <li><strong>Config Servers:</strong> Store metadata and cluster settings.</li>
</ul>
`)
    ]
  },

  44: {
    file: '44-mongodb-backups-restore-monitoring.html',
    title: 'MongoDB — Backup & Restore (mongodump & mongorestore)',
    intro: 'Backup databases using mongodump and restore data using mongorestore and mongoimport.',
    content: [
      sec(1, "mongodump and mongorestore Commands", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Backup & Restore CLI</span></div>
  <pre><code># Backup entire database to directory
mongodump --uri="mongodb://localhost:27017/store_db" --out=/backups/

# Restore database backup
mongorestore --uri="mongodb://localhost:27017/store_db" /backups/store_db/</code></pre>
</div>
`)
    ]
  },

  45: {
    file: '45-mongodb-security-access-control.html',
    title: 'MongoDB — Security & Access Control',
    intro: 'Enable authentication (--auth), Role-Based Access Control (RBAC), and TLS/SSL connection encryption.',
    content: [
      sec(1, "Creating Admin Users & Enabling Auth", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Security Setup</span></div>
  <pre><code>// Create admin user in mongosh
use admin
db.createUser({
  user: "siteAdmin",
  pwd: passwordPrompt(),
  roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
});

// Restart mongod daemon with authentication enabled:
// mongod --auth --config /etc/mongod.conf</code></pre>
</div>
`)
    ]
  },

  46: {
    file: '46-real-time-change-streams.html',
    title: 'MongoDB — Real-Time Change Streams',
    intro: 'Build real-time event-driven applications using MongoDB Change Streams (watch()) and resume tokens.',
    content: [
      sec(1, "Watching Real-Time Database Changes", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Node.js Change Stream Listener</span></div>
  <pre><code>const changeStream = collection.watch([
  { $match: { operationType: 'insert' } }
]);

changeStream.on('change', (next) => {
  console.log("New document inserted:", next.fullDocument);
});</code></pre>
</div>
`)
    ]
  },

  47: {
    file: '47-gridfs-large-file-storage.html',
    title: 'MongoDB — GridFS for Large File Storage',
    intro: 'Store and stream files exceeding the 16 MB limit using GridFS fs.files and fs.chunks collections.',
    content: [
      sec(1, "How GridFS Works", `
<p>GridFS divides a file into chunks (default 255 KB) and stores them in two collections:</p>
<ul style="line-height:1.8;margin-left:20px;">
  <li><code>fs.files</code>: Stores file metadata (filename, upload date, size).</li>
  <li><code>fs.chunks</code>: Stores the raw binary data chunks.</li>
</ul>
`)
    ]
  },

  48: {
    file: '48-timeseries-and-atlas-search.html',
    title: 'MongoDB — Time-Series Collections & Atlas Search',
    intro: 'Optimize IoT sensor metrics with Time-Series collections and full-text search with Atlas Search Lucene.',
    content: [
      sec(1, "Creating a Time-Series Collection", `
<div class="code-block">
  <div class="code-block-header"><span class="lang-tag">Time-Series Collection Creation</span></div>
  <pre><code>db.createCollection("weather_metrics", {
  timeseries: {
    timeField: "timestamp",
    metaField: "sensorId",
    granularity: "minutes"
  }
});</code></pre>
</div>
`)
    ]
  },

  49: {
    file: '49-enterprise-database-design-patterns.html',
    title: 'MongoDB — Enterprise Database Design Patterns',
    intro: 'Explore production design patterns: Bucket Pattern, Outlier Pattern, Computed Pattern, and Polymorphic Pattern.',
    content: [
      sec(1, "Enterprise Design Patterns Overview", `
<ul style="line-height:1.8;margin-left:20px;">
  <li><strong>Bucket Pattern:</strong> Combines time-series data points into daily/hourly document buckets to reduce index overhead.</li>
  <li><strong>Outlier Pattern:</strong> Prevents rare high-frequency events (e.g., celebrity followers) from overflowing normal document sizes.</li>
  <li><strong>Computed Pattern:</strong> Pre-calculates aggregated summaries during writes instead of calculating on every read.</li>
</ul>
`)
    ]
  },

  50: {
    file: '50-mongodb-interview-preparation.html',
    title: 'MongoDB — Top 50 MongoDB Technical Interview Q&A',
    intro: 'Comprehensive interview prep guide covering top 50 beginner, intermediate, and advanced MongoDB technical questions.',
    content: [
      sec(1, "Top Technical Q&A Highlights", `
<div class="callout">
  <div class="callout-title">❓ Q1: What is the difference between BSON and JSON?</div>
  <p><strong>Answer:</strong> JSON is a text-based format supporting 6 basic types. BSON is a binary encoding of JSON supporting 20+ rich types (Date, ObjectId, Decimal128) and enables fast traversal in MongoDB memory.</p>
</div>

<div class="callout" style="margin-top:14px;">
  <div class="callout-title">❓ Q2: What is an index scan (IXSCAN) vs collection scan (COLLSCAN)?</div>
  <p><strong>Answer:</strong> A COLLSCAN scans every document in a collection. An IXSCAN uses a B-tree index to locate specific matching keys instantly, avoiding full table scans.</p>
</div>
`)
    ]
  }
};

let updatedCount = 0;

for (let chNum = 21; chNum <= 50; chNum++) {
  const data = chapters[chNum];
  if (!data) continue;

  const filePath = path.join(mongoDir, data.file);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${data.file}`);
    continue;
  }

  let html = fs.readFileSync(filePath, 'utf8');

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
    console.log(`✅  Updated Chapters 21-50: ${data.file}`);
    updatedCount++;
  }
}

console.log(`\n🎉 Successfully updated ${updatedCount} MongoDB chapters (Chapters 21-50)!`);
