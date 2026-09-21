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
  priceVariants: [{
    _id: { type: String, required: true },
    label: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true, default: 0 },
  }],
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

function buildDescription(item) {
  const mfr = item.manufacturer && item.manufacturer !== 'N/A'
    ? `Manufactured by ${item.manufacturer}. ` : '';
  const sub = item.activeSubstance
    ? `Active substance: ${item.activeSubstance}. ` : '';
  const str = item.strength
    ? `Strength: ${item.strength}. ` : '';
  const unit = item.unit
    ? `Unit: ${item.unit}. ` : '';

  return `${item.name} – ${mfr}${sub}${str}${unit}\n\n` +
    `This product is produced and stored under controlled conditions to maintain batch consistency and is suitable for identity confirmation, purity profiling, and reference-spectrum generation in forensic, clinical-research, and analytical-chemistry workflows. ` +
    `It is not intended for human or veterinary administration, diagnostic use, cosmetic application, or consumption of any kind.\n\n` +
    `Handling should be restricted to qualified personnel in a properly equipped laboratory. Use appropriate personal protective equipment, containment, and disposal procedures, and ensure full compliance with all local, national, and institutional regulations governing controlled, scheduled, or pharmaceutical-reference substances.`;
}

const anabolicProducts = [
  {
    name: '1-TEST CYP 200',
    casNumber: 'N/A',
    variants: [
      { label: '1 Vial (10 mL, 200 mg/mL)', price: 210 },
      { label: '3 Vials', price: 580 },
      { label: '5 Vials', price: 920 },
      { label: '10 Vials', price: 1700 },
    ],
    unit: '10 mL vial (200 mg/mL)',
    manufacturer: 'Dragon Pharma',
    activeSubstance: 'Dihydroboldenone Cypionate',
    strength: '200 mg',
  },
  {
    name: 'AICAR',
    casNumber: 'N/A',
    variants: [
      { label: '1 Vial (50 mg)', price: 50 },
      { label: '5 Vials', price: 220 },
      { label: '10 Vials', price: 400 },
    ],
    unit: '50 mg vial',
    manufacturer: 'N/A',
    activeSubstance: '5-Aminoimidazole-4-carboxamide ribonucleotide',
    strength: '50 mg',
  },
  {
    name: 'Alphabolin',
    casNumber: 'N/A',
    variants: [
      { label: '5 Ampoules (100 mg)', price: 100 },
      { label: '10 Ampoules', price: 185 },
      { label: '20 Ampoules', price: 340 },
    ],
    unit: '5 Ampoules',
    manufacturer: 'Alpha Pharma',
    activeSubstance: 'Methenolone Enanthate',
    strength: '100 mg',
  },
  {
    name: 'Anadrol-50',
    casNumber: 'N/A',
    variants: [
      { label: '1 Pack (100 tabs, 50 mg)', price: 44 },
      { label: '3 Packs', price: 120 },
      { label: '5 Packs', price: 190 },
      { label: '10 Packs', price: 350 },
    ],
    unit: '100 tabs (50 mg/tab)',
    manufacturer: 'Meditech Pharma',
    activeSubstance: 'Oxymetholone',
    strength: '50 mg',
  },
  {
    name: 'Anapolon',
    casNumber: 'N/A',
    variants: [
      { label: '3 Packs (60 tabs/pack, 50 mg)', price: 150 },
      { label: '6 Packs', price: 280 },
      { label: '9 Packs', price: 400 },
    ],
    unit: '3 packs × 60 tabs (50 mg/tab)',
    manufacturer: 'Balkan Pharma',
    activeSubstance: 'Oxymetholone',
    strength: '50 mg',
  },
  {
    name: 'Anastrozole',
    casNumber: 'N/A',
    variants: [
      { label: '1 Pack (1 mg/tab)', price: 165 },
      { label: '3 Packs', price: 450 },
      { label: '5 Packs', price: 700 },
    ],
    unit: '1 mg/tab',
    manufacturer: 'Balkan Pharma',
    activeSubstance: 'Anastrozole',
    strength: '1 mg',
  },
  {
    name: 'Astralean',
    casNumber: 'N/A',
    variants: [
      { label: '1 Pack (40 mcg tabs)', price: 180 },
      { label: '3 Packs', price: 490 },
      { label: '5 Packs', price: 780 },
    ],
    unit: '40 mcg tabs',
    manufacturer: 'Alpha Pharma',
    activeSubstance: 'Clenbuterol Hydrochloride',
    strength: '40 mcg',
  },
  {
    name: 'Dianabol',
    casNumber: 'N/A',
    variants: [
      { label: '1 Pack (10 mg tabs)', price: 255 },
      { label: '3 Packs', price: 700 },
      { label: '5 Packs', price: 1100 },
    ],
    unit: '10 mg tabs',
    manufacturer: 'Meditech Pharma',
    activeSubstance: 'Methandienone',
    strength: '10 mg',
  },
  {
    name: 'Fentanyl',
    casNumber: 'N/A',
    variants: [
      { label: '1 Box (500 mcg/10 mL)', price: 350 },
      { label: '3 Boxes', price: 900 },
      { label: '5 Boxes', price: 1400 },
      { label: '10 Boxes', price: 2000 },
    ],
    unit: '500 mcg/10 mL injection',
    manufacturer: 'N/A',
    activeSubstance: 'Fentanyl Citrate',
    strength: '500 mcg/10 mL',
  },
  {
    name: 'Induject-250',
    casNumber: 'N/A',
    variants: [
      { label: '1 Ampoule (250 mg/mL)', price: 35 },
      { label: '5 Ampoules', price: 160 },
      { label: '10 Ampoules', price: 300 },
      { label: '20 Ampoules', price: 550 },
    ],
    unit: '250 mg/mL ampoule',
    manufacturer: 'Alpha Pharma',
    activeSubstance: 'Testosterone Blend (Propionate 30 mg, Phenylpropionate 60 mg, Isocaproate 60 mg, Decanoate 100 mg)',
    strength: '250 mg',
  },
  {
    name: 'Scopolamine Hydrobromide Capsules',
    casNumber: 'N/A',
    variants: [
      { label: '1 Bottle', price: 180 },
      { label: '3 Bottles', price: 450 },
      { label: '5 Bottles', price: 700 },
    ],
    unit: 'Capsules',
    manufacturer: 'N/A',
    activeSubstance: 'Scopolamine Hydrobromide',
    strength: 'N/A',
  },
  {
    name: 'Winstrol',
    casNumber: 'N/A',
    variants: [
      { label: '1 Vial (10 mL, 100 mg/mL)', price: 35 },
      { label: '3 Vials', price: 95 },
      { label: '5 Vials', price: 150 },
      { label: '10 Vials', price: 280 },
    ],
    unit: '10 mL vial (100 mg/mL)',
    manufacturer: 'Meditech Pharma',
    activeSubstance: 'Stanozolol',
    strength: '100 mg',
  },
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

async function addAnabolicSteroids() {
  try {
    const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

    const featuredSlugs = new Set([
      '1-test-cyp-200',
      'alphabolin',
      'anadrol-50',
      'dianabol',
      'winstrol',
      'induject-250',
    ]);

    const productsData = anabolicProducts.map((item) => {
      const slug = slugify(item.name);
      const priceVariants = item.variants.map((variant) => ({
        _id: slugify(`${slug}-${variant.label}`),
        label: variant.label,
        quantity: 1,
        price: variant.price,
      }));
      return {
        name: item.name,
        slug,
        casNumber: item.casNumber,
        category: 'anabolic steroids',
        images: [`/images/products/${slug}.jpg`],
        description: buildDescription(item),
        price: priceVariants[0]?.price || 0,
        priceVariants,
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
    console.log('Anabolic steroids seeding completed successfully');
  } catch (error) {
    console.error('Error seeding anabolic steroids:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

connectToDatabase()
  .then(() => addAnabolicSteroids())
  .catch(console.error);
