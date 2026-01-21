import { Router } from "express";
import { getEntries, postEntry } from "../controllers/entry.controller";

export const entryRouter = Router();

entryRouter.get("/entries", getEntries);
entryRouter.post("/entries", postEntry);
