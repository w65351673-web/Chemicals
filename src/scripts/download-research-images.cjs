const axios = require('axios');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, '../../public/images/products');

// Map product slugs to neochems.com product pages
const products = [
  { slug: '4mmc', url: 'https://www.neochems.com/product/buy-mephedrone-online/' },
  { slug: '3mmc', url: 'https://www.neochems.com/product/buy-3-mmc-online/' },
  { slug: '3cmc', url: 'https://www.neochems.com/product/3-cmc/' },
  { slug: '4cmc', url: 'https://www.neochems.com/product/4-cmc/' },
  { slug: 'apvp', url: 'https://www.neochems.com/product/apvp/' },
  { slug: 'crystal-meth', url: 'https://www.neochems.com/product/crystal-meth/' },
  { slug: 'a-pihp', url: 'https://www.neochems.com/product/a-pihp/' },
  { slug: '2fdck', url: 'https://www.neochems.com/product/2-fdck/' },
  { slug: 'u-47700', url: 'https://www.neochems.com/product/buy-u-47700/' },
  { slug: 'mdpv', url: 'https://www.neochems.com/product/mdpv/' },
  { slug: '1h-indol-3-yl', url: 'https://www.neochems.com/product/1h-indol-3-yl/' },
  { slug: '2-chlorophenyl', url: 'https://www.neochems.com/product/2-chlorophenyl/' },
  { slug: '2-nmc', url: 'https://www.neochems.com/product/2-nmc/' },
  { slug: '23-mdpv', url: 'https://www.neochems.com/product/buy-23-mdpv-online/' },
  { slug: '25b-nbf', url: 'https://www.neochems.com/product/25b-nbf/' },
  { slug: '25i-nbmd', url: 'https://www.neochems.com/product/25i-nbmd/' },
  { slug: '2c-b', url: 'https://www.neochems.com/product/2c-b/' },
  { slug: '2c-c', url: 'https://www.neochems.com/product/2c-c/' },
  { slug: '2ce', url: 'https://www.neochems.com/product/2ce/' },
  { slug: '2c-h', url: 'https://www.neochems.com/product/2c-h/' },
  { slug: '2ci', url: 'https://www.neochems.com/product/2ci/' },
  { slug: '2c-t-2', url: 'https://www.neochems.com/product/2c-t-2/' },
  { slug: '3-fmc-3-fluoromethcathinone', url: 'https://www.neochems.com/product/3-fmc-3-fluoromethcathinone/' },
  { slug: '3-fpm', url: 'https://www.neochems.com/product/3-fpm/' },
  { slug: '4-aco-dmt', url: 'https://www.neochems.com/product/4-aco-dmt/' },
  { slug: '4-cec', url: 'https://www.neochems.com/product/4-cec/' },
  { slug: '4-cl-pvp-crystals', url: 'https://www.neochems.com/product/4-cl-pvp-crystals/' },
  { slug: '4-cprc', url: 'https://www.neochems.com/product/4-cprc/' },
  { slug: '4-fmc', url: 'https://www.neochems.com/product/4-fmc-online10g/' },
  { slug: '4f-pv-9', url: 'https://www.neochems.com/product/4f-pv-9/' },
  { slug: '5f-sgt-151', url: 'https://www.neochems.com/product/5f-sgt-151/' },
  { slug: 'mdphp', url: 'https://www.neochems.com/product/mdphp/' },
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
  const results = [];

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
        results.push({ slug: product.slug, ext: 'jpg', ok: false });
        continue;
      }

      const ext = getExtension(imageUrl);
      const filename = `${product.slug}${ext}`;
      const filePath = path.join(OUTPUT_DIR, filename);

      console.log(`  Downloading: ${imageUrl}`);
      await downloadImage(imageUrl, filePath);
      console.log(`  ✓ Saved: ${filename}`);
      results.push({ slug: product.slug, ext: ext.replace('.', ''), ok: true });
      success++;
    } catch (err) {
      console.error(`  ✗ Error for ${product.slug}: ${err.message}`);
      results.push({ slug: product.slug, ext: 'jpg', ok: false });
      failed++;
    }
  }

  console.log(`\nDone! ${success} downloaded, ${failed} failed.`);
  console.log('\nImage extensions for seed script:');
  for (const r of results) {
    if (r.ok) console.log(`  ${r.slug} => ${r.ext}`);
  }
}

main().catch(console.error);
