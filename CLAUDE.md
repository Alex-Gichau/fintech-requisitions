# St Andrews Requisition System - Developer Guide

## Build & Run
- Dev Server: `npm run dev`
- Build: `npm run build`
- Start: `npm start`
- Lint: `npm run lint`

## Project Structure
- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components.
- `lib/`: Utility functions and Context Providers (`RequisitionContext`, `RoleContext`).
- `types/`: TypeScript definitions.

## State Management
- **User Roles**: Managed via `RoleProvider`. Toggle roles in the UI "Demo Mode" for testing.
- **Data Flow**: Managed via `RequisitionProvider`. Use `useRequisitions()` to read/write system data.

## Coding Standards
- **Component Pattern**: Use Functional Components with TypeScript.
- **Styling**: Tailwind CSS 4.0 utility classes only.
- **Imports**: Use `@/` alias for all internal paths.
- **Naming**: PascalCase for components, camelCase for functions/vars.
