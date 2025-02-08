import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import pdfParse from "pdf-parse";
import path from "path";
import os from "os";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const uploadedFile = formData.get("filepond");

    if (!uploadedFile || !(uploadedFile instanceof File)) {
      return NextResponse.json({ error: "No valid file uploaded." }, { status: 400 });
    }

    if (uploadedFile.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are supported." }, { status: 400 });
    }

    // ✅ Use OS-independent temp path
    const fileName = `${uuidv4()}.pdf`;
    const tempFilePath = path.join(os.tmpdir(), fileName);

    // ✅ Convert ArrayBuffer to Buffer & Save
    const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
    await fs.writeFile(tempFilePath, fileBuffer);

    // ✅ Parse PDF using `pdf-parse`
    const dataBuffer = await fs.readFile(tempFilePath);
    const parsedData = await pdfParse(dataBuffer);

    if (!parsedData.text.trim()) {
      return NextResponse.json({ error: "Failed to extract text from PDF. The content might not be readable." }, { status: 400 });
    }

    return NextResponse.json({ parsedText: parsedData.text, fileName });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
