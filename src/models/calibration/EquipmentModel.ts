import mongoose from "mongoose"

const EquipmentModelSchema = new mongoose.Schema({
  name: String,
  family: String,
});

export default mongoose.models.EquipmentModel ||
  mongoose.model("EquipmentModel", EquipmentModelSchema);