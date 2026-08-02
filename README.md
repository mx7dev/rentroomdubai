# RentRoomDubai

A lightweight room-rental listings platform for Dubai, inspired by [Dubizzle](https://dubai.dubizzle.com/) — stripped down to just the essentials: browse rooms, see the price and details, and reach out directly on WhatsApp.

## Overview

Dubizzle covers everything from cars to jobs to furniture, which makes it a lot to navigate for something as simple as "find a room to rent." This project focuses on a single use case: publishing room listings (price, area, amenities, photos) and letting an interested renter contact the lister in one click — no accounts, no forms, no noise.

It started as a way to show a real person (who helped me find a room when I moved to Dubai) what a simple listings site for her rooms could look like. If she wants to use it for real, she can plug in her own domain. Either way, it's built to be a real, working project for my portfolio — not a toy demo.

## Tech stack & why

| Layer | Choice | Why |
|---|---|---|
| Frontend | [Next.js](https://nextjs.org) 16 (App Router) + TypeScript | Industry-standard React framework; Server Components and file-based routing keep the app simple while still being SEO-friendly, which matters for a listings site people find through search. |
| Styling | [Tailwind CSS](https://tailwindcss.com) | Fast to build with, consistent design system, no separate CSS files to maintain. |
| Database & Storage | [Supabase](https://supabase.com) (Postgres + Storage + Auth) | One free-tier service covers the structured data (listings), file storage (room photos), and future admin authentication — no need to run or pay for a separate backend. |
| Hosting | [Vercel](https://vercel.com) | Zero-config deployment for Next.js, generous free tier, automatic deploys on every push to `main`. |

No custom backend (Express/NestJS) was used on purpose: Supabase already provides a production-grade API, so writing and hosting one from scratch would add complexity without adding value at this scope.

## Scope

**In scope (current):**
- Public listing page: browse available rooms with price, area, and amenities
- Room detail view with photos
- "Contact" button that opens WhatsApp with a pre-filled message (`wa.me` link) — no in-app chat, no payment processing

**Out of scope (for now):**
- User accounts / login for renters
- Online payments or subscriptions
- Search across categories other than rooms (cars, jobs, etc. — this is intentionally *not* a general classifieds clone)

**Possibly later:** a simple authenticated admin panel (Supabase Auth) so the listing owner can add/edit rooms herself without touching code.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app. Pages live in `app/`, routed by folder structure (Next.js App Router).

## Deployment

Deployed on [Vercel](https://vercel.com), with automatic deployments triggered on every push to `main`.
