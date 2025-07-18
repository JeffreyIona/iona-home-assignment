import { SORT_OPTIONS } from "@/lib/constants";
import { SortKey } from "@/lib/types";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

type FilterProps = {
  sortBy?: SortKey;
  // Add more filter properties as needed
}

const getSortKey = (key: string | null): SortKey | undefined => {
  if (!key) return undefined;
  return Object.keys(SORT_OPTIONS).includes(key) ? (key as SortKey) : undefined;
};

export default function useFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterProps>({
    sortBy: getSortKey(searchParams.get("sortBy")),
  });

  const updateFilter = (newFilters: FilterProps) => {
    const updateFilter = { ...filters, ...newFilters };
    const params = new URLSearchParams(searchParams.toString());
    params.delete("sortBy");

    if (getSortKey(updateFilter.sortBy as string)) {
      params.set("sortBy", updateFilter.sortBy!);
    }

    setFilters(updateFilter);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return { filters, updateFilter };
}
