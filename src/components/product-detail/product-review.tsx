import { cn } from '@/lib/helpers/styles';
import { Product } from '@/lib/types';
import { StarIcon } from '@heroicons/react/24/solid';

type ProductReviewProps = {
  product: Product;
};

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export default function ProductReview({ product }: ProductReviewProps) {
  return (
    <section aria-labelledby="reviews-heading" className="mt-16 sm:mt-24">
      <h2 id="reviews-heading" className="text-lg font-medium text-gray-900">
        Recent reviews
      </h2>

      <div className="mt-6 divide-y divide-gray-200 border-t border-gray-200">
        {product.reviews.map((review, idx) => (
          <div key={idx} className="py-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-8 lg:col-start-5">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={cn(
                        review.rating > rating
                          ? 'text-yellow-400'
                          : 'text-gray-200',
                        'size-5 shrink-0'
                      )}
                    />
                  ))}
                </div>
                <p className="ml-3 text-sm text-gray-700">
                  {review.rating}
                  <span className="sr-only"> out of 5 stars</span>
                </p>
              </div>

              <div className="mt-4 lg:mt-6">
                <div className="mt-3 space-y-6 text-sm text-gray-500">
                  {review.comment}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start">
              <p className="font-medium text-gray-900">{review.reviewerName}</p>
              <time
                dateTime={review.date}
                className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:mt-2 lg:ml-0 lg:border-0 lg:pl-0"
              >
                {formatDate(review.date)}
              </time>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
