import TabButton from "./TabButton";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FileText, Eye } from "lucide-react";

const meta: Meta<typeof TabButton> = {
  title: "Components/TabButton",
  component: TabButton,
  argTypes: {
    active: {
      control: "boolean",
      description: "Estado ativo do botão",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof TabButton>;

export const Active: Story = {
  args: {
    active: true,
    icon: FileText,
    children: "Escrever",
  },
};

export const Inactive: Story = {
  args: {
    active: false,
    icon: Eye,
    children: "Visualizar",
  },
};
