'use client';

import { cn } from '@/lib/helpers/styles';
import { Category } from '@/lib/types';
import Link from 'next/link';
import { ComponentProps, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

type CategoryListProp = ComponentProps<'div'> & {
  categories: Category[];
};

export default function CategoryList({
  categories,
  ...props
}: CategoryListProp) {
  const [expand, setExpand] = useState(false);
  return (
    <div {...props}>
      <h2 className="sr-only">Categories</h2>

      <div
        className={cn(
          'overflow-y-hidden transition-all duration-500',
          expand ? 'max-h-[1000px]' : 'max-h-80'
        )}
      >
        <ul role="list" className="space-y-4 text-sm font-medium text-gray-900">
          <li>
            <Link href="/" className="hover:font-medium">
              All products
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.name}>
              <Link href={`/${category.slug}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="mt-4 inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
        onClick={() => setExpand(!expand)}
      >
        <span>{expand ? 'Show less' : 'Show more'}</span>
        {expand ? (
          <ChevronDownIcon
            aria-hidden="true"
            className="size-5 rotate-180 ml-1"
          />
        ) : (
          <ChevronDownIcon aria-hidden="true" className="size-5 ml-1" />
        )}
      </button>
    </div>
  );
}
