const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

const { wrapCPage } = require('./build_massive_textbook_chapters_36_65.js');

console.log('🚀 Building Massive Textbook Content for Lessons 36 to 38...');

// LESSON 36
const l36 = {
  num: 36, file: '36-c-file-handling-fopen-fclose-and-text-io.html',
  title: 'C File Handling: FILE* Handles, fopen(), fclose() & Text I/O Masterclass',
  desc: 'Exhaustive textbook-grade masterclass on C File Streams (Phase 14 Part 1): FILE* stream handles, fopen() modes, fclose(), fgetc, fputc, fgets, fputs, fprintf, and fscanf.',
  phaseTag: 'Phase 14', phaseTitle: 'File Handling & I/O Streams',
  subtopics: 'FILE* Handles · fopen() Modes (r, w, a, r+, w+) · fclose() · fgetc / fputc · fgets / fputs · fprintf / fscanf · Text File Processing',
  content: '<div class="intro-box">' +
'  <p>Welcome to <strong>Phase 14 (Chapter 36): C File Handling — FILE* Handles, fopen(), fclose() &amp; Text I/O Masterclass</strong>! Disk file persistence allows C programs to store data permanently in non-volatile storage. In this guide, you will master C file streams (<code>FILE*</code>), operating system file descriptors, opening modes, and text I/O operations.</p>' +
'</div>' +
'<div class="section-title"><span class="num">1</span>File Streams Architecture &amp; RAM Buffering</div>' +
'<div class="section-body">' +
'  <p class="text-prose">In C, disk files are accessed through abstract data structures called <strong>Streams</strong> managed by <code>FILE*</code> pointers declared in <code>&lt;stdio.h&gt;</code>. Instead of making expensive direct hardware calls for every character read or written, the C standard library maintains an internal <strong>Memory Stream Buffer</strong> in RAM.</p>' +
'  <div class="memory-diagram">' +
'C File Stream Memory & RAM Buffer Architecture:\n\n' +
'User Application Space (RAM)                OS Kernel Space                        Hardware Sector\n' +
'┌───────────────────────────────┐          ┌───────────────────────────┐          ┌───────────────┐\n' +
'│ C Program Variables           │          │ Kernel Page Cache Buffer  │          │ Physical SSD  │\n' +
'│ char buffer[128];             │          │ (Managed by OS Driver)    │          │ / Hard Drive  │\n' +
'│ FILE *fp = fopen("a.txt","w");│          └─────────────▲─────────────┘          └───────▲───────┘\n' +
'└───────────────┬───────────────┘                        │                                │\n' +
'                │ fprintf / fputs                        │ OS System Call (write)         │\n' +
'                ▼                                        │                                │\n' +
'┌───────────────────────────────┐                        │                                │\n' +
'│ C Stream Buffer (4096 Bytes)  ├────────────────────────┴────────────────────────────────┘\n' +
'│ [ "Data line 1\\n", "Data..." ]│  (Flushed on fclose() or fflush())\n' +
'└───────────────────────────────┘\n' +
'  </div>' +
'  <p class="text-prose">Standard I/O streams automatically initialized on program startup include:</p>' +
'  <div class="concept-box">' +
'    <h4>The 3 Standard Streams in C:</h4>' +
'    <p>• <code>stdin</code>: Standard Input Stream (Keyboard input by default, descriptor 0).</p>' +
'    <p>• <code>stdout</code>: Standard Output Stream (Terminal screen output by default, descriptor 1).</p>' +
'    <p>• <code>stderr</code>: Standard Error Stream (Unbuffered terminal error log output, descriptor 2).</p>' +
'  </div>' +
'</div>' +
'<div class="section-title"><span class="num">2</span>fopen() File Modes Matrix &amp; NULL Guard Rule</div>' +
'<div class="section-body">' +
'  <p class="text-prose">The function <code>fopen(const char *filename, const char *mode)</code> opens a file stream and returns a pointer to a <code>FILE</code> structure. If the file cannot be opened (due to missing files, full disks, or permission denied), <code>fopen()</code> returns <code>NULL</code>.</p>' +
'  <table class="tbl spec-table">' +
'    <thead><tr><th>Mode Flag</th><th>Access Type</th><th>Behavior if File Exists</th><th>Behavior if File Missing</th></tr></thead>' +
'    <tbody>' +
'      <tr><td><code>"r"</code></td><td>Read Only</td><td>Opens file for reading at byte 0.</td><td>Returns <code>NULL</code> (Fails).</td></tr>' +
'      <tr><td><code>"w"</code></td><td>Write Only</td><td><strong>Truncates (erases) file to 0 bytes!</strong></td><td>Creates new empty file.</td></tr>' +
'      <tr><td><code>"a"</code></td><td>Append Only</td><td>Appends new data to end of file.</td><td>Creates new empty file.</td></tr>' +
'      <tr><td><code>"r+"</code></td><td>Read &amp; Write</td><td>Opens file for read/write at byte 0.</td><td>Returns <code>NULL</code> (Fails).</td></tr>' +
'      <tr><td><code>"w+"</code></td><td>Read &amp; Write</td><td>Truncates file to 0 bytes.</td><td>Creates new empty file.</td></tr>' +
'      <tr><td><code>"a+"</code></td><td>Read &amp; Append</td><td>Reads anywhere; writes always append to end.</td><td>Creates new empty file.</td></tr>' +
'    </tbody>' +
'  </table>' +
'  <div class="concept-box">' +
'    <h4>🛑 The Golden NULL Guard Rule:</h4>' +
'    <p>NEVER perform file operations without checking if <code>fopen()</code> returned <code>NULL</code>! Dereferencing a NULL <code>FILE*</code> pointer immediately triggers a <strong>Segmentation Fault</strong> crash!</p>' +
'  </div>' +
'</div>' +
'<div class="section-title"><span class="num">3</span>Text I/O Functions: Characters, Lines &amp; Formatted I/O</div>' +
'<div class="section-body">' +
'  <p class="text-prose">C provides 3 tiers of text I/O functions:</p>' +
'  <p class="text-prose">1. <strong>Character-by-Character:</strong> <code>fgetc(fp)</code> returns next character or <code>EOF</code> (-1); <code>fputc(ch, fp)</code> writes character.<br>' +
'  2. <strong>Line-by-Line:</strong> <code>fgets(buffer, size, fp)</code> safely reads lines up to newline; <code>fputs(str, fp)</code> writes string.<br>' +
'  3. <strong>Formatted I/O:</strong> <code>fprintf(fp, "fmt", args)</code> writes formatted text; <code>fscanf(fp, "fmt", &amp;args)</code> parses formatted values.</p>' +
'</div>' +
'<div class="section-title"><span class="num">4</span>Comprehensive Production Code Example</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">C — Student Report File Generator & Reader</span><a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n' +
'#include &lt;stdlib.h&gt;\n' +
'#include &lt;string.h&gt;\n\n' +
'int main(void) {\n' +
'    const char *filename = "students.txt";\n\n' +
'    // 1. WRITE DATA TO FILE\n' +
'    FILE *write_fp = fopen(filename, "w");\n' +
'    if (write_fp == NULL) {\n' +
'        perror("Error opening file for writing");\n' +
'        return EXIT_FAILURE;\n' +
'    }\n\n' +
'    fprintf(write_fp, "Ravi 85.5\\n");\n' +
'    fprintf(write_fp, "Anitha 92.0\\n");\n' +
'    fprintf(write_fp, "Kiran 78.2\\n");\n' +
'    fclose(write_fp); // Flush buffers & close stream!\n\n' +
'    printf("Student records successfully written to %s\\n\\n", filename);\n\n' +
'    // 2. READ & PARSE DATA FROM FILE\n' +
'    FILE *read_fp = fopen(filename, "r");\n' +
'    if (read_fp == NULL) {\n' +
'        perror("Error opening file for reading");\n' +
'        return EXIT_FAILURE;\n' +
'    }\n\n' +
'    char name[50];\n' +
'    float marks;\n' +
'    int count = 0;\n' +
'    float total = 0.0f;\n\n' +
'    printf("--- READING STUDENT RECORDS ---\\n");\n' +
'    while (fscanf(read_fp, "%49s %f", name, &amp;marks) == 2) {\n' +
'        printf("Student %d: %-10s | Marks: %.1f\\n", ++count, name, marks);\n' +
'        total += marks;\n' +
'    }\n\n' +
'    if (count &gt; 0) {\n' +
'        printf("Average Class Marks: %.2f\\n", total / count);\n' +
'    }\n\n' +
'    fclose(read_fp);\n' +
'    return EXIT_SUCCESS;\n' +
'}</code></pre>' +
'  </div>' +
'</div>' +
'<div class="section-title"><span class="num">5</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: Why must we always call fclose()?</h4><p>Calling <code>fclose()</code> flushes any unwritten data remaining in the RAM stream buffer to physical disk and releases operating system kernel file descriptors.</p></div>' +
'    <div class="faq-item"><h4>Q2: What is the difference between fgets() and fscanf()?</h4><p><code>fgets()</code> reads an entire line including spaces safely until a newline character or buffer limit. <code>fscanf()</code> parses whitespace-separated formatted tokens.</p></div>' +
'    <div class="faq-item"><h4>Q3: What does EOF represent in C?</h4><p><code>EOF</code> is a macro constant (typically -1) returned by functions when the end of a file is reached or a read error occurs.</p></div>' +
'    <div class="faq-item"><h4>Q4: How do you force unwritten RAM buffers to disk immediately?</h4><p>You can call <code>fflush(fp);</code> to force the C runtime library to flush all pending buffer contents directly to the OS kernel without closing the file handle.</p></div>' +
'    <div class="faq-item"><h4>Q5: What happens if you open an existing file with mode "w"?</h4><p>The file is immediately truncated (cleared to 0 bytes length), completely erasing any pre-existing data inside it!</p></div>' +
'  </div>' +
'</div>'
};

// LESSON 37
const l37 = {
  num: 37, file: '37-c-binary-file-io-fwrite-fread-and-file-positioning.html',
  title: 'C Binary File I/O, Struct Serialization & fseek() Positioning Masterclass',
  desc: 'Exhaustive textbook-grade masterclass on Binary Files in C (Phase 14 Part 2): Binary modes ("rb", "wb"), fwrite(), fread(), struct serialization, fseek(), ftell(), and rewind().',
  phaseTag: 'Phase 14', phaseTitle: 'File Handling & I/O Streams',
  subtopics: 'Binary File Modes (rb, wb) · fwrite() & fread() · Struct Serialization · Random Access Positioning (fseek, ftell, rewind) · SEEK_SET / SEEK_CUR / SEEK_END',
  content: '<div class="intro-box">' +
'  <p>Welcome to <strong>Phase 14 (Chapter 37): C Binary File I/O, Struct Serialization &amp; fseek() Positioning Masterclass</strong>! While text files format values into human-readable ASCII strings, binary files write exact RAM byte images directly to disk. In this guide, you will master <code>fwrite()</code>, <code>fread()</code>, binary struct serialization, and random-access positioning with <code>fseek()</code>.</p>' +
'</div>' +
'<div class="section-title"><span class="num">1</span>Text Files vs Binary Files Comparison</div>' +
'<div class="section-body">' +
'  <p class="text-prose">Binary files store raw memory byte blocks without string conversion overhead.</p>' +
'  <table class="tbl spec-table">' +
'    <thead><tr><th>Feature</th><th>Text Files ("r", "w", "a")</th><th>Binary Files ("rb", "wb", "ab")</th></tr></thead>' +
'    <tbody>' +
'      <tr><td>Data Storage</td><td>ASCII / UTF-8 Characters</td><td>Exact RAM Raw Bytes</td></tr>' +
'      <tr><td>Storage Size</td><td>Variable (Integer 1234567 = 7 bytes)</td><td>Fixed (32-bit int = 4 bytes)</td></tr>' +
'      <tr><td>Processing Speed</td><td>Slower (Requires parsing formatted text)</td><td>Ultra Fast (Direct RAM-to-Disk block copy)</td></tr>' +
'      <tr><td>Newline Translation</td><td>OS converts \\n to \\r\\n on Windows</td><td>No translation (Pure byte fidelity)</td></tr>' +
'    </tbody>' +
'  </table>' +
'</div>' +
'<div class="section-title"><span class="num">2</span>fwrite(), fread() &amp; Binary Struct Serialization</div>' +
'<div class="section-body">' +
'  <p class="text-prose">Binary I/O functions move blocks of memory between RAM and disk:</p>' +
'  <div class="concept-box">' +
'    <h4>Binary I/O Function Signatures:</h4>' +
'    <p>• <code>size_t fwrite(const void *ptr, size_t size, size_t count, FILE *stream);</code></p>' +
'    <p>• <code>size_t fread(void *ptr, size_t size, size_t count, FILE *stream);</code></p>' +
'  </div>' +
'  <p class="text-prose">Passing <code>&amp;structInstance</code> writes the entire C structure (including internal member bytes) in one single atomic I/O operation!</p>' +
'</div>' +
'<div class="section-title"><span class="num">3</span>Random Access File Positioning (fseek, ftell, rewind)</div>' +
'<div class="section-body">' +
'  <p class="text-prose">By default, file reading and writing happen sequentially. Functions in <code>&lt;stdio.h&gt;</code> allow moving the <strong>File Position Indicator</strong> to any arbitrary byte location:</p>' +
'  <div class="memory-diagram">' +
'File Byte Offset Positioning Indicator in RAM/Disk:\n\n' +
'Byte Index:    0     100    200    300    400    500 (EOF)\n' +
'File Buffer:  [ HEADER | RECORD 1 | RECORD 2 | RECORD 3 ]\n' +
'                ▲                     ▲              ▲\n' +
'                │                     │              │\n' +
'             SEEK_SET              SEEK_CUR       SEEK_END\n' +
'          (File Start)         (Current Position) (End of File)\n' +
'  </div>' +
'  <p class="text-prose">• <code>fseek(fp, offset, origin)</code>: Moves file cursor. <code>origin</code> can be <code>SEEK_SET</code> (0), <code>SEEK_CUR</code> (current), or <code>SEEK_END</code> (file end).<br>' +
'  • <code>ftell(fp)</code>: Returns current byte offset location from file start.<br>' +
'  • <code>rewind(fp)</code>: Resets file pointer back to index 0.</p>' +
'</div>' +
'<div class="section-title"><span class="num">4</span>Comprehensive Production Code Example</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">C — Binary Database Indexing & Random Lookup</span><a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n' +
'#include &lt;stdlib.h&gt;\n\n' +
'typedef struct {\n' +
'    int id;\n' +
'    char name[30];\n' +
'    double balance;\n' +
'} Account;\n\n' +
'int main(void) {\n' +
'    const char *db_file = "bank_accounts.dat";\n\n' +
'    Account accounts[3] = {\n' +
'        {101, "Ravi Kumar", 45000.50},\n' +
'        {102, "Anitha Roy", 89200.75},\n' +
'        {103, "Kiran Sharma", 12300.00}\n' +
'    };\n\n' +
'    FILE *fp = fopen(db_file, "wb");\n' +
'    if (!fp) { perror("Failed to create db"); return 1; }\n' +
'    fwrite(accounts, sizeof(Account), 3, fp);\n' +
'    fclose(fp);\n' +
'    printf("Successfully serialized 3 Account structs to binary file.\\n");\n\n' +
'    fp = fopen(db_file, "rb");\n' +
'    if (!fp) { perror("Failed to open db"); return 1; }\n\n' +
'    fseek(fp, 0, SEEK_END);\n' +
'    long fileSize = ftell(fp);\n' +
'    printf("Total Binary File Size: %ld Bytes (%ld Accounts)\\n", fileSize, fileSize / sizeof(Account));\n\n' +
'    int targetIndex = 1;\n' +
'    long offset = targetIndex * sizeof(Account);\n' +
'    fseek(fp, offset, SEEK_SET);\n\n' +
'    Account found;\n' +
'    if (fread(&amp;found, sizeof(Account), 1, fp) == 1) {\n' +
'        printf("\\n--- DIRECT RECORD LOOKUP (Index %d) ---\\n", targetIndex);\n' +
'        printf("ID: %d | Name: %s | Balance: $%.2f\\n", found.id, found.name, found.balance);\n' +
'    }\n' +
'    fclose(fp);\n' +
'    return 0;\n' +
'}</code></pre>' +
'  </div>' +
'</div>' +
'<div class="section-title"><span class="num">5</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: Why are binary files not portable across different CPU architectures?</h4><p>Binary files write raw RAM memory bytes. Different CPUs have different Endianness (Little-Endian Intel vs Big-Endian Network) and struct padding alignment rules.</p></div>' +
'    <div class="faq-item"><h4>Q2: How do you find the exact byte size of a file in C?</h4><p>Use <code>fseek(fp, 0, SEEK_END); long size = ftell(fp); rewind(fp);</code>.</p></div>' +
'    <div class="faq-item"><h4>Q3: What does the return value of fread() and fwrite() indicate?</h4><p>They return the number of elements successfully read or written, NOT byte counts.</p></div>' +
'    <div class="faq-item"><h4>Q4: Why specify "b" in fopen() mode string ("rb", "wb")?</h4><p>On Windows operating systems, opening files without "b" treats them as text files, automatically altering \\r\\n bytes which corrupts raw binary images.</p></div>' +
'    <div class="faq-item"><h4>Q5: What is struct padding risk during binary serialization?</h4><p>Compilers insert padding hole bytes inside structures for RAM memory alignment. Writing raw structs writes these padding bytes, wasting disk space.</p></div>' +
'  </div>' +
'</div>'
};

// LESSON 38
const l38 = {
  num: 38, file: '38-c-file-error-handling-feof-ferror-and-errno.html',
  title: 'C File Error Handling, EOF Detection, ferror() & errno Masterclass',
  desc: 'Exhaustive textbook-grade masterclass on File Error Handling in C (Phase 14 Part 3): feof(), ferror(), <errno.h> system error codes, perror(), strerror(), and production file utilities.',
  phaseTag: 'Phase 14', phaseTitle: 'File Handling & I/O Streams',
  subtopics: 'feof() EOF Detection · ferror() Error Checking · <errno.h> System Errors · perror() & strerror() · File Copy & Log File Utility Programs',
  content: '<div class="intro-box">' +
'  <p>Welcome to <strong>Phase 14 (Chapter 38): C File Error Handling, EOF Detection, ferror() &amp; errno Masterclass</strong>! Production C software must gracefully handle runtime I/O failures (missing files, full disks, invalid permissions, hardware disconnects). In this guide, you will master system error reporting with <code>&lt;errno.h&gt;</code>, <code>perror()</code>, <code>feof()</code>, and <code>ferror()</code>.</p>' +
'</div>' +
'<div class="section-title"><span class="num">1</span>feof() vs ferror() Mechanics</div>' +
'<div class="section-body">' +
'  <p class="text-prose">When an I/O operation returns an end-of-file condition or failure indicator, C provides two distinct diagnostic status checkers:</p>' +
'  <div class="concept-box">' +
'    <h4>feof() vs ferror() Matrix:</h4>' +
'    <p>• <code>feof(FILE *fp)</code>: Returns non-zero (true) if stream reached <strong>End-Of-File</strong> normally.</p>' +
'    <p>• <code>ferror(FILE *fp)</code>: Returns non-zero (true) if stream encountered a <strong>Hardware or System I/O Error</strong>.</p>' +
'    <p>• <code>clearerr(FILE *fp)</code>: Clears both EOF and error flags for the given stream.</p>' +
'  </div>' +
'  <div class="concept-box">' +
'    <h4>⚠️ The feof() Loop Bug Trap:</h4>' +
'    <p>DO NOT write <code>while (!feof(fp))</code>! <code>feof()</code> becomes true ONLY AFTER a read operation attempts to read past the end of the file and fails.</p>' +
'  </div>' +
'</div>' +
'<div class="section-title"><span class="num">2</span>System Error Reporting with &lt;errno.h&gt;</div>' +
'<div class="section-body">' +
'  <p class="text-prose">When standard library functions fail, they set a thread-global integer variable <code>errno</code> defined in <code>&lt;errno.h&gt;</code> to an OS-specific error code:</p>' +
'  <table class="tbl spec-table">' +
'    <thead><tr><th>errno Constant</th><th>Integer Code</th><th>Meaning</th></tr></thead>' +
'    <tbody>' +
'      <tr><td><code>ENOENT</code></td><td>2</td><td>No such file or directory.</td></tr>' +
'      <tr><td><code>EACCES</code></td><td>13</td><td>Permission denied (Read/Write forbidden).</td></tr>' +
'      <tr><td><code>EEXIST</code></td><td>17</td><td>File already exists.</td></tr>' +
'      <tr><td><code>ENOSPC</code></td><td>28</td><td>No space left on device (Disk Full).</td></tr>' +
'    </tbody>' +
'  </table>' +
'  <p class="text-prose">C provides 2 helper functions to convert <code>errno</code> integers into human-readable messages:<br>' +
'  • <code>perror("Custom Prefix")</code>: Prints prefix + descriptive system message to <code>stderr</code>.<br>' +
'  • <code>strerror(errno)</code>: Returns <code>const char*</code> string message from <code>&lt;string.h&gt;</code>.</p>' +
'</div>' +
'<div class="section-title"><span class="num">3</span>Comprehensive Production Code Example</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">C — Robust Production File Copying Utility</span><a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a></div>' +
'<pre><code>#include &lt;stdio.h&gt;\n' +
'#include &lt;stdlib.h&gt;\n' +
'#include &lt;errno.h&gt;\n' +
'#include &lt;string.h&gt;\n\n' +
'#define BUFFER_SIZE 4096\n\n' +
'int copyFile(const char *srcPath, const char *destPath) {\n' +
'    FILE *src = fopen(srcPath, "rb");\n' +
'    if (!src) {\n' +
'        fprintf(stderr, "Error opening source \'%s\': %s (Errno %d)\\n", srcPath, strerror(errno), errno);\n' +
'        return -1;\n' +
'    }\n' +
'    FILE *dest = fopen(destPath, "wb");\n' +
'    if (!dest) {\n' +
'        fprintf(stderr, "Error opening destination \'%s\': %s\\n", destPath, strerror(errno));\n' +
'        fclose(src);\n' +
'        return -1;\n' +
'    }\n' +
'    unsigned char buffer[BUFFER_SIZE];\n' +
'    size_t bytesRead, bytesWritten;\n' +
'    while ((bytesRead = fread(buffer, 1, BUFFER_SIZE, src)) &gt; 0) {\n' +
'        bytesWritten = fwrite(buffer, 1, bytesRead, dest);\n' +
'        if (bytesWritten &lt; bytesRead) {\n' +
'            perror("Disk Write Failure");\n' +
'            fclose(src); fclose(dest);\n' +
'            return -1;\n' +
'        }\n' +
'    }\n' +
'    if (ferror(src)) {\n' +
'        fprintf(stderr, "Hardware Read Failure on \'%s\'\\n", srcPath);\n' +
'        fclose(src); fclose(dest);\n' +
'        return -1;\n' +
'    }\n' +
'    if (feof(src)) {\n' +
'        printf("File copy successful! All bytes transferred safely.\\n");\n' +
'    }\n' +
'    fclose(src); fclose(dest);\n' +
'    return 0;\n' +
'}\n\n' +
'int main(void) {\n' +
'    copyFile("non_existent_input.bin", "output_copy.bin");\n' +
'    return 0;\n' +
'}</code></pre>' +
'  </div>' +
'</div>' +
'<div class="section-title"><span class="num">4</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: Why does perror() print to stderr instead of stdout?</h4><p>Printing error logs to <code>stderr</code> ensures diagnostic messages are visible in console output even when standard stdout is redirected to a file or pipe.</p></div>' +
'    <div class="faq-item"><h4>Q2: Must we clear errno before calling a library function?</h4><p>Yes! Library functions set errno on failure but DO NOT reset errno to 0 on success.</p></div>' +
'    <div class="faq-item"><h4>Q3: What function clears stream error flags?</h4><p>Calling <code>clearerr(fp)</code> resets both feof and ferror indicators for the specified stream handle.</p></div>' +
'    <div class="faq-item"><h4>Q4: How do you append timestamped logs safely to disk?</h4><p>Open the file with <code>fopen("app.log", "a")</code>. Append operations atomically jump to the end of file before every write.</p></div>' +
'    <div class="faq-item"><h4>Q5: What is the return value of strerror_s or strerror_r?</h4><p>They are thread-safe versions of <code>strerror()</code> introduced to prevent race conditions in multithreaded applications.</p></div>' +
'  </div>' +
'</div>'
};

fs.writeFileSync(path.join(cDir, l36.file), wrapCPage(l36.title, l36.desc, l36.file, 36, l36.phaseTag, l36.phaseTitle, l36.subtopics, l36.content, '35-c-dynamic-arrays-strings-structures-and-memory-debugging.html', '35. Dynamic Collections, Ownership & Valgrind Debugging', '37-c-binary-file-io-fwrite-fread-and-file-positioning.html', '37. Binary File I/O, Struct Serialization & fseek()'), 'utf8');
fs.writeFileSync(path.join(cDir, l37.file), wrapCPage(l37.title, l37.desc, l37.file, 37, l37.phaseTag, l37.phaseTitle, l37.subtopics, l37.content, '36-c-file-handling-fopen-fclose-and-text-io.html', '36. File Streams, fopen(), fclose() & Text I/O', '38-c-file-error-handling-feof-ferror-and-errno.html', '38. File Error Handling, EOF, ferror() & errno'), 'utf8');
fs.writeFileSync(path.join(cDir, l38.file), wrapCPage(l38.title, l38.desc, l38.file, 38, l38.phaseTag, l38.phaseTitle, l38.subtopics, l38.content, '37-c-binary-file-io-fwrite-fread-and-file-positioning.html', '37. Binary File I/O, Struct Serialization & fseek()', '39-c-preprocessor-directives-and-macro-pitfalls.html', '39. Preprocessor Directives & Macro Pitfalls'), 'utf8');

console.log('✅ Generated MASSIVE textbook content for Lessons 36, 37, 38!');
