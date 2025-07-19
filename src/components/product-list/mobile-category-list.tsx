import { Category } from '@/lib/types';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type MobileFiltersProps = {
  open?: boolean;
  onToggleOpen: (value: boolean) => void;
  categories: Category[];
};

export default function MobileFilters({
  open,
  onToggleOpen,
  categories = [],
}: MobileFiltersProps) {
  return (
    <Dialog
      open={open}
      onClose={onToggleOpen}
      className="relative z-40 lg:hidden"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
      />

      <div className="fixed inset-0 z-40 flex">
        <DialogPanel
          transition
          className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
        >
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Categories</h2>
            <button
              type="button"
              onClick={() => onToggleOpen(false)}
              className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="mt-4 border-t border-gray-200">
            <h3 className="sr-only">Categories</h3>
            <ul role="list" className="px-2 py-3 font-medium text-gray-900">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link href={`/${category.slug}`} className="block px-2 py-3">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
