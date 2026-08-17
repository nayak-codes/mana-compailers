const fs = require('fs');
const path = require('path');

const phase7Data = [
  // =========================================================================
  // CHAPTER 28: Java Array Fundamentals & Memory Architecture
  // =========================================================================
  {
    num: 28,
    phaseId: 'phase7',
    phaseTitle: 'Phase 7: Arrays & Matrices',
    slug: '28-java-array-fundamentals-and-memory-model',
    title: 'Java Array Fundamentals, Memory Architecture & Traversal',
    badge: '28. Array Fundamentals & Memory',
    subtopics: 'Array ante enti? · Why Arrays are Needed · Stack vs Heap Memory Layout · Declaration & 3 Initialization Styles · Default JVM Values · 0-Based Indexing · .length Property · for vs Enhanced for-each Loop · ArrayIndexOutOfBoundsException',
    readTime: '22 min read',
    intro: 'Comprehensive masterclass on Java Arrays: understanding why arrays are foundational to data structures, how arrays allocate contiguous memory in the JVM Heap, the 3 styles of array initialization, default value rules, accessing and modifying elements via 0-based indexes, and safe traversal using standard and enhanced for-each loops.',
    theorySections: [
      {
        heading: '1. Array Ante Enti? (What is an Array in Java?)',
        content: `In computer programming, an **Array** is a fixed-size, indexed collection of elements belonging to the **same data type (homogeneous)** stored in **contiguous (continuous) memory locations** in the JVM Heap.

**Why are Arrays Needed? (The 100-Variable Problem):**
Suppose a college professor needs to store the exam marks of 100 students:
- Without arrays, you would have to declare 100 individual variables: <code>int mark1, mark2, mark3, ... mark100;</code>. Calculating the average would require writing a 100-variable sum expression!
- With an array, you declare a **single reference variable** holding all 100 values: <code>int[] marks = new int[100];</code> and process them with a 3-line loop!

\`\`\`
  Individual Variables (Scattered in Memory):
  [mark1: 85]      [mark2: 90]      [mark3: 78]      [mark4: 92]
  (Address 0x10)   (Address 0x44)   (Address 0x8A)   (Address 0x9F)

  Array Object (Contiguous Block in Heap):
  Index:     [ 0 ]   [ 1 ]   [ 2 ]   [ 3 ]
  Value:    |  85  |  90  |  78  |  92  |  (Single continuous block: Address 0x5000)
\`\`\``
      },
      {
        heading: '2. JVM Memory Architecture: How Arrays Live in Stack and Heap',
        content: `In Java, arrays are **first-class Objects** (instances of an internal dynamic class like <code>[I</code> for <code>int[]</code> or <code>[Ljava.lang.String;</code> for <code>String[]</code>):

1. **Stack Memory:** Stores the reference variable (e.g. <code>marks</code>) which holds the 64-bit or 32-bit memory address of the Heap object.
2. **Heap Memory:** Allocates the actual array container, consisting of:
   - **Object Header (12–16 bytes):** Mark Word (hash, GC metadata) + Klass Pointer.
   - **Length Field (4 bytes):** Stores the immutable size of the array (<code>.length</code>).
   - **Payload Data:** Contiguous block storing the elements.

\`\`\`
       STACK MEMORY                              HEAP MEMORY
  +--------------------+             +-----------------------------------+
  | marks = 0x5A2000   | ----------> | Object Header (12B) | Length = 4  |
  +--------------------+             +-----------------------------------+
                                     | [0]=85 | [1]=90 | [2]=78 | [3]=92 |
                                     +-----------------------------------+
\`\`\``
      },
      {
        heading: '3. Array Declaration & 3 Styles of Initialization',
        content: `Java offers flexible syntax for creating arrays:

1. **Declaration:**
\`\`\`java
int[] numbers; // Preferred Java convention (Type is clearly "int array")
int numbers[]; // Valid C/C++ legacy syntax (Discouraged in modern Java)
\`\`\`

2. **Style 1: Dynamic Allocation with Size (Default Values Filled):**
\`\`\`java
int[] scores = new int[5]; // Allocates space for 5 ints, initialized to 0
\`\`\`

3. **Style 2: Inline Initialization with Literal Values (Shortcut):**
\`\`\`java
int[] marks = {85, 90, 78, 92}; // Compiler infers size = 4
\`\`\`

4. **Style 3: Explicit new with Element Literals (Anonymous Array):**
\`\`\`java
int[] prices = new int[]{199, 299, 499}; // Useful when passing array directly to a method
\`\`\``
      },
      {
        heading: '4. Default Initialization Values in Java Arrays',
        content: `When an array is allocated using <code>new Type[size]</code>, the JVM automatically initializes every slot to its data type\'s default zero-value:

<div class="ref-table-wrap">
  <table class="ref-table">
    <thead>
      <tr>
        <th>Data Type</th>
        <th>Default Initial Value</th>
        <th>Example for <code>new Type[3]</code></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>byte</code>, <code>short</code>, <code>int</code>, <code>long</code></td>
        <td><code>0</code> / <code>0L</code></td>
        <td><code>[0, 0, 0]</code></td>
      </tr>
      <tr>
        <td><code>float</code>, <code>double</code></td>
        <td><code>0.0f</code> / <code>0.0d</code></td>
        <td><code>[0.0, 0.0, 0.0]</code></td>
      </tr>
      <tr>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td><code>[false, false, false]</code></td>
      </tr>
      <tr>
        <td><code>char</code></td>
        <td><code>'\\u0000'</code> (Null character, int value 0)</td>
        <td><code>['\\0', '\\0', '\\0']</code></td>
      </tr>
      <tr>
        <td><strong>Reference Types</strong> (<code>String</code>, <code>Object[]</code>)</td>
        <td><code>null</code></td>
        <td><code>[null, null, null]</code></td>
      </tr>
    </tbody>
  </table>
</div>`
      },
      {
        heading: '5. Array Indexing, Updating & The .length Property',
        content: `Every array in Java uses **0-based indexing**:
- **First Element:** <code>arr[0]</code>
- **Last Element:** <code>arr[arr.length - 1]</code>
- **Updating Value:** <code>arr[2] = 95;</code> replaces the value at index 2 in O(1) constant time.

**The \`.length\` Property:**
- The total capacity of an array is accessed via the read-only field <code>.length</code> (e.g. <code>marks.length</code>).
- **Rule:** Notice there are **NO parentheses** <code>()</code> on array length, unlike <code>String.length()</code> which is a method call!

**ArrayIndexOutOfBoundsException:**
If you attempt to access an index <code>&lt; 0</code> or <code>&gt;= arr.length</code>, the JVM halts execution with an <code>ArrayIndexOutOfBoundsException</code> to protect system memory safety.`
      },
      {
        heading: '6. Looping Through Arrays: Classic for vs Enhanced for-each',
        content: `Java provides two primary loop patterns for iterating through arrays:

1. **Classic Indexed for Loop (Full Control):**
Allows you to read, modify elements, traverse backwards, or skip steps.
\`\`\`java
for (int i = 0; i < marks.length; i++) {
    System.out.println("Student " + i + ": " + marks[i]);
}
\`\`\`

2. **Enhanced for Loop (for-each) (Read-Only / Clean):**
Introduced in Java 5 to eliminate index tracking and boundary off-by-one errors.
\`\`\`java
for (int mark : marks) {
    System.out.println("Mark: " + mark); // Cannot modify array elements directly!
}
\`\`\``
      }
    ],
    codeExample: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== 1. Array Declaration & Initialization ===");
        // Primary user requested snippet
        int[] marks = {85, 90, 78, 92};

        System.out.println("Array Length          : " + marks.length);
        System.out.println("First Element [0]     : " + marks[0]);
        System.out.println("Last Element [3]      : " + marks[marks.length - 1]);

        System.out.println("\n=== 2. Updating Array Elements ===");
        System.out.println("Original marks[2]     : " + marks[2]);
        marks[2] = 88; // Updating index 2
        System.out.println("Updated marks[2]      : " + marks[2]);

        System.out.println("\n=== 3. Sorting with Arrays.sort() ===");
        Arrays.sort(marks); // In-place ascending sort

        System.out.println("\n=== 4. Enhanced for-each Traversal ===");
        for (int mark : marks) {
            System.out.println("Mark: " + mark);
        }

        System.out.println("\n=== 5. Default Initialization Demonstration ===");
        int[] defaultInts = new int[3];
        boolean[] defaultBools = new boolean[3];
        String[] defaultStrings = new String[3];

        System.out.println("Default int[]         : " + Arrays.toString(defaultInts));
        System.out.println("Default boolean[]     : " + Arrays.toString(defaultBools));
        System.out.println("Default String[]      : " + Arrays.toString(defaultStrings));

        System.out.println("\n=== 6. Reverse Traversal via Classic for Loop ===");
        System.out.print("Marks in Descending   : ");
        for (int i = marks.length - 1; i >= 0; i--) {
            System.out.print(marks[i] + " ");
        }
        System.out.println();
    }
}`,
    output: `=== 1. Array Declaration & Initialization ===
Array Length          : 4
First Element [0]     : 85
Last Element [3]      : 92

=== 2. Updating Array Elements ===
Original marks[2]     : 78
Updated marks[2]      : 88

=== 3. Sorting with Arrays.sort() ===

=== 4. Enhanced for-each Traversal ===
Mark: 85
Mark: 88
Mark: 90
Mark: 92

=== 5. Default Initialization Demonstration ===
Default int[]         : [0, 0, 0]
Default boolean[]     : [false, false, false]
Default String[]      : [null, null, null]

=== 6. Reverse Traversal via Classic for Loop ===
Marks in Descending   : 92 90 88 85`,
    lineByLine: [
      {
        line: 'int[] marks = {85, 90, 78, 92};',
        explanation: 'Declares an integer array reference "marks" on the Stack and initializes a contiguous 4-element integer array in the Heap.'
      },
      {
        line: 'marks[2] = 88;',
        explanation: 'Directly writes value 88 to the 3rd slot (index 2) via direct O(1) memory offset calculation.'
      },
      {
        line: 'Arrays.sort(marks);',
        explanation: 'Sorts the primitive array in ascending order using Java\'s highly optimized Dual-Pivot Quicksort.'
      },
      {
        line: 'for (int mark : marks)',
        explanation: 'Iterates through each element sequentially from index 0 to length - 1 without manual index counter variables.'
      },
      {
        line: 'int[] defaultInts = new int[3];',
        explanation: 'Allocates a 3-element heap array where all integer elements are automatically initialized to default 0 by the JVM.'
      }
    ],
    practicalExample: `public class PracticalApplication {
    public static void main(String[] args) {
        // Industry Simulation: Employee Daily Attendance & Performance Metrics
        String[] employees = {"Priya Sharma", "Ravi Teja", "Ananya Reddy", "Kiran Kumar"};
        double[] weeklyHours = {42.5, 38.0, 45.0, 40.0};

        System.out.println("=== Weekly Payroll Hours Audit ===");
        for (int i = 0; i < employees.length; i++) {
            boolean isOvertime = weeklyHours[i] > 40.0;
            System.out.printf("Employee: %-15s | Hours: %4.1f hrs | Overtime: %b%n",
                    employees[i], weeklyHours[i], isOvertime);
        }
    }
}`,
    practicalOutput: `=== Weekly Payroll Hours Audit ===
Employee: Priya Sharma    | Hours: 42.5 hrs | Overtime: true
Employee: Ravi Teja       | Hours: 38.0 hrs | Overtime: false
Employee: Ananya Reddy    | Hours: 45.0 hrs | Overtime: true
Employee: Kiran Kumar     | Hours: 40.0 hrs | Overtime: false`,
    commonMistakes: [
      'Accessing `arr[arr.length]` instead of `arr[arr.length - 1]`, throwing `ArrayIndexOutOfBoundsException`.',
      'Writing `arr.length()` with parentheses instead of `arr.length`. (Arrays have a `.length` field; Strings have a `.length()` method).',
      'Attempting to modify the original array elements inside an enhanced for loop (e.g. `for(int x : arr) x = 0;` does NOT change `arr`).',
      'Assuming `new int[5]` creates uninitialized garbage memory like in C/C++. Java guarantees default zero values.'
    ],
    challenge: `// Coding Challenge:
// Given an array of monthly temperatures: double[] temps = {32.5, 34.0, 36.5, 31.0, 29.5};
// 1. Double the temperature of any month below 30.0 (simulating heat wave).
// 2. Print all temperatures using an enhanced for loop formatted to 1 decimal place.

public class Challenge {
    public static void main(String[] args) {
        double[] temps = {32.5, 34.0, 36.5, 31.0, 29.5};
        
        for (int i = 0; i < temps.length; i++) {
            if (temps[i] < 30.0) {
                temps[i] *= 2;
            }
        }
        
        System.out.print("Adjusted Temperatures: ");
        for (double t : temps) {
            System.out.printf("%.1f°C ", t);
        }
        System.out.println();
    }
}`,
    faq: [
      {
        q: 'Why are arrays 0-indexed in Java and computer science?',
        a: 'The index represents the exact memory offset from the starting memory address of the array. The address of element i is calculated as: `Address = BaseAddress + (i * elementSize)`. For the first element, offset is 0, so `BaseAddress + (0 * size) = BaseAddress`.'
      },
      {
        q: 'Can an array change its size after creation in Java?',
        a: 'No. Java arrays are strictly fixed in size. Once created in Heap memory, an array cannot grow or shrink. To resize, you must allocate a new array of the larger size and copy elements over (which is how `ArrayList` works internally).'
      },
      {
        q: 'What is the difference between int[] arr and int arr[]?',
        a: 'Both are valid syntaxes in Java. However, `int[] arr` is the preferred Java standard because it clearly separates the type (`int[]`) from the variable name (`arr`). `int arr[]` exists only for backward compatibility with C/C++ programmers.'
      }
    ],
    recap: [
      'An array is a fixed-size, contiguous collection of homogeneous elements stored in the JVM Heap.',
      'Arrays are 0-indexed; the first element is at `arr[0]` and the last is at `arr[arr.length - 1]`.',
      'The `.length` property returns the capacity of the array and has no parentheses.',
      'All array elements are automatically initialized to default zero values by the JVM upon allocation.',
      'Use classic `for` loops when index manipulation is needed; use enhanced `for-each` for clean read-only traversal.'
    ]
  },

  // =========================================================================
  // CHAPTER 29: Array Algorithms: Sum, Min/Max, and Searching
  // =========================================================================
  {
    num: 29,
    phaseId: 'phase7',
    phaseTitle: 'Phase 7: Arrays & Matrices',
    slug: '29-java-array-algorithms-sum-min-max-and-searching',
    title: 'Java Array Algorithms: Sum, Average, Min/Max & Searching',
    badge: '29. Array Math & Search Algorithms',
    subtopics: 'Sum & Average Calculations · Finding Maximum and Minimum · Second Largest Element ($O(N)$) · Linear Search Algorithm · Binary Search Algorithm ($O(\\log N)$) · Arrays.binarySearch() Mechanics',
    readTime: '24 min read',
    intro: 'Mastering essential algorithmic patterns on Java arrays: calculating aggregate metrics (sum, floating-point average), determining minimum and maximum values without off-by-one errors, single-pass second largest discovery, linear search for unsorted data, and high-speed binary search on sorted sequences.',
    theorySections: [
      {
        heading: '1. Array Aggregations: Sum and Floating-Point Average',
        content: `Calculating statistical aggregates over an array requires accumulating values in a running counter:

\`\`\`java
int[] numbers = {10, 20, 30, 40, 50};
int sum = 0;

for (int num : numbers) {
    sum += num;
}
// CRITICAL: Cast sum to double before division to prevent integer truncation!
double average = (double) sum / numbers.length;
\`\`\`

**Integer Division Pitfall:**
If \`sum = 15\` and \`length = 4\`, \`15 / 4\` produces integer \`3\`, discarding the decimal \`.75\`. Always write \`(double) sum / length\` to receive \`3.75\`.`
      },
      {
        heading: '2. Finding Maximum and Minimum Elements (The Golden Rule)',
        content: `To find the maximum or minimum value in an array:

**The Mistake to Avoid:**
Never initialize \`int max = 0;\`! If the array contains only negative numbers (e.g. \`{-15, -8, -42, -99}\`), your program will incorrectly report \`0\` as the maximum even though \`0\` is not in the array!

**The Correct Approach:**
Always initialize \`max\` and \`min\` with the **first element** \`arr[0]\` (or \`Integer.MIN_VALUE\` / \`Integer.MAX_VALUE\`):

\`\`\`java
int[] data = {-15, -8, -42, -99};
int max = data[0];
int min = data[0];

for (int i = 1; i < data.length; i++) {
    if (data[i] > max) max = data[i];
    if (data[i] < min) min = data[i];
}
\`\`\``
      },
      {
        heading: '3. Single-Pass Second Largest Element Algorithm (O(N))',
        content: `Finding the second largest value without sorting (which takes $O(N \\log N)$) can be solved in a single $O(N)$ pass:

\`\`\`java
int largest = Integer.MIN_VALUE;
int secondLargest = Integer.MIN_VALUE;

for (int num : arr) {
    if (num > largest) {
        secondLargest = largest;
        largest = num;
    } else if (num > secondLargest && num != largest) {
        secondLargest = num;
    }
}
\`\`\``
      },
      {
        heading: '4. Linear Search vs Binary Search Comparison',
        content: `<div class="ref-table-wrap">
  <table class="ref-table">
    <thead>
      <tr>
        <th>Algorithm</th>
        <th>Prerequisite</th>
        <th>Time Complexity</th>
        <th>Space Complexity</th>
        <th>How it Works</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Linear Search</strong></td>
        <td>None (Works on unsorted arrays)</td>
        <td><strong>O(N)</strong> (Scans up to N elements)</td>
        <td>O(1)</td>
        <td>Iterates from index 0 to length - 1 checking <code>if (arr[i] == target)</code>.</td>
      </tr>
      <tr>
        <td><strong>Binary Search</strong></td>
        <td><strong>Must be SORTED</strong></td>
        <td><strong>O(log N)</strong> (Halves search space each step)</td>
        <td>O(1)</td>
        <td>Compares target with middle element; discards left or right half.</td>
      </tr>
    </tbody>
  </table>
</div>

**Binary Search Efficiency:**
For 1,000,000 items:
- Linear Search: Up to **1,000,000 comparisons**.
- Binary Search: Maximum **20 comparisons**! ($\log_2(1000000) \\approx 19.93$).`
      },
      {
        heading: '5. Binary Search Safe Mid Calculation',
        content: `In standard binary search, calculating \`mid = (left + right) / 2\` has a famous 32-bit integer overflow bug when \`left + right > 2,147,483,647\`.

**The Production Safe Formula:**
$$\\text{mid} = \\text{left} + \\frac{\\text{right} - \\text{left}}{2}$$`
      }
    ],
    codeExample: `import java.util.Arrays;

public class Main {
    // 1. Linear Search Implementation (O(N))
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i; // Found at index i
            }
        }
        return -1; // Not found
    }

    // 2. Binary Search Implementation (O(log N))
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2; // Overflow-safe

            if (arr[mid] == target) {
                return mid; // Target matched
            } else if (arr[mid] < target) {
                left = mid + 1; // Search right half
            } else {
                right = mid - 1; // Search left half
            }
        }
        return -1; // Target not present
    }

    public static void main(String[] args) {
        int[] scores = {45, 92, 18, 77, 85, 99, 63};

        System.out.println("=== 1. Sum, Average, Min & Max ===");
        int sum = 0;
        int min = scores[0];
        int max = scores[0];

        for (int s : scores) {
            sum += s;
            if (s < min) min = s;
            if (s > max) max = s;
        }
        double avg = (double) sum / scores.length;

        System.out.println("Dataset               : " + Arrays.toString(scores));
        System.out.println("Total Sum             : " + sum);
        System.out.printf("Average               : %.2f%n", avg);
        System.out.println("Smallest (Min)        : " + min);
        System.out.println("Largest (Max)         : " + max);

        System.out.println("\n=== 2. Single-Pass Second Largest ===");
        int largest = Integer.MIN_VALUE;
        int secondLargest = Integer.MIN_VALUE;
        for (int s : scores) {
            if (s > largest) {
                secondLargest = largest;
                largest = s;
            } else if (s > secondLargest && s != largest) {
                secondLargest = s;
            }
        }
        System.out.println("Largest Value         : " + largest);
        System.out.println("Second Largest Value  : " + secondLargest);

        System.out.println("\n=== 3. Linear Search ===");
        int searchTarget = 85;
        int linearIdx = linearSearch(scores, searchTarget);
        System.out.println("Linear Search for " + searchTarget + " : Found at index " + linearIdx);

        System.out.println("\n=== 4. Binary Search (Sorted Array) ===");
        Arrays.sort(scores); // Must sort before Binary Search!
        System.out.println("Sorted Dataset        : " + Arrays.toString(scores));
        int binaryIdx = binarySearch(scores, searchTarget);
        System.out.println("Custom Binary Search  : Found at index " + binaryIdx);

        int builtinIdx = Arrays.binarySearch(scores, searchTarget);
        System.out.println("Arrays.binarySearch() : Found at index " + builtinIdx);
    }
}`,
    output: `=== 1. Sum, Average, Min & Max ===
Dataset               : [45, 92, 18, 77, 85, 99, 63]
Total Sum             : 479
Average               : 68.43
Smallest (Min)        : 18
Largest (Max)         : 99

=== 2. Single-Pass Second Largest ===
Largest Value         : 99
Second Largest Value  : 92

=== 3. Linear Search ===
Linear Search for 85 : Found at index 4

=== 4. Binary Search (Sorted Array) ===
Sorted Dataset        : [18, 45, 63, 77, 85, 92, 99]
Custom Binary Search  : Found at index 4
Arrays.binarySearch() : Found at index 4`,
    lineByLine: [
      {
        line: 'double avg = (double) sum / scores.length;',
        explanation: 'Casts integer sum to double before division to preserve fractional precision.'
      },
      {
        line: 'if (s > largest) { secondLargest = largest; largest = s; }',
        explanation: 'Maintains running track of top two maximums in single linear O(N) pass.'
      },
      {
        line: 'linearSearch(scores, searchTarget);',
        explanation: 'Sequentially inspects each index from 0 to N-1; suitable for unsorted datasets.'
      },
      {
        line: 'int mid = left + (right - left) / 2;',
        explanation: 'Calculates the midpoint index without risking 32-bit integer overflow.'
      },
      {
        line: 'Arrays.binarySearch(scores, searchTarget);',
        explanation: 'Invokes Java\'s standard library binary search on the sorted array in O(log N) time.'
      }
    ],
    practicalExample: `public class PracticalApplication {
    public static void main(String[] args) {
        // Industry Simulation: Server Response Time Telemetry Analysis
        int[] latencyMs = {120, 85, 430, 210, 95, 850, 110, 340};

        int total = 0;
        int slaViolations = 0; // Requests taking > 300ms
        int maxLatency = latencyMs[0];

        for (int lat : latencyMs) {
            total += lat;
            if (lat > 300) slaViolations++;
            if (lat > maxLatency) maxLatency = lat;
        }

        double avgLatency = (double) total / latencyMs.length;
        System.out.println("=== API Gateway Latency Report ===");
        System.out.printf("Average Latency       : %.2f ms%n", avgLatency);
        System.out.println("Peak Latency (Max)    : " + maxLatency + " ms");
        System.out.println("SLA Breaches (>300ms) : " + slaViolations + " requests");
    }
}`,
    practicalOutput: `=== API Gateway Latency Report ===
Average Latency       : 280.00 ms
Peak Latency (Max)    : 850 ms
SLA Breaches (>300ms) : 3 requests`,
    commonMistakes: [
      'Performing Binary Search on an unsorted array, which returns completely unpredictable or negative results.',
      'Initializing `min` or `max` with `0` instead of `arr[0]`, breaking calculations when all numbers are negative.',
      'Dividing integers without casting to double (e.g. `sum / length` instead of `(double) sum / length`), losing decimals.',
      'Using `mid = (left + right) / 2` which can overflow for very large arrays with millions of elements.'
    ],
    challenge: `// Coding Challenge:
// Write a method findThirdLargest(int[] arr) that finds the third largest distinct number in an array in O(N) time.
// If less than 3 distinct numbers exist, return the maximum value.

public class Challenge {
    public static int findThirdLargest(int[] arr) {
        long first = Long.MIN_VALUE;
        long second = Long.MIN_VALUE;
        long third = Long.MIN_VALUE;

        for (int num : arr) {
            if (num > first) {
                third = second;
                second = first;
                first = num;
            } else if (num > second && num != first) {
                third = second;
                second = num;
            } else if (num > third && num != second && num != first) {
                third = num;
            }
        }

        return third == Long.MIN_VALUE ? (int) first : (int) third;
    }

    public static void main(String[] args) {
        System.out.println("Third Largest: " + findThirdLargest(new int[]{10, 45, 99, 85, 23})); // 45
        System.out.println("Third Largest: " + findThirdLargest(new int[]{10, 20})); // 20
    }
}`,
    faq: [
      {
        q: 'What does Arrays.binarySearch() return if the element is NOT found?',
        a: 'It returns `-(insertion_point + 1)`, where `insertion_point` is the index where the key would be inserted to maintain sorted order. For example, returning `-1` means the element should be inserted at index 0.'
      },
      {
        q: 'When should I use Linear Search instead of Binary Search?',
        a: 'Use Linear Search when the array is unsorted and you only perform a single search (because sorting takes $O(N \\log N)$, which is slower than a single $O(N)$ scan). If you need to search multiple times, sort once and use Binary Search.'
      },
      {
        q: 'How does (double) sum / arr.length work?',
        a: 'The cast `(double) sum` converts the integer sum into a 64-bit IEEE 754 floating-point number *before* the division operator runs, forcing floating-point division rather than integer division.'
      }
    ],
    recap: [
      'Always cast sum to `(double)` before dividing by length to compute accurate decimal averages.',
      'Initialize `min` and `max` variables with `arr[0]` to handle negative numbers correctly.',
      'Single-pass algorithms can find the 1st and 2nd largest elements in linear $O(N)$ time.',
      'Linear Search operates on unsorted arrays in $O(N)$ time.',
      'Binary Search requires a sorted array and achieves lightning-fast $O(\\log N)$ lookup speed.'
    ]
  },

  // =========================================================================
  // CHAPTER 30: Sorting, Array Copying & Arrays Utility Class
  // =========================================================================
  {
    num: 30,
    phaseId: 'phase7',
    phaseTitle: 'Phase 7: Arrays & Matrices',
    slug: '30-java-array-sorting-copying-and-arrays-utility-class',
    title: 'Java Array Sorting, Copying & java.util.Arrays Masterclass',
    badge: '30. Sorting, Copying & Utilities',
    subtopics: 'In-Place Array Reversal · Bubble Sort Algorithm · Arrays.sort() Internals (Dual-Pivot Quicksort) · 4 Array Copying Techniques · System.arraycopy() vs Arrays.copyOf() · Shallow vs Deep Copy · Arrays.fill(), Arrays.equals(), Arrays.mismatch()',
    readTime: '26 min read',
    intro: 'Mastering sorting algorithms, memory duplication techniques, and the complete java.util.Arrays utility library: two-pointer in-place reversal, step-by-step Bubble Sort mechanics, JVM Dual-Pivot Quicksort architecture, high-speed memory copying with System.arraycopy(), and deep equality inspections.',
    theorySections: [
      {
        heading: '1. In-Place Array Reversal (Two-Pointer Algorithm)',
        content: `Reversing an array without creating a second array saves heap allocation:

\`\`\`java
int left = 0, right = arr.length - 1;
while (left < right) {
    int temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
}
\`\`\`
- Runs in $O(N/2) = O(N)$ time.
- Uses $O(1)$ auxiliary space.`
      },
      {
        heading: '2. Understanding Bubble Sort Mechanics',
        content: `**Bubble Sort** repeatedly compares adjacent elements and swaps them if they are in the wrong order. With each outer pass, the largest remaining element "bubbles up" to its final position at the end of the array:

\`\`\`
  Pass 1: [5, 1, 4, 2, 8] -> [1, 5, 4, 2, 8] -> [1, 4, 5, 2, 8] -> [1, 4, 2, 5, 8] (8 is in place)
  Pass 2: [1, 4, 2, 5, 8] -> [1, 2, 4, 5, 8] (5 is in place)
  Pass 3: Array is sorted!
\`\`\`

- **Time Complexity:** $O(N^2)$ worst/average case; $O(N)$ best case when optimized with a \`swapped\` boolean flag.`
      },
      {
        heading: '3. 4 Ways to Copy Arrays in Java',
        content: `In Java, writing \`int[] copy = original;\` does NOT copy the array! It simply creates a **second reference pointing to the exact same Heap object**. Modifying \`copy[0]\` will corrupt \`original[0]\`!

To duplicate the array data, use one of these 4 techniques:

<div class="ref-table-wrap">
  <table class="ref-table">
    <thead>
      <tr>
        <th>Method</th>
        <th>Syntax</th>
        <th>Characteristics</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1. Manual Loop</strong></td>
        <td><code>for (int i=0; i&lt;len; i++) copy[i] = orig[i];</code></td>
        <td>Simple, readable, manual control.</td>
      </tr>
      <tr>
        <td><strong>2. System.arraycopy()</strong></td>
        <td><code>System.arraycopy(src, 0, dest, 0, len);</code></td>
        <td><strong>Fastest</strong> (Native C++ JVM memmove call directly in RAM).</td>
      </tr>
      <tr>
        <td><strong>3. Arrays.copyOf()</strong></td>
        <td><code>int[] copy = Arrays.copyOf(orig, newLength);</code></td>
        <td>Allocates and copies in one concise call; allows resizing.</td>
      </tr>
      <tr>
        <td><strong>4. clone()</strong></td>
        <td><code>int[] copy = orig.clone();</code></td>
        <td>Creates a shallow clone of the array object.</td>
      </tr>
    </tbody>
  </table>
</div>`
      },
      {
        heading: '4. The java.util.Arrays Utility Toolkit',
        content: `The \`java.util.Arrays\` class contains static helper methods:

- **\`Arrays.toString(arr)\`:** Converts 1D array into clean readable string \`"[1, 2, 3]"\`.
- **\`Arrays.sort(arr)\`:** In-place ascending sort.
- **\`Arrays.fill(arr, val)\`:** Sets every slot in the array to \`val\`.
- **\`Arrays.equals(arr1, arr2)\`:** Checks if two 1D arrays contain identical elements in identical order.
- **\`Arrays.mismatch(arr1, arr2)\`:** (Java 9+) Returns the index of the first differing element, or \`-1\` if identical.
- **\`Arrays.compare(arr1, arr2)\`:** (Java 9+) Lexicographical array comparison.`
      }
    ],
    codeExample: `import java.util.Arrays;

public class Main {
    // Bubble sort with optimized early exit
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break; // Array is already sorted
        }
    }

    // In-place two-pointer reversal
    public static void reverseArray(int[] arr) {
        int left = 0, right = arr.length - 1;
        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
    }

    public static void main(String[] args) {
        System.out.println("=== 1. In-Place Array Reversal ===");
        int[] numbers = {10, 20, 30, 40, 50};
        System.out.println("Original              : " + Arrays.toString(numbers));
        reverseArray(numbers);
        System.out.println("Reversed              : " + Arrays.toString(numbers));

        System.out.println("\n=== 2. Custom Bubble Sort ===");
        int[] unsorted = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Before Bubble Sort    : " + Arrays.toString(unsorted));
        bubbleSort(unsorted);
        System.out.println("After Bubble Sort     : " + Arrays.toString(unsorted));

        System.out.println("\n=== 3. Array Copying Techniques ===");
        int[] original = {100, 200, 300, 400};

        // Technique A: Arrays.copyOf()
        int[] copyA = Arrays.copyOf(original, original.length);

        // Technique B: System.arraycopy()
        int[] copyB = new int[original.length];
        System.arraycopy(original, 0, copyB, 0, original.length);

        // Technique C: clone()
        int[] copyC = original.clone();

        System.out.println("Copy via Arrays.copyOf: " + Arrays.toString(copyA));
        System.out.println("Copy via arraycopy()  : " + Arrays.toString(copyB));
        System.out.println("Copy via clone()      : " + Arrays.toString(copyC));

        System.out.println("\n=== 4. Arrays Utility Class Methods ===");
        System.out.println("Arrays.equals(A, B)   : " + Arrays.equals(copyA, copyB)); // true

        int[] fillArray = new int[5];
        Arrays.fill(fillArray, 7);
        System.out.println("Arrays.fill(..., 7)   : " + Arrays.toString(fillArray));

        int[] rangeCopy = Arrays.copyOfRange(original, 1, 3); // Extracts [200, 300]
        System.out.println("Arrays.copyOfRange(1,3): " + Arrays.toString(rangeCopy));
    }
}`,
    output: `=== 1. In-Place Array Reversal ===
Original              : [10, 20, 30, 40, 50]
Reversed              : [50, 40, 30, 20, 10]

=== 2. Custom Bubble Sort ===
Before Bubble Sort    : [64, 34, 25, 12, 22, 11, 90]
After Bubble Sort     : [11, 12, 22, 25, 34, 64, 90]

=== 3. Array Copying Techniques ===
Copy via Arrays.copyOf: [100, 200, 300, 400]
Copy via arraycopy()  : [100, 200, 300, 400]
Copy via clone()      : [100, 200, 300, 400]

=== 4. Arrays Utility Class Methods ===
Arrays.equals(A, B)   : true
Arrays.fill(..., 7)   : [7, 7, 7, 7, 7]
Arrays.copyOfRange(1,3): [200, 300]`,
    lineByLine: [
      {
        line: 'reverseArray(numbers);',
        explanation: 'Reverses the array elements directly in place using two converging pointers without allocating a new array.'
      },
      {
        line: 'System.arraycopy(original, 0, copyB, 0, original.length);',
        explanation: 'Executes high-speed native memory copying directly in the JVM with zero bytecode overhead.'
      },
      {
        line: 'Arrays.copyOf(original, original.length);',
        explanation: 'Allocates a new heap array and copies elements in a single expression.'
      },
      {
        line: 'Arrays.fill(fillArray, 7);',
        explanation: 'Assigns value 7 to every element in the array.'
      },
      {
        line: 'Arrays.equals(copyA, copyB);',
        explanation: 'Compares content element-by-element, returning true if lengths and corresponding elements match.'
      }
    ],
    practicalExample: `public class PracticalApplication {
    public static void main(String[] args) {
        // Industry Simulation: Dynamic Array Expansion & Buffer Management
        int[] buffer = {10, 20, 30};
        System.out.println("Initial Buffer (Cap 3): " + Arrays.toString(buffer));

        // Incoming new data exceeds capacity: Expand buffer to 2x capacity
        int[] expandedBuffer = Arrays.copyOf(buffer, buffer.length * 2);
        expandedBuffer[3] = 40;
        expandedBuffer[4] = 50;

        System.out.println("Expanded Buffer(Cap 6): " + Arrays.toString(expandedBuffer));
    }
}`,
    practicalOutput: `Initial Buffer (Cap 3): [10, 20, 30]
Expanded Buffer(Cap 6): [10, 20, 30, 40, 50, 0]`,
    commonMistakes: [
      'Writing `int[] b = a;` believing it clones the array. It only creates a second reference to the same array object.',
      'Calling `a.equals(b)` on two arrays instead of `Arrays.equals(a, b)`. `a.equals(b)` compares memory addresses!',
      'Printing an array with `System.out.println(arr)` which prints memory hashes like `[I@1b6d3586` instead of `Arrays.toString(arr)`.',
      'Forgetting that `Arrays.copyOfRange(arr, 1, 4)` uses half-open range `[1, 4)` and excludes index 4.'
    ],
    challenge: `// Coding Challenge:
// Write a method removeDuplicates(int[] sortedArr) that:
// 1. Takes a SORTED array with duplicate numbers: {1, 1, 2, 2, 3, 4, 4, 5}.
// 2. Removes duplicates in-place in O(N) time and returns the new unique count.

public class Challenge {
    public static int removeDuplicates(int[] arr) {
        if (arr.length == 0) return 0;
        int uniqueIdx = 0;
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] != arr[uniqueIdx]) {
                uniqueIdx++;
                arr[uniqueIdx] = arr[i];
            }
        }
        return uniqueIdx + 1;
    }

    public static void main(String[] args) {
        int[] sorted = {1, 1, 2, 2, 3, 4, 4, 5};
        int newLength = removeDuplicates(sorted);
        System.out.println("Unique Count : " + newLength);
        System.out.print("Unique Array : ");
        for (int i = 0; i < newLength; i++) {
            System.out.print(sorted[i] + " ");
        }
        System.out.println();
    }
}`,
    faq: [
      {
        q: 'Why does System.out.println(new int[]{1,2,3}) print [I@6d06d69c?',
        a: 'Arrays in Java inherit `toString()` from `java.lang.Object`, which prints the class name (`[I` means 1D integer array) followed by `@` and the hexadecimal unsigned hash code. Always use `Arrays.toString(arr)` to print values.'
      },
      {
        q: 'What sorting algorithm does Arrays.sort() use for primitives vs objects?',
        a: 'For primitives (`int[]`, `double[]`), it uses **Dual-Pivot Quicksort** by Vladimir Yaroslavskiy (fast, $O(N \\log N)$, not stable). For objects (`String[]`, `Comparable[]`), it uses **Timsort** (stable, derived from merge sort).'
      },
      {
        q: 'Which array copy method is the fastest in Java?',
        a: '`System.arraycopy()` is the fastest because it is a native C/C++ method that translates directly into high-speed SIMD memory block copies in CPU hardware.'
      }
    ],
    recap: [
      'Two-pointer algorithms reverse arrays in $O(N)$ time with zero additional memory allocation.',
      'Assigning `int[] b = a;` copies references, not data; use `Arrays.copyOf()` or `System.arraycopy()` for true cloning.',
      'Always use `Arrays.toString()` to print arrays and `Arrays.equals()` to compare array contents.',
      '`Arrays.sort()` uses Dual-Pivot Quicksort for primitives and Timsort for objects.',
      '`System.arraycopy()` is the industry standard for high-performance memory duplication.'
    ]
  },

  // =========================================================================
  // CHAPTER 31: Multidimensional & Jagged Arrays
  // =========================================================================
  {
    num: 31,
    phaseId: 'phase7',
    phaseTitle: 'Phase 7: Arrays & Matrices',
    slug: '31-java-multidimensional-and-jagged-arrays',
    title: 'Java Multidimensional & Jagged Arrays Masterclass',
    badge: '31. 2D & Jagged Arrays',
    subtopics: '2D Arrays (Matrices) · "Array of Arrays" Memory Model · Matrix Declaration & Nested Loops · Matrix Addition & Transpose · Jagged (Ragged) Arrays Architecture · Dynamic Row Allocation · Arrays.deepToString() & Arrays.deepEquals()',
    readTime: '26 min read',
    intro: 'Mastering multi-dimensional data structures in Java: the internal "array of arrays" memory architecture, 2D matrix representations, nested row-column iterations, matrix arithmetic (addition, scalar multiplication, transposition), non-uniform Jagged (Ragged) arrays, and deep array inspection utilities.',
    theorySections: [
      {
        heading: '1. What is a 2D Array? ("Array of Arrays" in Java)',
        content: `In C and C++, a 2D array is stored as a single contiguous, flat 2D block of memory.

In Java, **there is no true flat 2D array**. Instead, a 2D array is an **"Array of Arrays"**:
- The outer array is an array of **reference variables** (row pointers).
- Each reference points to an independent, contiguous 1D array representing that row!

\`\`\`
  int[][] matrix = new int[3][4];

  STACK                    HEAP MEMORY
  +--------+              +-----------------------+
  | matrix | -----------> | [0] | [1] | [2] (Row References)
  +--------+              +---|---|---|-----------+
                              |   |   |
             +----------------+   |   +----------------+
             v                    v                    v
      +---------------+    +---------------+    +---------------+
      | 0 | 0 | 0 | 0 |    | 0 | 0 | 0 | 0 |    | 0 | 0 | 0 | 0 | (Row 0, 1, 2)
      +---------------+    +---------------+    +---------------+
\`\`\``
      },
      {
        heading: '2. Declaring and Initializing 2D Arrays',
        content: `1. **Dynamic Matrix Allocation:**
\`\`\`java
int[][] grid = new int[3][3]; // 3 rows, 3 columns (all initialized to 0)
\`\`\`

2. **Inline Matrix Literals:**
\`\`\`java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
\`\`\`

3. **Accessing & Dimension Rules:**
- **Number of Rows:** <code>matrix.length</code> (e.g. 3)
- **Number of Columns in Row \`i\`:** <code>matrix[i].length</code> (e.g. 3)
- **Element Access:** <code>matrix[row][col]</code> (e.g. <code>matrix[1][2]</code> is 6)`
      },
      {
        heading: '3. Matrix Arithmetic: Addition and Transposition',
        content: `1. **Matrix Addition ($C[i][j] = A[i][j] + B[i][j]$):**
Two matrices must have identical dimensions ($R \\times C$). Each cell in the result matrix is the arithmetic sum of corresponding cells.

2. **Matrix Transpose:**
Flipping a matrix over its diagonal, swapping row and column indices:
$$\\text{Transpose}[col][row] = \\text{Original}[row][col]$$`
      },
      {
        heading: '4. Jagged (Ragged) Arrays Architecture',
        content: `Because a 2D array in Java is an array of references, **each row can have a different number of columns**! This is known as a **Jagged (or Ragged) Array**.

**Why use Jagged Arrays?**
To save memory when rows have varying data lengths (e.g. recording the number of tickets sold on each day of the week, where Friday has 10 entries and Monday has 2).

\`\`\`java
// 1. Declare row container without specifying column sizes:
int[][] jagged = new int[3][];

// 2. Allocate each row with custom length:
jagged[0] = new int[2]; // Row 0 has 2 columns
jagged[1] = new int[4]; // Row 1 has 4 columns
jagged[2] = new int[1]; // Row 2 has 1 column
\`\`\`

\`\`\`
  Jagged Memory Layout:
  jagged[0] -> [ 10, 20 ]
  jagged[1] -> [ 30, 40, 50, 60 ]
  jagged[2] -> [ 70 ]
\`\`\``
      },
      {
        heading: '5. Deep Array Inspection: Arrays.deepToString()',
        content: `When printing or comparing multidimensional arrays:
- \`Arrays.toString(matrix)\` prints memory address hashes of row arrays (\`"[[I@1b6d3586, [I@4554617c]"\`).
- **\`Arrays.deepToString(matrix)\`:** Recursively inspects inner arrays and formats the full matrix cleanly: \`"[[1, 2], [3, 4]]"\`.
- **\`Arrays.deepEquals(m1, m2)\`:** Performs deep recursive value equality on multidimensional structures.`
      }
    ],
    codeExample: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== 1. 2D Matrix Declaration & Traversal ===");
        int[][] matrixA = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        int[][] matrixB = {
            {9, 8, 7},
            {6, 5, 4},
            {3, 2, 1}
        };

        // Traversal using nested for loops
        System.out.println("Matrix A:");
        for (int r = 0; r < matrixA.length; r++) {
            for (int c = 0; c < matrixA[r].length; c++) {
                System.out.printf("%3d ", matrixA[r][c]);
            }
            System.out.println();
        }

        System.out.println("\n=== 2. Matrix Addition (A + B) ===");
        int rows = matrixA.length;
        int cols = matrixA[0].length;
        int[][] sumMatrix = new int[rows][cols];

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                sumMatrix[r][c] = matrixA[r][c] + matrixB[r][c];
            }
        }

        for (int[] row : sumMatrix) {
            for (int val : row) {
                System.out.printf("%3d ", val);
            }
            System.out.println();
        }

        System.out.println("\n=== 3. Matrix Transpose ===");
        int[][] transpose = new int[cols][rows];
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                transpose[c][r] = matrixA[r][c];
            }
        }
        System.out.println("Transpose of Matrix A:");
        for (int[] row : transpose) {
            System.out.println(Arrays.toString(row));
        }

        System.out.println("\n=== 4. Jagged Array Demonstration ===");
        int[][] jagged = new int[3][];
        jagged[0] = new int[]{10, 20};
        jagged[1] = new int[]{30, 40, 50, 60};
        jagged[2] = new int[]{70, 80, 90};

        System.out.println("Jagged Array Deep View: " + Arrays.deepToString(jagged));
        for (int r = 0; r < jagged.length; r++) {
            System.out.print("Row " + r + " (len " + jagged[r].length + "): ");
            for (int c = 0; c < jagged[r].length; c++) {
                System.out.print(jagged[r][c] + " ");
            }
            System.out.println();
        }
    }
}`,
    output: `=== 1. 2D Matrix Declaration & Traversal ===
Matrix A:
  1   2   3 
  4   5   6 
  7   8   9 

=== 2. Matrix Addition (A + B) ===
 10  10  10 
 10  10  10 
 10  10  10 

=== 3. Matrix Transpose ===
Transpose of Matrix A:
[1, 4, 7]
[2, 5, 8]
[3, 6, 9]

=== 4. Jagged Array Demonstration ===
Jagged Array Deep View: [[10, 20], [30, 40, 50, 60], [70, 80, 90]]
Row 0 (len 2): 10 20 
Row 1 (len 4): 30 40 50 60 
Row 2 (len 3): 70 80 90`,
    lineByLine: [
      {
        line: 'int[][] matrixA = { {1,2,3}, {4,5,6}, {7,8,9} };',
        explanation: 'Initializes a 3x3 matrix where each row is an independent 3-element integer array.'
      },
      {
        line: 'sumMatrix[r][c] = matrixA[r][c] + matrixB[r][c];',
        explanation: 'Adds values from corresponding cell coordinates and stores them in the sum matrix.'
      },
      {
        line: 'transpose[c][r] = matrixA[r][c];',
        explanation: 'Swaps row and column coordinates to flip the matrix across its main diagonal.'
      },
      {
        line: 'int[][] jagged = new int[3][];',
        explanation: 'Declares an outer array holding 3 row references, allowing each row to have custom length.'
      },
      {
        line: 'Arrays.deepToString(jagged);',
        explanation: 'Recursively formats multidimensional arrays into clean bracketed text.'
      }
    ],
    practicalExample: `public class PracticalApplication {
    public static void main(String[] args) {
        // Industry Simulation: Cinema Theater Seat Reservation Grid
        // 0 = Available, 1 = Booked
        int[][] theaterSeats = {
            {0, 1, 0, 0, 1},
            {1, 1, 1, 0, 0},
            {0, 0, 0, 0, 0},
            {1, 1, 1, 1, 1}
        };

        int totalSeats = 0;
        int bookedSeats = 0;

        for (int r = 0; r < theaterSeats.length; r++) {
            for (int c = 0; c < theaterSeats[r].length; c++) {
                totalSeats++;
                if (theaterSeats[r][c] == 1) bookedSeats++;
            }
        }

        double occupancyRate = ((double) bookedSeats / totalSeats) * 100;
        System.out.println("=== Cinema Seating & Occupancy Audit ===");
        System.out.println("Total Seats     : " + totalSeats);
        System.out.println("Booked Seats    : " + bookedSeats);
        System.out.println("Available Seats : " + (totalSeats - bookedSeats));
        System.out.printf("Occupancy Rate  : %.1f%%%n", occupancyRate);
    }
}`,
    practicalOutput: `=== Cinema Seating & Occupancy Audit ===
Total Seats     : 20
Booked Seats    : 10
Available Seats : 10
Occupancy Rate  : 50.0%`,
    commonMistakes: [
      'Using `matrix[col][row]` instead of `matrix[row][col]`, leading to index mix-ups or out-of-bounds exceptions.',
      'Assuming all rows in a 2D array have the same length (calling `matrix[0].length` for all rows in a jagged array).',
      'Calling `Arrays.toString(matrix)` for 2D arrays instead of `Arrays.deepToString(matrix)`.',
      'Forgetting that `new int[3][]` leaves all row references `null` until individually allocated.'
    ],
    challenge: `// Coding Challenge:
// Given a square matrix, write a program to calculate:
// 1. Primary diagonal sum (top-left to bottom-right).
// 2. Secondary diagonal sum (top-right to bottom-left).

public class Challenge {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        int n = matrix.length;
        int primarySum = 0;
        int secondarySum = 0;
        
        for (int i = 0; i < n; i++) {
            primarySum += matrix[i][i];
            secondarySum += matrix[i][n - 1 - i];
        }
        
        System.out.println("Primary Diagonal Sum   : " + primarySum);   // 1 + 5 + 9 = 15
        System.out.println("Secondary Diagonal Sum : " + secondarySum); // 3 + 5 + 7 = 15
    }
}`,
    faq: [
      {
        q: 'Why are 2D arrays not contiguous in memory in Java?',
        a: 'Because Java implements 2D arrays as an "Array of References" to 1D arrays. Each row is a separate object allocated independently on the Heap, which enables flexible features like Jagged Arrays.'
      },
      {
        q: 'What is the difference between Arrays.toString() and Arrays.deepToString()?',
        a: '`Arrays.toString()` only formats 1D arrays. For 2D or 3D arrays, it prints object memory references for the inner arrays. `Arrays.deepToString()` recursively navigates all dimensions and prints all inner values.'
      },
      {
        q: 'Can a 3D array have jagged dimensions in Java?',
        a: 'Yes. Any N-dimensional array in Java is a hierarchy of reference arrays, so each sub-dimension can have varying lengths.'
      }
    ],
    recap: [
      'Java 2D arrays are implemented as "Arrays of Arrays" where an outer array holds references to row arrays.',
      'Access elements using `matrix[row][col]`; row count is `matrix.length` and column count is `matrix[r].length`.',
      'Jagged Arrays allow each row to have custom, non-uniform column sizes to minimize memory waste.',
      'Use `Arrays.deepToString()` to format and print multidimensional arrays.',
      'Matrix transpose flips coordinates via `transpose[col][row] = original[row][col]`.'
    ]
  },

  // =========================================================================
  // CHAPTER 32: Array Limitations & 7 Capstone Projects
  // =========================================================================
  {
    num: 32,
    phaseId: 'phase7',
    phaseTitle: 'Phase 7: Arrays & Matrices',
    slug: '32-java-arrays-capstone-projects-and-limitations',
    title: 'Java Arrays Capstone Projects: 7 Production-Grade Systems & Limitations',
    badge: '32. Capstone Projects (7) & Limitations',
    subtopics: 'Array Limitations Analysis · Fixed Size Bottleneck · Homogeneity & Memory Fragmentation · Project 1: Largest & Smallest Element · Project 2: In-Place Reverse · Project 3: Duplicate Remover · Project 4: Sorted Array Merger · Project 5: Matrix Addition · Project 6: Search Engine · Project 7: Frequency Counter',
    readTime: '30 min read',
    intro: 'Building 7 complete production-grade array processing algorithms and mastering array architectural limitations: finding extremes, in-place pointer reversal, duplicate filtering, linear & binary search engines, sorted array merging, matrix arithmetic, and frequency histograms, followed by an architectural comparison between Arrays and the Java Collections Framework (ArrayList).',
    theorySections: [
      {
        heading: '1. Critical Limitations of Java Arrays',
        content: `While arrays offer $O(1)$ constant-time random access, enterprise software often outgrows them due to 4 major limitations:

<div class="ref-table-wrap">
  <table class="ref-table">
    <thead>
      <tr>
        <th>Limitation</th>
        <th>Explanation</th>
        <th>Industry Impact</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1. Fixed Capacity</strong></td>
        <td>Once created, size cannot grow or shrink.</td>
        <td>Requires manual reallocation and copying (<code>Arrays.copyOf</code>) to handle dynamic datasets.</td>
      </tr>
      <tr>
        <td><strong>2. Homogeneous Only</strong></td>
        <td>Can only store elements of the declared type.</td>
        <td>Cannot mix different data types in a single array container without using <code>Object[]</code>.</td>
      </tr>
      <tr>
        <td><strong>3. Memory Fragmentation</strong></td>
        <td>Requires a large <strong>contiguous block</strong> of free Heap memory.</td>
        <td>Even if 2GB of total RAM is free, allocating a contiguous 1GB array will fail if memory is fragmented into smaller chunks.</td>
      </tr>
      <tr>
        <td><strong>4. Lack of Utility Methods</strong></td>
        <td>No built-in <code>add()</code>, <code>remove()</code>, <code>contains()</code> methods.</td>
        <td>Developers must write manual loop algorithms or shift elements during deletions.</td>
      </tr>
    </tbody>
  </table>
</div>

*Note: In Phase 15, we will explore the **Java Collections Framework (\`ArrayList\`, \`HashSet\`, \`HashMap\`)** which resolves all of these limitations dynamically!*`
      },
      {
        heading: '2. Overview of the 7 Capstone Projects',
        content: `In this capstone chapter, we implement all 7 practice challenges requested in the curriculum:

1. **Project 1: Largest & Smallest Element Finder with Index Tracking:** Finds minimum, maximum, and their exact 0-based memory coordinates.
2. **Project 2: In-Place Array Reversal:** Two-pointer converging algorithm ($O(N)$ time, $O(1)$ space).
3. **Project 3: Duplicate Remover:** In-place deduplication of sorted arrays without allocating extra containers.
4. **Project 4: Sorted Array Merger:** Classic two-pointer merge algorithm ($O(N+M)$) foundational to Merge Sort.
5. **Project 5: 2D Matrix Addition & Scalar Multiplier:** Matrix algebra calculation engine.
6. **Project 6: Universal Element Search Engine:** Linear and Binary search comparison with execution step metrics.
7. **Project 7: Element Frequency Counter:** Computes exact occurrences of each distinct number in an array.`
      }
    ],
    codeExample: `import java.util.Arrays;

public class Main {
    // -------------------------------------------------------------
    // PROJECT 1: Largest & Smallest Element with Index Tracking
    // -------------------------------------------------------------
    public static void findExtremes(int[] arr) {
        int minVal = arr[0], maxVal = arr[0];
        int minIdx = 0, maxIdx = 0;

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < minVal) {
                minVal = arr[i];
                minIdx = i;
            }
            if (arr[i] > maxVal) {
                maxVal = arr[i];
                maxIdx = i;
            }
        }
        System.out.printf("  Largest : %d (at index %d)%n", maxVal, maxIdx);
        System.out.printf("  Smallest: %d (at index %d)%n", minVal, minIdx);
    }

    // -------------------------------------------------------------
    // PROJECT 2: In-Place Array Reversal (O(N) Time, O(1) Space)
    // -------------------------------------------------------------
    public static void reverseInPlace(int[] arr) {
        int left = 0, right = arr.length - 1;
        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
    }

    // -------------------------------------------------------------
    // PROJECT 3: Remove Duplicates from Sorted Array
    // -------------------------------------------------------------
    public static int removeDuplicates(int[] arr) {
        if (arr.length == 0) return 0;
        int writeIdx = 0;
        for (int readIdx = 1; readIdx < arr.length; readIdx++) {
            if (arr[readIdx] != arr[writeIdx]) {
                writeIdx++;
                arr[writeIdx] = arr[readIdx];
            }
        }
        return writeIdx + 1; // Count of unique elements
    }

    // -------------------------------------------------------------
    // PROJECT 4: Merge Two Sorted Arrays (O(N+M) Time)
    // -------------------------------------------------------------
    public static int[] mergeSortedArrays(int[] arr1, int[] arr2) {
        int[] merged = new int[arr1.length + arr2.length];
        int i = 0, j = 0, k = 0;

        while (i < arr1.length && j < arr2.length) {
            if (arr1[i] <= arr2[j]) {
                merged[k++] = arr1[i++];
            } else {
                merged[k++] = arr2[j++];
            }
        }
        while (i < arr1.length) merged[k++] = arr1[i++];
        while (j < arr2.length) merged[k++] = arr2[j++];

        return merged;
    }

    // -------------------------------------------------------------
    // PROJECT 5: 2D Matrix Addition
    // -------------------------------------------------------------
    public static int[][] addMatrices(int[][] a, int[][] b) {
        int rows = a.length, cols = a[0].length;
        int[][] res = new int[rows][cols];
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                res[r][c] = a[r][c] + b[r][c];
            }
        }
        return res;
    }

    // -------------------------------------------------------------
    // PROJECT 6: Universal Element Search Engine
    // -------------------------------------------------------------
    public static void searchElement(int[] arr, int target) {
        int linearSteps = 0;
        int foundLinear = -1;
        for (int i = 0; i < arr.length; i++) {
            linearSteps++;
            if (arr[i] == target) {
                foundLinear = i;
                break;
            }
        }

        // Binary search on sorted copy
        int[] sorted = arr.clone();
        Arrays.sort(sorted);
        int binSteps = 0;
        int left = 0, right = sorted.length - 1;
        int foundBin = -1;

        while (left <= right) {
            binSteps++;
            int mid = left + (right - left) / 2;
            if (sorted[mid] == target) {
                foundBin = mid;
                break;
            } else if (sorted[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        System.out.printf("  Linear Search: Index %d (took %d steps)%n", foundLinear, linearSteps);
        System.out.printf("  Binary Search: Index %d in sorted (took %d steps)%n", foundBin, binSteps);
    }

    // -------------------------------------------------------------
    // PROJECT 7: Element Frequency Counter
    // -------------------------------------------------------------
    public static void printFrequencies(int[] arr) {
        int[] sorted = arr.clone();
        Arrays.sort(sorted);

        int i = 0;
        while (i < sorted.length) {
            int count = 1;
            while (i + 1 < sorted.length && sorted[i] == sorted[i + 1]) {
                count++;
                i++;
            }
            System.out.printf("  Number %-3d : %d times%n", sorted[i], count);
            i++;
        }
    }

    public static void main(String[] args) {
        System.out.println("=== PROJECT 1: Largest & Smallest Element ===");
        int[] data = {45, 12, 89, 99, 23, 7, 65};
        findExtremes(data);

        System.out.println("\n=== PROJECT 2: In-Place Reverse ===");
        int[] revArr = {1, 2, 3, 4, 5};
        System.out.println("Before: " + Arrays.toString(revArr));
        reverseInPlace(revArr);
        System.out.println("After : " + Arrays.toString(revArr));

        System.out.println("\n=== PROJECT 3: Remove Duplicates (Sorted) ===");
        int[] dupes = {10, 10, 20, 30, 30, 30, 40, 50, 50};
        int uniqueCount = removeDuplicates(dupes);
        System.out.print("Unique Elements: ");
        for (int i = 0; i < uniqueCount; i++) System.out.print(dupes[i] + " ");
        System.out.println();

        System.out.println("\n=== PROJECT 4: Merge Two Sorted Arrays ===");
        int[] arr1 = {1, 3, 5, 7};
        int[] arr2 = {2, 4, 6, 8, 10};
        int[] merged = mergeSortedArrays(arr1, arr2);
        System.out.println("Merged Array: " + Arrays.toString(merged));

        System.out.println("\n=== PROJECT 5: Matrix Addition ===");
        int[][] mat1 = {{1, 2}, {3, 4}};
        int[][] mat2 = {{5, 6}, {7, 8}};
        int[][] sumMat = addMatrices(mat1, mat2);
        System.out.println("Matrix Sum: " + Arrays.deepToString(sumMat));

        System.out.println("\n=== PROJECT 6: Universal Search Engine ===");
        int[] searchDataset = {18, 92, 45, 77, 85, 99, 63, 10, 55};
        searchElement(searchDataset, 85);

        System.out.println("\n=== PROJECT 7: Element Frequency Counter ===");
        int[] freqData = {4, 5, 4, 2, 5, 4, 8, 2, 9};
        printFrequencies(freqData);
    }
}`,
    output: `=== PROJECT 1: Largest & Smallest Element ===
  Largest : 99 (at index 3)
  Smallest: 7 (at index 5)

=== PROJECT 2: In-Place Reverse ===
Before: [1, 2, 3, 4, 5]
After : [5, 4, 3, 2, 1]

=== PROJECT 3: Remove Duplicates (Sorted) ===
Unique Elements: 10 20 30 40 50 

=== PROJECT 4: Merge Two Sorted Arrays ===
Merged Array: [1, 2, 3, 4, 5, 6, 7, 8, 10]

=== PROJECT 5: Matrix Addition ===
Matrix Sum: [[6, 8], [10, 12]]

=== PROJECT 6: Universal Search Engine ===
  Linear Search: Index 4 (took 5 steps)
  Binary Search: Index 6 in sorted (took 3 steps)

=== PROJECT 7: Element Frequency Counter ===
  Number 2   : 2 times
  Number 4   : 3 times
  Number 5   : 2 times
  Number 8   : 1 times
  Number 9   : 1 times`,
    lineByLine: [
      {
        line: 'findExtremes(data);',
        explanation: 'Scans array in single pass O(N) to identify both minimum and maximum values and their 0-based index coordinates.'
      },
      {
        line: 'removeDuplicates(dupes);',
        explanation: 'Uses read and write pointers to overwrite duplicate slots in-place, returning total unique count.'
      },
      {
        line: 'mergeSortedArrays(arr1, arr2);',
        explanation: 'Compares heads of two sorted arrays and merges them into a single sorted output in linear O(N+M) time.'
      },
      {
        line: 'addMatrices(mat1, mat2);',
        explanation: 'Performs matrix addition by adding corresponding cell values across two 2D arrays.'
      },
      {
        line: 'printFrequencies(freqData);',
        explanation: 'Sorts array and counts adjacent identical elements in a single pass to display accurate occurrence frequency.'
      }
    ],
    practicalExample: `public class PracticalApplication {
    public static void main(String[] args) {
        // Industry Simulation: High-Frequency Stock Trading Price Level Merger
        int[] nysePrices = {150, 152, 155, 160};
        int[] nasdaqPrices = {149, 152, 158, 162};

        int[] consolidatedBook = Main.mergeSortedArrays(nysePrices, nasdaqPrices);
        System.out.println("=== Consolidated Global Order Book ===");
        System.out.println("Combined Price Tiers: " + Arrays.toString(consolidatedBook));
    }
}`,
    practicalOutput: `=== Consolidated Global Order Book ===
Combined Price Tiers: [149, 150, 152, 152, 155, 158, 160, 162]`,
    commonMistakes: [
      'Allocating a brand new array for simple reversals or deduplications instead of using in-place two-pointer techniques.',
      'Merging arrays by appending and running `Arrays.sort()`, which takes $O((N+M) \\log(N+M))$, instead of using the optimal $O(N+M)$ merge algorithm.',
      'Adding two matrices with mismatched row or column dimensions, causing `ArrayIndexOutOfBoundsException`.',
      'Forgetting that frequency counting on unsorted arrays can be optimized by sorting first or using HashMaps.'
    ],
    challenge: `// Coding Challenge:
// Write a method rotateArrayLeft(int[] arr, int k) that rotates an array to the left by k positions.
// Example: arr = [1, 2, 3, 4, 5], k = 2 ===> Result = [3, 4, 5, 1, 2]

public class Challenge {
    public static void rotateArrayLeft(int[] arr, int k) {
        int n = arr.length;
        k = k % n; // Handle k > n
        
        // Reverse first k elements
        reverse(arr, 0, k - 1);
        // Reverse remaining n - k elements
        reverse(arr, k, n - 1);
        // Reverse entire array
        reverse(arr, 0, n - 1);
    }
    
    private static void reverse(int[] arr, int start, int end) {
        while (start < end) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5};
        rotateArrayLeft(nums, 2);
        System.out.println("Rotated Left by 2: " + Arrays.toString(nums));
    }
}`,
    faq: [
      {
        q: 'Why does ArrayList replace plain arrays in enterprise applications?',
        a: '`ArrayList` handles dynamic resizing automatically, provides rich CRUD methods (`add`, `remove`, `contains`, `indexOf`), works with Generics (`ArrayList<Student>`), and integrates with the Java Stream API.'
      },
      {
        q: 'When should plain arrays still be used instead of ArrayList in modern Java?',
        a: 'Use primitive arrays (`int[]`, `double[]`) for high-performance computing, graphics processing, game engines, and low-latency financial systems because they store unboxed primitive values directly in contiguous memory without object wrapper overhead (`Integer`).'
      },
      {
        q: 'How does the two-pointer merge algorithm achieve O(N+M) time complexity?',
        a: 'Because both input arrays are already sorted, we only inspect the smallest unmerged element from either array at each step, making exactly $N + M$ comparisons without nested loops.'
      }
    ],
    recap: [
      'Java arrays are high-performance contiguous structures with $O(1)$ random access, but are limited by fixed capacity and lack of dynamic resizing.',
      'Two-pointer algorithms enable $O(N)$ in-place array reversal and $O(N+M)$ sorted array merging.',
      'Deduplication in sorted arrays can be performed in-place with a slow-write, fast-read pointer pattern.',
      'Matrix operations require consistent dimension checks and nested row-major traversal.',
      'In Phase 15, we will discover how the Collections Framework builds upon arrays to deliver dynamic resizable lists.'
    ]
  }
];

const outputFile = path.join(__dirname, 'java_phase7_data.js');
const exportContent = 'module.exports = ' + JSON.stringify(phase7Data, null, 2) + ';\n';
fs.writeFileSync(outputFile, exportContent, 'utf8');
console.log('✅ Successfully wrote scratch/java_phase7_data.js via JSON serialization!');
