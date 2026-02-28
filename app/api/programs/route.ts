import { NextRequest, NextResponse } from "next/server";
import { readJsonFile, writeJsonFile, sanitizeInput, sanitizeSlug } from "@/lib/fileHandler";
import { requireAuth } from "@/lib/auth";

interface Program {
  id: string;
  title: string;
  slug: string;
  duration: string;
  format: string;
  description: string;
  highlights: string[];
  ctaText: string;
}

interface ProgramsData {
  programs: Program[];
}

function sanitizeProgram(body: Record<string, unknown>): Omit<Program, "id"> {
  const title = sanitizeInput(body.title) || "Untitled";
  const slug = sanitizeSlug(body.slug || title);
  return {
    title,
    slug,
    duration: sanitizeInput(body.duration) || "",
    format: sanitizeInput(body.format) || "",
    description: sanitizeInput(body.description) || "",
    highlights: Array.isArray(body.highlights)
      ? body.highlights.slice(0, 6).map((h) => sanitizeInput(String(h))).filter(Boolean)
      : [],
    ctaText: sanitizeInput(body.ctaText) || "Learn More",
  };
}

export async function GET() {
  try {
    const data = await readJsonFile<ProgramsData>("programs.json");
    return NextResponse.json(data.programs);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to load programs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = await readJsonFile<ProgramsData>("programs.json");
    const maxId = data.programs.reduce((m, p) => Math.max(m, parseInt(p.id, 10) || 0), 0);
    const newProgram: Program = {
      ...sanitizeProgram(body as Record<string, unknown>),
      id: String(maxId + 1),
    };
    data.programs.push(newProgram);
    await writeJsonFile("programs.json", data);
    return NextResponse.json(newProgram);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create program" },
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
    const id = typeof body.id === "string" ? body.id : "";
    if (!id) {
      return NextResponse.json({ error: "Program id required" }, { status: 400 });
    }

    const data = await readJsonFile<ProgramsData>("programs.json");
    const index = data.programs.findIndex((p) => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    const updated = { ...data.programs[index], ...sanitizeProgram(body as Record<string, unknown>), id };
    data.programs[index] = updated;
    await writeJsonFile("programs.json", data);
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update program" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Program id required" }, { status: 400 });
  }

  try {
    const data = await readJsonFile<ProgramsData>("programs.json");
    const filtered = data.programs.filter((p) => p.id !== id);
    if (filtered.length === data.programs.length) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }
    data.programs = filtered;
    await writeJsonFile("programs.json", data);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete program" },
      { status: 500 }
    );
  }
}
