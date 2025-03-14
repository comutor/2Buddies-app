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
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    schoolName: z.string().min(1, "School name is required"),
    phoneNumber: z.string().min(10, "Please enter a valid phone number"),
    state: z.string().min(2, "State is required"),
    address: z.string().min(5, "Please enter a valid address"),
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