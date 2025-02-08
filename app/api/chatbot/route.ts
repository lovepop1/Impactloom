import { NextRequest, NextResponse } from "next/server";

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
    const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error.message || "Failed to fetch response" }, { status: response.status });
    }

    return NextResponse.json({ answer: data.candidates[0]?.content?.parts[0]?.text || "No response from Gemini AI." });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
