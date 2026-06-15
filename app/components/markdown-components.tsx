import Markdown from "react-markdown";
import Heading from "@/app/components/ui/Heading/Heading";
import Text from "@/app/components/ui/Text/Text";
import { Separator } from "@/app/components/ui/Separator/Separator";

export const markdownComponents: React.ComponentProps<
  typeof Markdown
>["components"] = {
  h1: ({ children }) => (
    <Heading as="h1" className="text-xl font-semibold mt-8 mb-3">
      {children}
    </Heading>
  ),

  h2: ({ children }) => (
    <Heading as="h2" className="text-lg font-semibold mt-6 mb-2">
      {children}
    </Heading>
  ),

  h3: ({ children }) => (
    <Heading as="h3" className="text-base font-semibold mt-4 mb-2">
      {children}
    </Heading>
  ),

  p: ({ children }) => <Text as="p">{children}</Text>,

  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-foreground pl-4 italic text-muted-foreground">
      {children}
    </blockquote>
  ),

  code: ({ children, className }) =>
    className?.includes("language-") ? (
      <code className="block bg-muted p-4 rounded text-xs font-mono overflow-x-auto">
        {children}
      </code>
    ) : (
      <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
        {children}
      </code>
    ),

  ul: ({ children }) => (
    <ul className="list-none flex flex-col gap-1">{children}</ul>
  ),

  li: ({ children }) => (
    <li className="flex gap-2 before:content-['—'] before:text-muted-foreground">
      {children}
    </li>
  ),

  hr: () => <Separator className="my-8" />,
};
