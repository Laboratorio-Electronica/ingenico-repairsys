import mongoose from "mongoose";
import { TerminalModelSchema } from "./terminal-model.schema";

export const TerminalModel =
  mongoose.models.TerminalModel ||
  mongoose.model("TerminalModel", TerminalModelSchema, "terminalModel");