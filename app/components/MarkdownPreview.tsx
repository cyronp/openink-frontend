import Markdown from "react-markdown";

import Heading from "@/app/components/ui/Heading/Heading";
import Text from "@/app/components/ui/Text/Text";

type Props = {
  title?: string;
  description?: string;
  content: string;
};

export default function MarkdownPreview({
  title,
  description,
  content,
}: Props) {
  if (!content.trim()) {
    return (
      <div className="flex flex-col items-center justify-center h-48 border-2 border-black p-4">
        <Text as="p" className="text-base font-bold text-black uppercase tracking-widest">
          Sem conteúdo
        </Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col text-sm md:text-base leading-relaxed text-black font-medium">
      {title && (
        <Heading as="h1" className="text-2xl md:text-3xl font-bold leading-none tracking-tighter text-black mb-3 md:mb-4">
          {title}
        </Heading>
      )}

      {description && (
        <>
          <Text as="p" className="text-base md:text-lg text-black font-medium leading-snug mb-6 md:mb-8">
            {description}
          </Text>
          <hr className="border-neutral-300 border-t w-full mb-6 md:mb-8" />
        </>
      )}

      <div className="flex flex-col">
        <Markdown
          components={{
          h1: ({ children }) => (
            <Heading
              as="h1"
              className="text-2xl md:text-3xl font-bold mt-6 mb-2 tracking-tighter text-black"
            >
              {children}
            </Heading>
          ),

          h2: ({ children }) => (
            <Heading
              as="h2"
              className="text-xl md:text-2xl font-bold mt-4 mb-2 tracking-tight text-black"
            >
              {children}
            </Heading>
          ),

          h3: ({ children }) => (
            <Heading
              as="h3"
              className="text-lg md:text-xl font-bold mt-3 mb-1 tracking-tight text-black"
            >
              {children}
            </Heading>
          ),

          p: ({ children }) => (
            <Text as="p" className="leading-relaxed mb-2">
              {children}
            </Text>
          ),

          strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
          ),

          em: ({ children }) => (
            <em className="italic">{children}</em>
          ),

          blockquote: ({ children }) => (
            <blockquote className="border-l-4 md:border-l-8 border-black pl-4 md:pl-6 py-1 my-2 text-base md:text-lg italic text-black">
              {children}
            </blockquote>
          ),

          code: ({ children, className }) =>
            className?.includes("language-") ? (
              <code className="block bg-neutral-100 text-black p-4 md:p-6 text-xs md:text-sm font-mono overflow-x-auto my-2 border border-neutral-200">
                {children}
              </code>
            ) : (
              <code className="bg-neutral-100 text-black px-1.5 py-0.5 text-xs md:text-sm font-mono break-words">
                {children}
              </code>
            ),

          ul: ({ children }) => (
            <ul className="list-disc list-outside ml-6 md:ml-8 flex flex-col gap-1 mb-2 text-black marker:text-black">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="list-decimal list-outside ml-6 md:ml-8 flex flex-col gap-1 mb-2 text-black marker:text-black">
              {children}
            </ol>
          ),

          li: ({ children }) => (
            <li className="pl-1 md:pl-2">
              <span className="font-normal">{children}</span>
            </li>
          ),

          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-black decoration-1 hover:opacity-70 transition-opacity break-words"
            >
              {children}
            </a>
          ),

          hr: () => <hr className="border-neutral-300 border-t w-full my-4" />,
        }}
      >
        {content}
      </Markdown>
      </div>
    </div>
  );
}