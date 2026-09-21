'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Flame,
  Package,
  Layers,
  PhoneCall,
  Inbox,
  Database,
  Plus,
  Search,
  Edit2,
  Trash2,
  LogOut,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Download,
  UploadCloud,
  X,
  MessageSquare,
  Building2,
  Mail,
  Clock,
  MapPin,
  Sparkles,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  category: string;
  image: string;
  description?: string;
  price: number;
  slug: string;
}

interface Category {
  _id: string;
  name: string;
}

interface CompanySettings {
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

interface Lead {
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
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();

  // Navigation State
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'settings' | 'leads' | 'database'>('products');
  const [loading, setLoading] = useState(true);

  // Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [settings, setSettings] = useState<CompanySettings | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [usingCloudDb, setUsingCloudDb] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: '',
    image: '',
    description: '',
    price: 0,
  });

  const [newCategoryName, setNewCategoryName] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  // 1. Initial Authentication Check & Data Fetch
  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    setLoading(true);
    try {
      const authRes = await fetch('/api/admin/auth');
      const authData = await authRes.json();
      if (!authData.authenticated) {
        router.push('/admin/login');
        return;
      }

      await Promise.all([fetchProducts(), fetchCategories(), fetchSettings(), fetchLeads()]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
        setUsingCloudDb(Boolean(data.usingCloudDb));
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (data.categories) setCategories(data.categories);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      if (data.settings) setSettings(data.settings);
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    }
  };

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/admin/leads');
      const data = await res.json();
      if (data.leads) setLeads(data.leads);
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    }
  };

  const showNotification = (type: 'success' | 'error', text: string) => {
    setFeedbackMsg({ type, text });
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showNotification('error', 'Please select a valid image file (JPG, PNG, WebP)');
      return;
    }

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setProductForm((prev) => ({ ...prev, image: data.url }));
        showNotification('success', 'Image uploaded successfully to cloud!');
      } else {
        showNotification('error', data.error || 'Failed to upload image');
      }
    } catch (err: any) {
      showNotification('error', err.message || 'Image upload failed');
    } finally {
      setIsUploadingImage(false);
    }
  };

  // -------------------------------------------------------------------------
  // Product Handlers
  // -------------------------------------------------------------------------
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: categories[0]?.name || 'Accessories',
      image: 'https://htc-fire-s3-bucket.s3.ap-south-1.amazonaws.com/products/1789234332602-SMOKE_DETECTOR_TEST_SPRAY_-_BRAND_WINKEL.webp',
      description: '',
      price: 0,
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      image: product.image,
      description: product.description || '',
      price: product.price || 0,
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) {
      showNotification('error', 'Please enter a product name');
      return;
    }

    setIsSaving(true);
    try {
      if (editingProduct) {
        // Update Product
        const res = await fetch('/api/admin/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingProduct._id,
            ...productForm,
          }),
        });
        const data = await res.json();
        if (data.success) {
          showNotification('success', `Product "${productForm.name}" updated live!`);
          setIsProductModalOpen(false);
          await fetchProducts();
        } else {
          showNotification('error', data.error || 'Failed to update product');
        }
      } else {
        // Create Product
        const res = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productForm),
        });
        const data = await res.json();
        if (data.success) {
          showNotification('success', `New product "${productForm.name}" published live!`);
          setIsProductModalOpen(false);
          await fetchProducts();
        } else {
          showNotification('error', data.error || 'Failed to create product');
        }
      }
    } catch (err: any) {
      showNotification('error', err.message || 'Server error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        showNotification('success', `Product "${name}" deleted.`);
        await fetchProducts();
      } else {
        showNotification('error', data.error || 'Failed to delete');
      }
    } catch (err: any) {
      showNotification('error', err.message);
    }
  };

  // -------------------------------------------------------------------------
  // Category Handlers
  // -------------------------------------------------------------------------
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification('success', `Category "${newCategoryName}" added!`);
        setNewCategoryName('');
        await fetchCategories();
      } else {
        showNotification('error', data.error || 'Failed to add category');
      }
    } catch (err: any) {
      showNotification('error', err.message);
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"? Products in this category will keep their label.`)) return;
    try {
      const res = await fetch(`/api/admin/categories?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        showNotification('success', `Category "${name}" deleted.`);
        await fetchCategories();
      }
    } catch (err: any) {
      showNotification('error', err.message);
    }
  };

  // -------------------------------------------------------------------------
  // Settings Handlers
  // -------------------------------------------------------------------------
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        showNotification('success', 'Company contact settings updated live!');
      } else {
        showNotification('error', data.error || 'Failed to save settings');
      }
    } catch (err: any) {
      showNotification('error', err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // -------------------------------------------------------------------------
  // 1-Click Cloud Seed Handler
  // -------------------------------------------------------------------------
  const handleSeedDatabase = async () => {
    if (!confirm('Sync all 123 products and 19 categories into your Supabase cloud database?')) return;
    setIsSeeding(true);
    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        showNotification('success', `Synced ${data.productsCount} products to Supabase Cloud!`);
        setUsingCloudDb(true);
        await fetchProducts();
      } else {
        showNotification('error', data.error || data.message || 'Seeding failed');
      }
    } catch (err: any) {
      showNotification('error', err.message);
    } finally {
      setIsSeeding(false);
    }
  };

  // -------------------------------------------------------------------------
  // Logout
  // -------------------------------------------------------------------------
  const handleLogout = async () => {
    await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    });
    router.push('/admin/login');
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-red-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Loading HTC Fire Admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-500">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base">HTC Fire Admin</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                  v2.0
                </span>
              </div>
              <p className="text-xs text-slate-400">Doha, Qatar • Civil Defence Approved</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Live Site Link */}
            <a
              href="/en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Instant Feedback Toast */}
      {feedbackMsg && (
        <div
          className={`fixed top-20 right-6 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-2xl flex items-center gap-2 border animate-in slide-in-from-top-4 ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/40 shadow-emerald-900/30'
              : 'bg-red-950/90 text-red-200 border-red-500/40 shadow-red-900/30'
          }`}
        >
          {feedbackMsg.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400" />
          )}
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-8 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-white/20">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'categories'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Categories</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-white/20">
              {categories.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>Company Info</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'leads'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Quotation Leads</span>
            {leads.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-red-400 text-slate-950 font-bold">
                {leads.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'database'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Database & Cloud</span>
            <span
              className={`w-2 h-2 rounded-full ${
                usingCloudDb ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
          </button>
        </div>

        {/* ================================================================= */}
        {/* TAB 1: PRODUCTS MANAGER */}
        {/* ================================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                {/* Search Bar */}
                <div className="relative flex-1 sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Category Dropdown */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="All">All Categories ({products.length})</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add Product Button */}
              <button
                onClick={handleOpenAddProduct}
                className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Instant Publish Notice */}
            <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-xl flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-400" />
                <span>
                  <strong>Instant Publish Active:</strong> Any product added, edited, or deleted updates on the live website immediately!
                </span>
              </div>
              <span className="text-slate-400">
                Showing {filteredProducts.length} of {products.length} items
              </span>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between transition-all group shadow-sm hover:shadow-md"
                >
                  <div>
                    {/* Image */}
                    <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden mb-3.5 flex items-center justify-center p-3 border border-slate-200">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <Package className="w-12 h-12 text-slate-300" />
                      )}
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-900/80 backdrop-blur-sm text-white">
                        {product.category}
                      </span>
                    </div>

                    {/* Info */}
                    <h3 className="font-semibold text-white text-sm line-clamp-2 leading-snug mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                      {product.description || 'No description provided.'}
                    </p>
                  </div>

                  {/* Price & Actions */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-[10px] uppercase text-slate-500 font-semibold block">Price</span>
                      <span className="text-sm font-bold text-red-400">
                        {product.price > 0 ? `${product.price} QAR` : 'On Request'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditProduct(product)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id, product.name)}
                        className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
                <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-300 font-medium">No products match your search.</p>
                <p className="text-slate-500 text-xs mt-1">Try searching another term or change category filter.</p>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: CATEGORIES MANAGER */}
        {/* ================================================================= */}
        {activeTab === 'categories' && (
          <div className="space-y-6 max-w-4xl">
            {/* Add Category Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-2">Add New Product Category</h2>
              <p className="text-xs text-slate-400 mb-4">
                Categories help customers filter equipment on the catalog page.
              </p>
              <form onSubmit={handleAddCategory} className="flex gap-3">
                <input
                  type="text"
                  required
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g. Foam Systems, Hose Reels, Gas Suppression"
                  className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-medium transition-all shadow-md shadow-red-600/20 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </button>
              </form>
            </div>

            {/* Existing Categories Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="font-semibold text-white text-sm">Active Categories ({categories.length})</h3>
              </div>
              <div className="divide-y divide-slate-800">
                {categories.map((c) => {
                  const count = products.filter((p) => p.category.toLowerCase() === c.name.toLowerCase()).length;
                  return (
                    <div key={c._id} className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-800/40">
                      <div className="flex items-center gap-3">
                        <Layers className="w-4 h-4 text-red-400" />
                        <span className="font-medium text-white text-sm">{c.name}</span>
                        <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                          {count} {count === 1 ? 'product' : 'products'}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteCategory(c._id, c.name)}
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: COMPANY SETTINGS */}
        {/* ================================================================= */}
        {activeTab === 'settings' && settings && (
          <div className="max-w-3xl">
            <form onSubmit={handleSaveSettings} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white">Company Contact & Details</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Changes saved here instantly update across the website header, footer, and contact page.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={settings.companyName}
                      onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Official Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Hotline / Office Phone
                  </label>
                  <div className="relative">
                    <PhoneCall className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    WhatsApp Number
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={settings.whatsapp}
                      onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Office Address (English)
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={settings.address_en}
                      onChange={(e) => setSettings({ ...settings, address_en: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Working Hours
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={settings.workingHours_en}
                      onChange={(e) => setSettings({ ...settings, workingHours_en: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-red-600/20 flex items-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>Save Settings Live</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: LEADS & RFQs INBOX */}
        {/* ================================================================= */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Quotation Enquiries Inbox</h2>
                <p className="text-xs text-slate-400 mt-1">
                  All quote requests submitted through the website RFQ modal.
                </p>
              </div>
              <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300 border border-slate-700">
                Total Leads: {leads.length}
              </span>
            </div>

            {leads.length === 0 ? (
              <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl">
                <Inbox className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-300 font-medium">No quotation leads received yet.</p>
                <p className="text-slate-500 text-xs mt-1">
                  When visitors click &quot;Enquire Quote&quot; on products, their inquiries will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-base">{lead.customerName}</span>
                          {lead.companyName && (
                            <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                              {lead.companyName}
                            </span>
                          )}
                          <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-red-500/10 text-red-400 border border-red-500/20">
                            {lead.refId}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Received: {new Date(lead.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Qatar' })}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${lead.customerPhone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Chat on WhatsApp</span>
                        </a>
                        <a
                          href={`tel:${lead.customerPhone}`}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition-colors"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Call</span>
                        </a>
                      </div>
                    </div>

                    <div className="pt-3">
                      <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block mb-2">
                        Requested Products ({lead.items?.length || 0}):
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {lead.items?.map((item, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-800/80 border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2"
                          >
                            <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 font-bold flex items-center justify-center text-[10px]">
                              {item.quantity}x
                            </span>
                            <span className="text-slate-200 font-medium">{item.name}</span>
                            <span className="text-[10px] text-slate-500">({item.category})</span>
                          </div>
                        ))}
                      </div>

                      {lead.notes && (
                        <p className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl mt-3 border border-slate-800">
                          <strong className="text-slate-300">Customer Notes:</strong> {lead.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 5: DATABASE & CLOUD SYNC */}
        {/* ================================================================= */}
        {activeTab === 'database' && (
          <div className="max-w-3xl space-y-6">
            {/* Status Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      usingCloudDb
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Database Status</h2>
                    <p className="text-xs text-slate-400">
                      {usingCloudDb
                        ? 'Connected to Supabase PostgreSQL Cloud Database'
                        : 'Currently using local JSON file storage (Fallback mode)'}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    usingCloudDb
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {usingCloudDb ? 'Cloud Active ⚡' : 'Local Fallback'}
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2 mb-6">
                <p>
                  <strong>How it works:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li>
                    When deployed on Vercel, Supabase provides persistent cloud storage so changes stay forever.
                  </li>
                  <li>
                    Click the <strong>&quot;Sync 123 Products to Cloud&quot;</strong> button below to copy all original products into Supabase.
                  </li>
                  <li>
                    Every time you edit or add a product, Next.js purges cache in 1 second.
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleSeedDatabase}
                  disabled={isSeeding}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2 disabled:opacity-50"
                >
                  {isSeeding ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <UploadCloud className="w-4 h-4" />
                  )}
                  <span>Sync 123 Products to Cloud</span>
                </button>

                <a
                  href="/api/admin/products"
                  download="htc_products_backup.json"
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-medium transition-colors border border-slate-700 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Catalog Backup (JSON)</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =================================================================== */}
      {/* PRODUCT ADD / EDIT MODAL */}
      {/* =================================================================== */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-red-500" />
                <h3 className="font-bold text-white text-base">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Fire Hose Reel 25m Drum Type"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {categories.map((c) => (
                      <option key={c._id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Price (QAR)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    placeholder="0 for Quote on Request"
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Product Image
                </label>

                {/* Upload from Computer Box */}
                <div className="bg-slate-850 border-2 border-dashed border-slate-700 hover:border-red-500/50 rounded-2xl p-4 transition-all text-center">
                  {productForm.image ? (
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-20 h-20 bg-white rounded-xl p-1.5 border border-slate-700 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                        <img
                          src={productForm.image}
                          alt="Product Preview"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Image Ready
                        </span>
                        <p className="text-[11px] text-slate-400 truncate font-mono mb-2">
                          {productForm.image}
                        </p>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="image-file-input"
                            className="cursor-pointer px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-600 transition-colors inline-flex items-center gap-1.5"
                          >
                            <Upload className="w-3 h-3" />
                            <span>Replace Photo</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => setProductForm({ ...productForm, image: '' })}
                            className="px-2.5 py-1 text-red-400 hover:bg-red-500/10 text-xs rounded-lg transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {isUploadingImage ? (
                        <div className="py-6 flex flex-col items-center gap-2">
                          <RefreshCw className="w-8 h-8 text-red-500 animate-spin" />
                          <p className="text-xs text-slate-300 font-medium">
                            Uploading image to Cloud Storage...
                          </p>
                        </div>
                      ) : (
                        <label
                          htmlFor="image-file-input"
                          className="cursor-pointer py-4 flex flex-col items-center justify-center gap-2 block group"
                        >
                          <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 group-hover:scale-110 transition-transform flex items-center justify-center border border-red-500/20">
                            <Upload className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                              Click to Upload Photo from Computer
                            </span>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              Supports JPG, PNG, WebP (Max 10MB)
                            </p>
                          </div>
                        </label>
                      )}
                    </div>
                  )}

                  <input
                    id="image-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploadingImage}
                    className="hidden"
                  />
                </div>

                {/* Optional Image URL Toggle */}
                <details className="mt-2 text-xs text-slate-400">
                  <summary className="cursor-pointer hover:text-slate-200 font-medium select-none">
                    Or enter image link manually
                  </summary>
                  <input
                    type="url"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    placeholder="https://... image link"
                    className="w-full mt-2 px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
                  />
                </details>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Description / QCDD Specs
                </label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Civil Defence approval, dimensions, specifications..."
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-medium transition-all shadow-md shadow-red-600/20 flex items-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>{editingProduct ? 'Save Changes' : 'Publish Product'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
