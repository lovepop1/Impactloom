"use client"

import { useState, useEffect } from "react"
import { GlowCard } from "@/components/GlowCard"
import { GradientBorderButton } from "@/components/GradientBorderButton"
import { motion } from "framer-motion"
import { createClient } from "@supabase/supabase-js"
import Link from "next/link"
import type React from "react" // Added import for React

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

const hardcodedStories = [
  {
    id: 1,
    title: "Green Energy for Schools",
    party: "SolarAid",
    detailsPage: "/story/1",
    description:
      "SolarAid has transformed the lives of thousands of children in remote African villages by providing sustainable solar energy to schools. Before this initiative, students relied on kerosene lamps, which were not only expensive but also posed health hazards. By installing solar panels in over 200 schools, SolarAid has enabled students to study at night, improving literacy rates and academic performance. The project faced initial challenges, including high costs and logistical issues, but through strategic partnerships and community involvement, it became a resounding success. The initiative has now expanded to include solar-powered libraries and internet access, bridging the digital divide.",
    likes: 150,
    category: "Green Energy", // Added category
  },
  {
    id: 2,
    title: "Clean Water Initiative",
    party: "Water for All",
    detailsPage: "/story/2",
    description:
      "Water for All launched a life-changing project in drought-stricken regions of India, providing clean drinking water through rainwater harvesting and advanced filtration systems. The project initially struggled with infrastructure challenges, but with the help of local communities and government grants, they installed over 500 water purification stations. Women and children, who previously had to walk miles for water, now have access to safe drinking water within their villages. This initiative has drastically reduced waterborne diseases and empowered women to focus on other economic activities.",
    likes: 200,
    category: "Clean Water", // Added category
  },
  {
    id: 3,
    title: "Eco-Friendly Packaging",
    party: "Sustainable Goods Inc.",
    detailsPage: "/story/3",
    description:
      "In an effort to combat plastic pollution, Sustainable Goods Inc. developed biodegradable packaging materials that decompose within 90 days. Partnering with major retail brands, they replaced conventional plastic packaging with compostable alternatives, preventing millions of tons of plastic waste. The project faced resistance from manufacturers due to higher production costs, but after an extensive awareness campaign and consumer demand, the initiative gained traction. The success of this project has influenced policymakers to consider stricter regulations on single-use plastics.",
    likes: 180,
    category: "Eco-Friendly Packaging", // Added category
  },
  {
    id: 4,
    title: "Community Tree Planting",
    party: "Green Earth Foundation",
    detailsPage: "/story/4",
    description:
      "Green Earth Foundation spearheaded an ambitious tree-planting campaign, restoring thousands of acres of deforested land. By collaborating with local farmers and volunteers, they planted over one million trees, revitalizing soil health and increasing biodiversity. Initially, they struggled with a lack of funding and community skepticism. However, by demonstrating the long-term benefits—such as improved air quality and increased agricultural yield—they gained widespread support. Today, the project serves as a blueprint for other reforestation programs globally.",
    likes: 250,
    category: "Tree Planting", // Added category
  },
  {
    id: 5,
    title: "Recycling Awareness Campaign",
    party: "Eco Warriors",
    detailsPage: "/story/5",
    description:
      "Eco Warriors launched a city-wide recycling awareness campaign, encouraging residents to reduce waste through proper segregation and upcycling initiatives. They partnered with schools, businesses, and municipalities to set up accessible recycling stations and educate people on waste management. Initially, participation was low due to a lack of awareness, but through creative social media campaigns and interactive workshops, they inspired thousands to adopt sustainable habits. The program has since been adopted in multiple cities, significantly reducing landfill waste.",
    likes: 120,
    category: "Recycling", // Added category
  },
  {
    id: 6,
    title: "Food Donation Drive",
    party: "Hunger Relief Org",
    detailsPage: "/story/6",
    description:
      "Hunger Relief Org addressed food insecurity by rescuing surplus food from restaurants and supermarkets, distributing it to homeless shelters and low-income families. Overcoming logistical challenges and food safety concerns, they developed an efficient food redistribution network. Through mobile apps, donors could list available food, and volunteers would coordinate pickups and deliveries. Since its inception, the initiative has provided over 2 million meals, reducing food waste and ensuring no one in their community goes to bed hungry.",
    likes: 300,
    category: "Food Donation", // Added category
  },
]

const categoryEmojis: { [key: string]: string } = {
  "Green Energy": "🔆",
  "Clean Water": "💧",
  "Eco-Friendly Packaging": "♻️",
  "Tree Planting": "🌳",
  Recycling: "🔄",
  "Food Donation": "🍎",
  Other: "✨",
  Like: "❤️", // Added Like
}

const loadingGradients = [
  "bg-gradient-to-r from-primary to-secondary",
  "bg-gradient-to-r from-secondary to-tertiary",
  "bg-gradient-to-r from-tertiary to-primary",
]

const initialNewStory = {
  title: "",
  party: "",
  budget: "",
  overview: "",
  challenges: "",
  conclusion: "",
}

export default function CSRStories() {
  const [newStory, setNewStory] = useState(initialNewStory)
  const [stories, setStories] = useState(hardcodedStories)
  const [loading, setLoading] = useState(true)
  const [loadingGradientIndex, setLoadingGradientIndex] = useState(0)
  const [comments, setComments] = useState<{ [key: number]: string }>({})

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingGradientIndex((prevIndex) => (prevIndex + 1) % loadingGradients.length)
    }, 800)

    return () => clearInterval(interval)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewStory((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newStory.title || !newStory.party || !newStory.overview || !newStory.challenges || !newStory.conclusion) return

    const newStoryWithId = { ...newStory, id: Date.now(), likes: 0, category: "Other", detailsPage: "", description: "" } // Set initial likes and category
    setStories((prev) => [...prev, newStoryWithId])
    setNewStory(initialNewStory) // Reset to the initial value
  }

  const handleCommentChange = (id: number, comment: string) => {
    setComments((prev) => ({ ...prev, [id]: comment }))
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-5xl font-extrabold text-white mb-6">Impactloom Community</p>
          <p className="text-xl text-gray-300">
            Discover CSR strategies, tools, and success stories. Indulge in best practices and collaborations.
          </p>
        </motion.div>

        {/* Display Stories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {loading
            ? // Loading State
              [...Array(6)].map((_, index) => (
                <motion.div
                  key={`loading-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlowCard 
                  hue={120 + index * 50}
                  size={200}
                  border={2}
                  radius={10}
                  className="w-full h-96 flex flex-col justify-center items-center">
                    <div className={`w-48 h-6 ${loadingGradients[loadingGradientIndex]} rounded-full mb-4`}></div>
                    <div className="w-64 h-4 bg-gray-800 rounded-full mb-2"></div>
                    <div className="w-52 h-4 bg-gray-800 rounded-full mb-2"></div>
                    <div className="w-40 h-4 bg-gray-800 rounded-full"></div>
                  </GlowCard>
                </motion.div>
              ))
            : // Actual Stories
              stories.map((story, index) => {
                const emoji = categoryEmojis[story.category] || categoryEmojis["Other"]
                return (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 1, y: 50, scale: 0.9 }}
                    animate={{ opacity: 3, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <GlowCard 
                     hue={200 + index * 50}
                     size={220}
                     border={0}
                     radius={10}
                    className="w-full h-96 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-bold text-white flex-grow">
                            <span className="text-3xl mr-2 animate-pulse">{emoji}</span> {story.title}
                          </h3>
                        </div>
                        <p className="text-gray-400 mb-4 text-center">By {story.party}</p>
                        <p className="text-gray-300 mb-4 line-clamp-3 overflow-hidden">{story.description}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <Link href={story.detailsPage || "#"}>
                          <GradientBorderButton className="px-4 py-2 text-white">More Info</GradientBorderButton>
                        </Link>
                        <div className="flex items-center">
                          <motion.span
                            className="text-3xl mr-2 cursor-pointer"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {categoryEmojis["Like"]}
                          </motion.span>
                          <span className="text-gray-300">{story.likes}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <textarea
                          placeholder="Add a comment..."
                          className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:outline-none"
                          onChange={(e) => handleCommentChange(story.id, e.target.value)}
                        />
                        {comments[story.id] && <p className="text-gray-400 mt-2">Comment: {comments[story.id]}</p>}
                      </div>
                    </GlowCard>
                  </motion.div>
                )
              })}
        </div>

        {/* Add Story Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <GlowCard className="w-full p-8">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">Share Your Story</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-lg font-medium mb-2 text-gray-300">
                  Project Name
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newStory.title}
                  onChange={handleInputChange}
                  className="w-full py-3 px-4 text-lg text-white bg-gray-800 rounded-md border border-gray-700 focus:border-purple-500 focus:outline-none"
                  placeholder="e.g., Clean Water for All"
                />
              </div>
              <div>
                <label htmlFor="party" className="block text-lg font-medium mb-2 text-gray-300">
                  Organization
                </label>
                <input
                  type="text"
                  id="party"
                  name="party"
                  value={newStory.party}
                  onChange={handleInputChange}
                  className="w-full py-3 px-4 text-lg text-white bg-gray-800 rounded-md border border-gray-700 focus:border-purple-500 focus:outline-none"
                  placeholder="e.g., EcoSolutions Inc."
                />
              </div>
              <div>
                <label htmlFor="budget" className="block text-lg font-medium mb-2 text-gray-300">
                  Budget Overview
                </label>
                <input
                  type="text"
                  id="budget"
                  name="budget"
                  value={newStory.budget}
                  onChange={handleInputChange}
                  className="w-full py-3 px-4 text-lg text-white bg-gray-800 rounded-md border border-gray-700 focus:border-purple-500 focus:outline-none"
                  placeholder="e.g., $50,000"
                />
              </div>
              <div>
                <label htmlFor="overview" className="block text-lg font-medium mb-2 text-gray-300">
                  Project Overview
                </label>
                <textarea
                  id="overview"
                  name="overview"
                  value={newStory.overview}
                  onChange={handleInputChange}
                  className="w-full py-3 px-4 text-lg text-white bg-gray-800 rounded-md border border-gray-700 focus:border-purple-500 focus:outline-none h-20"
                  placeholder="Describe the project's goals and impact..."
                />
              </div>
              <div>
                <label htmlFor="challenges" className="block text-lg font-medium mb-2 text-gray-300">
                  Challenges Faced
                </label>
                <textarea
                  id="challenges"
                  name="challenges"
                  value={newStory.challenges}
                  onChange={handleInputChange}
                  className="w-full py-3 px-4 text-lg text-white bg-gray-800 rounded-md border border-gray-700 focus:border-purple-500 focus:outline-none h-20"
                  placeholder="What obstacles did you overcome?"
                />
              </div>
              <div>
                <label htmlFor="conclusion" className="block text-lg font-medium mb-2 text-gray-300">
                  Conclusion
                </label>
                <textarea
                  id="conclusion"
                  name="conclusion"
                  value={newStory.conclusion}
                  onChange={handleInputChange}
                  className="w-full py-3 px-4 text-lg text-white bg-gray-800 rounded-md border border-gray-700 focus:border-purple-500 focus:outline-none h-20"
                  placeholder="Summarize the project's success and key takeaways..."
                />
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <GradientBorderButton type="submit" className="w-full h-20 text-2xl font-bold text-white flex items-center justify-center">

                  Submit Story
                </GradientBorderButton>
              </motion.div>
            </form>
          </GlowCard>
        </motion.div>
      </div>
    </div>
  )
}

