import { fetchProductSearch } from "../actions";
import { getSortQuery } from "@/lib/helpers/filters";
import SearchList from "@/components/search-list";

type Props = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default async function SearchPage({ searchParams }: Props) {
  const { q, sortBy } = await searchParams;
  const productResponse = await fetchProductSearch({
    ...getSortQuery(sortBy),
    q: q || "",
  });

  return (
    <SearchList searchQuery={q} products={productResponse.products ?? []} />
  );
}
