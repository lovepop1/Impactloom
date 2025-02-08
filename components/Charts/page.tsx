// "use client"

// import { useState, useEffect } from "react"
// import { useParams, useRouter } from "next/navigation"
// import { motion } from "framer-motion"
// import { ArrowLeft, Calendar, DollarSign, BarChart2, Users } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { GlowCard } from "@/components/GlowCard"
// import { GradientBorderButton } from "@/components/GradientBorderButton"
// import { Progress } from "@/components/ui/progress"

// // Mock data for a project
// const projectData = {
//   id: 1,
//   name: "Clean Water Initiative",
//   description: "Providing clean water to rural communities through sustainable infrastructure and education programs.",
//   budget: 1000,
//   startDate: "2023-01-01",
//   endDate: "2023-12-31",
//   beneficiaries: 10000,
//   sdg: "Clean Water and Sanitation",
// }

// export default function ProjectDetail() {
//   const params = useParams()
//   const [project, setProject] = useState(projectData)
//   const router = useRouter()

//   useEffect(() => {
//     // In a real application, you would fetch the project data here
//     // based on the params.id
//     setProject(projectData)
//   }, [])

//   return (
//     <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-5xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mb-8"
//         >
//           <GradientBorderButton onClick={() => router.push("/projects")} className="mb-4">
//             <ArrowLeft className="h-4 w-4" />
//           </GradientBorderButton>
//           <GlowCard
//             className="w-full cursor-pointer transition-transform duration-300 hover:scale-105 mb-8"
//             hue={210}
//             size={300}
//             border={2}
//             radius={16}
//           >
//             <div className="p-6">
//               <h1 className="text-4xl font-bold text-primary text-white">{project.name}</h1>
//               <p className="mt-2 text-xl text-muted-foreground">{project.description}</p>
//             </div>
//           </GlowCard>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"> 
//           {/* <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <Card>
//               <CardHeader>
//                 <CardTitle>Progress</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Progress value={project.progress} className="w-full h-4" />
//                 <p className="mt-2 text-right font-semibold">{project.progress}% Complete</p>
//               </CardContent>
//             </Card>
//           </motion.div>
//           */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <Card>
//               <CardHeader>
//                 <CardTitle>Budget</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center">
//                   <DollarSign className="h-8 w-8 text-primary mr-2" />
//                   <span className="text-2xl font-bold">${project.budget.toLocaleString()}</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             <Card>
//               <CardHeader>
//                 <CardTitle>Timeline</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center">
//                   <Calendar className="h-6 w-6 text-primary mr-2" />
//                   <span>
//                     {project.startDate} - {project.endDate}
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//           >
//             <Card>
//               <CardHeader>
//                 <CardTitle>Beneficiaries</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center">
//                   <Users className="h-8 w-8 text-primary mr-2" />
//                   <span className="text-2xl font-bold">{project.beneficiaries.toLocaleString()}</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.6 }}
//         >
//           <Tabs defaultValue="overview" className="w-full">
//             <TabsList className="grid w-full grid-cols-4 bg-primary/10">
//               <TabsTrigger value="overview">Overview</TabsTrigger>
//               <TabsTrigger value="analysis">Analysis</TabsTrigger>
//               <TabsTrigger value="reports">Reports</TabsTrigger>
//               <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
//             </TabsList>
//             <TabsContent value="overview">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Project Overview</CardTitle>
//                   <CardDescription>Key information about the {project.name}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="mb-4">
//                     This project aims to provide clean water to rural communities, improving health outcomes and quality
//                     of life for thousands of people.
//                   </p>
//                   <p className="mb-4">
//                     <strong>SDG Alignment:</strong> {project.sdg}
//                   </p>
//                   <p>
//                     <strong>Key Objectives:</strong>
//                   </p>
//                   <ul className="list-disc list-inside ml-4">
//                     <li>Install water purification systems in 50 villages</li>
//                     <li>Conduct water safety education programs for 10,000 residents</li>
//                     <li>Train local technicians for system maintenance</li>
//                   </ul>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             <TabsContent value="analysis">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Project Analysis</CardTitle>
//                   <CardDescription>Detailed analysis of the project's impact and performance</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p>Detailed analysis content will be displayed here.</p>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             <TabsContent value="reports">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Project Reports</CardTitle>
//                   <CardDescription>Access and generate reports for this project</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p>Project reports and report generation tools will be listed here.</p>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             <TabsContent value="stakeholders">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Stakeholder Management</CardTitle>
//                   <CardDescription>Manage and engage with project stakeholders</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p>Stakeholder information and engagement tools will be displayed here.</p>
//                   <GradientBorderButton className="mt-4">Add Stakeholder</GradientBorderButton>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlowCard } from "@/components/GlowCard";
import { GradientBorderButton } from "@/components/GradientBorderButton";

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

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const [overview, setOverview] = useState<string | null>(null);
  const [loadingOverview, setLoadingOverview] = useState<boolean>(false);

  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState<boolean>(false);

  async function fetchData(endpoint: string, setData: Function, setLoading: Function) {
    setLoading(true);
    try {
      const res = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project }),
      });
      const data = await res.json();
      setData(data[endpoint]);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (project) {
      fetchData("overview", setOverview, setLoadingOverview);
      fetchData("analysis", setAnalysis, setLoadingAnalysis);
    }
  }, [project]);

 

  useEffect(() => {
    async function fetchProjectData() {
      try {
        const res = await fetch(`/api/fetch/${params.id}`);
        const data = await res.json();

        if (res.ok) {
          setProject(data);
        } else {
          console.error("Error fetching project:", data.error);
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
            <TabsList className="grid w-full grid-cols-5 bg-primary/10">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
              <TabsTrigger value="chatbot">Chatbot</TabsTrigger>
            </TabsList>
            

    <TabsContent value="overview">
    <Card className="shadow-lg border border-border bg-card">
      <CardHeader className="bg-black text-primary-foreground p-4 rounded-t-lg">
        <CardTitle className="text-xl font-bold">Project Overview</CardTitle>
        <CardDescription className="text-muted-foreground">
          Overview of <span className="font-semibold">{project.project_name}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        {loadingOverview ? (
          <p className="text-muted-foreground text-center animate-pulse">Generating overview...</p>
        ) : (
          <div className="bg-secondary p-4 rounded-lg border border-border shadow-md">
            <h2 className="text-lg font-semibold text-foreground mb-2">Summary</h2>
            <p className="text-muted-foreground leading-relaxed">
              {overview || "Overview not available"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  </TabsContent>
            



<TabsContent value="analysis">
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
                    <GlowCard className="p-4 mb-2">
                      <h4 className="font-semibold text-md text-foreground">SDG ALIGNMENT</h4>
                      {cleanContent(sdgLines).map((line, index) => (
                        <p key={index} className="text-muted-foreground leading-relaxed">{line}</p>
                      ))}
                    </GlowCard>
                    <GlowCard className="p-4">
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
                  <GlowCard className="p-4">
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




      
             <TabsContent value="reports">
               <Card>
                 <CardHeader>
                   <CardTitle>Project Reports</CardTitle>
                   <CardDescription>Access and generate reports for this project</CardDescription>
                 </CardHeader>
                 <CardContent>
                   <p>Project reports and report generation tools will be listed here.</p>
                 </CardContent>
             </Card>
             </TabsContent>
             <TabsContent value="stakeholders">
               <Card>
                 <CardHeader>
                   <CardTitle>Stakeholder Management</CardTitle>
                   <CardDescription>Manage and engage with project stakeholders</CardDescription>
                 </CardHeader>
                 <CardContent>
                   <p>Stakeholder information and engagement tools will be displayed here.</p>
                   <GradientBorderButton className="mt-4">Add Stakeholder</GradientBorderButton>
                 </CardContent>
               </Card>
             </TabsContent>
            <TabsContent value="chatbot">
            <Card>
                 <CardHeader>
                   <CardTitle>Chatbot</CardTitle>
                   <CardDescription>Manage and engage with project stakeholders</CardDescription>
                 </CardHeader>
                 <CardContent>
                   <p>Stakeholder information and engagement tools will be displayed here.</p>
                   <GradientBorderButton className="mt-4">Add Stakeholder</GradientBorderButton>
                 </CardContent>
               </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
