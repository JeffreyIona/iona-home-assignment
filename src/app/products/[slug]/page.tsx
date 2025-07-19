import { fetchProductBySlug } from '@/app/actions';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <div>{product.title}</div>;
}
