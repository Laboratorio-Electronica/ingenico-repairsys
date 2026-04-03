import mongoose from "mongoose";
import { WorkstationSchema } from "./workstation.schema";

export const Workstation =
  mongoose.models.Workstation ||
  mongoose.model("Workstation", WorkstationSchema, "workstations");