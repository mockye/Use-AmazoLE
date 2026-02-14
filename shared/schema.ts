import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({ id: true });

export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;

// === API CONTRACT TYPES ===
export type CreateLeadRequest = InsertLead;
export type LeadResponse = Lead;
export type LeadsListResponse = Lead[];
