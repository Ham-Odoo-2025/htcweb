import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://usavphdfyuvghvsmtbqo.supabase.co';
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  '';

const supabase = createClient(url, serviceKey);

async function main() {
  console.log('🚀 Starting Cloud Database Seeding to Supabase...');

  // 1. Categories
  const categoriesRaw = fs.readFileSync(path.join(process.cwd(), 'data/categories.json'), 'utf-8');
  const categories = JSON.parse(categoriesRaw);
  console.log(`Found ${categories.length} categories to seed.`);

  const catRows = categories.map((c) => ({
    id: c._id,
    name: c.name,
  }));
  const catRes = await supabase.from('categories').upsert(catRows);
  if (catRes.error) {
    console.error('Category upsert error:', catRes.error);
  } else {
    console.log(`✅ Successfully seeded ${catRows.length} categories!`);
  }

  // 2. Company Settings
  const settingsRaw = fs.readFileSync(path.join(process.cwd(), 'data/settings.json'), 'utf-8');
  const settings = JSON.parse(settingsRaw);
  const setRes = await supabase.from('company_settings').upsert([
    {
      id: 'default',
      company_name: settings.companyName,
      phone: settings.phone,
      whatsapp: settings.whatsapp,
      mobile: settings.mobile,
      email: settings.email,
      address_en: settings.address_en,
      address_ar: settings.address_ar,
      working_hours_en: settings.workingHours_en,
      working_hours_ar: settings.workingHours_ar,
      qcdd_license: settings.qcddLicense,
    },
  ]);
  if (setRes.error) {
    console.error('Settings upsert error:', setRes.error);
  } else {
    console.log('✅ Successfully seeded Company Settings!');
  }

  // 3. Products
  const productsRaw = fs.readFileSync(path.join(process.cwd(), 'data/products.json'), 'utf-8');
  const products = JSON.parse(productsRaw);
  console.log(`Found ${products.length} products to seed.`);

  const prodRows = products.map((p) => ({
    id: p._id,
    name: p.name,
    category: p.category,
    image: p.image || '',
    description: p.description || '',
    price: Number(p.price || 0),
    legacy_id: p.legacyId,
    slug: p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  }));

  // Batch insert
  const batchSize = 50;
  for (let i = 0; i < prodRows.length; i += batchSize) {
    const batch = prodRows.slice(i, i + batchSize);
    const prodRes = await supabase.from('products').upsert(batch);
    if (prodRes.error) {
      console.error(`Batch ${i / batchSize + 1} error:`, prodRes.error);
    } else {
      console.log(`✅ Seeded batch ${i + 1} to ${Math.min(i + batchSize, prodRows.length)} products`);
    }
  }

  console.log('🎉 Database seeding complete! Verifying count...');
  const countRes = await supabase.from('products').select('*', { count: 'exact', head: true });
  console.log(`Current Total Products in Supabase: ${countRes.count}`);
}

main();
