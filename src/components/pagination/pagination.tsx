'use client';

import useFilter from "@/lib/helpers/use-filter/useFilter";
import qs from 'query-string';

type PaginationProps = {
  totalPages?: number;
};

type PageItem = number | '…';

export function generatePagination(
  currentPage: number,
  totalPages: number,
  windowSize: number = 5
): PageItem[] {
  if (totalPages <= 1) return [1];

  const pages: PageItem[] = [];

  const startPage = Math.max(2, currentPage - Math.floor(windowSize / 2));
  const endPage = Math.min(totalPages - 1, currentPage + Math.floor(windowSize / 2));

  pages.push(1); // Always show first page

  if (startPage > 2) {
    pages.push('…');
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages - 1) {
    pages.push('…');
  }

  if (totalPages !== 1) {
    pages.push(totalPages); // Only add if different from first page
  }

  return pages;
}

export default function Pagination({ totalPages = 1 }: PaginationProps) {
  const { filters } = useFilter();
  const currentPage = filters.page || 1;
  const pages = generatePagination(currentPage, totalPages);

  const buildPageLink = (page: number) => {
    return `?${qs.stringify({ ...filters, page }, { skipNull: true, skipEmptyString: true })}`;
  };

  const buildPrevPageLink = () => {
    return currentPage > 1 ? buildPageLink(currentPage - 1) : '#';
  };

  const buildNextPageLink = () => {
    return currentPage < totalPages ? buildPageLink(currentPage + 1) : '#';
  };

  return (
    <nav
      aria-label="Pagination"
      className="mt-6 flex justify-between text-sm font-medium text-gray-700"
    >
      <div className="min-w-0 flex-1">
        <a
          href={buildPrevPageLink()}
          className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/25 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-hidden"
        >
          Previous
        </a>
      </div>
      <div className="hidden space-x-2 sm:flex">
        {pages.map((page, index) =>
          typeof page === 'number' ? (
            <a
              key={index}
              href={buildPageLink(page)}
              className={`inline-flex h-10 items-center rounded-md border px-4 ${
                page === currentPage
                  ? 'border-indigo-600 ring-1 ring-indigo-600'
                  : 'border-gray-300 hover:bg-gray-100'
              } bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/25 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-hidden`}
            >
              {page}
            </a>
          ) : (
            <span
              key={`ellipsis-${index}`}
              className="inline-flex h-10 items-center rounded-md border px-3 border-gray-300 bg-transparent text-gray-500"
            >
              {page}
            </span>
          )
        )}
      </div>
      <div className="flex min-w-0 flex-1 justify-end">
        <a
          href={buildNextPageLink()}
          className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/25 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:outline-hidden"
        >
          Next
        </a>
      </div>
    </nav>
  );
}
