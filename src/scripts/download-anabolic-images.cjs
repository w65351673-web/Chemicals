const axios = require('axios');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, '../../public/images/products');

// Product pages from neochems.com anabolic steroids category
const products = [
  { slug: '1-test-cyp-200', url: 'https://www.neochems.com/product/1-test-cyp-200/' },
  { slug: 'aicar', url: 'https://www.neochems.com/product/buy-aicar-online/' },
  { slug: 'alphabolin', url: 'https://www.neochems.com/product/primobolan-for-sale/' },
  { slug: 'anadrol-50', url: 'https://www.neochems.com/product/anadrol-50/' },
  { slug: 'anapolon', url: 'https://www.neochems.com/product/anapolon3packs-60-tabs-pack/' },
  { slug: 'anastrozole', url: 'https://www.neochems.com/product/anastrozole/' },
  { slug: 'astralean', url: 'https://www.neochems.com/product/buy-astralean-online/' },
  { slug: 'dianabol', url: 'https://www.neochems.com/product/dianabol/' },
  { slug: 'fentanyl', url: 'https://www.neochems.com/product/fentanyl-injection/' },
  { slug: 'induject-250', url: 'https://www.neochems.com/product/induject-250/' },
  { slug: 'scopolamine-hydrobromide-capsules', url: 'https://www.neochems.com/product/scopolamine-hydrobromide/' },
  { slug: 'winstrol', url: 'https://www.neochems.com/product/buy-winstrol/' },
];

async function downloadImage(imageUrl, filePath) {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer', timeout: 15000 });
  fs.writeFileSync(filePath, response.data);
}

function extractProductImage(html) {
  // Look for the main WooCommerce product image inside the product gallery
  // Pattern 1: og:image meta tag (most reliable)
  const ogMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
  if (ogMatch) return ogMatch[1];

  // Pattern 2: WooCommerce product image in the gallery
  const wcMatch = html.match(/<div[^>]*class="[^"]*woocommerce-product-gallery__image[^"]*"[^>]*>[\s\S]*?<img[^>]+src=["']([^"']+)["']/i);
  if (wcMatch) return wcMatch[1];

  // Pattern 3: Any large product image
  const imgMatch = html.match(/<img[^>]+class="[^"]*wp-post-image[^"]*"[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) return imgMatch[1];

  // Pattern 4: data-src (lazy loaded)
  const lazyMatch = html.match(/<div[^>]*class="[^"]*woocommerce-product-gallery__image[^"]*"[^>]*>[\s\S]*?<img[^>]+data-src=["']([^"']+)["']/i);
  if (lazyMatch) return lazyMatch[1];

  return null;
}

function getExtension(url) {
  const cleaned = url.split('?')[0];
  const ext = path.extname(cleaned);
  return ext || '.jpg';
}

async function main() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created directory: ${OUTPUT_DIR}`);
  }

  let success = 0;
  let failed = 0;

  for (const product of products) {
    try {
      console.log(`Fetching page: ${product.slug}...`);
      const { data: html } = await axios.get(product.url, {
        timeout: 15000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      });

      const imageUrl = extractProductImage(html);
      if (!imageUrl) {
        console.log(`  ✗ No image found for ${product.slug}`);
        failed++;
        continue;
      }

      const ext = getExtension(imageUrl);
      const filename = `${product.slug}${ext}`;
      const filePath = path.join(OUTPUT_DIR, filename);

      console.log(`  Downloading: ${imageUrl}`);
      await downloadImage(imageUrl, filePath);
      console.log(`  ✓ Saved: ${filename}`);
      success++;
    } catch (err) {
      console.error(`  ✗ Error for ${product.slug}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone! ${success} downloaded, ${failed} failed.`);

  // Print the image paths for use in the seed script
  console.log('\nImage paths for the seed script:');
  for (const product of products) {
    const files = fs.readdirSync(OUTPUT_DIR).filter(f => f.startsWith(product.slug));
    if (files.length > 0) {
      console.log(`  '${product.slug}': '/images/products/${files[0]}'`);
    }
  }
}

main().catch(console.error);
