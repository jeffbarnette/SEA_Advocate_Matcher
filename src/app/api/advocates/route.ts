import db from "../../../db";
import { advocates } from "../../../db/schema";
import { NextRequest, NextResponse } from "next/server";
import { sql, and, or, like, eq } from "drizzle-orm";
import { handleCors, addCorsHeaders } from "../../../lib/cors";

export async function GET(request: NextRequest) {
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

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const city = searchParams.get("city");
    const degree = searchParams.get("degree");

    // Execute query - for now, get all data and filter in memory
    // TODO: Implement proper database filtering once we have more complex queries
    const allData = await db.select().from(advocates);
    
    // Apply client-side filtering (temporary solution)
    let filteredData = allData;
    
    if (search) {
      const sanitizedSearch = search.trim().toLowerCase();
      if (sanitizedSearch.length > 0) {
        filteredData = filteredData.filter(advocate => 
          advocate.firstName.toLowerCase().includes(sanitizedSearch) ||
          advocate.lastName.toLowerCase().includes(sanitizedSearch) ||
          advocate.city.toLowerCase().includes(sanitizedSearch) ||
          advocate.degree.toLowerCase().includes(sanitizedSearch) ||
          advocate.specialties.some(specialty => 
            specialty.toLowerCase().includes(sanitizedSearch)
          ) ||
          advocate.yearsOfExperience.toString().includes(sanitizedSearch)
        );
      }
    }
    
    if (city) {
      const sanitizedCity = city.trim().toLowerCase();
      if (sanitizedCity.length > 0) {
        filteredData = filteredData.filter(advocate => 
          advocate.city.toLowerCase() === sanitizedCity
        );
      }
    }
    
    if (degree) {
      const sanitizedDegree = degree.trim().toUpperCase();
      if (sanitizedDegree.length > 0) {
        filteredData = filteredData.filter(advocate => 
          advocate.degree.toUpperCase() === sanitizedDegree
        );
      }
    }
    
    const data = filteredData;

    const response = NextResponse.json({ 
      data,
      count: data.length,
      filters: { search, city, degree }
    });
    return addCorsHeaders(response);

  } catch (error) {
    console.error("Error fetching advocates:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const response = NextResponse.json(
      { 
        error: "Failed to fetch advocates",
        message: process.env.NODE_ENV === "development" ? errorMessage : "Internal server error"
      },
      { status: 500 }
    );
    return addCorsHeaders(response);
  }
}
