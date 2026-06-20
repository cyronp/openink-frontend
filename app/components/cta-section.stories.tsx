import CTASection from "./cta-section";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof CTASection> = {
  title: "Components/CTASection",
  component: CTASection,
  argTypes: {
    searchQuery: {
      control: "text",
      description: "Valor do campo de busca",
    },
    setSearchQuery: { action: "searchQueryChanged" },
  },
};

export default meta;

type Story = StoryObj<typeof CTASection>;

export const Default: Story = {
  args: {
    searchQuery: "",
  },
};

export const Searching: Story = {
  args: {
    searchQuery: "Tecnologia",
  },
};
