import Markdown from "react-markdown";

import Heading from "@/app/components/ui/Heading/Heading";
import Text from "@/app/components/ui/Text/Text";
import { Separator } from "@/app/components/ui/Separator/Separator";

type Props = {
  title: string;
  description: string;
  content: string;
};

export default function MarkdownPreview({
  title,
  description,
  content,
}: Props) {
  if (!content.trim()) {
    return (
      <div className="flex flex-col items-center justify-center h-48 gap-2">
        <Text as="p" className="text-sm text-muted-foreground">
          O preview aparecerá aqui
        </Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 text-sm leading-7 text-foreground">
      {title && (
        <Heading as="h1" className="text-2xl font-semibold leading-tight">
          {title}
        </Heading>
      )}

      {description && (
        <>
          <Text as="p" className="text-sm text-muted-foreground">
            {description}
          </Text>

          <Separator />
        </>
      )}

      <Markdown
        components={{
          h1: ({ children }) => (
            <Heading
              as="h1"
              className="text-2xl font-semibold mt-8 mb-3"
            >
              {children}
            </Heading>
          ),

          h2: ({ children }) => (
            <Heading
              as="h2"
              className="text-xl font-semibold mt-6 mb-2"
            >
              {children}
            </Heading>
          ),

          h3: ({ children }) => (
            <Heading
              as="h3"
              className="text-base font-semibold mt-4 mb-2"
            >
              {children}
            </Heading>
          ),

          p: ({ children }) => (
            <Text as="p" className="leading-7">
              {children}
            </Text>
          ),

          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),

          em: ({ children }) => (
            <em className="italic text-muted-foreground">
              {children}
            </em>
          ),

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
            <ul className="list-none flex flex-col gap-1">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="list-decimal list-inside flex flex-col gap-1">
              {children}
            </ol>
          ),

          li: ({ children }) => (
            <li className="flex gap-2 before:content-['—'] before:text-muted-foreground">
              {children}
            </li>
          ),

          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 decoration-border hover:decoration-foreground"
            >
              {children}
            </a>
          ),

          hr: () => <Separator className="my-8" />,
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}