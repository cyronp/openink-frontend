import * as z from "zod";

export const NameLoginSchema = z.object({
  name: z
    .string().nonempty("Nome necessário.")
    .regex(
      /^[a-zA-ZÀ-ÿ\s]+$/,
      "O seu nome não deve ter números ou caracteres especiais.",
    )
    .refine((value) => value.trim().split(/\s+/).length >= 2, {
      message: "Por favor, digite nome e sobrenome.",
    }),
});

export type NameLogin = z.infer<typeof NameLoginSchema>;