import * as z from "zod";

export const WritePostSchema = z.object({
  title: z.string().min(10, "O título deve conter no mínimo 10 caracteres."),
  description: z
    .string()
    .min(15, "A descrição deve conter no mínimo 15 caracteres."),
  content: z.string().min(90, "Seu post deve conter no mínimo 90 caracteres"),
});

export type WritePost = z.infer<typeof WritePostSchema>;
