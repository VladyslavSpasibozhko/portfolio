---
name: lib-creation-server
description: Use when adding or changing a server-side lib adapter in server/src/lib/ (e.g. wrapping a payment provider SDK, a mail service, or any other external library/service). Trigger on "create a server lib", "add an adapter in server/src/lib", "wrap this SDK on the server", "where does this external library wrapper go on the backend".
---

# Server libs (`server/src/lib/`)

A lib is an adapter: one folder per external SDK/library, exposing the project's own contract instead of the vendor's.

## When code belongs here

Code belongs in `server/src/lib/<name>/` when it wraps exactly one external SDK/library/service (e.g. a `payments` lib wraps a payment provider SDK, a `mail` lib wraps an email service) — not when it's pure logic with no vendor dependency (that's `shared/utils/`, see `utils-creation-global`) and not when it's business logic/orchestration (that's `server/src/services/`).

## Rules

- **One external dependency per lib.** Each lib's responsibility is one line: it wraps one SDK/library and exposes its own contract.
- **Expose your own interface.** Consumers code against the lib's contract, never against the vendor's types or instances.
- **Strict typing at the boundary.** Inputs and outputs use the lib's own types. Never return a raw vendor instance:
  ```ts
  // prohibited
  const client = new MailVendorClient(apiKey);
  return client;

  // correct
  const client = new MailVendorClient(apiKey);
  return { send: (to: string, text: string) => client.messages.create({ to, text }) };
  ```
- **No cross-lib imports.** A lib can't use another lib. It depends only on the platform and the one external thing it wraps. If two libs need the same shape, duplicate it rather than importing across.
- **No upward imports.** A lib never imports from `services/`, `storage/`, `routes/`, or `plugins/`.
- **Tests live next to the lib**, in its own `__tests__/` folder, with the vendor mocked — never hit the real network/SDK in a test.

## Checklist

1. Does the lib wrap exactly one external dependency?
2. Does every exported function return the lib's own typed shape, never the vendor's object?
3. Does it avoid importing any other lib or any higher layer?
4. Is there a test in `__tests__/` with the vendor mocked?
5. Run `npm run typecheck` in `server/`.
