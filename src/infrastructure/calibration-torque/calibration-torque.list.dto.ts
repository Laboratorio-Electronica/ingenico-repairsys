import { CaptureMethod } from "@/shared/enums/capture-method";

export type CalibrationTorqueListDTO = {
  id: string;

  technician: {
    id: string;
    username: string;
  };

  workstation: {
    id: string;
    code: string;
  };

  screwdriver: {
    id: string;
    serialNumber: string;
    model: string;
  };

  model: {
    id: string;
    code: string;
  };

  expectedTorque: number;
  appliedTorque: number;
  tolerance: number;

  diff: number;
  diffPercentage: number;

  // isCorrect: boolean;

  captureMethod: CaptureMethod;

  observations?: string;

  createdAt: string;
};

// export type CalibrationTorqueListDTO = {
//   id: string;

//   technician: string;

//   workstation: {
//     id: string;
//     name?: string;
//   };

//   screwdriver: {
//     id: string;
//     serialNumber?: string;
//     model?: string;
//   };

//   model: {
//     id: string;
//     code?: string;
//   };

//   torqueSpec: {
//     id: string;
//     torque: number;
//     tolerance: number;
//   };

//   expectedTorque: number;
//   appliedTorque: number;
//   tolerance: number;
//   isCorrect: boolean;

//   observations?: string;

//   createdAt: string;
// };

// // import { Types } from "mongoose";

// // export type CalibrationTorqueListDTO = {
// //   id: string;
// //   technician: string;
// //   workstationId: Types.ObjectId;
// //   screwdriverId: Types.ObjectId;
// //   modelId: Types.ObjectId;
// //   torqueSpecId: Types.ObjectId;
// //   expectedTorque: number;
// //   appliedTorque: number;
// //   tolerance: number;
// //   isCorrect: boolean;
// // }