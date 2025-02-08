import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Function to split document into overlapping chunks
function createChunks(text: string, chunkSize = 500, overlap = 50) {
  // ✅ Remove null bytes (\x00) and enforce UTF-8 encoding
  const sanitizedText = text.replace(/\x00/g, "").normalize("NFC").trim();

  if (!sanitizedText) return []; // Prevents empty chunks

  const chunks = [];
  for (let i = 0; i < sanitizedText.length; i += chunkSize - overlap) {
    chunks.push(sanitizedText.slice(i, i + chunkSize));
  }
  return chunks;
}

export async function POST(req: Request) {
  try {
    const { project_id, content } = await req.json();

    if (!project_id || typeof project_id !== "string") {
      return NextResponse.json({ success: false, error: "Invalid project ID" }, { status: 400 });
    }

    if (!content || typeof content !== "string") {
      return NextResponse.json({ success: false, error: "Invalid content format" }, { status: 400 });
    }

    // ✅ Log content issues
    if (content.includes("\x00")) {
      console.warn("⚠️ Null byte detected in content. Cleaning before saving.");
    }

    // ✅ Process & clean document into chunks
    const chunks = createChunks(content);
    console.log(`📄 Processing ${content.length} characters into ${chunks.length} chunks.`);

    if (chunks.length === 0) {
      return NextResponse.json({ success: false, error: "No valid content to process" }, { status: 400 });
    }

    // ✅ Store chunks in Prisma (batch insert)
    await prisma.documents.createMany({
      data: chunks.map((chunk) => ({
        project_id,
        content: chunk,
      })),
    });

    return NextResponse.json({ success: true, message: `Document uploaded and chunked into ${chunks.length} parts!` });
  } catch (error) {
    console.error("❌ Document Upload Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
