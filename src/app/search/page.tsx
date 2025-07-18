import { fetchProductSearch } from "../actions";
import { getPaginationQuery, getSortQuery } from "@/lib/helpers/filters";
import SearchList from "@/components/search-list";

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
    <SearchList searchQuery={q} products={productResponse.products ?? []} />
  );
}
