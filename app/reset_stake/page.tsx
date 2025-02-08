"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import RisingStars from "@/components/RisingStars";
import { GradientBorderButton } from "@/components/GradientBorderButton";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/reset-password_stake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to send reset email. Please try again.");
      }

      setMessage("Password reset email sent! Check your inbox.");
    } catch (err: any) {
      setError(err.message || "Failed to send reset email. Please try again.");
      console.error("Reset password error:", err);
    }
  };

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
              {message && <p className="text-green-500 text-sm">{message}</p>}
            </div>
          </form>
        </CardContent>
        <CardFooter className="pt-0 flex flex-col gap-2">
          <GradientBorderButton className="w-full" onClick={handleResetPassword}>
            Reset Password
          </GradientBorderButton>
          <p className="text-sm text-center text-muted-foreground">
            Remember your password?{" "}
            <button onClick={() => router.push("/login_stake")} className="text-primary hover:underline">
              Login
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}