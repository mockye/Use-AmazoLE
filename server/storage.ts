import { db } from "./db";
import { leads, type CreateLeadRequest, type LeadResponse } from "@shared/schema";

export interface IStorage {
  createLead(input: CreateLeadRequest): Promise<LeadResponse>;
  listLeads(): Promise<LeadResponse[]>;
}

export class DatabaseStorage implements IStorage {
  async createLead(input: CreateLeadRequest): Promise<LeadResponse> {
    const [created] = await db.insert(leads).values(input).returning();
    return created;
  }

  async listLeads(): Promise<LeadResponse[]> {
    return await db.select().from(leads).orderBy(leads.id);
  }
}

export const storage = new DatabaseStorage();
