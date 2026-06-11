import * as z from "zod";

export const NameLoginSchema = z.object({
  name: z
    .string()
    .nonempty("Apelido necessário.")
    .regex(
      /^[a-zA-ZÀ-ÿ\s]+$/,
      "Seu apelido não deve ter números ou caracteres especiais.",
    )
    .refine((value) => value.trim().split(/\s+/).length >= 2, {
      message: "Por favor, digite nome e sobrenome.",
    })
    .max(50, "Seu apelido não pode ultrapassar 50 caracteres."),
});

export type NameLogin = z.infer<typeof NameLoginSchema>;
