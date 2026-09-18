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
  category: { type: String, required: true },
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

function buildDescription(name, casNumber, category) {
  const casPart = casNumber && casNumber !== 'N/A'
    ? `CAS registry number ${casNumber}`
    : 'CAS registry number not available or not assigned';

  if (category.toLowerCase() === 'research chemicals') {
    return `${name} is a high-purity analytical reference standard intended for laboratory research and forensic applications. Identified by ${casPart}, this compound is supplied as a stable reference material suitable for analytical method development, identification, and comparative studies.\n\n` +
      `Each batch is prepared and handled under controlled conditions to support reproducible results in analytical chemistry, toxicology, and pharmacology workflows. The material should be used exclusively for in-vitro research, method validation, reference spectrum generation, and related scientific purposes, and is not intended for human or veterinary consumption, diagnostic use, or any clinical application.\n\n` +
      `Researchers should store this compound in a cool, dry, and light-protected environment according to best practices for sensitive reference materials. All work should be conducted in a controlled laboratory setting with appropriate personal protective equipment, engineering controls, and waste-disposal procedures, and should comply with applicable local, national, and institutional regulations for scheduled or bioactive substances.`;
  }

  if (category.toLowerCase() === 'psychedelic drugs') {
    return `${name} is a high-purity analytical reference standard supplied for neurochemical, pharmacological, and forensic research. ${casPart}. This compound is intended for in-vitro and analytical studies that investigate receptor interactions, structure-activity relationships, and comparative profiling.\n\n` +
      `The material is produced under controlled conditions to ensure batch-to-batch consistency and is suitable for analytical method development, reference-spectrum generation, and controlled laboratory investigations. It is not intended for human or veterinary consumption, self-administration, diagnostic use, or any clinical application.\n\n` +
      `Handling should be limited to qualified researchers in an appropriately equipped laboratory with suitable personal protective equipment, containment, and waste-disposal protocols. All activities must comply with applicable local, national, and institutional regulations governing controlled substances and psychoactive research materials.`;
  }

  // anabolic steroids / fallback
  return `${name} is a reference-standard preparation supplied for laboratory research, analytical method development, and comparative studies. ${casPart}, this reference standard is intended for analytical and comparative studies of anabolic-androgenic or related pharmaceutical compounds.\n\n` +
    `The product is produced and stored under controlled conditions to maintain batch consistency and is suitable for identity confirmation, purity profiling, and reference-spectrum generation in forensic, clinical-research, and analytical-chemistry workflows. It is not intended for human or veterinary administration, diagnostic use, cosmetic application, or consumption of any kind.\n\n` +
    `Handling should be restricted to qualified personnel in a properly equipped laboratory. Use appropriate personal protective equipment, containment, and disposal procedures, and ensure full compliance with all local, national, and institutional regulations governing controlled, scheduled, or pharmaceutical-reference substances.`;
}

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

async function extendDescriptions() {
  try {
    const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
    const products = await Product.find({});
    console.log(`Found ${products.length} products`);

    let updated = 0;
    for (const product of products) {
      const desc = product.description || '';
      if (desc.length < 300) {
        const newDescription = buildDescription(product.name, product.casNumber || 'N/A', product.category);
        await Product.updateOne(
          { _id: product._id },
          { $set: { description: newDescription } }
        );
        updated++;
        console.log(`Updated description for ${product.name}`);
      }
    }

    console.log(`Updated ${updated} product descriptions`);
  } catch (error) {
    console.error('Error extending descriptions:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

connectToDatabase()
  .then(() => extendDescriptions())
  .catch(console.error);
