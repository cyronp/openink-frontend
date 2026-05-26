import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";
import { Tinos } from "next/font/google";

const tinos = Tinos({
  variable: "--font-tinos-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  decorators: [
    (Story: any) => (
      <div
        className={tinos.variable}
        style={{ fontFamily: "var(--font-tinos-sans), serif" }}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
