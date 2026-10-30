const fs = require('fs');
const path = require('path');
const { LESSONS } = require('./csharp_curriculum_data.js');
const { generatePageHtml } = require('./csharp_page_template.js');

const csharpDir = path.join(__dirname, '../public/blog-csharp');

// ==========================================
// HIGH-VALUE EDITORIAL MASTERCLASS CONTENT: PHASE 1 (CH 01 - 04)
// ==========================================

const PHASE1_CONTENTS = {
  // -------------------------------------------------------------
  // CHAPTER 1: C# & .NET 8 INTRODUCTION & SETUP
  // -------------------------------------------------------------
  1: `
    <div class="intro-box">
      మైక్రోసాఫ్ట్ సంస్థ రూపొందించిన ఆధునిక సాఫ్ట్‌వేర్ ప్రపంచంలో అత్యంత శక్తివంతమైన, పాపులర్ మరియు బహుముఖ ప్రోగ్రామింగ్ భాష <strong>C# (సీ-షార్ప్)</strong>. ఎంటర్‌ప్రైజ్ వెబ్ అప్లికేషన్లు, క్లౌడ్ మైక్రోసర్వీసెస్ (Azure/AWS), గేమింగ్ ఇండస్ట్రీ (Unity Engine), మరియు క్రాస్-ప్లాట్‌ఫామ్ మొబైల్ యాప్స్‌ను నిర్మించడానికి C# &amp; .NET 8 పవర్‌హౌస్ లాంటివి. ఈ అధ్యాయంలో C# పుట్టుక, .NET 3-టైర్ ఆర్కిటెక్చర్ (CIL, CLR &amp; JIT Compiler), మరియు మీ మొదటి C# 12 ప్రోగ్రామ్ అంతర్గత పనితీరును సమగ్రంగా పరిశీలిద్దాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>C# అంటే ఏమిటి? Origins & Anders Hejlsberg ఫిలాసఫీ</div>
    <div class="section-body">
      <p>
        <strong>C#</strong> అనేది ఒక modern, object-oriented, type-safe, component-oriented, garbage-collected ప్రోగ్రామింగ్ భాష. దీనిని 2000వ సంవత్సరంలో మైక్రోసాఫ్ట్‌లోని ప్రముఖ సాఫ్ట్‌వేర్ ఆర్కిటెక్ట్ <strong>Anders Hejlsberg (ఆండర్స్ హెజ్ల్స్‌బర్గ్)</strong> (Turbo Pascal మరియు Delphi సృష్టికర్త) నేతృత్వంలో రూపొందించారు.
      </p>

      <div style="background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0; padding:16px 20px; margin:20px 0; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
        <h4 style="color:#10b981; margin:0 0 8px 0; font-size:15px; font-weight:700;">💡 C# యొక్క ప్రధాన మూలస్తంభాలు (Core Pillars):</h4>
        <ul style="margin:0; padding-left:20px; line-height:1.8; color:var(--text); font-size:14px;">
          <li><strong>Type Safety (టైప్ సేఫ్టీ):</strong> కంపైలర్ ప్రతి వేరియబుల్ డేటా రకాన్ని కఠినంగా తనిఖీ చేస్తుంది. తప్పు డేటా టైప్స్ వల్ల వచ్చే రన్‌టైమ్ క్రాష్‌లను ముందే నివారిస్తుంది.</li>
          <li><strong>Automatic Memory Management (Garbage Collector):</strong> C/C++ లో లాగా మెమరీని మాన్యువల్‌గా <code>free()</code> చేయాల్సిన అవసరం లేదు. బ్యాక్‌గ్రౌండ్‌లో రన్ అయ్యే <strong>CLR Garbage Collector (GC)</strong> పనికిరాని ఆబ్జెక్టులను స్వయంచాలకంగా క్లీన్ చేస్తుంది.</li>
          <li><strong>Modern &amp; Expressive Syntax:</strong> Pattern Matching, Records, LINQ, Async/Await మరియు Nullable Reference Types వంటి అత్యాధునిక ఫీచర్లు కోడ్‌ను సంక్షిప్తంగా, సురక్షితంగా చేస్తాయి.</li>
          <li><strong>Cross-Platform Freedom:</strong> .NET Core మరియు .NET 8 లతో C# కోడ్ విండోస్ మాత్రమే కాకుండా Linux, macOS, Docker మరియు WebAssembly (Blazor) లపై అద్భుతంగా రన్ అవుతుంది.</li>
        </ul>
      </div>

      <h4 style="color:#10b981; margin:24px 0 12px; font-size:16px; font-weight:700;">🌍 పరిశ్రమల్లో C# ను ఎక్కడ ఉపయోగిస్తున్నారు?</h4>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:16px; margin-bottom:20px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <strong style="color:var(--text); display:block; margin-bottom:6px;">🌐 Enterprise Web APIs</strong>
          <span style="font-size:13px; color:var(--text2); line-height:1.5; display:block;">ప్రపంచంలోని అతిపెద్ద బ్యాంకులు, ఈ-కామర్స్ పోర్టల్స్ ASP.NET Core తో హై-స్పీడ్ REST APIs నిర్మిస్తున్నాయి.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <strong style="color:var(--text); display:block; margin-bottom:6px;">🎮 Game Development (Unity)</strong>
          <span style="font-size:13px; color:var(--text2); line-height:1.5; display:block;">ప్రపంచవ్యాప్తంగా 70% కంటే ఎక్కువ మొబైల్ &amp; PC గేమ్స్ Unity 3D ఇంజిన్ లో C# తోనే కోడ్ చేయబడుతున్నాయి.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <strong style="color:var(--text); display:block; margin-bottom:6px;">☁️ Cloud &amp; Microservices</strong>
          <span style="font-size:13px; color:var(--text2); line-height:1.5; display:block;">Azure మరియు AWS లపై మైక్రోసర్వీసెస్, సర్వర్‌లెస్ ఫంక్షన్లు, మరియు డాకర్ కంటైనర్లలో C# రారాజు.</span>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <strong style="color:var(--text); display:block; margin-bottom:6px;">📱 Cross-Platform Apps</strong>
          <span style="font-size:13px; color:var(--text2); line-height:1.5; display:block;">.NET MAUI ద్వారా ఒకే C# కోడ్‌బేస్‌తో Android, iOS, Windows, మరియు macOS యాప్‌లు తయారుచేయవచ్చు.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>.NET 8 ఆర్కిటెక్చర్ — CIL, CLR & JIT కంపైలర్ పైప్‌లైన్</div>
    <div class="section-body">
      <p>
        చాలామంది బిగినర్స్ C# కోడ్ రాసినప్పుడు అది నేరుగా కంప్యూటర్ మెషిన్ లాంగ్వేజ్ (0s &amp; 1s) గా మారిపోతుందని భావిస్తారు. కానీ తెరవెనుక .NET ప్లాట్‌ఫామ్ ఒక 3-దశల ఎగ్జిక్యూషన్ పైప్‌లైన్ ను ఉపయోగిస్తుంది:
      </p>

      <div style="display:flex; flex-direction:column; gap:12px; margin:20px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3b82f6; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#3b82f6; font-size:14.5px;">దశ 1: Roslyn Compiler — సోర్స్ కోడ్ నుండి CIL బైనరీ</div>
          <p style="font-size:13.5px; color:var(--text2); margin:6px 0 0 0; line-height:1.6;">
            మీరు రాసిన <code>.cs</code> ఫైల్‌ను మైక్రోసాఫ్ట్ Roslyn కంపైలర్ పరిశీలించి, ప్రాసెసర్-స్వతంత్ర ఇంటర్మీడియట్ కోడ్ అయిన <strong>CIL (Common Intermediate Language)</strong> లేదా <strong>IL Bytecode</strong> మరియు మెటాడేటాగా మారుస్తుంది. దీని అవుట్‌పుట్ <strong>.dll</strong> (లేదా .exe) అసెంబ్లీ.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#10b981; font-size:14.5px;">దశ 2: Common Language Runtime (CLR) — వర్చువల్ ఎగ్జిక్యూషన్ ఇంజిన్</div>
          <p style="font-size:13.5px; color:var(--text2); margin:6px 0 0 0; line-height:1.6;">
            <strong>CLR</strong> అనేది .NET యొక్క వర్చువల్ మెషిన్ ఇంజిన్. ఇది ప్రోగ్రామ్‌కు అవసరమైన మెమరీని కేటాయించడం, టైప్ సేఫ్టీని ధృవీకరించడం, ఎక్సెప్షన్లను హ్యాండిల్ చేయడం, మరియు గార్బేజ్ కలెక్షన్‌ను నిర్వహించే అంతర్గత రక్షక కవచం.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f59e0b; border-radius:8px; padding:14px 18px;">
          <div style="font-weight:700; color:#f59e0b; font-size:14.5px;">దశ 3: Just-In-Time (JIT) Compiler — నేటివ్ CPU మెషిన్ కోడ్</div>
          <p style="font-size:13.5px; color:var(--text2); margin:6px 0 0 0; line-height:1.6;">
            ప్రోగ్రామ్ రన్ అవుతున్న ఖచ్చితమైన క్షణంలో (At Runtime), CLR లోని <strong>JIT కంపైలర్</strong> ఆ IL బైట్‌కోడ్‌ను మీ కంప్యూటర్ ప్రాసెసర్ (x86-64, ARM64) నేరుగా అమలు చేయగల అత్యంత వేగవంతమైన నేటివ్ మెషిన్ కోడ్‌గా మారుస్తుంది.
          </p>
        </div>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>డెవలప్‌మెంట్ ఎన్విరాన్‌మెంట్ సెటప్ — .NET SDK & CLI</div>
    <div class="section-body">
      <p>
        C# కోడింగ్ ప్రారంభించడానికి మీ కంప్యూటర్‌లో <strong>.NET 8 SDK</strong> మాత్రమే అవసరం. SDK (Software Development Kit) లో కంపైలర్, రన్‌టైమ్ మరియు శక్తివంతమైన <code>dotnet</code> CLI టూల్స్ ఉంటాయి.
      </p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px; margin:16px 0;">
        <h4 style="color:#10b981; margin:0 0 8px 0; font-size:14.5px;">💻 ప్రతి C# డెవలపర్ తెలుసుకోవలసిన 3 ప్రాథమిక CLI కమాండ్లు:</h4>
        <div style="font-family:monospace; font-size:13px; line-height:1.8; color:var(--text);">
          <div style="padding:4px 0;"><span style="color:#10b981; font-weight:700;">dotnet new console -o HelloApp</span> : కొత్త కన్సోల్ ప్రాజెక్ట్‌ను సృష్టిస్తుంది.</div>
          <div style="padding:4px 0;"><span style="color:#10b981; font-weight:700;">cd HelloApp &amp;&amp; dotnet run</span> : కోడ్‌ను కంపైల్ చేసి వెంటనే రన్ చేస్తుంది.</div>
          <div style="padding:4px 0;"><span style="color:#10b981; font-weight:700;">dotnet build</span> : కోడ్‌లో ఎర్రర్లు ఉన్నాయో లేదో కంపైల్ చేసి తనిఖీ చేస్తుంది.</div>
        </div>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>మొదటి C# ప్రోగ్రామ్: Hello World & Top-Level Statements</div>
    <div class="section-body">
      <p>
        ఆధునిక C# (C# 9 నుండి C# 12 వరకు) లో అనవసరమైన బోయిలర్‌ప్లేట్ కోడ్‌ను తీసివేసి <strong>Top-Level Statements</strong> అనే విప్లవాత్మక ఫీచర్‌ను ప్రవేశపెట్టారు. విద్యార్థులు క్లాసులు, నేమ్‌స్పేస్‌లతో సతమతం కాకుండా నేరుగా లాజిక్ రాయవచ్చు:
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C# — Modern Hello World (Top-Level Statement)</span>
          <a class="try-btn" href="/online-csharp-compiler.html">⚡ Try in C# Compiler</a>
        </div>
        <pre><code>// ఆధునిక C# 12 ప్రోగ్రామ్: ఒకే లైన్ తో అద్భుతమైన ప్రారంభం!
Console.WriteLine("నమస్కారం, C# & .NET 8 ప్రపంచానికి స్వాగతం!");

int year = 2026;
Console.WriteLine($"ప్రస్తుత ఎడిషన్: {year}");</code></pre>
      </div>

      <h4 style="color:#10b981; margin:20px 0 10px; font-size:15px; font-weight:700;">🔍 క్లాసిక్ C# స్ట్రక్చర్ vs మోడ్రన్ టాప్-లెవల్ స్ట్రక్చర్:</h4>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin-bottom:20px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px;">
          <strong style="color:var(--text2); display:block; margin-bottom:6px; font-size:13px;">🏛️ క్లాసిక్ C# 8 వరకు (సాంప్రదాయ పద్ధతి):</strong>
          <pre style="font-size:12px; margin:0; padding:10px; background:var(--bg3); border-radius:6px; line-height:1.4;"><code>using System;

namespace HelloWorldApp {
    class Program {
        static void Main(string[] args) {
            Console.WriteLine("Hello!");
        }
    }
}</code></pre>
        </div>

        <div style="background:var(--bg2); border:1px solid #10b981; border-radius:8px; padding:14px;">
          <strong style="color:#10b981; display:block; margin-bottom:6px; font-size:13px;">⚡ మోడ్రన్ C# 9 నుండి C# 12 (ఆధునిక పద్ధతి):</strong>
          <pre style="font-size:12px; margin:0; padding:10px; background:var(--bg3); border-radius:6px; line-height:1.4;"><code>// కంపైలర్ స్వయంచాలకంగా Main() మరియు class ని సృష్టిస్తుంది!
Console.WriteLine("Hello!");</code></pre>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:8px; font-size:13.5px; color:var(--text); line-height:1.7;">
        <div>• <strong>Console</strong>: ఇది <code>System</code> నేమ్‌స్పేస్‌లో ఉన్న ఒక స్టాటిక్ క్లాస్. ఇది కీబోర్డ్ ఇన్‌పుట్ మరియు స్క్రీన్ అవుట్‌పుట్ స్ట్రీమ్‌లను నిర్వహిస్తుంది.</div>
        <div>• <strong>WriteLine()</strong>: ఇచ్చిన టెక్స్ట్‌ను స్క్రీన్‌పై ముద్రించి కర్సర్‌ను తర్వాతి లైన్‌కు (Newline) తీసుకువెళుతుంది.</div>
        <div>• <strong>$"{year}" (String Interpolation)</strong>: డాలర్ <code>$</code> గుర్తుతో వేరియబుల్స్ ను కర్లీ బ్రేసెస్ లోపల సులువుగా ఎంబెడ్ చేయవచ్చు.</div>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. కేస్-సెన్సిటివిటీ మర్చిపోవడం (Case Sensitivity Error):</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">console.writeline("Hello"); // తప్పు! C# లో C మరియు W క్యాపిటల్ లెటర్స్</code>
          <span style="font-size:13px; color:var(--text2); display:block;">C# కచ్చితమైన Case-Sensitive లాంగ్వేజ్. <code>Console.WriteLine</code> ని స్మాల్ లెటర్స్‌తో రాస్తే కంపైలర్ ఎర్రర్ ఇస్తుంది.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. .NET SDK కి బదులుగా కేవలం Runtime డౌన్‌లోడ్ చేసుకోవడం:</div>
          <span style="font-size:13px; color:var(--text2); display:block; margin-top:4px;">కేవలం .NET Runtime డౌన్‌లోడ్ చేసుకుంటే ముందే కంపైల్ అయిన యాప్‌లను మాత్రమే రన్ చేయగలం కానీ కొత్త కోడ్ కంపైల్ చేయలేం. డెవలపర్లు ఎల్లప్పుడూ <strong>.NET SDK</strong> నే ఇన్‌స్టాల్ చేసుకోవాలి.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 3. ఒకే ప్రాజెక్ట్‌లో రెండు ఫైల్స్‌లో టాప్-లెవల్ స్టేట్‌మెంట్స్ రాయడం:</div>
          <span style="font-size:13px; color:var(--text2); display:block; margin-top:4px;">C# లో ఒక ప్రాజెక్ట్‌లోని కేవలం ఒకే ఒక్క ఫైల్ మాత్రమే Top-Level Statements కలిగి ఉండాలి. రెండు ఫైల్స్‌లో రాస్తే "Only one compilation unit can have top-level statements" ఎర్రర్ వస్తుంది.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: C# నేర్చుకోవడానికి ముందు C లేదా C++ నేర్చుకోవడం తప్పనిసరా?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            అస్సలు అవసరం లేదు! C# చాలా యూజర్ ఫ్రెండ్లీ మరియు అధునాతన లాంగ్వేజ్. పాయింటర్లు, మాన్యువల్ మెమరీ డీఅలొకేషన్ వంటి సంక్లిష్టతలు లేకుండా నేరుగా మొదటి లాంగ్వేజ్‌గా C# ను ఎవరైనా సులభంగా నేర్చుకోవచ్చు.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: పాత .NET Framework మరియు మోడ్రన్ .NET 8 ల మధ్య ముఖ్యమైన తేడా ఏమిటి?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            పాత .NET Framework (4.x వరకు) కేవలం విండోస్ ఆపరేటింగ్ సిస్టమ్‌పై మాత్రమే పనిచేసేది. ఆధునిక .NET 8 అనేది పూర్తిగా ఓపెన్-సోర్స్, అత్యంత వేగవంతమైనది మరియు లైనక్స్, డాకర్, మాక్, విండోస్‌లలో సమానంగా రన్ అయ్యే క్రాస్-ప్లాట్‌ఫామ్ ఫ్రేమ్‌వర్క్.
          </p>
        </div>
      </div>
    </div>
  `,

  // -------------------------------------------------------------
  // CHAPTER 2: VARIABLES, DATA TYPES & VAR
  // -------------------------------------------------------------
  2: `
    <div class="intro-box">
      కంప్యూటర్ ప్రోగ్రామింగ్ అంటే వాస్తవానికి డేటాను మెమరీలో భద్రపరచడం, ప్రాసెస్ చేయడం మరియు తిరిగి ప్రదర్శించడమే. C# లో బలమైన <strong>Common Type System (CTS)</strong> ఉంది. మెమరీ నిర్వహణలో కీలకమైన <strong>Stack (Value Types) vs Heap (Reference Types)</strong> వ్యత్యాసం, <code>var</code> టైప్ ఇన్ఫరెన్స్, మరియు <code>const</code> vs <code>readonly</code> ల గురించి ఈ అధ్యాయంలో సమగ్రంగా తెలుసుకుందాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>Common Type System (CTS) — Value Types vs Reference Types</div>
    <div class="section-body">
      <p>
        C# లోని ప్రతి డేటా రకం అంతర్గతంగా <code>System.Object</code> మూల క్లాస్ నుండి ఉద్భవిస్తుంది. అయితే కంప్యూటర్ మెమరీలో డేటా నిల్వ అయ్యే విధానాన్ని బట్టి C# డేటా టైప్స్‌ను రెండు ప్రధాన వర్గాలుగా విభజించింది:
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:20px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 8px 0; font-size:15px;">📦 Value Types (స్టాక్ మెమరీ):</h4>
          <p style="font-size:13px; color:var(--text2); margin:0 0 8px 0; line-height:1.6;">
            ఈ వేరియబుల్స్ తమ వాస్తవ డేటాను నేరుగా <strong>Stack Memory</strong> లోనే భద్రపరుస్తాయి. ఒక వేరియబుల్‌ను మరొకదానికి అసైన్ చేసినప్పుడు విలువ యొక్క పూర్తి నకలు (Copy of value) ఏర్పడుతుంది.
          </p>
          <div style="font-size:12.5px; color:var(--text); background:var(--bg3); padding:8px; border-radius:4px;">
            ఉదాహరణలు: <code>int</code>, <code>float</code>, <code>double</code>, <code>decimal</code>, <code>bool</code>, <code>char</code>, <code>struct</code>, <code>enum</code>.
          </div>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3b82f6; border-radius:8px; padding:16px;">
          <h4 style="color:#3b82f6; margin:0 0 8px 0; font-size:15px;">🌐 Reference Types (హీప్ మెమరీ):</h4>
          <p style="font-size:13px; color:var(--text2); margin:0 0 8px 0; line-height:1.6;">
            వాస్తవ డేటా <strong>Heap Memory</strong> లో ఉంటుంది. స్టాక్‌లో కేవలం ఆ హీప్ డేటా ఉన్న మెమరీ అడ్రస్ (Reference / Pointer) మాత్రమే నిల్వ ఉంటుంది. ఒకదానికి మరొకటి అసైన్ చేస్తే మెమరీ అడ్రస్ షేర్ అవుతుంది.
          </p>
          <div style="font-size:12.5px; color:var(--text); background:var(--bg3); padding:8px; border-radius:4px;">
            ఉదాహరణలు: <code>string</code>, <code>object</code>, <code>class</code>, <code>array</code>, <code>interface</code>, <code>delegate</code>.
          </div>
        </div>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>C# ఫండమెంటల్ డేటా టైప్స్ మ్యాట్రిక్స్</div>
    <div class="section-body">
      <p>
        ఆధునిక .NET 8 లో అందుబాటులో ఉన్న ప్రైమరీ డేటా టైప్స్, వాటి మెమరీ పరిమాణాలు మరియు విలువల పరిధుల పట్టిక:
      </p>

      <div style="overflow-x:auto; margin:16px 0;">
        <table style="width:100%; border-collapse:collapse; font-size:13.5px; text-align:left;">
          <thead>
            <tr style="background:var(--bg3); border-bottom:2px solid var(--border);">
              <th style="padding:10px 14px; color:var(--text);">C# టైప్</th>
              <th style="padding:10px 14px; color:var(--text);">.NET CTS టైప్</th>
              <th style="padding:10px 14px; color:var(--text);">మెమరీ పరిమాణం</th>
              <th style="padding:10px 14px; color:var(--text);">విలువల పరిధి (Range)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 14px; font-weight:700; color:#10b981;">byte</td>
              <td style="padding:9px 14px;">System.Byte</td>
              <td style="padding:9px 14px;">1 Byte (8 bits)</td>
              <td style="padding:9px 14px;">0 నుండి 255</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 14px; font-weight:700; color:#10b981;">short</td>
              <td style="padding:9px 14px;">System.Int16</td>
              <td style="padding:9px 14px;">2 Bytes (16 bits)</td>
              <td style="padding:9px 14px;">-32,768 నుండి 32,767</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 14px; font-weight:700; color:#10b981;">int</td>
              <td style="padding:9px 14px;">System.Int32</td>
              <td style="padding:9px 14px;">4 Bytes (32 bits)</td>
              <td style="padding:9px 14px;">-2.14 బిలియన్లు నుండి +2.14 బిలియన్లు</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 14px; font-weight:700; color:#10b981;">long</td>
              <td style="padding:9px 14px;">System.Int64</td>
              <td style="padding:9px 14px;">8 Bytes (64 bits)</td>
              <td style="padding:9px 14px;">-9.22 × 10<sup>18</sup> నుండి +9.22 × 10<sup>18</sup></td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 14px; font-weight:700; color:#10b981;">float</td>
              <td style="padding:9px 14px;">System.Single</td>
              <td style="padding:9px 14px;">4 Bytes (32 bits)</td>
              <td style="padding:9px 14px;">6 - 9 దశాంశ అంకెల ఖచ్చితత్వం (ఉదా: <code>3.14f</code>)</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 14px; font-weight:700; color:#10b981;">double</td>
              <td style="padding:9px 14px;">System.Double</td>
              <td style="padding:9px 14px;">8 Bytes (64 bits)</td>
              <td style="padding:9px 14px;">15 - 17 దశాంశ అంకెలు (డీఫాల్ట్ దశాంశం)</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 14px; font-weight:700; color:#10b981;">decimal</td>
              <td style="padding:9px 14px;">System.Decimal</td>
              <td style="padding:9px 14px;">16 Bytes (128 bits)</td>
              <td style="padding:9px 14px;">28 - 29 అంకెల గరిష్ట ఖచ్చితత్వం (కరెన్సీ/ఫైనాన్స్: <code>99.99m</code>)</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border);">
              <td style="padding:9px 14px; font-weight:700; color:#10b981;">bool</td>
              <td style="padding:9px 14px;">System.Boolean</td>
              <td style="padding:9px 14px;">1 Byte</td>
              <td style="padding:9px 14px;"><code>true</code> లేదా <code>false</code></td>
            </tr>
            <tr>
              <td style="padding:9px 14px; font-weight:700; color:#10b981;">char</td>
              <td style="padding:9px 14px;">System.Char</td>
              <td style="padding:9px 14px;">2 Bytes (16 bits)</td>
              <td style="padding:9px 14px;">ఒకే ఒక UTF-16 యూనికోడ్ క్యారెక్టర్ (<code>'A'</code>)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>var టైప్ ఇన్ఫరెన్స్ (Type Inference)</div>
    <div class="section-body">
      <p>
        C# లో <strong>var</strong> కీవర్డ్ ను చూసి చాలామంది బిగినర్స్ ఇది JavaScript లోని <code>var</code> లాంటి డైనమిక్ టైప్ అని పొరబడతారు. కానీ C# లో <code>var</code> అనేది <strong>ఖచ్చితమైన కంపైల్-టైమ్ స్టాటిక్ టైప్ ఇన్ఫరెన్స్</strong>.
      </p>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C# — var keyword demo</span>
          <a class="try-btn" href="/online-csharp-compiler.html">⚡ Try in C# Compiler</a>
        </div>
        <pre><code>// కంపైలర్ కుడివైపు ఉన్న విలువను చూసి డేటా టైప్‌ను స్వయంగా నిర్ణయిస్తుంది
var age = 25;           // కంపైలర్ దీనిని 'int' గా స్థిరీకరిస్తుంది
var salary = 75000.50;  // కంపైలర్ దీనిని 'double' గా గుర్తిస్తుంది
var company = "Google"; // కంపైలర్ దీనిని 'string' గా లాక్ చేస్తుంది

// age = "ఇరవై ఐదు"; // ❌ Compiler Error! 'int' లోకి 'string' అసైన్ చేయలేం!
Console.WriteLine($"వయస్సు: {age}, సంస్థ: {company}");</code></pre>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>కాన్‌స్టాంట్స్: const vs readonly వ్యత్యాసాలు</div>
    <div class="section-body">
      <p>
        మారకూడని స్థిర విలువలను నిర్వచించడానికి C# లో రెండు కీవర్డ్లు ఉన్నాయి:
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 8px 0; font-size:14px;">1. const (Compile-Time Constant):</h4>
          <code style="font-size:12.5px; color:var(--text); display:block; background:var(--bg3); padding:8px; border-radius:4px; margin-bottom:8px;">public const double PI = 3.14159;</code>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.5;">డిక్లరేషన్ సమయంలోనే విలువ ఇవ్వాలి. కంపైలర్ ఎక్కడైతే <code>PI</code> ఉందో అక్కడ నేరుగా <code>3.14159</code> విలువను హార్డ్‌కోడ్ చేస్తుంది.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#3b82f6; margin:0 0 8px 0; font-size:14px;">2. readonly (Run-Time Constant):</h4>
          <code style="font-size:12.5px; color:var(--text); display:block; background:var(--bg3); padding:8px; border-radius:4px; margin-bottom:8px;">public readonly DateTime CreatedAt;</code>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.5;">రన్‌టైమ్‌లో కన్‌స్ట్రక్టర్ లోపల డేటాబేస్ లేదా కాన్ఫిగరేషన్ నుండి విలువను అసైన్ చేసుకోవచ్చు. ఒక్కసారి అసైన్ అయ్యాక మారదు.</p>
        </div>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. ఫైనాన్స్ లేదా బ్యాంకింగ్ లెక్కలకు double వాడడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">double balance = 0.1 + 0.2; // ఫలితం 0.30000000000000004 వస్తుంది!</code>
          <span style="font-size:13px; color:var(--text2); display:block;">ఫ్లోటింగ్ పాయింట్ సంఖ్యలు బైనరీ బేస్-2 లో నిల్వ ఉండటం వల్ల దశాంశాల ఖచ్చితత్వం లోపిస్తుంది. డబ్బు లెక్కలకు ఎల్లప్పుడూ <strong>decimal</strong> మాత్రమే వాడాలి: <code>decimal bal = 0.1m + 0.2m; // 0.3m</code>.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. var రాసి ఇనీషియలైజ్ చేయకపోవడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">var total; // Compiler Error! Implicitly-typed variables must be initialized</code>
          <span style="font-size:13px; color:var(--text2); display:block;"><code>var</code> వాడినప్పుడు కంపైలర్ టైప్‌ను గ్రహించడానికి కుడివైపు కచ్చితంగా ఒక ప్రారంభ విలువ ఉండాలి.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: C# లో string అనేది Value Type ఆ లేక Reference Type ఆ?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            <strong>string అనేది ఖచ్చితంగా Reference Type!</strong> ఇది హీప్ మెమరీలోనే నిల్వ ఉంటుంది. అయితే పోలికలలో (<code>str1 == str2</code>) సులభంగా ఉండటానికి C# దీనికి వాల్యూ-టైప్ లాంటి ఇమ్యుటబుల్ (Immutable) ప్రవర్తనను కల్పించింది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: int మరియు System.Int32 ల మధ్య తేడా ఏమిటి?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            రెండింటికీ సాంకేతికంగా ఎటువంటి తేడా లేదు! <code>System.Int32</code> అనేది .NET ఫ్రేమ్‌వర్క్ యొక్క అధికారిక టైప్ పేరు, మరియు <code>int</code> అనేది C# లాంగ్వేజ్ మనకు అందించిన సులభమైన అలియాస్ (Keyword Alias).
          </p>
        </div>
      </div>
    </div>
  `,

  // -------------------------------------------------------------
  // CHAPTER 3: USER INPUT, CASTING & PARSE/TRYPARSE
  // -------------------------------------------------------------
  3: `
    <div class="intro-box">
      కన్సోల్ అప్లికేషన్లు యూజర్ నుండి సమాచారాన్ని స్వీకరించి ప్రాసెస్ చేసినప్పుడే ఉపయోగకరంగా మారతాయి. C# లో కీబోర్డ్ ఇన్‌పుట్ తీసుకోవడానికి <strong>Console.ReadLine()</strong> ప్రాథమిక సాధనం. అయితే యూజర్ ఇచ్చే డేటా ఎల్లప్పుడూ టెక్స్ట్ (String) రూపంలోనే ఉంటుంది. ఆ టెక్స్ట్‌ను సంఖ్యలుగా మార్చేటప్పుడు అప్లికేషన్ క్రాష్ కాకుండా రక్షించే ప్రసిద్ధ <strong>int.TryParse()</strong> ప్యాటర్న్, మరియు టైప్ కాస్టింగ్ నిబంధనలను ఈ అధ్యాయంలో సమగ్రంగా పరిశీలిద్దాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>Console.ReadLine() అంతర్గత పనితీరు</div>
    <div class="section-body">
      <p>
        యూజర్ కీబోర్డ్ ద్వారా ఒక లైన్ సమాచారాన్ని టైప్ చేసి <strong>Enter</strong> కీ ప్రెస్ చేసేంత వరకు <code>Console.ReadLine()</code> వేచి చూస్తుంది. 
      </p>

      <div style="background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0; padding:16px; margin:16px 0;">
        <strong style="color:#10b981; font-size:14.5px;">🔑 గోల్డెన్ రూల్: ఇన్‌పుట్ ఎల్లప్పుడూ string మాత్రమే!</strong>
        <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          యూజర్ నంబర్ <code>25</code> అని టైప్ చేసినా, కంప్యూటర్ దృష్టిలో అది సంఖ్య కాదు; కేవలం రెండు అక్షరాల టెక్స్ట్ <code>"25"</code> మాత్రమే. దానిపై గణిత లెక్కలు చేయాలంటే మనం దానిని సంఖ్యగా (Integer / Double) మార్చాల్సిందే.
        </p>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C# — Basic User Input</span>
          <a class="try-btn" href="/online-csharp-compiler.html">⚡ Try in C# Compiler</a>
        </div>
        <pre><code>Console.Write("మీ పేరు నమోదు చేయండి: ");
string? name = Console.ReadLine();

Console.WriteLine($"స్వాగతం, {name} గారు!");</code></pre>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>టైప్ కన్వర్షన్ రకాలు — Implicit vs Explicit (Casting)</div>
    <div class="section-body">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">1. Implicit Casting (ఆటోమేటిక్):</h4>
          <p style="font-size:13px; color:var(--text2); margin:0 0 8px 0; line-height:1.6;">
            చిన్న డేటా టైప్ నుండి పెద్ద డేటా టైప్‌కు మార్చినప్పుడు ఎటువంటి డేటా నష్టం జరగదు కాబట్టి C# కంపైలర్ స్వయంగా చేస్తుంది.
          </p>
          <code style="font-size:12.5px; color:var(--text); display:block; background:var(--bg3); padding:8px; border-radius:4px;">int a = 100;<br>double b = a; // ఆటోమేటిక్ గా 100.0 అవుతుంది</code>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ef4444; border-radius:8px; padding:16px;">
          <h4 style="color:#ef4444; margin:0 0 6px 0; font-size:14.5px;">2. Explicit Casting (మ్యాన్యువల్):</h4>
          <p style="font-size:13px; color:var(--text2); margin:0 0 8px 0; line-height:1.6;">
            పెద్ద టైప్ నుండి చిన్న టైప్‌కు మార్చినప్పుడు డేటా నష్టం లేదా దశాంశాలు తొలగిపోయే ప్రమాదం ఉంటుంది. డెవలపర్ బాధ్యత తీసుకోవాలి.
          </p>
          <code style="font-size:12.5px; color:var(--text); display:block; background:var(--bg3); padding:8px; border-radius:4px;">double pi = 3.99;<br>int intPi = (int)pi; // 3 అవుతుంది (దశాంశం తుడిచిపెట్టుకుపోతుంది)</code>
        </div>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>Parse() vs TryParse() — ఎర్రర్-ఫ్రీ పార్సింగ్ ప్యాటర్న్</div>
    <div class="section-body">
      <p>
        ఒక స్ట్రింగ్‌ను సంఖ్యగా మార్చడానికి <code>int.Parse()</code> వాడవచ్చు. కానీ యూజర్ అనుకోకుండా సంఖ్య బదులు అక్షరాలు టైప్ చేస్తే <code>int.Parse()</code> వెంటనే భయంకరమైన <strong>FormatException</strong> తో యాప్‌ను క్రాష్ చేస్తుంది!
      </p>

      <div style="background:var(--bg2); border:1px solid #10b981; border-radius:8px; padding:16px; margin:16px 0;">
        <h4 style="color:#10b981; margin:0 0 8px 0; font-size:14.5px;">🛡️ ప్రొడక్షన్ స్టాండర్డ్: int.TryParse() ప్యాటర్న్</h4>
        <p style="font-size:13.5px; color:var(--text); margin:0 0 8px 0; line-height:1.6;">
          <code>int.TryParse()</code> క్రాష్ కాకుండా రక్షణ కల్పిస్తుంది. కన్వర్షన్ విజయవంతమైతే <code>true</code> రిటర్న్ చేసి ఆ విలువను <code>out</code> వేరియబుల్ లోకి వేస్తుంది; విఫలమైతే క్రాష్ అవ్వకుండా కేవలం <code>false</code> ఇస్తుంది.
        </p>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C# — Bulletproof TryParse Demo</span>
          <a class="try-btn" href="/online-csharp-compiler.html">⚡ Try in C# Compiler</a>
        </div>
        <pre><code>Console.Write("మీ వయస్సు నమోదు చేయండి: ");
string? input = Console.ReadLine();

// C# 7+ ఇన్లైన్ out వేరియబుల్ డిక్లరేషన్
if (int.TryParse(input, out int age) &amp;&amp; age &gt; 0) {
    Console.WriteLine($"సరైన వయస్సు: {age} సంవత్సరాలు.");
} else {
    Console.WriteLine("❌ చెల్లని సంఖ్య! దయచేసి సరైన పూర్ణాంకాన్ని టైప్ చేయండి.");
}</code></pre>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>Convert క్లాస్ (Convert.ToInt32, Convert.ToDouble)</div>
    <div class="section-body">
      <p>
        <code>Convert.ToInt32()</code> పద్ధతి కూడా పార్సింగ్ చేస్తుంది. దీనికి <code>int.Parse()</code> కి ఉన్న ప్రధాన తేడా ఏమిటంటే: <strong>ఒకవేళ ఇన్‌పుట్ <code>null</code> అయితే, Convert క్లాస్ ఎర్రర్ ఇవ్వకుండా డిఫాల్ట్ 0 (సున్నా) రిటర్న్ చేస్తుంది</strong>.
      </p>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. కాస్టింగ్ తో స్ట్రింగ్ మార్చాలనుకోవడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">string s = "50"; int num = (int)s; // Compiler Error! Cannot convert type string to int</code>
          <span style="font-size:13px; color:var(--text2); display:block;">స్ట్రింగ్స్ మరియు న్యూమరిక్ టైప్స్ వేర్వేరు మెమరీ ఫార్మాట్లలో ఉంటాయి. కాస్టింగ్ <code>(int)</code> పనిచేయదు; తప్పనిసరిగా <code>int.Parse()</code> లేదా <code>int.TryParse()</code> వాడాలి.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. ప్రొడక్షన్ కోడ్‌లో నేరుగా int.Parse() వాడటం:</div>
          <span style="font-size:13px; color:var(--text2); display:block; margin-top:4px;">యూజర్ ఖాళీగా ఎంటర్ నొక్కినా లేదా స్పేస్ ఇచ్చినా <code>int.Parse()</code> మొత్తం యాప్‌ను క్రాష్ చేస్తుంది. ఎల్లప్పుడూ <code>TryParse()</code> నే ప్రాధాన్యత ఇవ్వాలి.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: checked మరియు unchecked బ్లాక్స్ ఎందుకు ఉపయోగిస్తారు?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            C# లో డిఫాల్ట్‌గా ఇంటిజర్ ఓవర్‌ఫ్లో అయినప్పుడు ఎర్రర్ రాకుండా నిశ్శబ్దంగా నెగటివ్ విలువగా మారుతుంది. <code>checked { int max = int.MaxValue + 1; }</code> అని రాస్తే, ఓవర్‌ఫ్లో జరగగానే <code>OverflowException</code> ను త్రో చేసి ప్రమాదాన్ని హెచ్చరిస్తుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: Console.ReadLine() పక్కన string? (Question Mark) ఎందుకు కనిపిస్తుంది?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            C# 8 లో ప్రవేశపెట్టిన <strong>Nullable Reference Types</strong> ప్రకారం, యూజర్ ఏమీ టైప్ చేయకుండా Ctrl+Z (EOF) ప్రెస్ చేస్తే <code>null</code> వచ్చే అవకాశం ఉందని కంపైలర్ సూచిస్తుంది.
          </p>
        </div>
      </div>
    </div>
  `,

  // -------------------------------------------------------------
  // CHAPTER 4: OPERATORS, EXPRESSIONS & NULL-COALESCING
  // -------------------------------------------------------------
  4: `
    <div class="intro-box">
      వేరియబుల్స్‌పై గణిత లెక్కలు చేయడానికి, షరతులను సరిపోల్చడానికి మరియు ఆధునిక C# లో అత్యంత క్లిష్టమైన <strong>NullReferenceException</strong> క్రాష్‌ల నుండి రక్షణ కల్పించడానికి ఆపరేటర్లు ప్రాణాధారం. సంప్రదాయ ఆపరేటర్లతో పాటు ఆధునిక C# రక్షణ కవచాలైన <strong>Null-Conditional (?.)</strong> మరియు <strong>Null-Coalescing (??, ??=)</strong> ఆపరేటర్ల అంతర్గత పనితీరును ఈ అధ్యాయంలో లోతుగా శోధిద్దాం.
    </div>

    <!-- SECTION 1 -->
    <div class="section-title"><span class="num">1</span>ఫండమెంటల్ ఆపరేటర్లు & షార్ట్-సర్క్యూట్ మూలసూత్రం</div>
    <div class="section-body">
      <p>
        C# లో ప్రాథమిక అంకగణిత (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code>) మరియు రిలేషనల్ (<code>==</code>, <code>!=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>) ఆపరేటర్లు సాధారణ ప్రోగ్రామింగ్ నిబంధనలనే అనుసరిస్తాయి.
      </p>

      <div style="background:var(--bg2); border-left:4px solid #10b981; border-radius:0 8px 8px 0; padding:16px; margin:16px 0;">
        <strong style="color:#10b981; font-size:14.5px;">⚡ లాజికల్ షార్ట్-సర్క్యూట్ ఎవాల్యుయేషన్ (Short-Circuit Evaluation):</strong>
        <p style="font-size:13.5px; color:var(--text); margin:6px 0 0 0; line-height:1.6;">
          <code>&amp;&amp;</code> (AND) లో ఎడమవైపు కండిషన్ తప్పు (false) అయితే, కుడివైపు ఏముందో కంప్యూటర్ అసలు తనిఖీ చేయదు. అదేవిధంగా <code>||</code> (OR) లో ఎడమవైపు నిజం (true) అయితే వెంటనే ఫలితాన్ని ఖరారు చేస్తుంది. ఇది నల్ చెకింగ్‌లో ప్రోగ్రామ్ క్రాష్ కాకుండా కాపాడుతుంది.
        </p>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C# — Integer Division Trap & Casting</span>
          <a class="try-btn" href="/online-csharp-compiler.html">⚡ Try in C# Compiler</a>
        </div>
        <pre><code>int a = 5, b = 2;
// పూర్ణాంకాల భాగహారంలో దశాంశాలు తొలగిపోతాయి (Truncation)
double wrong = a / b;          // 5 / 2 = 2 -&gt; 2.0 (తప్పు!)
double correct = (double)a / b; // 2.5 (సరైనది!)

Console.WriteLine($"తప్పు ఫలితం: {wrong} | సరైన ఫలితం: {correct}");</code></pre>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-title"><span class="num">2</span>Prefix (++x) vs Postfix (x++) ఇంక్రిమెంట్ మెకానిక్స్</div>
    <div class="section-body">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid #10b981; border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">⚡ Prefix (++x): Increment Then Fetch</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            ముందుగా మెమరీలోని విలువను 1 పెంచి, ఆ తర్వాత నవీకరించబడిన తాజా విలువను ఎక్స్‌ప్రెషన్‌కు అందిస్తుంది.
          </p>
          <code style="font-size:12.5px; color:var(--text); display:block; background:var(--bg3); padding:8px; border-radius:4px; margin-top:8px;">int x = 5;<br>int y = ++x; // x = 6, y = 6</code>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:var(--text); margin:0 0 6px 0; font-size:14.5px;">⏳ Postfix (x++): Fetch Then Increment</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            పాత విలువను ఎక్స్‌ప్రెషన్‌కు ఇచ్చేసి, ఆ తర్వాత మాత్రమే మెమరీలోని అసలు వేరియబుల్‌ను 1 పెంచుతుంది.
          </p>
          <code style="font-size:12.5px; color:var(--text); display:block; background:var(--bg3); padding:8px; border-radius:4px; margin-top:8px;">int x = 5;<br>int y = x++; // y = 5 (old copy), x = 6</code>
        </div>
      </div>
    </div>

    <!-- SECTION 3 -->
    <div class="section-title"><span class="num">3</span>మోడ్రన్ C# నల్ సేఫ్టీ ఆపరేటర్లు (The Null-Defense Shield)</div>
    <div class="section-body">
      <p>
        ప్రముఖ కంప్యూటర్ శాస్త్రవేత్త Tony Hoare నల్ పాయింటర్లను కనిపెట్టడాన్ని తన <em>"Billion Dollar Mistake"</em> అని పిలిచారు. ఎందుకంటే ప్రపంచంలో అత్యధిక సాఫ్ట్‌వేర్ క్రాష్‌లు <strong>NullReferenceException</strong> వల్లనే జరుగుతాయి. ఆధునిక C# దీనికి 3 అద్భుతమైన ఆపరేటర్లను అందించింది:
      </p>

      <div style="display:flex; flex-direction:column; gap:12px; margin:20px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:14px 18px;">
          <strong style="color:#10b981; font-size:14.5px;">1. Null-Conditional Operator (?.) — సేఫ్ నావిగేషన్</strong>
          <p style="font-size:13px; color:var(--text2); margin:6px 0 0 0; line-height:1.6;">
            ఆబ్జెక్ట్ నల్ అయితే క్రాష్ కాకుండా నిశ్శబ్దంగా <code>null</code> నే రిటర్న్ చేస్తుంది: <code>string? upper = name?.ToUpper();</code>.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3b82f6; border-radius:8px; padding:14px 18px;">
          <strong style="color:#3b82f6; font-size:14.5px;">2. Null-Coalescing Operator (??) — ఫాల్‌బ్యాక్ డిఫాల్ట్ వాల్యూ</strong>
          <p style="font-size:13px; color:var(--text2); margin:6px 0 0 0; line-height:1.6;">
            ఎడమవైపు విలువ <code>null</code> అయితే ప్రత్యామ్నాయంగా కుడివైపు ఉన్న డీఫాల్ట్ విలువను ఎంచుకుంటుంది: <code>string displayName = name ?? "Guest";</code>.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f59e0b; border-radius:8px; padding:14px 18px;">
          <strong style="color:#f59e0b; font-size:14.5px;">3. Null-Coalescing Assignment (??=) — స్మార్ట్ క్యాషింగ్</strong>
          <p style="font-size:13px; color:var(--text2); margin:6px 0 0 0; line-height:1.6;">
            వేరియబుల్ ప్రస్తుతం <code>null</code> అయితే మాత్రమే కొత్త విలువను అసైన్ చేస్తుంది: <code>cache ??= LoadFromDatabase();</code>.
          </p>
        </div>
      </div>

      <div class="code-block" style="margin:16px 0;">
        <div class="code-block-header">
          <span class="lang-tag">C# — Modern Null-Defense in Action</span>
          <a class="try-btn" href="/online-csharp-compiler.html">⚡ Try in C# Compiler</a>
        </div>
        <pre><code>string? userInput = null;

// ?? ఆపరేటర్ తో సేఫ్ డీఫాల్ట్ ప్రొవైడర్
string username = userInput ?? "Anonymous_User";
Console.WriteLine($"వినియోగదారుని పేరు: {username}");

// ??= తో లేజీ ఇనీషియలైజేషన్
List&lt;string&gt;? logList = null;
logList ??= new List&lt;string&gt;(); // నల్ కాబట్టి కొత్త లిస్ట్ అసైన్ అవుతుంది
logList.Add("Server Started");
Console.WriteLine($"లాగ్ కౌంట్: {logList.Count}");</code></pre>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-title"><span class="num">4</span>ఆపరేటర్ ప్రాధాన్యతా నిచ్చెన (Precedence Hierarchy)</div>
    <div class="section-body">
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px; margin:16px 0; font-size:13.5px; line-height:1.8;">
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding:6px 0;">
          <span style="font-weight:700; color:#10b981;">1. ప్రైమరీ ఆపరేటర్లు:</span>
          <span><code>()</code>, మెంబర్ యాక్సెస్ <code>.</code>, <code>?.</code>, ఇండెక్సర్ <code>[]</code></span>
        </div>
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding:6px 0;">
          <span style="font-weight:700; color:#10b981;">2. యునరీ ఆపరేటర్లు:</span>
          <span><code>++</code>, <code>--</code>, లాజికల్ నాట్ <code>!</code>, <code>typeof</code>, <code>await</code></span>
        </div>
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding:6px 0;">
          <span style="font-weight:700; color:#10b981;">3. గుణకార ఆపరేటర్లు:</span>
          <span>గుణకారం <code>*</code>, భాగహారం <code>/</code>, మాడ్యులో <code>%</code></span>
        </div>
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding:6px 0;">
          <span style="font-weight:700; color:#10b981;">4. సంకలన ఆపరేటర్లు:</span>
          <span>కూడిక <code>+</code>, తీసివేత <code>-</code></span>
        </div>
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding:6px 0;">
          <span style="font-weight:700; color:#10b981;">5. నల్-కోలెస్సింగ్:</span>
          <span><code>??</code></span>
        </div>
        <div style="display:flex; justify-content:space-between; padding:6px 0;">
          <span style="font-weight:700; color:#10b981;">6. అసైన్‌మెంట్:</span>
          <span><code>=</code>, <code>+=</code>, <code>-=</code>, <code>??=</code></span>
        </div>
      </div>
    </div>

    <!-- SECTION 5 -->
    <div class="section-title"><span class="num">5</span>బిగినర్స్ చేసే ఘోరమైన తప్పులు (Beginner Pitfalls)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 1. & మరియు && ల మధ్య కన్‌ఫ్యూజన్:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">if (user != null &amp; user.IsActive) // CRASH! user నల్ అయితే NullReferenceException వస్తుంది</code>
          <span style="font-size:13px; color:var(--text2); display:block;">సింగిల్ <code>&amp;</code> బిట్‌వైజ్ ఆపరేటర్; ఇది షార్ట్-సర్క్యూట్ చేయదు (రెండు వైపులా ఎవాల్యుయేట్ చేస్తుంది). కండిషన్లలో ఎల్లప్పుడూ డబుల్ <code>&amp;&amp;</code> మాత్రమే వాడాలి.</span>
        </div>

        <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; border-radius:0 8px 8px 0; padding:14px 18px;">
          <div style="font-weight:700; color:#ef4444; font-size:14px;">❌ 2. if కండిషన్‌లో అసైన్‌మెంట్ ప్రయత్నించడం:</div>
          <code style="font-size:13px; color:var(--text); display:block; margin:6px 0;">if (x = 5) // Compiler Error! Cannot implicitly convert type int to bool</code>
          <span style="font-size:13px; color:var(--text2); display:block;">C/C++ లాగా C# నంబర్లను బూలియన్‌గా తీసుకోదు. C# లో కండిషన్ తప్పనిసరిగా <code>bool</code> అయి ఉండాలి కాబట్టి పోల్చడానికి <code>==</code> వాడాలి.</span>
        </div>
      </div>
    </div>

    <!-- SECTION 6 -->
    <div class="section-title"><span class="num">6</span>తరచుగా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: C# లో is మరియు as ఆపరేటర్లు ఎలా పనిచేస్తాయి?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            <code>is</code> ఆపరేటర్ ఒక ఆబ్జెక్ట్ నిర్దిష్ట క్లాస్‌కి చెందినదో కాదో తనిఖీ చేస్తుంది (ఉదా: <code>if (obj is string s)</code>). <code>as</code> ఆపరేటర్ సేఫ్ టైప్ కాస్టింగ్ చేస్తుంది — కాస్ట్ విజయవంతమైతే ఆబ్జెక్ట్ ఇస్తుంది, విఫలమైతే ఎర్రర్ రాకుండా <code>null</code> రిటర్న్ చేస్తుంది.
          </p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <h4 style="color:#10b981; margin:0 0 6px 0; font-size:14.5px;">Q: Nullable Value Types (int?) అంటే ఏమిటి?</h4>
          <p style="font-size:13px; color:var(--text2); margin:0; line-height:1.6;">
            సాధారణంగా <code>int</code> నల్ విలువను తీసుకోదు. కానీ డేటాబేస్‌లలో పూర్ణాంక కాలమ్స్ ఖాళీగా (null) ఉండవచ్చు. అలాంటి సందర్భాలలో <code>int? age = null;</code> అని రాస్తే అది <code>Nullable&lt;int&gt;</code> స్ట్రక్చర్‌గా మారి నల్ విలువను కూడా స్వీకరించగలదు.
          </p>
        </div>
      </div>
    </div>
  `
};

// Write out enriched files for Phase 1 (Lessons 1 to 4)
for (let i = 1; i <= 4; ++i) {
  const lesson = LESSONS.find(l => l.num === i);
  if (!lesson) continue;
  lesson.contentHtml = PHASE1_CONTENTS[i];
  const html = generatePageHtml(lesson);
  fs.writeFileSync(path.join(csharpDir, lesson.file), html, 'utf8');
  console.log(`✅ Fully enriched C# Phase 1 Lesson ${i} : ${lesson.file} (${html.length} chars)`);
}

