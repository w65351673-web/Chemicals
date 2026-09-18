/**
 * Single source of truth for the three product categories used across the store.
 * `value` is what is persisted on the product document and used in the
 * `?category=` query string; `label` is what is shown to users.
 */
export const PRODUCT_CATEGORIES = [
  { value: 'anabolic steroids', label: 'Anabolic Steroids' },
  { value: 'psychedelic drugs', label: 'Psychedelic Drugs' },
  { value: 'research chemicals', label: 'Research Chemicals' },
];

export const PRODUCT_CATEGORY_VALUES = PRODUCT_CATEGORIES.map((c) => c.value);

export const DEFAULT_CATEGORY = 'research chemicals';

export const categoryHref = (value) => `/products?category=${encodeURIComponent(value)}`;

export const categoryLabel = (value) => {
  if (!value) return '';
  const match = PRODUCT_CATEGORIES.find(
    (c) => c.value === String(value).toLowerCase()
  );
  return match
    ? match.label
    : String(value)
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
};
