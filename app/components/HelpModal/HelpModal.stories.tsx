import HelpModal from "./HelpModal";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof HelpModal> = {
  title: "Components/HelpModal",
  component: HelpModal,
};

export default meta;

type Story = StoryObj<typeof HelpModal>;

export const Default: Story = {};
