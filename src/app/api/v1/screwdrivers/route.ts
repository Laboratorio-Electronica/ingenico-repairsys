import { createScrewdriverSchema } from "@/infrastructure/screwdriver/screwdriver.create.dto";
import { toScrewdriverListDTO } from "@/infrastructure/screwdriver/screwdriver.mapper";
import { handleApiError } from "@/lib/http/handle-api-error";
import { createScrewdriver, getScrewdrivers, getTotalScrewdrivers } from "@/services/screwdrivers/screwdrivers.service";
import { ToolStatus } from "@/shared/enums/tool-status.enum";
import { querySchema } from "@/shared/interfaces/query.schema";
import { NextRequest, NextResponse } from "next/server"
import z from "zod";
import '@/models'

const screwdriverQuerySchema = querySchema.extend({
  workstationId: z.string().optional(),
});

async function buildScrewdriverFilter(
  workstationId?: string,
) {
  const filter: Record<string, unknown> = {};

  if (workstationId) filter.workstationId = workstationId;

  return filter;
}

export async function GET(req: NextRequest) {
  try {
    const query = Object.fromEntries(req.nextUrl.searchParams.entries());

    const {
      workstationId,
      limit = 10,
      page = 1,
    } = screwdriverQuerySchema.parse(query);

    const safeLimit = Math.min(limit, 100);
    const safePage = Math.min(Math.max(page, 1), 1000);
    const filter = await buildScrewdriverFilter(workstationId);

    const [screwdriver, total] = await Promise.all([
      getScrewdrivers(filter, safePage, safeLimit),
      getTotalScrewdrivers(filter),
    ]);

    const response = {
      data: screwdriver.map((w) => toScrewdriverListDTO(w)),
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
    const data = createScrewdriverSchema.parse(body);
    const created = await createScrewdriver(data);

    return NextResponse.json({ id: created._id }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}