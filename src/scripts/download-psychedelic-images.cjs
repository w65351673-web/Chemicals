const axios = require('axios');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, '../../public/images/products');

// Map your product slugs to neochems.com product pages
const products = [
  { slug: '1p-lsd', url: 'https://www.neochems.com/product/1p-lsd/' },
  { slug: 'ayahuasca', url: 'https://www.neochems.com/product/ayahuasca-retreat-california/' },
  { slug: 'dmt', url: 'https://www.neochems.com/product/buy-dmt/' },
  { slug: 'golden-teacher-mushroom', url: 'https://www.neochems.com/product/golden-teacher-mushroom/' },
  { slug: 'dmt-changa', url: 'https://www.neochems.com/product/dmt-changa/' },
  { slug: 'ibogaine', url: 'https://www.neochems.com/product/ibogaine-for-sale/' },
  { slug: 'ketamine-vials', url: 'https://www.neochems.com/product/ketamine-horse-tranquilizer/' },
  { slug: 'kratom-powder', url: 'https://www.neochems.com/product/kratom-near-me/' },
  { slug: 'liberty-cap-mushrooms', url: 'https://www.neochems.com/product/liberty-cap-mushrooms/' },
  { slug: 'liquid-lsd', url: 'https://www.neochems.com/product/lsd-buy/' },
  { slug: 'mdma', url: 'https://www.neochems.com/product/mdma-buy/' },
  { slug: 'mescaline-powder', url: 'https://www.neochems.com/product/mescalin/' },
  { slug: 'morning-glory-seeds', url: 'https://www.neochems.com/product/morning-glory-leaves/' },
  { slug: 'penis-envy-mushrooms', url: 'https://www.neochems.com/product/penis-envy-mushrooms/' },
  { slug: 'cubensis', url: 'https://www.neochems.com/product/b-cubensis/' },
  { slug: 'boga', url: 'https://www.neochems.com/product/iboga-for-sale/' },
];

async function downloadImage(imageUrl, filePath) {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer', timeout: 15000 });
  fs.writeFileSync(filePath, response.data);
}

function extractProductImage(html) {
  const ogMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
  if (ogMatch) return ogMatch[1];

  const wcMatch = html.match(/<div[^>]*class="[^"]*woocommerce-product-gallery__image[^"]*"[^>]*>[\s\S]*?<img[^>]+src=["']([^"']+)["']/i);
  if (wcMatch) return wcMatch[1];

  const imgMatch = html.match(/<img[^>]+class="[^"]*wp-post-image[^"]*"[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) return imgMatch[1];

  return null;
}

function getExtension(url) {
  const cleaned = url.split('?')[0];
  const ext = path.extname(cleaned);
  return ext || '.jpg';
}

async function main() {
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
}

main().catch(console.error);
