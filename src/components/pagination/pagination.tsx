'use client';

import useFilter from '@/lib/helpers/use-filter/useFilter';
import {
  generatePagination,
  nextPageLink,
  pageLink,
  prevPageLink,
} from './helpers';
import { QueryParams } from '@/lib/types';
import Button from './button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

type PaginationProps = {
  totalPages?: number;
};

export default function Pagination({ totalPages = 1 }: PaginationProps) {
  const { filters } = useFilter();
  const currentPage = filters.page || 1;
  const pages = generatePagination(currentPage, totalPages);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-6 flex justify-between lg:justify-center text-sm font-medium text-gray-700 gap-2"
    >
      <Button
        href={prevPageLink({
          page: currentPage,
          query: filters as QueryParams,
        })}
      >
        <span className="sr-only">Previous page</span>
        <ChevronLeftIcon className="size-4" />
      </Button>
      {pages.map((page, index) => (
        <Button
          key={index}
          href={
            typeof page === 'number'
              ? pageLink({ page, query: filters as QueryParams })
              : '#'
          }
          higlight={page === currentPage}
          showIfDisabled
          className="hidden lg:inline-flex"
        >
          {page}
        </Button>
      ))}
      <Button
        href={nextPageLink({
          page: currentPage,
          query: filters as QueryParams,
          total: totalPages,
        })}
      >
        <span className="sr-only">Next page</span>
        <ChevronRightIcon className="size-4" />
      </Button>
    </nav>
  );
}
