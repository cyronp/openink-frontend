import React from "react";

export type TextVariant = "Primary" | "Secondary" | "Terciary";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  asChild?: boolean;
  variant?: TextVariant;
  className?: string;
  children?: React.ReactNode;
}
