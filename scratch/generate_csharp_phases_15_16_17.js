const fs = require('fs');
const path = require('path');
const { wrapCSharpPage } = require('./build_csharp_master.js');

const csharpDir = path.join(__dirname, '..', 'public', 'blog-csharp');
console.log('🚀 Generating C# Masterclass Phases 15-17 (Chapters 41–47)...');

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
// CHAPTER 41: Unit Testing with xUnit and Moq
// ═══════════════════════════════════════════════════════════════════════════════
const c41 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 15 (Chapter 41): C# Unit Testing, xUnit, Moq &amp; Integration Tests Masterclass</strong>! Professional C# development requires a robust automated test suite. In this chapter, we master the three levels of testing (Unit, Integration, End-to-End), write unit tests with xUnit, use Moq for dependency mocking, assert expected outcomes, organize tests with fixtures, test ASP.NET Core controllers and services, and run API integration tests with <code>WebApplicationFactory</code>.</p>
</div>

<div class="section-title"><span class="num">1</span>Testing Pyramid — Unit vs Integration vs E2E</div>
<div class="section-body">
  <div class="memory-diagram">Testing Pyramid:

         /\
        /E2E\     ← Few | Slow | End-to-End Browser Tests (Playwright, Selenium)
       /------\
      / Integ  \  ← Some | Medium | Integration Tests (DB, HTTP endpoints)
     /----------\
    /  Unit Tests \ ← Many | Fast | Isolated function/class tests (xUnit + Moq)
   /--------------\</div>

  <table class="tbl spec-table">
    <thead><tr><th>Test Level</th><th>What is Tested</th><th>Speed</th><th>Tool</th></tr></thead>
    <tbody>
      <tr><td><strong>Unit Test</strong></td><td>Single function/method in isolation with mocked dependencies</td><td>Very Fast (ms)</td><td>xUnit + Moq</td></tr>
      <tr><td><strong>Integration Test</strong></td><td>Multiple components together (service + real DB / HTTP endpoints)</td><td>Medium (seconds)</td><td>WebApplicationFactory + xUnit</td></tr>
      <tr><td><strong>E2E Test</strong></td><td>Full application flow from UI to database (user journey)</td><td>Slow (minutes)</td><td>Playwright, Selenium</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Writing Unit Tests with xUnit</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Terminal — Add xUnit &amp; Moq Packages</span>
    </div>
    <pre><code># Create test project
dotnet new xunit -n ProductsAPI.Tests

# Add reference to main project
dotnet add ProductsAPI.Tests/ProductsAPI.Tests.csproj reference ProductsAPI/ProductsAPI.csproj

# Add Moq and FluentAssertions
dotnet add ProductsAPI.Tests package Moq
dotnet add ProductsAPI.Tests package FluentAssertions</code></pre>
  </div>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — xUnit Unit Tests</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>using Xunit;
using Moq;
using FluentAssertions;

public class ProductServiceTests
{
    private readonly Mock&lt;IProductRepository&gt; _mockRepo;
    private readonly ProductService _service;

    public ProductServiceTests()
    {
        _mockRepo = new Mock&lt;IProductRepository&gt;();
        _service  = new ProductService(_mockRepo.Object); // Inject mock
    }

    [Fact]
    public async Task GetProductById_WhenExists_ReturnsProduct()
    {
        // Arrange — Setup mock to return a specific product
        var expectedProduct = new Product { Id = 1, Name = "Laptop", Price = 75000m };
        _mockRepo.Setup(r =&gt; r.GetByIdAsync(1)).ReturnsAsync(expectedProduct);

        // Act — Call the method under test
        var result = await _service.GetByIdAsync(1);

        // Assert — Verify the result
        result.Should().NotBeNull();
        result!.Id.Should().Be(1);
        result.Name.Should().Be("Laptop");
        result.Price.Should().Be(75000m);
    }

    [Fact]
    public async Task GetProductById_WhenNotFound_ReturnsNull()
    {
        _mockRepo.Setup(r =&gt; r.GetByIdAsync(999)).ReturnsAsync((Product?)null);

        var result = await _service.GetByIdAsync(999);

        result.Should().BeNull();
    }

    [Theory]                           // Data-driven test
    [InlineData(-1)]
    [InlineData(0)]
    public async Task CreateProduct_WithInvalidPrice_ThrowsException(decimal price)
    {
        var dto = new CreateProductDto { Name = "Test", Price = price, Stock = 1 };

        Func&lt;Task&gt; act = async () =&gt; await _service.CreateAsync(dto);

        await act.Should().ThrowAsync&lt;ArgumentException&gt;()
            .WithMessage("*price*");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Integration Tests with WebApplicationFactory</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — API Integration Test</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>using Microsoft.AspNetCore.Mvc.Testing;

public class ProductsControllerIntegrationTests : IClassFixture&lt;WebApplicationFactory&lt;Program&gt;&gt;
{
    private readonly HttpClient _client;

    public ProductsControllerIntegrationTests(WebApplicationFactory&lt;Program&gt; factory)
    {
        _client = factory.CreateClient(); // Creates in-memory HTTP test client
    }

    [Fact]
    public async Task GetProducts_ReturnsOkWithProductsList()
    {
        // Act — Real HTTP call to in-memory API
        var response = await _client.GetAsync("/api/products");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var content = await response.Content.ReadAsStringAsync();
        content.Should().Contain("Laptop");
    }
}

// Run all tests
// dotnet test</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the difference between [Fact] and [Theory] in xUnit?</h4>
    <p><code>[Fact]</code> marks a test that runs once with no parameters. <code>[Theory]</code> marks a data-driven test that runs multiple times with different input values provided via <code>[InlineData(...)]</code> or <code>[MemberData(...)]</code> attributes.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: Why use Moq instead of real dependencies in unit tests?</h4>
    <p>Mocks replace real dependencies (database, HTTP clients, email services) with controllable fakes, making tests: (1) Fast — no actual DB I/O, (2) Isolated — failures pinpoint exact code, (3) Deterministic — same input always produces same output, (4) Easy to simulate error conditions.</p>
  </div>
</div>`;

makeLesson(41, '41-csharp-unit-testing-xunit-moq-integration-tests.html',
  'Unit Testing, xUnit, Moq & Integration Tests Masterclass',
  'Complete C# Testing (Chapter 41): Testing pyramid, Unit vs Integration vs E2E, xUnit [Fact] [Theory], Moq dependency mocking, FluentAssertions, service testing, controller testing, WebApplicationFactory integration tests, and test coverage.',
  'Phase 15', 'Testing & Professional Development',
  'Testing Pyramid · Unit Tests · xUnit · [Fact] · [Theory] · Moq · Setup/ReturnsAsync · FluentAssertions · Integration Tests · WebApplicationFactory',
  c41,
  '40-csharp-aspnet-core-security-authorize-cors-xss-rate-limiting.html', '40. ASP.NET Core Security',
  '42-csharp-clean-code-solid-principles-patterns-refactoring.html', '42. Clean Code, SOLID Principles & Architecture'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 42: Clean Code & SOLID
// ═══════════════════════════════════════════════════════════════════════════════
const c42 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 15 (Chapter 42): Clean Code, SOLID Principles, Design Patterns &amp; Refactoring Masterclass</strong>! Writing code that works is the baseline. Writing code that is readable, maintainable, testable, and extensible is what separates junior from senior engineers. In this chapter, we master meaningful naming conventions, small focused methods, the DRY principle, all five SOLID design principles, common design patterns (Repository, Service, Factory), and practical refactoring techniques.</p>
</div>

<div class="section-title"><span class="num">1</span>SOLID Principles — The Foundation of Clean OOP</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Principle</th><th>Full Name</th><th>Rule</th><th>Violation Example</th></tr></thead>
    <tbody>
      <tr><td><strong>S</strong></td><td>Single Responsibility</td><td>Every class should have ONE reason to change — one job.</td><td>UserService that handles registration + email sending + PDF generation.</td></tr>
      <tr><td><strong>O</strong></td><td>Open/Closed</td><td>Open for extension, Closed for modification. Add features via new classes, not editing existing.</td><td>Adding discount type by adding if/else to existing OrderService.</td></tr>
      <tr><td><strong>L</strong></td><td>Liskov Substitution</td><td>Subtypes must be usable wherever their base type is expected without breaking behavior.</td><td>Square extends Rectangle but breaks area calculation assumptions.</td></tr>
      <tr><td><strong>I</strong></td><td>Interface Segregation</td><td>Clients should not depend on interfaces they don't use. Split large interfaces into focused ones.</td><td>IWorker with Work() + Eat() + Sleep() forced on Robot class.</td></tr>
      <tr><td><strong>D</strong></td><td>Dependency Inversion</td><td>High-level modules should depend on abstractions (interfaces), not on concrete implementations.</td><td>OrderService directly creates new EmailService() instead of IEmailService injection.</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Single Responsibility Principle (SRP) — Code Example</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — SRP Violation vs Clean SRP</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code">// ❌ SRP VIOLATION — OrderService does too many things
public class OrderService
{
    public void ProcessOrder(Order order)
    {
        // Responsibility 1: Validate order
        if (order.Items.Count == 0) throw new Exception("Empty order!");

        // Responsibility 2: Calculate totals
        order.Total = order.Items.Sum(i =&gt; i.Price * i.Quantity);

        // Responsibility 3: Save to database
        _db.Orders.Add(order); _db.SaveChanges();

        // Responsibility 4: Send email confirmation
        var smtp = new SmtpClient("smtp.example.com");
        smtp.Send("noreply@shop.com", order.Customer.Email, "Order Confirmed", "...");

        // Responsibility 5: Generate PDF invoice
        var pdf = new PdfDocument();
        pdf.AddPage().AddText("Invoice #" + order.Id);
        pdf.Save("invoice_" + order.Id + ".pdf");
    }
}

// ✅ SRP COMPLIANT — Separate single-responsibility classes
public class OrderValidator   { public void Validate(Order o) { /* validate */ } }
public class OrderCalculator  { public void Calculate(Order o) { /* calc total */ } }
public class OrderRepository  { public void Save(Order o) { /* save to DB */ } }
public class OrderEmailService { public void SendConfirmation(Order o) { /* send email */ } }
public class InvoiceService   { public void GeneratePdf(Order o) { /* generate PDF */ } }

public class OrderService // Orchestrator only — delegates to specialists
{
    public void ProcessOrder(Order order)
    {
        _validator.Validate(order);
        _calculator.Calculate(order);
        _repository.Save(order);
        _emailService.SendConfirmation(order);
        _invoiceService.GeneratePdf(order);
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>DRY Principle &amp; Meaningful Naming</div>
<div class="section-body">
  <div class="concept-box">
    <h4>✅ Clean Code Rules — Quick Reference:</h4>
    <p>• <strong>DRY (Don't Repeat Yourself)</strong>: Extract duplicated logic into shared methods or services. Every piece of knowledge should have a single, unambiguous representation.</p>
    <p>• <strong>Meaningful Names</strong>: Use intention-revealing names. <code>GetActiveOrdersByCustomerId(int customerId)</code> beats <code>getData(int id)</code>.</p>
    <p>• <strong>Small Methods</strong>: Each method should do ONE thing and fit on one screen (10-20 lines max). If you need to write a comment to explain what a block of code does, extract it into a named method.</p>
    <p>• <strong>Avoid Magic Numbers</strong>: Use named constants (<code>const int MAX_RETRY = 3</code>) instead of literal numbers scattered in code.</p>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is Clean Architecture?</h4>
    <p>Clean Architecture organizes code into concentric layers: Domain (entities, business rules) at the center, Application (use cases, service interfaces) next, Infrastructure (database, external APIs) in the outer ring, and Presentation (controllers, UI) at the outermost. Dependencies point inward — infrastructure depends on application, never the reverse.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What is the Open/Closed Principle in practice?</h4>
    <p>Use interfaces and polymorphism to add new behavior. For example, add a new payment method (CryptoPayment) by creating a new class implementing <code>IPaymentProcessor</code> — without modifying existing payment classes or checkout service code.</p>
  </div>
</div>`;

makeLesson(42, '42-csharp-clean-code-solid-principles-patterns-refactoring.html',
  'Clean Code, SOLID Principles & Architecture Masterclass',
  'Complete C# Clean Code (Chapter 42): SOLID principles (SRP, OCP, LSP, ISP, DIP), meaningful naming, small methods, DRY principle, Repository/Service/Factory patterns, Clean Architecture layers, and practical refactoring techniques.',
  'Phase 15', 'Testing & Professional Development',
  'SOLID · SRP · OCP · LSP · ISP · DIP · DRY Principle · Meaningful Naming · Repository Pattern · Service Layer · Clean Architecture · Refactoring',
  c42,
  '41-csharp-unit-testing-xunit-moq-integration-tests.html', '41. Unit Testing, xUnit, Moq & Integration Tests',
  '43-csharp-performance-span-memory-caching-gc-optimization.html', '43. Performance, Span<T>, Memory<T> & Caching'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 43: Performance
// ═══════════════════════════════════════════════════════════════════════════════
const c43 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 16 (Chapter 43): C# Performance Optimization — Span&lt;T&gt;, Memory&lt;T&gt;, GC, Caching &amp; Profiling Masterclass</strong>! Performance in C# comes from understanding memory allocation, avoiding unnecessary GC pressure, using stack-based structures for hot paths, caching repeated computations, optimizing async I/O, and profiling to find real bottlenecks before optimizing. In this chapter, we master all key .NET performance tools and patterns.</p>
</div>

<div class="section-title"><span class="num">1</span>Garbage Collection &amp; Memory Allocation</div>
<div class="section-body">
  <div class="memory-diagram">.NET Garbage Collector (GC) Generations:

  Gen 0 ← New objects (short-lived). Collected frequently (milliseconds).
          └── Survivors promoted to...
  Gen 1 ← Medium-lived objects. Collected less often.
          └── Survivors promoted to...
  Gen 2 ← Long-lived objects (singletons, caches). Collected rarely.
          LOH → Large Object Heap (objects &gt; 85KB). Rarely collected!</div>

  <p class="text-prose"><strong>Key Rule:</strong> Reduce heap allocations in hot paths to avoid Gen 0 GC pauses. Use <code>Span&lt;T&gt;</code>, <code>stackalloc</code>, <code>ArrayPool&lt;T&gt;</code>, and <code>struct</code> types to keep data on the stack instead of triggering heap allocation.</p>
</div>

<div class="section-title"><span class="num">2</span>Span&lt;T&gt; &amp; Memory&lt;T&gt; — Zero-Copy Processing</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Span&lt;T&gt; Performance</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// SLOW: String.Substring allocates a NEW string object on the heap every call
string original = "Hello, World!";
string sub = original.Substring(7); // Heap allocation!

// FAST: Span&lt;T&gt; is a view into existing memory — ZERO heap allocation
ReadOnlySpan&lt;char&gt; span = original.AsSpan(7); // No allocation!
Console.WriteLine(span.ToString()); // "World!"

// Span over array slice — no copy
int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
Span&lt;int&gt; middle = numbers.AsSpan(3, 4); // Elements 4,5,6,7 — no copy
foreach (int n in middle) Console.Write(n + " ");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>In-Memory Caching &amp; Distributed Cache</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — IMemoryCache</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code">// Program.cs — Register IMemoryCache
builder.Services.AddMemoryCache();

// Service — Cache expensive database results
public class ProductService
{
    private readonly IMemoryCache _cache;
    private readonly AppDbContext _context;

    public ProductService(IMemoryCache cache, AppDbContext context)
    {
        _cache = cache; _context = context;
    }

    public async Task&lt;List&lt;Product&gt;&gt; GetAllProductsAsync()
    {
        const string cacheKey = "products:all";

        if (!_cache.TryGetValue(cacheKey, out List&lt;Product&gt;? products))
        {
            // Cache MISS — hit the database
            products = await _context.Products.ToListAsync();

            // Store in cache for 5 minutes
            _cache.Set(cacheKey, products, TimeSpan.FromMinutes(5));
        }

        return products!; // Cache HIT — no DB query!
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: When should I use Span&lt;T&gt; vs Memory&lt;T&gt;?</h4>
    <p><code>Span&lt;T&gt;</code> is a <code>ref struct</code> that can only live on the stack — ideal for synchronous hot-path processing (parsing, slicing). <code>Memory&lt;T&gt;</code> can live on the heap and works across <code>async</code> method boundaries where <code>Span&lt;T&gt;</code> cannot be stored.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What is the best profiling tool for .NET performance?</h4>
    <p>Use <strong>dotnet-trace</strong> and <strong>dotnet-counters</strong> for CLI profiling, <strong>BenchmarkDotNet</strong> for micro-benchmarks, <strong>Visual Studio Profiler</strong> for CPU/memory analysis, and <strong>Application Insights</strong> / <strong>Datadog</strong> for production performance monitoring.</p>
  </div>
</div>`;

makeLesson(43, '43-csharp-performance-span-memory-caching-gc-optimization.html',
  'Performance, Span<T>, Memory<T>, GC & Caching Masterclass',
  'Complete C# Performance (Chapter 43): GC generations, memory allocation, Span<T> zero-copy, Memory<T>, stackalloc, ArrayPool<T>, IMemoryCache, IDistributedCache (Redis), response compression, async performance, and profiling tools.',
  'Phase 16', 'Advanced .NET',
  'GC Generations · Memory Allocation · Span<T> · Memory<T> · Zero-Copy Processing · IMemoryCache · Cache-Aside Pattern · BenchmarkDotNet · Profiling',
  c43,
  '42-csharp-clean-code-solid-principles-patterns-refactoring.html', '42. Clean Code & SOLID Principles',
  '44-csharp-background-services-ihostedservice-worker-queues.html', '44. Background Services, Hosted Services & Worker Queues'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 44: Background Services
// ═══════════════════════════════════════════════════════════════════════════════
const c44 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 16 (Chapter 44): C# Background Services, IHostedService, BackgroundService &amp; Worker Queues Masterclass</strong>! Many production applications need tasks that run continuously in the background — sending emails, processing queues, syncing data, running scheduled jobs, or monitoring health. In this chapter, we implement <code>IHostedService</code>, <code>BackgroundService</code>, Worker Services, background email processing with <code>Channel&lt;T&gt;</code> queues, scheduled tasks, and graceful shutdown.</p>
</div>

<div class="section-title"><span class="num">1</span>IHostedService vs BackgroundService</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Interface</th><th>Methods Required</th><th>Best Used For</th></tr></thead>
    <tbody>
      <tr><td><code>IHostedService</code></td><td><code>StartAsync()</code> + <code>StopAsync()</code></td><td>Fine-grained control over start/stop lifecycle</td></tr>
      <tr><td><code>BackgroundService</code></td><td><code>ExecuteAsync(CancellationToken)</code></td><td>Long-running loop services (recommended for most cases)</td></tr>
      <tr><td>Worker Service Template</td><td><code>ExecuteAsync()</code></td><td>Standalone console background worker process</td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Scheduled Background Service</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code">public class DataSyncService : BackgroundService
{
    private readonly ILogger&lt;DataSyncService&gt; _logger;
    private readonly TimeSpan _interval = TimeSpan.FromMinutes(5);

    public DataSyncService(ILogger&lt;DataSyncService&gt; logger)
    {
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("DataSyncService started at {Time}", DateTimeOffset.Now);

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                _logger.LogInformation("Syncing data at: {Time}", DateTimeOffset.Now);
                await SyncDataAsync(stoppingToken);
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                _logger.LogError(ex, "Error syncing data");
            }

            await Task.Delay(_interval, stoppingToken); // Wait 5 minutes
        }

        _logger.LogInformation("DataSyncService stopped gracefully.");
    }

    private async Task SyncDataAsync(CancellationToken ct)
    {
        // Perform database sync, file processing, API polling etc.
        await Task.Delay(100, ct); // Simulate work
    }
}

// Register in Program.cs
builder.Services.AddHostedService&lt;DataSyncService&gt;();</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Background Queue with Channel&lt;T&gt;</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Channel-based Background Email Queue</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// Queue Interface
public interface IBackgroundTaskQueue
{
    void Enqueue(EmailTask task);
    Task&lt;EmailTask&gt; DequeueAsync(CancellationToken cancellationToken);
}

// Channel-based Implementation (thread-safe, high performance)
public class BackgroundTaskQueue : IBackgroundTaskQueue
{
    private readonly Channel&lt;EmailTask&gt; _queue = Channel.CreateUnbounded&lt;EmailTask&gt;();

    public void Enqueue(EmailTask task) =&gt; _queue.Writer.TryWrite(task);

    public async Task&lt;EmailTask&gt; DequeueAsync(CancellationToken ct)
        =&gt; await _queue.Reader.ReadAsync(ct);
}

// Background Worker that processes the queue
public class EmailWorkerService : BackgroundService
{
    private readonly IBackgroundTaskQueue _queue;
    public EmailWorkerService(IBackgroundTaskQueue queue) { _queue = queue; }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            var task = await _queue.DequeueAsync(stoppingToken);
            Console.WriteLine($"Sending email to: {task.To}");
            // await _emailSender.SendAsync(task.To, task.Subject, task.Body);
        }
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why use Channel&lt;T&gt; over ConcurrentQueue for background tasks?</h4>
    <p><code>Channel&lt;T&gt;</code> provides async awaitable reading — <code>ReadAsync()</code> awaits without spinning or polling. <code>ConcurrentQueue</code> requires manual polling loops with <code>Thread.Sleep</code> or <code>Task.Delay</code>, wasting CPU cycles.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: How does graceful shutdown work in BackgroundService?</h4>
    <p>The host calls <code>IHostedService.StopAsync()</code> on SIGTERM/Ctrl+C, which triggers cancellation on the <code>CancellationToken</code> passed to <code>ExecuteAsync()</code>. Your service checks <code>stoppingToken.IsCancellationRequested</code> in its loop and exits cleanly.</p>
  </div>
</div>`;

makeLesson(44, '44-csharp-background-services-ihostedservice-worker-queues.html',
  'Background Services, Hosted Services & Worker Queues Masterclass',
  'Complete C# Background Services (Chapter 44): IHostedService, BackgroundService, Worker Services, scheduled background jobs, Channel<T> background queues, background email processing, retry policies, and graceful shutdown.',
  'Phase 16', 'Advanced .NET',
  'IHostedService · BackgroundService · Worker Services · Scheduled Jobs · Channel<T> Queue · Background Email · Retry Policies · Graceful Shutdown · CancellationToken',
  c44,
  '43-csharp-performance-span-memory-caching-gc-optimization.html', '43. Performance, Span<T>, Memory<T> & Caching',
  '45-csharp-signalr-real-time-hubs-chat-notifications.html', '45. SignalR Real-Time Communication & Chat'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 45: SignalR Real-Time
// ═══════════════════════════════════════════════════════════════════════════════
const c45 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 16 (Chapter 45): ASP.NET Core SignalR — Real-Time Hubs, Chat &amp; Live Notifications Masterclass</strong>! SignalR is Microsoft's real-time communication library for ASP.NET Core that enables servers to push data to connected clients instantly — without clients polling. Built on WebSockets (with SSE and Long Polling fallbacks), SignalR powers chat apps, live dashboards, stock tickers, collaborative editing, and notification systems.</p>
</div>

<div class="section-title"><span class="num">1</span>SignalR Architecture &amp; How It Works</div>
<div class="section-body">
  <div class="memory-diagram">SignalR Communication Model:

  Client Browser ──────── WebSocket Connection ────────── ASP.NET Core Server
       │                                                           │
       │ ── hub.SendMessage("Hello") ──────────────────────────&gt;  │
       │                                                      Hub.ReceiveMessage()
       │ &lt;── Clients.All.SendAsync("ReceiveMessage", msg) ────────  │
  All Clients receive message instantly!</div>
</div>

<div class="section-title"><span class="num">2</span>Creating a SignalR Hub</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — SignalR Chat Hub</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code">using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub
{
    // Called by a client when they send a message
    public async Task SendMessage(string user, string message)
    {
        // Broadcast to ALL connected clients
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    // Join a specific group (chat room)
    public async Task JoinRoom(string roomName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        await Clients.Group(roomName).SendAsync("ReceiveMessage", "System",
            Context.ConnectionId + " joined " + roomName);
    }

    // Send to specific group only
    public async Task SendToRoom(string roomName, string user, string message)
    {
        await Clients.Group(roomName).SendAsync("ReceiveMessage", user, message);
    }

    // Lifecycle events
    public override async Task OnConnectedAsync()
    {
        Console.WriteLine("Client connected: " + Context.ConnectionId);
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        Console.WriteLine("Client disconnected: " + Context.ConnectionId);
        await base.OnDisconnectedAsync(exception);
    }
}

// Program.cs — Register SignalR
builder.Services.AddSignalR();
app.MapHub&lt;ChatHub&gt;("/hubs/chat");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>JavaScript Client &amp; Live Dashboard</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">JavaScript — SignalR Chat Client</span>
    </div>
    <pre><code>// Install: npm install @microsoft/signalr
import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/chat")
    .withAutomaticReconnect()
    .build();

// Listen for messages from server
connection.on("ReceiveMessage", (user, message) =&gt; {
    const li = document.createElement("li");
    li.textContent = user + ": " + message;
    document.getElementById("messagesList").appendChild(li);
});

// Start connection
await connection.start();
console.log("SignalR connected!");

// Send message
document.getElementById("sendBtn").addEventListener("click", async () =&gt; {
    const user = document.getElementById("userInput").value;
    const message = document.getElementById("messageInput").value;
    await connection.invoke("SendMessage", user, message);
});</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Does SignalR always use WebSockets?</h4>
    <p>SignalR automatically negotiates the best transport available: WebSockets (preferred, full-duplex, lowest latency), Server-Sent Events (server-to-client only), or Long Polling (HTTP fallback for restrictive environments). You can force WebSockets-only via configuration.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: How does SignalR scale across multiple servers?</h4>
    <p>Use Azure SignalR Service or a Redis backplane to coordinate messages across multiple server instances. Without a backplane, clients connected to different server pods won't receive each other's messages.</p>
  </div>
</div>`;

makeLesson(45, '45-csharp-signalr-real-time-hubs-chat-notifications.html',
  'SignalR Real-Time Communication, Hubs & Chat Masterclass',
  'Complete ASP.NET Core SignalR (Chapter 45): Real-time communication architecture, Hub creation, broadcasting to all/groups/specific clients, JavaScript client, chat application, live notifications, dashboard, OnConnected/Disconnected events.',
  'Phase 16', 'Advanced .NET',
  'SignalR Architecture · Hub · Clients.All · Clients.Group · Groups · Broadcasting · JavaScript Client · Chat App · Live Notifications · WebSockets · Reconnect',
  c45,
  '44-csharp-background-services-ihostedservice-worker-queues.html', '44. Background Services & Worker Queues',
  '46-csharp-docker-deployment-github-actions-ci-cd.html', '46. Docker, Deployment, GitHub Actions & CI/CD'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 46: Deployment
// ═══════════════════════════════════════════════════════════════════════════════
const c46 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 17 (Chapter 46): Docker, Deployment, GitHub Actions CI/CD &amp; Health Checks Masterclass</strong>! Building an application is half the job. Deploying it reliably, consistently, and automatically is the other half. In this chapter, we master containerizing ASP.NET Core apps with Docker, writing Dockerfiles and docker-compose, setting up GitHub Actions CI/CD pipelines, configuring production environment variables, implementing Health Checks, and deploying to cloud platforms.</p>
</div>

<div class="section-title"><span class="num">1</span>Docker Ante Enti? — Containers vs VMs</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Aspect</th><th>Virtual Machine (VM)</th><th>Docker Container</th></tr></thead>
    <tbody>
      <tr><td>Size</td><td>Gigabytes (includes full OS)</td><td>Megabytes (shares host OS kernel)</td></tr>
      <tr><td>Startup Time</td><td>Minutes (boots entire OS)</td><td>Seconds (process isolation)</td></tr>
      <tr><td>Isolation Level</td><td>Complete hardware virtualization</td><td>Process-level namespace isolation</td></tr>
      <tr><td>Portability</td><td>Hypervisor-dependent</td><td>Runs identically on any Docker host</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Dockerfile for ASP.NET Core API</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Dockerfile — Multi-Stage Build for ASP.NET Core</span>
    </div>
    <pre><code># Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project file and restore dependencies
COPY ["ProductsAPI/ProductsAPI.csproj", "ProductsAPI/"]
RUN dotnet restore "ProductsAPI/ProductsAPI.csproj"

# Copy all source and build
COPY . .
WORKDIR "/src/ProductsAPI"
RUN dotnet build "ProductsAPI.csproj" -c Release -o /app/build

# Stage 2: Publish
FROM build AS publish
RUN dotnet publish "ProductsAPI.csproj" -c Release -o /app/publish

# Stage 3: Runtime (smallest possible final image)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 80
EXPOSE 443
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ProductsAPI.dll"]</code></pre>
  </div>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">YAML — docker-compose.yml</span>
    </div>
    <pre><code>version: '3.9'

services:
  api:
    build: .
    ports:
      - "5000:80"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - ConnectionStrings__DefaultConnection=Server=db;Database=ProductsDB;User Id=sa;Password=YourPass123!
    depends_on:
      - db

  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=YourPass123!
    ports:
      - "1433:1433"
    volumes:
      - sqldata:/var/opt/mssql

volumes:
  sqldata:</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>GitHub Actions CI/CD Pipeline</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">YAML — .github/workflows/ci.yml</span>
    </div>
    <pre><code">name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-test-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Setup .NET 8
      uses: actions/setup-dotnet@v4
      with:
        dotnet-version: '8.0.x'

    - name: Restore dependencies
      run: dotnet restore

    - name: Build
      run: dotnet build --no-restore -c Release

    - name: Run Tests
      run: dotnet test --no-build -c Release --verbosity normal

    - name: Build Docker Image
      run: docker build -t productsapi:latest .

    - name: Deploy to Azure App Service
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'my-productsapi'
        publish-profile: DOLLAR{{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        images: 'productsapi:latest'</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Health Checks &amp; Monitoring</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Health Checks Registration</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// Register health checks
builder.Services.AddHealthChecks()
    .AddDbContextCheck&lt;AppDbContext&gt;()       // Checks DB connectivity
    .AddUrlGroup(new Uri("https://api.github.com"), "GitHub"); // External dependency

// Map health endpoints
app.MapHealthChecks("/health");              // Simple: healthy/unhealthy
app.MapHealthChecks("/health/detailed", new HealthCheckOptions
{
    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
}); // Detailed JSON report</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why use multi-stage Docker builds?</h4>
    <p>Multi-stage builds use the full .NET SDK (large image ~800MB) only during the build stage, then copy the compiled output to a minimal ASP.NET runtime image (~200MB) for the final container. This drastically reduces image size, attack surface, and deployment time.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: How do I manage secrets (connection strings, API keys) in Docker?</h4>
    <p>Never hardcode secrets in Dockerfiles or docker-compose.yml committed to Git. Use environment variables injected at runtime, Docker Secrets, Kubernetes Secrets, or Azure Key Vault. Use GitHub Actions Secrets for CI/CD pipeline credentials.</p>
  </div>
</div>`;

makeLesson(46, '46-csharp-docker-deployment-github-actions-ci-cd.html',
  'Docker, Deployment, GitHub Actions & CI/CD Masterclass',
  'Complete C# Deployment (Chapter 46): Docker containers vs VMs, Dockerfile multi-stage builds, docker-compose for API + SQL Server, GitHub Actions CI/CD pipeline, build/test/deploy workflow, Health Checks, HTTPS, environment variables.',
  'Phase 17', 'Deployment & Cloud',
  'Docker · Dockerfile Multi-Stage · docker-compose · GitHub Actions · CI/CD Pipeline · Build & Test · Health Checks · Environment Variables · Azure App Service',
  c46,
  '45-csharp-signalr-real-time-hubs-chat-notifications.html', '45. SignalR Real-Time Communication & Chat',
  '47-csharp-azure-cloud-app-service-sql-key-vault-insights.html', '47. Azure Cloud, App Service & Application Insights'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 47: Azure Basics
// ═══════════════════════════════════════════════════════════════════════════════
const c47 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 17 (Chapter 47): Azure Cloud Basics — App Service, Azure SQL, Key Vault, Application Insights &amp; Scaling Masterclass</strong>! Microsoft Azure is the cloud platform most tightly integrated with .NET and ASP.NET Core. In this final chapter, we explore core Azure services for .NET developers: Azure App Service (PaaS web hosting), Azure SQL Database, Azure Blob Storage, Key Vault for secret management, Application Insights for telemetry and performance monitoring, Managed Identity, and horizontal scaling.</p>
</div>

<div class="section-title"><span class="num">1</span>Azure Services Overview for .NET Developers</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Azure Service</th><th>Purpose</th><th>.NET Integration</th></tr></thead>
    <tbody>
      <tr><td><strong>Azure App Service</strong></td><td>PaaS hosting for ASP.NET Core web apps and APIs</td><td>Deploy via GitHub Actions, Azure CLI, or VS publish</td></tr>
      <tr><td><strong>Azure SQL Database</strong></td><td>Managed SQL Server in the cloud with auto-backups</td><td>EF Core with SqlServer provider + connection string</td></tr>
      <tr><td><strong>Azure Blob Storage</strong></td><td>Store unstructured data (files, images, videos)</td><td>Azure.Storage.Blobs NuGet package</td></tr>
      <tr><td><strong>Azure Key Vault</strong></td><td>Centralized secret/certificate/key management</td><td>Azure.Extensions.AspNetCore.Configuration.Secrets</td></tr>
      <tr><td><strong>Application Insights</strong></td><td>APM: request tracing, exceptions, performance metrics</td><td>Microsoft.ApplicationInsights.AspNetCore NuGet</td></tr>
      <tr><td><strong>Managed Identity</strong></td><td>App authenticates to Azure services without credentials</td><td>Azure.Identity DefaultAzureCredential</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Azure Key Vault &amp; Managed Identity</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Terminal &amp; C# — Azure Key Vault Setup</span>
    </div>
    <pre><code># Install packages
dotnet add package Azure.Extensions.AspNetCore.Configuration.Secrets
dotnet add package Azure.Identity

# Create Key Vault and add secret via Azure CLI
az keyvault create --name "MyAppKeyVault" --resource-group "MyRG" --location "EastUS"
az keyvault secret set --vault-name "MyAppKeyVault" --name "SqlConnectionString" --value "Server=..."</code></pre>
  </div>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Load Secrets from Key Vault in Program.cs</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// Program.cs — Azure Key Vault with Managed Identity (no credentials needed!)
var keyVaultUri = new Uri(builder.Configuration["KeyVaultUri"]!);

builder.Configuration.AddAzureKeyVault(
    keyVaultUri,
    new DefaultAzureCredential()); // Uses Managed Identity in Azure, dev credentials locally

// Now access Key Vault secrets like any config value:
var connectionString = builder.Configuration["SqlConnectionString"];</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Application Insights — Telemetry &amp; Performance Monitoring</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Application Insights Setup</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// dotnet add package Microsoft.ApplicationInsights.AspNetCore

// Program.cs — One-line registration
builder.Services.AddApplicationInsightsTelemetry();

// appsettings.json
{
  "ApplicationInsights": {
    "InstrumentationKey": "your-key-here"
  }
}

// Custom telemetry in your services
public class ProductService
{
    private readonly TelemetryClient _telemetry;

    public ProductService(TelemetryClient telemetry) { _telemetry = telemetry; }

    public async Task CreateProductAsync(Product product)
    {
        _telemetry.TrackEvent("ProductCreated", new Dictionary&lt;string, string&gt;
        {
            ["ProductId"]   = product.Id.ToString(),
            ["ProductName"] = product.Name,
            ["Category"]    = product.Category
        });
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Azure Blob Storage — File Upload</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Azure Blob Storage File Upload</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code">// dotnet add package Azure.Storage.Blobs

public class BlobStorageService
{
    private readonly BlobContainerClient _container;

    public BlobStorageService(IConfiguration config)
    {
        var client = new BlobServiceClient(config["AzureStorage:ConnectionString"]);
        _container = client.GetBlobContainerClient("product-images");
        _container.CreateIfNotExists(PublicAccessType.Blob);
    }

    public async Task&lt;string&gt; UploadImageAsync(IFormFile file)
    {
        var blobName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var blobClient = _container.GetBlobClient(blobName);

        await using var stream = file.OpenReadStream();
        await blobClient.UploadAsync(stream, overwrite: true);

        return blobClient.Uri.ToString(); // Public URL of uploaded image
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is Managed Identity and why is it better than storing credentials?</h4>
    <p>Managed Identity gives your Azure App Service an automatically managed identity in Azure Active Directory. Your app can authenticate to Azure services (Key Vault, SQL, Storage) without any stored credentials in config files or environment variables — eliminating credential rotation overhead and credential leak risks.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: How do Azure App Service Deployment Slots work?</h4>
    <p>Deployment Slots are live production-like environments (staging, preview) within the same App Service Plan. You deploy to the staging slot, verify the release, then perform a zero-downtime "swap" to production — with instant rollback by swapping back.</p>
  </div>
  <div class="faq-card">
    <h4>Q3: What is the next step after completing this C# masterclass?</h4>
    <p>You are now a proficient C# &amp; ASP.NET Core developer! Next steps: build a portfolio project (e-commerce API, social network API), contribute to open-source .NET projects, explore gRPC for microservices, learn Blazor for full-stack C#, and prepare for AZ-204 (Azure Developer) or Microsoft certifications.</p>
  </div>
</div>`;

makeLesson(47, '47-csharp-azure-cloud-app-service-sql-key-vault-insights.html',
  'Azure Cloud, App Service, Key Vault & Application Insights Masterclass',
  'Complete Azure Basics for .NET (Chapter 47): Azure App Service, Azure SQL Database, Azure Blob Storage, Key Vault secret management, Application Insights telemetry, Managed Identity, Deployment Slots, scaling, and next learning steps.',
  'Phase 17', 'Deployment & Cloud',
  'Azure App Service · Azure SQL · Azure Blob Storage · Azure Key Vault · Application Insights · Managed Identity · DefaultAzureCredential · Deployment Slots · Scaling',
  c47,
  '46-csharp-docker-deployment-github-actions-ci-cd.html', '46. Docker, Deployment, GitHub Actions & CI/CD',
  null, null
);

console.log('\n🎉 ALL C# PHASES 15-17 (CHAPTERS 41–47) GENERATED SUCCESSFULLY!');
