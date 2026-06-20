import FieldError from "./FieldError";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof FieldError> = {
  title: "Components/FieldError",
  component: FieldError,
  argTypes: {
    error: {
      description: "Objeto de erro contendo a mensagem a ser exibida",
    },
  },
};

export default meta;

type Story = StoryObj<typeof FieldError>;

export const Default: Story = {
  args: {
    error: {
      message: "Este campo é obrigatório",
    },
  },
};

export const Empty: Story = {
  args: {
    error: undefined,
  },
};
