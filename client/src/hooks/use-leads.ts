import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type CreateLeadInput } from "@shared/routes";
import { z } from "zod";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useLeads() {
  return useQuery({
    queryKey: [api.leads.list.path],
    queryFn: async () => {
      const res = await fetch(api.leads.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Falha ao carregar leads");
      const json = await res.json();
      return parseWithLogging(api.leads.list.responses[200], json, "leads.list");
    },
  });
}

export function useCreateLead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateLeadInput) => {
      const validated = api.leads.create.input.parse(input);
      const res = await fetch(api.leads.create.path, {
        method: api.leads.create.method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const err = parseWithLogging(api.leads.create.responses[400], await res.json(), "leads.create.400");
          throw new Error(err.message);
        }
        throw new Error("Falha ao enviar seus dados. Tente novamente.");
      }

      const json = await res.json();
      return parseWithLogging(api.leads.create.responses[201], json, "leads.create.201");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [api.leads.list.path] });
    },
  });
}
