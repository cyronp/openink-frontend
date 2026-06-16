import * as React from "react";
import { buttonVariants } from "./buttonVariants";
import { cn } from "@/app/utils/cn";
import type { VariantProps } from "class-variance-authority";

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<
        React.HTMLAttributes<HTMLElement>
      >;
      const childWithRef = React.cloneElement(child, {
        ...props,
        className: cn(
          buttonVariants({ variant, size }),
          className,
          child.props.className,
        ),
      });

      return React.cloneElement(childWithRef, { ref } as React.Attributes);
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
export { Button, buttonVariants };
