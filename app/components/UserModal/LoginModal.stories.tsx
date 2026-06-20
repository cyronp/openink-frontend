import LoginModal from "./LoginModal";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof LoginModal> = {
  title: "UserModal/LoginModal",
  component: LoginModal,
  argTypes: {
    message: {
      control: "text",
      description: "Mensagem opcional de aviso",
    },
    onClose: { action: "onCloseClicked" },
  },
};

export default meta;

type Story = StoryObj<typeof LoginModal>;

export const Default: Story = {
  args: {
    message: null,
  },
};

export const WithMessage: Story = {
  args: {
    message: "Você precisa fazer login antes de acessar a página de escrita.",
  },
};
