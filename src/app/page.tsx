import ProductList from '@/components/product-list';
import { fetchCategories, fetchProducts } from './actions';
import { getPaginationQuery, getSortQuery } from '@/lib/helpers/filters';
import { PRODUCT_LIMIT } from '@/lib/constants';

type Props = {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
};

export default async function Home({ searchParams }: Props) {
  const { page, sortBy } = await searchParams;
  const categories = await fetchCategories();
  const productResponse = await fetchProducts({
    ...getSortQuery(sortBy),
    ...getPaginationQuery(page),
  });

  return (
    <ProductList
      categories={categories ?? []}
      products={productResponse.products ?? []}
      totalPages={Math.floor(productResponse.total / PRODUCT_LIMIT)}
    />
  );
}
