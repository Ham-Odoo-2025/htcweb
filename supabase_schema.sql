-- ==========================================================
-- HTC FIRE QATAR - SUPABASE DATABASE SCHEMA
-- Run this in the Supabase SQL Editor (supabase.com -> SQL Editor)
-- ==========================================================

-- 1. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  description TEXT,
  price NUMERIC DEFAULT 0,
  legacy_id INTEGER,
  slug TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for instant search
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_name ON public.products(name);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Company Settings Table
CREATE TABLE IF NOT EXISTS public.company_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  company_name TEXT,
  phone TEXT,
  whatsapp TEXT,
  mobile TEXT,
  email TEXT,
  address_en TEXT,
  address_ar TEXT,
  working_hours_en TEXT,
  working_hours_ar TEXT,
  qcdd_license TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Leads / Quotation Requests Table
CREATE TABLE IF NOT EXISTS public.leads (
  id TEXT PRIMARY KEY,
  ref_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  company_name TEXT,
  notes TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow public READ access to products, categories, and settings
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON public.company_settings FOR SELECT USING (true);

-- Allow public INSERT access to leads (for website quotation modal)
CREATE POLICY "Public Insert Leads" ON public.leads FOR INSERT WITH CHECK (true);

-- Allow service_role full read/write/delete access on all tables
CREATE POLICY "Service Role Products" ON public.products FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service Role Categories" ON public.categories FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service Role Settings" ON public.company_settings FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service Role Leads" ON public.leads FOR ALL USING (auth.role() = 'service_role');
