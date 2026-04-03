import { toTerminalModelListDTO } from "@/infrastructure/terminal-model/terminal-model.mapper";
import { updateTerminalModelSchema } from "@/infrastructure/terminal-model/terminal-model.update.dto";
import { withAuthorization } from "@/lib/auth";
import { handleApiError } from "@/lib/http/handle-api-error";
import {
  deleteTerminalModel,
  getTerminalModelById,
  updateTerminalModel,
} from "@/services/terminal-models/terminal-models.service";
import { PERMISSIONS } from "@/shared/auth/permissions";
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
      // const { language = LANGUAGES.ES } = querySchema.parse(
      //   Object.fromEntries(searchParams.entries())
      // );

      const torque = await getTerminalModelById(id);

      if (!torque) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json(toTerminalModelListDTO(torque), { status: 200 });
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

      const data = updateTerminalModelSchema.parse(await req.json());
      const updated = await updateTerminalModel(id, data);

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

      const deleted = await deleteTerminalModel(id);

      if (!deleted) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      return handleApiError(error);
    }
  },
);
