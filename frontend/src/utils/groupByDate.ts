import type { TimeEntry } from "../types/entry";

export type EntriesByDate = Record<string, TimeEntry[]>;

export function groupEntriesByDate(entries: TimeEntry[]): EntriesByDate {
  return entries.reduce<EntriesByDate>((acc, e) => {
    (acc[e.date] ??= []).push(e);
    return acc;
  }, {});
}

export function sumHours(entries: TimeEntry[]): number {
  return entries.reduce((s, e) => s + e.hours, 0);
}
