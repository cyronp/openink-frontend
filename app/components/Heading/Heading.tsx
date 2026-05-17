import React from "react";
import { cn } from "../../utils/cn";
import { HeadingProps, HeadingVariant } from "./HeadingProps";

const variantClasses: Record<HeadingVariant, string> = {
  Primary: "text-4xl font-semibold tracking-tight",
  Secondary: "text-2xl font-semibold tracking-tight",
  Terciary: "text-xl font-medium tracking-tight",
};

export default function Heading({
  as: Component = "h2",
  asChild = false,
  variant = "Primary",
  className,
  children,
  ...rest
}: HeadingProps) {
  const classes = cn("leading-tight", variantClasses[variant], className);

  if (
    asChild &&
    React.isValidElement<React.HTMLAttributes<HTMLElement>>(children)
  ) {
    return React.cloneElement(children, {
      ...rest,
      className: cn(children.props.className, classes),
    });
  }

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
