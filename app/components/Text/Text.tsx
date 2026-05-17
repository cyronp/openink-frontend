import React from "react";
import { cn } from "../../utils/cn";
import { TextProps, TextVariant } from "./TextProps";

const variantClasses: Record<TextVariant, string> = {
  Primary: "text-base font-normal",
  Secondary: "text-sm font-normal",
  Terciary: "text-xs font-normal",
};

export default function Text({
  as: Component = "p",
  asChild = false,
  variant = "Primary",
  className,
  children,
  ...rest
}: TextProps) {
  const classes = cn("leading-relaxed", variantClasses[variant], className);

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
