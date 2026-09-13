# Vladyslav Spasibozhko — Portfolio Journey

> **Frontend Engineer · 7+ years of experience**
>
> A portfolio designed as a journey through the problems I've solved, the systems I've built, and the way I learned to think about engineering.

---

## 01 — Hello, I'm Vlad

### From writing code to designing systems

**Subtitle:** Frontend Engineer · Wrocław, Poland · Open to work

I’m a Senior Frontend Engineer with 7+ years of experience building and owning complex web applications.

Over the years, I've worked across sports betting, social platforms, healthcare, and enterprise workforce management.

But this portfolio isn't another version of my CV.

I want to show **how I grew as an engineer** — from learning the fundamentals of JavaScript and React, to owning critical modules, making architectural decisions, working with large-scale systems, and thinking about stability and users.

### The journey so far

- **2019 — Capital Holding** · Learned to build
- **2020 — DataMix** · Learned to own
- **2021 — REMED** · Learned to design
- **2024 — WorkJam** · Learned to scale
- **Today** · Looking for the next difficult problem

**Transition:**

> Every journey starts somewhere.
>
> **For me, it started with vanilla JavaScript.**

---

## 02 — Capital Holding

### Where it all started.

**Subtitle:** Frontend Engineer · April 2019 — October 2020 · Kyiv, Ukraine

Capital Holding was my first position as a frontend engineer.

The product was a real-time betting platform — a high-frequency dashboard showing live sports events with data that never stopped moving.

It was the first time I had to understand how a real application is built — not just how to write code, but how different pieces work together.

### Project #1 — Vanilla JavaScript

The first sports betting platform was built from scratch with clean JavaScript, without a frontend framework.

That experience gave me a strong foundation in how the browser, application logic, data and UI work together.

I had to understand what was happening underneath the abstractions that frameworks would later provide.

### Project #2 — React + Redux

When the first project ended, we started working on another sports betting platform.

This time we used **React and Redux**.

I became fascinated by the way these technologies worked together. I didn't want to simply learn the APIs — I wanted to understand why these tools existed, how state should flow through an application, and how to structure a growing frontend.

I spent a lot of time learning outside of work, taking courses and experimenting with new technologies.

### Live data — my first real-time system

Odds and match events changed constantly, so the UI could never be a snapshot of a request.

I implemented **WebSockets** for live event streaming, keeping the dashboard in sync with matches as they happened.

It was my first lesson in a problem that followed me through every job after: **the hard part isn't rendering data, it's keeping it correct while it changes.**

### What changed

I started my career asking:

> **"How do I build this?"**

And I left Capital Holding wanting to understand:

> **"Why does it work this way?"**

- `Vanilla JS → Browser → DOM`
- `React → Redux → Components → State`

**Transition:**

> I had learned how to build applications.
>
> **Next, I had to learn how to build them with other people.**

---

## 03 — DataMix

### The first time I understood that engineering is a team sport.

**Subtitle:** Frontend Engineer · October 2020 — December 2021 · Kyiv, Ukraine

DataMix was my first outsourced experience — a product studio taking projects from MVP all the way to enterprise scale, with a team of middle and senior engineers, PMs, QAs and designers.

It was also the first place where I experienced a genuinely warm engineering environment — something I learned was important to me.

Instead of staying on one product, I worked across different projects, domains and requirements.

Investment platforms. Social applications. Internal products. Different teams. Different constraints.

Every project gave me another piece of the puzzle.

I also grew fast here — from junior to a strong mid-level engineer in about a year and a half.

**Transition:**

> Different domains, different constraints.
>
> **Two projects taught me the most.**

---

## 04 — DataMix

### The projects that taught me the most.

**Subtitle:** Investment matching · Social network MVP

### Investment Matching Platform

I worked as a core frontend developer on a high-load two-sided platform connecting investors and investees.

The application involved complex data calculations, matching logic and large amounts of information.

This was one of the projects where I started to understand that frontend performance isn't only about rendering components quickly.

**It is also about how you structure data, state and the flow of information through the application.**

### Social Network

On another project, I was the sole frontend developer.

We built an Instagram-like social platform from scratch and brought it to MVP in around six months.

I was responsible for the entire frontend lifecycle — architecture, state management, data fetching, UI, animations, performance and deployment.

Fluid animations, a multi-directional slider and efficient data fetching under heavy load — all of it was mine to plan, build and ship.

There was nobody else to pass a frontend problem to.

I had to figure it out.

### Engineering is more than writing code

Working across different projects taught me that frontend engineering isn't just about writing code.

It's code review.

It's helping another engineer solve a problem.

It's discussing architecture.

It's deciding whether something should become reusable.

It's thinking about how a technical decision affects the user and the client.

It's refactoring something even when nobody explicitly asks you to.

**That's when I started seeing frontend engineering as a responsibility, not just a job.**

**Transition:**

> My questions were changing.
>
> **"How should we build this?"**

---

## 05 — REMED

### When I stopped thinking in screens.

**Subtitle:** Frontend Engineer · December 2021 — August 2024 · Kyiv, Ukraine

REMED was a healthcare CRM connecting doctors, clinics, laboratories and healthcare workflows with external healthcare systems.

It integrated with **Helsi** and Ukraine's national **eHealth** system.

The product contained some of the most heavily used modules I'd worked with up to that point.

This is where my role changed again.

I wasn't just implementing features anymore.

**I was responsible for parts of the system.**

**Transition:**

> The product was big. My part of it finally had edges.
>
> **This is what owning it looked like.**

---

## 06 — REMED

### Ownership, architecture, and stability.

**Subtitle:** What I was responsible for

### Ownership

I owned several critical modules:

- Doctor Workplace
- Cashier Workplace
- Calendar

The Calendar managed doctor availability and appointment scheduling — patients viewing a doctor's calendar, creating appointments, and staff managing availability and patient data.

These modules handled core business operations, so correctness, performance and reliability mattered.

I started thinking beyond individual screens and toward clear boundaries between business logic, API communication, data and UI — a modular structure organised per business entity, with services, components, storage and API layers each doing one job.

### Collaboration

The feature doesn't start with a Figma file.

Working with designers was a continuous conversation about user flows, edge cases, component behaviour and performance.

Frontend and backend engineers also had to agree on API behaviour, data structures and constraints.

**The best solution usually appeared somewhere between design, frontend and backend.**

### Cypress — protecting critical workflows

We discussed with our team lead how to improve application stability.

Because of the architecture and the nature of the product, traditional unit testing wasn't always the most effective way to protect critical user journeys.

We introduced **Cypress E2E testing** and built coverage around the most important and heavily used workflows.

The goal wasn't simply to increase a coverage number.

**It was to make sure the workflows people depended on continued to work.**

### Mentoring

I also started mentoring junior engineers.

Teaching became another way of learning.

Before explaining something, I had to understand it deeply enough to explain not only **how** it worked, but **why**.

**Transition:**

> By the end of this chapter, I was thinking about ownership, boundaries and reliability.
>
> **Then everything got bigger.**

---

## 07 — WorkJam

### The most complicated frontend environment I'd worked in.

**Subtitle:** Frontend Engineer · March 2024 — July 2026 · Kraków, Poland · Remote

WorkJam is a frontline workforce platform — task management, scheduling, communication, learning and compliance for deskless teams in retail, hospitality, manufacturing and healthcare.

WorkJam changed the scale of the problems I was solving.

Multiple applications.

Legacy Angular.

Modern React and Next.js.

Shared packages.

Micro-frontends.

A large monorepo built with Nx, Lerna and pnpm.

Multiple teams, including a frontend group of around twenty engineers.

And real users depending on the system every day.

When an application is already in production, **"make it work" isn't enough.**

You have to think about stability, migration paths, backward compatibility, user experience and business impact.

### Two worlds

WorkJam had two worlds:

```text
              WORKJAM
                 │
       ┌─────────┴─────────┐
       ↓                   ↓
 Legacy Angular       Remastered App
       │                   │
       └─────────┬─────────┘
                 ↓
          Shared Packages
                 ↓
          React / Next.js
```

Business-critical modules were tightly connected to the legacy codebase.

We couldn't simply throw the old system away.

We had to make the old and new worlds coexist.

I worked with the micro-frontend architecture that allowed React modules to be injected into legacy Angular applications while functionality gradually moved toward reusable shared packages.

**It wasn't a rewrite. It was a migration.**

---

## 08 — WorkJam Case Study

### How do you replace infrastructure without users noticing?

**Subtitle:** Feature Flag Management Migration

The platform relied heavily on **Flagr** and also used **LaunchDarkly** for feature management.

Two systems, years of accumulated tech debt, and every product in the platform depending on them.

We wanted to move to **Harness Feature Management Engine**.

The challenge wasn't implementing Harness.

**The challenge was removing the old systems without disrupting production.**

### The migration

```text
Flagr + LaunchDarkly
        ↓
Introduce Harness
        ↓
Run alongside legacy
        ↓
Enable migration
        ↓
Observe production
        ↓
Collect edge cases
        ↓
Iterate
        ↓
Remove legacy systems
```

The migration was itself controlled by a feature flag, so it could be rolled out company by company and turned off instantly if anything went wrong.

We introduced Harness across the platform and allowed companies to use the new system while the existing infrastructure was still available.

We monitored production for a month, collected errors and edge cases, and iterated on the implementation.

Eventually, LaunchDarkly and Flagr were removed completely.

### Result

**Zero downtime.**

**No service disruption.**

The migration happened while the platform continued serving users.

---

## 09 — WorkJam Case Study

### Sometimes the best engineering decision is the one that saves two weeks.

**Subtitle:** Building an Agenda Calendar View

We needed to add an agenda view to an existing calendar.

The requirements sounded straightforward:

- One-day view
- Infinite scroll
- Search
- Filters
- Date picker
- Events and tasks

But the existing API wasn't designed around this experience, and we were working under a tight deadline.

### The date picker problem

The common component library didn't support the new design we needed.

The obvious solution was to create another component.

But that meant:

```text
New component
    ↓
Library changes
    ↓
Implementation
    ↓
Discussion
    ↓
Testing
    ↓
Maintenance
```

Instead, I investigated whether we could evolve the existing component.

I spent about two days researching and experimenting with the current implementation.

I found a way to extend it instead of creating another component.

That saved additional implementation and coordination work — and left the platform with one date picker instead of two.

### Result

The agenda feature was delivered in around **10 days**.

The important part wasn't writing code faster.

**It was solving the right problem.**

---

## 10 — WorkJam Case Study

### Four applications. One user experience.

**Subtitle:** Microsoft Teams Integration

The platform consisted of four module applications and one unified application.

We needed to integrate them with Microsoft Teams.

The interesting part wasn't simply receiving Teams context.

The challenge was preserving context while moving between independently running applications.

```text
                 Microsoft Teams
                       │
                    Context
                       │
             ┌─────────┼─────────┐
             ↓         ↓         ↓
           App A     App B     App C
             │         │         │
             └─────────┼─────────┘
                       ↓
                 Unified App
```

I created a reusable integration library that centralized Teams configuration, exposed a single way to read Teams context, and provided consistent cross-application navigation.

When a user clicked a link from Teams, the correct application instance had to open rather than simply navigating inside the current application — carrying context and state across the boundary.

**Solve the integration once. Make every application benefit from it.**

---

## 11 — WorkJam Case Study

### When web and native have to become one experience.

**Subtitle:** Android WebView Integration

We needed to bring a web chat experience into an Android application.

The web module couldn't simply be bundled into the native application: Google's 4KB page-size requirement meant shipping the external module natively wasn't an option.

So we used WebView, keeping the native app lightweight.

```text
Android
   │
 WebView
   │
   ↓
React Chat
   │
   ↕
JS ↔ Native Bridge
```

But embedding the web application was only the beginning.

Users were already authenticated in the native application, so they shouldn't have to authenticate again — no login screen, ever.

The web experience also needed access to native capabilities such as video recording and screenshots.

I implemented a JavaScript-to-native bridge — extending the global window object with methods the Android layer could call and respond to — that allowed the web module to communicate with Android APIs.

The web module could receive authentication context and request native capabilities without exposing the underlying complexity to the user.

**The user shouldn't need to know which part of the product is native and which part is web.**

---

## 12 — How I Think About Engineering

### The technology changed. The questions changed more.

**Subtitle:** What 7+ years of frontend engineering taught me

JavaScript taught me how the browser works.

React taught me how to structure interfaces.

Working across projects taught me how to collaborate.

Ownership taught me to think beyond individual features.

Large-scale systems taught me to think about boundaries, migration, reliability and users.

And somewhere along the way, I stopped asking only:

> **"How do I implement this?"**

and started asking:

> **"What is the simplest system that lets us keep changing this?"**

### How the question changed

- **2019** — How do I build this?
- **2020** — How should this feature work?
- **2021** — Where should this logic live?
- **2024** — How should these systems interact?
- **Today** — How do we make this system easier to change?

**Transition:**

> The answers changed as the systems got bigger.
>
> **A few things didn't.**

---

## 13 — The Principles I Care About

### The things that survived every stack I worked in.

**Subtitle:** Six ideas I keep coming back to

**Clear boundaries**

Complex systems become easier to change when responsibilities are clearly separated.

**Simple code**

Enterprise software doesn't have to mean complicated software.

**Ownership**

If you own a module, you should understand its users, constraints, dependencies and failure modes.

**Pragmatism**

The best solution isn't always the newest technology. Sometimes improving what already exists is the better engineering decision.

**Stability**

A production system is not a playground. Every change has users behind it.

**Collaboration**

Good engineering decisions rarely happen in isolation.

---

## 14 — My Toolbox

### Technologies I've worked with in production

**Subtitle:** Tools are means, not the destination.

### Frontend

`React` · `Next.js` · `Angular` · `TypeScript` · `JavaScript`

### State Management

`Redux` · `Redux Thunk` · `Redux Saga` · `MobX`

### Data & APIs

`GraphQL` · `REST` · `API Clients` · `WebSockets`

### Architecture & Tooling

`Micro-frontends` · `Nx` · `Lerna` · `pnpm` · `Vite`

### Testing & Quality

`Jest` · `Cypress` · `React Testing Library` · `Sentry`

### UI & Development

`Tailwind CSS` · `Storybook` · `Firebase`

### Currently expanding

**Backend & full-stack development**

I'm interested in expanding beyond frontend and becoming stronger on the backend side as well.

I've been working with technologies such as Node.js and PostgreSQL and want to continue developing that part of my skill set.

**Transition:**

> But a stack doesn't tell you how someone thinks.
>
> **The problems they choose to solve do.**

---

## 15 — What's Next?

### I'm looking for the next difficult problem.

I'm looking for a team where I can use my potential without being micromanaged.

A place where I can own meaningful parts of the system, influence architectural decisions and work alongside talented engineers.

I believe enterprise platforms can be written with clear and simple code. The key is setting clear boundaries and responsibilities between modules.

### What matters to me

**Technical challenges**

High-load modules, performance problems, complex systems and problems that require real technical thinking.

**Ownership**

Clear responsibilities and the ability to own a module or area end to end.

**Growth**

Opportunities to deepen my frontend expertise while moving toward broader full-stack responsibilities.

**People**

A warm, supportive environment where engineers help each other grow.

**Culture**

A manager who listens, communicates clearly and genuinely cares about development.

### Where

**Remote or hybrid · Wrocław, Poland**

### Also worth knowing

- **Bachelor's Degree** — Management and Administration, National University of Food Technologies
- **Ukrainian** — Native
- **English** — Upper-Intermediate

---

# Let's build something worth solving.

**Frontend Engineer · Open to work**

[LinkedIn] · [GitHub] · [Email]

Final line:

> **Maybe the next chapter is something we build together.**
