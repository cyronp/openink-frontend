import Text from "./Text";
import type { Meta, StoryObj } from "@storybook/react";
import type { TextProps } from "./TextProps";

const meta: Meta<typeof Text> = {
  title: "Typography/Text",
  component: Text,
  argTypes: {
    as: { control: "text", description: "Tag HTML do component" },
    asChild: { control: "boolean", description: "Renderizar asChild" },
    variant: {
      control: { type: "select" },
      options: ["Primary", "Secondary", "Terciary"],
      description: "Variantes do texto",
    },
    className: { control: "text", description: "TailwindCSS customizados" },
    children: { control: "text", description: "Contéudo do texto" },
  },
  parameters: {
    docs: {
      description: {
        component: "Cabecalho flexivel de HTML",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: "Exemplo de Texto Primario",
    variant: "Primary",
    as: "p",
    asChild: false,
    className: "",
  },
};

export const Secondary: Story = {
  args: {
    children: "Exemplo de Texto Secundario",
    variant: "Secondary",
    as: "p",
  },
};

export const Terciary: Story = {
  args: {
    children: "Exemplo de Texto Terciario",
    variant: "Terciary",
    as: "p",
  },
};

export const Span: Story = {
  args: {
    children: "Exemplo de Texto como span",
    variant: "Primary",
    as: "span",
  },
};
