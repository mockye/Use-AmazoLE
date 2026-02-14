import { z } from "zod";
import { insertLeadSchema } from "./schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  leads: {
    create: {
      method: "POST" as const,
      path: "/api/leads" as const,
      input: insertLeadSchema
        .extend({
          name: z.string().min(2, "Informe seu nome"),
          phone: z.string().min(8, "Informe um WhatsApp válido"),
          createdAt: z.string().min(1),
        })
        .pick({ name: true, phone: true, createdAt: true }),
      responses: {
        201: z.object({
          id: z.number(),
          name: z.string(),
          phone: z.string(),
          createdAt: z.string(),
        }),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: "GET" as const,
      path: "/api/leads" as const,
      responses: {
        200: z.array(
          z.object({
            id: z.number(),
            name: z.string(),
            phone: z.string(),
            createdAt: z.string(),
          }),
        ),
      },
    },
  },
};

export function buildUrl(
  path: string,
  params?: Record<string, string | number>,
): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type CreateLeadInput = z.infer<typeof api.leads.create.input>;
export type LeadResponse = z.infer<typeof api.leads.create.responses[201]>;
export type LeadsListResponse = z.infer<typeof api.leads.list.responses[200]>;
export type ValidationError = z.infer<typeof errorSchemas.validation>;
