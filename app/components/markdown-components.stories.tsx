import Markdown from "react-markdown";
import { markdownComponents } from "./markdown-components";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta = {
  title: "Components/MarkdownComponents",
  render: () => (
    <div className="p-6 max-w-2xl bg-white border border-neutral-300">
      <Markdown components={markdownComponents}>
        {`
# Cabeçalho Principal (H1)
Este é um parágrafo de exemplo demonstrando a formatação padrão do markdown.

## Subtítulo Secundário (H2)
Aqui está uma citação em bloco:

> Esta é uma citação estilizada em itálico com uma borda lateral.

### Cabeçalho Terciário (H3)
Abaixo uma lista não ordenada:
- Primeiro item com um traço personalizado
- Segundo item da lista
- Terceiro item da lista

---

Código em linha como \`npm run dev\` e bloco de código:

\`\`\`typescript
const greeting: string = "Olá, OpenInk!";
console.log(greeting);
\`\`\`
        `}
      </Markdown>
    </div>
  ),
};

export default meta;

export const Default: StoryObj = {};
