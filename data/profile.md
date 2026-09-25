# Vladyslav Spasibozhko — Candidate Profile

_This document covers background, work history, use cases, and thinking as a developer. It is not tied to any specific target company — questions about a particular company should be answered directly, not from this file._

> **Headline:** Senior Frontend Engineer | React, Next.js, TypeScript | Micro-frontends & Design Systems | AI-powered product features
>
> Frontend-focused, working across the stack (Node.js, LLM APIs, streaming).

---

## Basic Information

- **Name:** Vladyslav Spasibozhko
- **LinkedIn:** linkedin.com/in/vladspasibozhko
- **Role:** Senior Frontend Engineer, 7+ years of experience
- **Location:** Wrocław, Poland (works remotely)
- **Core stack:** React, Next.js, TypeScript, GraphQL/Apollo, MobX, Redux, WebSockets
- **AI:** LLM features in production (Gemini, SSE streaming, Markdown rendering), AI-automated dev workflows, Claude SDK / Anthropic API
- **Backend:** Node.js (Express, Nest.js), PostgreSQL, SSE — frontend-focused, working across the stack
- **Specialist areas:** Micro-frontend architecture, monorepos (Nx, Lerna, pnpm), design systems & shared component libraries (Storybook), performance of high-load modules, real-time UIs (WebSockets)
- **Business setup:** Operates a Polish sole proprietorship (JDG) for over two years
- **Education:** Bachelor's Degree in Management and Administration, National University of Food Technologies (2018), GPA 4.5
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

## Senior / Staff Signals (summary)

- **Architecture decisions:** Micro-frontend strategy (React inside legacy Angular) in a 5-app monorepo; per-entity modular architecture at REMED; single shared libraries for feature flags and MS Teams instead of 5 separate implementations.
- **Migration ownership:** Proposed and led a zero-downtime migration of platform-wide feature flags (3 flag systems → 1) for a product used by ~3M people.
- **Scope pushback with data:** Replaced a 10-day date-picker rewrite with a 3-day extension of the legacy picker (~70% less time); client approved.
- **Mentoring:** Ran near-weekly deep-dive sessions for junior engineers at REMED (Redux Saga, Tailwind, etc.); go-to person for "why", not just "how".
- **Code review:** Structured review process (context → structure → contracts → state → risks → tests); feedback as questions; separates blockers from nitpicks.
- **Recognition:** Named a top performer on a ~20-person frontend team at WorkJam.

---

## Work History

### WorkJam — Senior Frontend Engineer

**March 2024 – July 2026 | Kraków, Poland (Remote) | 2 years 5 months**

Frontline AI platform for task management, scheduling, and communication for deskless workforces (retail, hospitality, manufacturing, healthcare). ~3M users, enterprise clients in 38 countries, 50+ languages. Monorepo (Nx, Lerna, pnpm) with 2 legacy Angular apps + 1 Next.js app — 4 module apps and 1 unified app — sharing reusable component libraries. ~20-person frontend team.

**Key Outcomes:**

- **AI:** Built an AI writing assistant (Gemini) into the platform's shared rich text editor — one integration shipped AI to every documents, posts and comments surface at once; streamed via SSE with live Markdown rendering.
- **AI:** Designed an AI-automated translations workflow (JSON keys → one command → generation for 50+ languages → PR with ticket link and description), cutting the process from ~5 hours to ~1 hour (~80% less).
- Proposed and led a zero-downtime migration of platform-wide feature flags from LaunchDarkly/Flagr to Harness FME across all 5 apps — 3 systems ran in parallel, 1 month of production monitoring, then legacy removed. No incidents, no rollbacks.
- Built a shared Microsoft Teams integration library used by all 5 apps (4 module + 1 unified), replacing 5 separate implementations and solving cross-app navigation with preserved context.
- Integrated the web chat module into the native Android app via WebView under Google's 4KB page size limit — silent auth (no login screen) and a native bridge for camera, video recording and screenshots.
- Maintained the micro-frontend architecture injecting React modules into 2 legacy Angular apps, so new features shipped without a rewrite.
- **Design system:** Contributed to shared component libraries documented in Storybook and reused across all products in the monorepo.
- Refactored the Two Weeks View calendar into shared components for a new Agenda View: delivered in 10 days vs 15 planned, zero bugs from QA or production.
- Pushed back on bundled scope for a date-picker/calendar epic: extended the legacy picker in 3 days instead of a 10-day rewrite.
- Active code reviewer and agile ceremony participant; recognized internally as a top performer on the ~20-person team.

**Tech Stack:** React, Next.js, Angular, TypeScript, Redux (Thunk, Saga), MobX, GraphQL, Tailwind CSS, Storybook, Jest, Nx, Lerna, pnpm, SSE, Gemini

**Use Cases:**

_AI Content Assistant in Rich Text Editor_ — The platform's rich text editor is a shared component used to create documents, posts, comments, and other content. It supports text formatting and styling, links, and embedding images, files, and video. To simplify content creation, integrated an AI assistant into the editor, with Gemini as the primary model, similar to how the AI assistant works in Jira for task creation. The full content of the post is passed to the model, and the user can pick a quick action (simplify, make shorter, make more polite, etc.) or write a custom prompt. Implemented streaming with Server-Sent Events (SSE): the client keeps an open connection with the server, receives generated content in chunks, and renders it immediately. The model returns Markdown, so the output is displayed with styling applied automatically. Because the editor is shared, every writing surface got the feature from one integration.

_AI-Automated Translations Workflow_ — Three main repositories: the main application, translations, and analytics. Translations and analytics were shared across all front-end platforms (web, iOS, Android). The original process was manual: update a CSV with new keys, run a script to generate files for all languages, create a PR, get it reviewed and merged, then update the package version. With the AI workflow, the developer defines the required translations in a JSON file (key–value pairs) and runs a single AI command, which runs the generation script for all languages and creates a PR with the ticket link and a description. After merge, the package version is updated manually. Reduced the process from ~5 hours to ~1 hour.

_Feature Flag Migration to Harness FME_ — The platform used LaunchDarkly and Flagr (legacy tech debt, Flagr most heavily used) through one shared library at the centre of the platform. Proposed the move and researched its real cost. Steps: created a Harness flag to gate the migration, implemented Harness initialization across all apps (3 systems running at once), covered affected pages with automated tests, rolled out via QA → staging → a handful of real companies → all companies, collected errors and edge cases for one month in production, iterated, then removed LaunchDarkly and Flagr. Zero downtime, no incidents, no rollbacks.

_Shareable Microsoft Teams Integration Library_ — Created a reusable library to standardize MS Teams integration: methods to receive Teams context (user, company) and centralized configuration for all apps. The platform has 4 module apps and 1 unified app. Key complexity: when a user clicks a link in Teams, the system must open a new app instance, not just navigate to a page. Implemented cross-app navigation that preserves context and state between modules inside Teams.

_Cross-Platform Android WebView Integration_ — Google's 4KB page size requirement made loading the external chat module directly impossible. Rendered it in a WebView to keep the native app lightweight. Users logged into the native app are authenticated in the web chat automatically (no auth screens), and the chat supports all app features including video recording and screenshots — implemented by extending the global window object with methods that let internal Android APIs access the camera and return results, creating a native ↔ web bridge.

**Reason for Leaving:** Company-wide layoff, not a performance issue. The team worked in an outstaffing format; one of the company's biggest clients left, and the company no longer had enough resources to keep the team. Managers, developers, product owners, and product managers were all genuinely happy with the team's work — performance was rated highly, and nobody wanted to let the team go.

---

### REMED, TOV — Frontend Engineer

**December 2021 – August 2024 | Kyiv, Ukraine (Remote) | 2 years 9 months**

Healthcare CRM (PWA) connecting clinics and laboratories, integrated with Helsi — Ukraine's largest medical information system, connected to the national eHealth system (Helsi serves 24M Ukrainians, 1,300+ clinics, 37,000+ doctors).

**Key Outcomes:**

- Owned the 3 most high-loaded, business-critical modules — Doctor Workplace, Cashier Workplace, Calendar System — used by doctors every hour of the working day.
- Designed a per-entity modular architecture (services, components, data storage, API layers) so changes in one domain didn't ripple into others.
- Refactored and optimized the most demanding modules, improving performance and reducing API requests.
- Introduced Cypress E2E testing where unit/integration tests weren't practical; covered the most high-loaded pages and critical flows (e.g. booking a visit).
- Built a coordinated token-refresh mechanism across all API clients: one refresh call, queued requests, auto-logout on failure — no duplicate refreshes.
- Migrated local dev build from Webpack to Vite, cutting build time by ~10 seconds.
- Implemented Sentry for real-time error tracking, replacing manual user error reports.
- Mentored junior engineers: ran near-weekly deep-dive sessions on a chosen technology (Redux Saga, Tailwind, etc.) and was the go-to person for "why and how".
- Resolved recurring frontend/backend API contract disputes by bringing design into the discussion, so all three sides agreed on one trade-off.

**Tech Stack:** React.js, MobX, TypeScript, Cypress, Jest, Vite, Sentry, PWA

**Use Cases:**

_Module Ownership — Doctor Workplace, Cashier Workplace, and Calendar System_ — Owned the most high-loaded and critical modules of the CRM. Doctor and Cashier Workplaces handled core business operations. The Calendar managed doctor availability and scheduling — patients view each doctor's calendar and create appointments; staff manage availability and patient data. Required careful architecture for high traffic and complex interactions.

_Cypress E2E Testing Integration_ — The platform's architecture made unit and integration tests hard to apply effectively. Introduced Cypress and integrated it into the development pipeline, covering the most high-loaded and demanded pages and critical user workflows.

_Refresh Token Implementation with Request Interceptors_ — Each service has an extended ApiClient (service ↔ API client relationship). Challenge: coordinate refresh across many clients so that when a token is about to expire, one refresh call happens and all other requests wait. Solution: a refresh interceptor makes the call, waits for the response, and on success passes arguments to queued requests; on failure aborts them and logs the user out.

**Reason for Leaving:** Had learned the project in deep detail and got an opportunity to work on an even bigger project. Also moved to Poland and needed legal work documentation there — the new position (WorkJam) was based in Poland, which is why the JDG was opened.

---

### DataMix — Frontend Engineer

**October 2020 – December 2021 | Kyiv, Ukraine | 1 year 3 months**

Outsourcing company building web and ML/AI applications from MVP to enterprise scale (85+ projects, 45+ middle+/senior experts, 3 offices).

**Key Outcomes:**

- Sole frontend developer on an Instagram-like social network: took it from an empty repo to MVP in 6 months — architecture, animations, multi-directional slider, efficient data fetching under heavy load.
- Core developer on a high-load investment matching marketplace (investors ↔ investees) with complex data calculations.
- Key contributor to architecture design on the business automation platform.
- Grew from junior to strong mid-level in ~1.5 years while working on multiple projects in parallel.

**Tech Stack:** React.js, Redux, Redux-Saga, MobX, GraphQL, React Testing Library, Jest, Firebase

**Reason for Leaving:** Realized he was no longer junior-level and wanted to move beyond implementing features toward architecture and module ownership. Salary disagreements also contributed.

---

### Capital Holding — Frontend Developer

**April 2019 – October 2020 | Kyiv, Ukraine | 1 year 7 months**

- Built UI for a real-time sports betting dashboard with WebSocket streaming, keeping high-frequency live data in sync — foundation in React, Redux and vanilla JS.

**Tech Stack:** React.js, Redux, JavaScript, WebSockets

**Reason for Leaving:** Wanted to grow faster and work across different kinds of projects; DataMix (outsourcing) was the right next step.

---

## Projects

### Portfolio AI Assistant (personal, 2026)

Portfolio app with a Node.js server and a chat assistant built on the Anthropic SDK (Claude). The assistant answers recruiters' questions about the candidate using a structured background file as its source of truth. Testing uses a dual-AI setup: one model answers as the assistant, a second plays the test user — asking questions and evaluating answers for accuracy and consistency.

**Stack:** Node.js, Anthropic SDK (Claude), TypeScript

### Other side projects

- Natal chart web app with AI-generated readings.
- Job matcher SPA — interactive extended CV with job matching and chat.
- Clean architecture / DDD exploration project.

---

## Key Architectural Decisions & Patterns

- **Monorepo & Micro-frontends (WorkJam):** Nx/Lerna/pnpm monorepo with 5 apps across legacy Angular and modern Next.js; React modules injected into Angular so the product moved forward without a rewrite.
- **Shared Libraries over Duplication (WorkJam):** One feature flag library and one MS Teams library consumed by all apps instead of per-app solutions.
- **Modular Service Architecture (REMED):** Services, components, data storage, and API layers per business entity; coordinated token refresh via interceptors across multiple API clients.
- **Streaming AI UX (WorkJam):** SSE streaming with incremental Markdown rendering so users never wait on a blank screen.
- **Real-Time Data (Capital Holding):** WebSocket streaming for high-frequency live dashboards.

---

## Soft Skills (with evidence)

- **Communicating trade-offs to non-technical people:** Explained to a PO that building the Agenda View separately would double future maintenance and bundle size; refactor-first cost 5–7 extra days. PO approved.
- **Pushing back with data:** Estimated a date-picker rewrite at ~10 days and proposed a 3-day alternative; the client was happy with the result.
- **Mentoring:** Near-weekly technology deep dives for juniors at REMED.
- **Cross-functional conflict resolution:** Brought backend, frontend, and design together to settle API contract disagreements at REMED.
- **Ownership under ambiguity:** First WorkJam epic (MS Teams integration) had little documentation and a hard local setup; delivered it correctly, then discussed the timeline openly with the team lead in a 1:1.
- **Self-direction:** Runs a JDG for 2+ years; builds side projects in parallel with full-time work.
- **Adaptability:** Four domains — betting/fintech, social, healthcare, enterprise workforce.

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

1. **Technical ownership** — clear ownership of a module/area, shipping at least one meaningful feature/improvement mostly independently.
2. **Team integration and trust** — team lead/colleagues trusting his technical judgment (estimates hold up, reviews are useful, brought hard problems).
3. **Business/domain understanding** — able to discuss trade-offs and user impact with the PO, proactively flagging risks.

One-line summary: _success means the team and PO trust his judgment, not just his output._

### How Colleagues/Managers Describe Him

From LinkedIn recommendations (WorkJam/Proffiz colleagues — a Team Lead who managed him directly for 2+ years, a Software Architect, and several Frontend/Software Engineers): consistently described as reliable, taking full ownership of features end-to-end without cutting corners; thinking in systems rather than tickets, often improving the underlying structure rather than just fixing the immediate issue; comfortable with complex legacy code with good instincts on when to refactor; clear and honest in code reviews while staying open to discussion; a go-to person junior engineers sought out for advice; strong architectural thinking (especially micro-frontend strategy); combining technical depth with clear communication.

---
