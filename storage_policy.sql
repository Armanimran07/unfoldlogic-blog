-- Create the storage bucket 'blog-images' if it doesn't exist
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Enable RLS on storage.objects (usually enabled by default, so we skip altering it to avoid permission errors)
-- alter table storage.objects enable row level security;

-- Allow public access to view images
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'blog-images' );

-- Allow public uploads (since we are using custom auth)
create policy "Public Upload"
  on storage.objects for insert
  with check ( bucket_id = 'blog-images' );

-- Allow public updates
create policy "Public Update"
  on storage.objects for update
  using ( bucket_id = 'blog-images' );
