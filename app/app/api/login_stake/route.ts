import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Pool } from "pg";

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    // Fetch the stakeholder from the database
    const result = await pool.query(
      "SELECT id, stakeholder_name, password FROM stakeholders WHERE email = $1",
      [email]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const stakeholder = result.rows[0];

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, stakeholder.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Return the stakeholder data (excluding the password)
    return NextResponse.json(
      {
        message: "Login successful",
        id: stakeholder.id,
        stakeholder_name: stakeholder.stakeholder_name,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
