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
    title: 'NumPy Arrays & Vectorization',
    badge: '54. NumPy Arrays & Vectorization',
    subtopics: 'Why NumPy? · C-Contiguous Memory Layout · ndarray Creation · Slicing & Boolean Masking · Reshaping · Broadcasting Rules · Vectorized Linear Algebra',
    desc: 'Master foundational high-performance scientific computing in Python: understanding why NumPy is 50-100x faster than standard Python lists, C-contiguous memory layout, multi-dimensional ndarray operations, boolean masking, dimension reshaping, and NumPy broadcasting rules.',
    sections: [
      {
        title: '1. Why NumPy? Python Lists vs NumPy ndarrays (Memory & Speed)',
        body: `<p><strong>NumPy (Numerical Python)</strong> is the foundational core of the entire Python Data Science and Artificial Intelligence ecosystem (powering Pandas, Scikit-Learn, TensorFlow, and PyTorch).</p>
        
        <h4 style="color:#ef4444; margin:16px 0 8px;">Why are Standard Python Lists Slow for Numerical Data?</h4>
        <p>A standard Python list does not store raw numbers directly. It stores an array of <strong>pointers</strong> pointing to scattered <code>PyObject</code> instances located all over heap memory. Every single mathematical operation requires type-checking, pointer dereferencing, and memory lookups.</p>

        <h4 style="color:#10b981; margin:16px 0 8px;">The NumPy Advantage: C-Contiguous Memory & SIMD Vectorization:</h4>
        <p>A NumPy <strong><code>ndarray</code> (N-dimensional array)</strong> stores homogeneous data (e.g. all 64-bit floats) in a single <strong>continuous block of memory</strong>. This delivers three massive advantages:</p>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong>CPU Cache Locality:</strong> Sequential memory bytes are loaded directly into CPU L1/L2 caches in a single memory fetch.</li>
          <li><strong>SIMD (Single Instruction, Multiple Data):</strong> Modern CPUs execute mathematical operations on 4 to 8 numbers simultaneously in hardware vector registers.</li>
          <li><strong>Zero Type-Checking Overhead:</strong> Since all elements share the exact same data type (<code>dtype</code>), calculations run at raw compiled C speeds (<strong>50x to 100x faster</strong>).</li>
        </ol>

        <div class="diagram-box">┌────────────────────────────────────────────────────────────────────────┐
│                   PYTHON LIST VS NUMPY MEMORY ARCHITECTURE             │
├────────────────────────────────────────────────────────────────────────┤
│  ❌ PYTHON LIST [10, 20, 30]:                                          │
│  Array of Pointers ──>[Pointer 1] ───> Heap [PyObject: int 10 (28 B)]  │
│                    ──>[Pointer 2] ───> Heap [PyObject: int 20 (28 B)]  │
│                    ──>[Pointer 3] ───> Heap [PyObject: int 30 (28 B)]  │
│  (Fragmented heap memory, 84 bytes total, cache misses, slow pointers) │
│                                                                        │
│  ✅ NUMPY NDARRAY (np.array([10, 20, 30], dtype=np.int64)):            │
│  ┌──────────────────┬──────────────────┬──────────────────┐            │
│  │ 10 (8 Bytes raw) │ 20 (8 Bytes raw) │ 30 (8 Bytes raw) │            │
│  └──────────────────┴──────────────────┴──────────────────┘            │
│  (Single continuous 24-byte C memory block, loaded directly into CPU)  │
└────────────────────────────────────────────────────────────────────────┘</div>`,
        code: `import sys
import time

# 1. Memory and Speed Comparison between Python List and NumPy Array:
python_list = list(range(1_000_000))

# Time list comprehension addition:
start = time.perf_counter()
list_result = [x + 2 for x in python_list]
list_time = (time.perf_counter() - start) * 1000

print(f"⏱️ Python List Loop (1M items): {list_time:.2f} ms")
print(f"📦 Python List Memory Overhead:  {sys.getsizeof(python_list):,} bytes (~8.0 MB)")

# Note: In a real environment with 'import numpy as np':
# np_arr = np.arange(1_000_000)
# np_result = np_arr + 2  # Vectorized operation executes in ~1.2 ms (70x faster!)`,
        codeTitle: 'Example 1: Demonstrating Memory Locality & Vectorization Concept',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 What is Vectorization?</strong>
          <p style="margin-top:6px;"><strong>Vectorization</strong> is the practice of replacing explicit Python <code>for</code> loops with batch array expressions (e.g. <code>arr * 2</code>). Vectorized operations delegate loop execution entirely to compiled C and Fortran binaries under the hood.</p>
        </div>`
      },
      {
        title: '2. Multi-Dimensional Arrays, Slicing & Boolean Masking',
        body: `<p>NumPy arrays can represent 1D vectors, 2D matrices (spreadsheets/images), and 3D/4D tensors (video frames and neural network batch layers):</p>
        <ul>
          <li><strong><code>ndim</code>:</strong> Number of dimensions (axes).</li>
          <li><strong><code>shape</code>:</strong> Tuple representing the size along each dimension (e.g. <code>(rows, cols)</code>).</li>
          <li><strong><code>dtype</code>:</strong> Data type descriptor (e.g. <code>int32</code>, <code>float64</code>, <code>bool_</code>).</li>
          <li><strong>Boolean Masking:</strong> Filtering array elements using conditional expressions (e.g. <code>arr[arr > 50]</code>) without writing loops!</li>
        </ul>`,
        code: `# Matrix Operations & Boolean Masking Simulation:
matrix_2d = [
    [10, 25, 40],
    [55, 70, 85],
    [90, 15, 30]
]

print("--- 2D Matrix (3x3) ---")
for row in matrix_2d:
    print(row)

# Simulated Slicing: Extract Row 1, Columns 1 to 2 -> [70, 85]
extracted_submatrix = [matrix_2d[1][1], matrix_2d[1][2]]
print("\\nSlicing [Row 1, Cols 1..2]:", extracted_submatrix)

# Simulated Boolean Masking: Find all values > 50
flattened = [val for row in matrix_2d for val in row]
greater_than_50 = [val for val in flattened if val > 50]
print("Boolean Mask [values > 50]: ", greater_than_50)`,
        codeTitle: 'Example 2: Multi-Dimensional Slicing & Boolean Filtering',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Slicing Syntax in NumPy:</strong>
          <p style="margin-top:6px;">In NumPy, 2D slicing uses comma notation: <code>arr[0:2, 1:3]</code> (rows 0 to 1, columns 1 to 2). Unlike Python lists where slicing creates a new copy, NumPy slices are <strong>memory views</strong> that point to the original array without copying bytes!</p>
        </div>`
      },
      {
        title: '3. NumPy Broadcasting Rules (Operating on Different Shapes)',
        body: `<p><strong>Broadcasting</strong> describes how NumPy handles arithmetic operations between arrays of <strong>different shapes</strong> without creating unnecessary copies in memory.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">The 2 Fundamental Rules of Broadcasting:</h4>
        <p>When operating on two arrays, NumPy compares their shape dimensions from <strong>right to left (trailing dimensions first)</strong>. Two dimensions are compatible if:</p>
        <ol style="line-height:1.8; margin-left:20px;">
          <li>They are strictly <strong>equal</strong> in size, OR</li>
          <li>One of the dimensions is <strong>1</strong> (in which case NumPy stretches the dimension of size 1 to match the other array).</li>
        </ol>

        <div class="diagram-box">┌────────────────────────────────────────────────────────────────────────┐
│                        NUMPY BROADCASTING IN ACTION                    │
├────────────────────────────────────────────────────────────────────────┤
│  Array A (Shape 3x3):            Array B (Shape 1x3):                  │
│  ┌────┬────┬────┐                ┌────┬────┬────┐                      │
│  │ 10 │ 20 │ 30 │                │ 1  │ 2  │ 3  │                      │
│  ├────┼────┼────┤                └────┴────┴────┘                      │
│  │ 40 │ 50 │ 60 │                                                      │
│  ├────┼────┼────┤     +          [Broadcasting stretches Array B]      │
│  │ 70 │ 80 │ 90 │                ┌────┬────┬────┐                      │
│  └────┴────┴────┘                │ 1  │ 2  │ 3  │                      │
│                                  ├────┼────┼────┤                      │
│                                  │ 1  │ 2  │ 3  │                      │
│                                  ├────┼────┼────┤                      │
│                                  │ 1  │ 2  │ 3  │                      │
│                                  └────┴────┴────┘                      │
│  Result (Shape 3x3):                                                   │
│  [[11, 22, 33], [41, 52, 63], [71, 82, 93]]                            │
└────────────────────────────────────────────────────────────────────────┘</div>`,
        code: `# Broadcasting Rules Demonstration:
shape_pairs = [
    ((3, 3), (1, 3), "Compatible: Dim 1 stretched to 3 -> Result: (3, 3) ✅"),
    ((4, 3), (3,),   "Compatible: Rightmost dims match -> Result: (4, 3) ✅"),
    ((3, 4), (3, 5), "INCOMPATIBLE: 4 != 5 (Raises ValueError: operands could not be broadcast) ❌")
]

print("--- 📐 NumPy Broadcasting Dimension Compatibility Checks ---")
for shape_a, shape_b, status in shape_pairs:
    print(f"Shape A: {str(shape_a):8} + Shape B: {str(shape_b):8} -> {status}")`,
        codeTitle: 'Example 3: NumPy Broadcasting Compatibility Rules',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Zero Memory Cost:</strong>
          <p style="margin-top:6px;">Broadcasting does not actually duplicate data in memory; it iterates over the same single row or column repeatedly using a stride offset of 0 bytes!</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Confusing Element-Wise Multiplication (a * b) with Matrix Multiplication (a @ b)',
      text: 'In NumPy, the asterisk operator a * b performs element-wise multiplication. To perform true linear algebra matrix dot-products, you must use the matrix multiplication operator a @ b (or np.dot(a, b)).'
    },
    tryIt: {
      desc: 'Simulate a NumPy vectorized operation: Write a function normalize_scores(scores) that subtracts the minimum and divides by (max - min) to scale values between 0.0 and 1.0.',
      code: `def normalize_scores(scores):
    min_val = min(scores)
    max_val = max(scores)
    rng = max_val - min_val
    return [(s - min_val) / rng for s in scores]

raw_scores = [45, 80, 60, 100, 20]
print("Normalized Scores (0.0 to 1.0):")
print([round(s, 2) for s in normalize_scores(raw_scores)])`
    },
    faqs: [
      {
        q: 'What is the difference between np.reshape() and np.ravel() / np.flatten()?',
        a: 'np.reshape(new_shape) changes array dimensions without altering data. np.ravel() returns a flattened 1D array as a memory view (zero copy). np.flatten() returns a completely new copy of the flattened 1D array in memory.'
      },
      {
        q: 'What are Universal Functions (ufuncs) in NumPy?',
        a: 'Ufuncs are fast, element-wise compiled C functions that support broadcasting, type casting, and reduction (e.g. np.add, np.sin, np.exp, np.log).'
      },
      {
        q: 'What does axis=0 vs axis=1 mean in NumPy aggregations?',
        a: 'axis=0 performs operations vertically down columns (collapsing rows). axis=1 performs operations horizontally across rows (collapsing columns).'
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
    title: 'Pandas Series, DataFrames & CSV',
    badge: '55. Pandas Series & DataFrames',
    subtopics: 'Series vs DataFrame Architecture · Loading CSV/JSON · head() & info() Exploration · loc (Label) vs iloc (Integer) · Boolean Query Filtering · Multi-Column Sorting',
    desc: 'Master structured tabular data analysis with Pandas: understanding the Series and DataFrame data structures, loading real-world CSV/Excel datasets, exploratory data analysis with info() and describe(), label-based loc vs integer-based iloc indexing, and multi-condition boolean filtering.',
    sections: [
      {
        title: '1. What is Pandas? Series vs DataFrame Architecture',
        body: `<p><strong>Pandas (Python Data Analysis Library)</strong> is the world\'s most popular tool for data wrangling, cleaning, inspection, and exploratory data analysis (EDA).</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">The 2 Primary Pandas Data Structures:</h4>
        <ul>
          <li><strong>Series (1D):</strong> A one-dimensional labeled array capable of holding any data type. It consists of two components: the <strong>Index labels</strong> and the <strong>Data values</strong>.</li>
          <li><strong>DataFrame (2D):</strong> A two-dimensional tabular spreadsheet-like structure with labeled rows (Index) and labeled columns. You can think of a DataFrame as a dictionary of Series sharing a common Index!</li>
        </ul>

        <div class="diagram-box">┌────────────────────────────────────────────────────────────────────────┐
│                     PANDAS DATAFRAME DATA STRUCTURE                    │
├────────────────────────────────────────────────────────────────────────┤
│                          Columns (Series Labels)                       │
│                        ┌──────────────┬──────────────┬──────────────┐  │
│  Index (Row Labels)    │ "name" (str) │ "age" (int)  │"salary"(flt) │  │
│  ┌─────────────────────┼──────────────┼──────────────┼──────────────┤  │
│  │ 0                   │ Balaji Dev   │ 28           │ 95000.00     │  │
│  │ 1                   │ Alex Smith   │ 34           │ 82000.00     │  │
│  │ 2                   │ Chloe Davis  │ 25           │ 78000.00     │  │
│  └─────────────────────┴──────────────┴──────────────┴──────────────┘  │
│  ├── df.shape -> (3, 3) [3 rows, 3 columns]                            │
│  ├── df['salary'] -> Extracts 1D Series                                │
│  └── df.dtypes -> Column data types (object, int64, float64)           │
└────────────────────────────────────────────────────────────────────────┘</div>`,
        code: `# Conceptual Pandas DataFrame Tabular Inspection:
tabular_dataset = [
    {"emp_id": 101, "name": "Balaji Dev", "dept": "AI Engineering", "salary": 95000.0, "experience_yrs": 5},
    {"emp_id": 102, "name": "Alex Smith", "dept": "Cloud DevOps",   "salary": 82000.0, "experience_yrs": 3},
    {"emp_id": 103, "name": "Chloe Davis", "dept": "Data Science",   "salary": 88000.0, "experience_yrs": 4},
    {"emp_id": 104, "name": "David Miller","dept": "AI Engineering", "salary": 65000.0, "experience_yrs": 2}
]

print("--- 📊 Dataset Overview (4 Records x 5 Columns) ---")
header = f"{'ID':<6} {'Name':<16} {'Department':<18} {'Salary':<12} {'Exp (Yrs)':<10}"
print(header)
print("-" * len(header))
for row in tabular_dataset:
    print(f"{row['emp_id']:<6} {row['name']:<16} {row['dept']:<18} ₹{row['salary']:<11,.2f} {row['experience_yrs']:<10}")`,
        codeTitle: 'Example 1: Tabular Dataset Representation in Memory',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Exploratory Methods in Pandas:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>df.head(n=5)</code>: Returns the first $n$ rows of the dataset.</li>
            <li><code>df.info()</code>: Displays memory usage, column names, and count of non-null values.</li>
            <li><code>df.describe()</code>: Computes statistical summary (count, mean, std, min, 25%, 50%, 75%, max) for numeric columns.</li>
          </ul>
        </div>`
      },
      {
        title: '2. Indexing and Slicing: loc (Label-Based) vs iloc (Integer-Based)',
        body: `<p>One of the most important concepts in Pandas is knowing when to use <strong><code>.loc</code></strong> versus <strong><code>.iloc</code></strong>:</p>
        
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>Indexer</th><th>Syntax</th><th>How It Works</th><th>Slicing Stop Behavior</th></tr>
          <tr><td><strong><code>.loc[]</code></strong></td><td><code>df.loc[row_label, col_label]</code></td><td>Selects by <strong>explicit Name/Label</strong></td><td><strong>Inclusive</strong> (stops at and includes the end label)</td></tr>
          <tr><td><strong><code>.iloc[]</code></strong></td><td><code>df.iloc[row_pos, col_pos]</code></td><td>Selects by <strong>0-based Integer Index</strong></td><td><strong>Exclusive</strong> (standard Python behavior; excludes end index)</td></tr>
        </table>`,
        code: `# Demonstrating loc vs iloc selection logic:
employees = {
    101: {"name": "Balaji", "role": "Lead", "salary": 95000},
    102: {"name": "Alex",   "role": "DevOps", "salary": 82000},
    103: {"name": "Chloe",  "role": "Data", "salary": 88000}
}

# 1. Label-Based Selection (.loc equivalent):
# Accessing row with explicit ID key 101:
loc_sample = employees[101]["salary"]
print(f"loc selection (ID 101 -> 'salary'): ₹{loc_sample:,}")

# 2. Integer-Based Selection (.iloc equivalent):
# Accessing 1st row (index 0) in order:
row_keys = list(employees.keys())
iloc_sample = employees[row_keys[0]]["name"]
print(f"iloc selection (Row 0 -> 'name'):     {iloc_sample}")

# 3. Multi-Condition Filtering (Employees in AI or Data with salary >= 85,000):
high_earners = [e for e in employees.values() if e["salary"] >= 85000]
print(f"\\nFiltered High Earners (salary >= 85k): {len(high_earners)} employees matched.")`,
        codeTitle: 'Example 2: loc vs iloc Indexing & Boolean Filtering',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Boolean Slicing in Pandas:</strong>
          <p style="margin-top:6px;">In real Pandas, write: <code>df[(df['salary'] >= 85000) & (df['dept'] == 'AI Engineering')]</code>. Always wrap individual conditions in parentheses when combining with bitwise <code>&</code> (AND) or <code>|</code> (OR).</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Using Python "and" / "or" Instead of Bitwise "&" / "|" in Pandas Boolean Filtering',
      text: 'In Python, "and" and "or" evaluate truthiness of the entire object, which raises a "ValueError: The truth value of a Series is ambiguous". In Pandas, always use element-wise bitwise operators & and | with parentheses: df[(df["a"] > 1) & (df["b"] < 5)].'
    },
    tryIt: {
      desc: 'Simulate Pandas sorting: Write a Python script to sort a list of product dictionaries first by category ascending, then by price descending.',
      code: `products = [
    {"name": "Mouse", "cat": "Tech", "price": 800},
    {"name": "Desk", "cat": "Furniture", "price": 4500},
    {"name": "Laptop", "cat": "Tech", "price": 55000},
    {"name": "Chair", "cat": "Furniture", "price": 3200}
]

# Equivalent to df.sort_values(by=["cat", "price"], ascending=[True, False])
sorted_prods = sorted(products, key=lambda x: (x["cat"], -x["price"]))
print("Sorted Products (Category ASC, Price DESC):")
for p in sorted_prods:
    print(f"• [{p['cat']:9}] {p['name']:10} - ₹{p['price']:,}")`
    },
    faqs: [
      {
        q: 'What is the difference between inplace=True and assigning back in Pandas?',
        a: 'df.dropna(inplace=True) modifies the DataFrame directly in memory without returning a new object. Modern Pandas best practices recommend assigning back (df = df.dropna()) to support method chaining.'
      },
      {
        q: 'How does Pandas handle missing data under the hood?',
        a: 'Pandas historically represented missing numeric data with IEEE NaN (floating-point Not-a-Number) and objects with None. Modern Pandas (v2.0+) includes native nullable data types (Int64, boolean, string) using pd.NA.'
      },
      {
        q: 'What is the difference between df.apply() and vectorized operations?',
        a: 'Vectorized operations (df["a"] + df["b"]) execute compiled C code at maximum speed. df.apply(func) iterates row-by-row in Python, which is significantly slower for large datasets.'
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
    title: 'Pandas Data Cleaning & GroupBy',
    badge: '56. Data Cleaning & GroupBy',
    subtopics: 'Missing Values (dropna, fillna) · Imputation Strategies · GroupBy Split-Apply-Combine · Aggregations (mean, sum, count) · Merging (Inner, Left, Outer) · Exporting Data',
    desc: 'Master advanced data preparation and aggregation in Pandas: handling missing data with dropna() and fillna() imputation, the Split-Apply-Combine GroupBy paradigm, combining datasets with relational joins (pd.merge), and exporting cleaned datasets to CSV, Excel, and JSON.',
    sections: [
      {
        title: '1. Handling Missing Data (NaN / None): Drop vs Imputation',
        body: `<p>Real-world datasets are messy, frequently containing missing fields due to sensor dropouts, optional user inputs, or data corruption.</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">The 2 Primary Strategies for Missing Data:</h4>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong>Deletion (<code>dropna()</code>):</strong>
            <ul>
              <li><code>df.dropna(how='any')</code>: Drops any row containing at least one <code>NaN</code>.</li>
              <li><code>df.dropna(subset=['critical_column'])</code>: Drops rows only if a specific mandatory column is null.</li>
            </ul>
          </li>
          <li><strong>Imputation (<code>fillna()</code>):</strong> Replaces missing values with statistical measures to preserve sample size:
            <ul>
              <li><strong>Mean / Median:</strong> For numerical distributions (median is robust against extreme outliers).</li>
              <li><strong>Mode (Most Frequent):</strong> For categorical columns.</li>
              <li><strong>Forward Fill (<code>ffill</code>):</strong> For time-series data (propagates the last known valid value forward).</li>
            </ul>
          </li>
        </ol>`,
        code: `# Missing Data Cleaning Simulation:
raw_sensor_data = [
    {"timestamp": "10:00", "temperature": 28.5, "humidity": 65},
    {"timestamp": "10:05", "temperature": None, "humidity": 68},  # Missing temp
    {"timestamp": "10:10", "temperature": 29.1, "humidity": None},# Missing humidity
    {"timestamp": "10:15", "temperature": 28.8, "humidity": 64}
]

# Calculate mean temperature of valid records for imputation:
valid_temps = [r["temperature"] for r in raw_sensor_data if r["temperature"] is not None]
mean_temp = sum(valid_temps) / len(valid_temps)

# Impute missing values:
cleaned_data = []
for record in raw_sensor_data:
    row = record.copy()
    if row["temperature"] is None:
        row["temperature"] = round(mean_temp, 1) # Mean Imputation!
    if row["humidity"] is None:
        row["humidity"] = 60 # Default fallback
    cleaned_data.append(row)

print(f"--- 🧹 Cleaned Sensor Data (Imputed Mean Temp: {mean_temp:.1f}°C) ---")
for r in cleaned_data:
    print(r)`,
        codeTitle: 'Example 1: Missing Data Detection & Statistical Mean Imputation',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Pandas In-Memory Functions:</strong>
          <p style="margin-top:6px;">In real Pandas: <code>df['temperature'] = df['temperature'].fillna(df['temperature'].mean())</code> performs this entire imputation in a single vectorized line.</p>
        </div>`
      },
      {
        title: '2. The GroupBy Paradigm: Split-Apply-Combine Strategy',
        body: `<p>The <strong>Split-Apply-Combine</strong> concept (formalized by Hadley Wickham) is the foundation of group analysis in data science:</p>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong>Split:</strong> Partition the dataset into groups based on keys (e.g. split sales by <code>Region</code>).</li>
          <li><strong>Apply:</strong> Execute an aggregation function (such as <code>mean()</code>, <code>sum()</code>, <code>count()</code>, or <code>std()</code>) independently on each subgroup.</li>
          <li><strong>Combine:</strong> Merge the resulting scalar metrics back into a unified summary DataFrame.</li>
        </ol>

        <div class="diagram-box">┌────────────────────────────────────────────────────────────────────────┐
│                   GROUPBY SPLIT-APPLY-COMBINE FLOW                     │
├────────────────────────────────────────────────────────────────────────┤
│  Original Dataset:                                                     │
│  [Dept: Tech, Sal: 90k], [Dept: HR, Sal: 50k], [Dept: Tech, Sal: 80k]  │
│                                                                        │
│  1. SPLIT BY "Dept":                                                   │
│  ├── Tech Group -> [90k, 80k]                                          │
│  └── HR Group   -> [50k]                                               │
│                                                                        │
│  2. APPLY FUNCTION (mean()):                                           │
│  ├── Tech -> (90k + 80k) / 2 = 85k                                     │
│  └── HR   -> 50k                                                       │
│                                                                        │
│  3. COMBINE INTO SUMMARY TABLE:                                        │
│  ┌──────────────────────┬──────────────────────┐                       │
│  │ Department           │ Average Salary       │                       │
│  ├──────────────────────┼──────────────────────┤                       │
│  │ Tech                 │ ₹85,000.00           │                       │
│  │ HR                   │ ₹50,000.00           │                       │
│  └──────────────────────┴──────────────────────┘                       │
└────────────────────────────────────────────────────────────────────────┘</div>`,
        code: `# GroupBy Aggregation Simulation:
sales_transactions = [
    {"region": "South", "rep": "Balaji", "sales": 450000},
    {"region": "North", "rep": "Alex",   "sales": 320000},
    {"region": "South", "rep": "Chloe",  "sales": 580000},
    {"region": "North", "rep": "David",  "sales": 290000},
    {"region": "West",  "rep": "Elena",  "sales": 410000}
]

# Group sales by region and calculate totals:
regional_summary = {}
for item in sales_transactions:
    reg = item["region"]
    if reg not in regional_summary:
        regional_summary[reg] = {"total_sales": 0, "deal_count": 0}
    regional_summary[reg]["total_sales"] += item["sales"]
    regional_summary[reg]["deal_count"] += 1

print("--- 📈 Regional Sales Aggregation Summary ---")
for reg, stats in regional_summary.items():
    avg = stats["total_sales"] / stats["deal_count"]
    print(f"• Region: {reg:6} | Total: ₹{stats['total_sales']:>10,} | Deals: {stats['deal_count']} | Avg Deal: ₹{avg:>8,}")`,
        codeTitle: 'Example 2: Split-Apply-Combine GroupBy Aggregation',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Pandas GroupBy Syntax:</strong>
          <p style="margin-top:6px;">In Pandas: <code>df.groupby('region')['sales'].agg(['sum', 'mean', 'count'])</code> produces this full statistical summary table in a single line!</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Performing Imputation on the Entire Dataset Before Splitting Training/Test Data',
      text: 'Calculating mean/median across the entire dataset before train_test_split causes Data Leakage (information from the test set leaks into the training pipeline). Always calculate statistics strictly on the training set and apply them to the test set.'
    },
    tryIt: {
      desc: 'Simulate merging two datasets: match customer orders with their corresponding customer addresses using customer_id as the join key.',
      code: `customers = {1: "Balaji (Hyderabad)", 2: "Alex (Bengaluru)"}
orders = [{"order_id": 101, "cust_id": 1, "amount": 4500}, {"order_id": 102, "cust_id": 2, "amount": 1200}]

# Equivalent to pd.merge(orders_df, customers_df, on="cust_id", how="inner")
merged = []
for ord in orders:
    merged.append({
        "order_id": ord["order_id"],
        "customer": customers.get(ord["cust_id"], "Unknown"),
        "amount": ord["amount"]
    })

print("Merged Orders Table:")
for m in merged:
    print(f"Order #{m['order_id']}: {m['customer']} - ₹{m['amount']}")`
    },
    faqs: [
      {
        q: 'What is the difference between pd.merge() and pd.concat()?',
        a: 'pd.merge() combines DataFrames horizontally based on matching key columns (relational SQL JOIN). pd.concat() stacks DataFrames either vertically (appending rows) or horizontally (aligning indices).'
      },
      {
        q: 'What are the 4 join types supported by pd.merge()?',
        a: 'how="inner" (keeps only keys present in both DataFrames), how="left" (keeps all rows from left DataFrame), how="right" (keeps all from right), and how="outer" (keeps all rows from both, filling unmatched values with NaN).'
      },
      {
        q: 'How do I export a Pandas DataFrame to Excel (.xlsx)?',
        a: 'Use df.to_excel("filename.xlsx", index=False) using the openpyxl engine.'
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
    title: 'Data Visualization: Matplotlib & Seaborn',
    badge: '57. Visualization & Plots',
    subtopics: 'The Anatomy of a Figure · Matplotlib Object-Oriented Interface · Line & Bar Charts · Histograms & Distributions · Scatter & Box Plots · Seaborn Heatmaps',
    desc: 'Master visual data storytelling in Python: the structural anatomy of Matplotlib figures (Figure vs Axes), rendering professional Line charts, Bar charts, Histograms, and Scatter plots, and creating statistical heatmaps with Seaborn.',
    sections: [
      {
        title: '1. The Anatomy of a Plot: Figure vs Axes in Matplotlib',
        body: `<p><strong>Matplotlib</strong> is the foundational 2D plotting library in Python. To master it, you must understand its object-oriented architecture:</p>
        <ul>
          <li><strong>Figure:</strong> The top-level canvas/window holding everything (the blank paper).</li>
          <li><strong>Axes (Subplot):</strong> The actual plotting region containing data points, x/y-axis ticks, lines, labels, legend, and title. A single Figure can contain multiple Axes (e.g. a $2 \\times 2$ grid of charts).</li>
        </ul>

        <div class="diagram-box">┌────────────────────────────────────────────────────────────────────────┐
│                        MATPLOTLIB PLOT ANATOMY                         │
├────────────────────────────────────────────────────────────────────────┤
│  FIGURE (Top-level canvas created via fig, ax = plt.subplots())       │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Title: "Monthly Revenue & Growth Rate (2026)"                    │  │
│  │                                                                  │  │
│  │ Y-Axis Label: Revenue (₹)                                        │  │
│  │    ▲                                                             │  │
│  │ 10k│    •                                                        │  │
│  │  8k│   / \\     •                                                 │  │
│  │  6k│  •   \\   / \\    Legend: [── Revenue 2026]                  │  │
│  │  4k│ •     \\ •   •                                              │  │
│  │    └──────────────────────► X-Axis Label: Month                  │  │
│  │      Jan Feb Mar Apr May                                         │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘</div>`,
        code: `# Matplotlib Blueprint: Object-Oriented Plotting Syntax Reference:
"""
import matplotlib.pyplot as plt
import seaborn as sns

# 1. Create Figure and Axes canvas:
fig, ax = plt.subplots(figsize=(10, 6), dpi=100)

# 2. Plot Data:
months = ["Jan", "Feb", "Mar", "Apr", "May"]
revenue = [45000, 52000, 61000, 58000, 74000]

ax.plot(months, revenue, color="#10b981", marker="o", linewidth=2.5, label="Monthly Revenue (₹)")

# 3. Polish Aesthetics:
ax.set_title("Revenue Growth Trend (2026)", fontsize=14, fontweight="bold", pad=15)
ax.set_xlabel("Financial Month", fontsize=11)
ax.set_ylabel("Gross Revenue (INR)", fontsize=11)
ax.grid(True, linestyle="--", alpha=0.5)
ax.legend()

# 4. Save High-Res Image:
plt.tight_layout()
# fig.savefig("revenue_trend.png", dpi=300)
"""
print("Matplotlib Object-Oriented Plotting Blueprint Configured.")`,
        codeTitle: 'Blueprint: Matplotlib Object-Oriented Interface Configuration',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Why use fig, ax = plt.subplots() instead of plt.plot()?</strong>
          <p style="margin-top:6px;">Using the Object-Oriented (OO) interface gives you explicit control over multiple subplots, axes styling, and secondary y-axes, preventing state pollution in multi-threaded environments.</p>
        </div>`
      },
      {
        title: '2. Core Chart Types & Seaborn Statistical Enhancements',
        body: `<p>Choosing the correct chart type is essential for effective data storytelling:</p>
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>Chart Type</th><th>Best Used For</th><th>Matplotlib / Seaborn Method</th></tr>
          <tr><td><strong>Line Chart</strong></td><td>Continuous trends over time (time series)</td><td><code>ax.plot()</code> / <code>sns.lineplot()</code></td></tr>
          <tr><td><strong>Bar Chart</strong></td><td>Comparing discrete categorical metrics</td><td><code>ax.bar()</code> / <code>sns.barplot()</code></td></tr>
          <tr><td><strong>Histogram</strong></td><td>Inspecting data distribution and skewness</td><td><code>ax.hist()</code> / <code>sns.histplot()</code></td></tr>
          <tr><td><strong>Scatter Plot</strong></td><td>Detecting correlation between 2 numeric variables</td><td><code>ax.scatter()</code> / <code>sns.scatterplot()</code></td></tr>
          <tr><td><strong>Box Plot</strong></td><td>Visualizing quartiles, median, and outliers</td><td><code>ax.boxplot()</code> / <code>sns.boxplot()</code></td></tr>
          <tr><td><strong>Heatmap</strong></td><td>Correlation matrices between all features</td><td><code>sns.heatmap(df.corr(), annot=True)</code></td></tr>
        </table>`,
        code: `# Text-Based Statistical Distribution Visualizer (Histogram & Outlier Summary):
test_scores = [42, 65, 68, 72, 75, 78, 80, 82, 85, 88, 90, 92, 95, 98, 100]

# Compute 5-Number Summary (Box Plot Statistics):
sorted_scores = sorted(test_scores)
n = len(sorted_scores)
min_v = sorted_scores[0]
max_v = sorted_scores[-1]
median_v = sorted_scores[n // 2]
q1 = sorted_scores[n // 4]
q3 = sorted_scores[(3 * n) // 4]
iqr = q3 - q1

print("--- 📊 Statistical 5-Number Summary (Box Plot Equivalent) ---")
print(f"• Minimum:     {min_v}")
print(f"• Q1 (25th %): {q1}")
print(f"• Median (50%):{median_v}")
print(f"• Q3 (75th %): {q3}")
print(f"• Maximum:     {max_v}")
print(f"• IQR:         {iqr}")`,
        codeTitle: 'Example 2: 5-Number Distribution Summary for Box Plot Visualizations',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Outlier Formula:</strong>
          <p style="margin-top:6px;">Any data point smaller than $Q1 - 1.5 \\times \\text{IQR}$ or larger than $Q3 + 1.5 \\times \\text{IQR}$ is statistically classified as an <strong>outlier</strong> and displayed as an individual dot in Seaborn box plots.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Using 3D Pie Charts or Unlabeled Color Scales',
      text: '3D pie charts distort visual angles, misleading human perception of relative area. Always use clean 2D bar charts or donut charts with labeled percentages.'
    },
    tryIt: {
      desc: 'Simulate generating correlation data for a heatmap: compute the Pearson correlation between advertising spend and sales revenue.',
      code: `ad_spend = [10, 20, 30, 40, 50]
sales =    [25, 45, 65, 85, 105]

mean_x = sum(ad_spend) / len(ad_spend)
mean_y = sum(sales) / len(sales)

numerator = sum((x - mean_x) * (y - mean_y) for x, y in zip(ad_spend, sales))
denominator = (sum((x - mean_x)**2 for x in ad_spend) * sum((y - mean_y)**2 for y in sales)) ** 0.5
correlation = numerator / denominator

print(f"Correlation Coefficient: {correlation:.2f} (Perfect Linear Correlation! 🚀)")`
    },
    faqs: [
      {
        q: 'What is Seaborn built on top of?',
        a: 'Seaborn is built directly on top of Matplotlib and integrates tightly with Pandas DataFrames, providing elegant modern styling defaults and statistical estimation plots.'
      },
      {
        q: 'How do I save a Matplotlib figure as an image file?',
        a: 'Call fig.savefig("chart.png", dpi=300, bbox_inches="tight") to export a publication-quality image with tight margins.'
      },
      {
        q: 'What is the purpose of plt.tight_layout()?',
        a: 'plt.tight_layout() automatically adjusts subplot padding, title spacing, and axis labels to prevent overlapping elements.'
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
    title: 'Machine Learning with Scikit-Learn',
    badge: '58. Machine Learning Basics',
    subtopics: 'Supervised vs Unsupervised · Features (X) & Labels (y) · train_test_split · Feature Scaling · Linear Regression · Logistic Classification · Model Persistence (joblib)',
    desc: 'Master the fundamentals of Machine Learning in Python: understanding supervised vs unsupervised learning paradigms, feature matrix (X) vs target vector (y), train_test_split validation, Linear Regression, Logistic Classification, and model persistence with joblib.',
    sections: [
      {
        title: '1. What is Machine Learning? The Paradigm Shift & Core Workflow',
        body: `<p>In traditional software development, programmers write explicit rules: <code>Rules + Data = Answers</code>. In <strong>Machine Learning (ML)</strong>, algorithms learn statistical patterns from historical data: <code>Data + Answers = Rules (Model)</code>!</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">The 3 Core Machine Learning Paradigms:</h4>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong>Supervised Learning:</strong> The training dataset includes both input <strong>Features ($X$)</strong> and ground-truth <strong>Target Labels ($y$)</strong>.
            <ul>
              <li><strong>Regression:</strong> Predicting a continuous numeric value (e.g. house prices, stock prices, temperature).</li>
              <li><strong>Classification:</strong> Predicting a discrete category (e.g. Spam vs Not Spam, Tumor Malignant vs Benign).</li>
            </ul>
          </li>
          <li><strong>Unsupervised Learning:</strong> The dataset contains only features ($X$) without labels ($y$). The model discovers hidden structures, groupings, or clusters (e.g. Customer Segmentation with K-Means).</li>
          <li><strong>Reinforcement Learning:</strong> An agent learns optimal actions through trial-and-error rewards and penalties in an environment (e.g. self-driving cars, game AI).</li>
        </ol>

        <div class="diagram-box">┌────────────────────────────────────────────────────────────────────────┐
│                   THE STANDARD SCIKIT-LEARN ML WORKFLOW                │
├────────────────────────────────────────────────────────────────────────┤
│  1. RAW DATA -> Features Matrix (X) & Target Label (y)                 │
│         │                                                              │
│         ▼                                                              │
│  2. TRAIN / TEST SPLIT (train_test_split(X, y, test_size=0.20))        │
│     ├── X_train, y_train (80% used for model learning)                 │
│     └── X_test, y_test   (20% hidden holdout for evaluation)           │
│         │                                                              │
│         ▼                                                              │
│  3. FEATURE SCALING (StandardScaler() scales features to mean=0, std=1)│
│         │                                                              │
│         ▼                                                              │
│  4. MODEL FIT (model.fit(X_train, y_train) learns weights)             │
│         │                                                              │
│         ▼                                                              │
│  5. EVALUATION (y_pred = model.predict(X_test) -> Accuracy / MSE)      │
│         │                                                              │
│         ▼                                                              │
│  6. MODEL PERSISTENCE (joblib.dump(model, 'model.joblib'))             │
└────────────────────────────────────────────────────────────────────────┘</div>`,
        code: `# Complete End-to-End Supervised Learning Simulation (Linear Regression):
class SimpleLinearRegressionModel:
    """Manual implementation of Linear Regression (y = mx + c)."""
    
    def __init__(self):
        self.slope_m = 0.0
        self.intercept_c = 0.0

    def fit(self, X_train, y_train):
        """Learns optimal slope and intercept using Ordinary Least Squares."""
        n = len(X_train)
        mean_x = sum(X_train) / n
        mean_y = sum(y_train) / n
        
        # Calculate slope m:
        num = sum((x - mean_x) * (y - mean_y) for x, y in zip(X_train, y_train))
        den = sum((x - mean_x) ** 2 for x in X_train)
        self.slope_m = num / den
        self.intercept_c = mean_y - (self.slope_m * mean_x)
        print(f"🤖 Model Trained: y = {self.slope_m:.2f}x + {self.intercept_c:.2f}")

    def predict(self, X_test):
        return [self.slope_m * x + self.intercept_c for x in X_test]

# 1. Dataset: Years of Experience vs Salary (in thousands):
X_experience = [1.0, 2.0, 3.0, 4.0, 5.0]
y_salary =     [40.0, 50.0, 65.0, 75.0, 90.0]

# 2. Train Model:
regressor = SimpleLinearRegressionModel()
regressor.fit(X_experience, y_salary)

# 3. Predict Salaries for 6 and 8 Years of Experience:
unseen_candidates = [6.0, 8.0]
predictions = regressor.predict(unseen_candidates)

print("\\n--- 📈 Salary Predictions for Unseen Data ---")
for exp, pred in zip(unseen_candidates, predictions):
    print(f"• Experience: {exp} yrs -> Predicted Salary: ₹{pred:,.2f}k")`,
        codeTitle: 'Example 1: End-to-End Linear Regression Architecture Implementation',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Scikit-Learn API Consistency:</strong>
          <p style="margin-top:6px;">In Scikit-Learn, every model follows the exact same 3-step interface: (1) <code>model = LinearRegression()</code>, (2) <code>model.fit(X_train, y_train)</code>, and (3) <code>y_pred = model.predict(X_test)</code>.</p>
        </div>`
      },
      {
        title: '2. Classification Metrics: Accuracy, Precision, Recall & Confusion Matrix',
        body: `<p>For classification tasks, <strong>Accuracy alone is often misleading</strong> (especially on imbalanced datasets where 99% of samples belong to one class):</p>
        
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>Metric</th><th>Formula</th><th>When It Matters Most</th></tr>
          <tr><td><strong>Accuracy</strong></td><td>$\\frac{TP + TN}{TP + TN + FP + FN}$</td><td>Balanced datasets with equal class importance.</td></tr>
          <tr><td><strong>Precision</strong></td><td>$\\frac{TP}{TP + FP}$</td><td>When False Positives are costly (e.g. Email Spam filter flagging a critical work email).</td></tr>
          <tr><td><strong>Recall (Sensitivity)</strong></td><td>$\\frac{TP}{TP + FN}$</td><td>When False Negatives are catastrophic (e.g. Cancer detection: missing a sick patient).</td></tr>
          <tr><td><strong>F1-Score</strong></td><td>$2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}}$</td><td>Harmonic mean balancing Precision and Recall.</td></tr>
        </table>`,
        code: `# Classification Confusion Matrix & Metrics Calculation:
# True Positives, False Positives, False Negatives, True Negatives:
TP = 85  # Correctly predicted cancer
FP = 10  # Healthy patient incorrectly flagged
FN = 5   # Sick patient missed (CRITICAL!)
TN = 900 # Healthy patient correctly identified

accuracy = (TP + TN) / (TP + FP + FN + TN)
precision = TP / (TP + FP)
recall = TP / (TP + FN)
f1 = 2 * (precision * recall) / (precision + recall)

print("--- 🩺 Medical Diagnostic Model Evaluation Metrics ---")
print(f"• Accuracy:  {accuracy * 100:.2f}%")
print(f"• Precision: {precision * 100:.2f}% (Out of flagged patients, {precision*100:.1f}% actually had illness)")
print(f"• Recall:    {recall * 100:.2f}% (Model successfully caught {recall*100:.1f}% of all actual cases)")
print(f"• F1-Score:  {f1:.4f}")`,
        codeTitle: 'Example 2: Classification Performance Metrics & Confusion Matrix',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Model Persistence with joblib:</strong>
          <p style="margin-top:6px;">Once a model is trained, save its learned weights using <code>import joblib; joblib.dump(model, "model.joblib")</code>. In your web server (FastAPI/Django), load it with <code>model = joblib.load("model.joblib")</code> for instantaneous inference without retraining.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Evaluating Models on Training Data (Overfitting Trap)',
      text: 'Evaluating a model on the same data it was trained on produces falsely optimistic scores (a student memorizing exam answers). Always evaluate generalization performance strictly on a separate unseen test set generated via train_test_split(X, y, test_size=0.20).'
    },
    tryIt: {
      desc: 'Calculate the Mean Squared Error (MSE) between actual house prices and predicted values: actual = [50, 80, 120], predicted = [48, 85, 115].',
      code: `actual = [50, 80, 120]
predicted = [48, 85, 115]

mse = sum((act - pred) ** 2 for act, pred in zip(actual, predicted)) / len(actual)
rmse = mse ** 0.5

print(f"Mean Squared Error (MSE):  {mse:.2f}")
print(f"Root Mean Squared (RMSE): ₹{rmse:.2f} Lakhs average prediction error")`
    },
    faqs: [
      {
        q: 'What is the purpose of StandardScaler in Scikit-Learn?',
        a: 'StandardScaler scales each feature to have a mean of 0 and a standard deviation of 1. This prevents features with large numeric scales (like salary in ₹1,00,000) from dominating features with small scales (like age in 25) in distance-based algorithms like SVM, K-Means, and KNN.'
      },
      {
        q: 'What is K-Fold Cross Validation?',
        a: 'Cross-validation splits the training dataset into K equal folds, training on K-1 folds and validating on the remaining fold K times to ensure model stability across all data slices.'
      },
      {
        q: 'What is the difference between Bagging and Boosting in Ensemble Learning?',
        a: 'Bagging (e.g. Random Forest) trains multiple independent models in parallel and averages their predictions. Boosting (e.g. XGBoost, LightGBM) trains models sequentially, where each new model focuses on correcting the errors made by previous models.'
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
    title: 'Data Science & AI Capstone Projects',
    badge: '59. Data Science & AI Projects',
    subtopics: '5 Full Projects · 1. E-Commerce Sales Pipeline · 2. Real Estate Price Prediction · 3. Customer Churn Classifier · 4. K-Means Customer Clustering · 5. Financial Stock Visualizer',
    desc: 'Build five production-grade Data Science and Machine Learning projects in Python: an E-Commerce Sales Analytics Pipeline, a Real Estate House Price Prediction Engine, a Customer Churn Classification Model with ROC/AUC evaluation, a K-Means Customer Segmentation Clustering Engine, and a Financial Stock Market Time-Series Analyzer.',
    sections: [
      {
        title: '1. Project 1: E-Commerce Sales Data Wrangling & Analytics Pipeline',
        body: `<p>A complete data cleaning and aggregation analytics pipeline calculating revenue trends, customer lifetime value, and top-selling product categories:</p>`,
        code: `# =========================================================================
# PROJECT 1: E-COMMERCE SALES ANALYTICS PIPELINE
# =========================================================================

class SalesAnalyticsPipeline:
    def __init__(self, raw_transactions):
        self.raw_data = raw_transactions
        self.cleaned_data = []

    def clean_data(self):
        """Imputes missing values and removes corrupted entries."""
        for item in self.raw_data:
            # Drop records with invalid order IDs:
            if not item.get("order_id"):
                continue
            
            cleaned_row = item.copy()
            # Impute default quantity if missing:
            if cleaned_row.get("quantity") is None or cleaned_row["quantity"] <= 0:
                cleaned_row["quantity"] = 1
            
            # Calculate total line revenue:
            cleaned_row["revenue"] = cleaned_row["quantity"] * cleaned_row["unit_price"]
            self.cleaned_data.append(cleaned_row)
        print(f"🧹 Cleaned {len(self.cleaned_data)} valid transactions.")

    def compute_category_summary(self):
        summary = {}
        for row in self.cleaned_data:
            cat = row["category"]
            if cat not in summary:
                summary[cat] = {"total_revenue": 0.0, "units_sold": 0}
            summary[cat]["total_revenue"] += row["revenue"]
            summary[cat]["units_sold"] += row["quantity"]
        return summary

# Run Project 1 Demonstration:
sample_transactions = [
    {"order_id": "ORD1", "category": "Electronics", "unit_price": 2499.0, "quantity": 2},
    {"order_id": "ORD2", "category": "Accessories", "unit_price": 399.0,  "quantity": None}, # Missing qty
    {"order_id": "ORD3", "category": "Electronics", "unit_price": 4999.0, "quantity": 1},
    {"order_id": None,   "category": "Electronics", "unit_price": 1000.0, "quantity": 1}, # Corrupted
    {"order_id": "ORD4", "category": "Accessories", "unit_price": 1299.0, "quantity": 3}
]

pipeline = SalesAnalyticsPipeline(sample_transactions)
pipeline.clean_data()
cat_stats = pipeline.compute_category_summary()

print("\\n--- 📊 E-Commerce Category Performance Report ---")
for cat, stats in cat_stats.items():
    print(f"• {cat:15}: Total Revenue: ₹{stats['total_revenue']:>10,.2f} | Units Sold: {stats['units_sold']}")`,
        codeTitle: 'Project 1: E-Commerce Sales Analytics Pipeline',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Pipeline Architecture:</strong>
          <p style="margin-top:6px;">Encapsulates data ingestion, anomaly validation, missing field imputation, and multi-dimensional aggregations inside reusable class methods.</p>
        </div>`
      },
      {
        title: '2. Project 2: Real Estate House Price Prediction Engine (Regression)',
        body: `<p>A multi-feature regression model predicting residential property valuations based on square footage, bedroom count, and age:</p>`,
        code: `# =========================================================================
# PROJECT 2: REAL ESTATE PRICE PREDICTION ENGINE
# =========================================================================

class HousePricePredictor:
    """Multi-variable linear pricing engine."""
    
    def __init__(self, base_price=20.0, price_per_sqft=0.06, price_per_bed=15.0, age_depreciation=0.5):
        self.base_price = base_price
        self.price_per_sqft = price_per_sqft
        self.price_per_bed = price_per_bed
        self.age_depreciation = age_depreciation

    def estimate_price(self, sqft, bedrooms, age_years):
        valuation = (
            self.base_price +
            (sqft * self.price_per_sqft) +
            (bedrooms * self.price_per_bed) -
            (age_years * self.age_depreciation)
        )
        return max(valuation, 10.0) # Price floor

# Run Project 2 Demonstration:
predictor = HousePricePredictor()

test_houses = [
    {"desc": "Modern 2BHK Apartment", "sqft": 1200, "beds": 2, "age": 2},
    {"desc": "Spacious 3BHK Villa",    "sqft": 2400, "beds": 3, "age": 5},
    {"desc": "Older 4BHK Family Home", "sqft": 3000, "beds": 4, "age": 18}
]

print("--- 🏡 Real Estate Valuation Estimates ---")
for h in test_houses:
    val = predictor.estimate_price(h["sqft"], h["beds"], h["age"])
    print(f"• {h['desc']:25} ({h['sqft']} sqft, {h['beds']} beds) -> Estimated Price: ₹{val:,.2f} Lakhs")`,
        codeTitle: 'Project 2: Real Estate Price Prediction Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Regression Principle:</strong>
          <p style="margin-top:6px;">Calculates multi-dimensional feature weights ($y = w_1 x_1 + w_2 x_2 + w_3 x_3 + b$) to estimate continuous market valuations.</p>
        </div>`
      },
      {
        title: '3. Project 3: Customer Churn Classification Model',
        body: `<p>A binary classification model evaluating whether a subscription customer is likely to cancel based on usage metrics and support tickets:</p>`,
        code: `# =========================================================================
# PROJECT 3: CUSTOMER CHURN CLASSIFICATION ENGINE
# =========================================================================
import math

class CustomerChurnClassifier:
    """Logistic probability engine for predicting customer churn risk."""
    
    def calculate_churn_probability(self, monthly_logins, support_tickets, days_since_last_active):
        # Linear log-odds score:
        z = -2.0 - (0.15 * monthly_logins) + (0.80 * support_tickets) + (0.05 * days_since_last_active)
        
        # Sigmoid function converting log-odds to probability (0.0 to 1.0):
        probability = 1.0 / (1.0 + math.exp(-z))
        return probability

    def evaluate_risk(self, customer_name, logins, tickets, inactivity_days):
        prob = self.calculate_churn_probability(logins, tickets, inactivity_days)
        risk_tier = "🔴 HIGH RISK (Churn Likely)" if prob >= 0.65 else ("🟡 MODERATE" if prob >= 0.35 else "🟢 HEALTHY")
        return {
            "customer": customer_name,
            "churn_probability": f"{prob * 100:.1f}%",
            "risk_status": risk_tier
        }

# Run Project 3 Demonstration:
classifier = CustomerChurnClassifier()
c1 = classifier.evaluate_risk("Balaji Dev (Enterprise Plan)", logins=45, tickets=1, inactivity_days=1)
c2 = classifier.evaluate_risk("Alex Smith (Basic Plan)",     logins=3,  tickets=5, inactivity_days=25)
c3 = classifier.evaluate_risk("Chloe Davis (Pro Plan)",      logins=12, tickets=2, inactivity_days=8)

print("--- 🚨 Customer Churn Risk Assessment ---")
for c in [c1, c2, c3]:
    print(f"• {c['customer']:32} | Probability: {c['churn_probability']:>6} | Status: {c['risk_status']}")`,
        codeTitle: 'Project 3: Customer Churn Classification Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Sigmoid Activation:</strong>
          <p style="margin-top:6px;">The Sigmoid function $\\sigma(z) = \\frac{1}{1 + e^{-z}}$ maps any real number to a valid probability between 0 and 1.</p>
        </div>`
      },
      {
        title: '4. Project 4: K-Means Customer Clustering & Segmentation',
        body: `<p>An unsupervised clustering model grouping customers into distinct demographic personas based on annual income and spending score:</p>`,
        code: `# =========================================================================
# PROJECT 4: K-MEANS CUSTOMER CLUSTERING SIMULATOR
# =========================================================================

class CustomerSegmentationClusterer:
    """Assigns customers to clusters based on Income and Spending Score."""
    
    # Pre-computed cluster centroids:
    CENTROIDS = {
        "VIP High-Spenders":   {"income": 95, "spending": 85},
        "Budget Conscious":    {"income": 35, "spending": 25},
        "Conservative Savers": {"income": 90, "spending": 20}
    }

    def assign_cluster(self, income_k, spending_score):
        best_cluster = None
        min_distance = float("inf")
        
        # Calculate Euclidean Distance to each centroid:
        for name, center in self.CENTROIDS.items():
            dist = ((income_k - center["income"]) ** 2 + (spending_score - center["spending"]) ** 2) ** 0.5
            if dist < min_distance:
                min_distance = dist
                best_cluster = name
        return best_cluster

# Run Project 4 Demonstration:
clusterer = CustomerSegmentationClusterer()
test_shoppers = [
    ("Customer A", 100, 90),
    ("Customer B", 30,  20),
    ("Customer C", 85,  15),
    ("Customer D", 92,  88)
]

print("--- 👥 Unsupervised Customer Segmentation (K-Means) ---")
for name, inc, spend in test_shoppers:
    cluster = clusterer.assign_cluster(inc, spend)
    print(f"• {name} (Income: ₹{inc}k, Spend Score: {spend}) -> Assigned Persona: 🏷️ [{cluster}]")`,
        codeTitle: 'Project 4: K-Means Customer Clustering Engine',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Euclidean Distance:</strong>
          <p style="margin-top:6px;">Calculates minimum distance $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ to assign points to the nearest centroid.</p>
        </div>`
      },
      {
        title: '5. Project 5: Financial Stock Market Time-Series Analyzer',
        body: `<p>A financial time-series analytics model calculating 7-day Simple Moving Averages (SMA), daily volatility, and trend momentum:</p>`,
        code: `# =========================================================================
# PROJECT 5: FINANCIAL STOCK TIME-SERIES ANALYZER
# =========================================================================

class StockTimeSeriesAnalyzer:
    def __init__(self, ticker, closing_prices):
        self.ticker = ticker
        self.prices = closing_prices

    def compute_moving_average(self, window=3):
        """Calculates Rolling Simple Moving Average."""
        sma = []
        for i in range(len(self.prices)):
            if i < window - 1:
                sma.append(None)
            else:
                window_slice = self.prices[i - window + 1 : i + 1]
                sma.append(round(sum(window_slice) / window, 2))
        return sma

    def compute_volatility(self):
        """Calculates Standard Deviation of Daily Price Returns."""
        returns = [(self.prices[i] - self.prices[i-1]) / self.prices[i-1] for i in range(1, len(self.prices))]
        mean_ret = sum(returns) / len(returns)
        variance = sum((r - mean_ret) ** 2 for r in returns) / len(returns)
        volatility_pct = (variance ** 0.5) * 100
        return volatility_pct

# Run Project 5 Demonstration:
tcs_prices = [4150.0, 4180.0, 4220.0, 4200.0, 4260.0, 4310.0, 4290.0]
analyzer = StockTimeSeriesAnalyzer("TCS", tcs_prices)
sma_3day = analyzer.compute_moving_average(window=3)
vol = analyzer.compute_volatility()

print(f"--- 📈 Financial Analysis for [{analyzer.ticker}] ---")
print(f"• Daily Closing Prices: {tcs_prices}")
print(f"• 3-Day Rolling SMA:    {sma_3day}")
print(f"• Daily Volatility:     {vol:.2f}% (Price Stability: High)")`,
        codeTitle: 'Project 5: Financial Stock Time-Series Analyzer',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Rolling Moving Averages:</strong>
          <p style="margin-top:6px;">In real Pandas: <code>df['SMA_7'] = df['Close'].rolling(window=7).mean()</code> computes rolling moving averages across millions of rows instantaneously.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Confusing Correlation with Causation in Data Science Projects',
      text: 'A high correlation coefficient (e.g. r = 0.95) between ice cream sales and shark attacks does not mean ice cream causes shark attacks (the confounding variable is summer temperature). Always validate business logic beyond raw correlation metrics.'
    },
    tryIt: {
      desc: 'Use the HousePricePredictor from Project 2 to estimate the valuation of a 1,800 sqft, 3-bedroom house that is 4 years old.',
      code: `predictor = HousePricePredictor()
val = predictor.estimate_price(sqft=1800, bedrooms=3, age_years=4)
print(f"Valuation for 1,800 sqft 3BHK: ₹{val:,.2f} Lakhs")`
    },
    faqs: [
      {
        q: 'What is the difference between AI, Machine Learning, and Deep Learning?',
        a: 'Artificial Intelligence (AI) is the broad science of simulating human intelligence. Machine Learning (ML) is a subset of AI using statistical models that learn from data. Deep Learning (DL) is a subset of ML using multi-layered artificial neural networks (CNNs, Transformers, LLMs).'
      },
      {
        q: 'What is Overfitting vs Underfitting in Machine Learning?',
        a: 'Overfitting occurs when a model memorizes noise in the training set and performs poorly on unseen test data (high variance). Underfitting occurs when a model is too simple to capture patterns in the data (high bias).'
      },
      {
        q: 'Why is Pandas / NumPy vectorization faster than Python for loops?',
        a: 'Vectorization delegates iteration and mathematical computation to low-level compiled C routines running directly on CPU registers with SIMD vector instructions, avoiding Python interpreter bytecode overhead.'
      }
    ]
  }
];
