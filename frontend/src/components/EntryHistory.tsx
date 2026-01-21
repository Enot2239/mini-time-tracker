import type { TimeEntry } from "../types/entry";
import { groupEntriesByDate, sumHours } from "../utils/groupByDate";
import { DailyGroup } from "./DailyGroup";

export function EntryHistory({ entries }: { entries: TimeEntry[] }) {
  const byDate = groupEntriesByDate(entries);
  const dates = Object.keys(byDate).sort((a, b) => (a < b ? 1 : -1));
  const grandTotal = sumHours(entries);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <h2 style={{ margin: 0 }}>Entry History</h2>
        <strong>Grand total: {grandTotal.toFixed(2)}h</strong>
      </div>

      {dates.length === 0 ? (
        <div style={{ color: "#666" }}>No entries yet.</div>
      ) : (
        dates.map((d) => <DailyGroup key={d} date={d} entries={byDate[d]} />)
      )}
    </div>
  );
}
