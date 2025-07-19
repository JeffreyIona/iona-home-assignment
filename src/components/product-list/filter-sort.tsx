import { SORT_OPTIONS } from '@/lib/constants';
import { cn } from '@/lib/helpers/styles';
import useFilter from '@/lib/helpers/use-filter/useFilter';
import { SortKey } from '@/lib/types';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function FilterSort() {
  const { filters, updateFilter } = useFilter();
  return (
    <>
      <div className="lg:hidden">
        <select
          className="block w-full rounded-md border-gray-300 py-2 px-2 text-right text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          value={filters.sortBy}
          onChange={(e) =>
            updateFilter({ sortBy: e.target.value as SortKey, page: undefined })
          }
        >
          <option value="">Sort</option>
          {Object.keys(SORT_OPTIONS).map((key) => (
            <option key={key} value={key}>
              {SORT_OPTIONS[key as SortKey]}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden lg:block">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              {filters.sortBy ? SORT_OPTIONS[filters.sortBy] : 'Sort'}
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <button
                  type="button"
                  className="text-gray-500 block w-full text-left px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden"
                  onClick={() =>
                    updateFilter({ sortBy: undefined, page: undefined })
                  }
                >
                  Sort
                </button>
              </MenuItem>
              {Object.keys(SORT_OPTIONS).map((key) => (
                <MenuItem key={key}>
                  <button
                    type="button"
                    className={cn(
                      filters.sortBy === key
                        ? 'font-medium text-gray-900'
                        : 'text-gray-500',
                      'block w-full text-left px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden'
                    )}
                    onClick={() =>
                      updateFilter({ sortBy: key as SortKey, page: undefined })
                    }
                  >
                    {SORT_OPTIONS[key as SortKey]}
                  </button>
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Menu>
      </div>
    </>
  );
}
