import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary-600 text-white shadow-md shadow-primary-900/20 hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-900/25 active:scale-[0.98]',
        secondary:
          'border border-slate-200/90 bg-white text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50/80',
        outline:
          'border border-slate-700 bg-transparent text-slate-100 hover:bg-white/10 hover:text-white',
        ghost: 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
        link: 'text-primary-700 underline-offset-4 hover:underline',
        premium:
          'bg-gradient-to-b from-primary-500 to-primary-700 text-white shadow-glow hover:from-primary-400 hover:to-primary-600',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 rounded-lg px-4 text-xs',
        lg: 'h-12 rounded-xl px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
