import { Schema } from "mongoose";
import { ICalibrationTorque } from "./calibration-torque.interface";
import { CaptureMethod } from "@/shared/enums/capture-method";

export const CalibrationTorqueSchema = new Schema<ICalibrationTorque>(
  {
    technicianId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },

    workstationId: {
      type: Schema.Types.ObjectId,
      ref: "workstation",
      required: true,
      index: true,
    },

    screwdriverId: {
      type: Schema.Types.ObjectId,
      ref: "screwdriver",
      required: true,
      index: true,
    },

    modelId: {
      type: Schema.Types.ObjectId,
      ref: "equipmentModel",
      required: true,
    },

    torqueSpecId: {
      type: Schema.Types.ObjectId,
      ref: "torqueSpec",
      required: true,
    },

    expectedTorque: {
      type: Number,
      required: true,
    },

    appliedTorque: {
      type: Number,
      required: true,
    },

    tolerance: {
      type: Number,
      required: true,
    },

    // 🔥 NUEVO
    diff: {
      type: Number,
      required: true,
    },

    diffPercentage: {
      type: Number,
      required: true,
    },

    // isCorrect: {
    //   type: Boolean,
    //   required: true,
    //   index: true,
    // },

    // 🔥 NUEVO
    captureMethod: {
      type: String,
      enum: CaptureMethod,
      required: true,
    },

    observations: {
      type: String,
      default: "N/A",
      trim: true,
    },

    // 🔥 SNAPSHOTS

    technicianSnapshot: {
      username: { type: String, required: true },
    },

    screwdriverSnapshot: {
      serialNumber: { type: String, required: true },
      model: { type: String, required: true },
    },

    workstationSnapshot: {
      code: { type: String, required: true },
    },

    modelSnapshot: {
      code: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

// 🔥 ÍNDICES
CalibrationTorqueSchema.index({ createdAt: -1 });
CalibrationTorqueSchema.index({ technicianId: 1 });
CalibrationTorqueSchema.index({ workstationId: 1 });
CalibrationTorqueSchema.index({ screwdriverId: 1 });
CalibrationTorqueSchema.index({ isCorrect: 1 });

// import { Schema } from "mongoose";
// import { ICalibrationTorque } from "./calibration-torque.interface";

// export const CalibrationTorqueSchema = new Schema<ICalibrationTorque>(
//   {
//     technician: {
//       type: Schema.Types.ObjectId,
//       ref: "user",
//       required: true,
//       trim: true,
//     },

//     workstationId: {
//       type: Schema.Types.ObjectId,
//       ref: "workstation",
//       required: true,
//       index: true,
//     },

//     screwdriverId: {
//       type: Schema.Types.ObjectId,
//       ref: "screwdriver",
//       required: true,
//       index: true,
//     },

//     modelId: {
//       type: Schema.Types.ObjectId,
//       ref: "equipmentModel",
//       required: true,
//     },

//     torqueSpecId: {
//       type: Schema.Types.ObjectId,
//       ref: "torqueSpec",
//       required: true,
//     },

//     expectedTorque: {
//       type: Number,
//       required: true,
//     },

//     appliedTorque: {
//       type: Number,
//       required: true,
//     },

//     tolerance: {
//       type: Number,
//       required: true,
//     },

//     isCorrect: {
//       type: Boolean,
//       required: true,
//       index: true,
//     },

//     observations: {
//       type: String,
//       default: "",
//       trim: true,
//     },

//     // 🔥 FUTURO (recomendado pero opcional)
//     // validationImage: String,
//     // measurementImage: String,

//     // 🔥 SNAPSHOT (nivel pro)
//     screwdriverSnapshot: {
//       serialNumber: String,
//       model: String,
//     },

//     workstationSnapshot: {
//       name: String,
//     },
//   },
//   {
//     timestamps: true, // 🔥 CRÍTICO
//   }
// );

// CalibrationTorqueSchema.index({ createdAt: -1 });
// CalibrationTorqueSchema.index({ technician: 1 });
// CalibrationTorqueSchema.index({ workstationId: 1 });
// CalibrationTorqueSchema.index({ screwdriverId: 1 });

// // import { Schema } from "mongoose";
// // import { ICalibrationTorque } from "./calibration-torque.interface";

// // export const CalibrationTorqueSchema = new Schema<ICalibrationTorque>(
// //   {
// //     technician: {
// //       type: Schema.Types.ObjectId,
// //       ref: "user",
// //       required: true,
// //       trim: true,
// //     },

// //     workstationId: {
// //       type: Schema.Types.ObjectId,
// //       ref: "workstation",
// //       required: true,
// //     },

// //     screwdriverId: {
// //       type: Schema.Types.ObjectId,
// //       ref: "screwdriver",
// //       required: true,
// //     },

// //     modelId: {
// //       type: Schema.Types.ObjectId,
// //       ref: "equipmentModel",
// //       required: true,
// //     },

// //     torqueSpecId: {
// //       type: Schema.Types.ObjectId,
// //       ref: "torqueSpec",
// //       required: true,
// //     },

// //     expectedTorque: {
// //       type: Number,
// //       required: true,
// //     },

// //     appliedTorque: {
// //       type: Number,
// //       required: true,
// //     },

// //     tolerance: {
// //       type: Number,
// //       required: true,
// //     },

// //     isCorrect: {
// //       type: Boolean,
// //       required: true,
// //     },

// //     observations: {
// //       type: String,
// //       default: "",
// //       trim: true,
// //     },

// //     // 🔥 MUY IMPORTANTE (para futuro)
// //     // validationImage: String,
// //     // measurementImage: String
// //   },
// //   {
// //     timestamps: true, // 🔥 CLAVE
// //   }
// // );

// // CalibrationTorqueSchema.index({ createdAt: -1 });
// // CalibrationTorqueSchema.index({ workstationId: 1 });
// // CalibrationTorqueSchema.index({ screwdriverId: 1 });

// // // import { Schema } from "mongoose";
// // // import { ICalibrationTorque } from "./calibration-torque.interface";

// // // export const CalibrationTorqueSchema = new Schema<ICalibrationTorque>(
// // //   {
// // //     technician: {
// // //       type: String,
// // //       required: true
// // //     },
// // //     workstationId: {
// // //       type: Schema.Types.ObjectId,
// // //       ref: "workstation",
// // //       required: true
// // //     },
// // //     screwdriverId: {
// // //       type: Schema.Types.ObjectId,
// // //       ref: "screwdriver",
// // //       required: true
// // //     },
// // //     modelId: {
// // //       type: Schema.Types.ObjectId,
// // //       ref: "equipmentModel",
// // //       required: true
// // //     },
// // //     torqueSpecId: {
// // //       type: Schema.Types.ObjectId,
// // //       ref: "torqueSpec",
// // //       required: true
// // //     },
// // //     expectedTorque: Number,
// // //     appliedTorque: Number,
// // //     tolerance: Number,
// // //     isCorrect: Boolean,
// // //     observations: String,
// // //     // validationImage: String,
// // //     // measurementImage: String
// // //   }
// // // )