import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env, validateEnvironment } from "../lib/env";

// Validate environment variables on startup
try {
  validateEnvironment();
} catch (error) {
  console.error("Environment validation failed:", error instanceof Error ? error.message : String(error));
  if (env.NODE_ENV === 'production') {
    process.exit(1);
  }
}

const setup = () => {
  try {
    // Create PostgreSQL connection with proper configuration
    const queryClient = postgres(env.DATABASE_URL, {
      max: 20, // Maximum number of connections
      idle_timeout: 20, // Close idle connections after 20 seconds
      connect_timeout: 10, // Connection timeout
      ssl: env.NODE_ENV === 'production' ? 'require' : false,
    });
    
    const db = drizzle(queryClient);
    
    // Test the connection
    if (env.NODE_ENV === 'development') {
      console.log("✅ Database connection established successfully");
    }
    
    return db;
  } catch (error) {
    console.error("❌ Failed to connect to database:", error instanceof Error ? error.message : String(error));
    
    // Return mock database for development
    if (env.NODE_ENV === 'development') {
      console.warn("⚠️  Using mock database for development");
      return {
        select: () => ({
          from: () => [],
        }),
        insert: () => ({
          values: () => ({
            returning: () => Promise.resolve([]),
          }),
        }),
      };
    }
    
    throw error;
  }
};

export default setup();
