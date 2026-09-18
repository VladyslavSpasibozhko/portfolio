# Vladyslav Spasibozhko — Portfolio Journey

> A readable copy of `journey.json`. Chapter numbers mirror `JourneySection.index`.
> `journey.json` is the source of truth — update both in the same change.

---

## 01 — Hello, I'm Vlad

**Eyebrow:** Senior Frontend Engineer
**Headline:** Hi, I'm _Vlad_.
**Tagline:** From writing code to designing systems
**Background:** `code_card_1`

### Text

Over 7+ years, I've worked across fintech, social platforms, healthcare, and enterprise workforce management.

This isn't my CV. It's the story of the problems that changed how I think, in about 5 minutes. I want to show how I grew as an engineer — from learning the fundamentals of JavaScript and React, to owning critical modules, making architectural decisions, working with large-scale systems, and thinking about stability and users.

### Timeline — The journey so far

- **2019 — Capital Holding** · Learned to build
- **2020 — DataMix** · Learned to own
- **2021 — REMED** · Learned to draw boundaries
- **2024 — WorkJam** · Learned to scale
- **Today — Your team?** · [Let's talk →](#whats-next)

---

## 02 — Capital Holding

**Tagline:** Where it all started.
**Subtitle:** Frontend Developer · April 2019 — October 2020
**Background:** `laptop_coding`

### Text

My first position as a frontend developer, on a product used for live sports betting.

It was the first time I had to understand how a real application is built — not just how to write code, but how different pieces work together.

### Cards (2 columns)

**JavaScript**

My first real product: a betting platform where the numbers on screen changed every few seconds, and we built every part of it ourselves.

> Building everything by hand meant I had to learn how the web actually works, not just how to use tools that hide it. That foundation made everything I learned afterwards make sense.

**React**

The first project ended and a new betting platform began — this time built with React, the tool most modern websites are made with today.

> Having built the hard way first, I could see exactly which problems these tools were invented to solve — so I learned why they work, not just how to use them.

**Transition:**

> One year, two products, one team. I had no idea how narrow that was.

---

## 03 — DataMix

**Tagline:** The first time I understood that engineering is a team sport.
**Subtitle:** Frontend Engineer · October 2020 — December 2021
**Background:** `team_collaboration_2`

### Text

My first outsourced experience. Instead of staying on one product, I worked across different projects, domains and requirements — and grew from junior to a strong mid-level engineer in about a year and a half.

It was also the first place where I experienced a genuinely warm engineering environment. That mattered more than I expected.

### Badges — Multiple projects. Different domains.

- Investment platform
- Social media platform
- Internal company products

**Transition:**

> Different domains, different constraints. Two projects taught me the most.

---

## 04 — DataMix

**Tagline:** The projects that taught me the most.

### Cards (2 columns)

**Investment platform**

One of the main developers on a platform matching investors with companies looking for funding.

> Heavy calculations and a lot of data moving at once. That's where I learned that making a product feel fast has less to do with the screen than with how you organise the information behind it.

**Social media platform**

The only frontend developer on an Instagram-style social network — from an empty folder to a working product in six months.

> Design, animations, performance, releases — every decision was mine, and there was nobody to pass a problem to. It's the fastest I've ever learned.

### List — Engineering is more than writing code

- It's reading someone else's work before it ships.
- It's sitting with another engineer until the problem makes sense.
- It's arguing about how something should be built — before anyone builds it.
- It's remembering there's a person on the other end of every decision.
- It's fixing something nobody asked you to fix.

**Transition:**

> That's when I started seeing frontend engineering as a responsibility, not just a job.

---

## 05 — REMED

**Tagline:** Software that people's health depended on.
**Subtitle:** Frontend Engineer · December 2021 — August 2024
**Background:** `crm_dashboard`

### Text

A healthcare CRM connecting doctors, clinics, laboratories and healthcare workflows with external healthcare systems.

It integrated with Helsi ( Ukraine's national eHealth system ), and contained some of the most heavily used modules I'd worked with up to that point.

### Badges — Key features

- One place for every patient
- Connected to the country's health system
- A doctor's day, scheduled
- Paperwork that must be exact

**Transition:**

> Doctors used some of these screens every hour of every day. Those were the ones I owned.

---

## 06 — REMED

**Tagline:** Ownership, architecture, and stability.
**Subtitle:** What I was responsible for

### Cards (2 columns)

**A workspace for every role**

Four jobs, four workspaces: reception, the doctor's room, the laboratory and the cash desk — each built around how that person actually works.

**Modular architecture**

The code was arranged the way a clinic thinks — patients, visits, payments — so changing one area didn't ripple through the others.

**Mentoring**

Reviewing their code, pairing on problems, and answering 'why' rather than just 'how' — half of what I know well, I know because I had to explain it.

**E2E testing**

Automated tests that clicked through booking a visit, the way a real user would — so a broken step was caught before a doctor hit it mid-appointment.

**Transition:**

> Everything I'd learned about boundaries was about to be tested at a different scale.

---

## 07 — WorkJam

**Tagline:** The most complicated frontend environment I'd worked in.
**Subtitle:** Senior Frontend Engineer · March 2024 — July 2026
**Background:** `code_card_2`

### Text

Around 3 million people use it to get through their working day. A frontline workforce platform: scheduling, tasks, communication, learning, compliance, and integrations with whatever a company already runs.

Multiple applications. Shared packages. A large monorepo. Multiple teams. And an architecture that let new React features run inside the old Angular apps, so the product could move forward without being rebuilt.

### Icons — What the platform runs on

`angular` · `react` · `nextjs` · `typescript` · `graphql`

_Two frameworks, several applications, one product._

### Callout

> The hard part wasn't building the new platform. It was living with both.

---

## 08 — WorkJam · Case Study

**Eyebrow:** Replacing a system the whole product depended on
**Tagline:** How do you replace something everything relies on, without anyone noticing?

### Text

Feature flags are the switches that decide which parts of a product each company sees. Every one of our applications depended on them, through a single shared library at the centre of the platform.

Those switches ran on two outside services that had to go — while 3 million people used the product every day. I owned that migration.

### Steps — How I ran it

1. Proposed the move, then researched what it would really cost _(legacy)_
2. Added the new system alongside the old two
3. Three flag systems running at once _(accent)_
4. Covered every affected page with automated tests
5. QA, then staging, then a handful of real companies
6. Watched production, then removed the old systems _(result)_

### Callout

> Zero downtime. No incidents, no rollbacks. The old systems came out and nobody outside the team noticed.

---

## 09 — WorkJam · Case Study

**Eyebrow:** Building a Calendar

### Cards (2 columns)

**Proposed a better plan**

Worked with the product owner and suggested reusing the calendar we already had, instead of building a second one beside it.

**Left the code better than I found it**

Refactored the existing calendar so both views could be built from the same pieces — cleaner and reusable, not just finished.

**Delivered five days early**

Ten days instead of the fifteen planned, with the harder parts done first.

**Shipped without a bug**

Covered end to end with automated tests — nothing came back from QA or from production.

### Callout

> The important part wasn't writing code faster — it was solving the right problem.

---

## 10 — WorkJam · Case Study

**Eyebrow:** Microsoft Teams Integration
**Tagline:** Four applications. One user experience.

### Text

The platform consisted of four module applications and one unified application, and we needed to integrate them with Microsoft Teams.

### Branch

```text
        Microsoft Teams
               │
   ┌────────┬──┴──┬────────┐
   ↓        ↓     ↓        ↓
Module   Module Module  Module
 app      app    app     app
   │        │     │        │
   └────────┴──┬──┴────────┘
               ↓
          Unified App
```

### Text

Five applications had to behave like one product inside Microsoft Teams: four module apps, and the unified app that ties them together.

I built one shared place that holds everything Teams needs — the configuration, who the user is, which company they belong to — so every application reads it the same way instead of each team solving it again. Clean in one place, rather than copied five times.

### Callout

> Solve the integration once. Make every application benefit from it.

---

## 11 — WorkJam · Case Study

**Tagline:** Chat inside the Android app

### Text

Frontline workers use chat all day — between tasks, on a phone, often standing up. It had to open instantly, scroll smoothly, record a voice message and send a photo exactly like the rest of the Android app. If it felt slower or thinner than what they already had, they'd simply stop using it.

Chat couldn't be built into the app natively, so it had to run as a web page inside it. That's the part users usually notice — a web page inside an app tends to feel like one. This one couldn't.

### Steps — How I approached it

1. Learned how the Android app actually worked, before writing anything
2. Agreed with the Android team how the two halves would talk
3. Built one bridge instead of a special case per feature _(accent)_
4. Gave the web chat the phone's camera, microphone and files
5. Carried the login across, so nobody signs in twice
6. Tested on real devices, then shipped _(result)_

### Callout

> Chat records, sends and shares like everything else in the app — and nobody logs in twice.

---

## 12 — How I Think About Engineering

**Tagline:** The technology changed. The way I think changed more.
**Subtitle:** What 7+ years of frontend engineering taught me

### List

- Shipping end to end taught me what production actually costs.
- Frameworks taught me how to structure interfaces.
- Working across projects taught me how to collaborate.
- Ownership taught me to think beyond individual features.
- Large-scale systems taught me about boundaries, migration and reliability.

### Timeline — What changed at each step

- **2019 — Implementation** · Make the feature work.
- **2020 — Architecture** · Think above the code.
- **2021 — Responsibility** · Own the whole module.
- **2024 — Scale** · Users, limits, boundaries.
- **Today — The full cycle** · Discuss, build, ship, improve.

**Transition:**

> What I thought about changed as the systems got bigger. A few things didn't.

---

## 13 — Principles

**Tagline:** The things that survived every stack I worked in.
**Subtitle:** Six ideas I keep coming back to

### Cards (2 columns)

**Clear boundaries**

Complex systems become easier to change when responsibilities are clearly separated.

**Simple code**

Enterprise software doesn't have to mean complicated software.

**Ownership**

If you own a module, you should understand its users, constraints, dependencies and failure modes.

**Pragmatism**

The newest technology isn't always the answer. Sometimes improving what exists is the better decision.

**Stability**

A production system is not a playground. Every change has users behind it.

**Collaboration**

Good engineering decisions rarely happen in isolation.

### Callout

> If this sounds like how your team works, [let's talk →](#whats-next)

---

## 14 — My Toolbox

**Tagline:** Technologies I've worked with in production
**Subtitle:** Tools are means, not the destination.

### Icons

`javascript` · `typescript` · `nodejs` · `postgresql` · `react` · `nextjs` · `angular` · `redux` · `mobx` · `graphql` · `cypress`

### Frontend

`React` · `Next.js` · `Angular` · `TypeScript` · `JavaScript`

### State & Data

`Redux` · `Redux Saga` · `MobX` · `GraphQL` · `REST` · `WebSockets`

### Backend

`Node.js` · `PostgreSQL`

### Architecture & Tooling

`Micro-frontends` · `Nx` · `Lerna` · `pnpm` · `Vite`

### Testing, Quality & UI

`Jest` · `Cypress` · `React Testing Library` · `Sentry` · `Tailwind CSS` · `Storybook` · `Firebase`

**Transition:**

> But a stack doesn't tell you how someone thinks. The problems they choose to solve do.

---

## 15 — What's Next?

**Tagline:** Got a frontend that's hard to change? That's my favourite kind of problem.
**Subtitle:** Remote or hybrid · Wrocław, Poland

### Text

I do my best work when I own an area end to end: its users, its architecture, its failure modes — influencing architectural decisions and working alongside talented engineers.

I believe enterprise platforms can be written with clear and simple code. The key is setting clear boundaries and responsibilities between modules.

### Cards — What matters to me (2 columns)

**Technical challenges**

High-load modules, performance problems and systems that require real technical thinking.

**Ownership**

Clear responsibilities and the ability to own a module or area end to end.

**Growth**

Deepening my frontend expertise while moving toward broader full-stack responsibilities.

**People & culture**

A warm, supportive team and a manager who listens and genuinely cares about development.

### Callout

> Maybe the next chapter is something we build together.

### Links

- [LinkedIn](https://linkedin.com/in/vladspasibozhko)
- [Email](mailto:vladspasibozhko@gmail.com)
