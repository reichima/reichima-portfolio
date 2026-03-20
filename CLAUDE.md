# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 15 App Router and TypeScript.

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

## Architecture Overview

### Feature-Based Structure
Each feature follows a consistent pattern in `src/features/`:
- `server/route.ts` - Hono API routes
- `components/` - Feature-specific React components
- `schemas/` - Zod validation schemas

### API Pattern
- Uses Hono framework for API routes (`src/app/api/[[...route]]/route.ts`)
- Type-safe API calls using TypeScript

### UI Components
- Shadcn/ui components in `src/components/ui/`
- Tailwind CSS v4 with CSS variables
- GSAP for animations in portfolio sections

## Important Patterns

### Creating New Features
1. Create folder in `src/features/[feature-name]/`
2. Add Hono routes in `server/route.ts`
3. Define Zod schemas for validation
4. Build components using existing UI primitives

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

## Environment Variables
Required in `.env.local`:
- `RESEND_API_KEY` - For email functionality
- `NEXT_PUBLIC_API_URL` - API base URL for client-side requests

## Notes
- No test framework configured - consider adding tests before major changes
- Use feature-based imports: `@/features/[name]`
- Follow existing TypeScript strict mode patterns
