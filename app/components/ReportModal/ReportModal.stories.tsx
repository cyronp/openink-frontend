import ReportModal from "./ReportModal";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof ReportModal> = {
  title: "Components/ReportModal",
  component: ReportModal,
  argTypes: {
    postId: {
      control: "number",
      description: "ID do post associado para denúncia",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ReportModal>;

export const Default: Story = {
  args: {
    postId: 1,
  },
};
