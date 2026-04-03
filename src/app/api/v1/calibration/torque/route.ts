import { createCalibrationTorqueSchema } from "@/infrastructure/calibration-torque/calibration-torque.create.dto";
import { toCalibrationTorqueListDTO } from "@/infrastructure/calibration-torque/calibration-torque.mapper";
import { handleApiError } from "@/lib/http/handle-api-error";
import { Screwdriver } from "@/models";
import { createCalibrationTorque } from "@/services/calibration-torque/calibration-torque.service";
import { getCalibrationTorques, getTotalCalibrationTorques } from "@/services/calibration-torque/calibration-torque.service";
import { querySchema } from "@/shared/interfaces/query.schema";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const calibrationTorqueQuerySchema = querySchema.extend({
  screwdriverId: z.string().optional(),
});

async function buildCalibrationTorqueFilter(
  screwdriverId?: String,
) {
  const filter: Record<string, unknown> = {};

  if (screwdriverId) {
    const screw = await Screwdriver.findById(screwdriverId);

    if (!screw) {
      filter._id = null;
      return filter;
    }

    filter.screwdriverId = screw._id;
  }

  return filter;
}

export async function GET(req: NextRequest) {
  try {
    const query = Object.fromEntries(req.nextUrl.searchParams.entries());

    const {
      screwdriverId,
      limit = 10,
      page = 1,
    } = calibrationTorqueQuerySchema.parse(query);

    const safeLimit = Math.min(limit, 100);
    const safePage = Math.min(Math.max(page, 1), 1000);
    const filter = await buildCalibrationTorqueFilter(screwdriverId);

    const [screwdriver, total] = await Promise.all([
      getCalibrationTorques(filter, safePage, safeLimit),
      getTotalCalibrationTorques(filter),
    ]);

    const response = {
      data: screwdriver.map((w) => toCalibrationTorqueListDTO(w)),
      pagination: {
        total,
        limit: safeLimit,
        currentPage: safePage,
        totalPages: Math.ceil(total / safeLimit),
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = createCalibrationTorqueSchema.parse(body);
    const created = await createCalibrationTorque(data);

    return NextResponse.json({ id: created._id }, { status: 201 });
  } catch (error) {
    // console.log(error)
    return handleApiError(error);
  }
}