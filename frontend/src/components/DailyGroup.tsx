import type { TimeEntry } from "../types/entry";
import { sumHours } from "../utils/groupByDate";

export function DailyGroup({ date, entries }: { date: string; entries: TimeEntry[] }) {
  const total = sumHours(entries);

  return (
    <div style={{ border: "1px solid #eee", padding: 12, borderRadius: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <h3 style={{ margin: 0 }}>{date}</h3>
        <strong>Total: {total.toFixed(2)}h</strong>
      </div>

      <div style={{ overflowX: "auto", marginTop: 10 }}>
        <table width="100%" cellPadding={8} style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left" }}>
              <th>Date</th>
              <th>Project</th>
              <th>Hours</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} style={{ borderTop: "1px solid #f0f0f0" }}>
                <td>{e.date}</td>
                <td>{e.project}</td>
                <td>{e.hours}</td>
                <td>{e.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
