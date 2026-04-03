import mongoose, { Schema, model, models } from "mongoose";

const BankSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Bank || model("Bank", BankSchema);