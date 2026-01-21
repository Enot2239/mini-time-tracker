export type TimeEntry = {
  id: string;
  date: string; // YYYY-MM-DD
  project: string;
  hours: number;
  description: string;
  createdAt: string;
};

export type CreateEntryPayload = {
  date: string;
  project: string;
  hours: number;
  description: string;
};
