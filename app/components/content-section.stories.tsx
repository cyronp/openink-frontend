import ContentSection from "./content-section";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof ContentSection> = {
  title: "Components/ContentSection",
  component: ContentSection,
  argTypes: {
    searchQuery: {
      control: "text",
      description: "Valor do campo de busca",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ContentSection>;

export const Default: Story = {
  args: {
    searchQuery: "",
  },
};

export const WithSearch: Story = {
  args: {
    searchQuery: "Tecnologia",
  },
};
