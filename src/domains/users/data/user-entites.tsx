import { z } from "zod";

export const roleFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "requerido"),
});

export const operatorTypeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "requerido"),
});

export const userFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "requerido"),
  lastName: z.string().min(1, "requerido"),
  email: z.string().min(1, "requerido"),
  password: z.string().min(1, "requerido"),
  password2: z.string().min(1, "requerido"),
  cedula: z.string().min(1, "requerido"),
  role: roleFormSchema,

/// campos operario
  contractStatus: z.string().min(1, "requerido"),
  contractType: z.string().min(1, "requerido"),
  jobLocation: z.string().min(1, "requerido"),
  operatorType: operatorTypeSchema,
});
