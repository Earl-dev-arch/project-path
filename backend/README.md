# YourPath backend foundation

This folder defines the first production-oriented backend layer. The existing root website remains the current prototype; it is not automatically connected to this backend yet.

## Stack
- Supabase Auth for real account registration, login, logout, and password reset.
- Supabase PostgreSQL for profiles, assessment answers, pathway reports, saved pathways, file metadata, and feedback.
- Private Supabase Storage for user files.
- Cloudflare Pages can host the static website later. Optional Pages Functions can be added for server-only workflows.

## Database
Run `backend/supabase/schema.sql` in the Supabase SQL Editor after the project is active. It creates tables, row-level security policies, a profile-on-signup trigger, and a private storage bucket.

## Required security rules
- Never store passwords in localStorage or database tables.
- Never put a Supabase `service_role` key in frontend code.
- The browser may use only the project's publishable/anon key, protected by Row Level Security.
- Keep each user's file under a path beginning with their authenticated UUID.
- Do not store unnecessary sensitive information about minors. Publish clear privacy, consent, retention, and deletion policies before public launch.
- Configure email confirmation, password recovery redirect URLs, allowed site URLs, and rate limits in Supabase Auth settings.

## Not done yet
- The SQL has not been run against a live project.
- The existing `app_scratch.js` handlers still need to be replaced/wired to Supabase.
- The current demo AI route `/api/ai/start` needs a real implementation or must remain disabled with a clear fallback.
- No deployment or publishing has been performed.
