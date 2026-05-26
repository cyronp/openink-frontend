import { Separator } from "./Separator";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Separator> = {
  title: "Separator",
  component: Separator,
  parameters: {
    docs: {
      description: {
        component: "Cabecalho flexivel de HTML",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {};
