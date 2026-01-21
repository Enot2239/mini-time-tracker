import type { CreateEntryPayload, TimeEntry } from "../types/entry";

export async function fetchEntries(): Promise<TimeEntry[]> {
  const res = await fetch("/api/entries");
  if (!res.ok) throw new Error("Failed to load entries");
  return res.json();
}

export async function createEntry(payload: CreateEntryPayload): Promise<TimeEntry> {
  const res = await fetch("/api/entries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const msg =
      (data && (data.message || data.error)) ||
      "Failed to create entry";
    throw new Error(msg);
  }

  return data as TimeEntry;
}
