import { createTorqueSpecSchema } from "@/infrastructure/torque-spec/torque-spec.create.dto";
import { toTorqueSpecListDTO } from "@/infrastructure/torque-spec/torque-spec.mapper";
import { handleApiError } from "@/lib/http/handle-api-error";
import { LANGUAGES } from "@/lib/i18n/language";
import { TerminalModel } from "@/models";
import { createTorqueSpec, getTorqueSpecs, getTotalTorqueSpecs } from "@/services/torque-spec/torque-spec.service";
import { querySchema } from "@/shared/interfaces/query.schema";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const torqueSpecQuerySchema = querySchema.extend({
  modelId: z.string().optional()
});

async function buildTorqueSpecFilter(
  modelId?: string,
) {
  const filter: Record<string, unknown> = {};

  if (modelId) {
      const model = await TerminalModel.findById(modelId);
  
      if (!model) {
        filter._id = null;
        return filter;
      }
  
      filter.modelId = model._id;
    }

  return filter;
}

export async function GET(req: NextRequest) {
  try {
    const query = Object.fromEntries(req.nextUrl.searchParams.entries());

    const {
      modelId,
      limit = 10,
      page = 1,
      language = LANGUAGES.ES
    } = torqueSpecQuerySchema.parse(query);

    const safeLimit = Math.min(limit, 100);
    const safePage = Math.min(Math.max(page, 1), 1000);
    const filter = await buildTorqueSpecFilter(modelId);

    const [torque, total] = await Promise.all([
      getTorqueSpecs(filter, safePage, safeLimit),
      getTotalTorqueSpecs(filter),
    ]);

    const response = {
      data: torque.map((t) => toTorqueSpecListDTO(t, language)),
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
    const data = createTorqueSpecSchema.parse(body);
    const created = await createTorqueSpec(data);

    return NextResponse.json({ id: created._id }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}