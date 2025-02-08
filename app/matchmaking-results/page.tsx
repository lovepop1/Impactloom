"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import RisingStars from "@/components/RisingStars";

interface Match {
  companyName: string;
  matchScore: number;
  description: string;
  alignment: string;
  trackRecord: string;
}

export default function MatchmakingResults() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("/api/matchmaking");

        if (!response.ok) {
          throw new Error("Failed to fetch matches. Please try again.");
        }

        const data = await response.json();
        setMatches(data.matches || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch matches. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return <div className="text-white text-xl text-center mt-20">🔍 Loading matchmaking results...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-xl text-center mt-20">❌ Error: {error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden px-4">
      <RisingStars colors={["#22c55e", "#10b981", "#059669", "#047857"]} />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card className="border border-gray-700 bg-gray-900/90 backdrop-blur-md shadow-2xl rounded-2xl p-6">
          <CardHeader className="pb-4 text-center">
            <CardTitle className="text-4xl font-extrabold text-white">
              🤝 Matchmaking Results
            </CardTitle>
            <CardDescription className="text-gray-400 text-lg">
              Here are the best potential matches for your company.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-6">
            {matches.length === 0 ? (
              <p className="text-center text-gray-400">No matches found. Try adjusting your company details.</p>
            ) : (
              <ul className="space-y-6">
                {matches.map((match) => (
                  <motion.li
                    key={match.companyName}
                    className="p-6 border border-gray-600 rounded-lg bg-gray-800/80 text-white shadow-lg backdrop-blur-lg transition-all hover:shadow-green-500/50 hover:scale-[1.02]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <h3 className="text-2xl font-bold text-green-400">{match.companyName}</h3>
                    <p className="text-gray-300 mt-2">🔹 <strong>Match Score:</strong> {match.matchScore.toFixed(2)}</p>
                    
                    <p className="text-gray-400 mt-2">📌 <strong>Overview:</strong> {match.description}</p>
                    <p className="text-gray-400 mt-1">🤝 <strong>Alignment:</strong> {match.alignment}</p>
                    <p className="text-gray-400 mt-1">🏆 <strong>Track Record:</strong> {match.trackRecord}</p>
                    
                    {/* Collaborate Button */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-all"
                        onClick={() => alert(`Request sent to ${match.companyName} for collaboration!`)}
                      >
                        🤝 Collaborate
                      </Button>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
