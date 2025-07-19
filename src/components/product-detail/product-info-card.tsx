import { ReactNode } from 'react';

type ProductInfoCardProps = {
  title: string;
  description: string;
  iconComponent: ReactNode;
};

export default function ProductInfoCard({
  title,
  description,
  iconComponent,
}: ProductInfoCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
      <dt>
        {iconComponent}
        <span className="mt-4 text-sm font-medium text-gray-900">{title}</span>
      </dt>
      <dd className="mt-1 text-sm text-gray-500">{description}</dd>
    </div>
  );
}
