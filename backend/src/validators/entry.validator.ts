import { z } from "zod";

export const createEntrySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  project: z.string().min(1, "project is required"),
  hours: z.number().positive("hours must be a positive number"),
  description: z.string().min(1, "description is required"),
});

export type CreateEntryInput = z.infer<typeof createEntrySchema>;
