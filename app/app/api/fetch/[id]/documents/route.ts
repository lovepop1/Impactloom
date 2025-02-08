import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const documents = await prisma.documents.findMany({
      where: { project_id: params.id },
      orderBy: { created_at: "asc" }, // Ensures correct order of chunks
    });

    if (!documents.length) {
      return NextResponse.json({ error: "No documents found" }, { status: 404 });
    }

    return NextResponse.json(documents);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching documents" }, { status: 500 });
  }
}
