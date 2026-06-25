-- 004_skills.sql
-- Create skills and skill_personas tables

CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  icon_slug TEXT,
  proficiency INTEGER DEFAULT 80,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS skill_personas (
  skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
  persona_id TEXT REFERENCES personas(id) ON DELETE CASCADE,
  PRIMARY KEY (skill_id, persona_id)
);
