import * as z from 'zod'

export const TokenLoginSchema = z.object({
  token: z
    .string().min(5, "Insira um valor válido.").nonempty("Token necessário.")
});

export type TokenLogin = z.infer<typeof TokenLoginSchema>;