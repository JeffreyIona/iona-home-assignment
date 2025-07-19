'use client';

import { formatPrice } from '@/lib/helpers/price';
import { cn } from '@/lib/helpers/styles';
import { Product } from '@/lib/types';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react';
import {
  HeartIcon,
  TruckIcon,
  CheckBadgeIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { ComponentProps } from 'react';
import ProductInfoCard from './product-info-card';
import ProductReview from './product-review';

type ProductDetail = ComponentProps<'section'> & {
  product: Product;
};

const averageRating = (product: Product) =>
  Math.floor(
    product.reviews.reduce((sum, review) => sum + review.rating, 0) /
      product.reviews.length
  );

export default function ProductDetail({ product }: ProductDetail) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <TabGroup className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <TabList className="grid grid-cols-4 gap-6">
                {product.images.map((src, idx) => (
                  <Tab
                    key={idx}
                    className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-3 focus:ring-primary-fade/50 focus:ring-offset-4 focus:outline-hidden"
                  >
                    <span className="sr-only">
                      {product.title} image {idx} of {product.images.length}
                    </span>
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <Image
                        alt={`${product.title} image ${idx} of ${product.images.length}`}
                        src={src}
                        fill
                        sizes="22vw"
                        priority
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-selected:ring-primary-fade"
                    />
                  </Tab>
                ))}
              </TabList>
            </div>

            <TabPanels>
              {product.images.map((src, idx) => (
                <TabPanel key={idx}>
                  <div className="relative aspect-square w-full rounded-lg">
                    <Image
                      alt={`${product.title} image ${idx} of ${product.images.length}`}
                      src={src}
                      fill
                      sizes="(max-width: 768px) 50vw, 100vw"
                      priority
                    />
                  </div>
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.title}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <div className="flex gap-2">
                <p className="text-3xl tracking-tight text-gray-900">
                  {formatPrice(product.price)}
                </p>
                <p className="text-base tracking-tight text-red-600">
                  -{product.discountPercentage}%
                </p>
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={cn(
                        averageRating(product) > rating
                          ? 'text-yellow-400'
                          : 'text-gray-200',
                        'size-5 shrink-0'
                      )}
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <p className="space-y-6 text-base text-gray-700">
                {product.description}
              </p>
            </div>

            <form className="mt-6">
              <div className="mt-10 flex">
                <button
                  type="submit"
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary-glow focus:ring-2 focus:ring-primary-fade focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden sm:w-full"
                >
                  Add to bag
                </button>

                <button
                  type="button"
                  className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <HeartIcon aria-hidden="true" className="size-6 shrink-0" />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </form>

            <section aria-labelledby="policies-heading" className="mt-10">
              <h2 id="policies-heading" className="sr-only">
                Our Policies
              </h2>

              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {product.warrantyInformation && (
                  <ProductInfoCard
                    title="Warranty"
                    description={product.warrantyInformation}
                    iconComponent={
                      <CheckBadgeIcon
                        aria-hidden="true"
                        className="mx-auto size-6 shrink-0 text-gray-400"
                      />
                    }
                  />
                )}

                {product.shippingInformation && (
                  <ProductInfoCard
                    title="Shipping"
                    description={product.shippingInformation}
                    iconComponent={
                      <TruckIcon
                        aria-hidden="true"
                        className="mx-auto size-6 shrink-0 text-gray-400"
                      />
                    }
                  />
                )}

                {product.returnPolicy && (
                  <ProductInfoCard
                    title="Return Policy"
                    description={product.returnPolicy}
                    iconComponent={
                      <ArrowUturnLeftIcon
                        aria-hidden="true"
                        className="mx-auto size-6 shrink-0 text-gray-400"
                      />
                    }
                  />
                )}
              </dl>
            </section>
          </div>
        </div>

        <ProductReview product={product} />
      </div>
    </section>
  );
}
