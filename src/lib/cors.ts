import { NextRequest, NextResponse } from "next/server";

// CORS configuration for production
const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.NODE_ENV === "production" 
    ? process.env.ALLOWED_ORIGINS || "https://yourdomain.com"
    : "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

export function handleCors(request: NextRequest) {
  // Handle preflight requests
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  return corsHeaders;
}

export function addCorsHeaders(response: NextResponse) {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}
