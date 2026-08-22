const fs = require('fs');
const path = require('path');
const { wrapCSharpPage } = require('./build_csharp_master.js');

const csharpDir = path.join(__dirname, '..', 'public', 'blog-csharp');
console.log('🚀 Generating C# Masterclass Phases 13 & 14 (Chapters 36–40)...');

function makeLesson(num, file, title, desc, phaseTag, phaseTitle, subtopics, content, prev, prevTitle, next, nextTitle) {
  fs.writeFileSync(
    path.join(csharpDir, file),
    wrapCSharpPage(title, desc, file, num, phaseTag, phaseTitle, subtopics, content, prev, prevTitle, next, nextTitle),
    'utf8'
  );
  const kb = Math.round(fs.statSync(path.join(csharpDir, file)).size / 1024);
  console.log('  ✅ ' + file + ' (' + kb + 'KB)');
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 36: SQL Basics
// ═══════════════════════════════════════════════════════════════════════════════
const c36 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 13 (Chapter 36): SQL Basics &amp; Relational Database Masterclass</strong>! Before using Entity Framework Core, you must understand the SQL language that EF Core generates under the hood. In this chapter, we master relational database concepts (tables, rows, columns, primary/foreign keys), the five core SQL operations (SELECT, INSERT, UPDATE, DELETE, JOIN), filtering, sorting, transactions, and relationships between tables.</p>
</div>

<div class="section-title"><span class="num">1</span>Relational Database Concepts</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Concept</th><th>Definition</th><th>Example</th></tr></thead>
    <tbody>
      <tr><td><strong>Table</strong></td><td>A structured collection of related data organized in rows and columns (like a spreadsheet).</td><td>Products, Orders, Customers</td></tr>
      <tr><td><strong>Row (Record)</strong></td><td>A single entry of data in a table representing one entity instance.</td><td>One specific product: Laptop, ₹75000</td></tr>
      <tr><td><strong>Column (Field)</strong></td><td>A named attribute of the table with a defined data type.</td><td>ProductName VARCHAR(100)</td></tr>
      <tr><td><strong>Primary Key (PK)</strong></td><td>A column (or combination) whose values uniquely identify each row.</td><td>ProductId INT PRIMARY KEY</td></tr>
      <tr><td><strong>Foreign Key (FK)</strong></td><td>A column referencing the Primary Key of another table, enforcing referential integrity.</td><td>Orders.CustomerId → Customers.CustomerId</td></tr>
      <tr><td><strong>Index</strong></td><td>A performance optimization structure for faster data retrieval on specific columns.</td><td>INDEX ON Customers(Email)</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Core SQL Operations — SELECT, INSERT, UPDATE, DELETE</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">SQL — Core CRUD Operations</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>-- 1. CREATE TABLE with Primary Key
CREATE TABLE Products (
    ProductId   INT           PRIMARY KEY IDENTITY(1,1),
    Name        NVARCHAR(100) NOT NULL,
    Price       DECIMAL(10,2) NOT NULL,
    Stock       INT           DEFAULT 0,
    Category    NVARCHAR(50),
    CreatedAt   DATETIME      DEFAULT GETDATE()
);

-- 2. INSERT — Add rows
INSERT INTO Products (Name, Price, Stock, Category)
VALUES ('Laptop', 75000.00, 10, 'Electronics');

INSERT INTO Products (Name, Price, Stock, Category)
VALUES ('Mouse', 1200.00, 50, 'Accessories');

-- 3. SELECT — Read data
SELECT ProductId, Name, Price FROM Products;

-- 4. WHERE — Filter rows
SELECT * FROM Products WHERE Price > 5000;

-- 5. ORDER BY — Sort results
SELECT * FROM Products ORDER BY Price DESC;

-- 6. UPDATE — Modify data
UPDATE Products SET Price = 72000.00 WHERE ProductId = 1;

-- 7. DELETE — Remove rows
DELETE FROM Products WHERE Stock = 0;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>JOINs &amp; Table Relationships</div>
<div class="section-body">
  <p class="text-prose">SQL JOINs combine rows from two or more tables based on a related column (Foreign Key relationship). Understanding JOINs is critical before using EF Core's navigation properties and <code>Include()</code> for Eager Loading.</p>

  <table class="tbl spec-table">
    <thead><tr><th>JOIN Type</th><th>Returns</th><th>Use Case</th></tr></thead>
    <tbody>
      <tr><td><strong>INNER JOIN</strong></td><td>Only rows with matching values in BOTH tables</td><td>Get orders that have valid customers</td></tr>
      <tr><td><strong>LEFT JOIN</strong></td><td>All rows from LEFT table + matched right rows (NULL for unmatched)</td><td>Get all products even if never ordered</td></tr>
      <tr><td><strong>RIGHT JOIN</strong></td><td>All rows from RIGHT table + matched left rows</td><td>Get all customers even with no orders</td></tr>
      <tr><td><strong>FULL OUTER JOIN</strong></td><td>All rows from BOTH tables with NULL for missing matches</td><td>Audit reports requiring all records</td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">SQL — INNER JOIN Example</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>-- Orders table with Foreign Key
CREATE TABLE Orders (
    OrderId    INT PRIMARY KEY IDENTITY(1,1),
    CustomerId INT NOT NULL FOREIGN KEY REFERENCES Customers(CustomerId),
    ProductId  INT NOT NULL FOREIGN KEY REFERENCES Products(ProductId),
    Quantity   INT NOT NULL,
    OrderDate  DATETIME DEFAULT GETDATE()
);

-- INNER JOIN: Get order details with customer name and product name
SELECT
    o.OrderId,
    c.Name    AS CustomerName,
    p.Name    AS ProductName,
    o.Quantity,
    (p.Price * o.Quantity) AS TotalAmount
FROM Orders o
INNER JOIN Customers c ON o.CustomerId = c.CustomerId
INNER JOIN Products p  ON o.ProductId  = p.ProductId
ORDER BY o.OrderDate DESC;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Transactions &amp; ACID Properties</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">SQL — Transaction Example</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>-- Transaction: Transfer money between accounts atomically
BEGIN TRANSACTION;
    UPDATE Accounts SET Balance = Balance - 5000 WHERE AccountId = 1;
    UPDATE Accounts SET Balance = Balance + 5000 WHERE AccountId = 2;

    IF @@ERROR != 0
        ROLLBACK TRANSACTION; -- Undo BOTH operations on error
    ELSE
        COMMIT TRANSACTION;   -- Apply BOTH operations on success</code></pre>
  </div>

  <table class="tbl spec-table">
    <thead><tr><th>ACID Property</th><th>Meaning</th></tr></thead>
    <tbody>
      <tr><td><strong>Atomicity</strong></td><td>All operations in a transaction succeed together, or all fail together (no partial commits).</td></tr>
      <tr><td><strong>Consistency</strong></td><td>A transaction brings the database from one valid state to another, maintaining all defined rules.</td></tr>
      <tr><td><strong>Isolation</strong></td><td>Concurrent transactions execute as if they were sequential (no dirty reads).</td></tr>
      <tr><td><strong>Durability</strong></td><td>Committed transactions are permanently saved even after system failures (disk crash, power loss).</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">5</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What databases does EF Core support?</h4>
    <p>EF Core supports SQL Server (via <code>Microsoft.EntityFrameworkCore.SqlServer</code>), PostgreSQL (via <code>Npgsql.EntityFrameworkCore.PostgreSQL</code>), SQLite (via <code>Microsoft.EntityFrameworkCore.Sqlite</code>), MySQL, and others via provider packages.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What is an Index and why is it important?</h4>
    <p>An index creates a sorted data structure on a column that allows the database engine to find rows in O(log n) time instead of O(n) full table scan. Always index foreign key columns and columns used frequently in WHERE clauses.</p>
  </div>
</div>`;

makeLesson(36, '36-csharp-sql-basics-tables-joins-transactions.html',
  'SQL Basics, Tables, JOINs & Transactions Masterclass',
  'Complete C# SQL Basics (Chapter 36): Relational databases, tables, primary/foreign keys, SELECT, INSERT, UPDATE, DELETE, WHERE, ORDER BY, INNER JOIN, LEFT JOIN, transactions, ACID properties, and database design.',
  'Phase 13', 'Databases & Entity Framework Core',
  'Database Concepts · Tables · Primary/Foreign Keys · SELECT · INSERT · UPDATE · DELETE · WHERE · ORDER BY · INNER JOIN · Transactions · ACID',
  c36,
  '35-csharp-rest-api-capstone-project-product-service-crud.html', '35. Complete REST API Capstone Project',
  '37-csharp-entity-framework-core-dbcontext-migrations-linq.html', '37. Entity Framework Core (EF Core)'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 37: Entity Framework Core
// ═══════════════════════════════════════════════════════════════════════════════
const c37 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 13 (Chapter 37): Entity Framework Core (EF Core) — ORM, DbContext, Migrations &amp; LINQ Queries Masterclass</strong>! EF Core is Microsoft's official Object-Relational Mapper (ORM) for .NET. It lets you work with a database using C# objects instead of writing raw SQL queries. EF Core handles schema creation via Migrations, generates SQL under the hood, provides change tracking, relationship navigation, and async LINQ-based queries.</p>
</div>

<div class="section-title"><span class="num">1</span>ORM Ante Enti? EF Core Architecture</div>
<div class="section-body">
  <div class="memory-diagram">EF Core Architecture:

  Your C# Code (Entity Classes, LINQ Queries)
          │
          ▼  [EF Core Runtime]
  DbContext — tracks changes &amp; manages entity state
          │
          ▼  [Database Provider]
  SQL Server / PostgreSQL / SQLite / MySQL
          │
          ▼
  Actual Database (tables, rows, indices)</div>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Terminal — Install EF Core Packages</span>
    </div>
    <pre><code># Install EF Core for SQL Server
dotnet add package Microsoft.EntityFrameworkCore.SqlServer

# Install EF Core for SQLite (lightweight, good for dev)
dotnet add package Microsoft.EntityFrameworkCore.Sqlite

# Install EF Core Design tools (for migrations)
dotnet add package Microsoft.EntityFrameworkCore.Design

# Install EF Core Tools globally
dotnet tool install --global dotnet-ef</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Entity Classes &amp; DbContext Configuration</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Entity Model &amp; DbContext</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

// 1. Entity Class (maps to database table)
public class Product
{
    public int Id { get; set; }                             // PK (auto-detected by convention)

    [Required, MaxLength(100)]
    public string Name { get; set; } = "";

    [Required, Range(0.01, double.MaxValue)]
    public decimal Price { get; set; }

    public int Stock { get; set; }
    public string Category { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation property (one Product has many OrderItems)
    public ICollection&lt;OrderItem&gt; OrderItems { get; set; } = new List&lt;OrderItem&gt;();
}

// 2. DbContext — the central connection hub to the database
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions&lt;AppDbContext&gt; options) : base(options) { }

    public DbSet&lt;Product&gt; Products { get; set; }
    public DbSet&lt;Order&gt; Orders { get; set; }
    public DbSet&lt;OrderItem&gt; OrderItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Fluent API configuration (alternative to Data Annotations)
        modelBuilder.Entity&lt;Product&gt;()
            .Property(p =&gt; p.Price)
            .HasColumnType("decimal(10,2)");

        modelBuilder.Entity&lt;Product&gt;()
            .HasIndex(p =&gt; p.Category); // Add database index on Category
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Migrations — Database Schema Management</div>
<div class="section-body">
  <p class="text-prose">Migrations in EF Core are version-controlled snapshots of your database schema changes. Instead of writing ALTER TABLE SQL scripts manually, you define C# entity changes and let EF Core generate the SQL migration script automatically.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Terminal — EF Core Migration Commands</span>
    </div>
    <pre><code># Step 1: Create first migration (generates C# migration class)
dotnet ef migrations add InitialCreate

# Step 2: Apply migration to database (executes SQL ALTER TABLE scripts)
dotnet ef database update

# After adding new entity property (e.g., adding ImageUrl to Product):
dotnet ef migrations add AddProductImageUrl
dotnet ef database update

# Rollback to previous migration
dotnet ef database update PreviousMigrationName

# Remove last unapplied migration
dotnet ef migrations remove</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>CRUD Operations — Reading, Adding, Updating &amp; Deleting</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — EF Core CRUD with Async LINQ</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// READ — Get all products (async LINQ query)
List&lt;Product&gt; products = await context.Products
    .Where(p =&gt; p.Stock &gt; 0)
    .OrderBy(p =&gt; p.Name)
    .ToListAsync();

// READ — Find by primary key (most efficient)
Product? product = await context.Products.FindAsync(1);

// ADD — Create new entity
var newProduct = new Product { Name = "Tablet", Price = 35000m, Stock = 20, Category = "Electronics" };
context.Products.Add(newProduct);
await context.SaveChangesAsync(); // Executes INSERT SQL

// UPDATE — Modify existing entity
var existing = await context.Products.FindAsync(1);
if (existing != null)
{
    existing.Price = 72000m;
    existing.Stock -= 1;
    await context.SaveChangesAsync(); // Executes UPDATE SQL
}

// DELETE — Remove entity
var toDelete = await context.Products.FindAsync(5);
if (toDelete != null)
{
    context.Products.Remove(toDelete);
    await context.SaveChangesAsync(); // Executes DELETE SQL
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Eager Loading with Include() &amp; Repository Pattern</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Eager Loading &amp; Repository</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// Eager Loading — Load related entities in a single SQL query
var orders = await context.Orders
    .Include(o =&gt; o.Customer)          // JOIN Customers table
    .Include(o =&gt; o.Items)             // JOIN OrderItems table
        .ThenInclude(i =&gt; i.Product)   // JOIN Products table
    .ToListAsync();

// Generic Repository Pattern
public interface IRepository&lt;T&gt; where T : class
{
    Task&lt;List&lt;T&gt;&gt; GetAllAsync();
    Task&lt;T?&gt; GetByIdAsync(int id);
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(int id);
}

public class ProductRepository : IRepository&lt;Product&gt;
{
    private readonly AppDbContext _context;
    public ProductRepository(AppDbContext context) { _context = context; }

    public async Task&lt;List&lt;Product&gt;&gt; GetAllAsync() =&gt; await _context.Products.ToListAsync();
    public async Task&lt;Product?&gt; GetByIdAsync(int id) =&gt; await _context.Products.FindAsync(id);
    public async Task AddAsync(Product entity) { _context.Products.Add(entity); await _context.SaveChangesAsync(); }
    public async Task UpdateAsync(Product entity) { _context.Products.Update(entity); await _context.SaveChangesAsync(); }
    public async Task DeleteAsync(int id) { var p = await _context.Products.FindAsync(id); if (p != null) { _context.Products.Remove(p); await _context.SaveChangesAsync(); } }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">6</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the difference between Eager Loading and Lazy Loading?</h4>
    <p>Eager Loading uses <code>Include()</code> to fetch related entities in ONE database query (JOIN). Lazy Loading fetches related entities ON DEMAND when first accessed, potentially causing the N+1 problem (one query per entity).</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What does SaveChangesAsync() do internally?</h4>
    <p>EF Core's change tracker monitors all entity state changes (Added, Modified, Deleted). <code>SaveChangesAsync()</code> compares current vs original values and generates the minimum SQL (INSERT/UPDATE/DELETE) to sync changes to the database — all wrapped in a transaction.</p>
  </div>
</div>`;

makeLesson(37, '37-csharp-entity-framework-core-dbcontext-migrations-linq.html',
  'Entity Framework Core, DbContext, Migrations & LINQ Masterclass',
  'Complete EF Core (Chapter 37): ORM concept, installing EF Core, Entity classes, DbContext, DbSet, Connection strings, Migrations, Reading/Adding/Updating/Deleting data, Eager Loading Include(), Repository pattern, async LINQ queries.',
  'Phase 13', 'Databases & Entity Framework Core',
  'ORM · EF Core Architecture · Entity Classes · DbContext · DbSet · Connection Strings · Migrations · CRUD · Eager Loading Include() · Repository Pattern · Async LINQ',
  c37,
  '36-csharp-sql-basics-tables-joins-transactions.html', '36. SQL Basics, Tables, JOINs & Transactions',
  '38-csharp-database-crud-api-ef-core-pagination-search.html', '38. Database CRUD API Project with EF Core'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 38: Database API Project
// ═══════════════════════════════════════════════════════════════════════════════
const c38 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 13 (Chapter 38): Database-Connected CRUD API Project with EF Core, Pagination &amp; Search</strong>! In this practical project chapter, we build a complete production-ready ASP.NET Core REST API with a real SQLite database backend using EF Core. We implement: Entity models, DbContext configuration, Repository pattern, Service layer, Controller with full CRUD, Pagination, Search, Sorting, and proper error handling.</p>
</div>

<div class="section-title"><span class="num">1</span>Project Setup &amp; Database Configuration</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Program.cs with EF Core SQLite</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>var builder = WebApplication.CreateBuilder(args);

// Register EF Core with SQLite (use SqlServer for production)
builder.Services.AddDbContext&lt;AppDbContext&gt;(options =&gt;
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")
        ?? "Data Source=products.db"));

// Register Repository and Service (Scoped per request)
builder.Services.AddScoped&lt;IProductRepository, ProductRepository&gt;();
builder.Services.AddScoped&lt;IProductService, ProductService&gt;();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Auto-create database on first run
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService&lt;AppDbContext&gt;();
    db.Database.Migrate(); // Apply pending migrations automatically
}

app.UseSwagger(); app.UseSwaggerUI();
app.MapControllers();
app.Run();</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Pagination, Search &amp; Sorting</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Paginated Query with Search &amp; Sort</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code">// Pagination Query Parameters DTO
public class ProductQueryParams
{
    public string? Search   { get; set; }
    public string? Category { get; set; }
    public string  SortBy   { get; set; } = "Name";
    public bool    Descending { get; set; } = false;
    public int     Page     { get; set; } = 1;
    public int     PageSize { get; set; } = 10;
}

// Paginated Result Wrapper
public class PagedResult&lt;T&gt;
{
    public List&lt;T&gt; Items      { get; set; } = new();
    public int     TotalCount { get; set; }
    public int     Page       { get; set; }
    public int     PageSize   { get; set; }
    public int     TotalPages =&gt; (int)Math.Ceiling((double)TotalCount / PageSize);
}

// Service Implementation
public async Task&lt;PagedResult&lt;Product&gt;&gt; GetProductsAsync(ProductQueryParams q)
{
    var query = _context.Products.AsQueryable();

    // Search filter
    if (!string.IsNullOrWhiteSpace(q.Search))
        query = query.Where(p =&gt; p.Name.Contains(q.Search) || p.Category.Contains(q.Search));

    // Category filter
    if (!string.IsNullOrWhiteSpace(q.Category))
        query = query.Where(p =&gt; p.Category == q.Category);

    // Dynamic sorting
    query = q.SortBy switch
    {
        "Price"   =&gt; q.Descending ? query.OrderByDescending(p =&gt; p.Price) : query.OrderBy(p =&gt; p.Price),
        "Stock"   =&gt; q.Descending ? query.OrderByDescending(p =&gt; p.Stock) : query.OrderBy(p =&gt; p.Stock),
        _         =&gt; q.Descending ? query.OrderByDescending(p =&gt; p.Name)  : query.OrderBy(p =&gt; p.Name)
    };

    int total = await query.CountAsync();

    var items = await query
        .Skip((q.Page - 1) * q.PageSize)
        .Take(q.PageSize)
        .ToListAsync();

    return new PagedResult&lt;Product&gt; { Items = items, TotalCount = total, Page = q.Page, PageSize = q.PageSize };
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why use Skip() and Take() for pagination instead of loading all rows?</h4>
    <p><code>Skip()</code> and <code>Take()</code> translate to SQL <code>OFFSET</code> and <code>FETCH NEXT</code> / <code>LIMIT</code> clauses, letting the database return only the requested page of records. Loading all rows into memory and paginating in C# wastes RAM and database bandwidth exponentially as data grows.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: Why use AsQueryable() before applying filters?</h4>
    <p><code>AsQueryable()</code> keeps the LINQ query as an <code>IQueryable&lt;T&gt;</code> expression tree that EF Core can translate to optimized SQL. Each chained <code>Where()</code>, <code>OrderBy()</code>, and <code>Skip()</code> adds to the SQL rather than executing separate queries.</p>
  </div>
</div>`;

makeLesson(38, '38-csharp-database-crud-api-ef-core-pagination-search.html',
  'Database CRUD API Project with EF Core, Pagination & Search Masterclass',
  'Complete C# Database API Project (Chapter 38): ASP.NET Core + EF Core SQLite, DbContext setup, Repository pattern, Service layer, CRUD controller, pagination with Skip/Take, search filtering, dynamic sorting, and error handling.',
  'Phase 13', 'Databases & Entity Framework Core',
  'EF Core Project Setup · SQLite Configuration · Auto Migrations · Repository Pattern · Pagination · Search · Dynamic Sorting · PagedResult · Database Error Handling',
  c38,
  '37-csharp-entity-framework-core-dbcontext-migrations-linq.html', '37. Entity Framework Core (EF Core)',
  '39-csharp-authentication-jwt-tokens-password-hashing-claims.html', '39. Authentication, JWT Tokens & Password Hashing'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 39: Authentication
// ═══════════════════════════════════════════════════════════════════════════════
const c39 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 14 (Chapter 39): C# Authentication — JWT Tokens, Password Hashing, Claims &amp; Refresh Tokens Masterclass</strong>! Authentication verifies <em>who</em> the user is. In this chapter, we implement a complete auth system: user registration with BCrypt password hashing, login with JWT (JSON Web Token) generation, Claims-based identity, Refresh tokens for session extension, and token validation middleware.</p>
</div>

<div class="section-title"><span class="num">1</span>Authentication vs Authorization</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Concept</th><th>Question Answered</th><th>Mechanism</th></tr></thead>
    <tbody>
      <tr><td><strong>Authentication</strong></td><td>"Who are you?" — Proves the user's identity.</td><td>Login with username+password → JWT Token issued</td></tr>
      <tr><td><strong>Authorization</strong></td><td>"What can you do?" — Controls what an authenticated user can access.</td><td>[Authorize(Roles = "Admin")] attribute on endpoints</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Password Hashing with BCrypt</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Terminal &amp; C# — BCrypt Password Hashing</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// Install BCrypt package
// dotnet add package BCrypt.Net-Next

// User Entity
public class User
{
    public int    Id           { get; set; }
    public string Email        { get; set; } = "";
    public string PasswordHash { get; set; } = ""; // NEVER store plaintext!
    public string Role         { get; set; } = "User";
}

// AuthService — Registration
public async Task&lt;User&gt; RegisterAsync(string email, string password)
{
    if (await _context.Users.AnyAsync(u =&gt; u.Email == email))
        throw new InvalidOperationException("Email already registered.");

    var user = new User
    {
        Email        = email.ToLower(),
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(password), // Salted hash
        Role         = "User"
    };

    _context.Users.Add(user);
    await _context.SaveChangesAsync();
    return user;
}

// Login — Verify password
public bool VerifyPassword(string inputPassword, string storedHash)
    =&gt; BCrypt.Net.BCrypt.Verify(inputPassword, storedHash);</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>JWT Token Generation &amp; Validation</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — JWT Token Generation</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code">// dotnet add package System.IdentityModel.Tokens.Jwt
// dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer

public string GenerateJwtToken(User user)
{
    var jwtKey = _config["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured!");
    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var claims = new[]
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role)
    };

    var token = new JwtSecurityToken(
        issuer:   _config["Jwt:Issuer"],
        audience: _config["Jwt:Audience"],
        claims:   claims,
        expires:  DateTime.UtcNow.AddHours(1),
        signingCredentials: creds
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}

// Program.cs — Configure JWT Authentication Middleware
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =&gt;
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)),
            ValidateIssuer   = true,
            ValidIssuer      = builder.Configuration["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience    = builder.Configuration["Jwt:Audience"],
            ValidateLifetime = true
        };
    });</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is a JWT Refresh Token?</h4>
    <p>A Refresh Token is a long-lived, opaque token stored securely (in an HttpOnly cookie or database) used to obtain new short-lived JWT Access Tokens after they expire. This avoids forcing users to re-login while keeping Access Tokens short-lived for security.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: Why is BCrypt preferred over MD5/SHA1 for passwords?</h4>
    <p>BCrypt automatically salts and hashes passwords and has a configurable work factor that makes brute-force attacks computationally expensive. MD5/SHA1 are fast hashing algorithms not designed for password storage and are vulnerable to rainbow table attacks.</p>
  </div>
</div>`;

makeLesson(39, '39-csharp-authentication-jwt-tokens-password-hashing-claims.html',
  'Authentication, JWT Tokens & Password Hashing Masterclass',
  'Complete C# Authentication (Chapter 39): Auth vs Authorization, user registration, BCrypt password hashing, login, JWT token generation with Claims, JwtSecurityToken, Bearer authentication middleware, Refresh Tokens, and logout.',
  'Phase 14', 'Authentication & Security',
  'Auth vs Authorization · User Registration · BCrypt Password Hashing · JWT Token · Claims · JwtSecurityToken · Bearer Authentication · Refresh Tokens · Logout',
  c39,
  '38-csharp-database-crud-api-ef-core-pagination-search.html', '38. Database CRUD API Project with EF Core',
  '40-csharp-aspnet-core-security-authorize-cors-xss-rate-limiting.html', '40. ASP.NET Core Security ([Authorize], CORS, HTTPS)'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 40: ASP.NET Core Security
// ═══════════════════════════════════════════════════════════════════════════════
const c40 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 14 (Chapter 40): ASP.NET Core Security — [Authorize], CORS, HTTPS, Input Validation &amp; Rate Limiting Masterclass</strong>! A secure web API goes far beyond authentication. In this chapter, we implement Role-Based Authorization with <code>[Authorize]</code>, Policy-Based Authorization, CORS configuration, HTTPS enforcement, Secret management with User Secrets and Azure Key Vault, Input validation, SQL injection prevention (EF Core handles this), XSS prevention, CSRF basics, and API Rate Limiting.</p>
</div>

<div class="section-title"><span class="num">1</span>[Authorize] — Role-Based &amp; Policy-Based Authorization</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Role &amp; Policy Authorization</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// 1. Role-based authorization
[Authorize]                              // Any authenticated user
[Authorize(Roles = "Admin")]             // Admin role only
[Authorize(Roles = "Admin,Manager")]     // Admin OR Manager
[AllowAnonymous]                         // Bypass auth for public endpoints

// 2. Register Policy-Based Authorization
builder.Services.AddAuthorization(options =&gt;
{
    options.AddPolicy("AdminOnly", policy =&gt;
        policy.RequireRole("Admin"));

    options.AddPolicy("MinimumAge18", policy =&gt;
        policy.RequireClaim("DateOfBirth")
              .RequireAssertion(ctx =&gt;
              {
                  var dob = DateTime.Parse(ctx.User.FindFirst("DateOfBirth")!.Value);
                  return (DateTime.Today - dob).TotalDays / 365 &gt;= 18;
              }));
});

// 3. Apply policy on controller
[Authorize(Policy = "AdminOnly")]
[HttpDelete("{id:int}")]
public IActionResult DeleteProduct(int id) { /* only admins reach here */ }</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>CORS, HTTPS &amp; Secret Management</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — CORS &amp; HTTPS Configuration</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code">// CORS — Allow only specific frontend origins
builder.Services.AddCors(options =&gt;
{
    options.AddPolicy("FrontendPolicy", policy =&gt;
        policy.WithOrigins("https://myapp.com", "http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials());
});

// Middleware order matters!
app.UseCors("FrontendPolicy");
app.UseHttpsRedirection();    // Force HTTPS
app.UseHsts();                // HTTP Strict Transport Security header
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Rate Limiting &amp; Input Validation</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Rate Limiting (.NET 7+)</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// Built-in Rate Limiting (.NET 7+)
builder.Services.AddRateLimiter(options =&gt;
{
    options.AddFixedWindowLimiter("ApiLimit", opt =&gt;
    {
        opt.PermitLimit   = 100;             // Max 100 requests
        opt.Window        = TimeSpan.FromMinutes(1); // per minute
        opt.QueueLimit    = 0;               // No queuing, reject immediately
    });
    options.RejectionStatusCode = 429;       // Too Many Requests
});

app.UseRateLimiter();

// Apply to all endpoints
app.MapControllers().RequireRateLimiting("ApiLimit");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Does EF Core prevent SQL Injection automatically?</h4>
    <p>Yes! EF Core always uses parameterized queries when translating LINQ expressions to SQL. Parameterized queries treat user input as data values — never executable SQL code — completely preventing SQL injection. Never use raw SQL string concatenation with user input.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What is CORS and why is it needed?</h4>
    <p>Cross-Origin Resource Sharing (CORS) is a browser security feature that blocks JavaScript from making API calls to a different origin (domain, port, or protocol) unless the server explicitly allows it. Your API needs CORS configuration to allow frontend apps (e.g., React on localhost:3000) to make requests.</p>
  </div>
</div>`;

makeLesson(40, '40-csharp-aspnet-core-security-authorize-cors-xss-rate-limiting.html',
  'ASP.NET Core Security ([Authorize], CORS, HTTPS & Rate Limiting) Masterclass',
  'Complete ASP.NET Core Security (Chapter 40): [Authorize] attribute, Role-based authorization, Policy-based authorization, CORS configuration, HTTPS enforcement, secret management, input validation, SQL injection prevention, Rate Limiting.',
  'Phase 14', 'Authentication & Security',
  '[Authorize] · Role-Based Auth · Policy-Based Auth · CORS · HTTPS · HSTS · Secret Management · Input Validation · SQL Injection Prevention · Rate Limiting',
  c40,
  '39-csharp-authentication-jwt-tokens-password-hashing-claims.html', '39. Authentication, JWT Tokens & Password Hashing',
  '41-csharp-unit-testing-xunit-moq-integration-tests.html', '41. Unit Testing, xUnit, Moq & Integration Tests'
);

console.log('\n🎉 ALL C# PHASES 13 & 14 (CHAPTERS 36–40) GENERATED SUCCESSFULLY!');
