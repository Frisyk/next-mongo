import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border border-purple-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-purple-950 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-purple-900 text-purple-50 hover:bg-purple-900/80',
        secondary:
          'border-transparent bg-purple-100 text-purple-900 hover:bg-purple-100/80',
        destructive:
          'border-transparent bg-red-500 text-purple-50 hover:bg-red-500/80',
        outline: 'text-purple-950',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
