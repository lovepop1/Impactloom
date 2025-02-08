"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { GlowCard } from "@/components/GlowCard"
import { GradientBorderButton } from "@/components/GradientBorderButton"
import { motion } from "framer-motion"

// Mock data for projects
const initialProjects = [
  { id: 1, name: "Clean Water Initiative" },
  { id: 2, name: "Renewable Energy Project" },
  { id: 3, name: "Education for All" },
  { id: 4, name: "Healthcare Access Program" },
  { id: 5, name: "Sustainable Agriculture" },
  { id: 6, name: "Digital Literacy Campaign" },
]

export default function ProjectsDashboard() {
  const [projects] = useState(initialProjects)

  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-3xl text-primary mb-8">Making a difference, one project at a time</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <GradientBorderButton>
            <Link href="/upload" className="flex items-center">
              <Plus className="mr-2 h-5 w-5" /> Create New Project
            </Link>
          </GradientBorderButton>
        </motion.div>

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
                  hue={120 + index * 30}
                  size={200}
                  border={2}
                  radius={10}
                >
                  <div className="flex items-center justify-center h-full p-6">
                    <h2 className="text-2xl font-bold text-primary text-center">{project.name}</h2>
                  </div>
                </GlowCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

