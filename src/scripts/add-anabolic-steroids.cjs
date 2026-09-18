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
    ? `Catalogued under CAS registry number ${casNumber}, this reference standard is intended for analytical and comparative studies of anabolic-androgenic compounds.`
    : `This reference standard is intended for analytical and comparative studies of anabolic-androgenic compounds (CAS registry number not available or not assigned).`;

  return `${name} is a reference-standard preparation supplied for laboratory research, analytical method development, and comparative studies. ${casLine}\n\n` +
    `The product is produced and stored under controlled conditions to maintain batch consistency and is suitable for identity confirmation, purity profiling, and reference-spectrum generation in forensic, clinical-research, and analytical-chemistry workflows. ` +
    `It is not intended for human or veterinary administration, diagnostic use, cosmetic application, or consumption of any kind.\n\n` +
    `Handling should be restricted to qualified personnel in a properly equipped laboratory. Use appropriate personal protective equipment, containment, and disposal procedures, and ensure full compliance with all local, national, and institutional regulations governing controlled, scheduled, or pharmaceutical-reference substances.`;
}

const anabolicProducts = [
  {
    name: '1-Test-Cyp 200',
    casNumber: '65-06-5',
    price: 220,
    description: '1-Testosterone Cypionate (DHB) 200mg/ml injectable solution. CAS 65-06-5. For laboratory research only.',
  },
  {
    name: 'AICAR 50mg',
    casNumber: '2627-69-2',
    price: 55,
    description: 'AICAR (Acadesine) 50mg research peptide, AMPK activator. CAS 2627-69-2. For laboratory research only.',
  },
  {
    name: 'Primobolan Depot',
    casNumber: '303-42-4',
    price: 140,
    description: 'Methenolone Enanthate 100mg/ml 10ml injectable. CAS 303-42-4. For laboratory research only.',
  },
  {
    name: 'Anadrol-50',
    casNumber: '434-07-1',
    price: 60,
    description: 'Oxymetholone 50mg oral tablets, 100 tablets. CAS 434-07-1. For laboratory research only.',
  },
  {
    name: 'Anapolon',
    casNumber: '434-07-1',
    price: 50,
    description: 'Oxymetholone 50mg oral tablets. CAS 434-07-1. For laboratory research only.',
  },
  {
    name: 'ACKS 60 Tabs Pack',
    casNumber: 'N/A',
    price: 120,
    description: 'Multi-compound oral tablet blend, 60 tablets. CAS N/A. For laboratory research only.',
  },
  {
    name: 'Anastrozole',
    casNumber: '120511-73-1',
    price: 50,
    description: 'Anastrozole 1mg oral tablets, 30 tablets. Aromatase inhibitor. CAS 120511-73-1. For laboratory research only.',
  },
  {
    name: 'Astralean',
    casNumber: '21898-19-1',
    price: 20,
    description: 'Clenbuterol Hydrochloride 40mcg oral tablets, 50 tablets. CAS 21898-19-1. For laboratory research only.',
  },
  {
    name: 'Dianabol',
    casNumber: '72-63-9',
    price: 18,
    description: 'Methandrostenolone 10mg oral tablets, 100 tablets. CAS 72-63-9. For laboratory research only.',
  },
  {
    name: 'Fentanyl Injection',
    casNumber: '990-73-8',
    price: 25,
    description: 'Fentanyl Citrate injectable solution. CAS 990-73-8. For licensed laboratory/analytical research only.',
  },
  {
    name: 'Induject-250',
    casNumber: 'N/A',
    price: 55,
    description: 'Testosterone blend (Sustanon 250) 250mg/ml, 10 ampoules. CAS N/A (testosterone mixture). For laboratory research only.',
  },
  {
    name: 'Scopolamine Hydrobromide',
    casNumber: '114-49-8',
    price: 40,
    description: 'Scopolamine Hydrobromide injectable/lyophilized powder. CAS 114-49-8. For laboratory research only.',
  },
  {
    name: 'Winstrol',
    casNumber: '10418-03-8',
    price: 40,
    description: 'Stanozolol 10mg oral tablets, 100 tablets. CAS 10418-03-8. For laboratory research only.',
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
      'primobolan-depot',
      'anadrol-50',
      'dianabol',
      'winstrol',
      'induject-250',
    ]);

    const productsData = anabolicProducts.map((item) => {
      const slug = slugify(item.name);
      return {
        name: item.name,
        slug,
        casNumber: item.casNumber,
        category: 'anabolic steroids',
        images: ['/images/products/anabolic-steroid.jpg'],
        description: buildDescription(item.name, item.casNumber),
        price: item.price,
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
