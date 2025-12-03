/**
 * SEO Keywords Component
 * Contains all primary research chemical keywords for search engine optimization
 * Keywords: 5cl-adba, 5cladba, 5fadb, jwh-018, adb-butinaca, ab-pinaca, 
 * 5F-EDMB-PINACA, ADB-FUBINACA, 4FADB, AMB-FUBINACA, MDMB-4en-PINACA,
 * Etizolam, Flualprazolam, Clonazolam, Flubromazolam, Diclazepam, Bromazolam,
 * Pyrazolam, Phenazepam, AB-FUBINACA, MDMB-CHMINACA, MDMB-FUBINACA,
 * Isotonitazene, Protonitazene, Metonitazene, Alprazolam, 5fmdmb-2201, 4fadb
 */

export const primaryKeywords = [
  '5cl-adba',
  '5cladba',
  '5fadb',
  'jwh-018',
  'adb-butinaca',
  'ab-pinaca',
  '5F-EDMB-PINACA',
  'ADB-FUBINACA',
  '4FADB',
  'AMB-FUBINACA',
  'MDMB-4en-PINACA',
  'Etizolam',
  'Flualprazolam',
  'Clonazolam',
  'Flubromazolam',
  'Diclazepam',
  'Bromazolam',
  'Pyrazolam',
  'Phenazepam',
  'AB-FUBINACA',
  'MDMB-CHMINACA',
  'MDMB-FUBINACA',
  'Isotonitazene',
  'Protonitazene',
  'Metonitazene',
  'Alprazolam',
  '5fmdmb-2201',
  '4fadb'
];

export const secondaryKeywords = [
  'research chemicals',
  'synthetic cannabinoids',
  'laboratory chemicals',
  'premium research chemicals',
  'buy research chemicals online',
  'benzos',
  'benzodiazepines',
  'nitazenes',
  'cannabinoids for research',
  'chemical compounds',
  'laboratory grade chemicals'
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
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://darkchemsite.com';
};

// Organization schema
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DarkChemSite',
  description: 'Premium research chemicals supplier specializing in 5cl-adba, 5cladba, 5fadb, jwh-018, adb-butinaca, ab-pinaca, 5F-EDMB-PINACA, ADB-FUBINACA, 4FADB, AMB-FUBINACA, MDMB-4en-PINACA, Etizolam, Flualprazolam, Clonazolam, Flubromazolam, Diclazepam, Bromazolam, Pyrazolam, Phenazepam, AB-FUBINACA, MDMB-CHMINACA, MDMB-FUBINACA, Isotonitazene, Protonitazene, Metonitazene, Alprazolam, 5fmdmb-2201, 4fadb and other synthetic cannabinoids, benzodiazepines, and nitazenes',
  url: getBaseUrl(),
});

// Website schema
export const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DarkChemSite',
  description: 'Premium quality research chemicals including 5cl-adba, 5cladba, 5fadb, jwh-018, adb-butinaca, ab-pinaca, 5F-EDMB-PINACA, ADB-FUBINACA, 4FADB, AMB-FUBINACA, MDMB-4en-PINACA, Etizolam, Flualprazolam, Clonazolam, Flubromazolam, Diclazepam, Bromazolam, Pyrazolam, Phenazepam, AB-FUBINACA, MDMB-CHMINACA, MDMB-FUBINACA, Isotonitazene, Protonitazene, Metonitazene, Alprazolam, 5fmdmb-2201, 4fadb',
  url: getBaseUrl(),
});

export default function SEOKeywords() {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();
  
  return (
    <>
      {/* Hidden keywords for SEO - not visible to users */}
      <div className="hidden" aria-hidden="true">
        <h2>Research Chemicals Available</h2>
        <ul>
          <li>5cl-adba - Premium synthetic cannabinoid</li>
          <li>5cladba - High-quality research chemical</li>
          <li>5fadb - Laboratory grade compound</li>
          <li>jwh-018 - Synthetic cannabinoid for research</li>
          <li>adb-butinaca - Premium research chemical</li>
          <li>ab-pinaca - High-purity synthetic cannabinoid</li>
          <li>5F-EDMB-PINACA - Laboratory research compound</li>
          <li>ADB-FUBINACA - Premium synthetic cannabinoid</li>
          <li>4FADB - High-quality research chemical</li>
          <li>AMB-FUBINACA - Laboratory grade compound</li>
          <li>MDMB-4en-PINACA - Premium research chemical</li>
          <li>Etizolam - Research benzodiazepine</li>
          <li>Flualprazolam - Laboratory benzodiazepine</li>
          <li>Clonazolam - Premium benzodiazepine</li>
          <li>Flubromazolam - Research chemical benzo</li>
          <li>Diclazepam - Laboratory grade benzodiazepine</li>
          <li>Bromazolam - Premium research benzo</li>
          <li>Pyrazolam - Research benzodiazepine</li>
          <li>Phenazepam - Laboratory benzodiazepine</li>
          <li>AB-FUBINACA - Synthetic cannabinoid</li>
          <li>MDMB-CHMINACA - Premium cannabinoid</li>
          <li>MDMB-FUBINACA - Research cannabinoid</li>
          <li>Isotonitazene - Research nitazene</li>
          <li>Protonitazene - Laboratory nitazene</li>
          <li>Metonitazene - Premium nitazene</li>
          <li>Alprazolam - Research benzodiazepine</li>
          <li>5fmdmb-2201 - Synthetic cannabinoid</li>
          <li>4fadb - Premium research chemical</li>
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
