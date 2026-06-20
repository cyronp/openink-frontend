import MarkdownPreview from "./MarkdownPreview";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof MarkdownPreview> = {
  title: "Components/MarkdownPreview",
  component: MarkdownPreview,
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    content: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof MarkdownPreview>;

export const Default: Story = {
  args: {
    title: "Minha Primeira Publicação",
    description: "Uma breve descrição sobre o que esta publicação aborda.",
    content: `
# Título Principal (H1)

Este é um parágrafo normal com texto em **negrito** e em *itálico*.

## Subtítulo (H2)

Podemos ter listas ordenadas e não ordenadas:
- Item de lista um
- Item de lista dois

1. Primeiro passo
2. Segundo passo

### Seção menor (H3)

> Isso é uma citação em bloco bastante estilosa que pode ser usada para destacar informações importantes.

Também podemos renderizar blocos de código em linha como \`const x = 42\` ou blocos inteiros de código formatado:

\`\`\`javascript
function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("OpenInk"));
\`\`\`

Para mais informações, acesse o [OpenInk](https://github.com/cyronp/openink).
    `,
  },
};

export const WithoutDescription: Story = {
  args: {
    title: "Apenas Título e Conteúdo",
    content: "Este é o conteúdo direto do post sem uma descrição prévia.",
  },
};

export const Empty: Story = {
  args: {
    content: "",
  },
};
