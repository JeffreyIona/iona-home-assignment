import { shop } from '@/lib/contents';

export default function Banner() {
  return (
    <div className="px-4 py-16 text-center sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        {shop.title}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
        {shop.description}
      </p>
    </div>
  );
}
