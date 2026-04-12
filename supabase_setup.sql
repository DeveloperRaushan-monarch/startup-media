-- 1. Create the articles table
CREATE TABLE IF NOT EXISTS articles (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  image TEXT,
  category TEXT,
  excerpt TEXT,
  content TEXT,
  read_time TEXT,
  date TEXT,
  trending BOOLEAN DEFAULT false,
  author TEXT,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- 3. Create a policy to allow public read/write access (for MVP simplicity)
-- For production, you should restrict write access to authenticated users.
CREATE POLICY "Public Read/Write Access" 
ON articles 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- 4. Enable Realtime (optional, for live updates)
ALTER PUBLICATION supabase_realtime ADD TABLE articles;
