'use client';

import { Category, Product } from '@/lib/types';
import ProductCard from './product-card';
import CategoryList from './category-list';
import FilterSort from './filter-sort';
import Banner from '../banner';
import Pagination from '../pagination';
import MobileCategoryList from './mobile-category-list';
import { useState } from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

type ProductListProps = {
  category?: Category;
  categories: Category[];
  products: Product[];
  totalPages?: number;
};

export default function ProductList({
  category,
  categories = [],
  products = [],
  totalPages = 1,
}: ProductListProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <section>
      <MobileCategoryList
        categories={categories}
        open={mobileFiltersOpen}
        onToggleOpen={setMobileFiltersOpen}
      />
      <div className="bg-white">
        {category ? (
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {category.name ?? 'Products'}
            </h1>
            <p className="mt-4 max-w-xl text-sm text-gray-700">
              Explore our wide range of high-quality{' '}
              {category?.name.toLowerCase()} designed for style, performance,
              and value. Whether you&apos;re searching for the latest trends or
              timeless essentials, our {category?.name.toLowerCase()} collection
              has something for everyone.
            </p>
          </div>
        ) : (
          <Banner />
        )}

        <div className="border-t border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex gap-2 items-center font-bold tracking-tight text-gray-900 cursor-pointer lg:cursor-default"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  Categories
                  <AdjustmentsHorizontalIcon
                    aria-hidden="true"
                    className="size-5 lg:hidden"
                  />
                </button>
              </div>

              <div className="flex items-center">
                <FilterSort />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-6 pb-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            <CategoryList
              categories={categories}
              className="hidden lg:block col-span-1"
            />

            <div className="lg:col-span-4">
              <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <Pagination totalPages={totalPages} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
