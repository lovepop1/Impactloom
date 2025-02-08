import { NextResponse } from "next/server";
import { Pool } from "pg";

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const stakeholderId = url.searchParams.get("stakeholderId");

  if (!stakeholderId) {
    return NextResponse.json(
      { message: "User not logged in" },
      { status: 401 }
    );
  }

  try {
    const result = await pool.query(
      `SELECT p.id, p.project_name
       FROM reviews r
       JOIN projects p ON r.project_id = p.id
       WHERE r.stakeholder_id = $1`,
      [stakeholderId]
    );

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
