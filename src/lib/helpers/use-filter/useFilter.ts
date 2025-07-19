'use client';

import { SORT_OPTIONS } from '@/lib/constants';
import { SortKey } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import numeric from '../numeric';
import { useRouter } from 'nextjs-toploader/app';

type FilterProps = {
  sortBy?: SortKey;
  page?: number;
  q?: string | null;
  // Add more filter properties as needed
};

const filterKeys = ['sortBy', 'page', 'q'] as const;
export type FilterKey = (typeof filterKeys)[number];

const getSortKey = (key: string | null): SortKey | undefined => {
  if (!key) return undefined;
  return Object.keys(SORT_OPTIONS).includes(key) ? (key as SortKey) : undefined;
};

export default function useFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterProps>({
    sortBy: getSortKey(searchParams.get('sortBy')),
    page: numeric(searchParams.get('page')),
    q: searchParams.get('q'),
  });

  const updateFilter = (newFilters: FilterProps) => {
    const updateFilter = { ...filters, ...newFilters };
    const params = new URLSearchParams(searchParams.toString());

    // Clean up existing filter keys
    filterKeys.forEach((key) => {
      params.delete(key);
    });

    if (getSortKey(updateFilter.sortBy as string)) {
      params.set('sortBy', updateFilter.sortBy!);
    }

    if (updateFilter.page && updateFilter.page > 0) {
      params.set('page', String(updateFilter.page));
    }

    if (updateFilter.q) {
      params.set('q', updateFilter.q);
    }

    setFilters(updateFilter);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    setFilters({
      sortBy: getSortKey(searchParams.get('sortBy')),
      page: numeric(searchParams.get('page')),
      q: searchParams.get('q'),
    });
  }, [searchParams]);

  return { filters, updateFilter };
}
