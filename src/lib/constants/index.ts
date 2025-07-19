export const API_BASE_URL = process.env.API_BASE_URL;

export const SORT_OPTIONS = {
  titleAsc: 'Title: A to Z',
  titleDesc: 'Title: Z to A',
  priceAsc: 'Price: Low to High',
  priceDesc: 'Price: High to Low',
  discountAsc: 'Discount: Low to High',
  discountDesc: 'Discount: High to Low',
};

export const SORT_KEYS = Object.keys(SORT_OPTIONS);

export const LOCALES = {
  en: 'English',
};

export const PRODUCT_LIMIT = 16;

export const FETCH_CACHE = {
  next: {
    revalidate: 3600,
  },
};
