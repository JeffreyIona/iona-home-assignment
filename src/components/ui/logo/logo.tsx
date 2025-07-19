import { cn } from '@/lib/helpers/styles';
import { ComponentProps } from 'react';

type LogoProps = ComponentProps<'a'>;

export default function Logo({ className, href, ...props }: LogoProps) {
  return (
    <a href={href ?? '/'} className={cn('text-lg', className)} {...props}>
      <span className="font-light text-gray-800">Nova</span>
      <span className="font-black text-green-600">Mart</span>
    </a>
  );
}
