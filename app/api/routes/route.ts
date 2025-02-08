import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return getStakeholders(req, res);
  } else if (req.method === "POST") {
    return addReview(req, res);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}

// ✅ Fetch all stakeholders
async function getStakeholders(req: NextApiRequest, res: NextApiResponse) {
  try {
    const stakeholders = await prisma.stakeholders.findMany({
      select: { id: true, stakeholder_name: true },
    });
    return res.status(200).json(stakeholders);
  } catch (error) {
    console.error("Error fetching stakeholders:", error);
    return res.status(500).json({ error: "Error fetching stakeholders" });
  }
}

// ✅ Add a new stakeholder review with a blank review field
async function addReview(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { stakeholder_id, project_id, stakeholder_type } = req.body;

    if (!stakeholder_id || !project_id || !stakeholder_type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newReview = await prisma.reviews.create({
      data: {
        stakeholder_id,
        project_id,
        stakeholder_type,
        review: "",
      },
    });

    return res.status(201).json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    return res.status(500).json({ error: "Error creating review" });
  }
}
