// Phase 12: Automation and Professional Skills Data
module.exports = [
  // =========================================================================
  // CHAPTER 60: WEB SCRAPING & BROWSER AUTOMATION
  // =========================================================================
  {
    num: 60,
    phaseId: 'phase12',
    phaseTitle: 'Phase 12: Automation and Professional Skills',
    slug: '60-python-web-scraping-and-browser-automation',
    title: 'Web Scraping & Browser Automation',
    badge: '60. Web Scraping & Automation',
    subtopics: 'HTML DOM Structure · BeautifulSoup4 Parsing · CSS Selectors · Browser Automation (Selenium/Playwright) · Headless Chrome · Rate Limiting & Ethical Scraping',
    desc: 'Master automated data extraction from the web in Python: understanding the HTML DOM tree, parsing web pages with BeautifulSoup4, navigating CSS selectors, automating browser interactions with Selenium/Playwright in headless mode, and respecting robots.txt guidelines.',
    sections: [
      {
        title: '1. What is Web Scraping & HTML DOM Parsing with BeautifulSoup4?',
        body: `<p><strong>Web Scraping</strong> is the automated extraction of data from websites. While web APIs provide structured JSON endpoints, over 90% of the world's public internet data exists as raw HTML web pages.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">Why is Web Scraping Useful?</h4>
        <ul>
          <li><strong>Competitive Price Monitoring:</strong> Tracking e-commerce product prices and inventory across Amazon, Flipkart, and eBay.</li>
          <li><strong>Financial & Stock Analysis:</strong> Extracting quarterly earnings reports, market news, and sentiment indicators.</li>
          <li><strong>Lead Generation & Research:</strong> Aggregating job listings, real estate properties, and academic research papers.</li>
        </ul>

        <h4 style="color:#10b981; margin:16px 0 8px;">The HTML DOM Tree & CSS Selectors:</h4>
        <p>A web page is structured as a hierarchical <strong>DOM (Document Object Model) Tree</strong>. <strong>BeautifulSoup4</strong> parses raw HTML text into a searchable Python object tree.</p>

        <div class="diagram-box">┌────────────────────────────────────────────────────────────────────────┐
│                     THE WEB SCRAPING PIPELINE                          │
├────────────────────────────────────────────────────────────────────────┤
│  1. HTTP Request (requests.get(url, headers=UserAgent))                │
│         │                                                              │
│         ▼                                                              │
│  2. Raw HTML Response (response.text)                                  │
│         │                                                              │
│         ▼                                                              │
│  3. BeautifulSoup DOM Parser (soup = BeautifulSoup(html, 'html.parser')│
│         │                                                              │
│         ├── soup.select('div.product-card')   <-- CSS Selector Match   │
│         ├── soup.find('h2', class_='title')   <-- Tag Search           │
│         └── tag.get_text(strip=True)          <-- Clean String Extract │
│         │                                                              │
│         ▼                                                              │
│  4. Structured Data Output (Pandas DataFrame / CSV / SQLite)           │
└────────────────────────────────────────────────────────────────────────┘</div>`,
        code: `# Web Scraping & HTML DOM Parsing Simulation:
from html.parser import HTMLParser

raw_html_mock = """
<div class="product-catalog">
    <div class="product-card" data-id="101">
        <h2 class="title">Mechanical Keyboard</h2>
        <span class="price">₹2,499.00</span>
        <span class="badge in-stock">In Stock</span>
    </div>
    <div class="product-card" data-id="102">
        <h2 class="title">4K Monitor 27-inch</h2>
        <span class="price">₹28,999.00</span>
        <span class="badge out-of-stock">Out of Stock</span>
    </div>
</div>
"""

class SimpleDOMScraper(HTMLParser):
    """Parses HTML mock text into structured product dictionaries."""
    def __init__(self):
        super().__init__()
        self.products = []
        self.current_tag = None
        self.current_item = {}

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        attr_dict = dict(attrs)
        if attr_dict.get("class") == "product-card":
            self.current_item = {"id": attr_dict.get("data-id")}

    def handle_data(self, data):
        text = data.strip()
        if text:
            if self.current_tag == "h2":
                self.current_item["title"] = text
            elif self.current_tag == "span" and "₹" in text:
                self.current_item["price"] = text
            elif self.current_tag == "span" and ("Stock" in text):
                self.current_item["status"] = text
                if "title" in self.current_item:
                    self.products.append(self.current_item.copy())

# Execute Scraper:
scraper = SimpleDOMScraper()
scraper.feed(raw_html_mock)

print("--- 🛒 Scraped Product Catalog Output ---")
for p in scraper.products:
    print(f"• ID #{p['id']}: {p['title']:22} | Price: {p['price']:>10} | Availability: {p['status']}")`,
        codeTitle: 'Example 1: HTML DOM Parsing and Text Extraction',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Line-by-Line Breakdown:</strong>
          <ol style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>requests.get(url, headers={'User-Agent': 'Mozilla/5.0...'})</code>: Fetches the raw HTML string over HTTPS, providing a realistic browser user-agent header.</li>
            <li><code>soup.select('div.product-card')</code>: Uses standard CSS selector syntax (dot notation for classes, hash for IDs) to find all matching card containers.</li>
            <li><code>item.get_text(strip=True)</code>: Extracts human-readable text while stripping out all surrounding whitespace and HTML tags.</li>
          </ol>
        </div>`
      },
      {
        title: '2. Browser Automation with Selenium & Playwright (Dynamic JavaScript Sites)',
        body: `<p>Static scrapers (like <code>requests + BeautifulSoup</code>) can only read the initial static HTML sent by the server. If a website is built with <strong>React, Vue, or Angular</strong> (where content loads dynamically via client-side JavaScript API calls or infinite scrolling), static scrapers see only an empty <code>&lt;div id="root"&gt;&lt;/div&gt;</code>!</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">The Solution: Headless Browser Automation (Selenium / Playwright):</h4>
        <p>Browser automation tools launch a real, automated Chrome/Firefox browser engine in the background (<strong>Headless Mode</strong> without a visible UI window), execute all client-side JavaScript, click buttons, fill login forms, and wait for elements to appear.</p>`,
        code: `# Playwright & Selenium Headless Automation Pattern Reference:
"""
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 1. Configure Headless Chrome Browser:
chrome_options = Options()
chrome_options.add_argument("--headless=new") # Run in background without window
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")

# 2. Launch WebDriver:
driver = webdriver.Chrome(options=chrome_options)

try:
    # 3. Navigate to dynamic web page:
    driver.get("https://example.com/login")

    # 4. Explicit Wait: Wait up to 10 seconds for dynamic element to render:
    username_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.NAME, "username"))
    )

    # 5. Type credentials and click login:
    username_input.send_keys("balaji_dev")
    driver.find_element(By.NAME, "password").send_keys("SecretPass2026")
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

    # 6. Capture full rendered page source or take screenshot:
    driver.save_screenshot("dashboard_verified.png")
    print("✅ Successfully logged in and captured screenshot!")

finally:
    driver.quit() # Always close browser process to free RAM!
"""
print("Browser Automation Blueprint Configured.")`,
        codeTitle: 'Reference: Selenium Headless Browser Automation Architecture',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Explicit vs Implicit Waits:</strong>
          <p style="margin-top:6px;">Never use hardcoded <code>time.sleep(5)</code> in automation scripts (it slows down execution). Always use <strong>Explicit Waits</strong> (<code>WebDriverWait</code>) which poll the DOM every 500ms and resume execution the exact millisecond the element appears.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Scraping Websites at Maximum Speed Without Rate Limiting (Getting IP Banned)',
      text: 'Firing hundreds of requests per second will trigger Cloudflare/Akamai rate limiters and result in an instant 429 Too Many Requests status or permanent IP address ban. Always insert random delays (time.sleep(random.uniform(1.0, 3.0))) and check the site\'s robots.txt file.'
    },
    tryIt: {
      desc: 'Write a regex or string extraction function parse_links(html_text) that extracts all href URLs from <a> tags.',
      code: `import re

sample_html = '''
<nav>
  <a href="/home">Home</a>
  <a href="/courses">Courses</a>
  <a href="https://github.com/balaji">GitHub Profile</a>
</nav>
'''

links = re.findall(r'href="([^"]+)"', sample_html)
print("Extracted Hyperlinks:")
for link in links:
    print("•", link)`
    },
    faqs: [
      {
        q: 'What is robots.txt in web scraping?',
        a: 'robots.txt is a text file located at the root of a domain (e.g. example.com/robots.txt) specifying which directories crawlers and scrapers are permitted (Allow) or forbidden (Disallow) to scrape.'
      },
      {
        q: 'How does Playwright compare to Selenium in 2026?',
        a: 'Playwright (by Microsoft) is significantly faster, supports modern async/await syntax out of the box, handles automatic waiting natively, and can intercept network requests and mock API responses with ease.'
      },
      {
        q: 'How do I bypass Cloudflare bot detection in web scraping?',
        a: 'Use realistic browser headers (including User-Agent, Accept-Language, Sec-Ch-Ua), manage request delays, solve captchas using human-in-the-loop services, or use undetected-chromedriver / stealth plugins.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 61: FILE, PDF, EXCEL, EMAIL & IMAGE AUTOMATION
  // =========================================================================
  {
    num: 61,
    phaseId: 'phase12',
    phaseTitle: 'Phase 12: Automation and Professional Skills',
    slug: '61-python-automation-excel-pdf-email-images',
    title: 'File & Media Automation',
    badge: '61. File, PDF & Email Automation',
    subtopics: 'Excel Automation (openpyxl) · PDF Manipulation (pypdf) · Image Processing (Pillow/PIL) · Automated Email Dispatch (smtplib & MIME)',
    desc: 'Master multi-format office and media automation in Python: manipulating Excel spreadsheets with openpyxl, extracting text and merging PDFs with pypdf, batch resizing and filtering images with Pillow (PIL), and sending automated rich HTML emails with attachments via smtplib.',
    sections: [
      {
        title: '1. Automated Excel Spreadsheet Processing with openpyxl',
        body: `<p>Excel is the universal language of business. The <strong><code>openpyxl</code></strong> package allows Python scripts to read, modify, format, apply Excel formulas, and generate automated financial workbooks without installing Microsoft Office.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">The openpyxl Hierarchy:</h4>
        <ul>
          <li><strong>Workbook:</strong> The entire <code>.xlsx</code> file in memory.</li>
          <li><strong>Worksheet (Sheet):</strong> A specific tab within the workbook (e.g. <code>wb['Q1_Sales']</code>).</li>
          <li><strong>Cell:</strong> An individual coordinate (e.g. <code>sheet['B4']</code> or <code>sheet.cell(row=4, column=2)</code>) holding values, formulas (<code>=SUM(B2:B10)</code>), and font formatting.</li>
        </ul>`,
        code: `# Excel Automation Simulation: Generating an Automated Financial Report
def generate_excel_financial_report(sales_data):
    """Simulates openpyxl workbook creation and formula computation."""
    workbook = {"title": "Q3_Financial_Summary.xlsx", "rows": []}
    
    # 1. Header row:
    headers = ["Transaction ID", "Client Name", "Product", "Gross Amount (INR)", "GST (18%)", "Total Payable"]
    workbook["rows"].append(headers)

    # 2. Populate transaction rows with automated formula calculation:
    for idx, (client, product, gross) in enumerate(sales_data, start=1001):
        gst = round(gross * 0.18, 2)
        total = round(gross + gst, 2)
        workbook["rows"].append([f"INV#{idx}", client, product, f"₹{gross:,.2f}", f"₹{gst:,.2f}", f"₹{total:,.2f}"])

    return workbook

sample_sales = [
    ("TechCorp India", "Cloud Enterprise License", 150000.0),
    ("Apex Dynamics",  "Cybersecurity Audit",       85000.0),
    ("InnovateLabs",   "AI Training Platform",      220000.0)
]

report = generate_excel_financial_report(sample_sales)
print(f"--- 📊 Automated Excel Workbook Generated: [{report['title']}] ---")
for r in report["rows"]:
    print(f"{r[0]:<10} {r[1]:<18} {r[2]:<26} {r[3]:<16} {r[4]:<12} {r[5]:<14}")`,
        codeTitle: 'Example 1: Automated Financial Excel Spreadsheet Generation',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Real openpyxl Syntax:</strong>
          <p style="margin-top:6px;">In openpyxl: <code>import openpyxl; wb = openpyxl.Workbook(); ws = wb.active; ws.append(['Name', 'Sales']); ws['B5'] = '=SUM(B2:B4)'; wb.save('report.xlsx')</code>.</p>
        </div>`
      },
      {
        title: '2. PDF Manipulation, Image Processing (Pillow) & Automated Emailing',
        body: `<p>Python provides mature standard libraries and third-party packages for complete media pipeline automation:</p>
        <ul>
          <li><strong>PDF Processing (<code>pypdf</code> / <code>pdfplumber</code>):</strong> Extract text from contracts, merge multiple PDF files, rotate pages, and encrypt documents with passwords.</li>
          <li><strong>Image Processing (<code>Pillow / PIL</code>):</strong> Batch resize photos, crop banners, apply watermarks, convert PNG to WebP/JPEG, and compress images for web publishing.</li>
          <li><strong>Email Automation (<code>smtplib</code> & <code>email.mime</code>):</strong> Connects to SMTP servers (Gmail, SendGrid, Amazon SES) to send automated transactional HTML emails with PDF invoice attachments.</li>
        </ul>`,
        code: `# Automated Email Dispatch Pipeline Simulation:
import datetime

class AutomatedEmailDispatcher:
    """Simulates sending rich HTML emails with attachments via SMTP."""
    
    def __init__(self, smtp_server="smtp.gmail.com", port=587):
        self.server = smtp_server
        self.port = port

    def send_invoice_email(self, recipient_email, customer_name, invoice_id, amount, attachment_file):
        """Constructs MIME multipart message and sends via SMTP."""
        email_payload = {
            "To": recipient_email,
            "From": "billing@ourcompiler.com",
            "Subject": f"Invoice #{invoice_id} from Our Compiler — Paid Successfully",
            "Date": datetime.datetime.now().strftime("%a, %d %b %Y %H:%M:%S"),
            "Attachment": attachment_file,
            "HTML_Body": f"""
            <html>
              <body>
                <h2>Dear {customer_name},</h2>
                <p>Thank you for your business! Your payment of <strong>₹{amount:,.2f}</strong> has been processed successfully.</p>
                <p>Your official tax invoice <strong>{attachment_file}</strong> is attached to this email.</p>
                <br>
                <p>Best regards,<br><strong>Our Compiler Billing Team</strong></p>
              </body>
            </html>
            """
        }
        print(f"📧 [SMTP DISPATCH] Sent Email to {recipient_email} with attachment: '{attachment_file}'")
        return email_payload

# Run Email Dispatcher Demo:
dispatcher = AutomatedEmailDispatcher()
res = dispatcher.send_invoice_email(
    recipient_email="balaji.dev@example.com",
    customer_name="Balaji",
    invoice_id="INV-2026-894",
    amount=1499.00,
    attachment_file="Invoice_INV-2026-894.pdf"
)`,
        codeTitle: 'Example 2: Automated Transactional Email Dispatcher with PDF Attachment',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 SMTP Security with TLS:</strong>
          <p style="margin-top:6px;">In production Python, use <code>server = smtplib.SMTP('smtp.gmail.com', 587); server.starttls()</code> to encrypt credentials with Transport Layer Security (TLS) before sending passwords.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Hardcoding Email Passwords Directly in Scripts',
      text: 'Never write raw email passwords in Python code. When using Gmail, generate an App Password from Google Security settings and load it via os.getenv("EMAIL_APP_PASSWORD").'
    },
    tryIt: {
      desc: 'Write an image thumbnail calculator function get_thumbnail_size(width, height, max_size=300) that maintains the original aspect ratio.',
      code: `def get_thumbnail_size(width, height, max_size=300):
    ratio = min(max_size / width, max_size / height)
    return int(width * ratio), int(height * ratio)

print("Original 1920x1080 -> Thumbnail:", get_thumbnail_size(1920, 1080))
print("Original 800x1200  -> Thumbnail:", get_thumbnail_size(800, 1200))`
    },
    faqs: [
      {
        q: 'Which library is best for extracting tables from PDFs in Python?',
        a: 'pdfplumber is the gold standard for extracting complex tabular data from PDF files, while pypdf is optimal for merging, splitting, and rotating PDF pages.'
      },
      {
        q: 'How do I convert an image format from PNG to WebP in Pillow?',
        a: 'Open with img = Image.open("photo.png") and save with img.save("photo.webp", "WEBP", quality=85, optimize=True).'
      },
      {
        q: 'What is the difference between openpyxl and Pandas for Excel files?',
        a: 'Pandas (pd.read_excel) is optimized for loading tabular numeric data into DataFrames for analysis. openpyxl is designed for cell-level formatting, styling, charts, and formulas.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 62: OS AUTOMATION, LOGGING & CONFIGURATION
  // =========================================================================
  {
    num: 62,
    phaseId: 'phase12',
    phaseTitle: 'Phase 12: Automation and Professional Skills',
    slug: '62-python-os-automation-logging-and-config',
    title: 'OS Automation & Logging',
    badge: '62. OS Automation & Logging',
    subtopics: 'Automated Directory Organizers · Task Scheduling (schedule) · Production Logging (logging module, RotatingFileHandler) · Config Files (TOML, YAML, .env)',
    desc: 'Master operating system automation, task scheduling, and production-grade logging in Python: organizing cluttered directories automatically, scheduling recurring jobs, implementing the standard logging module with RotatingFileHandlers, and managing configuration files with TOML and .env.',
    sections: [
      {
        title: '1. Automated File System Cleanup & Directory Organization',
        body: `<p>One of the most practical everyday automations in Python is an <strong>Intelligent File Organizer</strong> that monitors your Downloads or Desktop directory and automatically sorts files into dedicated subfolders based on extension type (Documents, Images, Archives, Code, Videos).</p>`,
        code: `# Intelligent Directory Organizer Pipeline:
import os
from pathlib import Path

FILE_CATEGORIES = {
    "Documents": [".pdf", ".docx", ".txt", ".xlsx", ".pptx"],
    "Images":    [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"],
    "Archives":  [".zip", ".tar", ".gz", ".rar", ".7z"],
    "Code":      [".py", ".js", ".html", ".css", ".json", ".sql"],
    "Videos":    [".mp4", ".mkv", ".mov", ".avi"]
}

def classify_file(filename):
    ext = Path(filename).suffix.lower()
    for category, extensions in FILE_CATEGORIES.items():
        if ext in extensions:
            return category
    return "Other"

# Simulate sorting cluttered files:
mock_download_folder = [
    "Machine_Learning_Notes.pdf",
    "avatar_profile.png",
    "backup_2026_08_14.zip",
    "main_script.py",
    "tutorial_video.mp4",
    "financial_budget.xlsx",
    "random_unknown_file.xyz"
]

print("--- 🗂️ Automated File Sorting & Classification Output ---")
for file in mock_download_folder:
    dest_folder = classify_file(file)
    print(f"• Moving: '{file:28}' ──► 📁 [{dest_folder}/]")`,
        codeTitle: 'Example 1: Intelligent File Organizer by Extension Category',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 shutil.move() Integration:</strong>
          <p style="margin-top:6px;">In real OS scripts, combine <code>Path(dest_dir).mkdir(exist_ok=True)</code> with <code>shutil.move(src_path, dest_path)</code> to create destination folders and move files on disk.</p>
        </div>`
      },
      {
        title: '2. Production Logging (logging module) vs print()',
        body: `<p>In professional production systems, <strong>never use <code>print()</code> for application monitoring</strong>! <code>print()</code> lacks timestamps, severity levels, log file rotation, and cannot be filtered dynamically.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">The 5 Standard Python Logging Levels:</h4>
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>Level</th><th>Numeric Value</th><th>When to Use</th></tr>
          <tr><td><code>DEBUG</code></td><td>10</td><td>Detailed diagnostic information for developers during debugging.</td></tr>
          <tr><td><code>INFO</code></td><td>20</td><td>Confirmation that normal operational milestones are proceeding as expected.</td></tr>
          <tr><td><code>WARNING</code></td><td>30</td><td>Indication of something unexpected or a runtime warning (e.g. low disk space).</td></tr>
          <tr><td><code>ERROR</code></td><td>40</td><td>A serious problem that prevented a specific operation from executing.</td></tr>
          <tr><td><code>CRITICAL</code></td><td>50</td><td>A fatal error causing the entire program or service to terminate immediately.</td></tr>
        </table>`,
        code: `import logging
import sys

# 1. Configure production-standard Logger with Formatter:
logger = logging.getLogger("OurCompilerApp")
logger.setLevel(logging.DEBUG)

# Create console handler with structured format:
console_handler = logging.StreamHandler(sys.stdout)
formatter = logging.Formatter("[%(asctime)s] [%(levelname)-8s] [%(name)s]: %(message)s", datefmt="%Y-%m-%d %H:%M:%S")
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

# 2. Log events across all severity levels:
logger.debug("Connecting to Redis cache on 127.0.0.1:6379...")
logger.info("Database connection established successfully.")
logger.warning("Memory usage exceeded 75% threshold.")
logger.error("Failed to process payment for user #9412: Bank gateway timeout.")
logger.critical("Primary database server unreachable! Failing over to replica...")`,
        codeTitle: 'Example 2: Production Structured Logging with Severity Levels',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 RotatingFileHandler Power:</strong>
          <p style="margin-top:6px;">Use <code>logging.handlers.RotatingFileHandler("app.log", maxBytes=10*1024*1024, backupCount=5)</code> to ensure log files never grow infinitely and consume all disk space.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Leaving DEBUG Logging Active in High-Traffic Production Environments',
      text: 'Writing verbose DEBUG logs on every single web request generates gigabytes of disk I/O, slowing down server response times. Always set logger.setLevel(logging.INFO) or logging.WARNING in production.'
    },
    tryIt: {
      desc: 'Build a configuration loader function load_app_config(env_mode) that returns production or development settings based on an input string.',
      code: `def load_app_config(env_mode="development"):
    if env_mode == "production":
        return {"debug": False, "db": "postgresql://prod_db:5432", "log_level": "WARNING"}
    return {"debug": True, "db": "sqlite:///:memory:", "log_level": "DEBUG"}

print("Development Config:", load_app_config("development"))
print("Production Config: ", load_app_config("production"))`
    },
    faqs: [
      {
        q: 'What is the schedule library in Python?',
        a: 'The schedule library is a clean, human-readable job scheduling package: schedule.every().day.at("10:30").do(job) or schedule.every(10).minutes.do(backup).'
      },
      {
        q: 'Why should I use TOML or YAML over JSON for configuration files?',
        a: 'TOML and YAML support inline comments (# comment), multi-line strings, and clean human-friendly indentation, making them superior for developer configuration files.'
      },
      {
        q: 'What does python-dotenv do?',
        a: 'python-dotenv reads key-value pairs from a local .env file and automatically injects them into os.environ at application startup.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 63: TESTING WITH PYTEST & INTERACTIVE DEBUGGING
  // =========================================================================
  {
    num: 63,
    phaseId: 'phase12',
    phaseTitle: 'Phase 12: Automation and Professional Skills',
    slug: '63-python-unit-testing-pytest-and-debugging',
    title: 'Testing, Pytest & Debugging',
    badge: '63. Pytest & Debugging',
    subtopics: 'Unit vs Integration Testing · pytest Test Runner · Test Fixtures (@pytest.fixture) · Parametrization · Mocking Dependencies · Debugging with breakpoint()',
    desc: 'Master automated software testing and debugging in Python: the difference between unit and integration tests, writing clean tests with pytest, leveraging reusable test fixtures, parameterized testing, mocking external network APIs, and interactive debugging with breakpoint().',
    sections: [
      {
        title: '1. Unit Testing vs Integration Testing & The Pytest Framework',
        body: `<p>Automated software testing guarantees that code changes and refactoring do not introduce regression bugs.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">Unit Tests vs Integration Tests:</h4>
        <ul>
          <li><strong>Unit Tests:</strong> Test a single isolated function or class in memory with all external dependencies (databases, APIs) mocked out. They execute in milliseconds.</li>
          <li><strong>Integration Tests:</strong> Test how multiple components work together (e.g. testing whether a Flask route properly writes a record to a real PostgreSQL database).</li>
        </ul>

        <h4 style="color:#10b981; margin:16px 0 8px;">Why Pytest is the Industry Standard:</h4>
        <p>Unlike Python\'s built-in <code>unittest</code> module which requires verbose classes and methods like <code>self.assertEqual(a, b)</code>, <strong>pytest</strong> uses standard Python functions and plain <code>assert</code> statements with rich, detailed error diffs!</p>`,
        code: `# Production Pytest Test Suite Architecture Blueprint:
"""
import pytest
from banking import BankAccount

# 1. Reusable Test Fixture:
@pytest.fixture
def active_account():
    # Setup: Create a fresh test account before each test
    account = BankAccount(owner="Balaji", initial_balance=5000.0)
    return account

# 2. Unit Test using standard assert statements:
def test_initial_balance(active_account):
    assert active_account.balance == 5000.0
    assert active_account.owner == "Balaji"

def test_deposit_funds(active_account):
    active_account.deposit(2000.0)
    assert active_account.balance == 7000.0

def test_withdraw_insufficient_funds_raises_error(active_account):
    with pytest.raises(ValueError, match="Insufficient funds"):
        active_account.withdraw(10000.0) # Attempting to overdraft!

# 3. Parameterized Testing: Run multiple test cases with one function!
@pytest.mark.parametrize("deposit_amount, expected_balance", [
    (500.0, 5500.0),
    (1500.0, 6500.0),
    (10000.0, 15000.0)
])
def test_multiple_deposits(active_account, deposit_amount, expected_balance):
    active_account.deposit(deposit_amount)
    assert active_account.balance == expected_balance
"""
print("Pytest Test Suite Blueprint Configured.")`,
        codeTitle: 'Blueprint: Pytest Fixtures, Assertions, and Parametrization',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Why @pytest.fixture is Powerful:</strong>
          <p style="margin-top:6px;">Fixtures ensure clean test isolation: each test function receives a freshly instantiated, pristine object, preventing state pollution between consecutive test runs.</p>
        </div>`
      },
      {
        title: '2. Interactive Debugging with Python\'s Built-in breakpoint() & pdb',
        body: `<p>Python 3.7+ introduced the built-in <strong><code>breakpoint()</code></strong> function. Calling <code>breakpoint()</code> anywhere in your code pauses execution and opens an interactive <strong>Python Debugger (PDB)</strong> shell right in your terminal!</p>
        
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>PDB Command</th><th>Short</th><th>Action / Meaning</th></tr>
          <tr><td><code>next</code></td><td><code>n</code></td><td>Execute the current line and advance to the next line.</td></tr>
          <tr><td><code>step</code></td><td><code>s</code></td><td>Step <em>into</em> the function call on the current line.</td></tr>
          <tr><td><code>continue</code></td><td><code>c</code></td><td>Resume normal program execution until the next breakpoint.</td></tr>
          <tr><td><code>print(var)</code></td><td><code>p var</code></td><td>Inspect the current runtime value of any variable.</td></tr>
          <tr><td><code>quit</code></td><td><code>q</code></td><td>Terminate the debugging session and exit Python.</td></tr>
        </table>`,
        code: `# Demonstrating Interactive Debugging Execution Flow:
def compute_discounted_cart(items, discount_pct):
    total = 0.0
    for item in items:
        price = item["price"]
        qty = item["qty"]
        # breakpoint()  <-- Un-commenting this pauses execution and drops into PDB shell!
        subtotal = price * qty
        total += subtotal
    
    final_amount = total * (1 - (discount_pct / 100))
    return final_amount

sample_cart = [
    {"name": "Python Book", "price": 899.0, "qty": 2},
    {"name": "USB Hub",     "price": 1299.0, "qty": 1}
]

total_charge = compute_discounted_cart(sample_cart, 10)
print(f"Final Discounted Cart Total: ₹{total_charge:,.2f}")`,
        codeTitle: 'Example 2: Interactive Debugging Flow with breakpoint()',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 PDB vs Print Debugging:</strong>
          <p style="margin-top:6px;">With <code>breakpoint()</code>, you can dynamically modify variable values in memory, step through recursive calls line by line, and evaluate expressions without constantly restarting the script.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Writing Tests that Rely on External Live APIs (Flaky Tests)',
      text: 'Unit tests that make live HTTP network calls will fail whenever the network is slow or third-party servers are down. Always use unittest.mock or pytest-mock to mock HTTP responses in unit tests.'
    },
    tryIt: {
      desc: 'Write a simple assertion test function test_email_validation() that tests whether an email validator returns True for "balaji@example.com" and False for "invalid_email".',
      code: `def is_valid_email(email):
    return "@" in email and "." in email.split("@")[-1]

def run_tests():
    assert is_valid_email("balaji@example.com") == True, "Valid email failed!"
    assert is_valid_email("invalid_email") == False, "Invalid email passed!"
    assert is_valid_email("user@domain") == False, "Missing TLD passed!"
    print("✅ All 3 Email Validation Tests Passed Successfully!")

run_tests()`
    },
    faqs: [
      {
        q: 'What is Code Coverage in testing?',
        a: 'Code Coverage (measured via pytest-cov) is the percentage of your application source code executed by your test suite, helping identify untested branches and edge cases.'
      },
      {
        q: 'What does unittest.mock.patch do?',
        a: 'patch() temporarily replaces a real function or network class (like requests.get) with a Mock object that returns pre-configured fake data during test execution.'
      },
      {
        q: 'What is TDD (Test-Driven Development)?',
        a: 'TDD is a software development process where you write a failing test first (Red), write the minimal code to make the test pass (Green), and then clean up the code (Refactor).'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 64: GIT, CLEAN CODE & DOCUMENTATION
  // =========================================================================
  {
    num: 64,
    phaseId: 'phase12',
    phaseTitle: 'Phase 12: Automation and Professional Skills',
    slug: '64-python-git-clean-code-and-documentation',
    title: 'Git, Clean Code & Docs',
    badge: '64. Git & Clean Code',
    subtopics: 'Git Version Control Workflow · PEP 8 Style Guide · Formatting with Black & Ruff · Docstrings (Google/NumPy Style) · SOLID Principles',
    desc: 'Master professional software engineering standards in Python: Git branch and pull-request workflows, adhering to the PEP 8 style guide, automated formatting with Black and Ruff, writing documentation with Google-style docstrings, and applying the SOLID design principles.',
    sections: [
      {
        title: '1. Professional Git Version Control Workflow',
        body: `<p><strong>Git</strong> is the universal distributed version control system used by software engineering teams across the globe.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">The Standard Feature Branch Git Workflow:</h4>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><code>git checkout -b feature/user-authentication</code>: Create and switch to a dedicated feature branch.</li>
          <li><code>git add .</code>: Stage modified and newly created files.</li>
          <li><code>git commit -m "feat(auth): implement JWT token login"</code>: Commit changes with an informative Conventional Commit message.</li>
          <li><code>git push origin feature/user-authentication</code>: Push branch to GitHub/GitLab.</li>
          <li>Open a <strong>Pull Request (PR)</strong> for peer code review and automated CI/CD testing before merging into <code>main</code>!</li>
        </ol>`,
        code: `# Git Command Reference Summary:
git_commands = {
    "git status":           "Inspect staged, unstaged, and untracked file changes",
    "git diff":             "View exact line-by-line diff of unstaged modifications",
    "git log --oneline -n 5":"Display concise history of the last 5 commits",
    "git branch -a":        "List all local and remote tracking branches",
    "git stash":            "Temporarily shelve uncommitted local changes without losing work"
}

print("--- 🛠️ Core Professional Git Commands ---")
for cmd, desc in git_commands.items():
    print(f"• {cmd:25}: {desc}")`,
        codeTitle: 'Reference: Essential Professional Git Commands',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 What is a .gitignore file?</strong>
          <p style="margin-top:6px;">Always include a <code>.gitignore</code> file at project root to prevent checking in virtual environments (<code>venv/</code>), compiled bytecode (<code>__pycache__/</code>), OS artifacts (<code>.DS_Store</code>), and secret files (<code>.env</code>).</p>
        </div>`
      },
      {
        title: '2. Clean Code, PEP 8 Formatting & Google-Style Docstrings',
        body: `<p>Code is read far more often than it is written. Writing clean, readable code is a core trait of senior software engineers.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">The 4 Essential Clean Code Principles:</h4>
        <ul>
          <li><strong>DRY (Don't Repeat Yourself):</strong> Consolidate duplicated logic into reusable functions.</li>
          <li><strong>KISS (Keep It Simple, Stupid):</strong> Choose straightforward, transparent solutions over clever, obfuscated code.</li>
          <li><strong>SOLID Principles:</strong> Single Responsibility (a function or class should do exactly one thing well).</li>
          <li><strong>Automated Formatting (Black / Ruff):</strong> Use <code>black .</code> to automatically format code according to PEP 8 standards with zero arguments.</li>
        </ul>`,
        code: `def calculate_employee_bonus(base_salary: float, performance_rating: float, years_at_company: int) -> float:
    """Calculates annual performance bonus with tenure multiplier.

    Adheres to Google Docstring Style standards.

    Args:
        base_salary (float): The annual base salary in INR.
        performance_rating (float): Performance score from 1.0 (lowest) to 5.0 (highest).
        years_at_company (int): Number of completed full years at the organization.

    Returns:
        float: Total bonus amount in INR rounded to 2 decimal places.

    Raises:
        ValueError: If performance_rating is outside the 1.0 to 5.0 range.
    """
    if not (1.0 <= performance_rating <= 5.0):
        raise ValueError("performance_rating must be between 1.0 and 5.0")

    # Base bonus percentage:
    bonus_percentage = (performance_rating / 5.0) * 0.15 # Up to 15%
    
    # Seniority loyalty multiplier (+1% per year up to 5%):
    loyalty_bonus = min(years_at_company * 0.01, 0.05)
    
    total_bonus = base_salary * (bonus_percentage + loyalty_bonus)
    return round(total_bonus, 2)

# Calculate bonus:
bonus = calculate_employee_bonus(base_salary=1200000.0, performance_rating=4.8, years_at_company=3)
print(f"Computed Annual Bonus: ₹{bonus:,.2f}")`,
        codeTitle: 'Example 2: Clean Code with Type Hints and Google-Style Docstring',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Type Hints & Docstring Inspection:</strong>
          <p style="margin-top:6px;">Combining PEP 484 type annotations (<code>base_salary: float</code>) with structured docstrings allows documentation generators (like Sphinx / MkDocs) to build interactive API documentation websites automatically.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Using Meaningless Variable Names (x, temp, data2, a1)',
      text: 'Variables with names like "temp" or "data2" obscure business intent. Always use descriptive, intent-revealing names: "active_user_count", "monthly_revenue", "is_account_verified".'
    },
    tryIt: {
      desc: 'Refactor messy code: Write a clean function is_eligible_for_loan(credit_score, income, existing_debt) with type hints and boolean expression.',
      code: `def is_eligible_for_loan(credit_score: int, annual_income: float, current_debt: float) -> bool:
    debt_to_income_ratio = current_debt / annual_income if annual_income > 0 else 1.0
    return credit_score >= 700 and debt_to_income_ratio <= 0.40

print("Candidate 1 Eligible:", is_eligible_for_loan(750, 1200000, 300000)) # True
print("Candidate 2 Eligible:", is_eligible_for_loan(620, 1500000, 200000)) # False (Low score)`
    },
    faqs: [
      {
        q: 'What is Ruff in the Python ecosystem?',
        a: 'Ruff is an extremely fast Python linter and formatter written in Rust that replaces Flake8, isort, Black, and pydocstyle while running 10-100x faster.'
      },
      {
        q: 'What is the difference between git merge and git rebase?',
        a: 'git merge combines branches by creating a new merge commit preserving full branch history. git rebase replays your commits on top of the target branch, creating a clean linear commit history.'
      },
      {
        q: 'What is a pre-commit hook in Git?',
        a: 'A pre-commit hook is an automated script that runs linters and formatters (like Black and Ruff) before every commit, automatically rejecting commits that violate style guidelines.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 65: AUTOMATION & DEVOPS CAPSTONE PROJECTS
  // =========================================================================
  {
    num: 65,
    phaseId: 'phase12',
    phaseTitle: 'Phase 12: Automation and Professional Skills',
    slug: '65-python-automation-and-devops-capstone-projects',
    title: 'Automation & DevOps Capstone Projects',
    badge: '65. Automation Capstone',
    subtopics: '5 Full Projects · 1. Automated Web Price Scraper & Notifier · 2. Automated Invoice & Excel Generator · 3. Intelligent Desktop File Organizer · 4. Daily Email Dispatcher · 5. CI/CD & Docker Pipeline',
    desc: 'Build five production-grade automation, scraping, and DevOps systems in Python: an E-Commerce Price Drop Alert Scraper, an Automated Multi-Client Invoice & Excel Financial Engine, an Intelligent File Organizer with audit logging, an Automated Daily Email Dispatcher, and a Production Docker & CI/CD Pipeline.',
    sections: [
      {
        title: '1. Project 1: Automated E-Commerce Price Drop Scraper & Alert Engine',
        body: `<p>A complete price monitoring engine that parses product pages, compares current prices against user alert thresholds, and triggers notifications on price drops:</p>`,
        code: `# =========================================================================
# PROJECT 1: AUTOMATED PRICE DROP SCRAPER & ALERT ENGINE
# =========================================================================

class PriceDropMonitor:
    """Monitors product prices and triggers alerts when price drops below threshold."""
    
    def __init__(self):
        self.watchlist = {} # {product_id: {"name": str, "target_price": float, "last_price": float}}

    def add_to_watchlist(self, product_id, name, target_price, initial_price):
        self.watchlist[product_id] = {
            "name": name,
            "target_price": target_price,
            "last_price": initial_price
        }
        print(f"🎯 Watchlist Added: '{name}' | Target Alert Price: ₹{target_price:,.2f}")

    def check_price_update(self, product_id, current_scraped_price):
        item = self.watchlist.get(product_id)
        if not item:
            return "Product not found in watchlist."
        
        old_price = item["last_price"]
        item["last_price"] = current_scraped_price

        if current_scraped_price <= item["target_price"]:
            discount = old_price - current_scraped_price
            return (
                f"🚨 [PRICE DROP ALERT!] '{item['name']}' dropped to ₹{current_scraped_price:,.2f}! "
                f"(Target: ₹{item['target_price']:,.2f} | Saved: ₹{discount:,.2f})"
            )
        return f"ℹ️ '{item['name']}' price is ₹{current_scraped_price:,.2f} (Above target ₹{item['target_price']:,.2f})"

# Run Project 1 Demonstration:
monitor = PriceDropMonitor()
monitor.add_to_watchlist("PROD-1", "Sony WH-1000XM5 Headphones", target_price=24999.0, initial_price=29999.0)
monitor.add_to_watchlist("PROD-2", "MacBook Air M3", target_price=95000.0, initial_price=114900.0)

# Simulate Daily Price Scraping Checks:
print("\\n--- 📡 Simulating Daily Automated Price Checks ---")
print(monitor.check_price_update("PROD-1", 27999.0)) # Above target
print(monitor.check_price_update("PROD-1", 23499.0)) # Drops below target! ALERTS!
print(monitor.check_price_update("PROD-2", 94000.0)) # Drops below target! ALERTS!`,
        codeTitle: 'Project 1: Automated Price Drop Alert Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Real-World Architecture:</strong>
          <p style="margin-top:6px;">In production, combine this monitor with the <code>schedule</code> library to run every morning at 08:00 AM and send alerts via Telegram/WhatsApp APIs.</p>
        </div>`
      },
      {
        title: '2. Project 2: Automated Multi-Client Invoice & Excel Financial Engine',
        body: `<p>An automated accounting engine generating structured invoices and financial summaries with tax computations:</p>`,
        code: `# =========================================================================
# PROJECT 2: AUTOMATED INVOICE & FINANCIAL REPORT ENGINE
# =========================================================================

class InvoiceEngine:
    def __init__(self, company_name="Our Compiler Tech Solutions"):
        self.company = company_name

    def generate_invoice(self, invoice_num, client_name, line_items):
        """Generates detailed invoice breakdown: line_items = [(desc, qty, unit_price)]"""
        subtotal = 0.0
        details = []
        for desc, qty, price in line_items:
            line_total = qty * price
            subtotal += line_total
            details.append(f"  • {desc:32} (Qty: {qty:>2} x ₹{price:>8,.2f}) = ₹{line_total:>10,.2f}")
        
        gst = subtotal * 0.18 # 18% GST
        grand_total = subtotal + gst

        invoice_text = [
            f"======================================================================",
            f"  TAX INVOICE: {self.company.upper()}",
            f"  Invoice Number: {invoice_num:<20} Date: 2026-08-14",
            f"  Billed To:      {client_name}",
            f"----------------------------------------------------------------------",
            *details,
            f"----------------------------------------------------------------------",
            f"  Subtotal:                                            ₹{subtotal:>10,.2f}",
            f"  Applicable GST (18%):                                ₹{gst:>10,.2f}",
            f"  GRAND TOTAL PAYABLE:                                 ₹{grand_total:>10,.2f}",
            f"======================================================================"
        ]
        return "\\n".join(invoice_text)

# Run Project 2 Demonstration:
engine = InvoiceEngine()
inv = engine.generate_invoice(
    invoice_num="INV-2026-0042",
    client_name="Tata Consultancy Services",
    line_items=[
        ("Python Masterclass Corporate Licenses", 25, 4999.0),
        ("FastAPI Backend Microservice Consulting", 10, 8500.0),
        ("Dedicated Cloud Server Provisioning", 1, 15000.0)
    ]
)
print(inv)`,
        codeTitle: 'Project 2: Automated Tax Invoice Generation Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Formatting Power:</strong>
          <p style="margin-top:6px;">Formats currencies and itemized line items with dynamic tax calculations, ready for PDF export or email delivery.</p>
        </div>`
      },
      {
        title: '3. Project 3: Intelligent File Organizer with Audit Logging',
        body: `<p>An automated file manager that scans directories, classifies file types, and records actions in an audit log:</p>`,
        code: `# =========================================================================
# PROJECT 3: INTELLIGENT FILE ORGANIZER WITH AUDIT LOGGING
# =========================================================================

class SmartFolderOrganizer:
    CATEGORIES = {
        "Documents": [".pdf", ".docx", ".xlsx", ".txt"],
        "Images":    [".png", ".jpg", ".jpeg", ".svg"],
        "Code":      [".py", ".js", ".html", ".css"],
        "Archives":  [".zip", ".tar", ".gz"]
    }

    def __init__(self):
        self.audit_log = []

    def organize_files(self, file_list):
        for filename in file_list:
            ext = "." + filename.split(".")[-1].lower() if "." in filename else ""
            target_folder = "Others"
            for folder, extensions in self.CATEGORIES.items():
                if ext in extensions:
                    target_folder = folder
                    break
            
            action_record = f"[SORTED] '{filename}' ──► 📁 [{target_folder}/]"
            self.audit_log.append(action_record)
            print(f"• {action_record}")

# Run Project 3 Demonstration:
organizer = SmartFolderOrganizer()
print("--- 📂 Organizing Cluttered Downloads Directory ---")
organizer.organize_files([
    "Q3_Financial_Report.pdf",
    "dashboard_mockup.png",
    "api_backend_server.py",
    "dataset_customers.xlsx",
    "system_backup.zip"
])
print(f"\\n✅ Successfully organized {len(organizer.audit_log)} files with zero errors!")`,
        codeTitle: 'Project 3: Intelligent File Organizer with Audit Logging',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Audit Trail:</strong>
          <p style="margin-top:6px;">Maintains an internal log of every moved file to support audit checks and undo functionality.</p>
        </div>`
      },
      {
        title: '4. Project 4: Automated Email Dispatcher with Rate Limiting',
        body: `<p>A batch email sending engine with templating, personalized placeholders, and dispatch delays:</p>`,
        code: `# =========================================================================
# PROJECT 4: AUTOMATED BATCH EMAIL DISPATCHER
# =========================================================================

class BatchEmailDispatcher:
    def __init__(self, sender="newsletter@ourcompiler.com"):
        self.sender = sender
        self.sent_count = 0

    def send_newsletter(self, subscribers, template):
        print(f"--- 📧 Starting Newsletter Dispatch to {len(subscribers)} Subscribers ---")
        for sub in subscribers:
            personalized_body = template.replace("{{name}}", sub["name"]).replace("{{topic}}", sub["interest"])
            print(f"📨 Sent to: {sub['email']:26} | Subject: 'Weekly {sub['interest']} Digest'")
            self.sent_count += 1
        print(f"✅ Batch completed: {self.sent_count} emails delivered successfully.")

# Run Project 4 Demonstration:
dispatcher = BatchEmailDispatcher()
subscribers_list = [
    {"name": "Balaji", "email": "balaji@example.com", "interest": "Python & AI"},
    {"name": "Alex",   "email": "alex@example.com",   "interest": "Cloud & DevOps"},
    {"name": "Chloe",  "email": "chloe@example.com",  "interest": "Data Science"}
]

email_template = "Hi {{name}}, here is your top curated {{topic}} tutorial of the week!"
dispatcher.send_newsletter(subscribers_list, email_template)`,
        codeTitle: 'Project 4: Automated Batch Email Dispatcher',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Template Substitution:</strong>
          <p style="margin-top:6px;">Demonstrates dynamic token replacement for personalized email campaigns.</p>
        </div>`
      },
      {
        title: '5. Project 5: Production Dockerfile & CI/CD GitHub Actions Pipeline',
        body: `<p>A complete production-ready Docker container and GitHub Actions continuous integration workflow:</p>`,
        code: `# =========================================================================
# PROJECT 5: PRODUCTION DOCKERFILE & CI/CD PIPELINE BLUEPRINT
# =========================================================================

dockerfile_content = """
# 1. Multi-Stage Production Dockerfile for Python Web App:
FROM python:3.12-slim AS builder

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# Final Lean Production Image:
FROM python:3.12-slim AS runner
WORKDIR /app

# Copy installed wheels from builder:
COPY --from=builder /root/.local /root/.local
COPY . .

ENV PATH=/root/.local/bin:$PATH
ENV PYTHONUNBUFFERED=1

EXPOSE 8000
CMD ["gunicorn", "my_project.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "4"]
"""

github_actions_ci = """
# 2. GitHub Actions Automated Testing & Linting CI Workflow (.github/workflows/ci.yml)
name: Python Application CI/CD

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python 3.12
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      
      - name: Install Dependencies
        run: |
          python -m pip install --upgrade pip
          pip install ruff pytest
          if [ -f requirements.txt ]; then pip install -r requirements.txt; fi

      - name: Run Ruff Linter & Formatter Check
        run: ruff check .

      - name: Run Automated Pytest Suite
        run: pytest --maxfail=1 --disable-warnings -q
"""

print("--- 🐳 Production Dockerfile Configuration ---")
print(dockerfile_content.strip())
print("\\n--- 🚀 GitHub Actions Automated CI Pipeline ---")
print(github_actions_ci.strip())`,
        codeTitle: 'Project 5: Production Dockerfile and GitHub Actions CI/CD Pipeline',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Multi-Stage Docker Build:</strong>
          <p style="margin-top:6px;">Using a multi-stage Docker build leaves compilers and temporary build artifacts behind, reducing container image size from ~800 MB to under <strong>95 MB</strong>!</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Running Docker Containers as the Root User in Production',
      text: 'Running application processes as root inside Docker creates severe container-breakout security vulnerabilities. Always define and switch to a non-root user (USER appuser) in your Dockerfile.'
    },
    tryIt: {
      desc: 'Instantiate PriceDropMonitor from Project 1 and check if a price update to ₹89,999 triggers an alert for a product with target ₹90,000.',
      code: `monitor = PriceDropMonitor()
monitor.add_to_watchlist("P1", "Gaming Laptop", target_price=90000, initial_price=105000)
alert = monitor.check_price_update("P1", 89999)
print(alert)`
    },
    faqs: [
      {
        q: 'What is CI/CD in modern software engineering?',
        a: 'CI (Continuous Integration) automatically runs tests and linters whenever developers push code. CD (Continuous Deployment) automatically packages and deploys passing code to production servers.'
      },
      {
        q: 'Why should I use Gunicorn inside Docker instead of running Python directly?',
        a: 'Gunicorn manages a master process with multiple worker processes, handling concurrency, automatic worker recycling on memory leaks, and high-throughput network connections.'
      },
      {
        q: 'What is the purpose of PYTHONUNBUFFERED=1 in Docker containers?',
        a: 'PYTHONUNBUFFERED=1 ensures Python output (logs and stdout) is sent directly to terminal streams without buffer delays, allowing real-time log monitoring in Docker and Kubernetes.'
      }
    ]
  }
];
