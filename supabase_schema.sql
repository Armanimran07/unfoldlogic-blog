-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create Posts table
create table if not exists posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  content text not null,
  excerpt text,
  author text,
  date timestamp with time zone default timezone('utc'::text, now()),
  published boolean default true,
  image text,
  category text,
  tags text[]
);

-- Create Leads table (for newsletter)
create table if not exists leads (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  name text,
  date timestamp with time zone default timezone('utc'::text, now())
);

-- Create Messages table (for contact form)
create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  message text not null,
  date timestamp with time zone default timezone('utc'::text, now())
);

-- Set up Row Level Security (RLS)
-- For development, we'll allow public access. 
-- IMPORTANT: For production, you should restrict this!

alter table posts enable row level security;
create policy "Public posts are viewable by everyone" on posts
  for select using (true);
create policy "Users can insert posts" on posts
  for insert with check (true);
create policy "Users can update posts" on posts
  for update using (true);
create policy "Users can delete posts" on posts
  for delete using (true);

alter table leads enable row level security;
create policy "Anyone can insert leads" on leads
  for insert with check (true);
create policy "Leads are viewable by everyone" on leads
  for select using (true);

alter table messages enable row level security;
create policy "Anyone can insert messages" on messages
  for insert with check (true);
create policy "Messages are viewable by everyone" on messages
  for select using (true);
