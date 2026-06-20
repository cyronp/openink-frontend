import WordCount from "./WordCount";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof WordCount> = {
  title: "Components/WordCount",
  component: WordCount,
  argTypes: {
    text: {
      control: "text",
      description: "O texto a ser contado",
    },
  },
};

export default meta;

type Story = StoryObj<typeof WordCount>;

export const Default: Story = {
  args: {
    text: "Olá, mundo! Este é um texto de teste.",
  },
};

export const LongText: Story = {
  args: {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
};
