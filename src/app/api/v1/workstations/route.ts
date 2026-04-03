import { createWorkstationSchema } from "@/infrastructure/workstation/workstation.create.dto";
import { toWorkstationListDTO } from "@/infrastructure/workstation/workstation.mapper";
import { sanitizeRegex } from "@/lib/db/sanitize-regex";
import { handleApiError } from "@/lib/http/handle-api-error";
import { LANGUAGES } from "@/lib/i18n/language";
import {
  createWorkstation,
  getTotalWorkstations,
  getWorkstations,
} from "@/services/workstations/workstations.service";
import { Area, Status } from "@/shared/enums";
import { querySchema } from "@/shared/interfaces/query.schema";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const workstationQuerySchema = querySchema.extend({
  area: z.enum(Area).optional(),
  status: z.enum(Status).optional(),
});

async function buildWorkstationFilter(
  area?: Area,
  status?: Status,
  search?: string,
) {
  const filter: Record<string, unknown> = {};

  if (area) filter.area = area;
  if (status) filter.status = status;

  if (search) {
    const safeSearch = sanitizeRegex(search);
    filter.$or = [
      { "content.es.name": { $regex: safeSearch, $options: "i" } },
      { "content.en.name": { $regex: safeSearch, $options: "i" } },
      { "content.es.description": { $regex: safeSearch, $options: "i" } },
      { "content.en.description": { $regex: safeSearch, $options: "i" } },
    ];
  }

  return filter;
}

export async function GET(req: NextRequest) {
  try {
    const query = Object.fromEntries(req.nextUrl.searchParams.entries());

    const {
      area,
      status,
      search,
      limit = 10,
      page = 1,
      language = LANGUAGES.ES,
    } = workstationQuerySchema.parse(query);

    const safeLimit = Math.min(limit, 100);
    const safePage = Math.min(Math.max(page, 1), 1000);
    const filter = await buildWorkstationFilter(area, status, search);

    const [workstation, total] = await Promise.all([
      getWorkstations(filter, safePage, safeLimit),
      getTotalWorkstations(filter),
    ]);

    const response = {
      data: workstation.map((w) => toWorkstationListDTO(w, language)),
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
    const data = createWorkstationSchema.parse(body);
    const created = await createWorkstation(data);

    return NextResponse.json({ id: created._id }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
