import { cn } from "@/lib/helpers/styles";
import Link from "next/link";
import { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof Link> & {
  disabled?: boolean;
  higlight?: boolean;
  showIfDisabled?: boolean;
};

export default function Button({
  href,
  disabled,
  higlight,
  children,
  className,
  showIfDisabled = false,
  ...props
}: LinkProps) {
  const isDisabled = disabled || href === '#' || href === '';

  if (isDisabled && !showIfDisabled) {
    return null;
  }

  if (isDisabled) {
    return (
      <span
        className={cn('inline-flex h-10 items-center rounded-md border px-3 border-gray-300 bg-white text-gray-500 cursor-not-allowed', className)}
        {...props}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md border px-3 aspect-square',
        higlight
          ? 'border-primary ring-1 ring-primary'
          : 'border-gray-300 hover:bg-gray-100',
        'bg-white focus:border-primary focus:ring-2 focus:ring-primary/25 focus:ring-offset-1 focus:ring-offset-primary focus:outline-hidden',
        className
      )}
    >
      {children}
    </Link>
  );
}
