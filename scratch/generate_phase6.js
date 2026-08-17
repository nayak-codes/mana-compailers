const fs = require('fs');
const path = require('path');

const phase6Data = [
  // =========================================================================
  // CHAPTER 23: Java String Fundamentals & Memory Architecture
  // =========================================================================
  {
    num: 23,
    phaseId: 'phase6',
    phaseTitle: 'Phase 6: Strings & Text Processing',
    slug: '23-java-string-fundamentals-and-memory-architecture',
    title: 'Java String Fundamentals & String Constant Pool (SCP)',
    badge: '23. String Fundamentals & SCP',
    subtopics: 'What is a String? · java.lang.String · String Literals vs new String() · String Constant Pool (SCP) · String Interning (intern()) · String Immutability Deep Dive · Compact Strings (byte[] in Java 9+) · Indexing & charAt()',
    readTime: '22 min read',
    intro: 'Comprehensive deep dive into Java Strings: understanding the java.lang.String class, the internal difference between String literals and heap objects, the String Constant Pool (SCP) memory region, why strings are immutable in Java, compact string architecture in modern JVMs, and fundamental 0-based character indexing.',
    theorySections: [
      {
        heading: '1. What is a String in Java?',
        content: `In computer programming, text is the primary medium through which humans interact with software. In Java, textual data is represented by the <code>java.lang.String</code> class.
Unlike primitive data types (<code>int</code>, <code>double</code>, <code>char</code>, <code>boolean</code>) which store raw binary bits directly in Stack memory, a <code>String</code> is a **Reference Type (Object)**.

A <code>String</code> object represents an **immutable, ordered sequence of Unicode characters**.

\`\`\`
  Primitive Type:
  [ int age = 21 ]  ===> Stack Memory holds literal value: 21

  Reference Type:
  [ String name = "Ravi" ] ===> Stack holds Reference Address: 0x4F12
                                     |
                                     v
                                Heap / SCP Memory: ['R', 'a', 'v', 'i']
\`\`\`

Because strings are used in virtually every line of enterprise Java code (database queries, JSON payloads, HTTP headers, authentication tokens), Java provides first-class language support for strings, allowing you to create them using double quotes without explicitly calling <code>new</code>.`
      },
      {
        heading: '2. Creating Strings: String Literals vs new String()',
        content: `There are two primary ways to create a string object in Java:

1. **Using a String Literal:**
\`\`\`java
String s1 = "Java";
String s2 = "Java";
\`\`\`
When you create a string literal, the JVM checks the **String Constant Pool (SCP)** located inside the Heap memory:
- If <code>"Java"</code> already exists in the SCP, no new object is created. The JVM simply returns a reference to the existing instance.
- Both <code>s1</code> and <code>s2</code> point to the **exact same memory location** (<code>s1 == s2</code> is <code>true</code>).

2. **Using the <code>new</code> Keyword:**
\`\`\`java
String s3 = new String("Java");
\`\`\`
When you use <code>new String("Java")</code>:
- The JVM forces the creation of a **new, distinct Object in the general Heap memory**, outside the SCP.
- It also ensures <code>"Java"</code> exists in the SCP.
- Therefore, <code>s1 == s3</code> evaluates to <code>false</code> because they reside at different memory addresses!

\`\`\`
                    HEAP MEMORY
 +-------------------------------------------------------+
 |                                                       |
 |   General Heap Objects:                               |
 |   +------------------------+                          |
 |   | String Object (s3)     | (Address: 0x7B20)        |
 |   | Value: "Java"          |                          |
 |   +------------------------+                          |
 |                                                       |
 |   +-----------------------------------------------+   |
 |   | STRING CONSTANT POOL (SCP)                    |   |
 |   |                                               |   |
 |   |   +-----------------------+                   |   |
 |   |   | "Java" (s1, s2)       | (Address: 0x1A05) |   |
 |   |   +-----------------------+                   |   |
 |   |                                               |   |
 |   +-----------------------------------------------+   |
 +-------------------------------------------------------+
\`\`\``
      },
      {
        heading: '3. String Interning: The intern() Method',
        content: `If you have a heap string object created via <code>new String()</code> or dynamic concatenation and you want to point to the canonical SCP instance to save memory, you can call the **<code>intern()</code>** method:

\`\`\`java
String heapStr = new String("Java");
String poolStr = heapStr.intern(); // Returns SCP reference

System.out.println(heapStr == "Java"); // false (Heap vs SCP)
System.out.println(poolStr == "Java"); // true  (Both are in SCP)
\`\`\`

**Why Interning Matters in Industry:**
When reading millions of duplicate records from large CSVs or JSON files (e.g. state names like "California", country codes like "USA"), interning duplicate strings allows millions of references to share a single SCP object, drastically reducing Heap memory consumption.`
      },
      {
        heading: '4. Why are Strings Immutable in Java? (4 Core Reasons)',
        content: `Once a <code>String</code> object is created in Java, its character sequence **can NEVER be modified**. Any method that appears to modify a string (like <code>toUpperCase()</code>, <code>concat()</code>, <code>replace()</code>) actually allocates and returns a **brand-new String object** in memory.

\`\`\`java
String str = "Hello";
str.concat(" World"); // Modifies nothing on str!
System.out.println(str); // Still prints "Hello"

str = str.concat(" World"); // Explicitly reassigning reference to the new object
System.out.println(str); // Prints "Hello World"
\`\`\`

**Why did Java designers make String immutable?**
1. **String Constant Pool (SCP) Sharing:** If strings were mutable, changing the value through reference <code>s1</code> would silently corrupt the value for <code>s2</code> and all other threads sharing that pool object!
2. **Security:** Strings are used for database connection URLs, usernames, passwords, file paths, and network sockets. If a string were mutable, an attacker could pass a valid file path to a verification method and mutate it to access <code>/etc/passwd</code> before the file is opened (Time-of-Check to Time-of-Use vulnerability).
3. **Thread Safety:** Because string objects cannot be changed by any thread, multiple concurrent threads can share strings without synchronization locks, completely eliminating race conditions.
4. **HashCode Caching:** Because the content is fixed forever, Java calculates the <code>hashCode</code> of a string **only once** on first use and caches it in a private field <code>hash</code>. This makes <code>String</code> exceptionally fast when used as keys in <code>HashMap</code> and <code>HashSet</code>.`
      },
      {
        heading: '5. Compact Strings Architecture (Java 9+)',
        content: `Historically in Java 8 and earlier, strings were internally stored as an array of 16-bit characters: <code>char[] value</code>. Because most enterprise strings contain alphanumeric ASCII characters (requiring only 8 bits / 1 byte), half of the memory was wasted with zero-padding bytes.

Starting in **Java 9 LTS**, Java introduced **Compact Strings (JEP 254)**:
\`\`\`java
// Internal representation in java.lang.String (Java 9+):
private final byte[] value;
private final byte coder; // 0 for LATIN1 (1 byte/char), 1 for UTF-16 (2 bytes/char)
\`\`\`
- If the string contains only Latin-1 characters (English letters, numbers, common symbols), the JVM encodes it as **1 byte per character**.
- If any character requires Unicode (such as emojis or Telugu/Japanese scripts), the coder switches to UTF-16 (**2 bytes per character**).
This automatic internal optimization reduced overall JVM heap footprint by 15% to 30% across real-world enterprise applications with zero code changes!`
      },
      {
        heading: '6. String Indexing, length(), and charAt()',
        content: `Strings in Java use **0-based indexing**. The first character is located at index <code>0</code>, and the last character is at index <code>length() - 1</code>.

\`\`\`
 String:   "J   a   v   a"
 Index:     0   1   2   3   (length = 4)
\`\`\`

- **<code>length()</code>:** Returns the total number of characters in the string. (Notice the parentheses <code>()</code>, unlike arrays which use the property <code>.length</code>).
- **<code>charAt(int index)</code>:** Returns the <code>char</code> at the specified index.
- **Bounds Rule:** If you provide an index <code>&lt; 0</code> or <code>&gt;= length()</code>, Java throws a **<code>StringIndexOutOfBoundsException</code>** at runtime.`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        System.out.println("=== 1. String Literals vs new String() ===");
        String s1 = "Java";
        String s2 = "Java";
        String s3 = new String("Java");
        String s4 = s3.intern(); // Get reference from SCP

        // Reference equality checks (Address comparison)
        System.out.println("s1 == s2 (Both in SCP)       : " + (s1 == s2)); // true
        System.out.println("s1 == s3 (SCP vs Heap)       : " + (s1 == s3)); // false
        System.out.println("s1 == s4 (SCP vs intern())   : " + (s1 == s4)); // true

        // Content equality checks
        System.out.println("s1.equals(s3) (Content)      : " + s1.equals(s3)); // true

        System.out.println("\n=== 2. Proof of String Immutability ===");
        String original = "Hello";
        original.concat(" World"); // Return value discarded!
        System.out.println("Original after concat()      : " + original); // "Hello"

        original = original.concat(" World"); // Explicit reassignment
        System.out.println("Original after reassignment  : " + original); // "Hello World"

        System.out.println("\n=== 3. String Indexing & Traversal ===");
        String greeting = "Java 21";
        System.out.println("String text                  : \"" + greeting + "\"");
        System.out.println("Total Length                 : " + greeting.length());
        System.out.println("Character at index 0         : " + greeting.charAt(0));
        System.out.println("Character at index 5         : " + greeting.charAt(5));
        System.out.println("Last Character               : " + greeting.charAt(greeting.length() - 1));

        System.out.print("Iterating characters via loop: ");
        for (int i = 0; i < greeting.length(); i++) {
            System.out.print("[" + i + "]=" + greeting.charAt(i) + " ");
        }
        System.out.println();
    }
}`,
    output: `=== 1. String Literals vs new String() ===
s1 == s2 (Both in SCP)       : true
s1 == s3 (SCP vs Heap)       : false
s1 == s4 (SCP vs intern())   : true
s1.equals(s3) (Content)      : true

=== 2. Proof of String Immutability ===
Original after concat()      : Hello
Original after reassignment  : Hello World

=== 3. String Indexing & Traversal ===
String text                  : "Java 21"
Total Length                 : 7
Character at index 0         : J
Character at index 5         : 2
Last Character               : 1
Iterating characters via loop: [0]=J [1]=a [2]=v [3]=a [4]=  [5]=2 [6]=1`,
    lineByLine: [
      {
        line: 'String s1 = "Java"; String s2 = "Java";',
        explanation: 'Creates a single "Java" literal in the String Constant Pool (SCP). Both s1 and s2 point to the identical memory address.'
      },
      {
        line: 'String s3 = new String("Java");',
        explanation: 'Explicitly allocates a new distinct String object in Heap memory, separate from the SCP pool.'
      },
      {
        line: 'String s4 = s3.intern();',
        explanation: 'Calls intern() to retrieve the canonical pooled string from the SCP, making s4 point to the exact same reference as s1.'
      },
      {
        line: 'original.concat(" World");',
        explanation: 'Demonstrates immutability: concat() generates a new string "Hello World" in memory, but leaves the "original" variable pointing to "Hello".'
      },
      {
        line: 'greeting.charAt(i);',
        explanation: 'Retrieves the character at index i (0 to length - 1) in constant O(1) time.'
      }
    ],
    practicalExample: `public class PracticalApplication {
    public static void main(String[] args) {
        // Industry Simulation: High-throughput memory deduplication via interning
        String rawCategory1 = new String("ELECTRONICS");
        String rawCategory2 = new String("ELECTRONICS");
        String rawCategory3 = new String("ELECTRONICS");

        // Without interning: 3 distinct heap objects consuming unnecessary RAM
        System.out.println("Before Interning:");
        System.out.println("Obj 1 == Obj 2 : " + (rawCategory1 == rawCategory2)); // false

        // With interning: all references point to single pooled constant
        String pooled1 = rawCategory1.intern();
        String pooled2 = rawCategory2.intern();
        String pooled3 = rawCategory3.intern();

        System.out.println("\nAfter Interning (Memory Deduplication):");
        System.out.println("Pooled 1 == Pooled 2 : " + (pooled1 == pooled2)); // true
        System.out.println("Pooled 2 == Pooled 3 : " + (pooled2 == pooled3)); // true
        System.out.println("Canonical Category   : " + pooled1);
    }
}`,
    practicalOutput: `Before Interning:
Obj 1 == Obj 2 : false

After Interning (Memory Deduplication):
Pooled 1 == Pooled 2 : true
Pooled 2 == Pooled 3 : true
Canonical Category   : ELECTRONICS`,
    commonMistakes: [
      'Using == to check if two strings have the same text content. == checks memory addresses; always use .equals().',
      'Forgetting that strings are immutable and writing str.toUpperCase(); without assigning the result back (str = str.toUpperCase();).',
      'Accessing str.charAt(str.length()) instead of str.charAt(str.length() - 1), causing StringIndexOutOfBoundsException.',
      'Confusing String.length() (a method with parentheses) with Array.length (a property without parentheses).'
    ],
    challenge: `// Coding Challenge:
// Given a string "DEVELOPER", write a program to:
// 1. Print the first character and the last character.
// 2. Print the character at the exact middle index.
// 3. Print the string in reverse order using a for loop and charAt().

public class Challenge {
    public static void main(String[] args) {
        String word = "DEVELOPER";
        
        System.out.println("First: " + word.charAt(0));
        System.out.println("Last: " + word.charAt(word.length() - 1));
        System.out.println("Middle: " + word.charAt(word.length() / 2));
        
        System.out.print("Reversed: ");
        for (int i = word.length() - 1; i >= 0; i--) {
            System.out.print(word.charAt(i));
        }
        System.out.println();
    }
}`,
    faq: [
      {
        q: 'Where is the String Constant Pool (SCP) located in modern JVMs?',
        a: 'Prior to Java 7, the SCP was located in the PermGen space. Since Java 7 and continuing in Java 8-21+, the SCP is located inside the main Heap Memory, allowing it to be garbage collected when strings are no longer referenced.'
      },
      {
        q: 'Why does String have a private final byte[] value instead of char[] in Java 9+?',
        a: 'To implement Compact Strings (JEP 254). Most enterprise strings contain only Latin-1 characters which require only 1 byte (8 bits) per character instead of 2 bytes (16 bits) in UTF-16, cutting overall string memory usage by nearly 50%.'
      },
      {
        q: 'How many objects are created by String s = new String("Java");?',
        a: 'Two objects: One object is created in the String Constant Pool (SCP) for the literal "Java" (if not already present), and one new object is created in the general Heap memory referenced by s.'
      }
    ],
    recap: [
      'A String in Java is an immutable reference type representing a sequence of Unicode characters.',
      'String literals are automatically cached in the String Constant Pool (SCP) inside Heap memory.',
      'new String("text") forces the creation of a distinct heap object outside the pool.',
      'Immutability ensures thread safety, security, SCP reusability, and fast cached hashCode() lookups.',
      'Compact Strings in Java 9+ use byte[] with a coder byte to dynamically save 50% memory on Latin-1 text.',
      'Strings are 0-indexed; use length() for character count and charAt(index) for character retrieval.'
    ]
  },

  // =========================================================================
  // CHAPTER 24: String Methods: Search, Extraction & Transformation
  // =========================================================================
  {
    num: 24,
    phaseId: 'phase6',
    phaseTitle: 'Phase 6: Strings & Text Processing',
    slug: '24-java-string-methods-search-extraction-and-manipulation',
    title: 'Java String Methods: Search, Extraction & Transformation',
    badge: '24. String Methods Masterclass',
    subtopics: 'length() · toUpperCase() · toLowerCase() · trim() & strip() · contains() · startsWith() & endsWith() · indexOf() & lastIndexOf() · substring() · replace() & replaceAll() · split() & join() · repeat()',
    readTime: '24 min read',
    intro: 'Mastering Java\'s comprehensive suite of built-in String methods: inspection and search operations (contains, startsWith, endsWith, indexOf), case and whitespace trimming (trim vs strip), precision substring slicing, pattern replacement (replace vs replaceAll), and tokenizing text with split() and String.join().',
    theorySections: [
      {
        heading: '1. Overview of Essential String Inspection Methods',
        content: `The <code>String</code> class provides dozens of utility methods for inspecting text without manual loop iterations:

<div class="ref-table-wrap">
  <table class="ref-table">
    <thead>
      <tr>
        <th>Method Signature</th>
        <th>Return Type</th>
        <th>Description & Purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>length()</code></td>
        <td><code>int</code></td>
        <td>Returns the total count of characters in the string.</td>
      </tr>
      <tr>
        <td><code>isEmpty()</code></td>
        <td><code>boolean</code></td>
        <td>Returns <code>true</code> if <code>length() == 0</code>.</td>
      </tr>
      <tr>
        <td><code>isBlank()</code> (Java 11+)</td>
        <td><code>boolean</code></td>
        <td>Returns <code>true</code> if empty or contains only whitespace characters (spaces, tabs, newlines).</td>
      </tr>
      <tr>
        <td><code>contains(CharSequence s)</code></td>
        <td><code>boolean</code></td>
        <td>Returns <code>true</code> if the exact substring sequence exists inside the string.</td>
      </tr>
      <tr>
        <td><code>startsWith(String prefix)</code></td>
        <td><code>boolean</code></td>
        <td>Checks if the string starts with the specified prefix.</td>
      </tr>
      <tr>
        <td><code>endsWith(String suffix)</code></td>
        <td><code>boolean</code></td>
        <td>Checks if the string ends with the specified suffix (e.g. <code>.pdf</code>, <code>.java</code>).</td>
      </tr>
      <tr>
        <td><code>indexOf(String str)</code></td>
        <td><code>int</code></td>
        <td>Returns the 0-based index of the <strong>first occurrence</strong> of <code>str</code>, or <code>-1</code> if not found.</td>
      </tr>
      <tr>
        <td><code>lastIndexOf(String str)</code></td>
        <td><code>int</code></td>
        <td>Returns the index of the <strong>last occurrence</strong> of <code>str</code>, or <code>-1</code> if not found.</td>
      </tr>
    </tbody>
  </table>
</div>`
      },
      {
        heading: '2. Case Transformation & Whitespace Cleaning (trim vs strip)',
        content: `Cleaning raw user inputs is one of the most common tasks in software engineering:

- **<code>toUpperCase()</code> / <code>toLowerCase()</code>:** Converts all characters to uppercase or lowercase.
- **<code>trim()</code> (Legacy):** Removes leading and trailing whitespace characters where ASCII code is <code>&lt;= 'U+0020'</code>.
- **<code>strip()</code> (Java 11+ Recommended):** Unicode-aware whitespace removal. It strips all standard ASCII spaces as well as advanced Unicode whitespace characters (such as non-breaking spaces <code>\\u00A0</code>, mathematical spaces).
- **<code>stripLeading()</code> & <code>stripTrailing()</code> (Java 11+):** Removes whitespace exclusively from the beginning or end of the string.`
      },
      {
        heading: '3. Precision Slicing: substring() Mechanics',
        content: `The <code>substring()</code> method extracts a portion of a string based on index boundaries:

1. **<code>substring(int beginIndex)</code>:** Extracts from <code>beginIndex</code> all the way to the end of the string.
\`\`\`java
String lang = "Java Programming";
String sub = lang.substring(5); // "Programming" (from index 5 to end)
\`\`\`

2. **<code>substring(int beginIndex, int endIndex)</code>:** Extracts a **half-open range**: [beginIndex, endIndex).
- It **INCLUDES** the character at <code>beginIndex</code>.
- It **EXCLUDES** the character at <code>endIndex</code>.
- Formula for length of extracted slice: Length = endIndex - beginIndex.

\`\`\`
 String:  "J  a  v  a     P  r  o  g  r  a  m"
 Index:    0  1  2  3  4  5  6  7  8  9  10 11
           [----------)
           begin=0, end=4 ===> "Java" (indices 0, 1, 2, 3)
\`\`\``
      },
      {
        heading: '4. Text Replacement: replace() vs replaceAll()',
        content: `Java provides three distinct replacement methods:

1. **<code>replace(CharSequence target, CharSequence replacement)</code>:**
Replaces **all exact literal occurrences** of the target character or string. It does NOT use regular expressions.
\`\`\`java
String text = "cat and dog and cat";
String result = text.replace("cat", "bird"); // "bird and dog and bird"
\`\`\`

2. **<code>replaceAll(String regex, String replacement)</code>:**
Treats the first argument as a **Regular Expression (Regex)** pattern!
\`\`\`java
String messy = "User123 logged in at 09:45 AM";
// Remove all numbers using regex '\\d+'
String clean = messy.replaceAll("\\\\d+", "#"); // "User# logged in at #:# AM"
\`\`\`

3. **<code>replaceFirst(String regex, String replacement)</code>:**
Replaces only the first regex match in the string.`
      },
      {
        heading: '5. Splitting and Joining Strings (split() & String.join())',
        content: `Converting between delimited text (CSVs, URLs, sentences) and arrays is a fundamental skill:

- **<code>split(String regex)</code>:** Breaks a string into a <code>String[]</code> array based on a delimiter regex pattern.
\`\`\`java
String csv = "apple,banana,cherry,dates";
String[] fruits = csv.split(","); // ["apple", "banana", "cherry", "dates"]
\`\`\`

- **<code>String.join(CharSequence delimiter, CharSequence... elements)</code>:** Joins multiple elements or collections into a single string separated by the delimiter.
\`\`\`java
String joined = String.join(" | ", "HTML", "CSS", "Java", "SQL");
// Result: "HTML | CSS | Java | SQL"
\`\`\``
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        String language = "Java Programming";

        System.out.println("=== Core User Snippet Demo ===");
        System.out.println("Length                : " + language.length());
        System.out.println("Uppercase             : " + language.toUpperCase());
        System.out.println("Contains 'Java'       : " + language.contains("Java"));
        System.out.println("Substring(0, 4)       : " + language.substring(0, 4));

        System.out.println("\n=== Search & Position Inspection ===");
        System.out.println("Starts with 'Java'    : " + language.startsWith("Java"));
        System.out.println("Ends with 'ing'       : " + language.endsWith("ing"));
        System.out.println("Index of 'Prog'       : " + language.indexOf("Prog"));
        System.out.println("Index of 'a' (First)  : " + language.indexOf('a'));
        System.out.println("Index of 'a' (Last)   : " + language.lastIndexOf('a'));
        System.out.println("Index of 'Python'     : " + language.indexOf("Python")); // -1

        System.out.println("\n=== Whitespace Trimming & Cleaning ===");
        String messyInput = "   \\t  Admin User  \\n  ";
        System.out.println("Raw Input             : [" + messyInput + "]");
        System.out.println("trim()                : [" + messyInput.trim() + "]");
        System.out.println("strip() (Java 11+)    : [" + messyInput.strip() + "]");

        System.out.println("\n=== Replacement & Slicing ===");
        String sentence = "Java is slow. Java is old.";
        String updated = sentence.replace("slow", "fast").replace("old", "modern");
        System.out.println("Replaced text         : " + updated);

        System.out.println("\n=== Splitting & Joining ===");
        String technologies = "Java,Spring Boot,PostgreSQL,Docker,Kubernetes";
        String[] techArray = technologies.split(",");
        for (int i = 0; i < techArray.length; i++) {
            System.out.println("  Tech [" + (i + 1) + "]: " + techArray[i]);
        }

        String formattedBadge = String.join(" -> ", techArray);
        System.out.println("Pipeline              : " + formattedBadge);
    }
}`,
    output: `=== Core User Snippet Demo ===
Length                : 16
Uppercase             : JAVA PROGRAMMING
Contains 'Java'       : true
Substring(0, 4)       : Java

=== Search & Position Inspection ===
Starts with 'Java'    : true
Ends with 'ing'       : true
Index of 'Prog'       : 5
Index of 'a' (First)  : 1
Index of 'a' (Last)   : 10
Index of 'Python'     : -1

=== Whitespace Trimming & Cleaning ===
Raw Input             : [   	  Admin User  
  ]
trim()                : [Admin User]
strip() (Java 11+)    : [Admin User]

=== Replacement & Slicing ===
Replaced text         : Java is fast. Java is modern.

=== Splitting & Joining ===
  Tech [1]: Java
  Tech [2]: Spring Boot
  Tech [3]: PostgreSQL
  Tech [4]: Docker
  Tech [5]: Kubernetes
Pipeline              : Java -> Spring Boot -> PostgreSQL -> Docker -> Kubernetes`,
    lineByLine: [
      {
        line: 'language.substring(0, 4);',
        explanation: 'Extracts characters from index 0 up to (but not including) index 4, returning "Java".'
      },
      {
        line: 'language.contains("Java");',
        explanation: 'Scans the character sequence and returns true if the exact substring "Java" is found.'
      },
      {
        line: 'language.indexOf("Prog");',
        explanation: 'Returns 5, which is the starting 0-based index where the substring "Prog" begins.'
      },
      {
        line: 'messyInput.strip();',
        explanation: 'Removes all leading and trailing ASCII and Unicode whitespace characters cleanly.'
      },
      {
        line: 'technologies.split(",");',
        explanation: 'Splits the comma-delimited string into an array of 5 distinct String elements.'
      },
      {
        line: 'String.join(" -> ", techArray);',
        explanation: 'Assembles array elements into a single formatted string delimited by " -> ".'
      }
    ],
    practicalExample: `public class PracticalApplication {
    public static void main(String[] args) {
        // Industry Simulation: Sanitizing and Parsing User Log Records
        String logEntry = "   2026-08-16 | AUTH_SUCCESS | user_id=90412 | ip=192.168.1.45   ";

        String cleanLog = logEntry.strip();
        String[] fields = cleanLog.split("\\\\s*\\\\|\\\\s*");
        String timestamp = fields[0];
        String eventType = fields[1];
        String userIdData = fields[2];
        String ipAddress = fields[3];

        String userId = userIdData.substring(userIdData.indexOf('=') + 1);

        System.out.println("=== Security Audit Record Parsed ===");
        System.out.println("Timestamp  : " + timestamp);
        System.out.println("Event Type : " + eventType);
        System.out.println("User ID    : " + userId);
        System.out.println("IP Address : " + ipAddress);
        System.out.println("Is Auth Evt: " + eventType.startsWith("AUTH"));
    }
}`,
    practicalOutput: `=== Security Audit Record Parsed ===
Timestamp  : 2026-08-16
Event Type : AUTH_SUCCESS
User ID    : 90412
IP Address : ip=192.168.1.45
Is Auth Evt: true`,
    commonMistakes: [
      'Confusing indexOf() return value: if a character is not found, it returns -1, NOT 0. Always check if (idx != -1).',
      'Forgetting that substring(0, 4) excludes index 4 (extracts indices 0, 1, 2, 3).',
      'Using split(".") without escaping. Because . is a regex wildcard matching any character, split("\\\\.") must be used.',
      'Calling trim() or toUpperCase() on a null string reference, which throws a NullPointerException.'
    ],
    challenge: `// Coding Challenge:
// Given a full email address "alex.developer@company.org":
// 1. Extract the username before the '@' symbol.
// 2. Extract the domain name after the '@' symbol.
// 3. Check if the email ends with ".org" or ".com".
// 4. Replace all '.' in the username with spaces and convert to Title Case.

public class Challenge {
    public static void main(String[] args) {
        String email = "alex.developer@company.org";
        
        int atIndex = email.indexOf('@');
        String username = email.substring(0, atIndex);
        String domain = email.substring(atIndex + 1);
        
        System.out.println("Username   : " + username);
        System.out.println("Domain     : " + domain);
        System.out.println("Is Valid Ext: " + (domain.endsWith(".org") || domain.endsWith(".com")));
        System.out.println("Display Name: " + username.replace('.', ' ').toUpperCase());
    }
}`,
    faq: [
      {
        q: 'What is the difference between isEmpty() and isBlank()?',
        a: 'isEmpty() returns true only if length() == 0 (e.g. ""). isBlank() (introduced in Java 11) returns true if the string is empty OR contains only whitespace characters (e.g. "   ", "\\t\\n").'
      },
      {
        q: 'Why should I prefer strip() over trim() in modern Java?',
        a: 'trim() only removes characters with ASCII values <= 32. strip() is Unicode-compliant and recognizes all international whitespace code points defined in the Unicode standard.'
      },
      {
        q: 'What is the difference between replace() and replaceAll()?',
        a: 'replace() performs literal string replacements without regex compilation overhead. replaceAll() compiles the first parameter into a java.util.regex.Pattern, allowing complex pattern matching.'
      }
    ],
    recap: [
      'length() returns the number of characters; charAt(i) retrieves a single character at index i.',
      'contains(), startsWith(), and endsWith() inspect substrings with intuitive boolean returns.',
      'indexOf() and lastIndexOf() return the 0-based position or -1 if not found.',
      'substring(begin, end) extracts a half-open range [begin, end).',
      'strip() (Java 11+) removes Unicode-aware whitespace cleanly.',
      'split() breaks text into arrays via regex delimiters, and String.join() joins them back.'
    ]
  },

  // =========================================================================
  // CHAPTER 25: String Comparison & Equality (== vs equals)
  // =========================================================================
  {
    num: 25,
    phaseId: 'phase6',
    phaseTitle: 'Phase 6: Strings & Text Processing',
    slug: '25-java-string-comparison-and-equality',
    title: 'Java String Comparison: == vs equals(), compareTo() & Hashing',
    badge: '25. String Equality & Comparison',
    subtopics: '== vs equals() · Reference Equality vs Content Equality · equalsIgnoreCase() · compareTo() & Lexicographical Ordering · Null-Safe Comparison Patterns · String HashCode Caching',
    readTime: '20 min read',
    intro: 'Mastering string equality in Java: understanding the critical architectural difference between the == reference identity operator and the .equals() content comparison method, case-insensitive comparison, lexicographical sorting with compareTo(), writing null-safe comparison expressions, and understanding String hashCode caching.',
    theorySections: [
      {
        heading: '1. The Golden Rule: == vs equals() in Java',
        content: `One of the most frequent sources of bugs in Java is confusing **reference equality (<code>==</code>)** with **value equality (<code>.equals()</code>)**:

1. **The <code>==</code> Operator (Reference / Address Comparison):**
The <code>==</code> operator checks if two reference variables point to the **exact same memory address in RAM**. It does NOT inspect the characters inside the string!

2. **The <code>.equals()</code> Method (Character Content Comparison):**
The <code>.equals()</code> method is overridden in the <code>String</code> class to inspect and compare the **actual character sequence** character-by-character.

\`\`\`
  String a = "hello";                  String b = "hello";
      |                                    |
      +-------------> [ 0x1000: "hello" ] <+  ===> (a == b) is TRUE (Both share SCP address)

  String c = new String("hello");
      |
      +-------------> [ 0x9500: "hello" ]     ===> (a == c) is FALSE (Different addresses!)
                                              ===> a.equals(c) is TRUE (Identical characters!)
\`\`\``
      },
      {
        heading: '2. Case-Insensitive Comparison: equalsIgnoreCase()',
        content: `When comparing user inputs like login usernames, promo codes, or command-line flags, casing differences should often be ignored:

- **<code>equals("admin")</code>:** <code>"ADMIN".equals("admin")</code> returns <code>false</code>.
- **<code>equalsIgnoreCase("admin")</code>:** <code>"ADMIN".equalsIgnoreCase("admin")</code> returns <code>true</code>.

Under the hood, <code>equalsIgnoreCase()</code> compares characters by first converting them to uppercase and then to lowercase if necessary, handling Unicode casing rules correctly without creating new temporary string objects in memory.`
      },
      {
        heading: '3. Lexicographical Comparison: compareTo()',
        content: `When sorting strings alphabetically (in dictionaries, phonebooks, or database indexes), you need to know which string comes first. The **<code>compareTo(String other)</code>** method implements the <code>Comparable&lt;String&gt;</code> interface:

<div class="ref-table-wrap">
  <table class="ref-table">
    <thead>
      <tr>
        <th>Return Value</th>
        <th>Meaning</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>&lt; 0</code> (Negative integer)</td>
        <td>The current string comes <strong>before</strong> <code>other</code> alphabetically.</td>
        <td><code>"Apple".compareTo("Banana")</code> returns <code>-1</code></td>
      </tr>
      <tr>
        <td><code>0</code> (Zero)</td>
        <td>Both strings are <strong>identical</strong> in content (<code>equals() == true</code>).</td>
        <td><code>"Java".compareTo("Java")</code> returns <code>0</code></td>
      </tr>
      <tr>
        <td><code>&gt; 0</code> (Positive integer)</td>
        <td>The current string comes <strong>after</strong> <code>other</code> alphabetically.</td>
        <td><code>"Zebra".compareTo("Apple")</code> returns <code>25</code></td>
      </tr>
    </tbody>
  </table>
</div>

The return value is the mathematical difference between the first mismatched ASCII/Unicode code points:
Result = char1 - char2.
For case-insensitive sorting, use **<code>compareToIgnoreCase()</code>**.`
      },
      {
        heading: '4. Null-Safe String Comparison (The "Yoda Condition" Pattern)',
        content: `In Java, calling any method on a <code>null</code> reference triggers a fatal **<code>NullPointerException</code> (NPE)**.

\`\`\`java
String userRole = null; // Might come from an optional database column or request

// DANGEROUS (Throws NullPointerException if userRole is null):
if (userRole.equals("ADMIN")) { ... }

// SAFE PATTERN 1: Put the known non-null literal on the LEFT (Yoda Pattern)
if ("ADMIN".equals(userRole)) { // Evaluates safely to false without NPE!
    ...
}

// SAFE PATTERN 2: Use Objects.equals() (Java 7+)
if (java.util.Objects.equals(userRole, "ADMIN")) {
    ...
}
\`\`\``
      },
      {
        heading: '5. String Hashing & the hashCode() Contract',
        content: `Because strings are immutable, Java calculates a string's **32-bit hash code** using a deterministic polynomial algorithm:
s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
- The prime multiplier **31** is chosen because 31 * i can be optimized by the JVM compiler into a fast bit-shift: <code>(i &lt;&lt; 5) - i</code>.
- If <code>s1.equals(s2)</code> is <code>true</code>, their <code>hashCode()</code> values are **guaranteed to be identical**.
- The <code>String</code> class caches this calculated hash in a private field <code>private int hash;</code>, so subsequent calls to <code>hashCode()</code> are instantaneous O(1) operations.`
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        System.out.println("=== 1. == vs equals() In-Depth ===");
        String literal1 = "Hello";
        String literal2 = "Hello";
        String heapObj1 = new String("Hello");
        String heapObj2 = new String("Hello");

        System.out.println("literal1 == literal2 (Both SCP) : " + (literal1 == literal2)); // true
        System.out.println("literal1 == heapObj1 (SCP vs Heap): " + (literal1 == heapObj1)); // false
        System.out.println("heapObj1 == heapObj2 (Two Heaps)  : " + (heapObj1 == heapObj2)); // false
        System.out.println("heapObj1.equals(heapObj2)         : " + heapObj1.equals(heapObj2)); // true

        System.out.println("\n=== 2. Case Insensitivity ===");
        String roleInput = "admin";
        System.out.println("equals('ADMIN')                   : " + roleInput.equals("ADMIN")); // false
        System.out.println("equalsIgnoreCase('ADMIN')          : " + roleInput.equalsIgnoreCase("ADMIN")); // true

        System.out.println("\n=== 3. Lexicographical compareTo() ===");
        String fruitA = "Apple";
        String fruitB = "Banana";
        String fruitC = "Apple";

        System.out.println("'Apple' compareTo 'Banana'        : " + fruitA.compareTo(fruitB)); // Negative (-1)
        System.out.println("'Banana' compareTo 'Apple'        : " + fruitB.compareTo(fruitA)); // Positive (1)
        System.out.println("'Apple' compareTo 'Apple'         : " + fruitA.compareTo(fruitC)); // 0

        System.out.println("\n=== 4. Null-Safe Comparison ===");
        String nullableRole = null;
        System.out.println("'ADMIN'.equals(nullRole) (Safe)   : " + "ADMIN".equals(nullableRole)); // false
        System.out.println("Objects.equals(nullRole, 'ADMIN') : " + java.util.Objects.equals(nullableRole, "ADMIN")); // false

        System.out.println("\n=== 5. String HashCode Caching ===");
        System.out.println("HashCode of 'Hello'               : " + literal1.hashCode());
        System.out.println("HashCode of heapObj1              : " + heapObj1.hashCode()); // Identical!
    }
}`,
    output: `=== 1. == vs equals() In-Depth ===
literal1 == literal2 (Both SCP) : true
literal1 == heapObj1 (SCP vs Heap): false
heapObj1 == heapObj2 (Two Heaps)  : false
heapObj1.equals(heapObj2)         : true

=== 2. Case Insensitivity ===
equals('ADMIN')                   : false
equalsIgnoreCase('ADMIN')          : true

=== 3. Lexicographical compareTo() ===
'Apple' compareTo 'Banana'        : -1
'Banana' compareTo 'Apple'        : 1
'Apple' compareTo 'Apple'         : 0

=== 4. Null-Safe Comparison ===
'ADMIN'.equals(nullRole) (Safe)   : false
Objects.equals(nullRole, 'ADMIN') : false

=== 5. String HashCode Caching ===
HashCode of 'Hello'               : 69609650
HashCode of heapObj1              : 69609650`,
    lineByLine: [
      {
        line: 'literal1 == literal2',
        explanation: 'Returns true because both variables hold the reference to the single pooled SCP instance.'
      },
      {
        line: 'literal1 == heapObj1',
        explanation: 'Returns false because literal1 points to SCP while heapObj1 points to a distinct Heap memory address.'
      },
      {
        line: 'heapObj1.equals(heapObj2)',
        explanation: 'Returns true because the equals() method inspects character content ("Hello" == "Hello") regardless of address.'
      },
      {
        line: 'fruitA.compareTo(fruitB)',
        explanation: 'Compares ASCII values of "A" (65) and "B" (66), returning 65 - 66 = -1.'
      },
      {
        line: '"ADMIN".equals(nullableRole)',
        explanation: 'Demonstrates the Yoda comparison pattern: calling .equals() on the non-null string literal safely handles null parameters.'
      }
    ],
    practicalExample: `public class PracticalApplication {
    public static boolean hasAccess(String userRole, String requiredRole) {
        if (userRole == null || requiredRole == null) {
            return false;
        }
        return userRole.trim().equalsIgnoreCase(requiredRole.trim());
    }

    public static void main(String[] args) {
        String inputRole1 = "  SUPER_ADMIN  ";
        String inputRole2 = "super_admin";
        String inputRole3 = null;

        System.out.println("User 1 Access: " + hasAccess(inputRole1, "SUPER_ADMIN")); // true
        System.out.println("User 2 Access: " + hasAccess(inputRole2, "SUPER_ADMIN")); // true
        System.out.println("User 3 Access: " + hasAccess(inputRole3, "SUPER_ADMIN")); // false (Safe, no NPE)
    }
}`,
    practicalOutput: `User 1 Access: true
User 2 Access: true
User 3 Access: false`,
    commonMistakes: [
      'Using == to validate login credentials or user inputs (e.g. if (password == "secret")), causing authentication failures.',
      'Calling .equals() on potentially null variables without checking for null or using "CONSTANT".equals(var).',
      'Assuming compareTo() returns only -1, 0, or 1. It can return ANY negative or positive integer (e.g. -25, 32).',
      'Forgetting that equalsIgnoreCase() handles standard casing but may have locale-specific quirks with characters like the Turkish dotless "i".'
    ],
    challenge: `// Coding Challenge:
// Write a custom method isAlphabeticallySorted(String[] words) that:
// 1. Iterates through the array and uses compareTo() to check if words are in strictly ascending alphabetical order.
// 2. Returns true if sorted, false otherwise.

public class Challenge {
    public static boolean isAlphabeticallySorted(String[] words) {
        for (int i = 0; i < words.length - 1; i++) {
            if (words[i].compareTo(words[i + 1]) > 0) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        String[] list1 = {"Apple", "Banana", "Cherry", "Mango"};
        String[] list2 = {"Banana", "Apple", "Cherry"};

        System.out.println("List 1 Sorted: " + isAlphabeticallySorted(list1)); // true
        System.out.println("List 2 Sorted: " + isAlphabeticallySorted(list2)); // false
    }
}`,
    faq: [
      {
        q: 'Why does "a" == "a" return true while new String("a") == new String("a") returns false?',
        a: 'String literals "a" are stored in the String Constant Pool (SCP) and reused, so both point to the exact same reference. new String() explicitly allocates new memory objects on the general heap at different memory addresses.'
      },
      {
        q: 'What is the contract between equals() and hashCode() for Strings?',
        a: 'If s1.equals(s2) is true, their hashCode() must be identical. If s1.hashCode() == s2.hashCode(), s1.equals(s2) is not guaranteed to be true (hash collision), though collisions are rare.'
      },
      {
        q: 'How does compareTo() calculate its return value?',
        a: 'It compares characters at matching positions until it finds a difference, returning c1 - c2 (the difference between their Unicode values). If one string is a prefix of another, it returns this.length() - other.length().'
      }
    ],
    recap: [
      '== compares object references (memory addresses); .equals() compares character values.',
      'Always use .equals() or .equalsIgnoreCase() for comparing text in business logic.',
      'Place known string literals on the left ("ADMIN".equals(role)) to prevent NullPointerException.',
      'compareTo() returns negative, zero, or positive integers for lexicographical sorting.',
      'String caches its hashCode() in memory, making hash lookups in maps exceptionally fast.'
    ]
  },

  // =========================================================================
  // CHAPTER 26: StringBuilder, StringBuffer & String Formatting
  // =========================================================================
  {
    num: 26,
    phaseId: 'phase6',
    phaseTitle: 'Phase 6: Strings & Text Processing',
    slug: '26-java-stringbuilder-stringbuffer-and-formatting',
    title: 'Java StringBuilder, StringBuffer & String Formatting Masterclass',
    badge: '26. StringBuilder & Formatting',
    subtopics: 'The Concatenation Problem (O(N^2)) · StringBuilder Architecture & Capacity Growth · append() · insert() · delete() · reverse() · StringBuffer vs StringBuilder · String.format() & printf() · Text Blocks (""")',
    readTime: '24 min read',
    intro: 'Mastering high-performance mutable string manipulation and modern text formatting in Java: understanding why repeated String concatenation causes memory bottlenecks, the internal dynamic array architecture of StringBuilder, thread-safe StringBuffer, precision string formatting specifiers, and Java Text Blocks.',
    theorySections: [
      {
        heading: '1. The String Concatenation Problem in Loops',
        content: `Because <code>String</code> is immutable, every time you use the <code>+</code> operator to concatenate strings in a loop, Java creates a **brand-new String object and copies all previous characters**:

\`\`\`java
// HIGHLY INEFFICIENT ANTI-PATTERN:
String result = "";
for (int i = 0; i < 10000; i++) {
    result += i; // Allocates 10,000 temporary objects! Time complexity: O(N^2)
}
\`\`\`
For N = 100,000 iterations, standard string concatenation can take **over 15 seconds** and trigger massive Garbage Collection pauses.

**The Solution:** Use **<code>StringBuilder</code>**, which maintains a **mutable internal buffer** in memory. Appending to a <code>StringBuilder</code> runs in amortized **O(1) constant time** and takes **less than 5 milliseconds** for 100,000 iterations!`
      },
      {
        heading: '2. StringBuilder Architecture & Dynamic Capacity Growth',
        content: `A <code>StringBuilder</code> encapsulates a resizable character array:
- **Default Initial Capacity:** 16 characters.
- **Custom Capacity:** <code>new StringBuilder(100)</code> creates an initial buffer of 100 characters.
- **Growth Formula:** When the buffer fills up, it automatically reallocates a larger array using the formula:
New Capacity = (Old Capacity * 2) + 2

\`\`\`
  Initial Buffer (Capacity = 16):
  ['J']['a']['v']['a'][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]  (Length = 4)

  After Appending 20 more characters:
  New Capacity = (16 * 2) + 2 = 34
  ['J']['a']['v']['a'][' ']['2']['1']['.']['.']['.'][ ... ] (Length = 24)
\`\`\``
      },
      {
        heading: '3. Essential StringBuilder Methods',
        content: `<div class="ref-table-wrap">
  <table class="ref-table">
    <thead>
      <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>append(data)</code></td>
        <td>Appends any primitive or object to the end of the buffer.</td>
        <td><code>sb.append(" Java ").append(21);</code></td>
      </tr>
      <tr>
        <td><code>insert(int offset, data)</code></td>
        <td>Inserts data at the specified index, shifting remaining characters right.</td>
        <td><code>sb.insert(0, "START: ");</code></td>
      </tr>
      <tr>
        <td><code>delete(int start, int end)</code></td>
        <td>Removes characters in the range <code>[start, end)</code>.</td>
        <td><code>sb.delete(0, 7);</code></td>
      </tr>
      <tr>
        <td><code>deleteCharAt(int index)</code></td>
        <td>Deletes a single character at the specified index.</td>
        <td><code>sb.deleteCharAt(sb.length() - 1);</code></td>
      </tr>
      <tr>
        <td><code>reverse()</code></td>
        <td>Reverses the entire character sequence in-place.</td>
        <td><code>sb.reverse();</code></td>
      </tr>
      <tr>
        <td><code>setCharAt(int idx, char ch)</code></td>
        <td>Replaces a single character at the index without reallocating.</td>
        <td><code>sb.setCharAt(0, 'X');</code></td>
      </tr>
      <tr>
        <td><code>toString()</code></td>
        <td>Converts the mutable buffer into an immutable <code>String</code>.</td>
        <td><code>String finalStr = sb.toString();</code></td>
      </tr>
    </tbody>
  </table>
</div>`
      },
      {
        heading: '4. String vs StringBuilder vs StringBuffer Comparison',
        content: `<div class="ref-table-wrap">
  <table class="ref-table">
    <thead>
      <tr>
        <th>Feature</th>
        <th><code>String</code></th>
        <th><code>StringBuilder</code></th>
        <th><code>StringBuffer</code></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Mutability</strong></td>
        <td>Immutable (Cannot be changed)</td>
        <td>Mutable (Modifies in-place)</td>
        <td>Mutable (Modifies in-place)</td>
      </tr>
      <tr>
        <td><strong>Thread Safety</strong></td>
        <td>Thread-Safe (Immutable)</td>
        <td><strong>Not Thread-Safe</strong> (No locks)</td>
        <td><strong>Thread-Safe</strong> (Synchronized methods)</td>
      </tr>
      <tr>
        <td><strong>Performance</strong></td>
        <td>Slow for multiple concats (O(N^2))</td>
        <td><strong>Fastest</strong> (Single-threaded)</td>
        <td>Slower than StringBuilder (Lock overhead)</td>
      </tr>
      <tr>
        <td><strong>Storage</strong></td>
        <td>SCP or Heap</td>
        <td>Heap</td>
        <td>Heap</td>
      </tr>
      <tr>
        <td><strong>Introduced</strong></td>
        <td>Java 1.0</td>
        <td>Java 5</td>
        <td>Java 1.0 (Legacy)</td>
      </tr>
      <tr>
        <td><strong>Best Use Case</strong></td>
        <td>Constants, map keys, fixed strings</td>
        <td><strong>Loops, string construction</strong></td>
        <td>Multi-threaded shared buffers</td>
      </tr>
    </tbody>
  </table>
</div>`
      },
      {
        heading: '5. Professional String Formatting (String.format & printf)',
        content: `Java provides precision string formatting using format specifiers:

\`\`\`java
String message = String.format("Product: %-12s | Price: $%7.2f | Qty: %03d", "Laptop", 899.954, 5);
// Result: "Product: Laptop       | Price: $ 899.95 | Qty: 005"
\`\`\`

**Core Format Specifiers:**
- **<code>%s</code>**: String value
- **<code>%d</code>**: Decimal integer
- **<code>%f</code>**: Floating-point number (e.g. <code>%.2f</code> rounds to 2 decimal places)
- **<code>%c</code>**: Character
- **<code>%b</code>**: Boolean
- **<code>%n</code>**: Platform-independent newline
- **<code>%-15s</code>**: Left-align string with 15-character column width
- **<code>%05d</code>**: Zero-pad integer to 5 digits (e.g. <code>00042</code>)

**Modern Java 15+ Text Blocks (<code>"""</code>):**
\`\`\`java
String json = """
    {
        "course": "%s",
        "version": %d,
        "active": true
    }
    """.formatted("Java Masterclass", 21);
\`\`\``
      }
    ],
    codeExample: `public class Main {
    public static void main(String[] args) {
        System.out.println("=== 1. StringBuilder Core Operations ===");
        StringBuilder sb = new StringBuilder("Java");

        sb.append(" Programming").append(" 2026");
        System.out.println("After append()        : " + sb);

        sb.insert(0, "Modern ");
        System.out.println("After insert()        : " + sb);

        sb.setCharAt(0, 'm');
        System.out.println("After setCharAt()     : " + sb);

        sb.delete(0, 7); // Removes "modern "
        System.out.println("After delete()        : " + sb);

        StringBuilder pal = new StringBuilder("RADAR");
        System.out.println("Is RADAR Palindrome   : " + pal.toString().equals(pal.reverse().toString()));

        System.out.println("\n=== 2. StringBuilder Performance vs String + ===");
        long start = System.currentTimeMillis();
        StringBuilder fastBuilder = new StringBuilder();
        for (int i = 1; i <= 10000; i++) {
            fastBuilder.append(i);
        }
        long duration = System.currentTimeMillis() - start;
        System.out.println("StringBuilder 10k items built in: " + duration + " ms");
        System.out.println("Total Buffer Capacity           : " + fastBuilder.capacity());
        System.out.println("Total Length                    : " + fastBuilder.length());

        System.out.println("\n=== 3. Professional String Formatting ===");
        String item = "Mechanical Keyboard";
        double price = 129.998;
        int stock = 7;
        boolean inStock = true;

        String formattedRow = String.format("| %-22s | Price: $%7.2f | Stock: %03d | Available: %b |",
                item, price, stock, inStock);
        System.out.println(formattedRow);

        System.out.println("\n=== 4. Modern Java Text Block ===");
        String htmlTemplate = """
            <div class="user-card">
              <h3>%s</h3>
              <p>Status: <strong>%s</strong></p>
            </div>
            """.formatted("Balaji Rao", "Active Developer");
        System.out.println(htmlTemplate);
    }
}`,
    output: `=== 1. StringBuilder Core Operations ===
After append()        : Java Programming 2026
After insert()        : Modern Java Programming 2026
After setCharAt()     : modern Java Programming 2026
After delete()        : Java Programming 2026
Is RADAR Palindrome   : true

=== 2. StringBuilder Performance vs String + ===
StringBuilder 10k items built in: 2 ms
Total Buffer Capacity           : 39712
Total Length                    : 38890

=== 3. Professional String Formatting ===
| Mechanical Keyboard    | Price: $ 130.00 | Stock: 007 | Available: true |

=== 4. Modern Java Text Block ===
<div class="user-card">
  <h3>Balaji Rao</h3>
  <p>Status: <strong>Active Developer</strong></p>
</div>`,
    lineByLine: [
      {
        line: 'StringBuilder sb = new StringBuilder("Java");',
        explanation: 'Initializes a mutable character buffer preloaded with "Java" and initial capacity of 20 (16 + 4).'
      },
      {
        line: 'sb.append(" Programming").append(" 2026");',
        explanation: 'Chains multiple append() calls, modifying the buffer directly in O(1) time without allocating new objects.'
      },
      {
        line: 'pal.reverse();',
        explanation: 'Reverses the sequence in-place by swapping characters from ends toward the center.'
      },
      {
        line: 'String.format("| %-22s | Price: $%7.2f | ...")',
        explanation: 'Formats data into structured columnar text: %-22s left-aligns with 22 spaces; %.2f rounds to 2 decimals.'
      },
      {
        line: 'htmlTemplate.formatted(...)',
        explanation: 'Java 15+ instance method that applies format arguments directly to multiline text blocks.'
      }
    ],
    practicalExample: `public class PracticalApplication {
    public static void main(String[] args) {
        // Industry Simulation: High-Speed Invoice Line Item Generator
        String[] products = {"Cloud Server Hosting", "SSL Certificate", "Domain Registration", "Managed Database"};
        double[] prices = {149.50, 49.00, 14.99, 89.00};
        int[] quantities = {2, 1, 3, 1};

        StringBuilder invoice = new StringBuilder();
        invoice.append("========================================================\n");
        invoice.append(String.format(" %-24s | %-6s | %-9s | %-10s\n", "ITEM DESCRIPTION", "QTY", "UNIT", "TOTAL"));
        invoice.append("========================================================\n");

        double grandTotal = 0;
        for (int i = 0; i < products.length; i++) {
            double total = prices[i] * quantities[i];
            grandTotal += total;
            invoice.append(String.format(" %-24s | %-6d | $%7.2f | $%8.2f\n",
                    products[i], quantities[i], prices[i], total));
        }

        invoice.append("--------------------------------------------------------\n");
        invoice.append(String.format(" %-40s   $%8.2f\n", "GRAND TOTAL:", grandTotal));
        invoice.append("========================================================\n");

        System.out.println(invoice.toString());
    }
}`,
    practicalOutput: `========================================================
 ITEM DESCRIPTION         | QTY    | UNIT      | TOTAL     
========================================================
 Cloud Server Hosting     | 2      | $ 149.50 | $  299.00
 SSL Certificate          | 1      | $  49.00 | $   49.00
 Domain Registration      | 3      | $  14.99 | $   44.97
 Managed Database         | 1      | $  89.00 | $   89.00
--------------------------------------------------------
 GRAND TOTAL:                                 $  481.97
========================================================`,
    commonMistakes: [
      'Using String + inside loops containing hundreds of iterations, causing catastrophic memory overhead and slowdowns.',
      'Calling sb.equals(sb2) on two StringBuilder instances. StringBuilder does NOT override equals(), so it compares memory references! Use sb.toString().equals(sb2.toString()).',
      'Confusing StringBuilder with StringBuffer: in 99% of single-threaded code, StringBuilder is faster and should be preferred.',
      'Using %d format specifier for a double variable or %f for an int, causing IllegalFormatConversionException.'
    ],
    challenge: `// Coding Challenge:
// Write a program using StringBuilder to:
// 1. Take a sentence "Java is an amazing programming language".
// 2. Reverse each individual word in the sentence while maintaining original word order.
// Target Output: "avaJ si na gnizama gnimmargorp egaugnal"

public class Challenge {
    public static void main(String[] args) {
        String sentence = "Java is an amazing programming language";
        String[] words = sentence.split(" ");
        StringBuilder result = new StringBuilder();

        for (int i = 0; i < words.length; i++) {
            StringBuilder wordBuilder = new StringBuilder(words[i]);
            result.append(wordBuilder.reverse());
            if (i < words.length - 1) {
                result.append(" ");
            }
        }

        System.out.println("Original : " + sentence);
        System.out.println("Reversed : " + result.toString());
    }
}`,
    faq: [
      {
        q: 'When should I use StringBuilder vs StringBuffer?',
        a: 'Use StringBuilder in 99% of application code (loops, local variables, single-threaded methods) because it has no synchronization lock overhead. Use StringBuffer only when multiple threads write to the same shared buffer simultaneously.'
      },
      {
        q: 'Why does Java compiler convert simple String concatenation into StringBuilder?',
        a: 'For single-line statements like String s = a + b + c;, the compiler automatically optimizes it into new StringBuilder().append(a).append(b).append(c).toString(). However, inside loops, the compiler creates a new StringBuilder on every single iteration, which is why you must explicitly instantiate a single StringBuilder outside the loop.'
      },
      {
        q: 'What is the default initial capacity of StringBuilder and how does it grow?',
        a: 'Default initial capacity is 16 characters. When exceeded, it allocates a new array of size (oldCapacity * 2) + 2 and copies the characters across.'
      }
    ],
    recap: [
      'String concatenation with + in loops is O(N^2) and causes memory churn; use StringBuilder for O(N) efficiency.',
      'StringBuilder provides in-place mutable methods: append(), insert(), delete(), and reverse().',
      'StringBuffer is synchronized (thread-safe) but slower than StringBuilder.',
      'String.format() and printf() use specifiers like %-15s, %.2f, and %05d for precision formatting.',
      'Java Text Blocks (""") simplify multiline strings with automated indentation trimming.'
    ]
  },

  // =========================================================================
  // CHAPTER 27: Java Strings Capstone Projects (5 Real-World Applications)
  // =========================================================================
  {
    num: 27,
    phaseId: 'phase6',
    phaseTitle: 'Phase 6: Strings & Text Processing',
    slug: '27-java-strings-capstone-projects',
    title: 'Java Strings Capstone Projects: 5 Production-Grade Systems',
    badge: '27. Capstone Projects (5)',
    subtopics: 'Project 1: Palindrome Checker · Project 2: Word Counter & Text Stats · Project 3: Character & Frequency Analyzer · Project 4: Enterprise Username Validator · Project 5: Password Security & Entropy Evaluator',
    readTime: '30 min read',
    intro: 'Building 5 complete, real-world string processing projects in Java: dual-pointer palindrome verification with alphanumeric sanitization, a multi-metric word & sentence text statistics engine, an ASCII character frequency analyzer, an enterprise username validator with business rules, and an industrial-grade password strength and entropy evaluator.',
    theorySections: [
      {
        heading: '1. Architecture of the 5 Capstone Projects',
        content: `In this capstone chapter, we combine all string concepts from Phase 6 (Immutability, SCP, String Methods, Regular Expressions, String Equality, and StringBuilder) into 5 production-grade software modules:

1. **Project 1: Dual-Pointer Palindrome Checker:**
Validates whether a phrase reads identically backwards and forwards (e.g. *"A man, a plan, a canal: Panama"*), ignoring spaces, punctuation, and casing using an optimal O(N) two-pointer algorithm with zero memory allocation.

2. **Project 2: Word Counter & Text Statistics Engine:**
Analyzes text documents to report total words, character count (with/without spaces), unique word count, total sentences, and average word length.

3. **Project 3: Character & Frequency Distribution Analyzer:**
Scans text to categorize vowels, consonants, numbers, and special symbols, and builds an exact frequency histogram of characters.

4. **Project 4: Enterprise Username & Email Validator:**
Enforces strict corporate registration rules: length between 5-20 characters, alphanumeric with underscores, cannot start with a number, and blocks reserved administrative keywords (e.g. <code>admin</code>, <code>root</code>, <code>null</code>, <code>system</code>).

5. **Project 5: Advanced Password Strength & Security Evaluator:**
Calculates a 0-100 security score based on length (minimum 8, ideal 12+), uppercase/lowercase balance, numbers, special characters, and verifies against a blacklist of common weak passwords.`
      },
      {
        heading: '2. Optimal String Algorithms Mental Model',
        content: `\`\`\`
  Project 1: Two-Pointer Palindrome Algorithm:
  Left Pointer (i=0) -> [A] m a n a p l a n a c a n a l p a n a m [a] <- Right Pointer (j=len-1)
                         |                                       |
                         +----------------(Match!)---------------+
  Skip non-alphanumeric chars; move pointers inward until i >= j.

  Project 5: Password Security Scoring Formula:
  + Length >= 8 (+15 pts), Length >= 12 (+25 pts)
  + Uppercase (+15 pts), Lowercase (+15 pts)
  + Numbers (+15 pts), Special Symbols (+15 pts)
  - Common Blacklist / Sequential Repetition (-40 pts)
  ======================================================
  Score: 0-40 (Weak) | 41-70 (Moderate) | 71-100 (Strong)
\`\`\``
      }
    ],
    codeExample: `public class Main {
    // -------------------------------------------------------------
    // PROJECT 1: Dual-Pointer Palindrome Checker (O(N) Time, O(1) Space)
    // -------------------------------------------------------------
    public static boolean isPalindrome(String input) {
        if (input == null) return false;
        int left = 0;
        int right = input.length() - 1;

        while (left < right) {
            char lChar = input.charAt(left);
            char rChar = input.charAt(right);

            if (!Character.isLetterOrDigit(lChar)) {
                left++;
            } else if (!Character.isLetterOrDigit(rChar)) {
                right--;
            } else {
                if (Character.toLowerCase(lChar) != Character.toLowerCase(rChar)) {
                    return false;
                }
                left++;
                right--;
            }
        }
        return true;
    }

    // -------------------------------------------------------------
    // PROJECT 2: Word Counter & Text Statistics Engine
    // -------------------------------------------------------------
    public static void printTextStatistics(String text) {
        if (text == null || text.isBlank()) {
            System.out.println("Text is empty.");
            return;
        }

        String[] words = text.trim().split("\\\\s+");
        int totalCharsWithSpaces = text.length();
        int totalCharsNoSpaces = text.replace(" ", "").replace("\\n", "").replace("\\t", "").length();
        String[] sentences = text.split("[.!?]+");

        int totalWordLength = 0;
        String longestWord = "";
        for (String w : words) {
            String cleanWord = w.replaceAll("[^a-zA-Z0-9]", "");
            totalWordLength += cleanWord.length();
            if (cleanWord.length() > longestWord.length()) {
                longestWord = cleanWord;
            }
        }
        double avgWordLength = words.length > 0 ? (double) totalWordLength / words.length : 0;

        System.out.println("  Total Words           : " + words.length);
        System.out.println("  Total Characters (All): " + totalCharsWithSpaces);
        System.out.println("  Chars (Without Spaces): " + totalCharsNoSpaces);
        System.out.println("  Sentence Count        : " + sentences.length);
        System.out.println("  Longest Word          : " + longestWord + " (" + longestWord.length() + " chars)");
        System.out.printf("  Average Word Length   : %.2f chars%n", avgWordLength);
    }

    // -------------------------------------------------------------
    // PROJECT 3: Character Category & Frequency Counter
    // -------------------------------------------------------------
    public static void analyzeCharacterFrequencies(String text) {
        int vowels = 0, consonants = 0, digits = 0, special = 0, spaces = 0;
        int[] freq = new int[256]; // ASCII Frequency Table

        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            if (ch < 256) freq[ch]++;

            if (Character.isDigit(ch)) {
                digits++;
            } else if (Character.isWhitespace(ch)) {
                spaces++;
            } else if (Character.isLetter(ch)) {
                char lower = Character.toLowerCase(ch);
                if (lower == 'a' || lower == 'e' || lower == 'i' || lower == 'o' || lower == 'u') {
                    vowels++;
                } else {
                    consonants++;
                }
            } else {
                special++;
            }
        }

        System.out.println("  Vowels       : " + vowels);
        System.out.println("  Consonants   : " + consonants);
        System.out.println("  Digits (0-9) : " + digits);
        System.out.println("  Spaces       : " + spaces);
        System.out.println("  Special Chars: " + special);
    }

    // -------------------------------------------------------------
    // PROJECT 4: Enterprise Username Validator
    // -------------------------------------------------------------
    public static boolean validateUsername(String username) {
        if (username == null) return false;
        String clean = username.trim();

        // Rule 1: Length 5 to 20
        if (clean.length() < 5 || clean.length() > 20) return false;

        // Rule 2: Cannot start with a digit or underscore
        if (!Character.isLetter(clean.charAt(0))) return false;

        // Rule 3: Only alphanumeric + underscores
        if (!clean.matches("^[a-zA-Z0-9_]+$")) return false;

        // Rule 4: Reserved administrative blacklist
        String lower = clean.toLowerCase();
        String[] reserved = {"admin", "root", "system", "administrator", "null", "superuser"};
        for (String r : reserved) {
            if (lower.equals(r)) return false;
        }

        return true;
    }

    // -------------------------------------------------------------
    // PROJECT 5: Password Strength & Security Evaluator
    // -------------------------------------------------------------
    public static String evaluatePasswordStrength(String password) {
        if (password == null || password.length() < 6) return "CRITICAL: Too Short (Score: 0/100)";

        int score = 0;
        if (password.length() >= 8) score += 15;
        if (password.length() >= 12) score += 15;
        if (password.length() >= 16) score += 10;

        boolean hasUpper = false, hasLower = false, hasDigit = false, hasSpecial = false;
        for (char ch : password.toCharArray()) {
            if (Character.isUpperCase(ch)) hasUpper = true;
            else if (Character.isLowerCase(ch)) hasLower = true;
            else if (Character.isDigit(ch)) hasDigit = true;
            else hasSpecial = true;
        }

        if (hasUpper) score += 15;
        if (hasLower) score += 15;
        if (hasDigit) score += 15;
        if (hasSpecial) score += 15;

        // Blacklist check
        String[] commonWeak = {"password", "12345678", "qwerty", "admin123", "password123"};
        for (String weak : commonWeak) {
            if (password.toLowerCase().contains(weak)) {
                score = Math.max(0, score - 40);
            }
        }

        String rating = score >= 80 ? "STRONG 🟢" : (score >= 50 ? "MODERATE 🟡" : "WEAK 🔴");
        return String.format("%s (Score: %d/100)", rating, score);
    }

    public static void main(String[] args) {
        System.out.println("=== PROJECT 1: Palindrome Checker ===");
        String p1 = "A man, a plan, a canal: Panama";
        String p2 = "Java Programming";
        System.out.println("\"" + p1 + "\" -> " + isPalindrome(p1)); // true
        System.out.println("\"" + p2 + "\" -> " + isPalindrome(p2)); // false

        System.out.println("\n=== PROJECT 2: Word Counter & Text Statistics ===");
        String article = "Java is a powerful, multi-threaded programming language! It enables robust enterprise systems. Java 21 LTS is blazing fast.";
        printTextStatistics(article);

        System.out.println("\n=== PROJECT 3: Character & Frequency Analyzer ===");
        analyzeCharacterFrequencies("Java 21 LTS Released on Sep 2023! #1 Backend");

        System.out.println("\n=== PROJECT 4: Enterprise Username Validator ===");
        String[] testUsers = {"ravi_kumar", "admin", "99developer", "alex_dev_2026", "a"};
        for (String u : testUsers) {
            System.out.printf("Username: %-16s | Valid: %b%n", u, validateUsername(u));
        }

        System.out.println("\n=== PROJECT 5: Password Strength Evaluator ===");
        String[] testPasswords = {"pass", "password123", "Java2026", "J@v4_Str0ng_P@ssw0rd!#2026"};
        for (String pwd : testPasswords) {
            System.out.printf("Password: %-26s | %s%n", pwd, evaluatePasswordStrength(pwd));
        }
    }
}`,
    output: `=== PROJECT 1: Palindrome Checker ===
"A man, a plan, a canal: Panama" -> true
"Java Programming" -> false

=== PROJECT 2: Word Counter & Text Statistics ===
  Total Words           : 17
  Total Characters (All): 120
  Chars (Without Spaces): 104
  Sentence Count        : 3
  Longest Word          : multi-threaded (14 chars)
  Average Word Length   : 5.76 chars

=== PROJECT 3: Character & Frequency Analyzer ===
  Vowels       : 10
  Consonants   : 17
  Digits (0-9) : 7
  Spaces       : 7
  Special Chars: 3

=== PROJECT 4: Enterprise Username Validator ===
Username: ravi_kumar       | Valid: true
Username: admin            | Valid: false
Username: 99developer      | Valid: false
Username: alex_dev_2026    | Valid: true
Username: a                | Valid: false

=== PROJECT 5: Password Strength Evaluator ===
Password: pass                       | CRITICAL: Too Short (Score: 0/100)
Password: password123                | WEAK 🔴 (Score: 20/100)
Password: Java2026                   | MODERATE 🟡 (Score: 60/100)
Password: J@v4_Str0ng_P@ssw0rd!#2026 | STRONG 🟢 (Score: 100/100)`,
    lineByLine: [
      {
        line: 'isPalindrome(String input)',
        explanation: 'Uses a dual-pointer loop skipping non-alphanumeric characters with Character.isLetterOrDigit(), achieving O(N) time and O(1) space.'
      },
      {
        line: 'text.trim().split("\\\\s+");',
        explanation: 'Splits on one or more whitespace characters to extract words cleanly regardless of spacing.'
      },
      {
        line: 'clean.matches("^[a-zA-Z0-9_]+$");',
        explanation: 'Enforces that only English letters, digits, and underscores are present in the username.'
      },
      {
        line: 'evaluatePasswordStrength(String password)',
        explanation: 'Calculates an additive score across length tiers, 4 character categories, and deducts penalty points for dictionary passwords.'
      }
    ],
    practicalExample: `public class PracticalApplication {
    public static void main(String[] args) {
        // Industry Simulation: User Registration Validation Pipeline
        String candidateUser = "kavya_developer";
        String candidatePass = "K@vy4_Secur3_2026!";

        System.out.println("=== Security Registration Gate ===");
        boolean isUserOk = Main.validateUsername(candidateUser);
        String passResult = Main.evaluatePasswordStrength(candidatePass);

        System.out.println("Username Check : " + (isUserOk ? "ACCEPTED" : "REJECTED"));
        System.out.println("Password Check : " + passResult);

        if (isUserOk && passResult.contains("STRONG")) {
            System.out.println("STATUS         : Account Created Successfully ✅");
        } else {
            System.out.println("STATUS         : Registration Failed ❌");
        }
    }
}`,
    practicalOutput: `=== Security Registration Gate ===
Username Check : ACCEPTED
Password Check : STRONG 🟢 (Score: 100/100)
STATUS         : Account Created Successfully ✅`,
    commonMistakes: [
      'Using .split(" ") instead of .split("\\\\s+") for word counting, which creates empty tokens when multiple spaces exist.',
      'Checking passwords only for length without testing character complexity or blacklists.',
      'Reversing strings by creating multiple substrings inside a loop instead of using a two-pointer technique or StringBuilder.reverse().',
      'Forgetting that Character.isLetterOrDigit() handles international characters, which is essential for global applications.'
    ],
    challenge: `// Coding Challenge:
// Add a 6th method to the security suite:
// sanitizePhoneNumber(String phone) that:
// 1. Takes any messy phone format: "+1 (555) 234-5678", "555.234.5678", "555 234 5678".
// 2. Extracts only digits.
// 3. Formats it into standard international format: "+1-555-234-5678".

public class Challenge {
    public static String sanitizePhoneNumber(String phone) {
        String digits = phone.replaceAll("[^0-9]", "");
        if (digits.length() == 10) {
            digits = "1" + digits; // Default country code
        }
        if (digits.length() == 11) {
            return String.format("+%s-%s-%s-%s",
                digits.substring(0, 1),
                digits.substring(1, 4),
                digits.substring(4, 7),
                digits.substring(7, 11));
        }
        return "Invalid Phone Number";
    }

    public static void main(String[] args) {
        System.out.println(sanitizePhoneNumber("+1 (555) 234-5678"));
        System.out.println(sanitizePhoneNumber("555.234.5678"));
    }
}`,
    faq: [
      {
        q: 'Why is the two-pointer palindrome approach better than StringBuilder.reverse()?',
        a: 'The two-pointer approach operates in-place with O(1) auxiliary memory without allocating a new string or StringBuilder object, making it much faster for large text documents.'
      },
      {
        q: 'How does regex \\\\s+ work in split()?',
        a: '\\\\s matches any whitespace character (space, tab, newline), and + matches one or more consecutive occurrences, preventing empty strings when multiple spaces are used.'
      },
      {
        q: 'Why should password validation deduct points for blacklisted strings?',
        a: 'A 16-character password like "passwordpassword" passes length and character count checks but can be cracked in milliseconds by dictionary attacks.'
      }
    ],
    recap: [
      'Two-pointer algorithms enable memory-efficient in-place palindrome validation.',
      'Regex \\s+ and [^a-zA-Z0-9] allow robust tokenization and sanitization of user text.',
      'Character frequency analysis can be performed with fixed-size 256-element ASCII frequency tables in O(N) time.',
      'Username validation requires multi-stage checks: length, character classes, and reserved blacklist guards.',
      'Password strength evaluation requires multi-factor entropy scoring combining length, diversity, and dictionary attack defense.'
    ]
  }
];

const outputFile = path.join(__dirname, 'java_phase6_data.js');
const exportContent = 'module.exports = ' + JSON.stringify(phase6Data, null, 2) + ';\n';
fs.writeFileSync(outputFile, exportContent, 'utf8');
console.log('✅ Successfully wrote scratch/java_phase6_data.js via JSON serialization!');
