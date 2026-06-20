import Header from "./header";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Header> = {
  title: "Headers/Header",
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};
