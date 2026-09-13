# Vladyslav Spasibozhko

**Frontend Engineer**

---

## SALARY EXPECTATION

### B2B - USD

- **Netto:** 5,000 USD (18,500 PLN)
- **Ryczałt Tax (12%):** 2,220 PLN
- **ZUS:** 2,500 PLN
- **VAT (23%):** 4,255 PLN
- **Brutto:** 6,276 USD (23,220 PLN)
- **Exchange rate:** 1 USD = 3.7 PLN

### B2B - EUR

- **Netto:** 5,000 EUR (21,500 PLN)
- **Ryczałt Tax (12%):** 2,580 PLN
- **ZUS:** 2,500 PLN
- **VAT (23%):** 4,945 PLN
- **Brutto:** 6,182 EUR (26,580 PLN)
- **Exchange rate:** 1 EUR = 4.3 PLN

---

## WORK EXPERIENCE

### Frontend Engineer — WorkJam

**March 2024 – July 2026 | Kraków, Poland (Remote)**

**Company Overview:**
WorkJam is a leading Frontline AI platform that transforms how companies orchestrate task management, scheduling, and communication for deskless workforces. The platform serves enterprise clients across retail, hospitality, manufacturing, and healthcare.

**Key Products:**

- Employee Communications (shift-fenced messaging)
- Task Management (with photo verification and audit trails)
- Flexible Shift Management
- Learning & Knowledge Management
- Audits & Compliance workflows
- AI & Workflows automation
- Earned Wage Access

**Technical Details:**
Large-scale workforce management platform used globally by enterprise clients. Complex monorepo (Nx, Lerna, pnpm) with two legacy Angular apps and modern Next.js application, sharing reusable component libraries across all products.

**Responsibilities:**

- Managed micro-frontend architecture with React modules injected into legacy Angular applications
- Refactored critical feature flag management library used across the entire platform
- Web app integration into Android via WebView
- Integrations with Microsoft Teams and AI-powered chatbot
- Developed new features and maintained functionality across legacy and modern codebases
- Active code review and agile ceremonies
- Recognized internally as top performer on the team

**Tech Stack:**
React, Next.js, Angular, Redux (Thunk, Saga), MobX, GraphQL, Tailwind CSS, Storybook, Jest, Nx, Lerna, pnpm

#### Key Use Cases:

**Feature Flag Management Library Migration to Harness FME**
The platform originally used LaunchDarkly and Flagr (legacy tech debt) for feature flags, with Flagr being the most heavily used. To modernize the infrastructure, we migrated to Harness Feature Management Engine. The process involved:

- Creating a feature flag in Harness to enable the migration
- Implementing Harness initialization across the platform
- Allowing all companies to use Harness instead of LaunchDarkly
- Gathering errors and edge cases for one month in production
- Iterating on improvements
- Removing LaunchDarkly and Flagr completely

Successfully completed zero-downtime migration with no service disruption.

**Shareable Microsoft Teams Integration Library**
Created a reusable library to standardize Microsoft Teams integration across the platform. The library provides methods to receive context from MS Teams and centralizes configuration for all integrated applications. The platform consists of 4 module applications and 1 unified application. A key complexity was handling navigation between module apps - when users click a link in Teams, the system needs to open a new app instance, not just navigate to a page. Implemented cross-app navigation logic that maintains context and state when switching between modules within the Teams environment.

**Cross-Platform Android WebView Integration**
Integrated web chat module into Android native app while handling significant constraints. Google's requirements limit Android apps to 4KB page size, making it impossible to load the external module directly due to size limitations. Solution: Render the chat module using WebView to keep the native app lightweight. The complexity involved ensuring seamless user experience:

- Users logged into the native app automatically authenticate in the web chat (no auth screens shown)
- The web chat module had to support all Android app features including video recording and screenshot functionality
- Implemented by extending the global window object with methods that allow internal Android APIs to access camera and receive responses, creating a bridge between native Android capabilities and the web chat module

---

### Frontend Engineer — REMED, TOV

**December 2021 – August 2024 | Kyiv, Ukraine (Remote)**

**Company Overview:**
REMED is a healthcare Customer Relationship Management system with integration into Ukraine's national eHealth system and Helsi medical platform.

**Key Features:**

- Patient management and CRM
- Electronic health records (EHR) integration
- Appointment scheduling
- Medical documentation
- Integration with national healthcare systems

**Technical Details:**
Medical CRM platform connecting clinics, laboratories, and healthcare workspaces for doctors, lab technicians, and cashiers. Integrated with Helsi (Ukraine's national e-health system).

**Responsibilities:**

- Owned and maintained the most high-loaded modules in the platform
- Built modular architecture with services, components, data storage, and API layers organized per business entity
- Implemented comprehensive E2E testing strategy with Cypress
- Integrated advanced token refresh mechanism across all API clients
- Integrated with Helsi (Ukraine's national e-health system)
- Mentored junior engineers on the team

**Tech Stack:**
React.js, MobX, TypeScript, Cypress, Jest, Vite, Sentry

#### Key Use Cases:

**Module Ownership - Doctor Workplace, Cashier Workplace, and Calendar System**
Owned the most high-loaded and critical modules of the CRM system. The Doctor Workplace and Cashier Workplace modules handled core business operations. The Calendar system managed doctor availability and appointment scheduling - allowing patients to view each doctor's calendar, create appointments, and manage doctor availability and patient data. This required careful architecture to handle high traffic and complex user interactions.

**Cypress E2E Testing Integration**
Due to architectural specifics of the platform, traditional unit and integration tests were difficult to implement effectively. Implemented Cypress as the E2E testing framework and integrated it into the development pipeline. Achieved comprehensive test coverage of the most high-loaded and demanded pages, ensuring stability and reliability of critical user workflows.

**Refresh Token Implementation with Request Interceptors**
Implemented an advanced token refresh mechanism to handle token expiration. Each service in the platform has an extended ApiClient, creating a service-to-API client relationship. The challenge was coordinating token refresh across multiple clients - when a token is about to expire, make a refresh call while ensuring all subsequent requests from other clients wait until the refresh completes. Solution involved adding interceptors to the ApiClient:

- The refresh interceptor makes the token refresh call
- Waits for response
- If successful, passes arguments to subsequent requests
- If it fails, aborts all subsequent requests and logs out the user
- This ensures seamless token management without duplicate refresh calls

---

### Frontend Engineer — DataMix

**October 2020 – December 2021 | Kyiv, Ukraine**

**Company Overview:**
DataMix designs and builds complex web and ML/AI applications with a dedicated Ukrainian team. The company specializes in taking projects from MVP to enterprise scale.

**Company Stats:**

- 6 years in business (founded 2017)
- 3 offices worldwide
- 85+ projects completed
- 45+ middle+ and senior experts (engineers, PMs, QAs, designers)

**Services:**

- Custom web application development
- Design sprints
- ML/AI development
- Technical audits
- Cybersecure development

**Technical Details:**
Outsourcing company working across multiple projects simultaneously. Progressed from junior to strong mid-level engineer within 1.5 years, gaining diverse experience across different product domains and architectures.

**Responsibilities:**

- Worked across multiple high-load projects concurrently
- Took ownership of core development responsibilities on multiple initiatives
- Progressed rapidly from junior to strong mid-level within 1.5 years

**Tech Stack:**
React.js, Redux, Redux-Saga, MobX, GraphQL, React Testing Library, Jest, Firebase

#### Key Use Cases:

**Investment Matching Platform**
Core developer on this high-load two-sided marketplace connecting investors and investees with complex data calculations. Worked on critical features handling real-time market data and user matching algorithms.

**Social Network (Instagram-like Web App)**
Sole frontend developer, built complete application from scratch to MVP within 6 months. Wide responsibilities spanning from architectural decisions to implementation and styling. Delivered smooth UX with fluid animations, multi-directional slider, and efficient data fetching under heavy load. Managed the entire frontend lifecycle independently - from technical planning through deployment.

---

### Frontend Developer — Capital Holding

**April 2019 – October 2020 | Kyiv, Ukraine**

**Company Overview:**
Real-time betting platform featuring high-frequency dashboard displaying live sports events with continuous data updates.

**Responsibilities:**

- Built and maintained UI components for live betting dashboard with real-time data updates
- Implemented WebSockets for live event streaming to keep UI in sync with ongoing match events
- Gained strong foundational experience in React, Redux, and vanilla JavaScript

**Tech Stack:**
React.js, Redux, JavaScript, WebSockets

---

## ARCHITECTURAL DECISIONS & CONTRIBUTIONS

### WorkJam (March 2024 – July 2026)

- Maintained complex monorepo architecture with Nx/Lerna/pnpm for multiple applications (legacy Angular apps + modern Next.js)
- Established micro-frontend strategy enabling React modules to be injected into Angular legacy systems
- Refactored and standardized critical feature flag management library to serve entire platform ecosystem
- Successfully migrated from LaunchDarkly and Flagr to Harness Feature Management Engine, handling complex coordination across multiple API clients

### REMED (December 2021 – August 2024)

- Architected modular structure with clear separation of concerns: services layer for API communication, components for UI, data storage patterns, and API layers organized per business entity
- Built robust token refresh mechanism with interceptors ensuring coordinated token management across multiple API clients
- Implemented comprehensive Cypress E2E testing framework to cover high-load critical pages and workflows

### DataMix (October 2020 – December 2021)

- Led architectural decisions on high-load projects as a core developer
- Built complete social network application from scratch with attention to performance and scalability
- Managed architectural planning from concept through MVP delivery

### Capital Holding (April 2019 – October 2020)

- First hands-on experience designing real-time systems using WebSockets
- Built foundation for understanding real-time data synchronization in high-frequency trading environments

---

## EDUCATION

**National University of Food Technologies**

- **Degree:** Bachelor's Degree — Management and Administration
- **GPA:** 4.5
- **Duration:** September 2014 – June 2018

---

## COURSES & CERTIFICATIONS

- **JavaScript Advanced, React.js** — IT Education Academy, March–May 2019
- **Front-End Jedi Course** — Forte Group, July 2020

---

## LANGUAGES

- **Ukrainian** — Native
- **English** — Upper-Intermediate

---

## SOFT SKILLS

### Leadership & Team Collaboration

- Worked with large-scale team dynamics (20-person frontend team at WorkJam)
- Experience across different organizational sizes (solo projects to enterprise teams) indicates adaptability to various team structures

### Communication & Clarity

- Working remotely across distributed teams requires clear async communication
- Building complex systems (micro-frontends, monorepos) suggests ability to explain technical concepts to stakeholders and peers
- Job searching in multiple contexts (different markets, LinkedIn presence) shows self-promotion and articulation skills

### Entrepreneurship & Self-Direction

- Running a Polish JDG sole proprietorship for 2+ years demonstrates initiative, business acumen, and independent problem-solving
- Multiple simultaneous side projects (natal card app, job matcher SPA, clean architecture exploration) shows ability to self-motivate and juggle priorities

### Adaptability & Learning Agility

- Worked across diverse domains: fintech (Capital Holding), social networks (DataMix), healthcare (REMED), enterprise workforce (WorkJam)
- Continuous stack evolution (React, Next.js, GraphQL, MobX, Redux, WebSockets, AI integrations) indicates openness to learning
- Successfully transitioned from IC to leading larger team efforts

### Problem-Solving & Initiative

- Built production systems solo (DataMix MVP) and at scale
- Designing micro-frontend architecture and complex distributed systems suggests strategic thinking
- Proactively developing skills (AI integrations, architecture principles)

### Resilience & Persistence

- Navigating career transitions, maintaining business while employed, active job search with strategic projects

---

## WHAT I'M LOOKING FOR

### Responsibilities & Clear Structure

No micromanagement. Looking for a company where I can fully use my potential. Clear responsibilities with module ownership. Opportunities to influence architectural decisions. Surrounded by talented engineers. Continuous learning and growth opportunities.

I believe enterprise platforms can be written with clear and simple code. The key is setting clear boundaries and responsibilities between modules. I want to work on projects where code is well-structured, clear, and maintainable.

### Technical Challenges

Non-trivial tasks with high-loaded modules where I need to find reasons for performance issues, optimize code, and develop solutions. Interested in working on complex problems that require deep technical thinking and architectural considerations. Want to keep code clean and maintainable, and actively participate in architectural questions and decisions that shape how systems are built.

### Growth & Full-Stack Potential

Have potential to become a full-stack developer. Interested in backend technologies as well as frontend, with opportunities to expand skill set beyond frontend specialization.

### Team & Culture

No toxic employees. Warm, cozy atmosphere where every team member supports and helps others. A manager who listens and genuinely cares about your growth.

### Location & Flexibility

Remote or hybrid position in Wrocław, Poland.

---

**LinkedIn:** [linkedin.com/in/vladspasibozhko](https://linkedin.com/in/vladspasibozhko)
