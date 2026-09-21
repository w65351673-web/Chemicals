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

function buildDescription(name, casNumber) {
  const casLine = casNumber && casNumber !== 'N/A'
    ? `Catalogued under CAS registry number ${casNumber}, this reference material is intended for analytical and comparative studies of psychoactive compounds.`
    : `This reference material is intended for analytical and comparative studies of psychoactive compounds (CAS registry number not available or not assigned).`;

  return `${name} is supplied as a high-purity reference standard for laboratory research, forensic analysis, and method development. ${casLine}\n\n` +
    `The product is prepared and stored under controlled conditions to support reproducible analytical results, including identity confirmation, purity profiling, and reference-spectrum generation. ` +
    `It is intended exclusively for in-vitro research and is not for human or veterinary consumption, diagnostic use, or any clinical application.\n\n` +
    `Handling should be restricted to qualified personnel in a properly equipped laboratory with appropriate personal protective equipment, containment, and disposal procedures, in full compliance with all applicable local, national, and institutional regulations governing controlled or bioactive substances.`;
}

const psychedelicProducts = [
  {
    name: '1P-LSD',
    casNumber: '2349386-89-4',
    imageExt: 'jpeg',
    description: '1P-LSD (1-propionyl-lysergic acid diethylamide), first synthesized in 1938, is an extremely potent hallucinogen. It is synthetically made from lysergic acid, which is found in ergot, a fungus that grows on rye and other grains. As an analogue of LSD and homologue of ALD-52, it is classified as a psychedelic substance of the lysergamide class. 1P-LSD is made by adding a propionyl group to the nitrogen molecule of LSD\'s indole. Typically, it takes 45-90 minutes to begin to feel the effects and lasts anywhere between 8-12 hours.',
    variants: [
      { label: '25 Tabs', price: 250 },
      { label: '1/2 Sheet(50 Tabs)', price: 350 },
      { label: '1 Sheet(100 Tabs)', price: 500 },
      { label: '3 Sheets', price: 1200 },
      { label: '5 Sheets', price: 1800 },
    ],
  },
  {
    name: 'Ayahuasca',
    casNumber: 'N/A',
    imageExt: 'jpg',
    description: 'Ayahuasca, also known as the tea, the vine, and la purga, is a brew made from the leaves of the Psychotria Viridis shrub along with the stalks of the Banisteriopsis caapi vine. It is an entheogenic brew used as a traditional spiritual medicine in ceremonies among the indigenous peoples of the Amazon basin. The brew contains potent DMT (Dimethyltryptamine) and is known by a number of different names across cultures.',
    variants: [
      { label: '3 Bottles', price: 320 },
      { label: '4 Bottles', price: 415 },
      { label: '5 Bottles', price: 500 },
    ],
  },
  {
    name: 'DMT',
    casNumber: '61-50-7',
    imageExt: 'jpeg',
    description: 'DMT (N,N-Dimethyltryptamine) is a hallucinogenic tryptamine drug that occurs naturally in many plants and animals. It is also referred to as the "spirit molecule" due to the intense psychedelic experience. Although lesser known than other psychedelics such as LSD or magic mushrooms, DMT produces a brief but intense visual and auditory hallucinogenic experience. When smoked, the effects peak and plateau for 3 to 5 minutes, and gradually drop off with the duration totaling 30 to 45 minutes.',
    variants: [
      { label: '3.5g', price: 250 },
      { label: '5g', price: 350 },
      { label: '1/2 Oz', price: 800 },
      { label: '1 Oz', price: 1350 },
    ],
  },
  {
    name: 'Golden Teacher Mushroom',
    casNumber: 'N/A',
    imageExt: 'jpeg',
    description: 'Golden Teacher Mushroom (Psilocybe Cubensis) is a highly sought mushroom strain by researchers due to its reliability. First appearing in the 1980s, the exact origin of the strain is not known, though it is believed to be discovered on a farm in Georgia. The Golden Teacher is a favorite amongst cultivators and psychonauts for years due to its rich yields and extraordinary flushes. It offers a mildly high psychedelic effect, making it a gateway shroom for magic mushroom newbies, and is best known for its shamanistic properties and spiritual effects.',
    variants: [
      { label: '1 Oz', price: 250 },
      { label: '1/4 Lbs', price: 450 },
      { label: '1/2 Lbs', price: 800 },
      { label: '1 Lbs', price: 1000 },
    ],
  },
  {
    name: 'DMT Changa',
    casNumber: 'N/A',
    imageExt: 'jpeg',
    description: 'Changa DMT is a powerful psychedelic smoking blend. It is a combination of herbs infused with dimethyltryptamine (DMT) and containing some form of monoamine oxidase inhibitors (MAOI). The blend allows for a longer and more manageable DMT experience compared to freebase DMT, with the MAOI component extending and modulating the psychedelic effects.',
    variants: [
      { label: '5g', price: 230 },
      { label: '10g', price: 490 },
      { label: '1/2 Ounce', price: 590 },
      { label: '1 Ounce', price: 1000 },
    ],
  },
  {
    name: 'Ibogaine',
    casNumber: '83-74-9',
    imageExt: 'jpeg',
    description: 'Ibogaine is a naturally occurring psychoactive substance found in plants in the family Apocynaceae such as Tabernanthe iboga, Voacanga Africana, and Tabernaemontana Undulata. It is a psychedelic with dissociative properties. Ibogaine interacts with multiple neurotransmitter systems including NMDA, opioid, and sigma-2 receptor sites. It has also been shown to interact with the acetylcholine, serotonin, and dopamine systems.',
    variants: [
      { label: '100 Capsules x 300mg', price: 280 },
      { label: '200 Capsules x 300mg', price: 370 },
      { label: '500 Capsules x 300mg', price: 780 },
      { label: '1000 Capsules x 300mg', price: 1500 },
    ],
  },
  {
    name: 'Ketamine Vials',
    casNumber: '6740-88-1',
    imageExt: 'jpg',
    description: 'Ketamine is an injectable, short-acting dissociative anesthetic. It results in a feeling of detachment from oneself and one\'s environment, provides pain relief, and induces amnesia. Ketamine\'s ability to provide dissociation from reality, and induce hallucinogenic effects, pain relief, as well as calm and relaxation, makes it a widely studied substance. The effects can last anywhere from 5 to 30 minutes depending on administration, and approximately 90% is excreted in the urine in the form of metabolites.',
    variants: [
      { label: '50mg/10mL', price: 250 },
      { label: '50mg/90mL', price: 350 },
      { label: '100mg/90mL', price: 400 },
      { label: '100mg/120mL', price: 550 },
    ],
  },
  {
    name: 'Kratom Powder',
    casNumber: 'N/A',
    imageExt: 'jpg',
    description: 'Kratom is a tree whose leaves contain a chemical called mitragynine. Mitragynine works like opioid drugs such as codeine and morphine to relieve pain. Red Bali kratom is consumed throughout the world for its stimulant effects and as an opioid substitute, in forms including tea, chewed leaves, smoked, or ingested in capsules. Research suggests that both stimulant and sedative dose-dependent effects exist, in addition to antinociceptive, antidepressant, and anxiolytic-like effects.',
    variants: [
      { label: '4 Oz', price: 250 },
      { label: '10 Oz', price: 390 },
      { label: '1 Lbs', price: 960 },
    ],
  },
  {
    name: 'Liberty Cap Mushrooms',
    casNumber: 'N/A',
    imageExt: 'jpg',
    description: 'Psilocybe semilanceata, commonly known as the Liberty Cap, is a species of fungus that produces the psychoactive compounds psilocybin and baeocystin. It is both one of the most widely distributed psilocybin mushrooms in nature, and one of the most potent. The cap is 5-25 mm in diameter and varies in shape from sharply conical to bell-shaped, often with a prominent papilla. It is hygrophanous, meaning it assumes different colors depending on its state of hydration.',
    variants: [
      { label: '1 Oz', price: 250 },
      { label: '1/4 Lbs', price: 590 },
      { label: '1/2 Lbs', price: 990 },
      { label: '1 Lbs', price: 1500 },
    ],
  },
  {
    name: 'Liquid LSD',
    casNumber: '50-37-3',
    imageExt: 'jpeg',
    description: 'LSD (Lysergic Acid Diethylamide), also known as lysergide and colloquially as acid, is a semisynthetic psychedelic drug of the ergoline family. First synthesized in 1938, it is an extremely potent hallucinogen. LSD is produced in crystalline form and then mixed with other inactive ingredients, or diluted as a liquid for production in ingestible forms. It is odorless, colorless, and has a slightly bitter taste. Its effects, often called a "trip," can be stimulating, pleasurable, and mind-altering, lasting 12 hours or longer.',
    variants: [
      { label: '1 Vial', price: 200 },
      { label: '5 Vials', price: 790 },
      { label: '25 Vials', price: 3990 },
      { label: '50 Vials', price: 6900 },
    ],
  },
  {
    name: 'MDMA',
    casNumber: '42542-10-5',
    imageExt: 'jpg',
    description: 'MDMA (3,4-Methylenedioxymethamphetamine), commonly known as ecstasy or molly, is a psychoactive drug primarily used for recreational purposes. The desired effects include altered sensations, increased energy, empathy, as well as pleasure. When taken by mouth, effects begin in 30 to 45 minutes and last 3 to 6 hours. MDMA acts primarily by increasing the activity of the neurotransmitters serotonin, dopamine, and noradrenaline in parts of the brain. It belongs to the substituted amphetamine classes of drugs and has stimulant and hallucinogenic effects.',
    variants: [
      { label: '5g', price: 250 },
      { label: '10g', price: 350 },
      { label: '20g', price: 600 },
      { label: '50g', price: 1200 },
      { label: '100g', price: 2000 },
    ],
  },
  {
    name: 'Mescaline Powder',
    casNumber: '54-04-6',
    imageExt: 'jpg',
    description: 'Mescaline is a psychedelic hallucinogen obtained from the small, spineless cactus Peyote (Lophophora Williams), the San Pedro cactus, Peruvian torch cactus, and other mescaline-containing cacti. It is also found in certain members of the Fabaceae (bean family) and is produced synthetically. People have used hallucinogens for hundreds of years, mostly for religious rituals or ceremonies. Mescaline leads to rich visual hallucinations and has an effect similar to LSD or psilocybin (magic mushrooms).',
    variants: [
      { label: '5g', price: 240 },
      { label: '10g', price: 320 },
      { label: '1/2 Ounce', price: 625 },
      { label: '1 Ounce', price: 1100 },
    ],
  },
  {
    name: 'Morning Glory Seeds',
    casNumber: 'N/A',
    imageExt: 'jpg',
    description: 'Morning Glory Seeds come from the large climbing vine Ipomoea Violacea, originally from America and the Far East or West Indies, but can also be found in European Gardens. The main active ingredient is d-lysergic acid amide (LSA or LA-111), which is very similar to LSD but 50 to 100 times less active. Compared to LSD, the effects of these psychedelic seeds are a lot more tranquil, and after the major effects have worn off one usually feels very soft and relaxed.',
    variants: [
      { label: '50 Seeds', price: 140 },
      { label: '100 Seeds', price: 230 },
      { label: '250 Seeds', price: 380 },
      { label: '400 Seeds', price: 600 },
    ],
  },
  {
    name: 'Penis Envy Mushrooms',
    casNumber: 'N/A',
    imageExt: 'jpg',
    description: 'Penis Envy Mushroom (Psilocybe Cubensis) is a species of psychedelic mushroom whose principal active compounds are psilocybin and psilocin. Penis Envy mushrooms will have you experience level 4-5 trips that take you to a different dimension for hours. Its phallus-shaped appearance makes it distinctive, and it is known to have a higher amount of Psilocin and Psilocybin than other Cubensis strains, making it the strongest Psilocybe Cubensis strain by far.',
    variants: [
      { label: '1 Oz', price: 250 },
      { label: '1/4 Lbs', price: 400 },
      { label: '1/2 Lbs', price: 730 },
      { label: '1 Lbs', price: 1100 },
    ],
  },
  {
    name: 'Cubensis',
    casNumber: 'N/A',
    imageExt: 'png',
    description: 'Psilocybe Cubensis B+ is a great strain of magic mushroom with great potency and is widely used by patients suffering from depression, anxiety and PTSD. Psilocybe Cubensis is a species of psychedelic mushroom whose principal active compounds are psilocybin and psilocin, commonly called shrooms, magic mushrooms, golden tops, cubes, or gold caps. It belongs to the Hymenogastraceae family of fungi and is the most well-known psilocybin mushroom due to its wide distribution and ease of cultivation.',
    variants: [
      { label: '1 Ounce', price: 250 },
      { label: '2 Ounce', price: 400 },
      { label: '1/2 Lbs', price: 750 },
      { label: '1 Lbs', price: 1100 },
    ],
  },
  {
    name: 'Boga',
    casNumber: 'N/A',
    imageExt: 'jpg',
    description: 'Tabernanthe iBoga – the psychoactivity of the root bark of the Iboga tree, from which Ibogaine is extracted, was first discovered by the Pygmy tribe of Central Africa who passed the knowledge to the Bwiti tribe of Gabon. French explorers learned it from the Bwiti tribe and brought Iboga back to Europe in 1899-1900. Ibogaine-containing preparations are used for medicinal and ritual purposes within the African spiritual traditions of the Bwiti. Our high-quality Iboga Rootbark powder is sourced directly from the Northern region of Cameroon, harvested from over 10-year-old Iboga trees.',
    variants: [
      { label: '1 Oz', price: 280 },
      { label: '1/4 Lbs', price: 730 },
      { label: '1/2 Lbs', price: 1100 },
      { label: '1 Lbs', price: 2000 },
    ],
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

async function addPsychedelicDrugs() {
  try {
    const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

    const featuredSlugs = new Set([
      '1p-lsd',
      'dmt',
      'mdma',
      'ibogaine',
      'liquid-lsd',
      'mescaline-powder',
    ]);

    const productsData = psychedelicProducts.map((item) => {
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
        category: 'psychedelic drugs',
        images: [`/images/products/${slug}.${item.imageExt || 'jpg'}`],
        description: item.description,
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
    console.log('Psychedelic drugs seeding completed successfully');
  } catch (error) {
    console.error('Error seeding psychedelic drugs:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

connectToDatabase()
  .then(() => addPsychedelicDrugs())
  .catch(console.error);
