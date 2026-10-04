---
name: route-creation-server
description: Use when adding or changing a server-side route in src/routes/ (Fastify HTTP/WS endpoint). Trigger on "create a route", "add an endpoint on the server", "new Fastify route", "where does this HTTP handler go".
---

# Server routes (`src/routes/`)

A route is the thin HTTP/WS entry point, tied to the framework (Fastify). It accepts the incoming param, prepares it for a service, receives the service's output, and sends it to the client — nothing more.

## When code belongs here

Code belongs in `src/routes/` only for the framework-facing glue: reading `req`, calling exactly one service, writing `res`. Anything beyond that — validation logic beyond schema declaration, business rules, data access — belongs in a service (`service-creation-server`), a lib (`lib-creation-server`), or storage, not the route.

## Rules

- **One route per file.**
- **Thin controller, no business logic.** A route parses the request, calls a service, and returns the response — it doesn't implement logic itself (CLAUDE.md Rule 5).
- **Validate at the boundary.** A route that takes input (body/params/query) has its own request schema and validation. A route with no meaningful input skips validation entirely — don't invent an empty schema for consistency's sake.
- **Can use:** services, libs. **Can't use:** `storage/` directly — persistence is reached only through the service that owns it.
- **Respond through the shared transport factories** (see the `utils-creation-global` skill / `utils/` root folder) so every success/error/stream envelope is shaped the same way across routes.
- **Rate limiting** is configured per route via config, not hardcoded inline.
- **Idempotency keys** are accepted as input and passed through for any operation that's payment-like or safely retried.

```ts
// Good: thin controller
router.post("/orders", validate(createOrderSchema), async (req, res) => {
  const order = await orderService.create(req.body);
  res.status(201).json(order);
});
```

## Checklist

1. Does the route only parse input, call one service, and send the response — no business logic inline?
2. Does it have a request schema + validation (or correctly skip one because it takes no meaningful input)?
3. Does it avoid importing `storage/` directly?
4. Does the response go through the shared transport factories?
5. Run `npm run typecheck` at the repo root.
