import { CalibrationTorqueDocument } from "@/models/calibration-torque/calibration-torque.document";
import { CalibrationTorqueListDTO } from "./calibration-torque.list.dto";

export function toCalibrationTorqueListDTO(
  c: CalibrationTorqueDocument
): CalibrationTorqueListDTO {
  return {
    id: c._id.toString(),

    technician: {
      id:
        c.technicianId?._id?.toString?.() ||
        c.technicianId?.toString?.(),
      username:
        c.technicianSnapshot.username
    },

    workstation: {
      id:
        c.workstationId?._id?.toString?.() ||
        c.workstationId?.toString?.(),
      code:
        c.workstationSnapshot.code
    },

    screwdriver: {
      id:
        c.screwdriverId?._id?.toString?.() ||
        c.screwdriverId?.toString?.(),
      serialNumber:
        c.screwdriverSnapshot.serialNumber,
      model:
        c.screwdriverSnapshot.model
    },

    model: {
      id:
        c.modelId?._id?.toString?.() ||
        c.modelId?.toString?.(),
      code:
        c.modelSnapshot.code
    },

    expectedTorque: c.expectedTorque,
    appliedTorque: c.appliedTorque,
    tolerance: c.tolerance,

    diff: c.diff,
    diffPercentage: c.diffPercentage,

    // isCorrect: c.isCorrect,

    captureMethod: c.captureMethod,

    observations: c.observations,

    createdAt: c.createdAt.toISOString(),
  };
}

// import { CalibrationTorqueDocument } from "@/models/calibration-torque/calibration-torque.document";
// import { CalibrationTorqueListDTO } from "./calibration-torque.list.dto";

// export function toCalibrationTorqueListDTO(
//   c: CalibrationTorqueDocument
// ): CalibrationTorqueListDTO {
//   return {
//     id: c._id.toString(),

//     technician: c.technicianId,

//     workstation: {
//       id: c.workstationId?._id?.toString?.() || c.workstationId?.toString?.(),
//       name:
//         c.workstationSnapshot?.name ||
//         (typeof c.workstationId === "object" ? c.workstationId?.name : undefined),
//     },

//     screwdriver: {
//       id: c.screwdriverId?._id?.toString?.() || c.screwdriverId?.toString?.(),
//       serialNumber:
//         c.screwdriverSnapshot?.serialNumber ||
//         (typeof c.screwdriverId === "object"
//           ? c.screwdriverId?.serialNumber
//           : undefined),
//       model:
//         c.screwdriverSnapshot?.model ||
//         (typeof c.screwdriverId === "object"
//           ? c.screwdriverId?.model
//           : undefined),
//     },

//     model: {
//       id: c.modelId?._id?.toString?.() || c.modelId?.toString?.(),
//       code:
//         typeof c.modelId === "object" ? c.modelId?.code : undefined,
//     },

//     torqueSpec: {
//       id: c.torqueSpecId?._id?.toString?.() || c.torqueSpecId?.toString?.(),
//       torque:
//         typeof c.torqueSpecId === "object"
//           ? c.torqueSpecId?.torque
//           : undefined,
//       tolerance:
//         typeof c.torqueSpecId === "object"
//           ? c.torqueSpecId?.tolerance
//           : undefined,
//     },

//     expectedTorque: c.expectedTorque,
//     appliedTorque: c.appliedTorque,
//     tolerance: c.tolerance,
//     isCorrect: c.isCorrect,

//     observations: c.observations,

//     createdAt: c.createdAt.toISOString(),
//   };
// }

// // import { CalibrationTorqueDocument } from "@/models/calibration-torque/calibration-torque.document";
// // import { CalibrationTorqueListDTO } from "./calibration-torque.list.dto";

// // export function toCalibrationTorqueListDTO(
// //   calibrationTorque: CalibrationTorqueDocument
// // ): CalibrationTorqueListDTO {
// //   return {
// //     id: calibrationTorque._id.toString(),
// //     technician: calibrationTorque.technician,
// //     workstationId: calibrationTorque.workstationId,
// //     screwdriverId: calibrationTorque.screwdriverId,
// //     modelId: calibrationTorque.modelId,
// //     torqueSpecId: calibrationTorque.torqueSpecId,
// //     expectedTorque: calibrationTorque.expectedTorque,
// //     appliedTorque: calibrationTorque.appliedTorque,
// //     tolerance: calibrationTorque.tolerance,
// //     isCorrect: calibrationTorque.isCorrect,
// //   }
// // }