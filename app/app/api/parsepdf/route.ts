import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import PDFParser from "pdf2json";
import os from "os";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData: FormData = await req.formData();
    const uploadedFiles = formData.getAll("FILE");
    let fileName = "";
    let parsedText = "";

    if (uploadedFiles.length === 0) {
      console.log("No files found.");
      return new NextResponse("No File Found", { status: 404 });
    }

    const uploadedFile = uploadedFiles[0];
    console.log("Uploaded file:", uploadedFile);

    if (uploadedFile instanceof File) {
      fileName = uuidv4();
      const tempDir = os.tmpdir(); // ✅ Get temp directory that works on Windows
      const tempFilePath = path.join(tempDir, `${fileName}.pdf`);

      const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
      await fs.writeFile(tempFilePath, fileBuffer);

      const pdfParser = new PDFParser(null, true);

      pdfParser.on("pdfParser_dataError", (errData) =>
        console.error("PDF Parsing Error:", errData.parserError)
      );

      pdfParser.on("pdfParser_dataReady", () => {
        parsedText = pdfParser.getRawTextContent();
      });

      await new Promise((resolve, reject) => {
        pdfParser.loadPDF(tempFilePath);
        pdfParser.on("pdfParser_dataReady", resolve);
        pdfParser.on("pdfParser_dataError", reject);
      });

      // ✅ Cleanup: Delete the temp file after processing
      await fs.unlink(tempFilePath);
    } else {
      console.log("Uploaded file is not in the expected format.");
      return new NextResponse("Uploaded file is not in the expected format.", {
        status: 500,
      });
    }

    const response = new NextResponse(parsedText);
    response.headers.set("FileName", fileName);
    return response;
  } catch (error) {
    console.error("Error processing PDF:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
