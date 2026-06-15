import * as z from "zod";

export const ReportSchema = z.object({
  reportType: z
    .string()
    .min(1, "Por favor, selecione um tipo de denúncia."),
});
export type ReportFormValues = z.infer<typeof ReportSchema>;
