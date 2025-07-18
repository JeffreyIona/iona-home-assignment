import ProductList from "@/components/product-list";
import { fetchCategories, fetchProducts } from "./actions";
import { getSortQuery } from "@/lib/helpers/filters";

type Props = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default async function Home({ searchParams }: Props) {
  const { sortBy } = await searchParams;
  const categories = await fetchCategories();
  const productResponse = await fetchProducts(getSortQuery(sortBy));

  return (
    <ProductList categories={categories ?? []} products={productResponse.products ?? []} />
  );
}
