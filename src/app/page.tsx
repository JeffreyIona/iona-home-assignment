import ProductList from "@/components/product-list";
import { fetchCategories, fetchProducts } from "./actions";
import { getPaginationQuery, getSortQuery } from "@/lib/helpers/filters";

type Props = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default async function Home({ searchParams }: Props) {
  const { page, sortBy } = await searchParams;
  const categories = await fetchCategories();
  const productResponse = await fetchProducts({
    ...getSortQuery(sortBy),
    ...getPaginationQuery(page),
  });

  return (
    <ProductList categories={categories ?? []} products={productResponse.products ?? []} />
  );
}
