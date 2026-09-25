# Vladyslav Spasibozhko — Candidate Profile

_This document covers background, work history, use cases, and thinking as a developer. It is not tied to any specific target company — questions about a particular company should be answered directly, not from this file._

---

## Basic Information

- **Name:** Vladyslav Spasibozhko
- **LinkedIn:** linkedin.com/in/vladspasibozhko
- **Role:** Senior Frontend Engineer, 7+ years of experience
- **Location:** Wrocław, Poland (works remotely)
- **Core stack:** React, Next.js, TypeScript, GraphQL/Apollo, MobX, Redux, WebSockets, Claude SDK/AI integrations
- **Expertise:** Micro-frontend architecture, monorepos
- **Business setup:** Operates a Polish sole proprietorship (JDG) for over two years
- **Education:** Bachelor's Degree in Management and Administration, National University of Food Technologies (2018), GPA 4.5
- **Courses & Certifications:**
  - JavaScript Advanced, React.js — IT Education Academy (March–May 2019)
  - Front-End Jedi Course — Forte Group (July 2020)
- **Languages:** Ukrainian (native), English (upper-intermediate)
- **Work authorization:** Temporary residence in Poland, valid until 2028; covers roles applied for; authorization tied to Polish JDG (B2B without sponsorship). For employment-based roles, would need to confirm compatibility with the residence permit.
- **Notice period:** None — available to start immediately
- **Relocation/travel:** Under discussion — currently focused on remote/hybrid roles in Wrocław, open to discussing relocation or travel depending on the role

### Salary Expectations

- USD: 5,000 netto (6,276 USD brutto, B2B)
- EUR: 5,000 netto (6,182 EUR brutto, B2B)
- Exchange rates used: 1 USD = 3.7 PLN, 1 EUR = 4.3 PLN
- Employed alternative (EUR): gross 27,609 PLN (6,735 EUR) → netto 20,510 PLN (5,000 EUR) after ZUS 13.71% + PIT 12%
- Employed alternative (USD): gross 26,918 PLN (6,730 USD) → netto 20,000 PLN (5,000 USD) after ZUS 13.71% + PIT 12%

---

## Work History

### WorkJam — Senior Frontend Engineer

**March 2024 – July 2026 | Kraków, Poland (Remote) | 2 years 5 months**

Leading Frontline AI platform for task management, scheduling, and communication for deskless workforces across retail, hospitality, manufacturing, and healthcare. Served enterprise clients in 38 countries with 50+ languages support. Complex monorepo (Nx, Lerna, pnpm) with two legacy Angular apps and a modern Next.js application, sharing reusable component libraries across all products.

**Responsibilities:**

- Managed micro-frontend architecture with React modules injected into legacy Angular applications
- Refactored critical feature flag management library used across the entire platform
- Web app integration into Android via WebView
- Integrations with Microsoft Teams and an AI-powered chatbot
- Developed new features and maintained functionality across legacy and modern codebases
- Active code review and agile ceremonies
- Recognized internally as top performer on the team

**Tech Stack:** React, Next.js, Angular, Redux (Thunk, Saga), MobX, GraphQL, Tailwind CSS, Storybook, Jest, Nx, Lerna, pnpm

**Use Cases:**

_Feature Flag Management Library Migration to Harness FME_ — The platform originally used LaunchDarkly and Flagr (legacy tech debt) for feature flags, with Flagr being the most heavily used. To modernize the infrastructure, the team migrated to Harness Feature Management Engine. The process involved: creating a feature flag in Harness to enable the migration, implementing Harness initialization across the platform, allowing all companies to use Harness instead of LaunchDarkly, gathering errors and edge cases for one month in production, iterating on improvements, and finally removing LaunchDarkly and Flagr completely. Successfully completed a zero-downtime migration with no service disruption.

_Shareable Microsoft Teams Integration Library_ — Created a reusable library to standardize Microsoft Teams integration across the platform. The library provides methods to receive context from MS Teams and centralizes configuration for all integrated applications. The platform consists of 4 module applications and 1 unified application. A key complexity was handling navigation between module apps — when users click a link in Teams, the system needs to open a new app instance, not just navigate to a page. Implemented cross-app navigation logic that maintains context and state when switching between modules within the Teams environment.

_Cross-Platform Android WebView Integration_ — Integrated a web chat module into the Android native app while handling significant constraints. Google's requirements limit Android apps to a 4KB page size, making it impossible to load the external module directly due to size limitations. Solution: render the chat module using WebView to keep the native app lightweight. The complexity involved ensuring a seamless user experience: users logged into the native app automatically authenticate in the web chat (no auth screens shown), and the web chat module had to support all Android app features including video recording and screenshot functionality. Implemented by extending the global window object with methods that allow internal Android APIs to access the camera and receive responses, creating a bridge between native Android capabilities and the web chat module.

_AI Content Assistant in Rich Text Editor_ — The platform's rich text editor is a shared component used to create documents, posts, comments, and other content. It supports text formatting and styling, links, and embedding images, files, and video. To simplify content creation, integrated an AI assistant into the editor, with Gemini as the primary model, similar to how the AI assistant works in Jira for task creation. The full content of the post is passed to the model, and the user can pick a quick action (simplify, make shorter, make more polite, etc.) or write a custom prompt describing their needs and requirements. Implemented streaming with Server-Sent Events (SSE): the client keeps an open connection with the server, receives generated content in chunks, and renders it immediately as it arrives. The model returns Markdown, so the output is displayed with styling applied automatically.

_AI-Automated Translations Workflow_ — The company had three main repositories: the main application, translations, and analytics. Translations and analytics were shared across all front-end platforms (web, iOS, and Android). The original translation process was manual: update a CSV file with new keys and translations, run a script to generate files for all supported languages, create a PR, get it reviewed and merged, then update the package version. With the AI workflow, the developer builds the feature, defines the required translations in a JSON file (key–value pairs), and runs a single AI command. The command picks up the file, runs the generation script for all languages, and creates a PR with the ticket link and a description. Once the PR is approved and merged, the package version is updated manually and the translations are used in the feature. Reduced the process from about 5 hours to 1 hour.

**Reason for Leaving:** Company-wide layoff, not a performance issue. The team worked in an outstaffing format; one of the company's biggest clients left, and the company no longer had enough resources to keep the team. Managers, developers, product owners, and product managers were all genuinely happy with the team's work — performance was rated highly, and nobody wanted to let the team go.

---

### REMED, TOV — Frontend Engineer

**December 2021 – August 2024 | Kyiv, Ukraine (Remote) | 2 years 9 months**

Healthcare CRM system with integration into Ukraine's national eHealth system and Helsi medical platform. Helsi is Ukraine's largest medical information system, integrated with the national electronic healthcare system eHealth. Key features: patient management/CRM, EHR integration, appointment scheduling, medical documentation, integration with national healthcare systems.

**Responsibilities:**

- Owned and maintained the most high-loaded modules in the platform
- Built modular architecture with services, components, data storage, and API layers organized per business entity
- Implemented comprehensive E2E testing strategy with Cypress
- Integrated advanced token refresh mechanism across all API clients
- Integrated with Helsi (Ukraine's national e-health system)
- Mentored junior engineers on the team — ran almost weekly deep-dive sessions on a chosen technology (e.g. Redux Saga, Tailwind); was the go-to person for explaining why and how something should be done

**Module Ownership:** Doctor Workplace, Cashier Workplace, Calendar System

**Tech Stack:** React.js, MobX, TypeScript, Cypress, Jest, Vite, Sentry

**Use Cases:**

_Module Ownership — Doctor Workplace, Cashier Workplace, and Calendar System_ — Owned the most high-loaded and critical modules of the CRM system. The Doctor Workplace and Cashier Workplace modules handled core business operations. The Calendar system managed doctor availability and appointment scheduling — allowing patients to view each doctor's calendar, create appointments, and manage doctor availability and patient data. This required careful architecture to handle high traffic and complex user interactions.

_Cypress E2E Testing Integration_ — Due to architectural specifics of the platform, traditional unit and integration tests were difficult to implement effectively. Implemented Cypress as the E2E testing framework and integrated it into the development pipeline. Achieved comprehensive test coverage of the most high-loaded and demanded pages, ensuring stability and reliability of critical user workflows.

_Refresh Token Implementation with Request Interceptors_ — Implemented an advanced token refresh mechanism to handle token expiration. Each service in the platform has an extended ApiClient, creating a service-to-API client relationship. The challenge was coordinating token refresh across multiple clients — when a token is about to expire, make a refresh call while ensuring all subsequent requests from other clients wait until the refresh completes. Solution involved adding interceptors to the ApiClient: the refresh interceptor makes the token refresh call, waits for the response, and if successful passes arguments to subsequent requests; if it fails, aborts all subsequent requests and logs out the user. This ensures seamless token management without duplicate refresh calls.

**Reason for Leaving:** Had learned the project in deep detail and got an opportunity to work on an even bigger project. Also moved to Poland and needed legal work documentation there — the new position (WorkJam) was based in Poland, which is why the JDG (sole proprietorship) was opened.

---

### DataMix — Frontend Engineer

**October 2020 – December 2021 | Kyiv, Ukraine | 1 year 3 months**

DataMix designs and builds complex web and ML/AI applications with a dedicated Ukrainian team, specializing in taking projects from MVP to enterprise scale. 6 years in business (founded 2017), 3 offices worldwide, 85+ projects completed, 45+ middle+ and senior experts. Services include custom web application development, design sprints, ML/AI development, technical audits, and cybersecure development. Outsourcing company working across multiple projects simultaneously.

**Career Progression:**

- Progressed from junior to strong mid-level engineer within 1.5 years, gaining diverse experience across different product domains and architectures
- Worked across multiple high-load projects concurrently
- Took ownership of core development responsibilities on multiple initiatives

**Tech Stack:** React.js, Redux, Redux-Saga, MobX, GraphQL, React Testing Library, Jest, Firebase

**Use Cases:**

_Investment Matching Platform_ — Core developer on this high-load two-sided marketplace connecting investors and investees with complex data calculations. Worked on critical features handling real-time market data and user matching algorithms.

_Social Network (Instagram-like Web App)_ — Sole frontend developer, built the complete application from scratch to MVP within 6 months. Wide responsibilities spanning from architectural decisions to implementation and styling. Delivered smooth UX with fluid animations, a multi-directional slider, and efficient data fetching under heavy load. Managed the entire frontend lifecycle independently — from technical planning through deployment.

**Reason for Leaving:** Realized he was no longer junior-level and wanted to move beyond implementing features toward architecture and module ownership. Salary disagreements also contributed.

---

### Capital Holding — Frontend Developer

**April 2019 – October 2020 | Kyiv, Ukraine | 1 year 7 months**

Real-time betting platform featuring a high-frequency dashboard displaying live sports events with continuous data updates.

**Responsibilities:**

- Built and maintained UI components for the live betting dashboard with real-time data updates
- Implemented WebSockets for live event streaming to keep the UI in sync with ongoing match events
- Gained strong foundational experience in React, Redux, and vanilla JavaScript

**Tech Stack:** React.js, Redux, JavaScript, WebSockets

**Reason for Leaving:** Wanted to grow further as a frontend developer, gain more hands-on practice, and work across different kinds of projects. DataMix (an outsourcing company) felt like the right next step.

---

## Key Architectural Decisions & Patterns

- **Monorepo Architecture (WorkJam):** Managed complex monorepo with Nx/Lerna/pnpm across legacy Angular apps + modern Next.js; established micro-frontend strategy for injecting React modules into Angular systems.
- **Modular Service Architecture (REMED):** Clear separation of services, components, data storage, and API layers per business entity; robust token refresh with interceptors across multiple API clients.
- **Feature Flag Abstraction (WorkJam):** Standardized feature flag management library; zero-downtime migration from multiple legacy systems to Harness FME.
- **Real-Time Data Patterns (Capital Holding):** WebSocket implementation and real-time synchronization for high-frequency trading dashboards.

---

## Soft Skills

**Leadership & Team Collaboration**

- Worked within large-scale team dynamics (20-person frontend team at WorkJam)
- Experience across different organizational sizes (solo projects to enterprise teams) indicates adaptability to various team structures

**Communication & Clarity**

- Working remotely across distributed teams requires clear async communication
- Building complex systems (micro-frontends, monorepos) suggests the ability to explain technical concepts to stakeholders and peers
- Job searching in multiple contexts (different markets, LinkedIn presence) shows self-promotion and articulation skills

**Entrepreneurship & Self-Direction**

- Running a Polish JDG sole proprietorship for 2+ years demonstrates initiative, business acumen, and independent problem-solving
- Multiple simultaneous side projects (natal card app, job matcher SPA, clean architecture exploration) shows the ability to self-motivate and juggle priorities

**Adaptability & Learning Agility**

- Worked across diverse domains: fintech (Capital Holding), social networks (DataMix), healthcare (REMED), enterprise workforce (WorkJam)
- Continuous stack evolution (React, Next.js, GraphQL, MobX, Redux, WebSockets, AI integrations) indicates openness to learning
- Successfully transitioned from IC to contributing to larger team efforts

**Problem-Solving & Initiative**

- Built production systems solo (DataMix MVP) and at scale
- Designing micro-frontend architecture and complex distributed systems suggests strategic thinking
- Proactively developing skills (AI integrations, architecture principles)

**Resilience & Persistence**

- Navigating career transitions, maintaining business while employed, active job search with strategic projects

---

## Career Direction

### 3–5 Year Vision

Currently targeting Senior Engineer roles, but also considering Staff Engineer or Tech Lead. Wants to stay mostly technical, not managerial — no interest in becoming a Team Lead (sees that as managing people rather than writing code). Sees himself as Staff Engineer/Tech Lead within 3–5 years. Wants to keep working in healthcare and fintech — domains he already knows and finds meaningful because of their impact on people. Wants to keep improving AI workflow knowledge, seeing it as essential for staying high-performing.

### Staff Engineer Vision

Staff role is primarily about architectural decisions — designing systems, not just shipping features. Being the person with direct impact on architecture; clearly explaining and justifying why specific patterns are better in specific contexts; choosing implementation approaches and defending them to the team.

### What He's Looking For

- No micromanagement; clear responsibilities with module ownership; influence on architectural decisions; talented colleagues; continuous learning
- Non-trivial, high-loaded technical challenges requiring deep thinking and architectural judgment
- Potential to grow into full-stack; interested in backend as well as frontend
- No toxic employees; warm, collaborative culture; a manager who listens and cares about growth
- Remote or hybrid role based in Wrocław, Poland

### Not Seeking

Micromanagement, toxic environments, stagnation, purely junior/routine work.

---

## Interview Answer Bank

### "What does senior mean to you?"

Three pillars:

1. **Deep technical foundation** — browser internals, event loop, storage, networking, JavaScript/HTML/CSS depth, ability to design architecture from scratch.
2. **Judgment, not just knowledge** — knowing when _not_ to use complex solutions (avoiding over-engineering), and continuously advising POs/PMs on the best approach for the user.
3. **Business and domain awareness** — technical skill alone isn't enough; decisions should serve the product, not just the codebase.

### Code Review Approach

- Starts by reading PR/feature context before the code itself
- Checks file placement, naming, and structure; prop contracts and clear boundaries between components/modules/libraries
- Reads imports first to understand dependencies; checks typings for unnecessary duplication
- Evaluates local vs. global state, preferring local where possible
- Checks ESLint/Prettier adherence and codebase conventions
- Checks risk areas (e.g. unwrapped API calls), test coverage of new logic/edge cases
- Gives feedback by asking questions rather than dictating; distinguishes blocking issues from nitpicks
- Flags oversized/mixed-scope PRs
- Checks edge cases/error states, performance implications, and consistency with existing patterns

### Staying Current with Front-End Technology

Follows a trusted course/community created by Timur Chemsedinov (Node.js contributor, lecturer at Kyiv Polytechnical University) and Ilya Klimov (Staff Developer at GitLab), aimed at senior developers — covering communication, AI, and architecture, with homework and group discussion.

### Quality & Error-Prevention Pipeline

ESLint/Prettier + TypeScript before push → AI review before push → tests covering new logic → PR review from developers + AI reviewer → SonarQube (on WorkJam) for code quality → QA testing post-merge → Sentry/monitoring for post-release errors.

### Mistake: Estimation

Underestimated an Epic by estimating implementation time alone, without accounting for PR review, tests, risk, or QA fixes. Had to make up the shortfall with overtime. **Lesson:** estimate the full feature lifecycle, not just coding.

### Mistake: Miscommunication with a Product Owner

A seemingly simple epic required going into the actual codebase (not just talking to the PO) to understand where the change would really need to land. **Lesson:** full scope understanding comes from checking the code, not just the requirements conversation.

### Pushing Back on Requirements: Date Picker / Calendar View (WorkJam)

A PO wanted to bundle two epics: a new date-picker library update _and_ a calendar view built on that (not-yet-built) picker. Estimated the new date picker at ~10 days and presented this concretely. Proposed instead extending the _legacy_ date picker with custom props/styles to visually match the new design — delivered in 3 days instead of 10. PO brought it to the client, who was happy.

### Team Conflict: Frontend/Backend Contract Disagreements (REMED)

Frequent disagreements with backend developers over unclear API contracts (needing extra data not in the endpoint response). Brought design into the conversation too, so all three sides could weigh trade-offs (adjust design vs. extend backend vs. more complex frontend handling) and find one solution that worked for everyone.

### Difficult Feedback: First Epic at WorkJam (Teams Integration)

First epic was a Microsoft Teams integration with limited documentation and a hard-to-test local setup. Spent about a week working through it mostly solo before consulting the original implementers. Delivered correctly but got negative feedback from the team lead about the time it took. Explained the complexity in a 1:1; the team lead accepted it, no lasting conflict.

### Explaining a Technical Concept to a Non-Technical Stakeholder: Agenda View Reuse (WorkJam)

Wanted to reuse Two Weeks View components in a new Agenda View, but they weren't built for reuse. Explained the trade-off to the PO in terms of impact: new separate components would be faster now but double future maintenance and bundle size; refactoring into a shareable component first would cost 5–7 extra days but avoid that. PO approved the refactor-first approach.

### Communicating with Product Managers and Designers

With PMs: understand the business goal behind a feature, not just requirements; raise risks/trade-offs early. With designers: clarify interaction details, responsive behavior, and edge cases before implementation; give feedback on usability/feasibility concerns. Believes early communication reduces rework and misunderstandings.

### Definition of "Toxic" Work Environment

Mainly a lack of trust and respect: people afraid to raise concerns, mistakes blamed on individuals rather than discussed constructively, constant micromanagement, poor communication. Distinguishes this from normal disagreement/pressure, which is expected — what matters is how people handle it.

### Preferred Management Style

Autonomy and clear module ownership, no micromanagement. A 1:1 every two weeks works well, with more frequent contact when blocked or something important comes up. Wants visibility into priorities, not constant status updates. Values a manager who listens, gives constructive feedback, and supports growth.

### Success After 6 Months

Three points:

1. **Technical ownership** — clear ownership of a module/area, shipping at least one meaningful feature/improvement mostly independently.
2. **Team integration and trust** — team lead/colleagues trusting his technical judgment (estimates hold up, reviews are useful, brought hard problems).
3. **Business/domain understanding** — able to discuss trade-offs and user impact with the PO, proactively flagging risks.

One-line summary: _success means the team and PO trust his judgment, not just his output._

### How Colleagues/Managers Describe Him

From LinkedIn recommendations (WorkJam/Proffiz colleagues — a Team Lead who managed him directly for 2+ years, a Software Architect, and several Frontend/Software Engineers): consistently described as reliable, taking full ownership of features end-to-end without cutting corners; thinking in systems rather than tickets, often improving the underlying structure rather than just fixing the immediate issue; comfortable with complex legacy code with good instincts on when to refactor; clear and honest in code reviews while staying open to discussion; a go-to person junior engineers sought out for advice; strong architectural thinking (especially micro-frontend strategy); combining technical depth with clear communication.

---
