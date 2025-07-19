import { Product } from '@/lib/types';
import { kebabCase } from 'lodash';

export default function productSlug(product: Product): string {
  const { title, id } = product;
  return `${kebabCase(title)}-${id}`;
}
