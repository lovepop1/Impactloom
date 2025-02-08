"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, DollarSign, BarChart2, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlowCard } from "@/components/GlowCard"
import { GradientBorderButton } from "@/components/GradientBorderButton"
import { Progress } from "@/components/ui/progress"

// Mock data for a project
const projectData = {
  id: 1,
  name: "Clean Water Initiative",
  description: "Providing clean water to rural communities through sustainable infrastructure and education programs.",
  progress: 75,
  budget: 500000,
  startDate: "2023-01-01",
  endDate: "2023-12-31",
  beneficiaries: 10000,
  sdg: "Clean Water and Sanitation",
}

export default function ProjectDetail() {
  const params = useParams()
  const [project, setProject] = useState(projectData)
  const router = useRouter()

  useEffect(() => {
    // In a real application, you would fetch the project data here
    // based on the params.id
    setProject(projectData)
  }, [])

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
              <h1 className="text-4xl font-bold text-primary">{project.name}</h1>
              <p className="mt-2 text-xl text-muted-foreground">{project.description}</p>
            </div>
          </GlowCard>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={project.progress} className="w-full h-4" />
                <p className="mt-2 text-right font-semibold">{project.progress}% Complete</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 text-primary mr-2" />
                  <span>
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-primary/10">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Project Overview</CardTitle>
                  <CardDescription>Key information about the {project.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    This project aims to provide clean water to rural communities, improving health outcomes and quality
                    of life for thousands of people.
                  </p>
                  <p className="mb-4">
                    <strong>SDG Alignment:</strong> {project.sdg}
                  </p>
                  <p>
                    <strong>Key Objectives:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4">
                    <li>Install water purification systems in 50 villages</li>
                    <li>Conduct water safety education programs for 10,000 residents</li>
                    <li>Train local technicians for system maintenance</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analysis">
              <Card>
                <CardHeader>
                  <CardTitle>Project Analysis</CardTitle>
                  <CardDescription>Detailed analysis of the project's impact and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Detailed analysis content will be displayed here.</p>
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
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

