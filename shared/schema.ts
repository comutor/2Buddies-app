import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  schoolName: text("school_name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  state: text("state").notNull(),
  address: text("address").notNull(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users)
  .extend({
    password: z.string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
    email: z.string()
      .email("Invalid email format")
      .refine((email) => email.endsWith(".edu"), "Must be a valid school email (.edu)")
  });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;