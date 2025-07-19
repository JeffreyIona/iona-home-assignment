import { formatPrice } from '@/lib/helpers/price';
import productSlug from '@/lib/helpers/product-slug';
import { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${productSlug(product)}`}
      className="rounded-lg flex flex-col group text-sm bg-white overflow-hidden border border-gray-200"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        <Image
          className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
          src={product.thumbnail}
          alt={`A picture of ${product.title}`}
          fill
          sizes="(max-width: 768px) 33vw, (max-width: 1024px) 20vw, 50vw"
          priority
        />

        {product.stock === 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Out of Stock
          </span>
        )}
        {product.discountPercentage > 0 && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded font-semibold">
            -{product.discountPercentage}%
          </span>
        )}
      </div>

      <div className="flex-1 p-4 flex flex-col gap-2 items-between">
        <div className="flex-1">
          <h3 className="text-gray-900 font-semibold">{product.title}</h3>
          {product.brand && (
            <p className="text-gray-500 italic">{product.brand}</p>
          )}
        </div>
        <p className="font-medium text-gray-900">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
