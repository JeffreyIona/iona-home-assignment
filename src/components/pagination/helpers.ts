import { QueryParams } from "@/lib/types";
import qs from 'query-string';

type PageItem = number | string;

type PageLink = {
  page?: number;
  total?: number;
  query?: QueryParams
};

export function generatePagination(
  currentPage: number,
  totalPages: number,
  windowSize: number = 5,
  ellipsis: string = '…'
): PageItem[] {
  if (totalPages <= 1) return [1];

  const pages: PageItem[] = [];

  const startPage = Math.max(2, currentPage - Math.floor(windowSize / 2));
  const endPage = Math.min(totalPages - 1, currentPage + Math.floor(windowSize / 2));

  pages.push(1); // Always show first page

  if (startPage > 2) {
    pages.push(ellipsis);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages - 1) {
    pages.push(ellipsis);
  }

  if (totalPages !== 1) {
    pages.push(totalPages);
  }

  return pages;
}

export const pageLink = ({ page = 1, query }:PageLink) => {
  return `?${qs.stringify({ ...query, page }, { skipNull: true, skipEmptyString: true })}`;
};

export const prevPageLink = ({ page = 1, query }:PageLink) => {
  return page > 1 ? pageLink({ page: page - 1, query}) : '#';
};

export const nextPageLink = ({ page = 1, query, total = 1 }:PageLink) => {
  return page < total ? pageLink({ page: page + 1, query}) : '#';
};
