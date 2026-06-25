-- 003_experiences.sql
-- Create experiences and experience_personas tables

CREATE TABLE IF NOT EXISTS experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  duration TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  type TEXT DEFAULT 'Part-time',
  description TEXT,
  skills TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS experience_personas (
  experience_id UUID REFERENCES experiences(id) ON DELETE CASCADE,
  persona_id TEXT REFERENCES personas(id) ON DELETE CASCADE,
  PRIMARY KEY (experience_id, persona_id)
);
