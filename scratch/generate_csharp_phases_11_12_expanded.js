const fs = require('fs');
const path = require('path');
const { wrapCSharpPage } = require('./build_csharp_master.js');

const csharpDir = path.join(__dirname, '..', 'public', 'blog-csharp');
console.log('🚀 Generating C# Masterclass Phases 11 & 12 (Chapters 30–35)...');

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
// CHAPTER 30: .NET Platform
// ═══════════════════════════════════════════════════════════════════════════════
const c30 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 11 (Chapter 30): C# .NET Platform, CLR, Assemblies &amp; NuGet Masterclass</strong>! Understanding the .NET platform architecture is essential for building enterprise-grade applications. In this chapter, we explore the Common Language Runtime (CLR), managed execution model, Assemblies (.dll/.exe), NuGet package management, project configuration, environment variables, logging with <code>ILogger</code>, Dependency Injection in .NET host, and application lifecycle management.</p>
</div>

<div class="section-title"><span class="num">1</span>.NET SDK, Runtime &amp; CLR Architecture</div>
<div class="section-body">
  <div class="memory-diagram">.NET Application Execution Pipeline:

  Developer writes C# Code (Program.cs, MyService.cs...)
            │
            ▼  [Roslyn Compiler (csc / dotnet build)]
  Assembly (.dll / .exe) containing CIL Bytecode
            │
            ▼  [CLR — Common Language Runtime]
       ┌────┴────────────────────────────────────┐
       │  ┌─────────┐ ┌──────┐ ┌──────────────┐ │
       │  │ JIT     │ │  GC  │ │  Type Safety  │ │
       │  │Compiler │ │      │ │  Verification │ │
       │  └────┬────┘ └──────┘ └──────────────┘ │
       └───────┼────────────────────────────────-┘
               ▼
  Native Machine Code executes on CPU</div>
</div>

<div class="section-title"><span class="num">2</span>NuGet Package Management</div>
<div class="section-body">
  <p class="text-prose">NuGet is the official .NET package manager hosting over 350,000 open-source libraries. You can add packages using the <code>dotnet add package</code> CLI or editing the <code>.csproj</code> file directly.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Terminal — NuGet Package Commands</span>
    </div>
    <pre><code># Add NuGet package
dotnet add package Newtonsoft.Json
dotnet add package Serilog.AspNetCore

# List installed packages
dotnet list package

# Remove a package
dotnet remove package Newtonsoft.Json

# Restore all packages from .csproj references
dotnet restore</code></pre>
  </div>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">XML — .csproj Package References</span>
    </div>
    <pre><code>&lt;Project Sdk="Microsoft.NET.Sdk"&gt;
  &lt;PropertyGroup&gt;
    &lt;OutputType&gt;Exe&lt;/OutputType&gt;
    &lt;TargetFramework&gt;net8.0&lt;/TargetFramework&gt;
    &lt;ImplicitUsings&gt;enable&lt;/ImplicitUsings&gt;
    &lt;Nullable&gt;enable&lt;/Nullable&gt;
  &lt;/PropertyGroup&gt;

  &lt;ItemGroup&gt;
    &lt;PackageReference Include="Newtonsoft.Json" Version="13.0.3" /&gt;
  &lt;/ItemGroup&gt;
&lt;/Project&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Configuration &amp; Environment Variables</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Reading Configuration &amp; Environment Variables</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>using Microsoft.Extensions.Configuration;

// appsettings.json configuration binding
var config = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: true)
    .AddEnvironmentVariables()
    .Build();

string? connectionString = config["ConnectionStrings:DefaultConnection"];
Console.WriteLine($"Connection: {connectionString ?? "Not configured"}");

// Reading system environment variable
string? aspNetCoreEnv = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
Console.WriteLine($"Environment: {aspNetCoreEnv ?? "Development"}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the difference between an Assembly and a NuGet package?</h4>
    <p>An Assembly is a compiled .dll or .exe output file containing CIL bytecode. A NuGet package is a versioned bundle (.nupkg) containing one or more assemblies, metadata, and dependency information distributed via NuGet.org.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What does ImplicitUsings enable in .csproj?</h4>
    <p>It automatically adds global <code>using</code> directives for common namespaces like <code>System</code>, <code>System.Linq</code>, <code>System.IO</code>, and <code>System.Collections.Generic</code> across all source files without requiring manual imports.</p>
  </div>
</div>`;

makeLesson(
  30,
  '30-csharp-dotnet-platform-clr-assemblies-nuget-configuration.html',
  '.NET Platform, CLR, Assemblies & NuGet Masterclass',
  'Exhaustive textbook-grade C# .NET Platform (Chapter 30): .NET SDK, Runtime, CLR, JIT compiler, Assemblies (.dll/.exe), NuGet package management, dotnet CLI, project configuration, environment variables, and application lifecycle.',
  'Phase 11',
  '.NET Platform & Architecture',
  '.NET SDK & Runtime · CLR Architecture · JIT Compiler · Assemblies · NuGet Package Manager · dotnet add package · appsettings.json · Environment Variables',
  c30,
  '29-csharp-parallel-programming-parallel-for-thread-safety-locks.html',
  '29. Parallel.For, Thread Safety, Locks & Concurrent Collections',
  '31-csharp-dependency-injection-lifetimes-singleton-scoped-transient.html',
  '31. Dependency Injection (Singleton, Scoped, Transient)'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 31: Dependency Injection
// ═══════════════════════════════════════════════════════════════════════════════
const c31 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 11 (Chapter 31): C# Dependency Injection, Service Lifetimes &amp; Interface-Based Design Masterclass</strong>! Dependency Injection (DI) is a software design pattern where objects receive their dependencies from external sources rather than creating them internally. .NET's built-in IoC container manages object creation, lifetime, and disposal automatically. In this chapter, we cover tight vs loose coupling, service registration, Singleton, Scoped, Transient lifetimes, constructor injection, and interface-based design for testable code.</p>
</div>

<div class="section-title"><span class="num">1</span>Dependency Injection Ante Enti? — Tight vs Loose Coupling</div>
<div class="section-body">
  <p class="text-prose"><strong>Without DI (Tight Coupling):</strong> Classes directly instantiate their own dependencies using <code>new</code>, making them impossible to swap, test, or mock independently.</p>
  <p class="text-prose"><strong>With DI (Loose Coupling):</strong> Dependencies are injected through constructor parameters as interface abstractions, enabling easy swapping of implementations and mock injection during unit tests.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Tight vs Loose Coupling</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// ❌ TIGHT COUPLING — Hard to test or swap EmailService
public class OrderService
{
    private EmailService emailService = new EmailService(); // Direct creation!

    public void PlaceOrder(string product)
    {
        emailService.SendConfirmation(product);
    }
}

// ✅ LOOSE COUPLING — Constructor Injection via Interface
public interface IEmailService
{
    void SendConfirmation(string product);
}

public class EmailService : IEmailService
{
    public void SendConfirmation(string product)
    {
        Console.WriteLine($"Email sent for order: {product}");
    }
}

public class OrderService
{
    private readonly IEmailService _emailService; // Depends on INTERFACE, not concrete class

    public OrderService(IEmailService emailService) // Injected via constructor
    {
        _emailService = emailService;
    }

    public void PlaceOrder(string product) =&gt; _emailService.SendConfirmation(product);
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Service Registration &amp; Lifetimes in ASP.NET Core</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Lifetime</th><th>Registration Method</th><th>Instance Creation Strategy</th><th>Best Used For</th></tr></thead>
    <tbody>
      <tr><td><strong>Singleton</strong></td><td><code>AddSingleton&lt;I, T&gt;()</code></td><td>ONE instance created for the entire app lifetime</td><td>Config services, caches, DB connection pools</td></tr>
      <tr><td><strong>Scoped</strong></td><td><code>AddScoped&lt;I, T&gt;()</code></td><td>ONE instance per HTTP request scope</td><td>Entity Framework DbContext, per-request services</td></tr>
      <tr><td><strong>Transient</strong></td><td><code>AddTransient&lt;I, T&gt;()</code></td><td>NEW instance every time it is requested</td><td>Lightweight stateless services, email senders</td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Service Registration in Program.cs</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>var builder = WebApplication.CreateBuilder(args);

// Register services with their lifetimes
builder.Services.AddSingleton&lt;IConfigService, AppConfigService&gt;();
builder.Services.AddScoped&lt;IOrderRepository, SqlOrderRepository&gt;();
builder.Services.AddTransient&lt;IEmailService, SmtpEmailService&gt;();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();
app.Run();</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is an IoC Container?</h4>
    <p>An Inversion of Control (IoC) Container is an engine that manages object creation and dependency wiring automatically. .NET's built-in <code>IServiceCollection</code> is the IoC container.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What is the Captive Dependency problem?</h4>
    <p>It occurs when a Singleton service depends on a Scoped or Transient service, capturing a short-lived service inside a long-lived container. This causes stale state bugs. Always inject only same-lifetime or longer-lived services into Singleton.</p>
  </div>
</div>`;

makeLesson(
  31,
  '31-csharp-dependency-injection-lifetimes-singleton-scoped-transient.html',
  'Dependency Injection (Singleton, Scoped, Transient) Masterclass',
  'Exhaustive textbook-grade C# Dependency Injection (Chapter 31): DI concept, tight vs loose coupling, IServiceCollection, Singleton, Scoped, Transient lifetimes, constructor injection, interface-based design, and testing injected services.',
  'Phase 11',
  '.NET Platform & Architecture',
  'Dependency Injection · Tight vs Loose Coupling · IServiceCollection · Singleton · Scoped · Transient · Constructor Injection · Interface Design · IoC Container',
  c31,
  '30-csharp-dotnet-platform-clr-assemblies-nuget-configuration.html',
  '30. .NET Platform, CLR, Assemblies & NuGet',
  '32-csharp-aspnet-core-introduction-architecture-middleware.html',
  '32. ASP.NET Core Intro, Middleware & Pipeline'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 32: ASP.NET Core Introduction
// ═══════════════════════════════════════════════════════════════════════════════
const c32 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 12 (Chapter 32): ASP.NET Core Introduction, Middleware &amp; Request Pipeline Masterclass</strong>! ASP.NET Core is Microsoft's cross-platform, high-performance web framework for building modern web APIs, web applications, and microservices. In this chapter, we cover ASP.NET Core architecture, <code>Program.cs</code> application host setup, the Middleware pipeline, request/response flow, Kestrel web server, development environment setup, and Swagger/OpenAPI documentation.</p>
</div>

<div class="section-title"><span class="num">1</span>ASP.NET Core Ante Enti? Web App vs Web API</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Project Type</th><th>Purpose</th><th>Serves</th><th>Common Use Case</th></tr></thead>
    <tbody>
      <tr><td>Web Application (MVC / Razor Pages)</td><td>Server-side rendered HTML</td><td>HTML + CSS + JS to browsers</td><td>Traditional website, CMS, e-commerce UI</td></tr>
      <tr><td>Web API (REST)</td><td>HTTP data endpoint</td><td>JSON / XML responses to any client</td><td>Mobile apps, SPAs (Angular/React), IoT devices</td></tr>
      <tr><td>Blazor (WebAssembly)</td><td>C# in browser via WASM</td><td>Interactive UI compiled to WebAssembly</td><td>Full-stack C# web apps without JavaScript</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Program.cs Architecture &amp; Middleware Pipeline</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Program.cs Full Setup (ASP.NET Core 8)</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>var builder = WebApplication.CreateBuilder(args);

// 1. Register services in DI container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 2. Configure Middleware Pipeline (order matters!)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();    // Redirects HTTP to HTTPS
app.UseRouting();             // Matches routes to controllers
app.UseAuthentication();      // Validates JWT tokens
app.UseAuthorization();       // Checks permissions/roles
app.MapControllers();         // Maps [Route] controller actions

app.Run(); // Starts Kestrel web server and begins listening</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is Kestrel?</h4>
    <p>Kestrel is ASP.NET Core's built-in cross-platform HTTP web server. It handles incoming HTTP connections and is embedded directly in the application process, unlike IIS which was a separate Windows-only host.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: Does middleware order matter?</h4>
    <p>Yes! Middleware executes in the exact order you register it in <code>Program.cs</code>. Always register <code>UseAuthentication</code> before <code>UseAuthorization</code>, and <code>UseRouting</code> before <code>MapControllers</code>.</p>
  </div>
</div>`;

makeLesson(
  32,
  '32-csharp-aspnet-core-introduction-architecture-middleware.html',
  'ASP.NET Core Intro, Middleware & Pipeline Masterclass',
  'Exhaustive textbook-grade ASP.NET Core Introduction (Chapter 32): Web API vs Web Application vs Blazor, Program.cs setup, WebApplication.CreateBuilder, service registration, middleware pipeline, Kestrel, Swagger/OpenAPI.',
  'Phase 12',
  'ASP.NET Core Web APIs',
  'ASP.NET Core Architecture · Program.cs · WebApplication Builder · Middleware Pipeline · Kestrel Server · Request/Response Flow · Swagger/OpenAPI',
  c32,
  '31-csharp-dependency-injection-lifetimes-singleton-scoped-transient.html',
  '31. Dependency Injection (Singleton, Scoped, Transient)',
  '33-csharp-minimal-apis-endpoints-routing-swagger.html',
  '33. Minimal APIs, Endpoints & Swagger'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 33: Minimal APIs
// ═══════════════════════════════════════════════════════════════════════════════
const c33 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 12 (Chapter 33): C# ASP.NET Core Minimal APIs, Endpoints, Routing &amp; Swagger Masterclass</strong>! Minimal APIs (.NET 6+) allow building lightweight HTTP endpoints with minimal boilerplate directly in <code>Program.cs</code> without controllers or action methods. In this chapter, we create GET, POST, PUT, DELETE endpoints, handle route parameters, query strings, request bodies, status codes, validation, error handling, and Swagger documentation.</p>
</div>

<div class="section-title"><span class="num">1</span>Creating Minimal API Endpoints (GET, POST, PUT, DELETE)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Complete Minimal API Example</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();

// In-memory product store
var products = new List&lt;Product&gt;
{
    new Product(1, "Laptop",  75000m),
    new Product(2, "Mouse",   1200m)
};

// GET all products
app.MapGet("/api/products", () =&gt; Results.Ok(products));

// GET single product by ID
app.MapGet("/api/products/{id:int}", (int id) =&gt;
{
    var product = products.FirstOrDefault(p =&gt; p.Id == id);
    return product is not null ? Results.Ok(product) : Results.NotFound($"Product {id} not found.");
});

// POST create product
app.MapPost("/api/products", (Product newProduct) =&gt;
{
    products.Add(newProduct);
    return Results.Created($"/api/products/{newProduct.Id}", newProduct);
});

// DELETE product
app.MapDelete("/api/products/{id:int}", (int id) =&gt;
{
    var product = products.FirstOrDefault(p =&gt; p.Id == id);
    if (product is null) return Results.NotFound();
    products.Remove(product);
    return Results.NoContent();
});

app.Run();

// Record model
public record Product(int Id, string Name, decimal Price);</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: When should I use Minimal APIs vs Controller-Based APIs?</h4>
    <p>Use Minimal APIs for simple microservices, serverless functions, or prototypes where you want minimal ceremony. Use Controller-Based APIs for large enterprise applications requiring model binding, filters, action results, and structured routing.</p>
  </div>
</div>`;

makeLesson(
  33,
  '33-csharp-minimal-apis-endpoints-routing-swagger.html',
  'Minimal APIs, Endpoints & Swagger Masterclass',
  'Exhaustive textbook-grade ASP.NET Core Minimal APIs (Chapter 33): Creating endpoints, GET/POST/PUT/DELETE, route parameters, query strings, request bodies, Results helper, status codes, validation, error handling, Swagger documentation.',
  'Phase 12',
  'ASP.NET Core Web APIs',
  'Minimal APIs · MapGet/Post/Put/Delete · Route Parameters · Query Parameters · Request Body · Results Helper · Status Codes · Swagger UI',
  c33,
  '32-csharp-aspnet-core-introduction-architecture-middleware.html',
  '32. ASP.NET Core Intro, Middleware & Pipeline',
  '34-csharp-controller-based-apis-routing-dtos-validation.html',
  '34. Controller APIs, DTOs & Validation'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 34: Controller-Based APIs
// ═══════════════════════════════════════════════════════════════════════════════
const c34 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 12 (Chapter 34): C# ASP.NET Core Controller-Based APIs, DTOs, Routing &amp; Validation Masterclass</strong>! Controller-based APIs organize endpoints inside classes that inherit from <code>ControllerBase</code>. In this chapter, we master controller routing with <code>[ApiController]</code> &amp; <code>[Route]</code> attributes, HTTP verb attributes, <code>IActionResult</code> &amp; <code>ActionResult&lt;T&gt;</code>, Data Transfer Objects (DTOs), model binding, data validation with Data Annotations, global exception handling, and CRUD operations with in-memory storage.</p>
</div>

<div class="section-title"><span class="num">1</span>ControllerBase &amp; Routing Attributes</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Full CRUD Controller</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")] // Route: /api/products
public class ProductsController : ControllerBase
{
    private static List&lt;ProductDto&gt; _products = new()
    {
        new ProductDto(1, "Laptop", 75000m),
        new ProductDto(2, "Mouse",  1200m)
    };

    // GET /api/products
    [HttpGet]
    public ActionResult&lt;List&lt;ProductDto&gt;&gt; GetAll() =&gt; Ok(_products);

    // GET /api/products/1
    [HttpGet("{id:int}")]
    public ActionResult&lt;ProductDto&gt; GetById(int id)
    {
        var product = _products.FirstOrDefault(p =&gt; p.Id == id);
        return product is null ? NotFound($"Product {id} not found.") : Ok(product);
    }

    // POST /api/products
    [HttpPost]
    public ActionResult&lt;ProductDto&gt; Create([FromBody] ProductDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        _products.Add(dto);
        return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
    }

    // PUT /api/products/1
    [HttpPut("{id:int}")]
    public IActionResult Update(int id, [FromBody] ProductDto dto)
    {
        var existing = _products.FirstOrDefault(p =&gt; p.Id == id);
        if (existing is null) return NotFound();
        _products[_products.IndexOf(existing)] = dto;
        return NoContent();
    }

    // DELETE /api/products/1
    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        var product = _products.FirstOrDefault(p =&gt; p.Id == id);
        if (product is null) return NotFound();
        _products.Remove(product);
        return NoContent();
    }
}

// DTO using record with validation
public record ProductDto(
    int Id,
    [property: Required, MinLength(2)] string Name,
    [property: Range(0.01, double.MaxValue)] decimal Price
);</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the difference between IActionResult and ActionResult&lt;T&gt;?</h4>
    <p><code>IActionResult</code> returns any HTTP response. <code>ActionResult&lt;T&gt;</code> additionally tells Swagger the exact response type, generating accurate API documentation automatically.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What does [ApiController] attribute do?</h4>
    <p><code>[ApiController]</code> enables automatic model validation (returns 400 BadRequest when ModelState is invalid without manual checks), binds complex types from request body by default, and improves error response formatting.</p>
  </div>
</div>`;

makeLesson(
  34,
  '34-csharp-controller-based-apis-routing-dtos-validation.html',
  'Controller APIs, DTOs & Validation Masterclass',
  'Exhaustive textbook-grade ASP.NET Core Controller APIs (Chapter 34): Controllers, routing, HTTP verbs, ControllerBase, IActionResult, ActionResult<T>, DTOs, model binding, model validation, status codes, global exception handling, CRUD.',
  'Phase 12',
  'ASP.NET Core Web APIs',
  'Controllers · [ApiController] · Routing · HTTP Verbs · IActionResult · ActionResult<T> · DTOs · Model Binding · Data Annotations Validation · CRUD',
  c34,
  '33-csharp-minimal-apis-endpoints-routing-swagger.html',
  '33. Minimal APIs, Endpoints & Swagger',
  '35-csharp-rest-api-capstone-project-product-service-crud.html',
  '35. Complete REST API Capstone CRUD Project'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 35: Complete REST API Capstone Project
// ═══════════════════════════════════════════════════════════════════════════════
const c35 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 12 (Chapter 35): Complete ASP.NET Core REST API Capstone Project — Product Management CRUD System</strong>! This is the final capstone lesson that ties together everything learned in this masterclass. We build a complete, production-ready Product Management REST API using ASP.NET Core 8 with: Product model, ProductDto, IProductService interface, ProductService implementation, ProductsController with full CRUD, in-memory repository, data validation, proper HTTP status codes, and Swagger documentation.</p>
</div>

<div class="section-title"><span class="num">1</span>Project Architecture</div>
<div class="section-body">
  <div class="memory-diagram">REST API Project Structure:

  ProductsAPI/
  ├── Program.cs                 ← App host setup, DI registration, middleware pipeline
  ├── Models/
  │   └── Product.cs             ← Domain Entity (Id, Name, Price, Stock, Category)
  ├── DTOs/
  │   ├── CreateProductDto.cs    ← Input DTO for POST requests (with validation)
  │   └── UpdateProductDto.cs    ← Input DTO for PUT requests
  ├── Services/
  │   ├── IProductService.cs     ← Interface contract (Dependency Inversion)
  │   └── ProductService.cs      ← In-memory service implementation
  └── Controllers/
      └── ProductsController.cs  ← API Controller with CRUD actions</div>
</div>

<div class="section-title"><span class="num">2</span>Complete Product Model &amp; DTOs</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Product Entity &amp; DTOs</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// Models/Product.cs
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public string Category { get; set; } = "";
}

// DTOs/CreateProductDto.cs
public class CreateProductDto
{
    [Required, MinLength(2), MaxLength(100)]
    public string Name { get; set; } = "";

    [Required, Range(0.01, 10000000)]
    public decimal Price { get; set; }

    [Required, Range(0, int.MaxValue)]
    public int Stock { get; set; }

    [Required]
    public string Category { get; set; } = "";
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Service Interface &amp; In-Memory Implementation</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — IProductService &amp; ProductService</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// Services/IProductService.cs
public interface IProductService
{
    List&lt;Product&gt; GetAll();
    Product? GetById(int id);
    Product Create(CreateProductDto dto);
    Product? Update(int id, CreateProductDto dto);
    bool Delete(int id);
}

// Services/ProductService.cs
public class ProductService : IProductService
{
    private readonly List&lt;Product&gt; _products = new()
    {
        new Product { Id = 1, Name = "Laptop",   Price = 75000, Stock = 10, Category = "Electronics" },
        new Product { Id = 2, Name = "Mouse",    Price = 1200,  Stock = 50, Category = "Accessories" },
        new Product { Id = 3, Name = "Keyboard", Price = 2500,  Stock = 30, Category = "Accessories" }
    };

    private int _nextId = 4;

    public List&lt;Product&gt; GetAll() =&gt; _products;

    public Product? GetById(int id) =&gt; _products.FirstOrDefault(p =&gt; p.Id == id);

    public Product Create(CreateProductDto dto)
    {
        var product = new Product { Id = _nextId++, Name = dto.Name, Price = dto.Price, Stock = dto.Stock, Category = dto.Category };
        _products.Add(product);
        return product;
    }

    public Product? Update(int id, CreateProductDto dto)
    {
        var product = GetById(id);
        if (product is null) return null;
        product.Name = dto.Name;
        product.Price = dto.Price;
        product.Stock = dto.Stock;
        product.Category = dto.Category;
        return product;
    }

    public bool Delete(int id)
    {
        var product = GetById(id);
        if (product is null) return false;
        _products.Remove(product);
        return true;
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Complete ProductsController with All CRUD Endpoints</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — ProductsController Full CRUD</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _service;

    public ProductsController(IProductService service) // DI via constructor injection
    {
        _service = service;
    }

    // GET /api/products — Get ALL products
    [HttpGet]
    public ActionResult&lt;List&lt;Product&gt;&gt; GetAll() =&gt; Ok(_service.GetAll());

    // GET /api/products/1 — Get ONE product
    [HttpGet("{id:int}")]
    public ActionResult&lt;Product&gt; GetById(int id)
    {
        var product = _service.GetById(id);
        return product is null ? NotFound(new { Message = $"Product {id} not found." }) : Ok(product);
    }

    // POST /api/products — CREATE product
    [HttpPost]
    public ActionResult&lt;Product&gt; Create([FromBody] CreateProductDto dto)
    {
        var product = _service.Create(dto);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    // PUT /api/products/1 — UPDATE product
    [HttpPut("{id:int}")]
    public ActionResult&lt;Product&gt; Update(int id, [FromBody] CreateProductDto dto)
    {
        var product = _service.Update(id, dto);
        return product is null ? NotFound(new { Message = $"Product {id} not found." }) : Ok(product);
    }

    // DELETE /api/products/1 — DELETE product
    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        bool deleted = _service.Delete(id);
        return deleted ? NoContent() : NotFound(new { Message = $"Product {id} not found." });
    }
}

// Program.cs — Register ProductService and run app
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped&lt;IProductService, ProductService&gt;(); // Register DI

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();
app.Run();</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What HTTP status codes should CRUD operations return?</h4>
    <p>GET → 200 OK (found) / 404 Not Found; POST → 201 Created; PUT → 200 OK / 404 Not Found; DELETE → 204 No Content / 404 Not Found; Validation error → 400 Bad Request.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What is the next step after this masterclass?</h4>
    <p>Learn Entity Framework Core for database persistence, JWT Authentication for security, Fluent Validation, and deploy your API to Azure App Service or Docker containers.</p>
  </div>
</div>`;

makeLesson(
  35,
  '35-csharp-rest-api-capstone-project-product-service-crud.html',
  'Complete REST API Capstone Project — Product Management CRUD Masterclass',
  'Exhaustive capstone C# REST API Project (Chapter 35): Product model, CreateProductDto, IProductService interface, ProductService in-memory implementation, ProductsController with full CRUD, DI registration, Swagger testing, and API documentation.',
  'Phase 12',
  'ASP.NET Core Web APIs',
  'Product Model · DTO Design · IProductService Interface · Dependency Injection · Full CRUD Controller · HTTP Status Codes · Swagger Testing · API Documentation',
  c35,
  '34-csharp-controller-based-apis-routing-dtos-validation.html',
  '34. Controller APIs, DTOs & Validation',
  null,
  null
);

console.log('\n🎉 ALL C# PHASES 11 & 12 (CHAPTERS 30–35) GENERATED SUCCESSFULLY!');
