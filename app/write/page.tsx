"use client";
import { ChevronLeft, Eye, PenLine } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";
import Link from "next/link";
import Text from "@/app/components/ui/Text/Text";
import Heading from "@/app/components/ui/Heading/Heading";
import { Separator } from "@/app/components/ui/Separator/Separator";
import HelpModal from "../components/HelpModal/HelpModal";
import { Button } from "../components/ui/Button/Button";

function WordCount({ text }: { text: string }) {
  const chars = text.length;

  return (
    <span className="flex items-center gap-3 tabular-nums">
      <Text as="p" className="text-xs text-muted-foreground">
        {chars} caracteres
      </Text>
      <HelpModal />
    </span>
  );
}

export default function WritePage() {
  const [markdownContent, setMarkdownContent] = useState("");
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-10 bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
          <Link href="/">
            <Button className="flex items-center cursor-pointer" variant="ghost">
              <ChevronLeft size={16} />
              <Text as="p" className="text-sm hidden sm:inline">
                Voltar
              </Text>
            </Button>
          </Link>
          <Button className="flex items-center cursor-pointer" variant="default">
            <Text as="p" className="text-sm hidden sm:inline">
              Publicar
            </Text>
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto w-full px-4 pt-8 pb-6">
        <div className="max-w-2xl flex flex-col gap-3">
          <input
            type="text"
            placeholder="Título da publicação"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-3xl font-semibold bg-transparent border-none outline-none placeholder:text-muted-foreground text-foreground leading-tight"
          />
          <input
            type="text"
            placeholder="Uma breve descrição do post..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-sm bg-transparent border-none outline-none placeholder:text-muted-foreground text-muted-foreground leading-relaxed"
          />
          <Separator />
        </div>
      </div>

      <div className="flex-1 max-w-6xl mx-auto w-full px-4 pb-8">
        <div className="flex gap-6 min-h-[calc(100vh-220px)]">
          <div
            className={`flex flex-col w-full md:w-1/2 gap-4 ${activeTab === "preview" ? "hidden md:flex" : "flex"}`}
          >
            <div className="flex items-center justify-between">
              <Text
                as="p"
                className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-widest"
              >
                <PenLine size={11} /> Editor
              </Text>
              <div className="flex items-center gap-3">
                <WordCount text={markdownContent} />
                <div className="flex md:hidden items-center border border-border rounded-md overflow-hidden">
                  <button
                    onClick={() => setActiveTab("write")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
                      activeTab === "write"
                        ? "bg-foreground text-background"
                        : "bg-background text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <PenLine size={12} />
                    <Text as="p" className="text-xs">
                      Escrever
                    </Text>
                  </button>
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
                      activeTab === "preview"
                        ? "bg-foreground text-background"
                        : "bg-background text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Eye size={12} />
                    <Text as="p" className="text-xs">
                      Preview
                    </Text>
                  </button>
                </div>
              </div>
            </div>
            <textarea
              className="flex-1 w-full bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground leading-7 text-sm font-mono"
              value={markdownContent}
              onChange={(e) => setMarkdownContent(e.target.value)}
              placeholder={`## Comece a escrever...\n\nUse **negrito**, *itálico*, [links](url), e muito mais com Markdown.`}
              spellCheck
            />
          </div>

          <Separator className="hidden md:block h-auto w-px self-stretch" />

          <div
            className={`flex flex-col w-full md:w-1/2 gap-4 ${activeTab === "write" ? "hidden md:flex" : "flex"}`}
          >
            <Text
              as="p"
              className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-widest"
            >
              <Eye size={11} /> Preview
            </Text>

            <div className="flex-1 overflow-auto">
              {markdownContent.trim() ? (
                <div className="flex flex-col gap-4 text-foreground text-sm leading-7">
                  {title && (
                    <Heading
                      as="h1"
                      className="text-2xl font-semibold leading-tight"
                    >
                      {title}
                    </Heading>
                  )}
                  {description && (
                    <>
                      <Text as="p" className="text-muted-foreground text-sm">
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
                        <blockquote className="border-l-2 border-foreground pl-4 my-4 text-muted-foreground italic">
                          {children}
                        </blockquote>
                      ),
                      code: ({ children, className }) => {
                        const isBlock = className?.includes("language-");
                        return isBlock ? (
                          <code className="block bg-muted text-foreground p-4 rounded text-xs font-mono my-4 overflow-x-auto">
                            {children}
                          </code>
                        ) : (
                          <code className="bg-muted text-foreground px-1.5 py-0.5 rounded text-xs font-mono">
                            {children}
                          </code>
                        );
                      },
                      ul: ({ children }) => (
                        <ul className="list-none pl-0 mb-4 flex flex-col gap-1">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside mb-4 flex flex-col gap-1 text-foreground">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="flex gap-2 text-foreground before:content-['—'] before:text-muted-foreground before:shrink-0">
                          {children}
                        </li>
                      ),
                      a: ({ children, href }) => (
                        <a
                          href={href}
                          className="text-foreground underline underline-offset-2 decoration-border hover:decoration-foreground transition-all"
                        >
                          {children}
                        </a>
                      ),
                      hr: () => <Separator className="my-8" />,
                    }}
                  >
                    {markdownContent}
                  </Markdown>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 gap-2">
                  <Eye size={24} className="text-muted-foreground opacity-40" />
                  <Text as="p" className="text-sm text-muted-foreground">
                    O preview aparecerá aqui
                  </Text>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}