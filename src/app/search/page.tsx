import { fetchProductSearch } from '../actions';
import { getPaginationQuery, getSortQuery } from '@/lib/helpers/filters';
import SearchList from '@/components/search-list';
import { PRODUCT_LIMIT } from '@/lib/constants';

type Props = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default async function SearchPage({ searchParams }: Props) {
  const { q, page, sortBy } = await searchParams;
  const productResponse = await fetchProductSearch({
    ...getSortQuery(sortBy),
    ...getPaginationQuery(page),
    q,
  });

  return (
    <SearchList
      searchQuery={q}
      products={productResponse.products ?? []}
      totalPages={Math.floor(productResponse.total / PRODUCT_LIMIT)}
    />
  );
}
