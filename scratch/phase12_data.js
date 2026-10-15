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
    title: 'Web Scraping & Browser Automation (తెలుగులో)',
    badge: '60. Web Scraping & Automation',
    subtopics: 'HTML DOM Structure · BeautifulSoup4 Parsing · CSS Selectors · Browser Automation (Selenium/Playwright) · Headless Chrome · Rate Limiting & Ethical Scraping',
    desc: 'ఇంటర్నెట్ లో ఉన్న డేటాని ఆటోమాటిక్ గా కాపీ చేసుకోవడం (Web Scraping) ఎలా? బ్రౌజర్ ని మనమే ఓపెన్ చేయకుండా కోడ్ ద్వారా ఎలా ఆపరేట్ చేయాలో (Selenium / Playwright) నేర్చుకుందాం.',
    sections: [
      {
        title: '1. Web Scraping అంటే ఏంటి? (BeautifulSoup4 వాడకం)',
        body: `<p><strong>Web Scraping</strong> అంటే ఒక వెబ్ సైట్ కి వెళ్లి, అక్కడున్న ఇన్ఫర్మేషన్ ని కాపీ చేసుకుని మన ఎక్సెల్ షీట్ లోకి సేవ్ చేయడాన్ని ఆటోమేట్ చేయడం.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">ఎక్కడ వాడతారు?</h4>
        <ul>
          <li><strong>ప్రైస్ మానిటరింగ్:</strong> అమెజాన్, ఫ్లిప్కార్ట్ లో మనకు కావాల్సిన ప్రోడక్ట్ ధర ఎప్పుడు తగ్గుతుందో ఎప్పటికప్పుడు చెక్ చేయడానికి.</li>
          <li><strong>న్యూస్ లేదా స్టాక్స్:</strong> స్టాక్ మార్కెట్ సైట్స్ నుంచి ఎప్పటికప్పుడు లేటెస్ట్ డేటాని లాగడానికి.</li>
        </ul>

        <h4 style="color:#10b981; margin:16px 0 8px;">దీని ప్రాసెస్ ఏంటి?:</h4>
        <p>ఏ వెబ్ సైట్ అయినా HTML తోనే తయారవుతుంది. మనం ఆ HTML కోడ్ ని తెచ్చుకుని, అందులో మనకు కావాల్సిన పదాన్ని వెతుక్కుంటాం. ఇందుకు <strong>BeautifulSoup4</strong> అనే ప్యాకేజీ వాడతాం.</p>`,
        code: `# Web Scraping సిమ్యులేషన్ (యాక్చువల్ వెబ్ సైట్ HTML డేటా):
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

# ఈ కోడ్ HTML ని చదివి డేటాని బయటకు లాగుతుంది:
class SimpleScraper(HTMLParser):
    def __init__(self):
        super().__init__()
        self.products = []
        self.item = {}
        self.tag = None

    def handle_starttag(self, tag, attrs):
        self.tag = tag
        attr_dict = dict(attrs)
        if attr_dict.get("class") == "product-card":
            self.item = {"id": attr_dict.get("data-id")}

    def handle_data(self, data):
        text = data.strip()
        if text:
            if self.tag == "h2":
                self.item["title"] = text
            elif self.tag == "span" and "₹" in text:
                self.item["price"] = text
            elif self.tag == "span" and "Stock" in text:
                self.item["status"] = text
                if "title" in self.item:
                    self.products.append(self.item.copy())

scraper = SimpleScraper()
scraper.feed(raw_html_mock)

print("--- 🛒 వెబ్ సైట్ నుంచి కాపీ చేసిన డేటా ---")
for p in scraper.products:
    print(f"• ID #{p['id']}: {p['title']:22} | Price: {p['price']:>10} | Status: {p['status']}")`,
        codeTitle: 'Example 1: HTML DOM Parsing and Text Extraction',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 BeautifulSoup లాజిక్:</strong>
          <p style="margin-top:6px;">రియల్ ప్రాజెక్ట్స్ లో మనం <code>soup.select('div.product-card h2')</code> అని ఇస్తే ఆ ట్యాగ్ లో ఉన్న టెక్స్ట్ ని లాగేస్తుంది.</p>
        </div>`
      },
      {
        title: '2. Browser Automation (Selenium / Playwright)',
        body: `<p>కొన్ని వెబ్ సైట్స్ (React, Angular తో చేసినవి) డైరెక్ట్ గా HTML లో డేటా ఇవ్వవు. సైట్ ఓపెన్ అయ్యాక లోపల జావాస్క్రిప్ట్ రన్ అయ్యి అప్పుడు డేటా వస్తుంది. వాటికి BeautifulSoup పనిచేయదు.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">పరిష్కారం ఏంటి?:</h4>
        <p><strong>Selenium</strong> లేదా <strong>Playwright</strong> వాడతాం. ఇవి స్క్రీన్ మీద కనబడకుండానే (Headless Mode) క్రోమ్ బ్రౌజర్ ని ఓపెన్ చేసి, జావాస్క్రిప్ట్ అంతా రన్ అయ్యేదాకా వెయిట్ చేసి, ఆ తర్వాత డేటాని లాగుతాయి. బటన్స్ ని క్లిక్ చేయడం, లాగిన్ ఫారమ్స్ నింపడం అన్నీ చేయగలవు.</p>`,
        code: `# Playwright & Selenium కోడ్ బ్లూప్రింట్ (ఎలా రాస్తారో చూపించడానికి):
"""
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 1. బ్రౌజర్ ని స్క్రీన్ మీద కనబడకుండా (Background) ఓపెన్ చేయడం:
options = Options()
options.add_argument("--headless=new") 

driver = webdriver.Chrome(options=options)

try:
    # 2. లాగిన్ పేజీకి వెళ్లడం:
    driver.get("https://example.com/login")

    # 3. పేజీ లోడ్ అయ్యేదాకా (గరిష్టంగా 10 సెకన్లు) వెయిట్ చేయడం:
    user_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.NAME, "username"))
    )

    # 4. యూజర్ నేమ్, పాస్ వర్డ్ నింపి బటన్ క్లిక్ చేయడం:
    user_input.send_keys("balaji_dev")
    driver.find_element(By.NAME, "password").send_keys("Secret123")
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

    # 5. ప్రూఫ్ కోసం స్క్రీన్ షాట్ తీసుకోవడం:
    driver.save_screenshot("login_success.png")
    print("✅ లాగిన్ అయ్యి స్క్రీన్ షాట్ తీసుకుంది!")

finally:
    driver.quit() # పనైపోగానే కచ్చితంగా బ్రౌజర్ క్లోజ్ చేయాలి!
"""
print("Browser Automation బ్లూప్రింట్ లోడ్ అయ్యింది.")`,
        codeTitle: 'Reference: Selenium Headless Browser Automation Architecture',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 time.sleep() వాడకండి:</strong>
          <p style="margin-top:6px;">10 సెకన్లు ఆగు అని ఫిక్స్డ్ టైమ్ ఇవ్వకూడదు (నెట్ ఫాస్ట్ ఉంటే టైమ్ వేస్ట్). పై కోడ్ లో లాగా <strong>Explicit Waits</strong> వాడితే, పేజీ లోడ్ అవ్వగానే నెక్స్ట్ లైన్ కి వెళ్ళిపోతుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'గ్యాప్ లేకుండా రిక్వెస్ట్స్ పంపడం (IP బ్లాక్ అవుతుంది)',
      text: 'కోడ్ రాశాం కదా అని సెకనుకి 100 సార్లు వెబ్ సైట్ ని హిట్ చేస్తే వాళ్ల సర్వర్ డౌన్ అవుతుంది (లేదా వాళ్లు మనల్ని బాట్ అనుకుని బ్లాక్ చేస్తారు). ఎప్పుడూ లూప్ లో `time.sleep(3)` లాంటివి పెట్టి గ్యాప్ ఇచ్చి డేటాని లాగాలి.'
    },
    tryIt: {
      desc: 'ఒక HTML టెక్స్ట్ లో నుంచి లింక్స్ (href="") ని బయటకు తీసే కోడ్ రాయండి.',
      code: `import re

sample_html = '''
<nav>
  <a href="/home">Home</a>
  <a href="/courses">Courses</a>
  <a href="https://github.com/balaji">GitHub</a>
</nav>
'''

# లింక్స్ ఫైండ్ చేయడానికి రెగ్యులర్ ఎక్స్ప్రెషన్ (Regex):
links = re.findall(r'href="([^"]+)"', sample_html)

print("బయటకు తీసిన లింక్స్:")
for link in links:
    print("•", link)`
    },
    faqs: [
      {
        q: 'robots.txt అంటే ఏంటి?',
        a: 'ఏ వెబ్ సైట్ కైనా చివర /robots.txt అని ఇస్తే (ఉదా: google.com/robots.txt), మనం ఏ పేజీలని స్క్రాప్ చేయొచ్చు, ఏవి చేయకూడదు అని వాళ్లు ముందే చెప్తారు. దాన్ని గౌరవించాలి.'
      },
      {
        q: 'Cloudflare లాంటివి ఎలా బైపాస్ చేయాలి?',
        a: 'అది కొంచెం అడ్వాన్స్డ్. అప్పుడు నార్మల్ Selenium కాకుండా undetected-chromedriver లాంటివి వాడతాం, అలాగే మనుషుల్లాగా టైమ్ గ్యాప్స్ ఇస్తుంటాం.'
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
    title: 'File & Media Automation (తెలుగులో)',
    badge: '61. File, PDF & Email Automation',
    subtopics: 'Excel Automation (openpyxl) · PDF Manipulation (pypdf) · Image Processing (Pillow/PIL) · Automated Email Dispatch (smtplib & MIME)',
    desc: 'ఆఫీస్ పనుల్లో రోజువారీ చేసేవి.. ఎక్సెల్ షీట్స్ తయారు చేయడం, PDFs ని కలపడం, ఫోటోలు కట్ చేయడం, 100 మందికి ఈమెయిల్స్ పంపడం. వీటన్నిటినీ పైథాన్ తో సింగిల్ క్లిక్ తో ఎలా ఆటోమేట్ చేయాలో చూద్దాం.',
    sections: [
      {
        title: '1. ఎక్సెల్ ఆటోమేషన్ (openpyxl వాడి)',
        body: `<p>సిస్టమ్ లో MS Excel సాఫ్ట్ వేర్ ఇన్స్టాల్ చేయకుండానే, పైథాన్ (<strong><code>openpyxl</code></strong>) వాడి కొత్త ఎక్సెల్ ఫైల్స్ క్రియేట్ చేయొచ్చు, డేటాని ఎంటర్ చేయొచ్చు, ఫార్ములాలు కూడా అప్లై చేయొచ్చు.</p>`,
        code: `# ఎక్సెల్ బిల్స్ ఆటోమేట్ చేసే సిమ్యులేషన్:
def create_excel_report(sales):
    workbook = {"title": "Q3_Report.xlsx", "rows": []}
    
    # 1. హెడ్డింగ్స్ (Column Names):
    workbook["rows"].append(["బిల్ నెంబర్", "కంపెనీ పేరు", "ప్రోడక్ట్", "అమౌంట్ (INR)", "GST (18%)", "టోటల్"])

    # 2. ఫార్ములాలు క్యాలిక్యులేట్ చేసి ఎంటర్ చేయడం:
    for idx, (client, prod, amt) in enumerate(sales, start=101):
        gst = round(amt * 0.18, 2)
        total = round(amt + gst, 2)
        
        workbook["rows"].append([
            f"INV#{idx}", client, prod, f"₹{amt:,.2f}", f"₹{gst:,.2f}", f"₹{total:,.2f}"
        ])
    return workbook

sample_data = [
    ("TCS",        "Cloud Server",  150000.0),
    ("Wipro",      "Security Audit", 85000.0),
    ("Infosys",    "AI Training",    220000.0)
]

report = create_excel_report(sample_data)
print(f"--- 📊 ఎక్సెల్ ఫైల్ జనరేట్ అయ్యింది: [{report['title']}] ---")
for r in report["rows"]:
    print(f"{r[0]:<8} {r[1]:<12} {r[2]:<16} {r[3]:<12} {r[4]:<10} {r[5]:<12}")`,
        codeTitle: 'Example 1: Automated Financial Excel Spreadsheet Generation',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 రియల్ openpyxl కోడ్:</strong>
          <p style="margin-top:6px;">అసలు లైబ్రరీలో <code>import openpyxl; wb = openpyxl.Workbook(); ws = wb.active; ws.append(['Name', 'Amt'])</code> ఇలా రాస్తాం.</p>
        </div>`
      },
      {
        title: '2. PDFs, ఇమేజెస్ & ఈమెయిల్ ఆటోమేషన్',
        body: `<p>పైథాన్ లో ఈ టూల్స్ వాడి ఏ పనైనా ఆటోమేట్ చేయొచ్చు:</p>
        <ul>
          <li><strong>PDF Processing (<code>pypdf</code>):</strong> రెండు మూడు PDFs ని కలిపి ఒకటిగా చేయడం, పాస్ వర్డ్స్ పెట్టడం.</li>
          <li><strong>Image Processing (<code>Pillow</code>):</strong> ఒక ఫోల్డర్ లో ఉన్న 1000 ఫోటోల సైజుని ఒకేసారి తగ్గించడం, వాటిమీద వాటర్ మార్క్ వేయడం.</li>
          <li><strong>Email (<code>smtplib</code>):</strong> కస్టమర్స్ కి వాళ్ళ పేరుతో ఇన్వాయిస్ PDF అటాచ్ చేసి ఆటోమాటిక్ గా మెయిల్ పంపడం.</li>
        </ul>`,
        code: `# ఆటోమాటిక్ గా ఈమెయిల్ (అటాచ్మెంట్ తో) పంపే సిమ్యులేషన్:
import datetime

class EmailSender:
    def send_bill(self, email, name, invoice_no, amt, file_name):
        # ఈమెయిల్ లోపల ఉండే HTML డిజైన్ (టెంప్లేట్):
        html_body = f"""
        <html>
          <body>
            <h2>హలో {name} గారూ,</h2>
            <p>మీ పేమెంట్ <strong>₹{amt:,.2f}</strong> సక్సెస్ ఫుల్ గా రిసీవ్ అయ్యింది.</p>
            <p>మీ బిల్ (<strong>{file_name}</strong>) ని ఈ మెయిల్ కి అటాచ్ చేశాము, చెక్ చేసుకోండి.</p>
            <br>
            <p>థాంక్యూ,<br><strong>మానా కంపైలర్ టీమ్</strong></p>
          </body>
        </html>
        """
        
        print(f"📧 [SENT] ఈమెయిల్ డెలివర్ అయ్యింది -> {email}")
        print(f"   సబ్జెక్ట్: Invoice #{invoice_no} Paid")
        print(f"   అటాచ్మెంట్: '{file_name}' వెళ్ళింది.\\n")

sender = EmailSender()
sender.send_bill(
    email="balaji@example.com",
    name="Balaji",
    invoice_no="INV-894",
    amt=1499.00,
    file_name="Invoice_894.pdf"
)`,
        codeTitle: 'Example 2: Automated Transactional Email Dispatcher with PDF Attachment',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 సెక్యూరిటీ వార్నింగ్ (TLS):</strong>
          <p style="margin-top:6px;">కోడ్ లో మన ఈమెయిల్ పాస్ వర్డ్ రాసినప్పుడు, అది సేఫ్ గా వెళ్ళడానికి <code>server.starttls()</code> (Transport Layer Security) వాడటం మర్చిపోకూడదు.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'కోడ్ లో డైరెక్ట్ గా పాస్ వర్డ్స్ రాయడం',
      text: 'మీ పర్సనల్ జిమెయిల్ పాస్ వర్డ్ ని కోడ్ లో రాయకూడదు. ఆ కోడ్ ఎవరికైనా ఇస్తే మీ అకౌంట్ హ్యాక్ అవుతుంది. దానికి బదులు గూగుల్ సెక్యూరిటీ సెట్టింగ్స్ లో "App Passwords" అని క్రియేట్ చేసుకుని ఆ పాస్ వర్డ్ నే వాడుకోవాలి.'
    },
    tryIt: {
      desc: 'ఒక పెద్ద ఫోటో ని చిన్న థంబ్ నైల్ (Thumbnail) సైజులోకి మార్చడానికి విడ్త్, హైట్ క్యాలిక్యులేట్ చేయండి.',
      code: `def get_thumbnail_size(width, height, max_size=300):
    # ఫోటో సాగకుండా, ఒరిజినల్ రేషియో మెయింటైన్ చేయడానికి:
    ratio = min(max_size / width, max_size / height)
    return int(width * ratio), int(height * ratio)

print("ఒరిజినల్ 1920x1080 -> థంబ్ నైల్:", get_thumbnail_size(1920, 1080))
print("ఒరిజినల్ 800x1200  -> థంబ్ నైల్:", get_thumbnail_size(800, 1200))`
    },
    faqs: [
      {
        q: 'PDF లోపల టేబుల్స్ ఉంటే ఎలా డేటా తీయాలి?',
        a: 'pypdf కంటే, pdfplumber అనే ఇంకో లైబ్రరీ టేబుల్స్ ని చదవడంలో చాలా బాగా పనిచేస్తుంది.'
      },
      {
        q: 'పాండాస్ (Pandas) ఉండగా మళ్లీ openpyxl ఎందుకు?',
        a: 'పాండాస్ వాడితే డేటా మొత్తం అనాలిసిస్ కి బాగా పనిచేస్తుంది. కానీ "ఈ సెల్ కి రెడ్ కలర్ వెయ్, ఆ సెల్ కి ఈ ఫార్ములా వెయ్" లాంటి ఎక్సెల్ ఫార్మాటింగ్ కి openpyxl బెస్ట్.'
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
    title: 'OS Automation & Logging (తెలుగులో)',
    badge: '62. OS Automation & Logging',
    subtopics: 'Automated Directory Organizers · Task Scheduling (schedule) · Production Logging (logging module, RotatingFileHandler) · Config Files (TOML, YAML, .env)',
    desc: 'కంప్యూటర్ లో ఫైల్స్ ని ఆటోమాటిక్ గా సర్దడం, ఒక ప్రోగ్రామ్ రోజుకి ఒకసారి ఆటోమాటిక్ గా రన్ అయ్యేలా షెడ్యూల్ చేయడం, ఎర్రర్స్ వస్తే ప్రింట్ చేయకుండా రియల్ ప్రాజెక్ట్స్ లో లాగ్ (Log) ఫైల్స్ లో రాయడం నేర్చుకుందాం.',
    sections: [
      {
        title: '1. ఫైల్స్ ని ఆటోమాటిక్ గా సర్దడం (Smart File Organizer)',
        body: `<p>మన సిస్టమ్ లో Downloads ఫోల్డర్ ఎప్పుడూ గందరగోళంగా ఉంటుంది. ఏది పిడిఎఫ్, ఏది ఇమేజ్ వెతుక్కోవాలి. పైథాన్ వాడి ఆటోమాటిక్ గా ఆ ఫైల్స్ ని కేటగిరీల వారీగా ఫోల్డర్స్ లోకి మార్చేయొచ్చు!</p>`,
        code: `# ఇంటెలిజెంట్ ఫైల్ ఆర్గనైజర్:
from pathlib import Path

# ఏ ఫైల్ ఏ ఫోల్డర్ లోకి వెళ్ళాలో రూల్స్:
FILE_CATEGORIES = {
    "Documents (బుక్స్, పత్రాలు)": [".pdf", ".docx", ".txt", ".xlsx"],
    "Images (ఫోటోలు)":           [".jpg", ".png", ".webp", ".svg"],
    "Code (ప్రోగ్రామింగ్)":       [".py", ".js", ".html", ".css"],
    "Videos (వీడియోలు)":         [".mp4", ".mkv"]
}

def check_category(filename):
    # ఫైల్ చివర ఏముందో చూస్తుంది (ఉదా: .pdf)
    ext = Path(filename).suffix.lower()
    for category, extensions in FILE_CATEGORIES.items():
        if ext in extensions:
            return category
    return "Others"

downloads_folder = [
    "Python_Notes.pdf",
    "profile_pic.png",
    "my_script.py",
    "movie_clip.mp4",
    "unknown_file.xyz"
]

print("--- 🗂️ ఆటోమాటిక్ గా ఫైల్స్ ని సర్దుతున్నాం... ---")
for file in downloads_folder:
    folder = check_category(file)
    print(f"• తరలిస్తున్నాం: '{file:18}' ──► 📁 [{folder}/]")`,
        codeTitle: 'Example 1: Intelligent File Organizer by Extension Category',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 shutil.move() వాడకం:</strong>
          <p style="margin-top:6px;">అసలు ఫైల్స్ మూవ్ చేయడానికి <code>shutil.move(src, dest)</code> వాడతారు, అంతకంటే ముందు ఆ ఫోల్డర్ ఉందో లేదో చెక్ చేసి క్రియేట్ చేయాలి.</p>
        </div>`
      },
      {
        title: '2. ప్రొడక్షన్ లో print() వాడకూడదు! (Logging Module వాడుక)',
        body: `<p>చిన్న కోడ్ రాస్తున్నప్పుడు అవుట్పుట్ కోసం <code>print()</code> వాడతాం. కానీ పెద్ద పెద్ద యాప్స్ లో వాడకూడదు! ఎందుకంటే ప్రింట్ చేస్తే అది స్క్రీన్ మీద కనిపిస్తుంది కానీ సేవ్ అవ్వదు. ఎప్పుడో రాత్రి ఎర్రర్ వస్తే పొద్దున్న చూసుకుందామంటే దొరకదు.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">అందుకే Logging వాడుతాం (5 లెవెల్స్):</h4>
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>లెవెల్</th><th>ఎప్పుడు వాడాలి?</th></tr>
          <tr><td><code>DEBUG</code></td><td>మనం కోడ్ టెస్ట్ చేసుకుంటున్నప్పుడు.</td></tr>
          <tr><td><code>INFO</code></td><td>ప్రతిదీ కరెక్ట్ గా పనిచేస్తుందని రికార్డ్ చేయడానికి.</td></tr>
          <tr><td><code>WARNING</code></td><td>చిన్న ఇబ్బంది (ఉదా: హార్డ్ డిస్క్ ఫుల్ అవుతోంది) వచ్చినప్పుడు.</td></tr>
          <tr><td><code>ERROR</code></td><td>ఏదైనా తప్పు జరిగినప్పుడు (లాగిన్ ఫెయిల్ అవ్వడం).</td></tr>
          <tr><td><code>CRITICAL</code></td><td>సర్వర్ ఆగిపోయింది లాంటి డేంజర్ విషయాలకి.</td></tr>
        </table>`,
        code: `import logging
import sys

# 1. ప్రొఫెషనల్ లాగర్ ని సెటప్ చేయడం:
logger = logging.getLogger("ManaCompilerApp")
logger.setLevel(logging.DEBUG)

# లాగ్స్ ఎలా కనిపించాలి? (టైమ్, లెవెల్, మెసేజ్)
console_handler = logging.StreamHandler(sys.stdout)
formatter = logging.Formatter("[%(asctime)s] [%(levelname)s]: %(message)s", datefmt="%H:%M:%S")
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

# 2. రకరకాల సిట్యువేషన్స్ లో రికార్డ్ చేయడం:
logger.debug("డేటాబేస్ కి కనెక్ట్ అవుతున్నాం...")
logger.info("డేటాబేస్ కనెక్ట్ అయ్యింది.")
logger.warning("కంప్యూటర్ మెమరీ 80% నిండిపోయింది, చెక్ చేయండి!")
logger.error("యూజర్ పేమెంట్ ఫెయిల్ అయ్యింది (బ్యాంక్ సర్వర్ డౌన్).")
logger.critical("మొత్తం యాప్ క్రాష్ అయ్యింది, వెంటనే రిస్టార్ట్ చేయండి!")`,
        codeTitle: 'Example 2: Production Structured Logging with Severity Levels',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 లాగ్ ఫైల్స్ ఎప్పటికీ పెరగకూడదు:</strong>
          <p style="margin-top:6px;">లాగ్ ఫైల్స్ సేవ్ చేస్తూ పోతే హార్డ్ డిస్క్ ఫుల్ అయిపోతుంది. అందుకే <code>RotatingFileHandler(maxBytes=10MB, backupCount=5)</code> వాడతాం (అంటే 5 ఫైల్స్ కి మించదు, పాతవి ఆటోమాటిక్ గా డిలీట్ అవుతాయి).</p>
        </div>`
      }
    ],
    mistake: {
      title: 'రియల్ వెబ్ సైట్ లో DEBUG లెవెల్ ఉంచడం',
      text: 'కోడ్ రాసేటప్పుడు డీబగ్ పెట్టుకుంటాం. కానీ సైట్ లైవ్ లోకి వెళ్ళాక దాన్ని INFO లేదా WARNING కి మార్చాలి. లేకపోతే సెకనుకి వందల లాగ్స్ సేవ్ అయ్యి వెబ్ సైట్ స్లో అయిపోతుంది.'
    },
    tryIt: {
      desc: 'ఒక ఫంక్షన్ రాయండి: మనం "production" అని ఇస్తే ప్రొడక్షన్ సెట్టింగ్స్ ఇవ్వాలి, "dev" అని ఇస్తే డెవలప్మెంట్ సెట్టింగ్స్ ఇవ్వాలి.',
      code: `def get_app_config(env_mode):
    if env_mode == "production":
        return {"db": "prod_db", "debug": False, "log": "WARNING"}
    else:
        return {"db": "test_db", "debug": True,  "log": "DEBUG"}

print("డెవలపర్ సెట్టింగ్స్:", get_app_config("dev"))
print("లైవ్ సర్వర్ సెట్టింగ్స్:", get_app_config("production"))`
    },
    faqs: [
      {
        q: 'schedule లైబ్రరీ వల్ల లాభం ఏంటి?',
        a: 'మనం ఏదైనా పైథాన్ కోడ్ ని "రోజూ ఉదయం 9 గంటలకి రన్ అవ్వు" అని ఈజీగా ఇంగ్లీష్ లాగా (schedule.every().day.at("09:00")) రాయొచ్చు.'
      },
      {
        q: '.env (dot env) ఫైల్స్ ఎందుకు వాడతారు?',
        a: 'పాస్ వర్డ్స్, API కీస్ లాంటి సీక్రెట్స్ ని కోడ్ లో రాయకుండా, .env అనే సపరేట్ ఫైల్ లో పెడతారు. అది ఎప్పటికీ గిట్ హబ్ (GitHub) లోకి వెళ్ళకుండా ఆపుతారు.'
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
    title: 'Testing, Pytest & Debugging (తెలుగులో)',
    badge: '63. Pytest & Debugging',
    subtopics: 'Unit vs Integration Testing · pytest Test Runner · Test Fixtures (@pytest.fixture) · Parametrization · Mocking Dependencies · Debugging with breakpoint()',
    desc: 'మనం రాసిన కోడ్ కరెక్ట్ గా పనిచేస్తుందా లేదా? భవిష్యత్తులో ఎవరో ఒకరు కోడ్ ని మార్చినా బగ్స్ రాకుండా ముందే (Unit Testing) ఎలా చెక్ చేసుకోవాలో చూద్దాం.',
    sections: [
      {
        title: '1. Unit Testing అంటే ఏంటి? (Pytest వాడకం)',
        body: `<p>సాఫ్ట్ వేర్ లో ఏ చిన్న మార్పు చేసినా పాతవి పాడు కాకుండా ఆటోమాటిక్ గా చెక్ చేసే ప్రోగ్రామ్స్ రాస్తాం. దాన్ని టెస్టింగ్ అంటారు.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">దీనిలో 2 రకాలు:</h4>
        <ul>
          <li><strong>Unit Tests:</strong> ఒక చిన్న ఫంక్షన్ ని (మిగతా వేటితో సంబంధం లేకుండా) విడిగా టెస్ట్ చేయడం. ఇది మిల్లీ సెకన్లలో రన్ అవుతుంది.</li>
          <li><strong>Integration Tests:</strong> డేటాబేస్ తో, వేరే ఏపీఐ తో మొత్తం కలిపి కరెక్ట్ గా పనిచేస్తుందా అని చెక్ చేయడం.</li>
        </ul>

        <h4 style="color:#10b981; margin:16px 0 8px;">Pytest ఎందుకు పాపులర్?:</h4>
        <p>నార్మల్ పైథాన్ <code>unittest</code> కంటే ఇది చాలా సింపుల్. డైరెక్ట్ గా <code>assert (నిజం కాదా)</code> అని రాస్తే చాలు, తప్పు ఎక్కడుందో చాలా క్లియర్ గా చూపిస్తుంది.</p>`,
        code: `# Pytest తో బ్యాంక్ అకౌంట్ ని టెస్ట్ చేసే బ్లూప్రింట్:
"""
import pytest
from my_bank import BankAccount

# 1. Fixture: ప్రతి టెస్ట్ కి ముందు ఒక ఫ్రెష్ అకౌంట్ ని ఇస్తుంది 
# (లేకపోతే ఒక టెస్ట్ డేటా ఇంకోదానికి అంటుకుంటుంది)
@pytest.fixture
def account():
    return BankAccount(name="Balaji", bal=5000)

# 2. టెస్ట్స్ (assert వాడి నిజం అవునో కాదో చెక్ చేయడం):
def test_initial_balance(account):
    assert account.bal == 5000
    assert account.name == "Balaji"

def test_deposit(account):
    account.deposit(2000)
    assert account.bal == 7000

def test_withdraw_error(account):
    # ఉన్నదానికంటే ఎక్కువ తీస్తే ఎర్రర్ వస్తుందా లేదా? (రావాలి)
    with pytest.raises(ValueError, match="బ్యాలెన్స్ లేదు"):
        account.withdraw(10000)

# 3. ఒకేసారి 3 రకాల నెంబర్స్ తో టెస్ట్ చేయడం (Parametrize):
@pytest.mark.parametrize("add, total", [
    (500, 5500),
    (1500, 6500)
])
def test_multiple(account, add, total):
    account.deposit(add)
    assert account.bal == total
"""
print("Pytest టెస్టింగ్ బ్లూప్రింట్ లోడ్ అయ్యింది.")`,
        codeTitle: 'Blueprint: Pytest Fixtures, Assertions, and Parametrization',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 @pytest.fixture పవర్:</strong>
          <p style="margin-top:6px;">ఫిక్చర్స్ వాడటం వల్ల కోడ్ రిపీట్ చేయక్కర్లేదు. ప్రతి టెస్ట్ ఫంక్షన్ కి ఒక బ్రాండ్ న్యూ, ఫ్రెష్ బ్యాంక్ అకౌంట్ ఆబ్జెక్ట్ వస్తుంది.</p>
        </div>`
      },
      {
        title: '2. కోడ్ ఎక్కడ ఆగిపోయిందో వెతకడం (breakpoint() / Debugging)',
        body: `<p>కోడ్ ఎక్కడో తప్పు వస్తుంది కానీ అర్థం కావట్లేదు. అప్పుడు ప్రతి లైన్ కీ <code>print()</code> పెట్టుకుంటూ పోవద్దు. పైథాన్ లో <strong><code>breakpoint()</code></strong> అని రాస్తే కోడ్ అక్కడే ఫ్రీజ్ అయిపోతుంది!</p>
        
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>PDB కమాండ్</th><th>షార్ట్ కట్</th><th>ఏం చేస్తుంది?</th></tr>
          <tr><td><code>next</code></td><td><code>n</code></td><td>ఒక్క లైన్ రన్ చేసి, నెక్స్ట్ లైన్ కి వెళ్తుంది.</td></tr>
          <tr><td><code>step</code></td><td><code>s</code></td><td>ఆ లైన్ లో ఉన్న ఫంక్షన్ లోపలికి దూకుతుంది.</td></tr>
          <tr><td><code>continue</code></td><td><code>c</code></td><td>మళ్లీ కోడ్ ని నార్మల్ గా రన్ చేసేస్తుంది.</td></tr>
          <tr><td><code>print(x)</code></td><td><code>p x</code></td><td>ఆ టైమ్ లో ఆ వేరియబుల్ లో ఏముందో చూపిస్తుంది.</td></tr>
        </table>`,
        code: `# డీబగ్గింగ్ ఎలా చేయాలో సిమ్యులేషన్:
def apply_discount(items, discount):
    total = 0
    for item in items:
        # breakpoint() # <-- ఇక్కడ అన్-కామెంట్ చేస్తే కోడ్ ఆగిపోయి టెర్మినల్ లోకి వస్తుంది!
        subtotal = item["price"] * item["qty"]
        total += subtotal
    
    final_amount = total * (1 - (discount / 100))
    return final_amount

cart = [
    {"name": "Book", "price": 899, "qty": 2},
    {"name": "Mouse", "price": 1299, "qty": 1}
]

amt = apply_discount(cart, 10)
print(f"డిస్కౌంట్ పోను కట్టాల్సిన అమౌంట్: ₹{amt:,.2f}")`,
        codeTitle: 'Example 2: Interactive Debugging Flow with breakpoint()',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 డీబగ్గింగ్ వల్ల లాభం?:</strong>
          <p style="margin-top:6px;">కోడ్ ని పదే పదే స్టాప్ చేసి రన్ చేసే పనుండదు. అక్కడే ఉండి వేరియబుల్స్ వాల్యూస్ మారుస్తూ, లైన్ బై లైన్ చెక్ చేసుకోవచ్చు.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'రియల్ ఏపీఐ (నెట్ వర్క్) ని టెస్ట్ చేయడం',
      text: 'టెస్ట్ రన్ చేసినప్పుడు నిజంగా వెబ్ సైట్ కి కనెక్ట్ అవ్వకూడదు. నెట్ స్లో ఉంటే మన కోడ్ కరెక్ట్ అయినా టెస్ట్ ఫెయిల్ అవుతుంది. ఇలాంటి వాటికి mock వాడి ఆ వెబ్ సైట్ నుంచి డేటా వచ్చినట్టు అబద్ధం చెప్తాం (Fake API).'
    },
    tryIt: {
      desc: 'ఒక ఈమెయిల్ లో "@", "." ఉన్నాయా లేవా అని చెక్ చేసే ఫంక్షన్ కి 3 చిన్న టెస్ట్స్ (asserts) రాయండి.',
      code: `def is_valid_email(email):
    return "@" in email and "." in email.split("@")[-1]

def run_tests():
    assert is_valid_email("balaji@gmail.com") == True
    assert is_valid_email("invalid_email") == False
    assert is_valid_email("user@domain") == False
    print("✅ 3 ఈమెయిల్ టెస్ట్స్ పాస్ అయ్యాయి!")

run_tests()`
    },
    faqs: [
      {
        q: 'Code Coverage అంటే ఏంటి?',
        a: 'మనం 100 లైన్ల కోడ్ రాస్తే, అందులో ఎన్ని లైన్స్ ని మన టెస్ట్స్ టచ్ చేశాయి అని పర్సంటేజ్ లో చెప్తుంది. (ఉదా: 80% కవరేజ్).'
      },
      {
        q: 'TDD (Test-Driven Development) అంటే ఏంటి?',
        a: 'ముందు కరెక్ట్ కోడ్ రాసి టెస్ట్ చేయడం కాదు, ముందు ఫెయిల్ అయ్యేలా టెస్ట్ రాసి ఆ తర్వాత దాన్ని పాస్ చేయడానికి కోడ్ రాయడాన్ని TDD అంటారు.'
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
    title: 'Git, Clean Code & Docs (తెలుగులో)',
    badge: '64. Git & Clean Code',
    subtopics: 'Git Version Control Workflow · PEP 8 Style Guide · Formatting with Black & Ruff · Docstrings (Google/NumPy Style) · SOLID Principles',
    desc: 'సీనియర్ సాఫ్ట్ వేర్ ఇంజనీర్స్ కోడ్ ఎలా రాస్తారు? Git వాడి టీమ్ లో ఎలా పనిచేస్తారు? కోడ్ ని అర్థమయ్యేలా (Clean Code గా) ఎలా ఉంచాలో నేర్చుకుందాం.',
    sections: [
      {
        title: '1. గిట్ (Git) అంటే ఏంటి? ఎలా వాడతారు?',
        body: `<p><strong>Git</strong> అంటే మనం రాసిన కోడ్ కి ఎప్పటికప్పుడు సేవ్ పాయింట్స్ పెట్టుకోవడం. 10 మంది కలిసి ఒకే ప్రాజెక్ట్ మీద పనిచేస్తున్నప్పుడు ఒకరి కోడ్ ఇంకొకరికి డిస్టర్బ్ కాకుండా ఇది చూసుకుంటుంది.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">ఆఫీస్ లో వాడే స్టాండర్డ్ గిట్ వర్క్ ఫ్లో:</h4>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><code>git checkout -b feature/login</code>: మెయిన్ కోడ్ ని డిస్టర్బ్ చేయకుండా, లాగిన్ ఫీచర్ కోసం ఒక సపరేట్ కాపీ (Branch) క్రియేట్ చేసుకోవడం.</li>
          <li><code>git add .</code>: మనం చేసిన మార్పులన్నిటినీ యాడ్ చేయడం.</li>
          <li><code>git commit -m "added login page"</code>: ఈ మార్పులకి ఒక పేరు పెట్టి సేవ్ చేయడం.</li>
          <li><code>git push origin feature/login</code>: మన కంప్యూటర్ నుంచి గిట్ హబ్ (GitHub) లాంటి సర్వర్ కి పంపించడం.</li>
          <li><strong>Pull Request (PR):</strong> నా కోడ్ రెడీగా ఉంది, ఎవరైనా చెక్ చేసి మెయిన్ ప్రాజెక్ట్ లో కలపండి అని రిక్వెస్ట్ పెట్టడం.</li>
        </ol>`,
        code: `# ముఖ్యమైన Git కమాండ్స్:
git_cmds = {
    "git status":  "నేను ఏయే ఫైల్స్ మార్చానో చూడటానికి",
    "git diff":    "ఫైల్ లో ఎక్సాక్ట్ గా ఏ లైన్ మార్చానో చూడటానికి",
    "git log":     "ఇంతకు ముందు ఎవరెవరు ఏమేం మార్చారో హిస్టరీ",
    "git branch":  "మన ప్రాజెక్ట్ లో ఉన్న బ్రాంచెస్ (కాపీలు) లిస్ట్",
    "git stash":   "నేను చేసిన సగం పనిని టెంపరరీగా పక్కన పెట్టడానికి"
}

print("--- 🛠️ కచ్చితంగా తెలియాల్సిన Git కమాండ్స్ ---")
for cmd, desc in git_cmds.items():
    print(f"• {cmd:15}: {desc}")`,
        codeTitle: 'Reference: Essential Professional Git Commands',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 .gitignore ఫైల్ అంటే?:</strong>
          <p style="margin-top:6px;">పాస్ వర్డ్స్ ఉన్న ఫైల్స్ (.env) లేదా సిస్టమ్ క్రియేట్ చేసే వేస్ట్ ఫైల్స్ (.pyc) గిట్ హబ్ లోకి వెళ్ళకుండా ఆపడానికి ఈ ఫైల్ లో వాటి పేర్లు రాస్తాం.</p>
        </div>`
      },
      {
        title: '2. క్లీన్ కోడ్, PEP 8 & డాక్యుమెంటేషన్ (Docstrings)',
        body: `<p>మనం కోడ్ రాసే టైమ్ కంటే, వేరే వాళ్ళు దాన్ని చదివే టైమే ఎక్కువ ఉంటుంది. కాబట్టి కోడ్ నీట్ గా, అందరికీ అర్థమయ్యేలా రాయాలి.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">క్లీన్ కోడ్ రూల్స్:</h4>
        <ul>
          <li><strong>DRY (Don't Repeat Yourself):</strong> ఒకే కోడ్ ని రెండు సార్లు కాపీ పేస్ట్ చేయకూడదు. దానికి ఒక ఫంక్షన్ రాయాలి.</li>
          <li><strong>KISS (Keep It Simple):</strong> కాంప్లెక్స్ గా రాయడం కంటే సింపుల్ గా రాయడమే గ్రేట్.</li>
          <li><strong>Black / Ruff:</strong> మనం కోడ్ ని ఎలా పడితే అలా రాసినా, ఈ టూల్స్ వాడితే ఆటోమాటిక్ గా ఇంటర్నేషనల్ స్టాండర్డ్స్ కి తగ్గట్టు స్పేస్ లు అడ్జస్ట్ అయిపోతాయి (PEP 8).</li>
        </ul>`,
        code: `def get_bonus(salary: float, rating: float, years: int) -> float:
    """ఎంప్లాయ్ కి యాన్యువల్ బోనస్ లెక్కించే ఫంక్షన్ (Google Style).

    Args:
        salary (float): సంవత్సర జీతం.
        rating (float): పెర్ఫార్మన్స్ రేటింగ్ (1.0 నుంచి 5.0 మధ్యలో).
        years (int): కంపెనీలో ఎన్ని ఏళ్ళుగా ఉన్నాడు.

    Returns:
        float: ఇవ్వాల్సిన బోనస్ అమౌంట్.
        
    Raises:
        ValueError: రేటింగ్ 1-5 మధ్యలో లేకపోతే.
    """
    if not (1.0 <= rating <= 5.0):
        raise ValueError("రేటింగ్ 1 నుంచి 5 మధ్యలోనే ఉండాలి!")

    # రేటింగ్ ని బట్టి 15% వరకు బోనస్
    bonus_pct = (rating / 5.0) * 0.15 
    
    # ఎక్సపీరియన్స్ ని బట్టి ఇంకో 5% వరకు ఎక్స్ట్రా
    loyalty_pct = min(years * 0.01, 0.05)
    
    total = salary * (bonus_pct + loyalty_pct)
    return round(total, 2)

bonus = get_bonus(salary=1200000, rating=4.8, years=3)
print(f"ఎంప్లాయ్ కి ఇవ్వాల్సిన బోనస్: ₹{bonus:,.2f}")`,
        codeTitle: 'Example 2: Clean Code with Type Hints and Google-Style Docstring',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 టైప్ హింట్స్ (Type Hints):</strong>
          <p style="margin-top:6px;">ఫంక్షన్ కి ఇచ్చేవి (salary) నెంబర్లా? టెక్స్టా? అని ముందే <code>: float</code> అని చెప్పడం వల్ల ఎడిటర్ లో తప్పులు ముందే తెలిసిపోతాయి.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'అర్థం కాని పేర్లు పెట్టడం (x, a1, data2)',
      text: 'వేరియబుల్స్ కి x, y, data2 లాంటి పేర్లు పెడితే అందులో ఏముందో రెండు రోజుల తర్వాత మనకే అర్థం కాదు. కచ్చితంగా `user_age`, `total_amount` లాంటి మీనింగ్ ఫుల్ పేర్లు పెట్టాలి.'
    },
    tryIt: {
      desc: 'ఒక లోన్ ఎలిజిబిలిటీ ఫంక్షన్ కి టైప్ హింట్స్ (int, float, bool) ఇచ్చి రాయండి.',
      code: `def is_loan_approved(score: int, income: float, loan_amt: float) -> bool:
    # స్కోర్ 700 పైన ఉండి, అడిగిన లోన్ జీతంలో సగం కంటే తక్కువ ఉంటేనే ఓకే:
    return score >= 700 and loan_amt <= (income * 0.5)

print("పర్సన్ 1 కి వస్తుందా?:", is_loan_approved(750, 100000, 40000)) # True
print("పర్సన్ 2 కి వస్తుందా?:", is_loan_approved(650, 100000, 40000)) # False (స్కోర్ తక్కువ)`
    },
    faqs: [
      {
        q: 'Ruff అంటే ఏంటి?',
        a: 'ఇది పైథాన్ కోసం వచ్చిన కొత్త లైనర్/ఫార్మాటర్. పాత టూల్స్ అన్నింటికంటే ఇది 10-100 రెట్లు స్పీడ్ గా మన కోడ్ లోని తప్పులు వెతికి చెప్తుంది.'
      },
      {
        q: 'git merge కీ, git rebase కీ తేడా ఏంటి?',
        a: 'రెండు బ్రాంచెస్ ని కలపడానికే వాడతారు. merge చేస్తే కలిసినట్టు ఒక కొత్త సేవ్ పాయింట్ వస్తుంది. rebase చేస్తే మన కోడ్ ని తీసుకెళ్లి పక్కన పెట్టి, వాళ్లది తీసుకొచ్చి, దానిమీద మనది అప్లై చేస్తుంది (హిస్టరీ క్లీన్ గా ఉంటుంది).'
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
    title: 'Automation & DevOps ప్రాజెక్ట్స్ (తెలుగులో)',
    badge: '65. Automation Capstone',
    subtopics: '5 Full Projects · 1. Automated Web Price Scraper · 2. Invoice Generator · 3. File Organizer · 4. Email Dispatcher · 5. Docker Pipeline',
    desc: 'ఈ ఫేజ్ లో నేర్చుకున్న ఆటోమేషన్ స్కిల్స్ తో 5 పవర్ ఫుల్ ప్రాజెక్ట్స్: అమెజాన్ ప్రైస్ డ్రాప్ అయితే మెసేజ్ రావడం, ఆటోమాటిక్ గా పీడీఎఫ్ బిల్స్ జనరేట్ చేయడం, పడుకునేలోపు ఫోల్డర్స్ క్లీన్ అవ్వడం, ఈమెయిల్స్ పంపడం లాంటివి కోడ్ చేద్దాం.',
    sections: [
      {
        title: '1. ప్రాజెక్ట్ 1: ప్రోడక్ట్ ప్రైస్ తగ్గితే ఆటోమాటిక్ అలర్ట్',
        body: `<p>మనం కొనాలి అనుకున్న లాప్ టాప్ లేదా ఫోన్ ప్రైస్ ని రోజు మానిటర్ చేస్తూ.. మనం అనుకున్న రేటుకి రాగానే "రేటు తగ్గింది!" అని మనకు అలర్ట్ ఇచ్చే ప్రోగ్రామ్:</p>`,
        code: `# ప్రాజెక్ట్ 1: ప్రైస్ డ్రాప్ మానిటర్
class PriceMonitor:
    def __init__(self):
        self.watchlist = {}

    def add_item(self, prod_id, name, target_price, current_price):
        self.watchlist[prod_id] = {
            "name": name, 
            "target": target_price, 
            "last": current_price
        }
        print(f"🎯 వాచ్ లిస్ట్ లో యాడ్ చేశాం: '{name}' (టార్గెట్ ప్రైస్: ₹{target_price})")

    def check_price(self, prod_id, new_price):
        item = self.watchlist.get(prod_id)
        if not item: return
        
        old_price = item["last"]
        item["last"] = new_price

        if new_price <= item["target"]:
            discount = old_price - new_price
            return f"🚨 [రేటు తగ్గింది!] '{item['name']}' ₹{new_price} కి వచ్చింది! (సేవింగ్స్: ₹{discount})"
        return f"ℹ️ '{item['name']}' ఇంకా ఎక్కువగానే ఉంది (₹{new_price})"

monitor = PriceMonitor()
monitor.add_item("P1", "MacBook Air", target_price=95000, current_price=105000)

print("\\n--- 📡 రోజువారీ ప్రైస్ చెకింగ్ ---")
print(monitor.check_price("P1", 99000)) # ఇంకా ఎక్కువగానే ఉంది
print(monitor.check_price("P1", 94000)) # టార్గెట్ రీచ్ అయ్యింది! అలర్ట్!`,
        codeTitle: 'Project 1: Automated Price Drop Alert Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఆటోమేషన్:</strong>
          <p style="margin-top:6px;">ఈ కోడ్ ని <code>schedule</code> లైబ్రరీ కి కనెక్ట్ చేస్తే రోజూ ఉదయం 8 గంటలకి ఆటోమాటిక్ గా చెక్ చేసి మీ ఫోన్ కి మెసేజ్ పంపుతుంది.</p>
        </div>`
      },
      {
        title: '2. ప్రాజెక్ట్ 2: ఆటోమేటెడ్ బిల్ (Invoice) జనరేటర్',
        body: `<p>కంపెనీలో కస్టమర్స్ పేర్లు, వాళ్ళు కొన్న ఐటమ్స్ ఇస్తే.. GST క్యాలిక్యులేట్ చేసి ఆటోమాటిక్ గా ఒక అందమైన బిల్ ఫార్మాట్ ని క్రియేట్ చేసే ప్రోగ్రామ్:</p>`,
        code: `# ప్రాజెక్ట్ 2: ఆటోమేటెడ్ ఇన్వాయిస్ జనరేటర్
class InvoiceEngine:
    def generate(self, inv_no, name, items):
        subtotal = 0
        details = []
        for desc, qty, price in items:
            line_tot = qty * price
            subtotal += line_tot
            details.append(f"  • {desc:20} (Qty: {qty} x ₹{price}) = ₹{line_tot:,.2f}")
        
        gst = subtotal * 0.18
        grand = subtotal + gst

        bill = [
            f"==================================================",
            f"  TAX INVOICE (మానా కంపైలర్)",
            f"  Invoice: {inv_no} | Billed To: {name}",
            f"--------------------------------------------------",
            *details,
            f"--------------------------------------------------",
            f"  Subtotal:                      ₹{subtotal:,.2f}",
            f"  GST (18%):                     ₹{gst:,.2f}",
            f"  GRAND TOTAL:                   ₹{grand:,.2f}",
            f"=================================================="
        ]
        return "\\n".join(bill)

engine = InvoiceEngine()
bill_text = engine.generate(
    inv_no="INV-101", name="Balaji (TechCorp)", 
    items=[("Python Course", 5, 4999), ("Cloud Setup", 1, 15000)]
)
print(bill_text)`,
        codeTitle: 'Project 2: Automated Tax Invoice Generation Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 PDF లా మార్చొచ్చు:</strong>
          <p style="margin-top:6px;">దీని మీద <code>reportlab</code> లేదా <code>pdfkit</code> ప్యాకేజ్ వాడితే ఈ టెక్స్ట్ కాస్తా ఒరిజినల్ పీడీఎఫ్ లాగా సేవ్ అవుతుంది.</p>
        </div>`
      },
      {
        title: '3. ప్రాజెక్ట్ 3: స్మార్ట్ ఫోల్డర్ ఆర్గనైజర్ (విత్ లాగ్స్)',
        body: `<p>ప్రాజెక్ట్ 62 లో లాగే ఫైల్స్ ని సర్దడంతో పాటు.. ఏ టైమ్ కి ఏ ఫైల్ ఎక్కడికి మూవ్ అయిందో రికార్డ్ (Audit Log) మెయింటైన్ చేసే ప్రోగ్రామ్:</p>`,
        code: `# ప్రాజెక్ట్ 3: ఆడిట్ లాగ్ తో ఫైల్స్ ఆర్గనైజర్
class SmartOrganizer:
    def __init__(self):
        self.logs = [] # ఏం జరిగిందో రికార్డ్ చేయడానికి

    def organize(self, files):
        for file in files:
            ext = file.split(".")[-1].lower() if "." in file else ""
            
            if ext in ["pdf", "txt"]: folder = "Documents"
            elif ext in ["png", "jpg"]: folder = "Images"
            elif ext in ["py", "js"]: folder = "Code"
            else: folder = "Others"
            
            action = f"[SORTED] '{file}' ──► [{folder}/]"
            self.logs.append(action)
            print("•", action)

org = SmartOrganizer()
print("--- 📂 ఫైల్స్ ని సర్దుతున్నాం ---")
org.organize(["notes.pdf", "photo.png", "main.py", "unknown.xyz"])

print(f"\\n✅ సక్సెస్! లాగ్స్ లో {len(org.logs)} యాక్షన్స్ రికార్డ్ అయ్యాయి.")`,
        codeTitle: 'Project 3: Intelligent File Organizer with Audit Logging',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 లాగ్స్ ఎందుకు?:</strong>
          <p style="margin-top:6px;">రేపు పొద్దున్న ఏదైనా ఇంపార్టెంట్ ఫైల్ ఎక్కడికి వెళ్ళిందో దొరకకపోతే.. ఈ లాగ్స్ ఓపెన్ చేసి చూస్తే తెలిసిపోతుంది.</p>
        </div>`
      },
      {
        title: '4. ప్రాజెక్ట్ 4: అందరికీ ఒకేసారి ఈమెయిల్స్ పంపడం',
        body: `<p>కస్టమర్స్ లిస్ట్ ని చదివి, వాళ్ళ పేర్లు (టెంప్లేట్ లోపల) మార్చి, అందరికీ పర్సనలైజ్డ్ గా బల్క్ ఈమెయిల్స్ పంపే ప్రోగ్రామ్:</p>`,
        code: `# ప్రాజెక్ట్ 4: బల్క్ ఈమెయిల్స్ పంపే ప్రోగ్రామ్
class BatchEmail:
    def send_mails(self, users, template):
        print(f"--- 📧 {len(users)} మందికి మెయిల్స్ పంపుతున్నాం ---")
        count = 0
        for u in users:
            # {{name}}, {{topic}} ప్లేస్ లో వాళ్ళ రియల్ డీటెయిల్స్ పెడుతున్నాం:
            body = template.replace("{{name}}", u["name"]).replace("{{topic}}", u["topic"])
            
            print(f"📨 పంపాం -> {u['email']:18} | సబ్జెక్ట్: {u['topic']} అప్డేట్స్")
            count += 1
        print(f"✅ సక్సెస్! {count} మెయిల్స్ వెళ్ళాయి.")

mailer = BatchEmail()
users_list = [
    {"name": "Balaji", "email": "balaji@mail.com", "topic": "Python"},
    {"name": "Alex",   "email": "alex@mail.com",   "topic": "DevOps"}
]

template = "హలో {{name}}, ఈ వారం {{topic}} లో కొత్త ఫీచర్స్ వచ్చాయి!"
mailer.send_mails(users_list, template)`,
        codeTitle: 'Project 4: Automated Batch Email Dispatcher',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 స్పామ్ కాకుండా..:</strong>
          <p style="margin-top:6px;">అందరికీ ఒకేసారి కొడితే గూగుల్ వాళ్ళు స్పామ్ అనుకుంటారు. అందుకే లూప్ లోపల ఒక చిన్న డిలే (sleep) పెడితే సేఫ్.</p>
        </div>`
      },
      {
        title: '5. ప్రాజెక్ట్ 5: డాకర్ (Docker) & CI/CD పైప్ లైన్ గ్లింప్స్',
        body: `<p>మనం రాసిన కోడ్ నా లాప్ టాప్ లో పనిచేస్తుంది, సర్వర్ లో పనిచేయట్లేదు అనే ప్రాబ్లమ్ రాకుండా <strong>Docker</strong> వాడతారు.</p>`,
        code: `# ప్రాజెక్ట్ 5: ప్రొడక్షన్ లో వాడే Dockerfile (బ్లూప్రింట్)

dockerfile = """
# 1. పైథాన్ సర్వర్ ఇమేజ్ ని తీసుకుంటున్నాం
FROM python:3.12-slim

# 2. యాప్ కి ఒక ఫోల్డర్ క్రియేట్ చేస్తున్నాం
WORKDIR /app

# 3. ప్యాకేజెస్ ఫైల్ ని కాపీ చేసి ఇన్స్టాల్ చేస్తున్నాం
COPY requirements.txt .
RUN pip install -r requirements.txt

# 4. మన కోడ్ మొత్తాన్ని అందులోకి కాపీ చేస్తున్నాం
COPY . .

# 5. వెబ్ సర్వర్ ఓపెన్ చేసి రన్ చేస్తున్నాం
EXPOSE 8000
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8000"]
"""

print("--- 🐳 డాకర్ (Dockerfile) కన్ఫిగరేషన్ ---")
print(dockerfile.strip())`,
        codeTitle: 'Project 5: Production Dockerfile and GitHub Actions CI/CD Pipeline',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 డాకర్ ఎందుకు?:</strong>
          <p style="margin-top:6px;">ఇది మన యాప్ కీ, దానికి కావాల్సిన సాఫ్ట్ వేర్స్ కీ ఒక బాక్స్ (కంటైనర్) లాంటిది. దాన్ని తీసుకెళ్లి ఏ కంప్యూటర్ లో వేసినా పర్ఫెక్ట్ గా రన్ అవుతుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'డాకర్ లోపల రూట్ (Root) పర్మిషన్స్ తో రన్ చేయడం',
      text: 'రియల్ ప్రాజెక్ట్స్ లో ఎప్పుడూ Docker కంటైనర్ ని అడ్మిన్ (Root) పర్మిషన్స్ తో రన్ చేయకూడదు. హ్యాకర్స్ కి ఈజీ అవుతుంది. యూజర్ ని క్రియేట్ చేసి (USER appuser) వాళ్ళతోనే రన్ చేయించాలి.'
    },
    tryIt: {
      desc: 'ప్రాజెక్ట్ 1 లో ఉన్న PriceMonitor కి కొత్త లాప్ టాప్ యాడ్ చేసి, ప్రైస్ తగ్గితే మెసేజ్ వచ్చేలా కోడ్ రాయండి.',
      code: `monitor = PriceMonitor()
monitor.add_item("P1", "Gaming Laptop", target_price=90000, current_price=105000)

alert = monitor.check_price("P1", 89999)
print(alert)`
    },
    faqs: [
      {
        q: 'CI/CD అంటే ఏంటి?',
        a: 'కోడ్ రాసి పుష్ చేయగానే ఆటోమాటిక్ గా టెస్ట్స్ రన్ అవ్వడాన్ని CI (Continuous Integration) అంటారు. అవి పాస్ అయితే ఆటోమాటిక్ గా సర్వర్ లోకి వెళ్లి లైవ్ అవ్వడాన్ని CD అంటారు.'
      }
    ]
  }
];
