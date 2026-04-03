import { NextResponse } from "next/server";

// apiHandler acepta cualquier tipo de contexto
export type HandlerFn<T = unknown> = (req: Request, context: T) => Promise<NextResponse>;

// apiHandler genérico
export function apiHandler<T = unknown>(handler: HandlerFn<T>) {
  return async (req: Request, context: T): Promise<NextResponse> => {
    try {
      return await handler(req, context);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`[API ERROR]: ${message}`);
      return NextResponse.json(
        { error: "Internal server error", details: message },
        { status: 500 }
      );
    }
  };
}
