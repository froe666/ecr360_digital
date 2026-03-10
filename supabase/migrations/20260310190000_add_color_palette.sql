-- Add color_palette column to project_requests table
ALTER TABLE public.project_requests
  ADD COLUMN IF NOT EXISTS color_palette TEXT DEFAULT NULL;
