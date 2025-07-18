'use client';

import { Product } from "@/lib/types";
import FilterSort from "../product-list/filter-sort";
import ProductCard from "../product-list/product-card";
import { shop } from "@/lib/contents";
import Pagination from "../pagination";

type ProductListProps = {
  searchQuery?: string;
  products: Product[];
  totalPages?: number;
}

export default function SearchList({ searchQuery, products = [], totalPages = 1 }: ProductListProps) {
  return (
    <section>
      <div className='bg-white'>
        <div className="mx-auto max-w-7xl px-4 py-10 lg:py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Search
          </h1>
          <p className="mt-4 max-w-xl text-sm text-gray-700">{shop.searchDescription}</p>
        </div>

        <div className='border-t border-b border-gray-200'>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2">
              <h2 id="results-heading" className="font-bold tracking-tight text-gray-900">Search results for &quot;{searchQuery}&quot;</h2>

              <div className="flex items-center">
                <FilterSort />
              </div>
            </div>
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="pt-6 pb-24 text-center">
            <h2 className="text-xl font-semibold text-gray-900">No products found</h2>
            <p className="mt-2 text-sm text-gray-500">Try searching for something else.</p>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div aria-labelledby="results-heading" className="pt-6 pb-24">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product}/>
              ))}
            </div>

            <Pagination totalPages={totalPages} />
          </div>
        </div>
      )}
    </section>
  );
}
