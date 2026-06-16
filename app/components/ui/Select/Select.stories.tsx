import { Select } from "./Select";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const options = [
  { label: "Opção 1", value: "1" },
  { label: "Opção 2", value: "2" },
  { label: "Opção 3", value: "3", disabled: true },
  { label: "Opção 4", value: "4" },
];

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  argTypes: {
    onChange: { action: "changed" },
    className: { control: "text", description: "TailwindCSS customizados" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Componente de seleção customizado com suporte a acessibilidade via teclado.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    options,
    placeholder: "Selecione uma opção...",
  },
};

export const WithValue: Story = {
  args: {
    options,
    value: "2",
  },
};

export const CustomStyle: Story = {
  args: {
    options,
    className: "w-64",
    placeholder: "Select fixo em 256px",
  },
};
