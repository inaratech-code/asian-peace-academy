import { NextRequest, NextResponse } from "next/server";
import { readJsonFile, writeJsonFile } from "@/lib/fileHandler";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    const content = await readJsonFile<Record<string, unknown>>("content.json");
    return NextResponse.json(content);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to load content" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const content = await readJsonFile<Record<string, unknown>>("content.json");

    // Merge and sanitize top-level keys
    const updates = body as Record<string, unknown>;
    for (const key of Object.keys(updates)) {
      if (typeof updates[key] === "object" && updates[key] !== null) {
        (content as Record<string, unknown>)[key] = updates[key];
      }
    }

    await writeJsonFile("content.json", content);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update content" },
      { status: 500 }
    );
  }
}
