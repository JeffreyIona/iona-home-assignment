import { Category } from "@/lib/types";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import Checkbox from "../ui/checkbox";
import useFilter from "@/lib/helpers/use-filter/useFilter";
import { ComponentProps } from "react";
import Link from "next/link";

type FiltersProps = ComponentProps<"div"> & {
  categories: Category[];
}

export default function Filters({ categories = [], ...props }:FiltersProps) {
  const { filters, updateFilter } = useFilter()

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget
    const formData = new FormData(form)
    const selectedCategories = formData.getAll('categories') as string[]

    updateFilter({
      categories: selectedCategories,
    })
  }

  return (
    <div {...props}>
      <form onChange={handleChange}>
        <h3 className="font-medium text-gray-900">Categories</h3>
        <ul role="list" className="py-3 font-medium text-gray-900">
          <li>
            <Link href="/" className="block py-3">
              All
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.name}>
              <Link href={`/${category.slug}`} className="block py-3">
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
        <Disclosure defaultOpen={true} as="div" className="border-b border-gray-200 py-6">
          <h3 className="-my-3 flow-root">
            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">Categories</span>
              <span className="ml-6 flex items-center">
                <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
              </span>
            </DisclosureButton>
          </h3>
          <DisclosurePanel className="pt-6">
            <div className="space-y-4">
              {categories.map((cat) => (
                <div key={cat.slug} className="flex gap-3">
                  <div className="flex h-5 shrink-0 items-center">
                    <Checkbox
                      defaultValue={cat.slug}
                      defaultChecked={filters.categories.includes(cat.slug)}
                      id={`filter-category-${cat.slug}`}
                      name="categories"
                      type="checkbox"
                    />
                  </div>
                  <label htmlFor={`filter-category-${cat.slug}`} className="text-sm text-gray-600">
                    {cat.name}
                  </label>
                </div>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>
      </form>
    </div>
  )
}