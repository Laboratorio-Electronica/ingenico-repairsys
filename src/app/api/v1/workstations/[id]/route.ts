import { toWorkstationListDTO } from "@/infrastructure/workstation/workstation.mapper";
import { updateWorkstationSchema } from "@/infrastructure/workstation/workstation.update.dto";
import { withAuthorization } from "@/lib/auth";
import { handleApiError } from "@/lib/http/handle-api-error";
import { LANGUAGES } from "@/lib/i18n/language";
import { deleteWorkstation, getWorkstationById, updateWorkstation } from "@/services/workstations/workstations.service";
import { PERMISSIONS } from "@/shared/auth/permissions";
import { querySchema } from "@/shared/interfaces/query.schema";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = withAuthorization(
  PERMISSIONS.READ,
  async (req: NextRequest, { params }: any) => {
    try {
      const { id } = await params;

      if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
      }

      const { searchParams } = new URL(req.url);
      const { language = LANGUAGES.ES } = querySchema.parse(
        Object.fromEntries(searchParams.entries())
      );

      const torque = await getWorkstationById(id);

      if (!torque) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json(toWorkstationListDTO(torque, language), { status: 200 });
    } catch (error) {
      return handleApiError(error);
    }
  },
);

export const PUT = withAuthorization(
  PERMISSIONS.UPDATE,
  async (req: NextRequest, { params }: any) => {
    try {
      const { id } = await params;

      if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
      }

      const data = updateWorkstationSchema.parse(await req.json());
      const updated = await updateWorkstation(id, data);

      if (!updated) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      return handleApiError(error);
    }
  },
);

export const DELETE = withAuthorization(
  PERMISSIONS.DELETE,
  async (_: NextRequest, { params }: any) => {
    try {
      const { id } = await params;

      if (!isValidObjectId(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
      }

      const deleted = await deleteWorkstation(id);

      if (!deleted) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      return handleApiError(error);
    }
  },
);
