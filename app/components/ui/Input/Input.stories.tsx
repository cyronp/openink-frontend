import { Input } from "./Input";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "password", "email", "number", "tel"],
      description: "Tipo do input",
    },
    placeholder: { control: "text", description: "Placeholder do input" },
    disabled: { control: "boolean", description: "Estado desabilitado" },
    className: { control: "text", description: "TailwindCSS customizados" },
  },
  parameters: {
    docs: {
      description: {
        component: "Componente de input padrão com bordas quadradas.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Digite algo...",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Digite sua senha...",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Input desabilitado",
    disabled: true,
  },
};

export const CustomStyle: Story = {
  args: {
    placeholder: "Input com estilo customizado",
    className: "bg-gray-100 border-dashed border-blue-500",
  },
};
