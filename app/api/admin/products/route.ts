import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  isSupabaseConfigured,
} from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase().trim();
    const category = searchParams.get('category');

    let products = await getAllProducts();

    if (category && category !== 'All') {
      products = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          (p.description && p.description.toLowerCase().includes(search)) ||
          p.category.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({
      products,
      total: products.length,
      usingCloudDb: isSupabaseConfigured(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, category, image, description, price } = body;

    if (!name || !category) {
      return NextResponse.json(
        { error: 'Product name and category are required' },
        { status: 400 }
      );
    }

    const newProduct = await createProduct({
      name,
      category,
      image: image || '',
      description: description || '',
      price: Number(price || 0),
    });

    // ⚡ On-Demand Instant Revalidation across all public pages
    try {
      revalidatePath('/[locale]/allproducts', 'page');
      revalidatePath('/[locale]', 'page');
      revalidatePath('/en/allproducts');
      revalidatePath('/ar/allproducts');
    } catch (revErr) {
      console.warn('[Admin] Revalidate error:', revErr);
    }

    return NextResponse.json({ success: true, product: newProduct });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const updated = await updateProduct(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // ⚡ On-Demand Instant Revalidation
    try {
      revalidatePath('/[locale]/allproducts', 'page');
      revalidatePath('/[locale]', 'page');
      revalidatePath('/en/allproducts');
      revalidatePath('/ar/allproducts');
    } catch (revErr) {
      console.warn('[Admin] Revalidate error:', revErr);
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const deleted = await deleteProduct(id);

    // ⚡ On-Demand Instant Revalidation
    try {
      revalidatePath('/[locale]/allproducts', 'page');
      revalidatePath('/[locale]', 'page');
      revalidatePath('/en/allproducts');
      revalidatePath('/ar/allproducts');
    } catch (revErr) {
      console.warn('[Admin] Revalidate error:', revErr);
    }

    return NextResponse.json({ success: deleted });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
