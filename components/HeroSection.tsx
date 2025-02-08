"use client"

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import RisingStars from "@/components/RisingStars";
import {GlowCard} from "@/components/GlowCard";

const HeroSection = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <RisingStars colors={["#22c55e", "#10b981", "#059669", "#047857"]} />
      <section className="flex flex-col items-center justify-center px-4 text-center relative z-10">
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          ImpactLoom
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Empowering organizations to measure, visualize, and communicate CSR initiatives effectively.
        </motion.p>
        <motion.div
          key="get-started"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex space-x-20">
          <GlowCard
            className="w-full w-64 h-17 cursor-pointer transition-transform duration-300 hover:scale-105"
            hue={120}
            size={200}
            border={2}
            radius={20}
          >
            <div className="flex items-center justify-center w-64 h-14 p-6" onClick={() => router.push("/login")}>
              <h2 className="text-l font-bold text-primary text-white text-center">
                Company Integration
              </h2>
            </div>
          </GlowCard>

          <GlowCard
            className="w-full w-64 h-17 cursor-pointer transition-transform duration-300 hover:scale-105"
            hue={150}
            size={200}
            border={2}
            radius={20}
          >
            <div className="flex items-center justify-center w-64 h-14 p-6" onClick={() => router.push("/login_stake")}>
              <h2 className="text-l font-bold text-primary text-white text-center">
                Stakeholder Onboarding
              </h2>
            </div>
          </GlowCard>
        </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HeroSection;
