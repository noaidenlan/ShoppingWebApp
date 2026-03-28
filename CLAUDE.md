# CLAUDE.md — ShoppingWebApp

This file provides guidance for AI assistants (Claude and others) working on the ShoppingWebApp codebase. It covers project structure, development workflows, conventions, and key decisions.

---

## Project Overview

ShoppingWebApp is a full-stack e-commerce web application. The goal is to provide a complete online shopping experience: browsing products, managing a cart, checkout, order tracking, and an admin dashboard.

---

## Repository Structure

```
ShoppingWebApp/
├── CLAUDE.md                  # This file
├── README.md                  # Project overview and setup instructions
├── .env.example               # Environment variable template (never commit .env)
├── .gitignore
│
├── frontend/                  # Client-side application
│   ├── public/                # Static assets (index.html, favicon, etc.)
│   ├── src/
│   │   ├── assets/            # Images, fonts, icons
│   │   ├── components/        # Reusable UI components
│   │   │   ├── common/        # Buttons, inputs, modals, loaders
│   │   │   ├── layout/        # Header, Footer, Sidebar, Nav
│   │   │   └── features/      # Feature-specific components (Cart, Product, etc.)
│   │   ├── pages/             # Route-level page components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── context/           # React context providers (Auth, Cart, Theme)
│   │   ├── services/          # API call functions
│   │   ├── store/             # State management (Redux / Zustand)
│   │   ├── utils/             # Pure utility functions
│   │   ├── types/             # TypeScript type definitions
│   │   ├── styles/            # Global styles, theme tokens
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                   # Server-side application
│   ├── src/
│   │   ├── config/            # DB connection, env config, logger setup
│   │   ├── controllers/       # Route handler functions
│   │   ├── middleware/         # Auth, error handling, validation, rate limiting
│   │   ├── models/            # Database models / schemas
│   │   ├── routes/            # Express route definitions
│   │   ├── services/          # Business logic layer
│   │   ├── utils/             # Shared utilities (email, crypto, pagination)
│   │   ├── types/             # TypeScript interfaces for backend
│   │   └── app.ts             # Express app setup
│   ├── server.ts              # Entry point — starts HTTP server
│   ├── package.json
│   └── tsconfig.json
│
├── shared/                    # Types and utilities shared by frontend and backend
│   └── types/
│
└── docs/                      # Architecture diagrams, API docs, ADRs
```

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| State management | Zustand (client state) + React Query (server state) |
| Routing | React Router v6 |
| Backend framework | Node.js + Express + TypeScript |
| Database | PostgreSQL (primary) |
| ORM | Prisma |
| Auth | JWT (access + refresh token pattern) |
| Payments | Stripe |
| File storage | AWS S3 (product images) |
| Testing | Vitest (frontend) + Jest (backend) |
| Linting | ESLint + Prettier |
| CI/CD | GitHub Actions |

---

## Development Setup

### Prerequisites

- Node.js >= 20
- PostgreSQL >= 15
- npm >= 10

### First-time setup

```bash
# Install all dependencies
npm install          # root workspace (if monorepo)
cd frontend && npm install
cd ../backend && npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your local values

# Run database migrations
cd backend
npx prisma migrate dev

# Seed the database with sample data
npx prisma db seed

# Start both frontend and backend in dev mode
npm run dev          # from the root (runs concurrently)
```

### Running services individually

```bash
# Frontend only (http://localhost:5173)
cd frontend && npm run dev

# Backend only (http://localhost:3000)
cd backend && npm run dev
```

---

## Environment Variables

Never commit `.env`. Use `.env.example` as the template. Key variables:

```
# Backend
DATABASE_URL=postgresql://user:password@localhost:5432/shoppingapp
JWT_SECRET=<random-256-bit-secret>
JWT_REFRESH_SECRET=<random-256-bit-secret>
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=...
PORT=3000

# Frontend
VITE_API_BASE_URL=http://localhost:3000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

---

## Key Conventions

### TypeScript

- Strict mode is enabled in all `tsconfig.json` files — no `any` unless explicitly justified with a comment.
- Prefer interfaces over type aliases for object shapes; use `type` for unions, intersections, and utility types.
- Export types from `types/` directories; do not define shared types inline in components or controllers.

### React / Frontend

- Components are **function components only** — no class components.
- File naming: `PascalCase` for components (e.g., `ProductCard.tsx`), `camelCase` for hooks (`useCart.ts`) and utilities (`formatPrice.ts`).
- Each component lives in its own file. Avoid barrel files (`index.ts`) except at the `components/` directory level.
- Keep components small and focused. Extract logic to custom hooks; extract UI to sub-components.
- Use React Query for all server-state data fetching. Do not use `useEffect` + `useState` to fetch data.
- All user-facing strings must be in English; prepare for i18n by not hardcoding sentence structures.

### Backend / API

- REST API follows the pattern `/api/v1/<resource>` (e.g., `/api/v1/products`, `/api/v1/orders`).
- Controllers are thin — they handle request/response. All business logic lives in the `services/` layer.
- Use Prisma transactions for any operation that modifies more than one table.
- Return consistent JSON response shapes:
  ```json
  { "data": { ... }, "message": "Success" }
  { "error": "Human-readable error", "details": [...] }
  ```
- HTTP status codes must be semantically correct (200, 201, 400, 401, 403, 404, 409, 422, 500).
- All routes that require authentication must use the `authenticate` middleware.
- Validate all incoming request bodies with **Zod** schemas before they reach the controller.

### Database / Prisma

- Migration files are committed to the repository. Never edit a migration after it has been applied.
- Model names in Prisma schema are `PascalCase` singular (e.g., `Product`, `OrderItem`).
- Use `@@index` on foreign keys and any field that appears in frequent `WHERE` clauses.
- Do not expose raw database IDs in public APIs — use UUIDs or opaque tokens.

### Git Workflow

- Branch naming: `feat/<short-description>`, `fix/<short-description>`, `chore/<description>`, `claude/<task-id>`.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat: add product search endpoint`
  - `fix: correct cart total calculation with discounts`
  - `chore: update Prisma to 5.x`
- Never commit directly to `main`. All changes go through pull requests.
- PRs require at least one approval and passing CI checks before merge.
- Squash-merge feature branches into `main`.

### Testing

- **Unit tests**: Test service functions and utility functions in isolation. Mock external dependencies.
- **Integration tests**: Test API routes against a test database. Use `supertest` for HTTP assertions.
- **Frontend component tests**: Use `@testing-library/react`. Test user interactions, not implementation details.
- Test file naming: `<subject>.test.ts` or `<subject>.spec.ts` co-located with the source file.
- Minimum coverage targets: 80% for backend services, 70% for frontend components.
- Run tests before every commit: `npm test`.

### Security

- Passwords are hashed with bcrypt (cost factor >= 12). Never store plaintext passwords.
- Refresh tokens are stored in httpOnly cookies; access tokens are short-lived (15 min).
- Rate-limit all authentication endpoints (login, register, password reset).
- Sanitize all user input. Use parameterized queries only (Prisma handles this).
- Never log sensitive data (passwords, tokens, full card numbers, PII).
- Use `helmet` middleware on the Express app.
- CORS is configured to allow only the known frontend origin(s).
- All file uploads go through server-side validation (MIME type + size) before reaching S3.

---

## Key Domain Concepts

| Concept | Notes |
|---|---|
| **Product** | Has variants (size, color), inventory tracked per variant |
| **Cart** | Session-based for guests, persisted for authenticated users |
| **Order** | Created at checkout; statuses: `pending → confirmed → shipped → delivered → cancelled` |
| **User roles** | `customer` (default), `admin` |
| **Discount / Coupon** | Percentage or fixed amount, can be per-product or cart-wide |
| **Payment** | Stripe PaymentIntent flow; webhook used to confirm payment server-side |

---

## Common Tasks

### Add a new API endpoint

1. Define the Zod validation schema in `backend/src/middleware/validation/`.
2. Implement business logic in a `backend/src/services/` function.
3. Create a controller function in `backend/src/controllers/` that calls the service.
4. Register the route in `backend/src/routes/`.
5. Write integration tests.

### Add a new page / route

1. Create the page component in `frontend/src/pages/`.
2. Register the route in `frontend/src/App.tsx` (or the router config).
3. Add a React Query hook in `frontend/src/hooks/` or `frontend/src/services/` for data fetching.
4. Write component tests.

### Run database migrations

```bash
cd backend
# Create a new migration
npx prisma migrate dev --name <migration-name>

# Apply migrations in production
npx prisma migrate deploy
```

### Stripe webhook local testing

```bash
# Install Stripe CLI, then:
stripe listen --forward-to localhost:3000/api/v1/webhooks/stripe
```

---

## CI/CD

GitHub Actions workflows live in `.github/workflows/`:

- `ci.yml` — runs on every PR: lint, typecheck, unit + integration tests.
- `deploy.yml` — runs on merge to `main`: builds and deploys to production environment.

All CI checks must pass before a PR can be merged.

---

## Things to Avoid

- Do not use `any` type without a justification comment.
- Do not put business logic in controllers or React components — use the service/hook layer.
- Do not call the database directly from routes — always go through the service layer.
- Do not hardcode secrets or API keys in source code.
- Do not add new `npm` dependencies without checking the existing stack first to avoid duplication.
- Do not skip writing tests for new service functions or API endpoints.
- Do not use `console.log` for debugging in committed code — use the logger utility.
- Do not amend or rebase commits that have already been pushed and are part of an open PR.
