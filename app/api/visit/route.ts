import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

// Increments a per-project "like" / interaction counter stored in MongoDB.
// Body: { projectId: string }
export async function POST(req: NextRequest) {
  try {
    const { projectId } = await req.json();
    if (!projectId || typeof projectId !== "string") {
      return NextResponse.json({ error: "projectId is required" }, { status: 400 });
    }

    const normalizedProjectId = projectId.trim().slice(0, 100);
    if (!normalizedProjectId) {
      return NextResponse.json({ error: "projectId is required" }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection("project_likes").findOneAndUpdate(
      { projectId: normalizedProjectId },
      { $inc: { count: 1 }, $setOnInsert: { projectId: normalizedProjectId } },
      { upsert: true, returnDocument: "after" }
    );

    return NextResponse.json({ ok: true, count: result?.count ?? 1 });
  } catch (err) {
    console.error("visit route error", err);
    return NextResponse.json(
      { error: "Could not update counter. Is MONGODB_URI configured?" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const docs = await db.collection("project_likes").find({}).toArray();
    const counts: Record<string, number> = {};
    for (const d of docs) counts[d.projectId] = d.count;
    return NextResponse.json({ ok: true, counts });
  } catch {
    return NextResponse.json({ ok: true, counts: {} });
  }
}
