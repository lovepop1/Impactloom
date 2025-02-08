import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function POST(req: NextRequest) {
  try {
    const { question, context } = await req.json();

    if (!question || !context) {
      return NextResponse.json({ error: "Missing question or context" }, { status: 400 });
    }

    // Format the CSR project context
    const prompt = `
      You are an expert assistant for a Corporate Social Responsibility (CSR) project. Use the provided data to answer questions concisely and accurately.

      ## Project Overview:
      ${context.overview}

      ## Analysis:
      ${context.analysis}

      ## Reports:
      ${context.reports}

      ## Documents:
      ${context.documents.map((doc: any) => doc.content).join("\n\n")}

      Question: ${question}
      Answer:
    `;

    // Call Google Gemini API
    const response = await model.generateContent(prompt);
    const data = await response.response;

    if (!data.candidates || data.candidates.length === 0) {
      return NextResponse.json({ error: "No response from Gemini AI." }, { status: 500 });
    }

    return NextResponse.json({ answer: data.candidates[0]?.content?.parts[0]?.text || "No valid response." });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
