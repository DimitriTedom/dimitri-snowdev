-- 001_personas.sql
-- Create personas table and seed initial personas

CREATE TABLE IF NOT EXISTS personas (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  accent_color TEXT,
  theme_config JSONB,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO personas (id, label, description, accent_color, sort_order) VALUES
  ('fullstack', 'Full Stack Developer', 'End‑to‑end web development expertise.', '#5e17eb', 1),
  ('ai-engineer', 'AI Engineer', 'Machine learning, automation and RAG pipelines.', '#7c3aed', 2),
  ('cloud-architect', 'Cloud & Architect', 'Infrastructure, AWS and scalability.', '#0ea5e9', 3),
  ('product-builder', 'Product Builder', 'Digital product design and delivery.', '#10b981', 4),
  ('entrepreneur', 'Tech Entrepreneur', 'Business, growth and market strategy.', '#f59e0b', 5)
ON CONFLICT (id) DO NOTHING;
