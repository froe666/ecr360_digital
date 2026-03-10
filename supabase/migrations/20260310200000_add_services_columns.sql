-- Migration: Add services_marketing and services_ai columns to project_requests
-- These columns were missing from the original migration, causing form submission errors

ALTER TABLE public.project_requests
ADD COLUMN IF NOT EXISTS services_marketing TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS services_ai TEXT[] DEFAULT '{}';
