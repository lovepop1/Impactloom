
"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, DollarSign, Users, Sparkles, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlowCard } from "@/components/GlowCard";
import { GradientBorderButton } from "@/components/GradientBorderButton";
import { fetchGeminiAnalysis } from "@/app/lib/gemini";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import ReportsTabContent from "@/components/ReportsTabContent";


import DonutChart from "@/components/Charts/DonutChart";
import InteractiveLinePlot from "@/components/Charts/InteractiveLinePlot";
import BarChartPlot from "@/components/Charts/BarChartPlot";
import StudentDemographics from "@/components/Charts/StudentDemographics";
import TransparencyScore from "@/components/Charts/TransparencyScore";
import SocialImpactScore from "@/components/Charts/SocialImpactScore";
import SustainabilityScore from "@/components/Charts/SustainabilityScore";






export function ContentCard({ 
  title, 
  description, 
  content 
}: { 
  title: string; 
  description: string; 
  content: string 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <Card className="border border-primary/20 shadow-lg transition-transform duration-300 hover:scale-[1.02] bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl overflow-hidden">
        
        {/* Header Section */}
        <CardHeader className="flex flex-row items-center space-x-3 p-6 border-b border-primary/30 bg-gray-950/40">
          <Sparkles className="h-6 w-6 text-primary/80 group-hover:text-primary transition-all duration-300" />
          <div>
            <CardTitle className="text-2xl font-bold tracking-wide">{title}</CardTitle>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </CardHeader>

        {/* Content Section */}
        <CardContent className="p-6">
          <div className="leading-relaxed text-gray-300">
            {content
              .replace(/\*/g, "")
              .replace(/\#/g, "") // Removes all * characters
              .split("\n")
              .map((line, index) =>
                line.trim() ? (
                  <motion.p 
                    key={index} 
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.3, delay: index * 0.05 }} 
                    className="mb-3"
                  >
                    {line}
                  </motion.p>
                ) : (
                  <br key={index} />
                )
              )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}


export default function ProjectDetail() {
  
  const params = useParams();
  const router = useRouter();
  
  interface Project {
    id: string;
    project_name: string;
    description: string;
    budget: number;
    targeted_outcome: string;
    beneficiaries: number;
    important_fields: string | null;
    start_date: string;
    end_date: string;
    created_at: string | null;
    updated_at: string | null;
  }

  interface DocumentChunk {
    id: string;
    project_id: string;
    content: string;
    created_at: string;
  }
  

  
interface Message {
  sender: "user" | "bot";
  text: string;
}

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<DocumentChunk[]>([]);
  const [overview, setOverview] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [reports, setReports] = useState("");
  const [loadingAnalysis, setLoadingAnalysis] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [chatbotLoading, setChatbotLoading] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null)
  interface Stakeholder {
    id: string;
    stakeholder_name: string;
  }
  
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [selectedStakeholder, setSelectedStakeholder] = useState("");
  const [stakeholderType, setStakeholderType] = useState("");


  useEffect(() => {
    async function fetchProjectData() {
      try {
        const res = await fetch(`/api/fetch/${params.id}`);
        const data = await res.json();

        const docsRes = await fetch(`/api/fetch/${params.id}/documents`);
        const docsData = await docsRes.json();

        if (res.ok) {
          setProject(data);
        } else {
          console.error("Error fetching project:", data.error);
        }
        if (docsRes.ok) {
          setLoadingAnalysis(false);
          setDocuments(docsData);
          const geminiData = await fetchGeminiAnalysis(data, docsData);  
          setOverview(geminiData.overview);
          setAnalysis(geminiData.analysis);
          setReports(geminiData.report);

        
        } else {
          console.error("Error fetching docs:", docsData.error);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchProjectData();
    }

    
  }, [params.id]);

  useEffect(() => {
    async function fetchStakeholders() {
      try {
        const res = await fetch("/api/routes");
        const data = await res.json();
        setStakeholders(data);
      } catch (error) {
        console.error("Error fetching stakeholders:", error);
      }
    }
    fetchStakeholders();
  }, []);

  async function handleAddStakeholder() {
    if (!selectedStakeholder || !stakeholderType) {
      alert("Please select a stakeholder and type.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/routes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stakeholder_id: selectedStakeholder,
          project_id: params.id,
          stakeholder_type: stakeholderType,
        }),
      });

      if (response.ok) {
        alert("Stakeholder added successfully!");
        setSelectedStakeholder("");
        setStakeholderType("");
      } else {
        console.error("Error adding stakeholder:", await response.json());
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  

   useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
  
    const sendMessage = async () => {
      if (!input.trim()) return;
    
      const userMessage: Message = { sender: "user", text: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setChatbotLoading(true);
    
      try {
        const response = await fetch("/api/chatbot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: input, // ✅ Ensure API receives `question`
            context: {
              overview,
              analysis,
              reports,
              documents: documents.map((doc) => ({ content: doc.content })), // ✅ Ensure documents are formatted correctly
            },
          }),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to get response from AI");
        }
    
        const data = await response.json();
        const botMessage: Message = { sender: "bot", text: cleanResponse(data.answer) };
    
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Chatbot error:", error);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "❌ Error: Unable to process your request." },
        ]);
      } finally {
        setChatbotLoading(false);
      }
    };


    const reviewsData = [
      { name: "Positive", value: 70 },
      { name: "Neutral", value: 20 },
      { name: "Negative", value: 10 },
    ];
  
    const COLORS = ["#00C49F", "#FFBB28", "#FF4D4D"];
  
    const sentimentData = [
      { name: "Total Reviews", reviews: 100 },
      { name: "Positive Reviews", reviews: 70 },
      { name: "Negative Reviews", reviews: 10 },
    ];
    
  
    const cleanResponse = (response: string) => {
      return response.replace(/[*_-]/g, "").trim();
    };

  if (loading) {
    return <div className="text-center text-white text-lg">Loading...</div>;
  }

  if (!project) {
    return <div className="text-center text-red-500 text-lg">Project not found.</div>;
  }

  
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <GradientBorderButton onClick={() => router.push("/projects")} className="mb-4">
            <ArrowLeft className="h-4 w-4" />
          </GradientBorderButton>
          <GlowCard
            className="w-full cursor-pointer transition-transform duration-300 hover:scale-105 mb-8"
            hue={210}
            size={300}
            border={2}
            radius={16}
          >
            <div className="p-6">
              <h1 className="text-4xl font-bold text-primary text-white">{project.project_name}</h1>
              <p className="mt-2 text-xl text-muted-foreground">{project.description}</p>
            </div>
          </GlowCard>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-primary mr-2" />
                  <span className="text-2xl font-bold">${project.budget.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 text-primary mr-2" />
                  <span>{new Date(project.start_date).toLocaleDateString()} - {new Date(project.end_date).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Beneficiaries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-primary mr-2" />
                  <span className="text-2xl font-bold">{project.beneficiaries.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-primary/10">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
              <TabsTrigger value="chatbot">Chatbot</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
               {/* <Card>
                 <CardHeader>
                   <CardTitle>Project Overview</CardTitle>
                   <CardDescription>Key information about the {project.project_name}</CardDescription>
                 </CardHeader>
                 <CardContent>
                 <p>{overview}</p>
                 </CardContent>
               </Card> */}
               {/* <ContentCard
                title="Project Overview"
                description={`Key information about ${project.project_name}`}
                content={overview}
              /> */}
              <Card className="shadow-lg border border-border bg-card">
              <CardHeader className="bg-black text-primary-foreground p-4 rounded-t-lg">
                <CardTitle className="text-xl font-bold">Project Overview</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Overview of <span className="font-semibold">{project.project_name}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {loadingAnalysis ? (
                  <p className="text-muted-foreground text-center animate-pulse">Fetching overview...</p>
                ) : (
                  <div className="bg-secondary p-4 rounded-lg border border-border shadow-md space-y-4">
                    {overview ? (
                      overview.split('\n\n').map((section, sectionIndex) => {
                        const lines = section.split('\n');
                        const heading = lines[0];
                        const contentLines = lines.slice(1);

                        const cleanedHeading = heading ? heading.replace(/^\*\*|\*\*$/g, '') : '';

                        // Function to clean content lines
                        const cleanContent = (lines: any[]) => lines.map(line => line.replace(/\*\*(.*?)\*\*/g, '$1'));

                        let content;
                          content = (
                            <GlowCard className="w-full h-35 cursor-pointer transition-transform duration-300 hover:scale-105"
                            hue={150}
                            size={200}
                            border={2}
                            radius={10}>
                              {cleanContent(contentLines).map((line, index) => (
                                <p key={index} className="text-muted-foreground leading-relaxed">{line}</p>
                              ))}
                            </GlowCard>
                          );

                        return (
                          <div key={sectionIndex} className="mb-4">
                            <h3 className="font-bold text-lg text-foreground mb-2">{cleanedHeading}</h3>
                            {content}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-muted-foreground">Analysis not available</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
             </TabsContent>
             <TabsContent value="analysis">
               {/* <Card>
                 <CardHeader>
                   <CardTitle>Project Analysis</CardTitle>
                   <CardDescription>Analysing the project</CardDescription>
                 </CardHeader>
                 <CardContent>
                 <p>{analysis}</p>
                 </CardContent>
               </Card> */}
               {/* <ContentCard
                title="Project Analysis"
                description=""
                content={analysis}
              /> */}
              <Card className="shadow-lg border border-border bg-card">
              <CardHeader className="bg-black text-primary-foreground p-4 rounded-t-lg">
                <CardTitle className="text-xl font-bold">Project Analysis</CardTitle>
                <CardDescription className="text-muted-foreground">
                  In-depth analysis of <span className="font-semibold">{project.project_name}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {loadingAnalysis ? (
                  <p className="text-muted-foreground text-center animate-pulse">Fetching analysis...</p>
                ) : (
                  <div className="bg-secondary p-4 rounded-lg border border-border shadow-md space-y-4">
                    {analysis ? (
                      analysis.split('\n\n').map((section, sectionIndex) => {
                        const lines = section.split('\n');
                        const heading = lines[0];
                        const contentLines = lines.slice(1);

                        const cleanedHeading = heading ? heading.replace(/^\*\*|\*\*$/g, '') : '';

                        // Function to clean content lines
                        const cleanContent = (lines: any[]) => lines.map(line => line.replace(/\*\*(.*?)\*\*/g, '$1'));

                        let content;

                        if (cleanedHeading === "SOCIAL & ENVIRONMENTAL IMPACT") {
                          // Find SDG and GRI sections
                          const sdgIndex = contentLines.findIndex(line => line === "SDG ALIGNMENT");
                          const griIndex = contentLines.findIndex(line => line === "GRI SUSTAINABILITY");

                          const sdgLines = sdgIndex !== -1 ? contentLines.slice(sdgIndex + 1, griIndex !== -1 ? griIndex : undefined) : [];
                          const griLines = griIndex !== -1 ? contentLines.slice(griIndex + 1) : [];

                          content = (
                            <>
                              <GlowCard className="w-full h-35 cursor-pointer transition-transform duration-300 hover:scale-105"
                    hue={150}
                    size={200}
                    border={2}
                    radius={10}>
                                <h4 className="font-semibold text-md text-foreground">SDG ALIGNMENT</h4>
                                {cleanContent(sdgLines).map((line, index) => (
                                  <p key={index} className="text-muted-foreground leading-relaxed">{line}</p>
                                ))}
                              </GlowCard>
                              <GlowCard className="w-full h-35 cursor-pointer transition-transform duration-300 hover:scale-105"
                    hue={150}
                    size={200}
                    border={2}
                    radius={10}>
                                <h4 className="font-semibold text-md text-foreground">GRI SUSTAINABILITY</h4>
                                {cleanContent(griLines).map((line, index) => (
                                  <p key={index} className="text-muted-foreground leading-relaxed">{line}</p>
                                ))}
                              </GlowCard>
                            </>
                          );
                        } else {
                          // For other sections
                          content = (
                            <GlowCard className="w-full h-35 cursor-pointer transition-transform duration-300 hover:scale-105"
                            hue={150}
                            size={200}
                            border={2}
                            radius={10}>
                              {cleanContent(contentLines).map((line, index) => (
                                <p key={index} className="text-muted-foreground leading-relaxed">{line}</p>
                              ))}
                            </GlowCard>
                          );
                        }

                        return (
                          <div key={sectionIndex} className="mb-4">
                            <h3 className="font-bold text-lg text-foreground mb-2">{cleanedHeading}</h3>
                            {content}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-muted-foreground">Analysis not available</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
             </TabsContent>
            <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
    {/* Donut Chart */}
    <Card className="shadow-lg border border-border bg-card">
      <CardHeader className="bg-black text-primary-foreground p-4 rounded-t-lg">
        <CardTitle className="text-xl font-bold">Education Centres</CardTitle>
        <CardDescription className="text-muted-foreground">Distribution of Education centres</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <DonutChart />
      </CardContent>
    </Card>

    {/* Interactive Line Plot */}
    <Card className="shadow-lg border border-border bg-card">
      <CardHeader className="bg-black text-primary-foreground p-4 rounded-t-lg">
        <CardTitle className="text-xl font-bold">Number of Students Enrolled</CardTitle>
        <CardDescription className="text-muted-foreground">Number of Students enrolled vs Month</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <InteractiveLinePlot />
      </CardContent>
    </Card>

     {/* Bar Chart */}
     <Card className="shadow-lg border border-border bg-card">
        <CardHeader className="bg-black text-primary-foreground p-4 rounded-t-lg">
          <CardTitle className="text-xl font-bold">Economic Category</CardTitle>
          <CardDescription className="text-muted-foreground">Distribution of students enrolled Vs Economic classes </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <BarChartPlot />
        </CardContent>
      </Card>

       {/* Student Demographics */}
    <Card className="shadow-lg border border-border bg-card">
      <CardHeader className="bg-black text-primary-foreground p-4 rounded-t-lg">
        <CardTitle className="text-xl font-bold">Student Demographics</CardTitle>
        <CardDescription className="text-muted-foreground">Breakdown of student demographics (gender, age group)</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <StudentDemographics />
      </CardContent>
    </Card>

  {/* Social Impact Score */}
  <Card className="shadow-lg border border-border bg-card">
      <CardHeader className="bg-black text-primary-foreground p-4 rounded-t-lg">
        <CardTitle className="text-xl font-bold">Social Impact Score</CardTitle>
        <CardDescription className="text-muted-foreground">Extent of positive social change (Out of 10)</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <SocialImpactScore />
      </CardContent>
    </Card>

    {/* Sustainability & Long-Term Viability */}
    <Card className="shadow-lg border border-border bg-card">
      <CardHeader className="bg-black text-primary-foreground p-4 rounded-t-lg">
        <CardTitle className="text-xl font-bold">Sustainability & Long-Term Viability</CardTitle>
        <CardDescription className="text-muted-foreground">Likelihood of continued impact (Out of 10)</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <SustainabilityScore />
      </CardContent>
    </Card>

    {/* Transparency & Compliance Score */}
    <Card className="shadow-lg border border-border bg-card">
      <CardHeader className="bg-black text-primary-foreground p-4 rounded-t-lg">
        <CardTitle className="text-xl font-bold">Transparency & Compliance Score</CardTitle>
        <CardDescription className="text-muted-foreground">Alignment with CSR regulations & reporting standards (Out of 10)</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <TransparencyScore />
      </CardContent>
    </Card>
   

  </div>
              </TabsContent>





             <TabsContent value="reports">
               {/* <Card>
                 <CardHeader>
                   <CardTitle>Project Reports</CardTitle>
                   <CardDescription></CardDescription>
                 </CardHeader>
                 <CardContent>
                 <p>{reports}</p>
                 </CardContent>
             </Card> */}
             {/* <ContentCard
                title="Project Report"
                description=""
                content={reports}
              /> */}
              <ReportsTabContent project={project} />
             </TabsContent>
             <TabsContent value="stakeholders">
             {/* <Card>
    <CardHeader>
      <CardTitle>Stakeholder Management</CardTitle>
      <CardDescription>Manage and engage with project stakeholders</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <Select onValueChange={setSelectedStakeholder}>
          <SelectTrigger>
            <SelectValue placeholder="Select a stakeholder" />
          </SelectTrigger>
          <SelectContent>
            {stakeholders.map((stakeholder) => (
              <SelectItem key={stakeholder.id} value={stakeholder.id}>
                {stakeholder.stakeholder_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setStakeholderType}>
          <SelectTrigger>
            <SelectValue placeholder="Select stakeholder type" />
          </SelectTrigger>
          <SelectContent>
            {["Investor", "Employee", "General Public"].map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <GradientBorderButton className="mt-4" onClick={handleAddStakeholder}>
          Add Stakeholder
        </GradientBorderButton>
      </div>
    </CardContent>
  </Card> */}
  <div className="space-y-6">
  <Card>
      <CardHeader>
        <CardTitle>Stakeholder Management</CardTitle>
        <CardDescription>Manage and engage with project stakeholders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select onValueChange={setSelectedStakeholder}>
            <SelectTrigger>
              <SelectValue placeholder="Adithya Nangarath" />
            </SelectTrigger>
            <SelectContent>
              {stakeholders.map((stakeholder) => (
                <SelectItem key={stakeholder.id} value={stakeholder.stakeholder_name}>
                  {stakeholder.stakeholder_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setStakeholderType}>
            <SelectTrigger>
              <SelectValue placeholder="Select stakeholder type" />
            </SelectTrigger>
            <SelectContent>
              {["Investor", "Employee", "General Public"].map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <GradientBorderButton className="mt-4" onClick={handleAddStakeholder}>
            Add Stakeholder
          </GradientBorderButton>
        </div>
      </CardContent>
    </Card>
    <Card>
        <CardHeader>
          <CardTitle>Stakeholder Review</CardTitle>
          <CardDescription>Insights from stakeholder feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sentiment Pie Chart */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold">Sentiment Analysis</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={reviewsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>
                    {reviewsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Reviews Bar Chart */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold">Review Breakdown</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={sentimentData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="reviews" fill="#3498db" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
             </TabsContent>
            <TabsContent value="chatbot">
            {/* <Card>
                 <CardHeader>
                   <CardTitle>Chatbot</CardTitle>
                   <CardDescription>Manage and engage with project stakeholders</CardDescription>
                 </CardHeader>
                 <CardContent>
                   <p>Stakeholder information and engagement tools will be displayed here.</p>
                   <GradientBorderButton className="mt-4">Add Stakeholder</GradientBorderButton>
                 </CardContent>
               </Card> */}
               <Card>
                <CardHeader>
                  <CardTitle>Chatbot</CardTitle>
                  <CardDescription>Ask questions and get AI-powered insights about this project.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full">
                    <div className="flex flex-col space-y-4">
                      {messages.length === 0 ? (
                        <p className="text-gray-400 text-center">👋 Start a conversation with the AI!</p>
                      ) : (
                        messages.map((msg, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`max-w-[75%] p-3 rounded-xl shadow-md ${
                              msg.sender === "user"
                                ? "bg-green-500 text-white ml-auto"
                                : "bg-gray-800 text-gray-100"
                            }`}
                          >
                            {msg.text}
                          </motion.div>
                        ))
                      )}
                      {chatbotLoading && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <Loader2 className="animate-spin" size={18} /> Thinking...
                        </div>
                      )}
                      <div ref={messagesEndRef}></div>
                    </div>

                    {/* Input Section */}
                    <div className="flex items-center gap-2 pt-4">
                      <Input
                        className="flex-1 text-white bg-gray-800 border-gray-600"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && sendMessage()}
                      />
                      <Button
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                        onClick={sendMessage}
                        disabled={chatbotLoading}
                      >
                        ➤
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}