'use server'

import { API_BASE_URL } from "@/lib/constants"
import { ProductResponse } from "@/lib/types";

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchProducts = async ():Promise<ProductResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
