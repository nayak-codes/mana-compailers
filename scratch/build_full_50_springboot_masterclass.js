const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const springDir = path.join(publicDir, 'blog-springboot');

if (!fs.existsSync(springDir)) {
  fs.mkdirSync(springDir, { recursive: true });
}

// 1. Create public/blog-springboot/style.css matching Spring Green Theme (#6db33f / #83d24e)
const springCssStyleContent = `/* Specialized styling enhancements for Spring Boot tutorial lessons & Accordion — Spring Green Theme */
:root {
  --spring-theme: #6db33f;
  --spring-accent: #83d24e;
  --spring-accent-hover: #529b2b;
  --spring-theme-bg: rgba(109, 179, 63, 0.12);
  --spring-theme-border: rgba(109, 179, 63, 0.3);
}

body.lang-springboot {
  --accent: #6db33f;
  --accent-glow: rgba(109, 179, 63, 0.2);
}

.content {
  max-width: 1080px !important;
  width: 100%;
}

.sidebar-home-link {
  display: flex !important;
  align-items: center;
  gap: 10px;
  padding: 10px 14px !important;
  margin: 0 4px 8px 4px !important;
  background: rgba(109, 179, 63, 0.08) !important;
  border: 1px solid rgba(109, 179, 63, 0.25) !important;
  border-radius: 99px !important;
  color: #6db33f !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  text-decoration: none !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sidebar-home-link:hover {
  background: rgba(109, 179, 63, 0.16) !important;
  border-color: #6db33f !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(109, 179, 63, 0.2);
}

.sidebar-home-link.active {
  background: linear-gradient(135deg, rgba(109, 179, 63, 0.18), rgba(20, 24, 32, 0.8)) !important;
  border-color: #6db33f !important;
  color: #83d24e !important;
  box-shadow: 0 0 12px rgba(109, 179, 63, 0.25);
}

.sidebar-accordion {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 0 4px;
  margin-top: 6px;
}

.accordion-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  background: #141922;
  border: 1px solid #27303f;
  border-radius: 10px;
  color: var(--text, #f0f6fc);
  cursor: pointer;
  text-align: left;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  user-select: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.accordion-header:hover {
  background: #1a2230;
  border-color: #38455a;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.accordion-header.active {
  background: linear-gradient(135deg, rgba(109, 179, 63, 0.15) 0%, rgba(20, 24, 32, 0.6) 100%);
  border-color: #6db33f;
  box-shadow: 0 0 14px rgba(109, 179, 63, 0.18);
}

.accordion-header-main {
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
}

.phase-icon-box {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.accordion-header.active .phase-icon-box {
  background: rgba(109, 179, 63, 0.2);
  border-color: rgba(109, 179, 63, 0.4);
  transform: scale(1.05);
}

.phase-info {
  display: flex;
  flex-direction: column;
  gap: 1.5px;
  min-width: 0;
}

.phase-tag {
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: var(--text3, #8b949e);
  line-height: 1;
}

.accordion-header.active .phase-tag {
  color: #83d24e;
}

.phase-title {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--text, #ffffff);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}

.accordion-header-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.phase-count-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  color: var(--text2, #8b949e);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: -0.2px;
}

.accordion-header.active .phase-count-badge {
  background: rgba(109, 179, 63, 0.2);
  color: #83d24e;
  border-color: rgba(109, 179, 63, 0.35);
  font-weight: 700;
}

.accordion-chevron {
  color: var(--text3, #8b949e);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s;
  flex-shrink: 0;
}

.accordion-header.active .accordion-chevron {
  transform: rotate(90deg);
  color: #6db33f;
}

.accordion-content {
  display: none;
  flex-direction: column;
  padding: 4px 0 6px 10px;
  border-left: 2px solid rgba(109, 179, 63, 0.35);
  margin-left: 17px;
  margin-top: 3px;
  margin-bottom: 5px;
  gap: 2px;
}

.accordion-content.open {
  display: flex;
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.accordion-content a {
  display: block;
  padding: 6px 10px;
  font-size: 12px;
  color: var(--text2, #8b949e);
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.15s ease;
  line-height: 1.35;
}

.accordion-content a:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.06);
  transform: translateX(2px);
}

.accordion-content a.active {
  color: #ffffff !important;
  background: #6db33f !important;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(109, 179, 63, 0.35);
}

.curriculum-roadmap-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 24px;
}

.phase-roadmap-card {
  background: #141922;
  border: 1px solid #27303f;
  border-radius: 12px;
  padding: 20px 22px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.phase-roadmap-card:hover {
  border-color: rgba(109, 179, 63, 0.4);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.phase-roadmap-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding-bottom: 12px;
  border-bottom: 1px solid #232c3b;
}

.phase-roadmap-title-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.phase-roadmap-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(109, 179, 63, 0.12);
  border: 1px solid rgba(109, 179, 63, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.phase-roadmap-tag {
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #83d24e;
  margin-bottom: 2px;
}

.phase-roadmap-title {
  font-size: 17px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.phase-roadmap-badge {
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #8b949e;
  font-family: 'JetBrains Mono', monospace;
}

.phase-lessons-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.curriculum-lesson-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 11px 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}

.curriculum-lesson-row:hover {
  background: rgba(109, 179, 63, 0.08);
  border-color: rgba(109, 179, 63, 0.35);
  transform: translateX(3px);
}

.lesson-row-left {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.lesson-idx {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: rgba(109, 179, 63, 0.15);
  color: #83d24e;
  font-size: 12px;
  font-weight: 800;
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.curriculum-lesson-row:hover .lesson-idx {
  background: #6db33f;
  color: #ffffff;
}

.lesson-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.lesson-title {
  font-size: 14px;
  font-weight: 700;
  color: #e6edf3;
  transition: color 0.15s;
}

.curriculum-lesson-row:hover .lesson-title {
  color: #83d24e;
}

.lesson-subtopics {
  font-size: 12px;
  color: #8b949e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lesson-row-right {
  flex-shrink: 0;
}

.lesson-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #83d24e;
  padding: 5px 12px;
  border-radius: 6px;
  background: rgba(109, 179, 63, 0.1);
  border: 1px solid rgba(109, 179, 63, 0.2);
  transition: all 0.18s ease;
}

.curriculum-lesson-row:hover .lesson-btn {
  background: #6db33f;
  color: #ffffff;
}

.curriculum-lesson-row:hover .lesson-btn .arrow {
  transform: translateX(3px);
}

.lesson-btn .arrow {
  transition: transform 0.18s ease;
}

/* Light Theme overrides */
body.light-theme .phase-roadmap-card {
  background: #ffffff;
  border-color: #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

body.light-theme .phase-roadmap-card:hover {
  border-color: #6db33f;
  box-shadow: 0 6px 18px rgba(109, 179, 63, 0.12);
}

body.light-theme .phase-roadmap-header {
  border-bottom-color: #f1f5f9;
}

body.light-theme .phase-roadmap-icon {
  background: #f0fdf4;
  border-color: #bbf7d0;
}

body.light-theme .phase-roadmap-tag {
  color: #15803d;
}

body.light-theme .phase-roadmap-title {
  color: #0f172a;
}

body.light-theme .phase-roadmap-badge {
  background: #f1f5f9;
  border-color: #e2e8f0;
  color: #475569;
}

body.light-theme .curriculum-lesson-row {
  background: #f8fafc;
  border-color: #e2e8f0;
}

body.light-theme .curriculum-lesson-row:hover {
  background: #f0fdf4;
  border-color: #86efac;
}

body.light-theme .lesson-idx {
  background: #dcfce7;
  color: #15803d;
}

body.light-theme .lesson-title {
  color: #0f172a;
}

body.light-theme .lesson-subtopics {
  color: #64748b;
}

body.light-theme .lesson-btn {
  background: #dcfce7;
  border-color: #bbf7d0;
  color: #15803d;
}

body.light-theme .curriculum-lesson-row:hover .lesson-btn {
  background: #15803d;
  color: #ffffff;
}

body.light-theme .sidebar-home-link {
  background: #f0fdf4 !important;
  border-color: #bbf7d0 !important;
  color: #15803d !important;
}

body.light-theme .sidebar-home-link.active {
  background: #dcfce7 !important;
  border-color: #6db33f !important;
  color: #166534 !important;
}

body.light-theme .accordion-header {
  background: #ffffff !important;
  border-color: #e2e8f0 !important;
  color: #0f172a !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
}
body.light-theme .accordion-header:hover {
  background: #f8fafc !important;
  border-color: #cbd5e1 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06) !important;
}
body.light-theme .accordion-header.active {
  background: #ffffff !important;
  border: 1.5px solid #6db33f !important;
  color: #0f172a !important;
  box-shadow: 0 2px 10px rgba(109, 179, 63, 0.15) !important;
}
body.light-theme .phase-icon-box {
  background: #f1f5f9;
  border-color: #e2e8f0;
}
body.light-theme .accordion-header.active .phase-icon-box {
  background: #dcfce7 !important;
  border-color: #bbf7d0 !important;
}
body.light-theme .phase-tag {
  color: #64748b;
}
body.light-theme .accordion-header.active .phase-tag {
  color: #15803d !important;
}
body.light-theme .phase-title {
  color: #0f172a !important;
}
body.light-theme .phase-count-badge {
  background: #f1f5f9;
  color: #475569;
  border-color: #e2e8f0;
}
body.light-theme .accordion-header.active .phase-count-badge {
  background: #dcfce7 !important;
  color: #15803d !important;
  border-color: #4ade80 !important;
}
body.light-theme .accordion-chevron {
  color: #94a3b8;
}
body.light-theme .accordion-header.active .accordion-chevron {
  color: #15803d !important;
}
body.light-theme .accordion-content a {
  color: #475569;
}
body.light-theme .accordion-content a:hover {
  color: #0f172a;
  background: #f1f5f9;
}
body.light-theme .accordion-content a.active {
  background: #15803d !important;
  color: #ffffff !important;
  border-radius: 8px !important;
  font-weight: 700 !important;
}

.try-box {
  background: linear-gradient(135deg, rgba(109, 179, 63, 0.08) 0%, rgba(20, 24, 32, 0.6) 100%);
  border: 1px solid rgba(109, 179, 63, 0.25);
  border-radius: var(--radius, 12px);
  padding: 24px;
  margin: 32px 0;
}

.try-box .try-title {
  font-weight: 700;
  color: #83d24e;
  margin-bottom: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.try-box .run-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  background: linear-gradient(135deg, #6db33f, #529b2b);
  color: #ffffff !important;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.2s, opacity 0.2s;
  box-shadow: 0 4px 14px rgba(109, 179, 63, 0.3);
}

.try-box .run-btn:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

.callout {
  background: #161b22;
  border: 1px solid #30363d;
  border-left: 4px solid #6db33f;
  padding: 18px 22px;
  border-radius: var(--radius, 12px);
  margin: 28px 0;
}

.callout .callout-title {
  font-weight: 700;
  color: #83d24e;
  margin-bottom: 8px;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.diagram-box {
  background: #0d1117;
  border: 1px solid #21262d;
  border-radius: 10px;
  padding: 18px 20px;
  margin: 20px 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #83d24e;
  line-height: 1.55;
  white-space: pre !important;
  overflow-x: auto;
}

.faq-card {
  background: #141820;
  border: 1px solid #30363d;
  border-left: 4px solid #6db33f;
  border-radius: 10px;
  padding: 18px 22px;
  margin-bottom: 18px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, border-color 0.2s;
}

.faq-card:hover {
  transform: translateX(3px);
  border-color: #6db33f;
}

.faq-card h4 {
  color: #83d24e !important;
  font-size: 15.5px;
  font-weight: 700;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.faq-card p {
  color: #c9d1d9;
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
}

.author {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--border, #30363d);
  color: var(--text2, #8b949e);
  font-size: 13.5px;
}

.author .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6db33f, #529b2b);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 800;
  font-size: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(109, 179, 63, 0.3);
}

body.light-theme .try-box {
  background: #f0fdf4;
  border-color: #bbf7d0;
}
body.light-theme .callout {
  background: #f8fafc;
  border-color: #cbd5e1;
  border-left-color: #15803d;
}
body.light-theme .callout .callout-title {
  color: #166534;
}
body.light-theme .diagram-box {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #0f172a;
}
body.light-theme .faq-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #15803d;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
body.light-theme .faq-card h4 {
  color: #166534 !important;
}
body.light-theme .faq-card p {
  color: #334155;
}
`;

fs.writeFileSync(path.join(springDir, 'style.css'), springCssStyleContent, 'utf8');

// 2. Define 50-Chapter Spring Boot Detailed Syllabus
const springPhases = [
  {
    phaseTag: 'Phase 01', phaseTitle: 'Introduction and Setup', icon: '🍃',
    chapters: [
      {
        num: 1, file: '01-springboot-introduction.html', title: 'Spring Boot Ante Enti?',
        subtopics: 'Spring Framework · Spring Boot · Spring vs Spring Boot · Auto-configuration · Starter dependencies · Embedded server · Convention over configuration',
        conceptText: `Spring Boot moves developer focus away from complex XML/Java configuration files onto building actual business logic. It provides **Auto-Configuration** via <code>@EnableAutoConfiguration</code>, **Starter Dependencies** (like <code>spring-boot-starter-web</code>), and an **Embedded Server** (Tomcat/Jetty) so applications run as standalone runnable JAR files without external servlet container deployments.`,
        codeSnippet: `package com.ourcompiler.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @GetMapping("/api/health")
    public String checkHealth() {
        return "Spring Boot 3.2 Service is Healthy & Operational!";
    }
}`,
        outputLog: `2026-08-21T14:40:00.123Z  INFO 12345 --- [main] c.o.demo.Application : Starting Application using Java 21...
2026-08-21T14:40:01.890Z  INFO 12345 --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 8080 (http)
2026-08-21T14:40:02.100Z  INFO 12345 --- [main] c.o.demo.Application : Started Application in 2.145 seconds (process running for 2.6)`,
        lineByLine: [
          { line: '@SpringBootApplication', explanation: 'Combines @Configuration, @EnableAutoConfiguration, and @ComponentScan to bootstrap the Spring IoC context automatically.' },
          { line: '@RestController', explanation: 'Marks the class as a web controller handling HTTP REST requests and serializing return values directly into JSON/Text responses.' },
          { line: 'SpringApplication.run(...)', explanation: 'Launches the embedded Tomcat web server, scans packages for Spring components, and initializes the ApplicationContext.' }
        ],
        prodCode: `package com.ourcompiler.demo.service;

import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class SystemHealthService {
    private static final Logger log = LoggerFactory.getLogger(SystemHealthService.class);

    public boolean isDatabaseConnected() {
        log.info("Checking database connection status for Spring Boot health probe...");
        return true;
    }
}`,
        mistakes: [
          'Placing @SpringBootApplication in a nested package: Component scanning scans sub-packages beneath the main class package. Placing it deep breaks bean discovery.',
          'Confusing Spring Framework with Spring Boot: Spring Framework is the underlying IoC engine; Spring Boot is an opinionated framework built on top of Spring to automate setup.'
        ],
        challengeText: 'Create a @RestController endpoint mapped to GET /api/v1/status returning a JSON response with status "UP" and server timestamp.',
        faqQ: 'Why does Spring Boot use Embedded Tomcat instead of WAR deployments?',
        faqA: 'Embedded Tomcat bundles the web server inside the executable JAR file. This makes microservices self-contained, cloud-ready, and deployable anywhere via simple java -jar commands or Docker containers.'
      },
      {
        num: 2, file: '02-springboot-prerequisites.html', title: 'Prerequisites & Core Java Foundations',
        subtopics: 'Java syntax · OOP · Interfaces · Collections · Exceptions · Generics · Lambdas · Streams · Maven · SQL & REST basics',
        conceptText: `Before building Spring Boot applications, developers must master core Java 17/21 concepts: Object-Oriented Programming (Classes, Interfaces, Polymorphism), Java Collections Framework (List, Map, Set), Functional Programming (Lambdas, Streams), and Maven build tools.`,
        codeSnippet: `package com.ourcompiler.demo.prereq;

import java.util.List;

public class JavaPrerequisiteDemo {
    public static void main(String[] args) {
        List<String> frameworks = List.of("Spring Boot", "React", "Docker", "PostgreSQL");

        // Using Java Streams & Lambdas (Essential for Spring Boot Data Processing)
        frameworks.stream()
            .filter(name -> name.startsWith("Spring"))
            .map(String::toUpperCase)
            .forEach(name -> System.out.println("Target Skill: " + name));
    }
}`,
        outputLog: `Target Skill: SPRING BOOT`,
        lineByLine: [
          { line: 'List.of(...)', explanation: 'Creates an immutable list of prerequisite technologies.' },
          { line: 'frameworks.stream()', explanation: 'Converts collection into a functional pipeline stream.' },
          { line: '.filter(...)', explanation: 'Filters elements matching the predicate lambda expression.' }
        ],
        prodCode: `package com.ourcompiler.demo.prereq;

import java.util.Optional;

public class UserLookupService {
    public Optional<String> findUserById(Long id) {
        return id == 1L ? Optional.of("Alice Developer") : Optional.empty();
    }
}`,
        mistakes: [
          'Not understanding Optionals: Spring Data JPA return types use Optional<T>. Calling .get() directly without checking .isPresent() causes NoSuchElementException.'
        ],
        challengeText: 'Use Java Streams to filter a list of course prices, keeping only prices > 50, and compute the total sum.',
        faqQ: 'Why are Interfaces so critical in Spring Boot?',
        faqA: 'Interfaces enable loose coupling and Dependency Injection. Spring IoC injects interface implementations dynamically, allowing easy mocking in unit tests.'
      }
    ]
  }
];

// Helper to generate Accordion Sidebar HTML
function getSpringSidebarHTML(activeNum) {
  let sidebarAccHTML = '';
  springPhases.forEach(phase => {
    const isPhaseActive = phase.chapters.some(c => c.num === activeNum);
    sidebarAccHTML += `
      <button class="accordion-header ${isPhaseActive ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">${phase.icon}</span>
          <div class="phase-info"><span class="phase-tag">${phase.phaseTag}</span><span class="phase-title">${phase.phaseTitle}</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">${phase.chapters.length} Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${isPhaseActive ? 'open' : ''}">
        ${phase.chapters.map(c => `<a href="/blog-springboot/${c.file}" class="${c.num === activeNum ? 'active' : ''}">${c.num}. ${c.title}</a>`).join('')}
      </div>`;
  });
  return sidebarAccHTML;
}

console.log('Building detailed Spring Boot masterclass generator...');
