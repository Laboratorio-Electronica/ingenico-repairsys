import mongoose from "mongoose";
import { TorqueSpecSchema } from "./torque-spec.schema";

export const TorqueSpec =
  mongoose.models.TorqueSpec ||
  mongoose.model("TorqueSpec", TorqueSpecSchema, "torqueSpec");

// import mongoose from "mongoose"

// const TorqueSchema = new mongoose.Schema(
//   {
//     familia: {
//       type: String,
//       required: true
//     },

//     torque: {
//       type: Number,
//       required: true
//     },

//     tolerancia: {
//       type: Number,
//       required: true
//     },

//     uso: {
//       type: String,
//       required: true
//     }
//   },
//   { timestamps: true }
// )

// export default mongoose.models.Torque ||
//   mongoose.model("Torque", TorqueSchema)

// // import mongoose from "mongoose"

// // const TorqueSchema = new mongoose.Schema({
// //   familia: String,
// //   torque: Number,
// //   tolerancia: Number,
// //   uso: String,
// // })

// // export default mongoose.models.Torque ||
// //   mongoose.model("Torque", TorqueSchema)