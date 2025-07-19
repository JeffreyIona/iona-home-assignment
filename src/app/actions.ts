'use server';

import { API_BASE_URL } from '@/lib/constants';
import { getFilterParams } from '@/lib/helpers/filters';
import { idFromSlug } from '@/lib/helpers/id-from-slug';
import { Category, Product, ProductResponse, QueryParams } from '@/lib/types';

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchCategoryList = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category-list`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchProductsByCategory = async (
  category: string,
  query: QueryParams = {}
): Promise<ProductResponse> => {
  try {
    const filters = getFilterParams(query);

    const response = await fetch(
      `${API_BASE_URL}/products/category/${category}${filters}`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products for category: ${category}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw error;
  }
};

export const fetchProducts = async (
  query: QueryParams = {}
): Promise<ProductResponse> => {
  try {
    const filters = getFilterParams(query);

    const response = await fetch(`${API_BASE_URL}/products${filters}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductSearch = async (
  query: QueryParams = {}
): Promise<ProductResponse> => {
  try {
    const filters = getFilterParams(query);

    const response = await fetch(`${API_BASE_URL}/products/search${filters}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product search results');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching product search results:', error);
    throw error;
  }
};

export const fetchProductBySlug = async (slug: string): Promise<Product> => {
  try {
    const id = idFromSlug(slug);
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product result');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching product result:', error);
    throw error;
  }
};
