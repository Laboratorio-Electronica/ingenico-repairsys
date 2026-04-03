import { CreateScrewdriverDTO } from "@/infrastructure/screwdriver/screwdriver.create.dto";
import { UpdateScrewdriverDTO } from "@/infrastructure/screwdriver/screwdriver.update";
import { Screwdriver } from "@/models/screwdriver/screwdriver.model";

export async function findScrewdrivers(
  filter: Record<string, unknown>,
  page: number,
  limit: number
) {
  return Screwdriver
    .find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ serialNumber: 1 })
    .populate({
      path: "workstationId",
      select: "code"
    });
}

export async function countScrewdrivers(
  filter: Record<string, unknown> = {}
) {
  return Screwdriver.countDocuments(filter);
}

export async function findScrewdriverById(id: string) {
  return Screwdriver.findById(id)
}
// import mongoose from 'mongoose';

// export async function findScrewdriverById(id: string) {
//   const result = await Screwdriver.aggregate([
//     {
//       $match: {
//         _id: new mongoose.Types.ObjectId(id),
//       },
//     },
//     {
//       $lookup: {
//         from: "calibrationTorque",
//         let: { screwdriverId: "$_id" },
//         pipeline: [
//           {
//             $match: {
//               $expr: {
//                 $eq: ["$screwdriverId", "$$screwdriverId"],
//               },
//             },
//           },
//           { $sort: { createdAt: -1 } },
//           { $limit: 1 },
//           {
//             $project: {
//               _id: 0,
//               appliedTorque: 1,
//               ok: 1,
//               createdAt: 1,
//             },
//           }
//         ],
//         as: "lastCalibration",
//       },
//     },
//     {
//       $unwind: {
//         path: "$lastCalibration",
//         preserveNullAndEmptyArrays: true,
//       },
//     },
//   ]);

//   return result[0] || null;
// }

export async function createScrewdriver(data: CreateScrewdriverDTO) {
  return Screwdriver.create(data);
}

export async function updateScrewdriver(id: string, data: UpdateScrewdriverDTO) {
  return Screwdriver.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function updateScrewdriverLastCalibration(id: string, lastCalibration: Date, currentTorque: number) {
  return Screwdriver.findByIdAndUpdate(id, { lastCalibration, currentTorque }, { new: true });
}

export async function deleteScrewdriver(id: string) {
  return Screwdriver.findByIdAndDelete(id);
}