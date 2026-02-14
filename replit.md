# AmazoLé — High-Converting Sales Page

## Overview

AmazoLé is a high-converting, mobile-first sales page for a Brazilian feminine skincare brand (premium body care). The application is a full-stack TypeScript project with a React frontend serving as a landing/sales page and a lightweight Express backend that handles lead capture (name + WhatsApp phone). All website copy is in Brazilian Portuguese (PT-BR). The core sales differential is "Pague Somente na Entrega" (Cash on Delivery / pay when you receive).

The project has two main pages:
- **Home (`/`)** — The sales/landing page with hero, before/after gallery, pricing cards, FAQ, trust signals, and lead capture modal
- **Leads Admin (`/admin/leads`)** — Simple admin panel to view captured leads

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **State/Data Fetching**: TanStack React Query for server state management
- **Forms**: react-hook-form with Zod resolver for validation
- **Styling**: Tailwind CSS with CSS variables for theming (lilac/pink feminine palette), shadcn/ui component library (New York style)
- **Build Tool**: Vite with React plugin
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`
- **Design Philosophy**: Mobile-first, premium feminine aesthetic, conversion-optimized with trust signals throughout. No heavy animations or unnecessary libraries.

### Key Frontend Components
- `PricingCards` — Product offer cards with external checkout URLs (links to coinzz.com.br checkout pages)
- `LeadCaptureModal` — Modal form capturing name + WhatsApp phone number
- `BeforeAfterGallery` — Image carousel showing product results
- `MobileStickyBar` — Fixed bottom CTA bar on mobile devices
- `StickyHeader` — Sticky top navigation with trust badges
- `GlowCard` — Reusable card component with gradient hover effects
- `Section` — Reusable section layout with radial gradient backgrounds

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript, executed via `tsx` in development
- **API Structure**: Simple REST API with two endpoints:
  - `POST /api/leads` — Create a lead (validated with Zod)
  - `GET /api/leads` — List all leads
- **API Contract**: Shared route definitions in `shared/routes.ts` with Zod schemas for both request validation and response typing — used by both frontend and backend
- **Storage Layer**: `IStorage` interface implemented by `DatabaseStorage` class, using Drizzle ORM directly

### Data Storage
- **Database**: PostgreSQL (required via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation integration
- **Schema**: Single `leads` table with columns: `id` (serial PK), `name` (text), `phone` (text), `created_at` (text storing ISO date strings)
- **Migrations**: Managed via `drizzle-kit push` (schema push approach, not migration files)
- **Connection**: `pg` Pool connecting via `DATABASE_URL`

### Build & Deployment
- **Development**: `tsx server/index.ts` runs the Express server which sets up Vite dev server as middleware (HMR enabled)
- **Production Build**: Custom `script/build.ts` that runs Vite build for client and esbuild for server, outputting to `dist/` directory. Server bundles select dependencies to reduce cold start times.
- **Production Start**: `node dist/index.cjs`

### Shared Code (`shared/`)
- `schema.ts` — Drizzle table definitions, Zod insert schemas, and TypeScript types
- `routes.ts` — API route contracts with paths, methods, input schemas, and response schemas. This acts as a type-safe contract between frontend and backend.

## External Dependencies

### Database
- **PostgreSQL** — Required. Connection via `DATABASE_URL` environment variable. Used with Drizzle ORM and `pg` driver.

### External Checkout
- **Coinzz** (`app.coinzz.com.br`) — External checkout platform. Product purchase buttons link directly to Coinzz checkout URLs. No payment processing happens within this application.

### Key NPM Packages
- **UI**: shadcn/ui components (Radix UI primitives), Tailwind CSS, class-variance-authority, lucide-react icons
- **Data**: @tanstack/react-query, drizzle-orm, drizzle-zod, zod
- **Forms**: react-hook-form, @hookform/resolvers
- **Server**: express, connect-pg-simple, pg
- **Build**: vite, esbuild, tsx
- **Fonts**: Google Fonts loaded via CSS (DM Sans, Geist Mono, Fira Code, Architects Daughter)

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal` — Runtime error overlay in development
- `@replit/vite-plugin-cartographer` and `@replit/vite-plugin-dev-banner` — Dev-only Replit integration plugins