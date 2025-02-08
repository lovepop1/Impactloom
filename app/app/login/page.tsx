"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import RisingStars from "@/components/RisingStars"
import { GradientBorderButton } from "@/components/GradientBorderButton"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebaseConfig.js"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/projects") // Redirect to projects page after login
    } catch (error) {
      setError("Failed to login. Please check your credentials.")
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <RisingStars colors={["#22c55e", "#10b981", "#059669", "#047857"]} />
      <Card className="w-[350px] border-2 border-white bg-card/50 backdrop-blur-sm relative z-10">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-bold text-center text-white">ImpactLoom</CardTitle>
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
                className="bg-secondary border-white"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-secondary border-white"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </form>
        </CardContent>
        <CardFooter className="pt-0 flex flex-col gap-2">
          <GradientBorderButton className="w-full" onClick={handleLogin}>
            Login
          </GradientBorderButton>
          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <button onClick={() => router.push("/signup")} className="text-primary hover:underline">
              Sign Up
            </button>
          </p>
          <p className="text-sm text-center text-muted-foreground">
            Forgot your password?{" "}
            <button onClick={() => router.push("/reset-password")} className="text-primary hover:underline">
              Reset Password
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}