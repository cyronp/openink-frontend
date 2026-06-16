import { Button } from "./Button";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["ghost", "default", "outline", "link"],
      description: "Variante do botão",
    },
    size: {
      control: { type: "select" },
      options: ["fit", "sm", "md", "lg", "icon-sm", "icon-md", "icon-lg"],
      description: "Tamanho do botão",
    },
    asChild: { control: "boolean", description: "Renderizar asChild" },
    disabled: { control: "boolean", description: "Estado desabilitado" },
    onClick: { action: "clicked" },
  },
  parameters: {
    docs: {
      description: {
        component: "Botão versátil com suporte a variantes e asChild.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Ghost: Story = {
  args: {
    children: "Button Ghost",
    variant: "ghost",
  },
};

export const Default: Story = {
  args: {
    children: "Button Default",
    variant: "default",
  },
};

export const Outline: Story = {
  args: {
    children: "Button Outline",
    variant: "outline",
  },
};

export const Link: Story = {
  args: {
    children: "Button Link",
    variant: "link",
  },
};

export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
    variant: "default",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
    variant: "default",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
    variant: "default",
  },
};
