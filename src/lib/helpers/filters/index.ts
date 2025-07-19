import { PRODUCT_LIMIT } from '@/lib/constants';
import { QueryParams } from '@/lib/types';
import qs from 'query-string';

const sortQueries = {
  titleAsc: {
    sortBy: 'title',
    order: 'asc',
  },
  titleDesc: {
    sortBy: 'title',
    order: 'desc',
  },
  priceAsc: {
    sortBy: 'price',
    order: 'asc',
  },
  priceDesc: {
    sortBy: 'price',
    order: 'desc',
  },
  discountAsc: {
    sortBy: 'discountPercentage',
    order: 'asc',
  },
  discountDesc: {
    sortBy: 'discountPercentage',
    order: 'desc',
  },
};

const getValidKey = (sortBy?: string) => {
  const validSortKeys = Object.keys(sortQueries);
  if (!sortBy || !validSortKeys.includes(sortBy)) {
    return undefined;
  }
  return sortBy as keyof typeof sortQueries;
};

export const getSortQuery = (sortBy?: string) => {
  const key = getValidKey(sortBy);
  if (!key) return undefined;
  return sortQueries[key];
};

export const getPaginationQuery = (page?: string) => {
  return {
    skip:
      page && !isNaN(Number(page)) ? Number(page) * PRODUCT_LIMIT : undefined,
    limit: PRODUCT_LIMIT,
  };
};

export const getFilterParams = (query: QueryParams = {}) => {
  const params = qs.stringify(query, { skipNull: true, skipEmptyString: true });
  return params ? `?${params}` : '';
};
