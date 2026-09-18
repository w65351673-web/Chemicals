/**
 * SEO Keywords Component
 * Keyword coverage for the three ChemicalsSite categories:
 * anabolic steroids, psychedelic drugs and research chemicals.
 */

export const anabolicSteroidKeywords = [
  'Testosterone Enanthate',
  'Testosterone Cypionate',
  'Testosterone Propionate',
  'Sustanon 250',
  'Trenbolone Acetate',
  'Trenbolone Enanthate',
  'Nandrolone Decanoate',
  'Boldenone Undecylenate',
  'Drostanolone Propionate',
  'Methenolone Enanthate',
  'Oxandrolone',
  'Stanozolol',
  'Methandienone',
  'Oxymetholone',
];

export const psychedelicKeywords = [
  '1P-LSD',
  '1cP-LSD',
  'LSZ',
  'AL-LAD',
  '4-ACO-DMT',
  '4-HO-MET',
  'DMT',
  '5-MeO-DMT',
  'Mescaline HCl',
  '2C-B',
  '2C-E',
  'DOC',
];

export const researchChemicalKeywords = [
  '3-MMC',
  '3-CMC',
  '4-MMC',
  '2-FDCK',
  'MDPHP',
  'alpha-PiHP',
  'A-PVP',
  '4F-MPH',
  'Hexen',
  'NEP',
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
  'laboratory grade compounds',
  'reference materials',
  'high purity compounds',
  'analytical standards'
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
    priceCurrency: 'USD',
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
  description: 'Supplier of high-purity anabolic steroids, psychedelic drugs and research chemicals for laboratory research, including testosterone enanthate, trenbolone acetate, nandrolone decanoate, oxandrolone, 1P-LSD, 4-ACO-DMT, mescaline HCl, 2C-B, 3-MMC, 3-CMC and 2-FDCK',
  url: getBaseUrl(),
});

// Website schema
export const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ChemicalsSite',
  description: 'High-purity anabolic steroids, psychedelic drugs and research chemicals for laboratory research, assayed and documented batch by batch',
  url: getBaseUrl(),
});

export default function SEOKeywords() {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();
  
  return (
    <>
      {/* Hidden keywords for SEO - not visible to users */}
      <div className="hidden" aria-hidden="true">
        <h2>Anabolic Steroids Available</h2>
        <ul>
          {anabolicSteroidKeywords.map((k) => (
            <li key={k}>{k} - Anabolic steroid reference compound</li>
          ))}
        </ul>

        <h2>Psychedelic Drugs Available</h2>
        <ul>
          {psychedelicKeywords.map((k) => (
            <li key={k}>{k} - Psychedelic research compound</li>
          ))}
        </ul>

        <h2>Research Chemicals Available</h2>
        <ul>
          {researchChemicalKeywords.map((k) => (
            <li key={k}>{k} - Laboratory research chemical</li>
          ))}
        </ul>
      </div>

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
