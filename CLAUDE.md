# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm install

# Run full dev environment (React + Express concurrently)
npm run dev

# Run only the Express API server
npm run server

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Setup

Copy `.env.example` to `.env` and set `ANTHROPIC_API_KEY`. The server runs on port 3001; the Vite dev server on port 5173 and proxies `/api` requests to the Express server.

## Architecture

This is a dual-process app: a **React frontend** (Vite, Tailwind) and an **Express backend** (`server.js`) that holds the Anthropic API key and makes all Claude API calls.

### Three-step AI pipeline

Every user session runs three sequential Claude API calls (all using `claude-sonnet-4-20250514`):

1. **`/api/extract-profile`** — parses free-form user text into a structured JSON profile (nationality, city, field, visa_type, languages, goals, education_level, name).
2. **`/api/generate-passport`** — takes the profile + static JSON data (scholarships, community orgs, visa steps) and generates a full "Life Passport" JSON covering visa, education, career, and community sections.
3. **`/api/follow-up`** — stateful chat endpoint; receives full message history plus profile and passport as context.

### Frontend state machine

`App.jsx` controls three app states: `'landing'` → `'loading'` → `'passport'`. The landing state renders `LandingHero` (text input), loading renders `LoadingState`, and passport state renders `PassportDashboard` + `FollowUpChat` together.

### Static data layer

`src/data/` contains three JSON files (`scholarships.json`, `community.json`, `visa_steps.json`) that are bundled into the frontend and sent to the server as part of the passport generation request. To add or update resources, edit these files directly.

### API client

`src/api/claude.js` is the only file that makes HTTP calls from the frontend. It imports the static data and passes it to `generatePassport`. All API routes are proxied through Vite in dev, so `fetch('/api/...')` works without CORS issues during development.
