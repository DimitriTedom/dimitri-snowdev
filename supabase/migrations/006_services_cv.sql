-- 006_services_cv.sql
-- Create services and cv_templates tables

CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  persona_id TEXT REFERENCES personas(id),
  title TEXT NOT NULL,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  price_label TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS cv_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  persona_id TEXT UNIQUE REFERENCES personas(id),
  title TEXT NOT NULL,
  objective TEXT,
  highlighted_skills TEXT[] DEFAULT '{}',
  highlighted_projects UUID[] DEFAULT '{}',
  highlighted_achievements TEXT[] DEFAULT '{}',
  custom_sections JSONB,
  updated_at TIMESTAMPTZ DEFAULT now()
);
