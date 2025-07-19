import { fetchProductBySlug } from '@/app/actions';
import ProductDetail from '@/components/product-detail';
import productSlug from '@/lib/helpers/product-slug';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
};

// Metadata generator for dynamic title, description, etc.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) return {};

  const { title, description, images } = product;
  const image = images[0] || undefined;

  return {
    title,
    description: description,
    openGraph: {
      title,
      description: description,
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description,
      images: image ? [image] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  const pslug = productSlug(product);

  if (!product) {
    notFound();
  }

  // Self-healing URL: ID ensures content is found even if slug is outdated
  if (slug !== pslug) {
    redirect(`/products/${pslug}`);
  }

  return <ProductDetail product={product} />;
}
