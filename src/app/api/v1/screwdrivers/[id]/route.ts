import { toScrewdriverDetailDTO } from "@/infrastructure/screwdriver/screwdriver.mapper";
import { updateScrewdriverSchema } from "@/infrastructure/screwdriver/screwdriver.update";
import { withAuthorization } from "@/lib/auth";
import { handleApiError } from "@/lib/http/handle-api-error";
import { deleteScrewdriver, getScrewdriverById, updateScrewdriver } from "@/services/screwdrivers/screwdrivers.service";
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

      const torque = await getScrewdriverById(id);
      
      if (!torque) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json(toScrewdriverDetailDTO(torque), { status: 200 });
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

      const data = updateScrewdriverSchema.parse(await req.json());
      const updated = await updateScrewdriver(id, data);

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

      const deleted = await deleteScrewdriver(id);

      if (!deleted) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      return handleApiError(error);
    }
  },
);
