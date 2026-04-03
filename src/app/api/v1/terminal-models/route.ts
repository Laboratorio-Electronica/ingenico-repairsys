import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import EquipmentModel from "@/models/calibration/EquipmentModel";
import { querySchema } from "@/shared/interfaces/query.schema";
import z from "zod";
import { TerminalStatus, TerminalTechnology } from "@/shared/enums";
import { sanitizeRegex } from "@/lib/db/sanitize-regex";
import { createTerminalModel, getTerminalModels, getTotalTerminalModels } from "@/services/terminal-models/terminal-models.service";
import { toTerminalModelListDTO } from "@/infrastructure/terminal-model/terminal-model.mapper";
import { handleApiError } from "@/lib/http/handle-api-error";
import { createTerminalModelSchema } from "@/infrastructure/terminal-model/terminal-model.create.dto";

const terminalModelQuerySchema = querySchema.extend({
  status: z.enum(TerminalStatus).optional(),
  technology: z.enum(TerminalTechnology).optional()
});

async function buildTerminalModelFilter(
  status?: TerminalStatus,
  technology?: TerminalTechnology,
  search?: string
) {
  const filter: Record<string, unknown> = {};

  if (status) filter.status = status;
  if (technology) filter.technology = technology;

  if (search) {
      const safeSearch = sanitizeRegex(search);
      filter.$or = [
        { "code": { $regex: safeSearch, $options: "i" } },
      ];
    }

  return filter;
}

// export async function GET() {

//   await connectDB();

//   const data = await EquipmentModel.find();

//   return NextResponse.json(data);
// }
export async function GET(req: NextRequest) {
  try {
    const query = Object.fromEntries(req.nextUrl.searchParams.entries());

    const {
      status,
      limit = 10,
      page = 1,
    } = terminalModelQuerySchema.parse(query);

    const safeLimit = Math.min(limit, 100);
    const safePage = Math.min(Math.max(page, 1), 1000);
    const filter = await buildTerminalModelFilter(status);

    const [screwdriver, total] = await Promise.all([
      getTerminalModels(filter, safePage, safeLimit),
      getTotalTerminalModels(filter),
    ]);

    const response = {
      data: screwdriver.map((t) => toTerminalModelListDTO(t)),
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

// export async function POST(req: Request) {
//   await connectDB()

//   const body = await req.json()

//   const model = await EquipmentModel.create(body)

//   return Response.json(model)
// }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = createTerminalModelSchema.parse(body);
    const created = await createTerminalModel(data);

    return NextResponse.json({ id: created._id }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

// import { NextResponse } from 'next/server'
// import { MongoClient } from 'mongodb'

// const client = new MongoClient(process.env.MONGO_URI!)

// export async function GET() {

//   await client.connect()

//   const db = client.db()

//   const data = await db
//     .collection('equipment_models')
//     .find()
//     .toArray()

//   return NextResponse.json(data)
// }