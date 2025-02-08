"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RisingStars from "@/components/RisingStars";
import { GradientBorderButton } from "@/components/GradientBorderButton";
import { motion } from "framer-motion";

export default function CompanyProfileForm() {
  const [companyName, setCompanyName] = useState("");
  const [csrGoals, setCsrGoals] = useState("");
  const [resources, setResources] = useState("");
  const [challenges, setChallenges] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/matchmaking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName, csrGoals, resources, challenges }),
      });

      if (!response.ok) {
        let errorMessage = "Failed to submit profile. Please try again.";
        try {
          const text = await response.text();
          console.log("Raw response:", text);
          const data = JSON.parse(text);
          errorMessage = data.message || errorMessage;
        } catch (jsonError) {
          console.error("Error parsing JSON:", jsonError);
          errorMessage = `Invalid server response: ${text}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Matchmaking results:", data);
      router.push("/matchmaking-results");
    } catch (err: any) {
      setError(err.message || "Failed to submit profile. Please try again.");
      console.error("Profile submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">
      <RisingStars colors={["#22c55e", "#10b981", "#059669", "#047857"]} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="border border-gray-700 bg-gray-900/80 backdrop-blur-md shadow-2xl rounded-2xl p-6">
          <CardHeader className="pb-4 text-center">
            <CardTitle className="text-4xl font-extrabold text-white">
              🚀 Company Profile
            </CardTitle>
            <CardDescription className="text-gray-400 text-lg">
              Connect with the right business partners effortlessly.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-green-500"
              />
              <Textarea
                placeholder="CSR Goals (e.g., Sustainability, Education, Healthcare)"
                value={csrGoals}
                onChange={(e) => setCsrGoals(e.target.value)}
                required
                className="bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-green-500"
              />
              <Textarea
                placeholder="Available Resources (e.g., Funding, Technology, Workforce)"
                value={resources}
                onChange={(e) => setResources(e.target.value)}
                required
                className="bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-green-500"
              />
              <Textarea
                placeholder="Challenges your company faces (optional)"
                value={challenges}
                onChange={(e) => setChallenges(e.target.value)}
                className="bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-green-500"
              />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
              >
                <GradientBorderButton
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "🔄 Submitting..." : "✨ Find Matches"}
                </GradientBorderButton>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
