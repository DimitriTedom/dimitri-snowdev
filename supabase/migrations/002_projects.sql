-- 002_projects.sql
-- Create projects and project_personas tables

CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  challenge TEXT,
  solution TEXT,
  result TEXT,
  case_study TEXT,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  image_url_2 TEXT,
  image_url_3 TEXT,
  video_url TEXT,
  demo_url TEXT,
  code_url TEXT,
  date DATE,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS project_personas (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  persona_id TEXT REFERENCES personas(id) ON DELETE CASCADE,
  relevance INTEGER DEFAULT 1,
  PRIMARY KEY (project_id, persona_id)
);
