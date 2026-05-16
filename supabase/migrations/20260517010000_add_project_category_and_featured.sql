-- Add category and featured columns to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT false;

-- Optional: index for filtering by category and featured ordering
CREATE INDEX IF NOT EXISTS projects_category_idx ON projects (category);
CREATE INDEX IF NOT EXISTS projects_featured_idx ON projects (featured);
