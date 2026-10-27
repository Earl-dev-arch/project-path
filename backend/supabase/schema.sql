-- YourPath production database foundation
-- Run in Supabase SQL Editor only after activating the project.
-- Keep RLS enabled. Never put service_role keys in frontend code.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  country text,
  education_stage text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  questionnaire_version text not null default 'v1',
  answers jsonb not null default '{}'::jsonb,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  constraint assessment_answers_object check (jsonb_typeof(answers) = 'object')
);

create index if not exists assessments_user_created_idx
  on public.assessments (user_id, created_at desc);

create table if not exists public.pathway_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  assessment_id uuid references public.assessments(id) on delete set null,
  report_version text not null default 'v1',
  results jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint report_results_object check (jsonb_typeof(results) = 'object')
);

create index if not exists pathway_reports_user_created_idx
  on public.pathway_reports (user_id, created_at desc);

create table if not exists public.saved_pathways (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  pathway_key text not null,
  notes text,
  created_at timestamptz not null default now(),
  unique (user_id, pathway_key)
);

create table if not exists public.user_files (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  storage_path text not null unique,
  display_name text not null,
  mime_type text,
  created_at timestamptz not null default now()
);

-- Minimal feedback storage; do not collect sensitive personal details.
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  category text not null default 'general',
  message text not null,
  created_at timestamptz not null default now()
);

-- Enable row-level security on every user-data table.
alter table public.profiles enable row level security;
alter table public.assessments enable row level security;
alter table public.pathway_reports enable row level security;
alter table public.saved_pathways enable row level security;
alter table public.user_files enable row level security;
alter table public.feedback enable row level security;

-- Profiles: a user can read/update only their own profile.
drop policy if exists "profile_select_own" on public.profiles;
create policy "profile_select_own" on public.profiles
  for select to authenticated using (id = (select auth.uid()));
drop policy if exists "profile_insert_own" on public.profiles;
create policy "profile_insert_own" on public.profiles
  for insert to authenticated with check (id = (select auth.uid()));
drop policy if exists "profile_update_own" on public.profiles;
create policy "profile_update_own" on public.profiles
  for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- Assessments: owner-only read/write.
drop policy if exists "assessments_select_own" on public.assessments;
create policy "assessments_select_own" on public.assessments
  for select to authenticated using (user_id = (select auth.uid()));
drop policy if exists "assessments_insert_own" on public.assessments;
create policy "assessments_insert_own" on public.assessments
  for insert to authenticated with check (user_id = (select auth.uid()));
drop policy if exists "assessments_update_own" on public.assessments;
create policy "assessments_update_own" on public.assessments
  for update to authenticated using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
drop policy if exists "assessments_delete_own" on public.assessments;
create policy "assessments_delete_own" on public.assessments
  for delete to authenticated using (user_id = (select auth.uid()));

-- Reports: owner-only read/write.
drop policy if exists "reports_select_own" on public.pathway_reports;
create policy "reports_select_own" on public.pathway_reports
  for select to authenticated using (user_id = (select auth.uid()));
drop policy if exists "reports_insert_own" on public.pathway_reports;
create policy "reports_insert_own" on public.pathway_reports
  for insert to authenticated with check (user_id = (select auth.uid()));
drop policy if exists "reports_delete_own" on public.pathway_reports;
create policy "reports_delete_own" on public.pathway_reports
  for delete to authenticated using (user_id = (select auth.uid()));

-- Saved pathways: owner-only read/write.
drop policy if exists "saved_pathways_select_own" on public.saved_pathways;
create policy "saved_pathways_select_own" on public.saved_pathways
  for select to authenticated using (user_id = (select auth.uid()));
drop policy if exists "saved_pathways_insert_own" on public.saved_pathways;
create policy "saved_pathways_insert_own" on public.saved_pathways
  for insert to authenticated with check (user_id = (select auth.uid()));
drop policy if exists "saved_pathways_update_own" on public.saved_pathways;
create policy "saved_pathways_update_own" on public.saved_pathways
  for update to authenticated using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
drop policy if exists "saved_pathways_delete_own" on public.saved_pathways;
create policy "saved_pathways_delete_own" on public.saved_pathways
  for delete to authenticated using (user_id = (select auth.uid()));

-- File metadata: owner-only. Actual objects are private in Storage.
drop policy if exists "user_files_select_own" on public.user_files;
create policy "user_files_select_own" on public.user_files
  for select to authenticated using (user_id = (select auth.uid()));
drop policy if exists "user_files_insert_own" on public.user_files;
create policy "user_files_insert_own" on public.user_files
  for insert to authenticated with check (user_id = (select auth.uid()));
drop policy if exists "user_files_delete_own" on public.user_files;
create policy "user_files_delete_own" on public.user_files
  for delete to authenticated using (user_id = (select auth.uid()));

-- Feedback: signed-in users may submit feedback; only admins should read it
-- through a separately protected server-side/admin workflow.
drop policy if exists "feedback_insert_authenticated" on public.feedback;
create policy "feedback_insert_authenticated" on public.feedback
  for insert to authenticated with check (user_id = (select auth.uid()));

-- Automatically create a minimal profile after sign-up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, nullif(new.raw_user_meta_data ->> 'display_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Private user-file bucket. Each object must be stored under:
-- <authenticated-user-uuid>/<safe-file-name>
insert into storage.buckets (id, name, public, file_size_limit)
values ('yourpath-private', 'yourpath-private', false, 10485760)
on conflict (id) do update set public = false, file_size_limit = 10485760;

drop policy if exists "yourpath_storage_select_own" on storage.objects;
create policy "yourpath_storage_select_own" on storage.objects
  for select to authenticated
  using (bucket_id = 'yourpath-private' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "yourpath_storage_insert_own" on storage.objects;
create policy "yourpath_storage_insert_own" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'yourpath-private' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "yourpath_storage_update_own" on storage.objects;
create policy "yourpath_storage_update_own" on storage.objects
  for update to authenticated
  using (bucket_id = 'yourpath-private' and (storage.foldername(name))[1] = (select auth.uid())::text)
  with check (bucket_id = 'yourpath-private' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "yourpath_storage_delete_own" on storage.objects;
create policy "yourpath_storage_delete_own" on storage.objects
  for delete to authenticated
  using (bucket_id = 'yourpath-private' and (storage.foldername(name))[1] = (select auth.uid())::text);
