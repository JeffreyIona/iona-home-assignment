import { cn } from '@/lib/helpers/styles';
import Link from 'next/link';
import { ComponentProps } from 'react';

type LogoProps = ComponentProps<'a'>;

export default function Logo({ className, href, ...props }: LogoProps) {
  return (
    <Link href={href ?? '/'} className={cn('text-lg', className)} {...props}>
      <span className="font-light text-gray-800">Nova</span>
      <span className="font-black text-green-600">Mart</span>
    </Link>
  );
}
