import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { handleCors, addCorsHeaders } from "../../../lib/cors";

export async function POST(request: NextRequest) {
  // Handle CORS preflight
  const corsResponse = handleCors(request);
  if (corsResponse instanceof NextResponse) {
    return corsResponse;
  }

  try {
    // Validate database connection
    if (!db) {
      const response = NextResponse.json(
        { error: "Database connection not available" },
        { status: 500 }
      );
      return addCorsHeaders(response);
    }

    // Check if data already exists to prevent duplicates
    const existingData = await db.select().from(advocates);
    
    if (existingData.length > 0) {
      const response = NextResponse.json(
        { 
          error: "Data already exists",
          message: "Advocates table is not empty. Clear existing data first.",
          count: existingData.length
        },
        { status: 409 }
      );
      return addCorsHeaders(response);
    }

    // Validate seed data before insertion
    if (!advocateData || !Array.isArray(advocateData) || advocateData.length === 0) {
      const response = NextResponse.json(
        { error: "Invalid seed data" },
        { status: 400 }
      );
      return addCorsHeaders(response);
    }

    // Insert data with proper error handling
    const records = await db.insert(advocates).values(advocateData).returning();

    const response = NextResponse.json({ 
      success: true,
      advocates: records,
      count: records.length,
      message: `Successfully seeded ${records.length} advocate records`
    });
    return addCorsHeaders(response);

  } catch (error) {
    console.error("Error seeding database:", error);
    
    // Handle specific database errors
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === '23505') { // Unique constraint violation
        const response = NextResponse.json(
          { 
            error: "Duplicate data detected",
            message: "Some records already exist in the database"
          },
          { status: 409 }
        );
        return addCorsHeaders(response);
      }

      if (error.code === '23514') { // Check constraint violation
        const response = NextResponse.json(
          { 
            error: "Data validation failed",
            message: "Some records don't meet database constraints"
          },
          { status: 400 }
        );
        return addCorsHeaders(response);
      }
    }

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const response = NextResponse.json(
      { 
        error: "Failed to seed database",
        message: process.env.NODE_ENV === "development" ? errorMessage : "Internal server error"
      },
      { status: 500 }
    );
    return addCorsHeaders(response);
  }
}
