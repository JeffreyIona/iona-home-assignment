import ProductList from "@/components/product-list";
import { fetchCategories, fetchCategoryList, fetchProductsByCategory } from "../actions";
import { notFound } from "next/navigation";
import { getSortQuery } from "@/lib/helpers/filters";

type Props = {
  params: {
    category: string;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const { sortBy } = await searchParams;
  const validCategories = await fetchCategoryList();

  if (!validCategories.includes(category)) {
    notFound();
  }

  const categories = await fetchCategories();
  const productResponse = await fetchProductsByCategory(category, getSortQuery(sortBy));

  return (
    <ProductList category={category} categories={categories ?? []} products={productResponse.products ?? []} />
  );
}
