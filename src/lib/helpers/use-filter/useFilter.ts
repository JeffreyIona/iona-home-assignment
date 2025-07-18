import { SORT_OPTIONS } from "@/lib/constants";
import { SortKey } from "@/lib/types";
import { filter } from "lodash";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

type FilterProps = {
  sortBy?: SortKey;
  page?: number;
  // Add more filter properties as needed
}

const filterKeys = ['sortBy', 'page'] as const;
export type FilterKey = (typeof filterKeys)[number];

const getSortKey = (key: string | null): SortKey | undefined => {
  if (!key) return undefined;
  return Object.keys(SORT_OPTIONS).includes(key) ? (key as SortKey) : undefined;
};

export default function useFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterProps>({
    sortBy: getSortKey(searchParams.get("sortBy")),
    page: Number(searchParams.get("page")),
  });

  const updateFilter = (newFilters: FilterProps) => {
    const updateFilter = { ...filters, ...newFilters };
    const params = new URLSearchParams(searchParams.toString());

    // Clean up existing filter keys
    filterKeys.forEach((key) => {
      params.delete(key);
    });

    if (getSortKey(updateFilter.sortBy as string)) {
      params.set("sortBy", updateFilter.sortBy!);
    }

    if (updateFilter.page && updateFilter.page > 0) {
      params.set("page", String(updateFilter.page));
    }

    setFilters(updateFilter);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return { filters, updateFilter };
}
