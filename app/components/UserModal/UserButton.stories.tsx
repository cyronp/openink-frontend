import UserButton from "./UserButton";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof UserButton> = {
  title: "UserModal/UserButton",
  component: UserButton,
};

export default meta;

type Story = StoryObj<typeof UserButton>;

export const Default: Story = {};
