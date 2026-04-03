import mongoose from "mongoose";
import { ScrewdriverSchema } from "./screwdriver.schema";

export const Screwdriver =
  mongoose.models.Screwdriver ||
  mongoose.model("Screwdriver", ScrewdriverSchema, "screwdriver");