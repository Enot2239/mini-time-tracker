import type { Request, Response } from "express";
import { createEntrySchema } from "../validators/entry.validator";
import { createEntry, listEntries } from "../services/entry.service";

export async function getEntries(req: Request, res: Response) {
  const entries = await listEntries();
  res.json(entries);
}

export async function postEntry(req: Request, res: Response) {
  const parsed = createEntrySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation error",
      issues: parsed.error.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      })),
    });
  }

  const entry = await createEntry(parsed.data);
  res.status(201).json(entry);
}
