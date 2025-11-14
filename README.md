
Live link for the app  [link](https://boli-test-3gmxj2sff-marwa-s-projects-ea57588c.vercel.app/)

This repository containe a small blog demo and a simple todo page. The work follows a feature-based component structure (see `features/Blogs`), uses Next.js patterns with TypeScript.

- In root app page (`app/page.tsx`) with a small client-side To‑Do list (add/toggle/delete) persisted to `localStorage`.
- Implemented a feature-driven Blogs area under `features/Blogs` and exposed app routes under `app/blogs`:
  - `app/blogs` — lists posts (server-fetched + merged with locally-created posts)
  - `app/blogs/create` — a client Create page that posts to the API and saves created posts to `localStorage`
  - `app/blogs/[id]` — SSR details page which fetches the post by id and resolves the author server-side
- Added RTK Query to manage API calls and caching for posts (`store/blogSlice/api.ts`) and wired it into a Redux store and provider (`store/index.ts`, `store/Provider.tsx`).
- Styled the Blogs UI using `styled-components` and kept components organized in `features/style-components`.

Key behaviors

- Locally-created posts are persisted to `localStorage` (key: `localPosts`) and merged with server-fetched posts so new items appear immediately and persist across reloads.
- The blog details page is server-side rendered (SSR). It checks the API response and returns a 404-like message if the post is not found. The author name is retrieved server-side from the users endpoint when available.

Main files added/updated

- app/page.tsx — replaced with a simple client todo UI
- features/Blogs/\* — blog list, create form, and blog detail client component (`features/Blogs/page.tsx`, `Create.tsx`, `blog.tsx`)
- features/style-components/index.tsx — shared styled-components for consistent UI
- features/Blogs/types/blog.tsx — Blog type definition
- store/blogSlice/api.ts — RTK Query API slice (getPosts, addPost)
- store/index.ts — Redux store wiring
- store/Provider.tsx — client wrapper to provide the store inside `app/layout.tsx`
- app/blogs/\* — app router pages that render the feature components (`app/blogs/page.tsx`, `app/blogs/create/page.tsx`, `app/blogs/[id].tsx`)

Technologies used

- Next.js (App Router) — server components + client components
- React (v19) + TypeScript
- Redux Toolkit & RTK Query — API data fetching, caching, and mutations
- react-redux — Provider
- styled-components — component-scoped styling
- localStorage — simple client persistence for newly-created posts

Project notes & next steps

- I followed a feature-based layout: each feature (Blogs, etc.) lives under `features/<FeatureName>` with types, UI pieces, and pages grouped together.
- RTK Query handles caching and invalidation.
