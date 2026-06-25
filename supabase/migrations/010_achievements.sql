-- 010_achievements.sql
-- Create achievements table

CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  provider TEXT,
  category TEXT,
  description TEXT,
  date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);
