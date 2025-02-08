export async function fetchGeminiAnalysis(project: any, documents: any) {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project, documents }),
    });
    return await response.json();
  }
