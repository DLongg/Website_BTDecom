import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-gold disabled:pointer-events-none disabled:opacity-50 active:translate-y-px",
  {
    variants: {
      variant: {
        default: "bg-brand-gold text-white hover:bg-brand-gold-light",
        outline:
          "border-2 border-brand-gold text-brand-gold bg-transparent hover:bg-brand-gold hover:text-white",
        secondary:
          "bg-brand-green text-brand-dark hover:bg-brand-green/80",
        ghost: "hover:bg-brand-light text-brand-dark",
        link: "text-brand-gold underline-offset-4 hover:underline hover:-translate-y-0 hover:shadow-none",
        white: "bg-white text-brand-gold hover:bg-gray-100",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-14 rounded-md px-10 text-base font-semibold",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild: _asChild = false, ...props }, ref) => {
    void _asChild;
    // We don't have radix UI installed yet, so let's fallback to standard button if asChild is not used, 
    // or just require radix if needed. I'll stick to a standard button for simplicity without radix slot 
    // unless strictly needed. Actually, let me remove radix dependency to keep it simple.
    
    // Removing Radix Slot logic for simpler implementation:
    const Comp = "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
