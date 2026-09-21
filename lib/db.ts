import { createClient, SupabaseClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';

// Fallback JSON data imports
import fallbackProducts from '@/data/products.json';
import fallbackCategories from '@/data/categories.json';
import fallbackSettings from '@/data/settings.json';
import fallbackLeads from '@/data/leads.json';

export interface Product {
  _id: string;
  name: string;
  category: string;
  image: string;
  description?: string;
  price: number;
  legacyId?: number;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface CompanySettings {
  companyName: string;
  phone: string;
  whatsapp: string;
  mobile: string;
  email: string;
  address_en: string;
  address_ar: string;
  workingHours_en: string;
  workingHours_ar: string;
  qcddLicense: string;
}

export interface Lead {
  id: string;
  refId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  companyName?: string;
  notes?: string;
  items: Array<{
    name: string;
    category: string;
    quantity: number;
    price: number;
  }>;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Supabase Client Initialization
// ---------------------------------------------------------------------------
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_KEY;

export function isSupabaseConfigured(): boolean {
  return Boolean(
    supabaseUrl &&
      supabaseKey &&
      !supabaseUrl.includes('your-project') &&
      !supabaseKey.includes('your-key')
  );
}

let supabaseClient: SupabaseClient | null = null;
if (isSupabaseConfigured()) {
  try {
    supabaseClient = createClient(supabaseUrl!, supabaseKey!, {
      auth: { persistSession: false },
    });
  } catch (err) {
    console.warn('[DB] Supabase init warning:', err);
  }
}

// File system helper paths
const DATA_DIR = path.join(process.cwd(), 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// ---------------------------------------------------------------------------
// PRODUCTS
// ---------------------------------------------------------------------------
export async function getAllProducts(): Promise<Product[]> {
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((p) => ({
          _id: p.id,
          name: p.name,
          category: p.category,
          image: p.image || '',
          description: p.description || '',
          price: Number(p.price || 0),
          legacyId: p.legacy_id,
          slug: p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          createdAt: p.created_at,
          updatedAt: p.updated_at,
        }));
      }
    } catch (err) {
      console.warn('[DB] Failed to read from Supabase products, falling back to JSON:', err);
    }
  }

  // Fallback to local JSON
  try {
    const raw = await fs.readFile(PRODUCTS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return fallbackProducts as unknown as Product[];
  }
}

export async function createProduct(
  input: Omit<Product, '_id' | 'slug' | 'createdAt' | 'updatedAt'>
): Promise<Product> {
  const id = 'prod_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
  const slug = input.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const now = new Date().toISOString();

  const newProduct: Product = {
    _id: id,
    name: input.name,
    category: input.category,
    image: input.image || '',
    description: input.description || '',
    price: Number(input.price || 0),
    legacyId: input.legacyId || Math.floor(Math.random() * 9000 + 1000),
    slug,
    createdAt: now,
    updatedAt: now,
  };

  if (supabaseClient) {
    try {
      const { error } = await supabaseClient.from('products').insert([
        {
          id: newProduct._id,
          name: newProduct.name,
          category: newProduct.category,
          image: newProduct.image,
          description: newProduct.description,
          price: newProduct.price,
          legacy_id: newProduct.legacyId,
          slug: newProduct.slug,
          created_at: now,
          updated_at: now,
        },
      ]);
      if (!error) return newProduct;
    } catch (err) {
      console.warn('[DB] Supabase insert failed, saving to local JSON:', err);
    }
  }

  // Local JSON write
  const products = await getAllProducts();
  const updated = [newProduct, ...products];
  try {
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(updated, null, 2), 'utf-8');
  } catch (fsErr) {
    console.error('[DB] fs write error:', fsErr);
  }

  return newProduct;
}

export async function updateProduct(
  id: string,
  updates: Partial<Product>
): Promise<Product | null> {
  const now = new Date().toISOString();

  if (supabaseClient) {
    try {
      const dbUpdates: any = { updated_at: now };
      if (updates.name !== undefined) {
        dbUpdates.name = updates.name;
        dbUpdates.slug = updates.name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }
      if (updates.category !== undefined) dbUpdates.category = updates.category;
      if (updates.image !== undefined) dbUpdates.image = updates.image;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.price !== undefined) dbUpdates.price = Number(updates.price);

      const { data, error } = await supabaseClient
        .from('products')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        return {
          _id: data.id,
          name: data.name,
          category: data.category,
          image: data.image || '',
          description: data.description || '',
          price: Number(data.price || 0),
          legacyId: data.legacy_id,
          slug: data.slug,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }
    } catch (err) {
      console.warn('[DB] Supabase update failed, updating local JSON:', err);
    }
  }

  // Local JSON update
  const products = await getAllProducts();
  const index = products.findIndex((p) => p._id === id);
  if (index === -1) return null;

  const existing = products[index];
  const updatedProduct: Product = {
    ...existing,
    ...updates,
    price: updates.price !== undefined ? Number(updates.price) : existing.price,
    updatedAt: now,
  };
  products[index] = updatedProduct;

  try {
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
  } catch (fsErr) {
    console.error('[DB] fs write error:', fsErr);
  }

  return updatedProduct;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (supabaseClient) {
    try {
      const { error } = await supabaseClient.from('products').delete().eq('id', id);
      if (!error) return true;
    } catch (err) {
      console.warn('[DB] Supabase delete failed, removing from local JSON:', err);
    }
  }

  const products = await getAllProducts();
  const filtered = products.filter((p) => p._id !== id);
  if (filtered.length === products.length) return false;

  try {
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
  } catch (fsErr) {
    console.error('[DB] fs write error:', fsErr);
  }

  return true;
}

// ---------------------------------------------------------------------------
// CATEGORIES
// ---------------------------------------------------------------------------
export async function getAllCategories(): Promise<Category[]> {
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((c) => ({
          _id: c.id,
          name: c.name,
        }));
      }
    } catch (err) {
      console.warn('[DB] Supabase categories read failed, using JSON:', err);
    }
  }

  try {
    const raw = await fs.readFile(CATEGORIES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return fallbackCategories as unknown as Category[];
  }
}

export async function createCategory(name: string): Promise<Category> {
  const id = 'cat_' + Math.random().toString(36).substring(2, 9);
  const newCat: Category = { _id: id, name: name.trim() };

  if (supabaseClient) {
    try {
      await supabaseClient.from('categories').insert([{ id: newCat._id, name: newCat.name }]);
    } catch (err) {
      console.warn('[DB] Supabase createCategory failed:', err);
    }
  }

  const cats = await getAllCategories();
  if (!cats.some((c) => c.name.toLowerCase() === name.trim().toLowerCase())) {
    cats.push(newCat);
    try {
      await fs.writeFile(CATEGORIES_FILE, JSON.stringify(cats, null, 2), 'utf-8');
    } catch (err) {
      console.error('[DB] fs write error:', err);
    }
  }

  return newCat;
}

export async function deleteCategory(id: string): Promise<boolean> {
  if (supabaseClient) {
    try {
      await supabaseClient.from('categories').delete().eq('id', id);
    } catch (err) {
      console.warn('[DB] Supabase deleteCategory error:', err);
    }
  }

  const cats = await getAllCategories();
  const filtered = cats.filter((c) => c._id !== id);
  try {
    await fs.writeFile(CATEGORIES_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
  } catch (err) {
    console.error('[DB] fs write error:', err);
  }
  return true;
}

// ---------------------------------------------------------------------------
// SETTINGS
// ---------------------------------------------------------------------------
export async function getSettings(): Promise<CompanySettings> {
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('company_settings')
        .select('*')
        .eq('id', 'default')
        .single();

      if (!error && data) {
        return {
          companyName: data.company_name,
          phone: data.phone,
          whatsapp: data.whatsapp,
          mobile: data.mobile,
          email: data.email,
          address_en: data.address_en,
          address_ar: data.address_ar,
          workingHours_en: data.working_hours_en,
          workingHours_ar: data.working_hours_ar,
          qcddLicense: data.qcdd_license,
        };
      }
    } catch (err) {
      console.warn('[DB] Supabase settings error:', err);
    }
  }

  try {
    const raw = await fs.readFile(SETTINGS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return fallbackSettings as unknown as CompanySettings;
  }
}

export async function updateSettings(
  updates: Partial<CompanySettings>
): Promise<CompanySettings> {
  const current = await getSettings();
  const merged: CompanySettings = { ...current, ...updates };

  if (supabaseClient) {
    try {
      await supabaseClient.from('company_settings').upsert([
        {
          id: 'default',
          company_name: merged.companyName,
          phone: merged.phone,
          whatsapp: merged.whatsapp,
          mobile: merged.mobile,
          email: merged.email,
          address_en: merged.address_en,
          address_ar: merged.address_ar,
          working_hours_en: merged.workingHours_en,
          working_hours_ar: merged.workingHours_ar,
          qcdd_license: merged.qcddLicense,
          updated_at: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      console.warn('[DB] Supabase updateSettings error:', err);
    }
  }

  try {
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(merged, null, 2), 'utf-8');
  } catch (err) {
    console.error('[DB] fs write error:', err);
  }

  return merged;
}

// ---------------------------------------------------------------------------
// LEADS / QUOTATIONS
// ---------------------------------------------------------------------------
export async function getLeads(): Promise<Lead[]> {
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data.map((l) => ({
          id: l.id,
          refId: l.ref_id,
          customerName: l.customer_name,
          customerPhone: l.customer_phone,
          customerEmail: l.customer_email,
          companyName: l.company_name,
          notes: l.notes,
          items: l.items || [],
          status: l.status || 'new',
          createdAt: l.created_at,
        }));
      }
    } catch (err) {
      console.warn('[DB] Supabase getLeads error:', err);
    }
  }

  try {
    const raw = await fs.readFile(LEADS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return (fallbackLeads as unknown as Lead[]) || [];
  }
}

export async function saveLead(lead: Lead): Promise<Lead> {
  if (supabaseClient) {
    try {
      await supabaseClient.from('leads').insert([
        {
          id: lead.id,
          ref_id: lead.refId,
          customer_name: lead.customerName,
          customer_phone: lead.customerPhone,
          customer_email: lead.customerEmail,
          company_name: lead.companyName,
          notes: lead.notes,
          items: lead.items,
          status: lead.status || 'new',
          created_at: lead.createdAt || new Date().toISOString(),
        },
      ]);
    } catch (err) {
      console.warn('[DB] Supabase saveLead error:', err);
    }
  }

  const leads = await getLeads();
  leads.unshift(lead);
  try {
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('[DB] fs write error:', err);
  }

  return lead;
}

// ---------------------------------------------------------------------------
// SEEDING HELPER (1-Click Sync of 123 Products + 19 Categories to Cloud)
// ---------------------------------------------------------------------------
export async function seedDatabase(): Promise<{
  success: boolean;
  message: string;
  productsCount: number;
  categoriesCount: number;
}> {
  if (!supabaseClient) {
    return {
      success: false,
      message: 'Supabase credentials not configured yet. Add them in Vercel or .env.local',
      productsCount: 0,
      categoriesCount: 0,
    };
  }

  try {
    // 1. Seed Categories
    const catsToInsert = (fallbackCategories as any[]).map((c) => ({
      id: c._id,
      name: c.name,
    }));
    await supabaseClient.from('categories').upsert(catsToInsert);

    // 2. Seed Settings
    await supabaseClient.from('company_settings').upsert([
      {
        id: 'default',
        company_name: (fallbackSettings as any).companyName,
        phone: (fallbackSettings as any).phone,
        whatsapp: (fallbackSettings as any).whatsapp,
        mobile: (fallbackSettings as any).mobile,
        email: (fallbackSettings as any).email,
        address_en: (fallbackSettings as any).address_en,
        address_ar: (fallbackSettings as any).address_ar,
        working_hours_en: (fallbackSettings as any).workingHours_en,
        working_hours_ar: (fallbackSettings as any).workingHours_ar,
        qcdd_license: (fallbackSettings as any).qcddLicense,
      },
    ]);

    // 3. Seed Products in batches of 50
    const productsToInsert = (fallbackProducts as any[]).map((p) => ({
      id: p._id,
      name: p.name,
      category: p.category,
      image: p.image || '',
      description: p.description || '',
      price: Number(p.price || 0),
      legacy_id: p.legacyId,
      slug: p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    }));

    const batchSize = 50;
    for (let i = 0; i < productsToInsert.length; i += batchSize) {
      const batch = productsToInsert.slice(i, i + batchSize);
      await supabaseClient.from('products').upsert(batch);
    }

    return {
      success: true,
      message: 'Database seeded successfully with all categories and products!',
      productsCount: productsToInsert.length,
      categoriesCount: catsToInsert.length,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Failed to seed database.',
      productsCount: 0,
      categoriesCount: 0,
    };
  }
}
