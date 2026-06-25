-- 008_rls_policies.sql
-- Row Level Security policies for public read and admin write

-- Enable RLS on tables that require it (already enabled in schema for some tables)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read published projects" ON projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public read published blog" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public read published testimonials" ON testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Public insert contact" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Admin write policies (requires authenticated supabase user)
CREATE POLICY "Admin write projects" ON projects FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin write blog" ON blog_posts FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin write testimonials" ON testimonials FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin read contact" ON contact_submissions FOR SELECT USING (auth.uid() IS NOT NULL);
