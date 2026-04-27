import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Digite seu nome"),
  email: z.string().email("Digite um e-mail valido"),
  phone: z
    .string()
    .min(10, "Digite seu WhatsApp com DDD")
    .max(20, "Telefone muito longo")
    .regex(/^[0-9()+\-\s]+$/, "Digite apenas numeros e simbolos de telefone"),
  company: z.string().max(120, "Empresa muito longa").optional().or(z.literal("")),
  message: z.string().max(700, "Mensagem muito longa").optional().or(z.literal("")),
  sourceUrl: z.url().optional().or(z.literal("")),
  hpField: z.string().max(0).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
