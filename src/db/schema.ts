import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  varchar,
  check,
} from "drizzle-orm/pg-core";

const advocates = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  degree: varchar("degree", { length: 50 }).notNull(),
  specialties: jsonb("specialties").default([]).notNull(),
  yearsOfExperience: integer("years_of_experience").notNull().$defaultFn(() => 0),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
  // Add constraints for data validation
  yearsOfExperienceCheck: check("years_of_experience_check", sql`${table.yearsOfExperience} >= 0 AND ${table.yearsOfExperience} <= 50`),
  phoneNumberCheck: check("phone_number_check", sql`${table.phoneNumber} ~ '^[0-9]{10,15}$'`),
}));

export { advocates };
