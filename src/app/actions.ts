'use server'

import { API_BASE_URL } from "@/lib/constants"
import { Category, ProductResponse } from "@/lib/types";

export const fetchCategories = async (): Promise<Category[]> => {
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

export const fetchCategoryList = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category-list`, {
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

export const fetchProductsByCategory = async (category: string, query?: Record<string, string>): Promise<ProductResponse> => {
  const params = new URLSearchParams(query);

  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}?${params.toString()}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products for category: ${category}`);
    }

    return response.json();

  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw error;
  }
};

export const fetchProducts = async (query?: Record<string, string>):Promise<ProductResponse> => {
  const params = new URLSearchParams(query);

  try {
    const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`, {
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
