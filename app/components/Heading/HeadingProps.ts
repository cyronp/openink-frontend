import React from "react";

export type HeadingVariant = "Primary" | "Secondary" | "Terciary";

export interface HeadingProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  asChild?: boolean;
  variant?: HeadingVariant;
  className?: string;
  children?: React.ReactNode;
}
