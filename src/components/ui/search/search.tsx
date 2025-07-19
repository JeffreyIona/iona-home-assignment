import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();

  return (
    <form action="/search" method="get" className="w-full flex flex-col gap-4">
      <label htmlFor="search" className="sr-only">
        Search products
      </label>
      <div className="bg-gray-50 relative flex items-center w-full">
        <MagnifyingGlassIcon
          aria-hidden="true"
          className="absolute left-2.5 h-5 w-5 text-gray-400"
        />
        <input
          type="text"
          name="q"
          id="search"
          defaultValue={searchParams.get('q') || ''}
          className="bg-transparent focus:bg-transparent z-10 pl-10 block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          placeholder="Search products..."
        />
      </div>

      <button
        type="submit"
        className="block lg:hidden rounded-md bg-green-600 p-2 text-white hover:bg-primary-glow focus:outline-none focus:ring-2 focus:ring-primary-fade"
      >
        Search
      </button>
    </form>
  );
}
