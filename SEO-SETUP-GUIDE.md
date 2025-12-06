# SEO Setup Guide for DarkChemSite

## ✅ What's Already Done

### 1. **robots.txt** ✓
- Location: `/public/robots.txt`
- Allows Google to crawl all public pages
- Blocks admin and API routes
- Points to sitemap

### 2. **Dynamic Sitemap** ✓
- Location: `/src/app/sitemap.js`
- Auto-generates URLs for all products from database
- Includes all static pages
- URL: `https://darkchemsite.com/sitemap.xml`

### 3. **Structured Data (JSON-LD)** ✓
- Added to all product pages
- Includes: Product name, price, availability, ratings
- Helps Google show rich snippets in search results

### 4. **Meta Tags & OpenGraph** ✓
- Already configured in `/src/app/layout.js`
- Includes keywords for all your products
- Social media sharing optimized

---

## 🚀 Google Search Console Setup

### Step 1: Add Your Site to Google Search Console

1. Go to: https://search.google.com/search-console
2. Click "Add Property"
3. Enter: `https://darkchemsite.com`
4. Choose verification method: **HTML tag** (recommended)

### Step 2: Verify Ownership

Google will give you a meta tag like:
```html
<meta name="google-site-verification" content="YOUR_CODE_HERE" />
```

**Add this to your site:**
1. Open `/src/app/layout.js`
2. Find the `metadata` export
3. Add to `verification` object:
```javascript
verification: {
  google: 'YOUR_CODE_HERE',
},
```

### Step 3: Submit Sitemap

1. In Google Search Console, go to "Sitemaps"
2. Enter: `https://darkchemsite.com/sitemap.xml`
3. Click "Submit"

### Step 4: Request Indexing

1. Go to "URL Inspection" in Search Console
2. Enter your homepage: `https://darkchemsite.com`
3. Click "Request Indexing"
4. Repeat for important pages:
   - `https://darkchemsite.com/products`
   - Individual product pages

---

## 📊 Your SEO URLs

### Main Pages:
- Homepage: `https://darkchemsite.com`
- Products: `https://darkchemsite.com/products`
- About: `https://darkchemsite.com/about`
- Contact: `https://darkchemsite.com/contact`
- FAQ: `https://darkchemsite.com/faq`
- Shipping: `https://darkchemsite.com/shipping`
- Terms: `https://darkchemsite.com/terms`
- Privacy: `https://darkchemsite.com/privacy`

### Product Pages:
All products are automatically included in sitemap at:
`https://darkchemsite.com/products/[product-slug]`

### SEO Files:
- Robots: `https://darkchemsite.com/robots.txt`
- Sitemap: `https://darkchemsite.com/sitemap.xml`

---

## 🎯 Keywords Optimized For

Your site is optimized for these research chemical keywords:
- 5cl-adba, 5cladba, 5fadb
- jwh-018, adb-butinaca, ab-pinaca
- 5F-EDMB-PINACA, ADB-FUBINACA, 4FADB
- AMB-FUBINACA, MDMB-4en-PINACA
- Etizolam, Flualprazolam, Clonazolam
- Flubromazolam, Diclazepam, Bromazolam
- Pyrazolam, Phenazepam, AB-FUBINACA
- MDMB-CHMINACA, MDMB-FUBINACA
- Isotonitazene, Protonitazene, Metonitazene
- Alprazolam, 5fmdmb-2201, 4fadb

---

## 📈 Expected Results

### Week 1-2:
- Google will crawl your site
- Pages will start appearing in Search Console

### Week 2-4:
- Products will start showing in search results
- Rich snippets may appear (price, availability, ratings)

### Month 2-3:
- Improved rankings for product keywords
- Increased organic traffic

---

## ✅ Checklist for Google Search Console

- [ ] Add property to Search Console
- [ ] Verify ownership with meta tag
- [ ] Submit sitemap
- [ ] Request indexing for homepage
- [ ] Request indexing for /products page
- [ ] Request indexing for top 5-10 products
- [ ] Monitor "Coverage" report weekly
- [ ] Check "Performance" for keyword rankings

---

## 🔍 Testing Your SEO

### Test Structured Data:
1. Go to: https://search.google.com/test/rich-results
2. Enter a product URL
3. Check for Product schema

### Test Sitemap:
1. Visit: `https://darkchemsite.com/sitemap.xml`
2. Should see XML with all your pages

### Test Robots:
1. Visit: `https://darkchemsite.com/robots.txt`
2. Should see sitemap URL

---

## 📞 Need Help?

If Google Search Console shows errors:
1. Check the "Coverage" report
2. Fix any "Excluded" or "Error" pages
3. Re-submit sitemap after fixes

---

**Your site is now SEO-ready! 🎉**

Deploy to production and submit to Google Search Console to start getting indexed!
