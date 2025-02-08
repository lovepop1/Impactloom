import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { Pool } from "pg"

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function POST(request: Request) {
  const { stakeholder_name, email, password } = await request.json()

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert the new stakeholder into the database
    const result = await pool.query(
      "INSERT INTO stakeholders (stakeholder_name, email, password) VALUES ($1, $2, $3) RETURNING id",
      [stakeholder_name, email, hashedPassword]
    )

    if (result.rowCount === 1) {
      return NextResponse.json(
        { message: "Stakeholder registered successfully", id: result.rows[0].id },
        { status: 201 }
      )
    } else {
      return NextResponse.json(
        { message: "Failed to register stakeholder" },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error("Signup error:", error)

    // Handle duplicate email error
    if (error.code === "23505") {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}