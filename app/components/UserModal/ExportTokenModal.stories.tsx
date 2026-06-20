import ExportTokenModal from "./ExportTokenModal";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof ExportTokenModal> = {
  title: "UserModal/ExportTokenModal",
  component: ExportTokenModal,
  argTypes: {
    token: {
      control: "text",
      description: "Token de acesso a ser exibido",
    },
    onClose: { action: "onCloseClicked" },
  },
};

export default meta;

type Story = StoryObj<typeof ExportTokenModal>;

export const Default: Story = {
  args: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  },
};
