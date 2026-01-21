import express from "express";
import cors from "cors";
import { entryRouter } from "./routes/entry.routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/api", entryRouter);

// error handler
app.use((err: any, req: any, res: any, next: any) => {
  const status = err?.status ?? 500;
  const message = err?.message ?? "Internal Server Error";
  res.status(status).json({ message });
});
