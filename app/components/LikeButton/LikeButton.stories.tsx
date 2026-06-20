import LikeButton from "./LikeButton";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof LikeButton> = {
  title: "Components/LikeButton",
  component: LikeButton,
  argTypes: {
    postId: {
      control: "number",
      description: "ID do post associado",
    },
    initialLikes: {
      control: "number",
      description: "Quantidade inicial de curtidas",
    },
  },
};

export default meta;

type Story = StoryObj<typeof LikeButton>;

export const ZeroLikes: Story = {
  args: {
    postId: 1,
    initialLikes: 0,
  },
};

export const MultipleLikes: Story = {
  args: {
    postId: 1,
    initialLikes: 42,
  },
};
