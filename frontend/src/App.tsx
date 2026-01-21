import { useEffect, useState } from "react";
import "./App.css";
import type { CreateEntryPayload, TimeEntry } from "./types/entry";
import { createEntry, fetchEntries } from "./api/entries.api";
import { EntryForm } from "./components/EntryForm";
import { EntryHistory } from "./components/EntryHistory";

export default function App() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setIsLoading(true);
    try {
      const data = await fetchEntries();
      setEntries(data);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave(payload: CreateEntryPayload) {
    setError(null);
    setIsSaving(true);
    try {
      await createEntry(payload);
      await load();
    } catch (e: any) {
      setError(e?.message ?? "Failed to save");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: 16, display: "grid", gap: 16 }}>
      <h1 style={{ margin: 0 }}>Mini Time Tracker</h1>

      <EntryForm onSave={handleSave} isSaving={isSaving} error={error} />

      {isLoading ? <div>Loading...</div> : <EntryHistory entries={entries} />}
    </div>
  );
}
