import { CaptureMethod } from "@/shared/enums/capture-method";
import { Types } from "mongoose";

export interface ICalibrationTorque {
  _id: Types.ObjectId;

  technicianId: Types.ObjectId;
  workstationId: Types.ObjectId;
  screwdriverId: Types.ObjectId;
  modelId: Types.ObjectId;
  torqueSpecId: Types.ObjectId;

  expectedTorque: number;
  appliedTorque: number;
  tolerance: number;

  // 🔥 SIEMPRE DEBEN EXISTIR
  diff: number;
  diffPercentage: number;

  // isCorrect: boolean;

  // 🔥 MUY ÚTIL
  captureMethod: CaptureMethod;

  observations?: string;

  // 🔥 SNAPSHOTS
  technicianSnapshot: {
    username: string;
  };

  screwdriverSnapshot: {
    serialNumber: string;
    model: string;
  };

  workstationSnapshot: {
    code: string;
  };

  modelSnapshot: {
    code: string;
  };

  createdAt: Date;
  updatedAt?: Date;
}

// import { Types } from "mongoose";

// export interface ICalibrationTorque {
//   _id: Types.ObjectId;

//   technicianId: Types.ObjectId;
//   workstationId: Types.ObjectId;
//   screwdriverId: Types.ObjectId;
//   modelId: Types.ObjectId;
//   torqueSpecId: Types.ObjectId;

//   expectedTorque: number;
//   appliedTorque: number;
//   tolerance: number;
//   isCorrect: boolean;

//   diff?: number;
//   diffPercentage?: number;
//   attempts?: number;

//   observations?: string;

//   // 🔥 SNAPSHOTS NECESARIOS

//   technicianSnapshot?: {
//     username?: string;
//   };

//   screwdriverSnapshot?: {
//     serialNumber?: string;
//     model?: string;
//   };

//   workstationSnapshot?: {
//     name?: string;
//   };

//   modelSnapshot?: {
//     code?: string;
//   };

//   createdAt: Date;
//   updatedAt?: Date;
// }

// // import { Types } from "mongoose";

// // export interface ICalibrationTorque {
// //   _id: Types.ObjectId;

// //   technicianId: Types.ObjectId;
// //   workstationId: Types.ObjectId;
// //   screwdriverId: Types.ObjectId;
// //   modelId: Types.ObjectId;
// //   torqueSpecId: Types.ObjectId;

// //   expectedTorque: number;
// //   appliedTorque: number;
// //   tolerance: number;
// //   isCorrect: boolean;

// //   observations?: string;

// //   // ✅ AGREGAR ESTO
// //   screwdriverSnapshot?: {
// //     serialNumber?: string;
// //     model?: string;
// //   };

// //   workstationSnapshot?: {
// //     name?: string;
// //   };

// //   createdAt: Date;
// //   updatedAt?: Date;
// // }

// // // import { Types } from "mongoose";

// // // export interface ICalibrationTorque {
// // //   _id: Types.ObjectId;

// // //   technician: Types.ObjectId;

// // //   workstationId: Types.ObjectId;
// // //   screwdriverId: Types.ObjectId;
// // //   modelId: Types.ObjectId;
// // //   torqueSpecId: Types.ObjectId;

// // //   expectedTorque: number;
// // //   appliedTorque: number;
// // //   tolerance: number;
// // //   isCorrect: boolean;

// // //   observations?: string;

// // //   createdAt: Date;
// // //   updatedAt?: Date;
// // // }

// // // // import { Types } from "mongoose";

// // // // export interface ICalibrationTorque {
// // // //   _id: Types.ObjectId;

// // // //   technician: Types.ObjectId;
// // // //   workstationId: Types.ObjectId;
// // // //   screwdriverId: Types.ObjectId;
// // // //   modelId: Types.ObjectId;
// // // //   torqueSpecId: Types.ObjectId;

// // // //   expectedTorque: number;
// // // //   appliedTorque: number;
// // // //   tolerance: number;
// // // //   isCorrect: boolean;

// // // //   diff?: number;
// // // //   diffPercentage?: number;

// // // //   observations?: string;

// // // //   createdAt: Date;
// // // //   updatedAt?: Date;
// // // // }

// // // // // import { Types } from "mongoose"

// // // // // export interface ICalibrationTorque {
// // // // //   _id: Types.ObjectId;
// // // // //   technician: string
// // // // //   workstationId: Types.ObjectId;
// // // // //   screwdriverId: Types.ObjectId;
// // // // //   modelId: Types.ObjectId;
// // // // //   torqueSpecId: Types.ObjectId;
// // // // //   expectedTorque: number
// // // // //   appliedTorque: number
// // // // //   tolerance: number
// // // // //   isCorrect: boolean
// // // // //   observations?: string
// // // // // }