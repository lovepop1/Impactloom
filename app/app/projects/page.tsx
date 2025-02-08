"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Handshake, Plus, Store } from "lucide-react"
import { GlowCard } from "@/components/GlowCard"
import { GradientBorderButton } from "@/components/GradientBorderButton"
import { motion } from "framer-motion"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function ProjectsDashboard() {
  const [projects, setProjects] = useState<{ id: number; project_name: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase.from("projects").select("id, project_name")
      if (error) {
        console.error("Error fetching projects:", error.message)
      } else {
        setProjects(data || [])
      }
      setLoading(false)
    }

    fetchProjects()
  }, [])

  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-3xl text-primary text-white mb-8">
            Making a difference, one project at a time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
         <div className="flex space-x-4">
          <GradientBorderButton>
            <Link href="/upload" className="flex items-center">
              <Plus className="mr-2 h-5 w-5" /> Create New Project
            </Link>
          </GradientBorderButton>
          <GradientBorderButton>
            <Link href="/marketplace" className="flex items-center">
              <Store className="mr-2 h-5 w-5" /> Explore Community
            </Link>
          </GradientBorderButton>
          <GradientBorderButton>
            <Link href="/companyprofileform" className="flex items-center">
              <Handshake className="mr-2 h-5 w-5" /> Collaborations
            </Link>
          </GradientBorderButton>
        </div>
        </motion.div>

        {loading ? (
          <p className="text-white text-center">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-white text-center">Start by creating your project.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              >
                <Link href={`/projects/${project.id}`} className="block">
                  <GlowCard
                    className="w-full h-48 cursor-pointer transition-transform duration-300 hover:scale-105"
                    hue={120 + index * 50}
                    size={200}
                    border={2}
                    radius={10}
                  >
                    <div className="flex items-center justify-center h-full p-6">
                      <h2 className="text-2xl font-bold text-primary text-white text-center">
                        {project.project_name}
                      </h2>
                    </div>
                  </GlowCard>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
