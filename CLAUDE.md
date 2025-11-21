# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website with an integrated expense tracking system built with Next.js 15 App Router, TypeScript, and PostgreSQL.

## Key Commands

### Development
```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
```

### Code Quality
```bash
pnpm lint         # Run all linters (ESLint, Prettier, TypeScript)
pnpm fix          # Auto-fix formatting issues (Prettier then ESLint)
pnpm typecheck    # Run TypeScript type checking
```

### Database
```bash
pnpm db:seed      # Seed database with initial data
pnpm drizzle-kit push     # Push schema changes to database
pnpm drizzle-kit studio   # Open Drizzle Studio for database management
pnpm drizzle-kit generate # Generate SQL migrations for production
```

### Supabase Local Development
```bash
npx supabase start    # Start local Supabase (requires Docker)
npx supabase stop     # Stop local Supabase
npx supabase db reset # Reset local database
```

## Architecture Overview

### Feature-Based Structure
Each feature follows a consistent pattern in `src/features/`:
- `server/route.ts` - Hono API routes
- `api/` - React Query hooks for data fetching
- `components/` - Feature-specific React components
- `schemas/` - Zod validation schemas
- `actions/` - Server actions

### API Pattern
- Uses Hono framework for API routes (`src/app/api/[[...route]]/route.ts`)
- RPC-style client generated from Hono routes
- Type-safe API calls using TypeScript

### Database
- PostgreSQL with Drizzle ORM
- Schema defined in `src/db/schema.ts`
- Migrations in `supabase/migrations/`
- Connection via DATABASE_URL environment variable

### Authentication
- Custom cookie-based authentication using bcrypt
- Session management in `src/features/auth/`
- Protected routes use `sessionMiddleware`
- Admin routes under `src/app/(admin)/`

### UI Components
- Shadcn/ui components in `src/components/ui/`
- Tailwind CSS v4 with CSS variables
- GSAP for animations in portfolio sections

## Important Patterns

### Creating New Features
1. Create folder in `src/features/[feature-name]/`
2. Add Hono routes in `server/route.ts`
3. Create React Query hooks in `api/`
4. Define Zod schemas for validation
5. Build components using existing UI primitives

### Adding API Routes
```typescript
// In src/features/[feature]/server/route.ts
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

const app = new Hono()
  .post("/", zValidator("json", schema), async (c) => {
    // Implementation
  });

export default app;
```

### Database Operations
- Use Drizzle ORM methods, not raw SQL
- Define schemas in `src/db/schema.ts`
- Run `pnpm drizzle-kit generate` after schema changes
- Test queries in Drizzle Studio: `pnpm drizzle-kit studio`

## Environment Variables
Required in `.env.local`:
- `DATABASE_URL` - PostgreSQL connection string
- `POSTGRES_URL` - PostgreSQL connection string for migrations
- `RESEND_API_KEY` - For email functionality
- `NEXT_PUBLIC_API_URL` - API base URL for client-side requests

## Notes
- No test framework configured - consider adding tests before major changes
- Use feature-based imports: `@/features/[name]`
- Follow existing TypeScript strict mode patterns
- Authentication required for all `/admin/*` routes