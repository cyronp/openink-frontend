import * as z from "zod";

const NameLogin = z.object({
  name: z
    .string()
    .regex(
      /^[a-zA-ZÀ-ÿ\s]+$/,
      "O seu nome não deve ter números ou caracteres especiais.",
    )
    .refine((value) => value.trim().split(/\s+/).length >= 2, {
      message: "Por favor, digite nome e sobrenome.",
    }),
});

type NameLogin = z.infer<typeof NameLogin>;

export default NameLogin;
