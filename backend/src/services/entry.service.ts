import { prisma } from "../prisma";
import type { CreateEntryInput } from "../validators/entry.validator";

export async function listEntries() {
  return prisma.timeEntry.findMany({
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });
}

export async function createEntry(input: CreateEntryInput) {
  const agg = await prisma.timeEntry.aggregate({
    where: { date: input.date },
    _sum: { hours: true },
  });

  const current = agg._sum.hours ?? 0;
  const nextTotal = current + input.hours;

  if (nextTotal > 24) {
    const remaining = Math.max(0, 24 - current);
    const msg =
      remaining === 0
        ? `Maximum 24 hours per date exceeded for ${input.date}`
        : `Maximum 24 hours per date exceeded for ${input.date}. Remaining: ${remaining}`;
    const err = new Error(msg) as Error & { status?: number };
    err.status = 400;
    throw err;
  }

  return prisma.timeEntry.create({ data: input });
}
