/**
 * SEO Keywords Component
 * Keyword coverage for the three ChemicalsSite categories:
 * anabolic steroids, psychedelic drugs and research chemicals.
 */

export const anabolicSteroidKeywords = [
  '1-TEST CYP 200',
  'AICAR',
  'Alphabolin',
  'Anadrol-50',
  'Anapolon',
  'Anastrozole',
  'Astralean',
  'Dianabol',
  'Fentanyl',
  'Induject-250',
  'Scopolamine Hydrobromide',
  'Winstrol',
];

export const psychedelicKeywords = [
  '1P-LSD',
  'Ayahuasca',
  'DMT',
  'DMT Changa',
  'Golden Teacher Mushroom',
  'Ibogaine',
  'Ketamine',
  'Kratom Powder',
  'Liberty Cap Mushrooms',
  'Liquid LSD',
  'MDMA',
  'Mescaline Powder',
  'Morning Glory Seeds',
  'Penis Envy Mushrooms',
  'Psilocybe Cubensis',
  'Iboga Rootbark',
];

export const researchChemicalKeywords = [
  '4-MMC',
  '1189805-46-6',
  '3-MMC',
  '1246816-62-5',
  '3-CMC',
  '4-CMC',
  'A-PVP',
  'Crystal Meth',
  'a-PiHP',
  '2-FDCK',
  '111982-50-4',
  'U-47700',
  '121348-98-3',
  'MDPV',
  '687603-66-3',
  '2C-B',
  '2C-C',
  '2C-E',
  '2C-H',
  '2C-I',
  '2C-T-2',
  '25B-NBF',
  '25I-NBMD',
  '4-AcO-DMT',
  '92292-84-7',
  '4-CEC',
  '14919-85-8',
  '4-CL-PVP',
  '902324-25-5',
  '4-CPRC',
  '82723-02-2',
  '4-FMC',
  '447-40-5',
  '3-FMC',
  '3-FPM',
  '1350768-28-3',
  '4F-PV-9',
  '5F-SGT-151',
  '2377403-49-9',
  '2-NMC',
  '2,3-MDPV',
  '1H-indol-3-yl',
  '2-Chlorophenyl',
  'MDPHP',
  '776994-64-0',
  'Etomidate',
  'Etomidate Powder',
  '33125-97-2',
  '5F-ADB',
  '5F-MDMB-PINACA',
  '1715016-75-3',
  '5CL-ADB-A',
  '5CL-ADBA Precursor Kit',
  '2504100-70-1',
];

export const primaryKeywords = [
  ...anabolicSteroidKeywords,
  ...psychedelicKeywords,
  ...researchChemicalKeywords,
];

export const secondaryKeywords = [
  'anabolic steroids',
  'psychedelic drugs',
  'research chemicals',
  'buy anabolic steroids online',
  'buy psychedelics online',
  'buy research chemicals online',
  'laboratory chemicals',
  'high purity compounds',
];

export const allKeywords = [...primaryKeywords, ...secondaryKeywords];

// Schema.org structured data for better SEO
export const getProductSchema = (product) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.images?.[0] || '',
  offers: {
    '@type': 'Offer',
    price: product.price,
    priceCurrency: 'EUR',
    availability: product.countInStock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
  },
  aggregateRating: product.rating ? {
    '@type': 'AggregateRating',
    ratingValue: product.rating,
    reviewCount: product.numReviews || 0,
  } : undefined,
});

// Get base URL for schemas
const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://chemicalssite.com';
};

// Organization schema
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ChemicalsSite',
  description: 'Supplier of anabolic steroids, psychedelic drugs and research chemicals — Dianabol, Winstrol, Anadrol-50, 1P-LSD, DMT, MDMA, Ketamine, Golden Teacher Mushrooms, 4-MMC, 3-MMC, 2C-B, Crystal Meth, A-PVP and more.',
  url: getBaseUrl(),
});

// Website schema
export const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ChemicalsSite',
  description: 'Anabolic steroids, psychedelic drugs and research chemicals — assayed and discreetly dispatched.',
  url: getBaseUrl(),
});

export default function SEOKeywords() {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();
  
  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
