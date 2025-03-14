import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRideSchema } from "@shared/schema";
import { db } from "./db";
import { rides } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Ride routes
  app.post("/api/rides", async (req, res) => {
    try {
      // Validate request body
      const rideData = insertRideSchema.parse(req.body);

      // Insert ride into database
      const [newRide] = await db
        .insert(rides)
        .values(rideData)
        .returning();

      res.json(newRide);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}