"use client"

import { useParams } from "next/navigation"
import { GlowCard } from "@/components/GlowCard"
import { GradientBorderButton } from "@/components/GradientBorderButton"
import { motion } from "framer-motion"
import Link from "next/link"

// Hardcoded story details
const storyDetails = [
  {
    id: 1,
    title: "Green Energy for Schools",
    party: "SolarAid",
    description: "SolarAid has transformed the lives of thousands of children in remote African villages by providing sustainable solar energy to schools. Before this initiative, students relied on kerosene lamps, which were not only expensive but also posed health hazards. By installing solar panels in over 200 schools, SolarAid has enabled students to study at night, improving literacy rates and academic performance. The project faced initial challenges, including high costs and logistical issues, but through strategic partnerships and community involvement, it became a resounding success. The initiative has now expanded to include solar-powered libraries and internet access, bridging the digital divide.",
    budget: "$2.5 million",
    challenges: [
      "High initial costs for solar panel installation.",
      "Logistical challenges in remote areas.",
      "Skepticism from local communities about the technology.",
    ],
    conclusion: "The project has successfully provided sustainable energy to over 200 schools, improving education outcomes and empowering communities. It serves as a model for similar initiatives worldwide.",
  },
  {
    id: 2,
    title: "Clean Water Initiative",
    party: "Water for All",
    description: "Water for All launched a life-changing project in drought-stricken regions of India, providing clean drinking water through rainwater harvesting and advanced filtration systems. The project initially struggled with infrastructure challenges, but with the help of local communities and government grants, they installed over 500 water purification stations. Women and children, who previously had to walk miles for water, now have access to safe drinking water within their villages. This initiative has drastically reduced waterborne diseases and empowered women to focus on other economic activities.",
    budget: "$1.8 million",
    challenges: [
      "Infrastructure challenges in remote areas.",
      "Securing funding for large-scale implementation.",
      "Ensuring community participation and trust.",
    ],
    conclusion: "The initiative has provided clean water to over 500 villages, significantly improving health outcomes and empowering women. It has inspired similar projects in other regions.",
  },
  {
    id: 3,
    title: "Eco-Friendly Packaging",
    party: "Sustainable Goods Inc.",
    description: "In an effort to combat plastic pollution, Sustainable Goods Inc. developed biodegradable packaging materials that decompose within 90 days. Partnering with major retail brands, they replaced conventional plastic packaging with compostable alternatives, preventing millions of tons of plastic waste. The project faced resistance from manufacturers due to higher production costs, but after an extensive awareness campaign and consumer demand, the initiative gained traction. The success of this project has influenced policymakers to consider stricter regulations on single-use plastics.",
    budget: "$3.2 million",
    challenges: [
      "Higher production costs for biodegradable materials.",
      "Resistance from manufacturers and retailers.",
      "Educating consumers about the benefits of eco-friendly packaging.",
    ],
    conclusion: "The project has successfully reduced plastic waste and influenced industry practices. It has set a new standard for sustainable packaging.",
  },
  {
    id: 4,
    title: "Community Tree Planting",
    party: "Green Earth Foundation",
    description: "Green Earth Foundation spearheaded an ambitious tree-planting campaign, restoring thousands of acres of deforested land. By collaborating with local farmers and volunteers, they planted over one million trees, revitalizing soil health and increasing biodiversity. Initially, they struggled with a lack of funding and community skepticism. However, by demonstrating the long-term benefits—such as improved air quality and increased agricultural yield—they gained widespread support. Today, the project serves as a blueprint for other reforestation programs globally.",
    budget: "$1.2 million",
    challenges: [
      "Lack of funding for large-scale reforestation.",
      "Community skepticism about the benefits of tree planting.",
      "Ensuring the survival of planted trees in harsh climates.",
    ],
    conclusion: "The campaign has successfully restored thousands of acres of land, improving biodiversity and air quality. It has become a model for global reforestation efforts.",
  },
  {
    id: 5,
    title: "Recycling Awareness Campaign",
    party: "Eco Warriors",
    description: "Eco Warriors launched a city-wide recycling awareness campaign, encouraging residents to reduce waste through proper segregation and upcycling initiatives. They partnered with schools, businesses, and municipalities to set up accessible recycling stations and educate people on waste management. Initially, participation was low due to a lack of awareness, but through creative social media campaigns and interactive workshops, they inspired thousands to adopt sustainable habits. The program has since been adopted in multiple cities, significantly reducing landfill waste.",
    budget: "$800,000",
    challenges: [
      "Low initial participation due to lack of awareness.",
      "Logistical challenges in setting up recycling stations.",
      "Ensuring long-term behavior change in the community.",
    ],
    conclusion: "The campaign has significantly reduced landfill waste and inspired sustainable habits in multiple cities. It continues to expand its reach.",
  },
  {
    id: 6,
    title: "Food Donation Drive",
    party: "Hunger Relief Org",
    description: "Hunger Relief Org addressed food insecurity by rescuing surplus food from restaurants and supermarkets, distributing it to homeless shelters and low-income families. Overcoming logistical challenges and food safety concerns, they developed an efficient food redistribution network. Through mobile apps, donors could list available food, and volunteers would coordinate pickups and deliveries. Since its inception, the initiative has provided over 2 million meals, reducing food waste and ensuring no one in their community goes to bed hungry.",
    budget: "$1.5 million",
    challenges: [
      "Logistical challenges in food collection and distribution.",
      "Ensuring food safety and quality.",
      "Coordinating volunteers and donors effectively.",
    ],
    conclusion: "The initiative has provided over 2 million meals, reducing food waste and addressing hunger in the community. It has inspired similar programs globally.",
  },
]

export default function StoryDetails() {
  const params = useParams()
  const storyId = parseInt(params.id as string)
  const story = storyDetails.find((s) => s.id === storyId)

  if (!story) {
    return <div className="text-center text-white text-lg">Story not found.</div>
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-primary text-white mb-4">{story.title}</h1>
          <p className="text-muted-foreground text-lg text-gray-300">By {story.party}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <GlowCard className="p-8 rounded-xl shadow-lg bg-gray-900">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-gray-400 mb-6">{story.description}</p>

              <h2 className="text-2xl font-bold text-white mb-4">Budget</h2>
              <p className="text-gray-400 mb-6">{story.budget}</p>

              <h2 className="text-2xl font-bold text-white mb-4">Challenges</h2>
              <ul className="list-disc list-inside text-gray-400 mb-6">
                {story.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-white mb-4">Conclusion</h2>
              <p className="text-gray-400 mb-6">{story.conclusion}</p>

              <Link href="/marketplace">
                <GradientBorderButton className="mt-6 px-6 py-2">Back to Stories</GradientBorderButton>
              </Link>
            </motion.div>
          </GlowCard>
        </div>
      </div>
    </div>
  )
}