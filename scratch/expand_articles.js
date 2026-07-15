/**
 * expand_articles.js
 * Bulk-expands all blog tutorial HTML articles to meet Google AdSense
 * minimum content requirements (600+ words per page).
 * 
 * Run: node scratch/expand_articles.js
 */

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT DEFINITIONS
// Each entry: { file, lang, langUrl, lesson, prev, prevUrl, next, nextUrl, content }
// ─────────────────────────────────────────────────────────────────────────────

const articles = [
  // ─── JAVA ──────────────────────────────────────────────────────────────────
  {
    file: 'blog-java-conditionals.html',
    title: 'Java — Operators &amp; Conditionals',
    lesson: 'Lesson 3',
    prev: 'Variables and Primitive Data Types', prevUrl: '/blog-java-variables.html',
    next: 'Loops (for, while)', nextUrl: '/blog-java-loops.html',
    langUrl: '/?lang=java', langLabel: 'Java',
    sections: `
<div class="intro-box">
  <p>Operators and conditionals are the decision-making tools of Java. They let your program respond differently based on data values, making your code <strong>dynamic</strong> rather than static. Every real application — from a login system to a game engine — relies on conditional logic.</p>
</div>

<div class="section" id="s1">
<div class="section-title"><span class="num">1</span> Arithmetic &amp; Comparison Operators</div>
<p>Java supports all standard arithmetic operators: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code> (modulus). Comparison operators return a <code>boolean</code> and are used in conditional expressions.</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Java — Operators</span><a class="try-btn" href="/?lang=java">▶ Run Code</a></div>
<pre><code><span class="kw">public class</span> Main {
    <span class="kw">public static void</span> main(String[] args) {
        <span class="kw">int</span> a = <span class="nu">10</span>, b = <span class="nu">3</span>;
        System.out.println(a + b);  <span class="cm">// 13</span>
        System.out.println(a % b);  <span class="cm">// 1 (remainder)</span>
        System.out.println(a &gt; b);  <span class="cm">// true</span>
        System.out.println(a == b); <span class="cm">// false</span>
    }
}</code></pre></div>
<p>The <code>%</code> (modulus) operator returns the remainder of division — very useful to check if a number is even (<code>n % 2 == 0</code>) or divisible by another value.</p>
</div>

<div class="section" id="s2">
<div class="section-title"><span class="num">2</span> if / else if / else</div>
<p>The <code>if-else</code> chain evaluates conditions top to bottom and executes the first matching block. Only one branch ever runs.</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Java — if / else</span><a class="try-btn" href="/?lang=java">▶ Run Code</a></div>
<pre><code><span class="kw">int</span> age = <span class="nu">20</span>;

<span class="kw">if</span> (age &lt; <span class="nu">13</span>) {
    System.out.println(<span class="st">"Child"</span>);
} <span class="kw">else if</span> (age &lt; <span class="nu">18</span>) {
    System.out.println(<span class="st">"Teenager"</span>);
} <span class="kw">else if</span> (age &lt; <span class="nu">65</span>) {
    System.out.println(<span class="st">"Adult"</span>);
} <span class="kw">else</span> {
    System.out.println(<span class="st">"Senior"</span>);
}</code></pre></div>
</div>

<div class="section" id="s3">
<div class="section-title"><span class="num">3</span> Switch Statement &amp; Switch Expression (Java 14+)</div>
<p>Use <code>switch</code> when comparing a single value against many constant cases. Java 14 introduced switch expressions that eliminate fall-through bugs and can return values directly.</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Java — Switch Expression</span><a class="try-btn" href="/?lang=java">▶ Run Code</a></div>
<pre><code><span class="kw">int</span> day = <span class="nu">3</span>;
String name = <span class="kw">switch</span> (day) {
    <span class="kw">case</span> <span class="nu">1</span> -&gt; <span class="st">"Monday"</span>;
    <span class="kw">case</span> <span class="nu">2</span> -&gt; <span class="st">"Tuesday"</span>;
    <span class="kw">case</span> <span class="nu">3</span> -&gt; <span class="st">"Wednesday"</span>;
    <span class="kw">case</span> <span class="nu">4</span> -&gt; <span class="st">"Thursday"</span>;
    <span class="kw">case</span> <span class="nu">5</span> -&gt; <span class="st">"Friday"</span>;
    <span class="kw">default</span> -&gt; <span class="st">"Weekend"</span>;
};
System.out.println(name);</code></pre></div>
</div>

<div class="section" id="s4">
<div class="section-title"><span class="num">4</span> Ternary Operator</div>
<p>The ternary operator is a compact one-liner for simple if-else decisions: <code>condition ? valueIfTrue : valueIfFalse</code>.</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Java — Ternary</span><a class="try-btn" href="/?lang=java">▶ Run Code</a></div>
<pre><code><span class="kw">int</span> score = <span class="nu">75</span>;
String result = (score &gt;= <span class="nu">60</span>) ? <span class="st">"Pass"</span> : <span class="st">"Fail"</span>;
System.out.println(<span class="st">"Result: "</span> + result); <span class="cm">// Pass</span></code></pre></div>
</div>

<div class="section" id="s5">
<div class="section-title"><span class="num">5</span> Logical Operators: &amp;&amp;, ||, !</div>
<p>Combine multiple conditions using logical operators. <code>&amp;&amp;</code> (AND) requires both to be true, <code>||</code> (OR) requires at least one, and <code>!</code> negates a condition.</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Java — Logical Operators</span><a class="try-btn" href="/?lang=java">▶ Run Code</a></div>
<pre><code><span class="kw">boolean</span> hasTicket = <span class="kw">true</span>;
<span class="kw">boolean</span> isVIP = <span class="kw">false</span>;

<span class="kw">if</span> (hasTicket &amp;&amp; !isVIP) {
    System.out.println(<span class="st">"General Admission"</span>);
}
<span class="kw">if</span> (hasTicket || isVIP) {
    System.out.println(<span class="st">"Entry Allowed"</span>);
}</code></pre></div>
<div class="info-box"><strong>💡 Short-circuit evaluation:</strong> In <code>&amp;&amp;</code>, if the first condition is false, the second is never evaluated. In <code>||</code>, if the first is true, the second is skipped. This is important when the second condition has side effects.</div>
</div>

<div class="section" id="s6">
<div class="section-title"><span class="num">6</span> Common Mistakes</div>
<ul style="color:#c9d1d9; padding-left:24px; line-height:2.2; font-size:15px;">
  <li>❌ Using <code>=</code> instead of <code>==</code> in conditions — <code>if (x = 5)</code> is a compile error in Java (but dangerous in C/C++)</li>
  <li>❌ Comparing Strings with <code>==</code> — use <code>.equals()</code> for String comparison: <code>name.equals("Java")</code></li>
  <li>❌ Forgetting break in classic switch — without <code>break</code>, execution falls through to the next case</li>
  <li>✅ Prefer switch expressions (Java 14+) — they're cleaner and don't have fall-through issues</li>
</ul>
</div>

<div class="section" id="faq">
<div class="section-title"><span class="num">❓</span> Frequently Asked Questions</div>
<p><strong>Q: Can I switch on a String in Java?</strong><br/>Yes! Since Java 7, you can use <code>switch</code> on <code>String</code>, <code>int</code>, <code>char</code>, <code>byte</code>, <code>short</code>, and enums.</p>
<p><strong>Q: What's the difference between &amp;&amp; and &amp;?</strong><br/><code>&amp;&amp;</code> is short-circuit AND — it skips the right side if the left is false. <code>&amp;</code> evaluates both sides always. Use <code>&amp;&amp;</code> for conditions.</p>
<p><strong>Q: Can I nest ternary operators?</strong><br/>Technically yes, but deeply nested ternaries are hard to read. For three or more conditions, use if-else chains instead.</p>
</div>`
  },
  {
    file: 'blog-java-loops.html',
    title: 'Java — Loops (for, while)',
    lesson: 'Lesson 4',
    prev: 'Operators &amp; Conditionals', prevUrl: '/blog-java-conditionals.html',
    next: 'Reading Input using Scanner', nextUrl: '/blog-java-functions.html',
    langUrl: '/?lang=java', langLabel: 'Java',
    sections: `
<div class="intro-box">
  <p>Loops let your code repeat operations without copy-pasting the same code. Whether you're processing a list of users, generating numbers, or reading data line by line — loops are the engine that makes it possible. Java provides three main loop types: <code>for</code>, <code>while</code>, and <code>do-while</code>.</p>
</div>

<div class="section" id="s1">
<div class="section-title"><span class="num">1</span> The for Loop</div>
<p>Use <code>for</code> loops when you know exactly how many times to repeat. The loop has three parts: initialization, condition, and update.</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Java — for Loop</span><a class="try-btn" href="/?lang=java">▶ Run Code</a></div>
<pre><code><span class="kw">public class</span> Main {
    <span class="kw">public static void</span> main(String[] args) {
        <span class="kw">for</span> (<span class="kw">int</span> i = <span class="nu">1</span>; i &lt;= <span class="nu">5</span>; i++) {
            System.out.println(<span class="st">"Iteration: "</span> + i);
        }
    }
}</code></pre></div>
<p>The loop runs as long as <code>i &lt;= 5</code>. After each iteration, <code>i++</code> increments by 1. The body runs 5 times total (i = 1, 2, 3, 4, 5).</p>
</div>

<div class="section" id="s2">
<div class="section-title"><span class="num">2</span> The while Loop</div>
<p>Use <code>while</code> when the number of iterations is not known in advance — you loop until a condition becomes false.</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Java — while Loop</span><a class="try-btn" href="/?lang=java">▶ Run Code</a></div>
<pre><code><span class="kw">int</span> balance = <span class="nu">100</span>;
<span class="kw">while</span> (balance &gt; <span class="nu">0</span>) {
    System.out.println(<span class="st">"Balance: $"</span> + balance);
    balance -= <span class="nu">25</span>;
}
System.out.println(<span class="st">"Account empty!"</span>);</code></pre></div>
</div>

<div class="section" id="s3">
<div class="section-title"><span class="num">3</span> do-while Loop</div>
<p>The <code>do-while</code> loop guarantees the body runs <strong>at least once</strong>, even if the condition is initially false — because the condition is checked after the body.</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Java — do-while</span><a class="try-btn" href="/?lang=java">▶ Run Code</a></div>
<pre><code><span class="kw">int</span> count = <span class="nu">1</span>;
<span class="kw">do</span> {
    System.out.println(<span class="st">"Count: "</span> + count);
    count++;
} <span class="kw">while</span> (count &lt;= <span class="nu">3</span>);
System.out.println(<span class="st">"Done!"</span>);</code></pre></div>
</div>

<div class="section" id="s4">
<div class="section-title"><span class="num">4</span> Enhanced for-each Loop</div>
<p>The for-each loop iterates over arrays and collections without needing an index variable. It's cleaner and less error-prone for simple traversal.</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Java — for-each</span><a class="try-btn" href="/?lang=java">▶ Run Code</a></div>
<pre><code>String[] languages = {<span class="st">"Java"</span>, <span class="st">"Python"</span>, <span class="st">"Rust"</span>, <span class="st">"Go"</span>};
<span class="kw">for</span> (String lang : languages) {
    System.out.println(<span class="st">"Language: "</span> + lang);
}</code></pre></div>
</div>

<div class="section" id="s5">
<div class="section-title"><span class="num">5</span> break &amp; continue</div>
<p><code>break</code> exits the loop immediately. <code>continue</code> skips the rest of the current iteration and jumps to the next one.</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Java — break &amp; continue</span><a class="try-btn" href="/?lang=java">▶ Run Code</a></div>
<pre><code><span class="kw">for</span> (<span class="kw">int</span> i = <span class="nu">1</span>; i &lt;= <span class="nu">10</span>; i++) {
    <span class="kw">if</span> (i % <span class="nu">2</span> == <span class="nu">0</span>) <span class="kw">continue</span>; <span class="cm">// skip even numbers</span>
    <span class="kw">if</span> (i &gt; <span class="nu">7</span>) <span class="kw">break</span>;            <span class="cm">// stop after 7</span>
    System.out.print(i + <span class="st">" "</span>);   <span class="cm">// prints: 1 3 5 7</span>
}</code></pre></div>
</div>

<div class="section" id="faq">
<div class="section-title"><span class="num">❓</span> Frequently Asked Questions</div>
<p><strong>Q: When should I use for vs while?</strong><br/>Use <code>for</code> when the number of iterations is known (e.g., iterate 10 times). Use <code>while</code> when the end condition depends on runtime data (e.g., read until file ends).</p>
<p><strong>Q: What is an infinite loop and how to avoid it?</strong><br/>An infinite loop runs forever because the condition never becomes false. Always ensure your loop variable is updated in the body (e.g., <code>i++</code>) or your condition can become false eventually.</p>
<p><strong>Q: Can I have nested loops?</strong><br/>Yes. Nested loops are common for 2D arrays or matrix operations. The outer loop runs once per row; the inner loop runs once per column per row iteration.</p>
</div>`
  },
  {
    file: 'blog-java-functions.html',
    title: 'Java — Reading Input using Scanner',
    lesson: 'Lesson 5',
    prev: 'Loops (for, while)', prevUrl: '/blog-java-loops.html',
    next: 'Classes and Objects', nextUrl: '/blog-java-collections.html',
    langUrl: '/?lang=java', langLabel: 'Java',
    sections: `
<div class="intro-box">
  <p>Reading user input is essential for interactive programs. Java's <code>Scanner</code> class (from <code>java.util</code>) is the standard tool for reading input from the keyboard, files, and strings. This lesson covers everything you need to build interactive Java programs that respond to user input.</p>
</div>

<div class="section" id="s1">
<div class="section-title"><span class="num">1</span> Basic Scanner Input</div>
<p>Import <code>Scanner</code> from <code>java.util</code>, create a <code>Scanner</code> object connected to <code>System.in</code> (keyboard), then call methods like <code>nextLine()</code>, <code>nextInt()</code>, or <code>nextDouble()</code>.</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Java — Scanner Basics</span><a class="try-btn" href="/?lang=java">▶ Run Code</a></div>
<pre><code><span class="kw">import</span> java.util.Scanner;

<span class="kw">public class</span> Main {
    <span class="kw">public static void</span> main(String[] args) {
        Scanner sc = <span class="kw">new</span> Scanner(System.in);

        System.out.print(<span class="st">"Enter your name: "</span>);
        String name = sc.nextLine();

        System.out.print(<span class="st">"Enter your age: "</span>);
        <span class="kw">int</span> age = sc.nextInt();

        System.out.println(<span class="st">"Hello, "</span> + name + <span class="st">"! You are "</span> + age + <span class="st">" years old."</span>);
        sc.close();
    }
}</code></pre></div>
<p>Always call <code>sc.close()</code> when done to release the system resource. In our online compiler, use the <strong>stdin</strong> field to provide input before clicking Run.</p>
</div>

<div class="section" id="s2">
<div class="section-title"><span class="num">2</span> Reading Different Data Types</div>
<table class="tbl">
  <tr><th>Method</th><th>Reads</th><th>Example</th></tr>
  <tr><td><code>nextInt()</code></td><td>Integer</td><td><code>int x = sc.nextInt();</code></td></tr>
  <tr><td><code>nextDouble()</code></td><td>Decimal number</td><td><code>double d = sc.nextDouble();</code></td></tr>
  <tr><td><code>nextLine()</code></td><td>Full line (with spaces)</td><td><code>String s = sc.nextLine();</code></td></tr>
  <tr><td><code>next()</code></td><td>Single word (no spaces)</td><td><code>String word = sc.next();</code></td></tr>
  <tr><td><code>nextBoolean()</code></td><td>true / false</td><td><code>boolean b = sc.nextBoolean();</code></td></tr>
</table>
</div>

<div class="section" id="s3">
<div class="section-title"><span class="num">3</span> Reading Multiple Inputs in a Loop</div>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Java — Loop Input</span><a class="try-btn" href="/?lang=java">▶ Run Code</a></div>
<pre><code><span class="kw">import</span> java.util.Scanner;

<span class="kw">public class</span> Main {
    <span class="kw">public static void</span> main(String[] args) {
        Scanner sc = <span class="kw">new</span> Scanner(System.in);
        <span class="kw">int</span> sum = <span class="nu">0</span>;

        <span class="kw">for</span> (<span class="kw">int</span> i = <span class="nu">1</span>; i &lt;= <span class="nu">3</span>; i++) {
            System.out.print(<span class="st">"Enter number "</span> + i + <span class="st">": "</span>);
            sum += sc.nextInt();
        }
        System.out.println(<span class="st">"Sum: "</span> + sum);
        sc.close();
    }
}</code></pre></div>
</div>

<div class="section" id="s4">
<div class="section-title"><span class="num">4</span> The nextLine() after nextInt() Trap</div>
<p>This is one of the most common Scanner bugs. After calling <code>nextInt()</code>, the newline character stays in the buffer. The next <code>nextLine()</code> call reads this leftover newline (empty string) instead of the user's input.</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Java — Fix nextLine() Bug</span><a class="try-btn" href="/?lang=java">▶ Run Code</a></div>
<pre><code>Scanner sc = <span class="kw">new</span> Scanner(System.in);
<span class="kw">int</span> age = sc.nextInt();
sc.nextLine(); <span class="cm">// ← consume the leftover newline</span>
String name = sc.nextLine(); <span class="cm">// now reads correctly</span></code></pre></div>
<div class="info-box"><strong>Fix:</strong> Always call <code>sc.nextLine()</code> once after <code>nextInt()</code>, <code>nextDouble()</code>, etc., before the next <code>nextLine()</code> call.</div>
</div>

<div class="section" id="faq">
<div class="section-title"><span class="num">❓</span> Frequently Asked Questions</div>
<p><strong>Q: How do I read input from a file instead of keyboard?</strong><br/>Replace <code>System.in</code> with a <code>File</code> object: <code>Scanner sc = new Scanner(new File("data.txt"));</code> — the same methods work identically.</p>
<p><strong>Q: What if the user enters the wrong type?</strong><br/>Scanner throws an <code>InputMismatchException</code>. Wrap your input calls in a try-catch block to handle invalid input gracefully.</p>
<p><strong>Q: Is BufferedReader faster than Scanner?</strong><br/>Yes, <code>BufferedReader</code> is faster for large input volumes (competitive programming). Scanner is easier to use for general applications and small inputs.</p>
</div>`
  },
  {
    file: 'blog-java-collections.html',
    title: 'Java — Classes and Objects',
    lesson: 'Lesson 6',
    prev: 'Reading Input using Scanner', prevUrl: '/blog-java-functions.html',
    next: 'Exception Handling', nextUrl: '/blog-java-oop.html',
    langUrl: '/?lang=java', langLabel: 'Java',
    sections: `
<div class="intro-box">
  <p>Java is an object-oriented language at its core. <strong>Classes</strong> are blueprints, and <strong>Objects</strong> are instances of those blueprints. Every real Java application models its domain as classes with fields (data) and methods (behavior). This is the heart of Java development.</p>
</div>

<div class="section" id="s1">
<div class="section-title"><span class="num">1</span> Defining a Class and Creating Objects</div>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Java — Class &amp; Object</span><a class="try-btn" href="/?lang=java">▶ Run Code</a></div>
<pre><code><span class="kw">class</span> Car {
    String brand;
    <span class="kw">int</span> year;
    <span class="kw">double</span> price;

    <span class="kw">void</span> display() {
        System.out.println(brand + <span class="st">" ("</span> + year + <span class="st">") — $"</span> + price);
    }
}

<span class="kw">public class</span> Main {
    <span class="kw">public static void</span> main(String[] args) {
        Car c1 = <span class="kw">new</span> Car();
        c1.brand = <span class="st">"Toyota"</span>;
        c1.year = <span class="nu">2023</span>;
        c1.price = <span class="nu">25000.00</span>;
        c1.display();
    }
}</code></pre></div>
</div>

<div class="section" id="s2">
<div class="section-title"><span class="num">2</span> Constructors</div>
<p>A constructor is a special method called when an object is created. It initializes the object's fields. The constructor name must match the class name and has no return type.</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Java — Constructor</span><a class="try-btn" href="/?lang=java">▶ Run Code</a></div>
<pre><code><span class="kw">class</span> Student {
    String name;
    <span class="kw">int</span> grade;

    <span class="cm">// Constructor</span>
    Student(String name, <span class="kw">int</span> grade) {
        <span class="kw">this</span>.name = name;
        <span class="kw">this</span>.grade = grade;
    }

    <span class="kw">void</span> show() {
        System.out.println(name + <span class="st">" — Grade: "</span> + grade);
    }
}

<span class="kw">public class</span> Main {
    <span class="kw">public static void</span> main(String[] args) {
        Student s = <span class="kw">new</span> Student(<span class="st">"Alice"</span>, <span class="nu">10</span>);
        s.show();
    }
}</code></pre></div>
<p>The <code>this</code> keyword refers to the current object. It disambiguates between the constructor parameter <code>name</code> and the field <code>this.name</code>.</p>
</div>

<div class="section" id="s3">
<div class="section-title"><span class="num">3</span> Access Modifiers</div>
<table class="tbl">
  <tr><th>Modifier</th><th>Accessible From</th></tr>
  <tr><td><code>public</code></td><td>Everywhere</td></tr>
  <tr><td><code>private</code></td><td>Same class only</td></tr>
  <tr><td><code>protected</code></td><td>Same package + subclasses</td></tr>
  <tr><td>(none)</td><td>Same package only</td></tr>
</table>
<div class="info-box"><strong>Best Practice:</strong> Make fields <code>private</code> and provide <code>public</code> getters/setters (encapsulation). This hides implementation details and prevents unauthorized access.</div>
</div>

<div class="section" id="s4">
<div class="section-title"><span class="num">4</span> Static vs Instance Members</div>
<p>Static members belong to the <em>class</em>, not individual objects. All objects share one copy of a static field. Instance members are unique to each object.</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Java — static keyword</span><a class="try-btn" href="/?lang=java">▶ Run Code</a></div>
<pre><code><span class="kw">class</span> Counter {
    <span class="kw">static int</span> total = <span class="nu">0</span>; <span class="cm">// shared</span>
    <span class="kw">int</span> id;               <span class="cm">// unique per object</span>

    Counter() {
        total++;
        id = total;
    }
}

<span class="kw">public class</span> Main {
    <span class="kw">public static void</span> main(String[] args) {
        Counter a = <span class="kw">new</span> Counter();
        Counter b = <span class="kw">new</span> Counter();
        System.out.println(<span class="st">"Total: "</span> + Counter.total); <span class="cm">// 2</span>
        System.out.println(<span class="st">"IDs: "</span> + a.id + <span class="st">", "</span> + b.id); <span class="cm">// 1, 2</span>
    }
}</code></pre></div>
</div>

<div class="section" id="faq">
<div class="section-title"><span class="num">❓</span> Frequently Asked Questions</div>
<p><strong>Q: What is the difference between a class and an object?</strong><br/>A class is the blueprint (like an architectural plan). An object is an instance built from that blueprint (like an actual house). You can create many objects from one class.</p>
<p><strong>Q: Can a class have multiple constructors?</strong><br/>Yes — this is called constructor overloading. You can have constructors with different parameter lists and Java picks the right one based on what arguments you pass.</p>
<p><strong>Q: What is null in Java?</strong><br/><code>null</code> means a reference variable points to no object. Calling a method on <code>null</code> throws a <code>NullPointerException</code>. Always check <code>if (obj != null)</code> before using reference variables.</p>
</div>`
  },
  {
    file: 'blog-java-oop.html',
    title: 'Java — Exception Handling',
    lesson: 'Lesson 7',
    prev: 'Classes and Objects', prevUrl: '/blog-java-collections.html',
    next: null, nextUrl: null,
    langUrl: '/?lang=java', langLabel: 'Java',
    sections: `
<div class="intro-box">
  <p>In the real world, programs encounter unexpected situations — a file that doesn't exist, a network timeout, or invalid user input. Java's exception handling system lets you write resilient code that gracefully handles errors instead of crashing. Understanding exceptions is a mark of professional Java development.</p>
</div>

<div class="section" id="s1">
<div class="section-title"><span class="num">1</span> try / catch / finally</div>
<p>Wrap risky code in a <code>try</code> block. If an exception occurs, execution jumps to the matching <code>catch</code> block. The <code>finally</code> block always runs, whether or not an exception occurred.</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Java — try / catch</span><a class="try-btn" href="/?lang=java">▶ Run Code</a></div>
<pre><code><span class="kw">public class</span> Main {
    <span class="kw">public static void</span> main(String[] args) {
        <span class="kw">try</span> {
            <span class="kw">int</span>[] arr = {<span class="nu">1</span>, <span class="nu">2</span>, <span class="nu">3</span>};
            System.out.println(arr[<span class="nu">5</span>]); <span class="cm">// ❌ index out of bounds</span>
        } <span class="kw">catch</span> (ArrayIndexOutOfBoundsException e) {
            System.out.println(<span class="st">"Error: "</span> + e.getMessage());
        } <span class="kw">finally</span> {
            System.out.println(<span class="st">"Cleanup done."</span>);
        }
    }
}</code></pre></div>
</div>

<div class="section" id="s2">
<div class="section-title"><span class="num">2</span> Common Exception Types</div>
<table class="tbl">
  <tr><th>Exception</th><th>When it occurs</th></tr>
  <tr><td><code>NullPointerException</code></td><td>Calling method on null reference</td></tr>
  <tr><td><code>ArrayIndexOutOfBoundsException</code></td><td>Accessing invalid array index</td></tr>
  <tr><td><code>NumberFormatException</code></td><td>Parsing non-numeric string as number</td></tr>
  <tr><td><code>ClassCastException</code></td><td>Illegal type cast</td></tr>
  <tr><td><code>StackOverflowError</code></td><td>Infinite recursion</td></tr>
  <tr><td><code>IOException</code></td><td>File read/write failures</td></tr>
</table>
</div>

<div class="section" id="s3">
<div class="section-title"><span class="num">3</span> Throwing Exceptions</div>
<p>Use <code>throw</code> to manually raise an exception. This is useful for validating inputs in your own methods and signaling errors to callers.</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Java — throw</span><a class="try-btn" href="/?lang=java">▶ Run Code</a></div>
<pre><code><span class="kw">public class</span> Main {
    <span class="kw">static void</span> setAge(<span class="kw">int</span> age) {
        <span class="kw">if</span> (age &lt; <span class="nu">0</span>) {
            <span class="kw">throw new</span> IllegalArgumentException(<span class="st">"Age cannot be negative!"</span>);
        }
        System.out.println(<span class="st">"Age set to: "</span> + age);
    }

    <span class="kw">public static void</span> main(String[] args) {
        <span class="kw">try</span> {
            setAge(-<span class="nu">5</span>);
        } <span class="kw">catch</span> (IllegalArgumentException e) {
            System.out.println(<span class="st">"Caught: "</span> + e.getMessage());
        }
    }
}</code></pre></div>
</div>

<div class="section" id="s4">
<div class="section-title"><span class="num">4</span> Custom Exceptions</div>
<p>You can create your own exception classes by extending <code>Exception</code> (checked) or <code>RuntimeException</code> (unchecked). Custom exceptions make your error messages more meaningful and domain-specific.</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Java — Custom Exception</span><a class="try-btn" href="/?lang=java">▶ Run Code</a></div>
<pre><code><span class="kw">class</span> InsufficientFundsException <span class="kw">extends</span> Exception {
    InsufficientFundsException(String msg) { <span class="kw">super</span>(msg); }
}

<span class="kw">public class</span> Main {
    <span class="kw">static void</span> withdraw(<span class="kw">double</span> balance, <span class="kw">double</span> amount)
            <span class="kw">throws</span> InsufficientFundsException {
        <span class="kw">if</span> (amount &gt; balance)
            <span class="kw">throw new</span> InsufficientFundsException(<span class="st">"Not enough funds!"</span>);
        System.out.println(<span class="st">"Withdrawn: $"</span> + amount);
    }

    <span class="kw">public static void</span> main(String[] args) {
        <span class="kw">try</span> {
            withdraw(<span class="nu">100</span>, <span class="nu">150</span>);
        } <span class="kw">catch</span> (InsufficientFundsException e) {
            System.out.println(e.getMessage());
        }
    }
}</code></pre></div>
</div>

<div class="section" id="faq">
<div class="section-title"><span class="num">❓</span> Frequently Asked Questions</div>
<p><strong>Q: What is the difference between checked and unchecked exceptions?</strong><br/>Checked exceptions (like <code>IOException</code>) must be declared with <code>throws</code> or handled with try-catch at compile time. Unchecked exceptions (like <code>NullPointerException</code>) are runtime errors and don't require explicit handling.</p>
<p><strong>Q: Should I catch Exception or specific exceptions?</strong><br/>Always catch the most specific exception type possible. Catching <code>Exception</code> broadly hides bugs. Only use it as a last resort in top-level handlers.</p>
<p><strong>Q: What does the stack trace tell me?</strong><br/>A stack trace shows exactly which method was executing when the error occurred, and the chain of calls that led there. Read it bottom-up to find the root cause.</p>
</div>`
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// HTML TEMPLATE BUILDER
// ─────────────────────────────────────────────────────────────────────────────

function buildNewMain(article) {
  const prevBtn = article.prevUrl
    ? `<a href="${article.prevUrl}" class="nav-btn">
        <span class="label">← Previous</span>
        <span class="title">${article.prev}</span>
      </a>`
    : `<span></span>`;

  const nextBtn = article.nextUrl
    ? `<a href="${article.nextUrl}" class="nav-btn" style="text-align:right;">
        <span class="label">Next →</span>
        <span class="title">${article.next}</span>
      </a>`
    : `<span></span>`;

  // Derive breadcrumb language info
  const fileBase = article.file;
  let langSlug = 'java', langName = 'Java', langHomeUrl = '/blog-java.html';
  if (fileBase.includes('python')) { langSlug='python'; langName='Python 3'; langHomeUrl='/blog-python.html'; }
  else if (fileBase.includes('javascript')) { langSlug='javascript'; langName='JavaScript'; langHomeUrl='/blog-javascript.html'; }
  else if (fileBase.includes('cpp')) { langSlug='cpp'; langName='C++'; langHomeUrl='/blog-cpp.html'; }
  else if (fileBase.includes('blog-c-')) { langSlug='c'; langName='C'; langHomeUrl='/blog-c.html'; }
  else if (fileBase.includes('rust')) { langSlug='rust'; langName='Rust'; langHomeUrl='/blog-rust.html'; }
  else if (fileBase.includes('go')) { langSlug='go'; langName='Go'; langHomeUrl='/blog-go.html'; }
  else if (fileBase.includes('php')) { langSlug='php'; langName='PHP'; langHomeUrl='/blog-php.html'; }
  else if (fileBase.includes('ruby')) { langSlug='ruby'; langName='Ruby'; langHomeUrl='/blog-ruby.html'; }

  return `  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span>›</span>
      <a href="/blog.html">Tutorials</a><span>›</span>
      <a href="${langHomeUrl}">${langName}</a><span>›</span>
      <span>${article.title.replace(/&amp;/g,'&')}</span>
    </div>
<h1 class="page-title">${article.title}</h1>
<div class="page-meta">
      <span class="badge">🕐 12 min read</span>
      <span class="badge">🟢 ${article.lesson}</span>
      <span class="badge">📅 July 2026</span>
    </div>
${article.sections}
    <div class="nav-footer">
      ${prevBtn}
      ${nextBtn}
    </div>
  </main>
`;
}

// ─────────────────────────────────────────────────────────────────────────────
// PROCESS EACH ARTICLE
// ─────────────────────────────────────────────────────────────────────────────

let processed = 0;
let skipped = 0;

for (const article of articles) {
  const filePath = path.join(publicDir, article.file);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  File not found: ${article.file}`);
    skipped++;
    continue;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Find existing <main class="content"> ... </main> and replace it
  const mainRegex = /<main\s+class="content">[\s\S]*?<\/main>/;

  if (!mainRegex.test(html)) {
    console.warn(`⚠️  Could not find <main class="content"> in: ${article.file}`);
    skipped++;
    continue;
  }

  const newMain = buildNewMain(article);
  html = html.replace(mainRegex, newMain.trimEnd());

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅  Expanded: ${article.file}`);
  processed++;
}

// ─────────────────────────────────────────────────────────────────────────────
// ALSO FIX FOOTER: Remove "Free · No ads · No sign-up" text from all HTML files
// ─────────────────────────────────────────────────────────────────────────────

console.log('\n📝 Fixing footer text in all HTML files...');
const allHtmlFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

let footerFixed = 0;
for (const fname of allHtmlFiles) {
  const fpath = path.join(publicDir, fname);
  let content = fs.readFileSync(fpath, 'utf8');
  if (content.includes('No ads')) {
    content = content.replace(/Free\s*·\s*No ads\s*·\s*No sign-up/g, 'Free · Trusted by developers worldwide');
    fs.writeFileSync(fpath, content, 'utf8');
    footerFixed++;
  }
}

console.log(`✅  Footer fixed in ${footerFixed} files`);
console.log(`\n🎉 Done! Expanded: ${processed} articles, Skipped: ${skipped}`);
