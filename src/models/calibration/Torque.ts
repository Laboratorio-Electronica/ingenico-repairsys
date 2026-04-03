import { Schema, model, models } from "mongoose";

const TorqueSchema = new Schema({
  family: String,

  torque: Number,

  tolerance: Number,

  use: String,
});

export default models.Torque || model("Torque", TorqueSchema);