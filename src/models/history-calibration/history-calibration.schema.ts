import mongoose from "mongoose"

const HistoryCalibrationSchema = new mongoose.Schema(
  {
    technical: String,

    workstationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workstation",
    },

    screwdriverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screwdriver",
    },

    terminalModel: String,
    terminalTechnology: String,

    waitTorque: Number,
    appliedTorque: Number,
    tolerance: Number,

    isCorrect: Boolean,

    observations: String,

    imagenValidation: String,
    imagenMeasurement: String,
  },
  { timestamps: true }
)

export default mongoose.models.HistoryCalibration ||
  mongoose.model("HistoryCalibration", HistoryCalibrationSchema)