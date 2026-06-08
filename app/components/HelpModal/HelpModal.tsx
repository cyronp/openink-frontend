"use client";
import { HelpCircleIcon, XIcon } from "lucide-react";
import { Button } from "../ui/Button/Button";
import { useState } from "react";
import Text from "../ui/Text/Text";
import Heading from "../ui/Heading/Heading";
import { Separator } from "../ui/Separator/Separator";

type Section = {
  label: string;
  rows: { syntax: string; preview: React.ReactNode }[];
};

const sections: Section[] = [
  {
    label: "Cabeçalhos",
    rows: [
      {
        syntax: "# Título",
        preview: (
          <Heading as="h1" className="text-2xl font-semibold leading-tight">
            Título
          </Heading>
        ),
      },
      {
        syntax: "## Subtítulo",
        preview: (
          <Heading as="h2" className="text-xl font-semibold">
            Subtítulo
          </Heading>
        ),
      },
      {
        syntax: "### Seção",
        preview: (
          <Heading as="h3" className="text-base font-semibold">
            Seção
          </Heading>
        ),
      },
    ],
  },
  {
    label: "Ênfase",
    rows: [
      {
        syntax: "**negrito**",
        preview: <strong className="font-semibold text-sm">negrito</strong>,
      },
      {
        syntax: "*itálico*",
        preview: (
          <em className="italic text-muted-foreground text-sm">itálico</em>
        ),
      },
    ],
  },
  {
    label: "Listas",
    rows: [
      {
        syntax: "- item",
        preview: (
          <ul className="flex flex-col gap-1">
            {["Primeiro", "Segundo", "Terceiro"].map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm text-foreground before:content-['—'] before:text-muted-foreground before:shrink-0"
              >
                {item}
              </li>
            ))}
          </ul>
        ),
      },
      {
        syntax: "1. item",
        preview: (
          <ol className="list-decimal list-inside flex flex-col gap-1 text-sm text-foreground">
            {["Primeiro", "Segundo", "Terceiro"].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        ),
      },
    ],
  },
  {
    label: "Links",
    rows: [
      {
        syntax: "[texto](url)",
        preview: (
          <a
            href="#"
            className="text-sm text-foreground underline underline-offset-2 decoration-border hover:decoration-foreground transition-all"
          >
            texto
          </a>
        ),
      },
    ],
  },
  {
    label: "Código",
    rows: [
      {
        syntax: "`código`",
        preview: (
          <code className="bg-muted text-foreground px-1.5 py-0.5 rounded text-xs font-mono">
            código
          </code>
        ),
      },
      {
        syntax: "```\nbloco\n```",
        preview: (
          <code className="block bg-muted text-foreground p-3 rounded text-xs font-mono w-full">
            bloco de código
          </code>
        ),
      },
    ],
  },
  {
    label: "Citação",
    rows: [
      {
        syntax: "> texto",
        preview: (
          <blockquote className="border-l-2 border-foreground pl-4 text-muted-foreground italic text-sm">
            texto citado
          </blockquote>
        ),
      },
    ],
  },
  {
    label: "Separador",
    rows: [
      {
        syntax: "---",
        preview: <Separator className="w-full" />,
      },
    ],
  },
];

export default function HelpModal() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon-md"
        onClick={() => setIsActive(true)}
        aria-label="Abrir ajuda de Markdown"
      >
        <HelpCircleIcon size={16} />
      </Button>

      {isActive && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsActive(false);
          }}
        >
          <div className="bg-white rounded-xl w-full max-w-lg p-6 relative max-h-[90dvh] overflow-y-auto shadow-2xl flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <Text as="p" className="font-semibold text-2xl">
                  Guia de Markdown
                </Text>
                <Text as="p" className="text-sm text-muted-foreground">
                  Sintaxe disponível no editor
                </Text>
              </div>
              <Button
                variant="ghost"
                size="icon-lg"
                className="cursor-pointer shrink-0"
                onClick={() => setIsActive(false)}
                aria-label="Fechar"
              >
                <XIcon size={24} />
              </Button>
            </div>

            <Separator />

            {/* Sections */}
            <div className="flex flex-col gap-6">
              {sections.map((section, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <Text
                    as="p"
                    className="text-sm font-semibold uppercase text-foreground"
                  >
                    {section.label}
                  </Text>
                  <div className="flex flex-col gap-2">
                    {section.rows.map((row, j) => (
                      <div
                        key={j}
                        className="grid grid-cols-2 gap-4 items-center py-2 px-3"
                      >
                        <code className="text-xs font-semibold font-mono text-muted-foreground whitespace-pre">
                          {row.syntax}
                        </code>
                        <div>{row.preview}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 
