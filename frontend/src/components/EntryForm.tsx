import { useMemo, useState } from "react";
import type { CreateEntryPayload } from "../types/entry";
import { PROJECTS } from "../constants/projects";
import { todayYYYYMMDD } from "../utils/date";

type Props = {
  onSave: (payload: CreateEntryPayload) => Promise<void>;
  isSaving: boolean;
  error: string | null;
};

export function EntryForm({ onSave, isSaving, error }: Props) {
  const defaultDate = useMemo(() => todayYYYYMMDD(), []);

  const [date, setDate] = useState(defaultDate);
  const [project, setProject] = useState<(typeof PROJECTS)[number]>(PROJECTS[0]);
  const [hours, setHours] = useState<string>("");
  const [description, setDescription] = useState("");

  const canSubmit =
    date.trim() &&
    project.trim() &&
    description.trim() &&
    Number.isFinite(Number(hours)) &&
    Number(hours) > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    await onSave({
      date,
      project,
      hours: Number(hours),
      description: description.trim(),
    });

    setHours("");
    setDescription("");
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 12 }}>
      <h2 style={{ marginTop: 0 }}>Time Entry</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Project</span>
          <select value={project} onChange={(e) => setProject(e.target.value as any)}>
            {PROJECTS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Hours</span>
          <input
            type="number"
            min={0}
            step="0.25"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="e.g. 2.5"
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Work description</span>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What did you do?"
          />
        </label>

        <button type="submit" disabled={!canSubmit || isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </button>

        {error ? (
          <div style={{ color: "crimson" }}>
            {error}
          </div>
        ) : null}
      </form>
    </div>
  );
}
