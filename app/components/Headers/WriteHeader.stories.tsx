import WriteHeader from "./WriteHeader";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof WriteHeader> = {
  title: "Headers/WriteHeader",
  component: WriteHeader,
  argTypes: {
    isSubmitting: {
      control: "boolean",
      description: "Estado de submissão do formulário",
    },
    wordCount: {
      control: "text",
      description: "Contagem opcional de palavras",
    },
  },
};

export default meta;

type Story = StoryObj<typeof WriteHeader>;

export const Default: Story = {
  args: {
    isSubmitting: false,
  },
};

export const Submitting: Story = {
  args: {
    isSubmitting: true,
  },
};
