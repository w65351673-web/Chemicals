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
  { name: '4MMC', casNumber: '1189805-46-6', imageExt: 'jpg', description: '4-MMC (Mephedrone) is a synthetic stimulant drug of the amphetamine and cathinone classes. It is chemically similar to the cathinone compounds naturally found in the khat plant of eastern Africa. Mephedrone produces effects similar to MDMA, amphetamine, and cocaine, including euphoria, stimulation, and empathogenic effects.' },
  { name: '3MMC', casNumber: '1246911-86-3', imageExt: 'jpg', description: '3-MMC (3-Methylmethcathinone) is a synthetic cathinone stimulant closely related to mephedrone (4-MMC). It is a designer drug that produces stimulant and empathogenic effects. 3-MMC belongs to the substituted cathinone family and acts as a monoamine releasing agent.' },
  { name: '3CMC', casNumber: '1049677-59-9', imageExt: 'jpg', description: '3-CMC (3-Chloromethcathinone) is a substituted cathinone stimulant and designer drug. It is structurally related to mephedrone and produces similar stimulant effects. 3-CMC acts on the central nervous system by modulating monoamine neurotransmitter activity.' },
  { name: '4CMC', casNumber: '1225843-86-6', imageExt: 'jpg', description: '4-CMC (4-Chloromethcathinone, Clephedrone) is a synthetic stimulant drug of the cathinone class. It is a chlorinated analogue of mephedrone and produces stimulant and mild empathogenic effects. 4-CMC has been sold as a designer drug and research chemical.' },
  { name: 'APVP', casNumber: '14530-33-7', imageExt: 'jpg', description: 'A-PVP (alpha-pyrrolidinovalerophenone), also known as alpha-PVP or flakka, is a synthetic stimulant drug of the cathinone class developed in the 1960s. It is chemically related to pyrovalerone and is the ketone analog of prolintane. Alpha-PVP acts as a potent inhibitor of the transporters for monoamine neurotransmitters including dopamine and norepinephrine, preventing their reuptake.' },
  { name: 'Crystal Meth', casNumber: '537-46-2', imageExt: 'jpeg', description: 'Methamphetamine is a strong central nervous system stimulant that is mainly used as a recreational drug and less commonly as a second-line treatment for attention deficit hyperactivity disorder and obesity. Crystal meth can increase body temperature to dangerously high levels when used in large amounts. Crystal meth abuse may also cause serotonin syndrome with symptoms including agitation, restlessness, confusion, and rapid heart rate.' },
  { name: 'a-PiHP', casNumber: '2181620-71-1', imageExt: 'jpg', description: 'A-PiHP (a-pyrrolidinoisohexaphenone, 4-Me-PVP, 4M-PVP) is a stimulant of the cathinone class which can produce very strong effects similar to those of MDPV, a-PVP, or methamphetamine. It is a pyrrolidine developed in late 2015 as a result of understanding the quantitative structure-activity relationship of pyrovalerone and cathinone derivatives acting as norepinephrine-dopamine reuptake inhibitors (NDRI). Only 5mg is needed for research with effects starting after 20 seconds to 5 minutes.' },
  { name: '2FDCK', casNumber: '111982-50-4', imageExt: 'jpg', description: '2-FDCK (2-Fluorodeschloroketamine) is a dissociative anesthetic research chemical and analogue of ketamine. It produces dissociative, anesthetic, and hallucinogenic effects similar to ketamine. 2-FDCK has gained popularity as a research chemical for studying NMDA receptor antagonism and dissociative pharmacology.' },
  { name: 'U-47700', casNumber: '121348-98-9', imageExt: 'jpg', description: 'U-47700 is a synthetic opioid analgesic drug developed by a team at Upjohn in the 1970s. It is a selective agonist of the mu-opioid receptor with approximately 7.5 times the potency of morphine. U-47700 is used as a reference standard in forensic and analytical chemistry research applications.' },
  { name: 'MDPV', casNumber: '687603-66-3', imageExt: 'png', description: 'MDPV (Methylenedioxypyrovalerone) is a stimulant drug of the cathinone class which acts as a norepinephrine-dopamine reuptake inhibitor (NDRI). It remained obscure until around 2004 when it was reportedly sold as a designer drug. MDPV acts as a stimulant producing effects similar to cocaine, methylphenidate, and amphetamines, with primary psychological effects lasting roughly 3 to 4 hours.' },
  { name: '1h-indol-3-yl', casNumber: '120-72-9', imageExt: 'jpg', description: '1H-indol-3-yl (also known as XLR11 exempt preparation) is an analytical reference standard characterized as a synthetic cannabinoid. XLR11 is regulated as a Schedule I compound in the United States. This product is provided as a DEA exempt preparation intended for research and forensic applications.' },
  { name: '2-chlorophenyl', casNumber: 'N/A', imageExt: 'jpg', description: '2-Chlorophenyl (JWH 203) is an analgesic chemical from the phenylacetylindole family that acts as a cannabinoid (CB) agonist with Ki values of 8.0 and 7.0 nM at the CB1 and CB2 receptors, respectively. Similar to the related compound JWH 250, JWH 203 has a phenylacetyl group in place of the naphthoyl ring used in most aminoalkylindole CB compounds.' },
  { name: '2-nmc', casNumber: '849642-09-7', imageExt: 'png', description: '2-NMC is a substituted cathinone research chemical. The range of effects 2-NMC can cause is quite wide, from mild euphoric sensations to strong and long-lasting stimulation depending on dosage. It can be taken orally or insufflated, and is used as a research chemical in forensic and analytical applications.' },
  { name: '23-mdpv', casNumber: 'N/A', imageExt: 'png', description: '2,3-MDPV (2,3-Methylenedioxy Pyrovalerone) is a potential psychoactive designer drug. It is a structural isomer of 3,4-MDPV, a designer drug that has been detected in products marketed as bath salts, plant food, and tablets. Molecular Formula: C16H21NO3. This product is intended for forensic purposes.' },
  { name: '25b-nbf', casNumber: '1391487-99-2', imageExt: 'jpg', description: '25B-NBF is an N-benzyl derivative of the phenethylamine hallucinogen 2C-B which acts as a highly potent partial agonist for the 5-HT2A receptor. It is similar to 2C-B with IUPAC name 2-(4-bromo-2,5-dimethoxyphenyl)-N-(2-fluorobenzyl)ethanamine. Formula: C17H19BrFNO2. Purity: 99.7% min. Appearance: white powder.' },
  { name: '25i-nbmd', casNumber: '919797-25-4', imageExt: 'jpg', description: '25I-NBMD is a derivative of the phenethylamine hallucinogen 2C-I, discovered in 2006 by a team at Purdue University led by David Nichols. It acts as a potent partial agonist for the 5-HT2A receptor with a Ki of 0.049nM at the human 5-HT2A receptor. Effects are similar to those of LSD.' },
  { name: '2c-b', casNumber: '66142-81-2', imageExt: 'jpg', description: '2C-B (4-Bromo-2,5-dimethoxyphenethylamine) is a psychedelic drug first synthesized in 1974 by Dr. Alexander Shulgin. 2C-B is considered both a hallucinogen and a mild entactogen. It belongs to a family of drugs known as the 2Cs, which include 2C-I, 2C-E, 2C-T7, and many others. 2C-B is usually sold as white powder in baggies or gel caps and is sometimes pressed into tablets.' },
  { name: '2c-c', casNumber: '88441-14-9', imageExt: 'jpg', description: '2C-C is a psychedelic drug of the 2C family. It was first synthesized by Alexander Shulgin, sometimes used as an entheogen. In his book PiHKAL, Shulgin lists the dosage range as 20-40 mg. Designer drugs including the 2C class are not new but have been increasing in popularity through structure manipulation to produce new compounds.' },
  { name: '2ce', casNumber: '71539-34-9', imageExt: 'jpg', description: '2C-E (4-ethyl-2,5-dimethoxy) is a psychedelic and a substituted amphetamine synthesized by Alexander Shulgin. The chemical agent 2C-E belongs to the 2C family, along with 2C-I and 2C-H, and possesses psychedelic effects as a phenylethylamine. In PiHKAL, Shulgin refers to 2C-E as one of the "magical half-dozen" most important psychedelic phenethylamine compounds, along with mescaline, 2C-T-2, 2C-B, and 2C-T-7. Effects last on average 4 to 9 hours.' },
  { name: '2c-h', casNumber: '3600-86-0', imageExt: 'jpg', description: '2C-H (2,5-dimethoxyphenethylamine) is a lesser-known substituted phenethylamine of the 2C family, synthesized by Alexander Shulgin. If it enters the human body, 2C-H produces psychoactive effects. 2C-H is used as a precursor in the synthesis of other substituted phenethylamines such as 2C-B, 2C-I, and 2C-N. It exhibits agonist activity at human trace amine-associated receptor 1 and has binding affinity towards 5-HT2C and 5-HT2A receptors.' },
  { name: '2ci', casNumber: '69587-11-7', imageExt: 'jpg', description: '2C-I (2,5-dimethoxy-4-iodophenethylamine) is one of the most potent chemicals of the 2C family, often used recreationally for providing entactogenic and psychedelic effects. The usual oral dosage is 10-25 mg, requiring 45 to 75 minutes to start working, with effects lasting approximately 5 to 8 hours. All effects resemble those that occur after the combination of LSD and MDMA but last longer and are more intense.' },
  { name: '2c-t-2', casNumber: '207740-24-7', imageExt: 'jpg', description: '2C-T-2 is a synthetic psychotropic preparation belonging to the phenylethylamine group. First synthesized in 1981 by Alexander Shulgin, who described its action in his book PiHKAL. According to Shulgin, 2C-T-2 is one of the five best phenylethylamines, along with 2C-B, 2C-E, 2C-T-7, and mescaline. Its action on the human body is conditioned by its impact on serotonin receptors, with effects lasting about 6-9 hours.' },
  { name: '3-fmc-3-fluoromethcathinone', casNumber: '1049677-77-1', imageExt: 'jpg', description: '3-FMC (3-Fluoromethcathinone) is a member of the phenethylamine, amphetamine, and cathinone chemical classes with its IUPAC name being (RS)-1-(3-Fluorophenyl)-2-methylaminopropan-1-one. 3-FMC is commonly purchased to research its impressive stimulant properties. Various studies have reported 3-FMC to be very much like Mephedrone in terms of effects, and due to these similarities it is often purchased as a Mephedrone alternative.' },
  { name: '3-fpm', casNumber: '1350768-28-3', imageExt: 'png', description: '3-FPM (3-Fluorophenmetrazine, PAL-593) is a phenylmorpholine-based stimulant and fluorinated analogue of phenmetrazine. It is a psychostimulatory compound that inhibits the uptake of monoamine neurotransmitters and has anorectic properties. Structurally, it has a terminal amine incorporated into the morpholine ring. Formal Name: 2-(3-fluorophenyl)-3-methylmorpholine. Purity: ≥98%. 3-FPM is intended for use solely in forensic and research applications.' },
  { name: '4-aco-dmt', casNumber: '92292-84-7', imageExt: 'jpg', description: '4-AcO-DMT (O-Acetylpsilocin, 4-Acetoxy-DMT, Psilacetin) is a synthetically produced psychedelic tryptamine. It is the acetylated form of the psilocybin mushroom alkaloid psilocin. Originally patented in 1963 by Sandoz Ltd. via Albert Hofmann & Franz Troxler. Its psychedelic effects are believed to come from its efficacy at the 5-HT2A receptor as a partial agonist. In the body, 4-AcO-DMT is thought to be deacetylated into psilocin during first pass metabolism.' },
  { name: '4-cec', casNumber: '14919-85-8', imageExt: 'png', description: '4-CEC (Chloromethcathinone) is a legal powder of the new generation elaborated by specialists after long research. Its effects can range from pleasant euphoric sensations to strong stimulation. 4-CEC crystals are classified as a research chemical of the cathinone family. The routes of administration are diverse — it can be taken orally or insufflated.' },
  { name: '4-cl-pvp-crystals', casNumber: '5881-77-6', imageExt: 'png', description: '4-CL-PVP is a new research chemical classified in the family of cathinone stimulants. It has a molecular weight of 265.12 g/mol and CAS No 902324-25-5. The chemical formula for 4-CL-PVP is C15H20ClNO with an IUPAC name of 1-(4-chlorophenyl)-2-(pyrrolidin-1-yl)pentan-1-one. Compound purity is above 99.7%.' },
  { name: '4-cprc', casNumber: '82723-02-2', imageExt: 'png', description: '4-CPRC is a research chemical widely used by researchers for forensic purposes. It is a potential chemical compound available for laboratory study. 4-CPRC is not meant for human implementation or animal use — it is exclusively used for research purposes in controlled laboratory environments.' },
  { name: '4-fmc', casNumber: '447-40-5', imageExt: 'png', description: '4-FMC (Flephedrone, 4-Fluoromethcathinone) is a stimulant drug of the cathinone chemical class, available as a designer drug since 2008. It was introduced as an alternative to Mephedrone due to similarity in properties. The chemical formula is 1-(4-Fluorophenyl)-2-(methylamino)propan-1-one with molecular formula C10H12FNO and molecular weight 181.2 g/mol. In addition to stimulation, it also produces empathogenic effects.' },
  { name: '4f-pv-9', casNumber: 'N/A', imageExt: 'png', description: '4F-PV-9 is a research chemical with the chemical formula C18H26FNO. It has an exact mass of 291.20 and a molecular weight of 291.40. The compound is a white or off-white crystalline powder intended for forensic and research applications.' },
  { name: '5f-sgt-151', casNumber: '2377403-49-9', imageExt: 'jpg', description: '5F-SGT-151 (5F-CUMYL-PeGaCLONE) is one of the new generation of novel synthetic cannabinoids. It is a cannabinoid designer drug with pronounced physiological and psychoactive effects and has the molecular formula C22H26FN3O. Synthetic cannabinoid 5F-SGT-151 can show high affinity for the peripheral receptors of cannabinoid CB1 and CB2. Designed for research and forensic applications.' },
  { name: 'MDPHP', casNumber: '776994-64-0', imageExt: 'jpg', description: 'MDPHP (3\',4\'-Methylenedioxy-alpha-pyrrolidinohexiophenone) is a stimulant research chemical of the cathinone class, structurally related to MDPV and a-PVP. It acts as a potent norepinephrine-dopamine reuptake inhibitor (NDRI) and produces strong stimulant effects. MDPHP has been sold as a designer drug and is commonly referred to as "monkey dust". This product is intended for forensic and research applications only.' },
  { name: 'Etomidate Powder', casNumber: '33125-97-2', imageExt: 'jpg', description: 'Etomidate is a short-acting intravenous anesthetic agent used for the induction of general anesthesia and sedation. It is an imidazole derivative that acts on GABA-A receptors. Etomidate powder is supplied as a high-purity reference material for analytical, forensic, and pharmaceutical research applications. This product is intended for laboratory research purposes only.' },
  { name: '5FADB Precursor/Kit', casNumber: 'N/A', imageExt: 'jpg', description: '5F-ADB (5F-MDMB-PINACA) precursor kit contains the chemical precursors needed for the synthesis of 5F-ADB, a potent synthetic cannabinoid of the indazole-3-carboxamide family. 5F-ADB acts as a strong agonist of the CB1 and CB2 cannabinoid receptors. This precursor kit is intended for forensic research, analytical method development, and reference standard preparation in controlled laboratory environments only.' },
  { name: '5CL-ADBA Precursor/Kit', casNumber: 'N/A', imageExt: 'jpg', description: '5CL-ADB-A (5-Chloro-ADB-A) precursor kit contains the chemical precursors for synthesizing 5CL-ADB-A, a chlorinated synthetic cannabinoid structurally related to 5F-ADB. It acts as a potent agonist at cannabinoid CB1 and CB2 receptors. This precursor kit is supplied for forensic research, analytical chemistry, and reference material preparation in controlled laboratory settings only.' },
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
        images: [`/images/products/${slug}.${item.imageExt || 'jpg'}`],
        description: item.description,
        price: 400,
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
