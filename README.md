# RentRoomDubai

A lightweight room-rental listings platform for Dubai — stripped down to just the essentials: browse rooms, see the price and details, and reach out directly on WhatsApp.

## Overview

General classifieds sites cover everything from cars to jobs to furniture, which makes them a lot to navigate for something as simple as "find a room to rent." This project focuses on a single use case: publishing room listings (price, area, amenities, photos) and letting an interested renter contact the lister in one click — no accounts, no forms, no noise.

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
- Public listing page: browse available rooms with photos, price, area, room type, and amenities
- Photo storage and delivery via Supabase Storage, served through Next.js Image optimization
- "Contact" button that opens WhatsApp with a pre-filled message (`wa.me` link) — no in-app chat, no payment processing

**Out of scope (for now):**
- User accounts / login for renters
- Online payments or subscriptions
- Search across categories other than rooms (cars, jobs, etc. — this is intentionally *not* a general classifieds clone)

**Possibly later:** a simple authenticated admin panel (Supabase Auth) so the listing owner can add/edit rooms herself without touching code.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in your own Supabase project values (found in your Supabase dashboard under Settings → Data API / API Keys):

   ```bash
   cp .env.example .env.local
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the app. Pages live in `app/`, routed by folder structure (Next.js App Router). Reusable UI lives in `components/`, and the Supabase client and WhatsApp link helper live in `lib/`.

## Database

A single `rooms` table in Postgres (via Supabase) stores the listings, with Row Level Security enabled — public read access only, no write access from the client. Room photos live in a public Supabase Storage bucket (`room-photos`); the table stores their URLs in a `photo_urls` column.

## Deployment

Designed to deploy on [Vercel](https://vercel.com) with zero extra configuration, with automatic deployments on every push to `main`.
