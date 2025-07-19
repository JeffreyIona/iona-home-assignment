import ProductList from '@/components/product-list';
import {
  fetchCategories,
  fetchCategoryList,
  fetchProductsByCategory,
} from '../actions';
import { notFound } from 'next/navigation';
import { getPaginationQuery, getSortQuery } from '@/lib/helpers/filters';
import { PRODUCT_LIMIT } from '@/lib/constants';
import { Metadata } from 'next';

type Props = {
  params: {
    categorySlug: string;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const validCategories = await fetchCategoryList();

  if (!validCategories.includes(categorySlug)) {
    return {};
  }

  const categories = await fetchCategories();

  const category = categories.find((c) => categorySlug === c.slug);

  return {
    title: `${category?.name} Products`,
    description: `Browse our collection of ${category?.name.toLowerCase()} products.`,
    openGraph: {
      title: `${category?.name} Products`,
      description: `Discover the best in ${category?.name.toLowerCase()}.`,
    },
    twitter: {
      card: 'summary',
      title: `${category?.name} Products`,
      description: `Explore our ${category?.name.toLowerCase()} category.`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { categorySlug } = await params;
  const { page, sortBy } = await searchParams;
  const validCategories = await fetchCategoryList();

  if (!validCategories.includes(categorySlug)) {
    notFound();
  }

  const categories = await fetchCategories();
  const category = categories.find((c) => categorySlug === c.slug);
  const productResponse = await fetchProductsByCategory(categorySlug, {
    ...getSortQuery(sortBy),
    ...getPaginationQuery(page),
  });

  return (
    <ProductList
      category={category}
      categories={categories ?? []}
      products={productResponse.products ?? []}
      totalPages={Math.floor(productResponse.total / PRODUCT_LIMIT)}
    />
  );
}
