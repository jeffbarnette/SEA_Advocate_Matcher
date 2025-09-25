const { drizzle } = require("drizzle-orm/postgres-js");
const { migrate } = require("drizzle-orm/postgres-js/migrator");
const postgres = require("postgres");

const runMigration = async () => {
  // Load environment variables from .env.local if it exists
  try {
    require('dotenv').config({ path: '.env.local' });
  } catch (e) {
    // dotenv not available, continue without it
  }

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is not set");
    console.error("Please set DATABASE_URL in your .env.local file or environment");
    throw new Error("DATABASE_URL is not set");
  }

  console.log("🔗 Connecting to database...");

  const sql = postgres(process.env.DATABASE_URL, { max: 1 });
  const db = drizzle(sql);
  await migrate(db, { migrationsFolder: "drizzle" });
  await sql.end();
};

runMigration()
  .then(() => {
    console.log("✅ Successfully ran migration!");
    console.log("📊 Database schema is now up to date");

    process.exit(0);
  })
  .catch((e) => {
    console.error("❌ Failed to run migration:");
    console.error(e);

    process.exit(1);
  });
