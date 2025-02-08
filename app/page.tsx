"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import RisingStars from "@/components/RisingStars"
import { GradientBorderButton } from "@/components/GradientBorderButton"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate the login credentials
    // For now, we'll just redirect to the projects page
    router.push("/projects")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <RisingStars colors={["#22c55e", "#10b981", "#059669", "#047857"]} /> {/* Using green shades */}
      <Card className="w-[350px] border-2 border-accent bg-card/50 backdrop-blur-sm relative z-10">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-bold text-center text-primary">ImpactLoom</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Login to manage your CSR projects
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-secondary border-accent"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-secondary border-accent"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="pt-0">
          <GradientBorderButton className="w-full" onClick={handleLogin}>
            Login
          </GradientBorderButton>
        </CardFooter>
      </Card>
    </div>
  )
}

