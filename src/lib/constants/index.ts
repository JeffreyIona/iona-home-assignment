import { SortKey } from "../types";

export const API_BASE_URL = process.env.API_BASE_URL;

export const SORT_OPTIONS = {
  newest: "Newest",
  oldest: "Oldest",
  priceAsc: "Price: Low to High",
  priceDesc: "Price: High to Low",
};

export const DEFAULT_SORT = "newest" as SortKey;
export const SORT_KEYS: string[] = Object.keys(SORT_OPTIONS);
