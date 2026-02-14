import type { Express } from "express";
import type { Server } from "http";
import { z } from "zod";
import { api } from "@shared/routes";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  app.get(api.leads.list.path, async (_req, res) => {
    const leads = await storage.listLeads();
    res.json(leads);
  });

  app.post(api.leads.create.path, async (req, res) => {
    try {
      const input = api.leads.create.input.parse(req.body);
      const created = await storage.createLead(input);
      res.status(201).json(created);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0]?.message ?? "Dados inválidos",
          field: err.errors[0]?.path?.join(".") || undefined,
        });
      }
      throw err;
    }
  });

  return httpServer;
}
