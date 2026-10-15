// Phase 11: Data Science and AI Data (NumPy, Pandas, Matplotlib, Seaborn, Scikit-Learn & 5 Capstone Projects)
module.exports = [
  // =========================================================================
  // CHAPTER 54: NUMPY ARRAYS & VECTORIZATION
  // =========================================================================
  {
    num: 54,
    phaseId: 'phase11',
    phaseTitle: 'Phase 11: Data Science and AI',
    slug: '54-python-numpy-arrays-and-vectorization',
    title: 'NumPy Arrays & Vectorization (తెలుగులో)',
    badge: '54. NumPy Arrays & Vectorization',
    subtopics: 'Why NumPy? · C-Contiguous Memory Layout · ndarray Creation · Slicing & Boolean Masking · Reshaping · Broadcasting Rules · Vectorized Linear Algebra',
    desc: 'పైథాన్ లో డేటా సైన్స్ కి పునాది అయిన NumPy గురించి నేర్చుకుందాం. నార్మల్ పైథాన్ లిస్ట్స్ కంటే NumPy Arrays ఎందుకు 50-100 రెట్లు ఫాస్ట్ గా ఉంటాయి? మెమరీ ఎలా సేవ్ చేస్తాయి? వెక్టరైజేషన్ (Vectorization) మ్యాజిక్ ఏంటో చూద్దాం.',
    sections: [
      {
        title: '1. NumPy ఎందుకు వాడాలి? (Python Lists vs NumPy Arrays)',
        body: `<p><strong>NumPy (Numerical Python)</strong> అనేది పైథాన్ లో డేటా సైన్స్, AI (Pandas, Scikit-Learn, TensorFlow లాంటివి) అన్నింటికీ బేస్.</p>
        
        <h4 style="color:#ef4444; margin:16px 0 8px;">పైథాన్ లిస్ట్స్ ఎందుకు స్లో?:</h4>
        <p>నార్మల్ పైథాన్ లిస్ట్ లో నెంబర్స్ డైరెక్ట్ గా సేవ్ అవ్వవు. అవి రాండమ్ గా ఎక్కడెక్కడో సేవ్ అయ్యి, వాటన్నిటికీ ఒక "పాయింటర్" (లింక్) ఇస్తుంది. కాబట్టి లెక్కలు చేసేటప్పుడు ప్రతి నెంబర్ ని వెతుక్కుని తేవడానికి టైమ్ పడుతుంది.</p>

        <h4 style="color:#10b981; margin:16px 0 8px;">NumPy పవర్ ఏంటి?:</h4>
        <p>NumPy <strong><code>ndarray</code></strong> (N-dimensional array) అనేది C లాంగ్వేజ్ మెమరీని వాడుతుంది. నెంబర్స్ అన్నీ వరుసగా ఒకే బ్లాక్ లో (C-contiguous) సేవ్ అవుతాయి.</p>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong>CPU Cache:</strong> డేటా అంతా ఒకేచోట ఉండటం వల్ల, CPU ఒకేసారి మొత్తం లాగేసుకుంటుంది.</li>
          <li><strong>Vectorization:</strong> ఫర్ లూప్స్ (for loops) వాడకుండా, ఒకేసారి మొత్తం అరే (Array) మీద లెక్కలు చేయొచ్చు. ఇది నార్మల్ పైథాన్ కంటే <strong>50 నుండి 100 రెట్లు ఫాస్ట్ గా</strong> ఉంటుంది.</li>
        </ol>

        <div class="diagram-box">┌────────────────────────────────────────────────────────────────────────┐
│                   PYTHON LIST VS NUMPY MEMORY                          │
├────────────────────────────────────────────────────────────────────────┤
│  ❌ PYTHON LIST [10, 20, 30]:                                          │
│  పాయింటర్స్ ──>[పాయింటర్ 1] ───> ఎక్కడో మెమరీలో [int 10 (28 Bytes)]    │
│             ──>[పాయింటర్ 2] ───> ఇంకెక్కడో [int 20 (28 Bytes)]         │
│             ──>[పాయింటర్ 3] ───> ఇంకెక్కడో [int 30 (28 Bytes)]         │
│                                                                        │
│  ✅ NUMPY NDARRAY (np.array([10, 20, 30])):                            │
│  ┌──────────────────┬──────────────────┬──────────────────┐            │
│  │ 10 (8 Bytes raw) │ 20 (8 Bytes raw) │ 30 (8 Bytes raw) │            │
│  └──────────────────┴──────────────────┴──────────────────┘            │
│  (కంటిన్యూ గా ఒకే బ్లాక్ లో ఉంటాయి.. సూపర్ ఫాస్ట్ గా లోడ్ అవుతాయి)     │
└────────────────────────────────────────────────────────────────────────┘</div>`,
        code: `import sys
import time
import numpy as np

# 1. పైథాన్ లిస్ట్ అండ్ NumPy మెమరీ టెస్ట్:
python_list = list(range(1_000_000))
numpy_array = np.arange(1_000_000)

print(f"📦 పైథాన్ లిస్ట్ సైజ్:  {sys.getsizeof(python_list):,} bytes")
print(f"📦 NumPy అరే సైజ్: {numpy_array.nbytes:,} bytes (చాలా తక్కువ!)\\n")

# 2. స్పీడ్ టెస్ట్ (ప్రతి నెంబర్ కి 2 యాడ్ చేద్దాం):
start = time.perf_counter()
list_result = [x + 2 for x in python_list]
list_time = (time.perf_counter() - start) * 1000

start = time.perf_counter()
# వక్టరైజేషన్ మ్యాజిక్ (for లూప్ అక్కర్లేదు!):
numpy_result = numpy_array + 2
numpy_time = (time.perf_counter() - start) * 1000

print(f"⏱️ పైథాన్ కి పట్టిన టైమ్: {list_time:.2f} ms")
print(f"🚀 NumPy కి పట్టిన టైమ్:   {numpy_time:.2f} ms (దాదాపు 70 రెట్లు ఫాస్ట్!)")`,
        codeTitle: 'Example 1: Demonstrating Memory Locality & Vectorization Concept',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Vectorization అంటే?:</strong>
          <p style="margin-top:6px;">For లూప్స్ వాడకుండా డైరెక్ట్ గా మ్యాథ్స్ చేయడం. లోపల అది C లాంగ్వేజ్ తో రన్ అవ్వడం వల్ల కళ్ళు మూసి తెరిచేలోపు రిజల్ట్ వస్తుంది.</p>
        </div>`
      },
      {
        title: '2. 2D / 3D Arrays & Boolean Masking (మ్యాట్రిక్స్ డేటా)',
        body: `<p>NumPy లో ఒక లైన్ (1D), స్ప్రెడ్ షీట్ లాంటి టేబుల్ (2D), లేదా ఇమేజ్/వీడియో (3D) డేటాని చాలా ఈజీగా హ్యాండిల్ చేయొచ్చు.</p>
        <ul>
          <li><strong><code>ndim</code>:</strong> ఎన్ని డైమెన్షన్స్ ఉన్నాయో చెప్తుంది.</li>
          <li><strong><code>shape</code>:</strong> ఎన్ని అడ్డు వరుసలు (rows), ఎన్ని నిలువు వరుసలు (cols) ఉన్నాయో చెప్తుంది.</li>
          <li><strong>Boolean Masking:</strong> పెద్ద టేబుల్స్ లోపల మనకు కావాల్సిన డేటాని "for లూప్" లేకుండా ఒకే లైన్ తో ఫిల్టర్ చేయడం.</li>
        </ul>`,
        code: `import numpy as np

# 3x3 మ్యాట్రిక్స్ (టేబుల్) ని క్రియేట్ చేద్దాం:
matrix = np.array([
    [10, 25, 40],
    [55, 70, 85],
    [90, 15, 30]
])

print("--- 2D Matrix షేప్ ---")
print("మ్యాట్రిక్స్ షేప్:", matrix.shape) # (3, 3) వస్తుంది

# Slicing (కొంత భాగం మాత్రమే కట్ చేయడం):
# 1st row నుంచి మిగతావన్నీ, 1st col నుంచి 2nd col వరకు (ఎక్స్ ఎల్ షీట్ లో లాగా):
submatrix = matrix[1:, 1:3]
print("\\nస్లైసింగ్ చేసిన డేటా:\\n", submatrix)

# Boolean Masking (సూపర్ ఫాస్ట్ ఫిల్టరింగ్):
# 50 కంటే ఎక్కువ ఉన్న నెంబర్స్ అన్నీ వెతికి ఇస్తుంది
greater_than_50 = matrix[matrix > 50]
print("\\n50 కంటే ఎక్కువ ఉన్నవి: ", greater_than_50)`,
        codeTitle: 'Example 2: Multi-Dimensional Slicing & Boolean Filtering',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Slicing మ్యాజిక్:</strong>
          <p style="margin-top:6px;">పైథాన్ లిస్ట్స్ లో స్లైస్ చేస్తే కొత్త డేటా క్రియేట్ అవుతుంది (మెమరీ వేస్ట్). కానీ NumPy లో స్లైస్ చేస్తే అది కేవలం ఒక <strong>"వ్యు" (View)</strong> మాత్రమే! ఒరిజినల్ డేటానే చూపిస్తుంది, ఎక్స్ట్రా మెమరీ తీసుకోదు.</p>
        </div>`
      },
      {
        title: '3. NumPy Broadcasting (సైజులు వేరున్నా క్యాలిక్యులేషన్ చేయడం)',
        body: `<p>రెండు వేరు వేరు సైజుల్లో ఉన్న Arrays ని (ఉదా: ఒకటేమో 3x3 మ్యాట్రిక్స్, ఇంకోటేమో ఒక చిన్న 1D అరే) కలుపుతున్నప్పుడు, NumPy ఒక మ్యాజిక్ చేస్తుంది. దాన్నే <strong>Broadcasting</strong> అంటారు.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">దీని వల్ల లాభం?:</h4>
        <p>చిన్న అరే ని, పెద్ద అరే కి సరిపడా డూప్లికేట్ చేయకుండా, వర్చువల్ గా సాగదీసి (stretch చేసి) ఆపరేషన్ చేసేస్తుంది. దీనివల్ల టైమ్ అండ్ మెమరీ సూపర్ గా సేవ్ అవుతుంది.</p>`,
        code: `import numpy as np

# Broadcasting ఎగ్జాంపుల్:
# Array A: 3 అడ్డు వరుసలు, 3 నిలువు వరుసలు (3x3)
A = np.array([
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
])

# Array B: ఒకే అడ్డు వరుస (1x3)
B = np.array([1, 2, 3])

# సైజులు వేరున్నా మనం ప్లస్ చేయొచ్చు! (Broadcasting)
# B ఆటోమాటిక్ గా మూడు సార్లు స్ట్రెచ్ అవుతుంది.
result = A + B

print("--- 📐 NumPy Broadcasting ---")
print("Array A (3x3):\\n", A)
print("\\nArray B (1x3):\\n", B)
print("\\nరిజల్ట్ (Array B మూడు సార్లు యాడ్ అయ్యింది!):\\n", result)`,
        codeTitle: 'Example 3: NumPy Broadcasting Compatibility Rules',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 జీరో మెమరీ కాస్ట్:</strong>
          <p style="margin-top:6px;">బ్రాడ్ కాస్టింగ్ జరిగినప్పుడు డేటా నిజంగా డూప్లికేట్ అవ్వదు. కంప్యూటర్ లోపల తెలివిగా పాత నెంబర్స్ నే రిపీట్ చేస్తుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'a * b అంటే మ్యాట్రిక్స్ మల్టిప్లికేషన్ అనుకోవడం',
      text: 'NumPy లో `a * b` అంటే డైరెక్ట్ మల్టిప్లికేషన్ (మొదటి నెంబర్ తో మొదటిది, రెండో దానితో రెండోది). నిజమైన మ్యాథ్స్ మ్యాట్రిక్స్ మల్టిప్లికేషన్ చేయాలంటే `a @ b` లేదా `np.dot(a, b)` వాడాలి.'
    },
    tryIt: {
      desc: 'ఒక స్కోర్స్ లిస్ట్ ని 0.0 నుంచి 1.0 రేంజ్ లోకి మార్చండి (దీన్ని నార్మలైజేషన్ అంటారు).',
      code: `def normalize_scores(scores):
    min_val = min(scores)
    max_val = max(scores)
    rng = max_val - min_val
    return [(s - min_val) / rng for s in scores]

raw_scores = [45, 80, 60, 100, 20]
print("నార్మలైజ్ చేసిన స్కోర్స్ (0.0 టు 1.0):")
print([round(s, 2) for s in normalize_scores(raw_scores)])`
    },
    faqs: [
      {
        q: 'np.reshape() కీ, np.flatten() కీ తేడా ఏంటి?',
        a: 'reshape అనేది ఉన్న డేటాని కదపకుండా షేప్ మారుస్తుంది. flatten అంటే డేటాని మొత్తం తీసుకువచ్చి ఒకే సింగిల్ లైన్ (1D) లాగా చేస్తుంది.'
      },
      {
        q: 'axis=0 కీ, axis=1 కీ కన్ఫ్యూజ్ అవుతున్నాను..?',
        a: 'సింపుల్. axis=0 అంటే కిందకి (నిలువు వరుసల్ని కౌంట్ చేస్తుంది). axis=1 అంటే అడ్డంగా (అడ్డు వరుసల్ని కౌంట్ చేస్తుంది).'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 55: PANDAS SERIES, DATAFRAMES & CSV PROCESSING
  // =========================================================================
  {
    num: 55,
    phaseId: 'phase11',
    phaseTitle: 'Phase 11: Data Science and AI',
    slug: '55-python-pandas-dataframes-and-csv',
    title: 'Pandas Series, DataFrames & CSV (తెలుగులో)',
    badge: '55. Pandas Series & DataFrames',
    subtopics: 'Series vs DataFrame Architecture · Loading CSV/JSON · head() & info() Exploration · loc (Label) vs iloc (Integer) · Boolean Query Filtering · Multi-Column Sorting',
    desc: 'డేటా సైన్స్ లో ఎక్కువగా వాడే టూల్ Pandas. ఎక్సెల్ ఫైల్స్ ని, CSV ఫైల్స్ ని చదవడం, అందులో పనికిరాని డేటాని క్లీన్ చేయడం, మనకు కావాల్సిన డేటాని వెతకడం (Filtering) ఎలాగో చూద్దాం.',
    sections: [
      {
        title: '1. Pandas అంటే ఏంటి? (Series మరియు DataFrame)',
        body: `<p><strong>Pandas</strong> అంటే పైథాన్ వాళ్ళ ఎక్సెల్ లాంటిది. లక్షల కొద్దీ రోస్ ఉన్న డేటాని క్షణాల్లో ప్రాసెస్ చేయగలదు.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">Pandas లో ఉండే 2 మెయిన్ ఆబ్జెక్ట్స్:</h4>
        <ul>
          <li><strong>Series (1D):</strong> ఇది ఒకే ఒక్క నిలువు వరుస (Column). (ఉదా: వయసుల లిస్ట్).</li>
          <li><strong>DataFrame (2D):</strong> ఇది అచ్చం స్ప్రెడ్ షీట్ లాంటిది. అడ్డు వరుసలు (Rows), నిలువు వరుసలు (Columns) కలిపి ఒక టేబుల్ లాగా ఉంటుంది.</li>
        </ul>

        <div class="diagram-box">┌────────────────────────────────────────────────────────────────────────┐
│                     PANDAS DATAFRAME స్ట్రక్చర్                        │
├────────────────────────────────────────────────────────────────────────┤
│                          Columns (Series పేర్లు)                       │
│                        ┌──────────────┬──────────────┬──────────────┐  │
│  Index (Row పేర్లు)    │ "name" (str) │ "age" (int)  │"salary"(flt) │  │
│  ┌─────────────────────┼──────────────┼──────────────┼──────────────┤  │
│  │ 0                   │ Balaji Dev   │ 28           │ 95000.00     │  │
│  │ 1                   │ Alex Smith   │ 34           │ 82000.00     │  │
│  │ 2                   │ Chloe Davis  │ 25           │ 78000.00     │  │
│  └─────────────────────┴──────────────┴──────────────┴──────────────┘  │
│  ├── df.shape -> (3, 3) [3 rows, 3 columns]                            │
│  ├── df['salary'] -> ఒక్క కాలమ్ (Series) బయటకు వస్తుంది                │
└────────────────────────────────────────────────────────────────────────┘</div>`,
        code: `# డేటాఫ్రేమ్ ఎలా ఉంటుందో చూద్దాం (పైథాన్ డిక్షనరీలతో పోల్చి):
tabular_dataset = [
    {"emp_id": 101, "name": "Balaji", "dept": "AI", "salary": 95000},
    {"emp_id": 102, "name": "Alex",   "dept": "Cloud", "salary": 82000},
    {"emp_id": 103, "name": "Chloe",  "dept": "Data", "salary": 88000}
]

print("--- 📊 డేటాసెట్ (3 రోస్ x 4 కాలమ్స్) ---")
header = f"{'ID':<6} {'Name':<10} {'Dept':<10} {'Salary':<10}"
print(header)
print("-" * len(header))
for row in tabular_dataset:
    print(f"{row['emp_id']:<6} {row['name']:<10} {row['dept']:<10} ₹{row['salary']:<10,}")`,
        codeTitle: 'Example 1: Tabular Dataset Representation in Memory',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Pandas ఫంక్షన్స్:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>df.head(5)</code>: మొదటి 5 రోస్ చూపిస్తుంది (లక్షల డేటా ఉన్నప్పుడు వాడతాం).</li>
            <li><code>df.info()</code>: ఏ కాలమ్ లో ఏ డేటా ఉంది, ఫైల్ సైజ్ ఎంత అని చెప్తుంది.</li>
            <li><code>df.describe()</code>: నెంబర్స్ ఉన్న కాలమ్స్ కి ఆవరేజ్, మినిమమ్, మ్యాక్సిమమ్ లెక్కేస్తుంది.</li>
          </ul>
        </div>`
      },
      {
        title: '2. డేటాని వెతకడం: .loc (లేబుల్స్) vs .iloc (నెంబర్స్)',
        body: `<p>Pandas లో టేబుల్ లోపలికి వెళ్లి డేటాని తీసుకోవాలంటే రెండు ఆప్షన్స్ ఉంటాయి. ఇవి చాలా ఇంపార్టెంట్ కన్ఫ్యూజ్ కాకుండా గుర్తుపెట్టుకోవాలి.</p>
        
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>విధానం</th><th>ఎలా రాయాలి?</th><th>ఏంటి డిఫరెన్స్?</th></tr>
          <tr><td><strong><code>.loc[]</code></strong></td><td><code>df.loc['row_name', 'col_name']</code></td><td>పేర్లు/లేబుల్స్ (Names) వాడి వెతుకుతుంది.</td></tr>
          <tr><td><strong><code>.iloc[]</code></strong></td><td><code>df.iloc[0, 1]</code></td><td>సొన్న (0, 1, 2) లాంటి ఇండెక్స్ నెంబర్స్ వాడి వెతుకుతుంది.</td></tr>
        </table>`,
        code: `# .loc, .iloc లాజిక్ ని సిమ్యులేట్ చేద్దాం:
employees = {
    101: {"name": "Balaji", "role": "Lead", "salary": 95000},
    102: {"name": "Alex",   "role": "DevOps", "salary": 82000},
    103: {"name": "Chloe",  "role": "Data", "salary": 88000}
}

# 1. .loc (పేరును బట్టి వెతకడం):
# "101" అనే ఐడీతో ఉన్న వాళ్ళ శాలరీ కావాలి:
loc_sample = employees[101]["salary"]
print(f"loc రిజల్ట్ (ఐడీ 101): ₹{loc_sample:,}")

# 2. .iloc (వరుస సంఖ్యను బట్టి వెతకడం):
# లిస్ట్ లో ఫస్ట్ ఉన్న (index 0) ఎంప్లాయ్ పేరు కావాలి:
row_keys = list(employees.keys())
iloc_sample = employees[row_keys[0]]["name"]
print(f"iloc రిజల్ట్ (1st లైన్): {iloc_sample}")

# 3. ఫిల్టరింగ్ (85,000 కంటే ఎక్కువ శాలరీ ఉన్నవాళ్లు ఎవరు?):
high_earners = [e for e in employees.values() if e["salary"] >= 85000]
print(f"\\n85k కంటే ఎక్కువ శాలరీ ఉన్నవాళ్లు: {len(high_earners)} మంది.")`,
        codeTitle: 'Example 2: loc vs iloc Indexing & Boolean Filtering',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Pandas లో ఫిల్టరింగ్:</strong>
          <p style="margin-top:6px;">నిజంగా పాండాస్ లో రాయాలంటే ఇలా రాస్తాం: <code>df[(df['salary'] >= 85000) & (df['dept'] == 'AI')]</code> (రెండింటికీ బ్రాకెట్స్ పెట్టడం మర్చిపోకూడదు!).</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Pandas లో "and" / "or" వాడటం',
      text: 'నార్మల్ పైథాన్ లో `and`, `or` వాడినట్టు Pandas లో వాడితే "ValueError" వస్తుంది. Pandas లో డేటాని ఫిల్టర్ చేసేటప్పుడు కచ్చితంగా `&` (AND కోసం), `|` (OR కోసం) వాడాలి.'
    },
    tryIt: {
      desc: 'ఒక ప్రోడక్ట్స్ లిస్ట్ ని ఫస్ట్ కేటగిరీ (A to Z), ఆ తర్వాత ప్రైస్ (హై టు లో) ని బట్టి సార్ట్ చేయండి.',
      code: `products = [
    {"name": "Mouse", "cat": "Tech", "price": 800},
    {"name": "Desk", "cat": "Furniture", "price": 4500},
    {"name": "Laptop", "cat": "Tech", "price": 55000},
    {"name": "Chair", "cat": "Furniture", "price": 3200}
]

# Pandas లో: df.sort_values(by=["cat", "price"], ascending=[True, False])
sorted_prods = sorted(products, key=lambda x: (x["cat"], -x["price"]))
print("సార్ట్ చేసిన ప్రోడక్ట్స్:")
for p in sorted_prods:
    print(f"• [{p['cat']:9}] {p['name']:10} - ₹{p['price']:,}")`
    },
    faqs: [
      {
        q: 'inplace=True అంటే ఏంటి?',
        a: 'మనం ఏదైనా మార్పు (రోస్ ని డిలీట్ చేయడం లాంటివి) చేసినప్పుడు ఆ చేంజ్ టెంపరరీగా కాకుండా, ఒరిజినల్ డేటాఫ్రేమ్ లోనే పర్మినెంట్ గా అప్లై అవ్వడానికి వాడతారు.'
      },
      {
        q: 'ఖాళీగా ఉన్న సెల్స్ ని Pandas ఎలా సేవ్ చేస్తుంది?',
        a: 'ఎక్సెల్ షీట్ లో ఖాళీ బాక్సులు ఉంటే.. పాండాస్ వాటిని "NaN" (Not a Number) అని చదువుతుంది.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 56: PANDAS DATA CLEANING, GROUPING & MERGING
  // =========================================================================
  {
    num: 56,
    phaseId: 'phase11',
    phaseTitle: 'Phase 11: Data Science and AI',
    slug: '56-python-pandas-data-cleaning-grouping-and-merging',
    title: 'Pandas Data Cleaning & GroupBy (తెలుగులో)',
    badge: '56. Data Cleaning & GroupBy',
    subtopics: 'Missing Values (dropna, fillna) · Imputation Strategies · GroupBy Split-Apply-Combine · Aggregations (mean, sum, count) · Merging (Inner, Left, Outer) · Exporting Data',
    desc: 'డేటా సైంటిస్ట్స్ వాళ్ళ సగం టైమ్ ని డేటాని క్లీన్ చేయడానికే (చిరిగిన డేటాని అతికించడం, ఖాళీలని నింపడం) పడుతుంది. ఈ టాస్క్ ని dropna, fillna వాడి ఎలా చేయాలో, అలాగే గ్రూప్స్ (GroupBy) చేసి సమ్మరీ రిపోర్ట్స్ ఎలా తీయాలో చూద్దాం.',
    sections: [
      {
        title: '1. మిస్సింగ్ డేటా ఉంటే ఏం చేయాలి? (Drop vs Fill)',
        body: `<p>రియల్ వరల్డ్ డేటా ఎప్పుడూ పర్ఫెక్ట్ గా ఉండదు. ఎవరో ఫారమ్ నింపడం మర్చిపోయి ఉండొచ్చు, లేదా యాప్ క్రాష్ అయ్యి డేటా మిస్ అవ్వొచ్చు. ఆ ఖాళీలని (NaN) డీల్ చేయడానికి 2 పద్ధతులున్నాయి:</p>
        
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong>తీసేయడం (<code>dropna()</code>):</strong>
            <ul>
              <li><code>df.dropna()</code>: ఏ ఒక్క బాక్స్ ఖాళీగా ఉన్నా ఆ రో (Row) మొత్తాన్ని తీసేస్తుంది. (ఎక్కువ డేటా మిస్ అయినప్పుడు వాడాలి).</li>
            </ul>
          </li>
          <li><strong>నింపడం / అడ్జస్ట్ చేయడం (<code>fillna()</code>):</strong> ఉన్న డేటాని వేస్ట్ చేయకుండా ఖాళీలలో ఆవరేజ్ నెంబర్లని వేయడం.
            <ul>
              <li><strong>Mean:</strong> మిగిలిన వాళ్ళ ఆవరేజ్ తీసి వేయడం.</li>
              <li><strong>ffill:</strong> పైన ఏ నెంబర్ ఉందో దాన్నే కిందకి లాగడం (స్టాక్ మార్కెట్ లాంటి టైమ్ డేటాకి వాడతారు).</li>
            </ul>
          </li>
        </ol>`,
        code: `# డేటా క్లీనింగ్ సిమ్యులేషన్:
raw_sensor_data = [
    {"time": "10:00", "temp": 28.5, "humidity": 65},
    {"time": "10:05", "temp": None, "humidity": 68},  # ఇక్కడ టెంపరేచర్ లేదు
    {"time": "10:10", "temp": 29.1, "humidity": None},# ఇక్కడ హ్యుమిడిటీ లేదు
]

# ఉన్న టెంపరేచర్స్ ఆవరేజ్ తీద్దాం (నింపడానికి):
valid_temps = [r["temp"] for r in raw_sensor_data if r["temp"] is not None]
mean_temp = sum(valid_temps) / len(valid_temps)

cleaned_data = []
for record in raw_sensor_data:
    row = record.copy()
    # ఖాళీగా ఉంటే ఆవరేజ్ తో నింపుదాం (fillna మ్యాజిక్):
    if row["temp"] is None:
        row["temp"] = round(mean_temp, 1) 
    # డీఫాల్ట్ గా 60 పెడదాం:
    if row["humidity"] is None:
        row["humidity"] = 60 
    cleaned_data.append(row)

print(f"--- 🧹 క్లీన్ చేసిన డేటా (ఆవరేజ్ {mean_temp:.1f} తో నింపాం) ---")
for r in cleaned_data:
    print(r)`,
        codeTitle: 'Example 1: Missing Data Detection & Statistical Mean Imputation',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Pandas లో ఒక్క లైన్ లో..:</strong>
          <p style="margin-top:6px;">నిజమైన కోడ్ లో అయితే <code>df['temp'] = df['temp'].fillna(df['temp'].mean())</code> అని సింగిల్ లైన్ లో రాసేయొచ్చు.</p>
        </div>`
      },
      {
        title: '2. GroupBy అంటే ఏంటి? (Split-Apply-Combine)',
        body: `<p>పెద్ద డేటా ని ఊరికే చూడటం కాదు, "సిటీ వైజ్ గా ఎక్కడెక్కడ ఎంత సేల్స్ అయ్యాయో టోటల్స్ కావాలి" అని అడిగినప్పుడు <strong>GroupBy</strong> వాడతాం.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">దీనిలో 3 స్టెప్స్ ఉంటాయి:</h4>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong>Split:</strong> ముందు డేటా మొత్తాన్ని గ్రూప్స్ లాగా విడదీస్తుంది (South వాళ్ళని ఒక చోట, North వాళ్ళని ఒక చోట).</li>
          <li><strong>Apply:</strong> ప్రతి గ్రూప్ మీద ఆవరేజ్/టోటల్ (mean/sum) ఫంక్షన్ ని అప్లై చేస్తుంది.</li>
          <li><strong>Combine:</strong> అన్నిటినీ కలిపి ఒక చిన్న సమ్మరీ రిపోర్ట్ లాగా టేబుల్ ఇస్తుంది.</li>
        </ol>`,
        code: `# GroupBy (కంపెనీ సేల్స్) సిమ్యులేషన్:
sales_transactions = [
    {"region": "South", "rep": "Balaji", "sales": 450000},
    {"region": "North", "rep": "Alex",   "sales": 320000},
    {"region": "South", "rep": "Chloe",  "sales": 580000},
    {"region": "North", "rep": "David",  "sales": 290000}
]

# రీజియన్ వైజ్ టోటల్స్ కౌంట్ చేద్దాం:
regional_summary = {}
for item in sales_transactions:
    reg = item["region"]
    if reg not in regional_summary:
        regional_summary[reg] = {"total_sales": 0, "deals": 0}
    regional_summary[reg]["total_sales"] += item["sales"]
    regional_summary[reg]["deals"] += 1

print("--- 📈 రీజియన్ వైజ్ సేల్స్ రిపోర్ట్ (GroupBy) ---")
for reg, stats in regional_summary.items():
    print(f"• రీజియన్: {reg:6} | టోటల్ సేల్స్: ₹{stats['total_sales']:>8,}")`,
        codeTitle: 'Example 2: Split-Apply-Combine GroupBy Aggregation',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Pandas GroupBy ఫార్ములా:</strong>
          <p style="margin-top:6px;">Pandas లో <code>df.groupby('region')['sales'].sum()</code> అని రాస్తే ఈ రిపోర్ట్ క్షణాల్లో వస్తుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'డేటాని విడదీయకముందే (Train/Test Split) ఆవరేజ్ కనుక్కోవడం',
      text: 'మిషన్ కి నేర్పించే డేటాని టెస్టింగ్ డేటాని కలిపి ఆవరేజ్ చేసి ఖాళీలని నింపితే, ఎగ్జామ్ పేపర్ ముందే లీక్ అయినట్టు అవుతుంది (దీన్నే Data Leakage అంటారు). ఫస్ట్ స్ప్లిట్ చేసి, ఆ తర్వాత ట్రైనింగ్ డేటా ఆవరేజ్ తోనే టెస్టింగ్ డేటాలో ఖాళీలు నింపాలి.'
    },
    tryIt: {
      desc: 'రెండు టేబుల్స్ (ఆమ్మిన బిల్స్ అండ్ కస్టమర్స్ లిస్ట్) ని ఎలా కలుపుతారు? సిమ్యులేట్ చేయండి.',
      code: `customers = {1: "Balaji", 2: "Alex"}
orders = [{"id": 101, "cust_id": 1, "amount": 4500}, 
          {"id": 102, "cust_id": 2, "amount": 1200}]

# రెండు టేబుల్స్ ని జాయిన్ చేయడం (pd.merge):
merged = []
for ord in orders:
    merged.append({
        "order_id": ord["id"],
        "customer": customers.get(ord["cust_id"], "Unknown"),
        "amount": ord["amount"]
    })

for m in merged:
    print(f"బిల్ #{m['order_id']}: {m['customer']} - ₹{m['amount']}")`
    },
    faqs: [
      {
        q: 'pd.merge() కి, pd.concat() కి తేడా ఏంటి?',
        a: 'merge అంటే రెండు వేర్వేరు టేబుల్స్ ని పక్కపక్కన జాయిన్ చేయడం (SQL Join లాగా). concat అంటే ఒక టేబుల్ కింద ఇంకో టేబుల్ ని కాపీ పేస్ట్ లా అంటించడం.'
      },
      {
        q: 'క్లీన్ చేసిన ఫైల్ ని Excel కి సేవ్ చేయొచ్చా?',
        a: 'ఎస్! df.to_excel("file.xlsx", index=False) అంటే డైరెక్ట్ ఎక్సెల్ ఫైల్ అయిపోతుంది.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 57: DATA VISUALIZATION — MATPLOTLIB & SEABORN
  // =========================================================================
  {
    num: 57,
    phaseId: 'phase11',
    phaseTitle: 'Phase 11: Data Science and AI',
    slug: '57-python-data-visualization-matplotlib-seaborn',
    title: 'Data Vis: Matplotlib & Seaborn (తెలుగులో)',
    badge: '57. Visualization & Plots',
    subtopics: 'The Anatomy of a Figure · Matplotlib Object-Oriented Interface · Line & Bar Charts · Histograms & Distributions · Scatter & Box Plots · Seaborn Heatmaps',
    desc: 'పెద్ద పెద్ద డేటాని చూసి ఎవ్వరూ అర్థం చేసుకోలేరు. అందుకే దాన్ని లైన్ చార్ట్స్, బార్ చార్ట్స్ లాగా ఎలా చూపించాలో Matplotlib అండ్ Seaborn లైబ్రరీస్ వాడి నేర్చుకుందాం.',
    sections: [
      {
        title: '1. Matplotlib బేసిక్స్ (Figure మరియు Axes అంటే ఏంటి?)',
        body: `<p><strong>Matplotlib</strong> అనేది పైథాన్ లో చార్ట్స్ గీయడానికి వాడే మెయిన్ టూల్. ఇది ఎలా పనిచేస్తుందో తెలియాలంటే ఈ రెండు అర్థం అవ్వాలి:</p>
        <ul>
          <li><strong>Figure:</strong> ఇది మనం బొమ్మ గీసే ఒక ఖాళీ డ్రాయింగ్ షీట్ లాంటిది.</li>
          <li><strong>Axes (Subplot):</strong> ఆ షీట్ లోపల గీసే చార్ట్ (ఒకే షీట్ లో 4 చార్ట్స్ గీస్తే 4 Axes ఉన్నట్టు లెక్క). అందులోనే X, Y లైన్స్, టైటిల్ అన్నీ ఉంటాయి.</li>
        </ul>

        <div class="diagram-box">┌────────────────────────────────────────────────────────────────────────┐
│                        MATPLOTLIB చార్ట్ స్ట్రక్చర్                     │
├────────────────────────────────────────────────────────────────────────┤
│  FIGURE (మెయిన్ క్యాన్వాస్)                                            │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Title: "నెలవారీ ఆదాయం (2026)"                                    │  │
│  │                                                                  │  │
│  │ Y-Axis: ఆదాయం (₹)                                                │  │
│  │    ▲                                                             │  │
│  │ 10k│    •                                                        │  │
│  │  8k│   / \\     •                                                 │  │
│  │  6k│  •   \\   / \\    Legend: [── ఆదాయం 2026]                    │  │
│  │  4k│ •     \\ •   •                                              │  │
│  │    └──────────────────────► X-Axis Label: నెల                    │  │
│  │      Jan Feb Mar Apr May                                         │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘</div>`,
        code: `# చార్ట్ గీయడానికి బ్లూప్రింట్ (యాక్చువల్ Matplotlib లో ఎలా రాస్తామంటే..):
"""
import matplotlib.pyplot as plt

# 1. Figure, Axes ని క్రియేట్ చేయడం:
fig, ax = plt.subplots(figsize=(10, 6))

# 2. డేటాని ఇవ్వడం:
months = ["Jan", "Feb", "Mar", "Apr", "May"]
revenue = [45000, 52000, 61000, 58000, 74000]

ax.plot(months, revenue, color="#10b981", marker="o", label="Revenue (₹)")

# 3. అందంగా మార్చడం (టైటిల్స్):
ax.set_title("Revenue Growth Trend")
ax.set_xlabel("నెల")
ax.set_ylabel("ఆదాయం (INR)")
ax.legend()

# 4. ఇమేజ్ లాగా సేవ్ చేయడం:
plt.tight_layout()
fig.savefig("revenue.png")
"""
print("Matplotlib చార్ట్ బ్లూప్రింట్ లోడ్ అయ్యింది.")`,
        codeTitle: 'Blueprint: Matplotlib Object-Oriented Interface Configuration',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 plt.plot() బదులు plt.subplots() ఎందుకు?:</strong>
          <p style="margin-top:6px;">plt.plot() వాడితే ఈజీగానే వస్తుంది కానీ, ఒకే పేజీలో పక్కపక్కన రెండు మూడు చార్ట్స్ గీయాలంటే కష్టం. కాబట్టి <code>fig, ax</code> పద్ధతి ఫాలో అవ్వడమే ప్రొఫెషనల్ వే.</p>
        </div>`
      },
      {
        title: '2. ఏ డేటాకి ఏ చార్ట్ వాడాలి? (Seaborn స్టైలింగ్)',
        body: `<p><strong>Seaborn</strong> అనేది Matplotlib మీదే తయారైన ఇంకో టూల్. ఇది చూడటానికి చాలా అందంగా (Modern Look) ఉంటుంది.</p>
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>చార్ట్ రకం</th><th>ఎప్పుడు వాడాలి?</th></tr>
          <tr><td><strong>Line Chart</strong></td><td>టైమ్ ని బట్టి డేటా ఎలా మారుతుందో చూడటానికి (ఉదా: స్టాక్ ప్రైస్).</td></tr>
          <tr><td><strong>Bar Chart</strong></td><td>ఒకదానికొకటి కంపేర్ చేయడానికి (ఉదా: ఏ బ్రాండ్ సేల్స్ ఎక్కువ).</td></tr>
          <tr><td><strong>Histogram</strong></td><td>ఒక డేటా ఎలా విడిపోయి ఉందో చూడటానికి (ఉదా: ఏ వయసు వాళ్ళు ఎక్కువ ఉన్నారు).</td></tr>
          <tr><td><strong>Scatter Plot</strong></td><td>రెండు విషయాల మధ్య లింక్ ఉందో లేదో చూడటానికి (ఉదా: చదివిన గంటలకీ, వచ్చిన మార్కులకీ).</td></tr>
          <tr><td><strong>Heatmap</strong></td><td>కలర్స్ ని బట్టి ఒక పెద్ద టేబుల్ ని ఈజీగా అర్థం చేసుకోవడానికి.</td></tr>
        </table>`,
        code: `# బాక్స్ ప్లాట్ (Box Plot) కి కావాల్సిన స్టాటిస్టిక్స్ ని సిమ్యులేట్ చేద్దాం:
test_scores = [42, 65, 68, 72, 75, 78, 80, 82, 85, 88, 90, 92, 95, 98, 100]

sorted_scores = sorted(test_scores)
n = len(sorted_scores)

min_v = sorted_scores[0]
max_v = sorted_scores[-1]
median_v = sorted_scores[n // 2]
q1 = sorted_scores[n // 4]      # 25% మార్క్
q3 = sorted_scores[(3 * n) // 4] # 75% మార్క్

print("--- 📊 బాక్స్ ప్లాట్ సమ్మరీ (5-Number Summary) ---")
print(f"• కనిష్టం (Min):  {min_v}")
print(f"• 25% మార్క్ (Q1): {q1}")
print(f"• సగటు (Median):  {median_v}")
print(f"• 75% మార్క్ (Q3): {q3}")
print(f"• గరిష్టం (Max):  {max_v}")`,
        codeTitle: 'Example 2: 5-Number Distribution Summary for Box Plot Visualizations',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Outliers (వింత డేటా):</strong>
          <p style="margin-top:6px;">అందరికీ 80-90 వస్తే, ఎవరో ఒక్కరికి మాత్రం 10 మార్కులే వస్తాయి. ఇలాంటి డిఫరెంట్ డేటాని కనిపెట్టడానికి బాక్స్ ప్లాట్ చాలా బాగా పనిచేస్తుంది (వాటిని చుక్కల్లా చూపిస్తుంది).</p>
        </div>`
      }
    ],
    mistake: {
      title: '3D Pie Charts వాడటం',
      text: 'చూడటానికి ఎంత ఫ్యాన్సీ గా ఉన్నా, 3D పై చార్ట్స్ వాడకూడదు. ఎందుకంటే వెనక ఉన్న భాగం చిన్నగా, ముందున్నది పెద్దగా కనిపిస్తుంది కాబట్టి పర్సంటేజ్ లు కన్ఫ్యూజ్ అవుతారు. బార్ చార్ట్స్ వాడటమే బెస్ట్.'
    },
    tryIt: {
      desc: 'ఒక Heatmap కి కలర్స్ ఇచ్చే లాజిక్ రాయండి (నెంబర్ పెరిగితే కలర్ డార్క్ అవ్వాలి).',
      code: `def get_color(value):
    if value > 80: return "🔴 Dark Red"
    elif value > 50: return "🟡 Yellow"
    return "🟢 Green"

data = [95, 60, 20]
for d in data:
    print(f"స్కోర్ {d} కి కలర్: {get_color(d)}")`
    },
    faqs: [
      {
        q: 'Seaborn ఎందుకు? Matplotlib తో సరిపోదా?',
        a: 'Matplotlib లో ఒక అందమైన చార్ట్ గీయాలంటే 10 లైన్స్ కోడ్ రాయాలి, అదే Seaborn లో ఒక్క లైన్ తో చాలా ప్రొఫెషనల్ గా (థీమ్స్ తో సహా) వచ్చేస్తుంది.'
      },
      {
        q: 'plt.tight_layout() ఎందుకు వాడాలి?',
        a: 'చాలా సార్లు టైటిల్స్, నెంబర్స్ ఒకదాని మీద ఒకటి పడిపోతాయి. ఇది వాడితే ఆటోమాటిక్ గా గ్యాప్స్ అడ్జస్ట్ చేసుకుని నీట్ గా వస్తుంది.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 58: MACHINE LEARNING WITH SCIKIT-LEARN
  // =========================================================================
  {
    num: 58,
    phaseId: 'phase11',
    phaseTitle: 'Phase 11: Data Science and AI',
    slug: '58-python-machine-learning-foundations-scikit-learn',
    title: 'Machine Learning Basics (తెలుగులో)',
    badge: '58. Machine Learning Basics',
    subtopics: 'Supervised vs Unsupervised · Features (X) & Labels (y) · train_test_split · Feature Scaling · Linear Regression · Logistic Classification · Model Persistence (joblib)',
    desc: 'మెషీన్ లెర్నింగ్ అంటే ఏంటి? కంప్యూటర్స్ డేటాని చూసి ఎలా నేర్చుకుంటాయి? Scikit-Learn లైబ్రరీ వాడి ఫస్ట్ ప్రిడిక్షన్ మోడల్ (Linear Regression) ఎలా తయారు చేయాలో చూద్దాం.',
    sections: [
      {
        title: '1. Machine Learning అంటే ఏంటి? (Supervised vs Unsupervised)',
        body: `<p>మామూలు ప్రోగ్రామింగ్ లో మనం రూల్స్ రాసి కంప్యూటర్ కి ఇస్తాం, అది ఆన్సర్స్ చెప్తుంది. కానీ <strong>Machine Learning (ML)</strong> లో మనం డేటా, ఆన్సర్స్ ఇస్తాం.. కంప్యూటరే వాటి మధ్య ఉన్న రూల్స్ ని (ప్యాట్రన్స్ ని) నేర్చుకుని ఒక మోడల్ ని తయారు చేస్తుంది!</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">దీనిలో 3 రకాలు:</h4>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong>Supervised Learning:</strong> ఇది టీచర్ పాఠం చెప్పినట్టు. డేటా (X) తో పాటు కరెక్ట్ ఆన్సర్స్ (y) కూడా ఇస్తాం.
            <ul>
              <li><strong>Regression:</strong> నెంబర్స్ ని ప్రిడిక్ట్ చేయడం (ఉదా: ఈ ఇల్లు ఎంత ధరకు పోతుంది?).</li>
              <li><strong>Classification:</strong> కేటగిరీలని కనుక్కోవడం (ఉదా: ఇది స్పామ్ ఈమెయిలా కాదా?).</li>
            </ul>
          </li>
          <li><strong>Unsupervised Learning:</strong> దీనిలో ఆన్సర్స్ ఇవ్వం (యూట్యూబ్ రికమండేషన్స్ లాగా). అది డేటాని చూసి ఏది ఏ గ్రూప్ కి చెందుతుందో అదే డిసైడ్ అవుతుంది (ఉదా: కస్టమర్లని డిఫరెంట్ గ్రూప్స్ గా విడదీయడం).</li>
          <li><strong>Reinforcement Learning:</strong> రోబోట్స్ నడవడం నేర్చుకోవడం, గేమ్స్ ఆడటం (తప్పు చేస్తే మైనస్ మార్కులు, కరెక్ట్ చేస్తే ప్లస్ మార్కులు).</li>
        </ol>

        <div class="diagram-box">┌────────────────────────────────────────────────────────────────────────┐
│                   SCIKIT-LEARN ML వర్క్ ఫ్లో                           │
├────────────────────────────────────────────────────────────────────────┤
│  1. డేటా: ఫీచర్స్ (X) & ఆన్సర్ (y)                                     │
│         │                                                              │
│         ▼                                                              │
│  2. డేటాని విడదీయడం (train_test_split: 80% నేర్చుకోవడానికి, 20% టెస్ట్ కి) │
│         │                                                              │
│         ▼                                                              │
│  3. స్కేలింగ్ (StandardScaler): పెద్ద నెంబర్లని చిన్నవిగా చేయడం        │
│         │                                                              │
│         ▼                                                              │
│  4. ట్రైనింగ్ (model.fit(X_train, y_train)): మోడల్ నేర్చుకోవడం        │
│         │                                                              │
│         ▼                                                              │
│  5. టెస్టింగ్ (model.predict(X_test)): మార్కులు వేయడం (Accuracy)       │
└────────────────────────────────────────────────────────────────────────┘</div>`,
        code: `# Linear Regression (y = mx + c) ఎలా పనిచేస్తుందో సింపుల్ లాజిక్:
class SimpleLinearRegression:
    def __init__(self):
        self.m = 0 # స్లోప్ (ఎంత పెరుగుతుంది)
        self.c = 0 # స్టార్టింగ్ పాయింట్

    def fit(self, X_train, y_train):
        # ఇక్కడే అది ఆ ఫార్ములా కి తగ్గ నెంబర్స్ ని నేర్చుకుంటుంది (M అండ్ C)
        n = len(X_train)
        mean_x = sum(X_train) / n
        mean_y = sum(y_train) / n
        
        num = sum((x - mean_x) * (y - mean_y) for x, y in zip(X_train, y_train))
        den = sum((x - mean_x) ** 2 for x in X_train)
        self.m = num / den
        self.c = mean_y - (self.m * mean_x)
        print(f"🤖 మోడల్ నేర్చుకుంది: y = {self.m:.2f}x + {self.c:.2f}")

    def predict(self, X_test):
        return [self.m * x + self.c for x in X_test]

# 1. డేటా: ఎన్ని ఏళ్ళ ఎక్స్పీరియన్స్ ఉంటే ఎంత శాలరీ వస్తుంది?
X_experience = [1, 2, 3, 4, 5]
y_salary =     [40, 50, 65, 75, 90] # వేలలో

# 2. మోడల్ కి నేర్పించడం:
model = SimpleLinearRegression()
model.fit(X_experience, y_salary)

# 3. కొత్త వాళ్లకి శాలరీ చెప్పడం (6, 8 ఏళ్ళ ఎక్స్పీరియన్స్ ఉంటే?):
unseen = [6, 8]
predictions = model.predict(unseen)

print("\\n--- 📈 కొత్త డేటాకి ప్రిడిక్షన్స్ ---")
for exp, pred in zip(unseen, predictions):
    print(f"• ఎక్స్పీరియన్స్: {exp} yrs -> వస్తుందని అంచనా శాలరీ: ₹{pred:,.2f}k")`,
        codeTitle: 'Example 1: End-to-End Linear Regression Architecture Implementation',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Scikit-Learn సింప్లిసిటీ:</strong>
          <p style="margin-top:6px;">నిజమైన లైబ్రరీ వాడినప్పుడు ఇంత కోడ్ రాయక్కర్లేదు. ఏ అల్గారిథమ్ కైనా <code>model.fit()</code> అని ఇస్తే నేర్చుకుంటుంది, <code>model.predict()</code> అని ఇస్తే ఆన్సర్ చెప్తుంది. అంతే సింపుల్!</p>
        </div>`
      },
      {
        title: '2. మోడల్ ఎంత బాగా పనిచేస్తుందో టెస్ట్ చేయడం (Accuracy, Precision)',
        body: `<p>మోడల్ కి 99% Accuracy వచ్చింది అని గుడ్డిగా నమ్మకూడదు. (ఒక హాస్పిటల్ డేటాలో 100 మందిలో 1కి క్యాన్సర్ ఉంటే, "ఎవరికీ లేదు" అని చెప్పినా 99% అక్యూరసీ వస్తుంది, కానీ అది పెద్ద తప్పు కదా!). అందుకే ఇవి వాడతారు:</p>
        
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>పేరు</th><th>ఎందుకు?</th></tr>
          <tr><td><strong>Accuracy</strong></td><td>అన్నిటిలో ఎన్ని కరెక్ట్ గా చెప్పింది? (డేటా బ్యాలెన్స్ గా ఉన్నప్పుడు).</td></tr>
          <tr><td><strong>Precision</strong></td><td>"తప్పుగా ఎవరినీ పనిష్ చేయకూడదు" అనుకున్నప్పుడు (స్పామ్ ఫిల్టర్స్ కి).</td></tr>
          <tr><td><strong>Recall</strong></td><td>"ఏ ఒక్క అసలైన కేసు కూడా మిస్ అవ్వకూడదు" అనుకున్నప్పుడు (క్యాన్సర్ టెస్టింగ్ లాంటివి).</td></tr>
        </table>`,
        code: `# కన్ఫ్యూజన్ మ్యాట్రిక్స్ సిమ్యులేషన్ (హాస్పిటల్ రిపోర్ట్):
TP = 85  # క్యాన్సర్ ఉంది అని కరెక్ట్ గా చెప్పినవి
FP = 10  # హెల్తీ గా ఉన్నా క్యాన్సర్ ఉందని తప్పుగా చెప్పినవి
FN = 5   # క్యాన్సర్ ఉన్నా "హెల్తీ" అని డేంజర్ తప్పు చేసినవి!
TN = 900 # హెల్తీ అని కరెక్ట్ గా చెప్పినవి

accuracy = (TP + TN) / (TP + FP + FN + TN)
precision = TP / (TP + FP)
recall = TP / (TP + FN)
f1 = 2 * (precision * recall) / (precision + recall)

print("--- 🩺 మెడికల్ మోడల్ రిపోర్ట్ ---")
print(f"• Accuracy:  {accuracy * 100:.2f}%")
print(f"• Precision: {precision * 100:.2f}% (క్యాన్సర్ అని చెప్పిన వాటిలో నిజంగా ఉన్నవాళ్ళు)")
print(f"• Recall:    {recall * 100:.2f}% (అసలు కేసుల్లో ఎన్ని పట్టుకుంది)")`,
        codeTitle: 'Example 2: Classification Performance Metrics & Confusion Matrix',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Model Save చేయడం (joblib):</strong>
          <p style="margin-top:6px;">ఒక మోడల్ కి నేర్పించడానికి గంటల టైమ్ పడుతుంది. ప్రతిసారీ నేర్పించలేం కాబట్టి దాన్ని <code>joblib.dump()</code> వాడి ఒక ఫైల్ లా సేవ్ చేసి యాప్స్ లో వాడుకుంటాం.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'నేర్పించిన డేటా తోనే టెస్ట్ చేయడం',
      text: 'స్టూడెంట్ కి ఒక బుక్ ఇచ్చి చదవమని, ఎగ్జామ్ లో అవే క్వశ్చన్స్ ఇస్తే 100 మార్కులు వస్తాయి. కానీ బయటనుంచి ఇస్తే ఫెయిల్ అవుతాడు (దీన్నే Overfitting అంటారు). అందుకే మనం ఎప్పుడూ `train_test_split` వాడి 20% డేటాని దాచిపెట్టి (టెస్ట్ సెట్), దాని మీద మాత్రమే మార్కులు వేయాలి.'
    },
    tryIt: {
      desc: 'MSE (Mean Squared Error) ఎంత ఉందో క్యాలిక్యులేట్ చేయండి: అసలు ప్రైసెస్ [50, 80], మనం గెస్ చేసినవి [48, 85].',
      code: `actual = [50, 80]
predicted = [48, 85]

mse = sum((act - pred) ** 2 for act, pred in zip(actual, predicted)) / len(actual)
rmse = mse ** 0.5

print(f"ఆవరేజ్ ఎర్రర్ (RMSE): ₹{rmse:.2f} తేడాతో తప్పు చెప్తుంది")`
    },
    faqs: [
      {
        q: 'StandardScaler ఎందుకు వాడాలి?',
        a: 'శాలరీ అనేది 1,00,000 లాగా పెద్ద నెంబర్, ఏజ్ అనేది 25 లాగా చిన్న నెంబర్. మోడల్ కి శాలరీ ఏమో పెద్ద విషయం అనుకుని కన్ఫ్యూజ్ అవుతుంది. దాన్ని ఆపడానికే అన్ని నెంబర్స్ ని 0, 1 ల మధ్యలోకి తీసుకువస్తాం (స్కేలింగ్).'
      },
      {
        q: 'Bagging, Boosting అంటే ఏంటి?',
        a: 'Random Forest (Bagging) అంటే ఒకేసారి 100 చెట్ల (మోడల్స్) కి నేర్పించి ఓటింగ్ వేయడం. XGBoost (Boosting) అంటే ఒక మోడల్ చేసిన తప్పుని రెండో మోడల్, అది చేసిన తప్పుని మూడో మోడల్.. ఇలా వరుసగా నేర్చుకుంటూ పర్ఫెక్ట్ గా అవ్వడం.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 59: DATA SCIENCE & AI CAPSTONE PROJECTS
  // =========================================================================
  {
    num: 59,
    phaseId: 'phase11',
    phaseTitle: 'Phase 11: Data Science and AI',
    slug: '59-python-data-science-and-ai-capstone-projects',
    title: 'Data Science & AI ప్రాజెక్ట్స్ (తెలుగులో)',
    badge: '59. Data Science & AI Projects',
    subtopics: '5 Full Projects · 1. E-Commerce Sales Pipeline · 2. Real Estate Price Prediction · 3. Customer Churn Classifier · 4. K-Means Customer Clustering · 5. Financial Stock Visualizer',
    desc: 'ఇంతవరకు నేర్చుకున్న ప్యాండాస్ క్లీనింగ్, రిగ్రెషన్, క్లాసిఫికేషన్ లాజిక్స్ తో 5 రియల్ వరల్డ్ ప్రాజెక్ట్స్ (సేల్స్ రిపోర్ట్స్, హౌస్ ప్రైస్ గెస్ చేయడం, కస్టమర్స్ ఏ గ్రూప్ కి వస్తారో చెప్పడం, స్టాక్స్ అనాలిసిస్) ఎలా చేయాలో చూద్దాం.',
    sections: [
      {
        title: '1. ప్రాజెక్ట్ 1: E-Commerce సేల్స్ రిపోర్ట్స్ పైప్ లైన్ (Pandas లాజిక్)',
        body: `<p>వచ్చిన రా చెత్త డేటాని క్లీన్ చేసి (మిస్ అయినవి నింపి), అందులో ఏ కేటగిరీ లో ఎంత సేల్స్ అయ్యాయో చెప్పే ఒక చిన్న అనాలిసిస్ ఇంజిన్:</p>`,
        code: `# ప్రాజెక్ట్ 1: సేల్స్ అనాలిసిస్ ఇంజిన్
class SalesAnalytics:
    def __init__(self, raw_data):
        self.raw_data = raw_data
        self.cleaned = []

    def clean_data(self):
        # 1. ఖాళీగా ఉన్నవి క్లీన్ చేయడం:
        for item in self.raw_data:
            if not item.get("order_id"): continue # ఆర్డర్ ఐడీ లేకపోతే తీసేయ్
            
            row = item.copy()
            if not row.get("qty"): row["qty"] = 1 # Qty లేకపోతే 1 ఇవ్వు
            
            row["revenue"] = row["qty"] * row["price"]
            self.cleaned.append(row)

    def get_summary(self):
        summary = {}
        for row in self.cleaned:
            cat = row["category"]
            if cat not in summary:
                summary[cat] = {"revenue": 0.0, "items": 0}
            summary[cat]["revenue"] += row["revenue"]
            summary[cat]["items"] += row["qty"]
        return summary

raw_txns = [
    {"order_id": "O1", "category": "Tech", "price": 2500, "qty": 2},
    {"order_id": "O2", "category": "Home", "price": 400,  "qty": None}, # Qty మిస్ అయ్యింది
    {"order_id": None, "category": "Tech", "price": 1000, "qty": 1},  # ఐడీ లేదు
]

app = SalesAnalytics(raw_txns)
app.clean_data()
stats = app.get_summary()

print("--- 📊 సేల్స్ రిపోర్ట్ ---")
for cat, data in stats.items():
    print(f"• {cat}: ₹{data['revenue']} ({data['items']} ఐటమ్స్)")`,
        codeTitle: 'Project 1: E-Commerce Sales Analytics Pipeline',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 ఆటోమేషన్ పైప్ లైన్:</strong>
          <p style="margin-top:6px;">రోజూ వచ్చే కొత్త ఎక్సెల్ ఫైల్స్ ని ఇస్తే, ఆటోమాటిక్ గా క్లీన్ చేసి ఈ సమ్మరీ రిపోర్ట్ ఇచ్చేలా ఇలాంటి క్లాసెస్ ని డిజైన్ చేస్తారు.</p>
        </div>`
      },
      {
        title: '2. ప్రాజెక్ట్ 2: హౌస్ ప్రైస్ ప్రిడిక్షన్ (Multiple Linear Regression)',
        body: `<p>ఒక ఇంటి ప్రైస్ అనేది.. దాని సైజ్ ని బట్టి, బెడ్ రూమ్స్ ని బట్టి పెరుగుతుంది, కానీ ఏజ్ పెరిగేకొద్దీ తగ్గుతుంది. ఆ మ్యాథ్స్ ని సిమ్యులేట్ చేద్దాం:</p>`,
        code: `# ప్రాజెక్ట్ 2: రియల్ ఎస్టేట్ ప్రైస్ ఇంజిన్
class HousePredictor:
    def __init__(self):
        # ఇవి మోడల్ నేర్చుకున్న బేసిక్ వాల్యూస్ (Weights)
        self.base = 20.0       # బేస్ ప్రైస్ (లక్షల్లో)
        self.per_sqft = 0.06   # ఒక్క స్క్వేర్ ఫీట్ కి
        self.per_bed = 15.0    # ఒక్క బెడ్ రూమ్ కి
        self.age_dep = 0.5     # ఒక్కో ఏడాది పాతబడితే తగ్గే రేటు

    def predict(self, sqft, beds, age):
        # y = w1*x1 + w2*x2 + w3*x3 + c
        price = self.base + (sqft * self.per_sqft) + (beds * self.per_bed) - (age * self.age_dep)
        return max(price, 10.0) # కనీసం 10 లక్షలు ఉంచుదాం

model = HousePredictor()

test_houses = [
    {"desc": "కొత్త 2BHK", "sqft": 1200, "beds": 2, "age": 2},
    {"desc": "పాత 4BHK",  "sqft": 3000, "beds": 4, "age": 18}
]

print("--- 🏡 హౌస్ ప్రైస్ అంచనాలు ---")
for h in test_houses:
    val = model.predict(h["sqft"], h["beds"], h["age"])
    print(f"• {h['desc']}: ₹{val:,.2f} లక్షలు")`,
        codeTitle: 'Project 2: Real Estate Price Prediction Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 మల్టిపుల్ ఫీచర్స్ (Features):</strong>
          <p style="margin-top:6px;">ఒక్క పాయింట్ ని బట్టే కాకుండా, 3-4 విషయాల్ని (sqft, beds, age) కలిపి ప్రైస్ చెప్పడాన్ని Multiple Regression అంటారు.</p>
        </div>`
      },
      {
        title: '3. ప్రాజెక్ట్ 3: కస్టమర్ మన యాప్ ని వదిలేస్తాడా? (Churn Classification)',
        body: `<p>యూజర్ లాగిన్స్ తగ్గిపోతే, కంప్లైంట్స్ (టికెట్స్) పెరిగితే.. అతనికి యాప్ నచ్చట్లేదని అర్థం. అతన్ని కాపాడుకోవడానికి పంపే వార్నింగ్ సిస్టమ్ (Sigmoid Curve తో):</p>`,
        code: `# ప్రాజెక్ట్ 3: కస్టమర్ డ్రాప్ ఔట్ రిస్క్ (Logistic Regression ఐడియా)
import math

class ChurnPredictor:
    def get_risk_score(self, logins, tickets, no_login_days):
        # రిస్క్ స్కోర్ ఫార్ములా (టికెట్స్ పెరిగితే ప్లస్, లాగిన్స్ పెరిగితే మైనస్)
        z = -2.0 - (0.15 * logins) + (0.80 * tickets) + (0.05 * no_login_days)
        
        # Sigmoid వాడి దాన్ని 0.0 నుంచి 1.0 మధ్యలో మారుస్తున్నాం (Probability)
        prob = 1.0 / (1.0 + math.exp(-z))
        return prob

model = ChurnPredictor()

# 1. రెగ్యులర్ కస్టమర్
prob1 = model.get_risk_score(logins=45, tickets=0, no_login_days=1)
# 2. కోపంగా ఉన్న కస్టమర్ (లాగిన్ అవ్వట్లేదు, కంప్లైంట్స్ ఇచ్చాడు)
prob2 = model.get_risk_score(logins=3, tickets=5, no_login_days=25)

print("--- 🚨 కస్టమర్ రిస్క్ వార్నింగ్స్ ---")
print(f"• రెగ్యులర్ కస్టమర్ రిస్క్:  {prob1 * 100:.1f}% (సేఫ్ 🟢)")
print(f"• కోపంగా ఉన్న కస్టమర్ రిస్క్: {prob2 * 100:.1f}% (డేంజర్ 🔴 - ఆఫర్ ఇవ్వండి!)")`,
        codeTitle: 'Project 3: Customer Churn Classification Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Sigmoid మ్యాజిక్:</strong>
          <p style="margin-top:6px;">లాజిస్టిక్ రిగ్రెషన్ ఈ <code>1 / (1 + e^-z)</code> ఫార్ములా వాడే, ఏ నెంబర్ నైనా 0% (చాలా తక్కువ) లేదా 100% (చాలా ఎక్కువ) ప్రాబబిలిటీ లాగా మారుస్తుంది.</p>
        </div>`
      },
      {
        title: '4. ప్రాజెక్ట్ 4: కస్టమర్స్ కి ఆఫర్స్ ఇవ్వడానికి గ్రూప్స్ (K-Means Clustering)',
        body: `<p>యూజర్స్ ఎంత సంపాదిస్తున్నారు, ఎంత ఖర్చుపెడుతున్నారు అనే దాన్ని బట్టి ఏ క్లస్టర్ (Cluster) కో ఆటోమాటిక్ గా పంపే అల్గారిథమ్:</p>`,
        code: `# ప్రాజెక్ట్ 4: K-Means కస్టమర్ సెగ్మెంటేషన్ సిమ్యులేషన్

class K_Means_Sim:
    def __init__(self):
        # K-Means మోడల్ కనుక్కున్న 3 సెంటర్స్ (Centroids)
        self.centers = {
            "VIP (ఖర్చుపెట్టేవాళ్ళు)":  {"inc": 95, "spend": 85},
            "బడ్జెట్ (ఆదా చేసేవాళ్ళు)":   {"inc": 35, "spend": 25},
        }

    def assign_group(self, inc, spend):
        best_group = None
        min_dist = float("inf")
        
        # ఏ సెంటర్ కి దగ్గరగా ఉంటే ఆ గ్రూప్ కి ఇస్తాం (Euclidean Distance):
        for name, c in self.centers.items():
            dist = ((inc - c["inc"])**2 + (spend - c["spend"])**2) ** 0.5
            if dist < min_dist:
                min_dist = dist
                best_group = name
        return best_group

model = K_Means_Sim()
print("--- 👥 కస్టమర్ గ్రూప్స్ అసైన్మెంట్ ---")
print("కస్టమర్ 1 (Inc: 100k, Spend: 90) ->", model.assign_group(100, 90))
print("కస్టమర్ 2 (Inc: 30k,  Spend: 20) ->", model.assign_group(30, 20))`,
        codeTitle: 'Project 4: K-Means Customer Clustering Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Unsupervised లెర్నింగ్:</strong>
          <p style="margin-top:6px;">ఇక్కడ మనం కంప్యూటర్ కి "వీళ్ళు VIP" అని ముందే చెప్పలేదు. అది వాళ్ళ ఆదాయం, ఖర్చుల దూరాన్ని లెక్కేసి దానంతట అదే 2 గ్రూప్స్ గా విడదీసింది!</p>
        </div>`
      },
      {
        title: '5. ప్రాజెక్ట్ 5: స్టాక్ మార్కెట్ ట్రెండ్స్ (Time-Series Moving Average)',
        body: `<p>కంపెనీ షేర్ ప్రైస్ రోజురోజుకూ మారుతూ ఉంటే పిచ్చిపిచ్చిగా ఉంటుంది. అందుకే స్మూత్ గా చూడటానికి 3-రోజుల మూవింగ్ ఆవరేజ్ ని ఎలా క్యాలిక్యులేట్ చేయాలో చూద్దాం.</p>`,
        code: `# ప్రాజెక్ట్ 5: స్టాక్స్ (SMA & Volatility)
class StockAnalyzer:
    def __init__(self, prices):
        self.prices = prices

    def moving_avg(self, days=3):
        sma = []
        for i in range(len(self.prices)):
            if i < days - 1:
                sma.append("-") # ఫస్ట్ 2 డేస్ కి ఆవరేజ్ రాదు
            else:
                window = self.prices[i - days + 1 : i + 1]
                sma.append(sum(window) / days)
        return sma

tcs_prices = [4150, 4180, 4220, 4200, 4260]
analyzer = StockAnalyzer(tcs_prices)

print("--- 📈 TCS స్టాక్ 3-Days మూవింగ్ ఆవరేజ్ ---")
print(f"రోజువారీ ప్రైసెస్: {tcs_prices}")
print(f"SMA ట్రెండ్ లైన్:  {analyzer.moving_avg()}")`,
        codeTitle: 'Project 5: Financial Stock Time-Series Analyzer',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 పాండాస్ రోలింగ్ ఫంక్షన్:</strong>
          <p style="margin-top:6px;">నిజమైన డేటాలో 10 ఏళ్ల డేటా ఉన్నా సరే.. ప్యాండాస్ లో <code>df['SMA'] = df['Close'].rolling(3).mean()</code> అని ఇస్తే ఒక్క సెకండ్ లో వచ్చేస్తుంది.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Correlation నే Causation (కారణం) అనుకోవడం',
      text: '"సమ్మర్ లో ఐస్ క్రీమ్స్ సేల్స్ పెరుగుతాయి.. అదే టైమ్ లో సముద్రంలో షార్క్ అటాక్స్ కూడా పెరుగుతాయి". ఈ రెండింటికి మధ్య మ్యాథ్స్ లో లింక్ (Correlation) ఉంటుంది, అలాగని "ఐస్ క్రీమ్స్ తింటే షార్క్స్ వస్తాయి" అనుకోకూడదు! మ్యాథ్స్ తో పాటు బిజినెస్ లాజిక్ (ఎండ కాబట్టి రెండూ జరుగుతాయి) కూడా వాడాలి.'
    },
    tryIt: {
      desc: 'ప్రాజెక్ట్ 2 లో రాసిన లాజిక్ తో, 1800 sqft, 3 beds, 4 ఏళ్ళ వయసున్న ఇంటి ప్రైస్ ఎంతో క్యాలిక్యులేట్ చేయండి.',
      code: `model = HousePredictor()
val = model.predict(sqft=1800, beds=3, age=4)
print(f"1800 sqft, 3BHK ఇంటి ప్రైస్: ₹{val:,.2f} లక్షలు")`
    },
    faqs: [
      {
        q: 'AI, Machine Learning, Deep Learning డిఫరెన్స్ ఏంటి?',
        a: 'AI అంటే మనిషిలా ఆలోచించే ఏదైనా (కార్స్, గేమ్స్). అందులో మ్యాథ్స్ వాడి నేర్చుకునేది ML. అందులో మన బ్రెయిన్ లోని న్యూరాన్స్ (Neural Networks) లాగా ఆలోచిస్తూ చాట్-జిపిటి లా పనిచేసేది DL (Deep Learning).'
      },
      {
        q: 'Overfitting vs Underfitting అంటే ఏంటి?',
        a: 'Overfitting అంటే పుస్తకంలోవి బట్టీ పట్టి ఫుల్ మార్క్స్ తెచ్చుకోవడం (బయటి క్వశ్చన్స్ రావు). Underfitting అంటే కనీసం ఆ పుస్తకం కూడా సరిగ్గా చదవకపోవడం.'
      }
    ]
  }
];
