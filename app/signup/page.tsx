"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import RisingStars from "@/components/RisingStars"
import { GradientBorderButton } from "@/components/GradientBorderButton"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebaseConfig"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      router.push("/projects") // Redirect to projects page after sign-up
    } catch (error: any) {
      console.error("Sign-up error:", error) // Log the full error object

      // Handle specific error cases
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered. Please use a different email.")
          break
        case "auth/invalid-email":
          setError("Invalid email address. Please enter a valid email.")
          break
        case "auth/weak-password":
          setError("Password is too weak. Please use at least 6 characters.")
          break
        default:
          setError("Failed to sign up. Please try again.")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <RisingStars colors={["#22c55e", "#10b981", "#059669", "#047857"]} />
      <Card className="w-[350px] border-2 border-white bg-card/50 backdrop-blur-sm relative z-10">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-bold text-center text-white">ImpactLoom</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Create an account to manage your CSR projects
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSignUp}>
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
          <GradientBorderButton className="w-full" onClick={handleSignUp}>
            Sign Up
          </GradientBorderButton>
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <button onClick={() => router.push("/login")} className="text-primary hover:underline">
              Login
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}