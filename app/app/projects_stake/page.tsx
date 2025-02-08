"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GlowCard } from "@/components/GlowCard";
import { motion } from "framer-motion";
import {GradientBorderButton} from "@/components/GradientBorderButton";
import { Store } from "lucide-react"; // Adjust the import path as necessary

export default function ProjectsDashboard() {
  const [projects, setProjects] = useState<{ id: string; project_name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stakeholderId = localStorage.getItem("stakeholderId");
    if (!stakeholderId) {
      console.error("User not logged in.");
      return;
    }

    async function fetchProjects() {
      const response = await fetch(`/api/projects_stake?stakeholderId=${stakeholderId}`);
      if (!response.ok) {
        console.error("Error fetching projects");
        return;
      }
      const data = await response.json();
      setProjects(data);
      setLoading(false);
    }

    fetchProjects();
  }, []);

  return (
    <div className="bg-background min-h-screen py-16 px-4">
      <motion.div className="text-center mb-12">
        <p className="text-3xl text-primary text-white">Join and track CSR initiatives</p>
      </motion.div>
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
         
          <GradientBorderButton>
            <Link href="/marketplace_stake" className="flex items-center">
              <Store className="mr-2 h-5 w-5" /> Explore Community
            </Link>
          </GradientBorderButton>
    
        </motion.div>

      {loading ? (
        <p className="text-white text-center">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-white text-center">No projects assigned.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link key={project.id} href={`/projects_stake/${project.id}`}>
              <GlowCard className="w-full h-48 cursor-pointer hover:scale-105">
                <div className="flex items-center justify-center h-full p-6">
                  <h2 className="text-2xl font-bold text-white text-center">{project.project_name}</h2>
                </div>
              </GlowCard>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
