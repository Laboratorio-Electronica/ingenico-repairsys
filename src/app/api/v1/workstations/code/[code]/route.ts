import { toWorkstationDetailDTO, toWorkstationListDTO } from "@/infrastructure/workstation/workstation.mapper";
import { updateWorkstationSchema } from "@/infrastructure/workstation/workstation.update.dto";
import { handleApiError } from "@/lib/http/handle-api-error";
import { LANGUAGES } from "@/lib/i18n/language";
import {
  deleteWorkstation,
  getWorkstationByCode,
  getWorkstationById,
  updateWorkstation,
} from "@/services/workstations/workstations.service";
import { querySchema } from "@/shared/interfaces/query.schema";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const isValidObjectId = (id: string) => Types.ObjectId.isValid(id);

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const query = Object.fromEntries(
      req.nextUrl.searchParams.entries()
    );

    const { language = LANGUAGES.ES } =
      querySchema.parse(query);

    const workstation = await getWorkstationByCode(code);

    if (!workstation) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      toWorkstationListDTO(workstation, language),
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   try {
//     const { id } = await params;

//     if (!isValidObjectId(id)) {
//       return NextResponse.json({ error: "Invalid id" }, { status: 400 });
//     }

//     const data = updateWorkstationSchema.parse(await req.json());
//     const updated = await updateWorkstation(id, data);

//     if (!updated) {
//       return NextResponse.json({ error: "Not found" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     return handleApiError(error);
//   }
// }

// export async function DELETE(
//   _: NextRequest,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   try {
//     const { id } = await params;

//     if (!isValidObjectId(id)) {
//       return NextResponse.json({ error: "Invalid id" }, { status: 400 });
//     }

//     const deleted = await deleteWorkstation(id);

//     if (!deleted) {
//       return NextResponse.json({ error: "Not found" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     return handleApiError(error);
//   }
// }
