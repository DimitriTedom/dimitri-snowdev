-- 009_indexes.sql
-- Indexes for performance on key queries

-- Projects
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(is_published, sort_order);
CREATE INDEX IF NOT EXISTS idx_project_personas ON project_personas(persona_id, relevance DESC);

-- Blog posts
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_persona ON blog_posts(persona_id, published_at DESC);

-- Testimonials
CREATE INDEX IF NOT EXISTS idx_testimonials_persona ON testimonials(persona_id, is_published DESC);

-- Contact submissions (optional)
CREATE INDEX IF NOT EXISTS idx_contact_persona ON contact_submissions(persona_ref);
