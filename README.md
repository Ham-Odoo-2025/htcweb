# Hamilton Trading & Contracting W.L.L (HTC Fire Qatar)

> Modern, High-Performance, Bilingual (EN/AR), SEO-Optimized Next.js Website ready for deployment to **Vercel**.

## Features & Optimizations

- **1:1 Content & Asset Fidelity**: All 123 products across 19 categories, 13 QCDD approved services with subpages, 42 branding & client assets, and news releases.
- **Bilingual (English & Arabic)**: Dynamic locale routing (`/en`, `/ar`) with Cairo font, Arabic typography, and full RTL layout.
- **Vercel & Edge Optimized**:
  - Incremental Static Regeneration (ISR) and static page pre-rendering (83 static routes).
  - Global Edge Caching headers (`s-maxage=31536000, stale-while-revalidate`).
  - Next.js Image optimization with WebP/AVIF support.
- **SEO & Search Enhancements**:
  - Dynamic `sitemap.xml` and `robots.txt` covering all localized routes.
  - JSON-LD Structured Data (`LocalBusiness`, `Organization`, `Service`, `FAQPage`).
  - Per-page OpenGraph cards, Twitter preview tags, and canonical / hreflang tags.
- **Conversion-Driven UX**:
  - Instant WhatsApp enquiry buttons for leadership team and individual products.
  - Mobile responsive navigation with services mega menu.
  - Interactive Google Maps embed and contact inquiry API.

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start
```

---

## Deploying to Vercel

### Method 1: Via Vercel CLI (Fastest)

```bash
# Install Vercel CLI globally if not installed
npm install -g vercel

# Deploy directly from this directory
vercel
```

### Method 2: Via GitHub (Recommended for CI/CD)

1. Initialize git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: HTC Fire Qatar Vercel-ready Next.js website"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Open [vercel.com](https://vercel.com), click **Add New Project**, import the GitHub repository, and click **Deploy**.
3. Point domain DNS `htc-fire.com` (A record to `76.76.21.21` or CNAME `cname.vercel-dns.com`) in your GoDaddy DNS settings.
