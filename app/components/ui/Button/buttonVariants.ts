import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background font-medium border-none bg-transparent underline uppercase cursor-pointer p-0 hover:opacity-80",
  {
    variants: {
      variant: {
        ghost: "bg-transparent underline uppercase text-xl hover:opacity-80",
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        fit: "h-fit",
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
        "icon-sm": "h-8 w-8 p-0 text-sm",
        "icon-md": "h-10 w-10 p-0 text-base",
        "icon-lg": "h-12 w-12 p-0 text-lg",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  },
);
