-- ============================================
-- Torah Light Database Schema
-- Run this in your Supabase SQL Editor
-- (Dashboard > SQL Editor > New Query)
-- ============================================

-- 1. Article Votes
-- Stores aggregate vote counts per section
create table if not exists article_votes (
  section_id text primary key,
  thumbs_up integer not null default 0,
  thumbs_down integer not null default 0,
  updated_at timestamptz not null default now()
);

-- Track individual user votes by fingerprint (anonymous, no auth needed)
create table if not exists user_votes (
  id bigint generated always as identity primary key,
  section_id text not null,
  user_fingerprint text not null,
  vote text not null check (vote in ('up', 'down')),
  created_at timestamptz not null default now(),
  unique (section_id, user_fingerprint)
);

-- 2. Articles (replaces localStorage admin articles)
create table if not exists articles (
  id bigint generated always as identity primary key,
  section text not null,
  title_en text not null default '',
  title_zh text not null default '',
  title_he text not null default '',
  body_en text not null default '',
  body_zh text not null default '',
  body_he text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. Forum Posts (replaces localStorage forum)
create table if not exists forum_posts (
  id bigint generated always as identity primary key,
  author_name text not null,
  title text not null,
  body text not null,
  category text not null default 'general',
  created_at timestamptz not null default now()
);

-- 4. Forum Replies
create table if not exists forum_replies (
  id bigint generated always as identity primary key,
  post_id bigint not null references forum_posts(id) on delete cascade,
  author_name text not null,
  body text not null,
  created_at timestamptz not null default now()
);

-- 5. Mentorship Requests
create table if not exists mentorship_requests (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  role text not null check (role in ('mentor', 'mentee')),
  languages text[] not null default '{}',
  message text not null default '',
  created_at timestamptz not null default now()
);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Enable RLS on all tables
alter table article_votes enable row level security;
alter table user_votes enable row level security;
alter table articles enable row level security;
alter table forum_posts enable row level security;
alter table forum_replies enable row level security;
alter table mentorship_requests enable row level security;

-- article_votes: anyone can read, anyone can upsert
create policy "Anyone can read votes"
  on article_votes for select
  using (true);

create policy "Anyone can upsert votes"
  on article_votes for insert
  with check (true);

create policy "Anyone can update votes"
  on article_votes for update
  using (true);

-- user_votes: anyone can read and insert, update own
create policy "Anyone can read user_votes"
  on user_votes for select
  using (true);

create policy "Anyone can insert user_votes"
  on user_votes for insert
  with check (true);

create policy "Anyone can update user_votes"
  on user_votes for update
  using (true);

create policy "Anyone can delete user_votes"
  on user_votes for delete
  using (true);

-- articles: anyone can read, insert, update, delete (admin protected in app)
create policy "Anyone can read articles"
  on articles for select
  using (true);

create policy "Anyone can insert articles"
  on articles for insert
  with check (true);

create policy "Anyone can update articles"
  on articles for update
  using (true);

create policy "Anyone can delete articles"
  on articles for delete
  using (true);

-- forum_posts: anyone can read and create
create policy "Anyone can read forum_posts"
  on forum_posts for select
  using (true);

create policy "Anyone can create forum_posts"
  on forum_posts for insert
  with check (true);

-- forum_replies: anyone can read and create
create policy "Anyone can read forum_replies"
  on forum_replies for select
  using (true);

create policy "Anyone can create forum_replies"
  on forum_replies for insert
  with check (true);

-- mentorship_requests: anyone can insert (read restricted to admin later)
create policy "Anyone can create mentorship_requests"
  on mentorship_requests for insert
  with check (true);

create policy "Anyone can read mentorship_requests"
  on mentorship_requests for select
  using (true);

-- 6. Article Edit Suggestions (community-submitted edits for admin review)
create table if not exists article_edits (
  id bigint generated always as identity primary key,
  article_id bigint not null references articles(id) on delete cascade,
  editor_name text not null default 'Anonymous',
  title_en text not null default '',
  title_zh text not null default '',
  title_he text not null default '',
  body_en text not null default '',
  body_zh text not null default '',
  body_he text not null default '',
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

alter table article_edits enable row level security;

create policy "Anyone can read article_edits"
  on article_edits for select
  using (true);

create policy "Anyone can submit article_edits"
  on article_edits for insert
  with check (true);

create policy "Anyone can update article_edits"
  on article_edits for update
  using (true);

-- ============================================
-- Indexes
-- ============================================
create index if not exists idx_user_votes_section on user_votes(section_id);
create index if not exists idx_articles_section on articles(section);
create index if not exists idx_forum_replies_post on forum_replies(post_id);
create index if not exists idx_article_edits_status on article_edits(status);
create index if not exists idx_article_edits_article on article_edits(article_id);
