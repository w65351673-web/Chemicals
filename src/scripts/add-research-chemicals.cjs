const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  casNumber: { type: String, default: '' },
  category: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return ['anabolic steroids', 'psychedelic drugs', 'research chemicals'].includes(v.toLowerCase());
      },
      message: props => `${props.value} is not a valid category`,
    },
  },
  images: [{ type: String }],
  description: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  countInStock: { type: Number, required: true, default: 0 },
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function buildDescription(name, casNumber) {
  const casLine = casNumber && casNumber !== 'N/A'
    ? `Identified by CAS registry number ${casNumber}, this compound is supplied as a stable reference material suitable for analytical method development, identification, and comparative studies.`
    : `This compound is supplied as a stable reference material suitable for analytical method development, identification, and comparative studies (CAS registry number not available or not assigned).`;

  return `${name} is a high-purity analytical reference standard intended for laboratory research and forensic applications. ${casLine}\n\n` +
    `Each batch is prepared and handled under controlled conditions to support reproducible results in analytical chemistry, toxicology, and pharmacology workflows. ` +
    `The material should be used exclusively for in-vitro research, method validation, reference spectrum generation, and related scientific purposes, and is not intended for human or veterinary consumption, diagnostic use, or any clinical application.\n\n` +
    `Researchers should store this compound in a cool, dry, and light-protected environment according to best practices for sensitive reference materials. ` +
    `All work should be conducted in a controlled laboratory setting with appropriate personal protective equipment, engineering controls, and waste-disposal procedures, and should comply with applicable local, national, and institutional regulations for scheduled or bioactive substances.`;
}

const researchChemicals = [
  { name: '4MMC', casNumber: '1189805-46-6' },
  { name: '3MMC', casNumber: '1246911-86-3' },
  { name: '3CMC', casNumber: '1049677-59-9' },
  { name: '4CMC', casNumber: '1225843-86-6' },
  { name: 'APVP', casNumber: '14530-33-7' },
  { name: 'Crystal Meth', casNumber: '537-46-2' },
  { name: 'a-PiHP', casNumber: '2181620-71-1' },
  { name: '2FDCK', casNumber: '111982-50-4' },
  { name: 'U-47700', casNumber: '121348-98-9' },
  { name: 'MDPV', casNumber: '687603-66-3' },
  { name: '1h-indol-3-yl', casNumber: '120-72-9' },
  { name: '2-chlorophenyl', casNumber: 'N/A' },
  { name: '2-nmc', casNumber: '849642-09-7' },
  { name: '23-mdpv', casNumber: 'N/A' },
  { name: '25b-nbf', casNumber: '1391487-99-2' },
  { name: '25i-nbmd', casNumber: '919797-25-4' },
  { name: '2c-b', casNumber: '66142-81-2' },
  { name: '2c-c', casNumber: '88441-14-9' },
  { name: '2ce', casNumber: '71539-34-9' },
  { name: '2c-h', casNumber: '3600-86-0' },
  { name: '2ci', casNumber: '69587-11-7' },
  { name: '2c-t-2', casNumber: '207740-24-7' },
  { name: '3-fmc-3-fluoromethcathinone', casNumber: '1049677-77-1' },
  { name: '3-fpm', casNumber: '1350768-28-3' },
  { name: '4-aco-dmt', casNumber: '92292-84-7' },
  { name: '4-cec', casNumber: '14919-85-8' },
  { name: '4-cl-pvp-crystals', casNumber: '5881-77-6' },
  { name: '4-cprc', casNumber: '82723-02-2' },
  { name: '4-fmc', casNumber: '447-40-5' },
  { name: '4f-pv-9', casNumber: 'N/A' },
  { name: '5f-sgt-151', casNumber: '2377403-49-9' },
];

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

async function addResearchChemicals() {
  try {
    const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

    const featuredSlugs = new Set([
      '4mmc',
      '3mmc',
      '2-fdck',
      '4-aco-dmt',
      'u-47700',
      '5f-sgt-151',
    ]);

    const productsData = researchChemicals.map((item) => {
      const name = item.name;
      const slug = slugify(name);
      return {
        name,
        slug,
        casNumber: item.casNumber,
        category: 'research chemicals',
        images: ['/images/products/research-chemical.jpg'],
        description: buildDescription(name, item.casNumber),
        price: 50,
        countInStock: 100,
        rating: 0,
        numReviews: 0,
        featured: featuredSlugs.has(slug),
      };
    });

    let inserted = 0;
    let updated = 0;

    for (const productData of productsData) {
      const result = await Product.updateOne(
        { slug: productData.slug },
        { $set: productData },
        { upsert: true }
      );

      if (result.upsertedCount > 0) inserted++;
      else if (result.matchedCount > 0) updated++;
    }

    console.log(`Inserted ${inserted} new products`);
    console.log(`${updated} products were updated`);
    console.log('Research chemicals seeding completed successfully');
  } catch (error) {
    console.error('Error seeding research chemicals:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

connectToDatabase()
  .then(() => addResearchChemicals())
  .catch(console.error);
