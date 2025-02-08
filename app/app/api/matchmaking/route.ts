import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

const MODEL_NAME = "gemini-1.5-flash-001";
const API_KEY = process.env.GEMINI_API_KEY as string;
const FILE_PATH = path.join(process.cwd(), 'match_results.json'); // JSON file to store results

export async function POST(request: Request) {
  try {
    const { companyName, csrGoals, resources } = await request.json();

    if (!companyName || !csrGoals || !resources) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const prompt = `
      You are an AI specializing in CSR matchmaking. Given a company's CSR goals and resources, suggest three business matches.

      **Return only a valid JSON array like this**:
      [
        {
          "companyName": "Company A",
          "matchScore": 0.85,
          "description": "Company A is a leading firm in sustainable energy solutions, focusing on reducing carbon emissions and developing eco-friendly alternatives.",
          "alignment": "Their initiatives in renewable energy strongly align with your CSR goals of sustainability and green technology.",
          "trackRecord": "Over the past five years, they have successfully reduced their carbon footprint by 30% and launched community solar projects in underserved areas."
        },
        {
          "companyName": "Company B",
          "matchScore": 0.78,
          "description": "Company B is a tech startup specializing in AI-driven supply chain optimization for ethical sourcing.",
          "alignment": "Their AI solutions can complement your company's goal of improving supply chain transparency.",
          "trackRecord": "They have partnered with major retailers to enhance fair trade compliance, reducing unethical sourcing by 40%."
        },
        {
          "companyName": "Company C",
          "matchScore": 0.72,
          "description": "Company C is a non-profit organization dedicated to education and digital literacy in underprivileged communities.",
          "alignment": "Since your company has resources in educational technology, a collaboration could help expand digital learning programs.",
          "trackRecord": "They have impacted over 500,000 students globally through online courses and mentorship initiatives."
        }
      ]
      **DO NOT return any explanation, only the JSON array.**
      
      **Company Info:**
      - **Company Name**: ${companyName}
      - **CSR Goals**: ${csrGoals}
      - **Resources**: ${resources}
    `;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    console.log("🔍 Gemini Raw Response:", responseText);

    try {
      // Ensure response is valid JSON
      const parsedMatches = JSON.parse(responseText);
      
      // Save to a file
      await writeFile(FILE_PATH, JSON.stringify(parsedMatches, null, 2));

      return NextResponse.json({
        message: "Matchmaking successful",
        matches: parsedMatches,
      }, { status: 200 });

    } catch (jsonError) {
      console.error("❌ JSON Parsing Error:", jsonError);
      throw new Error("Invalid JSON format in Gemini API response.");
    }
  } catch (error: any) {
    console.error("❌ Matchmaking error:", error);
    return NextResponse.json({ message: "Matchmaking failed", error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await readFile(FILE_PATH, 'utf8');
    const matches = JSON.parse(data);

    return NextResponse.json({
      message: "Match results loaded successfully",
      matches,
    }, { status: 200 });

  } catch (error) {
    console.error("❌ Error reading match results:", error);
    return NextResponse.json({ message: "No match data available. Try again." }, { status: 500 });
  }
}
