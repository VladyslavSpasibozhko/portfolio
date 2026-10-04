Refer to [AGENTS.md](AGENTS.md) before implementing or editing anything in this repo.

- Check [TECH_DEBT.md](TECH_DEBT.md) for known issues related to the area you're touching.
- After changes, run `npm run typecheck` in the affected package (root for the server, `client/` for the client).
- If a change alters structure or conventions, update `AGENTS.md`; if it leaves a known gap or resolves one, update `TECH_DEBT.md`.

# Tone and Behavior Instructions

- Be concise and direct. Answer exactly what I ask.
- Don't add unnecessary explanations or context.
- Use simple, clear language.
- Get straight to the point.

# Engineering Rules: React (client) and Node.js (server)

Stack: TypeScript, React, Node.js.

## How AI must use this file

- Follow every rule when writing or changing code.
- Before writing code, decide which layer the code belongs to (see Rule 5).
- If two solutions work, choose the simpler one.
- If a rule conflicts with the existing code, do not silently break the rule. Say so, and follow the rule in new code.
- Before finishing, run the checklist at the end.

---

## Rule 1. Reduce complexity

Code must be easy to read. No deep nesting. Use early returns. If code needs a comment to be understood, simplify the code.

### Client

```tsx
// Bad
function Status({ user }: { user: User }) {
  return user.active ? (
    user.role === "admin" ? (
      <b>Admin</b>
    ) : (
      <span>User</span>
    )
  ) : (
    <span>Inactive</span>
  );
}

// Good
function Status({ user }: { user: User }) {
  if (!user.active) return <span>Inactive</span>;
  if (user.role === "admin") return <b>Admin</b>;
  return <span>User</span>;
}
```

### Server

```ts
// Bad
async function getOrder(id: string, user: User) {
  const order = await repo.find(id);
  if (order) {
    if (order.userId === user.id) {
      return order;
    } else {
      throw new ForbiddenError();
    }
  } else {
    throw new NotFoundError();
  }
}

// Good: guard clauses
async function getOrder(id: string, user: User) {
  const order = await repo.find(id);
  if (!order) throw new NotFoundError();
  if (order.userId !== user.id) throw new ForbiddenError();
  return order;
}
```

---

## Rule 2. One function = one responsibility, clear input and output

A function does one thing. Input comes from arguments only. Output is the return value. No hidden reads or writes.

### Client

```tsx
// Bad: fetches, transforms, and renders
function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then((d) => setUsers(d.map((u: any) => ({ ...u, name: u.usr_nm }))));
  }, []);
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

// Good: split by responsibility
// services/userService.ts  -> getUsers(): Promise<UserDto[]>
// lib/mappers.ts           -> toUser(dto: UserDto): User
// hooks/useUsers.ts        -> returns { users, isLoading, error }
// components/organisms/UserList.tsx -> renders only
function UserList() {
  const { users } = useUsers();
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

### Server

```ts
// Bad: one function does everything
async function createOrder(body: any) {
  if (!body.items?.length) throw new Error("empty");
  const total = body.items.reduce(
    (s: number, i: any) => s + i.price * i.qty,
    0,
  );
  await stripe.charge(body.cardToken, total);
  await db.insert("orders", { ...body, total });
  await mailer.send(body.email, "Thanks");
}

// Good: small functions + one orchestrator
const calculateTotal = (items: Item[]): number =>
  items.reduce((s, i) => s + i.price * i.qty, 0);

class OrderService {
  constructor(
    private payments: PaymentGateway,
    private orders: OrderRepo,
    private notifier: Notifier,
  ) {}

  async create(input: CreateOrderInput): Promise<Order> {
    const total = calculateTotal(input.items);
    const receipt = await this.payments.charge(total, input.idempotencyKey);
    const order = await this.orders.save({
      ...input,
      total,
      receiptId: receipt.id,
    });
    await this.notifier.orderCreated(order);
    return order;
  }
}
```

---

## Rule 3. No big if/else or switch chains. Use a strategy map.

If one function branches on a type, replace it with a map of handlers.

### Client

```tsx
// Bad
function Alert({ type, text }: Props) {
  if (type === "info") return <InfoAlert text={text} />;
  if (type === "error") return <ErrorAlert text={text} />;
  if (type === "success") return <SuccessAlert text={text} />;
  return null;
}

// Good
const ALERTS: Record<AlertType, React.FC<{ text: string }>> = {
  info: InfoAlert,
  error: ErrorAlert,
  success: SuccessAlert,
};
function Alert({ type, text }: Props) {
  const Component = ALERTS[type];
  return <Component text={text} />;
}
```

### Server

```ts
// Bad
async function pay(provider: string, amount: number) {
  if (provider === "stripe") {
    /* ... */
  } else if (provider === "paypal") {
    /* ... */
  }
}

// Good: one file per strategy
// payments/stripe.ts, payments/paypal.ts each export a PaymentGateway
const gateways: Record<Provider, PaymentGateway> = { stripe, paypal };
await gateways[provider].charge(amount, key);
```

---

## Rule 4. Choose the data structure that removes complexity

- Lookup by id: `Map` or object, not `find` inside loops.
- Uniqueness or membership: `Set`, not `includes` on arrays.
- Normalize lists that are searched often.

### Client

```tsx
// Bad: O(n) lookup for each row
orders.map((o) => (
  <Row key={o.id} user={users.find((u) => u.id === o.userId)} />
));

// Good
const usersById = useMemo(() => new Map(users.map((u) => [u.id, u])), [users]);
orders.map((o) => <Row key={o.id} user={usersById.get(o.userId)} />);
```

### Server

```ts
// Bad
const canEdit =
  user.permissions.includes("edit") || user.permissions.includes("admin");

// Good
const permissions = new Set(user.permissions);
const canEdit = permissions.has("edit") || permissions.has("admin");
```

---

## Rule 5. Set clear boundaries between modules, libs, and services

Every file belongs to one layer. Imports go in one direction only. Never import upward.

### Client

```
pages/        compose organisms, connect routes
components/   atoms/ molecules/ organisms/   (UI only, see Rule 6)
hooks/        reusable logic, state, side effects
services/     API calls (no React inside)
lib/          pure helpers and mappers (no React, no network)
```

Direction: `pages → components → hooks → services → lib`

- Components never call `fetch` or a vendor SDK.
- Services never import React.
- `lib` imports nothing from the other layers.

### Server

```
routes/ (controllers)   parse request, call service, return response
services/               business logic, no HTTP, no SQL
repositories/           database access only
clients/                wrappers for external APIs
lib/                    pure helpers
config/                 the only place that reads process.env
```

Direction: `routes → services → repositories / clients → lib`

- A repository never calls a service.
- A service never uses `req` or `res`.
- Controllers are thin: no business logic.

```ts
// Good: thin controller
router.post("/orders", validate(createOrderSchema), async (req, res) => {
  const order = await orderService.create(req.body);
  res.status(201).json(order);
});
```

---

## Rule 6. Component hierarchy (client only): atoms, molecules, organisms

| Level    | What it is                                   | May import              | May NOT                                       |
| -------- | -------------------------------------------- | ----------------------- | --------------------------------------------- |
| Atom     | Smallest piece: Button, Input, Icon          | nothing from components | hooks with data, services, other atoms' logic |
| Molecule | Group of atoms with one purpose: SearchField | atoms                   | organisms, services                           |
| Organism | Full UI section: Header, ProductList         | molecules, atoms, hooks | pages                                         |
| Page     | Composes organisms                           | organisms               | —                                             |

Rules:

- Import only downward. An atom never imports a molecule. A molecule never imports an organism.
- Do not skip levels to hide a violation (for example, putting business logic in an atom).
- Atoms and molecules are presentational: they get data and callbacks through props.

```tsx
// atom
export const Button = ({ children, onClick }: ButtonProps) => (
  <button onClick={onClick}>{children}</button>
);

// molecule: uses atoms only
export const SearchField = ({
  value,
  onChange,
  onSubmit,
}: SearchFieldProps) => (
  <div>
    <Input value={value} onChange={onChange} />
    <Button onClick={onSubmit}>Search</Button>
  </div>
);

// organism: may use hooks
export const ProductSearch = () => {
  const { query, setQuery, results, search } = useProductSearch();
  return (
    <>
      <SearchField value={query} onChange={setQuery} onSubmit={search} />
      <ProductList items={results} />
    </>
  );
};
```

Server equivalent: the layer boundaries in Rule 5.

---

## Rule 7. DRY: extract on the second use

If the same logic appears twice, move it to a separate file in the right layer.

| Reusable thing           | Goes to               |
| ------------------------ | --------------------- |
| UI piece                 | `components/<level>/` |
| Stateful or effect logic | `hooks/`              |
| API call                 | `services/`           |
| Pure function            | `lib/`                |

### Client

```ts
// Bad: debounce logic copied in two components
// Good: hooks/useDebounce.ts
export function useDebounce<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return debounced;
}
```

### Server

```ts
// Bad: pagination parsing copied in each route
// Good: lib/pagination.ts
export const parsePagination = (q: { page?: string; limit?: string }) => ({
  page: Math.max(Number(q.page) || 1, 1),
  limit: Math.min(Number(q.limit) || 20, 100),
});
```

Each extracted unit has its own test (Rule 13).

---

## Rule 8. Explicit behavior

No hidden globals, no hidden side effects, no hidden reads of time, random, env, or window. Pass them in.

### Client

```tsx
// Bad: reads a global
const formatPrice = (n: number) => `${n} ${window.APP_CURRENCY}`;

// Good
const formatPrice = (n: number, currency: string) => `${n} ${currency}`;
```

### Server

```ts
// Bad: hidden time and env
const isExpired = (t: number) => Date.now() > t;
const url = process.env.API_URL;

// Good: deterministic, config injected
const isExpired = (t: number, now: number) => now > t;
// config/index.ts is the only file that reads process.env
export const config = { apiUrl: requireEnv("API_URL") };
```

Errors are explicit too: use typed error classes and one central error handler. Never swallow errors.

```ts
class NotFoundError extends Error {}
app.use((err, req, res, next) => {
  if (err instanceof NotFoundError)
    return res.status(404).json({ message: err.message });
  res.status(500).json({ message: "Internal error" });
});
```

---

## Rule 9. Open for extension, closed for modification

A new case = a new file or a new map entry. Existing logic is not edited.

### Client

```tsx
// Good: add a new field type by registering it
const FIELD_RENDERERS: Record<string, React.FC<FieldProps>> = {
  text: TextField,
  number: NumberField,
};
// New type: create DateField.tsx and add `date: DateField`. FormRenderer is not touched.
const FormRenderer = ({ fields }: { fields: Field[] }) => (
  <>
    {fields.map((f) => {
      const C = FIELD_RENDERERS[f.type];
      return <C key={f.name} {...f} />;
    })}
  </>
);
```

### Server

```ts
// Good: add a notification channel without touching NotificationService
interface Channel {
  send(userId: string, text: string): Promise<void>;
}
class NotificationService {
  constructor(private channels: Record<string, Channel>) {}
  send(channel: string, userId: string, text: string) {
    return this.channels[channel].send(userId, text);
  }
}
// New channel: create sms.ts and register it in the composition root.
```

---

## Rule 10. Cheap changes

If one field, param, or vendor changes, only one place changes.

### Client

```ts
// Bad: 20 components use data.usr_nm
// Good: one mapper at the API boundary
export const toUser = (dto: UserDto): User => ({
  id: dto.id,
  name: dto.usr_nm,
});
// Components use user.name only. If the API renames the field, edit toUser.
```

Also: keep constants (routes, labels, limits) in one place. Don't pass a whole object when a component needs one field.

### Server

```ts
// Bad: the DB row shape leaks into the API response
res.json(row);

// Good: map at the edge
const toOrderResponse = (o: Order): OrderResponse => ({
  id: o.id,
  total: o.total,
  status: o.status,
});
res.json(toOrderResponse(order));
```

---

## Rule 11. Interface segregation

Small interfaces. A consumer depends only on what it uses.

### Client

```tsx
// Bad: needs a whole User, uses only the name
const Greeting = ({ user }: { user: User }) => <h1>Hi {user.name}</h1>;

// Good
const Greeting = ({ name }: { name: string }) => <h1>Hi {name}</h1>;
```

### Server

```ts
// Bad: a read-only service gets the full repo
class ReportService {
  constructor(private repo: OrderRepo) {}
}

// Good
interface OrderReader {
  findByUser(userId: string): Promise<Order[]>;
}
interface OrderWriter {
  save(order: Order): Promise<Order>;
}
class ReportService {
  constructor(private orders: OrderReader) {}
}
```

---

## Rule 12. Dependency inversion and injection

Depend on your own interface, not on a vendor. Inject the implementation. Never create a vendor object inside business code.

### Client

```tsx
// Your interface
interface Analytics {
  track(event: string, data?: object): void;
}

// Vendor hidden behind it (one file)
export const segmentAnalytics: Analytics = {
  track: (e, d) => segment.track(e, d),
};

// Inject with context
const AnalyticsContext = createContext<Analytics>({ track: () => {} });
export const useAnalytics = () => useContext(AnalyticsContext);

<AnalyticsContext.Provider value={segmentAnalytics}>
  <App />
</AnalyticsContext.Provider>;

// Component does not know the vendor
const { track } = useAnalytics();
```

### Server

```ts
// Bad
class OrderService {
  private db = new PostgresDb();
}

// Good: interface + constructor injection
interface PaymentGateway {
  charge(amount: number, key: string): Promise<Receipt>;
}
class OrderService {
  constructor(
    private payments: PaymentGateway,
    private orders: OrderRepo,
  ) {}
}

// Composition root: the only place where implementations are chosen
const orderService = new OrderService(
  new StripeGateway(config.stripeKey),
  new PgOrderRepo(pool),
);
```

---

## Rule 13. Test every unit independently

No test depends on another test, on a real vendor, on the network, or on the real clock.

| Unit                   | Test type      | How                                           |
| ---------------------- | -------------- | --------------------------------------------- |
| Atom / molecule        | Render + props | Render with props, check output and callbacks |
| Hook                   | Hook test      | Mock the service                              |
| Service (client)       | Unit           | Mock `fetch` or the HTTP client               |
| Organism               | Component      | Mock the hook                                 |
| Pure function (`lib/`) | Unit           | Input → output                                |
| Server service         | Unit           | Fake injected dependencies                    |
| Repository             | Integration    | Test database                                 |
| Controller             | Route test     | Check routing, status codes, validation only  |

### Client

```tsx
test("SearchField calls onSubmit", () => {
  const onSubmit = vi.fn();
  render(<SearchField value="a" onChange={() => {}} onSubmit={onSubmit} />);
  fireEvent.click(screen.getByText("Search"));
  expect(onSubmit).toHaveBeenCalled();
});
```

### Server

```ts
test("create order charges once and saves", async () => {
  const payments = { charge: vi.fn().mockResolvedValue({ id: "r1" }) };
  const orders = { save: vi.fn(async (o) => o) };
  const notifier = { orderCreated: vi.fn() };
  const service = new OrderService(payments, orders, notifier);

  await service.create({
    items: [{ price: 10, qty: 2 }],
    idempotencyKey: "k1",
  });

  expect(payments.charge).toHaveBeenCalledWith(20, "k1");
});
```

---

## Server-only rules

- **Idempotency:** payments and retried operations take an idempotency key.
- **Validation:** validate input at the boundary with a schema. Use typed data inside.
- **Config:** read `process.env` only in `config/`.
- **Determinism:** pass `now` and `random` as arguments.

---

## Checklist before finishing

1. Is each function doing one thing, with clear input and output?
2. Any if/else or switch chain that should be a map?
3. Is the data structure the simplest for the job?
4. Is every file in the right layer, with imports going one way?
5. Do components follow atoms → molecules → organisms?
6. Is there any logic repeated twice?
7. Any hidden global, time, random, or env read?
8. Can a new case be added without editing existing logic?
9. If an API field or param changes, how many files change? (should be one)
10. Are interfaces small? Are vendors injected?
11. Does each new unit have its own isolated test?
