// Phase 10: Web Development Data (Flask & Django with Deep Conceptual Foundations & 6 Capstone Projects)
module.exports = [
  // =========================================================================
  // CHAPTER 48: FLASK FUNDAMENTALS & ROUTING
  // =========================================================================
  {
    num: 48,
    phaseId: 'phase10',
    phaseTitle: 'Phase 10: Web Development',
    slug: '48-python-flask-fundamentals-and-routing',
    title: 'Flask Fundamentals & Routing (తెలుగులో)',
    badge: '48. Flask Basics & Routing',
    subtopics: 'Microframeworks vs Full-Stack · Flask(__name__) · WSGI Request Lifecycle · Dynamic Routing (<int:id>) · HTTP Methods · Request Parsing (args vs form)',
    desc: 'పైథాన్ తో వెబ్సైట్స్ ఎలా తయారు చేస్తారు? Flask అనే లైట్ వెయిట్ ఫ్రేమ్ వర్క్ తో ఫస్ట్ వెబ్ సర్వర్ ని స్టార్ట్ చేద్దాం. బ్రౌజర్ నుంచి వచ్చే లింక్స్ ని (Routing) మన పైథాన్ కోడ్ ఎలా అర్థం చేసుకుంటుందో చూద్దాం.',
    sections: [
      {
        title: '1. Flask అంటే ఏంటి? (Microframework vs Full-Stack)',
        body: `<p>పైథాన్ లో వెబ్ బ్యాకెండ్ రాయడానికి మెయిన్ గా రెండు రకాల ఫ్రేమ్ వర్క్స్ ఉంటాయి:</p>
        
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>ఫీచర్</th><th>Microframework (Flask / FastAPI)</th><th>Full-Stack (Django)</th></tr>
          <tr><td><strong>ఫిలాసఫీ</strong></td><td><strong>చాలా సింపుల్:</strong> ఇది కేవలం బేసిక్ కనెక్షన్ (Routing) మాత్రమే ఇస్తుంది. డేటాబేస్, లాగిన్స్ అన్నీ మనమే సెట్ చేసుకోవాలి.</td><td><strong>అన్నీ వాళ్లే ఇస్తారు (Batteries-Included):</strong> డేటాబేస్ లింక్, అడ్మిన్ ప్యానెల్, లాగిన్స్ అన్నీ డీఫాల్ట్ గా వచ్చేస్తాయి.</td></tr>
          <tr><td><strong>నేర్చుకోవడం</strong></td><td>చాలా ఈజీ; ఒకే ఒక చిన్న ఫైల్ తో స్టార్ట్ చేయొచ్చు.</td><td>కొంచెం కష్టం; ఫోల్డర్స్ ఎక్కడున్నాయి, సెట్టింగ్స్ ఎలా అని తెలుసుకోవాలి.</td></tr>
          <tr><td><strong>ఎక్కడ వాడతారు?</strong></td><td>చిన్న చిన్న API లు, మైక్రో సర్వీసెస్, సింపుల్ వెబ్ యాప్స్ చేయడానికి.</td><td>పెద్ద పెద్ద ప్రాజెక్ట్స్ (కంపెనీ పోర్టల్స్, E-Commerce యాప్స్) చేయడానికి.</td></tr>
        </table>

        <h4 style="color:#10b981; margin:16px 0 8px;">WSGI అంటే ఏంటి?</h4>
        <p><strong>WSGI (Web Server Gateway Interface)</strong> అంటే... మన పైథాన్ కోడ్ కి, ఇంటర్నెట్ లోని బ్రౌజర్ కి మధ్యలో ఉండే ఒక ట్రాన్స్లేటర్ లాంటిది. ఇది బ్రౌజర్ నుంచి వచ్చే రిక్వెస్ట్ ని పైథాన్ కి అర్థమయ్యేలా చెప్తుంది.</p>`,
        code: `# Flask తో ఒక సింపుల్ వెబ్ సర్వర్:
from flask import Flask, jsonify, request

# 1. Flask యాప్ ని స్టార్ట్ చేద్దాం:
app = Flask(__name__)

# 2. ఎవరైనా మెయిన్ పేజీ (/) ఓపెన్ చేస్తే ఏం జరగాలో రాద్దాం:
@app.route("/", methods=["GET"])
def home():
    return "<h1>🚀 మన కంపైలర్ కి స్వాగతం!</h1><p>సర్వర్ ఆన్ లో ఉంది.</p>"

# 3. Dynamic Route: ఎవరైనా /users/42 అని ఇస్తే 42 ని పైథాన్ కి పంపుతుంది:
@app.route("/users/<int:user_id>", methods=["GET"])
def get_user_by_id(user_id):
    # డేటాని JSON (డిక్షనరీ) ఫార్మాట్ లో బ్రౌజర్ కి పంపుదాం:
    return jsonify({
        "user_id": user_id,
        "name": f"Developer #{user_id}",
        "status": "Active"
    })

# 4. సర్వర్ ని రన్ చేద్దాం:
if __name__ == "__main__":
    print("⚡ లోకల్ సర్వర్ http://127.0.0.1:5000 మీద స్టార్ట్ అయ్యింది")
    # app.run(debug=True, port=5000)`,
        codeTitle: 'Example 1: Minimal Flask Web Server with Dynamic Routing',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఈ కోడ్ ఏం చేస్తుంది?:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>@app.route("/")</code>: ఎవరైనా మన లింక్ ని ఓపెన్ చేయగానే, ఈ ఫంక్షన్ ఆటోమాటిక్ గా రన్ అవ్వాలని చెప్తుంది.</li>
            <li><code>&lt;int:user_id&gt;</code>: ఎవరైనా <code>/users/abc</code> అని టైప్ చేస్తే ముందే ఆపేస్తుంది, నెంబర్స్ ఇస్తేనే లోపలికి పంపుతుంది.</li>
          </ul>
        </div>`
      },
      {
        title: '2. బ్రౌజర్ పంపే డేటాని పైథాన్ లో ఎలా చదవాలి? (Query Params & JSON)',
        body: `<p>బ్రౌజర్ నుంచి మనకి డేటా వస్తున్నప్పుడు, Flask లో దాన్ని <strong><code>request</code></strong> అనే ఆబ్జెక్ట్ ద్వారా చదువుతాం:</p>
        <ul>
          <li><strong><code>request.args</code> (Query Params):</strong> URL చివరలో <code>?q=python</code> లాగా వచ్చే డేటాని చదవడానికి.</li>
          <li><strong><code>request.form</code>:</strong> HTML లో ఫారమ్ (Forms) ఫిల్ చేసి సబ్మిట్ చేస్తే ఆ డేటా ఇక్కడికి వస్తుంది.</li>
          <li><strong><code>request.get_json()</code>:</strong> వేరే యాప్స్ నుంచి JSON డేటా వస్తే చదవడానికి.</li>
        </ul>`,
        code: `from flask import Flask, request, jsonify

app = Flask(__name__)

# మన దగ్గర ఉన్న చిన్న డేటాబేస్ (మెమరీలో):
PRODUCTS_DB = [
    {"id": 1, "name": "Mechanical Keyboard", "price": 2499.00},
    {"id": 2, "name": "Wireless Mouse", "price": 799.00}
]

@app.route("/api/products", methods=["GET", "POST"])
def handle_products():
    if request.method == "GET":
        # ఎవరైనా /api/products?max_price=1000 అని పంపితే:
        max_price = request.args.get("max_price", type=float)
        
        if max_price is not None:
            # ఫిల్టర్ చేసి ఇద్దాం:
            filtered = [p for p in PRODUCTS_DB if p["price"] <= max_price]
            return jsonify(filtered)
        
        # ఏమీ ఇవ్వకపోతే అన్నీ ఇచ్చేద్దాం:
        return jsonify(PRODUCTS_DB)

    elif request.method == "POST":
        # కొత్త ప్రోడక్ట్ ని క్రియేట్ చేయడానికి డేటా వస్తే:
        payload = request.get_json()
        
        if not payload or "name" not in payload:
            return jsonify({"error": "పేరు (name) ఇవ్వడం మర్చిపోయారు"}), 400

        new_item = {
            "id": len(PRODUCTS_DB) + 1,
            "name": payload["name"],
            "price": float(payload.get("price", 0))
        }
        PRODUCTS_DB.append(new_item)
        return jsonify({"message": "ప్రోడక్ట్ యాడ్ అయ్యింది!", "product": new_item}), 201`,
        codeTitle: 'Example 2: Handling Query Filters (GET) and JSON Payloads (POST)',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 సేఫ్ గా చదవడం:</strong>
          <p style="margin-top:6px;">డేటాని చదివేటప్పుడు <code>request.args['max_price']</code> అని డైరెక్ట్ గా అడగకూడదు (ఒకవేళ వాళ్ళు ఆ డేటా పంపకపోతే యాప్ క్రాష్ అవుతుంది). దానికి బదులు <code>.get('max_price')</code> వాడితే సేఫ్ గా వస్తుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Production లో debug=True పెట్టి రన్ చేయడం',
      text: 'లోకల్ గా మనం కోడ్ రాసుకునేటప్పుడు debug=True ఉంటే, ఎర్రర్ రాగానే బ్రౌజర్ లోనే కన్సోల్ వస్తుంది. కానీ లైవ్ లో ఇది ఆన్ చేసి పెడితే... హ్యాకర్స్ మన సర్వర్ లోకి దూరి మన కంప్యూటర్ నే కంట్రోల్ చేసేస్తారు! పబ్లిక్ గా రిలీజ్ చేసే ముందు దాన్ని తీసేయాలి.'
    },
    tryIt: {
      desc: 'ఒక /calculator/<operation> క్రియేట్ చేయండి. num1, num2 ని query parameters లా తీసుకుని కూడిక/తీసివేత చేసి JSON ఇవ్వాలి.',
      code: `from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/calculator/<operation>")
def calculate(operation):
    # num1, num2 తీసుకుంటున్నాం, లేకపోతే డీఫాల్ట్ గా 0
    n1 = request.args.get("num1", 0, type=float)
    n2 = request.args.get("num2", 0, type=float)

    if operation == "add": res = n1 + n2
    elif operation == "sub": res = n1 - n2
    elif operation == "mul": res = n1 * n2
    elif operation == "div": res = n1 / n2 if n2 != 0 else "ఎర్రర్: జీరో తో భాగించలేం"
    else: return jsonify({"error": "ఆపరేషన్ తప్పు"}), 400

    return jsonify({"operation": operation, "num1": n1, "num2": n2, "result": res})`
    },
    faqs: [
      {
        q: 'Flask కీ, FastAPI కీ తేడా ఏంటి?',
        a: 'Flask పాతది, నమ్మకమైనది, HTML టెంప్లేట్స్ కి బాగా పనికొస్తుంది. FastAPI కొత్తది, చాలా స్పీడ్ గా ఉంటుంది, ఆటోమాటిక్ గా డాక్యుమెంటేషన్ తయారు చేస్తుంది.'
      },
      {
        q: 'url_for() అంటే ఏంటి?',
        a: 'బ్రౌజర్ కి లింక్స్ ఇచ్చేటప్పుడు డైరెక్ట్ గా "/login" అని ఇవ్వకుండా url_for("login") అని ఇస్తాం. అప్పుడు రేపు మన లింక్ పేరు "/signin" కి మార్చినా, కోడ్ అంతా వెతుక్కుని మార్చుకోవాల్సిన అవసరం ఉండదు.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 49: FLASK JINJA2, FORMS & AUTHENTICATION
  // =========================================================================
  {
    num: 49,
    phaseId: 'phase10',
    phaseTitle: 'Phase 10: Web Development',
    slug: '49-python-flask-templates-forms-and-auth',
    title: 'Flask Jinja2, Forms & Auth (తెలుగులో)',
    badge: '49. Flask Templates & Auth',
    subtopics: 'Jinja2 Template Engine · Template Inheritance ({% extends %}) · Static Assets · Client Sessions (session) · Password Hashing (werkzeug.security) · Custom Error Pages (404)',
    desc: 'పైథాన్ నుంచి HTML పేజీలని ఎలా పంపించాలి (Jinja2 Templates)? ప్రతి పేజీలో నవబార్ లాంటివి కామన్ గా ఎలా ఉంచాలి? యూజర్ లాగిన్ అవ్వగానే వాళ్ళని ఎలా గుర్తుపెట్టుకోవాలి (Sessions)? పాస్వర్డ్స్ ని సెక్యూర్ గా ఎలా సేవ్ చేయాలో నేర్చుకుందాం.',
    sections: [
      {
        title: '1. Jinja2 Templates (HTML లో పైథాన్ వేరియబుల్స్ కలపడం)',
        body: `<p>పైథాన్ ఫంక్షన్ లోనే పదుల కొద్దీ HTML లైన్స్ రాయడం కష్టం కాబట్టి, Flask లో <strong>Jinja2</strong> అనే ఇంజిన్ వాడుతారు. HTML ఫైల్స్ ని <code>templates/</code> ఫోల్డర్ లో పెట్టి, <code>render_template('page.html', name='Balaji')</code> ద్వారా డేటాని పంపుతాం.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">Jinja2 రాసే విధానం:</h4>
        <ul>
          <li><strong><code>{{ వేరియబుల్ }}</code>:</strong> పైథాన్ వేరియబుల్ ని HTML లో ప్రింట్ చేయడానికి (ఉదా: <code>{{ name }}</code>).</li>
          <li><strong><code>{% లాజిక్ %}</code>:</strong> if కండిషన్స్, for లూప్స్ వాడటానికి (ఉదా: <code>{% if is_admin %} ... {% endif %}</code>).</li>
        </ul>

        <h4 style="color:#10b981; margin:16px 0 8px;">Template Inheritance (DRY కోడింగ్):</h4>
        <p>ప్రతి పేజీలో పైన మెనూ (Navbar), కింద ఫూటర్ రాయాలంటే విసుగొస్తుంది. అందుకే ఒక <strong><code>base.html</code></strong> క్రియేట్ చేసి అందులో మెనూ రాసి, కింద పేజీల్లో దాన్ని వాడుకుంటాం (Inherit).</p>`,
        code: `<!-- 1. BASE TEMPLATE: templates/base.html (మెయిన్ పేజీ లేఅవుట్) -->
<!DOCTYPE html>
<html>
<head>
  <title>{% block title %}మై వెబ్సైట్{% endblock %}</title>
</head>
<body>
  <nav>
    <a href="/">హోమ్</a> | <a href="/dashboard">డ్యాష్ బోర్డు</a>
  </nav>

  <!-- ఇక్కడ ఏ పేజీ వస్తే ఆ పేజీ కంటెంట్ వస్తుంది -->
  <main>
    {% block content %}
    {% endblock %}
  </main>
</body>
</html>

<!-- 2. CHILD TEMPLATE: templates/dashboard.html (డ్యాష్ బోర్డు పేజీ) -->
{% extends "base.html" %} <!-- పైన ఉన్న base.html ని వాడమని చెప్తున్నాం -->

{% block title %}యూజర్ డ్యాష్ బోర్డు{% endblock %}

{% block content %}
  <h2>వెల్కమ్ బ్యాక్, {{ username }}! 👋</h2>
  <h3>మీ కోర్సులు:</h3>
  <ul>
    {% for course in courses %}
      <li>{{ course.title }} - Instructor: {{ course.instructor }}</li>
    {% else %}
      <li>ఇంకా ఏ కోర్సుల్లో చేరలేదు.</li>
    {% endfor %}
  </ul>
{% endblock %}`,
        codeTitle: 'Jinja2 Blueprint: Base Layout and Child Template Inheritance',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Template Filters (మ్యాజిక్):</strong>
          <p style="margin-top:6px;">Jinja2 లో <code>{{ username|upper }}</code> అని రాస్తే ఆటోమాటిక్ గా క్యాపిటల్ లెటర్స్ లో వస్తుంది. <code>{{ courses|length }}</code> అంటే ఎన్ని కోర్సులు ఉన్నాయో కౌంట్ వస్తుంది.</p>
        </div>`
      },
      {
        title: '2. లాగిన్స్ & సెక్యూర్ పాస్వర్డ్స్ (Sessions & Hashing)',
        body: `<p>HTTP అనేది "స్టేట్ లెస్"... అంటే ఎవరొచ్చారో దానికి గుర్తుండదు. అందుకే లాగిన్ అయిన తర్వాత ఆ యూజర్ ని గుర్తుపెట్టుకోవడానికి Flask లో <strong><code>session</code></strong> వాడతాం. (ఇది బ్రౌజర్ కుకీస్ లో సేవ్ అవుతుంది).</p>
        
        <h4 style="color:#ef4444; margin:16px 0 8px;">ముఖ్యమైన రూల్: పాస్వర్డ్స్ డైరెక్ట్ గా సేవ్ చేయకూడదు!</h4>
        <p>ఒకవేళ హ్యాకర్ డేటాబేస్ ఓపెన్ చేసినా కూడా పాస్వర్డ్స్ తెలియకుండా ఉండాలంటే, వాటిని <strong>Hash (జిబరిష్ లాగా)</strong> చేసి సేవ్ చేయాలి.</p>`,
        code: `from flask import Flask, request, session, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
# కుకీస్ ని హ్యాక్ చేయకుండా ఉండటానికి ఇచ్చే సీక్రెట్ కీ:
app.secret_key = "super_secret_key_123"

# సిమ్యులేట్ చేసిన డేటాబేస్ (పాస్వర్డ్ హ్యాష్ చేసి ఉంది):
USERS_DB = {
    "balaji": generate_password_hash("Secret2026") # ఇది చూడటానికి pbkdf2:sha256.. లాగా ఉంటుంది
}

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        user = request.form.get("username")
        pwd = request.form.get("password")

        # 1. యూజర్ ఉన్నాడా? పాస్వర్డ్ కరెక్టేనా చెక్ చేద్దాం:
        stored_hash = USERS_DB.get(user)
        if stored_hash and check_password_hash(stored_hash, pwd):
            # 2. పాస్వర్డ్ కరెక్ట్! కాబట్టి సెషన్ లో పెట్టుకుందాం:
            session["user"] = user
            return redirect(url_for("profile"))
        
        return "<h3>❌ లాగిన్ ఫెయిల్!</h3><a href='/login'>మళ్ళీ ట్రై చేయండి</a>", 401

    # లాగిన్ ఫారమ్ చూపిద్దాం:
    return '''
    <h2>🔐 లాగిన్</h2>
    <form method="POST">
        <input type="text" name="username" placeholder="Username" required><br><br>
        <input type="password" name="password" placeholder="Password" required><br><br>
        <button type="submit">Sign In</button>
    </form>
    '''

@app.route("/profile")
def profile():
    # 3. లాగిన్ అవ్వకపోతే ప్రొఫైల్ చూపించకూడదు:
    if "user" not in session:
        return redirect(url_for("login"))
    return f"<h2>🎉 హలో, {session['user']}! మీ ప్రొఫైల్ లోకి వచ్చారు.</h2><a href='/logout'>లాగ్ ఔట్</a>"

@app.route("/logout")
def logout():
    session.pop("user", None) # సెషన్ డిలీట్ చేద్దాం
    return redirect(url_for("login"))`,
        codeTitle: 'Example 2: Complete User Authentication Flow with Password Hashing & Sessions',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 హ్యాషింగ్ ఎందుకు?:</strong>
          <p style="margin-top:6px;"><code>generate_password_hash()</code> వాడితే పాస్వర్డ్ ఒక కోడ్ లాగా మారుతుంది. ఆ కోడ్ ని చూసి ఒరిజినల్ పాస్వర్డ్ ఏంటో ఎవరూ (కనీసం వెబ్సైట్ ఓనర్ కూడా) కనిపెట్టలేరు.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Session లో క్రెడిట్ కార్డ్స్ / పాస్వర్డ్స్ సేవ్ చేయడం',
      text: 'Session అనేది బ్రౌజర్ కుకీ లో సేవ్ అవుతుంది. యూజర్ దాన్ని మార్చలేడు కానీ, దాన్ని ఓపెన్ చేసి చదవగలడు (అది జస్ట్ Base64 లో ఉంటుంది). అందుకే సెషన్ లో కేవలం యూజర్ ఐడీ లాంటివి మాత్రమే పెట్టుకోవాలి, పాస్వర్డ్స్ లాంటి సెన్సిటివ్ డేటా అస్సలు పెట్టకూడదు.'
    },
    tryIt: {
      desc: 'ఒక పాస్వర్డ్ ఇచ్చి దాన్ని హ్యాష్ చేసి ప్రింట్ చేయండి. ఆ తర్వాత మళ్ళీ కరెక్ట్ పాస్వర్డ్, రాంగ్ పాస్వర్డ్ ఇచ్చి మ్యాచ్ అవుతుందో లేదో చెక్ చేయండి.',
      code: `from werkzeug.security import generate_password_hash, check_password_hash

raw_pass = "PythonRocks2026"
# కొత్త యూజర్ వచ్చినప్పుడు ఇలా హ్యాష్ చేసి డేటాబేస్ లో సేవ్ చేస్తాం:
hashed_pass = generate_password_hash(raw_pass)

print("హ్యాష్ చేసిన పాస్వర్డ్:", hashed_pass)
print("కరెక్ట్ పాస్వర్డ్ తో మ్యాచ్: ", check_password_hash(hashed_pass, "PythonRocks2026")) # True వస్తుంది
print("రాంగ్ పాస్వర్డ్ తో మ్యాచ్:  ", check_password_hash(hashed_pass, "WrongPass"))      # False వస్తుంది`
    },
    faqs: [
      {
        q: 'CSRF (Cross-Site Request Forgery) అంటే ఏంటి?',
        a: 'ఇది ఒక హ్యాకింగ్ టెక్నిక్. మీరు ఫేస్బుక్ లో లాగిన్ అయి ఉన్నప్పుడు, హ్యాకర్ ఒక లింక్ ఇచ్చి దాన్ని క్లిక్ చేయిస్తే... మీ అకౌంట్ నుంచి పోస్ట్ వెళ్లిపోతుంది. దీన్ని ఆపడానికే ఫారమ్స్ లో "CSRF టోకెన్" వాడతాం.'
      },
      {
        q: 'నేను 404 పేజీని నాకు నచ్చినట్టు డిజైన్ చేయొచ్చా?',
        a: 'చేయొచ్చు! @app.errorhandler(404) అని ఒక ఫంక్షన్ రాసి, అందులో మీకు నచ్చిన HTML (లేదా జోక్) పెట్టి పంపొచ్చు.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 50: DJANGO ARCHITECTURE, MODELS & ADMIN PANEL
  // =========================================================================
  {
    num: 50,
    phaseId: 'phase10',
    phaseTitle: 'Phase 10: Web Development',
    slug: '50-python-django-architecture-models-and-admin',
    title: 'Django Architecture & ORM (తెలుగులో)',
    badge: '50. Django Architecture & ORM',
    subtopics: 'The "Batteries-Included" Philosophy · Projects vs Apps · MTV (Model-Template-View) Pattern · Django ORM Models · Migrations · Auto-Generated Admin Panel',
    desc: 'పెద్ద పెద్ద ప్రాజెక్ట్స్ కి వాడే Django ఫ్రేమ్ వర్క్ లోకి ఎంటర్ అవుదాం. Django లో Projects, Apps అంటే ఏంటి? మోడల్స్ వాడి డేటాబేస్ ని ఎలా క్రియేట్ చేయాలి? ఆటోమాటిక్ గా వచ్చే Admin Panel గురించి నేర్చుకుందాం.',
    sections: [
      {
        title: '1. జాంగో ఫిలాసఫీ (Batteries-Included) & MTV ఆర్కిటెక్చర్',
        body: `<p><strong>Django</strong> అనేది పైథాన్ లో మోస్ట్ పవర్ఫుల్ వెబ్ ఫ్రేమ్ వర్క్. ఇన్స్టాగ్రామ్, పింట్రెస్ట్ లాంటి పెద్ద యాప్స్ దీని మీదే రన్ అవుతున్నాయి.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">"Batteries-Included" అంటే ఏంటి?:</h4>
        <p>ఫ్లాస్క్ లో లాగిన్ సిస్టమ్, డేటాబేస్, ఫారమ్స్ అన్నీ మనమే వెతుక్కుని యాడ్ చేసుకోవాలి. కానీ జాంగో లో <strong>అన్నీ వాళ్లే ఇచ్చేస్తారు</strong>. జస్ట్ సెటప్ చేసుకుని కోడ్ రాయడమే.</p>

        <h4 style="color:#10b981; margin:16px 0 8px;">MTV (Model-Template-View) ప్యాట్రన్:</h4>
        <p>జాంగో లో కోడ్ ని మూడు ముక్కలుగా విడదీసి రాస్తారు (కన్ఫ్యూజన్ లేకుండా):</p>
        <ul>
          <li><strong>Model (M):</strong> ఇది డేటాబేస్ కి సంబంధించింది. మన టేబుల్స్ ఎలా ఉండాలి (ఉదా: యూజర్స్ టేబుల్) అనేది ఇక్కడే రాస్తాం.</li>
          <li><strong>Template (T):</strong> ఇది ఫ్రంట్-ఎండ్ కి సంబంధించింది (HTML). యూజర్ కి పేజీ ఎలా కనిపించాలి అనేది రాస్తాం.</li>
          <li><strong>View (V):</strong> ఇది మెదడు లాంటిది (లాజిక్). బ్రౌజర్ నుంచి రిక్వెస్ట్ రాగానే డేటాబేస్ కి (Model) వెళ్లి డేటా తెచ్చుకుని, దాన్ని HTML (Template) కి ఇచ్చి పంపుతుంది.</li>
        </ul>`,
        code: `# జాంగో ప్రాజెక్ట్ ఫైల్స్ ఎలా ఉంటాయో చూద్దాం:
"""
my_ecommerce_project/       <-- ఇది మెయిన్ ప్రాజెక్ట్
├── manage.py               <-- సర్వర్ స్టార్ట్ చేయడానికి, కమాండ్స్ రన్ చేయడానికి టూల్
├── my_ecommerce_project/   <-- ప్రాజెక్ట్ సెట్టింగ్స్ ఫోల్డర్
│   ├── settings.py         <-- పాస్వర్డ్స్, డేటాబేస్ సెట్టింగ్స్ అన్నీ ఇక్కడే ఉంటాయి
│   ├── urls.py             <-- మెయిన్ రూట్స్ (లింక్స్ ఎటు వెళ్లాలో చెప్పే మ్యాప్)
└── store_app/              <-- ప్రాజెక్ట్ లోపల ఒక చిన్న యాప్ (ఉదా: స్టోర్ కోసం)
    ├── models.py           <-- డేటాబేస్ టేబుల్స్ క్రియేట్ చేసే ఫైల్
    ├── views.py            <-- బ్రౌజర్ రిక్వెస్ట్ వస్తే ఏం చేయాలో రాసే ఫైల్ (లాజిక్)
    ├── urls.py             <-- ఈ స్టోర్ యాప్ కి సంబంధించిన లింక్స్ మ్యాప్
    ├── admin.py            <-- అడ్మిన్ ప్యానెల్ లో ఏమేం కనపడాలో రాసే ఫైల్
    └── migrations/         <-- మనం డేటాబేస్ లో చేసిన మార్పుల హిస్టరీ ఫైల్స్
"""`,
        codeTitle: 'Architecture Blueprint: Django Project vs Modular App Directory Tree',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">💡 Project vs App డిఫరెన్స్:</strong>
          <p style="margin-top:6px;"><strong>Project</strong> అంటే మీ వెబ్సైట్ మొత్తం. <strong>App</strong> అంటే అందులో ఒక చిన్న ముక్క (ఉదాహరణకు: <code>blog_app</code>, <code>payment_app</code>). ఒక యాప్ ని తీసి వేరే ప్రాజెక్ట్ లో కూడా వాడుకోవచ్చు.</p>
        </div>`
      },
      {
        title: '2. Models, Migrations & ఆటోమాటిక్ Admin Dashboard',
        body: `<p>జాంగో లో డేటాబేస్ క్రియేట్ చేయడానికి SQL కోడ్ రాయక్కర్లేదు. పైథాన్ లో <code>models.Model</code> వాడి క్లాస్ రాస్తే చాలు.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">Migrations (మైగ్రేషన్స్):</h4>
        <p>మనం క్లాస్ రాశాక అది డేటాబేస్ కి ఎక్కడానికి 2 కమాండ్స్ వాడతాం:</p>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong><code>python manage.py makemigrations</code>:</strong> మనం రాసిన క్లాస్ లో ఏమేం మార్పులు ఉన్నాయో చూసుకుని ఒక "బ్లూప్రింట్" ఫైల్ తయారు చేస్తుంది.</li>
          <li><strong><code>python manage.py migrate</code>:</strong> ఆ బ్లూప్రింట్ ని తీసుకువెళ్లి డేటాబేస్ లో టేబుల్స్ క్రియేట్ చేస్తుంది.</li>
        </ol>`,
        code: `# 1. డేటాబేస్ టేబుల్స్ రాద్దాం (store_app/models.py):
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50) # 50 క్యారెక్టర్స్ లోపు పేరు

    def __str__(self):
        return self.name

class Product(models.Model):
    # Foreign Key వాడి Category కి లింక్ చేద్దాం:
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.title} (₹{self.price})"

# 2. అడ్మిన్ ప్యానెల్ కి రిజిస్టర్ చేద్దాం (store_app/admin.py):
from django.contrib import admin
from .models import Category, Product

# కేటగిరీ ని సింపుల్ గా యాడ్ చేస్తున్నాం
admin.site.register(Category)

# ప్రోడక్ట్ ని కొంచెం కస్టమైజ్ చేసి యాడ్ చేద్దాం:
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    # అడ్మిన్ లో ఏమేం కాలమ్స్ కనపడాలో చెప్తున్నాం
    list_display = ("title", "category", "price", "stock", "is_active")
    # రైట్ సైడ్ ఫిల్టర్ చేయడానికి
    list_filter = ("is_active", "category")
    # సెర్చ్ బార్ కోసం
    search_fields = ("title",)
    # అక్కడికక్కడే ప్రైస్ మార్చుకోవడానికి
    list_editable = ("price", "stock", "is_active")`,
        codeTitle: 'Example 2: Django ORM Relational Models & Custom Admin Configuration',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Django Admin పవర్:</strong>
          <p style="margin-top:6px;">జస్ట్ <code>admin.py</code> లో ఒక 8 లైన్స్ కోడ్ రాస్తే చాలు... జాంగో మనకు ఒక కంప్లీట్ అడ్మిన్ డ్యాష్ బోర్డు (సెర్చ్ బార్స్, ఫిల్టర్స్ తో సహా) ఇచ్చేస్తుంది! (అదే ఫ్లాస్క్ లో అయితే ఇదంతా స్క్రాచ్ నుంచి మనమే రాయాలి).</p>
        </div>`
      }
    ],
    mistake: {
      title: 'డైరెక్ట్ గా SQL లోకి వెళ్లి టేబుల్స్ మార్చడం',
      text: 'జాంగో వాడుతున్నప్పుడు, ఎప్పుడూ డేటాబేస్ (PhpMyAdmin లాంటివి) ఓపెన్ చేసి అక్కడ కొత్త కాలమ్స్ యాడ్ చేయడం లాంటివి చేయకూడదు. జాంగో మైగ్రేషన్స్ కన్ఫ్యూజ్ అయ్యి, నెక్స్ట్ టైమ్ ఎర్రర్స్ వస్తాయి. ఏదైనా మార్చాలంటే models.py లోనే మార్చాలి.'
    },
    tryIt: {
      desc: 'జాంగో ORM ఫిల్టర్ ని సిమ్యులేట్ చేద్దాం: "Electronics" కేటగిరీలో ఉన్న, యాక్టివ్ గా ఉన్న ప్రోడక్ట్స్ ని ఫిల్టర్ చేసి ప్రింట్ చేయండి.',
      code: `products = [
    {"title": "Earphones", "cat": "Electronics", "price": 1499.0, "is_active": True},
    {"title": "Laptop", "cat": "Electronics", "price": 65000.0, "is_active": True},
    {"title": "Desk Lamp", "cat": "Furniture", "price": 899.0, "is_active": True},
    {"title": "USB Cable", "cat": "Electronics", "price": 299.0, "is_active": False}
]

# జాంగో లో అయితే ఇలా రాస్తాం: Product.objects.filter(is_active=True, category="Electronics")
matched = [p for p in products if p["is_active"] and p["cat"] == "Electronics"]
print("మ్యాచ్ అయిన ప్రోడక్ట్స్:", matched)`
    },
    faqs: [
      {
        q: 'on_delete=models.CASCADE అంటే ఏంటి?',
        a: 'ఒకవేళ మీరు అడ్మిన్ లో ఒక Category ని డిలీట్ చేస్తే, దానికి సంబంధించిన ప్రోడక్ట్స్ అన్నీ కూడా ఆటోమాటిక్ గా డిలీట్ అయిపోతాయి (డేటా కరప్ట్ అవ్వకుండా).'
      },
      {
        q: 'అడ్మిన్ ప్యానెల్ లోకి లాగిన్ అవ్వాలంటే యూజర్ నేమ్ ఎలా క్రియేట్ చేయాలి?',
        a: 'టెర్మినల్ లో "python manage.py createsuperuser" అని రన్ చేసి మీ పేరు, పాస్వర్డ్ ఇస్తే సూపర్ యూజర్ అకౌంట్ క్రియేట్ అవుతుంది.'
      },
      {
        q: '__str__() ఫంక్షన్ మోడల్స్ లో ఎందుకు రాస్తాం?',
        a: 'ఇది రాయకపోతే అడ్మిన్ ప్యానెల్ లో "Product object (1)" అని కనిపిస్తుంది. రాస్తే మనం చెప్పిన పేరు "Laptop (₹65000)" లాగా నీట్ గా కనిపిస్తుంది.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 51: DJANGO VIEWS, TEMPLATES & AUTHENTICATION
  // =========================================================================
  {
    num: 51,
    phaseId: 'phase10',
    phaseTitle: 'Phase 10: Web Development',
    slug: '51-python-django-views-templates-and-auth',
    title: 'Django Views, Forms & Auth (తెలుగులో)',
    badge: '51. Django Views & Auth',
    subtopics: 'URL Dispatcher (path, include) · FBVs vs CBVs · Django Template Language (DTL) · ModelForms · django.contrib.auth · @login_required Decorator',
    desc: 'బ్రౌజర్ నుంచి వచ్చే లింక్స్ ని (URLs) జాంగో ఎలా కంట్రోల్ చేస్తుంది? ఫారమ్స్ ని ఆటోమాటిక్ గా ఎలా తయారు చేస్తుంది? జాంగో లో డీఫాల్ట్ గా వచ్చే సేఫ్ లాగిన్ సిస్టమ్ ని ఎలా వాడాలో నేర్చుకుందాం.',
    sections: [
      {
        title: '1. URLs మరియు Views (లాజిక్ ఎక్కడ రాయాలి?)',
        body: `<p>జాంగో లో ఎవరైనా ఒక లింక్ ని ఓపెన్ చేస్తే, ఫస్ట్ అది <code>urls.py</code> కి వెళుతుంది. అక్కడ ఆ లింక్ కి ఏ ఫంక్షన్ రన్ అవ్వాలో రాసి ఉంటుంది. ఆ ఫంక్షన్ నే <strong>View</strong> అంటారు (దీన్ని <code>views.py</code> లో రాస్తాం).</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">Views లో రెండు రకాలు:</h4>
        <ul>
          <li><strong>Function-Based Views (FBVs):</strong> ఇవి నార్మల్ పైథాన్ ఫంక్షన్స్ లాగా ఉంటాయి. చూడ్డానికి ఈజీగా అర్థమవుతాయి.</li>
          <li><strong>Class-Based Views (CBVs):</strong> ఫంక్షన్ బదులు క్లాస్ రాస్తాం. ఒకే కోడ్ ని మళ్ళీ మళ్ళీ రాయకుండా (Inheritance) జాంగో మనకు ముందే కొన్ని రెడీమేడ్ క్లాసెస్ (ListView, DetailView) ఇస్తుంది.</li>
        </ul>`,
        code: `# 1. లింక్స్ ఎక్కడికి వెళ్లాలో చెప్దాం (store_app/urls.py):
from django.urls import path
from . import views

urlpatterns = [
    # మెయిన్ పేజీ (Products List)
    path("", views.product_list_view, name="product_list"),
    # ఒక ప్రోడక్ట్ డీటెయిల్స్ పేజీ (ఉదా: /5/ ఓపెన్ చేస్తే)
    path("<int:product_id>/", views.product_detail_view, name="product_detail"),
    # కొత్త ప్రోడక్ట్ యాడ్ చేయడానికి (CBV)
    path("create/", views.ProductCreateView.as_view(), name="product_create"),
]

# 2. లాజిక్ రాద్దాం (store_app/views.py):
from django.shortcuts import render, get_object_or_404
from django.views.generic import CreateView
from .models import Product

# FBV - ఫంక్షన్ బేస్డ్ వ్యూ (అన్ని ప్రోడక్ట్స్ చూపించడానికి):
def product_list_view(request):
    products = Product.objects.filter(is_active=True)
    context = {"products": products, "page_title": "మన ప్రోడక్ట్స్"}
    return render(request, "store/product_list.html", context)

# FBV - ఒక్క ప్రోడక్ట్ చూపించడానికి:
def product_detail_view(request, product_id):
    # ఒకవేళ తప్పు ఐడీ ఇస్తే, ఆటోమాటిక్ గా 404 ఎర్రర్ చూపిస్తుంది!
    product = get_object_or_404(Product, id=product_id)
    return render(request, "store/product_detail.html", {"product": product})

# CBV - క్లాస్ బేస్డ్ వ్యూ (కొత్త ప్రోడక్ట్ క్రియేట్ చేయడానికి):
class ProductCreateView(CreateView):
    model = Product
    fields = ["title", "category", "price", "stock"]
    template_name = "store/product_form.html"
    success_url = "/"  # అయిపోయాక హోమ్ కి వెళ్ళిపోవాలి`,
        codeTitle: 'Example 1: Django URL Routing, FBVs and Generic CBVs',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 get_object_or_404 సూపర్ పవర్:</strong>
          <p style="margin-top:6px;">డేటాబేస్ లో లేని ఐడీ ని వెతికితే కోడ్ క్రాష్ అవుతుంది. అలా అవ్వకుండా, <code>get_object_or_404</code> వాడితే... ఐడీ లేకపోతే యూజర్ కి నీట్ గా "404 Not Found" పేజీ చూపిస్తుంది.</p>
        </div>`
      },
      {
        title: '2. ModelForms & యూజర్ లాగిన్ (Authentication)',
        body: `<p>జాంగో లో మనకు యూజర్స్ ని మేనేజ్ చేయడానికి <strong><code>django.contrib.auth</code></strong> అనే సూపర్ సిస్టమ్ డీఫాల్ట్ గా వస్తుంది (పాస్వర్డ్ హ్యాషింగ్, లాగిన్, లాగ్ ఔట్ అన్నీ ఉంటాయి).</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">ModelForms మ్యాజిక్:</h4>
        <p>HTML లో ఫారమ్ రాయాలంటే ప్రతి బాక్స్ కి కోడ్ రాయాలి (input type text...). కానీ జాంగో లో <strong>ModelForm</strong> వాడితే, మన డేటాబేస్ టేబుల్ ని బట్టి అదే ఆటోమాటిక్ గా ఫారమ్ ని, ఎర్రర్ మెసేజెస్ ని తయారు చేసేస్తుంది!</p>`,
        code: `# 1. ఫారమ్ క్రియేట్ చేద్దాం (store_app/forms.py):
from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ["title", "category", "price", "stock"]

# 2. వ్యూ లో లాగిన్ చెకింగ్ అండ్ ఫారమ్ వాడటం (store_app/views.py):
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render
from .forms import ProductForm

# ఈ పేజీ ఓపెన్ చేయాలంటే లాగిన్ అయి ఉండాలి అని చెప్తున్నాం:
@login_required(login_url="/accounts/login/")
def create_product_view(request):
    if request.method == "POST":
        # సబ్మిట్ చేసిన డేటాని ఫారమ్ కి ఇస్తున్నాం
        form = ProductForm(request.POST)
        
        # డేటా కరెక్ట్ గా ఉందా లేదా చెక్ చేస్తుంది (Validates)
        if form.is_valid(): 
            product = form.save() # ఆటోమాటిక్ గా డేటాబేస్ లో సేవ్ చేసేస్తుంది!
            return redirect("product_detail", product_id=product.id)
    else:
        # ఫస్ట్ టైమ్ ఓపెన్ చేసినప్పుడు ఖాళీ ఫారమ్ చూపిస్తాం
        form = ProductForm()

    return render(request, "store/product_form.html", {"form": form})`,
        codeTitle: 'Example 2: Django ModelForms & @login_required Protected View',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 form.is_valid() సేఫ్టీ:</strong>
          <p style="margin-top:6px;">యూజర్ ప్రైస్ దగ్గర "Free" అని అక్షరాలు ఇస్తే, <code>is_valid()</code> దాన్ని పసిగట్టి డేటాబేస్ లో సేవ్ చేయనివ్వదు. ఆటోమాటిక్ గా "దయచేసి నెంబర్ మాత్రమే ఇవ్వండి" అని ఎర్రర్ చూపిస్తుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'HTML ఫారమ్ లో {% csrf_token %} మర్చిపోవడం',
      text: 'జాంగో లో ఏ ఫారమ్ సబ్మిట్ చేయాలన్నా, కచ్చితంగా ఆ ఫారమ్ లోపల {% csrf_token %} అని రాయాలి. లేకపోతే సబ్మిట్ నొక్కగానే "403 Forbidden" ఎర్రర్ వస్తుంది. ఇది హ్యాకర్స్ మన ఫారమ్స్ ని వాడకుండా ఆపడానికి వాడే ఒక సెక్యూరిటీ టోకెన్.'
    },
    tryIt: {
      desc: '@login_required ఎలా పనిచేస్తుందో సిమ్యులేట్ చేద్దాం. యూజర్ ఆబ్జెక్ట్ లో is_authenticated ట్రూ ఉంటేనే లోపలికి పంపే ఫంక్షన్ రాయండి.',
      code: `class User:
    def __init__(self, name, logged_in):
        self.name = name
        self.is_authenticated = logged_in

def protect_dashboard(user):
    if not user.is_authenticated:
        return "🛑 ఆపండి: ముందు లాగిన్ పేజీకి వెళ్ళండి (/login)"
    return f"✅ వెల్కమ్! మీ డ్యాష్ బోర్డు ఓపెన్ అయ్యింది, {user.name}."

print(protect_dashboard(User("Guest", False)))
print(protect_dashboard(User("Balaji", True)))`
    },
    faqs: [
      {
        q: 'authenticate() కి, login() కి డిఫరెన్స్ ఏంటి?',
        a: 'authenticate(user, pass) అనేది యూజర్ నేమ్, పాస్వర్డ్ కరెక్టో కాదో చెక్ చేస్తుంది అంతే. లాగిన్ అవ్వరు. login(request, user) అనేది ఆ యూజర్ ని సెషన్ లోకి యాడ్ చేసి లాగిన్ చేస్తుంది.'
      },
      {
        q: 'నేను డీఫాల్ట్ User టేబుల్ ని మార్చొచ్చా?',
        a: 'మార్చొచ్చు! మీ ప్రాజెక్ట్ స్టార్ట్ చేసినప్పుడే AbstractUser ని వాడి మీకు నచ్చిన CustomUser (ఉదా: phone_number కాలమ్ యాడ్ చేసి) తయారు చేసుకోవడం చాలా బెస్ట్ ప్రాక్టీస్.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 52: DJANGO REST FRAMEWORK (DRF) & DEPLOYMENT
  // =========================================================================
  {
    num: 52,
    phaseId: 'phase10',
    phaseTitle: 'Phase 10: Web Development',
    slug: '52-python-django-rest-framework-and-deployment',
    title: 'Django REST Framework (DRF) & Deploy (తెలుగులో)',
    badge: '52. DRF & Deployment',
    subtopics: 'What is DRF? · Serializers & ModelSerializers · ViewSets & Routers · Token Authentication · Production Stack (Gunicorn, Nginx, WhiteNoise, Environment Variables)',
    desc: 'జాంగో తో మొబైల్ యాప్స్ కి, రియాక్ట్ యాప్స్ కి API ని (JSON డేటా) ఎలా పంపించాలి? (DRF గురించి). అలాగే మనం చేసిన వెబ్సైట్ ని పబ్లిక్ గా ఇంటర్నెట్ లో (Production) ఎలా డిప్లాయ్ చేయాలో నేర్చుకుందాం.',
    sections: [
      {
        title: '1. Django REST Framework (DRF) అంటే ఏంటి? (Serializers & ViewSets)',
        body: `<p>జాంగో మామూలుగా HTML పేజీలని ఇస్తుంది. కానీ మనకు రియాక్ట్ (React) యాప్ లేదా మొబైల్ యాప్ కి కేవలం డేటా (JSON) మాత్రమే కావాలి. దానికోసం వాడే ఒక పవర్ఫుల్ టూల్ పేరే <strong>Django REST Framework (DRF)</strong>.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">DRF లో 3 ముఖ్యమైన కాన్సెప్ట్స్:</h4>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong>Serializers (సీరియలైజర్స్):</strong> ఇవి మన డేటాబేస్ ఆబ్జెక్ట్స్ ని JSON ఫార్మాట్ లోకి మారుస్తాయి. (అలాగే బయటినుంచి వచ్చే JSON డేటాని మళ్ళీ డేటాబేస్ లోకి మారుస్తాయి).</li>
          <li><strong>ViewSets (వ్యూసెట్స్):</strong> ఒక్క క్లాస్ రాస్తే చాలు.. క్రియేట్, అప్డేట్, డిలీట్, లిస్ట్ ఇలా 5 పనులు అదే చేసేస్తుంది.</li>
          <li><strong>Routers (రౌటర్స్):</strong> మనం urls.py లో లింక్స్ అన్నీ మాన్యువల్ గా రాయక్కర్లేదు, రౌటర్ దానంతట అదే లింక్స్ ని క్రియేట్ చేస్తుంది!</li>
        </ol>`,
        code: `# 1. Serializer రాద్దాం (api/serializers.py):
from rest_framework import serializers
from store_app.models import Product

class ProductSerializer(serializers.ModelSerializer):
    # కేటగిరీ పేరుని బయటనుంచి చదవడానికి (ReadOnlyField)
    category_name = serializers.ReadOnlyField(source="category.name")

    class Meta:
        model = Product
        fields = ["id", "title", "category_name", "price", "stock", "is_active"]

# 2. ViewSet రాద్దాం (api/views.py):
from rest_framework import viewsets
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    """ఇది ఆటోమాటిక్ గా CRUD ఆపరేషన్స్ అన్నీ ఇస్తుంది!"""
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer

# 3. ఆటోమాటిక్ లింక్స్ కోసం Router వాడదాం (api/urls.py):
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
# /api/products/ అనే లింక్ కి మన వ్యూ ని అటాచ్ చేస్తున్నాం
router.register(r"products", ProductViewSet, basename="product")

urlpatterns = router.urls`,
        codeTitle: 'Example 1: Complete DRF ModelSerializer, ModelViewSet, and DefaultRouter',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 DefaultRouter మ్యాజిక్:</strong>
          <p style="margin-top:6px;">జస్ట్ పైనున్న 3 లైన్స్ రౌటర్ కోడ్ తో... <code>GET /api/products/</code>, <code>POST /api/products/</code>, <code>DELETE /api/products/42/</code> లాంటి లింక్స్ అన్నీ దానంతట అవే ఆటోమాటిక్ గా తయారైపోతాయి!</p>
        </div>`
      },
      {
        title: '2. యాప్ ని లైవ్ లో పెట్టడం (Production Deployment & Security)',
        body: `<p>లోకల్ గా వాడే <code>python manage.py runserver</code> ని <strong>ఎట్టి పరిస్థితుల్లోనూ పబ్లిక్ లైవ్ సర్వర్ లో వాడకూడదు</strong>. అది చాలా స్లో అండ్ హ్యాక్ చేయడం ఈజీ.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">లైవ్ సర్వర్ ఆర్కిటెక్చర్ (ఎలా ఉండాలి?):</h4>
        <ul>
          <li><strong>Gunicorn:</strong> ఇది ప్రొడక్షన్ పైథాన్ సర్వర్. ఒకేసారి వందల మంది వచ్చినా హ్యాండిల్ చేస్తుంది.</li>
          <li><strong>Nginx:</strong> ఇది ఫ్రంట్ లో గార్డ్ లాగా ఉండి గూనికోర్న్ కి ట్రాఫిక్ ని పంపుతుంది.</li>
          <li><strong>WhiteNoise:</strong> జాంగో లోని CSS/JS ఫైల్స్ ని చాలా ఫాస్ట్ గా ఇవ్వడానికి దీన్ని వాడతాం.</li>
        </ul>

        <h4 style="color:#10b981; margin:16px 0 8px;">లైవ్ కి వెళ్ళే ముందు చెక్ లిస్ట్ (settings.py):</h4>
        <ul>
          <li><strong><code>DEBUG = False</code>:</strong> కచ్చితంగా ఇది ఆఫ్ చేయాలి, లేకపోతే ఎర్రర్ వచ్చినప్పుడు మీ సీక్రెట్ కోడ్ బయట పడిపోతుంది.</li>
          <li><strong>Environment Variables (.env):</strong> పాస్వర్డ్స్ ని, డేటాబేస్ లింక్స్ ని <code>settings.py</code> లో డైరెక్ట్ గా రాయకుండా <code>.env</code> ఫైల్ లో దాచిపెట్టి చదవాలి.</li>
        </ul>`,
        code: `# ప్రొడక్షన్ సెట్టింగ్స్ ఎలా ఉండాలో శాంపిల్ (settings.py):
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# 1. సీక్రెట్స్ ని ఎన్విరాన్మెంట్ నుంచి చదువుతున్నాం (కోడ్ లో రాయట్లేదు):
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "default-key-not-safe")

# లైవ్ లో DEBUG ఎప్పుడూ False ఉండాలి:
DEBUG = os.getenv("DJANGO_DEBUG", "False") == "True"

# మన వెబ్సైట్ డొమైన్ పేరు ఇక్కడ ఇవ్వాలి (Security కోసం)
ALLOWED_HOSTS = ["mywebsite.com", "127.0.0.1"]

# 2. WhiteNoise యాడ్ చేస్తున్నాం (CSS/JS ఫైల్స్ ఫాస్ట్ గా లోడ్ అవ్వడానికి):
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware", # ఇది సెకండ్ లైన్ లో ఉండాలి
    # మిగతావన్నీ...
]

# ఫైల్స్ ఎక్కడ సేవ్ అవ్వాలో చెప్తున్నాం
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"`,
        codeTitle: 'Reference: Production Deployment Security & WhiteNoise Configuration',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Gunicorn ఎలా రన్ చేయాలి?:</strong>
          <p style="margin-top:6px;">లైవ్ సర్వర్ లోకి వెళ్ళాక రన్ సర్వర్ బదులు.. <code>gunicorn my_project.wsgi:application --workers 4</code> అని రన్ చేయాలి. (workers అంటే 4 గురు వెయిటర్స్ కింద పని చేస్తున్నట్టు, స్పీడ్ పెరుగుతుంది).</p>
        </div>`
      }
    ],
    mistake: {
      title: 'GitHub లో SECRET_KEY ని కమిట్ చేయడం',
      text: 'మీ settings.py లో ఉన్న SECRET_KEY ని మార్చకుండా అలాగే గిట్ హబ్ పబ్లిక్ లో పెడితే, ఎవరైనా మీ సైట్ లోకి అడ్మిన్ లాగా దూరిపోయి మొత్తం హ్యాక్ చేయగలరు! సీక్రెట్స్ ఎప్పుడూ .env ఫైల్ లో పెట్టి, ఆ ఫైల్ ని .gitignore లో యాడ్ చేయాలి.'
    },
    tryIt: {
      desc: 'ఒక కస్టమ్ వాలిడేషన్ ఫంక్షన్ ని సిమ్యులేట్ చేద్దాం. ప్రైస్ 0 కంటే తక్కువ ఉంటే ValueError ఇచ్చేలా ఒక ఫంక్షన్ రాయండి.',
      code: `def validate_price(price):
    if price <= 0:
        raise ValueError("ఎర్రర్: ప్రైస్ కచ్చితంగా 0 కంటే ఎక్కువే ఉండాలి!")
    return price

try:
    print("కరెక్ట్ ప్రైస్:  ", validate_price(499.0))
    print("రాంగ్ ప్రైస్: ", validate_price(-10.0))
except ValueError as err:
    print(err)`
    },
    faqs: [
      {
        q: 'JWT (JSON Web Token) ఆథెంటికేషన్ అంటే ఏంటి?',
        a: 'యాప్స్ లో లాగిన్ అయినప్పుడు కుకీస్ కి బదులు ఒక టోకెన్ (కోడ్) ఇస్తారు. ఈ టోకెన్ తోనే యాప్స్ సర్వర్ తో మాట్లాడతాయి. ఇది చాలా ఫాస్ట్ గా ఉంటుంది, సర్వర్ ప్రతిసారీ డేటాబేస్ ని చెక్ చేయక్కర్లేదు.'
      },
      {
        q: 'Gunicorn కీ, Uvicorn కీ తేడా ఏంటి?',
        a: 'Gunicorn అనేది ఫ్లాస్క్, జాంగో లాంటి మామూలు (Sync) యాప్స్ కి వాడతారు. Uvicorn అనేది ఫాస్ట్ గా రన్ అయ్యే FastAPI లాంటి (Async) యాప్స్ కి వాడతారు.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 53: WEB DEVELOPMENT CAPSTONE PROJECTS
  // =========================================================================
  {
    num: 53,
    phaseId: 'phase10',
    phaseTitle: 'Phase 10: Web Development',
    slug: '53-python-web-development-capstone-projects',
    title: 'Web Dev ప్రాజెక్ట్స్ (తెలుగులో)',
    badge: '53. Web Capstone Projects',
    subtopics: '6 Full Projects · 1. Multi-Author Blog · 2. Secure Auth System · 3. Task Manager · 4. E-Commerce Backend · 5. Student Portal · 6. DRF REST API',
    desc: 'ఇంతవరకు నేర్చుకున్న వెబ్ డెవలప్మెంట్, లాగిన్ సిస్టమ్స్, API కాన్సెప్ట్స్ తో 6 రియల్ వరల్డ్ ప్రాజెక్ట్స్ (బ్లాగ్, టాస్క్ మేనేజర్, ఈ-కామర్స్, స్టూడెంట్ పోర్టల్) పైథాన్ లో లాజిక్ గా ఎలా క్రియేట్ చేయాలో చూద్దాం.',
    sections: [
      {
        title: '1. ప్రాజెక్ట్ 1: Multi-Author బ్లాగ్ సిస్టమ్ (Tags తో)',
        body: `<p>చాలా మంది ఆథర్స్ వచ్చి పోస్ట్లు రాయగలిగే, ఆటోమాటిక్ గా లింక్స్ (slugs) క్రియేట్ అయ్యే ఒక బ్లాగ్ ఇంజిన్ లాజిక్ ని రాద్దాం.</p>`,
        code: `# ప్రాజెక్ట్ 1: మల్టీ-ఆథర్ బ్లాగ్ ఇంజిన్

class BlogPost:
    def __init__(self, post_id, title, author, tags=None):
        self.id = post_id
        self.title = title
        # ఆటోమాటిక్ గా స్లగ్ క్రియేట్ చేయడం (స్పేస్ బదులు డాష్):
        self.slug = title.lower().replace(" ", "-")
        self.author = author
        self.tags = tags or []
        self.views = 0

    def record_view(self):
        self.views += 1

    def __repr__(self):
        return f"📝 '{self.title}' by {self.author} ({self.views} views)"

class BlogEngine:
    def __init__(self):
        self.posts = []
        self._next_id = 1

    def publish(self, title, author, tags=None):
        post = BlogPost(self._next_id, title, author, tags)
        self.posts.append(post)
        self._next_id += 1
        return post

    def get_post(self, slug):
        for p in self.posts:
            if p.slug == slug:
                p.record_view() # చదివినప్పుడల్లా వ్యూస్ పెరుగుతాయి
                return p
        return None

    def filter_by_tag(self, tag):
        return [p for p in self.posts if tag.lower() in [t.lower() for t in p.tags]]

blog = BlogEngine()
blog.publish("Python For Beginners", "Balaji", ["Python", "Tutorial"])
blog.publish("Django Backend", "Alex", ["Python", "Web"])

print("--- 'Python' ట్యాగ్ ఉన్న పోస్ట్లు ---")
for p in blog.filter_by_tag("Python"):
    print(p)

# ఒక పోస్ట్ ని చదువుదాం:
read_post = blog.get_post("python-for-beginners")
print(f"\\n📖 ఓపెన్ చేసిన పోస్ట్: {read_post.title} | వ్యూస్: {read_post.views}")`,
        codeTitle: 'Project 1: Multi-Author Blog Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Slug ఎందుకు?:</strong>
          <p style="margin-top:6px;">యూజర్స్ కి <code>/post/24</code> అని ఇస్తే దేని గురించో అర్థం కాదు, అదే <code>/post/python-for-beginners</code> అని ఇస్తే గూగుల్ సెర్చ్ కి (SEO), చూసే వాళ్ళకి చాలా మంచిది.</p>
        </div>`
      },
      {
        title: '2. ప్రాజెక్ట్ 2: సెక్యూర్ ఆథెంటికేషన్ & సెషన్ సిస్టమ్',
        body: `<p>యూజర్స్ పాస్వర్డ్స్ ని సాల్టింగ్ (Salting) చేసి సేఫ్ గా హ్యాష్ చేయడం, లాగిన్ అవ్వగానే ఒక సెషన్ టోకెన్ ఇచ్చే సిస్టమ్ ని రాద్దాం.</p>`,
        code: `# ప్రాజెక్ట్ 2: సెక్యూర్ లాగిన్ & సెషన్ సిస్టమ్
import hashlib
import secrets

class SecureAuthService:
    def __init__(self):
        self.db = {} # {username: {"salt": salt, "hash": hash}}
        self.sessions = {} # {token: username}

    def _hash_pass(self, pwd, salt):
        # పాస్వర్డ్ కి ఉప్పు (salt) కలిపి హ్యాష్ చేస్తున్నాం:
        return hashlib.sha256((pwd + salt).encode()).hexdigest()

    def register(self, user, pwd):
        # 16 క్యారెక్టర్స్ రాండమ్ స్ట్రింగ్ ని క్రియేట్ చేస్తున్నాం:
        salt = secrets.token_hex(16) 
        hashed_pwd = self._hash_pass(pwd, salt)
        self.db[user] = {"salt": salt, "hash": hashed_pwd}
        print(f"✅ రిజిస్టర్ అయ్యారు: {user}")

    def login(self, user, pwd):
        record = self.db.get(user)
        if not record: return print("❌ ఆ యూజర్ లేరు!")
        
        # ఇచ్చిన పాస్వర్డ్ ని పాత సాల్ట్ తో కలిపి చెక్ చేస్తున్నాం:
        input_hash = self._hash_pass(pwd, record["salt"])
        if secrets.compare_digest(input_hash, record["hash"]):
            token = secrets.token_urlsafe(16) # సెషన్ టోకెన్ ఇస్తున్నాం
            self.sessions[token] = user
            print(f"🔓 లాగిన్ సక్సెస్! మీ టోకెన్: {token[:8]}...")
            return token
        print("❌ పాస్వర్డ్ తప్పు!")
        return None

auth = SecureAuthService()
auth.register("balaji_dev", "SuperSecret123")

# లాగిన్ టెస్ట్:
token = auth.login("balaji_dev", "SuperSecret123")
if token in auth.sessions:
    print(f"సెషన్ కరెక్టే! వెల్కమ్ {auth.sessions[token]}")`,
        codeTitle: 'Project 2: Secure User Authentication & Session System',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Salt ఎందుకు కలుపుతాం?:</strong>
          <p style="margin-top:6px;">ఇద్దరు యూజర్స్ "12345" అనే ఒకే పాస్వర్డ్ పెట్టినా, మనం సాల్ట్ (రాండమ్ కోడ్) కలపడం వల్ల హ్యాష్ అయిన తర్వాత రెండు పాస్వర్డ్స్ వేర్వేరుగా కనిపిస్తాయి. హ్యాకర్స్ కి కనిపెట్టడం అసాధ్యం.</p>
        </div>`
      },
      {
        title: '3. ప్రాజెక్ట్ 3: E-Commerce బ్యాకెండ్ (స్టాక్ చెకింగ్ & కూపన్స్)',
        body: `<p>యూజర్ బుట్టలో ఉన్న వస్తువులకి స్టాక్ ఉందా లేదా చూసి, కూపన్స్ అప్లై చేసి, బిల్ వేసే ఒక ఈ-కామర్స్ ఇంజిన్.</p>`,
        code: `# ప్రాజెక్ట్ 3: E-Commerce కార్ట్ & చెకౌట్
class ECommerceStore:
    def __init__(self):
        self.catalog = {
            101: {"name": "Laptop", "price": 50000.0, "stock": 5},
            102: {"name": "Mouse", "price": 500.0, "stock": 20}
        }

    def checkout(self, customer, items_dict, coupon=None):
        print(f"\\n🛍️ {customer} చెకౌట్ చేస్తున్నారు...")
        subtotal = 0.0

        # 1. స్టాక్ ఉందో లేదో చెక్ చేద్దాం:
        for pid, qty in items_dict.items():
            product = self.catalog.get(pid)
            if product["stock"] < qty:
                raise ValueError(f"ఎర్రర్: '{product['name']}' స్టాక్ అయిపోయింది!")
            subtotal += product["price"] * qty

        # 2. కూపన్ ఉంటే 10% డిస్కౌంట్:
        discount = subtotal * 0.10 if coupon == "SAVE10" else 0
        total = subtotal - discount

        # 3. సక్సెస్ అయ్యాక మాత్రమే స్టాక్ తగ్గిద్దాం:
        for pid, qty in items_dict.items():
            self.catalog[pid]["stock"] -= qty

        print(f"✅ ఆర్డర్ కన్ఫర్మ్! టోటల్: ₹{total:,.2f} (డిస్కౌంట్: ₹{discount:,.2f})")

store = ECommerceStore()
store.checkout("Balaji", {101: 1, 102: 2}, coupon="SAVE10")

print("\\n--- మిగిలిన స్టాక్ ---")
for p in store.catalog.values():
    print(f"• {p['name']} | స్టాక్: {p['stock']}")`,
        codeTitle: 'Project 4: Enterprise E-Commerce Backend Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 సేఫ్టీ ఫస్ట్:</strong>
          <p style="margin-top:6px;">అన్నీ చెక్ చేసి డబ్బులు లెక్కేసిన తర్వాతే స్టాక్ ని తగ్గించాలి. ముందు తగ్గిస్తే, ఏదైనా ఎర్రర్ వస్తే స్టాక్ వేస్ట్ అయిపోతుంది.</p>
        </div>`
      },
      {
        title: '4. ప్రాజెక్ట్ 4: REST API సర్వర్ (DRF స్టైల్ లో సిమ్యులేషన్)',
        body: `<p>GET, POST కమాండ్స్ తో, JSON ఫార్మాట్ లో అడిగిన డేటా మాత్రమే ఇచ్చే ఒక API సిస్టమ్ ని పైథాన్ లో రన్ చేసి చూద్దాం.</p>`,
        code: `# ప్రాజెక్ట్ 4: API సర్వర్ సిమ్యులేషన్
import json

class RESTAPIService:
    def __init__(self):
        self.articles = {1: {"title": "Python Tips", "author": "Balaji"}}

    def request(self, method, path, payload=None, token=None):
        # సెక్యూరిటీ చెక్ (కొత్తవి రాయాలంటే టోకెన్ కావాలి):
        if method == "POST" and token != "secret123":
            return {"status": 401, "body": {"error": "పాస్వర్డ్ తప్పు!"}}

        if method == "GET" and path == "/api/articles":
            return {"status": 200, "body": list(self.articles.values())}

        if method == "POST" and path == "/api/articles":
            new_id = len(self.articles) + 1
            self.articles[new_id] = payload
            return {"status": 201, "body": {"message": "సేవ్ అయ్యింది", "data": payload}}

        return {"status": 404, "body": {"error": "లింక్ లేదు"}}

api = RESTAPIService()
print("1. GET కాల్ (అన్ని ఆర్టికల్స్ కావాలి):")
print(json.dumps(api.request("GET", "/api/articles"), indent=2))

print("\\n2. POST కాల్ (రాంగ్ టోకెన్ తో యాడ్ చేద్దాం):")
print(json.dumps(api.request("POST", "/api/articles", {"title": "Django"}, token="wrong"), indent=2))

print("\\n3. POST కాల్ (కరెక్ట్ టోకెన్ తో):")
print(json.dumps(api.request("POST", "/api/articles", {"title": "FastAPI"}, token="secret123"), indent=2))`,
        codeTitle: 'Project 6: Production REST API Service',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 API రూల్స్:</strong>
          <p style="margin-top:6px;">REST API ఎప్పుడూ కరెక్ట్ Status Codes నే ఇవ్వాలి (సక్సెస్ కి 200, క్రియేట్ అయితే 201, ఆథరైజేషన్ లేకపోతే 401).</p>
        </div>`
      }
    ],
    mistake: {
      title: 'డేటాబేస్ లో Connection Pooling వాడకపోవడం',
      text: 'ప్రతి ఒక్క యూజర్ సైట్ లోకి రాగానే ఒక కొత్త కనెక్షన్ ఓపెన్ చేస్తే, వంద మంది రాగానే సర్వర్ ఫుల్ అయిపోయి క్రాష్ అవుతుంది. అందుకే ప్రొడక్షన్ లో ఎప్పుడూ PgBouncer లాంటి పూలింగ్ సర్వీసెస్ వాడి 20-30 కనెక్షన్స్ నే మళ్ళీ మళ్ళీ వాడుకునేలా సెట్ చేయాలి.'
    },
    tryIt: {
      desc: 'ఒక స్టూడెంట్ గ్రేడ్స్ పోర్టల్ సిమ్యులేట్ చేద్దాం. మార్క్స్ ని బట్టి A, B, C గ్రేడ్స్ ఇచ్చే ఫంక్షన్ రాయండి.',
      code: `def get_grade(score):
    if score >= 90: return "A+"
    elif score >= 80: return "A"
    elif score >= 70: return "B"
    return "C"

student_marks = {"Maths": 95, "Science": 82, "English": 65}
print("స్టూడెంట్ గ్రేడ్స్:")
for subject, marks in student_marks.items():
    print(f"• {subject}: {marks}/100 [{get_grade(marks)}]")`
    },
    faqs: [
      {
        q: 'నేను కొత్తగా యాప్ చేయాలంటే Flask వాడాలా? Django వాడాలా?',
        a: 'చిన్న యాప్, లేదా వేరే టెక్నాలజీ (డేటాబేస్) వాడాలనుకుంటే ఫ్లాస్క్ తీసుకోండి. లాగిన్స్, అడ్మిన్ ప్యానెల్, పెద్ద కామర్స్ సైట్ లాంటివి త్వరగా చేయాలంటే జాంగో బెస్ట్.'
      },
      {
        q: 'WhiteNoise ఎందుకు వాడతారు?',
        a: 'లైవ్ సర్వర్ లో పైథాన్ కి ఇమేజెస్, CSS ఫైల్స్ ని యూజర్స్ కి ఇవ్వడం కష్టం (స్లో అవుతుంది). WhiteNoise వాడితే అది వాటన్నిటినీ కంప్రెస్ చేసి చాలా ఫాస్ట్ గా అందిస్తుంది.'
      }
    ]
  }
];
