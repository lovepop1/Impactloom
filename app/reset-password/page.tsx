"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import RisingStars from "@/components/RisingStars"
import { GradientBorderButton } from "@/components/GradientBorderButton"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebaseConfig"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      await sendPasswordResetEmail(auth, email)
      setSuccess("Password reset email sent. Check your inbox.")
    } catch (error) {
      setError("Failed to send reset email. Please check your email address.")
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
            Reset your password
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleResetPassword}>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-secondary border-white"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}
            </div>
          </form>
        </CardContent>
        <CardFooter className="pt-0 flex flex-col gap-2">
          <GradientBorderButton className="w-full" onClick={handleResetPassword}>
            Reset Password
          </GradientBorderButton>
          <p className="text-sm text-center text-muted-foreground">
            Remember your password?{" "}
            <button onClick={() => router.push("/login")} className="text-primary hover:underline">
              Login
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}