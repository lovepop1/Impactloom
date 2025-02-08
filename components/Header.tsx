"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { LogOut } from "lucide-react"
import { GradientBorderButton } from "@/components/GradientBorderButton"

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter()

  if (!isLoggedIn) return null

  const handleSignOut = () => {
    // Here you would typically handle the sign out logic
    router.push("/")
  }

  return (
    <header className="bg-card text-card-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/projects" className="text-2xl font-bold text-primary">
            ImpactLoom
          </Link>
        </motion.div>
        <nav className="flex items-center space-x-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GradientBorderButton>
              <Link href="/projects" className="text-primary">
                Projects
              </Link>
            </GradientBorderButton>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GradientBorderButton onClick={handleSignOut}>
              <span className="flex items-center">
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </span>
            </GradientBorderButton>
          </motion.div>
        </nav>
      </div>
    </header>
  )
}

