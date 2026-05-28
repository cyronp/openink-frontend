import Heading from "./Heading";
import type { Meta, StoryObj } from "@storybook/react";
import type { HeadingProps } from "./HeadingProps";

const meta: Meta<typeof Heading> = {
  title: "Typography/Heading",
  component: Heading,
  argTypes: {
    as: { control: "text", description: "Tag HTML do component" },
    asChild: { control: "boolean", description: "Renderizar asChild" },
    variant: {
      control: { type: "select" },
      options: ["Primary", "Secondary", "Terciary"],
      description: "Variantes do cabeçalho",
    },
    className: { control: "text", description: "TailwindCSS customizados" },
    children: { control: "text", description: "Contéudo do cabeçalho" },
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

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    children: "Primário Heading",
    variant: "Primary",
    as: "h1",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secundário Heading",
    variant: "Secondary",
    as: "h2",
  },
};

export const Terciary: Story = {
  args: {
    children: "Terciário Heading",
    variant: "Terciary",
    as: "h3",
  },
};
