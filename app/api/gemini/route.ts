import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing.");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function getProjectChunks(projectId: string) {
  const documents = await prisma.documents.findMany({
    where: { project_id: projectId },
    orderBy: { created_at: "asc" }, // Fetch in chronological order
    select: { content: true },
  });

  let totalWords = 0;
  const selectedChunks: string[] = [];

  for (const doc of documents) {
    const words = doc.content.split(/\s+/).length;
    if (totalWords + words > 1900) break; // Limit total context to ~2500 words
    selectedChunks.push(doc.content);
    totalWords += words;
  }

  return selectedChunks;
}

export async function POST(req: Request) {
  try {
    const { project } = await req.json();

    if (!project) {
      return NextResponse.json({ error: "Invalid project data" }, { status: 400 });
    }

    const relevantChunks = await getProjectChunks(project.id);

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate responses
    const overviewPrompt = `
      YOU ARE AN AI ASSISTANT SPECIALIZING IN CORPORATE SOCIAL RESPONSIBILITY (CSR). 
YOUR TASK IS TO GENERATE A CLEAR, FACTUAL, AND PROFESSIONAL OVERVIEW OF THE GIVEN CSR PROJECT BASED ON THE PROVIDED DETAILS.

PROJECT DETAILS:

NAME: ${project.project_name}
DESCRIPTION: ${project.description}
BUDGET: ${project.budget}
OBJECTIVES: ${project.objectives || "Not Provided"}
SCOPE: ${project.scope || "Not Provided"}
TARGETED OUTCOME: ${project.targeted_outcome}
BENEFICIARIES: ${project.beneficiaries}
START DATE: ${project.start_date}
END DATE: ${project.end_date}
IMPORTANT FIELDS: ${project.important_fields || "Not Provided"}

CSR DOCUMENT EXCERPTS (LIMITED FOR RELEVANCE):
${relevantChunks.join("\n")}

---

RESPONSE GUIDELINES:

    FORMATTING INSTRUCTIONS:

    *   Structure: Present the analysis in four distinct sections, corresponding to the "KEY AREAS OF ANALYSIS" above.

    *   Headings: Start each section with a clear heading IN ALL CAPITAL LETTERS.

    *   Content:

        *   Effectiveness Assessment: Present key findings as a bulleted list of points.
        *   Scope & Outreach: Present key aspects as a bulleted list of points.
        *   Recommendations for Improvement: Present actionable steps as a bulleted list of points.
        *   Social & Environmental Impact:
            *   Begin with the subheading "SDG ALIGNMENT" and provide a bulleted list of aligned SDGs.
            *   Follow with the subheading "GRI SUSTAINABILITY" and provide a bulleted list of relevant GRI indicators.
    *   Formatting: Use only standard hyphens (-) for bullet points. Avoid bold text or any other special formatting within the points.

EXAMPLE OUTPUT:

PROJECT NAME  
- Green Energy Initiative  

DESCRIPTION  
- A renewable energy project focused on providing solar power to rural communities.  

BUDGET  
- $2 million  

OBJECTIVES  
- Increase access to clean energy in off-grid areas  
- Reduce carbon emissions by promoting renewable energy adoption  

SCOPE  
- Implementation in rural areas across three regions  
- Collaboration with local governments and NGOs  

TARGETED OUTCOME  
- Establish solar-powered microgrids in 50 villages.  

BENEFICIARIES  
- 10,000+ rural households  

START DATE  
- January 2025  

END DATE  
- December 2027  

IMPORTANT FIELDS  
- Renewable energy, rural development, sustainability  

Generate a structured, fact-based overview based on the provided information.
`;



    const overview = await model.generateContent(overviewPrompt);

    const analysisPrompt = `
    YOU ARE AN AI ASSISTANT SPECIALIZING IN CORPORATE SOCIAL RESPONSIBILITY (CSR) ANALYSIS.
    YOUR TASK IS TO EVALUATE THE EFFECTIVENESS, SCOPE, IMPACT, AND RECOMMENDATIONS FOR THE GIVEN CSR PROJECT, CONSIDERING SDG ALIGNMENT AND GRI REPORTING STANDARDS.

    PROJECT DETAILS:

    NAME: ${project.project_name}
    DESCRIPTION: ${project.description}
    BUDGET: ${project.budget}
    TARGETED OUTCOME: ${project.targeted_outcome}
    BENEFICIARIES: ${project.beneficiaries}
    START DATE: ${project.start_date}
    END DATE: ${project.end_date}
    IMPORTANT FIELDS: ${project.important_fields || "not provided"}

    CSR DOCUMENT EXCERPTS (LIMITED FOR RELEVANCE):
    ${relevantChunks.join("\n")}

    ---

    KEY AREAS OF ANALYSIS:

    1) EFFECTIVENESS ASSESSMENT
    - how well does the project achieve its stated objectives?
    - identify success factors, challenges, and areas needing improvement.

    2) SCOPE & OUTREACH
    - who are the direct and indirect beneficiaries?
    - how scalable is this project beyond its current scope?
    - are there any regional, economic, or policy constraints?

    3) SOCIAL & ENVIRONMENTAL IMPACT (ALIGNED WITH SDGS)
    - evaluate the project's alignment with relevant 17 SDGs.
    - explain how the project contributes to ESG goals.
    

    4) SOCIAL & ENVIRONMENTAL IMPACT (ALIGNED WITH GRI)
    - assess the GRI reporting indicators relevant to this project.

    5) RECOMMENDATIONS FOR IMPROVEMENT
    - how can the project increase its effectiveness and impact?
    - are there alternative funding models or partnerships that can improve results?
    - provide tangible steps for scaling, sustainability, and risk mitigation.

    ---

    RESPONSE GUIDELINES:

    FORMATTING INSTRUCTIONS:

    *   Structure: Present the analysis in four distinct sections, corresponding to the "KEY AREAS OF ANALYSIS" above.

    *   Headings: Start each section with a clear heading IN ALL CAPITAL LETTERS.

    *   Content:

        *   Effectiveness Assessment: Present key findings as a bulleted list of points.
        *   Scope & Outreach: Present key aspects as a bulleted list of points.
        *   Recommendations for Improvement: Present actionable steps as a bulleted list of points.
        *   Social & Environmental Impact:
            *   Begin with the subheading "SDG ALIGNMENT" and provide a bulleted list of aligned SDGs.
            *   Follow with the subheading "GRI SUSTAINABILITY" and provide a bulleted list of relevant GRI indicators.
    *   Formatting: Use only standard hyphens (-) for bullet points. Avoid bold text or any other special formatting within the points.

    EXAMPLE OUTPUT:

    EFFECTIVENESS ASSESSMENT
    - The project has achieved X% of its plant cover target.
    - Community participation is strong.
    - Long-term funding is a key challenge.
    - Improved monitoring is needed.

    SCOPE & OUTREACH
    - Direct beneficiaries include Y community members.
    - The project could scale to other regions.
    - Economic constraints may limit expansion.

    SDG ALIGNMENT
    - SDG 13 (Climate Action)
    - SDG 15 (Life on Land)

    GRI SUSTAINABILITY
    - GRI 302-1: Energy consumption
    - GRI 305-1: GHG emissions

    RECOMMENDATIONS FOR IMPROVEMENT
    - Increase project funding.
    - Develop strategic partnerships.
    - Implement a sustainability plan.
`;
    const analysis = await model.generateContent(analysisPrompt);

    const reportPrompt = `
    You are an AI assistant specializing in **Corporate Social Responsibility (CSR) and ESG reporting**.  
    Your task is to **generate a structured CSR report** that includes **Key Performance Indicators (KPIs), project scores, SDG alignment, GRI standards, and key insights** based on the provided project details and relevant CSR document excerpts.

    ### **Project Overview**
    - **Project Name:** ${project.project_name}
    - **Description:** ${project.description}
    - **Budget:** ${project.budget}
    - **Targeted Outcome:** ${project.targeted_outcome}
    - **Beneficiaries:** ${project.beneficiaries}
    - **Start Date:** ${project.start_date}
    - **End Date:** ${project.end_date}
    - **Important Fields:** ${project.important_fields || "Not Provided"}

    ### **CSR Document Excerpts (Limited for Relevance)**
    ${relevantChunks.join("\n")}

    ---

    ### **📊 KPI Scores (Return Only Scores in Separate Lines)**
    Evaluate the project’s performance using the following **CSR and ESG-relevant KPIs**. Only return numerical scores **in separate lines**:

    1. **Overall Project Score** (Weighted average of all KPIs) - Out of 10  
    2. **Social Impact Score** (Extent of positive social change) - Out of 10  
    3. **Environmental Sustainability Score** (Reduction of environmental footprint) - Out of 10  
    4. **Economic Contribution Score** (Job creation, local economy boost) - Out of 10  
    5. **Budget Utilization Efficiency** (Effective use of allocated funds) - Out of 10  
    6. **Beneficiary Reach & Inclusion** (Diversity, inclusivity, and number of people impacted) - Out of 10  
    7. **Stakeholder Engagement & Partnerships** (Collaboration effectiveness) - Out of 10  
    8. **Sustainability & Long-Term Viability** (Likelihood of continued impact) - Out of 10  
    9. **Transparency & Compliance Score** (Alignment with CSR regulations & reporting standards) - Out of 10  
    10. **Innovation & Scalability** (Potential to expand and adapt) - Out of 10  

    ---
    
    **Return format:**
    
    overall_score
    score2
    score3
    score4
    score5
    score6
    score7
    score8
    score9
    score10
    
    
    Do not include any extra text or explanations. Only output the numerical scores as separate lines.
  `;

    const report = await model.generateContent(reportPrompt);


    return NextResponse.json({
      overview: overview.response.text(),
      analysis: analysis.response.text(),
      report: report.response.text(),
    });

  } catch (error) {
    return NextResponse.json({ error: "Error generating Gemini response" }, { status: 500 });
  }
}